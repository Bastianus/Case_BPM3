using System;

namespace Backend.Models
{
    public class AntwoordCursus
    {
        public AntwoordCursus(string naam, int duur, DateTime startdatum)
        {
            Naam = naam;
            Duur = duur;
            Startdatum = startdatum;
        }

        public int Id { get; set; }
        public DateTime Startdatum { get; set; }
        public int Duur { get; set; }
        public string Naam { get; set; }
    }
}