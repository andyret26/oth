namespace othApi.Data.Entities.Otm;

public class HostedTournament
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? FormuPostLink { get; set; }



    public List<Player>? Players { get; set; }
    public List<Staff>? Staff { get; set; }

    public int HostId { get; set; }
    public Host Host { get; set; } = null!;
}