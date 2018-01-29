
// http://www.c-sharpcorner.com/article/generic-repository-pattern-in-asp-net-core/  
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
   public class Survey
    {
        [Key]
        public int SurveyId { get; set; }
        public string Survey_Name { get; set; }
        public bool Survey_Active { get; set; }

        public bool CalAddressScore { get; set; }
        public bool CalSocialScore { get; set; }

        public bool CalAgeScore { get; set; }
        public bool CalTwoFactorScore { get; set; }
        public string RedirectingUrl { get; set; }

        public List<SurveyParticipant> SurveyParticipant { get; set; }
     
        public Survey()
        {
            SurveyParticipant = new List<SurveyParticipant>();
        }

        public List<DynamicFields> DynamicFields { get; set; }
        public List<DynamicSurveyLinks> DynamicSurveyLinks { get; set; }

        public List<Appointment> Appointment { get; set; }

    }
}

