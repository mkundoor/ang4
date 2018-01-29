using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class userstasklistViewModel
    {
        
        public string Task { get; set; }
        public bool  isDone { get; set; }
        public bool isAdmin { get; set; }

        public int pid { get; set; }
        public int tid { get; set; }

        public string CompleteDate { get; set; }

        public userstasklistViewModel (string _task, bool _isdone, bool _isadmin, int _pid, int _tid, string _CompleteDate)
        {
            this.Task = _task;
            this.isDone = _isdone;
            this.isAdmin = _isadmin;
            this.pid = _pid;
            this.tid = _tid;
            this.CompleteDate = _CompleteDate;
        }


    }
}
