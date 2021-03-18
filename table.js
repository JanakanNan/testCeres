var cols, rows;
var stack = [];
var current;
var w = 40;
var last;
let width = 0;
let height = 0;

// Prendre les paramètres de l'URL
function getParams(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  width = urlParams.get('width');
  height = urlParams.get('height');

  return urlParams.get('width');
}


//Avoir la taille des case
function sizeCase(x){
  return Math.floor(x/w);
}


// Fonction qui genère le tableau
function generate_table() {

  // Prend la référence pour le body
  var maze = document.getElementById("Maze");
  maze.innerHTML = " ";
  getParams();
  cols = sizeCase(width);
  rows = sizeCase(height);
  console.log(cols,rows);

  // Crée la balise <table> et la balise <tbody>
  var tbl = document.createElement("table");

  var tblBody = document.createElement("tbody");

  // Création de toutes les cellules
  for (var i = 0; i < rows; i++) {
    
    var row = document.createElement("tr");

    for (var j = 0; j < cols; j++) {
      // Crée la balise <td>,
      // et on les place à la fin de la table de row
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

    // Ajout de la row a la fin de la table body
    tblBody.appendChild(row);
  }

  // on met <tbody> dans la <table>
  tbl.appendChild(tblBody);
  // on met la table dans le body
  maze.appendChild(tbl);
  // On met des bordure pour le tbl
  tbl.setAttribute("border", "2");

  Parcours();

  current = document.getElementById('cell_'+0+'_'+0);
  current.classList.add("visited");
  current.classList.add("current");

  DesignEntry(current);

  last = document.getElementById('cell_'+(rows-1)+'_'+(cols-1));
  DesignExit(last);

}

//Mise en place du label entrée
function DesignEntry(current){
  var textEntry = document.createTextNode("ENTREE");
  current.appendChild(textEntry);
  current.style.borderLeft = "none";

}

//Mise en place du label sortie
function DesignExit(last){
  var textExit = document.createTextNode("SORTIE");
  last.appendChild(textExit);
  last.style.borderRight = "none";
}



// C'est une fonction qui va faire le parcours
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

//C'est une fonction qui va regardé tous les voisins de la case
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


//C'est la fonction qui efface les murs
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

module.exports = sizeCase;
module.exports = getParams;



