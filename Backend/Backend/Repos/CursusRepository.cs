using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using Backend.weeknummer;

namespace Backend.Repos
{
    public class CursusRepository : ICursusRepository, IDisposable
    {
        private IDbCursussenContext db;

        public CursusRepository(IDbCursussenContext context)
        {
            db = context;
        }

        public Task<List<CommCursus>> GetAllCursusInstanties()
        {
            var antwoord = from c in db.Cursussen
                           join ci in db.CursusInstanties
                                on c.Id equals ci.CursusId
                           orderby ci.Startdatum ascending
                           select new CommCursus()
                           {
                               Naam = c.Naam,
                               Duur = c.Duur,
                               Startdatum = ci.Startdatum
                           };

            return antwoord.ToListAsync();
        }

        public Task<List<CommCursus>> GetCursusInstantiesByJaarEnWeeknummer(int jaar, int weeknummer)
        {
            var startdatum = DatumHelper.EersteDagVanDeWeek(jaar, weeknummer);
            var einddatum = startdatum.AddDays(7);

            var antwoord = from c in db.Cursussen
                           join ci in db.CursusInstanties
                                on c.Id equals ci.CursusId
                           where ci.Startdatum >= startdatum
                                 && ci.Startdatum < einddatum
                           orderby ci.Startdatum ascending
                           select new CommCursus()
                           {
                               Naam = c.Naam,
                               Duur = c.Duur,
                               Startdatum = ci.Startdatum
                           };

            return antwoord.ToListAsync();
        }

        public async Task<AntwoordOpPostCursus> PostCursusInstantie(CommCursus nieuweCursusInstantie)
        {
            bool cursusWasOnbekend = false;
            bool instantieWasOnbekend = false;

            var cursus = await VindCursusBijCommCursus(nieuweCursusInstantie);

            if (cursus == null) // de cursus bestaat nog niet
            {
                cursusWasOnbekend = true;
                cursus = await VoegCursusToe(nieuweCursusInstantie);
            }

            var instantie = db.CursusInstanties.Where(ci => ci.Startdatum == nieuweCursusInstantie.Startdatum && ci.CursusId == cursus.Id).FirstOrDefaultAsync().Result;

            if (instantie == null) // de cursus instantie bestaat nog niet
            {
                instantieWasOnbekend = true;
                instantie = await VoegCursusInstantieToe(nieuweCursusInstantie, cursus);
            }

            return new AntwoordOpPostCursus() { Naam = cursus.Naam, Duur = cursus.Duur, Startdatum = instantie.Startdatum, CursusWasOnbekend = cursusWasOnbekend, InstantieWasOnbekend = instantieWasOnbekend };
        }

        private Task<Cursus> VindCursusBijCommCursus(CommCursus cursus)
        {
            return db.Cursussen.Where(c => c.Naam == cursus.Naam).FirstOrDefaultAsync();
        }

        private async Task<Cursus> VoegCursusToe(CommCursus nieuweCursusInstantie)
        {
            db.Cursussen.Add(new Cursus { Duur = nieuweCursusInstantie.Duur, Naam = nieuweCursusInstantie.Naam });
            await db.SaveChangesAsync();
            return db.Cursussen.Where(c => c.Naam == nieuweCursusInstantie.Naam).FirstOrDefaultAsync().Result;
        }

        private async Task<CursusInstantie> VoegCursusInstantieToe(CommCursus nieuweCursusInstantie, Cursus cursus)
        {
            var instantie = new CursusInstantie() { Startdatum = nieuweCursusInstantie.Startdatum, CursusId = cursus.Id };
            db.CursusInstanties.Add(instantie);
            await db.SaveChangesAsync();
            return instantie;
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}