using Microsoft.AspNetCore.Mvc;
using othApi.Data.Dtos;
using othApi.Services.Players;
using AutoMapper;
using othApi.Services.OsuApi;
using Microsoft.AspNetCore.Authorization;
using Discord.WebSocket;
using Newtonsoft.Json;
using othApi.Data.Exceptions;
using Microsoft.AspNetCore.RateLimiting;

namespace othApi.Controllers
{
    [Route("api/v1/player")]
    [ApiController]
    [Produces("application/Json")]
    [Consumes("application/Json")]
    [EnableRateLimiting("fixed")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IMapper _mapper;
        private readonly IOsuApiService _osuApiService;
        private readonly DiscordSocketClient _discord;

        public PlayerController(IPlayerService playerService, IMapper mapper, IOsuApiService osuApiService, DiscordSocketClient discord)
        {
            _playerService = playerService;
            _mapper = mapper;
            _osuApiService = osuApiService;
            _discord = discord;
        }

        // GET: api/Player
        [HttpGet("min")]
        public ActionResult<IEnumerable<PlayerMinimalDto>> GetPlayersMinimal()
        {
            var players = _playerService.GetMinimal();
            var playerDtos = _mapper.Map<IEnumerable<PlayerMinimalDto>>(players);
            return Ok(playerDtos);

        }

        // GET: api/Player/5
        [HttpGet("{id}")]
        public  ActionResult<PlayerDto> GetPlayer(int id)
        {
            var player = _playerService.GetById(id);
            var playerDto = _mapper.Map<PlayerDto>(player);
            return playerDto;
        }

        // PUT: api/Player/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutPlayer(int id, Player player)
        // {
        //     if (id != player.Id)
        //     {
        //         return BadRequest();
        //     }

        //     return NoContent();
        // }

        // POST: api/Player
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(201, Type = typeof(PlayerDto))]
        [ProducesResponseType(409)]
        [Authorize]
        public async Task<ActionResult<PlayerDto>> PostPlayer(int id)
        {
            if(_playerService.Exists(id)){
                return Conflict($"Player with id {id} already exists");
            }

            var players = await _osuApiService.GetPlayers(new List<int> { id });
            if (players == null) return NotFound($"Player with id {id} not found");
            if (players.Length == 0) return NotFound($"Player with id {id} not found");


            var addedPlayer = _playerService.Post(players[0]);
            var playerDto = _mapper.Map<PlayerDto>(addedPlayer);
            Notify(playerDto.Id, playerDto.Username).Wait();

            return CreatedAtAction("GetPlayer", new { id = playerDto.Id }, playerDto);
        }

        [HttpPost("postByUsername/{username}")]
        [Authorize]
        [ProducesResponseType(409)]
        [ProducesResponseType(404)]
        [ProducesResponseType(201, Type = typeof(PlayerDto))]
        public async Task<ActionResult> PostByUsername(string username)
        {
            try
            {
                var player =  await  _osuApiService.GetPlayerByUsername(username);
                var addedPlayer = _playerService.Post(player);
                var playerDto = _mapper.Map<PlayerDto>(addedPlayer);
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

        // DELETE: api/Player/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeletePlayer(int id)
        // {


        //     return NoContent();
        // }

        // private bool PlayerExists(int id)
        // {
        //     return (_context.Players?.Any(e => e.Id == id)).GetValueOrDefault();
        // }

        [HttpGet("exists/{id}")]
        public ActionResult<bool> Exists(int id)
        {
            return _playerService.Exists(id);
        }


        private async Task Notify(int id, string username){
            try
            {
            var guild = _discord.GetGuild(622429522154749992);
            var channel = guild.GetTextChannel(1173892318244376596);
            await channel.SendMessageAsync($"User registered with id: {id}, username: {username}");
                
            }
            catch (Exception)
            {
                Console.WriteLine("Error Notifying");
                return;
            }
            return;
        }
    }
}
