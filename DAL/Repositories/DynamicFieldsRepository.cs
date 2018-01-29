using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DAL.Repositories
{
  public  class DynamicFieldsRepository : Repository<DynamicFields>, IDynamicFieldsRepository
    {
        public DynamicFieldsRepository(ApplicationDbContext context) : base(context)
        { }
        public  async Task<bool> DeleteTask (int id)
        {
            var taskObj = await appContext.DynamicFields.SingleOrDefaultAsync(t => t.TaskId  == id);
            appContext.Remove(taskObj);
            try
            {
                return (await appContext.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                Console.Write(exp.Message);
            }
            return false;

        }

        public async Task<List<DynamicFields>> GetAdminTaskList(int SurveyID)
        {
            return await appContext.DynamicFields.Where(s => s.Survey.SurveyId == SurveyID).Where(a => a.AdminOnly == true).ToListAsync();
        }

        //GetAllTaskList
        public async Task<List<DynamicFields>> GetAllTaskList(int SurveyID)
        {
            return await appContext.DynamicFields.Where(s => s.Survey.SurveyId == SurveyID).ToListAsync();
        }

       
        //survey related
        public async Task<DynamicFields>  InsertTask(DynamicFields dynamicfields)
        {

            appContext.Add(dynamicfields);
            try
            {
                await appContext.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                Console.Write(exp.Message);
            }

            return dynamicfields;
          
        }

        private ApplicationDbContext appContext
        {
            get { return (ApplicationDbContext)_context; }
        }
        public void Save()
        {
            appContext.SaveChanges();
        }

        public async Task<bool> UpdateDynamicFields(DynamicFields dynamicfields)
        {
            appContext.DynamicFields.Attach(dynamicfields);
            appContext.Entry(dynamicfields).State = EntityState.Modified;
            try
            {
                return (await appContext.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
            }
            return false;
        }

     //------------------------------User specific tasks----------------------------------------------

        //user sprcific task list
        public async Task<List<DynamicFields>> GetUserTaskList(int SurveyID, int pid)
        {
            return await appContext.DynamicFields
               .Include(pf => pf.ParticipantDynamicFields)
               .Where(s => s.Survey.SurveyId == SurveyID && s.AdminOnly == false).ToListAsync();
        }

        public async Task<List<DynamicFields>> AtIntTaskList(int SurveyID, int pid)
        {
            return await appContext.DynamicFields
               .Include(pf => pf.ParticipantDynamicFields)
               .Where(s => s.Survey.SurveyId == SurveyID).ToListAsync();
        }

        //************ Updating the task list with the newly added tasks*********************************// 
        public async Task UpdateDoneTaskUser(int pid, int tid)
        {
         bool taskexists = appContext.ParticipantDynamicFields.Any(x => x.ParticpantId ==pid && x.TaskId == tid);
            if (taskexists == false)
            {
                var tasktoupdate = appContext.DynamicFields
                    .Include(pd => pd.ParticipantDynamicFields)
                    .SingleOrDefault(t => t.TaskId == tid);

                var participanttoupdate = appContext.Participant
                     .Single(p => p.ParticpantId == pid);

                appContext.ParticipantDynamicFields.Add(
                    new ParticipantDynamicFields
                    {
                        DynamicFields = tasktoupdate,
                        Participant = participanttoupdate,
                        Done = false
                    }
                    );
                await appContext.SaveChangesAsync();
              
            }
        }



        //*******************CompleteTask Updating the payload in the join table ****************************//
        public async Task CompleteUserTask(ParticipantDynamicFields pdf)
        {
            var fieldval = appContext.ParticipantDynamicFields.FirstOrDefault(x => x.ParticpantId == pdf.ParticpantId && x.TaskId == pdf.TaskId);
            appContext.ParticipantDynamicFields.Remove(fieldval); //As no tracking would have been correct check for future use!!
            appContext.SaveChanges();
            appContext.ParticipantDynamicFields.Add(pdf);
            await appContext.SaveChangesAsync();

        }

        public  List<Tuple<string, bool, string>> GetSummaryTasks(int pid)
        {
            //return await appContext.ParticipantDynamicFields 
            //               //.Include(x => x.DynamicFields.Task)
            //               .Where(p => p.ParticpantId == pid ).ToListAsync();

            var query = from pdf in appContext.ParticipantDynamicFields
                        join df in appContext.DynamicFields on pdf.TaskId equals df.TaskId
                        where pdf.ParticpantId == pid && df.AdminOnly == false
                        select new Tuple<string, bool, string>(df.Task, pdf.Done, pdf.CompleteDate);

            return query.ToList();
     

        }
    }


}

