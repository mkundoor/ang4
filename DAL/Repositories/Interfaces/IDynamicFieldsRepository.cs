using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
  public  interface IDynamicFieldsRepository : IRepository<DynamicFields>
    {
        Task<List<DynamicFields>> GetUserTaskList(int SurveyID, int pid);
        Task<List<DynamicFields>> AtIntTaskList(int SurveyID, int pid);
        Task<List<DynamicFields>> GetAllTaskList(int SurveyID);
        Task<List<DynamicFields>> GetAdminTaskList(int SurveyID);
        Task<DynamicFields> InsertTask(DynamicFields dynamicfields);
      
        Task<bool> UpdateDynamicFields(DynamicFields dynamicfields);
        Task<bool> DeleteTask(int id);
        Task UpdateDoneTaskUser(int pid, int tid); // for updatinusertask list only not the complete field
        Task CompleteUserTask(ParticipantDynamicFields pdf);
        List<Tuple<string, bool, string>> GetSummaryTasks(int pid);
       // Task<List<ParticipantDynamicFields>> GetSummaryTasks(int pid);
    }
}
