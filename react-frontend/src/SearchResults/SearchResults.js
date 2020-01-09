import React from "react";

export function SearchResultsComponent(props) {
  if (props.documents.length === 0) {
    return "No search results";
  }

  const resultRow = props.documents.map(r => (
    <li key={r.Id}>
      {r.InvoiceNumber}, {r.SupplierName}
    </li>
  ));

  return <div>{resultRow}</div>;
}
