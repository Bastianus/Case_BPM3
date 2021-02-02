using Backend.Controllers;
using Backend.Models;
using Backend.Tests.TestHelpers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;

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

            _context.Setup(x => x.CursusInstanties).Returns(DbContextMockHelper.GetQueryableMockDbSet(fakeCursusInstanties));
            _context.Setup(x => x.Cursussen).Returns(DbContextMockHelper.GetQueryableMockDbSet(fakeCursussen));
 
            _sut = new CursusController(_context.Object) { };
        }

        [TestMethod]
        public void CursusController_GetCursusinstanties_GeeftCorrectAntwoord()
        {
            // arrange     
            var verwachteAntwoorden = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2020,5,18)},
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2021,4,1)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,11,2)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2019,3,30)},
            };

            //act
            var antwoord = _sut.GetCursusInstanties().ToList();
            

            //assert
            antwoord.ShouldNotBeNull();

            antwoord.Count().ShouldBe(5);

            CompareAntwoorden(antwoord, verwachteAntwoorden);      
        }

        [TestMethod]
        public void Cursuscontroller_GetCursusInstanties_AntwoordenZijnOpVolgordeVanStartdatum()
        {
            //arrange
            var verwachteAntwoorden = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2019,3,30)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2020,5,18)},
                new CommCursus(){ Naam = "test cursus 2", Duur = 5, Startdatum = new DateTime(2020,11,2)},
                new CommCursus(){ Naam = "test cursus 1", Duur = 3, Startdatum = new DateTime(2021,4,1)}
            };

            //act
            var antwoord = _sut.GetCursusInstanties().ToList();

            //assert
            for(int i=0; i < verwachteAntwoorden.Count(); i++)
            {
                CompareAntwoorden(antwoord[i], verwachteAntwoorden[i]);
            }
        }

        [TestMethod]
        public void CursusController_GetCursusInstantie_id_GeeftCorrectAntwoord()
        {
            //arrange
            var startdatum = new DateTime(2020, 5, 18);
            var bijbehorendId = 241;
            var verwachtAntwoord = new CursusInstantie() { Id = bijbehorendId, Startdatum = startdatum, CursusId = 67 };

            //act
            var antwoord = _sut.GetCursusInstantie(bijbehorendId).Result as OkNegotiatedContentResult<CursusInstantie>;

            //assert
            antwoord.Content.ShouldNotBeNull();

            CompareAntwoorden(antwoord.Content, verwachtAntwoord);
        }

        [TestMethod]
        public void CursusController_GetCursusInstantie_id_VanOnbekendIdGeeftNotFoundResult()
        {
            //act
            var antwoord = _sut.GetCursusInstantie(243).Result as NotFoundResult;

            //assert
            antwoord.ShouldNotBeNull();

        }

        [TestMethod]
        public void CursusController_PostCursusInstantie_MetBekendeCursus_SlaatNieuweInstantieOp()
        {
            //arrange
            var tePostenCursus = new CommCursus()
            {
                Naam = "test cursus 2",
                Duur = 5,
                Startdatum = new DateTime(2020, 6, 3)
            };

            var verwachtAntwoord = new CursusInstantie() { Startdatum = new DateTime(2020,6,3), CursusId=118};

            //act
            var antwoord = _sut.PostCursusInstantie(tePostenCursus).Result as CreatedAtRouteNegotiatedContentResult<CursusInstantie>;

            //assert
            antwoord.Content.ShouldNotBeNull();

            CompareAntwoorden(antwoord.Content, verwachtAntwoord);
        }     

        private List<Cursus> GetCursussen()
        {
            return new List<Cursus>()
            {
                new Cursus(){ Id = 67, Naam = "test cursus 1", Duur = 3},
                new Cursus(){ Id = 118, Naam = "test cursus 2", Duur = 5}
            };
        }

        private List<CursusInstantie> GetCursusInstanties()
        {
            return new List<CursusInstantie>()
            {
                new CursusInstantie(){ Id = 684, Startdatum = new DateTime(2020,5,17), CursusId = 118},
                new CursusInstantie(){ Id = 417, Startdatum = new DateTime(2020,11,2), CursusId = 118},
                new CursusInstantie(){ Id = 37, Startdatum = new DateTime(2019,3,30), CursusId = 118},
                new CursusInstantie(){ Id = 241, Startdatum = new DateTime(2020,5,18), CursusId = 67},
                new CursusInstantie(){ Id = 976, Startdatum = new DateTime(2021,4,1), CursusId = 67 }
            };
        }

        private void CompareAntwoorden(CursusInstantie antwoord, CursusInstantie verwacht)
        {
            antwoord.CursusId.ShouldBe(verwacht.CursusId);
            antwoord.Startdatum.ShouldBe(verwacht.Startdatum);
            antwoord.Id.ShouldBe(verwacht.Id);
        }

        private void CompareAntwoorden(CommCursus antwoord, CommCursus verwacht)
        {
            antwoord.Duur.ShouldBe(verwacht.Duur);
            antwoord.Startdatum.ShouldBe(verwacht.Startdatum);
            antwoord.Naam.ShouldBe(verwacht.Naam);
        }

        private void CompareAntwoorden(List<CommCursus> antwoord, List<CommCursus> verwacht)
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
