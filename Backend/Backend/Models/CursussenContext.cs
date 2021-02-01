using System.Data.Entity;

namespace Backend.Models
{
    public class CursussenContext: DbContext
    {
        public CursussenContext()
        {
            Database.SetInitializer<CursussenContext>(new DropCreateDatabaseIfModelChanges<CursussenContext>());
        }
        public DbSet<Cursus> Cursussen { get; set; }
        public DbSet<CursusInstantie> CursusInstanties { get; set; }
    }
}