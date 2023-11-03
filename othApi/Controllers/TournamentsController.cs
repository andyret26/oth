
using System.Diagnostics;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Entities;
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
        private readonly ITournamentService _tournamentService;
        private readonly IMapper _mapper;
        private readonly IOsuApiService _osuApiService;
        private readonly IPlayerService _playerService;

        public TournamentsController(ITournamentService tournamentService, IMapper mapper, IOsuApiService osuApiService, IPlayerService playerService)
        {
            _tournamentService = tournamentService;
            _mapper = mapper;
            _osuApiService = osuApiService;
            _playerService = playerService;
        }

        [HttpGet]
        public ActionResult<List<Tournament>> GetTournaments()
        {
            var tournaments = _tournamentService.Get();
            var tournamentDtos = _mapper.Map<List<Tournament>>(tournaments);
            return tournamentDtos;
        }

        [HttpGet("{id}")]
        public ActionResult<Tournament> GetTournament(int id)
        {
            var tournament = _tournamentService.GetById(id);
            var tournamentDto = _mapper.Map<Tournament>(tournament);
            return tournamentDto;
        }

        [HttpPost]
        public async Task<ActionResult<TournamentDto>> PostTournament([FromBody] TournamentPostDto tournament)
        {
            var tournamentToPost = _mapper.Map<Tournament>(tournament);
            var addedTournament = _tournamentService.Post(tournamentToPost);


            if (tournament.TeamMatesIds != null) {
                // Check if players exists in db if not add them
                var playersDoNotExists = await _osuApiService.GetPlayers(tournament.TeamMatesIds);
                if (playersDoNotExists != null) {
                    foreach (var player in playersDoNotExists)
                    {
                        _playerService.Post(player);
                    }
                }

                //  Get Players from db
                var teamMatesToAdd = _playerService.GetMultipleById(tournament.TeamMatesIds);
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

        [HttpDelete("{id}")]
        public ActionResult DeleteTournament(int id)
        {
            _tournamentService.Delete(id);
            return NoContent();
        }

        [HttpGet("token")]
        public ActionResult<string> GetToken() {
            
            return _osuApiService.GetToken().Result;
        }

    }
}
