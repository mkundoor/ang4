using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
 public class DynamicFields
    {
        [Key]
        public int TaskId { get; set; }
        public string Task { get; set; }
        public bool AdminOnly { get; set; }

        public Survey Survey { get; set; }
        public int SurveyId { get; set; }
        public List<ParticipantDynamicFields> ParticipantDynamicFields { get; set; }

        public DynamicFields()
        {
            ParticipantDynamicFields = new List<ParticipantDynamicFields>();
        }

    }
}
