using othApi.Data.Entities;

namespace othApi.Data.Dtos;
public class TournamentPostDto
{
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
    public List<int>? TeamMatesIds { get; set; }

}