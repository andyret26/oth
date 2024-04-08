namespace othApi.Data.Dtos.OtmDtos;

public class OTMPostTourneyDto
{
    public string Name { get; set; } = null!;
    public string? FormuPostLink { get; set; }

    public bool IsTeamTourney { get; set; }
    public string Format { get; set; } = null!;
    public int MaxTeamSize { get; set; }
    public string RankRange { get; set; } = null!;
}