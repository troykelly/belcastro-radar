/* eslint-disable camelcase */
const radarLocations = [
    [-35.661387, 149.512229],
    [-33.700764, 151.20947],
    [-29.620633, 152.963328],
    [-29.496994, 149.850825],
    [-31.024219, 150.192037],
    [-32.729802, 152.025422],
    [-29.038524, 167.941679],
    [-35.15817, 147.456307],
    [-34.262389, 150.875099],
    [-37.85521, 144.755512],
    [-34.234354, 142.086133],
    [-37.887532, 147.575475],
    [-35.99, 142.01],
    [-36.029663, 146.022772],
    [-19.885737, 148.075693],
    [-27.717739, 153.240015],
    [-16.818145, 145.662895],
    [-23.549558, 148.239166],
    [-23.855056, 151.262567],
    [-25.957342, 152.576898],
    [-23.439783, 144.28227],
    [-21.117243, 149.217213],
    [-27.606344, 152.540084],
    [-16.67, 139.17],
    [-20.711204, 139.555281],
    [-19.4198, 146.550974],
    [-26.440193, 147.34913],
    [-12.666413, 141.92464],
    [-16.287199, 149.964539],
    [-34.617016, 138.468782],
    [-43.112593, 147.805241],
    [-41.179147, 145.579986],
    [-23.795064, 133.888935],
    [-12.455933, 130.926599],
    [-12.274995, 136.819911],
    [-14.510918, 132.44701],
    [-11.6485, 133.379977],
    [-34.941838, 117.81637],
    [-17.948234, 122.235334],
    [-24.887978, 113.669386],
    [-20.653613, 116.683144],
    [-31.777795, 117.952768],
    [-33.83015, 121.891734],
    [-28.804648, 114.697349],
    [-25.033225, 128.301756],
    [-30.784261, 121.454814],
    [-22.103197, 113.999698],
    [-33.096956, 119.008796],
    [-32.391761, 115.866955],
    [-20.371845, 118.63167],
    [-30.358887, 116.305769],
    [-15.451711, 128.120856],
    [-35.329531, 138.502498],
    [-32.129823, 133.696361],
    [-37.747713, 140.774605],
    [-31.155811, 136.8044],
    [-18.228916, 127.662836],
    [-29.971116, 146.813845],
  ];
  
  function goRadar() {
    alert("goRadar. It is a go. Radar!");
    let basemap_url;
    let basemap_style;
    let label_url;
    let label_style;
    let svg_icon;
    let attribution;
  
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  
    const offsetWidth =
      window.frameElement && window.frameElement.offsetWidth
        ? window.frameElement.offsetWidth
        : window.innerWidth;
    const offsetHeight =
      window.frameElement && window.frameElement.offsetHeight
        ? window.frameElement.offsetHeight
        : window.innerHeight;
  
    const maxZoom = 10;
    const minZoom = 4;
    const zoomLevel = getParameterByName("zoom_level") || 4;
    const centerLat = getParameterByName("center_latitude") || -27.85;
    const centerLon = getParameterByName("center_longitude") || 133.75;
    const markerLat = getParameterByName("marker_latitude") || centerLat;
    const markerLon = getParameterByName("marker_longitude") || centerLon;
    const timeout = getParameterByName("frame_delay") || 500;
    const frameCount = getParameterByName("frame_count") || 10;
    const barSize = offsetWidth / frameCount;
    const labelSize = getParameterByName("frame_count") ? 128 : 256;
    const labelZoom = getParameterByName("frame_count") ? 1 : 0;
    const locationRadius = getParameterByName("radar_location_radius") || 2;
    const locationLineColour =
      getParameterByName("radar_location_line_colour") || "#00FF00";
    const locationFillColour =
      getParameterByName("radar_location_fill_colour") || "#FF0000";
    const map_style = getParameterByName("map_style")
      ? getParameterByName("map_style").toLowerCase()
      : "light";
    switch (map_style) {
      case "dark":
        basemap_url = "https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png";
        basemap_style = "dark_nolabels";
        label_url =
          "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png";
        label_style = "dark_only_labels";
        svg_icon = "home-circle-light.svg";
        attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';
        break;
      case "voyager":
        basemap_url = "https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png";
        basemap_style = "rastertiles/voyager_nolabels";
        label_url =
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png";
        label_style = "rastertiles/voyager_only_labels";
        svg_icon = "home-circle-dark.svg";
        attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';
        break;
      case "satellite":
        basemap_url =
          "https://server.arcgisonline.com/ArcGIS/rest/services/{style}/MapServer/tile/{z}/{y}/{x}";
        basemap_style = "World_Imagery";
        label_url =
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png";
        label_style = "proton_labels_std";
        svg_icon = "home-circle-dark.svg";
        attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank">ESRI</a>';
        break;
      case "light":
      default:
        basemap_url = "https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png";
        basemap_style = "light_nolabels";
        label_url =
          "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png";
        label_style = "light_only_labels";
        svg_icon = "home-circle-dark.svg";
        attribution =
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';
    }
    let idx = 0;
    let run = true;
    let doRadarUpdate = false;
  
    const static_map = !!(
      getParameterByName("static_map") &&
      getParameterByName("static_map").toLowerCase() === "true"
    );
    const show_recenter = !!(
      getParameterByName("show_recenter") &&
      getParameterByName("show_recenter").toLowerCase() === "true"
    );
    const show_playback = !!(
      getParameterByName("show_playback") &&
      getParameterByName("show_playback").toLowerCase() === "true"
    );
    const show_scale = !!(
      getParameterByName("show_scale") &&
      getParameterByName("show_scale").toLowerCase() === "true"
    );
    const show_marker = !!(
      getParameterByName("show_marker") &&
      getParameterByName("show_marker").toLowerCase() === "true"
    );
    const show_range = !!(
      getParameterByName("show_range") &&
      getParameterByName("show_range").toLowerCase() === "true"
    );
    const show_radar_location = !!(
      getParameterByName("show_radar_location") &&
      getParameterByName("show_radar_location").toLowerCase() === "true"
    );
    const show_radar_coverage = !!(
      getParameterByName("show_radar_coverage") &&
      getParameterByName("show_radar_coverage").toLowerCase() === "true"
    );
  
    let zoomConfig;
  
    if (static_map) {
      zoomConfig = {
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        dragging: false,
        keyboard: false,
        touchZoom: false,
        attributionControl: false,
        minZoom,
        maxZoom,
        maxBounds: [
          [0, 101.25],
          [-55.77657, 168.75],
        ],
        maxBoundsViscosity: 1.0,
      };
    } else {
      zoomConfig = {
        zoomControl: false,
        attributionControl: false,
        minZoom,
        maxZoom,
        maxBounds: [
          [0, 101.25],
          [-55.77657, 168.75],
        ],
        maxBoundsViscosity: 1.0,
      };
    }
    const radarMap = L.map("mapid", zoomConfig).setView(
      [centerLat, centerLon],
      zoomLevel
    );
    const radarImage = [];
    const radarTime = [];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date();
    d.setTime(Math.trunc(d.valueOf() / 600000) * 600000 - frameCount * 600000);
    document.getElementById("progress-bar").style.width = `${barSize}px`;
    document.getElementById("attribution").innerHTML = attribution;
    const t2actions = [];
    if (show_recenter && !static_map) {
      const recenterAction = L.Toolbar2.Action.extend({
        options: {
          toolbarIcon: {
            html:
              '<img src="/hacsfiles/bom-radar-card/recenter.png" width="24" height="24">',
            tooltip: "Re-center",
          },
        },
        addHooks() {
          radarMap.setView([centerLat, centerLon], zoomLevel);
        },
      });
      t2actions.push(recenterAction);
    }
    if (show_playback) {
      const playAction = L.Toolbar2.Action.extend({
        options: {
          toolbarIcon: {
            html:
              '<img id="playButton" src="/hacsfiles/bom-radar-card/pause.png" width="24" height="24">',
            tooltip: "Pause",
          },
        },
        addHooks() {
          run = !run;
          if (run) {
            document.getElementById("playButton").src =
              "/hacsfiles/bom-radar-card/pause.png";
          } else {
            document.getElementById("playButton").src =
              "/hacsfiles/bom-radar-card/play.png";
          }
        },
      });
      t2actions.push(playAction);
      const skipbackAction = L.Toolbar2.Action.extend({
        options: {
          toolbarIcon: {
            html:
              '<img src="/hacsfiles/bom-radar-card/skip-back.png" width="24" height="24">',
            tooltip: "Previous Frame",
          },
        },
        addHooks() {
          skipBack();
        },
      });
      t2actions.push(skipbackAction);
      const skipnextAction = L.Toolbar2.Action.extend({
        options: {
          toolbarIcon: {
            html:
              '<img src="/hacsfiles/bom-radar-card/skip-next.png" width="24" height="24">',
            tooltip: "Next Frame",
          },
        },
        addHooks() {
          skipNext();
        },
      });
      t2actions.push(skipnextAction);
    }
    if (t2actions.length > 0) {
      new L.Toolbar2.Control({
        position: "bottomright",
        actions: t2actions,
      }).addTo(radarMap);
    }
    if (show_scale) {
      L.control
        .scale({
          position: "bottomleft",
          metric: true,
          imperial: false,
          maxWidth: 100,
        })
        .addTo(radarMap);
      if (map_style === "dark" || map_style == "satellite") {
        const scaleDiv = this.document.getElementsByClassName(
          "leaflet-control-scale-line"
        )[0];
        scaleDiv.style.color = "#BBB";
        scaleDiv.style.borderColor = "#BBB";
        scaleDiv.style.background = "#00000080";
      }
    }
    if (map_style === "dark" || map_style == "satellite") {
      this.document.getElementById("div-progress-bar").style.background =
        "#1C1C1C";
      this.document.getElementById("progress-bar").style.background = "steelblue";
      this.document.getElementById("bottom-container").style.background =
        "#1C1C1C";
      this.document.getElementById("bottom-container").style.color = "#DDDDDD";
      this.document.getElementById("bottom-container").className = "dark-links";
    }
    L.tileLayer(basemap_url, {
      style: basemap_style,
      subdomains: "abcd",
      detectRetina: true,
      tileSize: 256,
      zoomOffset: 0,
    }).addTo(radarMap);
    for (let i = 0; i < frameCount; i += 1) {
      radarImage[i] = L.tileLayer(
        "https://api.weather.bom.gov.au/v1/rainradar/tiles/{time}/{z}/{x}/{y}.png",
        {
          time: getRadarTime(d.valueOf() + i * 600000),
          detectRetina: true,
          tileSize: 256,
          zoomOffset: 0,
          opacity: 0,
        }
      ).addTo(radarMap);
      radarTime[i] = getRadarTimeString(d.valueOf() + i * 600000);
    }
    radarImage[idx].setOpacity(1);
    document.getElementById("timestamp").innerHTML = radarTime[idx];
    d.setTime(d.valueOf() + frameCount * 600000);
    const townLayer = L.tileLayer(label_url, {
      subdomains: "abcd",
      detectRetina: false,
      tileSize: labelSize,
      zoomOffset: labelZoom,
    }).addTo(radarMap);
    townLayer.setZIndex(2);
    const myIcon = L.icon({ iconUrl: `img/${svg_icon}`, iconSize: [16, 16] });
    if (show_marker)
      L.marker([markerLat, markerLon], {
        icon: myIcon,
        interactive: false,
      }).addTo(radarMap);
    if (show_range) {
      L.circle([markerLat, markerLon], {
        radius: 50000,
        weight: 1,
        fill: false,
        opacity: 0.3,
        interactive: false,
      }).addTo(radarMap);
      L.circle([markerLat, markerLon], {
        radius: 100000,
        weight: 1,
        fill: false,
        opacity: 0.3,
        interactive: false,
      }).addTo(radarMap);
      L.circle([markerLat, markerLon], {
        radius: 200000,
        weight: 1,
        fill: false,
        opacity: 0.3,
        interactive: false,
      }).addTo(radarMap);
    }
    if (show_radar_location) {
      radarMap.createPane("overlayRadarLocation");
      radarMap.getPane("overlayRadarLocation").style.zIndex = 401;
      radarMap.getPane("overlayRadarLocation").style.pointerEvents = "none";
      radarLocations.forEach((coords) => {
        L.circleMarker([coords[0], coords[1]], {
          radius: locationRadius,
          weight: locationRadius / 2,
          color: locationLineColour,
          fillColor: locationFillColour,
          fillOpacity: 1.0,
          interactive: false,
          pane: "overlayRadarLocation",
        }).addTo(radarMap);
      });
    }
    if (show_radar_coverage) {
      radarMap.createPane("overlayRadarCoverage");
      radarMap.getPane("overlayRadarCoverage").style.opacity = 0.1;
      radarMap.getPane("overlayRadarCoverage").style.zIndex = 400;
      radarMap.getPane("overlayRadarCoverage").style.pointerEvents = "none";
      radarLocations.forEach((coords) => {
        L.circle([coords[0], coords[1]], {
          radius: 250000,
          weight: 1,
          stroke: false,
          fill: true,
          fillOpacity: 1,
          interactive: false,
          pane: "overlayRadarCoverage",
        }).addTo(radarMap);
      });
    }
    setTimeout(() => {
      nextFrame();
    }, timeout);
    setUpdateTimeout();
    function setUpdateTimeout() {
      d.setTime(d.valueOf() + 600000);
      const x = new Date();
      setTimeout(triggerRadarUpdate, d.valueOf() - x.valueOf());
    }
    function triggerRadarUpdate() {
      doRadarUpdate = true;
    }
    function updateRadar() {
      const newLayer = L.tileLayer(
        "https://api.weather.bom.gov.au/v1/rainradar/tiles/{time}/{z}/{x}/{y}.png",
        {
          time: getRadarTime(d.valueOf() - 600000),
          maxZoom,
          tileSize: 256,
          zoomOffset: 0,
          opacity: 0,
        }
      ).addTo(radarMap);
      const newTime = getRadarTimeString(d.valueOf() - 600000);
      radarImage[0].remove();
      for (let i = 0; i < frameCount - 1; i += 1) {
        radarImage[i] = radarImage[i + 1];
        radarTime[i] = radarTime[i + 1];
      }
      radarImage[frameCount - 1] = newLayer;
      radarTime[frameCount - 1] = newTime;
      idx = 0;
      doRadarUpdate = false;
      setUpdateTimeout();
    }
    function getRadarTime(date) {
      const x = new Date(date);
      return (
        x.getUTCFullYear().toString() +
        (x.getUTCMonth() + 1).toString().padStart(2, "0") +
        x.getUTCDate().toString().padStart(2, "0") +
        x.getUTCHours().toString().padStart(2, "0") +
        x.getUTCMinutes().toString().padStart(2, "0")
      );
    }
    function getRadarTimeString(date) {
      const x = new Date(date);
      return `${weekday[x.getDay()]} ${
        month[x.getMonth()]
      } ${x
        .getDate()
        .toString()
        .padStart(2, "0")} ${x
        .getHours()
        .toString()
        .padStart(2, "0")}:${x.getMinutes().toString().padStart(2, "0")}`;
    }
    function nextFrame() {
      if (run) {
        nextImage();
      }
      setTimeout(() => {
        nextFrame();
      }, timeout);
    }
    function skipNext() {
      if (idx === frameCount - 1) {
        idx += 1;
      }
      nextImage();
    }
    function skipBack() {
      if (idx === frameCount) {
        radarImage[frameCount - 1].setOpacity(0);
        idx -= 1;
      } else if (idx < frameCount) {
        radarImage[idx].setOpacity(0);
      }
      idx -= 1;
      if (doRadarUpdate && idx === 1) {
        updateRadar();
      }
      if (idx < 0) {
        idx = frameCount - 1;
      }
      document.getElementById("progress-bar").style.width = `${
        (idx + 1) * barSize
      }px`;
      document.getElementById("timestamp").innerHTML = radarTime[idx];
      radarImage[idx].setOpacity(1);
    }
    function nextImage() {
      if (idx === frameCount) {
        radarImage[frameCount - 1].setOpacity(0);
      } else if (idx < frameCount - 1) {
        radarImage[idx].setOpacity(0);
      }
      idx += 1;
      if (doRadarUpdate && idx === 1) {
        updateRadar();
      }
      if (idx === frameCount + 1) {
        idx = 0;
      }
      if (idx !== frameCount + 1) {
        document.getElementById("progress-bar").style.width = `${
          (idx + 1) * barSize
        }px`;
      }
      if (idx < frameCount) {
        document.getElementById("timestamp").innerHTML = radarTime[idx];
        radarImage[idx].setOpacity(1);
      }
    }
    function resizeWindow() {
      this.document.getElementById("color-bar").width = offsetWidth;
      this.document.getElementById("img-color-bar").width = offsetWidth;
      this.document.getElementById("mapid").width = offsetWidth;
      this.document.getElementById("mapid").height = offsetHeight - 26;
      this.document.getElementById("mapid").style.height = `${parseInt(
        offsetHeight - 26,
        10
      )}px`;
      this.document.getElementById("div-progress-bar").width = offsetWidth;
      this.document.getElementById("bottom-container").width = offsetWidth;
      radarMap.invalidateSize();
    }
  
    resizeWindow();
  }
  
  //   document.addEventListener("DOMContentLoaded", () => {
  //       alert("Starting");
  //     goRadar();
  //   });
  