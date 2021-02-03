using Backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Repos
{
    public interface ICursusRepository : IDisposable
    {
        Task<List<CommCursus>> GetAllCursusInstanties();
        Task<AntwoordOpPostCursus> PostCursusInstantie(CommCursus cursus);
    }
}
