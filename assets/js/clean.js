var index;
var week = ['U', 'M', 'T', 'W', 'TH', 'F', 'S'];
var currentDay;
var semesterData;

function onLoad(){
  console.log("Loading");
  $.getJSON('assets/json/summer2017data.json', function(data) {
    semesterData = data;
    createTimelines(semesterData, week[(new Date()).getDay()]);
  });
}

function selectDay(id){
  $("#divTimelines").empty();
  createTimelines(semesterData, id);
}

function createTimelines(json, day){
  // $("*").css( 'cursor', 'pointer' );
  console.log(day);

  for(var campus in json){

    var campHead = document.createElement("h2");
    campHead.innerHTML = campus;
    document.getElementById("divTimelines").append(campHead);

    for(var building in json[campus]){

      var buildHead = document.createElement("h4");
      buildHead.innerHTML = building;
      document.getElementById("divTimelines").append(buildHead);

      // console.log(json[campus][building]);
      var div = document.createElement('div');
      div.id = campus + ' - ' + building;
      document.getElementById("divTimelines").append(div);
      drawBuildingTimeline(div, json[campus][building], day);
    }
  }
}
