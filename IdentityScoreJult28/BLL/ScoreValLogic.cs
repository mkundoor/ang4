using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityScoreJult28.ViewModels;
using IdentityScoreJult28.Services;

namespace IdentityScoreJult28.BLL
{
    public static class ScoreValLogic
    {
        private static string FB_first_name;
        private static string FB_last_name;
        private static string FB_gender;
        private static string FB_verified;
        


        public static void CerifyFB(ViewModels.FBuser fbuser)
        {
            FB_first_name = fbuser.first_name;
            FB_last_name = fbuser.last_name;
            FB_gender = fbuser.gender;
            FB_verified = fbuser.verified;

        }

       


        public static ScoreModel Certify(ViewModels.ParticipantViewModel Participantvalues)
        {
            ScoreModel score = new ScoreModel();

            score.FirstName_Match = String.Equals(FB_first_name, Participantvalues.FirstName, StringComparison.OrdinalIgnoreCase) ? true : false;
            score.LastName_Match = String.Equals(FB_last_name, Participantvalues.LastName, StringComparison.OrdinalIgnoreCase) ? true : false;
            score.Gender_Match = String.Equals(FB_gender, Participantvalues.GenderIdentity, StringComparison.OrdinalIgnoreCase) ? true : false;
            score.Verified = String.Equals(FB_verified, "true", StringComparison.OrdinalIgnoreCase) ? true : false;



            //==========================================================================
            //Cross Checking Age
            //==========================================================================
            int DOB = Participantvalues.YearofBirth;
            int calAge = DateTime.Now.Year - DOB;
            int givenAge = Int32.Parse(Participantvalues.Age);
            if (calAge == givenAge || calAge == givenAge + 1 || calAge == givenAge - 1)
            {
                score.AgeValid = true;
            }
            else
            {
                score.AgeValid = false;
            }
            //==========================================================================
            //Cross Checking Location
            //==========================================================================

            int zipcode = Int32.Parse(Participantvalues.Zip);
            Task<Address> task = CityStarefromZipService.VerifyAddress(zipcode);
            Address addr = task.Result;

            score.StateValid = String.Equals(addr.state, Participantvalues.State, StringComparison.OrdinalIgnoreCase) ? true : false;
            score.CityValid = String.Equals(addr.city, Participantvalues.City, StringComparison.OrdinalIgnoreCase) ? true : false;
            return score;
        }

      

        

      



    }
}
