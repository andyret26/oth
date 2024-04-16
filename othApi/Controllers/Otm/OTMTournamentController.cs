using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using othApi.Data.Dtos.OtmDtos;
using othApi.Data.Entities.Otm;
using othApi.Data.Exceptions;
using othApi.Services.OsuApi;
using othApi.Services.Otm.HostedTournamentService;
using othApi.Services.Players;
using othApi.Utils;

namespace othApi.Controllers.Otm;

[Route("api/v1/otm/tournament")]
[ApiController]
[Tags("OTM Tournament")]
[Produces("application/Json")]
[Consumes("application/Json")]
public class OTMTournamentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IOtmTourneyService _tourneyService;
    private readonly IOsuApiService _osuApiService;
    private readonly IPlayerService _playerService;

    public OTMTournamentController(
        IMapper mapper,
        IOtmTourneyService tourneyService,
        IOsuApiService osuApiService,
        IPlayerService playerService
        )
    {
        _mapper = mapper;
        _tourneyService = tourneyService;
        _osuApiService = osuApiService;
        _playerService = playerService;
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(OtmTournamentDto))]
    public async Task<ActionResult<OtmTournamentDto>> PostTournament(OTMPostTourneyDto dto)
    {
        var authSub = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        if (authSub == null) return Unauthorized();

        try
        {
            var tToAdd = _mapper.Map<HostedTournament>(dto);
            tToAdd.HostId = int.Parse(authSub.Split("|")[2]);

            var addedTourney = await _tourneyService.AddAsync(tToAdd);
            var dtoToReturn = _mapper.Map<OtmTournamentDto>(addedTourney);

            return CreatedAtAction("GetTournament", new { id = addedTourney.Id }, dtoToReturn);
        }
        catch (Microsoft.EntityFrameworkCore.DbUpdateException e)
        {
            Npgsql.PostgresException ex = (Npgsql.PostgresException)e.InnerException!;
            if (ex.SqlState == "23505") return Conflict(new ErrorResponse("Conflict", 409, "Tournament with that name already exists"));
            if (ex.SqlState == "23514") return UnprocessableEntity(new ErrorResponse("Unprocessable Entity", 422, "Some fields are missing or invalid"));
            return BadRequest("Something went wrong");
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OtmTournamentDto))]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<OtmTournamentDto>> GetTournament(int id)
    {
        try
        {
            var tourney = await _tourneyService.GetByIdAsync(id);
            var dtoToReturn = _mapper.Map<OtmTournamentDto>(tourney);
            return Ok(dtoToReturn);

        }
        catch (NotFoundException e)
        {
            return NotFound(new ErrorResponse("Not Found", 404, e.Message));
        }
    }

    [HttpPost("{tournamentId}/register-team")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OtmTournamentDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]

    public async Task<ActionResult> RegisterTeam(int tournamentId, OtmRegistrationDto regsDto)
    {
        if (regsDto.TeamName.IsNullOrEmpty()) return BadRequest(new ErrorResponse("Bad Request", 400, "Team name is required"));
        if (await _tourneyService.TeamNameExistsInTournamentAsync(tournamentId, regsDto.TeamName)) return Conflict(new ErrorResponse("Conflict", 409, "Team with that name already exists in this tournament"));

        var playersThatHasTeam = await _tourneyService.PlayerExistsInTeamTournamentAsync(tournamentId, regsDto.Players.Select(p => p.OsuUserId).ToList());
        if (playersThatHasTeam.Count > 0) return Conflict(new ErrorResponse("Conflict", 409, $"These players alread is in a team: {string.Join(',', playersThatHasTeam)}"));


        if (regsDto.Players.Count <= 1) return BadRequest(new ErrorResponse("Bad Request", 400, "You need at least 2 players to register a team"));

        // Remove players with no osu id
        regsDto.Players.Where(p => p.OsuUserId == 0).ToList().ForEach(p => regsDto.Players.Remove(p));


        List<int> playerIds = new();
        regsDto.Players.ForEach(p => playerIds.Add(p.OsuUserId));
        try
        {
            var playersToAddToDb = await _osuApiService.GetPlayers(playerIds);
            if (playersToAddToDb != null) await _playerService.AddMultipleAsync(playersToAddToDb!.ToList());


            foreach (var p in regsDto.Players)
            {
                await _playerService.UpdateDiscordUsername(p.OsuUserId, p.DiscordUsername);
            }

            Team team = new()
            {
                TeamName = regsDto.TeamName,
                Players = await _playerService.GetMultipleById(playerIds)
            };

            var TournamentTeamGotAddedTo = await _tourneyService.AddTeamAsync(tournamentId, team);
            return Ok(_mapper.Map<OtmTournamentDto>(TournamentTeamGotAddedTo));


        }
        catch (NotFoundException e)
        {
            return NotFound(new ErrorResponse("Not Found", 404, e.Message));
        }
        catch (System.Exception)
        {

            throw;
        }

    }

}