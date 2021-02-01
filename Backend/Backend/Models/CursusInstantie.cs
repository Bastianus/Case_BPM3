using System;

namespace Backend.Models
{
    public class CursusInstantie
    {
        public int Id { get; set; }
        public DateTime Startdatum { get; set; }
        public int CursusId { get; set; }
        public Cursus Cursus { get; set; }
    }
}