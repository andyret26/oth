using System.ComponentModel.DataAnnotations;

namespace othApi.Data.Entities.Otm;

public class HostedTournament
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? FormuPostLink { get; set; }
    public List<Round>? Rounds { get; set; }



    public List<Player>? Players { get; set; }
    public List<Team>? Teams { get; set; }
    public List<Staff>? Staff { get; set; }

    public int HostId { get; set; }
    public Host Host { get; set; } = null!;
}

public class Team
{
    public int Id { get; set; }
    public string TeamName { get; set; } = null!;
    public List<Player>? Players { get; set; }
}

public class Round
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public List<TMap>? Mappool { get; set; }
}

public class TMap
{
    [Key]
    public int Id { get; set; }
    public int OrderNumber { get; set; }
    public string? Image { get; set; }
    public string Mod { get; set; } = null!;
    public string Name { get; set; } = null!;
    public decimal Sr { get; set; }
    public int Bpm { get; set; }
    public decimal Length { get; set; }
    public decimal Cs { get; set; }
    public decimal Ar { get; set; }
    public decimal Od { get; set; }
    public string Mapper { get; set; } = null!;

    public string? Link { get; set; }

}