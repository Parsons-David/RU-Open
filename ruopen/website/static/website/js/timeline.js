google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(onLoad);
var weekInts = {'U' : 0, 'M' : 1, 'T' : 2, 'W' : 3, 'TH' : 4, 'F' : 5, 'S' : 6};

function drawBuildingTimeline(container, rooms, day) {

  console.log($( "body" ).data( "foo" ))

  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Room' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  var noTable = true;

  for(r in rooms){
    var name = r;
    var hour = 1;

    // console.log(rooms[r]['M']);

    times = rooms[r][weekInts[day]];

    // console.log(weekInts[day]);

    // console.log(times);

    // return;

    for(key in times){

      var t = times[key];

      // console.log(key + " -> " + t);

      var start = timeStringToDate(t['str']);
      var end = timeStringToDate(t['end']);
      var course = t['title'];


      dataTable.addRows([[name, course, start, end]]);
      hour += 1;
      noTable = false;
    }
  }


  var options = {
    width: 800,
    // timeline: { colorByRowLabel: true }
    // height: 600,
    // chartArea: {  width: "50%", height: "70%" }
  };

  if(noTable){
    container.innerHTML = "No Classes Scheduled Today";
    return;
  }

  chart.draw(dataTable, options);
}

function timeStringToDate(str) {
  // console.log(str);
  var h = String(str).substring(0,2);
  var m = String(str).substring(2, 4);
  return new Date(0, 0, 0, parseInt(h), parseInt(m), 0);
}
