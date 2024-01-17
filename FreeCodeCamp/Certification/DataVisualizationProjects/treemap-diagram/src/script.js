const SELECTED = 'videoGame';

const Datasets = {
  videoGame : {
    tit:'Video Game Sales',
    descr:'Top 100 Most Sold Video Games Grouped by Platform',
    url:'https://cdn.jsdelivr.net/gh/freeCodeCamp/testable-projects-fcc@a80ce8f9/src/data/tree_map/video-game-sales-data.json'
  },
  movie : {
    tit:'Movie Sales',
    descr:'Top 100 Highest Grossing Movies Grouped By Genre',
    url:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
  },
  kickstarterPledges : {
    tit:'Kickstarter Pledges',
    descr:'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
    url:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
  }
};

const TreemapDiagram = function(){
  const CHART_ID = 'chart',
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
            "#a50026"
        ];
  
  const addTitle = (chart, dataset) => {
    chart.append('div')
      .attr('id','title')
      .html(dataset.tit);
    chart.append('div')
      .attr('id','description')
      .html(dataset.descr);    
  };
  
  const getColor = d3.scaleOrdinal().range(COLORS);
  
  const buildTree = (data) => {    
    const root = d3
      .hierarchy(data)
      .eachBefore(d => {
        d.data.id = `${(d.parent ? d.parent.data.id + '.' : '')}${d.data.name}`
      })
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);
    
    d3.treemap().size([W, H]).paddingInner(1)(root);
    
    return root
  }
  
  const buildLegend = (svg, root) => {

    const pad = 10,
    sz = 15,
    pos = 4,
    colW = 100,
    cols = Math.floor(W / colW),    
    getX = i => (i % cols) * 100,
    getY = i => (Math.floor(i / cols) * sz + pad * Math.floor(i / cols)),

    cats = root.leaves()
      .map(nodes => nodes.data.category)
      .filter((category, index, self) => self.indexOf(category) === index),
    
    legend = svg
      .append('g')   
      .classed('legend', true)
      .attr('id', 'legend') 
      .attr('transform', `translate(${PAD},${H+PAD})`)
      .selectAll('g')
      .data(cats)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${getX(i)},${getY(i)})`);

    legend
      .append('rect')
      .attr('class', 'legend-item')
      .attr('width', sz)
      .attr('height', sz)
      .attr('fill', d => getColor(d));

    legend
      .append('text')
      .attr('x', sz + pos)
      .attr('y', sz - pos)
      .text(d => d);
  };
  
  let dombuf = [];
  const showNames = chart => {    
    document.querySelectorAll(`#${CHART_ID} > svg > g > rect`).forEach(x=>{      
      const r = x.getBoundingClientRect();
      const div = document.createElement('div');
      div.className = 'NameBlock';
      div.innerHTML = x.getAttribute('data-name');
      div.style.left = r.x+'px';
      div.style.top = r.y+'px';
      div.style.width = r.width +'px';
      document.body.appendChild(div);
      dombuf.push(div)
    });
  };
  
  const plot = (dataset, data) => {
    /* hack for dom context */
    dombuf.forEach(x=>x.remove());
    dombuf = [];
    
    const chart = d3.select(`#${CHART_ID}`);
    chart.selectAll("*").remove();
    addTitle(chart, dataset);
    
    const svg = chart  
      .append('svg')
      .attr('width', W + 2*PAD)
      .attr('height', H + 2*PAD); 
    
    const tooltip = chart
      .append('div')    
      .attr('id', 'tooltip')
      .style('display', 'none');
    
    const root = buildTree(data);
    
    svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'group')
      .append('rect')
      .attr('id', d => d.data.id)
      .attr('class', 'tile')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr('fill', d => getColor(d.data.category))
      .attr('transform', d => 'translate(' + d.x0 + ',' + d.y0 + ')')    
      .on('mouseover', (e, d)=>{
        const {pageX, pageY} = e;
        const {name, category, value} = d.data;
        tooltip          
          .style('display', 'block')
          .html(`<div>${name}</div><div>${category}: ${value}</div>`)
          .style('left', pageX + 20 + 'px')
          .style('top', pageY - 20 + 'px')
          .attr('data-value', value)
      })
      .on('mouseout', ()=> setTimeout(()=>tooltip.style('display', 'none'), 2000));
    
    buildLegend(svg, root);
    
    showNames(chart);
  };
  
  const load = dataset => {
    if (!dataset || !dataset.url) dataset = Datasets['videoGame'];
    d3.json(dataset.url)
      .then(data => plot(dataset, data))
      .catch(err => console.log(err))
  };

  return {
    load:load
  }
}();
const FormControl = function(){
  const loadTreemap = x => TreemapDiagram.load(Datasets[x])
  
  const load = () => {
    const sel = document.getElementById('datasetSelect');
    for(const k in Datasets){
      const opt = document.createElement('option');
      if (k === SELECTED){
        opt.selected = true;
      }
      opt.value = k;
      opt.text = Datasets[k].tit;
      sel.appendChild(opt);
    }
    sel.addEventListener('change', e => loadTreemap(e.target.value));
    loadTreemap(SELECTED)
  };
  
  return {
    load:load
  }
}();
document.addEventListener('DOMContentLoaded', FormControl.load);