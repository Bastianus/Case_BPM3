using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers
{
    [EnableCors]
    public class CursusController : ApiController
    {
        private DbCursussenContext db = new DbCursussenContext();

        // GET: api/Cursus
        public IQueryable<CommCursus> GetCursusInstanties()
        {
            var antwoord = from c in db.Cursussen
                           join ci in db.CursusInstanties
                                on c.Id equals ci.CursusId
                           select new CommCursus()
                           {
                               Naam = c.Naam,
                               Duur = c.Duur,
                               Startdatum = ci.Startdatum
                           };

            return antwoord;
        }

        // GET: api/Cursus/5
        [ResponseType(typeof(CursusInstantie))]
        public async Task<IHttpActionResult> GetCursusInstantie(int id)
        {
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            if (cursusInstantie == null)
            {
                return NotFound();
            }

            return Ok(cursusInstantie);
        }

        // POST: api/Cursus
        [ResponseType(typeof(CommCursus))]
        public async Task<IHttpActionResult> PostCursusInstantie(CommCursus nieuweCursusInstantie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cursus = db.Cursussen.Where(c => c.Naam == nieuweCursusInstantie.Naam).FirstOrDefault();

            if(cursus == null) // de cursus bestaat nog niet
            {
                db.Cursussen.Add(new Cursus { Duur = nieuweCursusInstantie.Duur, Naam = nieuweCursusInstantie.Naam });
                await db.SaveChangesAsync();
                cursus = db.Cursussen.Where(c => c.Naam == nieuweCursusInstantie.Naam).FirstOrDefault();
            }

            var resultaat = db.CursusInstanties.Add(new CursusInstantie() {Startdatum = nieuweCursusInstantie.Startdatum, CursusId = cursus.Id });
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = resultaat.Id }, resultaat);
        }

        // DELETE: api/Cursus/5
        [ResponseType(typeof(CursusInstantie))]
        public async Task<IHttpActionResult> DeleteCursusInstantie(int id)
        {
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            if (cursusInstantie == null)
            {
                return NotFound();
            }

            db.CursusInstanties.Remove(cursusInstantie);
            await db.SaveChangesAsync();

            return Ok(cursusInstantie);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}