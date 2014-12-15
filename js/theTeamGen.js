var robotics = {};
robotics.pictures = document.getElementById("pictures");
robotics.onLoadPeople = function(){
  var people = document.getElementById("people").contentWindow.document.body.childNodes[0].innerHTML;
  var persons = people.split("\n");
  var row;
  for(var i = 0; i< persons.length; i++){
    var person = persons[i];
      if(person !="" && person.indexOf("//")<0){
      //Name,Bio
      var personInfo = person.split(",");
      if(i%4===0){
        row = robotics.pictures.appendChild(document.createElement("div"));
        row.className="person-row";
      }
      var bio = personInfo[1].replace(new RegExp("(comma)", 'g'), ",")
      var leader = personInfo[2].indexOf("leader")!=-1;
      row.appendChild(robotics.createPictureFrame(personInfo[0],bio,leader));
    }
  }
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
}
