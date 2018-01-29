using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    class EventsRepository : Repository<Events>, IEventsRepository
    {
        public EventsRepository(ApplicationDbContext context) : base(context)
        { }
           
  
        private ApplicationDbContext appContext
        {
            get { return (ApplicationDbContext)_context; }
        }
        public void Save()
        {
            appContext.SaveChanges();
        }

        public List<Tuple<string, string, string, string, string, string>> GetEvents(int sid)
        {
            // return await  appContext.Events.Where(s => s.SurveyID == sid).ToListAsync();
            var query = from partpants in appContext.Participant
                        join evnt in appContext.Events on partpants.ParticpantId equals evnt.ParticipantID
                        where evnt.SurveyID == sid && evnt.Subject == "Booked" 
                        select new Tuple<string, string, string,string, string, string>(evnt.ThemeColor, evnt.Start.AddMinutes(0).ToString("dd'/'MMM'/'yyyy HH:mm:ss"), evnt.End.AddMinutes(0).ToString("dd'/'MMM'/'yyyy HH:mm:ss"), partpants.FirstName, partpants.LastName,partpants.EmailAddress );

            return query.ToList();

        }

        public async Task<List<Events>> GetUserInterviews(int pid)
        {
            return await appContext.Events.Where(p => p.ParticipantID == pid && p.Subject == "Booked").ToListAsync();
        }


        public async Task<bool> DeleteEvent(int id)
        {
            var eventObj = await appContext.Events.SingleOrDefaultAsync(e => e.EventID == id);
            appContext.Remove(eventObj);
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

        public async Task<bool> UpdateEvent(Events eventupd)
        {
            appContext.Events.Attach(eventupd);
            appContext.Entry(eventupd).State = EntityState.Modified;
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

        public async Task<bool> InsertEvent(Events eventins)
        {
             appContext.Add(eventins);
            try
            {
              await  appContext.SaveChangesAsync();
                return true;
            }
            catch (System.Exception exp)
            {
                Console.Write(exp.Message);
                return false;
            }
        }

       

         bool IEventsRepository.IsInterviewBooked(int pid, int sid)
        {
            var obj =  appContext.Events.FirstOrDefault(e => e.ParticipantID == pid && e.SurveyID == sid && e.Subject == "Booked");
            if (obj != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }


}

