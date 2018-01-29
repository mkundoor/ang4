using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL;
using IdentityScoreJult28.ViewModels;
using AutoMapper;
using DAL.Models;
using Microsoft.Extensions.Logging;
using IdentityScoreJult28.Helpers;
using IdentityScoreJult28.Infrastructure;


namespace IdentityScoreJult28.Controllers
{
    [Route("api/[controller]")]
    public class UserDashboardController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public static SurveyOptionsDBModel surveyoptions;

        public UserDashboardController(IUnitOfWork unitOfWork, ILogger<OptionsDTOController> logger)
            {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        
        // GET: api/SurveyName
        [HttpGet, Route("UserTasks/{SurveyName}")]
        public IActionResult GetSurveyOptions(string SurveyName)
        {
            var Survey = _unitOfWork.SurveyRepository.GetSurveyOptionsOnName(SurveyName);
            if (Survey != null)
            {
                SurveyOptionsDBModel surveyOpt = new SurveyOptionsDBModel();
                surveyOpt.SurveyId = Survey.SurveyId;
                surveyOpt.Survey_Name = Survey.Survey_Name;
                surveyOpt.Survey_Active = Survey.Survey_Active;
                surveyOpt.CalAddressScore = Survey.CalAddressScore;
                surveyOpt.CalAgeScore = Survey.CalAgeScore;
                surveyOpt.CalSocialScore = Survey.CalSocialScore;
                surveyOpt.CalTwoFactorScore = Survey.CalTwoFactorScore;
                BLL.CalculateScore.Selectedoptions(surveyOpt);
                return Ok(Survey);
            }
            else
            {
                return BadRequest("Itsnull");
            }
        }



        [Route("ValidateName/{SurveyName}")]
        [HttpGet]
        public IActionResult ValidateSurveyName(string SurveyName)
        {
            bool exists = _unitOfWork.SurveyRepository.ValidateSurveyExists(SurveyName);
            if (exists)
                return Json(data: true);
            else
                return Json(data: false);
        }

        // GET api/surveys
        [Route("SurveysList")]
        [HttpGet]
        [NoCache]
       public async Task<ActionResult> SurveysList()
        {
            try
            {
                var surveyslist = await _unitOfWork.SurveyRepository.GetSurveysAsyncList();
                return Ok(surveyslist);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        // GET api/SurveyDto/5
        [Route("GetSurvey/{id}")]
        [HttpGet]
        [NoCache]
      
        public async Task<ActionResult> Surveys(int id)
        {
            try
            {
                var surveybyID = await _unitOfWork.SurveyRepository.GetSurveyAsync(id);
                return Ok(surveybyID);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        // POST api/OptionsDTO/CreateSurvey
       
        [Route("CreateSurvey")]
        [HttpPost]
       // [ValidateAntiForgeryToken]
       
        public async Task<ActionResult> CreateSurvey([FromBody]SurveyOptionsViewModel soptions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {

                DAL.Models.Survey CalSurvey = new DAL.Models.Survey();
                CalSurvey.Survey_Name = soptions.survey_Name;
                CalSurvey.Survey_Active = soptions.survey_Active;
                CalSurvey.CalAddressScore = soptions.CalAddressScore;
                CalSurvey.CalSocialScore = soptions.CalSocialScore;
                CalSurvey.CalTwoFactorScore = soptions.CalTwoFactorScore;
                CalSurvey.CalAgeScore = soptions.CalAgeScore;
                var newSurvey = await _unitOfWork.SurveyRepository.InsertSurveyAsync(CalSurvey);
                if (CalSurvey == null)
                {
                    return BadRequest("Itsnull");
                }
                return Ok();
               // return CreatedAtRoute("GetCustomerRoute", new { id = newSurvey.SurveyId });
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(exp.Message);
            }
        }

        // PUT/Update api/customers/5
        [Route("UpdateSurvey/{id}")]
        [HttpPut]
           
    
        public async Task<ActionResult> UpdateSurvey(int id, [FromBody]SurveyOptionsViewModel soptions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                DAL.Models.Survey surveyobj = new DAL.Models.Survey();
                surveyobj.SurveyId = id;
                surveyobj.Survey_Name = soptions.survey_Name;
                surveyobj.Survey_Active = soptions.survey_Active;
                surveyobj.CalAddressScore = soptions.CalAddressScore;
                surveyobj.CalSocialScore = soptions.CalSocialScore;
                surveyobj.CalTwoFactorScore = soptions.CalTwoFactorScore;
                surveyobj.CalAgeScore = soptions.CalAgeScore;
                var status = await _unitOfWork.SurveyRepository.UpdateSurveyAsync(surveyobj);
                if (!status)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        // DELETE api/customers/5
        [Route("DeleteSurvey/{id}")]
        [HttpDelete]
   
        public async Task<ActionResult> DeleteSurvey(int id)
        {
            try
            {
                var status = await _unitOfWork.SurveyRepository.DeleteSurveyAsync(id);
                if (!status)
                {
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        [Route("SurveysList/page/{skip}/{take}")]
        [HttpGet]
        [NoCache]
     
        public async Task<ActionResult> SurveysPage(int skip, int take)
        {
            try
            {
                var pagingResult = await _unitOfWork.SurveyRepository.GetSurveysPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
                return Ok(pagingResult.Records);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }



    }
}
