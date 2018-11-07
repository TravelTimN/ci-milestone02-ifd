// jQuery - load document once fully ready
$(document).ready(function () {

    // map Link
    var osmLink = "<a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>";

    // map URL
    var osmDarkUrl = "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png";

    // map Attributes
    var attributes = "&copy; " + osmLink + " contributors";

    // map Tile Layer
    var osmDarkMap = L.tileLayer(osmDarkUrl, {
        attribution: attributes
    });

    // the Map
    var map = L.map("map", {
        layers: [osmDarkMap],
        center: [30.15, 4.53],
        zoom: 3
    });

});