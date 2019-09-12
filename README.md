![Demo IATA Map](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/images/demo.gif)

#### **[Live Site](https://traveltimn.github.io/ci-milestone02-ifd)**

# Open-Source IATA Map

###### Code Institute / Interactive Front-End Development

For this project, we could choose from one of the following scenarios:

- Create a single-page app that relies heavily on one or more APIs.
- Create a Memory Game similar to [Simon](https://en.wikipedia.org/wiki/Simon_(game)).
- Create a Data Dashboard.
- Create your own project with a scope similar to the examples.

I decided to combine the use of a mapping API with data in the form of an open-source map of global IATA codes, as my current profession is in the travel industry.

IATA stands for *International Air Transport Association*. IATA Codes are often seen when booking travel arrangements and on luggage tags, which represent global airport codes. Examples: Dublin **DUB**, London Heathrow **LHR**, Los Angeles **LAX**, Sydney **SYD**, etc.

Currently it's free to search the [IATA Database](https://www.iata.org/publications/Pages/code-search.aspx), but doesn't list the thousands of other transport locations that have their own code, such as train stations, heliports, bus stations, etc. You really need to know what you're looking for, and it's not visually interactive to use.

I wanted to make this project open-source and fully interactive, so I have decided to use [Leaflet](https://leafletjs.com/) instead of Google Maps due to the Google pricing implementation as of 16 July 2018. The majority of the airport data is open-source already from [OurAirports](http://ourairports.com/data/), but again, it's not interactive, only available in `.csv` format.

## UX

#### USER STORIES

- Users should be able to pan to any specific country based on selection.
- Users should be able to select mode of transportation (all, none, some).
- Users should be able to choose a map style (dark, light, satellite).
- Users should be given the appropriate Wikipedia link, and if not available, perform a Google search instead.

#### FRAMEWORK

- **CSS Grid**: Personally, I prefer the dynamic flexibility and use of CSS Grid, which is why I've decided to build this project using Grid, without the use of Bootstrap or Flexbox.

#### COLOR SCHEME

Allowing users to select from a few different map options, I knew I needed to select colors that would compliment each other for each of the map layers. I first established which map-tiles I wanted to use for the project, and really liked the color blue which is used to identify *bodies of water* on the map [`#018FC3`]. From there, I used [a color calculator](https://www.sessions.edu/color-calculator/) to get complimentary colors to match my primary blue for airports.

Due to the size of this project, I felt the simplicity of it didn't require preprocessors (ie: **Sass**, **SCSS**), therefore all transport layer colors are set at `:root` level within my CSS.

- ![#018FC3](https://placehold.it/15/018FC3/018FC3) `#018FC3` (*airports*)
- ![#FF5100](https://placehold.it/15/FF5100/FF5100) `#FF5100` (*bus stations*)
- ![#FFD000](https://placehold.it/15/FFD000/FFD000) `#FFD000` (*ferry ports*)
- ![#FF1100](https://placehold.it/15/FF1100/FF1100) `#FF1100` (*heliports*)
- ![#A602FF](https://placehold.it/15/A602FF/A602FF) `#A602FF` (*seaplane bases*)
- ![#03FF42](https://placehold.it/15/03FF42/03FF42) `#03FF42` (*train stations*)

The remaining aesthetics were my own preference, to match the three different map-tile layers that I've incorporated for user-selection, which keeps the site looking both modern and professional.

#### WIREFRAMES

I've used [Adobe XD](https://www.adobe.com/ie/products/xd.html) to create my wireframe / mock-up. To allow for visual representation on GitHub, I have also included a `.png` file.

![Testing as .png](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/wireframe/wireframe.png)

## FEATURES

#### EXISTING FEATURES
**Leaflet Plugins**: Since I have approximately 10,000 markers, I've incorporated the use of a couple Leaflet plugins in order to avoid significant payloads to the server.

- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)** (by: [Dave Leaver](https://github.com/danzel))
    - Clusters markers within close proximity to each other.

- **[Leaflet.GroupedLayerControl](https://github.com/ismyrnow/leaflet-groupedlayercontrol)** (by: [Ishmael Smyrnow](https://github.com/ismyrnow))
    - Layer control with support for grouping overlays together.

- **[Leaflet.CondensedAttribution](https://github.com/route360/Leaflet.CondensedAttribution)** (by: [Route360°](https://github.com/route360))
    - Hide the attributes until `:hover`, since they're too long.

#### FEATURES TO BE IMPLEMENTED

**Search by Location**: Ideally I'd like to allow the user to search by location, which subsequently pans to the user-selected location.

**Search by IATA Code**: I would also like the user to be able to search by 3-letter IATA code, which would populate on the map once found.

- These could both potentially be accomplished by using an additional plugin, such as: [Leaflet.Search](https://github.com/stefanocudini/leaflet-search)

**Additional Markers**: ~~I am aware of roughly 1,500-2,000 IATA codes that could potentially be added, but would require a significant amount of manual work to obtain the appropriate latitude/longitude for each. A large majority of these are train and bus stations. 90% of the current non-airport markers were added by me manually.~~ Scratch that... I spent a few extra days ploughing through the remaining IATA codes, and finally ended with a grand total of **11,349** individual IATA codes - Woohoo! *(sincere thanks to my accountability partner, [Chris Quinn](https://github.com/10xOXR) for helping gather some of the latitude/longitude locations!)*

## TECHNOLOGIES USED

Brief overview of the languages, frameworks, and other tools I've used on this project:

- [HTML5](https://en.wikipedia.org/wiki/HTML5): Semantic markup language as the shell of the site.
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets): Cascading Style Sheets as the design of the site.
- [CSS Grid](https://en.wikipedia.org/wiki/CSS_grid_layout): Allows for a responsive layout across various platforms.
- [JavaScript](https://www.javascript.com): Primary function of the site for all user interaction.
- [jQuery](https://jquery.com/): Used to simplify some of the DOM minipulations.
- [Leaflet](https://leafletjs.com/): An open-source JavaScript library for interactive maps.
- [Leaflet Plugins](https://leafletjs.com/plugins.html): Plugins to allow better functionality of Leaflet.
- [ConvertCSV.com](http://www.convertcsv.com/csv-to-geojson.htm): Used to convert data from CSV to GeoJSON.
- [Adobe Photoshop CS6](https://www.adobe.com/products/photoshop.html): To create all custom markers, and image modifications.

**LEAFLET PLUGINS**

- [leaflet-search](https://github.com/stefanocudini/leaflet-search)
- [esri-leaflet-geocoding](https://esri.github.io/esri-leaflet/examples/geocoding-control.html)
- [leaflet-markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- [leaflet-markercluster-layersupport](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport)

## TESTING

#### TEST MATRIX

I created a [testing matrix](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/testing/testing-ci-milestone02-ifd.xlsx) in Excel, but saved as `.png` to visualize here on GitHub. It outlines the various tests I made to ensure the site renders consistently across different platforms, and that each functionality behaves as intended. Jasmine testing was not essential for this particular project.

![Testing Matrix](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/testing/testing-ci-milestone02-ifd.png)

- [HTML Validation](https://validator.w3.org/): No errors or warnings found.
- [CSS Validation](https://jigsaw.w3.org/css-validator/): Parsing errors due to `:root` variables.
- [JavaScript Validation](http://beautifytools.com/javascript-validator.php): Leaflet `'L'` not defined in my source file.
- [JSHint (v2.9.6)](https://jshint.com/) Metrics from my `script.js` file:
    - There are **11** functions in this file.
    - Function with the largest signature take **2** arguments, while the median is **0**.
    - Largest function has **27** statements in it, while the median is **5**.
    - The most complex function has a cyclomatic complexity value of **12** while the median is **1**.
    - Three undefined variables:
        - `$` *(x35)* - used for **jQuery**
        - `L` *(x31)* - used for **LeaflefJS**
        - `iataData` *(x2)* - external variable from **iataData.js**
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/):
    - *Mixed Content: The page at <[`URL`](https://traveltimn.github.io/ci-milestone02-ifd/)> was loaded over HTTPS, but requested an insecure image <[`URL`](http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/3/3/4)>. This content should also be served over HTTPS.*
        - This is due to the fact that the ArcGIS layer is delivered over *HTTP* rather than *HTTPS*.

#### COMPATIBILITY

To ensure a broad range of users can successfully use this site, I tested it across the 6 major browsers in both desktop and mobile configuration.

- Chrome *v.70*
- Edge *v.18*
- Firefox *v.63*
- Safari *v.12*
- Opera *v.56*
- Internet Explorer *v.11*

#### NOTED ISSUES

- **Internet Explorer** is not capable of rendering CSS Grid, which causes the site to break. I don't find this too much of a problem, since use of IE has fallen to less than 7% globally as of August 2018, and all other browsers support CSS Grid natively now.

- **Esri Leaflet Geocoding** known issue when you search for a location and then try to scroll/zoom, it causes the following console error (functionality still works fine, but error still gets triggered):

```js
leaflet.js:5
Uncaught TypeError: Cannot set property '_leaflet_pos' of undefined
    at wi (leaflet.js:5)
	at i._setPos (leaflet.js:5)
	at i._animateZoom (leaflet.js:5)
	at i.fire (leaflet.js:5)
	at i._animateZoom (leaflet.js:5)
	at i.<anonymous> (leaflet.js:5)
```

## DEPLOYMENT

This particular project does not require any local deployment.

Deployment and source control was entirely done via GitHub. My repository can be found here:

- **Repo: [https://github.com/TravelTimN/ci-milestone02-ifd](https://github.com/TravelTimN/ci-milestone02-ifd)**

I've published the source code built from the *master branch* using **GitHub Pages**.

The live site can be found here:

- **GH Pages: [https://traveltimn.github.io/ci-milestone02-ifd](https://traveltimn.github.io/ci-milestone02-ifd)**

There are no difference between the deployed version and the development version.

## CREDITS

#### CONTENT

The majority of the data used is from [OurAirports.com](http://ourairports.com/data/), specifically the `airports.csv` free download file. However, a large majority of that data is for airports that don't have their own IATA code, and I purely wanted locations that have a valid IATA code. It also contained several useless columns which weren't relevant to my project, and the file contained thousands of invalid Unicode UTF-8 characters, so I did a massive update to a locally saved version for my own use. My cleaned-up version can be [found here](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/data/airports.xlsx) as `.xlsx` format.

Once I had the appropriate data required, I used an [online converter](http://www.convertcsv.com/csv-to-geojson.htm) to convert my CSV data into the appropriate GeoJSON format, which is saved as `iataData.js` and can be [found here](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/js/data/iataData.js).

Approximately 90% of the non-airport markers have been manually added by me, having obtained the valid IATA code from a system at work called [Amadeus](https://www.sellingplatformconnect.amadeus.com) (used by travel agents), and Google Maps to obtain the appropriate latitude/longitude. A lot of manual work, as you could imagine!

- [StackOverflow](https://stackoverflow.com/a/44081354): update marker local timestamp
- [StackOverflow](https://stackoverflow.com/a/50188159): bind popup only when needed
- [StackOverflow](https://stackoverflow.com/a/9851769): detect browser to ignore Internet Explorer
- [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) and [GeoNames](http://www.geonames.org/export/web-services.html#timezone): timezone database data

#### MEDIA

The images used on the buttons are all royalty free vector graphics obtained through a simple Google search. I then used Adobe Photoshop CS6 to create my own markers for the various transportation type.

- [Spinning Globe Loader](http://cdn.lowgif.com/full/7682c56ef78473fe-planet-earth-unitedunderwear-giffy-pinterest-planets.gif)

The images for the map layers (dark, light, earth) were screenshots from my actual project, which I once again used Photoshop to create the actual images used.

I decided not to use Font Awesome just for two tiny icons in the footer, so the [GitHub](https://github.com/logos) and [LinkedIn](https://brand.linkedin.com/) images were obtained through their respective branding pages.

Due to the nature of wanting this project to be entirely open-source, I didn't want to use any CDNs, so downloaded all relevant `.css` and `.js` files for Leaflet and jQuery locally.

#### ACKNOWLEDGEMENTS

A huge thanks to my *[temporary]* mentor [James Timmins](https://github.com/jhtimmins) for his time, suggestions, and constructive feedback for this project!

Also where credit is due, the concept of getting the animated counter came from Codepen: [jQuery Animated Number Counter From Zero To Value - Javascript Animation by Pouya Saadeghi](https://codepen.io/saadeghi/pen/KdpdoQ). I got the code to work on my own, but with some quick assistance from my mentor, I was able to eliminate nearly 100 lines of repetitive code to accomplish the same concept in only 18 lines.

To remain open-source, I also ensured my project used open-source map-tiles that don't require any API Keys or activation. I'm thankful for [Alex Urquhart's Free Tile Services](http://alexurquhart.github.io/free-tiles/) which allowed me to easily implement 3 base map layers, and a single overlay layer.

Finally, thanks to [Chris Quinn](https://github.com/10xOXR), my accountability partner for all projects, for his feedback and support.