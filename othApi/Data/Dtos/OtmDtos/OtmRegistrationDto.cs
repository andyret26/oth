namespace othApi.Data.Dtos.OtmDtos;

public class OtmRegistrationDto
{
    public int TournamentId { get; set; }
    public string TeamName { get; set; } = null!;
    public List<PlayerRegistration> Players { get; set; } = null!;
}

public class PlayerRegistration
{
    public int OsuUserId { get; set; }
    public string DiscordUsername { get; set; } = null!;
}