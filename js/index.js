var index;

function onLoad(){
  console.log("Loading");
  $.getJSON('http://parsonssoftware.me/RU-Open/data.json', function(data) {
        index = new Page(data);
  });
  $("*").css( 'cursor', 'pointer' );
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
      $("body").data(b, new Building(b, buildings[b]))
      this.div.append($("body").data(b).sec);
      this.div.append($("body").data(b).div);
    }

  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
    this.div.style.display = (this.selected ? '' : 'none');
  }

}

class Building{
  constructor(name, room){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = false;

    // Document Elements
    // Section for Campus
    this.sec = document.createElement("SECTION");
    this.sec.id = name;
    this.sec.innerHTML = '&emsp;' + name;
    this.sec.onclick = onClick;

    // Div for Buildings on Campus
    this.div = document.createElement("div");
    this.div.style.display = 'none';

    for(var r in room){
      $("body").data(r, new Room(r, room[r]))
      this.div.append($("body").data(r).sec);
      this.div.append($("body").data(r).div);
    }
  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
    this.div.style.display = (this.selected ? '' : 'none');
  }
}


class Room{
  constructor(name, time){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = false;

    // Document Elements
    // Section for Campus
    this.sec = document.createElement("SECTION");
    this.sec.id = name;
    this.sec.innerHTML = '&emsp;&emsp;' + name;
    this.sec.onclick = onClick;

    // Div for Buildings on Campus
    this.div = document.createElement("div");
    this.div.style.display = 'none';

  }

  toggleSelected(){
    this.selected = !this.selected;
    this.sec.style.color = (this.selected ? 'green' : '' );
      console.log("Room Selected");
    this.div.style.display = (this.selected ? '' : 'none');
  }
}
