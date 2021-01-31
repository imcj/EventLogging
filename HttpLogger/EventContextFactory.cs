using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Text;

namespace HttpLogger
{
    public class EventContextFactory
    {
        public EventContext Create(HttpContext context, object payload)
        {
            var request = context.Request;
            var headers = request.Headers;

            headers.TryGetValue("User-Agent", out StringValues userAgent);
            var hasHttpXForwardedFor = headers.TryGetValue("X-Forwarded-For", out StringValues httpXForwardedFor);
            var hasContentType = headers.TryGetValue("Content-Type", out StringValues contentType);

            return new EventContext(
                request.Method,
                request.QueryString.ToString(),
                userAgent.ToString(),
                hasHttpXForwardedFor ? httpXForwardedFor.ToArray() : new string[] { },
                hasContentType ? contentType.ToString() : "",
                context.Connection.LocalIpAddress.ToString(),
                context.Connection.LocalPort,
                request.Protocol,
                request.IsHttps,
                request.ContentLength ?? -1,
                request.Path.ToString(),
                request.HttpContext.Connection.RemoteIpAddress.ToString(),
                DateTime.UtcNow,
                payload
            ); ;
        }

        public EventContext Create(HttpContext context) => Create(context, null);
    }
}
