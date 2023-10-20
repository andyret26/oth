namespace WebApi.Helpers;

using Microsoft.EntityFrameworkCore;
using othApi.dbModels;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base (options) {}
    public DbSet<Tournament> Tournaments { get; set; } = null!;
    public DbSet<Player> Players { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


    }
}