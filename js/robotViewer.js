var robotics = {};
robotics.currentModle = "2014";
// robotics.modleChange = true;
robotics.OBJLoader = new THREE.OBJLoader();
robotics.onMouseOver = function(event){robotics.onMouseOver(event)};
robotics.onMouseOut = function(event){robotics.onMouseOut(event)};
robotics.onMouseDown = function(event){robotics.onMouseDown(event)};
robotics.onMouseUp = function(event){robotics.onMouseUp(event)};
robotics.render = new function(){
  var scene;
  var camera;
  var modle;
  var controls;
  var render;
  var element = document.getElementById("robot-viewer");
  var selector = document.getElementById("robot-modle-sceletor");
  var update;

  var noWebGL = function(){
    element.innerHTML="<div class=\"vertical-center\"> This action requires WebGL. Get WebGL "
    + "<a href=\"http://get.webgl.org/\">here</a>.</div>";
  }

  renderer = Detector.webgl?
    new THREE.WebGLRenderer({antialias:true}):
    noWebGL();

  if(!Detector.webgl){
    return;
  }

  renderer.clearColor(0x030303);
  renderer.setSize(element.offsetWidth-4,element.offsetHeight-4);

  element.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  var geom = new THREE.BoxGeometry(1,1,1);
  var mat = new THREE.MeshBasicMaterial({color:0xFFAAFF});
  modle = new THREE.Mesh(geom, mat);

  scene.add(modle);

  camera = new THREE.PerspectiveCamera(45, (element.offsetWidth-4)/(element.offsetHeight-4), 0.05, 1000);
  scene.add(camera);
  camera.position.set(3,4,0);
  camera.lookAt(new THREE.Vector3(0,0,0));

  this.setModle = function(geometry, map){
    modle.geometry = geometry;
    scene.remove(modle);
    modle.material = new THREE.MeshBasicMaterial({map:map});
    scene.add(modle);
  }

  controls = new THREE.OrbitControls( camera );
  robotics.controls = controls;
  controls.enabled = false;
  element.addEventListener('mouseover', robotics.onMouseOver);
  element.addEventListener('mouseout', robotics.onMouseOut);
  element.addEventListener('mousedown', robotics.onMouseDown);
  element.addEventListener('mouseup', robotics.onMouseUp);

  update = function(){
    window.requestAnimationFrame(update);
    if(camera)
    renderer.render(scene, camera);
    if(robotics.modleChange || selector.value != robotics.currentModle){
      robotics.currentModle = selector.value;
      robotics.onModleChange();
      robotics.modleChange = false;
    }
  }
  window.requestAnimationFrame(update);

  return this;
}
robotics.onMouseOver = function(event){
  robotics.controls.enabled = true;
}
robotics.onMouseOut = function(event){
  robotics.controls.enabled = false;
}
robotics.onMouseDown = function(event){
  event.target.setCapture();
}
robotics.onMouseUp = function(event){
  document.releaseCapture();
}
robotics.onModleChange = function (){
  var newModle = robotics.currentModle;
  var loader = robotics.OBJLoader;
  loader.load('/vikings/robotmodels/' + newModle + '.obj', function (object){
    robotics.render.setModle(object.children[0].geometry,
      THREE.ImageUtils.loadTexture('/vikings/robotmodels/' + newModle + '.jpg'));
  });
}
