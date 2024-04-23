namespace othApi.Data.Entities;
public class Player
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string? DiscordTag { get; set; }
    public string Avatar_url { get; set; } = null!;
    public int Global_rank { get; set; }
    public string Country_code { get; set; } = null!;
    public List<Tournament>? Tournaments { get; set; }

}