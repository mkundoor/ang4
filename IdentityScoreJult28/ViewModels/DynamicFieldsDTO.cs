using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class DynamicFieldsDTO
    {
        public string Task { get; set; }
        public bool AdminOnly { get; set; }
        public int SurveyId { get; set; }

        public int TaskId { get; set; }

    }
}
