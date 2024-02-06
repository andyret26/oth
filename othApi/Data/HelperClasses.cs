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