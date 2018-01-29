using System;
using IdentityScoreJult28.ViewModels;



namespace IdentityScoreJult28.BLL
{
    public class CertifyParticipant
    {

        public static ParticipantDBViewModel storingtoDB(ParticipantViewModel Participantvalues, ScoreModel score, GeoLocProps geo, UserAgent.UserAgent useragent, MapPoint mapCords)
        {   
            ParticipantDBViewModel dbModel = new ParticipantDBViewModel();
            dbModel.Age = Participantvalues.Age;
            dbModel.AgeValid = score.AgeValid;
            dbModel.City = Participantvalues.City;
            dbModel.CityValid = score.CityValid;
            dbModel.Date_of_Birth = DateTime.Parse( Participantvalues.MonthofBirth + "/" + Participantvalues.YearofBirth); 
            dbModel.EmailAddress = Participantvalues.EmailAddress;
            dbModel.FirstName = Participantvalues.FirstName;
            dbModel.FirstName_Match = score.FirstName_Match;
            dbModel.LastName = Participantvalues.LastName;
            dbModel.LastName_Match = score.LastName_Match;
            dbModel.cords_IpAddrMatch = score.Coordinates_Match;
            dbModel.OtherGenderType = Participantvalues.othergender;
            dbModel.GenderIdentity = Participantvalues.GenderIdentity;
            dbModel.OtherSexualOrientation = Participantvalues.otherSex;
            dbModel.OtherRace = Participantvalues.OtherRace;
            dbModel.Password = "";
            dbModel.Hispanic = Participantvalues.Hispanic;
            dbModel.PhoneNumber = Participantvalues.PhoneNumber;
            dbModel.Race = Participantvalues.Race;
            dbModel.SexualOrientation = Participantvalues.SexualOrientation;
            dbModel.State = Participantvalues.State;
            dbModel.StateValid = score.StateValid;
            dbModel.Verified = score.Verified;
            dbModel.Zip = Participantvalues.Zip;
            dbModel.geo_IP = geo.IP;
            dbModel.geo_City = geo.City;
            dbModel.geo_CountryName = geo.CountryName;
            dbModel.geo_RegionName = geo.RegionName;
            dbModel.geo_ZipCode = geo.ZipCode;
            dbModel.geo_lattude = geo.Latitude;
            dbModel.geo_longitude = geo.Longitude;
            dbModel.OS = useragent.OS.Name.ToString();
            dbModel.Browser = useragent.Browser.Name.ToString();
            
            dbModel.AddrLatitude = mapCords.Latitude;
            dbModel.AddrLongitude = mapCords.Longitude;
            dbModel.latlangMatch = mapCords.MatchCords;

            dbModel.FinalScaoreVal = score.FinalScaoreVal;
            dbModel.TwoFactorScore = score.TwoFactorScore;
            dbModel.SocialScore = score.SocialScore;
            dbModel.AgeScore = score.AgeScore;
            dbModel.AddressScore = score.AddressScore;
            dbModel.RegisterDate = DateTime.Now.ToString("U");
            return dbModel;
        }

    }
}
