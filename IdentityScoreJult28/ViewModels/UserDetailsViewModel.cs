using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace IdentityScoreJult28.ViewModels
{
    public class UserDetailsViewModel 
    {
        public class UserDetails
        {
            [Required(ErrorMessage = "First Name is required")]
            [StringLength(15)]
            public string FirstName { get; set; }

            [Required (ErrorMessage = "Last Name is required")]
            [StringLength(30)]
            public string LastName { get; set; }

            [Required (ErrorMessage = "Email is required"), EmailAddress(ErrorMessage = "Invalid email address")]
            [Remote(action: "VerifyEmail", controller: "Register")]
            [Display(Name = "Email Address")] //https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation
            public string EmailAddress { get; set; }

            [Required(ErrorMessage = "Phone Number is required")]
            [Phone]
            [Display(Name = "Phone Number")]
            [Remote(action: "VerifyPhoneNumber", controller: "Register")]
            public string PhoneNumber { get; set; }

            [Required]
            [StringLength(15)]
            [Display(Name = "Street")]
            public string Street { get; set; }

            [Required]
            [StringLength(15)]
            [Display(Name = "City")]
            public string City { get; set; }

            [Required]
            [StringLength(2)]
            [Display(Name = "State")]
            public string State { get; set; }


            [Required]
            [StringLength(5)]
            [Display(Name = "ZipCode")]
            public string Zip { get; set; }

            [Required]
            [Display(Name = "Social Media Account Verified")]
            public bool SocialMediaVerified { get; set; }


            [Required]
            public string GenderIdentity { get; set; }

            [Required]
            public string SexualOrientation { get; set; }

            [Required]
            public string Race { get; set; }

            [Required]
            public bool Hispanic { get; set; }

            [Required]
            public int Age { get; set; }

            [Display(Name = "Date of Birth")]
            [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
            public DateTime Date_of_Birth { get; set; }

            public string IPAddress { get; set; }

            public string Browser { get; set; }

            public string OS { get; set; }

            public string DeviceType { get; set; }


        }
    }
}
