using System.Threading.Tasks;

namespace HttpLogger
{
    public interface IEventLaunch
    {
        Task Emit(EventContext context);
    }
}
