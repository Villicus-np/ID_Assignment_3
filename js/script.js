$(document).ready(function() {
  $(this).scrollTop(0);
  let url = 'https://global-warming.org/api/';
})
apiCall("carbon");
apiCall("temp");

function apiCall(apiLink)
{
  // API call
  url = 'https://global-warming.org/api/';
  if(apiLink == "temp")
  {
    url = url + "temperature-api";
  }
  else if (apiLink == "carbon")
  {
    url = url + "co2-api";
  }
  else if (apiLink == "methane")
  {
    url = url + "methane-api";
  }
  else if (apiLink == "ice")
  {
    url = url + "arctic-api";
  }
  console.log(url);
  // Headers result[i] -> land,station,time
  fetch(url)
    .then(response => response.json()) 
    .then(apiData)
    .catch(err => {
      console.error(err);
    });
    console.log();
}
console.log(url);
function apiData(data) 
{
  var data_array = [];

  //Reminder to change the headers to suit it better
  if (url == 'https://global-warming.org/api/temperature-api')
  {
    // Headers: time,station
    console.log("temp");
    let result = data.result;

    for (var i = 0; i<result.length;i++)
    {
      var objarray = [Number(result[i].time),Number(result[i].station)];
      data_array.push(objarray);
    }
    loadChart(data_array,"temp");
  }
  else if (url == 'https://global-warming.org/api/co2-api')
  {
    // Headers: year,month,day,trend
    console.log("co2");
    let result = data.co2;

    for (var i = 0; i<result.length;i++)
    {
      var objarray = [i,Number(result[i].trend)];
      data_array.push(objarray);
    }
    loadChart(data_array,"carbon");
  }
  else if (url == 'https://global-warming.org/api/methane-api')
  {
    // Headers: date,average
    console.log("methane");
    let result = data.methane;

    for (var i = 0; i<result.length;i++)
    {
      var objarray = [i,Number(result[i].average)];
      data_array.push(objarray);
    }
    loadChart(data_array,"methane");
  }
  else if (url == 'https://global-warming.org/api/arctic-api')
  {
    // Headers: year,extend,area
    console.log("artic");
    let result = data.result;

    for (var i = 0; i<result.length;i++)
    {
      var objarray = [i,Number(result[i].extend),Number(result[i].area)];
      data_array.push(objarray);
    }
    loadChart(data_array,"ice");
  }
}

function drawChart(dataArr,array_Type) 
{
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');

  if(array_Type == "temp")
  {
    data.addColumn('number', 'Temperature');
    
    var xAxis = "Year";
    var yAxis = "Celsius"; 
  }
  else if (array_Type == "carbon")
  {
    data.addColumn('number', 'Carbon Dioxide');
    
    var xAxis = "Year";
    var yAxis = "Part Per million(ppm)"; 
    var options = {
      hAxis: {
        title: 'Year'
      },
      vAxis: {
        title: 'Part Per million(ppm)'
      }
    };
  }
  else if (array_Type == "methane")
  {
    data.addColumn('number', 'Methane');
    
    var xAxis = "Year";
    var yAxis = "Part Per million(ppm)"; 
  }

  var options = {
    hAxis: {
      title: xAxis,
      textStyle: {
        color: '#FFFFFF'
      },
      titleTextStyle: {
        color: '#FFFFFF'
      }
    },
    vAxis: {
      title: yAxis,
      textStyle: {
        color: '#FFFFFF'
      },
      titleTextStyle: {
        color: '#FFFFFF'
      }        
    },
    backgroundColor: '#111111',
    legend: {
      textStyle: {
        color: '#FFFFFF'
      }
    }
  };
  
  data.addRows(dataArr);
  
  var chart = new google.visualization.LineChart(document.getElementById(array_Type));
  
  chart.draw(data, options);
}

function loadChart(api_array,array_Type)
{
  // Google Charts https://developers.google.com/chart/interactive/docs/gallery/linechart
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(function () {
    drawChart(api_array,array_Type);
  });
}