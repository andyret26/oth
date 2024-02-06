namespace othApi.Data.Entities;
public class Tournament
{
    public int Id { get; set; }
    public DateTime? Date { get; set; }
    public string Name { get; set; } = null!;
    public string? TeamName { get; set; }
    public string? ForumPostLink { get; set; }
    public string? MainSheetLink { get; set; }
    public string? BracketLink { get; set; }
    public string? RankRange { get; set; }
    public int? Seed { get; set; }
    public string? Format { get; set; }
    public string? TeamSize { get; set; }
    public string? Placement { get; set; }
    public string? Notes { get; set; }
    public string? ImageLink { get; set; }
    public List<Player>? TeamMates { get; set; }

    public Player AddedBy { get; set; } = null!; // Add this property
    public int AddedById { get; set; } = 3191010;// Add this property

}