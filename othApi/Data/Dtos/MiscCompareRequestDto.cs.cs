namespace othApi.Data.Dtos;

public class MiscCompareRequestDto
{
    public int MatchId1 { get; set; }
    public int MatchId2 { get; set; }
    public int IgnoreStart1 { get; set; }
    public int IgnoreStart2 { get; set; }
    public int IgnoreEnd1 { get; set; }
    public int IgnoreEnd2 { get; set; }
    public int TeamType { get; set; }

    public int? Team1Color { get; set; }
    public int? Team2Color { get; set; }

    public string? Team1Name { get; set; }
    public string? Team2Name { get; set; }
}