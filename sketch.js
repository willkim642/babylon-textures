var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');

    //creating a ground
    var b1 = createBox(0, -5, 0, 60, 1, 10);
    b1.material = hexMat('#0d0b73');

    //creating the various cubes that make up the piece
    var b2 = createBox(0, -2.5, 1, 4, 4, 4);
    b2.material = fileMat('fantasy.jpg');

    var b3 = createBox(0.5, -0.25, -0.25, 0.25, 0.25, 0.25);
    b3.material = fileMat('reality.jpg');
    b3.rotation.y += Math.PI / 4;

    var b4 = createBox(0.8, -0.25, 0.75, 0.4, 0.4, 0.4);
    b4.material = fileMat('reality.jpg');
    b4.rotation.y += Math.PI / 6;
    b4.rotation.x += Math.PI / 2;

    var b5 = createBox(1.3, -0.25, -1, 0.15, 0.15, 0.15);
    b5.material = fileMat('reality.jpg');
    b5.rotation.y += Math.PI / 17;

    var b6 = createBox(-1.2, 0.25, 0.75, 0.75, 0.75, 0.75);
    b6.material = fileMat('reality.jpg');
    b6.rotation.y += Math.PI / 5;

    var b7 = createBox(-3.6, -4, -0.83, 0.3, 0.3, 0.3);
    b7.material = fileMat('reality.jpg');
    b7.rotation.y += Math.PI / 19;

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});