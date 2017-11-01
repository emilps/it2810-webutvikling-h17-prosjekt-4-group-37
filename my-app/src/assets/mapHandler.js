google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Number of Wines'],
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
    ['Switzerland', 2],
    ['MK', 7],
    ['Slovenia', 11],
    ['Morocco', 1],
    ['India', 5],
    ['Mexico', 2],
    ['Bulgaria', 3],
    ['Canada', 11],
    ['Romania', 10],
    ['Czechia', 4]
  ]);

  var options = { resolution:'continents', colors: ['green', 'blue'], legend: 'none'};

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  let title = document.getElementById('regionTitle');
  let mapTitle = document.getElementById('mapTitle');

  google.visualization.events.addOneTimeListener(chart, 'regionClick', function (eventData) {
            // maybe you want to change the data table here...
            options['region'] = eventData.region;
            console.log("Clicked Region!" + eventData.region);
            options['resolution'] = 'countries';
            switch(eventData.region) {
              case "150":
                  title.innerHTML = "Europe";
                  break;
              case "002":
                  title.innerHTML = "Africa";
                  break;
              case "019":
                  title.innerHTML = "Americas";
                  break;
              case "142":
                  title.innerHTML = "Asia";
                  break;
              default:
                  title.innerHTML = eventData.region;
          }
            mapTitle.innerHTML = "Click on a country to see wines from that area";
            chart.draw(data, options);
      });
  google.visualization.events.addListener(chart, 'select', function() {
    var selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      var country = data.getValue(selectedItem.row, 0);
        console.log(country);
        title.innerHTML = country;
    }
  });

  chart.draw(data, options);
}
