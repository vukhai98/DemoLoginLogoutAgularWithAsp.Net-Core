using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WebApI.Models;

namespace WebApI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly AuthenticationContext _context;
        private readonly IWebHostEnvironment _webHostEnviroment;

        public ProductController(AuthenticationContext context, IWebHostEnvironment webHostEnviroment)
        {
            _context = context;
            _webHostEnviroment = webHostEnviroment;
        }

        [HttpGet("getallproducts")]
        public  IActionResult GetAllProducts(string searchString,int? page ,int? pageSize)
        {
            if (page == null || page.Value == 0) page = 1;
            if (pageSize == null || pageSize.Value == 0) pageSize = 10;
            
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchString))  query = query.Where(x => x.IsDeleted==false && x.Name.ToLower().Contains(searchString.ToLower()));

            if(query.Count() > 0)
            {
                var result = query?.OrderByDescending(x=>x.Cost).Skip((page.Value-1)*pageSize.Value).Take(pageSize.Value)?.ToList();
                return new OkObjectResult(result);
            }
            return new OkObjectResult(new List<Product>());
            



        }

        [HttpGet("getproduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            var result = _context.Products.FirstOrDefault(x => x.ID == id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Cann't find product has id ={id}");
        }

        [HttpPost("creatproduct")]
        public async Task<IActionResult> CreatProduct([FromForm] ProductViewModel product)
        {
            // Get folder include  img 
            // If not exist creat folder
            // If folder exist build pathfileImage 
            //Copy file to Folder 

            string imgUrl = string.Empty;

            if (product.UpLoadImage != null)
            {
                var uniqueFileName = Path.GetFileNameWithoutExtension(product.UpLoadImage.FileName) + "_" + Guid.NewGuid().ToString().Substring(0, 4) + Path.GetExtension(product.UpLoadImage.FileName);
                var filePath = Path.Combine(_webHostEnviroment.WebRootPath, "Image", uniqueFileName);
                await product.UpLoadImage.CopyToAsync(new FileStream(filePath, FileMode.Create));
                imgUrl = $"Image/{uniqueFileName}";

            }
            var newProuduct = new Product()
            {
                Name = product.Name,
                Details = product.Details,
                Image = imgUrl,
                Cost = product.Cost,
                IsDeleted = false,

                
            };
            try
            {
                var result = await _context.Products.AddAsync(newProuduct);
                await _context.SaveChangesAsync();
                return Ok(newProuduct);
            }
            catch (Exception)
            {
                throw;
            }
            }

        [HttpPut("updateproduct")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            if (product != null)
            {
                var updateProduct = _context.Products.FirstOrDefault(x => x.ID == product.ID);
                if (updateProduct != null)
                {
                    updateProduct.Name = product.Name;
                    updateProduct.Details = product.Details;
                    updateProduct.Cost = product.Cost;
                    updateProduct.Image = product.Image;
                    updateProduct.IsDeleted = false;
                    await _context.SaveChangesAsync();
                    return Ok(updateProduct);
                }
            }
            return BadRequest();
        }

        [HttpDelete("deleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = _context.Products.FirstOrDefault(x => x.ID == id);
            if (result != null)
            {
                result.IsDeleted = true;
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}