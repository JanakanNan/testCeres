var cols, rows;
var stack = [];
var current;
var w = 40;
var last;

function sizeCase(x){
  return Math.floor(x/w);
}

function generate_table() {
  // get the reference for the body
  var maze = document.getElementById("Maze");
  maze.innerHTML = " ";
  var width = document.getElementById("width").value;
  var height = document.getElementById("height").value;
  console.log(width);
  cols = sizeCase(width);
  rows = sizeCase(height);


  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  //tbl.style.backgroundColor="aqua";
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < rows; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < cols; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      cell.setAttribute("id",'cell_'+i+'_'+j);

      cell.setAttribute("data-line",i);
      cell.setAttribute('data-column',j);

      var cellText = document.createTextNode("\t");
      cell.style.height= "50px";
      cell.style.width= "50px";

      cell.appendChild(cellText);
      row.appendChild(cell);

    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  maze.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  Parcours();
  current = document.getElementById('cell_'+0+'_'+0);
  var text = document.createTextNode("ENTREE");

  current.appendChild(text);
  current.classList.add("visited");
  current.classList.add("current");
  current.style.borderLeft = "none";


  last = document.getElementById('cell_'+(cols-1)+'_'+(rows-1));
  var text2 = document.createTextNode("SORTIE");
  last.appendChild(text2);
  last.style.borderRight = "none";
}




function Parcours(){
  setTimeout(function (){
      var i = parseInt(current.dataset.line);
      var j = parseInt(current.dataset.column);
      current.classList.remove("current");
      let top= document.getElementById('cell_'+(i-1)+'_'+j);
      let right = document.getElementById('cell_'+i+'_'+(j+1));
      let bottom= document.getElementById('cell_'+(i+1)+'_'+j);
      let left = document.getElementById('cell_'+i+'_'+(j-1));
      let neighbourd = gettingNeighbourd(i,j);

      if(neighbourd.length > 0) {
        let num = Math.floor(Math.random() * Math.floor(neighbourd.length));
        stack.push(current);
        deleteWall(current, top,right,bottom,left,neighbourd, num);
        current = neighbourd[num];
        current.classList.add("visited");
        current.classList.add("current");
      }else if( stack.length != 0){
        current = stack.pop();
        current.classList.add("current");
      }
      if(document.getElementsByClassName("visited").length != document.getElementsByTagName("td").length){
        Parcours();
      }else{
        current.classList.remove("current");
      }

    }, 250);
}

function gettingNeighbourd(i, j){
  var neighbourd = [];

  let top= document.getElementById('cell_'+(i-1)+'_'+j);
  let right = document.getElementById('cell_'+i+'_'+(j+1));
  let bottom= document.getElementById('cell_'+(i+1)+'_'+j);
  let left = document.getElementById('cell_'+i+'_'+(j-1));


  if(top && top.classList){
    if(!top.classList.contains('visited')){
      neighbourd.push(top);
    }
  }
  if(right && right.classList) {
    if (!right.classList.contains('visited')) {
      neighbourd.push(right);
    }
  }
  if(bottom && bottom.classList){
    if(!bottom.classList.contains('visited')){
      neighbourd.push(bottom);
    }
  }
  if(left && left.classList) {
    if (!left.classList.contains('visited')) {
      neighbourd.push(left);
    }
  }
  return neighbourd;

}

function deleteWall(current, top, right, bottom, left, neighbourd, num){
  if (neighbourd[num] == top) {
    current.style.borderTop = "none";
    top.style.borderBottom = "none";
  }
  if (neighbourd[num] == right) {
    current.style.borderRight = "none";
    right.style.borderLeft = "none";
  }
  if (neighbourd[num] == bottom) {
    current.style.borderBottom = "none";
    bottom.style.borderTop = "none";
  }
  if (neighbourd[num] == left) {
    current.style.borderLeft = "none";
    left.style.borderRight = "none";
  }

}


