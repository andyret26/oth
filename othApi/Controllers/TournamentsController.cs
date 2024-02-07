
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
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
    [EnableRateLimiting("fixed")]
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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<TournamentDto>> PostTournament([FromBody] TournamentPostDto tournament)
        {
            try
            {
                if (_tournamentService.TournamentWithTeamNameExists(tournament.TeamName, tournament.Name))
                {
                    return Conflict(new { title = "Conflict", status = "409", detail = "This Tournament already have a team with this Team Name", });
                }

                var tournamentToPost = _mapper.Map<Tournament>(tournament);
                var addedTournament = await _tournamentService.PostAsync(tournamentToPost);


                if (tournament.TeamMateIds != null)
                {
                    // Check if players exists in db if not add them
                    var playersDoNotExists = await _osuApiService.GetPlayers(tournament.TeamMateIds);
                    if (playersDoNotExists != null)
                    {
                        foreach (var player in playersDoNotExists)
                        {
                            _playerService.Post(player);
                        }
                    }

                    //  Get Players from db
                    var teamMatesToAdd = _playerService.GetMultipleById(tournament.TeamMateIds);
                    if (teamMatesToAdd == null)
                    {
                        return NotFound("One or more players do not exist in the database");
                    }
                    var resTournament = _tournamentService.AddTeamMates(teamMatesToAdd, addedTournament.Id);

                    var tDto = _mapper.Map<TournamentDto>(resTournament);

                    return CreatedAtAction("GetTournament", new { id = tDto.Id }, tDto);
                }
                else
                {
                    var tDto = _mapper.Map<TournamentDto>(addedTournament);

                    return CreatedAtAction("GetTournament", new { id = tDto.Id }, tDto);
                }
            }
            catch (NotFoundException)
            {
                return NotFound(new { title = "NotFound", status = "404", detail = "Forum post not found.", });
            }

        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> PutTournament(int id, [FromBody] TournamentPutDto tournamentDto)
        {
            var authSub = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            _logger.LogInformation("User with id {id} is trying to update tournament with id {tournamentId}", authSub.Split("|")[2], id);
            if (authSub.Split("|")[2] != tournamentDto.AddedById.ToString())
            {
                return Unauthorized(new { message = "Faild to authorize Update" });
            }


            try
            {
                var updatedTourney1 = await _tournamentService.UpdateAsync(_mapper.Map<Tournament>(tournamentDto));
                var updatedTourney2 = await _tournamentService.UpdateTeamMatesAsync(id, tournamentDto.TeamMateIds);
                if (updatedTourney1 == null || updatedTourney2 == null)
                {
                    return NotFound(new
                    {
                        detail = "One or more players do not exist in the database",
                        type = "NotFound",
                        status = "404",
                    });
                }

            }
            catch (ConflitctException)
            {
                return Conflict(new { title = "Conflict", status = "409", detail = "This Tournament already have a team with this Team Name", });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Faild to authorize Update" });
            }
            catch (Exception err)
            {
                Console.WriteLine(err);
                throw;
            }

            return NoContent();
        }

        /**
         * Get Tournaments by player id
         */
        [HttpGet("player/{id}")]
        public ActionResult<List<TournamentDto>> GetTournamentsByPlayerId(int id)
        {
            var tournaments = _tournamentService.GetByPlayerId(id);
            var tournamentDtos = _mapper.Map<List<TournamentDto>>(tournaments);
            return tournamentDtos;

        }

        // [HttpGet("update_tournament_to_include_img")]
        // public async Task<ActionResult> UpdateTournamentToIncludeImg()
        // {
        //     var tournaments = _tournamentService.Get();
        //     foreach (var t in tournaments)
        //     {
        //         if (!t.ForumPostLink.IsNullOrEmpty() && t.ImageLink == null)
        //         {
        //             System.Console.WriteLine("\n\n ######### \n\n");
        //             System.Console.WriteLine(t.Name);
        //             System.Console.WriteLine("\n\n ######### \n\n");
        //             var mateIds = new List<int>();
        //             foreach (var mate in t.TeamMates!)
        //             {
        //                 mateIds.Add(mate.Id);
        //             }
        //             System.Console.WriteLine(t.ForumPostLink);
        //             var i = await _osuApiService.GetForumPostCover(t.ForumPostLink.Split("/")[6]);
        //             t.ImageLink = i;
        //             await _tournamentService.UpdateAsync(t);
        //             await _tournamentService.UpdateTeamMatesAsync(t.Id, mateIds.ToArray());
        //             mateIds.Clear();
        //         }
        //     }

        //     return Ok();
        // }

    }
}
