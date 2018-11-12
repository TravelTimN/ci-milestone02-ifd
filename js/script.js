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
                        } else {
                            popupData += "<br>" + feature.properties.municipality +
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
            if (feature.properties.wikipedia != "") {
                popupData += "<p class='popup-wiki " + feature.properties.transport +
                    "'><a href='" + feature.properties.wikipedia + "' target='_blank'>Wikipedia</a></p>";
            }
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

    // assigning the Icons to their respective layers
    //var theMarkers = L.geoJson(testData, { // using testDataAll to temporarily test ALL current data
    var theMarkers = L.geoJson(testDataAll, {
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

    // country selection concept from: https://jsfiddle.net/thiagobsouza/m09t5at0/5/
    window.mapChange = function () {
        var countrySelection = document.getElementById("countries");
        var countryCenter = countrySelection.value;
        if (countryCenter == "dzMap") {
            map.setView([28.1589384945, 2.6173230092]);
        } else if (countryCenter == "aoMap") {
            map.setView([-12.2933605438, 17.5373676815]);
        } else if (countryCenter == "bjMap") {
            map.setView([9.64175970225, 2.32785254449]);
        } else if (countryCenter == "bwMap") {
            map.setView([-22.1840321328, 23.7985336773]);
        } else if (countryCenter == "bfMap") {
            map.setView([12.2695384574, -1.75456600914]);
        } else if (countryCenter == "biMap") {
            map.setView([-3.35939665747, 29.8751215645]);
        } else if (countryCenter == "cmMap") {
            map.setView([5.69109848986, 12.7396415575]);
        } else if (countryCenter == "cvMap") {
            map.setView([15.9552332421, -23.9598882026]);
        } else if (countryCenter == "cfMap") {
            map.setView([6.56823297048, 20.4682683098]);
        } else if (countryCenter == "tdMap") {
            map.setView([15.333337585, 18.6449251291]);
        } else if (countryCenter == "kmMap") {
            map.setView([-11.8778344355, 43.6825396848]);
        } else if (countryCenter == "cdMap") {
            map.setView([-2.8774628897, 23.643961066]);
        } else if (countryCenter == "cgMap") {
            map.setView([-0.837874631184, 15.2196576195]);
        } else if (countryCenter == "djMap") {
            map.setView([11.7487180559, 42.5606754026]);
        } else if (countryCenter == "egMap") {
            map.setView([26.4959331064, 29.8619009908]);
        } else if (countryCenter == "gqMap") {
            map.setView([1.70555135464, 10.3413792389]);
        } else if (countryCenter == "erMap") {
            map.setView([15.361866184, 38.8461701125]);
        } else if (countryCenter == "etMap") {
            map.setView([8.6227867931, 39.6008009763]);
        } else if (countryCenter == "gaMap") {
            map.setView([-0.586600249551, 11.7886286968]);
        } else if (countryCenter == "gmMap") {
            map.setView([13.4496524352, -15.3960129463]);
        } else if (countryCenter == "ghMap") {
            map.setView([7.95345643541, -1.21676565807]);
        } else if (countryCenter == "gnMap") {
            map.setView([10.4362159331, -10.9406661161]);
        } else if (countryCenter == "gwMap") {
            map.setView([12.0474494815, -14.9497244459]);
        } else if (countryCenter == "ciMap") {
            map.setView([7.62842620235, -5.5692156998]);
        } else if (countryCenter == "keMap") {
            map.setView([0.599880215445, 37.7959397293]);
        } else if (countryCenter == "lsMap") {
            map.setView([-29.5800318833, 28.2272313098]);
        } else if (countryCenter == "lrMap") {
            map.setView([6.45278491657, -9.3220757269]);
        } else if (countryCenter == "lyMap") {
            map.setView([27.0309449491, 18.0086616872]);
        } else if (countryCenter == "mgMap") {
            map.setView([-19.3718958677, 46.7047367428]);
        } else if (countryCenter == "mwMap") {
            map.setView([-13.2180808806, 34.2893559871]);
        } else if (countryCenter == "mlMap") {
            map.setView([17.3458158135, -3.54269064851]);
        } else if (countryCenter == "mrMap") {
            map.setView([20.257367056, -10.3477981455]);
        } else if (countryCenter == "muMap") {
            map.setView([-20.2776870433, 57.5712055061]);
        } else if (countryCenter == "ytMap") {
            map.setView([-12.811625, 45.142045]);
        } else if (countryCenter == "maMap") {
            map.setView([29.8376295469, -8.45615794798]);
        } else if (countryCenter == "mzMap") {
            map.setView([-17.2738164259, 35.5336754259]);
        } else if (countryCenter == "naMap") {
            map.setView([-22.1303256842, 17.209635667]);
        } else if (countryCenter == "neMap") {
            map.setView([17.4191249296, 9.38545881539]);
        } else if (countryCenter == "ngMap") {
            map.setView([9.59411452233, 8.08943894771]);
        } else if (countryCenter == "reMap") {
            map.setView([-21.128469, 55.531412]);
        } else if (countryCenter == "rwMap") {
            map.setView([-1.99033831693, 29.9198851524]);
        } else if (countryCenter == "shMap") {
            map.setView([-12.4035595078, -9.5477941587]);
        } else if (countryCenter == "stMap") {
            map.setView([0.443914449308, 6.72429657927]);
        } else if (countryCenter == "snMap") {
            map.setView([14.3662417313, -14.4734923973]);
        } else if (countryCenter == "scMap") {
            map.setView([-4.66099093522, 55.4760327912]);
        } else if (countryCenter == "slMap") {
            map.setView([8.56329593038, -11.7927124668]);
        } else if (countryCenter == "soMap") {
            map.setView([4.75062876055, 45.7071448699]);
        } else if (countryCenter == "zaMap") {
            map.setView([-29.0003409534, 25.0839009251]);
        } else if (countryCenter == "ssMap") {
            map.setView([7.30877944922, 30.2479000186]);
        } else if (countryCenter == "sdMap") {
            map.setView([15.9903566856, 29.9404681199]);
        } else if (countryCenter == "szMap") {
            map.setView([-26.5584304502, 31.4819369011]);
        } else if (countryCenter == "tzMap") {
            map.setView([-6.27565408332, 34.8130998093]);
        } else if (countryCenter == "tgMap") {
            map.setView([8.52531356141, 0.962328449769]);
        } else if (countryCenter == "tnMap") {
            map.setView([34.1195624649, 9.55288358933]);
        } else if (countryCenter == "ugMap") {
            map.setView([1.27469298731, 32.3690797137]);
        } else if (countryCenter == "ehMap") {
            map.setView([24.2295673865, -12.2198275485]);
        } else if (countryCenter == "zmMap") {
            map.setView([-13.4582415186, 27.7747594637]);
        } else if (countryCenter == "zwMap") {
            map.setView([-19.0042041882, 29.8514412019]);
        } else if (countryCenter == "aqMap") {
            map.setView([-80.5085791311, 19.9210895122]);
        } else if (countryCenter == "afMap") {
            map.setView([33.8352307278, 66.0047336558]);
        } else if (countryCenter == "amMap") {
            map.setView([40.2895256919, 44.9299327564]);
        } else if (countryCenter == "azMap") {
            map.setView([40.2882723471, 47.5459987892]);
        } else if (countryCenter == "bhMap") {
            map.setView([26.0420513477, 50.5419693232]);
        } else if (countryCenter == "bdMap") {
            map.setView([23.86731158, 90.2381274323]);
        } else if (countryCenter == "btMap") {
            map.setView([27.4110658858, 90.4018815525]);
        } else if (countryCenter == "ioMap") {
            map.setView([-7.33059750749, 72.4454122854]);
        } else if (countryCenter == "bnMap") {
            map.setView([4.51968957503, 114.722030354]);
        } else if (countryCenter == "khMap") {
            map.setView([12.7200478567, 104.906943249]);
        } else if (countryCenter == "cnMap") {
            map.setView([36.5617654559, 103.81907349]);
        } else if (countryCenter == "cxMap") {
            map.setView([-10.486477, 105.636115]);
        } else if (countryCenter == "ccMap") {
            map.setView([-12.167898, 96.872366]);
        } else if (countryCenter == "tlMap") {
            map.setView([-8.82889162047, 125.844389821]);
        } else if (countryCenter == "geMap") {
            map.setView([42.1685575537, 43.50780252]);
        } else if (countryCenter == "hkMap") {
            map.setView([22.3982773723, 114.113804542]);
        } else if (countryCenter == "inMap") {
            map.setView([22.8857821183, 79.6119761026]);
        } else if (countryCenter == "idMap") {
            map.setView([-2.21505456346, 117.240113662]);
        } else if (countryCenter == "irMap") {
            map.setView([32.575032915, 54.2740700448]);
        } else if (countryCenter == "iqMap") {
            map.setView([33.0397058232, 43.7435314888]);
        } else if (countryCenter == "ilMap") {
            map.setView([31.4611010118, 35.0044469277]);
        } else if (countryCenter == "jpMap") {
            map.setView([37.592301353, 138.030895577]);
        } else if (countryCenter == "joMap") {
            map.setView([31.2457909121, 36.7713610402]);
        } else if (countryCenter == "kzMap") {
            map.setView([48.1568806661, 67.2914935687]);
        } else if (countryCenter == "kwMap") {
            map.setView([29.3343126157, 47.5870045889]);
        } else if (countryCenter == "kgMap") {
            map.setView([41.4622194346, 74.5416551329]);
        } else if (countryCenter == "laMap") {
            map.setView([18.5021743316, 103.73772412]);
        } else if (countryCenter == "lbMap") {
            map.setView([33.9230663057, 35.880160715]);
        } else if (countryCenter == "moMap") {
            map.setView([22.2231168835, 113.509321162]);
        } else if (countryCenter == "myMap") {
            map.setView([3.78986845571, 109.697622843]);
        } else if (countryCenter == "mvMap") {
            map.setView([3.72870919988, 73.4571300419]);
        } else if (countryCenter == "mnMap") {
            map.setView([46.8268154394, 103.052997649]);
        } else if (countryCenter == "mmMap") {
            map.setView([21.1856659927, 96.4884332104]);
        } else if (countryCenter == "npMap") {
            map.setView([28.2489136496, 83.9158264002]);
        } else if (countryCenter == "kpMap") {
            map.setView([40.1535031093, 127.192479732]);
        } else if (countryCenter == "omMap") {
            map.setView([20.6051533257, 56.0916615483]);
        } else if (countryCenter == "pkMap") {
            map.setView([29.9497515031, 69.3395793748]);
        } else if (countryCenter == "psMap") {
            map.setView([31.9161389264, 35.1962870549]);
        } else if (countryCenter == "phMap") {
            map.setView([11.7753677809, 122.883932529]);
        } else if (countryCenter == "qaMap") {
            map.setView([25.3060118763, 51.1847963212]);
        } else if (countryCenter == "ruMap") {
            map.setView([61.98052209, 96.68656112]);
        } else if (countryCenter == "saMap") {
            map.setView([24.1224584073, 44.5368627114]);
        } else if (countryCenter == "sgMap") {
            map.setView([1.35876087075, 103.81725592]);
        } else if (countryCenter == "krMap") {
            map.setView([36.3852398347, 127.839160864]);
        } else if (countryCenter == "lkMap") {
            map.setView([7.61266509224, 80.7010823782]);
        } else if (countryCenter == "syMap") {
            map.setView([35.025473894, 38.5078820425]);
        } else if (countryCenter == "twMap") {
            map.setView([23.753992795, 120.954272814]);
        } else if (countryCenter == "tjMap") {
            map.setView([38.5304538963, 71.0136263091]);
        } else if (countryCenter == "thMap") {
            map.setView([15.1181579418, 101.002881304]);
        } else if (countryCenter == "trMap") {
            map.setView([39.0616029013, 35.1689534649]);
        } else if (countryCenter == "tmMap") {
            map.setView([39.1155413742, 59.3710002061]);
        } else if (countryCenter == "aeMap") {
            map.setView([23.9052818785, 54.3001671016]);
        } else if (countryCenter == "uzMap") {
            map.setView([41.7555422527, 63.1400152805]);
        } else if (countryCenter == "vnMap") {
            map.setView([16.6460167019, 106.299146978]);
        } else if (countryCenter == "yeMap") {
            map.setView([15.9092800505, 47.5867618877]);
        } else if (countryCenter == "axMap") {
            map.setView([60.2148868756, 19.953287676]);
        } else if (countryCenter == "alMap") {
            map.setView([41.1424498947, 20.0498339611]);
        } else if (countryCenter == "adMap") {
            map.setView([42.5422910219, 1.56054377918]);
        } else if (countryCenter == "atMap") {
            map.setView([47.585494392, 14.1264760996]);
        } else if (countryCenter == "byMap") {
            map.setView([53.5313137685, 28.0320930703]);
        } else if (countryCenter == "beMap") {
            map.setView([50.6398157556, 4.64065113918]);
        } else if (countryCenter == "baMap") {
            map.setView([44.1745012472, 17.7687673323]);
        } else if (countryCenter == "bgMap") {
            map.setView([42.7689031797, 25.2155290863]);
        } else if (countryCenter == "hrMap") {
            map.setView([45.0804763057, 16.404128994]);
        } else if (countryCenter == "cyMap") {
            map.setView([34.916672112, 33.0060021957]);
        } else if (countryCenter == "czMap") {
            map.setView([49.7334123295, 15.3124016281]);
        } else if (countryCenter == "dkMap") {
            map.setView([55.9812529593, 10.0280099191]);
        } else if (countryCenter == "eeMap") {
            map.setView([58.6719297173, 25.5424853656]);
        } else if (countryCenter == "foMap") {
            map.setView([62.0538540321, -6.88095423426]);
        } else if (countryCenter == "fiMap") {
            map.setView([64.4988460349, 26.2746656042]);
        } else if (countryCenter == "frMap") {
            map.setView([42.1734401107, -2.76172944519]);
        } else if (countryCenter == "deMap") {
            map.setView([51.1069818075, 10.385780508]);
        } else if (countryCenter == "giMap") {
            map.setView([36.135875, -5.347975]);
        } else if (countryCenter == "grMap") {
            map.setView([39.0746962307, 22.9555579369]);
        } else if (countryCenter == "ggMap") {
            map.setView([49.4680976128, -2.57239063555]);
        } else if (countryCenter == "huMap") {
            map.setView([47.1627750614, 19.3955911607]);
        } else if (countryCenter == "isMap") {
            map.setView([64.9957538607, -18.5739616708]);
        } else if (countryCenter == "ieMap") {
            map.setView([53.175448704, -8.13793568667]);
        } else if (countryCenter == "imMap") {
            map.setView([54.2241891077, -4.53873952326]);
        } else if (countryCenter == "itMap") {
            map.setView([42.796626414, 12.0700133907]);
        } else if (countryCenter == "jeMap") {
            map.setView([49.2183737668, -2.12689937944]);
        } else if (countryCenter == "xkMap") {
            map.setView([42.5707870668, 20.8724981138]);
        } else if (countryCenter == "lvMap") {
            map.setView([56.8508516268, 24.9123598332]);
        } else if (countryCenter == "liMap") {
            map.setView([47.1366583545, 9.53574311779]);
        } else if (countryCenter == "ltMap") {
            map.setView([55.3261098445, 23.8871935548]);
        } else if (countryCenter == "luMap") {
            map.setView([49.7672536068, 6.07182201066]);
        } else if (countryCenter == "mkMap") {
            map.setView([41.5953089336, 21.6821134607]);
        } else if (countryCenter == "mtMap") {
            map.setView([35.9214963221, 14.4052331643]);
        } else if (countryCenter == "mdMap") {
            map.setView([47.1949880442, 28.4567337241]);
        } else if (countryCenter == "mcMap") {
            map.setView([43.7527462672, 7.40627676856]);
        } else if (countryCenter == "meMap") {
            map.setView([42.7889025929, 19.2388393925]);
        } else if (countryCenter == "nlMap") {
            map.setView([52.1007899002, 5.28144793007]);
        } else if (countryCenter == "noMap") {
            map.setView([68.7501557205, 15.3483465622]);
        } else if (countryCenter == "plMap") {
            map.setView([52.1275956442, 19.3901283493]);
        } else if (countryCenter == "ptMap") {
            map.setView([39.5955067145, -8.50104361268]);
        } else if (countryCenter == "roMap") {
            map.setView([45.8524312742, 24.9729303933]);
        } else if (countryCenter == "ruMap") {
            map.setView([61.98052209, 96.68656112]);
        } else if (countryCenter == "smMap") {
            map.setView([43.9418674677, 12.4592233358]);
        } else if (countryCenter == "rsMap") {
            map.setView([44.2215031993, 20.7895833363]);
        } else if (countryCenter == "skMap") {
            map.setView([48.7054752813, 19.4790521811]);
        } else if (countryCenter == "siMap") {
            map.setView([46.1155477207, 14.8044423776]);
        } else if (countryCenter == "esMap") {
            map.setView([40.2444869811, -3.64755047323]);
        } else if (countryCenter == "seMap") {
            map.setView([62.7796651931, 16.7455804869]);
        } else if (countryCenter == "chMap") {
            map.setView([46.7978587836, 8.20867470615]);
        } else if (countryCenter == "uaMap") {
            map.setView([48.9965667265, 31.3832646865]);
        } else if (countryCenter == "gbMap") {
            map.setView([54.1238715577, -2.86563164084]);
        } else if (countryCenter == "vaMap") {
            map.setView([41.9017498529, 12.4338717661]);
        } else if (countryCenter == "aiMap") {
            map.setView([18.2239595023, -63.0649892654]);
        } else if (countryCenter == "agMap") {
            map.setView([17.2774995986, -61.794693427]);
        } else if (countryCenter == "awMap") {
            map.setView([12.5208803838, -69.9826771125]);
        } else if (countryCenter == "bsMap") {
            map.setView([24.2903670223, -76.6284303802]);
        } else if (countryCenter == "bbMap") {
            map.setView([13.1814542822, -59.5597970021]);
        } else if (countryCenter == "bzMap") {
            map.setView([17.2002750902, -88.7101048564]);
        } else if (countryCenter == "bmMap") {
            map.setView([32.3136780208, -64.7545588982]);
        } else if (countryCenter == "bqMap") {
            map.setView([12.20189, -68.262383]);
        } else if (countryCenter == "vgMap") {
            map.setView([18.5258575451, -64.471469922]);
        } else if (countryCenter == "caMap") {
            map.setView([61.3620632437, -98.3077702819]);
        } else if (countryCenter == "kyMap") {
            map.setView([19.4289649722, -80.9121332147]);
        } else if (countryCenter == "crMap") {
            map.setView([9.9763446384, -84.1920876775]);
        } else if (countryCenter == "cuMap") {
            map.setView([21.6228952793, -79.0160538445]);
        } else if (countryCenter == "cwMap") {
            map.setView([12.1955167546, -68.971193688]);
        } else if (countryCenter == "dmMap") {
            map.setView([15.4394702029, -61.3577259987]);
        } else if (countryCenter == "doMap") {
            map.setView([18.8943308233, -70.5056889612]);
        } else if (countryCenter == "svMap") {
            map.setView([13.7394374383, -88.8716446906]);
        } else if (countryCenter == "glMap") {
            map.setView([74.7105128864, -41.34191127]);
        } else if (countryCenter == "gdMap") {
            map.setView([12.1172504395, -61.6822018889]);
        } else if (countryCenter == "gpMap") {
            map.setView([16.211908, -61.589351]);
        } else if (countryCenter == "gtMap") {
            map.setView([15.694036635, -90.3648200858]);
        } else if (countryCenter == "htMap") {
            map.setView([18.9350256343, -72.6852750899]);
        } else if (countryCenter == "hnMap") {
            map.setView([14.8268816519, -86.6151660963]);
        } else if (countryCenter == "jmMap") {
            map.setView([18.1569487765, -77.3148259327]);
        } else if (countryCenter == "mqMap") {
            map.setView([14.651052, -61.031619]);
        } else if (countryCenter == "mxMap") {
            map.setView([23.9475372406, -102.523451692]);
        } else if (countryCenter == "msMap") {
            map.setView([16.7394140553, -62.1851854562]);
        } else if (countryCenter == "niMap") {
            map.setView([12.8470942896, -85.0305296951]);
        } else if (countryCenter == "paMap") {
            map.setView([8.51750797491, -80.1191515612]);
        } else if (countryCenter == "prMap") {
            map.setView([18.2281305461, -66.4730760435]);
        } else if (countryCenter == "bqMap") {
            map.setView([17.631877, -63.23794]);
        } else if (countryCenter == "blMap") {
            map.setView([17.8988045112, -62.8406777884]);
        } else if (countryCenter == "knMap") {
            map.setView([17.2645995047, -62.6875526496]);
        } else if (countryCenter == "lcMap") {
            map.setView([13.8947948145, -60.9696992253]);
        } else if (countryCenter == "mfMap") {
            map.setView([18.0888861095, -63.0597285144]);
        } else if (countryCenter == "pmMap") {
            map.setView([46.9191878929, -56.3031977882]);
        } else if (countryCenter == "vcMap") {
            map.setView([13.22472269, -61.2012969497]);
        } else if (countryCenter == "bqMap") {
            map.setView([17.491409, -62.979676]);
        } else if (countryCenter == "sxMap") {
            map.setView([18.0508172793, -63.057133627]);
        } else if (countryCenter == "ttMap") {
            map.setView([10.457334081, -61.2656792335]);
        } else if (countryCenter == "tcMap") {
            map.setView([21.8304757171, -71.9738788144]);
        } else if (countryCenter == "usMap") {
            map.setView([45.6795472026, -112.4616737]);
        } else if (countryCenter == "viMap") {
            map.setView([17.9550062394, -64.8030153752]);
        } else if (countryCenter == "asMap") {
            map.setView([-14.3044599708, -170.718025746]);
        } else if (countryCenter == "auMap") {
            map.setView([-25.7328870417, 134.491000082]);
        } else if (countryCenter == "ckMap") {
            map.setView([-21.2192728815, -159.787242185]);
        } else if (countryCenter == "fjMap") {
            map.setView([-17.4285803175, 165.451954318]);
        } else if (countryCenter == "pfMap") {
            map.setView([-14.7222740899, -144.904943869]);
        } else if (countryCenter == "guMap") {
            map.setView([13.441656257, 144.76791022]);
        } else if (countryCenter == "kiMap") {
            map.setView([0.86001503171, -45.6111051329]);
        } else if (countryCenter == "mhMap") {
            map.setView([7.00376358315, 170.339761224]);
        } else if (countryCenter == "fmMap") {
            map.setView([7.45246813659, 153.239437922]);
        } else if (countryCenter == "nrMap") {
            map.setView([-0.519126389522, 166.932568234]);
        } else if (countryCenter == "ncMap") {
            map.setView([-21.299918058, 165.684923735]);
        } else if (countryCenter == "nzMap") {
            map.setView([-41.811135569, 171.484923466]);
        } else if (countryCenter == "nuMap") {
            map.setView([-19.0494570813, -169.869946819]);
        } else if (countryCenter == "nfMap") {
            map.setView([-29.0514609044, 167.949216782]);
        } else if (countryCenter == "mpMap") {
            map.setView([15.8292756277, 145.619696513]);
        } else if (countryCenter == "pwMap") {
            map.setView([7.28742783603, 134.408079655]);
        } else if (countryCenter == "pgMap") {
            map.setView([-6.46416646083, 145.207447524]);
        } else if (countryCenter == "pnMap") {
            map.setView([-24.365005346, -128.317042024]);
        } else if (countryCenter == "wsMap") {
            map.setView([-13.7532434638, -172.16485064]);
        } else if (countryCenter == "sbMap") {
            map.setView([-8.92178021692, 159.632876678]);
        } else if (countryCenter == "toMap") {
            map.setView([-20.4284317425, -174.80987341]);
        } else if (countryCenter == "tvMap") {
            map.setView([-7.599747, 177.843209]);
        } else if (countryCenter == "umMap") {
            map.setView([12.969024, -177.329967]);
        } else if (countryCenter == "vuMap") {
            map.setView([-16.2264090884, 167.686446357]);
        } else if (countryCenter == "wfMap") {
            map.setView([-13.8873703903, -177.348348251]);
        } else if (countryCenter == "arMap") {
            map.setView([-35.3813487953, -65.179806925]);
        } else if (countryCenter == "boMap") {
            map.setView([-16.7081478725, -64.6853864515]);
        } else if (countryCenter == "brMap") {
            map.setView([-10.7877770246, -53.0978311267]);
        } else if (countryCenter == "clMap") {
            map.setView([-37.730709893, -71.3825621318]);
        } else if (countryCenter == "coMap") {
            map.setView([3.91383430725, -73.0811458241]);
        } else if (countryCenter == "ecMap") {
            map.setView([-1.42381612488, -78.752019225]);
        } else if (countryCenter == "fkMap") {
            map.setView([-51.7448395441, -59.35238956]);
        } else if (countryCenter == "gfMap") {
            map.setView([4.037087, -53.173966]);
        } else if (countryCenter == "gyMap") {
            map.setView([4.79378034012, -58.9820245893]);
        } else if (countryCenter == "pyMap") {
            map.setView([-23.228239132, -58.400137032]);
        } else if (countryCenter == "peMap") {
            map.setView([-9.15280381329, -74.382426851]);
        } else if (countryCenter == "srMap") {
            map.setView([4.1305541299, -55.9123456951]);
        } else if (countryCenter == "uyMap") {
            map.setView([-32.7995153444, -56.0180705315]);
        } else if (countryCenter == "veMap") {
            map.setView([7.12422421273, -66.1818412311]);
        }
    };

    // map Layer Control
    var mapLayers = {
        "<img src='images/mapDark.png' width='25px'> <span class='popup-text'>Dark</span>": osmDarkMap,
        "<img src='images/mapLight.png' width='25px'> <span class='popup-text'>Light</span>": osmLightMap,
        "<img src='images/mapEarth.png' width='25px'> <span class='popup-text'>Earth</span>": arcgisEarthMap
    };

    // map Options
    var mapOptions = {
        "<img src='images/helicopter.png' width='25px' class='layers-icon'> <span class='popup-text heliport'>Heliports</span>": heliports,
        "<img src='images/bus.png' width='25px' class='layers-icon'> <span class='popup-text bus_station'>Bus Stations</span>": buses,
        "<img src='images/ferry.png' width='25px' class='layers-icon'> <span class='popup-text ferry_port'>Ferry Ports</span>": ferries,
        "<img src='images/train.png' width='25px' class='layers-icon'> <span class='popup-text train_station'>Train Stations</span>": trains,
        "<img src='images/airplane.png' width='25px' class='layers-icon'> <span class='popup-text airport'>Airports</span>": airports,
        "<img src='images/seaplane.png' width='25px' class='layers-icon'> <span class='popup-text seaplane_base'>Seaplane Bases</span>": seaports,
        "<img src='images/city.png' width='25px' class='layers-icon'> <span class='popup-text city_code'>City Codes</span>": cities
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

    // add Map Overlay and sit on very top
    mapOverlay.bringToFront().addTo(map).setZIndex(9);

});