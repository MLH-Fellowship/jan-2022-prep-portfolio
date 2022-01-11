var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]), //starting location
      zoom: 4
    })
});

var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [        
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([80.2707, 13.2046])) //location marker
            })
        ]
    })
});

map.addLayer(layer);
