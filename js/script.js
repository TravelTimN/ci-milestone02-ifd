// jQuery - load document once fully ready
$(document).ready(function () {

    // map Links
    var osmLink = "<a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>";
    var cartoLink = "<a href='https://carto.com/attribution/' target='_blank'>CARTO</a>";
    var arcgisLink = "<a href='https://developers.arcgis.com/terms/attribution/' target='_blank'>Esri ArcGIS</a>";

    // map URLs
    var osmDarkUrl = "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png";
    var osmLightUrl = "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png";
    var arcgisEarthUrl = "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

    // map Attributes
    var attributes = "&copy; " + osmLink + " contributors | " + cartoLink + " | " + arcgisLink;

    // map Tile Layers
    var osmDarkMap = L.tileLayer(osmDarkUrl, {
        attribution: attributes
    });
    var osmLightMap = L.tileLayer(osmLightUrl, {
        attribution: attributes
    });
    var arcgisEarthMap = L.tileLayer(arcgisEarthUrl, {
        attribution: attributes
    });

    // assigning my custom Icons
    var airplaneIcon = new L.Icon({
        iconUrl: "images/airplane.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });

    // adding the data to Popups
    function addPopupData(feature) {
        var popupData = "";
        popupData += feature.properties.iata;
        return popupData;
    }

    // creating the Layers
    var airports = new L.LayerGroup();

    // assigning the data to the respective layer
    var markers = L.markerClusterGroup();
    var theMarkers = L.geoJson(testData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(addPopupData(feature));
            if (feature.properties.type === "airport") {
                layer.setIcon(airplaneIcon);
                layer.addTo(airports);
            }
        }
    });

    // map Overlay
    var mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");

    // the Map
    var map = L.map("map", {
        layers: [osmDarkMap],
        //center: [30.15, 4.53], // temporary changing to Dublin for testing icon markers
        center: [53.345959, -6.273580],
        //zoom: 3, // temporary changing to Dublin for testing icon markers
        zoom: 7,
        minZoom: 2,
        maxZoom: 18
    });

    // map Layer Control
    var mapLayers = {
        "Dark": osmDarkMap,
        "Light": osmLightMap,
        "Earth": arcgisEarthMap
    };

    // map Options
    var mapOptions = {
        "Airports": airports
    };

    // add Map Layer Control
    L.control.layers(mapLayers, mapOptions).addTo(map);

    // add Map Overlay and sit on very top
    mapOverlay.bringToFront().addTo(map).setZIndex(9);

    // add Icons to Map
    markers.addLayer(theMarkers);

});