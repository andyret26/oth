namespace othApi.Data;

using Microsoft.EntityFrameworkCore;
using othApi.Data.Entities;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Tournament> Tournaments { get; set; } = null!;
    public DbSet<Player> Players { get; set; } = null!;


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


        base.OnModelCreating(modelBuilder);

    }
}