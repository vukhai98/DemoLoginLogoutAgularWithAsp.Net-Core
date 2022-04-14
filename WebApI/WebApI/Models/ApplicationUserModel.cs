using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApI.Models
{
    public class ApplicationUserModel
    {
        public string UserName { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string FullName { set; get; }
    }
}
