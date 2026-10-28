const createBarChart = (data) => {
  const viewW = 800;
  const viewH = Math.max(220, data.length * 28);
  const displayW = 900;
  const displayH = displayW * viewH / viewW;

  // Reserve room for brand names and numerical labels.
  const labelX = 200;
  const rightSpace = 60;

  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)
    .attr("width", displayW)
    .attr("height", displayH)
    .style("max-width", "100%")
    .style("height", "auto")
    .style("border", "1px solid #ccc");

  const xMax = d3.max(data, d => d.count);

  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, viewW - labelX - rightSpace]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  // Previous T04-6 drawing block kept for reference.
  /*
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");
  */

  // Create one group for each bar and its labels.
  const barAndLabel = svg.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Bar inside each group.
  barAndLabel.append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", labelX)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  // Brand name to the left.
  barAndLabel.append("text")
    .text(d => d.brand)
    .attr("x", labelX - 8)
    .attr("y", yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .attr("fill", "#fff3d6")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  // Count at the end of each bar.
  barAndLabel.append("text")
    .text(d => d.count)
    .attr("x", d => labelX + xScale(d.count) + 4)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .attr("fill", "#fff3d6")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};