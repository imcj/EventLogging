using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HttpLogger.Adapter
{
    public interface INetCoreHttpEventLaunch
    {
        Task Emit(HttpRequest request);
    }
}