/* jshint esversion: 8, jquery: true */

// preloader animation (gif)
$(window).on("load", function () {
    $("#container-loader").fadeOut();
});

// hide the main page / map on initial load until user is finished with Modal
$("#main-container").hide();

/* adding marker count to start of page (modal),
requires adding them to LayerGroup outside of the map build below */
let airportCount = new L.LayerGroup(),
    busCount = new L.LayerGroup(),
    cityCount = new L.LayerGroup(),
    ferryCount = new L.LayerGroup(),
    heliportCount = new L.LayerGroup(),
    seaportCount = new L.LayerGroup(),
    trainCount = new L.LayerGroup();
L.geoJson(iataData, {
    onEachFeature: function (feature, layer) {
        switch (feature.properties.transport) {
            case "airport":
                layer.addTo(airportCount);
                break;
            case "bus_station":
                layer.addTo(busCount);
                break;
            case "city_code":
                layer.addTo(cityCount);
                break;
            case "ferry_port":
                layer.addTo(ferryCount);
                break;
            case "heliport":
                layer.addTo(heliportCount);
                break;
            case "seaplane_base":
                layer.addTo(seaportCount);
                break;
            case "train_station":
                layer.addTo(trainCount);
                break;
        }
    }
});
// animated counter from zero to X-value
// concept of animated count-up is from: https://codepen.io/saadeghi/pen/KdpdoQ
let countMarkers = function (markerID, markerType) {
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
        $("#container-loader").fadeIn(10);
        $("#main-container").show();
        $("#container-loader").fadeOut(2000);

        // map Attribution Links
        let osmLink = "<a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener'>OpenStreetMap</a>",
            cartoLink = "<a href='https://carto.com/attribution/' target='_blank' rel='noopener'>CARTO</a>";

        // map Tile URLs
        let osmDarkUrl = "http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png",
            osmLightUrl = "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
            arcgisEarthUrl = "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        // map Attributes
        let attributes = "&copy; " + osmLink + " contributors | " + cartoLink;

        // map Tile Layers
        let osmDarkMap = L.tileLayer(osmDarkUrl, {
                attribution: attributes
            }),
            osmLightMap = L.tileLayer(osmLightUrl, {
                attribution: attributes
            }),
            arcgisEarthMap = L.tileLayer(arcgisEarthUrl, {
                attribution: attributes
            });

        // assigning my own custom Icons
        let airplaneIcon = new L.Icon({
                iconUrl: "assets/images/airplane.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            busIcon = new L.Icon({
                iconUrl: "assets/images/bus.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            cityIcon = new L.Icon({
                iconUrl: "assets/images/city.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            ferryIcon = new L.Icon({
                iconUrl: "assets/images/ferry.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            helicopterIcon = new L.Icon({
                iconUrl: "assets/images/helicopter.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            seaplaneIcon = new L.Icon({
                iconUrl: "assets/images/seaplane.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            }),
            trainIcon = new L.Icon({
                iconUrl: "assets/images/train.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50]
            });

        // adding the data to PopUps
        function addPopupData(feature) {
            let popupData = "";
            // add IATA code (must exist)
            popupData += "<h1 class='popup-iata " + feature.properties.transport + "'>" +
                feature.properties.iata + "</h1>";
            // add Name (must exist)
            popupData += "<p class='popup-text'><span class='popup-name " + feature.properties.transport +
                "'><strong>" + feature.properties.name + "</strong></span>";
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

            // add local time using timezone data-attribute
            popupData += "<p class='popup-small'>Local Time: <span class='clock bold " +
                feature.properties.transport + "' data-timezone='" + feature.properties.timezone + "'>calculating time";
            function updateClock() {
                let time = new Date().toLocaleTimeString("en-UK", {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZone: $(".clock").data("timezone")
                });
                // add leading 0 to timestamp if single-digit hour
                if (!/^([0-9]{2}\:[0-9]{2})$/.test(time)) {
                    time = `0${time}`;
                }
                $(".clock").text(time);
            }
            popupData += "</span><span class='bold " + feature.properties.transport + "'> (UTC " + feature.properties.utc + ")</span><br>Time Zone: <span class='bold " + feature.properties.transport + "'>" + feature.properties.timezone + "</span><br>";
            updateClock();
            setInterval(updateClock, 10000);

            // add Latitude / Longitude (must exist)
            popupData += "Latitude: <span class='bold " + feature.properties.transport + "'>" +
                feature.geometry.coordinates[1] + "</span><br>Longitude: <span class='bold " + feature.properties.transport + "'>" +
                feature.geometry.coordinates[0] + "</span></p>";

            // display the data in the PopUp
            return popupData;
        }

        // creating the Transportation Layers
        let airports = new L.LayerGroup(),
            buses = new L.LayerGroup(),
            cities = new L.LayerGroup(),
            ferries = new L.LayerGroup(),
            heliports = new L.LayerGroup(),
            seaports = new L.LayerGroup(),
            trains = new L.LayerGroup();

        // assigning the Icons to their respective layers
        let theMarkers = L.geoJson(iataData, {
            onEachFeature: function (feature, layer) {
                layer.once("click", ()=>{
                    layer.bindPopup(addPopupData(feature)).openPopup();
                });
                switch(feature.properties.transport) {
                    case "airport":
                        // set the AIRPLANE icon if the transport property is airport
                        layer.setIcon(airplaneIcon);
                        layer.addTo(airports);
                        break;
                    case "bus_station":
                        // set the BUS icon if the transport property is bus_station
                        layer.setIcon(busIcon);
                        layer.addTo(buses);
                        break;
                    case "city_code":
                        // set the CITY icon if the transport property is city_code
                        layer.setIcon(cityIcon);
                        layer.addTo(cities);
                        break;
                    case "ferry_port":
                        // set the FERRY icon if the transport property is ferry_port
                        layer.setIcon(ferryIcon);
                        layer.addTo(ferries);
                        break;
                    case "heliport":
                        // set the HELICOPTER icon if the transport property is heliport
                        layer.setIcon(helicopterIcon);
                        layer.addTo(heliports);
                        break;
                    case "seaplane_base":
                        // set the SEAPLANE icon if the transport property is seaplane_base
                        layer.setIcon(seaplaneIcon);
                        layer.addTo(seaports);
                        break;
                    case "train_station":
                        // set the TRAIN icon if the transport property is train_station
                        layer.setIcon(trainIcon);
                        layer.addTo(trains);
                        break;
                }
                layer.bindTooltip("<h2>" + feature.properties.iata + "</h2>" + feature.properties.municipality + ", " + feature.properties.countryISO + "<br><small class='white-text'>click for more info</small>", {
                    className: "tooltip-" + feature.properties.transport
                });
            }
        });

        // map Overlay (the labels of the map)
        let mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");

        // the Map itself (with initial values)
        let map = L.map("map", {
            layers: [osmDarkMap],
            center: [23.5, 12],
            // condensedAttributionControl: false, // if using image instead of '?' --- see below
            zoom: 3,
            minZoom: 2,
            maxZoom: 18,
            maxBounds: [
                [-75, -225],
                [90, 225]
            ],
            maxBoundsViscosity: 0.5,
        });

        // if using image instead of '?' for attribution
        // L.control.condensedAttribution({
        //     emblem: "<div class='emblem-wrap'><img src='assets/css/leaflet/assets/images/attribution.png'/></div>"
        // }).addTo(map);

        // get user's current location
        navigator.geolocation.getCurrentPosition(function (location) {
            let myLocation = new L.LatLng(location.coords.latitude, location.coords.longitude);
            let marker = L.marker(myLocation).addTo(map).bindTooltip("your location<br>Lat. " + location.coords.latitude.toFixed(4) + "<br>Lng. " + location.coords.longitude.toFixed(4));
            let icon = new L.Icon({
                iconUrl: "assets/css/leaflet/images/marker-user.png"
            });
            marker.setIcon(icon);
        });

        // add map scale to bottom-left corner
        L.control.scale().addTo(map);

        // search the database by IATA code
        let controlSearch = new L.Control.Search({
            propertyName: "iata",
            layer: theMarkers,
            initial: false,
            zoom: 11,
            delayType: 0,
            // openPopup: true, // doesn't seem to work
            collapsed: false,
            textErr: "IATA Code Not Recognized",
            autoCollapseTime: 10000,
            textPlaceholder: "IATA Code",
            buildTip: function (text, val) {
                let type = val.layer.feature.properties.transport;
                return "<a href='#'><strong class='" + type + "'>" + text + " - " + type + "</strong></a>";
            }
        });
        // open popup once result found
        controlSearch.on("search:locationfound", function () {
            $("path.leaflet-interactive").show();
        });
        map.addControl(controlSearch);
        // max-length of input = 3 for IATA codes
        $(".leaflet-control-search").children("input.search-input").attr("maxlength", "3");
        // fade marker for new search
        $("a.search-cancel").on("click", function () {
            $("path.leaflet-interactive").hide();
        });
        $(".search-input").on("click", function () {
            $("path.leaflet-interactive").hide();
            $("select#countries").val($("select#countries option:first").val());
        });

        // flyTo the latitude/longitude + zoom level based on the user selection
        $("#countries").on("change", function () {
            let countryData = $(this).val().split(","),
                MapLat = countryData[0],
                MapLng = countryData[1],
                MapZoom = parseInt(countryData[2]);
            map.flyTo([MapLat, MapLng], MapZoom);
        });

        // map Layer Control
        let mapLayers = {
            "<img src='assets/images/mapDark.png' width='25px' height='25px' alt='Dark Map'> <span class='popup-text'>Dark</span>": osmDarkMap,
            "<img src='assets/images/mapLight.png' width='25px' height='25px' alt='Light Map'> <span class='popup-text'>Light</span>": osmLightMap,
            "<img src='assets/images/mapEarth.png' width='25px' height='25px' alt='Earth Map'> <span class='popup-text'>Earth</span>": arcgisEarthMap
        };

        // map Transportation Options/Layers
        let mapOptions = {
            "<img src='assets/images/airplane.png' width='25px' height='25px' class='layers-icon' alt='Airports'> <span class='popup-text'>Airports</span>": airports,
            "<img src='assets/images/bus.png' width='25px' height='25px' class='layers-icon' alt='Bus Stations'> <span class='popup-text'>Bus Stations</span>": buses,
            "<img src='assets/images/city.png' width='25px' height='25px' class='layers-icon' alt='City Codes'> <span class='popup-text'>City Codes</span>": cities,
            "<img src='assets/images/ferry.png' width='25px' height='25px' class='layers-icon' alt='Ferry Ports'> <span class='popup-text'>Ferry Ports</span>": ferries,
            "<img src='assets/images/helicopter.png' width='25px' height='25px' class='layers-icon' alt='Heliports'> <span class='popup-text'>Heliports</span>": heliports,
            "<img src='assets/images/seaplane.png' width='25px' height='25px' class='layers-icon' alt='Seaplane Bases'> <span class='popup-text'>Seaplane Bases</span>": seaports,
            "<img src='assets/images/train.png' width='25px' height='25px' class='layers-icon' alt='Train Stations'> <span class='popup-text'>Train Stations</span>": trains
        };

        // add Markers to MarkerClusterGroup with Layer Support
        let markers = L.markerClusterGroup.layerSupport(mapOptions);
        let layerGroup = L.layerGroup(theMarkers);
        markers.checkIn(theMarkers);
        markers.addTo(map);
        markers.checkIn(layerGroup);
        layerGroup.addTo(map);

        // add Map Layer Control
        L.control.layers(mapLayers, mapOptions/*, {collapsed:false}*/).addTo(map);

        // add Map Overlay and higher Z-Index so it sits on top of all base layers
        mapOverlay.bringToFront().addTo(map).setZIndex(9);

        // search by location using ESRI geosearch
        let searchControl = L.esri.Geocoding.geosearch({
            placeholder: "Search City / Location",
            title: "Search City / Location",
            expanded: true,
            collapseAfterResult: false
        }).addTo(map);
        let results = L.layerGroup().addTo(map);
        searchControl.on("results", function (data) {
            for (let i = data.results.length - 1; i >= 0; i--) {
                results.addLayer(L.marker(data.results[i].latlng).bindTooltip(data.results[0].text));
            }
        });
        // zoom-out to level-7 for new search to allow global-search, not local-search
        $(".geocoder-control-input").on("click", function () {
            let currentZoom = map.getZoom();
            let currentCenter = map.getCenter();
            if (currentZoom > 7) {
                let newZoom = 7;
                map.flyTo([currentCenter.lat, currentCenter.lng], newZoom);
            }
            results.clearLayers();
            // remove IATA marker search (if any)
            $("path.leaflet-interactive").hide();
            $("select#countries").val($("select#countries option:first").val());
        });

        //------------- DISABLED : causes Uncaught RangeError: Maximum call stack size exceeded
        // https://github.com/Leaflet/Leaflet/issues/5035
        // Markers in the high arctic can't display fully if zoomed-out.
        // Zoom-in based on the current latitude (works like a charm! - but console errors above!)
        // map.on("moveend zoomend", function () {
        //     let currentZoom = map.getZoom();
        //     let currentCenter = map.getCenter();
        //     if (currentCenter.lat >= "75" && currentZoom < 5) {
        //         map.setZoom(5);
        //     } else if (currentCenter.lat >= "70" && currentZoom < 4) {
        //         map.setZoom(4);
        //     }
        // });

        // update the Leaflet Container and Page Color scheme based on which Map Layer is selected
        $(".leaflet-control-layers-base input[type=radio]:eq(0)").on("click", function () {
            // DARK MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "rgba(var(--darkGray), 1)");
            $("#main-header").css("background-color", "rgba(var(--darkGray), 1)");
            $("#main-header :header").css({
                'color': 'rgba(var(--white), 1)',
                'text-shadow': '2px 2px 2px rgba(var(--black), 1)'
            });
            $("#countries").css("background-color", "rgba(var(--gray), 1)");
            $("#countries").css("color", "rgba(var(--white), 1)");
        });
        $(".leaflet-control-layers-base input[type=radio]:eq(1)").on("click", function () {
            // LIGHT MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "rgba(var(--iron), 1)");
            $("#main-header").css("background-color", "rgba(var(--iron), 1)");
            $("#main-header :header").css({
                'color': 'rgba(var(--black), 1)',
                'text-shadow': '2px 2px 2px rgba(var(--white), 1)'
            });
            $("#countries").css("background-color", "rgba(var(--porcelain), 1)");
            $("#countries").css("color", "rgba(var(--black), 1)");
        });
        $(".leaflet-control-layers-base input[type=radio]:eq(2)").on("click", function () {
            // EARTH MAP (change map and page color settings)
            $(".leaflet-container").css("background-color", "rgba(var(--earthDark), 1)");
            $("#main-header").css("background-color", "rgba(var(--earthDark), 1)");
            $("#main-header :header").css({
                'color': 'rgba(var(--white), 1)',
                'text-shadow': '2px 2px 2px rgba(var(--black), 1)'
            });
            $("#countries").css("background-color", "rgba(var(--earthLight), 1)");
            $("#countries").css("color", "rgba(var(--white), 1)");
        });

        // set the copyright year dynamically for the footer
        $("#year").html(new Date().getFullYear());

    });

});
