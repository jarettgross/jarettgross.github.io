//==================
//INITIALIZE
//==================

init();
render();

//For use without web worker
//initNoise(Math.random());
//createScene();

//For use with web worker
beginWorker();

//==================
//SCENE CREATION
//==================

//WITHOUT WEB WORKER
function createScene() {

    //Type, Size, Tessellation, MinHeight, MaxHeight
    //Types: NORMAL, TILE-NORMAL, TILE-HEIGHT, TILE-FLAT-HEIGHT
    var geometry = generatePlanet("TILE-FLAT-HEIGHT", 150, 1, 1, 1.5);

    planet = new THREE.Mesh(geometry, pickMaterial());

    scene.add(planet);
}

//WITH WEB WORKER
function beginWorker(type = "NORMAL", planetSize = 200, tessellation = 100, minHeight = 1.0, maxHeight = 1.5, 
                     seed = Math.random(), lacunarity = 1.9, persistance = 0.5, octaves = 5) {

    var worker = new Worker("generatePlanet.js");

    //Type options: NORMAL, TILE-NORMAL, TILE-HEIGHT, TILE-FLAT-HEIGHT
    worker.postMessage({
        type:         type,
        planetSize:   planetSize,
        tessellation: tessellation,
        minHeight:    minHeight,
        maxHeight:    maxHeight,
        seed:         seed,
        lacunarity:   lacunarity,
        persistance:  persistance,
        octaves:      octaves
    });

    worker.onmessage = function(e) {

        if (e.data.ready) {
            var geometry = e.data.geometry;

            //Need to make new geometry due to web worker issues with Three geometry
            var g = new THREE.Geometry();
            g.vertices = geometry.vertices;
            g.faces = geometry.faces;

            planet = new THREE.Mesh(g, pickMaterial());
            scene.add(planet);

            worker.terminate();
        } else {
            
        }
    };
}

//==================
//GRAPHICS FUNCTIONS
//==================

var camera, scene, renderer, controls, planet;

function init() {
    //SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    //CAMERA
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.z = 800;

    //LIGHTS

    light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // var light = new THREE.PointLight(0xffffff, 1);
    // light.position.set(1000, 10, 0);
    // var light2 = new THREE.PointLight(0xffffff, 1);
    // light2.position.set(-1000, 0, 0);
    // scene.add(light);
    // scene.add(light2);

    //RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    requestAnimationFrame(render);
    if (planet !== undefined) {
        // planet.rotation.x += 0.005;
        // planet.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}

//==================
//HELPER FUNCTIONS
//==================

//Initialize noise parameters - seed, lacunarity, persistance, octaves
var lacunarity, persistance, octaves;

function initNoise(seed, l = 1.9, p = 0.5, o = 5) {
    noise.seed(seed);
    lacunarity = l;
    persistance = p;
    octaves = o;
}

//Set the material of the planet mesh
function pickMaterial(type = "PHONG", shininess = 0, shading = THREE.FlatShading) {
    if (type === "PHONG") {
        var material = new THREE.MeshPhongMaterial({
            shininess:    shininess,
            side:         THREE.FrontSide,
            shading:      shading,
            vertexColors: THREE.VertexColors,
        });
    } else {
        var material = new THREE.MeshBasicMaterial({
            color:     0x000000,
            wireframe: true
        });
    }

    return material;
}