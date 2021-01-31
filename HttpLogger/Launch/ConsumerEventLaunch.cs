using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace HttpLogger.EventLaunch
{
    public abstract class ConsumerEventLaunch : EventLaunch, IEventLaunch
    {
        private readonly AutoResetEvent ResetEvent = new AutoResetEvent(false);

        protected Thread Background;

        public void Start()
        {
            Background = new Thread(Worker);
            Background.Start(this);
        }

        protected static async void Worker(object eventLaunch)
        {
            var self = (ConsumerEventLaunch)eventLaunch;
            while (true)
            {
                if (!self.Queue.TryDequeue(out EventContext context))
                {
                    self.ResetEvent.WaitOne(1000000);
                }
                else
                {
                    await self.Consume(context);
                }
            }
        }

        protected abstract Task Consume(EventContext context);
    

        public new Task Emit(EventContext context)
        {
            base.Emit(context);
            ResetEvent.Set();

            return Task.CompletedTask;
        }
    }
}
