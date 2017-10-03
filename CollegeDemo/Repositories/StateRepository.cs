using CollegeDemo.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace CollegeDemo.Repositories
{
    public interface IStateRepository
    {
        IEnumerable<State> GetStates();
    }

    public class StateRepository : IStateRepository
    {
        private IConfiguration _configuration;

        public StateRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IEnumerable<State> GetStates()
        {
            var statesSection = _configuration.GetSection("UnitedStates");
            var states = statesSection.GetChildren();

            return states.Select(x => new State { Name = x.Value, Abbreviation = x.Key });
        }
    }
}
