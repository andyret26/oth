namespace othApi.dbModels;
public class Tournament
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? TeamName { get; set; }
    public DateTime? Start { get; set; }
    public string? RankRange { get; set; }
    public string? Format { get; set; }
    public int? Seed { get; set; }
    public int? Placement { get; set; }
    public string? Notes { get; set; }
    public List<Player>? TeamMates { get; set; }

}