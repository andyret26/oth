using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using othApi.Data.Entities.Otm;
using othApi.Services.OsuApi;
using othApi.Services.Otm.HostService;
using othApi.Services.Players;
using othApi.Utils;

namespace othApi.Controllers.Otm;

[Route("api/v1/otm/host")]
[ApiController()]
[Tags("OTM Host")]
[Consumes("application/Json")]
[Produces("application/Json")]
public class HostController : ControllerBase
{
    private readonly IPlayerService _playerService;
    private readonly IOsuApiService _osuApiService;
    private readonly IHostService _hostService;

    public HostController(
        IPlayerService playerService,
        IOsuApiService osuApiService,
        IHostService hostService
        )
    {
        _playerService = playerService;
        _osuApiService = osuApiService;
        _hostService = hostService;
    }

    [HttpPost("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [Authorize]
    public async Task<ActionResult> PostHost(int id)
    {
        var tokenSub = User.FindFirst(ClaimTypes.NameIdentifier);
        if (tokenSub == null) return Unauthorized(new ErrorResponse("Unauthorized", 401, "Invalid token"));
        if (tokenSub.Value.Split("|")[2] != id.ToString()) return Unauthorized(new ErrorResponse("Unauthorized", 401, "Token does not match id"));

        if (await _hostService.ExistsAsync(id)) return Conflict(new ErrorResponse("Conflict", 409, "Host already exists"));

        try
        {

            var player = _playerService.GetById(id);
            if (player == null)
            {
                var players = await _osuApiService.GetPlayers(new List<int> { id });
                if (players!.Length == 0) return NotFound();
                player = _playerService.Post(players[0]);
            }
            var newHost = new Data.Entities.Otm.Host
            {
                Id = player.Id,
                Username = player.Username,
            };

            var addedHost = await _hostService.AddAsync(newHost);
            return CreatedAtAction(null, addedHost); // cahnge to created at when get by id is made
        }
        catch (System.Exception)
        {

            throw;
        }
    }
}