var domify = require('domify'),
    colour = require('rgb'),
    crc = require('crc'),
    lambda = require('functional.js');


function conceptColor(uri) {
    return colour('hsl(' + new crc.CRC8().update(uri).checksum() + ',80,80)');
}


function shinybutton(element, triples) {
    var sb = domify('<button>vis</button>');

    sb = element.parentElement.insertBefore(sb, element);
    sb.addEventListener('click', function() {

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

        function nodeUI(node) {
            var connected = 4;
            if(node.links)
                connected = node.links.length

            var nodeGeometry = new graphics.THREE.SphereGeometry(connected);
            var nodeMaterial = new graphics.THREE.MeshBasicMaterial({
                color: conceptColor(node.id || "magic",node.data || "socks"),
                overdraw: true
                
            });
            return new graphics.THREE.Mesh(nodeGeometry, nodeMaterial);
        }


        function linkUI(link) {
            var linkGeometry = new graphics.THREE.Geometry();
            linkGeometry.vertices.push(new graphics.THREE.Vector3(0, 0, 0));
            linkGeometry.vertices.push(new graphics.THREE.Vector3(0, 0, 0));
            
            var colour = 0x33333;
            console.log(link);
            if(link.id.search("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))
                colour = 0x771111;

            if(link.id.search("http://nice.org.uk"))
                colour = 0x111177;

            if(link.id.search("freebase"))
                colour = 0x117711;

            var linkMaterial = new graphics.THREE.LineBasicMaterial({
                color: colour,
                lineWidth: 10
            });

            return new graphics.THREE.Line(linkGeometry, linkMaterial);
        }

        function getMaxDegree(graph) {
            var foundNode, max = -1;
            graph.forEachNode(function(node) {
                if (node.links.length > max) {
                    max = node.links.length;
                    foundNode = node;
                }
            });

            return foundNode;
        }

        function addLights(scene) {
            var light = new graphics.THREE.DirectionalLight(0xffffff);
            scene.add(light);

            return light;
        }

        function setupScene(scene, camera, lights) {
            var timer = Date.now() * 0.0002;
            camera.position.x = Math.cos(timer) * 400;
            camera.position.z = Math.sin(timer) * 400;
            lights.position.x = Math.cos(timer);
            lights.position.z = Math.sin(timer);
            camera.lookAt(scene.position);
        }

        var scene = graphics.scene;
        var lights = addLights(scene);
        var camera = graphics.camera;

        var controls = graphics.controls;
        controls.rotateSpeed = 3;
        controls.zoomSpeed = 4;
        controls.panSpeed = 3;

        setupScene(scene, camera, lights);


        graphics.createNodeUI(nodeUI).createLinkUI(linkUI);


        graphics.run(); // begin animation loop:
        graphics.layout.pinNode(getMaxDegree(graph));

        document.getElementById("output").style.display = "none";
        document.getElementById("visualise").style.display = "block";
    });


}




module.exports = shinybutton;
