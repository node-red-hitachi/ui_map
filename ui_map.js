/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    var mapID = 0;

    function CSS(config) {
        var css = String.raw`
<link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.2.0/css/ol.css" type="text/css">
<style>
.nr-map {
    height: 100%;
    width: 100%;
}
</style>
<script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.2.0/build/ol.js"></script>
`;
        return css;
    };

    function HTML(config) {
        var html = String.raw`
<div id="map${mapID}" class="nr-map"></div>
<script type="text/javascript">
(function (scope, ol) {

var zoom = 8;
var tokyo = [139.76, 35.68];

var viewObj = new ol.View({
    center: ol.proj.fromLonLat(tokyo),
    zoom: zoom
});

var markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var map = new ol.Map({
    target: 'map${mapID}',
    layers: [
        osmLayer, 
        markerLayer
    ],
    view: viewObj
});

var markerStyle = function(res) {
   var styles = [
       new ol.style.Style({
           image: new ol.style.Icon({
               scale: 0.5,
               opacity: 0.6,
               src: "http://dev.openlayers.org/img/marker.png"
           })
       })
   ];
   return styles;
};

scope.$watch('msg', function(msg) {
    console.log("; msg:", msg);
    if (msg && msg.hasOwnProperty("payload")) {
        var payload = msg.payload;
        if (payload.hasOwnProperty("center")) {
            var center = payload.center;
            viewObj.animate({center: ol.proj.fromLonLat(center)});
        }
        if (payload.hasOwnProperty("zoom")) {
            var zoom = payload.zoom;
            viewObj.animate({zoom: zoom});
        }
        if (payload.hasOwnProperty("markers")) {
            var markers = payload.markers;
            var source = markerLayer.getSource(); 
            for (var marker of markers) {
                var pos = ol.proj.fromLonLat(marker);
                var mark = new ol.Feature({
                    geometry: new ol.geom.Point(pos)
                });
                mark.setStyle(markerStyle);
                source.addFeature(mark);
            }
        }
    }
});

})(scope, ol);
</script>
`;
        mapID++;
        return html;
    };

    var ui = undefined;
    function MapNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
                var css = CSS(config);
                ui.addWidget({
                    node: node,
                    format: css,
                    templateScope: "global"
                });
            }
            RED.nodes.createNode(this, config);
            var html = HTML(config);
            var done = ui.addWidget({
                node: node,
                width: config.width,
                height: config.height,
                format: html,
                templateScope: "local",
                group: config.group,
                emitOnlyNewValues: false,
                forwardInputMessages: false,
                storeFrontEndInputAsState: false,
                convertBack: function (value) {
                    return value;
                },
                beforeEmit: function(msg, value) {
                    return { msg: { payload: value.payload } };
                },
                beforeSend: function (msg, orig) {
                    if (orig) {
                        return orig.msg;
                    }
                },
                initController: function($scope, events) {
                }
            });
        }
        catch (e) {
            console.log(e);
        }
        node.on("close", done);
    }
    RED.nodes.registerType('ui_map', MapNode);
};
