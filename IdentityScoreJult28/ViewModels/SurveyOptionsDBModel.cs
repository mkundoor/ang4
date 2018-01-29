using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class SurveyOptionsDBModel
    {
        public int SurveyId { get; set; }
        public string Survey_Name { get; set; }
        public bool Survey_Active { get; set; }
        public bool CalAddressScore { get; set; }
        public bool CalSocialScore { get; set; }
        public bool CalAgeScore { get; set; }
        public bool CalTwoFactorScore { get; set; }

        public string redirectingUrl { get; set; }

    }
}
