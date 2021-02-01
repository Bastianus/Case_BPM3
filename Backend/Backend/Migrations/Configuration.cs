namespace Backend.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Backend.Models.CursussenContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Backend.Models.CursussenContext context)
        {
            //  This method will be called after migrating to the latest version.

            context.Cursussen.AddOrUpdate(c => c.Id,
                new Models.Cursus() { Id = 999, Naam = "test cursus", Duur = 3 },
                new Models.Cursus() { Id = 998, Naam = "tweede test cursus", Duur = 1}
                );
            context.CursusInstanties.AddOrUpdate(ci => ci.Id,
                new Models.CursusInstantie() { Id = 999, Startdatum = new DateTime(2021, 2, 1), CursusId = 999 },
                new Models.CursusInstantie() { Id = 998, Startdatum = new DateTime(2020, 8, 7), CursusId = 999 },
                new Models.CursusInstantie() { Id = 997, Startdatum = new DateTime(2021, 2, 3), CursusId = 999 },
                new Models.CursusInstantie() { Id = 996, Startdatum = new DateTime(2021, 2, 1), CursusId = 998 },
                new Models.CursusInstantie() { Id = 995, Startdatum = new DateTime(2021, 2, 4), CursusId = 998 }
                );
        }
    }
}
