using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityScoreJult28.ViewModels;
using IdentityScoreJult28.Services;


namespace IdentityScoreJult28.BLL
{
    public static class CalculateScore 
    {
        private static bool AdressSelBool, SocialSelBool, AgeSelBool, twofactorSelBool;
        private static SurveyOptionsDBModel surveyObj;

        internal static void Selectedoptions(SurveyOptionsDBModel _options)
        {
            AdressSelBool = _options.CalAddressScore;
            AgeSelBool = _options.CalAgeScore;
            SocialSelBool = _options.CalSocialScore;
            twofactorSelBool = _options.CalTwoFactorScore;
            surveyObj = _options;
        }

        public static SurveyOptionsDBModel getthesurveyObject()
        {
            return surveyObj;
        }

        public static ScoreModel CalscoreVal(ViewModels.ScoreModel score, MapPoint mapcords, bool ZipCordsMatch)
        {
            int ScoreVal = 0;
            int FinalScore = 0;
         
            if (SocialSelBool == true)
            {
                ScoreVal = (score.FirstName_Match == true) ? (ScoreVal + 20) : ScoreVal;
                ScoreVal = (score.LastName_Match == true) ? (ScoreVal + 10) : ScoreVal;
                ScoreVal = (score.Gender_Match == true) ? (ScoreVal + 20) : ScoreVal;
                score.SocialScore = ScoreVal;
                FinalScore = FinalScore+ 50;
            }
            if(AgeSelBool == true)
            {
                ScoreVal = (score.AgeValid == true) ? (ScoreVal + 15) : ScoreVal;
                score.AgeScore = (score.AgeValid == true) ?  15 : 0;
                FinalScore = FinalScore+15;

            }
            if (AdressSelBool == true)
            {
                int addrscore = 0;
                ScoreVal = (score.CityValid == true) ? (ScoreVal + 10) : ScoreVal;
                addrscore = (score.CityValid == true) ? (addrscore + 10) : addrscore;
                ScoreVal = (score.StateValid == true) ? (ScoreVal + 10) : ScoreVal;
                addrscore = (score.StateValid == true) ? (addrscore + 10) : addrscore;
                score.Coordinates_Match = mapcords.MatchCords;
                ScoreVal = (score.Coordinates_Match == true) ? (ScoreVal + 20) : ScoreVal;
                addrscore = (score.Coordinates_Match == true) ? (addrscore + 20) : addrscore;
                ScoreVal = (ZipCordsMatch == true) ? (ScoreVal + 10) : ScoreVal;
                addrscore = (ZipCordsMatch == true) ? (addrscore + 10) : addrscore;
                score.FinalScaoreVal = ScoreVal;
                score.AddressScore = addrscore;
                FinalScore = FinalScore+50;
            }
           
                score.FinalScaoreVal = (int)Math.Round((double)(100 * ScoreVal) / FinalScore);
            return score;

        }

    }
}
