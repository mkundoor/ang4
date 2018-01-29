using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
 public class DynamicSurveyLinks
    {
        [Key]
        public int dynSurveyId { get; set; }
        public string surveyUrl { get; set; }
        public Survey Survey { get; set; }
        public int SurveyId { get; set; }
        public bool AdminOnly { get; set; }
        public List<ParticipantDynamicSurveyLinks> ParticipantDynamicSurveyLinks { get; set; }

        public DynamicSurveyLinks()
        {
            ParticipantDynamicSurveyLinks = new List<ParticipantDynamicSurveyLinks>();
        }
    }
}
