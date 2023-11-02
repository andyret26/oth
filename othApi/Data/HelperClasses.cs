namespace othApi.Data;


public class ManyPlayersResponseData
{
    public PlayerResponseData[] Users { get; set; }  = null!;
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
