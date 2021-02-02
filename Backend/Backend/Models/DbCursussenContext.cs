using System.Data.Entity;

namespace Backend.Models
{
    public class DbCursussenContext : DbContext, IDbCursussenContext
    {
        public DbCursussenContext()
        {
            Database.SetInitializer(new DropCreateDatabaseAlways<DbCursussenContext>());
        }
        public DbSet<Cursus> Cursussen { get; set; }
        public DbSet<CursusInstantie> CursusInstanties { get; set; }
    }
}