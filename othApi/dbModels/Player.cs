namespace othApi.dbModels;
public class Player
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Rank { get; set; }
    public string Country { get; set; } = null!;
    public List<Tournament>? Tournaments { get; set; }
}