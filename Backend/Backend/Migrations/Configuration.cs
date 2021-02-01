namespace Backend.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Backend.Models.DbCursussenContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Backend.Models.DbCursussenContext context)
        {
            context.Cursussen.AddOrUpdate(c => c.Id,
                new Models.Cursus() { Id = 999, Naam = "test cursus", Duur = 5 },
                new Models.Cursus() { Id = 998, Naam = "tweede test cursus", Duur = 3 }
                );
            context.CursusInstanties.AddOrUpdate(ci => ci.Id,
                new Models.CursusInstantie() { Id = 899, Startdatum = new DateTime(2021, 2, 1), CursusId = 999 },
                new Models.CursusInstantie() { Id = 898, Startdatum = new DateTime(2021, 2, 8), CursusId = 999 },
                new Models.CursusInstantie() { Id = 897, Startdatum = new DateTime(2021, 2, 15), CursusId = 999 },
                new Models.CursusInstantie() { Id = 896, Startdatum = new DateTime(2021, 2, 1), CursusId = 998 },
                new Models.CursusInstantie() { Id = 895, Startdatum = new DateTime(2021, 2, 3), CursusId = 998 }
                );
        }
    }
}
