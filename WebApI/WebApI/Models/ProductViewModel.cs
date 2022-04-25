using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApI.Models
{
    public class ProductViewModel
    {
        public int ID { get; set; }

        [StringLength(50)]
        [Required]
        public string Name { get; set; }

        [Column(TypeName = "ntext")]
        public string Details { get; set; }

        [Column(TypeName = "ntext")]
        public string Image { get; set; }

        //[FileExtensions(Extensions =".png,.jpg,.jpeg,.gif")]
        public IFormFile UpLoadImage { set; get; }
        public int? Cost { get; set; }

        public bool? IsDeleted { get; set; }

    }
}
