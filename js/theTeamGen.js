var robotics = {};
robotics.pictures = document.getElementById("pictures");
robotics.text = "";
robotics.onLoadPeople = function(){
  while(robotics.pictures.children.length != 0){
    robotics.pictures.removeChild(robotics.pictures.children[0]);
  }
  robotics.createFrames(robotics.getSize(), robotics.text);
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
      //First,Last,Bio,Leader,Grade,GradeIndex
      var personInfo = person.split(",");
      if(i%num===0){
        row = robotics.pictures.appendChild(document.createElement("div"));
        row.className="person-row";
      }
      var bio = personInfo[2].replace(new RegExp("(comma)", 'g'), ",")
      var leader = personInfo[3].indexOf("leader")!=-1;
      var pixleAccountation = 5/robotics.getWidth();
      row.appendChild(robotics.createPictureFrame(personInfo[0] + " " + personInfo[1],bio,leader,personInfo[4])).style.width = (100-(num*2.8*2)-(pixleAccountation*num))/num + "%";
    }
  }
};
robotics.getWidth = function(){
  var maxSize = document.getElementsByClassName("post-content")[0].offsetWidth;
  return maxSize;
};
robotics.getSize = function(){
  return Math.floor(((window.innerWidth < robotics.getWidth()) ? window.innerWidth : robotics.getWidth())/330);
};
robotics.createPictureFrame = function(Name, Bio, leader, grade){
  var frame = document.createElement("div");
  frame.className="picture-frame";
  var titleRow = frame.appendChild(document.createElement('div'));
  var title = titleRow.appendChild(document.createElement("div"));
  if(leader)
    title.className="picture-title-leader";
  else
    title.className="picture-title";
  title.id=Name.toLowerCase().replace(new RegExp(" ", 'g'),"");
  var titleText = title.appendChild(document.createElement("div"));
  titleText.className="picture-title-text";
  titleText.innerHTML=Name;
  var gradeHolder = titleRow.appendChild(document.createElement('div'));
  gradeHolder.className="picture-grade";
  var gradeText = gradeHolder.appendChild(document.createElement('div'));
  gradeText.innerHTML = grade.replace("th", "");
  var gradeTh = gradeText.appendChild(document.createElement('sup'));
  gradeTh.className="picture-grade-th";
  gradeTh.innerHTML = "th";
  var picture = frame.appendChild(document.createElement("div"));
  picture.className="persons-picture";
  var image = picture.appendChild(document.createElement("img"));
  image.src="/vikings/people/" + Name.toLowerCase().replace(new RegExp(" ", 'g'),"");
  var text = frame.appendChild(document.createElement("div"));
  text.className = "frame-bio";
  text.innerHTML = Bio;
  return frame;
};
window.addEventListener("load", function(event){
  var request = new XMLHttpRequest();
  request.onload = function(e){
    robotics.text = this.responseText;
    robotics.onLoadPeople();
  };
  request.open("get", "/vikings/team/people.txt", true);
  request.send();
})
