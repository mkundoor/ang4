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
    public class SurveyParticipantController : Controller
    {

        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        


        public SurveyParticipantController(IUnitOfWork unitOfWork, ILogger<CertifyParticipant> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }



        public static ScoreModel CertifiedVals;
        public static ScoreModel scoremodel;

        [HttpPost]
        [Route("PostUser")]
        public IActionResult Post([FromBody]ViewModels.ParticipantViewModel Participantvalues)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CertifiedVals = ScoreValLogic.Certify(Participantvalues);
            GeoLocProps GetGeoLocation = getGeoLocations().Result;
            string Address = string.Format("{0} {1} {2}", Participantvalues.City, " , ", Participantvalues.State);
            MapPoint mapCords = latlangofAddr(Address, GetGeoLocation.Latitude, GetGeoLocation.Longitude);
            bool ZipCordsMatch = VerifyZipCords(GetGeoLocation.ZipCode, Participantvalues.Zip);

            scoremodel = CalculateScore.CalscoreVal(CertifiedVals, mapCords, ZipCordsMatch);
            UserAgent.UserAgent ua = BrowserLookup();
            
            
            
            storetoDB(Participantvalues, scoremodel, GetGeoLocation, ua, mapCords);
            return Ok();
        }

        private bool VerifyZipCords(string zipCode, string zip)
        {
            return String.Equals(zipCode, zip, StringComparison.OrdinalIgnoreCase) ? true : false;
        }

        [Route("getScore")]
        [HttpGet]
        public ScoreModel Get()
        {
            return scoremodel;
        }


        [Route("fbuserinfo")]
        [HttpPost]
        public IActionResult Post([FromBody]ViewModels.FBuser fbuser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ScoreValLogic.CerifyFB(fbuser);
            return Ok();
        }


        //=========================================================
        // CODE FOR IP ADDRESS LOOKUP
        //=========================================================
        [Route("GetGeoLocation")]
        [HttpGet]

        public GeoLocProps GetGeoLocation()
        {
            return getGeoLocations().Result;
        }



        public async Task<GeoLocProps> getGeoLocations()   //(string ip)
        {
            string ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();
           // string ip = "108.16.31.96";

            if (string.IsNullOrEmpty(ip))
            {
                ip = Request.HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
                
            }

            GeoLocProps model = await GeoLocProps.QueryGeographicalLocationAsync(ip);

            return model;
        }

        //===========================================================================
        //Coordinates look up based on Address
        //===========================================================================
        #region latLongfromAddr
        //Get Latitude and Longtude Coorinates based on State and City 
        public static async Task<RootObject> GetlatLongfromAddr(string Address)
        {
            RootObject rootobj;
            rootobj = await GeoLocService.GetLatLongFromAddress(Address);
            return rootobj;
        }
        #endregion

        

        public MapPoint latlangofAddr(string Address, double geoLatitude, double geoLongitude)
        {
            MapPoint MapCords = new MapPoint();
            Task<RootObject> task1 = GeoLocService.GetLatLongFromAddress(Address);
           // RootObject mapgeoroot = task1.Result;
           if(task1.Result.results.Count == 0)
            {
                MapCords.Latitude = 0;
                MapCords.Longitude = 0;
                MapCords.MatchCords = false;
            }
            else
            {
                MapCords.Latitude = task1.Result.results[0].geometry.location.lat;
                MapCords.Longitude = task1.Result.results[0].geometry.location.lng;
                bool latValid = (Math.Truncate(geoLatitude) == Math.Truncate(MapCords.Latitude)) ? true : false;
                bool langValid = (Math.Truncate(geoLongitude) == Math.Truncate(MapCords.Longitude)) ? true : false;
                MapCords.MatchCords = ((latValid == true && langValid == true) ? true : false);
            }
          
            //scoremodel.Coordinates_Match = MapCords.MatchCords;
            return MapCords;
        }

   
        //=========================================================
        // CODE FOR IP BROWSER LOOKUP
        //=========================================================
        [Route("GetBrowserInfo")]
        [HttpGet]

        public UserAgent.UserAgent GetBrowserInfo()
        {
            return BrowserLookup();
        }


        public UserAgent.UserAgent BrowserLookup()
        {
            string userAgent = "";
            if (string.IsNullOrEmpty(userAgent))
            {
                userAgent = Request.Headers["User-Agent"];
            }

            ViewBag.userAgent = userAgent;

            UserAgent.UserAgent ua = new UserAgent.UserAgent(userAgent);

            var aa = ua.Browser;
            return ua;
            //return View(ua);
        }

   //-------------------------------------------------------------------------------------------------------------------------



   //--------------------------------------------------------------------------------------------------------------------------

          public void storetoDB(ViewModels.ParticipantViewModel Participantvalues, ScoreModel score, GeoLocProps geo, UserAgent.UserAgent useragent, MapPoint mapCoords)
            {
            ParticipantDBViewModel dbModel =  CertifyParticipant.storingtoDB(Participantvalues, score, geo, useragent, mapCoords);
           
            Participant participant = Mapper.Map<Participant>(dbModel);


            SurveyOptionsDBModel surveymodel = CalculateScore.getthesurveyObject();
            DAL.Models.Survey surveydal = new DAL.Models.Survey();
            //defining the survey object
            surveydal.Survey_Name = surveymodel.Survey_Name;
            surveydal.Survey_Active = surveymodel.Survey_Active;
            surveydal.SurveyId = surveymodel.SurveyId;
            surveydal.CalAddressScore = surveymodel.CalAddressScore;
            surveydal.CalAgeScore = surveymodel.CalAgeScore;
            surveydal.CalSocialScore = surveymodel.CalSocialScore;
            surveydal.CalTwoFactorScore = surveymodel.CalTwoFactorScore;
            
            _unitOfWork.ParticipantRepository.InsertSurveyParticipant(participant);
                       
            _unitOfWork.ParticipantRepository.InsertSurveyParticipantTable(participant, surveydal);
           
            }

        
    }    
  
}
