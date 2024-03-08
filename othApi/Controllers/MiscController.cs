using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Newtonsoft.Json;
using othApi.Data;
using othApi.Data.Dtos;
using othApi.Data.Exceptions;
using othApi.Services.OsuApi;
using othApi.Utils;

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
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<List<Map>>> CompareMatches([FromBody] MiscCompareRequestDto matchInfo)
    {
        try
        {
            var games1 = await _osuApiService.GetMatchGamesAsync(matchInfo.MatchId1);
            var games2 = await _osuApiService.GetMatchGamesAsync(matchInfo.MatchId2);

            games1 = games1.Skip(matchInfo.IgnoreStart1).SkipLast(matchInfo.IgnoreEnd1).Where(e => e.Beatmap != null).ToList();
            games2 = games2.Skip(matchInfo.IgnoreStart2).SkipLast(matchInfo.IgnoreEnd2).Where(e => e.Beatmap != null).ToList();

            var maps = GamesToMapCompare.Compare(games1, games2, matchInfo);
            return Ok(maps);
        }
        catch (MatchNotFoundException e)
        {
            return NotFound(new { title = "NotFound", status = "404", detail = e.Message, });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }


    }

    [HttpPost("qual-stats")]
    public async Task<ActionResult> GetQualStats()
    {
        // var titles = FetchData.FetchSheetData();
        // var test = await _osuApiService.GetUrlData("https://osu.ppy.sh/community/matches/112765313");
        // System.Console.WriteLine(test);

        // await _osuApiService.GetMatchesAsync(new List<int> { 112765313, 112806192, 112815084, 112826811, 112827493, 112904147, 112908040, 112921293, 112924861, 112923123, 112924861 });
        return Ok();
    }
}