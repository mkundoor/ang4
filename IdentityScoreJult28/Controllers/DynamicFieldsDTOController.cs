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
    public class DynamicFieldsDTOController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public static DynamicFieldsDTO dynamicfieldsDto;

        public DynamicFieldsDTOController (IUnitOfWork unitOfWork, ILogger<OptionsDTOController> logger)
            {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [Route("AllTaskList/{SurveyID}")]
        [HttpGet]
        [NoCache]
       public async Task<ActionResult> AllTaskList(int SurveyID)
        {
            try
            {
                var SurveyTaskList = await _unitOfWork.DynamicFieldsRepository.GetAllTaskList(SurveyID);
              
                return Ok(SurveyTaskList);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        // Updating user task view

       
        [Route("AllUrlList/{SurveyID}")]
        [HttpGet]
        [NoCache]
        public async Task<ActionResult> AllUrlList(int SurveyID)
        {
            try
            {
                var urlList = await _unitOfWork.DynamicSurveyLinksRepository.GetAllSurveyLinks(SurveyID);

                return Ok(urlList);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }



        //-------------------------------------Insert ------------------------------------------   
        [Route("InsertTask")]
        [HttpPost]
       
        public async Task<ActionResult> InsertTask([FromBody]DynamicFieldsDTO dfDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                DynamicFields df = new DynamicFields();
                df.Task = dfDto.Task;
                df.AdminOnly = dfDto.AdminOnly;
                df.SurveyId = dfDto.SurveyId;
               // df.DynamicFieldsId = dfDto.dynamicFieldsID;
                
                var newTask = await _unitOfWork.DynamicFieldsRepository.InsertTask(df);
                if (newTask == null)
                {
                    return BadRequest("It's  null");
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


        [Route("InsertUrl")]
        [HttpPost]

        public async Task<ActionResult> InsertUrl([FromBody]DynamicUrlDTO UrlDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                DynamicSurveyLinks dsl = new DynamicSurveyLinks();
                dsl.surveyUrl = UrlDto.surveyUrl;
                 dsl.SurveyId = UrlDto.SurveyId;
                // df.DynamicFieldsId = dfDto.dynamicFieldsID;

                var newTask = await _unitOfWork.DynamicSurveyLinksRepository.InsertSurveyUrl(dsl);
                if (newTask == null)
                {
                    return BadRequest("It's  null");
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



        //----------------------------------------Delete-------------------------------------------------

        // DELETE api/customers/5
        [Route("DeleteTask/{id}")]
        [HttpDelete]
   
        public async Task<ActionResult> DeleteTask(int id)
        {
            try
            {
                var status = await _unitOfWork.DynamicFieldsRepository.DeleteTask(id);
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


        [Route("DeleteUrl/{id}")]
        [HttpDelete]

        public async Task<ActionResult> DeleteUrl(int id)
        {
            try
            {
                var status = await _unitOfWork.DynamicSurveyLinksRepository.DeleteSurveyUrl(id);
                    
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


        // ------------------------------------UPDATE-------------------------------------------
        //updating the survey related task
        [Route("UpdateTask/{id}")]
        [HttpPut]
        public async Task<ActionResult> UpdateTask(int id, [FromBody]DynamicFieldsDTO dfDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                DynamicFields df = new DynamicFields();
                df.Task = dfDto.Task;
                df.AdminOnly = dfDto.AdminOnly;
                df.SurveyId = dfDto.SurveyId;
                df.TaskId = dfDto.TaskId;
                var status = await _unitOfWork.DynamicFieldsRepository.UpdateDynamicFields(df);
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

        [Route("UpdateUrl/{id}")]
        [HttpPut]
        public async Task<ActionResult> UpdateUrl(int id, [FromBody]DynamicUrlDTO dfDlo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                DynamicSurveyLinks dsl = new DynamicSurveyLinks();
                dsl.surveyUrl = dfDlo.surveyUrl;
                dsl.SurveyId = dfDlo.SurveyId;
                dsl.dynSurveyId = dfDlo.dynSurveyId;
                // df.DynamicFieldsId = dfDto.dynamicFieldsID;

                // df.DynamicFieldsId = dfDto.dynamicFieldsID;
                var status = await _unitOfWork.DynamicSurveyLinksRepository.UpdateSurveyLinks(dsl);
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


        //*************************Updating Incomplete to Complete******************************

        //*************************************Getting the user task list, Updating the task list if the Survey gets updates ***************//

        [Route("UserTaskList/{SurveyID}/{PId}")]
        [HttpGet]
        [NoCache]
        public async Task<ActionResult> UserTaskList(int SurveyID, int pid)
        {
            try
            {
                var SurveyTaskList = await _unitOfWork.DynamicFieldsRepository.GetUserTaskList(SurveyID, pid);

                var partdynList = SurveyTaskList.SelectMany(s => s.ParticipantDynamicFields).Where(p => p.ParticpantId == pid).ToList();
                //checks if the list in the survey and the user are uptodate or not
                if (partdynList.Count != SurveyTaskList.Count)
                {
                    foreach (var task in SurveyTaskList)
                    {
                        await _unitOfWork.DynamicFieldsRepository.UpdateDoneTaskUser(pid, task.TaskId);
                    }
                    partdynList = SurveyTaskList.SelectMany(s => s.ParticipantDynamicFields).Where(p => p.ParticpantId == pid).ToList();

                }

                List<userstasklistViewModel> listvm = new List<userstasklistViewModel>();
                foreach (var item in partdynList)
                {
                    listvm.Add(new userstasklistViewModel(item.DynamicFields.Task, item.Done, item.DynamicFields.AdminOnly, item.ParticpantId, item.TaskId, item.CompleteDate));
                }
                return Ok(listvm);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        [Route("UserCompleteTask/{id}")]
        [HttpPut]
        public async Task<ActionResult> UserCompleteTask(int id, [FromBody] userstasklistViewModel taskobj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                ParticipantDynamicFields pdf = new ParticipantDynamicFields();
                pdf.TaskId = taskobj.tid;
                pdf.ParticpantId = taskobj.pid;
                pdf.Done = true;
                pdf.CompleteDate = DateTime.Now.ToString();
                await _unitOfWork.DynamicFieldsRepository.CompleteUserTask(pdf);
               
                return Ok();
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        [Route("AdminCompleteTask/{id}")]
        [HttpPut]
        public async Task<ActionResult> AdminCompleteTask(int id, [FromBody] userstasklistViewModel taskobj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                ParticipantDynamicFields pdf = new ParticipantDynamicFields();
                pdf.TaskId = taskobj.tid;
                pdf.ParticpantId = taskobj.pid;
                if (taskobj.isDone == false)
                {
                    pdf.Done = false;
                    pdf.CompleteDate = "";
                }
                else
                {
                    pdf.Done = true;
                    pdf.CompleteDate = DateTime.Now.ToString();
                }
                await _unitOfWork.DynamicFieldsRepository.CompleteUserTask(pdf);

                return Ok();
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        [Route("UserCompleteUrl/{id}")]
        [HttpPut]
        public async Task<ActionResult> UserCompleteUrl(int id, [FromBody] UserUrlListViewModel urlobj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                ParticipantDynamicSurveyLinks udf = new ParticipantDynamicSurveyLinks();
                udf.dynSurveyId = urlobj.uid;
                udf.ParticpantId = urlobj.pid;
                udf.Done = true;
                await _unitOfWork.DynamicSurveyLinksRepository.CompleteUserUrl(udf);

                return Ok();
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        public async Task<ActionResult> UpdateUserUrl(int SurveyID, int pid)
        {
            try
            {
                var SurveyUrlList = await _unitOfWork.DynamicSurveyLinksRepository.GetUserUrlList(SurveyID, pid);

                var partdynList = SurveyUrlList.SelectMany(s => s.ParticipantDynamicSurveyLinks).Where(p => p.ParticpantId == pid).ToList();
                //checks if the list in the survey and the user are uptodate or not
                if (partdynList.Count != SurveyUrlList.Count)
                {
                    foreach (var url in SurveyUrlList)
                    {
                        await _unitOfWork.DynamicSurveyLinksRepository.UpdateDoneUserUrl(pid, url.dynSurveyId);
                    }
                    partdynList = SurveyUrlList.SelectMany(s => s.ParticipantDynamicSurveyLinks).Where(p => p.ParticpantId == pid).ToList();

                }

                List<UserUrlListViewModel> listvm = new List<UserUrlListViewModel>();
                foreach (var item in partdynList)
                {

                    listvm.Add(new UserUrlListViewModel(item.DynamicSurveyLinks.surveyUrl, item.Done, item.DynamicSurveyLinks.AdminOnly, item.ParticpantId, item.dynSurveyId));
                }
                return Ok(listvm);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        // for summary

        [Route("UserSummaryTasks/{PId}")]
        [HttpGet]
        [NoCache]
        public async Task<ActionResult> UserSummaryTasks( int pid)
        {
            try
            {

                var SurveyTaskList =  _unitOfWork.DynamicFieldsRepository.GetSummaryTasks(pid);
           


                return Ok(SurveyTaskList);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        // the actual admin complete buttons
        [Route("AtInterviewsTaskList/{SurveyID}/{PId}")]
        [HttpGet]
        [NoCache]
        public async Task<ActionResult> AtInterviewsTaskList(int SurveyID, int pid)
        {
            try
            {
                var SurveyTaskList = await _unitOfWork.DynamicFieldsRepository.AtIntTaskList(SurveyID, pid);

                var partdynList = SurveyTaskList.SelectMany(s => s.ParticipantDynamicFields).Where(p => p.ParticpantId == pid).ToList();
                //checks if the list in the survey and the user are uptodate or not
                if (partdynList.Count != SurveyTaskList.Count)
                {
                    foreach (var task in SurveyTaskList)
                    {
                        await _unitOfWork.DynamicFieldsRepository.UpdateDoneTaskUser(pid, task.TaskId);
                    }
                    partdynList = SurveyTaskList.SelectMany(s => s.ParticipantDynamicFields).Where(p => p.ParticpantId == pid).ToList();

                }

                List<userstasklistViewModel> listvm = new List<userstasklistViewModel>();
                foreach (var item in partdynList)
                {
                    listvm.Add(new userstasklistViewModel(item.DynamicFields.Task, item.Done, item.DynamicFields.AdminOnly, item.ParticpantId, item.TaskId, item.CompleteDate));
                }
                return Ok(listvm);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }



    }
}
