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
                new Models.Cursus() { Id = 999, Naam = "test cursus", Duur = 3 }
                );
            context.CursusInstanties.AddOrUpdate(ci => ci.Id,
                new Models.CursusInstantie() { Id = 999, Startdatum = new DateTime(2021, 2, 1), CursusId = 999 }
                );
        }
    }
}
