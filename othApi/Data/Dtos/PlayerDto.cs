using othApi.Data.Entities;

namespace othApi.Data.Dtos;
public class PlayerDto
{
    public int User_id { get; set; }
    public string Username { get; set; } = null!;
    public int Pp_rank { get; set; }
    public string Country { get; set; } = null!;
    public List<Tournament>? Tournaments { get; set; }
}