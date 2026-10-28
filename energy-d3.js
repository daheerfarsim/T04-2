// Change the existing heading to green.
d3.select("h1")
  .style("color", "green");

// Add a paragraph to the first div, which is #content.
d3.select("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Add an empty rectangle, visible only in the DOM.
d3.select("svg")
  .append("rect");

// Add a visible green rectangle.
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");