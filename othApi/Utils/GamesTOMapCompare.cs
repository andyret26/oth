
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
                if (score.Match.Team == matchInfo.Team2Color)
                    map.Score2 += score.Score;
            }

            var g1Map = games1.SingleOrDefault(g1 => g1.Beatmap!.Beatmapset.Title == g2.Beatmap!.Beatmapset.Title);
            if (g1Map == null)
            {
                map.Score1 = 0;
                map.Diff = 0;
                maps.Add(map);
                continue;
            }

            foreach (var score in g1Map.Scores)
            {
                if (score.Match.Team == matchInfo.Team1Color)
                    map.Score1 += score.Score;
            }

            map.Diff = map.Score1 - map.Score2;

            maps.Add(map);

        }

        return maps;
    }
}