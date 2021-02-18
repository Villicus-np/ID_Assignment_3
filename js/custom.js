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

//-------- API JS Code -------------//

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
      var t = result[i].time;
      var year = t.substr(0, t.lastIndexOf("."));
      var month = t.substring(t.indexOf(".") + 1);
      if (month == "04")
      {
        month = 1;
      }
      else if (month == "13")
      {
        month = 2;
      }
      else if (month == "21")
      {
        month = 3;
      }
      else if (month == "29")
      {
        month = 4;
      }
      else if (month == "38")
      {
        month = 5;
      }
      else if (month == "46")
      {
        month = 6;
      }
      else if (month == "54")
      {
        month = 7;
      }
      else if (month == "63")
      {
        month = 8;
      }
      else if (month == "71")
      {
        month = 9;
      }
      else if (month == "79")
      {
        month = 10;
      }
      else if (month == "88")
      {
        month = 11;
      }
      else if (month == "96")
      {
        month = 12;
      }
      
      var objarray = [new Date(year,month), Number(result[i].station)];
      data_array.push(objarray);
    }
    console.log(data_array)
    loadChart(data_array, "temp");
  }
  else if (url == 'https://global-warming.org/api/co2-api') {
    // Headers: year,month,day,trend
    console.log("co2");
    let result = data.co2;

    for (var i = 0; i < result.length; i++) {
      var years = result[i].year;
      var month = result[i].month;
      var date = result[i].day;

      var objarray = [new Date(years, month, date), Number(result[i].trend)];
      data_array.push(objarray);
    }
    
    loadChart(data_array, "carbon");
  }
  else if (url == 'https://global-warming.org/api/methane-api') {
    // Headers: date,average
    console.log("methane");
    let result = data.methane;

    for (var i = 0; i < result.length; i++) {
      var t = result[i].date;
      var year = t.substr(0, t.lastIndexOf("."));
      var month = t.substring(t.indexOf(".") + 1);

      var objarray = [new Date(year, month), Number(result[i].average)];
      data_array.push(objarray);
    }
    console.log(result)
    loadChart(data_array, "methane");
  }
  else if (url == 'https://global-warming.org/api/arctic-api') {
    // Headers: year,extend,area
    console.log("artic");
    let result = data.result;

    console.log(result);
    for (var i = 0; i < result.length; i++) {
      var objarray = [new Date(result[i].year,0), result[i].extent, result[i].area];
      data_array.push(objarray);
    }
    loadChart(data_array, "ice");
  }
}

//-------- Chart JS Code -------------//

function drawChart(dataArr, array_Type) {
  var data = new google.visualization.DataTable();


  if (array_Type == "temp") {
    data.addColumn('date', 'X');
    data.addColumn('number', 'Temperature');

    var yAxis = "Celsius";
  }
  else if (array_Type == "carbon") {
    data.addColumn('date', 'X');
    data.addColumn('number', 'Carbon Dioxide');

    var yAxis = "Part Per million(ppm)";
  }
  else if (array_Type == "methane") {
    data.addColumn('date', 'X');
    data.addColumn('number', 'Methane');

    var yAxis = "Part Per million(ppm)";
  }
  else if (array_Type == "ice") {
    data.addColumn('date', 'X');
    data.addColumn('number', 'Extend');
    data.addColumn('number', 'Area');

    var yAxis = "Million Square km";

  }

  data.addRows(dataArr);

  var options = {
    hAxis: {
      title: 'Year',
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
    },
    colors: ['#a52714', '#097138']
  };


  var chart = new google.visualization.LineChart(document.getElementById(array_Type));

  chart.draw(data, options);
}

function drawChartT(dataArr, array_Type) {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'X');
  data.addColumn('number', 'Dogs');
  data.addColumn('number', 'Cats');

  // data.addRows([
  //   [new Date(2000, 8),1],[new Date(2001, 8),1]
  // ]);

  data.addRows(dataArr);

  var options = {
    hAxis: {
      title: 'Year'
    },
    vAxis: {
      title: 'Popularity'
    }//,
    //colors: ['#a52714', '#097138']
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

apiCall("temp");

//-------- Quiz JS Code -------------//



// pos is position of where the user in the test or which question they're up to
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = [
  {
    question: "What makes the world hotter",
    a: "Littering",
    b: "Greenhouse gases",
    c: "Cooking",
    d: "Global warming",
    answer: "D"
  },
  {
    question: "Why is the ice cap melting so fast",
    a: "We keep taking the ice away",
    b: "The increased of global temperatures makes the ice melt more then it can freeze",
    c: "We are teraforming the planet",
    d: "This is natures doing",
    answer: "B"
  },
  {
    question: "Which one is correct?",
    a: "Greenhouse gases help us",
    b: "We can do nothing to stop the increase in temperature",
    c: "Animals help decrease the global temperature",
    d: "Every year the global temperature is slowly increasing",
    answer: "D"
  },
  {
    question: "Which pollutions will affect our air",
    a: "Air pollution",
    b: "Land Pollution",
    c: "All of the above",
    d: "Water pollution",
    answer: "C"
  },
  {
    question: "What is extend",
    a: "It is the surface area which is covered in ice",
    b: "It is the area which is covered in ice",
    c: "It is the extent of how big the ice is",
    d: "It is a measurement of how far the ice extends for",
    answer: "A"
  }
];
// this get function is short for the getElementById function  
function get(x) {
  return document.getElementById(x);
}
// this function renders a question for display on the page
function renderQuestion() {
  test = get("test");
  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
    if(correct < 3)
    {
      test_animation.innerHTML =  '<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_WUEvZP.json"  background="transparent"  speed="0.7"  style="width: 300px; height: 300px;"    autoplay></lottie-player>';
    }
    else
    {
      test_animation.innerHTML = '<lottie-player src="https://assets8.lottiefiles.com/datafiles/zWCwScboaLCVrzc/data.json"  background="transparent"  speed="0.7"  style="width: 300px; height: 300px;"    autoplay></lottie-player>';
    }
    
    get("test_status").innerHTML = "Test completed";
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;
  }
  get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;

  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;
  // display the question
  test.innerHTML = "<h3>" + question + "</h3>";
  // display the answer options
  // the += appends to the data we started on the line above
  test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + chD + "</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer() {
  // use getElementsByName because we have an array which it will loop through
  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if (choice == questions[pos].answer) {
    //each time there is a correct answer this value increases
    correct++;
  }
  // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}
// Add event listener to call renderQuestion on page load event
window.addEventListener("load", renderQuestion);