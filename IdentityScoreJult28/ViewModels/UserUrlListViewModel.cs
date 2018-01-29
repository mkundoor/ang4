using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    public class UserUrlListViewModel
    {
        
        public string Url { get; set; }
        public bool  UrlisDone { get; set; }
        public bool UrlisAdmin { get; set; }

        public int pid { get; set; }
        public int uid { get; set; }

        public UserUrlListViewModel(string _Url, bool _UrlisDone, bool _UrlisAdmin, int _pid, int _uid)
        {
            this.Url = _Url;
            this.UrlisDone = _UrlisDone;
            this.UrlisAdmin = _UrlisAdmin;
            this.pid = _pid;
            this.uid = _uid;
        }


    }
}
