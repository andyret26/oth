
using othApi.Data;
using othApi.Data.Dtos;

namespace othApi.Utils;

public class GamesToMapCompare
{
    public static List<Map> Compare(List<Game> games1, List<Game> games2, MiscCompareRequestDto matchInfo)
    {
        var maps = new List<Map>();

        foreach (var g2 in games2)
        {
            var map = new Map
            {
                Artist = g2.Beatmap!.Beatmapset.Artist,
                Title = g2.Beatmap.Beatmapset.Title,
                Mods = g2.Mods.ToList(),
            };

            foreach (var score in g2.Scores)
            {
                if (matchInfo.TeamType == "teams" && score.Match.Team == matchInfo.Team2Color)
                {
                    map.Score2 += score.Score;
                }
                else if (matchInfo.TeamType == "h2h" && score.User_id == matchInfo.User2Id)
                {
                    map.Score2 += score.Score;
                }

            }

            var g1Map = games1.FirstOrDefault(g1 => g1.Beatmap!.Id == g2.Beatmap!.Id);
            if (g1Map == null)
            {
                map.Score1 = 0;
                map.Diff = 0;
                maps.Add(map);
                continue;
            }

            foreach (var score in g1Map.Scores)
            {
                if (matchInfo.TeamType == "teams" && score.Match.Team == matchInfo.Team1Color)
                {
                    map.Score1 += score.Score;
                }
                else if (matchInfo.TeamType == "h2h" && score.User_id == matchInfo.User1Id)
                {
                    map.Score1 += score.Score;
                }

            }

            map.Diff = map.Score1 - map.Score2;

            maps.Add(map);

        }

        return maps;
    }

    public static List<MapV1> CompareV1(List<GameV1> games1, List<GameV1> games2, MiscCompareRequestDto matchInfo)
    {
        var teamCode1 = matchInfo.Team1Color == "red" ? 2 : 1;
        var teamCode2 = matchInfo.Team2Color == "red" ? 2 : 1;
        games1 = games1.Skip(matchInfo.IgnoreStart1).SkipLast(matchInfo.IgnoreEnd1).ToList();
        games2 = games2.Skip(matchInfo.IgnoreStart2).SkipLast(matchInfo.IgnoreEnd2).ToList();

        var res = new List<MapV1>();

        foreach (var g2 in games2)
        {
            var map = new MapV1
            {
                Beatmap_id = g2.Beatmap_id,
                Diff = 0,
                Score1 = 0,
                Score2 = 0,
                Mods = g2.Mods
            };

            foreach (var s in g2.Scores)
            {
                if (teamCode2 == s.Team || matchInfo.User2Id == s.User_id)
                {
                    map.Score2 += s.Score;
                }

            }
            var g1Map = games1.FirstOrDefault(g1 => g1.Beatmap_id == g2.Beatmap_id);
            if (g1Map != null)
            {

                foreach (var s in g1Map.Scores)
                {
                    if (teamCode1 == s.Team || matchInfo.User1Id == s.User_id)
                    {
                        map.Score1 += s.Score;
                    }
                }

            }

            map.Diff = map.Score1 - map.Score2;

            if (map.Score1 == 0 || map.Score2 == 0) map.Diff = 0;

            res.Add(map);
        }

        return res;
    }
}