using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityScoreJult28.ViewModels;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace IdentityScoreJult28.Services
{
    public static class CityStarefromZipService
    {
        //=========================================
        //Get State and City from Zip Code
        //=========================================
        public static async Task<Address> VerifyAddress(int zip)
        {
            Address addr = null;

            using (var client = new HttpClient())
            {
                string BaseUrlOfAPI = "http://ziptasticapi.com/" + zip;
                client.BaseAddress = new Uri(BaseUrlOfAPI);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync(BaseUrlOfAPI);
                if (response.IsSuccessStatusCode)
                {
                    string responsebodyastext = await response.Content.ReadAsStringAsync();
                    // Do whatever you want with thing.
                    addr = JsonConvert.DeserializeObject<Address>(responsebodyastext);


                }
            }

            return addr;
        }
    }
}
