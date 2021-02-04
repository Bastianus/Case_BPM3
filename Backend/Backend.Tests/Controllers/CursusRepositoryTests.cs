using Backend.Models;
using Backend.Repos;
using Backend.Tests.TestHelpers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace Backend.Tests.Controllers
{
    [TestClass]
    public class CursusRepositoryTests
    {
        private ICursusRepository _sut;

        [TestInitialize]
        public void Init()
        {
            var fakeCursussen = new FakeDbAsyncEnumerable<Cursus>(GetCursussen());

            var mockCursus = new Mock<DbSet<Cursus>>();
            mockCursus.As<IQueryable>()
                .Setup(m => m.Provider)
                .Returns(fakeCursussen.AsQueryable().Provider);
            mockCursus.As<IQueryable>()
                .Setup(m => m.Expression)
                .Returns(fakeCursussen.AsQueryable().Expression);
            mockCursus.As<IQueryable>()
                .Setup(m => m.ElementType)
                .Returns(fakeCursussen.AsQueryable().ElementType);
            mockCursus.As<IDbAsyncEnumerable>()
                .Setup(m => m.GetAsyncEnumerator())
                .Returns(((IDbAsyncEnumerable<Cursus>)fakeCursussen).GetAsyncEnumerator());

            var fakeCursusInstanties = new FakeDbAsyncEnumerable<CursusInstantie>(GetCursusInstanties());

            var mockCursusInstanties = new Mock<DbSet<CursusInstantie>>();
            mockCursusInstanties.As<IQueryable>()
                .Setup(m => m.Provider)
                .Returns(fakeCursusInstanties.AsQueryable().Provider);
            mockCursusInstanties.As<IQueryable>()
                .Setup(m => m.Expression)
                .Returns(fakeCursusInstanties.AsQueryable().Expression);
            mockCursusInstanties.As<IQueryable>()
                .Setup(m => m.ElementType)
                .Returns(fakeCursusInstanties.AsQueryable().ElementType);
            mockCursusInstanties.As<IDbAsyncEnumerable>()
                .Setup(m => m.GetAsyncEnumerator())
                .Returns(((IDbAsyncEnumerable<CursusInstantie>)fakeCursusInstanties).GetAsyncEnumerator());

            var context = new Mock<IDbCursussenContext>();
            context.Setup(m => m.Cursussen).Returns(mockCursus.Object);
            context.Setup(m => m.CursusInstanties).Returns(mockCursusInstanties.Object);

            _sut = new CursusRepository(context.Object) { };
        }

        [TestMethod]
        public void GetCursusinstanties_GeeftCorrectAntwoord()
        {
            // arrange     
            var verwachteAntwoorden = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 1", Duur = "3 dagen", Startdatum = new DateTime(2020,5,16)},
                new CommCursus(){ Naam = "test cursus 1", Duur = "3 dagen", Startdatum = new DateTime(2021,4,1)},
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2020,11,2)},
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2019,3,30)},
            };

            //act
            var antwoord = _sut.GetAllCursusInstanties().Result;            

            //assert
            antwoord.ShouldNotBeNull();

            antwoord.Count().ShouldBe(5);

            CompareAntwoorden(antwoord, verwachteAntwoorden);      
        }

        [TestMethod]
        public void GetCursusInstanties_AntwoordenZijnOpVolgordeVanStartdatum()
        {
            //arrange
            var verwachteAntwoorden = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2019,3,30)},
                new CommCursus(){ Naam = "test cursus 1", Duur = "3 dagen", Startdatum = new DateTime(2020,5,16)},
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2020,5,17)},                
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2020,11,2)},
                new CommCursus(){ Naam = "test cursus 1", Duur = "3 dagen", Startdatum = new DateTime(2021,4,1)}
            };

            //act
            var antwoord = _sut.GetAllCursusInstanties().Result;

            //assert
            for(int i=0; i < verwachteAntwoorden.Count(); i++)
            {
                CompareAntwoorden(antwoord[i], verwachteAntwoorden[i]);
            }
        }

        [TestMethod]
        public void GetCursusInstatiesByJaarEnWeeknummer_GeeftHetJuisteAntwoord()
        {
            // arrange
            var verwachtAntwoord = new List<CommCursus>()
            {
                new CommCursus(){ Naam = "test cursus 2", Duur = "5 dagen", Startdatum = new DateTime(2020,5,17)},
                new CommCursus(){ Naam = "test cursus 1", Duur = "3 dagen", Startdatum = new DateTime(2020,5,16)},
            };

            // act
            var antwoord = _sut.GetCursusInstantiesByJaarEnWeeknummer(2020, 20).Result;

            // assert
            CompareAntwoorden(antwoord, verwachtAntwoord);
        }

        [TestMethod]
        public void PostCursusInstantie_MetBekendeCursus_SlaatNieuweInstantieOp()
        {
            //arrange
            var tePostenCursus = new CommCursus()
            {
                Naam = "test cursus 2",
                Duur = "5 dagen",
                Startdatum = new DateTime(2020, 6, 3)
            };

            var verwachtAntwoord = new AntwoordOpPostCursus() { Startdatum = new DateTime(2020,6,3), 
                                                                Naam = "test cursus 2" , 
                                                                Duur = "5 dagen", 
                                                                CursusWasOnbekend = false, 
                                                                InstantieWasOnbekend = true};

            //act
            var antwoord = _sut.PostCursusInstantie(tePostenCursus).Result;

            //assert
            antwoord.ShouldNotBeNull();

            CompareAntwoorden(antwoord, verwachtAntwoord);
        }     

        private List<Cursus> GetCursussen()
        {
            return new List<Cursus>()
            {
                new Cursus(){ Id = 67, Naam = "test cursus 1", Duur = "3 dagen"},
                new Cursus(){ Id = 116, Naam = "test cursus 2", Duur = "5 dagen"}
            };
        }

        private List<CursusInstantie> GetCursusInstanties()
        {
            return new List<CursusInstantie>()
            {
                new CursusInstantie(){ Id = 684, Startdatum = new DateTime(2020,5,17), CursusId = 116},
                new CursusInstantie(){ Id = 417, Startdatum = new DateTime(2020,11,2), CursusId = 116},
                new CursusInstantie(){ Id = 37, Startdatum = new DateTime(2019,3,30), CursusId = 116},
                new CursusInstantie(){ Id = 241, Startdatum = new DateTime(2020,5,16), CursusId = 67},
                new CursusInstantie(){ Id = 976, Startdatum = new DateTime(2021,4,1), CursusId = 67 }
            };
        }

        private void CompareAntwoorden(AntwoordOpPostCursus antwoord, AntwoordOpPostCursus verwacht)
        {
            antwoord.Naam.ShouldBe(verwacht.Naam);
            antwoord.Duur.ShouldBe(verwacht.Duur);
            antwoord.Startdatum.ShouldBe(verwacht.Startdatum);
            antwoord.CursusWasOnbekend.ShouldBe(verwacht.CursusWasOnbekend);
            antwoord.InstantieWasOnbekend.ShouldBe(verwacht.InstantieWasOnbekend);
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
