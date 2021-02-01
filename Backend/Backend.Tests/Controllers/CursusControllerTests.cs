using Backend.Controllers;
using Backend.Models;
using Backend.Tests.Mocks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Tests.Controllers
{
    [TestClass]
    public class CursusControllerTests
    {
        private CursusController _sut;
        private Mock<IDbCursussenContext> _context;
        public CursusControllerTests()
        {            
        }

        [TestInitialize]
        public void Init()
        {
            _context = new Mock<IDbCursussenContext>();

            var fakeCursusInstanties = GetCursusInstanties();
            var fakeCursussen = GetCursussen();

            _context.Setup(x => x.CursusInstanties).Returns(DbContextMock.GetQueryableMockDbSet(fakeCursusInstanties));
            _context.Setup(x => x.Cursussen).Returns(DbContextMock.GetQueryableMockDbSet(fakeCursussen));

            _sut = new CursusController(_context.Object) { };
        }
        [TestMethod]
        public void CursusController_get_api_cursus_GeeftCorrectAntwoord()
        {
            // arrange
            var getCursussen = GetCursussen();


            //act
            var antwoord = _sut.GetCursusInstanties().ToList();
            var verwachteAntwoorden = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2021,4,1)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,11,2)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2019,3,30)},
            };

            //assert
            antwoord.ShouldNotBeNull();

            antwoord.Count().ShouldBe(5);
        

        }

        private List<Cursus> GetCursussen()
        {
            return new List<Cursus>()
            {
                new Cursus(){ Id = 67, Naam = "test cursus 1", Duur = 3},
                new Cursus(){ Id = 118, Naam = "test cursus 2", Duur = 7}
            };
        }

        private List<CursusInstantie> GetCursusInstanties()
        {
            return new List<CursusInstantie>()
            {
                new CursusInstantie(){ Startdatum = new DateTime(2020,5,17), CursusId = 118},
                new CursusInstantie(){ Startdatum = new DateTime(2020,11,2), CursusId = 118},
                new CursusInstantie(){ Startdatum = new DateTime(2019,3,30), CursusId = 118},
                new CursusInstantie(){ Startdatum = new DateTime(2020,5,17), CursusId = 67},
                new CursusInstantie(){ Startdatum = new DateTime(2021,4,1), CursusId = 67 }
            };
        }

        private void CompareAntwoordLijsten(List<CommCursus> antwoord, List<CommCursus> verwacht)
        {
            antwoord.ForEach(antwoordCursus =>
            {
                var result = verwacht.Where(x =>
                    x.Naam == antwoordCursus.Naam
                    && x.Duur == antwoordCursus.Duur
                    && x.Startdatum == antwoordCursus.Startdatum).SingleOrDefault();

                result.ShouldNotBeNull();
            });
        }
    }
}
