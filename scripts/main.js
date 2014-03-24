(function() {
  var globe = planetaryjs.planet();
  // Load our custom `autorotate` plugin; see below.
  globe.loadPlugin(autorotate(10));
  // The `earth` plugin draws the oceans and the land; it's actually
  // a combination of several separate built-in plugins.
  //
  // Note that we're loading a special TopoJSON file
  // (world-110m-withlakes.json) so we can render lakes.
  
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   '/scripts/world-110m-withlakes.json' },
    oceans:   { fill:   '#222222' },
    land:     { fill:   '#666666' },
    borders:  { stroke: '#333333' }
  }));
  // Load our custom `lakes` plugin to draw lakes; see below.
  globe.loadPlugin(lakes({
    fill: '#222222'
  }));
  /*
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file: '/scripts/world-110m.json' }
  }));
  */
  // The `pings` plugin draws animated pings on the globe.
  globe.loadPlugin(planetaryjs.plugins.pings());
  // The `zoom` and `drag` plugins enable
  // manipulating the globe with the mouse.
  //globe.loadPlugin(planetaryjs.plugins.zoom({
  //  scaleExtent: [100, 300]
  //}));
  globe.loadPlugin(planetaryjs.plugins.drag({
    // Dragging the globe should pause the
    // automatic rotation until we release the mouse.
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));
  // Set up the globe's initial scale, offset, and rotation.
  globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);

  var doVis = function(data) {
    setInterval(function() {
      var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
      var item = data[Math.floor(Math.random() * data.length)];
      //console.log(item);
      if(item.geo.coords) {
        var lat = item.geo.coords[1];
        var lng = item.geo.coords[0];
        var color;

        var tagNames = _(item.tags).pluck('name');
        //console.log(tagNames);
        if(_(tagNames).contains('physical-violence')) {
          color = 'orange';
        }
        else if(_(tagNames).contains('arrest')) {
          color = 'yellow';
        }
        else if(_(tagNames).contains('arrest')) {
          color = 'green';
        }
        else {
          color = 'cyan';
        }

        //var 
        globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: 30 });
      }
    }, 250);
  };

  var doVis2 = function(arr) {
    var diameter = 420,
    format = d3.format(",d"),
    color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#bubbleGraph").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var processData = function() {
      var tagCounts = {}, 
          tags = [];

      _(arr).each(function(item) {
        _(item.tags).each(function(tag) {
          if(tag.name !== "conflict") {
            if(_(tagCounts[tag.name]).isUndefined()) {
              tagCounts[tag.name] = 1;
            }
            else {
              tagCounts[tag.name]++;
            }
          }
        });
      });

      var tags = _(_(tagCounts).keys()).map(function(key) {
        return {
          className: key,
          package: "cluster", 
          value: tagCounts[key]
        }
      });

      return { children: tags };
    };

    var data = processData();
    console.log(data);
    var node = svg.selectAll(".node")
      .data(bubble.nodes(data)
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("title")
          .text(function(d) { return d.className + ": " + format(d.value); });

      node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style("fill", function(d) { return color(d.className); });

      node.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .style("font-size", "10px")
          .style("text-transform", "capitalize")
          .text(function(d) { return d.className.replace("-"," ").substring(0, d.r / 3); });      
  };

  // This is hideous. I am in a tremendous hurry.
  $.ajax({
    url: 'http://devapi.crisis.net/item?limit=100',
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer 532d32c7ed3329652f114b70');
    },
    success: function (data) {
      var arr = data;
      $.ajax({
        url: 'http://devapi.crisis.net/item?source=gdelt&&offset=100limit=100',
        dataType: "json",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer 532d32c7ed3329652f114b70');
        },
        success: function (data) {
          _(data).each(function(item) {
            arr.push(item);
          });

          doVis(arr);
          doVis2(arr);
        }
      });
    }
  });

  var canvas = document.getElementById('rotatingGlobe');
  // Special code to handle high-density displays (e.g. retina, some phones)
  // In the future, Planetary.js will handle this by itself (or via a plugin).
  if (window.devicePixelRatio == 2) {
    canvas.width = 800;
    canvas.height = 800;
    context = canvas.getContext('2d');
    context.scale(2, 2);
  }
  // Draw that globe!
  globe.draw(canvas);

  // This plugin will automatically rotate the globe around its vertical
  // axis a configured number of degrees every second.
  function autorotate(degPerSec) {
    // Planetary.js plugins are functions that take a `planet` instance
    // as an argument...
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      // ...and configure hooks into certain pieces of its lifecycle.
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          // This plugin uses the built-in projection (provided by D3)
          // to rotate the globe each time we draw it.
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };

  // This plugin takes lake data from the special
  // TopoJSON we're loading and draws them on the map.
  function lakes(options) {
    options = options || {};
    var lakes = null;

    return function(planet) {
      planet.onInit(function() {
        // We can access the data loaded from the TopoJSON plugin
        // on its namespace on `planet.plugins`. We're loading a custom
        // TopoJSON file with an object called "ne_110m_lakes".
        var world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  };
})();