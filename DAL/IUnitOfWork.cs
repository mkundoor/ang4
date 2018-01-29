// ======================================

// ======================================

using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
      
        ISurveyRepository SurveyRepository { get; }
        IParticipantRepository ParticipantRepository { get; }

        IEventsRepository EventsRepository { get; }
        IDynamicFieldsRepository DynamicFieldsRepository { get; }

        IDynamicSurveyLinksRepository DynamicSurveyLinksRepository { get; }
  

        void SaveChanges();
    }
}
