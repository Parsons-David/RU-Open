var index;
var week = ['U', 'M', 'T', 'W', 'TH', 'F', 'S'];
var campuses = ['Cook-Douglass', 'Livingston', 'Busch', 'College-Avenue']
var keys = {'Cook-Douglass':'DOUGLAS/COOK', 'Livingston' : 'LIVINGSTON', 'Busch':  'BUSCH', 'College-Avenue' : 'COLLEGE AVENUE'}
var currentDay;
var semesterData;

function onLoad(){

  for(var c in campuses){
    console.log(campuses[c] + ' -> ' + $('#Livingston').length)
    if($('#' + campuses[c] ).length){
      console.log("Loading..." + campuses[c]);
      $.getJSON('/static/website/json/summer2017data.json', function(data) {
        semesterData = data;
        createTimelines(campuses[c], semesterData, week[(new Date()).getDay()]);
      });
      return;
    }
  }



}

function selectDay(id){
  $("#divTimelines").empty();
  createTimelines(semesterData, id);
}

function createTimelines(campus, json, day){
  // $("*").css( 'cursor', 'pointer' );
  console.log(day);


  var campHead = document.createElement("h2");
  campHead.innerHTML = campus;
  document.getElementById(campus).append(campHead);

  for(var building in json[keys[campus]]){

    var buildHead = document.createElement("h4");
    buildHead.innerHTML = building;
    document.getElementById(campus).append(buildHead);

    // console.log(json[campus][building]);
    var div = document.createElement('div');
    div.id = campus + ' - ' + building;
    document.getElementById(campus).append(div);
    drawBuildingTimeline(div, json[keys[campus]][building], day);
  }
}
