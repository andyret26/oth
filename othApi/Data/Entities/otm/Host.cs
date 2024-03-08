namespace othApi.Data.Entities.Otm;

public class Host
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;

    public List<HostedTournament>? Tournaments { get; set; }

}
