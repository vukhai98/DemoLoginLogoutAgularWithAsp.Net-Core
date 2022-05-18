using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApI.Models
{
    public class Employees
    {
        [Key]
        public int Id { set; get; }

        [StringLength(50)]
        [Column(TypeName = "ntext")]
        public string FullName { set; get; }


        [StringLength(50)]
        [Column(TypeName = "ntext")]
        public string Email { set; get; }


        [StringLength(50)]
        [Column(TypeName = "ntext")]
        public string Mobile { set; get; }

        public string City { set; get; }
        public int Gender { set; get; }
        public string Department { set; get; }
        public DateTime HireDate { set; get; }
        public bool IsPermanent { set; get; }
    }
}
