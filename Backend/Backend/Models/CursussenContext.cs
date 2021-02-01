using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class CursussenContext: DbContext
    {
        public DbSet<Cursus> Cursussen { get; set; }
        public DbSet<CursusInstantie> CursusInstanties { get; set; }

        public System.Data.Entity.DbSet<Backend.Models.AntwoordCursus> AntwoordCursus { get; set; }
    }
}