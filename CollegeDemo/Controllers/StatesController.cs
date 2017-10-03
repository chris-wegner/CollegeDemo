using CollegeDemo.Models;
using CollegeDemo.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CollegeDemo.Controllers
{
    [Produces("application/json")]
    [Route("api/States")]
    public class StatesController : Controller
    {
        private IStateRepository _stateRepository;

        public StatesController(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        // GET: api/states
        [HttpGet]
        public IEnumerable<State> Get()
        {
            return _stateRepository.GetStates();
        }
    }
}