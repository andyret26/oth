using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Services.OsuApi;

namespace othApi.Controllers;

[Route("api/v1/misc")]
[EnableRateLimiting("fixed")]
public class MiscController : ControllerBase
{
    private readonly IOsuApiService _osuApiService;

    public MiscController(IOsuApiService osuApiService)
    {
        _osuApiService = osuApiService;
    }

    [HttpPost("compare-matches")]
    [Consumes("application/Json")]
    [Produces("application/Json")]
    [ProducesResponseType(200, Type = typeof(MiscCompareResponseDto))]
    [ProducesResponseType(404)]
    public async Task<ActionResult<MiscCompareResponseDto>> CompareMatches([FromBody] MiscCompareRequestDto matchInfo)
    {
        var match1 = await _osuApiService.GetMatchInfo(matchInfo.MatchId1);
        var events = match1.Events.Where(e => e.Game != null).ToList();


        var maps = new List<Map>();

        foreach (var e in events)
        {
            if (e.Game!.Beatmap == null) continue;
            var map = new Map
            {
                Artist = e.Game!.Beatmap.Beatmapset.Artist,
                Title = e.Game.Beatmap.Beatmapset.Title,
                Mods = e.Game.Mods.ToList(),
            };

            maps.Add(map);

        }


        return Ok(maps);
    }
}