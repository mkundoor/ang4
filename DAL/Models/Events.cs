using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
 public class Events
    {
    [Key]
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
