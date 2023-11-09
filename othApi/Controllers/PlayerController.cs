using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using othApi.Data.Entities;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Services.Players;
using AutoMapper;
using othApi.Services.OsuApi;

namespace othApi.Controllers
{
    [Route("api/v1/player")]
    [ApiController]
    [Produces("application/Json")]
    [Consumes("application/Json")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly IMapper _mapper;
        private readonly IOsuApiService _osuApiService;

        public PlayerController(IPlayerService playerService, IMapper mapper, IOsuApiService osuApiService)
        {
            _playerService = playerService;
            _mapper = mapper;
            _osuApiService = osuApiService;
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
        public async Task<ActionResult<PlayerDto>> PostPlayer(int id)
        {

            var players = await _osuApiService.GetPlayers(new List<int> { id });
            if (players == null)
            {
                return NotFound($"Player with id {id} not found");
            }

            var addedPlayer = _playerService.Post(players[0]);
            var playerDto = _mapper.Map<PlayerDto>(addedPlayer);
            return CreatedAtAction("GetPlayer", new { id = playerDto.Id }, playerDto);
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
    }
}
