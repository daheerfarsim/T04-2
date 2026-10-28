const createBarChart = (data) => {
  // Internal SVG coordinate system.
  const viewW = 500;
  const viewH = 1600;

  // Displayed size on the webpage.
  const displayW = 640;
  const displayH = 420;

  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)
    .attr("width", displayW)
    .attr("height", displayH)
    .style("border", "1px solid black");

  // Scale counts to fit the available width.
  const xMax = d3.max(data, d => d.count);

  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, viewW]);

  // Give each brand its own vertical position.
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  // Draw one bar per CSV row.
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
};