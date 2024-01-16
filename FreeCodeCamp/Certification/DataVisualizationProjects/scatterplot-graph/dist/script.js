const ScatterplotGraph = function () {
  const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
  W = 800,
  H = 600,
  L = 100,
  T = 20,
  PAD = 50,
  COLOR_NOK = 'red',
  COLOR_OK = 'darkgreen';

  const addLegend = svg => {

    const colors = [
    COLOR_NOK,
    COLOR_OK];


    const legend = svg.append('g').
    attr('id', 'legend').
    selectAll('#legend').
    data(colors).
    enter().
    append('g');
    /*.attr('transform', function (d, i) {
      return 'translate(0,' + (height / 2 - i * 20) + ')';
    });*/

    const yp = i => 25 * (i + 1);

    legend.
    append('rect').
    attr('x', W - PAD).
    attr('y', (d, i) => yp(i)).
    attr('width', 20).
    attr('height', 20).
    style('fill', (d, i) => colors[i]);

    legend.
    append('text').
    attr('class', 'legend-text').
    attr('x', W - PAD - 10).
    attr('y', (d, i) => yp(i) + 15).
    style('text-anchor', 'end').
    text((d, i) => i === 0 ? 'Dope suspect' : 'Clear from Dope');
  };

  const plot = data => {

    d3.select('#chart').
    append('div').
    attr('id', 'title').
    text('Doping in Professional Bicycle Racing & 35 Fastest times up Alpe d\'Huez').
    attr('class', 'title');

    const svg = d3.select('#chart').
    append('svg').
    attr('width', W).
    attr('height', H + PAD);

    const gx = d => d.Year;
    const gy = d => {
      const xs = d.Time.split(':');
      return new Date(2000, 1, 1, 0, xs[0], xs[1]);
    };

    const xScale = d3.scaleLinear().
    domain([d3.min(data, d => gx(d)) - 1, d3.max(data, d => gx(d)) + 1]).
    range([0, W]);

    const yScale = d3.scaleTime().
    domain([d3.min(data, d => gy(d)), d3.max(data, d => gy(d))]).
    range([0, H]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));;
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

    svg.append("g").
    attr("transform", `translate(${PAD},${H})`).
    call(xAxis).
    attr('id', 'x-axis');

    svg.append("g").
    attr("transform", `translate(${PAD},0)`).
    call(yAxis).
    attr('id', 'y-axis');

    const tooltip = d3.select('#chart').
    append('div').
    attr('id', 'tooltip').
    style('display', 'none');

    svg.selectAll("circle").
    data(data).
    enter().
    append("circle").
    attr('class', 'dot').
    attr("cx", d => PAD + xScale(gx(d))).
    attr("cy", d => yScale(gy(d))).
    attr("r", 5).
    attr('data-xvalue', d => gx(d)).
    attr('data-yvalue', d => gy(d)).
    style('fill', d => d.Doping !== '' ? COLOR_NOK : COLOR_OK).
    on('mouseover', (e, d) => {

      const { cx, cy, r } = e.target.attributes;

      const gv = q => parseInt(q.value);

      const info = [
      `Year: ${d.Year}`,
      `Time: ${d.Time}`,
      `Name: ${d.Name}`,
      `Nationality: ${d.Nationality}`,
      `Place: ${d.Place}`,
      `Seconds: ${d.Seconds}`,
      `<em>${d.Doping}</em>`,
      `<a href="${d.URL}">click for more information</a>`].
      map(x => `<div>${x}</div>`).join('');

      tooltip.
      style('display', 'block').
      html(info).
      style('left', gv(cx) + 2 * gv(r) + 'px').
      style('top', gv(cy) + 'px').
      attr('data-year', d.Year);
    }).
    on('mouseout', () => setTimeout(() => tooltip.style('display', 'none'), 2000));

    addLegend(svg);

  };

  const load = () => {
    d3.json(URL).
    then(data => plot(data));
  };

  return {
    load: load };

}();
document.addEventListener('DOMContentLoaded', ScatterplotGraph.load);