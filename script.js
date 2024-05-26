let imageSelector = document.querySelector("#image-selection");

let canvas = document.querySelector(`canvas`);
//initialize the canvas variable
let ctx = canvas.getContext(`2d`);

let topLine = document.querySelector(`#top-line`);
let bottomLine = document.querySelector(`#bottom-line`);

let downloadButton = document.querySelector(`#download`);

imageSelector.addEventListener(`click`, (e) => {
  //check what triggers when clicking
  // console.log(e.target);
  //set a condition that triggers the eventListener's function only when clicking on an element with a tag (attribute) of img
  if (e.target.tagName === `IMG`) {
    //tag must be in upperCase
    selectImage(e.target);
  }
});

//add eventListener to the input text fields and make sure it targets both the value and the id, that we need later to run the function in different ways
topLine.addEventListener(`input`, (e) => {
  updateText(e.target.value, e.target.id);
});

bottomLine.addEventListener(`input`, (e) => {
  updateText(e.target.value, e.target.id);
});

downloadButton.addEventListener(`click`, downloadCanvas);

//when we select the image we draw the meme in the canvas
//the parameters determine from where to where the image is drawn (x,y,extend-to, extend-to)

function selectImage(image) {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

//to draw text in canvas, we must use its text methods and define the parameter to draw and the coordinates

function updateText(text, id) {
  ctx.font = `50px Arial`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  //We are using 2 parameters so that we can differentiate the functions for the 2 different eventListeners, to decide where to write which line of text

  if (id === "top-line") {
    ctx.fillText(text, 20, 50);
    ctx.strokeText(text, 20, 50);
  } else if ((id = "bottom-line")) {
    ctx.fillText(text, 20, canvas.height - 30);
    ctx.strokeText(text, 20, canvas.height - 30);
  }
}

//write the function to download the meme
//convert the canvas in a jpeg format for download
function downloadCanvas() {
  let dataURL = canvas.toDataURL(`image/jpeg`);
  //after converting the canvas to jpg we need to pass its reference in the href of the button to download it
  downloadButton.href = dataURL;
}
