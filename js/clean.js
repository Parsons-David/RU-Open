var index;
var day;
// var json;

function onLoad(){
  console.log("Loading");
  $.getJSON('summer2017data.json', function(data) {
        createTimelines(data);
  });
}

function createTimelines(json){
  // $("*").css( 'cursor', 'pointer' );
  day = [(new Date()).getDay()];

  for(campus in json){

    var campHead = document.createElement("h2");
    campHead.innerHTML = campus;
    document.getElementById("body").append(campHead);

    for(building in json[campus]){

      var buildHead = document.createElement("h4");
      buildHead.innerHTML = building;
      document.getElementById("body").append(buildHead);

      console.log(json[campus][building]);
      var div = document.createElement('div');
      div.id = campus + ' - ' + building;
      document.getElementById("body").append(div);
      drawBuildingTimeline(div, json[campus][building]);
    }
  }
}
