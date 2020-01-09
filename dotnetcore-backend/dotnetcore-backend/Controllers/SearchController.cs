using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetcore_backend.Providers;
using Microsoft.AspNetCore.Mvc;
using Nest;

namespace dotnetcore_backend.Controllers
{
    public class SearchDTO
    {
        public IHit<Document>[] Documents { get; set; }
        public long TotalCount { get; set; }
    }
    public class Document
    {
        public DateTime? CreationTime { get; set; }
        public string OrganizationElementCode { get; set; }
        public string OrganizationElementName { get; set; }
        public string SecondaryStatus { get; set; }
        public string InvoiceTypeName { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; }
        public string InvoiceNumber { get; set; }
        public string InvoiceNumberReverse { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public DateTime? CashDate { get; set; }
        public string CashPercent { get; set; }
        public decimal CashSum { get; set; }
        public string CurrencyCode { get; set; }
        public string ReferencePerson { get; set; }
        public string OrderNumber { get; set; }
        public string Id { get; set; }
        public string Status { get; set; }
        public string CompanyName { get; set; }
        public string CompanyId { get; set; }
    }

    public class SearchRequest
    {
        public string SearchText { get; set; }
    }

    [ApiController]
    [Route("/api")]
    public class SearchController : ControllerBase
    {
        [HttpPost]
        [Route("/searchdocuments")]
        public async Task<SearchDTO> GetDocuments(SearchRequest searchRequest)
        {
            var elasticClient = ElasticClientProvider.GetElasticClient();
            var searchResponse = await elasticClient.SearchAsync<Document>(s => s
                .Query(q => q
                    .MultiMatch(c => c
                        .Fields(f => f
                            .Field(p => p.InvoiceNumber)
                            .Field(p => p.InvoiceNumberReverse)
                            .Field(p => p.SupplierName)
                            .Field(p => p.CompanyName)
                            .Field(p => p.OrganizationElementName))
                        .Query(searchRequest.SearchText)
                        .Type(TextQueryType.PhrasePrefix)
                        .PrefixLength(2))
                )
            );

            return new SearchDTO
            {
                Documents = searchResponse.Hits.ToArray(),
                TotalCount = searchResponse.Total
            };
        }
    }
}