using Newtonsoft.Json;

namespace CollegeDemo.Models
{
    public class CollegeQueryMetadata
    {
        [JsonProperty("per_page")]
        public long CollegesPerPage { get; set; }

        [JsonProperty("page")]
        public long Page { get; set; }

        [JsonProperty("total")]
        public long Total { get; set; }
    }
}