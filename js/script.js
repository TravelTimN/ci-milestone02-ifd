// hide the main page / map on initial load until user is finished with Modal
$("#main-container").hide();

/* adding marker count to start of page (modal),
requires adding them to LayerGroup outside of thte map build below */
var airportCount = new L.LayerGroup(),
    busCount = new L.LayerGroup(),
    cityCount = new L.LayerGroup(),
    ferryCount = new L.LayerGroup(),
    heliportCount = new L.LayerGroup(),
    seaportCount = new L.LayerGroup(),
    trainCount = new L.LayerGroup();
L.geoJson(iataData, {
    onEachFeature: function (feature, layer) {
        if (feature.properties.transport === "airport") {
            layer.addTo(airportCount);
        } else if (feature.properties.transport === "bus_station") {
            layer.addTo(busCount);
        } else if (feature.properties.transport === "city_code") {
            layer.addTo(cityCount);
        } else if (feature.properties.transport === "ferry_port") {
            layer.addTo(ferryCount);
        } else if (feature.properties.transport === "heliport") {
            layer.addTo(heliportCount);
        } else if (feature.properties.transport === "seaplane_base") {
            layer.addTo(seaportCount);
        } else if (feature.properties.transport === "train_station") {
            layer.addTo(trainCount);
        }
    }
});
// animated counter from zero to X-value
// concept of animated count-up is from: https://codepen.io/saadeghi/pen/KdpdoQ
// for some of the code, I had assistance from my mentor (James Timmins) how to make this into a working function
// I had the code already working, but he helped me eliminate nearly 100 lines unneccessary repeating code (replacing "this")
var countMarkers = function (markerID, markerType) {
    $(markerID).prop("Counter", 0).animate({
        Counter: markerType.getLayers().length
    }, {
        duration: 10000,
        easing: "swing",
        step: function (now) {
            $(markerID).text(Math.ceil(now));
        }
    });
};
// update the modal with total number of markers per transport type
$("#count-airport").html(countMarkers("#count-airport", airportCount));
$("#count-buses").html(countMarkers("#count-buses", busCount));
$("#count-cities").html(countMarkers("#count-cities", cityCount));
$("#count-ferries").html(countMarkers("#count-ferries", ferryCount));
$("#count-heliports").html(countMarkers("#count-heliports", heliportCount));
$("#count-seaports").html(countMarkers("#count-seaports", seaportCount));
$("#count-trains").html(countMarkers("#count-trains", trainCount));

// rest of document once fully ready
$(document).ready(function () {

    // once modal is closed, hide the modal and show the map
    $("#modal-close").on("click", function () {
        $("#modal-container").hide();
        $("#main-container").fadeIn(500);

        // map Attribution Links
        var osmLink = "<a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener'>OpenStreetMap</a>",
            cartoLink = "<a href='https://carto.com/attribution/' target='_blank' rel='noopener'>CARTO</a>",
            arcgisLink = "<a href='https://developers.arcgis.com/terms/attribution/' target='_blank' rel='noopener'>Powered by Esri</a>";

        // map Tile URLs
        var osmDarkUrl = "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
            osmLightUrl = "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
            arcgisEarthUrl = "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        // map Attributes
        var attributes = "&copy; " + osmLink + " contributors | " + cartoLink + " | " + arcgisLink;

        // map Tile Layers
        var osmDarkMap = L.tileLayer(osmDarkUrl, {
                attribution: attributes
            }),
            osmLightMap = L.tileLayer(osmLightUrl, {
                attribution: attributes
            }),
            arcgisEarthMap = L.tileLayer(arcgisEarthUrl, {
                attribution: attributes
            });

        // assigning my own custom Icons
        var airplaneIcon = new L.Icon({
                iconUrl: "images/airplane.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            busIcon = new L.Icon({
                iconUrl: "images/bus.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            cityIcon = new L.Icon({
                iconUrl: "images/city.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            ferryIcon = new L.Icon({
                iconUrl: "images/ferry.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            helicopterIcon = new L.Icon({
                iconUrl: "images/helicopter.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            seaplaneIcon = new L.Icon({
                iconUrl: "images/seaplane.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            trainIcon = new L.Icon({
                iconUrl: "images/train.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            });

        // adding the data to PopUps
        function addPopupData(feature) {
            var popupData = "";
            // add IATA code (must exist)
            popupData += "<h1 class='popup-iata " + feature.properties.transport + "'>" +
                feature.properties.iata + "</h1>";
            // add Name (must exist)
            popupData += "<p class='popup-text'><span class='popup-name " + feature.properties.transport +
                "'><b>" + feature.properties.name + "</b></span>";
            // add Municipality if it exists
            if (feature.properties.hasOwnProperty("municipality")) {
                // add Region if it exists
                if (feature.properties.hasOwnProperty("region")) {
                    // add Country if it exists
                    if (feature.properties.hasOwnProperty("country")) {
                        // but only add these 3 properties if they don't all match each other
                        if (feature.properties.municipality !== feature.properties.region) {
                            if (feature.properties.region !== feature.properties.country) {
                                popupData += "<br>" + feature.properties.municipality + ", " + feature.properties.region +
                                    "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                            } else {
                                // if Municipality and Region are the same as the country (ie: Cocos/Keeling Islands), then only add Country
                                popupData += "<br>" + feature.properties.municipality +
                                    "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                            }
                        } else if (feature.properties.region !== feature.properties.country) {
                            // Municipality and Region are identical here, so only add Region if it doesn't match the Country too
                            popupData += "<br>" + feature.properties.region +
                                "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                        } else {
                            // add just Country if all others are identical (ie: Cocos/Keeling Islands)
                            popupData += "<br>" + feature.properties.country + " (" + feature.properties.countryISO + ")";
                        }
                    }
                }
            }
            // add Continent (must exist)
            popupData += "<br>" + feature.properties.continent + "</p>";
            // add Website (must exist)
            if (feature.properties.hasOwnProperty("website")) {
                if (feature.properties.website !== "") {
                    // if website property contains 'wikipedia'
                    if (feature.properties.website.includes('wikipedia')) {
                        popupData += "<p class='popup-website " + feature.properties.transport +
                            "'><a href='" + feature.properties.website + "' target='_blank' rel='noopener'>Wikipedia</a></p>";
                    } else if (feature.properties.website.includes('wikitravel')) {
                        // if website property contains 'wikitravel' (only the City_Codes)
                        popupData += "<p class='popup-website " + feature.properties.transport +
                            "'><a href='" + feature.properties.website + "' target='_blank' rel='noopener'>Wikitravel</a></p>";
                    } else if (feature.properties.website.includes('google')) {
                        // if website property contains 'google' (performs a Google Search of the item)
                        popupData += "<p class='popup-website " + feature.properties.transport +
                            "'><a href='" + feature.properties.website + "' target='_blank' rel='noopener'>Google</a></p>";
                    }
                }
            }
            // add Latitude / Longitude (must exist)
            popupData += "<p class='popup-latlng'>latitude: <span class='latlng " + feature.properties.transport + "'>" +
                feature.geometry.coordinates[0] + "</span><br>longitude: <span class='latlng " + feature.properties.transport + "'>" +
                feature.geometry.coordinates[1] + "</span></p>";
            // display the data in the PopUp
            return popupData;
        }

        // creating the Transportation Layers
        var airports = new L.LayerGroup(),
            buses = new L.LayerGroup(),
            cities = new L.LayerGroup(),
            ferries = new L.LayerGroup(),
            heliports = new L.LayerGroup(),
            seaports = new L.LayerGroup(),
            trains = new L.LayerGroup();

        // assigning the Icons to their respective layers
        var theMarkers = L.geoJson(iataData, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(addPopupData(feature));
                if (feature.properties.transport === "airport") {
                    // set the AIRPLANE icon if the transport property is airport
                    layer.setIcon(airplaneIcon);
                    layer.addTo(airports);
                } else if (feature.properties.transport === "bus_station") {
                    // set the BUS icon if the transport property is bus_station
                    layer.setIcon(busIcon);
                    layer.addTo(buses);
                } else if (feature.properties.transport === "city_code") {
                    // set the CITY icon if the transport property is city_code
                    layer.setIcon(cityIcon);
                    layer.addTo(cities);
                } else if (feature.properties.transport === "ferry_port") {
                    // set the FERRY icon if the transport property is ferry_port
                    layer.setIcon(ferryIcon);
                    layer.addTo(ferries);
                } else if (feature.properties.transport === "heliport") {
                    // set the HELICOPTER icon if the transport property is heliport
                    layer.setIcon(helicopterIcon);
                    layer.addTo(heliports);
                } else if (feature.properties.transport === "seaplane_base") {
                    // set the SEAPLANE icon if the transport property is seaplane_base
                    layer.setIcon(seaplaneIcon);
                    layer.addTo(seaports);
                } else if (feature.properties.transport === "train_station") {
                    // set the TRAIN icon if the transport property is train_station
                    layer.setIcon(trainIcon);
                    layer.addTo(trains);
                }
            }
        });

        // map Overlay (the labels of the map)
        var mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");

        // the Map itself (with initial values)
        var map = L.map("map", {
            layers: [arcgisEarthMap],
            center: [23.5, 12],
            zoom: 3,
            minZoom: 3,
            maxZoom: 18,
            maxBounds: [
                [-75, -190],
                [90, 190]
            ],
            maxBoundsViscosity: 0.5,
        });

        // flyTo the latitude/longitude + zoom level based on the user selection
        $("#countries").on("change", function () {
            var countryData = $(this).val().split(","),
                MapLat = countryData[0],
                MapLng = countryData[1],
                MapZoom = parseInt(countryData[2]);
            map.flyTo([MapLat, MapLng], MapZoom);
        });

        // map Layer Control
        var mapLayers = {
            "<img src='images/mapDark.png' width='25px' height='25px' alt='Dark Map'> <span class='popup-text'>Dark</span>": osmDarkMap,
            "<img src='images/mapLight.png' width='25px' height='25px' alt='Light Map'> <span class='popup-text'>Light</span>": osmLightMap,
            "<img src='images/mapEarth.png' width='25px' height='25px' alt='Earth Map'> <span class='popup-text'>Earth</span>": arcgisEarthMap
        };

        // map Transportation Options/Layers
        var mapOptions = {
            "<img src='images/airplane.png' width='25px' height='25px' class='layers-icon' alt='Airports'> <span class='popup-text'>Airports</span>": airports,
            "<img src='images/bus.png' width='25px' height='25px' class='layers-icon' alt='Bus Stations'> <span class='popup-text'>Bus Stations</span>": buses,
            "<img src='images/city.png' width='25px' height='25px' class='layers-icon' alt='City Codes'> <span class='popup-text'>City Codes</span>": cities,
            "<img src='images/ferry.png' width='25px' height='25px' class='layers-icon' alt='Ferry Ports'> <span class='popup-text'>Ferry Ports</span>": ferries,
            "<img src='images/helicopter.png' width='25px' height='25px' class='layers-icon' alt='Heliports'> <span class='popup-text'>Heliports</span>": heliports,
            "<img src='images/seaplane.png' width='25px' height='25px' class='layers-icon' alt='Seaplane Bases'> <span class='popup-text'>Seaplane Bases</span>": seaports,
            "<img src='images/train.png' width='25px' height='25px' class='layers-icon' alt='Train Stations'> <span class='popup-text'>Train Stations</span>": trains
        };

        // add Markers to MarkerClusterGroup with Layer Support
        var markers = L.markerClusterGroup.layerSupport(mapOptions);
        var layerGroup = L.layerGroup(theMarkers);
        markers.checkIn(theMarkers);
        markers.addTo(map);
        markers.checkIn(layerGroup);
        layerGroup.addTo(map);

        // add Map Layer Control
        L.control.layers(mapLayers, mapOptions).addTo(map);

        // add Map Overlay and higher Z-Index so it sits on top of all base layers
        mapOverlay.bringToFront().addTo(map).setZIndex(9);

        // update the Leaflet Container and Page Color scheme based on which Map Layer is selected
        $(".leaflet-control-layers-base input[type=radio]:eq(0)").on("click", function () {
            // DARK MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "#262626");
            $("#main-header").css("background-color", "#262626");
            $("#main-header :header").css({
                'color': '#FFFFFF',
                'text-shadow': '2px 2px 2px #000000'
            });
            $("#countries").css("background-color", "#444444");
            $("#countries").css("color", "#FFFFFF");
        });
        $(".leaflet-control-layers-base input[type=radio]:eq(1)").on("click", function () {
            // LIGHT MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "#D4DADC");
            $("#main-header").css("background-color", "#D4DADC");
            $("#main-header :header").css({
                'color': '#000000',
                'text-shadow': '2px 2px 2px #FFFFFF'
            });
            $("#countries").css("background-color", "#E2E6E8");
            $("#countries").css("color", "#000000");
        });
        $(".leaflet-control-layers-base input[type=radio]:eq(2)").on("click", function () {
            // EARTH MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "#071F41");
            $("#main-header").css("background-color", "#071F41");
            $("#main-header :header").css({
                'color': '#FFFFFF',
                'text-shadow': '2px 2px 2px #000000'
            });
            $("#countries").css("background-color", "#3A5274");
            $("#countries").css("color", "#FFFFFF");
        });

        // set the copyright year dynamically for the footer
        $("#year").html(new Date().getFullYear());

    });

});