using System;
using Elasticsearch.Net;
using Nest;
using Nest.JsonNetSerializer;
using Newtonsoft.Json.Serialization;

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

            var connectionSettings = new ConnectionSettings(
                    new SingleNodeConnectionPool(new Uri("http://localhost:9200")), sourceSerializer: JsonNetSerializer.Default)
                .DefaultIndex("tenant1")
                .EnableDebugMode()
                .PrettyJson()
                .DefaultFieldNameInferrer(p => p)
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