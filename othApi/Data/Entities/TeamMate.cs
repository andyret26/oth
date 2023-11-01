using System.ComponentModel.DataAnnotations;

namespace othApi.Data.Entities;
public class TeamMate
{
    public int Id { get; set; }
    public int User_id { get; set; }
    public string Username { get; set; } = null!;
    public int Pp_rank { get; set; }
    public string Country { get; set; } = null!;
}