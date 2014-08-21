var domify = require('domify'),
    colour = require('rgb'),
    crc = require('crc'),
    lambda = require('functional.js'),
    n3 = require('n3');


function conceptColor(uri, bonus) {
    return colour('hsl(' + new crc.CRC8().update(uri).checksum() + ',100,50)');
}


function shinybutton(triples) {
    var sb = domify('<button>Concept visualisation</button>');

    sb.addEventListener('click', function() {


        document.getElementById("output").style.display = "none";
        document.getElementById("visualise").style.display = "block";

        var graph = require('ngraph.graph')();
        graph.beginUpdate();

        lambda.each(function(t) {
            graph.addNode(t.subject, t.object);
            graph.addLink(t.subject, t.object, t.predicate);
        }, triples);
        graph.endUpdate();

        var createThree = require('ngraph.three');
        var graphics = createThree(graph, {
            interactive: true,
            container: document.getElementById("visualise")
        });

        var labels = [];

        function nodeUI (node) {
            var connected = 4;

            if(node.links)
                connected = node.links.length

            var col = conceptColor(node.id || "magic", node.data || "socks");

            var container = new graphics.THREE.Object3D();

            

            if (n3.Util.isLiteral(node.id) || (node.id.search("http://nice.org.uk/")  !== -1 && node.id.search("http://nice.org.uk/annotation") === -1)){

                var labelContainer = new graphics.THREE.Object3D();

                var label = createLabel( (n3.Util.isLiteral(node.id) ? n3.Util.getLiteralValue(node.id) : node.id ), 112, col, 0, 0, 0);
                label.scale.x = 0.025;
                label.scale.y = 0.025;
                label.position.y = 15;
                label.rotation.y;

                labelContainer.add(label);
                container.add(labelContainer);

                labelContainer.up = new graphics.THREE.Vector3(0,1,0);

                labels.push(labelContainer);

            }
            
            

            var nodeGeometry = new graphics.THREE.SphereGeometry(connected, 20, 20);
            var nodeMaterial = new graphics.THREE.MeshPhongMaterial({
                color: col,
                ambient : col,
              //  overdraw: true,
                specular: new graphics.THREE.Color(0xFFFFFF),
                shininess : 5
                
            });

            var mesh = new graphics.THREE.Mesh(nodeGeometry, nodeMaterial);

            container.add(mesh);

            return container;
        }


        function linkUI (link) {

            var linkGeometry = new graphics.THREE.Geometry();
            linkGeometry.vertices.push(new graphics.THREE.Vector3(0, 0, 0));
            linkGeometry.vertices.push(new graphics.THREE.Vector3(0, 0, 0));
            
            var colour = 0x333333;

            if(link.id.search("http://www.w3.org/1999/02/22-rdf-syntax-ns#type") !== -1)
                colour = 0x771111;

            if(link.id.search("http://nice.org.uk")  !== -1)
                colour = 0x111177;

            if(link.id.search("freebase") !== -1)
                colour = 0x117711;

            var linkMaterial = new graphics.THREE.LineBasicMaterial({
                color: colour,
                linewidth: 10,
                opacity : 0.5
            });

            return new graphics.THREE.Line(linkGeometry, linkMaterial);
        }

        function getMaxDegree (graph) {
            var foundNode, max = -1;
            graph.forEachNode(function(node) {
                if (node.links.length > max) {
                    max = node.links.length;
                    foundNode = node;
                }
            });

            return foundNode;
        }

        function createLabel (text, size, col, x, y, backgroundMargin){

            if (!backgroundMargin){
                backgroundMargin = 50;
            }

            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            context.font = size + "pt Arial";
            var textWidth = context.measureText(text).width;

            canvas.width = textWidth +  backgroundMargin;
            canvas.height = size +  backgroundMargin;

            context = canvas.getContext("2d");
            context.font = size + "pt Arial";

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = col;
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            var texture = new graphics.THREE.Texture(canvas);
            texture.needsUpdate = true;

            var material = new graphics.THREE.MeshBasicMaterial({
                map : texture,
                blending : graphics.THREE.AdditiveBlending,
                transparent: true
            });

            var mesh = new graphics.THREE.Mesh(new graphics.THREE.PlaneGeometry(canvas.width, canvas.height), material);
            // mesh.overdraw = true;
            mesh.doubleSided = true;
            //mesh.position.x = 0 - (canvas.width / 2);
            //mesh.position.y = 0 - (canvas.height / 2);
            //mesh.position.z = 0;

            return mesh;

        }

        function addLights (scene) {
            var light = new graphics.THREE.DirectionalLight(0xffffff);
            scene.add(light);

            return light;
        }

        function setupScene (scene, camera, lights, renderer) {

            var width = window.innerWidth;
            var height = window.innerHeight;
            var dp = window.devicePixelRatio;

            // renderer
            renderer.setSize(width, height);
            renderer.setViewport(0,0, width * dp, height * dp);
            renderer.setClearColor( 0x333333, 1 );

            var timer = Date.now() * 0.0002;
            camera.position.x = -Math.cos(timer) * 400;
            camera.position.z = -Math.sin(timer) * 400;
            lights.position.x = -Math.cos(timer);
            lights.position.z = -Math.sin(timer);
            camera.lookAt(scene.position);
        }

        var scene = graphics.scene;
        var lights = addLights(scene);
        var camera = graphics.camera;
        var renderer = graphics.renderer;

        var controls = graphics.controls;
        controls.rotateSpeed = 3;
        controls.zoomSpeed = 4;
        controls.panSpeed = 3;

        setupScene(scene, camera, lights, renderer);


        graphics.createNodeUI(nodeUI).createLinkUI(linkUI);


        graphics.onFrame(function(){

            //debugger;
           labels.forEach(function (label){

                //label.rotation = graphics.camera.rotation;
           //
               label.lookAt(graphics.camera.position);
            })

        });

        graphics.run(); // begin animation loop:
        graphics.layout.pinNode(getMaxDegree(graph));

    });

    return sb;

}




module.exports = shinybutton;
