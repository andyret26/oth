namespace othApi.Data.Dtos.OtmDtos;

public class OtmTournamentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? FormuPostLink { get; set; }
    public bool IsTeamTourney { get; set; }
    public string Format { get; set; } = null!;
    public int MaxTeamSize { get; set; }
    public string RankRange { get; set; } = null!;

    public List<RoundDto>? Rounds { get; set; }
    public List<OtmDashboardPlayerDto>? Players { get; set; }
    public List<TeamDto>? Teams { get; set; }
    public List<StaffDto>? Staff { get; set; }
}

public class StaffDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public List<string> Roles { get; set; } = null!;
}

public class TeamDto
{
    public int Id { get; set; }
    public string TeamName { get; set; } = null!;
    public List<OtmDashboardPlayerDto>? Players { get; set; }
}

public class OtmDashboardPlayerDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Avatar_url { get; set; } = null!;
    public int Global_rank { get; set; }
    public string Country_code { get; set; } = null!;
}

public class RoundDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}