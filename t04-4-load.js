// Placeholder: we will draw the chart in T04-5.
function createBarChart(data) {
  console.log("createBarChart received", data.length, "rows");
}

// Load the CSV and convert count from text to a number.
d3.csv("data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count
})).then(data => {
  console.log(data);
  console.log("rows:", data.length);
  console.log("max:", d3.max(data, d => d.count));
  console.log("min:", d3.min(data, d => d.count));
  console.log("extent:", d3.extent(data, d => d.count));

  // Sort from highest count to lowest.
  data.sort((a, b) => d3.descending(a.count, b.count));

  createBarChart(data);
});