using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class Survey
    {
        public int SurveyId { get; set; }
        public string Survey_Name { get; set; }
        public bool Survey_Active { get; set; }

    }
}
