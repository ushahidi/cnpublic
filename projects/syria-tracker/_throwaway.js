      // Syria: http://global.mapit.mysociety.org/area/363218.html
  /*
  d3.json("http://global.mapit.mysociety.org/area/13538.geojson", function(error, data) {
    svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("d", path);
  */

    /*
    var places = [
      {
        name: "Damascus",
        location: {
          latitude: 33.5074755,
          longitude: 36.2828954
        }
      },
      {
        name: "Homs",
        location: {
          latitude: 34.731787,
          longitude: 36.6774272
        }
      }
    ];

    svg.selectAll(".pin-label")
      .data(places)
      .enter().append("text", ".pin-label")
      .attr("transform", function(d) {
        var coords = projection([
          d.location.longitude,
          d.location.latitude
        ]);

        return "translate(" + [coords[0] + 40, coords[1] + 4] + ")"
      })
      .text(function(d) { return d.name });
    */

      //setTransparency('damascus', 'damascus', totalRecords);

    /*
    var places = [
      {
        name: "Damascus",
        location: {
          latitude: 33.5074755,
          longitude: 36.2828954
        }
      },
      {
        name: "Aleppo",
        location: {
          latitude: 36.2064346,
          longitude: 37.1549892
        }
      },
      {
        name: "Homs",
        location: {
          latitude: 34.731787,
          longitude: 36.6774272
        }
      }
    ]

    /*
    svg.selectAll(".pin")
      .data(places)
      .enter().append("circle", ".pin")
      .attr("r", 5)
      .attr("transform", function(d) {
        return "translate(" + projection([
          d.location.longitude,
          d.location.latitude
        ]) + ")"
      });
    

    svg.selectAll(".pin-label")
      .data(places)
      .enter().append("text", ".pin-label")
      .attr("transform", function(d) {
        var coords = projection([
          d.location.longitude,
          d.location.latitude
        ]);

        return "translate(" + [coords[0] + 10, coords[1] + 4] + ")"
      })
      .text(function(d) { return d.name });



    // Hama: http://global.mapit.mysociety.org/area/15059.html
    d3.json("http://global.mapit.mysociety.org/area/15059.geojson", function(err, data2) {
      svg.append("path")
        .datum(data2)
        .attr("class", "border")
        .attr("id", "hama")
        .attr("d", path);

        setTransparency('Hama', 'hama', totalRecords);

    });

    // Deir ez-Zor: http://global.mapit.mysociety.org/area/364211.html
    d3.json("http://global.mapit.mysociety.org/area/364211.geojson", function(err, data3) {
      svg.append("path")
        .datum(data3)
        .attr("class", "border")
        .attr("id", "deir")
        .attr("d", path);

        setTransparency('deir', 'deir', totalRecords);
    });

    // Palmyra: http://global.mapit.dev.mysociety.org/area/395279.html
    d3.json("http://global.mapit.dev.mysociety.org/area/395279.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "palmyra")
        .attr("d", path);

        setTransparency('palmyra', 'palmyra', totalRecords);
    });

    // Rif Dimashq: http://global.mapit.dev.mysociety.org/area/238843.html
    d3.json("http://global.mapit.dev.mysociety.org/area/238843.geojson", function(err, data) {

      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "rifdimashq")
        .attr("d", path);

        setTransparency('dimashq', 'rifdimashq', totalRecords);
    });

    // Daraa: http://global.mapit.mysociety.org/area/364219.html
    d3.json("http://global.mapit.mysociety.org/area/364219.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "daraa")
        .attr("d", path);

        setTransparency('daraa', 'daraa', totalRecords);
    });

    // As-Suwayda
    d3.json("http://global.mapit.mysociety.org/area/364220.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "assuwayda")
        .attr("d", path);

        setTransparency('suwayda', 'assuwayda', totalRecords);
    });

    // Al-Hasakah: http://global.mapit.mysociety.org/area/364210.html
    d3.json("http://global.mapit.mysociety.org/area/364210.geojson", function(err, data5) {
      svg.append("path")
        .datum(data5)
        .attr("class", "border")
        .attr("id", "alhasakah")
        .attr("d", path);

        setTransparency('Hasakah', 'alhasakah', totalRecords);
    });

    // Al-Raqqah
    d3.json("http://global.mapit.mysociety.org/area/364213.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "alraqqah")
        .attr("d", path);

        setTransparency('Raqqah', 'alraqqah', totalRecords);
    });

    
    // Quneitra: http://global.mapit.mysociety.org/area/364218.html
    d3.json("http://global.mapit.mysociety.org/area/364218.geojson", function(err, data4) {

      data4.coordinates[0] = data4.coordinates[0].splice(0, Math.ceil(data4.coordinates[0].length / 2));

      svg.append("path")
        .datum(data4)
        .attr("class", "border")
        .attr("id", "quneitra")
        .attr("d", path);

        setTransparency('quneitra', 'quneitra', totalRecords);
    });

    // Homs: http://global.mapit.mysociety.org/area/364212.html
    d3.json("http://global.mapit.mysociety.org/area/364212.geojson", function(err, data4) {
      console.log(data4);
      data4.coordinates[0] = data4.coordinates[0].splice(0, Math.ceil(data4.coordinates[0].length / 2));
      svg.append("path")
        .datum(data4)
        .attr("class", "border")
        .attr("id", "homs")
        .attr("d", path);

        setTransparency('homs', 'homs');
    });

    // Latakia: http://global.mapit.dev.mysociety.org/area/395284.html
    d3.json("http://global.mapit.dev.mysociety.org/area/395284.geojson", function(err, data) {

      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "latakia")
        .attr("d", path);

        setTransparency('latakia', 'latakia', totalRecords);
    });

    //http://global.mapit.dev.mysociety.org/area/395281.html

    // Aleppo: http://global.mapit.mysociety.org/area/364214.html
    d3.json("http://global.mapit.mysociety.org/area/364214.geojson", function(err, data4) {
      svg.append("path")
        .datum(data4)
        .attr("class", "border")
        .attr("id", "aleppo")
        .attr("d", path);

        setTransparency('aleppo', 'aleppo', totalRecords);
    });

    // Idlib: http://global.mapit.dev.mysociety.org/area/395282.html
    d3.json("http://global.mapit.dev.mysociety.org/area/395282.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "idlib")
        .attr("d", path);

        setTransparency('idlib', 'idlib', totalRecords);
    });

    // Tartus: http://global.mapit.dev.mysociety.org/area/395283.geojson
    d3.json("http://global.mapit.dev.mysociety.org/area/395283.geojson", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "tartus")
        .attr("d", path);

        setTransparency('tartus', 'tartus', totalRecords);
    });


    d3.json("/projects/syria-tracker/damascus.json", function(err, data) {
      svg.append("path")
        .datum(data)
        .attr("class", "border")
        .attr("id", "damascus")
        .attr("d", path);

        setTransparency('damascus', 'damascus', totalRecords);
    });
    */