namespace othApi.Data.Dtos;
public class PlayerPostDto
{
    public int User_id { get; set; }
    public string Username { get; set; } = null!;
    public int Pp_rank { get; set; }
    public string Country { get; set; } = null!;
}