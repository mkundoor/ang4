using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{

       public class SurveyOptionsViewModel
    {
            public int surveyId { get; set; }
            [Remote(action: "ValidateSurveyName", controller: "OptionsDTO")]
            public string survey_Name { get; set; }
            public bool survey_Active { get; set; }
            public bool CalAddressScore { get; set; }
            public bool CalSocialScore { get; set; }
            public bool CalAgeScore { get; set; }
            public bool CalTwoFactorScore { get; set; }

        public string RedirectingUrl { get; set; }
        }
    }
