namespace othApi.Data;

public class ManyPlayersResponseData
{
    public PlayerResponseData[] Users { get; set; } = null!;
}

public class PlayerResponseData
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Avatar_url { get; set; } = null!;
    public int Global_rank { get; set; }
    public string Country_code { get; set; } = null!;
    public Statistics_rulesets Statistics_rulesets { get; set; } = null!;
}

public class Statistics_rulesets
{
    public Osu Osu { get; set; } = null!;

}

public class Osu
{
    public int? Global_rank { get; set; }

}


public class PlayerStats
{
    public int TotalTournaments { get; set; }
    public int UniqueTeamMatesCount { get; set; }
    public int UniqueFlagCount { get; set; }
    public int FirstPlaces { get; set; }
    public int SecondPlaces { get; set; }
    public int ThirdPlaces { get; set; }
    public decimal FirstRate { get; set; }
    public decimal Top3Rate { get; set; }
    public decimal? AvgPlacement { get; set; }
}

public class TopicResponseObj
{
    public Post[] Posts { get; set; } = null!;
}

public class Post
{
    public string Id { get; set; } = null!;
    public Body Body { get; set; } = null!;
}

public class Body
{
    public string Html { get; set; } = null!;
    public string Raw { get; set; } = null!;
}


//match classes

public class MatchResponseObj
{
    public Event[] Events { get; set; } = null!;
}

public class Event
{
    public Game? Game { get; set; } = null!;
}

public class Game
{
    public long Beatmap_id { get; set; }
    public string Team_type { get; set; } = null!;
    public string[] Mods { get; set; } = null!;
    public Beatmap? Beatmap { get; set; }
    public ScoreObj[] Scores { get; set; } = null!;

}

public class Beatmap
{
    public long Id { get; set; }
    public long Beatmapset_id { get; set; }
    public Beatmapset Beatmapset { get; set; } = null!;
}

public class Beatmapset
{
    public string Artist { get; set; } = null!;
    public string Title { get; set; } = null!;

}

public class ScoreObj
{
    public double Accuracy { get; set; }
    public int Score { get; set; }
    public Match Match { get; set; } = null!;
    public int User_id { get; set; }
}

public class Match
{
    public string Team { get; set; } = null!;
}


public class Map
{
    public string Title { get; set; } = null!;
    public string Artist { get; set; } = null!;
    public List<string> Mods { get; set; } = null!;
    public int Score1 { get; set; }
    public int Score2 { get; set; }
    public int Diff { get; set; }
}