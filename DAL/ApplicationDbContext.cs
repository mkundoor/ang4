// ======================================

// ======================================

using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OpenIddict;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

    

        public DbSet<Survey> Survey { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<SurveyParticipant> SurveyParticipant { get; set; }

        public DbSet<DynamicFields> DynamicFields { get; set; }
        public DbSet<DynamicSurveyLinks> DynamicSurveyLinks { get; set; }
        public DbSet<ParticipantDynamicSurveyLinks> ParticipantDynamicSurveyLinks { get; set; }
        public DbSet<ParticipantDynamicFields> ParticipantDynamicFields { get; set; }

        public DbSet<Appointment> Appointment { get; set; }

        public DbSet<Events> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);

          
      //many to many relationship survey and participant
           
        modelbuilder.Entity<SurveyParticipant>()
                .HasKey(sp => new { sp.ParticpantId, sp.SurveyId });

            modelbuilder.Entity<SurveyParticipant>()
                .HasOne(sp => sp.Participant)
                .WithMany(s => s.SurveyParticipant)
                .HasForeignKey(sp => sp.ParticpantId);

            modelbuilder.Entity<SurveyParticipant>()
                .HasOne(sp => sp.Survey)
                .WithMany(p => p.SurveyParticipant)
                .HasForeignKey(sp => sp.SurveyId);

      //----------------------------Many to Many  Participant Dynamic Survey Links -------------------------

            modelbuilder.Entity<ParticipantDynamicSurveyLinks>()
                .HasKey(pd => new { pd.ParticpantId, pd.dynSurveyId });

            modelbuilder.Entity<ParticipantDynamicSurveyLinks>()
                .HasOne(pd => pd.Participant)
                .WithMany(d => d.ParticipantDynamicSurveyLinks)
                .HasForeignKey(p => p.ParticpantId);

            modelbuilder.Entity<ParticipantDynamicSurveyLinks>()
                .HasOne(pd => pd.DynamicSurveyLinks)
                .WithMany(p => p.ParticipantDynamicSurveyLinks)
                .HasForeignKey(d => d.dynSurveyId);

            //----------------------------Many to Many  Participant Dynamic Survey Tasks -------------------------

            modelbuilder.Entity<ParticipantDynamicFields>()
               .HasKey(pf => new { pf.ParticpantId, pf.TaskId });

            modelbuilder.Entity<ParticipantDynamicFields>()
                .HasOne(pf => pf.Participant)
                .WithMany(d => d.ParticipantDynamicFields)
                .HasForeignKey(p => p.ParticpantId);

            modelbuilder.Entity<ParticipantDynamicFields>()
                .HasOne(pf => pf.DynamicFields)
                .WithMany(p => p.ParticipantDynamicFields)
                .HasForeignKey(f => f.TaskId);


            // OnetoMany relationship between Survey and Dyanamic Fields

            modelbuilder.Entity<Survey>()
                .HasMany(d => d.DynamicFields)
                .WithOne(s => s.Survey)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // OnetoMany relationship between Survey and Dyanamic Survey Links

            modelbuilder.Entity<Survey>()
                .HasMany(d => d.DynamicSurveyLinks)
                .WithOne(s => s.Survey)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            //------------------- OnetoMany relationship between Survey and Appointments ------------------

            modelbuilder.Entity<Survey>()
                .HasMany(a => a.Appointment)
                .WithOne(s => s.Survey)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            //-----------------------one to Many mapping------------------------
            modelbuilder.Entity<Participant>()
        .HasMany(a => a.Appointment)
                .WithOne(p => p.Participant)
        .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            //====one to one event participant=========== 
        // modelbuilder.Entity<Participant>()
        //.HasOne(e => e.Events)
        //.WithOne(p => p.Participant)
        //.HasForeignKey<Events>(p => p.ParticpantRef);

        }
    }
}
