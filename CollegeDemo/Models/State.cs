using Newtonsoft.Json;

namespace CollegeDemo.Models
{
    public class State
    {
        [JsonProperty(propertyName: "name")]
        public string Name { get; set; }

        [JsonProperty(propertyName: "abbreviation")]
        public string Abbreviation { get; set; }
    }
}