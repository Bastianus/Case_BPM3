using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Models
{
    public class AntwoordOpPostCursus
    {
        public string Naam { get; set; }
        public string Duur { get; set; }
        public DateTime Startdatum { get; set; }
        public bool CursusWasOnbekend { get; set; }
        public bool InstantieWasOnbekend { get; set; }
    }
}