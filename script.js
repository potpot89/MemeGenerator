let imageSelector = document.querySelector("#image-selection");
let textSelector = document.querySelector("#text-selection");

let canvas = document.querySelector(`canvas`);
//initialize the canvas variable
let ctx = canvas.getContext(`2d`);

let topLine = document.querySelector(`#top-line`);
let bottomLine = document.querySelector(`#bottom-line`);

let downloadButton = document.querySelector(`#download`);

//create 3 variables that are the ones that will go in the canvas
let topText = "";
let bottomText = "";
let canvasImage = "";

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
  /*move this to this to the redrawCanvas function
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height); */
  canvasImage = image;
  redrawCanvas(canvasImage, topText, bottomText);
  enableButton(btnForward);
}

//to draw text in canvas, we must use its text methods and define the parameter to draw and the coordinates

function updateText(text, id) {
  //We are using 2 parameters so that we can differentiate the functions for the 2 different eventListeners, to decide where to write which line of text

  if (id === "top-line") {
    //comment out the functions we'll move to the redrawCanvas function

    //ctx.fillText(text, 20, 50);
    //ctx.strokeText(text, 20, 50);
    topText = text;
  } else if ((id = "bottom-line")) {
    //ctx.fillText(text, 20, canvas.height - 30);
    //ctx.strokeText(text, 20, canvas.height - 30);
    bottomText = text;
  }
  //call the new function here
  redrawCanvas(canvasImage, topText, bottomText);
}

//function that does all 3 above steps in 1 and avoids the text is written on top of the previous one but triggers a new function each time, when confirming with the button
function redrawCanvas(image, topText, bottomText) {
  //draw picture
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //write top text
  printTextToCanvas(topText, canvas.width / 2, 50);
  //write bottom text
  printTextToCanvas(bottomText, canvas.width / 2, canvas.height - 30);
}

function printTextToCanvas(text, x, y) {
  ctx.textAlign = "center";
  ctx.font = `50px Arial`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

//write the function to download the meme
//convert the canvas in a jpeg format for download
function downloadCanvas() {
  let dataURL = canvas.toDataURL(`image/jpeg`);
  //after converting the canvas to jpg we need to pass its reference in the href of the button to download it
  downloadButton.href = dataURL;
}

// !!UPLOAD IMAGE
let fileInput = document.querySelector("#file-upload");
fileInput.addEventListener(`change`, handleFileSelection);
function handleFileSelection(e) {
  console.log(e);
  let file = e.target.files[0];
  //create an object to construct and use objects
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener(`load`, function () {
    let image = document.createElement(`img`);
    image.src = reader.result;

    //add function that waits for the img to be fully loaded before proceeding. this because `load` is asynchron so we need to wait between one function and another
    image.addEventListener(`load`, function () {
      canvasImage = image;
      enableButton(btnForward);
      redrawCanvas(canvasImage, topText, bottomText);
    });
  });
}

//now we want to hide step 2 (#text-selector) and when we click next, we want to show it and hide step 1 (#image-selector) instead
//we start by hiding step 2 in css with display: none
let btnForward = document.querySelector(`#forward`);
let btnBack = document.querySelector(`#back`);
btnForward.addEventListener(`click`, goForward);
btnBack.addEventListener(`click`, goBack);
function goForward() {
  imageSelector.style.display = `none`;
  textSelector.style.display = `block`;
}
function goBack() {
  textSelector.style.display = `none`;
  imageSelector.style.display = `block`;
}

//ENABLE BUTTON TO GO FORWARD - we will trigger this function inside the selectImage function so that when clicking on a picture, it will enable the button to move to the next step
function enableButton(button) {
  button.removeAttribute(`disabled`);
}
