var index;
var week = ['SUN', 'M', 'T', 'W', 'TH', 'F', 'S'];
var day;

function onLoad(){
  console.log("Loading");
  $.getJSON('summer2017data.json', function(data) {
        index = new Page(data);
  });
  $("*").css( 'cursor', 'pointer' );
  day = week[(new Date()).getDay()];
  console.log(day);
}

function onClick(){
  var elem = event.target || event.srcElement;
  $("body").data(elem.id).toggleSelected();
}

class Page{
  constructor(data){
    // Stores JSON data
    this.json = data;

    for(var k in this.json){
      $("body").data(k, new Campus(k, this.json[k]));
      document.getElementById("body").append($("body").data(k).sec);
      document.getElementById("body").append($("body").data(k).div);
      console.log(k + " -> " + this.json[k]);
    }

  }
}

class Campus{
  constructor(name, buildings){
    // Campus Name (Livi, College Ave, etc.)
    this.name = name;
    // Is campus used in search
    this.selected = false;

    // Document Elements
    // Section for Campus
    this.sec = document.createElement("SECTION");
    this.sec.id = name;
    this.sec.innerHTML = name;
    this.sec.onclick = onClick;

    // Div for Buildings on Campus
    this.div = document.createElement("div");
    this.div.style.display = 'none';

    for(var b in buildings){
      var newID = name + ' - ' + b
      $("body").data(newID, new Building(b, buildings[b], newID))
      this.div.append($("body").data(newID).sec);
      this.div.append($("body").data(newID).div);
    }

  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
    this.div.style.display = (this.selected ? '' : 'none');
  }

}

class Building{
  constructor(name, room, uniqueID){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = false;

    // Document Elements
    // Section for Campus
    this.sec = document.createElement("SECTION");
    this.sec.id = uniqueID;
    this.sec.innerHTML = '&emsp;' + name;
    this.sec.onclick = onClick;

    // Div for Buildings on Campus
    this.div = document.createElement("div");
    this.div.style.display = 'none';

    for(var r in room){
      var newID = uniqueID + ' - ' + r;
      $("body").data(newID, new Room(r, room[r], newID))
      this.div.append($("body").data(newID).sec);
      this.div.append($("body").data(newID).div);
    }
  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
    this.div.style.display = (this.selected ? '' : 'none');
  }
}


class Room{
  constructor(name, time, uniqueID){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = false;

    // Document Elements
    // Section for Campus
    this.sec = document.createElement("SECTION");
    this.sec.id = uniqueID;
    this.sec.innerHTML = '&emsp;&emsp;' + name;
    this.sec.onclick = onClick;

    // Div for Buildings on Campus
    this.div = document.createElement("div");
    this.div.style.display = 'none';

    if(time[day] == null){
      this.div.innerHTML =  '&emsp;&emsp;&emsp;' + "No Classes Scheduled";
    } else {
      this.div.innerHTML =  '&emsp;&emsp;&emsp;' + time[day].length + " classes scheduled today.";
    }

  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
    this.div.style.display = (this.selected ? '' : 'none');
  }
}

class Time{

  constructor(){

  }

}
