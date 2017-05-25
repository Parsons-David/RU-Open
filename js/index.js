var index;

function onLoad(){
  index = new Page();
  console.log("Loading");
}

function onCampusClick(pos){
  var campus = event.target || event.srcElement;
  campus.style.color = (index.selectedCampuses[pos] ? "" : "green");
  index.selectedCampuses[pos] = !index.selectedCampuses[pos];
}

class Page{
  constructor(){
    this.selectedCampuses = [];
    for (var i = 0; i < 4; i++) this.selectedCampuses[i] = false;
  }
}

class Campus{
  constructor(name){
    // Campus Name (Livi, College Ave, etc.)
    this.name = name;
    // Is campus used in search
    this.selected = false;
  }

  add
}

class Building{
  constructor(name){
    // Building Name (Hill Center, Loree, etc)
    this.name = name;
    // Is Building included in search
    this.selected = true;
  }
}
