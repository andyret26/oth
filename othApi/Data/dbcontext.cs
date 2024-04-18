namespace othApi.Data;

using Microsoft.EntityFrameworkCore;
using othApi.Data.Entities;
using othApi.Data.Entities.Otm;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Tournament> Tournaments { get; set; } = null!;
    public DbSet<Player> Players { get; set; } = null!;

    public DbSet<Host> OtmHosts { get; set; } = null!;
    public DbSet<HostedTournament> OtmTournaments { get; set; } = null!;
    public DbSet<Staff> OtmStaff { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // OTH
        modelBuilder.Entity<Player>()
            .HasMany(p => p.Tournaments)
            .WithMany(t => t.TeamMates)
            .UsingEntity(j => j.ToTable("PlayerTournament"));


        modelBuilder.Entity<Tournament>()
            .HasOne(t => t.AddedBy)
            .WithMany()
            .HasForeignKey(t => t.AddedById);

        // OTM
        modelBuilder.Entity<Host>()
            .HasMany(h => h.Tournaments)
            .WithOne(t => t.Host)
            .HasForeignKey(t => t.HostId);

        modelBuilder.Entity<HostedTournament>()
            .HasMany(t => t.Staff)
            .WithMany(s => s.Tournaments)
            .UsingEntity(j => j.ToTable("OtmTournamentStaff"));

        modelBuilder.Entity<HostedTournament>()
            .HasMany(t => t.Players)
            .WithMany(p => p.OtmTournaments)
            .UsingEntity(j => j.ToTable("OtmTournamentPlayer"));

        modelBuilder.Entity<Team>()
            .HasMany(t => t.Players)
            .WithMany(p => p.Teams)
            .UsingEntity(j => j.ToTable("OtmTeamPlayer"));

        modelBuilder.Entity<Stats>()
            .HasKey(s => new { s.MapId, s.PlayerId });




        base.OnModelCreating(modelBuilder);

    }
}