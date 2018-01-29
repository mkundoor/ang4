using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityScoreJult28.ViewModels;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace IdentityScoreJult28.Services
{
    public static class GeoLocService 
    {

        #region Constants
        #endregion
       
        public static async Task<RootObject> GetLatLongFromAddress(string address)
        {
           
            var root = new RootObject();
            using (var client = new HttpClient())
            {
                var BaseUrlOfAPI = string.Format("http://maps.googleapis.com/maps/api/geocode/json?address={0}&sensor=true_or_false", address);
                client.BaseAddress = new Uri(BaseUrlOfAPI);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync(BaseUrlOfAPI);
                if (response.IsSuccessStatusCode)
                {
                    string responsebodyastext = await response.Content.ReadAsStringAsync();
                    // Do whatever you want with thing.
                    root  = JsonConvert.DeserializeObject<RootObject>(responsebodyastext);
                    
                    return root;

                }
            }

            return root;

        }
    }
}