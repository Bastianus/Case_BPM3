using Backend.Controllers;
using Backend.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace Backend.Tests.Controllers
{
    [TestClass]
    class CursusControllerTests
    {
        private CursusController _sut;
        public CursusControllerTests(CursusController cursusController)
        {
            _sut = cursusController;
        }

        [TestMethod]
        public void CursusController_get_api_cursus_GeeftEenLijstVanCommCursus()
        {
            //act
            var antwoord = _sut.GetCursusInstanties().ToList();
            var verwachteVormVanAntwoord = new List<CommCursus>();

            //assert
            Assert.IsNotNull(antwoord);
            Assert.IsInstanceOfType(antwoord, verwachteVormVanAntwoord.GetType());
        }
    }
}
