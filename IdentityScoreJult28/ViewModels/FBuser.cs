using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class FBuser
    {
       
        public string id { get; set; }
        public string name { get; set; }
        public string first_name { get; set; }
        public string last_name  { get; set; }
        public string age_range  { get; set; }
        public string gender { get; set; }
        public string locale { get; set; }
        public string picture  { get; set; }
        public string verified  { get; set; }
        public string friends  { get; set; }
    }
}
