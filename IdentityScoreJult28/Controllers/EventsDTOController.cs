// ======================================
// ======================================

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL;
using IdentityScoreJult28.ViewModels;
using AutoMapper;
using DAL.Models;
using Microsoft.Extensions.Logging;
using IdentityScoreJult28.BLL;
using IdentityScoreJult28.Services;
using System.Collections.Generic;
using DAL.Repositories;


namespace IdentityScoreJult28.Controllers
{
    [Route("api/[controller]")]
    public class EventsDTOController : Controller
    {

        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

       


        public EventsDTOController(IUnitOfWork unitOfWork, ILogger<EventsViewModel> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        //Post
        [HttpPost]
        [Route("PostEvent")]
        public async Task<ActionResult> Post([FromBody]EventsViewModel Eventpost)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Events dalevent = new Events();
            //dalevent.title = Eventpost.title;
            //dalevent.description = Eventpost.description;
            //dalevent.sid = Eventpost.sid;
            //dalevent.eventdateu = DateTime.Now.ToString();
            //dalevent.startTime = Eventpost.startTime;
            //dalevent.endTime = Eventpost.endTime;
            //dalevent.primaryColor = "#ad2121";
            //dalevent.secondaryColor = "#FAE3E3";
            //dalevent.location = Eventpost.location;
            //dalevent.draggable = Eventpost.draggable;
            bool insnewEvent = await _unitOfWork.EventsRepository.InsertEvent(dalevent);
            if (insnewEvent == false)
            {
                return BadRequest("Itsnull");
            }
            return Ok();
        }

      


        // GET api/surveys
        [Route("EventsList/{id}")]
        [HttpGet]
  
        public  ActionResult EventsList(int id)
        {
            try
            {
                var eventslist =  _unitOfWork.EventsRepository.GetEvents(id);
                return Ok(eventslist);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }
            
        }

        [Route("userinterviewlist/{pid}")]
        [HttpGet]

        public async Task<ActionResult> userinterviewlist(int pid)
        {
            try
            {
                var eventslist = await _unitOfWork.EventsRepository.GetUserInterviews(pid);
                return Ok(eventslist);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }

        }


        //update

        [Route("UpdateEvent/{id}")]
        [HttpPut]


        public async Task<ActionResult> UpdateEvent(int id, [FromBody]EventsViewModel eventupd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                Events dalevent = new Events();
                Mapper.Map<EventsViewModel, Events>(eventupd, dalevent);
                var status = await _unitOfWork.EventsRepository.UpdateEvent(dalevent);
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

        //delete
        // DELETE api/customers/5
        [Route("DeleteEvent/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            try
            {
                var status = await _unitOfWork.EventsRepository.DeleteEvent(id);
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

        [Route("IsBooked/{pid}/{sid}")]
        [HttpGet]

        public ActionResult IsBooked (int pid, int sid)
        {
            try
            {
                var isbooked =  _unitOfWork.EventsRepository.IsInterviewBooked(pid, sid);
                return Ok(isbooked);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest();
            }

        }






    }

}
