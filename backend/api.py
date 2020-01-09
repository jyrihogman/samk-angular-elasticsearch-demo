from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

es = Elasticsearch("http://localhost:9200")
included_fields = [
    "CreationTime",
    "OrganizationElementCode",
    "OrganizationElementName",
    "SecondaryStatus",
    "InvoiceTypeName",
    "SupplierCode",
    "SupplierName",
    "InvoiceNumber",
    "InvoiceDate",
    "CashDate",
    "CashPercent",
    "CashSum",
    "CurrencyCode",
    "ReferencePerson",
    "OrderNumber",
    "Id",
    "Status",
    "CompanyName",
    "CompanyId",
]


@app.route("/search", methods=["POST"])
def search_documents():
    print(request.json)
    print(request.form)
    print(request.json["query"])

    body = {
        "size": 5000,
        "_source": {"includes": included_fields},
        "query": {
            "multi_match": {
                "query": request.json["query"],
                "fields": [
                    "InvoiceNumberReverse",
                    "InvoiceNumber",
                    "SupplierName",
                    "CompanyName",
                ],
                "type": "phrase_prefix",
            }
        },
    }

    response = es.search(index="tenant1", body=body, filter_path=["hits.hits._source"])

    return jsonify([hit["_source"] for hit in response["hits"]["hits"]])


if __name__ == "__main__":
    app.run()
