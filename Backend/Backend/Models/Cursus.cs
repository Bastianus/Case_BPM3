﻿using System.Collections.Generic;

namespace Backend.Models
{
    public class Cursus
    {
        public int Id { get; set; }
        public string Naam { get; set; }
        public string Duur { get; set; }
        public virtual List<CursusInstantie> CursusInstanties { get; set; }
    }
}