const BarChart = function(){
  const GDP_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
        W = 1200,
        H = 600,
        PAD = 50;
  const plot = (data) => {        
    
    d3.select('#chart')
      .append('div')
      .attr('id','title')
      .text('US Gross Domestic Product');
    
    const svg = d3.select('#chart')   
      .append('svg')
      .attr('width', W)
      .attr('height', H + PAD);
    
    const BW = Math.min(10, Math.floor(W / (data.length || 1)));
    
    const dt = (d) => new Date(d[0]);
    
    const xScale = d3.scaleTime()
                     .domain([d3.min(data, d => dt(d)), d3.max(data, d => dt(d))])
                     .range([0, W]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, (d) => d[1])])
                     .range([H, 0]);
    
    const xAxis = d3.axisBottom(xScale);    
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
       .attr("transform", `translate(${(PAD)},${(H)})`)
       .call(xAxis)
       .attr('id', 'x-axis');
    
    svg.append("g")
       .attr("transform", `translate(${PAD},0)`)
       .call(yAxis)
       .attr('id', 'y-axis');
    
    const tooltip = d3.select('#chart')
      .append('div')    
      .attr('id', 'tooltip')
      .style('display', 'none');
    
    svg.selectAll('rect')
       .data(data)
       .enter()
       .append('rect')
       .attr('class', 'bar')
       .attr('width', (d,i) => BW)
       .attr('height', d => H - yScale(d[1] ))
       .attr('x', (d, i) => xScale(dt(d)))    
       .attr('y', d => yScale(d[1]))
       .attr('fill', 'navy')
       .attr('transform', `translate(${PAD}, 0)`)
       .attr('data-date', d => d[0])
       .attr('data-gdp', d => d[1])
       .on('mouseover', (e, d)=>{
          const {x, y, width, height} = e.target.attributes;
      
          const gv = q => parseInt(q.value);
      
          tooltip          
          .style('display', 'block')
          .html(`<div>${d[0]}</div><div>GDP: ${Intl.NumberFormat('en-us', {style:'currency',currency: 'USD'}).format(d[1])}</div>`)      
          .style('left', PAD + gv(x) + gv(width) + 'px')
          .style('top', gv(y) + 'px')
          .attr('data-date', d[0])
       })
       .on('mouseout', ()=> setTimeout(()=>tooltip.style('display', 'none'), 2000))
      
    /*
       .append('title')
       .attr('id', tooltip')
       .attr('data-date', d => d[0])    
       .html(d => `<div>${d[0]}</div><div>GDP ${d[1]}</div>`);*/
      
  };
  
  const load = () => {    
    d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(data => plot(data.data));
  };

  return {
    load:load
  }
}();
document.addEventListener('DOMContentLoaded', BarChart.load);
