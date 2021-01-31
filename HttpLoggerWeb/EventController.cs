using HttpLogger.Adapter;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HttpLoggerWeb
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly NetCoreHttpLaunch launch;

        public EventController(NetCoreHttpLaunch launch)
        {
            this.launch = launch;
        }

        [HttpPost]
        public async Task Post()
        {
            await launch.EmitAsync(Request);
        }
    }
}
