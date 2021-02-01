using System.Collections.Generic;

namespace Backend.Models
{
    public class Cursus
    {
        public int Id { get; set; }
        public string Naam { get; set; }
        public int Duur { get; set; }
        public virtual List<CursusInstantie> CursusInstanties { get; set; }
    }
}