using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    public class CursussenController : Controller
    {
        private CursussenContext db = new CursussenContext();

        // GET: Cursussen
        public async Task<ActionResult> Index()
        {
            var query = await (from c in db.Cursussen
                               join ci in db.CursusInstanties
                                 on c.Id equals ci.CursusId
                               select new
                               {
                                   c.Naam,
                                   c.Duur,
                                   ci.Startdatum
                               }).ToListAsync();

            var antwoord = new List<AntwoordCursus>();

            query.ForEach(c => antwoord.Add(new AntwoordCursus(c.Naam, c.Duur, c.Startdatum)));

            return View(antwoord);
        }

        // GET: Cursussen/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AntwoordCursus antwoordCursus = await db.AntwoordCursus.FindAsync(id);
            if (antwoordCursus == null)
            {
                return HttpNotFound();
            }
            return View(antwoordCursus);
        }

        // GET: Cursussen/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Cursussen/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Startdatum,Duur,Naam")] AntwoordCursus antwoordCursus)
        {
            if (ModelState.IsValid)
            {
                db.AntwoordCursus.Add(antwoordCursus);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(antwoordCursus);
        }

        // GET: Cursussen/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AntwoordCursus antwoordCursus = await db.AntwoordCursus.FindAsync(id);
            if (antwoordCursus == null)
            {
                return HttpNotFound();
            }
            return View(antwoordCursus);
        }

        // POST: Cursussen/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Startdatum,Duur,Naam")] AntwoordCursus antwoordCursus)
        {
            if (ModelState.IsValid)
            {
                db.Entry(antwoordCursus).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(antwoordCursus);
        }

        // GET: Cursussen/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AntwoordCursus antwoordCursus = await db.AntwoordCursus.FindAsync(id);
            if (antwoordCursus == null)
            {
                return HttpNotFound();
            }
            return View(antwoordCursus);
        }

        // POST: Cursussen/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            AntwoordCursus antwoordCursus = await db.AntwoordCursus.FindAsync(id);
            db.AntwoordCursus.Remove(antwoordCursus);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
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
