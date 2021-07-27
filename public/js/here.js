$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      localCoord = position.coords;
      objLocalCoord = {
        lat: localCoord.latitude,
        lng: localCoord.longitude,
      };
      const platform = new H.service.Platform({
        apikey: hereApiKey,
      });

      // Obtain the default map types from the platform object
      const defaultLayers = platform.createDefaultLayers();
      // Instantiate (and display) a map object:
      const map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map, {
        zoom: 13,
        center: objLocalCoord,
        pixelRatio: window.devicePixelRatio || 1,
      });
      window.addEventListener('resize', () => map.getViewPort().resize());

      const ui = H.ui.UI.createDefault(map, defaultLayers);
      const mapEvents = new H.mapevents.MapEvents(map);
      const behavior = new H.mapevents.Behavior(mapEvents);

      // Draggable Marker Function
      function addDragableMarker(map, behavior) {
        let inputLat = document.getElementById('latitude');
        let inputLng = document.getElementById('longitude');

        if (inputLat.value != '' && inputLng.value != '') {
          objLocalCoord = {
            lat: inputLat.value,
            lng: inputLng.value,
          };
        }

        let marker = new H.map.Marker(objLocalCoord, {
          volatility: true,
        });

        marker.draggable = true;
        map.addObject(marker);

        map.addEventListener(
          'dragstart',
          function (ev) {
            let target = ev.target,
              pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
              let targetPosition = map.geoToScreen(target.getGeometry());
              target['offset'] = new H.math.Point(
                pointer.viewportX - targetPosition.x,
                pointer.viewportY - targetPosition.y
              );
              behavior.disable();
            }
          },
          false
        );

        map.addEventListener(
          'drag',
          function (ev) {
            let target = ev.target,
              pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
              target.setGeometry(
                map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y)
              );
            }
          },
          false
        );

        map.addEventListener(
          'dragend',
          function (ev) {
            let target = ev.target;
            if (target instanceof H.map.Marker) {
              behavior.enable();
              let resultCoord = map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
              inputLat.value = resultCoord.lat.toFixed(5);
              inputLng.value = resultCoord.lng.toFixed(5);
            }
          },
          false
        );
      }

      function calculateRouteAtoB(platform, lat, lng) {
        let router = platform.getRoutingService(),
          routeRequestParam = {
            mode: 'fastest;car',
            representation: 'display',
            routeattributes: 'summary',
            maneuverattributes: 'direction,action',
            waypoint0: `${objLocalCoord.lat},${objLocalCoord.lng}`,
            waypoint1: `${lat},${lng}`,
          };
        router.calculateRoute(routeRequestParam, onSuccess, onError);
      }

      function onSuccess(result) {
        route = result.response.route[0];

        addRouteShapeToMap(route);
        addSummaryToPanel(route.summary);
      }

      function onError(error) {
        alert("Can't reach the remote server" + error);
      }

      function addRouteShapeToMap(route) {
        let linestring = new H.geo.LineString(),
          routeShape = route.shape,
          startPoint,
          endPoint,
          polyline,
          routeline,
          svgStartMark,
          iconStart,
          startMarker,
          svgEndMark,
          iconEnd,
          endMarker;

        routeShape.forEach(function (point) {
          let parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });

        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;
        polyline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 5,
            strokeColor: 'rgba(0, 128, 255, 0.7)',
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head',
          },
        });
        routeline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 5,
            fillColor: 'white',
            strokeColor: 'rgba(255, 255, 255, 1)',
            lineDash: [0, 2],
            lineTailCap: 'arrow-tail',
            lineHeadCap: 'arrow-head',
          },
        });
        svgStartMark = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve" width="512px" height="512px"><g><path d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0  C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6  s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z" data-original="#1081E0" class="active-path" data-old_color="#1081E0" fill="#C12020"/></g> </svg>`;
        iconStart = new H.map.Icon(svgStartMark, {
          size: { h: 35, w: 35 },
        });
        startMarker = new H.map.Marker(
          {
            lat: startPoint.latitude,
            lng: startPoint.longitude,
          },
          { icon: iconStart }
        );
        svgEndMark = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"> <path style="fill:#1081E0;" d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0 C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6 s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/></svg>`;

        iconEnd = new H.map.Icon(svgEndMark, {
          size: { h: 35, w: 35 },
        });

        endMarker = new H.map.Marker(
          {
            lat: endPoint.latitude,
            lng: endPoint.longitude,
          },
          { icon: iconEnd }
        );

        // Add the polyline to the map
        map.addObjects([polyline, routeline, startMarker, endMarker]);

        // And zoom to its bounding rectangle
        map.getViewModel().setLookAtData({
          bounds: polyline.getBoundingBox(),
        });
      }

      function addSummaryToPanel(summary) {
        const sumDiv = document.getElementById('summary');
        const markup = `
            <ul>
                <li>Total Distance: ${summary.distance / 1000}Km</li>
                <li>Travel Time: ${summary.travelTime.toMMSS()} (in current traffic)</li>
            </ul>
        `;
        sumDiv.innerHTML = markup;
      }

      let spaces = [];

      function clearSpace() {
        map.removeObjects(spaces);
        spaces = [];
      }

      function init(latitude, longitude, radius) {
        clearSpace();

        $.ajax({
          type: 'get',
          url: '/dashboard/getdata',
          dataType: 'json',
          success: function (response) {
            response.forEach(e => {
              const jenis = e.jenis;
              const swab = jenis.swab ? 'swab' : '';
              const rapid = jenis.rapid ? 'rapid' : '';
              const pcr = jenis.pcr ? 'pcr' : '';
              const swab_antigen = jenis.swab_antigen ? 'swab_antigen' : '';
              const sars_cov_2 = jenis.sars_cov_2 ? 'sars_cov_2' : '';
              const tempJenis = `${swab} ${rapid} ${pcr} ${swab_antigen} ${sars_cov_2}`;
              svgEndMark = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"> <path style="fill:#1081E0;" d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0 C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6 s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/></svg>`;

              iconEnd = new H.map.Icon(svgEndMark, {
                size: { h: 35, w: 35 },
              });

              let marker = new H.map.Marker(
                {
                  lat: e.latitude,
                  lng: e.longitude,
                },
                { icon: iconEnd }
              );
              marker.setData(`<div style="width: 500;">
                <p>${e.name}</p>
                <p>Jenis Tes: ${tempJenis}</p>
                <p>Harga: ${e.biaya}</p>
              </div>`);
              spaces.push(marker);
            });
            svgStartMark = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve" width="512px" height="512px"><g><path d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0  C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6  s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z" data-original="#1081E0" class="active-path" data-old_color="#1081E0" fill="#C12020"/></g> </svg>`;
            iconStart = new H.map.Icon(svgStartMark, {
              size: { h: 35, w: 35 },
            });
            let marker = new H.map.Marker(
              {
                lat: latitude,
                lng: longitude,
              },
              { icon: iconStart }
            );

            marker.setData(`<div style="width: 500;">
              <p>Lokasi Anda</p>
            </div>`);
            spaces.push(marker);
            console.log(spaces);
            map.addObjects(spaces);
          },
        });
        // fetchSpaces(latitude, longitude, radius).then(function () {
        // });
      }
      if (window.action == 'submit') {
        addDragableMarker(map, behavior);
      }
      if (window.action == 'direction') {
        const lat = $('#lat').attr('val');
        const lng = $('#lng').attr('val');
        calculateRouteAtoB(platform, lat, lng);
        Number.prototype.toMMSS = function () {
          return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds.';
        };
      }
      if (window.action == 'browse') {
        // map.addEventListener(
        //   'dragend',
        //   function (ev) {
        //     let resultCoord = map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
        //     init(resultCoord.lat, resultCoord.lng, 40);
        //   },
        //   false
        // );
        map.addEventListener(
          'tap',
          function (ev) {
            let resultCoord = map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
            let bubble = new H.ui.InfoBubble(ev.target.getGeometry(), {
              content: ev.target.getData(),
            });
            bubble && ui.addBubble(bubble);
            init(resultCoord.lat, resultCoord.lng, 40);
          },
          false
        );

        init(objLocalCoord.lat, objLocalCoord.lng, 40);
      }
    });

    // Open url direction
    // function openDirection(lat, lng, id) {
    //   window.open(`/space/${id}?from=${objLocalCoord.lat},${objLocalCoord.lng}&to=${lat},${lng}`, '_self');
    // }
  } else {
    console.error('Geolocation is not suppported by this browser!');
  }
});
