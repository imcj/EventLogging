using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace HttpLogger.Adapter
{
    public class HttpLoggerMiddleware : IHttpMiddleware
    {
        private readonly EventContextFactory factory = new EventContextFactory();

        private readonly IEventLaunch queueWriter;

        public HttpLoggerMiddleware(IEventLaunch queueWriter)
        {
            this.queueWriter = queueWriter;
        }

        public async Task Next(HttpContext context, Func<Task> next)
        {
            var loggerHttpContext = factory.Create(context);
            
            await next.Invoke();

            await queueWriter.Emit(loggerHttpContext);
        }
    }
}
