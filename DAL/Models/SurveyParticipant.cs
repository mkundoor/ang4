using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class SurveyParticipant
    {
        public int SurveyId { get; set; }
        public Survey Survey { get; set; }
        public int ParticpantId { get; set; }
        public Participant Participant { get; set; }
        public bool IsActive { get; set; }      
    }
}
