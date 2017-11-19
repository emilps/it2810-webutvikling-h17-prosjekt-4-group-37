let myInterval = setInterval(checkForMap, 1000);
function checkForMap() {
  if (document.getElementById("regions_div")) {
    clearInterval(myInterval);
    google.charts.load('current', {
      'packages':['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);



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

      var options = {
        resolution:'continents',
        colorAxis: {values: [1, 10, 100, 1000], colors: ['green', 'yellow', 'orange' ,'red'],},
        legend: 'none'
      };

      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      let title = document.getElementById('regionTitle');
      let mapTitle = document.getElementById('mapTitle');

      function addListeners(){
        google.visualization.events.addOneTimeListener(chart, 'regionClick', function (eventData) {
                  options['region'] = eventData.region;
                  options['resolution'] = 'countries';

                  /* Old code for changing Title to display selected continent
                  switch(eventData.region) {
                    case "150":
                        title.innerHTML = "Europa";
                        break;
                    case "002":
                        title.innerHTML = "Afrika";
                        break;
                    case "019":
                        title.innerHTML = "Amerika";
                        break;
                    case "142":
                        title.innerHTML = "Asia";
                        break;
                    default:
                        title.innerHTML = eventData.region;
                }
                */
                  mapTitle.innerHTML = "Velg land for å se nasjonens viner";
                  chart.draw(data, options);
            });
        google.visualization.events.addListener(chart, 'select', function() {
          var selectedItem = chart.getSelection()[0];
          if (selectedItem) {
            var country = data.getValue(selectedItem.row, 0);
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
      addListeners();
      chart.draw(data, options);

      //Adds eventListener to click on the "back" button to return to continent view on the map
      var backButton = document.getElementById('backButton');
      backButton.addEventListener("click",function(e){
        options['region'] = 'world';
        options['resolution'] = 'continents';
        chart.draw(data, options);
        title.innerHTML = "Verden";
        mapTitle.innerHTML = "Velg kontinent";
        addListeners();
      },false);
    }
  }
}
