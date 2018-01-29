using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class EventsViewModel
    {
        public int EventID { get; set; }
        public int SurveyID { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string ThemeColor { get; set; }
        public string Location { get; set; }
        public bool IsFullDay { get; set; }
        public int ParticipantID { get; set; }

    }

}
