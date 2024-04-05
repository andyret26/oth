using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using othApi.Data.Dtos.OtmDtos;
using othApi.Data.Entities.Otm;
using othApi.Services.Otm.HostedTournamentService;

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

    public OTMTournamentController(IMapper mapper, IOtmTourneyService tourneyService)
    {
        _mapper = mapper;
        _tourneyService = tourneyService;
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(OtmDashboardDto))]
    public async Task<ActionResult<OtmDashboardDto>> PostTournament(OTMPostTourneyDto dto)
    {
        var authSub = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        if (authSub == null) return Unauthorized();

        var tToAdd = _mapper.Map<HostedTournament>(dto);
        tToAdd.HostId = int.Parse(authSub.Split("|")[2]);

        var addedTourney = await _tourneyService.AddAsync(tToAdd);
        var dtoToReturn = _mapper.Map<OtmDashboardDto>(addedTourney);



        return CreatedAtAction(null, new { id = addedTourney.Id }, dtoToReturn);
    }

}