// ======================================

// ======================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

using System.Net.Http;
using System.Net.Http.Headers;

namespace IdentityScoreJult28.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
        /*
           public IActionResult Interview()
           {
               return View();
           }



           public async Task<JsonResult> GetEvents()
           {
               string Baseurl = "http://localhost:4863/";
               using (var client = new HttpClient())
               {
                   //Passing service base url  
                   client.BaseAddress = new Uri(Baseurl);

                   client.DefaultRequestHeaders.Clear();
                   //Define request data format  
                   client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                   HttpResponseMessage Res = await client.GetAsync("api/EventsDTO/EventsList/14");
                   if (Res.IsSuccessStatusCode)
                   {
                       var events = Res.Content.ReadAsStringAsync().Result;
                       return Json(Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(events));
                       //return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                   }
                   else
                   {
                       return Json(new { });
                   }
               }
           }



         [HttpPost]
         public JsonResult SaveEvent(Event e)
         {
             var status = false;
             using (MyDatabaseEntities dc = new MyDatabaseEntities())
             {
                 if (e.EventID > 0)
                 {
                     //Update the event
                     var v = dc.Events.Where(a => a.EventID == e.EventID).FirstOrDefault();
                     if (v != null)
                     {
                         v.Subject = e.Subject;
                         v.Start = e.Start;
                         v.End = e.End;
                         v.Description = e.Description;
                         v.IsFullDay = e.IsFullDay;
                         v.ThemeColor = e.ThemeColor;
                     }
                 }
                 else
                 {
                     dc.Events.Add(e);
                 }

                 dc.SaveChanges();
                 status = true;

             }
             return new JsonResult { Data = new { status = status } };
         }

         [HttpPost]
         public JsonResult DeleteEvent(int eventID)
         {
             var status = false;
             using (MyDatabaseEntities dc = new MyDatabaseEntities())
             {
                 var v = dc.Events.Where(a => a.EventID == eventID).FirstOrDefault();
                 if (v != null)
                 {
                     dc.Events.Remove(v);
                     dc.SaveChanges();
                     status = true;
                 }
             }
             return new JsonResult { Data = new { status = status } };
         }



         // GET api/values
         [Route("api/[controller]"), Authorize, HttpGet]
         public IEnumerable<string> Get()
         {
             return new string[] { "value1", "value2" };
         }
     } */
    }
}
