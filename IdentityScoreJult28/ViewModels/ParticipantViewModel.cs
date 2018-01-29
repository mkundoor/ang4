using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class ParticipantViewModel
    {
    
     public string FirstName {get; set;}
     public string LastName {get; set;}
     public string EmailAddress {get; set;}
     public string Password {get; set;}
     public string PhoneNumber {get; set;}
     public string City {get; set;}
     public string State {get; set;}
     public string Zip {get; set;}
     public string GenderIdentity { get; set;}
     public string SexualOrientation { get; set;}
     public string othergender { get; set; }
     public string otherSex { get; set; }
     public string OtherRace { get; set; }
     public string Race {get; set;}
     public string Hispanic {get; set;}
     public string Age {get; set;}
     public string MonthofBirth { get; set; }
     public int YearofBirth { get; set; }
     public DateTime Date_of_Birth {get; set;}
     

    }
}
