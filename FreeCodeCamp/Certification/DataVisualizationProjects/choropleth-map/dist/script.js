const ChoroplethMapChart = function () {
  const EDUCATION_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
  COUNTY_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json',
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
    html(`United States Educational Attainment`);
    chart.append('div').
    attr('id', 'description').
    html(`Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)`);
  };

  const getMaxMin = arr => {
    let mx = 0,mn = 0;

    for (let i = 0; i < arr.length; i++) {
      const v = arr[i].bachelorsOrHigher;
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
      mx: mx,
      mn: mn };

  };

  const addLegend = (svg, arr) => {

    const mxmn = getMaxMin(arr),
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

    return legendThreshold;
  };

  const plot = (edu, cty) => {
    const getEducation = d => {
      if (!d) return null;
      const z = edu.filter(x => x.fips === d.id);
      return z.length === 0 ? null : z[0];
    };

    const getEdu = d => {
      const o = getEducation(d);
      return o ? o.bachelorsOrHigher : 0;
    };

    const chart = d3.select('#chart');
    addTitle(chart);

    const svg = d3.select('#chart').
    append('svg').
    attr('width', W + 2 * PAD).
    attr('height', H + 2 * PAD);

    const tooltip = d3.select('#chart').
    append('div').
    attr('id', 'tooltip').
    style('display', 'none');

    const legendThreshold = addLegend(svg, edu);

    const path = d3.geoPath();
    svg.
    append('g').
    selectAll('path').
    data(topojson.feature(cty, cty.objects.counties).features).
    enter().
    append('path').
    attr('class', 'county').
    attr('d', path).
    attr('data-fips', d => d.id).
    attr('data-education', d => getEdu(d)).
    attr('fill', d => legendThreshold(getEdu(d))).
    on('mouseover', (e, d) => {
      const { pageX, pageY } = e;
      const z = getEducation(d);
      tooltip.
      style('display', 'block').
      html(`<div>${z.area_name}, ${z.state} ${z.bachelorsOrHigher}%</div>`).
      style('left', pageX + 20 + 'px').
      style('top', pageY - 20 + 'px').
      attr('data-education', z.bachelorsOrHigher);
    }).
    on('mouseout', () => setTimeout(() => tooltip.style('display', 'none'), 2000));
  };

  const load = () => {
    Promise.all([
    d3.json(EDUCATION_URL),
    d3.json(COUNTY_URL)]).

    then(vs => plot(vs[0], vs[1])).
    catch(err => console.error(err.message));
  };

  return {
    load: load };

}();
document.addEventListener('DOMContentLoaded', ChoroplethMapChart.load);