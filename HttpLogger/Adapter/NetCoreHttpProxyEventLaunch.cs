using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace HttpLogger.Adapter
{
    public class NetCoreHttpProxyEventLaunch : INetCoreHttpEventLaunch
    {
        private readonly HttpClient _httpClient = new HttpClient();

        private readonly string _upstream;

        public NetCoreHttpProxyEventLaunch(string upstream)
        {
            _upstream = upstream;
        }
        
        public async Task Emit(HttpRequest request)
        {
            // TODO: 使用流

            using var readStream = new StreamReader(
                request.BodyReader.AsStream(), Encoding.UTF8
            );
            var stringContent = new StringContent(
                await readStream.ReadToEndAsync(), 
                Encoding.UTF8, 
                "application/json"
                );
            request.Headers.TryGetValue("Referer", out var referer);
            request.Headers.TryGetValue("X-Forwarded-For", out var forwarded);
            stringContent.Headers.TryAddWithoutValidation("Referer", referer.ToString());
            stringContent.Headers.TryAddWithoutValidation("X-Forwarded-For", forwarded.ToArray());
            await _httpClient.PostAsync(_upstream, stringContent);
        }
    }
}