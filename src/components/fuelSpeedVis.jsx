import React, { Component } from 'react';
import d3                   from 'd3';
import _                    from 'lodash';

// for development: 
import { hardData }             from '../hard-coded-response';

export default class FuelSpeedVis extends Component {

  componentDidMount() {
    this.generateVis(this.d3Node);
  }

  componentDidUpdate() {
    if (this.props.apiData.results) {
      this.updateVis(this.d3Node, this.props.apiData.results);
    }
  }

  generateVis(node) {
    // this function sets up the svg and axes for the transition when data is
    // received

    const margin = {top: 20, right: 100, bottom: 30, left: 10},
      width = 1300 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const x = d3.scale.linear()
      .range([0, width]);

    const y = d3.scale.linear()
      .range([height, 0]);

    const color = d3.scale.category10();

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.format("s"));

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    const svg = d3.select(node)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xRange = [0, 0];
    const yRange = [0, 0];

    x.domain(xRange).nice();
    y.domain(yRange).nice();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Average Speed (m/s)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Average fuel eff (km/l)");

  }

  updateVis(node, data) {
    // Note that this handles both the transition from the initial page setup as
    // well as transitions due to new data coming in

    const margin = {top: 20, right: 100, bottom: 30, left: 10},
      width = 1300 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const x = d3.scale.linear()
      .range([0, width]);

    const y = d3.scale.linear()
      .range([height, 0]);

    const color = d3.scale.category10();

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format("s")); 

    // In case there's only one datapoint, we need to set the domain manually so
    // that the axes don't collapse
    const xRange = data.length > 1 ? d3.extent(data, function(d) {return d.distance_m / d.duration_s}) : [0, 15];
    const yRange = data.length > 1 ? d3.extent(data, function(d) {return d.average_kmpl}) : [0, data[0].average_kmpl + 3];

    x.domain(xRange).nice();
    y.domain(yRange).nice();

    const svg = d3.select(node).selectAll('svg');

    const tooltip = d3.select(node).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    const tooltipTemplate = '<div class="tooltipTitle"><%= started_at %> </div>\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Date</span>\
                                  <span class="tooltipMetricValue"><%= started_at %></span>\
                              </div>\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Fuel eff</span>\
                                  <span class="tooltipMetricValue"><%= average_kmpl %></span>\
                              </div>\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Avg Speed</span>\
                                  <span class="tooltipMetricValue"><%= distance_m/duration_s %></span>\
                              </div>\
                              <div class="tooltipLine">\
                                  <span class="tooltipMetricName">Hard Accels</span>\
                                  <span class="tooltipMetricValue"><%= hard_accels %></span>\
                              </div>\
                            </div>'
      
    svg.selectAll('.x')
      .transition()
      .duration(1000)
      .call(xAxis);

    svg.selectAll('.y')
      .transition()
      .duration(1000)
      .call(yAxis);
    
    var points = svg.selectAll(".dot")
      .data(data, function(d) {return d.id;});

    points.transition()
      .duration(1000)
      .attr("cx", function(d) { return x(d.distance_m / d.duration_s); })
      .attr("cy", function(d) { return y(d.average_kmpl); });

    points.enter().append('circle')
      .attr("class", "dot")
      .attr("r", 6.5)
      .attr("cx", -10)
      .attr("cy", -10)
      .style("fill-opacity", 1e-6)
      .on("mouseover", function(d) {
        const compiled = _.template(tooltipTemplate);
        tooltip.transition()
             .duration(200)
             .style("opacity", .9);
        tooltip.html(compiled(d))
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
      }.bind(this))
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      })
      .transition()
      .duration(1000)
      .attr("cx", function(d) { return x(d.distance_m / d.duration_s); })
      .attr("cy", function(d) { return y(d.average_kmpl); })
      .style("fill-opacity", 1)
      .style("fill", function(d) { return color(d.hard_accels); });

    points.exit()
      .transition()
      .duration(1000)
      .style("fill-opacity", 1e-6)
      .remove();
  }  


  
  render() {
    return (
        <div className="fuelSpeedVis vis"
             ref={(node) => this.d3Node = node} 
        >
          <header>
            <h1>How your fuel efficiency relates to your speed</h1>
            <h2>Colors represent the number of hard accelerations on each trip</h2>
          </header>

        </div>
    )
  }
}
