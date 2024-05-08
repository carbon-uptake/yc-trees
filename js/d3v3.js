<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://d3js.org/topojson.v1.min.js"></script>
<script>
  var width = 800,
     height = 600;

  var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height);
    // 자바스크립트는 여기에
  //var color = d3.scaleThreshold().range(["yellowgreen", "lightgreen", "darkgreen"]);
  // const color = d3.scaleThreshold([0, 1], ["red", "white", "blue"]);
  var map = svg.append("g").attr("id", "map"),
  places = svg.append("g").attr("id", "places");

  var projection = d3.geo.mercator()
.center([126.9895, 37.5651])
.scale(100000)
.translate([width/2, height/2]);

  var path = d3.geo.path().projection(projection);

  d3.json("/js/seoul_municipalities_topo_simple.json", function(error, data) {
    var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features;

    map.selectAll("path")
        .data(features)
      .enter().append("path")
        .attr("class", function(d) { console.log(); return "municipality c" + d.properties.code })
        .attr("d", path);

    map.selectAll("text")
        .data(features)
      .enter().append("text")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("class", "municipality-label")
        .text(function(d) { return d.properties.name; })
  });
</script>