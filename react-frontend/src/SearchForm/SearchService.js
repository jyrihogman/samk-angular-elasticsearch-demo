export async function performSearch(searchText) {
  const res = await fetch("http://localhost:5000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: searchText })
  });

  return await res.json();
}
