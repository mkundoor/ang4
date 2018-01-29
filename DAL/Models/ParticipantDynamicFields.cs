using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ParticipantDynamicFields
    {
     
        public int TaskId { get; set; }
        public DynamicFields DynamicFields { get; set; }
        public int ParticpantId { get; set; }
        public Participant Participant { get; set; }
        public bool Done { get; set; }
        public string CompleteDate { get; set; }

    }
}
