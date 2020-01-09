using System;
using Nest;

namespace dotnetcore_backend.Providers
{
    public interface IElasticClientProvider
    {
        ElasticClient GetElasticClient();
    }

    public static class ElasticClientProvider
    {
        public static ElasticClient ElasticClient { get; set; }

        public static ElasticClient GetElasticClient()
        {
            if (ElasticClient.IsClientInstantiated())
                return ElasticClient;

            var connectionSettings = new ConnectionSettings(new Uri("http://localhost:9200"))
                .DefaultIndex("tenant1")
                .EnableDebugMode()
                .PrettyJson()
                .RequestTimeout(TimeSpan.FromMinutes(2));

            ElasticClient = new ElasticClient(connectionSettings);

            return ElasticClient;
        }

        private static bool IsClientInstantiated(this ElasticClient client)
        {
            return client != null;
        }
    }
}