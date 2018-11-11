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
    var busIcon = new L.Icon({
        iconUrl: "images/bus.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });
    var cityIcon = new L.Icon({
        iconUrl: "images/city.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });
    var ferryIcon = new L.Icon({
        iconUrl: "images/ferry.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });
    var helicopterIcon = new L.Icon({
        iconUrl: "images/helicopter.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });
    var seaplaneIcon = new L.Icon({
        iconUrl: "images/seaplane.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });
    var trainIcon = new L.Icon({
        iconUrl: "images/train.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });

    // adding the data to Popups
    function addPopupData(feature) {
        var popupData = "";
        // add IATA code if it exists
        if (feature.properties.hasOwnProperty("iata")) {
            popupData += "<h1 class='popup-iata " + feature.properties.transport + "'>" +
                feature.properties.iata + "</h1>";
        }
        // add Name code if it exists
        if (feature.properties.hasOwnProperty("name")) {
            popupData += "<p class='popup-text'><span class='popup-name " +
                feature.properties.transport + "'><b>" + feature.properties.name + "</b></span>";
        }
        if (feature.properties.hasOwnProperty("municipality")) {
            if (feature.properties.hasOwnProperty("region")) {
                if (feature.properties.hasOwnProperty("country")) {
                    // add Municipality only if it doesn't match the Region and Region doesn't match Country (ie: Cocos/Keeling Islands)
                    if (feature.properties.municipality != feature.properties.region) {
                        if (feature.properties.region != feature.properties.country) {
                            popupData += "<br>" + feature.properties.municipality + ", " + feature.properties.region +
                                "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                        }
                        // add Region only if it doesn't match the Country
                    } else if (feature.properties.region != feature.properties.country) {
                        popupData += "<br>" + feature.properties.region +
                            "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                        // add just Country if all others are identical (ie: Cocos/Keeling Islands)
                    } else {
                        popupData += "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                    }
                }
            }
        }
        // add Continent if it exists
        if (feature.properties.hasOwnProperty("continent")) {
            popupData += "<br>" + feature.properties.continent + "</p>";
        }
        // add Wikipedia page if it exists
        if (feature.properties.hasOwnProperty("wikipedia")) {
            popupData += "<p class='popup-wiki " + feature.properties.transport +
                "'><a href='" + feature.properties.wikipedia + "' target='_blank'>Wikipedia</a></p>";
        }
        // add Latitude / Longitude
        if (feature.geometry.hasOwnProperty("coordinates")) {
            popupData += "<p class='popup-latlng'>latitude: <span class='latlng " +
                feature.properties.transport + "'>" + feature.geometry.coordinates[0] +
                "</span><br>longitude: <span class='latlng " + feature.properties.transport +
                "'>" + feature.geometry.coordinates[1] + "</span></p>";
        }
        // display the data in the PopUp
        return popupData;
    }

    // creating the Transportation Layers
    var airports = new L.LayerGroup();
    var buses = new L.LayerGroup();
    var cities = new L.LayerGroup();
    var ferries = new L.LayerGroup();
    var heliports = new L.LayerGroup();
    var seaports = new L.LayerGroup();
    var trains = new L.LayerGroup();

    // assigning the data to the respective layer
    var markers = L.markerClusterGroup();
    var theMarkers = L.geoJson(testData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(addPopupData(feature));
            if (feature.properties.transport === "airport") {
                // set the AIRPLANE icon if the "transport" type is airport
                layer.setIcon(airplaneIcon);
                layer.addTo(airports);
            } else if (feature.properties.transport === "bus_station") {
                // set the BUS icon if the "transport" type is bus_station
                layer.setIcon(busIcon);
                layer.addTo(buses);
            } else if (feature.properties.transport === "city_code") {
                // set the CITY icon if the "transport" type is city_code
                layer.setIcon(cityIcon);
                layer.addTo(cities);
            } else if (feature.properties.transport === "ferry_port") {
                // set the FERRY icon if the "transport" type is ferry_port
                layer.setIcon(ferryIcon);
                layer.addTo(ferries);
            } else if (feature.properties.transport === "heliport") {
                // set the HELICOPTER icon if the "transport" type is heliport
                layer.setIcon(helicopterIcon);
                layer.addTo(heliports);
            } else if (feature.properties.transport === "seaplane_base") {
                // set the SEAPLANE icon if the "transport" type is seaplane_base
                layer.setIcon(seaplaneIcon);
                layer.addTo(seaports);
            } else if (feature.properties.transport === "train_station") {
                // set the TRAIN icon if the "transport" type is train_station
                layer.setIcon(trainIcon);
                layer.addTo(trains);
            }
        }
    });

    // map Overlay
    var mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");

    // the Map
    var map = L.map("map", {
        layers: [osmDarkMap],
        //center: [30.15, 4.53], // temporary change to center of Europe
        center: [48.616478, 16.940151],
        //zoom: 3, // temporary change to center of Europe
        zoom: 4,
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
        "Heliports": heliports,
        "Bus Stations": buses,
        "Ferry Ports": ferries,
        "Train Stations": trains,
        "Airports": airports,
        "Seaplane Bases": seaports,
        "City Codes": cities
    };

    // add Map Layer Control
    L.control.layers(mapLayers, mapOptions).addTo(map);

    // add Map Overlay and sit on very top
    mapOverlay.bringToFront().addTo(map).setZIndex(9);

    // add Icons to Map
    markers.addLayer(theMarkers);

});