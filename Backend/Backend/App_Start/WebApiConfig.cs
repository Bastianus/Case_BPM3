using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Backend
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute(
                                //TODO: limit possible websites that we take requests from

                              "*", // allowed websites

                              "*", // allowed headers

                              "*"); // allowed methods

            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
