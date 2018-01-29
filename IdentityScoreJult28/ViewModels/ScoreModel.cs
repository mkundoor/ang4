using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public  class ScoreModel
    {
        public bool AgeValid { get; set; }
        public bool StateValid { get; set; }
        public bool CityValid { get; set; }
        public bool FirstName_Match { get; set; }
        public bool LastName_Match { get; set; }
        public bool Gender_Match { get; set; }
        public bool Verified { get; set; }
        public bool Coordinates_Match { get; set; }
        public bool ZipCords_Match { get; set; }
        public int AddressScore { get; set; }
        public int SocialScore { get; set; }
        public int AgeScore { get; set; }
        public int TwoFactorScore { get; set; }
        public int FinalScaoreVal { get; set; }



    }
}
