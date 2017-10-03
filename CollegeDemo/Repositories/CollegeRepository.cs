using AutoMapper;
using CollegeDemo.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CollegeDemo.Repositories
{
    public interface ICollegeRepository
    {
        Task<IEnumerable<ResultCollege>> GetColleges(string name, string state);
    }

    public class CollegeRepository : ICollegeRepository
    {
        IConfiguration _configuration;

        public CollegeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<ResultCollege>> GetColleges(string name, string state)
        {
            var url = GetCollegesUrl(name, state);

            string resultJson;
            using (var client = new HttpClient())
            {
                resultJson = await client.GetStringAsync(url);
            }

            var queryResult = CollegeQueryResult.FromJson(resultJson);

            //Avoid serializing the source API's json property names, so re-map the query results to a new object. 
            Mapper.Initialize(cfg => cfg.CreateMap<QueryCollege, ResultCollege>());
            var result = queryResult.QueryColleges.Select(x => Mapper.Map<ResultCollege>(x)).ToArray();

            return result;
        }

        internal string GetCollegesUrl(string name, string state)
        {
            var apiSection = _configuration.GetSection("ScorecardApi");
            var baseUrl = apiSection.GetValue<string>("BaseUrl");
            var baseQueryString = apiSection.GetValue<string>("BaseQueryString");
            var queryFields = apiSection.GetValue<string>("QueryFields");
            var querySort = apiSection.GetValue<string>("QuerySort");
            var apiKey = apiSection.GetValue<string>("ApiKey");

            var nameQueryString = !string.IsNullOrEmpty(name) ? $"&school.name={name}" : string.Empty;
            var stateQueryString = !string.IsNullOrEmpty(state) ? $"&school.state={state}" : string.Empty;
            var apiKeyQueryString = $"&api_key={apiKey}";

            var url = $"{baseUrl}{baseQueryString}{nameQueryString}{stateQueryString}{queryFields}{querySort}{apiKeyQueryString}";

            return url;
        }
    }
}