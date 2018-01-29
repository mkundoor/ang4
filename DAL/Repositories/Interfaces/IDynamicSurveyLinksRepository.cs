using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
  public  interface IDynamicSurveyLinksRepository : IRepository<DynamicSurveyLinks>
    {
        Task<List<DynamicSurveyLinks>> GetAllSurveyLinks(int SurveyID);
        Task<DynamicSurveyLinks> InsertSurveyUrl(DynamicSurveyLinks dynamicSurveyLinks);         
        Task<bool> DeleteSurveyUrl(int id);
        Task<bool> UpdateSurveyLinks(DynamicSurveyLinks dynamicSurveyLinks);
        Task<List<DynamicSurveyLinks>> GetUserUrlList(int SurveyID, int pid);
        Task UpdateDoneUserUrl(int pid, int uid);
        Task CompleteUserUrl(ParticipantDynamicSurveyLinks pdsl);
    }
}
