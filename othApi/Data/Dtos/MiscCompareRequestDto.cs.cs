namespace othApi.Data.Dtos;

public class MiscCompareRequestDto
{
    public long MatchId1 { get; set; }
    public long MatchId2 { get; set; }
    public int IgnoreStart1 { get; set; }
    public int IgnoreStart2 { get; set; }
    public int IgnoreEnd1 { get; set; }
    public int IgnoreEnd2 { get; set; }
    public string TeamType { get; set; } = null!;

    public string? Team1Color { get; set; }
    public string? Team2Color { get; set; }

    public int User1Id { get; set; }
    public int User2Id { get; set; }
}