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

    // map Overlay
    var mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");

    // the Map
    var map = L.map("map", {
        layers: [osmDarkMap],
        center: [30.15, 4.53],
        zoom: 3,
        minZoom: 2,
        maxZoom: 18
    });

    // map Layer Control
    var mapLayers = {
        "Dark": osmDarkMap,
        "Light": osmLightMap,
        "Earth": arcgisEarthMap
    };

    // add Map Layer Control
    L.control.layers(mapLayers).addTo(map);

    // add Map Overlay and sit on very top
    mapOverlay.bringToFront().addTo(map).setZIndex(9);

});