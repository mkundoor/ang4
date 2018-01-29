// ======================================
// Author: Meghna Reddy
// ======================================

using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IParticipantRepository : IRepository<Participant>
    {
        IEnumerable<Participant> GetQualifiedParticipantData();
        IEnumerable<Participant> GetAllParticipantData();
        void InsertSurveyParticipant(Participant participant);
        // For the Admin people
        Task<bool> UpdateMemberAsync(Participant participant);
        Task<bool> DeleteMemberAsync(int id);
        bool ValidateMemberExists(string email);

        void InsertSurveyParticipantTable(Participant _participant, Survey _survey);
        Task<List<Participant>> GetMemberAsyncList();
        Task<List<Participant>> GetAllMembers();
        Task<PagingResult<Participant>> GetMembersPageAsync(int skip, int take);
        Task<Participant> GetMemberAsync(int id);

        int getscore(string userfullname);
        Participant getparticipantObj(string userfullname);

        int getSID(int pid);
        void Save();
     
    }
}
