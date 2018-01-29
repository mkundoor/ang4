using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ParticipantDynamicSurveyLinks
    {
        public int dynSurveyId { get; set; }
        public DynamicSurveyLinks DynamicSurveyLinks { get; set; }
        public int ParticpantId { get; set; }
        public Participant Participant { get; set; }
        public bool Done { get; set; }
    }
}
