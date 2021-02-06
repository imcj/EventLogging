using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HttpLogger.EventLaunch
{
    public class FileEventLaunch : ConsumerEventLaunch, IEventLaunch
    {
        private readonly string directory;

        private readonly string filename;

        protected FileStream Persistence = null;

        public FileEventLaunch(string directory, string filename)
        {
            this.directory = directory;
            this.filename = filename;

            Start();
        }

        protected override async Task Consume(EventContext context)
        {
            var persistence = CreateFileStream();

            var serialized = JsonSerializer.Serialize(context) + "\n";
            await persistence.WriteAsync(Encoding.UTF8.GetBytes(serialized));
            await persistence.FlushAsync();
        }


        // TODO: 支持文件分割
        protected FileStream CreateFileStream()
        {
            if (null != Persistence) return Persistence;
            var filePath = Path.Combine(directory, $"{filename}.json");
            Persistence = new FileStream(filePath, FileMode.Append, FileAccess.Write);

            return Persistence;
        }
    }
}
