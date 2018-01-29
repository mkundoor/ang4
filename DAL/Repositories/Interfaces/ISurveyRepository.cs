// ======================================
// Author: Meghna Reddy
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ISurveyRepository : IRepository<Survey>
    {
        void InsertSurveyOptions(Survey savetoSurvey);
        void InsertParticipantsForSurvey(Survey _survey, Participant _participant);
        Survey GetSurveyOptionsOnName(string surveyName);
        bool ValidateSurveyExists(string surveyName);
        Task<List<Survey>> GetSurveysAsyncList();
        Task<PagingResult<Survey>> GetSurveysPageAsync(int skip, int take);
        void InsertSurveyParticipants(Survey surveySurvey);
        Task<Survey> GetSurveyAsync(int id);
        Task<Survey> InsertSurveyAsync(Survey surveyObj);
        Task<bool> UpdateSurveyAsync(Survey surveyObj);
        Task<bool> DeleteSurveyAsync(int id);
        void Save();
       
    }
}
