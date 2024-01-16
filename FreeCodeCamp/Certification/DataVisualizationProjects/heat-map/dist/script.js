const HeatMapChart = function () {
  const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',
  W = 1200,
  H = 600,
  PAD = 60,
  BW = 4,
  COLORS = [
  "#313695",
  "#4575b4",
  "#74add1",
  "#abd9e9",
  "#e0f3f8",
  "#ffffbf",
  "#fee090",
  "#fdae61",
  "#f46d43",
  "#d73027",
  "#a50026"];


  const addTitle = (chart, data) => {
    chart.append('div').
    attr('id', 'title').
    html(`Monthly Global Land-Surface Temperature`);
    chart.append('div').
    attr('id', 'description').
    html(`[base temperature ${data.baseTemperature}&#8451;]`);
  };

  const getMaxMin = (arr, d) => {
    let mx = 0,mn = 0;

    for (let i = 0; i < arr.length; i++) {
      const v = arr[i].variance;
      if (i === 0) {
        mx = v;
        mn = v;
      } else
      {
        if (v > mx) mx = v;
        if (v < mn) mn = v;
      }
    }

    return {
      mx: mx + d,
      mn: mn + d };

  };

  const buildLegend = (svg, data) => {

    const arr = data.monthlyVariance,
    mxmn = getMaxMin(arr, data.baseTemperature),
    legendW = 400,
    legendH = 40;

    const ds = ((min, max, count) => {
      const array = [],
      step = (max - min) / count,
      base = min;
      for (let i = 1; i < count; i++) {
        array.push(base + i * step);
      }
      return array;
    })(mxmn.mn, mxmn.mx, COLORS.length);

    const legendThreshold = d3.
    scaleThreshold().
    domain(ds).
    range(COLORS);

    const xScale = d3.
    scaleBand().
    domain(ds).
    range([0, legendW]);

    const xAxis = d3.
    axisBottom().
    scale(xScale).
    tickFormat(d3.format('.1f'));

    const legend = svg.
    append('g').
    classed('legend', true).
    attr('id', 'legend').
    selectAll('rect').
    data(ds).
    enter().
    append('rect').
    attr('x', d => xScale(d)).
    attr('y', d => 0).
    attr('width', d => xScale.bandwidth(d)).
    attr('height', d => legendH).
    attr('fill', d => legendThreshold(d)).
    attr("transform", `translate(${PAD},${PAD + H})`);

    svg.append("g").
    attr("transform", `translate(${PAD},${PAD + H + legendH})`).
    call(xAxis);


    return {
      threshold: legendThreshold };

  };

  const plot = data => {

    const chart = d3.select('#chart');
    addTitle(chart, data);

    const arr = data.monthlyVariance;

    const svg = d3.select('#chart').
    append('svg').
    attr('width', W + 2 * PAD).
    attr('height', H + 2 * PAD);

    const gtx = d => d.year;

    const fnMs = () => {
      const qs = [];let i = 0;
      while (i < 12) qs.push(i++);
      return qs;
    };

    const months = fnMs();

    const monthName = d => new Date(2000, d, 1).toLocaleString('default', { month: 'long' });

    const xScale = d3.scaleBand().
    domain(arr.map(d => gtx(d))).
    range([0, W]).
    padding(0);
    const yScale = d3.scaleBand().
    domain(months).
    rangeRound([0, H]).
    padding(0);

    const xAxis = d3.axisBottom().
    scale(xScale).
    tickValues(xScale.domain().filter(y => y % 10 === 0)).
    tickFormat(d => parseInt(d)).
    tickSize(10, 1);

    const yAxis = d3.axisLeft().
    scale(yScale).
    tickValues(yScale.domain()).
    tickFormat(d => monthName(d)).
    tickSize(10, 1);

    svg.append("g").
    attr("transform", `translate(${PAD},${H})`).
    call(xAxis).
    attr('id', 'x-axis');

    svg.append("g").
    attr("transform", `translate(${PAD},0)`).
    call(yAxis).
    attr('id', 'y-axis');

    const legend = buildLegend(svg, data);

    const tooltip = d3.select('#chart').
    append('div').
    attr('id', 'tooltip').
    style('display', 'none');

    svg.
    append('g').
    classed('map', true).
    selectAll('rect').
    data(arr).
    enter().
    append('rect').
    attr('class', 'cell').
    attr('width', d => xScale.bandwidth(gtx(d))).
    attr('height', d => yScale.bandwidth(d.month - 1)).
    attr('x', d => xScale(gtx(d))).
    attr('y', d => yScale(d.month - 1)).
    attr('fill', d => legend.threshold(data.baseTemperature + d.variance)).
    attr('transform', `translate(${PAD}, 0)`).
    attr('data-month', d => d.month - 1).
    attr('data-year', d => d.year).
    attr('data-temp', d => data.baseTemperature + d.variance).
    on('mouseover', (e, d) => {
      const { x, y, width, height } = e.target.attributes;
      const gv = q => q ? parseInt(q.value) : 0;
      tooltip.
      style('display', 'block').
      html(`<div>${d.year} - ${monthName(d.month)}</div><div>${(data.baseTemperature + d.variance).toFixed(1)}&#8451;</div><div>${d.variance.toFixed(1)}&#8451;</div>`).
      style('left', PAD + gv(x) + gv(width) + 'px').
      style('top', gv(y) + 'px').
      attr('data-year', d.year);
    }).
    on('mouseout', () => setTimeout(() => tooltip.style('display', 'none'), 2000));

  };

  const load = () => {
    d3.json(URL).
    then(data => plot(data)).
    catch(err => console.log(err));
  };

  return {
    load: load };

}();
document.addEventListener('DOMContentLoaded', HeatMapChart.load);