// ======================================

// ======================================

using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Core;
using DAL.Core.Interfaces;

namespace DAL
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync();
    }




    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, IAccountManager accountManager, ILogger<DatabaseInitializer> logger)
        {
            _accountManager = accountManager;
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            if (!await _context.Users.AnyAsync())
            {
                const string adminRoleName = "administrator";
                const string userRoleName = "user";

                await ensureRoleAsync(adminRoleName, "Default administrator", ApplicationPermissions.GetAllPermissionValues());
                await ensureRoleAsync(userRoleName, "Default user", new string[] { });

                await createUserAsync("admin", "tempP@ss123", "Inbuilt Administrator", "admin@upenn.edu", "+1 (484) 000-0000", new string[] { adminRoleName });
                await createUserAsync("user", "tempP@ss123", "Inbuilt Standard User", "user@upenn.edu", "+1 (484) 000-0001", new string[] { userRoleName });
            }

            if (!await _context.Participant.AnyAsync() && !await _context.Survey.AnyAsync())
            {
                Participant participantInitvals = new Participant
                {
                    
                    FirstName = "test1",
                    LastName = "test1",
                    EmailAddress = "test1@g.com",
                    Password = "",
                    PhoneNumber = "1234567890",
                    City = "exton",
                    State = "pa",
                    Zip = "19341",
                    GenderIdentity = "male",
                    SexualOrientation = "same sex",
                    OtherGenderType = "",
                    OtherSexualOrientation = "",
                    Race = "",
                    Hispanic = "",
                    Age = "69",
                    Date_of_Birth = DateTime.Now.Date,

                    //From ScoreModel.cs
                    AgeValid = true,
                    StateValid = true,
                    CityValid = true,
                    FirstName_Match = true,
                    LastName_Match = true,
                    Gender_Match = true,
                    Verified = true,
                    FinalScaoreVal = 100,

                    //map GeoLocProps.cs
                    geo_IP = "123.89.08.09",
                    geo_CountryName = "usa",
                    geo_RegionName = "philly",
                    geo_City = "philly",
                    geo_ZipCode = "12345",

                    //map userAgent Class
                    Browser = "mozilla",
                    OS = "windows"

                };
                Survey newsurvey = new Survey
                    { 
                   
                    Survey_Name = "survey01",
                    Survey_Active = true,
                    RedirectingUrl="www.google.com"
                };

                    _context.Participant.Add(participantInitvals);
                    _context.Survey.Add(newsurvey);
                    await _context.SaveChangesAsync();
            }
            
        }



        private async Task ensureRoleAsync(string roleName, string description, string[] claims)
        {
            if ((await _accountManager.GetRoleByNameAsync(roleName)) == null)
            {
                ApplicationRole applicationRole = new ApplicationRole(roleName, description);

                var result = await this._accountManager.CreateRoleAsync(applicationRole, claims);

                if (!result.Item1)
                    throw new Exception($"Seeding \"{description}\" role failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");
            }
        }

        private async Task<ApplicationUser> createUserAsync(string userName, string password, string fullName, string email, string phoneNumber, string[] roles)
        {
            ApplicationUser applicationUser = new ApplicationUser
            {
                UserName = userName,
                FullName = fullName,
                Email = email,
                PhoneNumber = phoneNumber,
                EmailConfirmed = true,
                IsEnabled = true
            };

            var result = await _accountManager.CreateUserAsync(applicationUser, roles, password);

            if (!result.Item1)
                throw new Exception($"Seeding \"{userName}\" user failed. Errors: {string.Join(Environment.NewLine, result.Item2)}");


            return applicationUser;
        }

       
           
    }
}
