using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
  public  interface IEventsRepository : IRepository<Events>
    {
       // Task<List<Events>> GetEvents(int SurveyID);
        Task<List<Events>> GetUserInterviews(int pid);
        Task<bool> InsertEvent(Events eventins);         
        Task<bool> DeleteEvent (int id);
        Task<bool> UpdateEvent(Events eventupd);
        bool IsInterviewBooked(int pid, int sids);
        List<Tuple<string, string, string, string, string, string>> GetEvents(int sid);
    }
}
