using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace IdentityScoreJult28.ViewModels
{
    //geo location based on IP Address
    public class GeoLocProps
    {
           [JsonProperty("ip")]
            public string IP { get; set; }

            [JsonProperty("country_code")]

            public string CountryCode { get; set; }

            [JsonProperty("country_name")]

            public string CountryName { get; set; }

            [JsonProperty("region_code")]

            public string RegionCode { get; set; }

            [JsonProperty("region_name")]

            public string RegionName { get; set; }

            [JsonProperty("city")]

            public string City { get; set; }

            [JsonProperty("zip_code")]

            public string ZipCode { get; set; }

            [JsonProperty("time_zone")]

            public string TimeZone { get; set; }

            [JsonProperty("latitude")]

            public float Latitude { get; set; }

            [JsonProperty("longitude")]

            public float Longitude { get; set; }

            [JsonProperty("metro_code")]

            public int MetroCode { get; set; }

            private GeoLocProps() { }

        public static async Task<GeoLocProps> QueryGeographicalLocationAsync(string ipAddress)
        {
            HttpClient client = new HttpClient();
            string result = await client.GetStringAsync("http://freegeoip.net/json/" + ipAddress);

            return JsonConvert.DeserializeObject<GeoLocProps>(result);
        }
    }
}
