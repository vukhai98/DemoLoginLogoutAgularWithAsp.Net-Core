using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApI.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private readonly IWebHostEnvironment _webHostEnviroment;

        public EmployeesController(AuthenticationContext context, IWebHostEnvironment webHostEnviroment)
        {
            _context = context;
            _webHostEnviroment = webHostEnviroment;
        }

        // GET: api/<EmployeesController>
        [HttpGet("getallemployees")]
        public IActionResult GetAllEmployees(string searchString, int? page, int? pageSize)
        {
            if (page == null || page.Value == 0) page = 1;
            if (pageSize == null || pageSize.Value == 0) pageSize = 50;

            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchString)) query = query.Where(x => x.FullName.ToLower().Contains(searchString.ToLower()));

            if (query.Count() > 0)
            {
                var result = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value)?.ToList();
                return new OkObjectResult(result);
            }
            return new OkObjectResult(new List<Employees>());
        }

        [HttpGet("employee/{id}")]
        public IActionResult GetEmployee(int id)
        {
            var result = _context.Employees.FirstOrDefault(x => x.Id == id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Cann't find Employee has id ={id}");
        }

        [HttpPost("createmployee")]
        public async Task<IActionResult> CreatProduct([FromBody] Employees employee)
        {
            var newEmployee = new Employees()
            {
                FullName = employee.FullName,
                Email = employee.Email,
                Mobile = employee.Mobile,
                City = employee.City,
                Department = employee.Department,
                Gender = employee.Gender,
                HireDate = employee.HireDate,
                IsPermanent = employee.IsPermanent
            };
            try
            {
                var result = await _context.Employees.AddAsync(newEmployee);
                await _context.SaveChangesAsync();
                return Ok(newEmployee);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("updateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employees employee)
        {
            if (employee != null)
            {
                var updateEmployee = _context.Employees.FirstOrDefault(x => x.Id == employee.Id);
                if (updateEmployee != null)
                {
                    updateEmployee.FullName = employee.FullName;
                    updateEmployee.Email = employee.Email;
                    updateEmployee.Mobile = employee.Mobile;
                    updateEmployee.City = employee.City;
                    updateEmployee.Department = employee.Department;
                    updateEmployee.Gender = employee.Gender;
                    updateEmployee.HireDate = employee.HireDate;
                    updateEmployee.IsPermanent = employee.IsPermanent;
                    await _context.SaveChangesAsync();
                    return Ok(updateEmployee);
                }
            }
            return BadRequest();
        }

        [HttpDelete("deleteemployee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var result = _context.Employees.FirstOrDefault(x => x.Id == id);
            if (result != null)
            {
                _context.Remove(result);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}
