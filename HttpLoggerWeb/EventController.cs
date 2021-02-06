using HttpLogger.Adapter;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HttpLoggerWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        
        private readonly NetCoreHttpLaunch _launch;

        private readonly INetCoreHttpEventLaunch _proxyLaunch = new NetCoreHttpProxyLaunch("https://localhost:5001/api/event");

        public EventController(NetCoreHttpLaunch launch, IHttpContextAccessor httpContextAccessor)
        {
            _launch = launch;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public async Task Post()
        {
            await _launch.Emit(_httpContextAccessor.HttpContext.Request);
        }

        [HttpPost("proxy")]
        public async Task Proxy()
        {
            await _proxyLaunch.Emit(Request);
        }
    }
}
