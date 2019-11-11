var openProjectId;

window.addEventListener("load", () => {
    initProjectControls();
    initProcGenControls();
});

function initProjectControls() {
    const displays = document.querySelectorAll(".display-wrapper");

    displays.forEach((display) => {
        display.addEventListener("click", (event) => {
            const id = event.target.parentElement.parentElement.id;
            if (openProjectId !== undefined) {
                document.querySelector(`#${openProjectId}-show`).classList.add("hide");            
            }
            document.querySelector(`#${id}-show`).classList.remove("hide");
            openProjectId = id;

            document.querySelector("#right-side").classList.remove("hide");

            if (window.innerWidth < 768) {
                document.querySelector("#overlay-dim").classList.remove("hide");
            }
        });
    });

    document.querySelector("#overlay-dim").addEventListener("click", (event) => {
        event.target.classList.add("hide");
        document.querySelector(`#${openProjectId}-show`).classList.add("hide");
        document.querySelector("#right-side").classList.add("hide");
    });
}

function initProcGenControls() {
    document.querySelector("#roomTriesVar").innerHTML = ROOM_TRIES;
    document.querySelector("#squareSizeVar").innerHTML = SQUARE_SIZE;
    
    draw();
    
    document.querySelector("#createDungeonButton").addEventListener("click", () => { 
        clearCanvas(); 
        draw(); 
    }, false);
    
    document.querySelector("#roomTriesSlider").addEventListener("input", () => {
        ROOM_TRIES = document.querySelector("#roomTriesSlider").value;

        document.querySelector("#roomTriesVar").innerHTML = (ROOM_TRIES < 10)
            ? "0" + ROOM_TRIES
            : ROOM_TRIES;
    }, false);

    document.querySelector("#squareSizeSlider").addEventListener("input", () => {
        SQUARE_SIZE = parseInt(document.querySelector("#squareSizeSlider").value);
        MIN_ROOM_SIZE = 4 * SQUARE_SIZE;
        MAX_ROOM_ADDITION = 4 * SQUARE_SIZE;
        HEIGHT_WIDTH_DIFFERENCE = 2 * SQUARE_SIZE;
        
        document.querySelector("#squareSizeVar").innerHTML = (SQUARE_SIZE < 10)
            ? "0" + SQUARE_SIZE
            : SQUARE_SIZE;
    }, false);
}