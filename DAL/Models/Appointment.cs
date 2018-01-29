using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace DAL.Models
{
   public class Appointment
    {
        [Key]
        public int AppointmentID { get; set; }
        public string Title { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public Boolean Reserved { get; set; }

        public Survey Survey { get; set; }
        public int SurveyId { get; set; }

        public Participant Participant { get; set; }
        public int ParticpantId { get; set; }


    }
}
