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
  InitMap()
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
      if (month == "04") {
        month = 1;
      }
      else if (month == "13") {
        month = 2;
      }
      else if (month == "21") {
        month = 3;
      }
      else if (month == "29") {
        month = 4;
      }
      else if (month == "38") {
        month = 5;
      }
      else if (month == "46") {
        month = 6;
      }
      else if (month == "54") {
        month = 7;
      }
      else if (month == "63") {
        month = 8;
      }
      else if (month == "71") {
        month = 9;
      }
      else if (month == "79") {
        month = 10;
      }
      else if (month == "88") {
        month = 11;
      }
      else if (month == "96") {
        month = 12;
      }

      var objarray = [new Date(year, month), Number(result[i].station)];
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
      var objarray = [new Date(result[i].year, 0), result[i].extent, result[i].area];
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
// Creating questionss and answers
//*****************************************************************************
var question1 = {
  question: "What is global warming",
  answers: ["It is the increase of temperature", "It is when we start to feel hot", "It is when the earth's core becoming hotter"],
  correct: 0
};

var question2 = {
  question: "Global Warming is harmful",
  answers: ['True', 'False'],
  correct: 0
};

var question3 = {
  question: 'From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation, and livestock, how much carbon dioxide has the amount increased by?',
  answers: ['50%', '30%', '10%', '25%'],
  correct: 1
}

var question4 = {
  question: "Since the industiral revolution how much has methane levels increased?",
  answers: ["50%", "100%", "150%"],
  correct: 2
};

var question5 = {
  question: "Why is Permafrost thawing bad?",
  answers: ["It releases small amounts of methane to the atmoshpere", "It releases large amounts of methane to the atmoshpere", "It can injure sea creatures or humans if they are too close"],
  correct: 1
};

var question6 = {
  question: "All air pollutants are posionous.",
  answers: ["True","False"],
  correct: 1
};

var question7 = {
  question: "Air pollutions isn't always outside",
  answers: ["True", "False"],
  correct: 0
};

// create an array of objects

var questions = [question1, question2, question3, question4, question5, question6, question7];

// Initialize variables
//------------------------------------------------------------------

var tags;
var tagsClass = '';
var liTagsid = [];
var correctAns = 0;
var quizPage = 1;


var currentIndex = 0;
var currentQuestion = questions[currentIndex];

var prevousQuestion;
var previousIndex = 0;

var ulTag = document.getElementById('answer');
var button = document.getElementById('submit');
var questionTitle = document.getElementById('question');

//save class name so it can be reused easily
//if I want to change it, I have to change it one place
var classHighlight = 'selected';


// Display Answers and hightlight selected item
//------------------------------------------------------------------
function showQuestions() {

  if (currentIndex != 0) {
    // create again submit button only for next pages
    ulTag.innerHTML = '';
    button.innerHTML = 'Submit';
    button.className = 'submit';
    button.id = 'submit';

    //update the number of questions displayed
    document.getElementById('quizNumber').innerHTML = quizPage;
  }

  //Display Results in the final page
  if (currentIndex == (questions.length)) {
    ulTag.innerHTML = '';
    document.getElementById('question').innerHTML = '';

    showResults();

    return
  }

  questionTitle.innerHTML = currentQuestion.question;
  console.log(currentQuestion.question);

  // create a for loop to generate the answers and display them in the page
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    // creating answers
    var newAns = document.createElement('li');
    newAns.id = 'ans' + (i + 1);
    newAns.className = "notSelected";
    var textAns = document.createTextNode(currentQuestion.answers[i]);
    newAns.appendChild(textAns);
    var addNewAnsHere = document.getElementById('answer');
    addNewAnsHere.appendChild(newAns);

    console.log(currentQuestion.answers[i]);
  }


  //.click() will return the result of $('.notSelected')
  var $liTags = $('.notSelected').click(function (list) {
    list.preventDefault();
    //run removeClass on every element
    //if the elements are not static, you might want to rerun $('.notSelected')
    //instead of the saved $litTags
    $liTags.removeClass(classHighlight);
    //add the class to the currently clicked element (this)
    $(this).addClass(classHighlight);

    //get id name of clicked answer
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      // console.log(liTagsid[i]);
      if ($liTags[i].className == "notSelected selected") {
        //store information to check answer
        tags = $liTags[i].id;
        // tagsClass = $LiTags.className;
        console.log(tags);
        tagsClassName = $liTags[i];
      }
    }
  });

  //check answer once it has been submitted
  button.onclick = function () { checkAnswer() };
}

//self calling function
showQuestions();


// Show Correct Answer
//------------------------------------------------------------------
function checkAnswer() {
  // get selected list
  var selectedItem = document.getElementById(tags);

  // check that an answer has been selected
  if (selectedItem == undefined) {
    alert("Please selected an answer!")
    return
  } else {
    // get user answer if form of text
    var userAns = selectedItem.innerHTML;
  }

  // change the background of the answer according to the Results
  if (userAns == currentQuestion.answers[currentQuestion.correct]) {
    console.log("Correct! The answer is: " + userAns);
    // change color of selected item by changing className
    selectedItem.className = 'correct';
    // count the number of correct answers
    correctAns++;
    console.log(correctAns);
  } else {
    console.log("Wrong! The corrent answer is: " + currentQuestion.answers[currentQuestion.correct]);
    //change the background of the wrong answer
    selectedItem.className = 'wrong';
    //hightlight the right answer if the user got it wrong
    //change the class name of the correct answer
    ulTag.getElementsByTagName('li')[currentQuestion.correct].className = 'correct';

    console.log(currentQuestion.answers[currentQuestion.correct]);
  }

  // Create a next Question button once the answer has been submitted
  button.innerHTML = 'Next Question';
  button.className = 'next';
  button.id = 'next';

  prevousQuestion = currentQuestion;
  quizPage++;
  currentIndex++;
  currentQuestion = questions[currentIndex];

  // Start with the next question once the "Next" button has been clicked
  button.onclick = function () { showQuestions() };
  return
}

// Final score
//------------------------------------------------------------------
function showResults() {
  //deleting page number
  document.getElementById('pages').innerHTML = '';

  // Change Title
  questionTitle.innerHTML = '<h1>Your Score</h1>';

  // Get the area that will be used to display the user's score
  var newInfo = document.getElementById('quiz-results');
  //Change the id and className of the area for the circle
  newInfo.innerHTML = '';
  newInfo.id = 'circle';
  newInfo.className = 'circle';


  //Create a Div for the fill element
  var newDiv = document.createElement('div');
  newDiv.className = 'fill';
  var addHere = document.getElementById('circle');
  addHere.appendChild(newDiv);

  // add the score to the circle
  var newScore = document.createElement('h3');
  newScore.className = 'score';
  var textScore = document.createTextNode(Math.floor((correctAns / questions.length) * 100) + '%');
  newScore.appendChild(textScore);
  addHere.appendChild(newScore);

  //use jquary to grab the text of the score
  var score = $(".score").text();

  //fill the circle in base of the score
  $(".fill").css("height", score);

  if (correctAns >= 5) {
    var newCongrats = document.createElement('p');
    var textCongrats = document.createTextNode('Congratulations! You did a Good Job!')
    newCongrats.appendChild(textCongrats);
    document.getElementById('display-area').appendChild(newCongrats);

    confettiEffect();
  }

}

// Confetti Effect by Gtibo "Confetti Party"
//------------------------------------------------------------------
function confettiEffect() {
  //grabing area to create the effect
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  width = canvas.width = window.innerWidth - 20;
  height = canvas.height = window.innerHeight + 560;

  // creating the table
  particle = [];
  particleCount = 0,
    gravity = 0.3,
    colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548'
    ];

  for (var i = 0; i < 300; i++) {

    particle.push({
      x: width / 2,
      y: height / 2,
      boxW: randomRange(5, 20),
      boxH: randomRange(5, 20),
      size: randomRange(2, 8),

      spikeran: randomRange(3, 5),

      velX: randomRange(-8, 8),
      velY: randomRange(-50, -10),

      angle: convertToRadians(randomRange(0, 360)),
      color: colors[Math.floor(Math.random() * colors.length)],
      anglespin: randomRange(-0.2, 0.2),

      draw: function () {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.fillStyle = this.color;
        context.beginPath();

        context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
        context.fill();
        context.closePath();
        context.restore();
        this.angle += this.anglespin;
        this.velY *= 0.999;
        this.velY += 0.3;

        this.x += this.velX;
        this.y += this.velY;

        if (this.y < 0) {
          this.velY *= -0.2;
          this.velX *= 0.9;
        };

        if (this.y > height) {
          this.anglespin = 0;
          this.y = height;
          this.velY *= -0.2;
          this.velX *= 0.9;
        };

        if (this.x > width || this.x < 0) {
          this.velX *= -0.5;
        };
      },
    });
  }

  function drawScreen() {
    context.globalAlpha = 1;
    for (var i = 0; i < particle.length; i++) {
      particle[i].draw();
    }
  }

  function loadImage(url) {
    var img = document.createElement("img");
    img.src = url;
    return img;
  }

  function update() {
    context.clearRect(0, 0, width, height);
    drawScreen();
    requestAnimationFrame(update);
  }

  update();

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function convertToRadians(degree) {
    return degree * (Math.PI / 180);
  }

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = "#000";
    context.beginPath();
    context.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y)
      rot += step
    }

    context.lineTo(cx, cy - outerRadius)
    context.closePath();
    context.fillStyle = color;
    context.fill();

  }
}


//-------- Pollution Map Code -------------//

function InitMap()
{
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(1.3321, 103.7744),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 11
  });
  var t = new Date().getTime();
  var waqiMapOverlay = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      //Air quality map mode
      // APi Reference: https://aqicn.org/faq/2015-09-18/map-web-service-real-time-air-quality-tile-api/
      return 'https://tiles.aqicn.org/tiles/usepa-aqi/' + zoom + "/" + coord.x + "/" + coord.y + ".png?token=aeed7ce91e18ff7ccd03b84a9c3a5c75c799d615";
    },
    name: "Air Quality",
  });
  map.overlayMapTypes.insertAt(0, waqiMapOverlay);
}
