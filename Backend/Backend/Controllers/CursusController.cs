using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using Backend.Repos;

namespace Backend.Controllers
{
    public class CursusController : ApiController
    {
        private ICursusRepository repo;
        public CursusController()
        {
            var dbContext = new DbCursussenContext();
            repo = new CursusRepository(dbContext);
        }

        // GET: api/Cursus
        public Task<List<CommCursus>> GetCursusInstanties()
        {
            return repo.GetAllCursusInstanties();
        }

        // GET: api/cursus/jaar/weeknummer
        public Task<List<CommCursus>> GetCursusInstantiesPerWeek(int jaar, int weeknummer)
        {
            return repo.GetCursusInstantiesByJaarEnWeeknummer(jaar, weeknummer);
        }

        // POST: api/Cursus
        [ResponseType(typeof(CommCursus))]
        public async Task<IHttpActionResult> PostCursusInstantie(CommCursus nieuweCursusInstantie)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var antwoord = await repo.PostCursusInstantie(nieuweCursusInstantie);

            return CreatedAtRoute("DefaultApi", new {}, antwoord);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repo.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}