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
    public class CursusInstantiesController : Controller
    {
        private CursussenContext db = new CursussenContext();

        // GET: CursusInstanties
        public async Task<ActionResult> Index()
        {
            var cursusInstanties = db.CursusInstanties.Include(c => c.Cursus);
            return View(await cursusInstanties.ToListAsync());
        }

        // GET: CursusInstanties/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            if (cursusInstantie == null)
            {
                return HttpNotFound();
            }
            return View(cursusInstantie);
        }

        // GET: CursusInstanties/Create
        public ActionResult Create()
        {
            ViewBag.CursusId = new SelectList(db.Cursussen, "Id", "Naam");
            return View();
        }

        // POST: CursusInstanties/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Startdatum,CursusId")] CursusInstantie cursusInstantie)
        {
            if (ModelState.IsValid)
            {
                db.CursusInstanties.Add(cursusInstantie);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.CursusId = new SelectList(db.Cursussen, "Id", "Naam", cursusInstantie.CursusId);
            return View(cursusInstantie);
        }

        // GET: CursusInstanties/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            if (cursusInstantie == null)
            {
                return HttpNotFound();
            }
            ViewBag.CursusId = new SelectList(db.Cursussen, "Id", "Naam", cursusInstantie.CursusId);
            return View(cursusInstantie);
        }

        // POST: CursusInstanties/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Startdatum,CursusId")] CursusInstantie cursusInstantie)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cursusInstantie).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.CursusId = new SelectList(db.Cursussen, "Id", "Naam", cursusInstantie.CursusId);
            return View(cursusInstantie);
        }

        // GET: CursusInstanties/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            if (cursusInstantie == null)
            {
                return HttpNotFound();
            }
            return View(cursusInstantie);
        }

        // POST: CursusInstanties/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            CursusInstantie cursusInstantie = await db.CursusInstanties.FindAsync(id);
            db.CursusInstanties.Remove(cursusInstantie);
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
