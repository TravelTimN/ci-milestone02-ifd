![Demo IATA Map](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/demo.gif)

# Open-Source IATA Map

###### Code Institute / Interactive Front-End Development

For this project, we could choose from one of the following scenarios: **1)** Create a single-page application that relies heavily on one or more APIs, **2)** Create a Memory Game similar to *Simon*, **3)** Create a Data Dashboard, or **4)** Create your own project.

I decided to combine the use of a mapping API with data in the form of an open-source map of global IATA codes, as my current profession is in the travel industry.

## DESIGN

#### FRAMEWORK

**CSS Grid**: I personally prefer CSS Grid, which is why I've decided to build the entire site using Grid, with no Bootstrap or Flexbox required.

#### COLOR SCHEME

TBD

[ *all colors are set at `:root` level in CSS* ]

- ![#018FC3](https://placehold.it/15/018FC3/018FC3) `#018FC3` (*airports*)
- ![#FF5100](https://placehold.it/15/FF5100/FF5100) `#FF5100` (*bus stations*)
- ![#FFD000](https://placehold.it/15/FFD000/FFD000) `#FFD000` (*ferry ports*)
- ![#FF1100](https://placehold.it/15/FF1100/FF1100) `#FF1100` (*heliports*)
- ![#A602FF](https://placehold.it/15/A602FF/A602FF) `#A602FF` (*seaplane bases*)
- ![#03FF42](https://placehold.it/15/03FF42/03FF42) `#03FF42` (*train stations*)

The remaining aesthetics were my own preference, to match the three different map-tile layers that I've incorporated for user-selection, which simultaneously keeps the site looking fairly modern and professional.

#### UX DESIGN

TBD

#### WIREFRAMES

I used [Adobe XD](https://www.adobe.com/ie/products/xd.html) to create my wireframe/mock-up. I've included a `.png` file for visual representation on GitHub.

## FEATURES

TBD

###### [index.html](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/index.html)


#### WISH LIST

Future Implementations:

TBD

## TECHNOLOGIES

Brief overview of the languages, frameworks, and other tools I've used on this project:

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
    - Semantic markup language as the shell of the site.

- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    - Cascading Style Sheets as the design of the site.

- [CSS Grid](https://en.wikipedia.org/wiki/CSS_grid_layout)
    - Grid allows for a responsive layout across various platforms.

- [JavaScript](https://www.javascript.com)
   - Used for open/close effect on mobile navbar, as well as the fancybox implementation.


## TESTING


#### TEST MATRIX

I created a [testing matrix](https://github.com/TravelTimN/ci-milestone02-ifd/blob/master/testing/testing-ci-milestone02-ifd.xlsx) in Excel, but saved as `.png` to visualize here on GitHub. It outlines the various tests I made to ensure the site renders consistently across different platforms, and that each functionality behaves as intended.

#### COMPATIBILITY

To ensure a broad range of users can successfully view/use the site, I tested it across all major browsers in both desktop and mobile configuration.

- Chrome
- Edge
- Firefox
- Safari
- Opera
- Internet Explorer

#### NOTED ISSUES

- **Internet Explorer** is not capable of rendering CSS Grid, which causes the site to break.

## DEPLOYMENT

I've deployed the site using **GitHub Pages**, and is available here: [https://traveltimn.github.io/ci-milestone02-ifd](https://traveltimn.github.io/ci-milestone02-ifd)

For this project, local deployment was not required.

## CREDITS

#### CONTENT

TBD

#### MEDIA

TBD

#### ACKNOWLEDGEMENTS

Huge thanks to my mentor [James Timmins](https://github.com/jhtimmins) for his time, suggestions, and constructive feedback!

Also where credit is due, the concept of getting the animated counter came from Codepen: [jQuery Animated Number Counter From Zero To Value - Javascript Animation by Pouya Saadeghi](https://codepen.io/saadeghi/pen/KdpdoQ). I got the code to work on my own, but with some quick assistance from my mentor, I was able to eliminate nearly 100 lines of repetitive code to accomplish the same concept in only 18 lines.

Finally, to [Chris Quinn](https://github.com/10xOXR), my accountability partner for all projects.