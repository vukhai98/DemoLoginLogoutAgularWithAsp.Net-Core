using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApI.Models;

namespace WebApI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly AuthenticationContext _context;

        public ProductController(AuthenticationContext context)
        {
            _context = context;
        }

        [HttpGet("getallproducts")]
        public  IActionResult GetAllProducts([FromForm]string searchString,int? page ,int? pageSize)
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

        [HttpGet("getroduct/{id}")]
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
        public async Task<IActionResult> CreatProduct([FromBody]Product product)
        {
            var newProuduct = new Product()
            {
                Name = product.Name,
                Details = product.Details,
                Image = product.Image,
                Cost = product.Cost,
                IsDeleted = product.IsDeleted
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