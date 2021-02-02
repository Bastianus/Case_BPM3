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
                new Models.Cursus() { Id = 1, Naam = "test cursus", Duur = "5 dagen" },
                new Models.Cursus() { Id = 2, Naam = "tweede test cursus", Duur = "3 dagen" }
                );
            context.CursusInstanties.AddOrUpdate(ci => ci.Id,
                new Models.CursusInstantie() { Startdatum = new DateTime(2021, 2, 1), CursusId = 1 },
                new Models.CursusInstantie() { Startdatum = new DateTime(2021, 2, 8), CursusId = 1 },
                new Models.CursusInstantie() { Startdatum = new DateTime(2021, 2, 15), CursusId = 1 },
                new Models.CursusInstantie() { Startdatum = new DateTime(2021, 2, 1), CursusId = 2 },
                new Models.CursusInstantie() { Startdatum = new DateTime(2021, 2, 3), CursusId = 2 }
                );
        }
    }
}
