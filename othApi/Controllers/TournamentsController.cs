
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using othApi.Data.Dtos;
using othApi.Data.Entities;
using othApi.Data.Exceptions;
using othApi.Services.OsuApi;
using othApi.Services.Players;
using othApi.Services.Tournaments;

namespace othApi.Controllers
{
    [Route("api/v1/tournament")]
    [ApiController]
    [Produces("application/Json")]
    [Consumes("application/Json")]
    public class TournamentsController : ControllerBase
    {
        private readonly ILogger<TournamentsController> _logger;
        private readonly ITournamentService _tournamentService;
        private readonly IMapper _mapper;
        private readonly IOsuApiService _osuApiService;
        private readonly IPlayerService _playerService;

        public TournamentsController(ILogger<TournamentsController> logger, ITournamentService tournamentService, IMapper mapper, IOsuApiService osuApiService, IPlayerService playerService)
        {
            _logger = logger;
            _tournamentService = tournamentService;
            _mapper = mapper;
            _osuApiService = osuApiService;
            _playerService = playerService;
        }

        [HttpGet]
        public ActionResult<List<TournamentDto>> GetTournaments()
        {
            var tournaments = _tournamentService.Get();
            var tournamentDtos = _mapper.Map<List<TournamentDto>>(tournaments);
            return tournamentDtos;
        }

        [HttpGet("{id}")]
        public ActionResult<TournamentDto> GetTournament(int id)
        {
            var tournament = _tournamentService.GetById(id);
            var tournamentDto = _mapper.Map<TournamentDto>(tournament);
            return tournamentDto;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TournamentDto>> PostTournament([FromBody] TournamentPostDto tournament)
        {
            if (_tournamentService.TournamentWithTeamNameExists(tournament.TeamName, tournament.Name)) {
                return Conflict(new { title = "Conflict", status = "409", detail = "This Tournament already have a team with this Team Name",});
            }

            var tournamentToPost = _mapper.Map<Tournament>(tournament);
            var addedTournament = _tournamentService.Post(tournamentToPost);


            if (tournament.TeamMateIds != null) {
                // Check if players exists in db if not add them
                var playersDoNotExists = await _osuApiService.GetPlayers(tournament.TeamMateIds);
                if (playersDoNotExists != null) {
                    foreach (var player in playersDoNotExists)
                    {
                        _playerService.Post(player);
                    }
                }

                //  Get Players from db
                var teamMatesToAdd = _playerService.GetMultipleById(tournament.TeamMateIds);
                if(teamMatesToAdd == null) {
                    return NotFound("One or more players do not exist in the database");
                }
                var resTournament = _tournamentService.AddTeamMates(teamMatesToAdd, addedTournament.Id);
                
                var tDto = _mapper.Map<TournamentDto>(resTournament);

                return CreatedAtAction("GetTournament", new { id = tDto.Id }, tDto);
            }
            else {
                var tDto = _mapper.Map<TournamentDto>(addedTournament);

                return CreatedAtAction("GetTournament", new { id = tDto.Id }, tDto);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public ActionResult PutTournament(int id, [FromBody] TournamentDto tournamentDto) {
            var authSub = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _logger.LogInformation("User with id {id} is trying to update tournament with id {tournamentId}", authSub.Split("|")[2], id);
            if(authSub.Split("|")[2] != tournamentDto.AddedById.ToString()) {
                return Unauthorized(new { message = "Faild to authorize Update"});
            }


            try
            {
                _tournamentService.Update(_mapper.Map<Tournament>(tournamentDto));
                
            }
            catch (ConflitctException)
            {
                return Conflict(new { title = "Conflict", status = "409", detail = "This Tournament already have a team with this Team Name", });
            }

            catch (Exception err)
            {
                Console.WriteLine(err);
                throw;
            }

            return NoContent();
        }

        // [HttpDelete("{id}")]
        // [Authorize]
        // public ActionResult DeleteTournament(int id)
        // {
        //     _tournamentService.Delete(id);
        //     return NoContent();
        // }
        
        [HttpGet("player/{id}")]
        // Get tournaments where player id is {id}
        public ActionResult<List<TournamentDto>> GetTournamentsByPlayerId(int id) {
            var tournaments = _tournamentService.GetByPlayerId(id);
            var tournamentDtos = _mapper.Map<List<TournamentDto>>(tournaments);
            return tournamentDtos;

        }

    }
}
