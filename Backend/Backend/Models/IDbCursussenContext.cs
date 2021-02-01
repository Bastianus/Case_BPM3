using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Backend.Models
{
    public interface IDbCursussenContext : IDisposable
    {
        DbSet<Cursus> Cursussen { get; set; }
        DbSet<CursusInstantie> CursusInstanties { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}