using System.Collections.Generic;
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
               repo = new CursusRepository(new DbCursussenContext());
        }
        public CursusController(IDbCursussenContext context)
        {
            repo = new CursusRepository(context);
        }

        // GET: api/Cursus
        public Task<List<CommCursus>> GetCursusInstanties()
        {
            return repo.GetAllCursusInstanties();
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