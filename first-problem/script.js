//create grid
function createGrid(){
    const firstCol = document.getElementById("first-col")
    const secondCol = document.getElementById("second-col")
    const thirdCol = document.getElementById("third-col")
    //creazione colonne principali
    let gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item");
    createItem(4, firstCol)
    createItem(3, secondCol)
    createItem(24, thirdCol)
}

//create single item
function createItem(val, grid){
    for(let i = 0; i <= val; i++){
        let item = document.createElement("div");
        item.setAttribute("class", "grid");
        item.style.backgroundColor = "#" + randomColor();
        item.addEventListener('click', newGrid);
        grid.append(item)
    }
}

//function to find random color
function randomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

//function to create a new grid
function newGrid(){
    this.classList.add("new-grid");
    createItem(3, this)
    console.log(this)
    this.removeEventListener;
}

createGrid()
