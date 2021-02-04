using System;
using System.Globalization;

namespace Backend.weeknummer
{
    public class DatumHelper
    {
        public static DateTime EersteDagVanDeWeek(int jaar, int weeknummer)
        {
            DateTime eersteDagVanHetJaar = new DateTime(jaar, 1, 1);
            int dagenOffset = DayOfWeek.Thursday - eersteDagVanHetJaar.DayOfWeek;

            // Use first Thursday in January to get first week of the year as
            // it will never be in Week 52/53
            DateTime eersteDonderdag = eersteDagVanHetJaar.AddDays(dagenOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int eersteWeek = cal.GetWeekOfYear(eersteDonderdag, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            var weekNum = weeknummer;
            // As we're adding days to a date in Week 1,
            // we need to subtract 1 in order to get the right date for week #1
            if (eersteWeek == 1)
            {
                weekNum -= 1;
            }

            // Using the first Thursday as starting week ensures that we are starting in the right year
            // then we add number of weeks multiplied with days
            var result = eersteDonderdag.AddDays(weekNum * 7);

            // Subtract 3 days from Thursday to get Monday, which is the first weekday in ISO8601
            return result.AddDays(-3);
        }
    }
}