using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DAL;

namespace IdentityScoreJult28.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20171222151457_newdb")]
    partial class newdb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DAL.Models.ApplicationRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("DAL.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Configuration");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName");

                    b.Property<bool>("IsEnabled");

                    b.Property<string>("JobTitle");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("DAL.Models.Appointment", b =>
                {
                    b.Property<int>("AppointmentID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AppointmentDate");

                    b.Property<string>("Description");

                    b.Property<DateTime>("EndTime");

                    b.Property<int>("ParticpantId");

                    b.Property<bool>("Reserved");

                    b.Property<DateTime>("StartTime");

                    b.Property<int>("SurveyId");

                    b.Property<string>("Title");

                    b.HasKey("AppointmentID");

                    b.HasIndex("ParticpantId");

                    b.HasIndex("SurveyId");

                    b.ToTable("Appointment");
                });

            modelBuilder.Entity("DAL.Models.DynamicFields", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AdminOnly");

                    b.Property<int>("SurveyId");

                    b.Property<string>("Task");

                    b.HasKey("TaskId");

                    b.HasIndex("SurveyId");

                    b.ToTable("DynamicFields");
                });

            modelBuilder.Entity("DAL.Models.DynamicSurveyLinks", b =>
                {
                    b.Property<int>("dynSurveyId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AdminOnly");

                    b.Property<int>("SurveyId");

                    b.Property<string>("surveyUrl");

                    b.HasKey("dynSurveyId");

                    b.HasIndex("SurveyId");

                    b.ToTable("DynamicSurveyLinks");
                });

            modelBuilder.Entity("DAL.Models.Events", b =>
                {
                    b.Property<int>("EventID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<DateTime>("End");

                    b.Property<bool>("IsFullDay");

                    b.Property<string>("Location");

                    b.Property<int>("ParticpantRef");

                    b.Property<DateTime>("Start");

                    b.Property<string>("Subject");

                    b.Property<int>("SurveyID");

                    b.Property<string>("ThemeColor");

                    b.HasKey("EventID");

                    b.HasIndex("ParticpantRef")
                        .IsUnique();

                    b.ToTable("Events");
                });

            modelBuilder.Entity("DAL.Models.Participant", b =>
                {
                    b.Property<int>("ParticpantId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AddrLatitude");

                    b.Property<double>("AddrLongitude");

                    b.Property<int>("AddressScore");

                    b.Property<string>("Age");

                    b.Property<int>("AgeScore");

                    b.Property<bool>("AgeValid");

                    b.Property<string>("Browser");

                    b.Property<string>("City");

                    b.Property<bool>("CityValid");

                    b.Property<DateTime>("Date_of_Birth");

                    b.Property<string>("EmailAddress");

                    b.Property<int>("FinalScaoreVal");

                    b.Property<string>("FirstName");

                    b.Property<bool>("FirstName_Match");

                    b.Property<string>("GenderIdentity");

                    b.Property<bool>("Gender_Match");

                    b.Property<string>("Hispanic");

                    b.Property<string>("LastName");

                    b.Property<bool>("LastName_Match");

                    b.Property<string>("OS");

                    b.Property<string>("OtherGenderType");

                    b.Property<string>("OtherRace");

                    b.Property<string>("OtherSexualOrientation");

                    b.Property<string>("Password");

                    b.Property<string>("PhoneNumber");

                    b.Property<string>("Race");

                    b.Property<string>("RegisterDate");

                    b.Property<string>("SexualOrientation");

                    b.Property<int>("SocialScore");

                    b.Property<string>("State");

                    b.Property<bool>("StateValid");

                    b.Property<int>("TwoFactorScore");

                    b.Property<bool>("Verified");

                    b.Property<string>("Zip");

                    b.Property<string>("geo_City");

                    b.Property<string>("geo_CountryName");

                    b.Property<string>("geo_IP");

                    b.Property<string>("geo_RegionName");

                    b.Property<string>("geo_ZipCode");

                    b.Property<double>("geo_lattude");

                    b.Property<double>("geo_longitude");

                    b.Property<bool>("latlangMatch");

                    b.HasKey("ParticpantId");

                    b.ToTable("Participant");
                });

            modelBuilder.Entity("DAL.Models.ParticipantDynamicFields", b =>
                {
                    b.Property<int>("ParticpantId");

                    b.Property<int>("TaskId");

                    b.Property<bool>("Done");

                    b.HasKey("ParticpantId", "TaskId");

                    b.HasIndex("TaskId");

                    b.ToTable("ParticipantDynamicFields");
                });

            modelBuilder.Entity("DAL.Models.ParticipantDynamicSurveyLinks", b =>
                {
                    b.Property<int>("ParticpantId");

                    b.Property<int>("dynSurveyId");

                    b.Property<bool>("Done");

                    b.HasKey("ParticpantId", "dynSurveyId");

                    b.HasIndex("dynSurveyId");

                    b.ToTable("ParticipantDynamicSurveyLinks");
                });

            modelBuilder.Entity("DAL.Models.Survey", b =>
                {
                    b.Property<int>("SurveyId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("CalAddressScore");

                    b.Property<bool>("CalAgeScore");

                    b.Property<bool>("CalSocialScore");

                    b.Property<bool>("CalTwoFactorScore");

                    b.Property<bool>("Survey_Active");

                    b.Property<string>("Survey_Name");

                    b.HasKey("SurveyId");

                    b.ToTable("Survey");
                });

            modelBuilder.Entity("DAL.Models.SurveyParticipant", b =>
                {
                    b.Property<int>("ParticpantId");

                    b.Property<int>("SurveyId");

                    b.HasKey("ParticpantId", "SurveyId");

                    b.HasIndex("SurveyId");

                    b.ToTable("SurveyParticipant");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictApplication", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClientId");

                    b.Property<string>("ClientSecret");

                    b.Property<string>("DisplayName");

                    b.Property<string>("LogoutRedirectUri");

                    b.Property<string>("RedirectUri");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.ToTable("OpenIddictApplications");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationId");

                    b.Property<string>("Scope");

                    b.Property<string>("Subject");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.ToTable("OpenIddictAuthorizations");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictScope", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("OpenIddictScopes");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationId");

                    b.Property<string>("AuthorizationId");

                    b.Property<string>("Subject");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("AuthorizationId");

                    b.ToTable("OpenIddictTokens");
                });

            modelBuilder.Entity("DAL.Models.Appointment", b =>
                {
                    b.HasOne("DAL.Models.Participant", "Participant")
                        .WithMany("Appointment")
                        .HasForeignKey("ParticpantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.Survey", "Survey")
                        .WithMany("Appointment")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.DynamicFields", b =>
                {
                    b.HasOne("DAL.Models.Survey", "Survey")
                        .WithMany("DynamicFields")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.DynamicSurveyLinks", b =>
                {
                    b.HasOne("DAL.Models.Survey", "Survey")
                        .WithMany("DynamicSurveyLinks")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.Events", b =>
                {
                    b.HasOne("DAL.Models.Participant", "Participant")
                        .WithOne("Events")
                        .HasForeignKey("DAL.Models.Events", "ParticpantRef")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.ParticipantDynamicFields", b =>
                {
                    b.HasOne("DAL.Models.Participant", "Participant")
                        .WithMany("ParticipantDynamicFields")
                        .HasForeignKey("ParticpantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.DynamicFields", "DynamicFields")
                        .WithMany("ParticipantDynamicFields")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.ParticipantDynamicSurveyLinks", b =>
                {
                    b.HasOne("DAL.Models.Participant", "Participant")
                        .WithMany("ParticipantDynamicSurveyLinks")
                        .HasForeignKey("ParticpantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.DynamicSurveyLinks", "DynamicSurveyLinks")
                        .WithMany("ParticipantDynamicSurveyLinks")
                        .HasForeignKey("dynSurveyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.SurveyParticipant", b =>
                {
                    b.HasOne("DAL.Models.Participant", "Participant")
                        .WithMany("SurveyParticipant")
                        .HasForeignKey("ParticpantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.Survey", "Survey")
                        .WithMany("SurveyParticipant")
                        .HasForeignKey("SurveyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("DAL.Models.ApplicationRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("DAL.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("DAL.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("DAL.Models.ApplicationRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictAuthorization", b =>
                {
                    b.HasOne("OpenIddict.Models.OpenIddictApplication", "Application")
                        .WithMany("Authorizations")
                        .HasForeignKey("ApplicationId");
                });

            modelBuilder.Entity("OpenIddict.Models.OpenIddictToken", b =>
                {
                    b.HasOne("OpenIddict.Models.OpenIddictApplication", "Application")
                        .WithMany("Tokens")
                        .HasForeignKey("ApplicationId");

                    b.HasOne("OpenIddict.Models.OpenIddictAuthorization", "Authorization")
                        .WithMany("Tokens")
                        .HasForeignKey("AuthorizationId");
                });
        }
    }
}
