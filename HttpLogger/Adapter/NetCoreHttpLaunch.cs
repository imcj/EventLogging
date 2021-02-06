using HttpLogger.EventLaunch;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace HttpLogger.Adapter
{
    public class NetCoreHttpLaunch
    {
        private readonly HttpAssembler _assembler = new HttpAssembler();

        private readonly IEventLaunch _eventLaunch;

        public NetCoreHttpLaunch(string directory, string filename)
        {
            _eventLaunch = new FileEventLaunch(directory, filename);
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
