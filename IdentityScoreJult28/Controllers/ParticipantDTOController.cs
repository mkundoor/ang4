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
    public class ParticipantDTOController : Controller
    {


        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        
        public ParticipantDTOController(IUnitOfWork unitOfWork, ILogger<ParticipantDTOController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }



        // GET: api/values
        [Route("GetSurveyees")]
        [HttpGet]
        [NoCache]
        public IActionResult Get()
        {
            try
            {
                var allParticipants = _unitOfWork.ParticipantRepository.GetAllParticipantData();
                return Ok(Mapper.Map<IEnumerable<ParticipantDBViewModel>>(allParticipants));
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }



        // POST api/values
        [Route("PostSurveyee")]
        [HttpPost]
        public void Post([FromBody]ParticipantViewModel participantViewModel)
        {
            Participant participant = Mapper.Map<Participant>(participantViewModel);
            
            _unitOfWork.ParticipantRepository.InsertSurveyParticipant(participant);
        }

        [Route("getscoreval/{firstpluslast}")]
        [HttpGet]
        [NoCache]
        public ActionResult getscoreval(string firstpluslast)
        {
            try
            {
                var userscore =  _unitOfWork.ParticipantRepository.getscore(firstpluslast);
                return Ok(userscore);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }

        [Route("GetPidSid/{fullName}")]
        [HttpGet]

        public ActionResult GetPidSid(string fullName)
        {
            try
            {

                studyparticipantids sidpid = new studyparticipantids();
                var participant =  _unitOfWork.ParticipantRepository.getparticipantObj(fullName);
                sidpid.pid = participant.ParticpantId;
                sidpid.sid = _unitOfWork.ParticipantRepository.getSID(sidpid.pid);
              //  var study = participant.SurveyParticipant.FirstOrDefault(x => x.IsActive == true && x.ParticpantId == sidpid.pid);
                
                return Ok(sidpid);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
        }



    }
}
