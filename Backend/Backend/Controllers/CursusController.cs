using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Backend.Models;

namespace Backend.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CursusController : ApiController
    {

        private IDbCursussenContext db;
        public CursusController()
        {
            db = new DbCursussenContext();
        }
        public CursusController(IDbCursussenContext context)
        {
            db = context;
        }

        // GET: api/Cursus
        public IQueryable<CommCursus> GetCursusInstanties()
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

            return antwoord;
        }

        // GET: api/Cursus/5
        [ResponseType(typeof(CursusInstantie))]
        public async Task<IHttpActionResult> GetCursusInstantie(int id)
        {
            CursusInstantie cursusInstantie = db.CursusInstanties.Where(x => x.Id == id).SingleOrDefault();
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
            bool cursusWasOnbekend = false;
            bool instantieWasOnbekend = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cursus = db.Cursussen.Where(c => c.Naam == nieuweCursusInstantie.Naam).FirstOrDefault();

            if(cursus == null) // de cursus bestaat nog niet
            {
                cursusWasOnbekend = true;
                db.Cursussen.Add(new Cursus { Duur = nieuweCursusInstantie.Duur, Naam = nieuweCursusInstantie.Naam });
                await db.SaveChangesAsync();
                cursus = db.Cursussen.Where(c => c.Naam == nieuweCursusInstantie.Naam).FirstOrDefault();
            }

            var instantie = db.CursusInstanties.Where(ci => ci.Startdatum == nieuweCursusInstantie.Startdatum && ci.CursusId == cursus.Id).FirstOrDefault();

            if(instantie == null) // de cursus instantie bestaat nog niet
            {
                instantieWasOnbekend = true;
                instantie = new CursusInstantie() { Startdatum = nieuweCursusInstantie.Startdatum, CursusId = cursus.Id };

                db.CursusInstanties.Add(instantie);
                await db.SaveChangesAsync();
            }

            var id = db.CursusInstanties.Where(x => x.Startdatum == nieuweCursusInstantie.Startdatum && x.CursusId == cursus.Id).FirstOrDefault().Id;

            var antwoord = new AntwoordOpPostCursus() { Naam = cursus.Naam, Duur = cursus.Duur, Startdatum = instantie.Startdatum, CursusWasOnbekend = cursusWasOnbekend, InstantieWasOnbekend = instantieWasOnbekend };

            return CreatedAtRoute("DefaultApi", new { id = id }, antwoord);
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