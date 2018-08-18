using ERP.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ERP.EntityFramework
{
    public class ERPContext : DbContext
    {
        public ERPContext(DbContextOptions<ERPContext> options)
        : base(options)
        {

        }

        public DbSet<Mill> Mill { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Fabric> Fabrics { get; set; }
        public DbSet<FabricType> FabricTypes { get; set; }
        public DbSet<MillFabric> MillFabrics { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MillFabric>()
           .HasKey(bc => new { bc.MillId, bc.FabricId });

            builder.Entity<MillFabric>()
                .HasOne(bc => bc.Mill)
                .WithMany(b => b.MillFabrics)
                .HasForeignKey(bc => bc.MillId);

            builder.Entity<MillFabric>()
                .HasOne(bc => bc.Fabric)
                .WithMany(c => c.MillFabrics)
                .HasForeignKey(bc => bc.FabricId);

        }
    }
}
