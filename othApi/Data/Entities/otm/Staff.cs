namespace othApi.Data.Entities.Otm
{
    public class Staff
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public List<string> Roles { get; set; } = null!;
        public List<HostedTournament> Tournaments { get; set; } = null!;
    }
}