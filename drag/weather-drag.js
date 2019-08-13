const drop = document.querySelector('.dropzone');
const container = document.querySelector('.container');
const cities = document.querySelectorAll('.city');

let url = `http://api.openweathermap.org/data/2.5/weather?`;
const appId = '23884f9b0a72004554863499d83c8fbd';
// for(let i = 0; i < cities.length; i++){
//     cities[i].addEventListener('dragstart', dragStart);
// }

// for(let i = 0; i < cities.length; i++){
//     cities[i].addEventListener('dragend', dragEnd);
// }

// function dragStart(){
//     console.log('dragging');
//     //this.className += 'hold';
//     // setTimeout(()=> this.className = 'invisible', 1000);
// }

let dragged;
let wasDragged = false;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  if(wasDragged === false){
      // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = `#6CA7CC`;
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone" && wasDragged === false) {
    event.target.style.background = "";
    event.target.innerHTML = '';
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
    wasDragged = true;
    sendToWeather(dragged.innerHTML);
  }
}, false);


  function sendToWeather(city) {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=23884f9b0a72004554863499d83c8fbd';
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
      let obj = JSON.parse(this.responseText);
      container.innerHTML += `The temperture in ${obj.name} is: ${obj.main.temp} C`;
    });
    oReq.open("GET", url);
    oReq.send();
  }
