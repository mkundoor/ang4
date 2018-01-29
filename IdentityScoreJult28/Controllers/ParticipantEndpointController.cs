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
    public class ParticipantEndpointController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public static SurveyOptionsDBModel surveyoptions;

        public ParticipantEndpointController(IUnitOfWork unitOfWork, ILogger<OptionsDTOController> logger)
            {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
    
       

        [Route("ValidateMember/{email}")]
        [HttpGet]
        public IActionResult ValidateEmail(string email)
        {
            bool exists = _unitOfWork.ParticipantRepository.ValidateMemberExists(email);
            if (exists)
                return Json(data: true);
            else
                return Json(data: false);
        }

        // GET api/surveys
        [Route("MembersList")]
        [HttpGet]
        [NoCache]
       public async Task<ActionResult> MembersList()
        {
            try
            {
                var Memberslist = await _unitOfWork.ParticipantRepository.GetMemberAsyncList();
                return Ok(Memberslist);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        // GET api/SurveyDto/5
        [Route("getMemberbyid/{id}")]
        [HttpGet]
        [NoCache]
      
        public async Task<ActionResult> getMemberbyid(int id)
        {
            try
            {
                var MemberbyID = await _unitOfWork.ParticipantRepository.GetMemberAsync(id);
                return Ok(MemberbyID);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

       



        // PUT/Update api/customers/5
        [Route("UpdateMember/{id}")]
        [HttpPut]
           
    
        public async Task<ActionResult> UpdateMember(int id, [FromBody]ParticipantDBViewModel participantViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                Participant participant = Mapper.Map<Participant>(participantViewModel);
                var status = await _unitOfWork.ParticipantRepository.UpdateMemberAsync(participant);
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
        [Route("DeleteMember/{id}")]
        [HttpDelete]
   
        public async Task<ActionResult> DeleteMember(int id)
        {
            try
            {
                var status = await _unitOfWork.ParticipantRepository.DeleteMemberAsync(id);
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

        [Route("GetMemberesListPages/page/{skip}/{take}")]
        [HttpGet]
        [NoCache]
     
        public async Task<ActionResult> GetMemberesListPages(int skip, int take)
        {
            try
            {
                var pagingResult = await _unitOfWork.ParticipantRepository.GetMembersPageAsync(skip, take);
                Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
                return Ok(pagingResult.Records);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }


        [Route("GetAllMembers")]
        [HttpGet]
        [NoCache]
        public async Task<ActionResult> GetAllMembers()
        {
            try
            {
                var AllResult = await _unitOfWork.ParticipantRepository.GetAllMembers();
                      return Ok(AllResult);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }



    }
}
