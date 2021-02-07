using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace HttpLogger.Adapter
{
    public class NetCoreHttpEventLaunch : INetCoreHttpEventLaunch
    {
        private readonly HttpAssembler _assembler = new HttpAssembler();

        private readonly IEventLaunch _eventLaunch;

        public NetCoreHttpEventLaunch(IEventLaunch launch)
        {
            _eventLaunch = launch;
        }

        public async Task Emit(HttpRequest request)
        {
            await Task.Run(() =>
            {
                return _assembler
                    .ToEventContext(request)
                    .Select(context => _eventLaunch.Emit(context))
                    .ToList();
            });
        }
    }
}
