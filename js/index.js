var index;

function onLoad(){
  console.log("Loading");
  $.getJSON('data.json', function(data) {
        index = new Page(data);
  });
  $("*").css( 'cursor', 'pointer' );
  // for (var i = 0; i < 5; i++){
  //   var div = document.getElementById('camp' + i);
  //   div.style.display = 'none';
  //   for(var j = 1; j < 11; j++){
  //     var sec = document.createElement("SECTION");
  //     sec.innerHTML = '&emsp;Test' + j;
  //     div.append(sec);
  //   }
  // }
}

function onClick(){
  var elem = event.target || event.srcElement;
  elem.style.color = "green";
  // document.getElementById('camp' + pos).style.display = (index.selectedCampuses[pos] ? "none" : '');
  // index.selectedCampuses[pos] = !index.selectedCampuses[pos];
}

function createCampus(name){
  var sec = document.createElement("SECTION");
  sec.innerHTML = name;
  sec.onclick = onClick;
  return sec;
}

function createBuilding(name){
  var sec = document.createElement("div");
  sec.innerHTML = '&emsp;' + name;
  sec.onclick = onClick;
  // sec.style.display = 'none';
  // sec.onclick = onCampusClick;
  return sec;
}

function createRoom(name){
  var sec = document.createElement("div");
  sec.innerHTML = '&emsp;&emsp;' + name;
  sec.onclick = onClick;
  // sec.style.display = 'none';
  // sec.onclick = onCampusClick;
  return sec;
}

function getBuildings(campus){
  var div = document.createElement("div");
  div.id = 'div' + campus;
  for(var b in campus){
    div.append(createBuilding(b));
    div.append(getRooms(campus[b]));
  }
  return div;
}

function getRooms(build){
  var div = document.createElement("div");
  div.id = 'div' + build;
  for(var r in build){
    div.append(createRoom(r));
    // div.append(getRooms(build[r]));
  }
  return div;
}

class Page{
  constructor(data){
    // Stores JSON data
    this.json = data;

    for(var k in this.json){
      document.getElementById("body").append(createCampus(k));
      document.getElementById("body").append(getBuildings(this.json[k]));
      console.log(k);
    }

    this.selectedCampuses = [];
    for (var i = 0; i < 5; i++) this.selectedCampuses[i] = false;
  }
}

class Campus{
  constructor(name){
    // Campus Name (Livi, College Ave, etc.)
    this.name = name;
    // Is campus used in search
    this.selected = false;
  }

}

class Building{
  constructor(name){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = true;
  }
}
