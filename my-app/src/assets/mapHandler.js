/*
Script that loads the clickable GeoChart Map in the map.component
*/

/* Sets a interval and checks if the div that should contain the Map
excists, to avoid errors */
let myInterval = setInterval(checkForMap, 1000);
function checkForMap() {
  //Checks if the current page cointains the div for the Map to load in
  if (document.getElementById("regions_div")) {
    clearInterval(myInterval);
    google.charts.load('current', {
      'packages':['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    /* Draws the Regionmap with our countries that have wines, and displays
    the number of wines on mouse hover */
    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable([
        ['Country', 'Antall viner'],
        ['France', 3177],
        ['Italy', 3010],
        ['Portugal', 237],
        ['Spain', 904],
        ['Germany', 888],
        ['Chile', 146],
        ['USA', 424],
        ['Australia', 280],
        ['South Africa', 267],
        ['Austria', 259],
        ['Hungary', 39],
        ['Argentina', 137],
        ['New Zealand', 104],
        ['Moldova', 2],
        ['Greece', 30],
        ['Georgia', 7],
        ['Libanon', 14],
        ['Brazil', 4],
        ['Macedonia', 7],
        ['Slovenia', 11],
        ['Morocco', 1],
        ['Mexico', 2],
        ['Bulgaria', 3],
        ['Canada', 11],
        ['Romania', 10],
        ['Czechia', 4]
      ]);
      //Initial options to show the world continents
      var options = {
        resolution:'continents',
        colorAxis: {values: [1, 10, 100, 1000], colors: ['green', 'yellow', 'orange' ,'red'],},
        legend: 'none'
      };
      //The chart that will be displayed and its position
      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
      //Card titles for the Map and Table
      let title = document.getElementById('regionTitle');
      let mapTitle = document.getElementById('mapTitle');
      /* Add eventListener to change the view from continents to the countries
      of the clicked continent. Add eventListener to change wines displayed
      to the country clicked */
      function addListeners(){
        //One time listener for the Continent click
        google.visualization.events.addOneTimeListener(chart, 'regionClick', function (eventData) {
                  //Changes option 'region' to the clicked continent
                  options['region'] = eventData.region;
                  //Changes option 'resolution' to show Map at country level
                  options['resolution'] = 'countries';
                  //Changes Map Card Title to indicate new expected user behavior
                  mapTitle.innerHTML = "Velg land for å se nasjonens viner";
                  //Draws new Map with the set options
                  chart.draw(data, options);
            });
        //Listener for when a Country is clicked
        google.visualization.events.addListener(chart, 'select', function() {
          var selectedItem = chart.getSelection()[0];
          if (selectedItem) {
            var country = data.getValue(selectedItem.row, 0);
              /* Switch to display selected country in Norwegian, not the
              prettiest solution, but necessary since the chart only supports
              English */
              switch(country) {
                case "France":
                    title.innerHTML = "Frankrike";
                    break;
                case "Italy":
                    title.innerHTML = "Italia";
                    break;
                case "Portugal":
                    title.innerHTML = "Portugal";
                    break;
                case "Spain":
                    title.innerHTML = "Spania";
                    break;
                case "Germany":
                    title.innerHTML = "Tyskland";
                    break;
                case "Chile":
                    title.innerHTML = "Chile";
                    break;
                case "USA":
                    title.innerHTML = "USA";
                    break;
                case "Australia":
                    title.innerHTML = "Australia";
                    break;
                case "South Africa":
                    title.innerHTML = "Sør-Afrika";
                    break;
                case "Austria":
                    title.innerHTML = "Østerrike";
                    break;
                case "Hungary":
                    title.innerHTML = "Ungarn";
                    break;
                case "Argentina":
                    title.innerHTML = "Argentina";
                    break;
                case "New Zealand":
                    title.innerHTML = "New Zealand";
                    break;
                case "Moldova":
                    title.innerHTML = "Moldova";
                    break;
                case "Greece":
                    title.innerHTML = "Hellas";
                    break;
                case "Georgia":
                    title.innerHTML = "Georgia";
                    break;
                case "Libanon":
                    title.innerHTML = "Libanon";
                    break;
                case "Brazil":
                    title.innerHTML = "Brasil";
                    break;
                case "Macedonia":
                    title.innerHTML = "Makedonia";
                    break;
                case "Slovenia":
                    title.innerHTML = "Slovenia";
                    break;
                case "Morocco":
                    title.innerHTML = "Marokko";
                    break;
                case "Mexico":
                    title.innerHTML = "Mexico";
                    break;
                case "Bulgaria":
                    title.innerHTML = "Bulgaria";
                    break;
                case "Canada":
                    title.innerHTML = "Canada";
                    break;
                case "Romania":
                    title.innerHTML = "Romania";
                    break;
                case "Czechia":
                    title.innerHTML = "Tsjekkia";
                    break;
                default:
                    title.innerHTML = country;
            }
          }
        });
    }
      //Default Map view drawing and listeners added
      addListeners();
      chart.draw(data, options);
      //Adds eventListener to click on the "Tilbake" button to return to continent view on the Map
      var backButton = document.getElementById('backButton');
      backButton.addEventListener("click",function(e){
        options['region'] = 'world';
        options['resolution'] = 'continents';
        chart.draw(data, options);
        mapTitle.innerHTML = "Velg kontinent";
        addListeners();
      },false);
    }
  }
}
