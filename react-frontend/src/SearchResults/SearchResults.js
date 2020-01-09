import React from "react";

export function SearchResultsComponent(props) {
  const resultRow = props.documents.map(r => (
    <li key={r.Id}>
      {r.InvoiceNumber}, {r.SupplierName}
    </li>
  ));

  return <div>{resultRow}</div>;
}
