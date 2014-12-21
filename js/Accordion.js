var robotics = {};
robotics.donationObjects = [];
robotics.donationObjects.push(document.getElementById("donation-one"));
robotics.donationObjects.push(document.getElementById("donation-two"));
robotics.donationObjects.push(document.getElementById("donation-three"));
robotics.donationObjects.push(document.getElementById("donation-four"));
robotics.donationObjects.push(document.getElementById("donation-five"));
robotics.donationObjects.push(document.getElementById("donation-six"));
robotics.donationObjects.push(document.getElementById("donation-seven"));
for(var i = 0; i<7; i++){
  var donationObject = robotics.donationObjects[i];
  donationObject.addEventListener('mouseover', function(event){
    var element = robotics.findObject(event.target, "donation-amount");
    element.style.width = "38.2%";
    var index = robotics.donationObjects.indexOf(element);
    var otherElements = robotics.donationObjects.slice(0);
    otherElements.splice(index,1);
    for(var k = 0; k<otherElements.length; k++){
      otherElements[k].style.width="9.9%";
    }
  });
  donationObject.addEventListener('mouseout', function(event){
    for(var k = 0; k<7; k++){
      robotics.donationObjects[k].style.width="14%";
    }
  });
}
robotics.findObject = function(currentElement, className){
  if(currentElement.className != className){
    return robotics.findObject(currentElement.parentElement, className);
  }
  return currentElement;
}
