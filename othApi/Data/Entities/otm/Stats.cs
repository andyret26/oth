namespace othApi.Data.Entities.Otm;

public class Stats
{
    public int MapId { get; set; }
    public TMap Map { get; set; } = null!;

    public int PlayerId { get; set; }
    public Player Player { get; set; } = null!;

    public int Score { get; set; }
    public decimal Acc { get; set; }
    public List<string>? Mods { get; set; } = null!;

    public int RoundId { get; set; }
    public Round Round { get; set; } = null!;
}