using Newtonsoft.Json;

namespace CollegeDemo.Models
{
    public class QueryCollege
    {
        [JsonProperty(propertyName: "id")]
        public int Id { get; set; }

        [JsonProperty("school.name")]
        public string Name { get; set; }

        [JsonProperty("school.city")]
        public string City { get; set; }

        [JsonProperty("school.state")]
        public string State { get; set; }

        [JsonProperty("school.zip")]
        public string Zip { get; set; }

        [JsonProperty("2015.student.size")]
        public int? TotalEnrollment { get; set; }

        [JsonProperty("2015.student.demographics.women")]
        public decimal? PercentFemaleEnrollment { get; set; }

        [JsonProperty("2015.student.demographics.men")]
        public decimal? PercentMaleEnrollment { get; set; }

        [JsonProperty("2015.cost.avg_net_price.overall")]
        public decimal? AverageAnnualNetPrice { get; set; }

        [JsonProperty("2015.aid.loan_principal")]
        public decimal? AverageLoanPrincipal { get; set; }

        [JsonProperty("2015.completion.rate_suppressed.overall")]
        public decimal? OverallCompletionRate { get; set; }

        [JsonProperty("2013.earnings.6_yrs_after_entry.median")]
        public decimal? MedianEarnings6YearsAfterEntry { get; set; }

        [JsonProperty("2013.earnings.10_yrs_after_entry.median")]
        public decimal? MedianEarnings10YearsAfterEntry { get; set; }
    }

    public class ResultCollege
    {
        [JsonProperty(propertyName: "id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zip")]
        public string Zip { get; set; }

        [JsonProperty("totalEnrollment")]
        public int? TotalEnrollment { get; set; }

        [JsonProperty("percentFemaleEnrollment")]
        public decimal? PercentFemaleEnrollment { get; set; }

        [JsonProperty("percentMaleEnrollment")]
        public decimal? PercentMaleEnrollment { get; set; }

        [JsonProperty("averageAnnualNetPrice")]
        public decimal? AverageAnnualNetPrice { get; set; }

        [JsonProperty("averageLoanPrincipal")]
        public decimal? AverageLoanPrincipal { get; set; }

        [JsonProperty("overallCompletionRate")]
        public decimal? OverallCompletionRate { get; set; }

        [JsonProperty("medianEarnings6YearsAfterEntry")]
        public decimal? MedianEarnings6YearsAfterEntry { get; set; }

        [JsonProperty("medianEarnings10YearsAfterEntry")]
        public decimal? MedianEarnings10YearsAfterEntry { get; set; }
    }
}