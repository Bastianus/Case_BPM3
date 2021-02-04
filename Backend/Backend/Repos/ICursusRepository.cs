using Backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repos
{
    public interface ICursusRepository : IDisposable
    {
        Task<List<CommCursus>> GetAllCursusInstanties();
        Task<List<CommCursus>> GetCursusInstantiesByJaarEnWeeknummer(int jaar, int weeknummer);
        Task<AntwoordOpPostCursus> PostCursusInstantie(CommCursus cursus);
    }
}
