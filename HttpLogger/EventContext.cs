using System;

namespace HttpLogger
{
    [Serializable]
    public class EventContext
    {
        public string RequestMethod { get; }

        public string RequestQueryString { get; }

        public string UserAgent { get; }
        
        public string Referer { get; }

        public string[] HttpXForwardedFor { get; }

        public string RequestContentType { get; }

        public string Host { get; }

        public int Port { get; }

        public string Protocol { get; }

        public bool IsHttps { get; }

        public long RequestBodyBytesSent { get; set; }

        public string RequestPath { get; }

        public string RemoteAddr { get; }

        public DateTime RequestedAt { get; }

        public object Payload { get; }

        public string RequestId { get; }

        public EventContext(string requestMethod, string requestQueryString, 
            string userAgent, string referer, string[] httpXForwardedFor,
            string requestContentType, string host, int port,
            string protocol, bool isHttps, long requestBodyBytesSent,
            string requestPath, string remoteAddr, DateTime requestedAt,
            object payload)
        {
            RequestMethod = requestMethod;
            RequestQueryString = requestQueryString;
            UserAgent = userAgent;
            Referer = referer;
            HttpXForwardedFor = httpXForwardedFor;
            RequestContentType = requestContentType;
            Host = host;
            Port = port;
            Protocol = protocol;
            IsHttps = isHttps;
            RequestBodyBytesSent = requestBodyBytesSent;
            RequestPath = requestPath;
            RemoteAddr = remoteAddr;
            RequestedAt = requestedAt;
            Payload = payload;

            RequestId = Guid.NewGuid().ToString();
        }
    }
}
