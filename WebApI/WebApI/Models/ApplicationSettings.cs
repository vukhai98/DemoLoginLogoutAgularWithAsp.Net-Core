using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApI.Models
{
    public class ApplicationSettings
    {
        public string JWT_Secret { set; get; }
        public string Client_URL { set; get; }
    }
}
