let tictactoeGame = undefined;

function updateHTML() {
    for (let y = 0; y < tictactoeGame.field.length; y++) {
        for (let x = 0; x < tictactoeGame.field[y].length; x++) {
            const cell = tictactoeGame.field[y][x];
            $(`#${cell.htmlID}`).html(cell.icon);
        }
    }
}

function matchHTMLCells() {
    const $cells = $(".cell");
    const tictactoeCells = tictactoeGame.field.flat();
    let i = 0;
    $cells.each(function() {
        const cellID = $(this).attr("id");
        tictactoeCells[i].htmlID = cellID;
        i++;
    })
}

function markCell() {
    const cellID = $(this).attr("id");
    tictactoeGame.updateField(cellID);
    updateHTML();
}

function getGridSize(gridSize) {
    return gridSizes[gridSize] || gridSizes.EASY;
}

function addGameContainerCSS(gridSize, $gameContainer) {
    const windowHeigth = $(window).height();
    const gameNameHeigth = $("#game-name").height() + parseInt($("#game-name").css("margin"));
    const cellSize = (windowHeigth - gameNameHeigth) / gridSize;
    $gameContainer.css({
        "display": "grid",
        "grid-template-rows": `repeat(${gridSize}, ${cellSize}px)`,
        "grid-template-columns": `repeat(${gridSize}, ${cellSize}px)`,
        "place-content": "center"
    })
}

function buildHTMLGame(gridSize) {
    const $gameContainer = $("#game-container");
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const $newDiv = $(`<div class="cell" id="${y}x${x}">`);
            $newDiv.appendTo($gameContainer);
        }
    }
    addGameContainerCSS(gridSize, $gameContainer);
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const gridSizeValue = urlParams.get('gridSize');
    const gridSize = getGridSize(gridSizeValue);

    tictactoeGame = tictactoeFactory(gridSize);
    buildHTMLGame(gridSize);

    matchHTMLCells();
    $(".cell").on("click", markCell);
    updateHTML();
});