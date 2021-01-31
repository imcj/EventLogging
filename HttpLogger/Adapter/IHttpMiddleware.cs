using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HttpLogger.Adapter
{
    public interface IHttpMiddleware
    {
        Task Next(HttpContext context, Func<Task> next);
    }
}
