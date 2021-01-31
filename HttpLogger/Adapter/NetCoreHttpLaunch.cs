using HttpLogger.EventLaunch;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HttpLogger.Adapter
{
    public class NetCoreHttpLaunch
    {
        private readonly EventContextFactory factory = new EventContextFactory();

        protected IEventLaunch eventLaunch;

        public NetCoreHttpLaunch(string directory, string filename)
        {
            eventLaunch = new FileEventLaunch(directory, filename);
        }

        public async Task EmitAsync(HttpRequest request)
        {
            using var readStream = new StreamReader(
                request.BodyReader.AsStream(), Encoding.UTF8
            );
            try
            {
                var payloads = JsonSerializer.Deserialize<List<object>>(readStream.ReadToEnd());

                for (int i = 0; i < payloads.Count; i++)
                {
                    object payload = payloads[i];
                    await eventLaunch.Emit(
                        factory.Create(request.HttpContext, payload)
                    );
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
