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
    class DynamicSurveyLinksRepository : Repository<DynamicSurveyLinks>, IDynamicSurveyLinksRepository
    {
        public DynamicSurveyLinksRepository(ApplicationDbContext context) : base(context)
        { }
           
  
        private ApplicationDbContext appContext
        {
            get { return (ApplicationDbContext)_context; }
        }
        public void Save()
        {
            appContext.SaveChanges();
        }

        public async Task<List<DynamicSurveyLinks>> GetAllSurveyLinks(int SurveyID)
        {
            return await appContext.DynamicSurveyLinks.Where(s => s.Survey.SurveyId == SurveyID).ToListAsync();
        }

        public async Task<DynamicSurveyLinks> InsertSurveyUrl(DynamicSurveyLinks dynamicSurveyLinks)
        {
            appContext.Add(dynamicSurveyLinks);
            try
            {
                await appContext.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                Console.Write(exp.Message);
            }

            return dynamicSurveyLinks;


        }

        public async Task<bool> DeleteSurveyUrl(int id)
        {
            var dynsurveyUrlObj = await appContext.DynamicSurveyLinks.SingleOrDefaultAsync(d => d.dynSurveyId == id);
            appContext.Remove(dynsurveyUrlObj);
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

        public async Task<bool> UpdateSurveyLinks(DynamicSurveyLinks dynamicSurveyLinks)
        {
            appContext.DynamicSurveyLinks.Attach(dynamicSurveyLinks);
            appContext.Entry(dynamicSurveyLinks).State = EntityState.Modified;
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

        ////for user view

        public async Task<List<DynamicSurveyLinks>> GetUserUrlList(int SurveyID, int pid)
        {
            return await appContext.DynamicSurveyLinks
               .Include(pf => pf.ParticipantDynamicSurveyLinks)
               .Where(s => s.Survey.SurveyId == SurveyID).ToListAsync();
        }


        public async Task UpdateDoneUserUrl(int pid, int uid)
        {
            bool taskexists = appContext.ParticipantDynamicSurveyLinks.Any(x => x.ParticpantId == pid && x.dynSurveyId == uid);
            if (taskexists == false)
            {
                var urltoupdate = appContext.DynamicSurveyLinks
                    .Include(pd => pd.ParticipantDynamicSurveyLinks)
                    .SingleOrDefault(u => u.dynSurveyId == uid);

                var participanttoupdate = appContext.Participant
                     .Single(p => p.ParticpantId == pid);

                appContext.ParticipantDynamicSurveyLinks.Add(
                    new ParticipantDynamicSurveyLinks
                    {
                        DynamicSurveyLinks = urltoupdate,
                        Participant = participanttoupdate,
                        Done = false
                    }
                    );
                await appContext.SaveChangesAsync();

            }
        }

        //*******************CompleteTask Updating the payload in the join table ****************************//
        public async Task CompleteUserUrl(ParticipantDynamicSurveyLinks pdsl)
        {
            var fieldval = appContext.ParticipantDynamicSurveyLinks.FirstOrDefault(x => x.ParticpantId == pdsl.ParticpantId && x.dynSurveyId == pdsl.dynSurveyId);
            appContext.ParticipantDynamicSurveyLinks.Remove(fieldval); //As no tracking would have been correct check for future use!!
            appContext.SaveChanges();
            appContext.ParticipantDynamicSurveyLinks.Add(pdsl);
            await appContext.SaveChangesAsync();

        }


    }


}

