using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using othApi.Data.Dtos.OtmDtos;
using othApi.Data.Entities.Otm;

namespace othApi.Controllers.Otm;

[Route("api/v1/otm/tournament")]
[ApiController]
[Tags("OTM Tournament")]
[Produces("application/Json")]
[Consumes("application/Json")]
public class OTMTournamentController : ControllerBase
{
    private readonly IMapper _mapper;

    public OTMTournamentController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpPost]
    public ActionResult PostTournament(OTMPostTourneyDto dto)
    {
        var authSub = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
        if (authSub == null) return Unauthorized();

        var tToAdd = _mapper.Map<HostedTournament>(dto);
        tToAdd.HostId = int.Parse(authSub.Split("|")[2]);



        return Ok();
    }

}