using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CollegeDemo.Models
{
    public class CollegeQueryResult
    {
        [JsonProperty("metadata")]
        public CollegeQueryMetadata Metadata { get; set; }

        [JsonProperty("results", NullValueHandling = NullValueHandling.Ignore)]
        public QueryCollege[] QueryColleges { get; set; }

        [JsonProperty("schools", NullValueHandling = NullValueHandling.Ignore)]
        public ResultCollege[] ResultColleges { get; set; }

        public static CollegeQueryResult FromJson(string json)
        {
            return JsonConvert.DeserializeObject<CollegeQueryResult>(json, new JsonSerializerSettings
            {
                MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
                DateParseHandling = DateParseHandling.None,
            });
        }
    }

    public static class Serialize
    {
        public static string ToJson(this CollegeQueryResult self)
        {
            return JsonConvert.SerializeObject(self, new JsonSerializerSettings
            {
                MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
                DateParseHandling = DateParseHandling.None
            });
        }
    }
}