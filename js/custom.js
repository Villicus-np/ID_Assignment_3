// navbar background colour change on scroll

$(function () {
  $(document).scroll(function () {
    var $nav = $("#navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// arrow down icon onclick scroll to tabs

$('#scroll-icon').mousedown(function () {
  timeout = setInterval(function () {
    window.scrollBy(0, 765);
  }, 0);

  return false;
});

$(document).mouseup(function () {
  clearInterval(timeout);
  return false;
});

// force site to scroll to top on load

$(document).ready(function () {
  $(this).scrollTop(0);
  let url = 'https://global-warming.org/api/';
})
// apiCall("temp");

function loadHideGraph(apiLink) {
  var x = document.getElementById(apiLink + "Btn");
  var y = document.getElementById(apiLink);
  apiCall(apiLink);
  if (x.innerHTML === "Hide Graph") {
    x.innerHTML = "Load Graph";
    y.style.display = "none";
  } else {
    x.innerHTML = "Hide Graph";
    y.style.display = "block";
  }
}

function apiCall(apiLink) {
  // API call
  url = 'https://global-warming.org/api/';
  if (apiLink == "temp") {
    url = url + "temperature-api";
  }
  else if (apiLink == "carbon") {
    url = url + "co2-api";
  }
  else if (apiLink == "methane") {
    url = url + "methane-api";
  }
  else if (apiLink == "ice") {
    url = url + "arctic-api";
  }

  // Headers result[i] -> land,station,time
  fetch(url)
    .then(response => response.json())
    .then(apiData)
    .catch(err => {
      console.error(err);
    });
  console.log();
}

function apiData(data) {
  console.log(url);
  var data_array = [];

  //Reminder to change the headers to suit it better
  if (url == 'https://global-warming.org/api/temperature-api') {
    // Headers: time,station
    console.log("temp");
    let result = data.result;

    for (var i = 0; i < result.length; i++) {
      var objarray = [Number(result[i].time), Number(result[i].station)];
      data_array.push(objarray);
    }
    loadChart(data_array, "temp");
  }
  else if (url == 'https://global-warming.org/api/co2-api') {
    // Headers: year,month,day,trend
    console.log("co2");
    let result = data.co2;

    for (var i = 0; i < result.length; i++) {
      var objarray = [i, Number(result[i].trend)];
      data_array.push(objarray);
    }
    loadChart(data_array, "carbon");
  }
  else if (url == 'https://global-warming.org/api/methane-api') {
    // Headers: date,average
    console.log("methane");
    let result = data.methane;

    for (var i = 0; i < result.length; i++) {
      var objarray = [i, Number(result[i].average)];
      data_array.push(objarray);
    }
    loadChart(data_array, "methane");
  }
  else if (url == 'https://global-warming.org/api/arctic-api') {
    // Headers: year,extend,area
    console.log("artic");
    let result = data.result;
    for (var i = 0; i < result.length; i++) {
      var objarray = [result[i].year, result[i].extent, result[i].area];
      data_array.push(objarray);
    }
    loadChart(data_array, "ice");
  }
}

function drawChart(dataArr, array_Type) {
  var data = new google.visualization.DataTable();
  

  if (array_Type == "temp") {
    data.addColumn('number', 'X');
    data.addColumn('number', 'Temperature');

    var yAxis = "Celsius";
  }
  else if (array_Type == "carbon") {
    data.addColumn('number', 'X');
    data.addColumn('number', 'Carbon Dioxide');

    var yAxis = "Part Per million(ppm)";
  }
  else if (array_Type == "methane") {
    data.addColumn('number', 'X');
    data.addColumn('number', 'Methane');

    var yAxis = "Part Per million(ppm)";
  }
  else if (array_Type == "ice") {
    data.addColumn('string', 'X');
    data.addColumn('number', 'Extend');
    data.addColumn('number', 'Area');

    var yAxis = "Million Square km";

  }

  data.addRows(dataArr);

  var options = {
    hAxis: {
      title: 'Year',
      // textStyle: {
      //   color: '#FFFFFF'
      // },
      // titleTextStyle: {
      //   color: '#FFFFFF'
      // }
    },
    vAxis: {
      title: yAxis,
      // textStyle: {
      //   color: '#FFFFFF'
      // },
      // titleTextStyle: {
      //   color: '#FFFFFF'
      // }
    },
    // backgroundColor: '#111111',
    // legend: {
    //   textStyle: {
    //     color: '#FFFFFF'
    //   }
    // }
  };


  var chart = new google.visualization.LineChart(document.getElementById(array_Type));

  chart.draw(data, options);
}

function loadChart(api_array, array_Type) {
  // Google Charts https://developers.google.com/chart/interactive/docs/gallery/linechart
  google.charts.load('current', { packages: ['corechart', 'line'] });
  google.charts.setOnLoadCallback(function () {
    drawChart(api_array, array_Type);
  });
}

apiCall("ice");