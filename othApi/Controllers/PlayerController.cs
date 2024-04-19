using Microsoft.AspNetCore.Mvc;
using othApi.Data.Dtos;
using othApi.Services.Players;
using AutoMapper;
using othApi.Services.OsuApi;
using Microsoft.AspNetCore.Authorization;
using othApi.Data.Exceptions;
using Microsoft.AspNetCore.RateLimiting;
using othApi.Services.Discord;
using Newtonsoft.Json;
using System.Security.Claims;

namespace othApi.Controllers
{
    [Route("api/v1/player")]
    [ApiController]
    [Tags("OTH Player")]
    [Produces("application/Json")]
    [Consumes("application/Json")]
    [EnableRateLimiting("fixed")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IMapper _mapper;
        private readonly IOsuApiService _osuApiService;
        private readonly IDiscordService _discordService;

        public PlayerController(IPlayerService playerService, IMapper mapper, IOsuApiService osuApiService, IDiscordService discordService)
        {
            _playerService = playerService;
            _mapper = mapper;
            _osuApiService = osuApiService;
            _discordService = discordService;
        }

        // GET: api/Player
        [HttpGet("min")]
        public ActionResult<IEnumerable<PlayerMinimalDto>> GetPlayersMinimal()
        {
            var players = _playerService.GetMinimal();
            var playerDtos = _mapper.Map<IEnumerable<PlayerMinimalDto>>(players);
            System.Console.WriteLine("Player Min Called");
            return Ok(playerDtos);
        }

        // GET: api/Player/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayer(int id)
        {
            var player = await _playerService.GetByIdAsync(id);
            var playerDto = _mapper.Map<PlayerDto>(player);
            return playerDto;
        }


        // POST: api/Player
        [HttpPost("{id}")]
        [ProducesResponseType(201, Type = typeof(PlayerDto))]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [Authorize]
        public async Task<ActionResult<PlayerDto>> PostPlayer(int id)
        {
            var useSub = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (useSub == null) return Unauthorized("Bad Token");

            await _discordService.SendMessage($"User {useSub.Value} is trying to add player {id}");

            if (_playerService.Exists(id))
            {
                return Conflict($"Player with id {id} already exists");
            }

            var players = await _osuApiService.GetPlayers(new List<int> { id });
            if (players == null) return NotFound($"Player with id {id} not found");
            if (players.Length == 0) return NotFound($"Player with id {id} not found");


            var addedPlayer = await _playerService.PostAsync(players[0]);
            var playerDto = _mapper.Map<PlayerDto>(addedPlayer);

            await _discordService.SendMessage($"User {useSub.Value} successfully added player {playerDto.Id}");

            return CreatedAtAction("GetPlayer", new { id = playerDto.Id }, playerDto);
        }

        [HttpPost("postByUsername/{username}")]
        [Authorize]
        [ProducesResponseType(201, Type = typeof(PlayerDto))]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        public async Task<ActionResult> PostByUsername(string username)
        {
            var useSub = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (useSub == null) return Unauthorized("Bad Token");

            await _discordService.SendMessage($"User {useSub.Value} is trying to add player {username}");

            try
            {
                var player = await _osuApiService.GetPlayerByUsername(username);
                var addedPlayer = await _playerService.PostAsync(player);
                var playerDto = _mapper.Map<PlayerDto>(addedPlayer);
                await _discordService.SendMessage($"User {useSub.Value} successfully added player {playerDto.Username}");
                return CreatedAtAction("GetPlayer", new { id = playerDto.Id }, playerDto);
            }
            catch (AlreadyExistException)
            {
                return Conflict($"Player '{username}' already exists");
            }
            catch (NotFoundException)
            {
                return NotFound($"Player with username {username} not found");
            }

        }

        [HttpGet("exists/{id}")]
        public ActionResult<bool> Exists(int id)
        {
            return _playerService.Exists(id);
        }

        [HttpGet("stats/{id}")]
        public ActionResult PlayerStats(int id)
        {
            if (!_playerService.Exists(id)) return NotFound($"Player with id {id} not found");
            var playerStats = _playerService.GetStats(id);
            return Ok(playerStats);
        }



    }
}
