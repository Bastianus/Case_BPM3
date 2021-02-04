using Backend.weeknummer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Shouldly;
using System;

namespace Backend.Tests.weeknummer
{
    [TestClass]
    public class DatumHelperTests
    {
        [TestMethod]
        public void EersteDagVanDeWeek_GeeftHetJuisteAntwoord()
        {
            //arrange
            var verwachtAntwoord = new DateTime(2020, 1, 20);

            //act
            var antwoord = DatumHelper.EersteDagVanDeWeek(2020, 4);

            //assert
            antwoord.ShouldBe(verwachtAntwoord);
        }

        [TestMethod]
        public void EersteDagVanDeWeek_GeeftHetJuisteAntwoord_VoorWeek53In2015()
        {
            //arrange
            var verwachtAntwoord = new DateTime(2015, 12, 28);

            //act
            var antwoord = DatumHelper.EersteDagVanDeWeek(2015, 53);

            //assert
            antwoord.ShouldBe(verwachtAntwoord);
        }

        [TestMethod]
        public void EersteDagVanDeWeek_GeeftHetJuisteAntwoord_VoorWeek44In2016()
        {
            //arrange
            var verwachtAntwoord = new DateTime(2016, 10, 31);

            //act
            var antwoord = DatumHelper.EersteDagVanDeWeek(2016, 44);

            //assert
            antwoord.ShouldBe(verwachtAntwoord);
        }
    }
}
