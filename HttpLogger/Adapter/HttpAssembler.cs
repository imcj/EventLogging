using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;


namespace HttpLogger.Adapter
{
    public class HttpAssembler
    {
        private readonly EventContextFactory _factory = new EventContextFactory();
        
        public List<EventContext> ToEventContext(HttpRequest request)
        {
            using var readStream = new StreamReader(
                request.BodyReader.AsStream(), Encoding.UTF8
            );

            var contexts = JsonSerializer.Deserialize<List<object>>(readStream.ReadToEnd())
                .Select(payload =>
                {
                    try
                    {
                        return _factory.Create(request.HttpContext, payload);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }

                    return null;
                })
                .Where(payload => null != payload)
                .ToList();

            return contexts;
        }
    }
}