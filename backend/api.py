from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

es = Elasticsearch("http://localhost:9200")
included_fields = ["SupplierName", "InvoiceNumber"]


@app.route("/search", methods=["POST"])
def search_documents():
    response = es.search(index="tenant1", body=get_query_body(request))
    return jsonify([hit["_source"] for hit in response["hits"]["hits"]])


def get_query_body(request):
    return {
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
                "type": "best_fields",
            }
        },
    }


app.run()
