using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CollegeDemo.Models;
using CollegeDemo.Repositories;
using System.Collections.Generic;

namespace CollegeDemo.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CollegesController : Controller
    {
        private ICollegeRepository _collegeRepository;

        public CollegesController(ICollegeRepository collegeRepository)
        {
            _collegeRepository = collegeRepository;
        }
        
        // GET: api/colleges
        [HttpGet]
        public async Task<IEnumerable<ResultCollege>> Get(string name, string state)
        {
            return await _collegeRepository.GetColleges(name, state);
        }
    }
}
