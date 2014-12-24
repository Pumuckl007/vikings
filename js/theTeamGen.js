var robotics = {};
robotics.pictures = document.getElementById("pictures");
robotics.onLoadPeople = function(text){
  while(robotics.pictures.children.length != 0){
    robotics.pictures.removeChild(robotics.pictures.children[0]);
  }
  robotics.createFrames(robotics.getWidth(), text);
};
window.onresize = robotics.onLoadPeople;
robotics.createFrames = function(num, people){
  if(num < 1){
    num = 1;
  }
  var persons = people.split("\n");
  var row;
  for(var i = 0; i< persons.length; i++){
    var person = persons[i];
    if(person !="" && person.indexOf("//")<0){
      //Name,Bio,Leader
      var personInfo = person.split(",");
      if(i%num===0){
        row = robotics.pictures.appendChild(document.createElement("div"));
        row.className="person-row";
      }
      var bio = personInfo[1].replace(new RegExp("(comma)", 'g'), ",")
      var leader = personInfo[2].indexOf("leader")!=-1;
      var pixleAccountation = 5/robotics.getWidth();
      row.appendChild(robotics.createPictureFrame(personInfo[0],bio,leader)).style.width = (100-(num*2.8*2)-(pixleAccountation*num))/num + "%";
    }
  }
};
robotics.getWidth = function(){
  var maxSize = document.getElementsByClassName("post-content")[0].offsetWidth;
  return Math.floor(((window.innerWidth < maxSize) ? window.innerWidth : maxSize)/250);
}
robotics.createPictureFrame = function(Name, Bio, leader){
  var frame = document.createElement("div");
  frame.className="picture-frame";
  var title = frame.appendChild(document.createElement("div"));
  if(leader)
    title.className="picture-title-leader";
  else
    title.className="picture-title";
  title.id=Name.toLowerCase().replace(new RegExp(" ", 'g'),"");
  var titleText = title.appendChild(document.createElement("div"));
  titleText.className="picture-title-text";
  titleText.innerHTML=Name;
  var picture = frame.appendChild(document.createElement("div"));
  picture.className="persons-picture";
  var image = picture.appendChild(document.createElement("img"));
  image.src="/vikings/people/" + Name.toLowerCase().replace(new RegExp(" ", 'g'),"");
  var text = frame.appendChild(document.createElement("div"));
  text.className = "frame-bio";
  text.innerHTML=Bio;
  return frame;
};
window.addEventListener("load", function(event){
  var request = new XMLHttpRequest();
  request.onload = function(e){
    console.log(this.responseText);
    robotics.onLoadPeople(this.responseText);
  };
  request.open("get", "/vikings/team/people.txt", true);
  request.send();
})
