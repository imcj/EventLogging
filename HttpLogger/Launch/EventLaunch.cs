using System.Collections.Generic;
using System.Threading.Tasks;

namespace HttpLogger.EventLaunch
{
    public class EventLaunch : IEventLaunch
    {
        protected readonly Queue<EventContext> Queue = new Queue<EventContext>();

        public Task Emit(EventContext context)
        {
            Queue.Enqueue(context);
            return Task.CompletedTask;
        }
    }
}
