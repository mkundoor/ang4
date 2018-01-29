using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class ParticipantDBViewModel
    {
        public int ParticpantId { get; set; }

        // From Participant class
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string GenderIdentity { get; set; }
        public string SexualOrientation { get; set; }
        public string OtherGenderType { get; set; }
        public string OtherSexualOrientation { get; set; }
        public string OtherRace { get; set; }
        public string Race { get; set; }
        public string Hispanic { get; set; }
        public string Age { get; set; }
        public DateTime Date_of_Birth { get; set; }

        //From ScoreModel.cs
        public bool AgeValid { get; set; }
        public bool StateValid { get; set; }
        public bool CityValid { get; set; }
        public bool FirstName_Match { get; set; }
        public bool LastName_Match { get; set; }
        public bool Gender_Match { get; set; }
        public bool Verified { get; set; }
        public bool cords_IpAddrMatch { get; set; }
      

        //map GeoLocProps.cs
        public string geo_IP { get; set; }
        public string geo_CountryName { get; set; }
        public string geo_RegionName { get; set; }
        public string geo_City { get; set; }
        public string geo_ZipCode { get; set; }
        public double geo_lattude { get; set; }
        public double geo_longitude { get; set; }

        //map userAgent Class
        public string Browser { get; set; }
        public string OS { get; set; }

        //map cords based of adress
        public double AddrLatitude { get; set; }
        public double AddrLongitude { get; set; }
        public bool latlangMatch { get; set; }

        //Individual Score values
        public int AddressScore { get; set; }
        public int SocialScore { get; set; }
        public int AgeScore { get; set; }
        public int TwoFactorScore { get; set; }
        public int FinalScaoreVal { get; set; }
        public string RegisterDate { get; set; }
        // The link to the survey that we are posting participants

    }
}
