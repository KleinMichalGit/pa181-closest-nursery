![main](https://github.com/KleinMichalGit/pa181-closest-nursery/actions/workflows/main.yml/badge.svg)

# PA181 Closest Nursery Enrolment

## Team members:

- Samuel Benko, učo 514449
- Filip Fábry, učo 514359
- Tamara Jadušová, učo 514444
- Michal Klein, učo 514072

## The real problem we would like to solve

based on user-provided GPS coordinates, we would like to display the closest-placed nursery schools in Brno.
Applying for the closest available nursery school decreases spending on fuel, which may positively benefit the economy of
local households. Shorter traveling distances cause a decrease in energy spending, which may increase air quality and,
therefore, the health of local citizens. The service is expected to simplify parents' lives by decreasing the time required
to search for a suitable nursery school. Since parents are usually people at a productive age, increasing the amount of free time
will enable them to invest more time into economically productive activities. As a byproduct, it is supposed to increase local GDP.

## About
Welcome to our interactive map application designed to help you find the nearest nursery school with ease.

This application allows you to click on any point on the map, and it will automatically select the closest nursery relative to the position you selected. Additionally, the app calculates and displays the shortest obstacle-free path to the nursery.

### Key Features:

- Interactive Map: Click anywhere on the map to find the nearest nursery school.

- Shortest Path Calculation: Get the shortest route to the selected nursery.

- Detailed Information: View detailed information about the nursery, including address, contact details, director’s name, website, and school capacity.

- Accessibility Options: Customize your experience with various color themes, language options (Czech, English, Spanish, French, German), and adjustable font sizes.

### How to Use:

1. Select a Point on the Map: Click on any location on the map.

2. View Nearest Nursery: The nearest nursery school will be highlighted.

3. Get Details: See detailed information about the nursery on the side panel and on the map.

Below is an example of how to use the site:
![example usage](/public/Animation.gif)

Thank you for using our application to find the best and nearest nursery schools!

### Datasets we use:

[dataset url](https://gis.brno.cz/ags1/rest/services/ODAE/ODAE_zapis_ms/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson)
(the dataset is expected to update since the enrolment into nursery schools is still ongoing)

[open route service](https://api.openrouteservice.org/)
We use this service to calculate the wheelchair accessible route between the user's location and the closest nursery school.


### Potential customers:

Residents of Brno with children of preschool age.
