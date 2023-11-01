
using System.Diagnostics;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Entities;
using othApi.Services.OsuApi;
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

        public TournamentsController(ITournamentService tournamentService, IMapper mapper, IOsuApiService osuApiService)
        {
            _tournamentService = tournamentService;
            _mapper = mapper;
            _osuApiService = osuApiService;
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
        public ActionResult<TournamentDto> PostTournament([FromBody] TournamentPostDto tournament)
        {
            Console.WriteLine(_osuApiService.GetToken().Result);
            // var tournamentToPost = _mapper.Map<Tournament>(tournament);
            // var addedTournament = _tournamentService.Post(tournamentToPost);
            // var tournamentDto = _mapper.Map<TournamentDto>(addedTournament);
            // return CreatedAtAction("GetTournament", new { id = addedTournament.Id }, tournamentDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTournament(int id)
        {
            _tournamentService.Delete(id);
            return NoContent();
        }


    }
}
