using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
  public  class ParticipantRepository: Repository<Participant>,IParticipantRepository
    {
        public ParticipantRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<Participant> GetQualifiedParticipantData()
        {
            throw new NotImplementedException();
        }


        public IEnumerable<Participant> GetAllParticipantData()
        {
            return appContext.Participant.ToList();
        }

        public void InsertSurveyParticipant(Participant participant)
        {
            appContext.Participant.Add(participant);
            appContext.SaveChanges();
        }
        public void Save()
        {
            appContext.SaveChanges();
        }

        //Admin side of the code
        public async Task<bool> UpdateMemberAsync(Participant participant)
        {
            appContext.Participant.Attach(participant);
            appContext.Entry(participant).State = EntityState.Modified;
            try
            {
                return (await appContext.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteMemberAsync(int id)
        {
            var memberObj = await appContext.Participant
                                 .SingleOrDefaultAsync(c => c.ParticpantId == id);
            appContext.Remove(memberObj);
            try
            {
                return (await appContext.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                Console.Write(exp.Message);
            }
            return false;
        }

        public bool ValidateMemberExists(string email)
        {
            return appContext.Participant.Any(x => x.EmailAddress == email);
        }

        public async Task<List<Participant>> GetMemberAsyncList()
        {
            return await appContext.Participant.OrderBy(s => s.LastName)
                                .ToListAsync();
        }

        public async Task<PagingResult<Participant>> GetMembersPageAsync(int skip, int take)
        {
            var totalRecords = await appContext.Participant.CountAsync();
            var memberobj = await appContext.Participant
                                   .OrderBy(c => c.LastName)
                                   .Skip(skip)
                                   .Take(take)
                                   .ToListAsync();
            return new PagingResult<Participant>(memberobj, totalRecords);
        }

        public async Task<List<Participant>> GetAllMembers()
        {
                      var memberobj = await appContext.Participant
                                   .OrderBy(c => c.LastName)
                                   .ToListAsync();
            return new List<Participant>(memberobj);
        }

        public async Task<Participant> GetMemberAsync(int id)
        {
            return await appContext.Participant
                       .SingleOrDefaultAsync(c => c.ParticpantId == id);
        }

        public void InsertSurveyParticipantTable(Participant _participant, Survey _survey)
        {
            appContext.SurveyParticipant.Add(
                new SurveyParticipant { SurveyId = _survey.SurveyId , ParticpantId = _participant.ParticpantId, IsActive = _survey.Survey_Active });
            appContext.SaveChanges(); //https://github.com/aspnet/EntityFrameworkCore/issues/7334

        }

        public int getSID(int pid)
        {
          var obj =  appContext.SurveyParticipant.FirstOrDefault(x => x.ParticpantId == pid && x.IsActive == true);
            if (obj != null)
            {
                return obj.SurveyId;
            }
            else
            {
                return 0;
            }
        }

        public int getscore(string userfullname)
        {
           var partobj = appContext.Participant.FirstOrDefault(p => p.FirstName + p.LastName == userfullname);
            return partobj.FinalScaoreVal;
        }

        public Participant getparticipantObj(string userfullname)
        {
            var partobj = appContext.Participant.FirstOrDefault(p => p.FirstName + p.LastName == userfullname);
            return partobj;
        }

        private ApplicationDbContext appContext
        {
            get { return (ApplicationDbContext)_context; }
        }
    }
}
