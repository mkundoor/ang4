using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class SurveyRepository : Repository<Survey>,ISurveyRepository
    {
        public SurveyRepository(ApplicationDbContext context) : base(context)
        { }


        //Insert New Record
        void ISurveyRepository.InsertSurveyOptions(Survey surveySurvey)
        {
            appContext.Survey.Add(surveySurvey);
            appContext.SaveChanges();
        }

       public void InsertParticipantsForSurvey(Survey _survey, Participant _participant)
        {

            appContext.Survey.Add(_survey);
            appContext.SaveChanges();
        }


        Survey ISurveyRepository.GetSurveyOptionsOnName(string surveyName)
        {
            Survey surveyObj = appContext.Survey.SingleOrDefault(x => x.Survey_Name == surveyName);
            return surveyObj;
        }

        //list of surveys
        public async Task<List<Survey>> GetSurveysAsyncList()
        {
            return await appContext.Survey.OrderBy(s => s.Survey_Name)
                                 .ToListAsync();
        }

        public async Task<Survey> GetSurveyAsync(int id)
        {
            return await appContext.Survey
                                .SingleOrDefaultAsync(c => c.SurveyId == id);
        }

        public async Task<Survey> InsertSurveyAsync(Survey surveuobj)
        {
            appContext.Add(surveuobj);
            try
            {
                await appContext.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                Console.Write( exp.Message);
            }

            return surveuobj;
        }

        public async Task<bool> UpdateSurveyAsync(Survey surveuobj)
        {
            //Will update all properties of the Customer
            appContext.Survey.Attach(surveuobj);
            appContext.Entry(surveuobj).State = EntityState.Modified;
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

        public async Task<bool> DeleteSurveyAsync(int id)
        {
                
            var surveyObj = await appContext.Survey
                                 .SingleOrDefaultAsync(c => c.SurveyId == id);
            appContext.Remove(surveyObj);
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

        public async Task<PagingResult<Survey>> GetSurveysPageAsync(int skip, int take)
        {
            var totalRecords = await appContext.Survey.CountAsync();
            var surveysobj = await appContext.Survey
                                   .OrderBy(c => c.Survey_Name)
                                   .Skip(skip)
                                   .Take(take)
                                   .ToListAsync();
            return new PagingResult<Survey>(surveysobj, totalRecords);
        }


        public void Save()
        {
            appContext.SaveChanges();
        }

        public bool ValidateSurveyExists(string surveyName)
        {
            return appContext.Survey.Any(x => x.Survey_Name == surveyName);
        }

        public void InsertSurveyParticipants(Survey _survey)
        {
            var surveyObj =  appContext.Survey
                                 .SingleOrDefaultAsync(c => c.SurveyId == _survey.SurveyId);
            if(surveyObj!= null)
            {
                appContext.Survey.Update(_survey);
                appContext.SaveChanges();
            }
            else
            {
                appContext.Survey.Add(_survey);
                appContext.SaveChanges();
            }
        }

        private ApplicationDbContext appContext
        {
            get { return (ApplicationDbContext)_context; }
        }

       

    }
}
