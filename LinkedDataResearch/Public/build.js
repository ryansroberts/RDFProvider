(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/********************************************************************
*
* Filename:     config.js
* Description:  contains default configs for all objects used in pathways
*   
********************************************************************/


module.exports = {
    system : {
        pathSelector: "#npw-path-layer",
        defaultURI : '',
        styles : {
            edge : {
                //strokeColor: "#c0c8d1",
                strokeColor: "rgb(85,85,85)",
                fillType: "none",
                strokeType: "line",
                strokeWidth: 1
            },
            icon : {
                //strokeColor: "#c0c8d1",
                strokeColor: "#fff",
                fillType: "none",
                strokeType: "line",
                strokeWidth: 3
            },
            label : {
                strokeColor: "#ccc",
                strokeType: "line",
                fillType: "fill",
                fillColor: "#fff",
                strokeWidth: 0.5
            },
            interactiveNormal : {
                strokeColor: "#fc9503",
                strokeType: "line",
                fillType: "gradient",
                gradientColor1: "#ffffff",
                gradientColor2: "#f8f9fb",
                strokeWidth: 3
            },
            interactiveHighlight : {
                strokeColor: "#4ea5bc",
                strokeType: "line",
                fillType: "gradient",
                gradientColor1: "#d4eaf0",
                gradientColor2: "#99c5d0",
                strokeWidth: 3
            },
            interactiveSelect : {
                strokeColor: "#07324e",
                strokeType: "line",
                fillType: "gradient",
                gradientColor1: "#176a9e",
                gradientColor2: "#0c4062",
                strokeWidth: 3
            },
            generic : {
                strokeColor: "#a9b0b6",
                strokeType: "line",
                fillType: "gradient",
                gradientColor1: "#ffffff",
                gradientColor2: "#f8f9fb",
                strokeWidth: 3
            },
            pathReferenceDecoration : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#fcb700",
                gradientColor2: "#fb7303",
                strokeWidth: 0
            },
            pathReferenceDecorationHighlight : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#4eaec8",
                gradientColor2: "#1a809b",
                strokeWidth: 0
            },
            interactiveDecoration : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#fcb700",
                gradientColor2: "#fb7303",
                strokeWidth: 0
            },
            interactiveDecorationHighlight : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#99c5d0",
                gradientColor2: "#d4eaf0",
                strokeWidth: 0
            },
            monochromeInteractive : {
                strokeColor: "#878787",
                strokeType: "line",
                fillType: "gradient",
                gradientColor1: "#ffffff",
                gradientColor2: "#F9F9F9",
                strokeWidth: 3

            },
            monochromePathReference : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#C1C1C1",
                gradientColor2: "#878787",
                strokeWidth: 0
            },
            monochromeGenericPathReference : {
                strokeColor: "none",
                strokeType: "none",
                fillType: "gradient",
                gradientColor1: "#a9b0b6",
                gradientColor2: "#a9b0b6",
                strokeWidth: 0
            }
        }
    }       
};

},{}],2:[function(require,module,exports){
var PathView = require('./visualiser/path-view.js');

$.get('diabetes.json', function (data){

  var $context = $('#map-render');

  var pathView = new PathView(data, $context, false, 1);
  pathView.render();

});
},{"./visualiser/path-view.js":7}],3:[function(require,module,exports){
/*!
 * Planet v0.0.2 - a simple cross-platform path drawing library 
 * http://charlottegore.com
 *
 * Copyright 2010, Charlotte Gore
 * Licensed under the MIT license.
 *
 *
 * Date: Tue Jul 12 14:10:01 2011 +0100
 */ 
    var supportedModes = {
        vml : (function(){
        
            var doesSupport = 'untested';

            return function(){

                if(doesSupport==='untested'){

                    var a, b, headElement = document.getElementsByTagName("head")[0], styleElement, HTMLTagRef;
            
                    a = document.createElement('div');
                    a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
                    b = a.firstChild;
            
                    document.getElementsByTagName("body")[0].appendChild(a);
            
                    b.style.behavior = "url(#default#VML)";
            
                    doesSupport = b ? typeof b.adj === "object": true;
            
                    $(a).remove();
            
                    if(doesSupport){
                            headElement = document.getElementsByTagName("head")[0];
                            styleElement = document.createElement("style");
                            styleElement.type = "text/css";
                            headElement.appendChild(styleElement);
                            styleElement.styleSheet.cssText = "v\\:rect, v\\:roundrect,v\\:textbox, v\\:line, v\\:polyline, v\\:curve, v\\:arc, v\\:oval, v\\:image, v\\:shape, v\\:group, v\\:skew, v\\:stroke, v\\:fill { behavior:url(#default#VML); display:inline-block }";
    
                            HtmlTagRef = document.getElementsByTagName('HTML')[0];
                            HtmlTagRef.setAttribute('xmlns:v','urn:schemas-microsoft-com:vml');
                    
                            document.namespaces.add("v","urn:schemas-microsoft-com:vml");
    
                    }

                }
            
                return doesSupport;

            };
        }()),
        svg : function(){
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
        },
        canvas : (function(){
            
            var doesSupport = 'untested';

            return function(){
                
                if(doesSupport==='untested'){

                    var elem = document.createElement('canvas');
                    if(elem.getContext && elem.getContext('2d')){
                        doesSupport = true;
                    }else{
                        doesSupport = false;
                    }

                }

                return doesSupport;

            };
        }())
    },
    
    planet;

    
    planet = function( selector, mode ){
        // selects VML, VML not supported: Try Canvas, then SVG, then abort
        // selects SVG, SVG not supported: Try VML, then Canvas, then abort
        // selects Canvas, Canvas not supported: Try VML, then SVG, then abort.
        
        var priority = ["canvas","svg","vml"], i, il;
        
        if(mode && supportedModes[mode]()){
            return new planet[mode].init( selector );
        }else{
            for(i = 0, il = priority.length; i < il ;i++){
            
                if(supportedModes[priority[i]]()){
                    return new planet[priority[i]].init( selector );
                }
            
            }
        }
    };
    
    planet.extend = function(){
        // Based on code in jQuery
        var target = this, i = 0, length = arguments.length, options, name, src, copy;
    
        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) !== null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
    
                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }
    
                    // Recurse if we're merging object literal values or arrays
                    if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
    
        // Return the modified object
        return target;
    };  
    
    planet.extend({
        defaultPen : {
                    strokeType : "none",
                    fillType : "none",
                    strokeWidth : 1,
                    strokeColor : "#000",
                    fillColor : "#000",
                    gradientColor1 : "#000",
                    gradientColor2 : "#FFF"
        },

        forceMode : function( mode ){
            
            if(mode==="vml" || mode==="svg" || mode==="canvas"){
                
                planet._mode = mode;

                return this;

            }

        },
    
        vml : {
            init : function( selector ){
            
                this.parent = $(selector);
                this.container = $('<div></div>'); 
                this.container.appendTo( this.parent );
                this.container.attr({
                    'width' : this.parent.width(),
                    'height' : this.parent.height()

                });
                this.mode = "vml";

                this.width = this.parent.width();
                this.height = this.parent.height();

                this.container.css('position', 'absolute');
                
                this.pen = {};
                this.pen.extend = planet.extend;
                this.pen.extend(planet.defaultPen);
                
                return this;
            }
        },
        svg : {
            init : function( selector ){
                // For SVG, we create an SVG element in the SVG namespace and append to the 
                // container, setting the size appropriately. 
                var svg, container = $(selector);
            
                this.svgNS = "http://www.w3.org/2000/svg";
                
                svg = document.createElementNS(this.svgNS, "svg");
                svg.setAttributeNS(null, "version", "1.1");
                svg.setAttributeNS(null, "style", "position:absolute;top:0;left:0");
                
                this.width = container.width();
                this.height = container.height();

                $(svg)
                    .css("width",this.width)
                    .css("height",this.height)
                    .css("position", 'absolute');
                
                this.container = $(svg);
                
                container.append(this.container);
                
                this.mode = "svg"; 
                
                this.pen = {};
                this.pen.extend = planet.extend;
                this.pen.extend(planet.defaultPen);
                return this;
            },
            createGradient : function( color1, color2 ){

                var id, gradient, child;

                if (planet.gradientUID){

                    planet.gradientUID++;

                } else {

                    planet.gradientUID = 1;

                }
                
                id = 'user-grad-' + planet.gradientUID;

                if(!this.defsContainer){
                
                    this.defsContainer = document.createElementNS(this.svgNS,'defs');
                    this.container.append(this.defsContainer);

                }

                gradient = document.createElementNS(this.svgNS, 'linearGradient');
                gradient.setAttributeNS(null, 'id', id);

                // need to calculate x1, x2, y1 and y2

                gradient.setAttributeNS(null, 'x1', '0%');
                gradient.setAttributeNS(null, 'y1', '0%');
                gradient.setAttributeNS(null, 'x2', '0%');
                gradient.setAttributeNS(null, 'y2', '100%');
                gradient.setAttributeNS(null, 'spreadMethod', 'pad');
                gradient.setAttributeNS(null, 'gradientUnits', 'objectBoundingBox');

                child = document.createElementNS(this.svgNS, 'stop');
                child.setAttributeNS(null, 'offset', '0%');
                child.setAttributeNS(null, 'stop-color', color1);
                
                $(gradient).append(child);

                child = document.createElementNS(this.svgNS, 'stop');
                child.setAttributeNS(null, 'offset', '100%');
                child.setAttributeNS(null, 'stop-color', color2);

                $(gradient).append(child);

                $(this.defsContainer).append(gradient);

                return id;

            }
        },
        canvas : {
            init : function( selector ){
                var canvas, container = $(selector);
                
                this.canvas = document.createElement("canvas");
                
                this.width = container.width();
                this.height = container.height();

                // Internet Exploder doesn't support devicePixelRatio
                // so let's set it if it's not already set.
                window.devicePixelRatio = window.devicePixelRatio || 1;

                $(this.canvas)
                    .attr('height', this.height * window.devicePixelRatio)
                    .attr('width', this.width * window.devicePixelRatio)
                    .css('height', this.height)
                    .css('width', this.width)
                    .css('position', 'absolute');

                container.append(this.canvas);
                
                this.container = this.canvas.getContext('2d');

                if(window.devicePixelRatio !== 1){

                    this.container.scale(window.devicePixelRatio, window.devicePixelRatio);

                }
                
                
                this.mode = "canvas";
                
                this.pen = {};
                this.pen.extend = planet.extend;
                this.pen.extend(planet.defaultPen);
                
                return this;
            }
        },
        getSupportedMethods : function(){
            var methods = [];
            
            if(isVMLSupported){
                methods.push("vml");
            }

            if(isSVGSupported){
                methods.push("svg");
            }
            
            
            if(isCanvasSupported){
                methods.push("canvas");
            }
            
            return methods;
        }
    });
    
    planet.vml.init.prototype = planet.vml;
    planet.svg.init.prototype = planet.svg;
    planet.canvas.init.prototype = planet.canvas;
    
    // hook extend into the various prototypes
    planet.svg.extend = planet.canvas.extend = planet.vml.extend = planet.extend;   

    var setDrawAttributes = {
        setDrawAttributes : function( obj ){

            this.pen.extend( obj );

            return this;
        }
    };
    
    planet.vml.extend(setDrawAttributes);
    planet.svg.extend(setDrawAttributes);
    planet.canvas.extend(setDrawAttributes);/* line.js */

  /* line.js */

    // usage: planetObject.line({x1 : number, y1 : number, x2 : number, y2 : number});

    var line = {
    
        line : function( obj ){
            // Basically a line is very short stroked path, making this is a shortcut to Path.
            this.path({
                points : [
                    {x : (obj.x1 + 0.5), y : (obj.y1 + 0.5)},
                    {x : (obj.x2 + 0.5), y : (obj.y2 + 0.5)}
                    
                ],
                close : false
            });
        
            return this;
        }
    
    };

    planet.vml.extend(line);
    planet.svg.extend(line);
    planet.canvas.extend(line);/*
    path.js
    
    usage: planetObj.path({startx : number, starty : number, points : [ {x : number, y : number}... ]})
*/

    
    
    
    planet.vml.extend({
    
        path : function( obj ){
        
            // This is where it starts to get fookin' hard.
            
            var path = "", width = this.width, height = this.height, i, il;
            
            var vEl = document.createElement('v:shape');
            
            $(vEl).attr('style', 'position: absolute; top: 0; left: 0; width:' + width + 'px; height: ' + height + 'px;' );
            $(vEl).attr('coordorigin', '0 0');
            $(vEl).attr('coordsize', width + ' ' + height);

            path = 'm '+Math.floor(obj.points[0].x)+','+Math.floor(obj.points[0].y)+' ';
            
            for(i = 1, il = obj.points.length; i < il ; i++){
                path += 'l '+Math.floor(obj.points[i].x)+','+Math.floor(obj.points[i].y) + ' ';
            }
            
            vEl.setAttribute('strokecolor', this.pen.strokeColor);
            vEl.setAttribute('strokeweight', this.pen.strokeWidth);

            if(this.pen.fillType !== "none" || obj.close===true){

                path += ' x e';

                if (this.pen.fillType === "fill") {

                    $(vEl).attr('fillcolor', this.pen.fillColor);

                } else if (this.pen.fillType === "gradient") {

                    $(vEl).attr('fillcolor', this.pen.gradientColor1);

                    var fill = document.createElement('v:fill');
                    $(fill).attr('type', 'gradient');
                    $(fill).attr('color2', this.pen.gradientColor2);
                    $(fill).attr('method', 'linear sigma');
                    $(fill).attr('angle', '180');

                    $(vEl).append(fill);

                }
            }else {
            
                vEl.setAttribute('filled', 'False');
                
            }
            
            
            vEl.setAttribute('path', path);
            
            this.container.append(vEl);

            
            return this;
        
        
        }
    
    });

        planet.svg.extend({
    
        path : function( obj ){
        
            var d = "M "+obj.points[0].x+" "+obj.points[0].y+" ", i, il;
            
            for(i = 1, il = obj.points.length; i < il ; i++){
                d += "L"+obj.points[i].x+" "+obj.points[i].y;
            }

            var shape = document.createElementNS(this.svgNS, "path");
            
            if(this.pen.fillType !== "none" || obj.close===true){
                d += "Z";

                if (this.pen.fillType === "fill") {

                    shape.setAttributeNS(null, "fill", this.pen.fillColor);

                } else if (this.pen.fillType === "gradient") {
                    var gradId = this.createGradient(this.pen.gradientColor1, this.pen.gradientColor2);
                    shape.setAttributeNS(null, "fill", "url(#" + gradId + ")");
                }

            }else {
            
                shape.setAttributeNS(null, "fill", "none");
                
            }
            
            
            shape.setAttributeNS(null, "stroke", this.pen.strokeColor);
            shape.setAttributeNS(null, "stroke-width", this.pen.strokeWidth + "px");    
            
            shape.setAttributeNS(null, "d", d);
            
            this.container.append(shape);   
            
            return this;
        
        }
    });
    
    planet.canvas.extend({
    
        path : function( obj ){
        
            this.container.beginPath();
        
            if(this.pen.fillType !== 'none'){
                this.container.fillStyle = this.pen.fillColor;
            }
            
            if(this.pen.strokeType !== "none"){
                this.container.lineWidth = (this.pen.strokeWidth);
                this.container.strokeStyle = this.pen.strokeColor;
                this.container.lineCap = 'round';
                
            }
        
            this.container.moveTo(obj.points[0].x  + 0.5, obj.points[0].y + 0.5);
            
            for(i = 1, il = obj.points.length; i < il ; i++){
                this.container.lineTo(obj.points[i].x + 0.5, obj.points[i].y + 0.5);
            }
            
            if(obj.close || this.pen.fillType !== 'none'){
                this.container.lineTo(obj.points[0].x + 0.5, obj.points[0].y + 0.5);
            }
            
            if(this.pen.fillType === "fill"){
                this.container.fill();
            }
            
            if(this.pen.strokeType !== "none"){
                this.container.stroke();
            }
            
            this.container.closePath();
            
            return this;
        
        }
        
    }); /* box.js */

planet.vml.extend({

    box: function (obj) {

        var path = "", px = [], py = [], p, vEl, width = this.width, height = this.height, i, il;

        vEl = document.createElement('v:shape');

        $(vEl).attr('style', 'position: absolute; top: 0; left: 0; width:' + width + 'px; height: ' + height + 'px;');
        $(vEl).attr('coordorigin', '0 0');
        $(vEl).attr('coordsize', width + ' ' + height);
        //style = 'style="position: absolute; top: 0; left: 0; width:' + width + 'px; height: ' + height + 'px;"';

        px[0] = obj.position.x;
        px[3] = px[0] + obj.size.w;

        py[0] = obj.position.y;
        py[3] = py[0] + obj.size.h;

        if (obj.cornerRadius) {

            if(typeof obj.cornerRadius==='number'){

                obj.cornerRadius = [obj.cornerRadius, obj.cornerRadius, obj.cornerRadius, obj.cornerRadius];

            }
            //px[1] = px[0] + obj.cornerRadius;
           // px[2] = px[3] - obj.cornerRadius;
            //py[1] = py[0] + obj.cornerRadius;
           // py[2] = py[3] - obj.cornerRadius;

            path += "m " + (px[0] + obj.cornerRadius[0]) + " " + py[0] + " ";
            path += "l " + (px[3] - obj.cornerRadius[1]) + " " + py[0] + " ";
            path += "qx " + px[3] + " " + (py[0] + obj.cornerRadius[1]) + " ";
            path += "l " + px[3] + " " + (py[3] - obj.cornerRadius[2])  + " ";
            path += "qy " + (px[3] - obj.cornerRadius[2]) + " " + py[3] + " ";
            path += "l " + (px[0] + obj.cornerRadius[3]) + " " + py[3] + " ";
            path += "qx " + px[0] + " " + (py[3] - obj.cornerRadius[3]) + " ";
            path += "l " + px[0] + " " + (py[0] + obj.cornerRadius[0]) + " ";
            path += "qy " + (px[0] + obj.cornerRadius[0]) + " " + py[0] + " ";

        } else {

            path += "m " + px[0] + " " + py[0] + " ";
            path += "l " + px[3] + " " + py[0] + " ";
            path += "l " + px[3] + " " + py[3] + " ";
            path += "l " + px[0] + " " + py[3] + " ";
            path += "l " + px[0] + " " + py[0] + " ";

        }



        if(this.pen.strokeType==='none'){
        
            var stroke = document.createElement('v:stroke');
                $(stroke).attr('on', 'False');

                $(vEl).append(stroke);

        }else{
            $(vEl).attr('strokeweight', this.pen.strokeWidth);
            $(vEl).attr('strokecolor', this.pen.strokeColor);


        }


        if (close === true || this.pen.fillColor !== "none") {

            path += ' x e';

            if (this.pen.fillType === "fill") {

                $(vEl).attr('fillcolor', this.pen.fillColor);

            } else if (this.pen.fillType === "gradient") {

                $(vEl).attr('fillcolor', this.pen.gradientColor1);

                var fill = document.createElement('v:fill');
                $(fill).attr('type', 'gradient');
                $(fill).attr('color2', this.pen.gradientColor2);
                $(fill).attr('method', 'linear sigma');
                $(fill).attr('angle', '180');

                $(vEl).append(fill);

            }

        } 

        $(vEl).attr('path', path);

        this.container.append(vEl);


        return this;

    }

});

    planet.svg.extend({

        box: function (obj) {

            var d = "", px = [], py = [], p;

            px[0] = obj.position.x;
            px[3] = px[0] + obj.size.w;

            py[0] = obj.position.y;
            py[3] = py[0] + obj.size.h;

            if (obj.cornerRadius) {

                if(typeof obj.cornerRadius==='number'){
            
                    obj.cornerRadius = [obj.cornerRadius, obj.cornerRadius, obj.cornerRadius, obj.cornerRadius];

                }

                d += "M " + (px[0] + obj.cornerRadius[0]) + " " + py[0] + " ";

                d += "L " + (px[3] - obj.cornerRadius[1]) + " " + py[0] + " ";
                d += "A " + obj.cornerRadius[1] + "," + obj.cornerRadius[1] + " 90 0,1 " + px[3] + "," + (py[0] + obj.cornerRadius[1]);

                d += "L " + px[3] + " " + (py[3] - obj.cornerRadius[2]);

                d += "A " + obj.cornerRadius[2] + "," + obj.cornerRadius[2] + " 90 0,1 " + (px[3] - obj.cornerRadius[2]) + "," + py[3];

                d += "L " + (px[0] + obj.cornerRadius[3]) + " " + py[3];
                d += "A " + obj.cornerRadius[3] + "," + obj.cornerRadius[3] + " 90 0,1 " + px[0] + "," + (py[3] - obj.cornerRadius[3]);

                d += "L " + px[0] + " " + (py[0] + obj.cornerRadius[0]);
                d += "A " + obj.cornerRadius[0] + "," + obj.cornerRadius[0] + " 90 0,1 " + (px[0] + obj.cornerRadius[0]) + "," + py[0];

            } else {

                d += "M " + px[0] + " " + py[0] + " ";
                d += "L " + px[3] + " " + py[0] + " ";
                d += "L " + px[3] + " " + py[3] + " ";
                d += "L " + px[0] + " " + py[3] + " ";
                d += "L " + px[0] + " " + py[0] + " ";


            }

            var shape = document.createElementNS(this.svgNS, "path");

            if (this.pen.fillType !== "none" || obj.close === true) {
                d += "Z";

                if (this.pen.fillType === "fill") {

                    shape.setAttributeNS(null, "fill", this.pen.fillColor);

                } else if (this.pen.fillType === "gradient") {
                    var gradId = this.createGradient(this.pen.gradientColor1, this.pen.gradientColor2);
                    shape.setAttributeNS(null, "fill", "url(#" + gradId + ")");
                }

            } else {

                shape.setAttributeNS(null, "fill", "none");

            }
            shape.setAttributeNS(null, "stroke", this.pen.strokeColor);
            shape.setAttributeNS(null, "stroke-width", (this.pen.strokeWidth + 1) + "px");


            shape.setAttributeNS(null, "d", d);

            this.container.append(shape);

            return this;
        }
    });
    
    planet.canvas.extend({
    
        box : function( obj ){

            var px = [], py = [], q = (Math.PI / 2);

            this.container.beginPath();

            px[0] = obj.position.x + 0.5;
            px[3] = px[0] + obj.size.w;
    
            py[0] = obj.position.y + 0.5;
            py[3] = py[0] + obj.size.h + 0.5;
    
            if (obj.cornerRadius) {

                if(typeof obj.cornerRadius==='number'){

                    obj.cornerRadius = [obj.cornerRadius, obj.cornerRadius, obj.cornerRadius, obj.cornerRadius];

                }
    
                this.container.moveTo(px[0] + obj.cornerRadius[0], py[0]);
    
                this.container.arc(px[3] - obj.cornerRadius[1], py[0] + obj.cornerRadius[1], obj.cornerRadius[1], q * 3, q * 4, 0);
                this.container.arc(px[3] - obj.cornerRadius[2], py[3] - obj.cornerRadius[2], obj.cornerRadius[2], q * 4, q * 5, 0);
                this.container.arc(px[0] + obj.cornerRadius[3], py[3] - obj.cornerRadius[3], obj.cornerRadius[3], q * 5, q * 6, 0);
                this.container.arc(px[0] + obj.cornerRadius[0], py[0] + obj.cornerRadius[0], obj.cornerRadius[0], q * 6, q * 7, 0);


            } 

            if(this.pen.fillType === "fill"){
                this.container.fillStyle = this.pen.fillColor;
                this.container.fill();
            }
            if(this.pen.fillType === "gradient"){
        
                var grad = this.container.createLinearGradient(0, obj.position.y, 0, obj.position.y + obj.size.h);
                grad.addColorStop(0, this.pen.gradientColor1);
                grad.addColorStop(1, this.pen.gradientColor2);
                
                this.container.fillStyle = grad;
                this.container.fill();
                
            }
            
            if(this.pen.strokeType !== "none"){
                this.container.lineWidth = (this.pen.strokeWidth);
                this.container.strokeStyle = this.pen.strokeColor;
                
                this.container.stroke();
            }
            
            this.container.closePath();
            
            return this;


        }
        
    });
/* outro.js */

    planet.vml.extend({
        
        clear : function(){
            
            this.container.empty();

        }

    });

    planet.svg.extend({
        
        clear : function(){
            
            this.container.empty();

        }
        
    });

    planet.canvas.extend({
        
        clear : function(){
            this.container.clearRect(0, 0, this.width, this.height);
            //var w = $(this.canvas).attr('width');
            //$(this.canvas).attr('width', 0).attr('width', w).css('background', 'none');

        }
        
    });

    module.exports = planet;




},{}],4:[function(require,module,exports){
/********************************************************************
*
* Filename:     Edge.js
* Description:  For creating and processing edges
*   
********************************************************************/

var BoundingBox = require('./vector-processing-and-bounding-box.js').BoundingBox;
var Vector2D = require('./vector-processing-and-bounding-box.js').Vector2D;


var Point = require('./point.js');
var Label = require('./label.js');

function Edge (start, finish){

    this.start = start;
    this.finish = finish;

    return this;

}

Edge.prototype = {

    draw : function( planetObj, scale ){

        if (!scale){
            scale = 1;
        }

        planetObj.path({
            points: [
                {
                    x : this.start.x * scale, 
                    y: this.start.y * scale
                }, 
                {
                    x : this.finish.x * scale, 
                    y: this.finish.y * scale
                }
            ]
        });
    }
};

function EdgeGroup (uid){

    this.children = [];
    this.length = 0;
    this.edges = []; // array of edges.
    this.mode = "none";
    this.uidCache = {};
    this.uid = uid;
    return this;

}

EdgeGroup.prototype = {

    complete : function(){


        var index = 0, parent, child, dotProduct, connectionTypes = {}, currentChild, modes = 0, x, y;
            // compare the source at, attributes for children[0] and children[1]. If they're the same, then it's the source 
            // _this's the matched point
        if ((!this.child[1]) || (this.compare(this.child[0].source, this.child[1].source)) ) {

            parent = "source";
            child = "target";


        }else{
            
            parent = "target";
            child = "source";

        }

        this.parent = this.child[0][parent];

        if (parent==="target" && (this.child[0].type==="directional" || this.child[0].label!=="" )){
                
                this.parent.meta = { 
                                        type : this.child[0].type, 
                                        label : this.child[0].label,
                                        labelGeometry : this.child[0].labelGeometry || new BoundingBox()
                                    };
                

        }

        while(index < this.child.length){

            this.children.push(this.child[index][child]);

            currentChild = this.children[this.children.length -1];

            //if (child==="target" && (this.child[index].type==="directional" || this.child[index].label!=="" )){
                
            currentChild.meta = { 
                                    type : (child==="target" ? this.child[index].type : "none"),
                                    label : this.child[index].label, // we take the label from the edge
                                    labelGeometry : this.child[index].labelGeometry || new BoundingBox()
                                };
                

            //}
            // what we're doing is figuring out what type of connection it is,
            // and also whether all the edges are of the same kind. 

            // This is 

            dotProduct = this.parent.point.compareDirection(this.child[index][child]);

            if (dotProduct===1){
                
                currentChild.mode = "heuristic";

            }else if (dotProduct===0){
                
                currentChild.mode = "intersecting";

            }else if (dotProduct===-1){

                x = Math.abs(this.parent.point.x - currentChild.point.x);
                y = Math.abs(this.parent.point.y - currentChild.point.y);

                x = (x * currentChild.point.vector.x);
                y = (y * currentChild.point.vector.y);

                if (x!==0 && (currentChild.point.x + x !== this.parent.point.x)){
                    
                    currentChild.mode = "inverse-cascade";

                }else if (y!== 0 && (currentChild.point.y + y !== this.parent.point.y)){

                    currentChild.mode = "inverse-cascade";

                }else{

                    currentChild.mode = "cascading";

                }

            }

            if (this.mode!==currentChild.mode){
                
                this.mode = currentChild.mode;
                modes++;

            }

            index++;

        }

        if (modes!==1){
            
            this.mode = "combined";
            index = 0;

            while(index < this.children.length){
                
                if (this.children[index].mode==="intersecting" && this.mode!=="ultimate-evil-edge-group-of-doom"){
                    
                    this.mode="combined-with-intersect";
                    

                }else if (this.children[index].mode==="inverse-cascade"){
                    
                    this.mode="ultimate-evil-edge-group-of-doom";
                }

                index++;

            }

        }

        // find out if we've got an edge group of uniform connection types

        delete this.child;
        
        return this;

    },
    compare : function(a, b){

        if (a.point.x===b.point.x){
            
            if (a.point.y===b.point.y){
                
                if (a.vector.x===b.vector.x){
                    
                    if (a.vector.y===b.vector.y){
                        
                        return true;

                    }

                }

            }

        }
        
        return false;           

    },

    addChild : function( source, sourceSide, target, targetSide, type, label, labelGeometry, uid){
        
        var _this = this;

        if (!this.uidCache[uid]){

            if (!this.child){
                
                this.child = [];
            }

            var getVectorAndPoint = function(node, direction){
            
                var vector = convertDirectionToVector( direction );
                var point = node.getConnectorPoint( vector );

                return {
                    
                    vector : vector,
                    point : point

                };
            };

            var s = getVectorAndPoint(source, sourceSide);
            var t = getVectorAndPoint(target, targetSide);

            this.child.push({
                    source : s,
                    target : t,
                    type : type,
                    label : label,
                    labelGeometry : labelGeometry

                });

            this.uidCache[uid] = true;
            
            this.length++;

        }

        return this;

    },

    checkForCollisions : function(AABB, candidates){
            
            var i = candidates.length, collision = false, collisions = [], result;
            while(i--){
                
                result = AABB.testForCollision(candidates[i].AABB);

                if (result){
                    
                    collisions.push(result);

                }

            }

            return collisions;

    },

    createEdges : function (){

        var _this = this;

        var createBoundingBox = function( ){
            
            /* This helper function creates a bounding box around the various points in the edge group */
            /* this bounding box helps filter down the list of nodes to do a collision detection test against */
            /* by querying the quad tree using this box */

            /* It's tucked away inside a closure */

            var minX, maxX, minY, maxY, index = 0, point = this.parent.point, vector = this.parent.point.vector; 


            minX = maxX = point.x;
            minY = maxY = point.y;

            maxX = Math.max(maxX, (point.x + (vector.x * 20)));
            maxY = Math.max(maxY, (point.y + (vector.y * 20)));
            minX = Math.min(minX, (point.x + (vector.x * 20)));
            minY = Math.min(minY, (point.y + (vector.y * 20)));

            while(index < this.length){

                point = this.children[index].point;
                vector = this.children[index].vector;
                
                // The points themselves...
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);

                maxX = Math.max(maxX, (point.x + (vector.x * 20)));
                maxY = Math.max(maxY, (point.y + (vector.y * 20)));
                minX = Math.min(minX, (point.x + (vector.x * 20)));
                minY = Math.min(minY, (point.y + (vector.y * 20)));

                index++;

            }

            return new BoundingBox( new Vector2D(minX, minY), new Vector2D(maxX - minX, maxY - minY) );

        };

        var resolveExtentPosition = function(position, vector){
            
            if (vector < 0){
                
                return 0;

            }else{
                
                return position;
            }

        };

        var resolveExtentSize = function(position, vector, size){
            
            if (vector < 0){
                
                return position;

            }else if (vector===0){
                
                return 1;

            }else{
                
                return size - position;
            }

        };

        var getNewExtentPosition = (function(){
            
            var resolvePosition = function( position, resolution, vector){
                
                    if (vector < 0){
                        
                        return position + resolution;

                    }else{
                        
                        return position;

                    }

            };

            return function( extentBox, collision, vector ){
                
                    var x, y;
                    
                    x = resolvePosition( extentBox.x, collision.x - (collision.hw * 2), (vector.x * -1) );
                    y = resolvePosition( extentBox.y, collision.y, vector.y );  

                    return new Vector2D(x, y);

            };

        }());

        var getNewExtentSize = (function(   ){
            
            var resolveSize = function( size, resolution, collisionSize, vector){
                
                    if (vector < 0){
                        
                        return size - resolution;

                    }else if (vector > 0){
                        
                        return resolution - collisionSize;

                    }else{
                        
                        return size;

                    }

            };

            return function( extentBox, collision, vector ){
                
                var x, y;

                x = resolveSize( (extentBox.hw * 2), collision.x, (collision.hw * 2), (vector.x * -1)); // we flip the horizontal vector because 
                                                                                                        // the collision result is inverted
                y = resolveSize( (extentBox.hh * 2), collision.y, (collision.hh * 2), vector.y  );

                return new Vector2D(x, y);

            };

        }());

        var extendConnectorToLimit = function ( point, candidates, aabb, scope ){
            
            var relative, extendBox, B = BoundingBox, V = Vector2D;

            var vector = point.vector;

            relative = {
                x : point.x - aabb.x,
                y : point.y - aabb.y
            };

            extentBox = new B ( new V( 
                                aabb.x + resolveExtentPosition(relative.x, vector.x),
                                aabb.y + resolveExtentPosition(relative.y, vector.y) 
                            ), 
                            new V( 
                                resolveExtentSize(relative.x, vector.x, (aabb.hw * 2)),
                                resolveExtentSize(relative.y, vector.y, (aabb.hh * 2)) 
                            )
                        );

            collisionResults = scope.checkForCollisions(extentBox, candidates);

                if (collisionResults.length > 0){
                    
                    j = 0;

                    var newPosition, newSize, candidateA = extentBox, candidateB;
                    
                    while(j < collisionResults.length){
                        
                            newPosition = getNewExtentPosition( extentBox, collisionResults[j], vector );
                            newSize = getNewExtentSize( extentBox, collisionResults[j], vector );

                            candidateB = new B( newPosition, newSize );
                            if ( ((candidateA.hh > candidateB.hh) && (candidateA.hw === candidateB.hw)) || ((candidateA.hw > candidateB.hw) && (candidateA.hh === candidateB.hh)) ){

                                candidateA = candidateB;

                            }
                            j++;
                    }
                    extentBox = candidateA;

                }

            return extentBox;

        };

        return function( spacialIndex ){
            
            // we've now got the edge groups. Go through each one, create a start and end point(s)
            var index, edgePoint, sharedPoint, sharedBox, vector, point, relative, extentBox, currentChild;

            var aabb = createBoundingBox.call(this);

            this.collisions = spacialIndex.query( aabb );

            j = this.collisions.length;

            this.potentialCollision = false;

            while(j--){
                
                if (this.collisions[j].AABB.testForCollision(aabb)){
                    
                    this.potentialCollision = true;

                }

            }

            index = 0;

            if (this.mode==="combined-with-intersect"){

                    var updatedStartPoint, cascadeVector;

                        index = 0;
                        while(index < this.length){

                            currentChild = this.children[index];
                            point = currentChild.point;
                            vector = point.vector;

                            cascadeVector = {
                                                x : this.parent.point.vector.x * -1, 
                                                y : this.parent.point.vector.y * -1
                                            };

                            if (vector.x!==cascadeVector.x && vector.y!==cascadeVector.y){
                                
                                updatedStartPoint = new Point({ 
                                                                    x : point.x + (vector.x * 20), 
                                                                        y : point.y + (vector.y * 20)},
                                                                    {
                                                                            x : this.parent.point.vector.x * -1, 
                                                                            y : this.parent.point.vector.y * -1
                                                                    });

                                this.edges.push(new Edge(point, updatedStartPoint));

                                this.processMeta(currentChild, spacialIndex);

                                currentChild.point = updatedStartPoint;
                                currentChild.vector = updatedStartPoint.vector;
                                currentChild.meta = false;

                            }

                            index++;

                        }

                    

                    this.mode="cascading";

            }

            if (this.mode==="cascading" || this.mode==="intersecting" || this.mode==="combined"){
                
                var collisionResults, smallestBox = aabb;

                // we iterate through all the chdilren
                index = 0;
                while(index < this.length){
                    
                    point = this.children[index].point;
                    vector = point.vector;

                    // we know it's a collision but we want it's relative position

                    extentBox = extendConnectorToLimit(point, this.collisions, aabb, this);

                    if (extentBox.hw===0.5 && extentBox.hh < aabb.hh){
                
                            
                            extentBox.position(aabb.x, extentBox.y)
                                     .size(aabb.hw * 2, extentBox.hh * 2);
                            
                            if (smallestBox.hh > extentBox.hh){
                                
                                smallestBox = extentBox;

                            }

                    }else if (extentBox.hh===0.5 && extentBox.hw < aabb.hw){
                        
                            extentBox.position(extentBox.x, aabb.y)
                                     .size(extentBox.hw * 2, aabb.hh * 2);

                            if (smallestBox.hw > extentBox.hw){
                                
                                smallestBox = extentBox;

                            }

                    }

                    index++;

                    

                }

                sharedBox = smallestBox;

                if (this.parent.point.vector.x!==0){
                    
                    sharedPoint = new Point({x : (smallestBox.x + (smallestBox.hw)), y : this.parent.point.y}, this.parent.point.vector);
                

                }else{
                    
                    sharedPoint = new Point({x : this.parent.point.x, y : (smallestBox.y + (smallestBox.hh))}, this.parent.point.vector);
                }


            }else if (this.mode==="heuristic"){
                
                // we're not really doing any clever collision detection here.
                    point = this.parent.point;
                    vector = point.vector;

                    extentBox = extendConnectorToLimit(point, this.collisions, aabb, this);

                    sharedPoint = new Point({
                        
                        x : extentBox.x + extentBox.hw + ((extentBox.hw) * vector.x),
                        y : extentBox.y + extentBox.hh + ((extentBox.hh) * vector.y)

                    }, this.parent.point.vector);

            } else if (this.mode!=="ultimate-evil-edge-group-of-doom"){


                this.status = "clean";
                // make a shared point in the center of this.
                sharedBox = aabb;

                sharedPoint = new Point({x : (this.parent.point.x + (aabb.hw * this.parent.vector.x)), y : (this.parent.point.y + (aabb.hh * this.parent.vector.y))}, this.parent.point.vector);

            }

            // we only create edges if there's a shared point.

            if (sharedPoint){

                this.resolveChildrenWithSharedPoint(sharedPoint, spacialIndex);

            }       
        
                    
        };

    }(),

    convertEdgeIntoBoundingBox : function( startPoint, endPoint ){
        
        var minX, maxX, minY, maxY, height, width;

        minX = maxX = startPoint.x;
        minY = maxY = startPoint.y;

        minX = Math.min(minX, endPoint.x);
        maxX = Math.max(maxX, endPoint.x);

        minY = Math.min(minY, endPoint.y);
        maxY = Math.max(maxY, endPoint.y);

        height = Math.max(4, maxY - minY);
        width = Math.max(4, maxX - minX);

        return new BoundingBox( new Vector2D(minX -2, minY -2), new Vector2D(width, height) );
        
    },

    resolveChildrenWithSharedPoint : function(sharedPoint, spacialIndex){
        
        var index, pt, vector, x, y;
            // SNAPPING for horizontal one to one edges
            if (this.length===1 && this.parent.point.compareDirection(this.children[0].point)===-1 && this.parent.point.vector.y===0){
        
                if (this.children[0].point.y < this.parent.point.y + 10 && this.children[0].point.y > this.parent.point.y - 10 ){
                    
                    sharedPoint = new Point({x : this.parent.point.x, y : (this.children[0].point.y + (this.parent.point.y - this.children[0].point.y) / 2 )}, this.parent.point.vector);

                    this.parent.point.y = sharedPoint.y;
                    this.children[0].point.y = sharedPoint.y;

                    this.snapped = true;

                }

            }

            // convert the edge into bounding box

            // push an edge from teh parent to the shared point

            if (!this.snapped){
            this.edges.push(new Edge(this.parent.point, sharedPoint));
            }

            if (this.parent.meta && this.parent.meta.type==="directional"){
                        
                this.createArrow(this.parent.point, this.parent.point.vector);

            }

            index = 0;

            while(index < this.length){

                pt = this.children[index].point;
                vector = pt.vector;

                if (vector.x!==0){

                    x = sharedPoint.x;
                    y = pt.y;

                }else{
                
                    x = pt.x;
                    y = sharedPoint.y ;
                                                    
                }

                edgePoint = new Point({x : x, y: y});

                if (this.mode==="heuristic" && this.potentialCollision){


                    var edgePointToSharedBox = this.convertEdgeIntoBoundingBox(edgePoint, sharedPoint);
                    //edgePointToSharedBox.draw(debugContext, '#f00');

                    var collisions = this.checkForCollisions(edgePointToSharedBox, this.collisions);

                    var j = 0, maxX = 0, maxY = 0;

                    while(j < collisions.length){
                        
                        maxX = ((Math.max(collisions[j].x, maxX) + 20) * this.parent.point.vector.x);
                        maxY = ((Math.max(collisions[j].y, maxY) + 20) * this.parent.point.vector.y);
                        j++;
                    }

                    var pushedOutEdgePoint = new Point({ x : edgePoint.x + maxX, y: edgePoint.y + maxY});
                    var pushedOutSharedPoint = new Point({ x : sharedPoint.x + maxX, y: sharedPoint.y + maxY});

                    this.edges.push(new Edge(sharedPoint, pushedOutSharedPoint ));
                    this.edges.push(new Edge(edgePoint, pushedOutEdgePoint ));
                    this.edges.push(new Edge(pushedOutSharedPoint, pushedOutEdgePoint ));

                }else{
                    
                    this.edges.push(new Edge(edgePoint, sharedPoint));
                }

                /*

                */


                this.edges.push(new Edge(this.children[index].point, edgePoint));

                this.processMeta(this.children[index], spacialIndex );

                index++;

            }

    },

    processMeta : function(currentChild){
        
            var B = BoundingBox, V = Vector2D, point = currentChild.point, vector = point.vector;

            if (currentChild.meta){

                if (currentChild.meta.type==="directional"){
                    
                    this.createArrow(point);

                }

                if (currentChild.meta.label!==""){
                    
                        var labelGeo = currentChild.meta.labelGeometry, label;

                        if (vector.x===1){
                            
                            label = new B ( new V(point.x + 10, point.y - (labelGeo.height + 5)), new V(labelGeo.innerWidth, labelGeo.innerHeight) );

                        }else if (vector.x===-1){

                            label = new B ( new V(point.x - (labelGeo.width + 10), edgePoint.y - (labelGeo.height + 5)), new V(labelGeo.innerWidth, labelGeo.innerHeight) );

                        }else if (vector.y===1){
                            
                            label = new B ( new V(point.x + 5, point.y + 5), new V(labelGeo.innerWidth, labelGeo.innerHeight) );

                        }else if (vector.y===-1){
                            
                            label = new B ( new V(point.x + 5, point.y - (labelGeo.height + 5)), new V(labelGeo.innerWidth, labelGeo.innerHeight) );
                        }

                        if (!this.labels){
                            
                            this.labels = [];

                        }
                        this.labels.push(new Label(currentChild.meta.label, label));

                }


            }

    }, 

    createArrow : function(point){

        var arrowSize = 5, arrowPoints = [], vector = point.vector,

        nw = new Point({ x: point.x - arrowSize, y: point.y - arrowSize }),
        ne = new Point({ x: point.x + arrowSize, y: point.y - arrowSize }),
        se = new Point({ x: point.x + arrowSize, y: point.y + arrowSize }),
        sw = new Point({ x: point.x - arrowSize, y: point.y + arrowSize });

        arrowPoints[1] = point;

        if (vector.x===0 && vector.y===-1) {

            arrowPoints[0] = nw;
            //points[1].y-= 3;
            arrowPoints[2] = ne;

        } else if (vector.x===0 && vector.y===1) {
            arrowPoints[0] = sw;
            //points[1].y+= 3;
            arrowPoints[2] = se;
        } else if (vector.x===-1 && vector.y===0) {
            arrowPoints[0] = nw;
            //points[1].x-= 3;
            arrowPoints[2] = sw;
        } else {
            arrowPoints[0] = ne;
            //points[1].x+= 3;
            arrowPoints[2] = se;
        }

        this.edges.push(new Edge(arrowPoints[0], arrowPoints[1]));
        this.edges.push(new Edge(arrowPoints[1], arrowPoints[2]));

    }

};

module.exports.createEdgeGroups = function edgeGroupCreator (edges, nodes){

    var i, j, initialLength = edges.length;
    var inGroup = [];
    var collections;
    var edgegroups = [];

    i = initialLength;

    while (i--) {

        if (!edgegroups[i]){
            edgegroups[i] = new EdgeGroup(i);
        }

        j = initialLength;

        while(j--){
            if (edges[j]){
                if ((edges[j].source===edges[i].source && edges[j].sourceSide===edges[i].sourceSide) || (edges[j].target===edges[i].target  && edges[j].targetSide===edges[i].targetSide)){
                    
                    if (!inGroup[j]){

                        edgegroups[i].addChild( nodes[edges[j].source], edges[j].sourceSide, nodes[edges[j].target], edges[j].targetSide, edges[j].type, edges[j].label, edges[j].labelGeometry || {}, edges[j].uid );

                        inGroup[j] = true;
                    }
                }
            }
        }

        if (!edgegroups[i].length || edgegroups[i].length===0){
            delete edgegroups[i];
        }else{
            edgegroups[i].complete();
        }
    }
    return edgegroups;
};

module.exports.processEdgeGroups = function edgeGroupProcessor(edgeGroups, spatialIndex){

    var index = 0;
    // pass 1: cascading, intersecting, heuristic
    while(index < edgeGroups.length){
        if (edgeGroups[index]){
            edgeGroups[index].createEdges( spatialIndex );
        }
        index++;
    }

    return edgeGroups;
};

function convertDirectionToVector (str){

    if ( str==="bottom" ){
        
        return new Vector2D(0, 1);

    } else if ( str==="top" ){
        
        return new Vector2D(0, -1);

    } else if ( str==="left"){
        
        return new Vector2D(-1, 0);

    } else if ( str==="right"){
        
        return new Vector2D(1,0);

    } else {
        
        return new Vector2D(0, 1);

    }

}

},{"./label.js":5,"./point.js":8,"./vector-processing-and-bounding-box.js":10}],5:[function(require,module,exports){
/********************************************************************
*
* Filename:     Label.js
* Description:  For drawing Labels.
*   
********************************************************************/

function Label(text, aabb) {

    try {
        this.aabb = aabb;
        this.text = text;
        return this;

    }catch(e){

        return {
            // null handler
            draw : function(){}

        };

    }
    return this;
}

Label.prototype = {

    draw : function( htmlLayer, scale ){
        
        // draw the label

        var label = $('<div></div>');
        label.addClass('label')
            .css({
                "left" : this.aabb.x * scale,
                "top" : this.aabb.y * scale,
                "position" : "absolute",
                "text-align" : "center",
                "font-size" : 0.8 * scale + "em"
            })
            .text(this.text);

        htmlLayer.append(label);

        return this;
    }
};

module.exports = Label;


},{}],6:[function(require,module,exports){
/********************************************************************
*
* Filename:     Nodes.js
* Description:  For creating and processing nodes
*   
********************************************************************/

    var planet = require('../lib/planet.js');
    
    var appConfig = require('../core/config.js');
    //var broker = require('../framework/pubsub.js');

    var Vector2D = require('./vector-processing-and-bounding-box.js').Vector2D;
    var BoundingBox = require('./vector-processing-and-bounding-box.js').BoundingBox;
    var Point = require('./point.js');

    function PathNode (config, testLayer, isPrint){

        var _this = this,
            content,
            anchor,
            testWidth;

        if (config.shortContent !== '') {

            content = config.shortContent;

        } else {

            content = config.title;

        }


        this.anchor = $('<a></a>');
        this.anchor
            .addClass('node')
            .addClass(config.type)
            .addClass((isPrint ? 'print test' : 'web'))
            .html('<div>' + config.shortContent + '</div>');

        if (config.fullContent !== '') {

            this.anchor
                .attr('href', '#content=view-node%3A' + config.id)
                .attr('title', 'View full content for \'' + $.trim(config.title) + '\'');

            config.type = 'interactive';

            if ($(config.fullContent).find('a[rel="/rels/view-fragment/quality-statement"]').length){

                this.anchor.find('div.shortcontent').prepend($('<span class="icon-stack"><span class="icon-stack-base icon-nice-circle"></span><span class="icon-nice-standards"></span></span>'));

            }

        } else if (config.links && config.links[0]) {

            this.anchor.attr('href', config.links[0]);

            if (config.type === 'offmapreference') {

                this.anchor.attr('title', 'View the \'' + $.trim(config.title) + '\' path');

            } else {

                this.anchor.attr('title', 'View the \'' + $.trim(config.title) + '\' node');

            }

        }

        if ((config.type === "offmapreference" || config.type === "nodereference")) {
            this.anchor.append('<div class="path-reference"></div>');
        }

        this.htmlFragment = this.anchor;

        this.htmlFragment.css({ width: config.geometry.width, height: config.geometry.height });

        this.AABB = new BoundingBox(
                new Vector2D(config.geometry.left, config.geometry.top),
                new Vector2D(config.geometry.width, config.geometry.height));

        if (config.type === 'offmapreference' || config.type === 'nodereference' || config.fullContent !== '') {

            config.isInteractive = true;
            this.anchor.addClass('interactive');

        } else {
            config.isInteractive = false;
            this.anchor.addClass('static');

        }


        $.extend(this, config);

        return this;

    }

    PathNode.prototype = {

        draw: function(context, textLayer, scale) {

            if (!scale) {

                scale = 1;

            }

            var styles = appConfig.system.styles, width = (this.AABB.size().x * scale), height = (this.AABB.size().y * scale), _this = this;

            this.htmlFragment
                .css({
                    left: this.AABB.x * scale,
                    top: this.AABB.y * scale,
                    width: width,
                    height: height,
                    position: 'absolute',
                    //'font-size': scale + "em"
                })
                .appendTo(textLayer)
                //.append('<div class="node-order node-order-number web">' + this.nodeOrder + '</div>');
            /*
            if (this.anchor.attr('href')) {
                var slug = this.anchor.attr('href').replace(/-/g, ' ').replace(/\/pathways\//g, ' ');
                slug = slug.replace(/\#content=view node%3Anodes/g, '');
                this.htmlFragment.append('<div class="slug-refs web" id="slugRefsWeb' + this.nodeOrder + '">' + this.nodeOrder + ' - <a href=' + this.anchor.attr('href') + '>' + slug + '</a></div>');
            } else {
                this.htmlFragment.append('<div class="slug-refs web" id="slugRefsWeb' + this.nodeOrder + '">' + this.nodeOrder + ' - N/A</div>');
            }
    */


            this.htmlFragment.bind('click', function () {

                broker.publish("node-clicked", this);

            });

            return;
        },
        // responds to external events
        drawAsSelected: function (context, scale) {

            this.htmlFragment.addClass('selected');


        },
        // responds to external events
        drawAsHighlighted: function (context, scale) {


        },

        drawForPrint: function (context, textLayer, scale) {

            if (!scale) {

                scale = 4;

            }

            var styles = appConfig.system.styles,
                width = (this.AABB.size().x * scale),
                height = (this.AABB.size().y * scale),
                nodeOrder,
                _this = this,
                c,
                p,
                w, h;

            this.htmlFragment
                .css({

                    left: this.AABB.x * scale,
                    top: this.AABB.y * scale,
                    width: (this.type === 'interactive' ? width - 20 : width),
                    height: height,
                    position: 'absolute',
                    'font-size': "2.85em"

                })
                .addClass('print')
                .appendTo(textLayer);


            nodeOrder = $('<div class="node-order">' + this.nodeOrder + '</div>');
            nodeOrder.css({ 'font-size': "2.7em" });
            textLayer.append(nodeOrder);


            if (this.type === 'offmapreference' || this.type === 'nodereference') {

                nodeOrder.css({
                    left: (this.AABB.x + 8) * scale,
                    top: (this.AABB.y + (height / scale) - 26) * scale,
                    'padding-top': "1em",
                    color : '#fff'

                });

                // draw the pathways logo with vector graphics for path references.
                c = $('div.path-reference', this.htmlFragment);
                w = 704;
                h = 68;

                c.css({
                    width: w,
                    height: h,
                    position: 'absolute',
                    bottom: 14,
                    left: 0
                });

            } else {

                this.htmlFragment.css({

                    left: (this.AABB.x + 8) * scale,
                    width: (width) - (7 * scale),
                    fontSize: '2.7em'

                });

                nodeOrder.css({
                    left: (this.AABB.x - 4) * scale,
                    top: (this.AABB.y) * scale,
                    /* 'padding-top': '1.2em', */
                    width: 'auto',
                    'text-align' : 'right',
                    color : '#000'
                });

            }

            return;

        },

        getConnectorPoint: function (vector) {

            var box = this.AABB;


            var cx = box.x + box.hw;
            var cy = box.y + box.hh;

            return new Point({ x: (cx + (box.hw * vector.x)), y: (cy + (box.hh * vector.y)) }, vector);

        },

        registerEvent: function (event, callback) {

            this.htmlFragment.bind(event, callback);

        }

    };

    function drawBox (c, x, y, w, h) {

        c.box({
            position: {
                x: x,
                y: y
            },
            size: {
                w: w,
                h: h
            },
            cornerRadius: 0.1

        });

    }

    function drawLine (c, x1, y1, x2, y2) {

        c.path({
            points: [
                {
                    x: x1,
                    y: y1

                },
                {
                    x: x2,
                    y: y2

                }
            ]

        });

    }

    module.exports = PathNode;


},{"../core/config.js":1,"../lib/planet.js":3,"./point.js":8,"./vector-processing-and-bounding-box.js":10}],7:[function(require,module,exports){
/********************************************************************
*
* Filename:     Path-view.js
* Description:  
*   
********************************************************************/

var planet = require('../lib/planet.js');

//var browser = require('../utils/sniffer.js');
//var broker = require('../framework/pubsub.js');
//var httpLinkCache = require('../core/httpLinkCache.js');
var appConfig = require('../core/config.js');

var Vector2D = require('./vector-processing-and-bounding-box.js').Vector2D;
var BoundingBox = require('./vector-processing-and-bounding-box.js').BoundingBox;
var QuadTree = require('./quadtree.js').QuadTree;

var PathNode = require('./path-node.js');

var processEdgeGroups = require('./edge.js').processEdgeGroups;
var createEdgeGroups = require('./edge.js').createEdgeGroups;

var canvasMargin = 50;

function PathView (data, context, isPrint, scale){

    context.addClass('path-view-container');

    this.context = context;
    this.properties = {};
    this.nodes = {};
    this.scale = (scale ? scale : 2);
    

    this.edges = {};
    this.selectedNode = '';
    this.uid = data.pathwaySlug;
    this.isPrint = (isPrint === 'print' ? true : false);

    this
        .createDefaultLayers()
        .initialisePathAndNodes( data.nodes )
        .initialiseLayers()
        .initialiseEdges( data.edges )
        .initialiseLabels( data.labels );

    return this;

}

PathView.prototype = {

    render : function (){

        var _this = this;
        
        $.each(this.nodes, function (id, node){
            
            node.draw(_this.planetLayer, _this.textLayer, _this.scale);

            if(node.isInteractive){

                // click handlers for links...
                if(node.type === 'interactive'){
                    
                    node.registerEvent('click', (function (id){

                        return function (e){
                        
                        e.preventDefault();
                        broker.publish("request-view-node-content", id);

                        };

                    }(node.id)) );

                }else if(node.type === 'offmapreference' && typeof node.links!== 'undefined'){

                    node.registerEvent('click', (function (link){

                        return function (e){
                            
                            e.preventDefault();

                            var xmlUri = httpLinkCache[link].xml;

                            broker.publish("request-view-new-path", xmlUri, link);

                        };

                    }(node.links[0])));


                }else if(node.type === 'nodereference'){

                    node.registerEvent('click', (function (id){

                        return function (e){
                        
                            broker.publish('event-application-is-loading');
                            window.location = $(this).attr('href');
                        };

                    }(_this.id) ) );

                }

                if(!('ontouchstart' in window)){

                    // now bind mouseenter/mouseleave events...
                    node.registerEvent('mouseenter', function (e){
                            
                        node.drawAsHighlighted(_this.highlights, _this.scale);

                    });

                    node.registerEvent('mouseleave', function (e){

                        _this.highlights.clear();

                    });

                    node.registerEvent('mousedown', function (e){

                         node.moused = (new Date()).getTime();

                    });

                    node.registerEvent('focus', function (e){

                        if(node.moused){

                            if(node.moused < (new Date()).getTime() + 100){

                                $(this).trigger('click');

                            }else{

                                this.moused = false;

                            }


                        }else{
                        
                            broker.publish("event-center-on-node", node.id);

                        }

                    });
                }

            }
            
        });

        this.drawEdgesAndLabels();

    },

    renderForPrint : function (){
        
        var _this = this;
        
        $.each(this.nodes, function (id, node){
            
            node.drawForPrint(_this.planetLayer, _this.textLayer, _this.scale);
    
        });

        _this.textLayer.css({
            position: 'absolute',
            top : 0,
            left : 0,
            overflow: 'hidden'            
        })


        this.drawEdgesAndLabels( );

    },

    drawEdgesAndLabels : function ( ){
        
        var groups = this.edgegroups, groupIndex = 0, edgeIndex = 0, labelIndex;

        var edgeStyle = appConfig.system.styles.edge;
        var edgeWidth = edgeStyle.strokeWidth;
        edgeStyle.strokeWidth = edgeWidth * this.scale;
        
        this.planetLayer.setDrawAttributes(appConfig.system.styles.edge);

        edgeStyle.strokeWidth = edgeWidth;

        while(groupIndex < groups.length){
            
            if(groups[groupIndex]){
                edgeIndex = 0;
                labelIndex = 0;

                if(groups[groupIndex].edges){

                    while(edgeIndex < groups[groupIndex].edges.length){
                    
                        groups[groupIndex].edges[edgeIndex].draw( this.planetLayer, this.scale );

                        edgeIndex++;
                        
                    }

                }

                if(groups[groupIndex].labels){

                    while(labelIndex < groups[groupIndex].labels.length){
                    
                        groups[groupIndex].labels[labelIndex].draw( this.textLayer, this.scale );

                        labelIndex++;
                        
                    }

                }
            }
            groupIndex++;

        }
    },

    hide : function (){
        
        this.container.hide();

    },

    show : function (){
        
        this.container.show();

    },

    createDefaultLayers : function (){
        
        this.container = $('<div id="/path-view/' + this.uid + '"></div>');

        if(this.isPrint){
            
            this.container.addClass('print');

        }

        this.vectorLayer = $('<div class="path-view-vector"></div>');
        //this.highlightLayer = $('<div class="path-view-highlight"></div>');
        //this.selectedLayer = $('<div class="path-view-select"></div>')
        this.textLayer = $('<div class="path-view-html"></div>');

        this.context
                .append(this.container);
        this.container
                .append(this.vectorLayer)
        //      .append(this.highlightLayer)
        //      .append(this.selectedLayer)
                .append(this.textLayer);

        return this;

    },

    initialiseLayers: (function (){
        
        var setSize = function (layers, width, height, scale){
            
            $.each(layers, function (key, value){
                
                value.css({
                    
                    width: width * scale ,
                    height: height * scale

                });

            });

        };

        return function (){

            setSize([this.vectorLayer, this.textLayer], this.properties.pathWidth, this.properties.pathHeight, this.scale);

            this.planetLayer = planet(this.vectorLayer);
            this.highlights = planet(this.vectorLayer);
            this.selects = planet(this.vectorLayer);
            
            return this;

        };

    }()),

    initialisePathAndNodes : function ( data ){
        
        var _this = this,
            maxWidth = 0,
            maxHeight = 0,
            geometry;

        data.forEach(function (node){
            // create the node object
            node.geometry.width += node.geometry.width;
            node.geometry.height += node.geometry.height;

            node.geometry.top -= (node.geometry.height * 0.5);
            node.geometry.left -= (node.geometry.width * 0.5)
            //
            node.geometry.top += canvasMargin;
            node.geometry.left += canvasMargin;



            _this.nodes[node.id] = new PathNode( node, _this.textLayer, _this.isPrint);
        
            // collapse the reference
            geometry = _this.nodes[node.id].AABB;

            // update maxWidth/maxHeight if necessary
            if(maxWidth < ((geometry.hw * 2) + geometry.x + 50)){
                
                maxWidth = ((geometry.hw * 2) + geometry.x + 50);

            }
            if(maxHeight < ((geometry.hh * 2) + geometry.y + 100)){

                maxHeight = ((geometry.hh * 2) + geometry.y + 100);

            }


        });

        this.properties.pathWidth = maxWidth;
        this.properties.pathHeight = Math.max(400, maxHeight);

        this.spatialIndex = new QuadTree( {
                                AABB: new BoundingBox(
                                        new Vector2D(0, 0),
                                        new Vector2D(this.properties.pathWidth, this.properties.pathHeight)
                                        )});

        $.each(this.nodes, function (id, node){
            
            _this.spatialIndex.push( {AABB : node.AABB, data: node} );

        });

        return this;

    },

    initialiseEdges : function ( edges ){

        var dimTest;

        edges.forEach(function (edge){

            if(edge.label !== ""){

                dimTest = $('<div class="label" id="label-dim-test">' + edge.label + '</div>');
                    $('body').append(dimTest);

                    edge.labelGeometry = {
                        height: dimTest.outerHeight(),
                        width: dimTest.outerWidth(),
                        innerWidth: dimTest.outerWidth() - (parseInt(dimTest.css("padding-left"), 10) + parseInt(dimTest.css("padding-right"), 10)),
                        innerHeight: dimTest.innerHeight() - (parseInt(dimTest.css("padding-top"), 10) + parseInt(dimTest.css("padding-bottom"), 10))
                    };

                    if (edge.labelGeometry.width > 150) {

                        // we restrict it's width and measure it again..
                        dimTest.css("display", "block").css("width", "150px");

                        edge.labelGeometry = {
                            height: dimTest.outerHeight(),
                            width: dimTest.outerWidth(),
                            innerWidth: dimTest.outerWidth() - (parseInt(dimTest.css("padding-left"), 10) + parseInt(dimTest.css("padding-right"), 10)),
                            innerHeight: dimTest.innerHeight() - (parseInt(dimTest.css("padding-top"), 10) + parseInt(dimTest.css("padding-bottom"), 10))
                        };

                    }

                    dimTest.remove();

            }

        });
        
        this.edgegroups = processEdgeGroups( createEdgeGroups( edges, this.nodes ), this.spatialIndex );

        return this;

    },

    getNodeGeometry : function ( nodeid ){
        
        if(this.nodes[nodeid]){
            
            return this.nodes[nodeid].AABB;

        }

    },

    initialiseLabels : function (){
        
        return this;

    },

    resetView : function (){
        
        // get rid of all highlighting and selecting.

        return this;

    },

    selectNode : function (id){
        
        // we only want one selected node..

        var _this = this;

        if(this.nodes[id]){

            if(this.selectedNode!== id){
                
                if(this.nodes[this.selectedNode]){
                    this.selects.clear();
                    this.nodes[this.selectedNode].htmlFragment.removeClass('selected');
                }

                this.selectedNode = id;

                this.nodes[id].drawAsSelected(this.selects, this.scale);

            }

        } else {

            if(this.nodes[this.selectedNode]){
                this.selects.clear();
                this.nodes[this.selectedNode].htmlFragment.removeClass('selected');
                this.selectedNode = false;
            }

        }

        return this;

    },

    getLandingNodeId : function (){

        var highestNode = null;

        for(var i in this.nodes){ 
            if(this.nodes.hasOwnProperty(i)){

                if (!highestNode || this.nodes[i].geometry.top < highestNode.geometry.top){
                    highestNode = this.nodes[i];
                }

                if(this.nodes[i].type==="landing"){ 
                    return this.nodes[i].id;
                }
            }
        }

        // not found a landing node? Return the id for the highest node in the page..

        return highestNode.id;

        return false;

    },

    clearDown : function (){
        
        this.context.empty();

    }

};

module.exports = PathView;

},{"../core/config.js":1,"../lib/planet.js":3,"./edge.js":4,"./path-node.js":6,"./quadtree.js":9,"./vector-processing-and-bounding-box.js":10}],8:[function(require,module,exports){
/********************************************************************
*
* Filename:     Point.js
* Description:  For creating and processing points
*   
********************************************************************/

var Vector2D = require('./vector-processing-and-bounding-box').Vector2D;

function Point (point, vector){

    try {

        this.point = new Vector2D(point.x, point.y);
        this.vector = vector ? new Vector2D(vector.x, vector.y) : new Vector2D(0,0);

        this.x = this.point.x;
        this.y = this.point.y;
        this.vx = this.vector.x;
        this.vy = this.vector.y;

        return this;

    }catch(e){

        return {};

    }
}

Point.prototype = {

    compareDirection : function ( point){
        
        return this.vector.dotProduct(point.vector);

    }

};

module.exports = Point;


},{"./vector-processing-and-bounding-box":10}],9:[function(require,module,exports){
/********************************************************************
*
* Filename:     Quadtree.js
* Description:  A way of efficiently querying what nodes are where
*               AABB stands for Axis Aligned Bounding Box
*
*               qTree nodes have either links to other nodes, or are
*               buckets. Links to other nodes are [0],[1],[2],[3]
*               representing each corner of the space 0 = NW and the rest
*               go clockwise round.
*
*               This code has a dependency: pathways.boundingBox and pathways.vector2D
*               which are used together to provide the collision detection functionality.
*               
*               Alternative bounding box libs could be used, but they must support the following
*               methods: getCollidingQuadrants(), returning an array of true/false representing, in clockwise
*               order, nw to sw AND subdivide(), which returns 4 new instances of itself, split into quarters.
*   
********************************************************************/

function QuadTreeNode ( obj ){

    if(!obj.AABB){
        throw("Cannot create a qNode without bounding box data");
    }
    // we keep a record of this node's bounding box
    this.AABB = obj.AABB;

    // and we track the depth. It's possible we can use depth based limiting rather than resolution based limiting.
    this.depth = obj.depth + 1 || 0;

    // If there's data, then we put that data in the bucket.
    if(obj.data){

        this.bucket = [];
        this.bucket.push(obj.data);

    }else{
        // otherwise we create an empty bucket.
        this.bucket = [];

    }

    return this;

}

QuadTreeNode.prototype = {

    // We put a unique ID on each piece of data that goes in
    qTreeUID : 0,

    // The push method is a recursive function that pushes data down into the tree
    push : function( obj ){

        // If the data doesn't already have a qTreeUID, give it one. This is so that
        // when pulling the data back out, we don't return duplicate results
        if(!obj.data.qTreeUID){
            obj.data.qTreeUID = ++this.qTreeUID;
        }
        
        // check that there's been valid stuff passed to it..
        if(!obj.data && !obj.AABB && !obj.AABB.testForCollision){

            throw("Invalid data attempted to be pushed to quadtree");

        }else{
            // It's a Quad Tree. There are 4 Quads. We need to know which Quads are relevant to this data
            var matchingCorners = this.getMatchingCornersPush( obj.AABB ), index, isMatched = false;

            // engulfed is a special thing. It means that the bounding box of the data being pushed
            // is bigger than the Quad. It's "Engulfed" and we don't bother to subdivide any further.
            if(matchingCorners==='engulfed'){

                // we just copy a reference to the data into the bucket.
                if(!this.bucket){
                    
                    this.bucket = [];
                }
                this.bucket.push(obj.data);

                return this;

            }else{

                // At this point we either have no match, or a bunch of matches, 
                // (technically, quads that this data should be pushed down to)
                if(matchingCorners!=="no match"){

                    // A node can be a bucket or a leaf. If it's got a member this[0] it's probably a leaf.
                    if(!this[0]){

                        // If the half-width of this particular leaf is above 12, we allow further subdivision.
                        if(this.AABB.hw > 8){

                            // Thankfully the bounding box utils have a 'subdivide' method.
                            var subdivs = this.AABB.subdivide();

                            // And then we take these new bounding boxes and create new qNodes, passing the depth
                            this[0] = new QuadTreeNode({ AABB: subdivs.nw, depth : this.depth });
                            this[1] = new QuadTreeNode({ AABB: subdivs.ne, depth : this.depth });
                            this[2] = new QuadTreeNode({ AABB: subdivs.se, depth : this.depth });
                            this[3] = new QuadTreeNode({ AABB: subdivs.sw, depth : this.depth });

                            // And we get rid of the bucket, turning this qNode into a leaf.
                            delete this.bucket;


                        }else{
                            // we're already subdivided too far, so we bucketize this node
                            this.bucket.push(obj.data);
                            return this;

                        }

                    }

                    // so we've subdivided now, or were already subdivided. Time to push the data down...

                    // 4 corners...
                    index = 4;
                    // Super Efficient Loop Backwards
                    while(index--){
                        // If the data matches this corner...
                        if(matchingCorners[index]===true){
                            // push the data down (recursively invoking push again)
                            this[index].push({ data: obj.data, AABB: obj.AABB});
                        }
                    }

                }

            }

        }

        return this;

    },

    // query returns all data in a given area of space

    query : function ( obj, results, matches ){
        // an array to hold results
        if(!results){
            results = [];
        }
        // an array to hold unique qTreeUIDs
        if(!matches){
            matches = [];
        }

        if(this.bucket){
            // the end of the line, found a bucket, return it and back up we go
            return this.bucket;

        }else{

            // find which corners match..
            var matchingCorners = this.getMatchingCornersQuery( obj );

            // if there's a match...
            if(matchingCorners!=="no match"){
                
                
                // 4 corners...
                var index = 4;

                // which we loop through efficiently...
                while(index--){
                    // if we find a match...
                    if(matchingCorners[index]===true){
                        // we recursively invoke query on the child node
                        var data = this[index].query( obj, results, matches );

                        // if this is a bucket with data and qTreeUID, and we haven't already
                        // found this particular piece of data...
                        if(data[0] && data[0].qTreeUID && !matches[data[0].qTreeUID]){

                                // we mark that we've found it in 'matches'
                                matches[data[0].qTreeUID] = true;

                                // and we push the data into results. The results are 
                                results.push(data[0]);

                        }

                    }
                }
                // we return the final results here.
                return results;

            } else {

                return false;
            }

        }

    },

    getMatchingCornersPush : function(obj){
        // this just invokes the getCollidingQuadrants method of the bounding box.

        // It returns either an array of matching quadrants in teh form, [true],[false],[true],[false] etc
        // or 'no match' or 'engulfed'. Each element of the array is true or false, and go in the following order:
        // nw, ne, se, sw. 

        // 'no match' means that the object being pushed doesn't collide with any of the quads in this qNode
        // 'engulfed' means that the object being pushed is BIGGER and totally surrounds the entire qNode,
        // which means that this qNode should become a bucket rather than subdividing further.

        return this.AABB.getCollidingQuadrants(obj);

    },

    getMatchingCornersQuery : function(obj){
        // this invokes the same getCollidingQuadrants method, but we convert
        // an 'engulfed' signal into [true],[true],[true],[true]. 

        // This is because, as we get deeper into the tree, the size of a qNode may end up being 
        // smaller than the area being queried and, in fact, sit inside it completely.

        // When pushing we use this information to prevent further subdivision, but when querying
        // we want keep going down into the tree to find buckets, which 'engulfed' signals block.

        var matches = this.AABB.getCollidingQuadrants(obj);

        if(matches==="engulfed"){
            return [true, true, true, true];
        }else{
            return matches;
        }   

    }

};

module.exports.QuadTree = module.exports.QNode = QuadTreeNode;
},{}],10:[function(require,module,exports){
/********************************************************************
*
* Filename:     vector-processing-and-bounding-box.js
* Description:  Helpers for dealing with collision detection
*   
********************************************************************/

function Vector2D (x, y){

    try {

        this.x = x;
        this.y = y;

        return this;

    }catch(e){
        throw ("Invalid number of arguments to Vector2D");
    }

}

Vector2D.prototype = {

    toString : function(){
        return "x : " + this.x + ", y : " + this.y;
    },
    translate : function(){
        var x, y;

        if(arguments.length > 0){
            if(typeof arguments[0]==='number' && typeof arguments[1]==='number'){
            
                x = arguments[0];
                y = arguments[1];   
            
            }else if(isVector2D(arguments[0])){
            
                x = arguments[0].x;
                y = arguments[0].y;
                
            }else{
            
                return this;
            
            }
            
            this.x += x;
            this.y += y;
            
        }
        
        return this;
    },
    move : function(){
        var x, y;
        if(arguments.length > 0){
            if(typeof arguments[0]==='number' && typeof arguments[1]==='number'){
                x = arguments[0];
                y = arguments[1];
            }else if(isVector2D(arguments[0])){
                x = arguments[0].x;
                y = arguments[0].y;
            }
        }else{
        
            x = 0;
            y = 0;
        
        }
        this.x = x;
        this.y = y;
        
        return this;

    },
    clone : function(){
        var copy = new Vector2D(this.x, this.y);
        if(arguments.length > 0){
            // return the clone, translated
            if(typeof arguments[0]==='number' && typeof arguments[1]==='number'){
                return copy.translate(arguments[0], arguments[1]);
            }else{
                return copy.translate(arguments[0]);
            }

        }else{
            // copy the existing object
            return new Vector2D(this.x, this.y);
        }
    },
    // More advanced maths here....
    dotProduct : function(point){

        var b_op;
        if(point && isVector2D(point)){
            // a.b
            b_op = point;
            
        }else{
            // a.a
            b_op = this;
            
        }
        return (this.x * b_op.x) + (this.y * b_op.y);
    },
    normalise : function(){
        var len = this.length();
        this.x = this.x / len;
        this.y = this.y / len;
        
        return this;
    },
    getNormal : function( flag ){
        if(flag){
        return new Vector2D(0 - this.y, this.x);
        }else{
        return new Vector2D(this.y, 0 - this.x);
        }
    },
    length : function(){
        return Math.sqrt(this.dotProduct());
    },
    distance : function(point){
        if(point && isVector2D(point)){
            return Math.sqrt(this.dotProduct(point));
        }
        return this.length();
    }       
};

function BoundingBox (position, size){

    var _pos,_size;

    if(arguments.length===2 && position && size && isVector2D(position) && isVector2D(size)){
    
        _pos = position;
        _size = size;
    
    }else{

        _pos = new Vector2D(0,0);
        _size = new Vector2D(1,1);

    }
    this.x = _pos.x;
    this.y = _pos.y;
    this.hw = _size.x / 2;
    this.hh = _size.y / 2;

    return this;

}

BoundingBox.prototype = {

    position : function(){

        var _pos;

        if(arguments.length===0){
            return new Vector2D(this.x, this.y);

        }else{

            if(typeof arguments[0]==="number" && typeof arguments[1]==="number"){
            
                _pos = new Vector2D(arguments[0],arguments[1]);
                
            }else if(new Vector2D(arguments[0])){
                
                _pos = arguments[0];
            
            }
            
            this.x = _pos.x;
            this.y = _pos.y;

            return this;

        }
    },
    size : function(){

        var _size;

        if(arguments.length===0){
            return new Vector2D(this.hw * 2, this.hh * 2);
        }else{

            if(typeof arguments[0]==="number" && typeof arguments[1]==="number"){
            
                _size = new Vector2D(arguments[0],arguments[1]);
                
            }else if(isVector2D(arguments[0])){
                
                _size = arguments[0];
            
            }
            
            this.hw = _size.x / 2;
            this.hh = _size.y / 2;

            return this;

        }
    },
    testForCollision : function( obj ){
        // obj must be another boundingBox2D
        try{
                   //  total width of     -      x + half width   -  other x + half witdth
                   // the two halves...
            var px = (obj.hw + this.hw) - Math.abs((this.x + this.hw) - (obj.x + obj.hw));
            
            // if px is greater than zero there's no overlap on this axis, and that means there's definitly no
            // collision - collision means there's an overlap on ALL axises we test.
            
            if(0 < px){
            
                // Okay so the x axis overlaps. We can't tell if there's a collision until we've
                // tested the y axis as well. 
            
                var py = (obj.hh + this.hh) - Math.abs((this.y + this.hh) - (obj.y + obj.hh));
                
                if(0 < py){
                
                    return {x : px, y : py, hw : obj.hw, hh : obj.hh};
                
                }
            
            }

        }catch(e){
            throw("Invalid object passed to isRectWithinBounds");
        }
        return false;
    },      
    subdivide : function(){

        var subDivSize, rects = {};
        
        subDivSize = new Vector2D(this.hw, this.hh);
        
        rects.nw = new BoundingBox(new Vector2D(this.x , this.y), subDivSize);
        rects.ne = new BoundingBox(new Vector2D(this.x + this.hw, this.y), subDivSize);
        rects.se = new BoundingBox(new Vector2D(this.x + this.hw, this.y + this.hh), subDivSize);
        rects.sw = new BoundingBox(new Vector2D(this.x, this.y + this.hh), subDivSize);
        
        return rects;
        
    },
    getCollidingQuadrants : function( obj ){
    
        var vector = obj.testForCollision(this),
        matches = [false, false, false, false],
        top = true, bottom = true, left = true, right = true;

        if(vector){

            if(this.x > obj.x){

                if(this.y > obj.y){
                
                    if(this.x + (this.hw * 2) <  obj.x+ (obj.hw * 2)){

                        if(this.y + (this.hh * 2) < obj.y+ (obj.hh * 2) ){

                            return "engulfed";

                        }

                    }

                }

            }


            if( (obj.x + (obj.hw * 2)) < (this.x + this.hw)){
                    // can't collide with right hand quads
                    right = false;

            }else if(obj.x > (this.x + this.hw)){
                    // can't collide with left hand quads
                    left = false;

            }

            if( (obj.y + (obj.hh * 2)) < (this.y + this.hh)){
                    // can't collide with right hand quads
                    bottom = false;

            }else if(obj.y > (this.y + this.hh)){
                    // can't collide with left hand quads
                    top = false;

            }

            if(top && left){ matches[0] = true; }
            if(top && right){ matches[1] = true; }
            if(bottom && right){ matches[2] = true; }
            if(bottom && left){ matches[3] = true; }

            return matches;

        }

        return "no match";


    },
    translate : function(){

        var _pos;

        if(arguments.length > 0){
        
            if(typeof arguments[0]==="number" && typeof arguments[1]==="number"){
            
                _pos = new Vector2D(arguments[0],arguments[1]);
                
            }else if(isVector2D(arguments[0])){
                
                _pos = arguments[0];
            
            }
            this.x += _pos.x;
            this.y += _pos.y;

        }
        return this;
    },
    draw : function(drawContext, color, option){
        var colour;
        if(!option){
            colour = color || 'rgba(200,200,200,0.8)';
            drawContext.strokeStyle = colour;
            drawContext.lineWidth = 1;
            drawContext.strokeRect(Math.round(this.x) + 0.5, Math.round(this.y) + 0.5, Math.round(this.hw * 2), Math.round(this.hh * 2));
        }else{
            colour = color || 'rgba(200,200,200,0.8)';
            drawContext.fillStyle = colour;
            drawContext.fillRect(Math.round(this.x) + 0.5, Math.round(this.y) + 0.5, Math.round(this.hw * 2), Math.round(this.hh * 2));

        }

        return this;

    
    }

};

function isVector2D(obj, testMethods){
    var method;

    if(typeof obj.x==="number" && typeof obj.y==="number"){     
    
        if(testMethods){
            for(method in Vector2D.prototype){
                if(!obj[method]){
                    return false;
                }
            }
        }

        return true;
    }
    return false;                       
}

// exports...
module.exports.BoundingBox = BoundingBox;
module.exports.Vector2D = Vector2D;
module.exports.isVector2D = isVector2D;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2NoYXJsb3R0ZS9Eb2N1bWVudHMvUmVwb3MvbWFya2Rvd25waXBlbGluZS9wYXRod2F5LXJlbmRlci10ZXN0L2NvcmUvY29uZmlnLmpzIiwiL1VzZXJzL2NoYXJsb3R0ZS9Eb2N1bWVudHMvUmVwb3MvbWFya2Rvd25waXBlbGluZS9wYXRod2F5LXJlbmRlci10ZXN0L2luZGV4LmpzIiwiL1VzZXJzL2NoYXJsb3R0ZS9Eb2N1bWVudHMvUmVwb3MvbWFya2Rvd25waXBlbGluZS9wYXRod2F5LXJlbmRlci10ZXN0L2xpYi9wbGFuZXQuanMiLCIvVXNlcnMvY2hhcmxvdHRlL0RvY3VtZW50cy9SZXBvcy9tYXJrZG93bnBpcGVsaW5lL3BhdGh3YXktcmVuZGVyLXRlc3QvdmlzdWFsaXNlci9lZGdlLmpzIiwiL1VzZXJzL2NoYXJsb3R0ZS9Eb2N1bWVudHMvUmVwb3MvbWFya2Rvd25waXBlbGluZS9wYXRod2F5LXJlbmRlci10ZXN0L3Zpc3VhbGlzZXIvbGFiZWwuanMiLCIvVXNlcnMvY2hhcmxvdHRlL0RvY3VtZW50cy9SZXBvcy9tYXJrZG93bnBpcGVsaW5lL3BhdGh3YXktcmVuZGVyLXRlc3QvdmlzdWFsaXNlci9wYXRoLW5vZGUuanMiLCIvVXNlcnMvY2hhcmxvdHRlL0RvY3VtZW50cy9SZXBvcy9tYXJrZG93bnBpcGVsaW5lL3BhdGh3YXktcmVuZGVyLXRlc3QvdmlzdWFsaXNlci9wYXRoLXZpZXcuanMiLCIvVXNlcnMvY2hhcmxvdHRlL0RvY3VtZW50cy9SZXBvcy9tYXJrZG93bnBpcGVsaW5lL3BhdGh3YXktcmVuZGVyLXRlc3QvdmlzdWFsaXNlci9wb2ludC5qcyIsIi9Vc2Vycy9jaGFybG90dGUvRG9jdW1lbnRzL1JlcG9zL21hcmtkb3ducGlwZWxpbmUvcGF0aHdheS1yZW5kZXItdGVzdC92aXN1YWxpc2VyL3F1YWR0cmVlLmpzIiwiL1VzZXJzL2NoYXJsb3R0ZS9Eb2N1bWVudHMvUmVwb3MvbWFya2Rvd25waXBlbGluZS9wYXRod2F5LXJlbmRlci10ZXN0L3Zpc3VhbGlzZXIvdmVjdG9yLXByb2Nlc3NpbmctYW5kLWJvdW5kaW5nLWJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNweUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qXG4qIEZpbGVuYW1lOiAgICAgY29uZmlnLmpzXG4qIERlc2NyaXB0aW9uOiAgY29udGFpbnMgZGVmYXVsdCBjb25maWdzIGZvciBhbGwgb2JqZWN0cyB1c2VkIGluIHBhdGh3YXlzXG4qICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzeXN0ZW0gOiB7XG4gICAgICAgIHBhdGhTZWxlY3RvcjogXCIjbnB3LXBhdGgtbGF5ZXJcIixcbiAgICAgICAgZGVmYXVsdFVSSSA6ICcnLFxuICAgICAgICBzdHlsZXMgOiB7XG4gICAgICAgICAgICBlZGdlIDoge1xuICAgICAgICAgICAgICAgIC8vc3Ryb2tlQ29sb3I6IFwiI2MwYzhkMVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcInJnYig4NSw4NSw4NSlcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uIDoge1xuICAgICAgICAgICAgICAgIC8vc3Ryb2tlQ29sb3I6IFwiI2MwYzhkMVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbCA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjY2NjXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgZmlsbFR5cGU6IFwiZmlsbFwiLFxuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDAuNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVyYWN0aXZlTm9ybWFsIDoge1xuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIiNmYzk1MDNcIixcbiAgICAgICAgICAgICAgICBzdHJva2VUeXBlOiBcImxpbmVcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJncmFkaWVudFwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IxOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMjogXCIjZjhmOWZiXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZUhpZ2hsaWdodCA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjNGVhNWJjXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgZmlsbFR5cGU6IFwiZ3JhZGllbnRcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMTogXCIjZDRlYWYwXCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjI6IFwiIzk5YzVkMFwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW50ZXJhY3RpdmVTZWxlY3QgOiB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzA3MzI0ZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVR5cGU6IFwibGluZVwiLFxuICAgICAgICAgICAgICAgIGZpbGxUeXBlOiBcImdyYWRpZW50XCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjE6IFwiIzE3NmE5ZVwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IyOiBcIiMwYzQwNjJcIixcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdlbmVyaWMgOiB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI2E5YjBiNlwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVR5cGU6IFwibGluZVwiLFxuICAgICAgICAgICAgICAgIGZpbGxUeXBlOiBcImdyYWRpZW50XCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjE6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IyOiBcIiNmOGY5ZmJcIixcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhSZWZlcmVuY2VEZWNvcmF0aW9uIDoge1xuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2VUeXBlOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJncmFkaWVudFwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IxOiBcIiNmY2I3MDBcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMjogXCIjZmI3MzAzXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoUmVmZXJlbmNlRGVjb3JhdGlvbkhpZ2hsaWdodCA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgZmlsbFR5cGU6IFwiZ3JhZGllbnRcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMTogXCIjNGVhZWM4XCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjI6IFwiIzFhODA5YlwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW50ZXJhY3RpdmVEZWNvcmF0aW9uIDoge1xuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2VUeXBlOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJncmFkaWVudFwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IxOiBcIiNmY2I3MDBcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMjogXCIjZmI3MzAzXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZURlY29yYXRpb25IaWdobGlnaHQgOiB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVR5cGU6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIGZpbGxUeXBlOiBcImdyYWRpZW50XCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjE6IFwiIzk5YzVkMFwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IyOiBcIiNkNGVhZjBcIixcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vbm9jaHJvbWVJbnRlcmFjdGl2ZSA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjODc4Nzg3XCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICAgICAgZmlsbFR5cGU6IFwiZ3JhZGllbnRcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMTogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjI6IFwiI0Y5RjlGOVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAzXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb25vY2hyb21lUGF0aFJlZmVyZW5jZSA6IHtcbiAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlVHlwZTogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgZmlsbFR5cGU6IFwiZ3JhZGllbnRcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMTogXCIjQzFDMUMxXCIsXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjI6IFwiIzg3ODc4N1wiLFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW9ub2Nocm9tZUdlbmVyaWNQYXRoUmVmZXJlbmNlIDoge1xuICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2VUeXBlOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBmaWxsVHlwZTogXCJncmFkaWVudFwiLFxuICAgICAgICAgICAgICAgIGdyYWRpZW50Q29sb3IxOiBcIiNhOWIwYjZcIixcbiAgICAgICAgICAgICAgICBncmFkaWVudENvbG9yMjogXCIjYTliMGI2XCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gICAgICAgXG59O1xuIiwidmFyIFBhdGhWaWV3ID0gcmVxdWlyZSgnLi92aXN1YWxpc2VyL3BhdGgtdmlldy5qcycpO1xuXG4kLmdldCgnZGlhYmV0ZXMuanNvbicsIGZ1bmN0aW9uIChkYXRhKXtcblxuICB2YXIgJGNvbnRleHQgPSAkKCcjbWFwLXJlbmRlcicpO1xuXG4gIHZhciBwYXRoVmlldyA9IG5ldyBQYXRoVmlldyhkYXRhLCAkY29udGV4dCwgZmFsc2UsIDEpO1xuICBwYXRoVmlldy5yZW5kZXIoKTtcblxufSk7IiwiLyohXG4gKiBQbGFuZXQgdjAuMC4yIC0gYSBzaW1wbGUgY3Jvc3MtcGxhdGZvcm0gcGF0aCBkcmF3aW5nIGxpYnJhcnkgXG4gKiBodHRwOi8vY2hhcmxvdHRlZ29yZS5jb21cbiAqXG4gKiBDb3B5cmlnaHQgMjAxMCwgQ2hhcmxvdHRlIEdvcmVcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqXG4gKlxuICogRGF0ZTogVHVlIEp1bCAxMiAxNDoxMDowMSAyMDExICswMTAwXG4gKi8gXG4gICAgdmFyIHN1cHBvcnRlZE1vZGVzID0ge1xuICAgICAgICB2bWwgOiAoZnVuY3Rpb24oKXtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZG9lc1N1cHBvcnQgPSAndW50ZXN0ZWQnO1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIGlmKGRvZXNTdXBwb3J0PT09J3VudGVzdGVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGEsIGIsIGhlYWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLCBzdHlsZUVsZW1lbnQsIEhUTUxUYWdSZWY7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBhLmlubmVySFRNTCA9ICc8djpzaGFwZSBpZD1cInZtbF9mbGFnMVwiIGFkaj1cIjFcIiAvPic7XG4gICAgICAgICAgICAgICAgICAgIGIgPSBhLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmFwcGVuZENoaWxkKGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGIuc3R5bGUuYmVoYXZpb3IgPSBcInVybCgjZGVmYXVsdCNWTUwpXCI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZG9lc1N1cHBvcnQgPSBiID8gdHlwZW9mIGIuYWRqID09PSBcIm9iamVjdFwiOiB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICQoYSkucmVtb3ZlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoZG9lc1N1cHBvcnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkRWxlbWVudC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBcInZcXFxcOnJlY3QsIHZcXFxcOnJvdW5kcmVjdCx2XFxcXDp0ZXh0Ym94LCB2XFxcXDpsaW5lLCB2XFxcXDpwb2x5bGluZSwgdlxcXFw6Y3VydmUsIHZcXFxcOmFyYywgdlxcXFw6b3ZhbCwgdlxcXFw6aW1hZ2UsIHZcXFxcOnNoYXBlLCB2XFxcXDpncm91cCwgdlxcXFw6c2tldywgdlxcXFw6c3Ryb2tlLCB2XFxcXDpmaWxsIHsgYmVoYXZpb3I6dXJsKCNkZWZhdWx0I1ZNTCk7IGRpc3BsYXk6aW5saW5lLWJsb2NrIH1cIjtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdG1sVGFnUmVmID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ0hUTUwnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIdG1sVGFnUmVmLnNldEF0dHJpYnV0ZSgneG1sbnM6dicsJ3VybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206dm1sJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50Lm5hbWVzcGFjZXMuYWRkKFwidlwiLFwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWxcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBkb2VzU3VwcG9ydDtcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSgpKSxcbiAgICAgICAgc3ZnIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKFwiaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZVwiLCBcIjEuMVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2FudmFzIDogKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBkb2VzU3VwcG9ydCA9ICd1bnRlc3RlZCc7XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGRvZXNTdXBwb3J0PT09J3VudGVzdGVkJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbS5nZXRDb250ZXh0ICYmIGVsZW0uZ2V0Q29udGV4dCgnMmQnKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2VzU3VwcG9ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9lc1N1cHBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvZXNTdXBwb3J0O1xuXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KCkpXG4gICAgfSxcbiAgICBcbiAgICBwbGFuZXQ7XG5cbiAgICBcbiAgICBwbGFuZXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1vZGUgKXtcbiAgICAgICAgLy8gc2VsZWN0cyBWTUwsIFZNTCBub3Qgc3VwcG9ydGVkOiBUcnkgQ2FudmFzLCB0aGVuIFNWRywgdGhlbiBhYm9ydFxuICAgICAgICAvLyBzZWxlY3RzIFNWRywgU1ZHIG5vdCBzdXBwb3J0ZWQ6IFRyeSBWTUwsIHRoZW4gQ2FudmFzLCB0aGVuIGFib3J0XG4gICAgICAgIC8vIHNlbGVjdHMgQ2FudmFzLCBDYW52YXMgbm90IHN1cHBvcnRlZDogVHJ5IFZNTCwgdGhlbiBTVkcsIHRoZW4gYWJvcnQuXG4gICAgICAgIFxuICAgICAgICB2YXIgcHJpb3JpdHkgPSBbXCJjYW52YXNcIixcInN2Z1wiLFwidm1sXCJdLCBpLCBpbDtcbiAgICAgICAgXG4gICAgICAgIGlmKG1vZGUgJiYgc3VwcG9ydGVkTW9kZXNbbW9kZV0oKSl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHBsYW5ldFttb2RlXS5pbml0KCBzZWxlY3RvciApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGZvcihpID0gMCwgaWwgPSBwcmlvcml0eS5sZW5ndGg7IGkgPCBpbCA7aSsrKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRlZE1vZGVzW3ByaW9yaXR5W2ldXSgpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBwbGFuZXRbcHJpb3JpdHlbaV1dLmluaXQoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHBsYW5ldC5leHRlbmQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvLyBCYXNlZCBvbiBjb2RlIGluIGpRdWVyeVxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcywgaSA9IDAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weTtcbiAgICBcbiAgICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG4gICAgICAgICAgICBpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9PSBudWxsICkge1xuICAgICAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIG9iamVjdCBsaXRlcmFsIHZhbHVlcyBvciBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3RcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9OyAgXG4gICAgXG4gICAgcGxhbmV0LmV4dGVuZCh7XG4gICAgICAgIGRlZmF1bHRQZW4gOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVR5cGUgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsbFR5cGUgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGggOiAxLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvciA6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3IgOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjEgOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRDb2xvcjIgOiBcIiNGRkZcIlxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcmNlTW9kZSA6IGZ1bmN0aW9uKCBtb2RlICl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG1vZGU9PT1cInZtbFwiIHx8IG1vZGU9PT1cInN2Z1wiIHx8IG1vZGU9PT1cImNhbnZhc1wiKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwbGFuZXQuX21vZGUgPSBtb2RlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgIFxuICAgICAgICB2bWwgOiB7XG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24oIHNlbGVjdG9yICl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudCA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gJCgnPGRpdj48L2Rpdj4nKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kVG8oIHRoaXMucGFyZW50ICk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCcgOiB0aGlzLnBhcmVudC53aWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JyA6IHRoaXMucGFyZW50LmhlaWdodCgpXG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBcInZtbFwiO1xuXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMucGFyZW50LndpZHRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnBhcmVudC5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBlbiA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMucGVuLmV4dGVuZCA9IHBsYW5ldC5leHRlbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW4uZXh0ZW5kKHBsYW5ldC5kZWZhdWx0UGVuKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3ZnIDoge1xuICAgICAgICAgICAgaW5pdCA6IGZ1bmN0aW9uKCBzZWxlY3RvciApe1xuICAgICAgICAgICAgICAgIC8vIEZvciBTVkcsIHdlIGNyZWF0ZSBhbiBTVkcgZWxlbWVudCBpbiB0aGUgU1ZHIG5hbWVzcGFjZSBhbmQgYXBwZW5kIHRvIHRoZSBcbiAgICAgICAgICAgICAgICAvLyBjb250YWluZXIsIHNldHRpbmcgdGhlIHNpemUgYXBwcm9wcmlhdGVseS4gXG4gICAgICAgICAgICAgICAgdmFyIHN2ZywgY29udGFpbmVyID0gJChzZWxlY3Rvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLnN2Z05TLCBcInN2Z1wiKTtcbiAgICAgICAgICAgICAgICBzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ2ZXJzaW9uXCIsIFwiMS4xXCIpO1xuICAgICAgICAgICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInN0eWxlXCIsIFwicG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGggPSBjb250YWluZXIud2lkdGgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgICQoc3ZnKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKFwid2lkdGhcIix0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoXCJwb3NpdGlvblwiLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQoc3ZnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSBcInN2Z1wiOyBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBlbiA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMucGVuLmV4dGVuZCA9IHBsYW5ldC5leHRlbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW4uZXh0ZW5kKHBsYW5ldC5kZWZhdWx0UGVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVHcmFkaWVudCA6IGZ1bmN0aW9uKCBjb2xvcjEsIGNvbG9yMiApe1xuXG4gICAgICAgICAgICAgICAgdmFyIGlkLCBncmFkaWVudCwgY2hpbGQ7XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhbmV0LmdyYWRpZW50VUlEKXtcblxuICAgICAgICAgICAgICAgICAgICBwbGFuZXQuZ3JhZGllbnRVSUQrKztcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcGxhbmV0LmdyYWRpZW50VUlEID0gMTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZCA9ICd1c2VyLWdyYWQtJyArIHBsYW5ldC5ncmFkaWVudFVJRDtcblxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmRlZnNDb250YWluZXIpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5zdmdOUywnZGVmcycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQodGhpcy5kZWZzQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGdyYWRpZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMuc3ZnTlMsICdsaW5lYXJHcmFkaWVudCcpO1xuICAgICAgICAgICAgICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsIGlkKTtcblxuICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gY2FsY3VsYXRlIHgxLCB4MiwgeTEgYW5kIHkyXG5cbiAgICAgICAgICAgICAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDEnLCAnMCUnKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTEnLCAnMCUnKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDInLCAnMCUnKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTInLCAnMTAwJScpO1xuICAgICAgICAgICAgICAgIGdyYWRpZW50LnNldEF0dHJpYnV0ZU5TKG51bGwsICdzcHJlYWRNZXRob2QnLCAncGFkJyk7XG4gICAgICAgICAgICAgICAgZ3JhZGllbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2dyYWRpZW50VW5pdHMnLCAnb2JqZWN0Qm91bmRpbmdCb3gnKTtcblxuICAgICAgICAgICAgICAgIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMuc3ZnTlMsICdzdG9wJyk7XG4gICAgICAgICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ29mZnNldCcsICcwJScpO1xuICAgICAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZU5TKG51bGwsICdzdG9wLWNvbG9yJywgY29sb3IxKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKGdyYWRpZW50KS5hcHBlbmQoY2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5zdmdOUywgJ3N0b3AnKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnb2Zmc2V0JywgJzEwMCUnKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3RvcC1jb2xvcicsIGNvbG9yMik7XG5cbiAgICAgICAgICAgICAgICAkKGdyYWRpZW50KS5hcHBlbmQoY2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzLmRlZnNDb250YWluZXIpLmFwcGVuZChncmFkaWVudCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FudmFzIDoge1xuICAgICAgICAgICAgaW5pdCA6IGZ1bmN0aW9uKCBzZWxlY3RvciApe1xuICAgICAgICAgICAgICAgIHZhciBjYW52YXMsIGNvbnRhaW5lciA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gY29udGFpbmVyLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBjb250YWluZXIuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJbnRlcm5ldCBFeHBsb2RlciBkb2Vzbid0IHN1cHBvcnQgZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgICAgICAgICAgIC8vIHNvIGxldCdzIHNldCBpdCBpZiBpdCdzIG5vdCBhbHJlYWR5IHNldC5cbiAgICAgICAgICAgICAgICB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMuY2FudmFzKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQgKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYod2luZG93LmRldmljZVBpeGVsUmF0aW8gIT09IDEpe1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnNjYWxlKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gXCJjYW52YXNcIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnBlbiA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMucGVuLmV4dGVuZCA9IHBsYW5ldC5leHRlbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW4uZXh0ZW5kKHBsYW5ldC5kZWZhdWx0UGVuKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U3VwcG9ydGVkTWV0aG9kcyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpc1ZNTFN1cHBvcnRlZCl7XG4gICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKFwidm1sXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpc1NWR1N1cHBvcnRlZCl7XG4gICAgICAgICAgICAgICAgbWV0aG9kcy5wdXNoKFwic3ZnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGlzQ2FudmFzU3VwcG9ydGVkKXtcbiAgICAgICAgICAgICAgICBtZXRob2RzLnB1c2goXCJjYW52YXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RzO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcGxhbmV0LnZtbC5pbml0LnByb3RvdHlwZSA9IHBsYW5ldC52bWw7XG4gICAgcGxhbmV0LnN2Zy5pbml0LnByb3RvdHlwZSA9IHBsYW5ldC5zdmc7XG4gICAgcGxhbmV0LmNhbnZhcy5pbml0LnByb3RvdHlwZSA9IHBsYW5ldC5jYW52YXM7XG4gICAgXG4gICAgLy8gaG9vayBleHRlbmQgaW50byB0aGUgdmFyaW91cyBwcm90b3R5cGVzXG4gICAgcGxhbmV0LnN2Zy5leHRlbmQgPSBwbGFuZXQuY2FudmFzLmV4dGVuZCA9IHBsYW5ldC52bWwuZXh0ZW5kID0gcGxhbmV0LmV4dGVuZDsgICBcblxuICAgIHZhciBzZXREcmF3QXR0cmlidXRlcyA9IHtcbiAgICAgICAgc2V0RHJhd0F0dHJpYnV0ZXMgOiBmdW5jdGlvbiggb2JqICl7XG5cbiAgICAgICAgICAgIHRoaXMucGVuLmV4dGVuZCggb2JqICk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBwbGFuZXQudm1sLmV4dGVuZChzZXREcmF3QXR0cmlidXRlcyk7XG4gICAgcGxhbmV0LnN2Zy5leHRlbmQoc2V0RHJhd0F0dHJpYnV0ZXMpO1xuICAgIHBsYW5ldC5jYW52YXMuZXh0ZW5kKHNldERyYXdBdHRyaWJ1dGVzKTsvKiBsaW5lLmpzICovXG5cbiAgLyogbGluZS5qcyAqL1xuXG4gICAgLy8gdXNhZ2U6IHBsYW5ldE9iamVjdC5saW5lKHt4MSA6IG51bWJlciwgeTEgOiBudW1iZXIsIHgyIDogbnVtYmVyLCB5MiA6IG51bWJlcn0pO1xuXG4gICAgdmFyIGxpbmUgPSB7XG4gICAgXG4gICAgICAgIGxpbmUgOiBmdW5jdGlvbiggb2JqICl7XG4gICAgICAgICAgICAvLyBCYXNpY2FsbHkgYSBsaW5lIGlzIHZlcnkgc2hvcnQgc3Ryb2tlZCBwYXRoLCBtYWtpbmcgdGhpcyBpcyBhIHNob3J0Y3V0IHRvIFBhdGguXG4gICAgICAgICAgICB0aGlzLnBhdGgoe1xuICAgICAgICAgICAgICAgIHBvaW50cyA6IFtcbiAgICAgICAgICAgICAgICAgICAge3ggOiAob2JqLngxICsgMC41KSwgeSA6IChvYmoueTEgKyAwLjUpfSxcbiAgICAgICAgICAgICAgICAgICAge3ggOiAob2JqLngyICsgMC41KSwgeSA6IChvYmoueTIgKyAwLjUpfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGNsb3NlIDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgXG4gICAgfTtcblxuICAgIHBsYW5ldC52bWwuZXh0ZW5kKGxpbmUpO1xuICAgIHBsYW5ldC5zdmcuZXh0ZW5kKGxpbmUpO1xuICAgIHBsYW5ldC5jYW52YXMuZXh0ZW5kKGxpbmUpOy8qXG4gICAgcGF0aC5qc1xuICAgIFxuICAgIHVzYWdlOiBwbGFuZXRPYmoucGF0aCh7c3RhcnR4IDogbnVtYmVyLCBzdGFydHkgOiBudW1iZXIsIHBvaW50cyA6IFsge3ggOiBudW1iZXIsIHkgOiBudW1iZXJ9Li4uIF19KVxuKi9cblxuICAgIFxuICAgIFxuICAgIFxuICAgIHBsYW5ldC52bWwuZXh0ZW5kKHtcbiAgICBcbiAgICAgICAgcGF0aCA6IGZ1bmN0aW9uKCBvYmogKXtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBUaGlzIGlzIHdoZXJlIGl0IHN0YXJ0cyB0byBnZXQgZm9va2luJyBoYXJkLlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcGF0aCA9IFwiXCIsIHdpZHRoID0gdGhpcy53aWR0aCwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQsIGksIGlsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndjpzaGFwZScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKHZFbCkuYXR0cignc3R5bGUnLCAncG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOicgKyB3aWR0aCArICdweDsgaGVpZ2h0OiAnICsgaGVpZ2h0ICsgJ3B4OycgKTtcbiAgICAgICAgICAgICQodkVsKS5hdHRyKCdjb29yZG9yaWdpbicsICcwIDAnKTtcbiAgICAgICAgICAgICQodkVsKS5hdHRyKCdjb29yZHNpemUnLCB3aWR0aCArICcgJyArIGhlaWdodCk7XG5cbiAgICAgICAgICAgIHBhdGggPSAnbSAnK01hdGguZmxvb3Iob2JqLnBvaW50c1swXS54KSsnLCcrTWF0aC5mbG9vcihvYmoucG9pbnRzWzBdLnkpKycgJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGkgPSAxLCBpbCA9IG9iai5wb2ludHMubGVuZ3RoOyBpIDwgaWwgOyBpKyspe1xuICAgICAgICAgICAgICAgIHBhdGggKz0gJ2wgJytNYXRoLmZsb29yKG9iai5wb2ludHNbaV0ueCkrJywnK01hdGguZmxvb3Iob2JqLnBvaW50c1tpXS55KSArICcgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdkVsLnNldEF0dHJpYnV0ZSgnc3Ryb2tlY29sb3InLCB0aGlzLnBlbi5zdHJva2VDb2xvcik7XG4gICAgICAgICAgICB2RWwuc2V0QXR0cmlidXRlKCdzdHJva2V3ZWlnaHQnLCB0aGlzLnBlbi5zdHJva2VXaWR0aCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMucGVuLmZpbGxUeXBlICE9PSBcIm5vbmVcIiB8fCBvYmouY2xvc2U9PT10cnVlKXtcblxuICAgICAgICAgICAgICAgIHBhdGggKz0gJyB4IGUnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImZpbGxcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICQodkVsKS5hdHRyKCdmaWxsY29sb3InLCB0aGlzLnBlbi5maWxsQ29sb3IpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBlbi5maWxsVHlwZSA9PT0gXCJncmFkaWVudFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh2RWwpLmF0dHIoJ2ZpbGxjb2xvcicsIHRoaXMucGVuLmdyYWRpZW50Q29sb3IxKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Y6ZmlsbCcpO1xuICAgICAgICAgICAgICAgICAgICAkKGZpbGwpLmF0dHIoJ3R5cGUnLCAnZ3JhZGllbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgJChmaWxsKS5hdHRyKCdjb2xvcjInLCB0aGlzLnBlbi5ncmFkaWVudENvbG9yMik7XG4gICAgICAgICAgICAgICAgICAgICQoZmlsbCkuYXR0cignbWV0aG9kJywgJ2xpbmVhciBzaWdtYScpO1xuICAgICAgICAgICAgICAgICAgICAkKGZpbGwpLmF0dHIoJ2FuZ2xlJywgJzE4MCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICQodkVsKS5hcHBlbmQoZmlsbCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2RWwuc2V0QXR0cmlidXRlKCdmaWxsZWQnLCAnRmFsc2UnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2RWwuc2V0QXR0cmlidXRlKCdwYXRoJywgcGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZCh2RWwpO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICBcbiAgICB9KTtcblxuICAgICAgICBwbGFuZXQuc3ZnLmV4dGVuZCh7XG4gICAgXG4gICAgICAgIHBhdGggOiBmdW5jdGlvbiggb2JqICl7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIGQgPSBcIk0gXCIrb2JqLnBvaW50c1swXS54K1wiIFwiK29iai5wb2ludHNbMF0ueStcIiBcIiwgaSwgaWw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcihpID0gMSwgaWwgPSBvYmoucG9pbnRzLmxlbmd0aDsgaSA8IGlsIDsgaSsrKXtcbiAgICAgICAgICAgICAgICBkICs9IFwiTFwiK29iai5wb2ludHNbaV0ueCtcIiBcIitvYmoucG9pbnRzW2ldLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzaGFwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLnN2Z05TLCBcInBhdGhcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucGVuLmZpbGxUeXBlICE9PSBcIm5vbmVcIiB8fCBvYmouY2xvc2U9PT10cnVlKXtcbiAgICAgICAgICAgICAgICBkICs9IFwiWlwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImZpbGxcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiZmlsbFwiLCB0aGlzLnBlbi5maWxsQ29sb3IpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBlbi5maWxsVHlwZSA9PT0gXCJncmFkaWVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkSWQgPSB0aGlzLmNyZWF0ZUdyYWRpZW50KHRoaXMucGVuLmdyYWRpZW50Q29sb3IxLCB0aGlzLnBlbi5ncmFkaWVudENvbG9yMik7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiZmlsbFwiLCBcInVybCgjXCIgKyBncmFkSWQgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaGFwZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImZpbGxcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNoYXBlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwic3Ryb2tlXCIsIHRoaXMucGVuLnN0cm9rZUNvbG9yKTtcbiAgICAgICAgICAgIHNoYXBlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwic3Ryb2tlLXdpZHRoXCIsIHRoaXMucGVuLnN0cm9rZVdpZHRoICsgXCJweFwiKTsgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNoYXBlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiZFwiLCBkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHNoYXBlKTsgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcGxhbmV0LmNhbnZhcy5leHRlbmQoe1xuICAgIFxuICAgICAgICBwYXRoIDogZnVuY3Rpb24oIG9iaiApe1xuICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmJlZ2luUGF0aCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucGVuLmZpbGxUeXBlICE9PSAnbm9uZScpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbGxTdHlsZSA9IHRoaXMucGVuLmZpbGxDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5wZW4uc3Ryb2tlVHlwZSAhPT0gXCJub25lXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmxpbmVXaWR0aCA9ICh0aGlzLnBlbi5zdHJva2VXaWR0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3Ryb2tlU3R5bGUgPSB0aGlzLnBlbi5zdHJva2VDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5saW5lQ2FwID0gJ3JvdW5kJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5tb3ZlVG8ob2JqLnBvaW50c1swXS54ICArIDAuNSwgb2JqLnBvaW50c1swXS55ICsgMC41KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGkgPSAxLCBpbCA9IG9iai5wb2ludHMubGVuZ3RoOyBpIDwgaWwgOyBpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmxpbmVUbyhvYmoucG9pbnRzW2ldLnggKyAwLjUsIG9iai5wb2ludHNbaV0ueSArIDAuNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG9iai5jbG9zZSB8fCB0aGlzLnBlbi5maWxsVHlwZSAhPT0gJ25vbmUnKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5saW5lVG8ob2JqLnBvaW50c1swXS54ICsgMC41LCBvYmoucG9pbnRzWzBdLnkgKyAwLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLnBlbi5maWxsVHlwZSA9PT0gXCJmaWxsXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5wZW4uc3Ryb2tlVHlwZSAhPT0gXCJub25lXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0cm9rZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0pOyAvKiBib3guanMgKi9cblxucGxhbmV0LnZtbC5leHRlbmQoe1xuXG4gICAgYm94OiBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICAgdmFyIHBhdGggPSBcIlwiLCBweCA9IFtdLCBweSA9IFtdLCBwLCB2RWwsIHdpZHRoID0gdGhpcy53aWR0aCwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQsIGksIGlsO1xuXG4gICAgICAgIHZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Y6c2hhcGUnKTtcblxuICAgICAgICAkKHZFbCkuYXR0cignc3R5bGUnLCAncG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOicgKyB3aWR0aCArICdweDsgaGVpZ2h0OiAnICsgaGVpZ2h0ICsgJ3B4OycpO1xuICAgICAgICAkKHZFbCkuYXR0cignY29vcmRvcmlnaW4nLCAnMCAwJyk7XG4gICAgICAgICQodkVsKS5hdHRyKCdjb29yZHNpemUnLCB3aWR0aCArICcgJyArIGhlaWdodCk7XG4gICAgICAgIC8vc3R5bGUgPSAnc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6JyArIHdpZHRoICsgJ3B4OyBoZWlnaHQ6ICcgKyBoZWlnaHQgKyAncHg7XCInO1xuXG4gICAgICAgIHB4WzBdID0gb2JqLnBvc2l0aW9uLng7XG4gICAgICAgIHB4WzNdID0gcHhbMF0gKyBvYmouc2l6ZS53O1xuXG4gICAgICAgIHB5WzBdID0gb2JqLnBvc2l0aW9uLnk7XG4gICAgICAgIHB5WzNdID0gcHlbMF0gKyBvYmouc2l6ZS5oO1xuXG4gICAgICAgIGlmIChvYmouY29ybmVyUmFkaXVzKSB7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBvYmouY29ybmVyUmFkaXVzPT09J251bWJlcicpe1xuXG4gICAgICAgICAgICAgICAgb2JqLmNvcm5lclJhZGl1cyA9IFtvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzXTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9weFsxXSA9IHB4WzBdICsgb2JqLmNvcm5lclJhZGl1cztcbiAgICAgICAgICAgLy8gcHhbMl0gPSBweFszXSAtIG9iai5jb3JuZXJSYWRpdXM7XG4gICAgICAgICAgICAvL3B5WzFdID0gcHlbMF0gKyBvYmouY29ybmVyUmFkaXVzO1xuICAgICAgICAgICAvLyBweVsyXSA9IHB5WzNdIC0gb2JqLmNvcm5lclJhZGl1cztcblxuICAgICAgICAgICAgcGF0aCArPSBcIm0gXCIgKyAocHhbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdKSArIFwiIFwiICsgcHlbMF0gKyBcIiBcIjtcbiAgICAgICAgICAgIHBhdGggKz0gXCJsIFwiICsgKHB4WzNdIC0gb2JqLmNvcm5lclJhZGl1c1sxXSkgKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG4gICAgICAgICAgICBwYXRoICs9IFwicXggXCIgKyBweFszXSArIFwiIFwiICsgKHB5WzBdICsgb2JqLmNvcm5lclJhZGl1c1sxXSkgKyBcIiBcIjtcbiAgICAgICAgICAgIHBhdGggKz0gXCJsIFwiICsgcHhbM10gKyBcIiBcIiArIChweVszXSAtIG9iai5jb3JuZXJSYWRpdXNbMl0pICArIFwiIFwiO1xuICAgICAgICAgICAgcGF0aCArPSBcInF5IFwiICsgKHB4WzNdIC0gb2JqLmNvcm5lclJhZGl1c1syXSkgKyBcIiBcIiArIHB5WzNdICsgXCIgXCI7XG4gICAgICAgICAgICBwYXRoICs9IFwibCBcIiArIChweFswXSArIG9iai5jb3JuZXJSYWRpdXNbM10pICsgXCIgXCIgKyBweVszXSArIFwiIFwiO1xuICAgICAgICAgICAgcGF0aCArPSBcInF4IFwiICsgcHhbMF0gKyBcIiBcIiArIChweVszXSAtIG9iai5jb3JuZXJSYWRpdXNbM10pICsgXCIgXCI7XG4gICAgICAgICAgICBwYXRoICs9IFwibCBcIiArIHB4WzBdICsgXCIgXCIgKyAocHlbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdKSArIFwiIFwiO1xuICAgICAgICAgICAgcGF0aCArPSBcInF5IFwiICsgKHB4WzBdICsgb2JqLmNvcm5lclJhZGl1c1swXSkgKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcGF0aCArPSBcIm0gXCIgKyBweFswXSArIFwiIFwiICsgcHlbMF0gKyBcIiBcIjtcbiAgICAgICAgICAgIHBhdGggKz0gXCJsIFwiICsgcHhbM10gKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG4gICAgICAgICAgICBwYXRoICs9IFwibCBcIiArIHB4WzNdICsgXCIgXCIgKyBweVszXSArIFwiIFwiO1xuICAgICAgICAgICAgcGF0aCArPSBcImwgXCIgKyBweFswXSArIFwiIFwiICsgcHlbM10gKyBcIiBcIjtcbiAgICAgICAgICAgIHBhdGggKz0gXCJsIFwiICsgcHhbMF0gKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG5cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZih0aGlzLnBlbi5zdHJva2VUeXBlPT09J25vbmUnKXtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3Ryb2tlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndjpzdHJva2UnKTtcbiAgICAgICAgICAgICAgICAkKHN0cm9rZSkuYXR0cignb24nLCAnRmFsc2UnKTtcblxuICAgICAgICAgICAgICAgICQodkVsKS5hcHBlbmQoc3Ryb2tlKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICQodkVsKS5hdHRyKCdzdHJva2V3ZWlnaHQnLCB0aGlzLnBlbi5zdHJva2VXaWR0aCk7XG4gICAgICAgICAgICAkKHZFbCkuYXR0cignc3Ryb2tlY29sb3InLCB0aGlzLnBlbi5zdHJva2VDb2xvcik7XG5cblxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoY2xvc2UgPT09IHRydWUgfHwgdGhpcy5wZW4uZmlsbENvbG9yICE9PSBcIm5vbmVcIikge1xuXG4gICAgICAgICAgICBwYXRoICs9ICcgeCBlJztcblxuICAgICAgICAgICAgaWYgKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImZpbGxcIikge1xuXG4gICAgICAgICAgICAgICAgJCh2RWwpLmF0dHIoJ2ZpbGxjb2xvcicsIHRoaXMucGVuLmZpbGxDb2xvcik7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZW4uZmlsbFR5cGUgPT09IFwiZ3JhZGllbnRcIikge1xuXG4gICAgICAgICAgICAgICAgJCh2RWwpLmF0dHIoJ2ZpbGxjb2xvcicsIHRoaXMucGVuLmdyYWRpZW50Q29sb3IxKTtcblxuICAgICAgICAgICAgICAgIHZhciBmaWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndjpmaWxsJyk7XG4gICAgICAgICAgICAgICAgJChmaWxsKS5hdHRyKCd0eXBlJywgJ2dyYWRpZW50Jyk7XG4gICAgICAgICAgICAgICAgJChmaWxsKS5hdHRyKCdjb2xvcjInLCB0aGlzLnBlbi5ncmFkaWVudENvbG9yMik7XG4gICAgICAgICAgICAgICAgJChmaWxsKS5hdHRyKCdtZXRob2QnLCAnbGluZWFyIHNpZ21hJyk7XG4gICAgICAgICAgICAgICAgJChmaWxsKS5hdHRyKCdhbmdsZScsICcxODAnKTtcblxuICAgICAgICAgICAgICAgICQodkVsKS5hcHBlbmQoZmlsbCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IFxuXG4gICAgICAgICQodkVsKS5hdHRyKCdwYXRoJywgcGF0aCk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKHZFbCk7XG5cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufSk7XG5cbiAgICBwbGFuZXQuc3ZnLmV4dGVuZCh7XG5cbiAgICAgICAgYm94OiBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICAgICAgIHZhciBkID0gXCJcIiwgcHggPSBbXSwgcHkgPSBbXSwgcDtcblxuICAgICAgICAgICAgcHhbMF0gPSBvYmoucG9zaXRpb24ueDtcbiAgICAgICAgICAgIHB4WzNdID0gcHhbMF0gKyBvYmouc2l6ZS53O1xuXG4gICAgICAgICAgICBweVswXSA9IG9iai5wb3NpdGlvbi55O1xuICAgICAgICAgICAgcHlbM10gPSBweVswXSArIG9iai5zaXplLmg7XG5cbiAgICAgICAgICAgIGlmIChvYmouY29ybmVyUmFkaXVzKSB7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2Ygb2JqLmNvcm5lclJhZGl1cz09PSdudW1iZXInKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBvYmouY29ybmVyUmFkaXVzID0gW29iai5jb3JuZXJSYWRpdXMsIG9iai5jb3JuZXJSYWRpdXMsIG9iai5jb3JuZXJSYWRpdXMsIG9iai5jb3JuZXJSYWRpdXNdO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZCArPSBcIk0gXCIgKyAocHhbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdKSArIFwiIFwiICsgcHlbMF0gKyBcIiBcIjtcblxuICAgICAgICAgICAgICAgIGQgKz0gXCJMIFwiICsgKHB4WzNdIC0gb2JqLmNvcm5lclJhZGl1c1sxXSkgKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgZCArPSBcIkEgXCIgKyBvYmouY29ybmVyUmFkaXVzWzFdICsgXCIsXCIgKyBvYmouY29ybmVyUmFkaXVzWzFdICsgXCIgOTAgMCwxIFwiICsgcHhbM10gKyBcIixcIiArIChweVswXSArIG9iai5jb3JuZXJSYWRpdXNbMV0pO1xuXG4gICAgICAgICAgICAgICAgZCArPSBcIkwgXCIgKyBweFszXSArIFwiIFwiICsgKHB5WzNdIC0gb2JqLmNvcm5lclJhZGl1c1syXSk7XG5cbiAgICAgICAgICAgICAgICBkICs9IFwiQSBcIiArIG9iai5jb3JuZXJSYWRpdXNbMl0gKyBcIixcIiArIG9iai5jb3JuZXJSYWRpdXNbMl0gKyBcIiA5MCAwLDEgXCIgKyAocHhbM10gLSBvYmouY29ybmVyUmFkaXVzWzJdKSArIFwiLFwiICsgcHlbM107XG5cbiAgICAgICAgICAgICAgICBkICs9IFwiTCBcIiArIChweFswXSArIG9iai5jb3JuZXJSYWRpdXNbM10pICsgXCIgXCIgKyBweVszXTtcbiAgICAgICAgICAgICAgICBkICs9IFwiQSBcIiArIG9iai5jb3JuZXJSYWRpdXNbM10gKyBcIixcIiArIG9iai5jb3JuZXJSYWRpdXNbM10gKyBcIiA5MCAwLDEgXCIgKyBweFswXSArIFwiLFwiICsgKHB5WzNdIC0gb2JqLmNvcm5lclJhZGl1c1szXSk7XG5cbiAgICAgICAgICAgICAgICBkICs9IFwiTCBcIiArIHB4WzBdICsgXCIgXCIgKyAocHlbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdKTtcbiAgICAgICAgICAgICAgICBkICs9IFwiQSBcIiArIG9iai5jb3JuZXJSYWRpdXNbMF0gKyBcIixcIiArIG9iai5jb3JuZXJSYWRpdXNbMF0gKyBcIiA5MCAwLDEgXCIgKyAocHhbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdKSArIFwiLFwiICsgcHlbMF07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBkICs9IFwiTSBcIiArIHB4WzBdICsgXCIgXCIgKyBweVswXSArIFwiIFwiO1xuICAgICAgICAgICAgICAgIGQgKz0gXCJMIFwiICsgcHhbM10gKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG4gICAgICAgICAgICAgICAgZCArPSBcIkwgXCIgKyBweFszXSArIFwiIFwiICsgcHlbM10gKyBcIiBcIjtcbiAgICAgICAgICAgICAgICBkICs9IFwiTCBcIiArIHB4WzBdICsgXCIgXCIgKyBweVszXSArIFwiIFwiO1xuICAgICAgICAgICAgICAgIGQgKz0gXCJMIFwiICsgcHhbMF0gKyBcIiBcIiArIHB5WzBdICsgXCIgXCI7XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModGhpcy5zdmdOUywgXCJwYXRoXCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wZW4uZmlsbFR5cGUgIT09IFwibm9uZVwiIHx8IG9iai5jbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGQgKz0gXCJaXCI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wZW4uZmlsbFR5cGUgPT09IFwiZmlsbFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJmaWxsXCIsIHRoaXMucGVuLmZpbGxDb2xvcik7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImdyYWRpZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRJZCA9IHRoaXMuY3JlYXRlR3JhZGllbnQodGhpcy5wZW4uZ3JhZGllbnRDb2xvcjEsIHRoaXMucGVuLmdyYWRpZW50Q29sb3IyKTtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJmaWxsXCIsIFwidXJsKCNcIiArIGdyYWRJZCArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBzaGFwZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImZpbGxcIiwgXCJub25lXCIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGFwZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInN0cm9rZVwiLCB0aGlzLnBlbi5zdHJva2VDb2xvcik7XG4gICAgICAgICAgICBzaGFwZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInN0cm9rZS13aWR0aFwiLCAodGhpcy5wZW4uc3Ryb2tlV2lkdGggKyAxKSArIFwicHhcIik7XG5cblxuICAgICAgICAgICAgc2hhcGUuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJkXCIsIGQpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoc2hhcGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHBsYW5ldC5jYW52YXMuZXh0ZW5kKHtcbiAgICBcbiAgICAgICAgYm94IDogZnVuY3Rpb24oIG9iaiApe1xuXG4gICAgICAgICAgICB2YXIgcHggPSBbXSwgcHkgPSBbXSwgcSA9IChNYXRoLlBJIC8gMik7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmJlZ2luUGF0aCgpO1xuXG4gICAgICAgICAgICBweFswXSA9IG9iai5wb3NpdGlvbi54ICsgMC41O1xuICAgICAgICAgICAgcHhbM10gPSBweFswXSArIG9iai5zaXplLnc7XG4gICAgXG4gICAgICAgICAgICBweVswXSA9IG9iai5wb3NpdGlvbi55ICsgMC41O1xuICAgICAgICAgICAgcHlbM10gPSBweVswXSArIG9iai5zaXplLmggKyAwLjU7XG4gICAgXG4gICAgICAgICAgICBpZiAob2JqLmNvcm5lclJhZGl1cykge1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIG9iai5jb3JuZXJSYWRpdXM9PT0nbnVtYmVyJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqLmNvcm5lclJhZGl1cyA9IFtvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzLCBvYmouY29ybmVyUmFkaXVzXTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5tb3ZlVG8ocHhbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdLCBweVswXSk7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXJjKHB4WzNdIC0gb2JqLmNvcm5lclJhZGl1c1sxXSwgcHlbMF0gKyBvYmouY29ybmVyUmFkaXVzWzFdLCBvYmouY29ybmVyUmFkaXVzWzFdLCBxICogMywgcSAqIDQsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFyYyhweFszXSAtIG9iai5jb3JuZXJSYWRpdXNbMl0sIHB5WzNdIC0gb2JqLmNvcm5lclJhZGl1c1syXSwgb2JqLmNvcm5lclJhZGl1c1syXSwgcSAqIDQsIHEgKiA1LCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcmMocHhbMF0gKyBvYmouY29ybmVyUmFkaXVzWzNdLCBweVszXSAtIG9iai5jb3JuZXJSYWRpdXNbM10sIG9iai5jb3JuZXJSYWRpdXNbM10sIHEgKiA1LCBxICogNiwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXJjKHB4WzBdICsgb2JqLmNvcm5lclJhZGl1c1swXSwgcHlbMF0gKyBvYmouY29ybmVyUmFkaXVzWzBdLCBvYmouY29ybmVyUmFkaXVzWzBdLCBxICogNiwgcSAqIDcsIDApO1xuXG5cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImZpbGxcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmlsbFN0eWxlID0gdGhpcy5wZW4uZmlsbENvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGVuLmZpbGxUeXBlID09PSBcImdyYWRpZW50XCIpe1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgZ3JhZCA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIG9iai5wb3NpdGlvbi55LCAwLCBvYmoucG9zaXRpb24ueSArIG9iai5zaXplLmgpO1xuICAgICAgICAgICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsIHRoaXMucGVuLmdyYWRpZW50Q29sb3IxKTtcbiAgICAgICAgICAgICAgICBncmFkLmFkZENvbG9yU3RvcCgxLCB0aGlzLnBlbi5ncmFkaWVudENvbG9yMik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZmlsbFN0eWxlID0gZ3JhZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maWxsKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucGVuLnN0cm9rZVR5cGUgIT09IFwibm9uZVwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5saW5lV2lkdGggPSAodGhpcy5wZW4uc3Ryb2tlV2lkdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0cm9rZVN0eWxlID0gdGhpcy5wZW4uc3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG4vKiBvdXRyby5qcyAqL1xuXG4gICAgcGxhbmV0LnZtbC5leHRlbmQoe1xuICAgICAgICBcbiAgICAgICAgY2xlYXIgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcGxhbmV0LnN2Zy5leHRlbmQoe1xuICAgICAgICBcbiAgICAgICAgY2xlYXIgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG5cbiAgICBwbGFuZXQuY2FudmFzLmV4dGVuZCh7XG4gICAgICAgIFxuICAgICAgICBjbGVhciA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgLy92YXIgdyA9ICQodGhpcy5jYW52YXMpLmF0dHIoJ3dpZHRoJyk7XG4gICAgICAgICAgICAvLyQodGhpcy5jYW52YXMpLmF0dHIoJ3dpZHRoJywgMCkuYXR0cignd2lkdGgnLCB3KS5jc3MoJ2JhY2tncm91bmQnLCAnbm9uZScpO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBsYW5ldDtcblxuXG5cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKlxuKiBGaWxlbmFtZTogICAgIEVkZ2UuanNcbiogRGVzY3JpcHRpb246ICBGb3IgY3JlYXRpbmcgYW5kIHByb2Nlc3NpbmcgZWRnZXNcbiogICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL3ZlY3Rvci1wcm9jZXNzaW5nLWFuZC1ib3VuZGluZy1ib3guanMnKS5Cb3VuZGluZ0JveDtcbnZhciBWZWN0b3IyRCA9IHJlcXVpcmUoJy4vdmVjdG9yLXByb2Nlc3NpbmctYW5kLWJvdW5kaW5nLWJveC5qcycpLlZlY3RvcjJEO1xuXG5cbnZhciBQb2ludCA9IHJlcXVpcmUoJy4vcG9pbnQuanMnKTtcbnZhciBMYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwuanMnKTtcblxuZnVuY3Rpb24gRWRnZSAoc3RhcnQsIGZpbmlzaCl7XG5cbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5maW5pc2ggPSBmaW5pc2g7XG5cbiAgICByZXR1cm4gdGhpcztcblxufVxuXG5FZGdlLnByb3RvdHlwZSA9IHtcblxuICAgIGRyYXcgOiBmdW5jdGlvbiggcGxhbmV0T2JqLCBzY2FsZSApe1xuXG4gICAgICAgIGlmICghc2NhbGUpe1xuICAgICAgICAgICAgc2NhbGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhbmV0T2JqLnBhdGgoe1xuICAgICAgICAgICAgcG9pbnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB4IDogdGhpcy5zdGFydC54ICogc2NhbGUsIFxuICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLnN0YXJ0LnkgKiBzY2FsZVxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeCA6IHRoaXMuZmluaXNoLnggKiBzY2FsZSwgXG4gICAgICAgICAgICAgICAgICAgIHk6IHRoaXMuZmluaXNoLnkgKiBzY2FsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gRWRnZUdyb3VwICh1aWQpe1xuXG4gICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmVkZ2VzID0gW107IC8vIGFycmF5IG9mIGVkZ2VzLlxuICAgIHRoaXMubW9kZSA9IFwibm9uZVwiO1xuICAgIHRoaXMudWlkQ2FjaGUgPSB7fTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICByZXR1cm4gdGhpcztcblxufVxuXG5FZGdlR3JvdXAucHJvdG90eXBlID0ge1xuXG4gICAgY29tcGxldGUgOiBmdW5jdGlvbigpe1xuXG5cbiAgICAgICAgdmFyIGluZGV4ID0gMCwgcGFyZW50LCBjaGlsZCwgZG90UHJvZHVjdCwgY29ubmVjdGlvblR5cGVzID0ge30sIGN1cnJlbnRDaGlsZCwgbW9kZXMgPSAwLCB4LCB5O1xuICAgICAgICAgICAgLy8gY29tcGFyZSB0aGUgc291cmNlIGF0LCBhdHRyaWJ1dGVzIGZvciBjaGlsZHJlblswXSBhbmQgY2hpbGRyZW5bMV0uIElmIHRoZXkncmUgdGhlIHNhbWUsIHRoZW4gaXQncyB0aGUgc291cmNlIFxuICAgICAgICAgICAgLy8gX3RoaXMncyB0aGUgbWF0Y2hlZCBwb2ludFxuICAgICAgICBpZiAoKCF0aGlzLmNoaWxkWzFdKSB8fCAodGhpcy5jb21wYXJlKHRoaXMuY2hpbGRbMF0uc291cmNlLCB0aGlzLmNoaWxkWzFdLnNvdXJjZSkpICkge1xuXG4gICAgICAgICAgICBwYXJlbnQgPSBcInNvdXJjZVwiO1xuICAgICAgICAgICAgY2hpbGQgPSBcInRhcmdldFwiO1xuXG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBhcmVudCA9IFwidGFyZ2V0XCI7XG4gICAgICAgICAgICBjaGlsZCA9IFwic291cmNlXCI7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFyZW50ID0gdGhpcy5jaGlsZFswXVtwYXJlbnRdO1xuXG4gICAgICAgIGlmIChwYXJlbnQ9PT1cInRhcmdldFwiICYmICh0aGlzLmNoaWxkWzBdLnR5cGU9PT1cImRpcmVjdGlvbmFsXCIgfHwgdGhpcy5jaGlsZFswXS5sYWJlbCE9PVwiXCIgKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQubWV0YSA9IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA6IHRoaXMuY2hpbGRbMF0udHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiB0aGlzLmNoaWxkWzBdLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsR2VvbWV0cnkgOiB0aGlzLmNoaWxkWzBdLmxhYmVsR2VvbWV0cnkgfHwgbmV3IEJvdW5kaW5nQm94KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKGluZGV4IDwgdGhpcy5jaGlsZC5sZW5ndGgpe1xuXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2godGhpcy5jaGlsZFtpbmRleF1bY2hpbGRdKTtcblxuICAgICAgICAgICAgY3VycmVudENoaWxkID0gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtMV07XG5cbiAgICAgICAgICAgIC8vaWYgKGNoaWxkPT09XCJ0YXJnZXRcIiAmJiAodGhpcy5jaGlsZFtpbmRleF0udHlwZT09PVwiZGlyZWN0aW9uYWxcIiB8fCB0aGlzLmNoaWxkW2luZGV4XS5sYWJlbCE9PVwiXCIgKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjdXJyZW50Q2hpbGQubWV0YSA9IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlIDogKGNoaWxkPT09XCJ0YXJnZXRcIiA/IHRoaXMuY2hpbGRbaW5kZXhdLnR5cGUgOiBcIm5vbmVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IHRoaXMuY2hpbGRbaW5kZXhdLmxhYmVsLCAvLyB3ZSB0YWtlIHRoZSBsYWJlbCBmcm9tIHRoZSBlZGdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEdlb21ldHJ5IDogdGhpcy5jaGlsZFtpbmRleF0ubGFiZWxHZW9tZXRyeSB8fCBuZXcgQm91bmRpbmdCb3goKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vIHdoYXQgd2UncmUgZG9pbmcgaXMgZmlndXJpbmcgb3V0IHdoYXQgdHlwZSBvZiBjb25uZWN0aW9uIGl0IGlzLFxuICAgICAgICAgICAgLy8gYW5kIGFsc28gd2hldGhlciBhbGwgdGhlIGVkZ2VzIGFyZSBvZiB0aGUgc2FtZSBraW5kLiBcblxuICAgICAgICAgICAgLy8gVGhpcyBpcyBcblxuICAgICAgICAgICAgZG90UHJvZHVjdCA9IHRoaXMucGFyZW50LnBvaW50LmNvbXBhcmVEaXJlY3Rpb24odGhpcy5jaGlsZFtpbmRleF1bY2hpbGRdKTtcblxuICAgICAgICAgICAgaWYgKGRvdFByb2R1Y3Q9PT0xKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2hpbGQubW9kZSA9IFwiaGV1cmlzdGljXCI7XG5cbiAgICAgICAgICAgIH1lbHNlIGlmIChkb3RQcm9kdWN0PT09MCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY3VycmVudENoaWxkLm1vZGUgPSBcImludGVyc2VjdGluZ1wiO1xuXG4gICAgICAgICAgICB9ZWxzZSBpZiAoZG90UHJvZHVjdD09PS0xKXtcblxuICAgICAgICAgICAgICAgIHggPSBNYXRoLmFicyh0aGlzLnBhcmVudC5wb2ludC54IC0gY3VycmVudENoaWxkLnBvaW50LngpO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmFicyh0aGlzLnBhcmVudC5wb2ludC55IC0gY3VycmVudENoaWxkLnBvaW50LnkpO1xuXG4gICAgICAgICAgICAgICAgeCA9ICh4ICogY3VycmVudENoaWxkLnBvaW50LnZlY3Rvci54KTtcbiAgICAgICAgICAgICAgICB5ID0gKHkgKiBjdXJyZW50Q2hpbGQucG9pbnQudmVjdG9yLnkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHghPT0wICYmIChjdXJyZW50Q2hpbGQucG9pbnQueCArIHggIT09IHRoaXMucGFyZW50LnBvaW50LngpKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5tb2RlID0gXCJpbnZlcnNlLWNhc2NhZGVcIjtcblxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh5IT09IDAgJiYgKGN1cnJlbnRDaGlsZC5wb2ludC55ICsgeSAhPT0gdGhpcy5wYXJlbnQucG9pbnQueSkpe1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5tb2RlID0gXCJpbnZlcnNlLWNhc2NhZGVcIjtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5tb2RlID0gXCJjYXNjYWRpbmdcIjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlIT09Y3VycmVudENoaWxkLm1vZGUpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9IGN1cnJlbnRDaGlsZC5tb2RlO1xuICAgICAgICAgICAgICAgIG1vZGVzKys7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXgrKztcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGVzIT09MSl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubW9kZSA9IFwiY29tYmluZWRcIjtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLm1vZGU9PT1cImludGVyc2VjdGluZ1wiICYmIHRoaXMubW9kZSE9PVwidWx0aW1hdGUtZXZpbC1lZGdlLWdyb3VwLW9mLWRvb21cIil7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGU9XCJjb21iaW5lZC13aXRoLWludGVyc2VjdFwiO1xuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh0aGlzLmNoaWxkcmVuW2luZGV4XS5tb2RlPT09XCJpbnZlcnNlLWNhc2NhZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGU9XCJ1bHRpbWF0ZS1ldmlsLWVkZ2UtZ3JvdXAtb2YtZG9vbVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCBvdXQgaWYgd2UndmUgZ290IGFuIGVkZ2UgZ3JvdXAgb2YgdW5pZm9ybSBjb25uZWN0aW9uIHR5cGVzXG5cbiAgICAgICAgZGVsZXRlIHRoaXMuY2hpbGQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG4gICAgY29tcGFyZSA6IGZ1bmN0aW9uKGEsIGIpe1xuXG4gICAgICAgIGlmIChhLnBvaW50Lng9PT1iLnBvaW50Lngpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYS5wb2ludC55PT09Yi5wb2ludC55KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoYS52ZWN0b3IueD09PWIudmVjdG9yLngpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEudmVjdG9yLnk9PT1iLnZlY3Rvci55KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgXG5cbiAgICB9LFxuXG4gICAgYWRkQ2hpbGQgOiBmdW5jdGlvbiggc291cmNlLCBzb3VyY2VTaWRlLCB0YXJnZXQsIHRhcmdldFNpZGUsIHR5cGUsIGxhYmVsLCBsYWJlbEdlb21ldHJ5LCB1aWQpe1xuICAgICAgICBcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIXRoaXMudWlkQ2FjaGVbdWlkXSl7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZCA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZ2V0VmVjdG9yQW5kUG9pbnQgPSBmdW5jdGlvbihub2RlLCBkaXJlY3Rpb24pe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHZlY3RvciA9IGNvbnZlcnREaXJlY3Rpb25Ub1ZlY3RvciggZGlyZWN0aW9uICk7XG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gbm9kZS5nZXRDb25uZWN0b3JQb2ludCggdmVjdG9yICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yIDogdmVjdG9yLFxuICAgICAgICAgICAgICAgICAgICBwb2ludCA6IHBvaW50XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHMgPSBnZXRWZWN0b3JBbmRQb2ludChzb3VyY2UsIHNvdXJjZVNpZGUpO1xuICAgICAgICAgICAgdmFyIHQgPSBnZXRWZWN0b3JBbmRQb2ludCh0YXJnZXQsIHRhcmdldFNpZGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UgOiBzLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgOiB0LFxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBsYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxHZW9tZXRyeSA6IGxhYmVsR2VvbWV0cnlcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVpZENhY2hlW3VpZF0gPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBjaGVja0ZvckNvbGxpc2lvbnMgOiBmdW5jdGlvbihBQUJCLCBjYW5kaWRhdGVzKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGkgPSBjYW5kaWRhdGVzLmxlbmd0aCwgY29sbGlzaW9uID0gZmFsc2UsIGNvbGxpc2lvbnMgPSBbXSwgcmVzdWx0O1xuICAgICAgICAgICAgd2hpbGUoaS0tKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBBQUJCLnRlc3RGb3JDb2xsaXNpb24oY2FuZGlkYXRlc1tpXS5BQUJCKTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxpc2lvbnM7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlRWRnZXMgOiBmdW5jdGlvbiAoKXtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjcmVhdGVCb3VuZGluZ0JveCA9IGZ1bmN0aW9uKCApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBjcmVhdGVzIGEgYm91bmRpbmcgYm94IGFyb3VuZCB0aGUgdmFyaW91cyBwb2ludHMgaW4gdGhlIGVkZ2UgZ3JvdXAgKi9cbiAgICAgICAgICAgIC8qIHRoaXMgYm91bmRpbmcgYm94IGhlbHBzIGZpbHRlciBkb3duIHRoZSBsaXN0IG9mIG5vZGVzIHRvIGRvIGEgY29sbGlzaW9uIGRldGVjdGlvbiB0ZXN0IGFnYWluc3QgKi9cbiAgICAgICAgICAgIC8qIGJ5IHF1ZXJ5aW5nIHRoZSBxdWFkIHRyZWUgdXNpbmcgdGhpcyBib3ggKi9cblxuICAgICAgICAgICAgLyogSXQncyB0dWNrZWQgYXdheSBpbnNpZGUgYSBjbG9zdXJlICovXG5cbiAgICAgICAgICAgIHZhciBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZLCBpbmRleCA9IDAsIHBvaW50ID0gdGhpcy5wYXJlbnQucG9pbnQsIHZlY3RvciA9IHRoaXMucGFyZW50LnBvaW50LnZlY3RvcjsgXG5cblxuICAgICAgICAgICAgbWluWCA9IG1heFggPSBwb2ludC54O1xuICAgICAgICAgICAgbWluWSA9IG1heFkgPSBwb2ludC55O1xuXG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgKHBvaW50LnggKyAodmVjdG9yLnggKiAyMCkpKTtcbiAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCAocG9pbnQueSArICh2ZWN0b3IueSAqIDIwKSkpO1xuICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIChwb2ludC54ICsgKHZlY3Rvci54ICogMjApKSk7XG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgKHBvaW50LnkgKyAodmVjdG9yLnkgKiAyMCkpKTtcblxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCB0aGlzLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICBwb2ludCA9IHRoaXMuY2hpbGRyZW5baW5kZXhdLnBvaW50O1xuICAgICAgICAgICAgICAgIHZlY3RvciA9IHRoaXMuY2hpbGRyZW5baW5kZXhdLnZlY3RvcjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaGUgcG9pbnRzIHRoZW1zZWx2ZXMuLi5cbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgcG9pbnQueCk7XG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCBwb2ludC54KTtcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgcG9pbnQueSk7XG5cbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgKHBvaW50LnggKyAodmVjdG9yLnggKiAyMCkpKTtcbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgKHBvaW50LnkgKyAodmVjdG9yLnkgKiAyMCkpKTtcbiAgICAgICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgKHBvaW50LnggKyAodmVjdG9yLnggKiAyMCkpKTtcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgKHBvaW50LnkgKyAodmVjdG9yLnkgKiAyMCkpKTtcblxuICAgICAgICAgICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCb3VuZGluZ0JveCggbmV3IFZlY3RvcjJEKG1pblgsIG1pblkpLCBuZXcgVmVjdG9yMkQobWF4WCAtIG1pblgsIG1heFkgLSBtaW5ZKSApO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlc29sdmVFeHRlbnRQb3NpdGlvbiA9IGZ1bmN0aW9uKHBvc2l0aW9uLCB2ZWN0b3Ipe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodmVjdG9yIDwgMCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByZXNvbHZlRXh0ZW50U2l6ZSA9IGZ1bmN0aW9uKHBvc2l0aW9uLCB2ZWN0b3IsIHNpemUpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodmVjdG9yIDwgMCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuXG4gICAgICAgICAgICB9ZWxzZSBpZiAodmVjdG9yPT09MCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBzaXplIC0gcG9zaXRpb247XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0TmV3RXh0ZW50UG9zaXRpb24gPSAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc29sdmVQb3NpdGlvbiA9IGZ1bmN0aW9uKCBwb3NpdGlvbiwgcmVzb2x1dGlvbiwgdmVjdG9yKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlY3RvciA8IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gKyByZXNvbHV0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oIGV4dGVudEJveCwgY29sbGlzaW9uLCB2ZWN0b3IgKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHgsIHk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB4ID0gcmVzb2x2ZVBvc2l0aW9uKCBleHRlbnRCb3gueCwgY29sbGlzaW9uLnggLSAoY29sbGlzaW9uLmh3ICogMiksICh2ZWN0b3IueCAqIC0xKSApO1xuICAgICAgICAgICAgICAgICAgICB5ID0gcmVzb2x2ZVBvc2l0aW9uKCBleHRlbnRCb3gueSwgY29sbGlzaW9uLnksIHZlY3Rvci55ICk7ICBcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHgsIHkpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0oKSk7XG5cbiAgICAgICAgdmFyIGdldE5ld0V4dGVudFNpemUgPSAoZnVuY3Rpb24oICAgKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlc29sdmVTaXplID0gZnVuY3Rpb24oIHNpemUsIHJlc29sdXRpb24sIGNvbGxpc2lvblNpemUsIHZlY3Rvcil7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZWN0b3IgPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpemUgLSByZXNvbHV0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICh2ZWN0b3IgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdXRpb24gLSBjb2xsaXNpb25TaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggZXh0ZW50Qm94LCBjb2xsaXNpb24sIHZlY3RvciApe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgICAgICAgICAgeCA9IHJlc29sdmVTaXplKCAoZXh0ZW50Qm94Lmh3ICogMiksIGNvbGxpc2lvbi54LCAoY29sbGlzaW9uLmh3ICogMiksICh2ZWN0b3IueCAqIC0xKSk7IC8vIHdlIGZsaXAgdGhlIGhvcml6b250YWwgdmVjdG9yIGJlY2F1c2UgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjb2xsaXNpb24gcmVzdWx0IGlzIGludmVydGVkXG4gICAgICAgICAgICAgICAgeSA9IHJlc29sdmVTaXplKCAoZXh0ZW50Qm94LmhoICogMiksIGNvbGxpc2lvbi55LCAoY29sbGlzaW9uLmhoICogMiksIHZlY3Rvci55ICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh4LCB5KTtcblxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9KCkpO1xuXG4gICAgICAgIHZhciBleHRlbmRDb25uZWN0b3JUb0xpbWl0ID0gZnVuY3Rpb24gKCBwb2ludCwgY2FuZGlkYXRlcywgYWFiYiwgc2NvcGUgKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJlbGF0aXZlLCBleHRlbmRCb3gsIEIgPSBCb3VuZGluZ0JveCwgViA9IFZlY3RvcjJEO1xuXG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gcG9pbnQudmVjdG9yO1xuXG4gICAgICAgICAgICByZWxhdGl2ZSA9IHtcbiAgICAgICAgICAgICAgICB4IDogcG9pbnQueCAtIGFhYmIueCxcbiAgICAgICAgICAgICAgICB5IDogcG9pbnQueSAtIGFhYmIueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXh0ZW50Qm94ID0gbmV3IEIgKCBuZXcgViggXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFhYmIueCArIHJlc29sdmVFeHRlbnRQb3NpdGlvbihyZWxhdGl2ZS54LCB2ZWN0b3IueCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFhYmIueSArIHJlc29sdmVFeHRlbnRQb3NpdGlvbihyZWxhdGl2ZS55LCB2ZWN0b3IueSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFYoIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlRXh0ZW50U2l6ZShyZWxhdGl2ZS54LCB2ZWN0b3IueCwgKGFhYmIuaHcgKiAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVFeHRlbnRTaXplKHJlbGF0aXZlLnksIHZlY3Rvci55LCAoYWFiYi5oaCAqIDIpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb2xsaXNpb25SZXN1bHRzID0gc2NvcGUuY2hlY2tGb3JDb2xsaXNpb25zKGV4dGVudEJveCwgY2FuZGlkYXRlcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uUmVzdWx0cy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGogPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiwgbmV3U2l6ZSwgY2FuZGlkYXRlQSA9IGV4dGVudEJveCwgY2FuZGlkYXRlQjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGogPCBjb2xsaXNpb25SZXN1bHRzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IGdldE5ld0V4dGVudFBvc2l0aW9uKCBleHRlbnRCb3gsIGNvbGxpc2lvblJlc3VsdHNbal0sIHZlY3RvciApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBnZXROZXdFeHRlbnRTaXplKCBleHRlbnRCb3gsIGNvbGxpc2lvblJlc3VsdHNbal0sIHZlY3RvciApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlQiA9IG5ldyBCKCBuZXdQb3NpdGlvbiwgbmV3U2l6ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKChjYW5kaWRhdGVBLmhoID4gY2FuZGlkYXRlQi5oaCkgJiYgKGNhbmRpZGF0ZUEuaHcgPT09IGNhbmRpZGF0ZUIuaHcpKSB8fCAoKGNhbmRpZGF0ZUEuaHcgPiBjYW5kaWRhdGVCLmh3KSAmJiAoY2FuZGlkYXRlQS5oaCA9PT0gY2FuZGlkYXRlQi5oaCkpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlQSA9IGNhbmRpZGF0ZUI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4dGVudEJveCA9IGNhbmRpZGF0ZUE7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBleHRlbnRCb3g7XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oIHNwYWNpYWxJbmRleCApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB3ZSd2ZSBub3cgZ290IHRoZSBlZGdlIGdyb3Vwcy4gR28gdGhyb3VnaCBlYWNoIG9uZSwgY3JlYXRlIGEgc3RhcnQgYW5kIGVuZCBwb2ludChzKVxuICAgICAgICAgICAgdmFyIGluZGV4LCBlZGdlUG9pbnQsIHNoYXJlZFBvaW50LCBzaGFyZWRCb3gsIHZlY3RvciwgcG9pbnQsIHJlbGF0aXZlLCBleHRlbnRCb3gsIGN1cnJlbnRDaGlsZDtcblxuICAgICAgICAgICAgdmFyIGFhYmIgPSBjcmVhdGVCb3VuZGluZ0JveC5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbnMgPSBzcGFjaWFsSW5kZXgucXVlcnkoIGFhYmIgKTtcblxuICAgICAgICAgICAgaiA9IHRoaXMuY29sbGlzaW9ucy5sZW5ndGg7XG5cbiAgICAgICAgICAgIHRoaXMucG90ZW50aWFsQ29sbGlzaW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHdoaWxlKGotLSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uc1tqXS5BQUJCLnRlc3RGb3JDb2xsaXNpb24oYWFiYikpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3RlbnRpYWxDb2xsaXNpb24gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZT09PVwiY29tYmluZWQtd2l0aC1pbnRlcnNlY3RcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWRTdGFydFBvaW50LCBjYXNjYWRlVmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZShpbmRleCA8IHRoaXMubGVuZ3RoKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZCA9IHRoaXMuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ID0gY3VycmVudENoaWxkLnBvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlY3RvciA9IHBvaW50LnZlY3RvcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2NhZGVWZWN0b3IgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4IDogdGhpcy5wYXJlbnQucG9pbnQudmVjdG9yLnggKiAtMSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5IDogdGhpcy5wYXJlbnQucG9pbnQudmVjdG9yLnkgKiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlY3Rvci54IT09Y2FzY2FkZVZlY3Rvci54ICYmIHZlY3Rvci55IT09Y2FzY2FkZVZlY3Rvci55KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRTdGFydFBvaW50ID0gbmV3IFBvaW50KHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggOiBwb2ludC54ICsgKHZlY3Rvci54ICogMjApLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgOiBwb2ludC55ICsgKHZlY3Rvci55ICogMjApfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggOiB0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IueCAqIC0xLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5IDogdGhpcy5wYXJlbnQucG9pbnQudmVjdG9yLnkgKiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkZ2VzLnB1c2gobmV3IEVkZ2UocG9pbnQsIHVwZGF0ZWRTdGFydFBvaW50KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTWV0YShjdXJyZW50Q2hpbGQsIHNwYWNpYWxJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENoaWxkLnBvaW50ID0gdXBkYXRlZFN0YXJ0UG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC52ZWN0b3IgPSB1cGRhdGVkU3RhcnRQb2ludC52ZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZC5tZXRhID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlPVwiY2FzY2FkaW5nXCI7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZT09PVwiY2FzY2FkaW5nXCIgfHwgdGhpcy5tb2RlPT09XCJpbnRlcnNlY3RpbmdcIiB8fCB0aGlzLm1vZGU9PT1cImNvbWJpbmVkXCIpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb25SZXN1bHRzLCBzbWFsbGVzdEJveCA9IGFhYmI7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBpdGVyYXRlIHRocm91Z2ggYWxsIHRoZSBjaGRpbHJlblxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZShpbmRleCA8IHRoaXMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ID0gdGhpcy5jaGlsZHJlbltpbmRleF0ucG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIHZlY3RvciA9IHBvaW50LnZlY3RvcjtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBrbm93IGl0J3MgYSBjb2xsaXNpb24gYnV0IHdlIHdhbnQgaXQncyByZWxhdGl2ZSBwb3NpdGlvblxuXG4gICAgICAgICAgICAgICAgICAgIGV4dGVudEJveCA9IGV4dGVuZENvbm5lY3RvclRvTGltaXQocG9pbnQsIHRoaXMuY29sbGlzaW9ucywgYWFiYiwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVudEJveC5odz09PTAuNSAmJiBleHRlbnRCb3guaGggPCBhYWJiLmhoKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnRCb3gucG9zaXRpb24oYWFiYi54LCBleHRlbnRCb3gueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2l6ZShhYWJiLmh3ICogMiwgZXh0ZW50Qm94LmhoICogMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNtYWxsZXN0Qm94LmhoID4gZXh0ZW50Qm94LmhoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsZXN0Qm94ID0gZXh0ZW50Qm94O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChleHRlbnRCb3guaGg9PT0wLjUgJiYgZXh0ZW50Qm94Lmh3IDwgYWFiYi5odyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnRCb3gucG9zaXRpb24oZXh0ZW50Qm94LngsIGFhYmIueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2l6ZShleHRlbnRCb3guaHcgKiAyLCBhYWJiLmhoICogMik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc21hbGxlc3RCb3guaHcgPiBleHRlbnRCb3guaHcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxlc3RCb3ggPSBleHRlbnRCb3g7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzaGFyZWRCb3ggPSBzbWFsbGVzdEJveDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IueCE9PTApe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hhcmVkUG9pbnQgPSBuZXcgUG9pbnQoe3ggOiAoc21hbGxlc3RCb3gueCArIChzbWFsbGVzdEJveC5odykpLCB5IDogdGhpcy5wYXJlbnQucG9pbnQueX0sIHRoaXMucGFyZW50LnBvaW50LnZlY3Rvcik7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlZFBvaW50ID0gbmV3IFBvaW50KHt4IDogdGhpcy5wYXJlbnQucG9pbnQueCwgeSA6IChzbWFsbGVzdEJveC55ICsgKHNtYWxsZXN0Qm94LmhoKSl9LCB0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9ZWxzZSBpZiAodGhpcy5tb2RlPT09XCJoZXVyaXN0aWNcIil7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gd2UncmUgbm90IHJlYWxseSBkb2luZyBhbnkgY2xldmVyIGNvbGxpc2lvbiBkZXRlY3Rpb24gaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgcG9pbnQgPSB0aGlzLnBhcmVudC5wb2ludDtcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yID0gcG9pbnQudmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4dGVudEJveCA9IGV4dGVuZENvbm5lY3RvclRvTGltaXQocG9pbnQsIHRoaXMuY29sbGlzaW9ucywgYWFiYiwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhcmVkUG9pbnQgPSBuZXcgUG9pbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB4IDogZXh0ZW50Qm94LnggKyBleHRlbnRCb3guaHcgKyAoKGV4dGVudEJveC5odykgKiB2ZWN0b3IueCksXG4gICAgICAgICAgICAgICAgICAgICAgICB5IDogZXh0ZW50Qm94LnkgKyBleHRlbnRCb3guaGggKyAoKGV4dGVudEJveC5oaCkgKiB2ZWN0b3IueSlcblxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSE9PVwidWx0aW1hdGUtZXZpbC1lZGdlLWdyb3VwLW9mLWRvb21cIil7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJjbGVhblwiO1xuICAgICAgICAgICAgICAgIC8vIG1ha2UgYSBzaGFyZWQgcG9pbnQgaW4gdGhlIGNlbnRlciBvZiB0aGlzLlxuICAgICAgICAgICAgICAgIHNoYXJlZEJveCA9IGFhYmI7XG5cbiAgICAgICAgICAgICAgICBzaGFyZWRQb2ludCA9IG5ldyBQb2ludCh7eCA6ICh0aGlzLnBhcmVudC5wb2ludC54ICsgKGFhYmIuaHcgKiB0aGlzLnBhcmVudC52ZWN0b3IueCkpLCB5IDogKHRoaXMucGFyZW50LnBvaW50LnkgKyAoYWFiYi5oaCAqIHRoaXMucGFyZW50LnZlY3Rvci55KSl9LCB0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdlIG9ubHkgY3JlYXRlIGVkZ2VzIGlmIHRoZXJlJ3MgYSBzaGFyZWQgcG9pbnQuXG5cbiAgICAgICAgICAgIGlmIChzaGFyZWRQb2ludCl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVDaGlsZHJlbldpdGhTaGFyZWRQb2ludChzaGFyZWRQb2ludCwgc3BhY2lhbEluZGV4KTtcblxuICAgICAgICAgICAgfSAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9O1xuXG4gICAgfSgpLFxuXG4gICAgY29udmVydEVkZ2VJbnRvQm91bmRpbmdCb3ggOiBmdW5jdGlvbiggc3RhcnRQb2ludCwgZW5kUG9pbnQgKXtcbiAgICAgICAgXG4gICAgICAgIHZhciBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZLCBoZWlnaHQsIHdpZHRoO1xuXG4gICAgICAgIG1pblggPSBtYXhYID0gc3RhcnRQb2ludC54O1xuICAgICAgICBtaW5ZID0gbWF4WSA9IHN0YXJ0UG9pbnQueTtcblxuICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgZW5kUG9pbnQueCk7XG4gICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCBlbmRQb2ludC54KTtcblxuICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZW5kUG9pbnQueSk7XG4gICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCBlbmRQb2ludC55KTtcblxuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heCg0LCBtYXhZIC0gbWluWSk7XG4gICAgICAgIHdpZHRoID0gTWF0aC5tYXgoNCwgbWF4WCAtIG1pblgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgQm91bmRpbmdCb3goIG5ldyBWZWN0b3IyRChtaW5YIC0yLCBtaW5ZIC0yKSwgbmV3IFZlY3RvcjJEKHdpZHRoLCBoZWlnaHQpICk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICByZXNvbHZlQ2hpbGRyZW5XaXRoU2hhcmVkUG9pbnQgOiBmdW5jdGlvbihzaGFyZWRQb2ludCwgc3BhY2lhbEluZGV4KXtcbiAgICAgICAgXG4gICAgICAgIHZhciBpbmRleCwgcHQsIHZlY3RvciwgeCwgeTtcbiAgICAgICAgICAgIC8vIFNOQVBQSU5HIGZvciBob3Jpem9udGFsIG9uZSB0byBvbmUgZWRnZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aD09PTEgJiYgdGhpcy5wYXJlbnQucG9pbnQuY29tcGFyZURpcmVjdGlvbih0aGlzLmNoaWxkcmVuWzBdLnBvaW50KT09PS0xICYmIHRoaXMucGFyZW50LnBvaW50LnZlY3Rvci55PT09MCl7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuWzBdLnBvaW50LnkgPCB0aGlzLnBhcmVudC5wb2ludC55ICsgMTAgJiYgdGhpcy5jaGlsZHJlblswXS5wb2ludC55ID4gdGhpcy5wYXJlbnQucG9pbnQueSAtIDEwICl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGFyZWRQb2ludCA9IG5ldyBQb2ludCh7eCA6IHRoaXMucGFyZW50LnBvaW50LngsIHkgOiAodGhpcy5jaGlsZHJlblswXS5wb2ludC55ICsgKHRoaXMucGFyZW50LnBvaW50LnkgLSB0aGlzLmNoaWxkcmVuWzBdLnBvaW50LnkpIC8gMiApfSwgdGhpcy5wYXJlbnQucG9pbnQudmVjdG9yKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5wb2ludC55ID0gc2hhcmVkUG9pbnQueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblswXS5wb2ludC55ID0gc2hhcmVkUG9pbnQueTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNuYXBwZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdGhlIGVkZ2UgaW50byBib3VuZGluZyBib3hcblxuICAgICAgICAgICAgLy8gcHVzaCBhbiBlZGdlIGZyb20gdGVoIHBhcmVudCB0byB0aGUgc2hhcmVkIHBvaW50XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zbmFwcGVkKXtcbiAgICAgICAgICAgIHRoaXMuZWRnZXMucHVzaChuZXcgRWRnZSh0aGlzLnBhcmVudC5wb2ludCwgc2hhcmVkUG9pbnQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Lm1ldGEgJiYgdGhpcy5wYXJlbnQubWV0YS50eXBlPT09XCJkaXJlY3Rpb25hbFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXJyb3codGhpcy5wYXJlbnQucG9pbnQsIHRoaXMucGFyZW50LnBvaW50LnZlY3Rvcik7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgICB3aGlsZShpbmRleCA8IHRoaXMubGVuZ3RoKXtcblxuICAgICAgICAgICAgICAgIHB0ID0gdGhpcy5jaGlsZHJlbltpbmRleF0ucG9pbnQ7XG4gICAgICAgICAgICAgICAgdmVjdG9yID0gcHQudmVjdG9yO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZlY3Rvci54IT09MCl7XG5cbiAgICAgICAgICAgICAgICAgICAgeCA9IHNoYXJlZFBvaW50Lng7XG4gICAgICAgICAgICAgICAgICAgIHkgPSBwdC55O1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHggPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICB5ID0gc2hhcmVkUG9pbnQueSA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWRnZVBvaW50ID0gbmV3IFBvaW50KHt4IDogeCwgeTogeX0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZT09PVwiaGV1cmlzdGljXCIgJiYgdGhpcy5wb3RlbnRpYWxDb2xsaXNpb24pe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVkZ2VQb2ludFRvU2hhcmVkQm94ID0gdGhpcy5jb252ZXJ0RWRnZUludG9Cb3VuZGluZ0JveChlZGdlUG9pbnQsIHNoYXJlZFBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy9lZGdlUG9pbnRUb1NoYXJlZEJveC5kcmF3KGRlYnVnQ29udGV4dCwgJyNmMDAnKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9ucyA9IHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKGVkZ2VQb2ludFRvU2hhcmVkQm94LCB0aGlzLmNvbGxpc2lvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBqID0gMCwgbWF4WCA9IDAsIG1heFkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGogPCBjb2xsaXNpb25zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFggPSAoKE1hdGgubWF4KGNvbGxpc2lvbnNbal0ueCwgbWF4WCkgKyAyMCkgKiB0aGlzLnBhcmVudC5wb2ludC52ZWN0b3IueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhZID0gKChNYXRoLm1heChjb2xsaXNpb25zW2pdLnksIG1heFkpICsgMjApICogdGhpcy5wYXJlbnQucG9pbnQudmVjdG9yLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHB1c2hlZE91dEVkZ2VQb2ludCA9IG5ldyBQb2ludCh7IHggOiBlZGdlUG9pbnQueCArIG1heFgsIHk6IGVkZ2VQb2ludC55ICsgbWF4WX0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHVzaGVkT3V0U2hhcmVkUG9pbnQgPSBuZXcgUG9pbnQoeyB4IDogc2hhcmVkUG9pbnQueCArIG1heFgsIHk6IHNoYXJlZFBvaW50LnkgKyBtYXhZfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGdlcy5wdXNoKG5ldyBFZGdlKHNoYXJlZFBvaW50LCBwdXNoZWRPdXRTaGFyZWRQb2ludCApKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGdlcy5wdXNoKG5ldyBFZGdlKGVkZ2VQb2ludCwgcHVzaGVkT3V0RWRnZVBvaW50ICkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkZ2VzLnB1c2gobmV3IEVkZ2UocHVzaGVkT3V0U2hhcmVkUG9pbnQsIHB1c2hlZE91dEVkZ2VQb2ludCApKTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGdlcy5wdXNoKG5ldyBFZGdlKGVkZ2VQb2ludCwgc2hhcmVkUG9pbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKlxuXG4gICAgICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5lZGdlcy5wdXNoKG5ldyBFZGdlKHRoaXMuY2hpbGRyZW5baW5kZXhdLnBvaW50LCBlZGdlUG9pbnQpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01ldGEodGhpcy5jaGlsZHJlbltpbmRleF0sIHNwYWNpYWxJbmRleCApO1xuXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcblxuICAgICAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHByb2Nlc3NNZXRhIDogZnVuY3Rpb24oY3VycmVudENoaWxkKXtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgQiA9IEJvdW5kaW5nQm94LCBWID0gVmVjdG9yMkQsIHBvaW50ID0gY3VycmVudENoaWxkLnBvaW50LCB2ZWN0b3IgPSBwb2ludC52ZWN0b3I7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQubWV0YSl7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudENoaWxkLm1ldGEudHlwZT09PVwiZGlyZWN0aW9uYWxcIil7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFycm93KHBvaW50KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2hpbGQubWV0YS5sYWJlbCE9PVwiXCIpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbEdlbyA9IGN1cnJlbnRDaGlsZC5tZXRhLmxhYmVsR2VvbWV0cnksIGxhYmVsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVjdG9yLng9PT0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IG5ldyBCICggbmV3IFYocG9pbnQueCArIDEwLCBwb2ludC55IC0gKGxhYmVsR2VvLmhlaWdodCArIDUpKSwgbmV3IFYobGFiZWxHZW8uaW5uZXJXaWR0aCwgbGFiZWxHZW8uaW5uZXJIZWlnaHQpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICh2ZWN0b3IueD09PS0xKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gbmV3IEIgKCBuZXcgVihwb2ludC54IC0gKGxhYmVsR2VvLndpZHRoICsgMTApLCBlZGdlUG9pbnQueSAtIChsYWJlbEdlby5oZWlnaHQgKyA1KSksIG5ldyBWKGxhYmVsR2VvLmlubmVyV2lkdGgsIGxhYmVsR2VvLmlubmVySGVpZ2h0KSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodmVjdG9yLnk9PT0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IG5ldyBCICggbmV3IFYocG9pbnQueCArIDUsIHBvaW50LnkgKyA1KSwgbmV3IFYobGFiZWxHZW8uaW5uZXJXaWR0aCwgbGFiZWxHZW8uaW5uZXJIZWlnaHQpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICh2ZWN0b3IueT09PS0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IG5ldyBCICggbmV3IFYocG9pbnQueCArIDUsIHBvaW50LnkgLSAobGFiZWxHZW8uaGVpZ2h0ICsgNSkpLCBuZXcgVihsYWJlbEdlby5pbm5lcldpZHRoLCBsYWJlbEdlby5pbm5lckhlaWdodCkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxhYmVscyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbHMucHVzaChuZXcgTGFiZWwoY3VycmVudENoaWxkLm1ldGEubGFiZWwsIGxhYmVsKSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgfSwgXG5cbiAgICBjcmVhdGVBcnJvdyA6IGZ1bmN0aW9uKHBvaW50KXtcblxuICAgICAgICB2YXIgYXJyb3dTaXplID0gNSwgYXJyb3dQb2ludHMgPSBbXSwgdmVjdG9yID0gcG9pbnQudmVjdG9yLFxuXG4gICAgICAgIG53ID0gbmV3IFBvaW50KHsgeDogcG9pbnQueCAtIGFycm93U2l6ZSwgeTogcG9pbnQueSAtIGFycm93U2l6ZSB9KSxcbiAgICAgICAgbmUgPSBuZXcgUG9pbnQoeyB4OiBwb2ludC54ICsgYXJyb3dTaXplLCB5OiBwb2ludC55IC0gYXJyb3dTaXplIH0pLFxuICAgICAgICBzZSA9IG5ldyBQb2ludCh7IHg6IHBvaW50LnggKyBhcnJvd1NpemUsIHk6IHBvaW50LnkgKyBhcnJvd1NpemUgfSksXG4gICAgICAgIHN3ID0gbmV3IFBvaW50KHsgeDogcG9pbnQueCAtIGFycm93U2l6ZSwgeTogcG9pbnQueSArIGFycm93U2l6ZSB9KTtcblxuICAgICAgICBhcnJvd1BvaW50c1sxXSA9IHBvaW50O1xuXG4gICAgICAgIGlmICh2ZWN0b3IueD09PTAgJiYgdmVjdG9yLnk9PT0tMSkge1xuXG4gICAgICAgICAgICBhcnJvd1BvaW50c1swXSA9IG53O1xuICAgICAgICAgICAgLy9wb2ludHNbMV0ueS09IDM7XG4gICAgICAgICAgICBhcnJvd1BvaW50c1syXSA9IG5lO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodmVjdG9yLng9PT0wICYmIHZlY3Rvci55PT09MSkge1xuICAgICAgICAgICAgYXJyb3dQb2ludHNbMF0gPSBzdztcbiAgICAgICAgICAgIC8vcG9pbnRzWzFdLnkrPSAzO1xuICAgICAgICAgICAgYXJyb3dQb2ludHNbMl0gPSBzZTtcbiAgICAgICAgfSBlbHNlIGlmICh2ZWN0b3IueD09PS0xICYmIHZlY3Rvci55PT09MCkge1xuICAgICAgICAgICAgYXJyb3dQb2ludHNbMF0gPSBudztcbiAgICAgICAgICAgIC8vcG9pbnRzWzFdLngtPSAzO1xuICAgICAgICAgICAgYXJyb3dQb2ludHNbMl0gPSBzdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycm93UG9pbnRzWzBdID0gbmU7XG4gICAgICAgICAgICAvL3BvaW50c1sxXS54Kz0gMztcbiAgICAgICAgICAgIGFycm93UG9pbnRzWzJdID0gc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkZ2VzLnB1c2gobmV3IEVkZ2UoYXJyb3dQb2ludHNbMF0sIGFycm93UG9pbnRzWzFdKSk7XG4gICAgICAgIHRoaXMuZWRnZXMucHVzaChuZXcgRWRnZShhcnJvd1BvaW50c1sxXSwgYXJyb3dQb2ludHNbMl0pKTtcblxuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMuY3JlYXRlRWRnZUdyb3VwcyA9IGZ1bmN0aW9uIGVkZ2VHcm91cENyZWF0b3IgKGVkZ2VzLCBub2Rlcyl7XG5cbiAgICB2YXIgaSwgaiwgaW5pdGlhbExlbmd0aCA9IGVkZ2VzLmxlbmd0aDtcbiAgICB2YXIgaW5Hcm91cCA9IFtdO1xuICAgIHZhciBjb2xsZWN0aW9ucztcbiAgICB2YXIgZWRnZWdyb3VwcyA9IFtdO1xuXG4gICAgaSA9IGluaXRpYWxMZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG5cbiAgICAgICAgaWYgKCFlZGdlZ3JvdXBzW2ldKXtcbiAgICAgICAgICAgIGVkZ2Vncm91cHNbaV0gPSBuZXcgRWRnZUdyb3VwKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaiA9IGluaXRpYWxMZW5ndGg7XG5cbiAgICAgICAgd2hpbGUoai0tKXtcbiAgICAgICAgICAgIGlmIChlZGdlc1tqXSl7XG4gICAgICAgICAgICAgICAgaWYgKChlZGdlc1tqXS5zb3VyY2U9PT1lZGdlc1tpXS5zb3VyY2UgJiYgZWRnZXNbal0uc291cmNlU2lkZT09PWVkZ2VzW2ldLnNvdXJjZVNpZGUpIHx8IChlZGdlc1tqXS50YXJnZXQ9PT1lZGdlc1tpXS50YXJnZXQgICYmIGVkZ2VzW2pdLnRhcmdldFNpZGU9PT1lZGdlc1tpXS50YXJnZXRTaWRlKSl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluR3JvdXBbal0pe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlZ3JvdXBzW2ldLmFkZENoaWxkKCBub2Rlc1tlZGdlc1tqXS5zb3VyY2VdLCBlZGdlc1tqXS5zb3VyY2VTaWRlLCBub2Rlc1tlZGdlc1tqXS50YXJnZXRdLCBlZGdlc1tqXS50YXJnZXRTaWRlLCBlZGdlc1tqXS50eXBlLCBlZGdlc1tqXS5sYWJlbCwgZWRnZXNbal0ubGFiZWxHZW9tZXRyeSB8fCB7fSwgZWRnZXNbal0udWlkICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGluR3JvdXBbal0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlZGdlZ3JvdXBzW2ldLmxlbmd0aCB8fCBlZGdlZ3JvdXBzW2ldLmxlbmd0aD09PTApe1xuICAgICAgICAgICAgZGVsZXRlIGVkZ2Vncm91cHNbaV07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZWRnZWdyb3Vwc1tpXS5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlZGdlZ3JvdXBzO1xufTtcblxubW9kdWxlLmV4cG9ydHMucHJvY2Vzc0VkZ2VHcm91cHMgPSBmdW5jdGlvbiBlZGdlR3JvdXBQcm9jZXNzb3IoZWRnZUdyb3Vwcywgc3BhdGlhbEluZGV4KXtcblxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgLy8gcGFzcyAxOiBjYXNjYWRpbmcsIGludGVyc2VjdGluZywgaGV1cmlzdGljXG4gICAgd2hpbGUoaW5kZXggPCBlZGdlR3JvdXBzLmxlbmd0aCl7XG4gICAgICAgIGlmIChlZGdlR3JvdXBzW2luZGV4XSl7XG4gICAgICAgICAgICBlZGdlR3JvdXBzW2luZGV4XS5jcmVhdGVFZGdlcyggc3BhdGlhbEluZGV4ICk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZUdyb3Vwcztcbn07XG5cbmZ1bmN0aW9uIGNvbnZlcnREaXJlY3Rpb25Ub1ZlY3RvciAoc3RyKXtcblxuICAgIGlmICggc3RyPT09XCJib3R0b21cIiApe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgwLCAxKTtcblxuICAgIH0gZWxzZSBpZiAoIHN0cj09PVwidG9wXCIgKXtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoMCwgLTEpO1xuXG4gICAgfSBlbHNlIGlmICggc3RyPT09XCJsZWZ0XCIpe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgtMSwgMCk7XG5cbiAgICB9IGVsc2UgaWYgKCBzdHI9PT1cInJpZ2h0XCIpe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgxLDApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoMCwgMSk7XG5cbiAgICB9XG5cbn1cbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKlxuKiBGaWxlbmFtZTogICAgIExhYmVsLmpzXG4qIERlc2NyaXB0aW9uOiAgRm9yIGRyYXdpbmcgTGFiZWxzLlxuKiAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIExhYmVsKHRleHQsIGFhYmIpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIHRoaXMuYWFiYiA9IGFhYmI7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfWNhdGNoKGUpe1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvLyBudWxsIGhhbmRsZXJcbiAgICAgICAgICAgIGRyYXcgOiBmdW5jdGlvbigpe31cblxuICAgICAgICB9O1xuXG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5MYWJlbC5wcm90b3R5cGUgPSB7XG5cbiAgICBkcmF3IDogZnVuY3Rpb24oIGh0bWxMYXllciwgc2NhbGUgKXtcbiAgICAgICAgXG4gICAgICAgIC8vIGRyYXcgdGhlIGxhYmVsXG5cbiAgICAgICAgdmFyIGxhYmVsID0gJCgnPGRpdj48L2Rpdj4nKTtcbiAgICAgICAgbGFiZWwuYWRkQ2xhc3MoJ2xhYmVsJylcbiAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgIFwibGVmdFwiIDogdGhpcy5hYWJiLnggKiBzY2FsZSxcbiAgICAgICAgICAgICAgICBcInRvcFwiIDogdGhpcy5hYWJiLnkgKiBzY2FsZSxcbiAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCIgOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCIgOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCIgOiAwLjggKiBzY2FsZSArIFwiZW1cIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KHRoaXMudGV4dCk7XG5cbiAgICAgICAgaHRtbExheWVyLmFwcGVuZChsYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcblxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qXG4qIEZpbGVuYW1lOiAgICAgTm9kZXMuanNcbiogRGVzY3JpcHRpb246ICBGb3IgY3JlYXRpbmcgYW5kIHByb2Nlc3Npbmcgbm9kZXNcbiogICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdmFyIHBsYW5ldCA9IHJlcXVpcmUoJy4uL2xpYi9wbGFuZXQuanMnKTtcbiAgICBcbiAgICB2YXIgYXBwQ29uZmlnID0gcmVxdWlyZSgnLi4vY29yZS9jb25maWcuanMnKTtcbiAgICAvL3ZhciBicm9rZXIgPSByZXF1aXJlKCcuLi9mcmFtZXdvcmsvcHVic3ViLmpzJyk7XG5cbiAgICB2YXIgVmVjdG9yMkQgPSByZXF1aXJlKCcuL3ZlY3Rvci1wcm9jZXNzaW5nLWFuZC1ib3VuZGluZy1ib3guanMnKS5WZWN0b3IyRDtcbiAgICB2YXIgQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL3ZlY3Rvci1wcm9jZXNzaW5nLWFuZC1ib3VuZGluZy1ib3guanMnKS5Cb3VuZGluZ0JveDtcbiAgICB2YXIgUG9pbnQgPSByZXF1aXJlKCcuL3BvaW50LmpzJyk7XG5cbiAgICBmdW5jdGlvbiBQYXRoTm9kZSAoY29uZmlnLCB0ZXN0TGF5ZXIsIGlzUHJpbnQpe1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgYW5jaG9yLFxuICAgICAgICAgICAgdGVzdFdpZHRoO1xuXG4gICAgICAgIGlmIChjb25maWcuc2hvcnRDb250ZW50ICE9PSAnJykge1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29uZmlnLnNob3J0Q29udGVudDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29uZmlnLnRpdGxlO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuYW5jaG9yID0gJCgnPGE+PC9hPicpO1xuICAgICAgICB0aGlzLmFuY2hvclxuICAgICAgICAgICAgLmFkZENsYXNzKCdub2RlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjb25maWcudHlwZSlcbiAgICAgICAgICAgIC5hZGRDbGFzcygoaXNQcmludCA/ICdwcmludCB0ZXN0JyA6ICd3ZWInKSlcbiAgICAgICAgICAgIC5odG1sKCc8ZGl2PicgKyBjb25maWcuc2hvcnRDb250ZW50ICsgJzwvZGl2PicpO1xuXG4gICAgICAgIGlmIChjb25maWcuZnVsbENvbnRlbnQgIT09ICcnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYW5jaG9yXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCAnI2NvbnRlbnQ9dmlldy1ub2RlJTNBJyArIGNvbmZpZy5pZClcbiAgICAgICAgICAgICAgICAuYXR0cigndGl0bGUnLCAnVmlldyBmdWxsIGNvbnRlbnQgZm9yIFxcJycgKyAkLnRyaW0oY29uZmlnLnRpdGxlKSArICdcXCcnKTtcblxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAnaW50ZXJhY3RpdmUnO1xuXG4gICAgICAgICAgICBpZiAoJChjb25maWcuZnVsbENvbnRlbnQpLmZpbmQoJ2FbcmVsPVwiL3JlbHMvdmlldy1mcmFnbWVudC9xdWFsaXR5LXN0YXRlbWVudFwiXScpLmxlbmd0aCl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFuY2hvci5maW5kKCdkaXYuc2hvcnRjb250ZW50JykucHJlcGVuZCgkKCc8c3BhbiBjbGFzcz1cImljb24tc3RhY2tcIj48c3BhbiBjbGFzcz1cImljb24tc3RhY2stYmFzZSBpY29uLW5pY2UtY2lyY2xlXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaWNvbi1uaWNlLXN0YW5kYXJkc1wiPjwvc3Bhbj48L3NwYW4+JykpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcubGlua3MgJiYgY29uZmlnLmxpbmtzWzBdKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYW5jaG9yLmF0dHIoJ2hyZWYnLCBjb25maWcubGlua3NbMF0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdvZmZtYXByZWZlcmVuY2UnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFuY2hvci5hdHRyKCd0aXRsZScsICdWaWV3IHRoZSBcXCcnICsgJC50cmltKGNvbmZpZy50aXRsZSkgKyAnXFwnIHBhdGgnKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yLmF0dHIoJ3RpdGxlJywgJ1ZpZXcgdGhlIFxcJycgKyAkLnRyaW0oY29uZmlnLnRpdGxlKSArICdcXCcgbm9kZScpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoY29uZmlnLnR5cGUgPT09IFwib2ZmbWFwcmVmZXJlbmNlXCIgfHwgY29uZmlnLnR5cGUgPT09IFwibm9kZXJlZmVyZW5jZVwiKSkge1xuICAgICAgICAgICAgdGhpcy5hbmNob3IuYXBwZW5kKCc8ZGl2IGNsYXNzPVwicGF0aC1yZWZlcmVuY2VcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaHRtbEZyYWdtZW50ID0gdGhpcy5hbmNob3I7XG5cbiAgICAgICAgdGhpcy5odG1sRnJhZ21lbnQuY3NzKHsgd2lkdGg6IGNvbmZpZy5nZW9tZXRyeS53aWR0aCwgaGVpZ2h0OiBjb25maWcuZ2VvbWV0cnkuaGVpZ2h0IH0pO1xuXG4gICAgICAgIHRoaXMuQUFCQiA9IG5ldyBCb3VuZGluZ0JveChcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMkQoY29uZmlnLmdlb21ldHJ5LmxlZnQsIGNvbmZpZy5nZW9tZXRyeS50b3ApLFxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IyRChjb25maWcuZ2VvbWV0cnkud2lkdGgsIGNvbmZpZy5nZW9tZXRyeS5oZWlnaHQpKTtcblxuICAgICAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdvZmZtYXByZWZlcmVuY2UnIHx8IGNvbmZpZy50eXBlID09PSAnbm9kZXJlZmVyZW5jZScgfHwgY29uZmlnLmZ1bGxDb250ZW50ICE9PSAnJykge1xuXG4gICAgICAgICAgICBjb25maWcuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFuY2hvci5hZGRDbGFzcygnaW50ZXJhY3RpdmUnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yLmFkZENsYXNzKCdzdGF0aWMnKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICAkLmV4dGVuZCh0aGlzLCBjb25maWcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgUGF0aE5vZGUucHJvdG90eXBlID0ge1xuXG4gICAgICAgIGRyYXc6IGZ1bmN0aW9uKGNvbnRleHQsIHRleHRMYXllciwgc2NhbGUpIHtcblxuICAgICAgICAgICAgaWYgKCFzY2FsZSkge1xuXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAxO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSBhcHBDb25maWcuc3lzdGVtLnN0eWxlcywgd2lkdGggPSAodGhpcy5BQUJCLnNpemUoKS54ICogc2NhbGUpLCBoZWlnaHQgPSAodGhpcy5BQUJCLnNpemUoKS55ICogc2NhbGUpLCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50XG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuQUFCQi54ICogc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5BQUJCLnkgKiBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIC8vJ2ZvbnQtc2l6ZSc6IHNjYWxlICsgXCJlbVwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGV4dExheWVyKVxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm5vZGUtb3JkZXIgbm9kZS1vcmRlci1udW1iZXIgd2ViXCI+JyArIHRoaXMubm9kZU9yZGVyICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmICh0aGlzLmFuY2hvci5hdHRyKCdocmVmJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2x1ZyA9IHRoaXMuYW5jaG9yLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKC8tL2csICcgJykucmVwbGFjZSgvXFwvcGF0aHdheXNcXC8vZywgJyAnKTtcbiAgICAgICAgICAgICAgICBzbHVnID0gc2x1Zy5yZXBsYWNlKC9cXCNjb250ZW50PXZpZXcgbm9kZSUzQW5vZGVzL2csICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmh0bWxGcmFnbWVudC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzbHVnLXJlZnMgd2ViXCIgaWQ9XCJzbHVnUmVmc1dlYicgKyB0aGlzLm5vZGVPcmRlciArICdcIj4nICsgdGhpcy5ub2RlT3JkZXIgKyAnIC0gPGEgaHJlZj0nICsgdGhpcy5hbmNob3IuYXR0cignaHJlZicpICsgJz4nICsgc2x1ZyArICc8L2E+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50LmFwcGVuZCgnPGRpdiBjbGFzcz1cInNsdWctcmVmcyB3ZWJcIiBpZD1cInNsdWdSZWZzV2ViJyArIHRoaXMubm9kZU9yZGVyICsgJ1wiPicgKyB0aGlzLm5vZGVPcmRlciArICcgLSBOL0E8L2Rpdj4nKTtcbiAgICAgICAgICAgIH1cbiAgICAqL1xuXG5cbiAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgYnJva2VyLnB1Ymxpc2goXCJub2RlLWNsaWNrZWRcIiwgdGhpcyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHJlc3BvbmRzIHRvIGV4dGVybmFsIGV2ZW50c1xuICAgICAgICBkcmF3QXNTZWxlY3RlZDogZnVuY3Rpb24gKGNvbnRleHQsIHNjYWxlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50LmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXG5cbiAgICAgICAgfSxcbiAgICAgICAgLy8gcmVzcG9uZHMgdG8gZXh0ZXJuYWwgZXZlbnRzXG4gICAgICAgIGRyYXdBc0hpZ2hsaWdodGVkOiBmdW5jdGlvbiAoY29udGV4dCwgc2NhbGUpIHtcblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZHJhd0ZvclByaW50OiBmdW5jdGlvbiAoY29udGV4dCwgdGV4dExheWVyLCBzY2FsZSkge1xuXG4gICAgICAgICAgICBpZiAoIXNjYWxlKSB7XG5cbiAgICAgICAgICAgICAgICBzY2FsZSA9IDQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGFwcENvbmZpZy5zeXN0ZW0uc3R5bGVzLFxuICAgICAgICAgICAgICAgIHdpZHRoID0gKHRoaXMuQUFCQi5zaXplKCkueCAqIHNjYWxlKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAodGhpcy5BQUJCLnNpemUoKS55ICogc2NhbGUpLFxuICAgICAgICAgICAgICAgIG5vZGVPcmRlcixcbiAgICAgICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYyxcbiAgICAgICAgICAgICAgICBwLFxuICAgICAgICAgICAgICAgIHcsIGg7XG5cbiAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50XG4gICAgICAgICAgICAgICAgLmNzcyh7XG5cbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5BQUJCLnggKiBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLkFBQkIueSAqIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogKHRoaXMudHlwZSA9PT0gJ2ludGVyYWN0aXZlJyA/IHdpZHRoIC0gMjAgOiB3aWR0aCksXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IFwiMi44NWVtXCJcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdwcmludCcpXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRleHRMYXllcik7XG5cblxuICAgICAgICAgICAgbm9kZU9yZGVyID0gJCgnPGRpdiBjbGFzcz1cIm5vZGUtb3JkZXJcIj4nICsgdGhpcy5ub2RlT3JkZXIgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgICBub2RlT3JkZXIuY3NzKHsgJ2ZvbnQtc2l6ZSc6IFwiMi43ZW1cIiB9KTtcbiAgICAgICAgICAgIHRleHRMYXllci5hcHBlbmQobm9kZU9yZGVyKTtcblxuXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnb2ZmbWFwcmVmZXJlbmNlJyB8fCB0aGlzLnR5cGUgPT09ICdub2RlcmVmZXJlbmNlJykge1xuXG4gICAgICAgICAgICAgICAgbm9kZU9yZGVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh0aGlzLkFBQkIueCArIDgpICogc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogKHRoaXMuQUFCQi55ICsgKGhlaWdodCAvIHNjYWxlKSAtIDI2KSAqIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiBcIjFlbVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA6ICcjZmZmJ1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBkcmF3IHRoZSBwYXRod2F5cyBsb2dvIHdpdGggdmVjdG9yIGdyYXBoaWNzIGZvciBwYXRoIHJlZmVyZW5jZXMuXG4gICAgICAgICAgICAgICAgYyA9ICQoJ2Rpdi5wYXRoLXJlZmVyZW5jZScsIHRoaXMuaHRtbEZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICB3ID0gNzA0O1xuICAgICAgICAgICAgICAgIGggPSA2ODtcblxuICAgICAgICAgICAgICAgIGMuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMTQsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaHRtbEZyYWdtZW50LmNzcyh7XG5cbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHRoaXMuQUFCQi54ICsgOCkgKiBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICh3aWR0aCkgLSAoNyAqIHNjYWxlKSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcyLjdlbSdcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbm9kZU9yZGVyLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh0aGlzLkFBQkIueCAtIDQpICogc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogKHRoaXMuQUFCQi55KSAqIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAvKiAncGFkZGluZy10b3AnOiAnMS4yZW0nLCAqL1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAndGV4dC1hbGlnbicgOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA6ICcjMDAwJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldENvbm5lY3RvclBvaW50OiBmdW5jdGlvbiAodmVjdG9yKSB7XG5cbiAgICAgICAgICAgIHZhciBib3ggPSB0aGlzLkFBQkI7XG5cblxuICAgICAgICAgICAgdmFyIGN4ID0gYm94LnggKyBib3guaHc7XG4gICAgICAgICAgICB2YXIgY3kgPSBib3gueSArIGJveC5oaDtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh7IHg6IChjeCArIChib3guaHcgKiB2ZWN0b3IueCkpLCB5OiAoY3kgKyAoYm94LmhoICogdmVjdG9yLnkpKSB9LCB2ZWN0b3IpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVnaXN0ZXJFdmVudDogZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xuXG4gICAgICAgICAgICB0aGlzLmh0bWxGcmFnbWVudC5iaW5kKGV2ZW50LCBjYWxsYmFjayk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRyYXdCb3ggKGMsIHgsIHksIHcsIGgpIHtcblxuICAgICAgICBjLmJveCh7XG4gICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICAgICB3OiB3LFxuICAgICAgICAgICAgICAgIGg6IGhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb3JuZXJSYWRpdXM6IDAuMVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd0xpbmUgKGMsIHgxLCB5MSwgeDIsIHkyKSB7XG5cbiAgICAgICAgYy5wYXRoKHtcbiAgICAgICAgICAgIHBvaW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogeDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkxXG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeDogeDIsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkyXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFBhdGhOb2RlO1xuXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbipcbiogRmlsZW5hbWU6ICAgICBQYXRoLXZpZXcuanNcbiogRGVzY3JpcHRpb246ICBcbiogICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgcGxhbmV0ID0gcmVxdWlyZSgnLi4vbGliL3BsYW5ldC5qcycpO1xuXG4vL3ZhciBicm93c2VyID0gcmVxdWlyZSgnLi4vdXRpbHMvc25pZmZlci5qcycpO1xuLy92YXIgYnJva2VyID0gcmVxdWlyZSgnLi4vZnJhbWV3b3JrL3B1YnN1Yi5qcycpO1xuLy92YXIgaHR0cExpbmtDYWNoZSA9IHJlcXVpcmUoJy4uL2NvcmUvaHR0cExpbmtDYWNoZS5qcycpO1xudmFyIGFwcENvbmZpZyA9IHJlcXVpcmUoJy4uL2NvcmUvY29uZmlnLmpzJyk7XG5cbnZhciBWZWN0b3IyRCA9IHJlcXVpcmUoJy4vdmVjdG9yLXByb2Nlc3NpbmctYW5kLWJvdW5kaW5nLWJveC5qcycpLlZlY3RvcjJEO1xudmFyIEJvdW5kaW5nQm94ID0gcmVxdWlyZSgnLi92ZWN0b3ItcHJvY2Vzc2luZy1hbmQtYm91bmRpbmctYm94LmpzJykuQm91bmRpbmdCb3g7XG52YXIgUXVhZFRyZWUgPSByZXF1aXJlKCcuL3F1YWR0cmVlLmpzJykuUXVhZFRyZWU7XG5cbnZhciBQYXRoTm9kZSA9IHJlcXVpcmUoJy4vcGF0aC1ub2RlLmpzJyk7XG5cbnZhciBwcm9jZXNzRWRnZUdyb3VwcyA9IHJlcXVpcmUoJy4vZWRnZS5qcycpLnByb2Nlc3NFZGdlR3JvdXBzO1xudmFyIGNyZWF0ZUVkZ2VHcm91cHMgPSByZXF1aXJlKCcuL2VkZ2UuanMnKS5jcmVhdGVFZGdlR3JvdXBzO1xuXG52YXIgY2FudmFzTWFyZ2luID0gNTA7XG5cbmZ1bmN0aW9uIFBhdGhWaWV3IChkYXRhLCBjb250ZXh0LCBpc1ByaW50LCBzY2FsZSl7XG5cbiAgICBjb250ZXh0LmFkZENsYXNzKCdwYXRoLXZpZXctY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMubm9kZXMgPSB7fTtcbiAgICB0aGlzLnNjYWxlID0gKHNjYWxlID8gc2NhbGUgOiAyKTtcbiAgICBcblxuICAgIHRoaXMuZWRnZXMgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGVkTm9kZSA9ICcnO1xuICAgIHRoaXMudWlkID0gZGF0YS5wYXRod2F5U2x1ZztcbiAgICB0aGlzLmlzUHJpbnQgPSAoaXNQcmludCA9PT0gJ3ByaW50JyA/IHRydWUgOiBmYWxzZSk7XG5cbiAgICB0aGlzXG4gICAgICAgIC5jcmVhdGVEZWZhdWx0TGF5ZXJzKClcbiAgICAgICAgLmluaXRpYWxpc2VQYXRoQW5kTm9kZXMoIGRhdGEubm9kZXMgKVxuICAgICAgICAuaW5pdGlhbGlzZUxheWVycygpXG4gICAgICAgIC5pbml0aWFsaXNlRWRnZXMoIGRhdGEuZWRnZXMgKVxuICAgICAgICAuaW5pdGlhbGlzZUxhYmVscyggZGF0YS5sYWJlbHMgKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG59XG5cblBhdGhWaWV3LnByb3RvdHlwZSA9IHtcblxuICAgIHJlbmRlciA6IGZ1bmN0aW9uICgpe1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2godGhpcy5ub2RlcywgZnVuY3Rpb24gKGlkLCBub2RlKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbm9kZS5kcmF3KF90aGlzLnBsYW5ldExheWVyLCBfdGhpcy50ZXh0TGF5ZXIsIF90aGlzLnNjYWxlKTtcblxuICAgICAgICAgICAgaWYobm9kZS5pc0ludGVyYWN0aXZlKXtcblxuICAgICAgICAgICAgICAgIC8vIGNsaWNrIGhhbmRsZXJzIGZvciBsaW5rcy4uLlxuICAgICAgICAgICAgICAgIGlmKG5vZGUudHlwZSA9PT0gJ2ludGVyYWN0aXZlJyl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlZ2lzdGVyRXZlbnQoJ2NsaWNrJywgKGZ1bmN0aW9uIChpZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb2tlci5wdWJsaXNoKFwicmVxdWVzdC12aWV3LW5vZGUtY29udGVudFwiLCBpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgfShub2RlLmlkKSkgKTtcblxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKG5vZGUudHlwZSA9PT0gJ29mZm1hcHJlZmVyZW5jZScgJiYgdHlwZW9mIG5vZGUubGlua3MhPT0gJ3VuZGVmaW5lZCcpe1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVnaXN0ZXJFdmVudCgnY2xpY2snLCAoZnVuY3Rpb24gKGxpbmspe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4bWxVcmkgPSBodHRwTGlua0NhY2hlW2xpbmtdLnhtbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2tlci5wdWJsaXNoKFwicmVxdWVzdC12aWV3LW5ldy1wYXRoXCIsIHhtbFVyaSwgbGluayk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgfShub2RlLmxpbmtzWzBdKSkpO1xuXG5cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihub2RlLnR5cGUgPT09ICdub2RlcmVmZXJlbmNlJyl7XG5cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZWdpc3RlckV2ZW50KCdjbGljaycsIChmdW5jdGlvbiAoaWQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2VyLnB1Ymxpc2goJ2V2ZW50LWFwcGxpY2F0aW9uLWlzLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgfShfdGhpcy5pZCkgKSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKXtcblxuICAgICAgICAgICAgICAgICAgICAvLyBub3cgYmluZCBtb3VzZWVudGVyL21vdXNlbGVhdmUgZXZlbnRzLi4uXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVnaXN0ZXJFdmVudCgnbW91c2VlbnRlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZHJhd0FzSGlnaGxpZ2h0ZWQoX3RoaXMuaGlnaGxpZ2h0cywgX3RoaXMuc2NhbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVnaXN0ZXJFdmVudCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlnaGxpZ2h0cy5jbGVhcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVnaXN0ZXJFdmVudCgnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5tb3VzZWQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVnaXN0ZXJFdmVudCgnZm9jdXMnLCBmdW5jdGlvbiAoZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vZGUubW91c2VkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vZGUubW91c2VkIDwgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArIDEwMCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbGljaycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb2tlci5wdWJsaXNoKFwiZXZlbnQtY2VudGVyLW9uLW5vZGVcIiwgbm9kZS5pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRyYXdFZGdlc0FuZExhYmVscygpO1xuXG4gICAgfSxcblxuICAgIHJlbmRlckZvclByaW50IDogZnVuY3Rpb24gKCl7XG4gICAgICAgIFxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgJC5lYWNoKHRoaXMubm9kZXMsIGZ1bmN0aW9uIChpZCwgbm9kZSl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5vZGUuZHJhd0ZvclByaW50KF90aGlzLnBsYW5ldExheWVyLCBfdGhpcy50ZXh0TGF5ZXIsIF90aGlzLnNjYWxlKTtcbiAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMudGV4dExheWVyLmNzcyh7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcCA6IDAsXG4gICAgICAgICAgICBsZWZ0IDogMCxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG5cbiAgICAgICAgdGhpcy5kcmF3RWRnZXNBbmRMYWJlbHMoICk7XG5cbiAgICB9LFxuXG4gICAgZHJhd0VkZ2VzQW5kTGFiZWxzIDogZnVuY3Rpb24gKCApe1xuICAgICAgICBcbiAgICAgICAgdmFyIGdyb3VwcyA9IHRoaXMuZWRnZWdyb3VwcywgZ3JvdXBJbmRleCA9IDAsIGVkZ2VJbmRleCA9IDAsIGxhYmVsSW5kZXg7XG5cbiAgICAgICAgdmFyIGVkZ2VTdHlsZSA9IGFwcENvbmZpZy5zeXN0ZW0uc3R5bGVzLmVkZ2U7XG4gICAgICAgIHZhciBlZGdlV2lkdGggPSBlZGdlU3R5bGUuc3Ryb2tlV2lkdGg7XG4gICAgICAgIGVkZ2VTdHlsZS5zdHJva2VXaWR0aCA9IGVkZ2VXaWR0aCAqIHRoaXMuc2NhbGU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBsYW5ldExheWVyLnNldERyYXdBdHRyaWJ1dGVzKGFwcENvbmZpZy5zeXN0ZW0uc3R5bGVzLmVkZ2UpO1xuXG4gICAgICAgIGVkZ2VTdHlsZS5zdHJva2VXaWR0aCA9IGVkZ2VXaWR0aDtcblxuICAgICAgICB3aGlsZShncm91cEluZGV4IDwgZ3JvdXBzLmxlbmd0aCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGdyb3Vwc1tncm91cEluZGV4XSl7XG4gICAgICAgICAgICAgICAgZWRnZUluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBsYWJlbEluZGV4ID0gMDtcblxuICAgICAgICAgICAgICAgIGlmKGdyb3Vwc1tncm91cEluZGV4XS5lZGdlcyl7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoZWRnZUluZGV4IDwgZ3JvdXBzW2dyb3VwSW5kZXhdLmVkZ2VzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW2dyb3VwSW5kZXhdLmVkZ2VzW2VkZ2VJbmRleF0uZHJhdyggdGhpcy5wbGFuZXRMYXllciwgdGhpcy5zY2FsZSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihncm91cHNbZ3JvdXBJbmRleF0ubGFiZWxzKXtcblxuICAgICAgICAgICAgICAgICAgICB3aGlsZShsYWJlbEluZGV4IDwgZ3JvdXBzW2dyb3VwSW5kZXhdLmxhYmVscy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tncm91cEluZGV4XS5sYWJlbHNbbGFiZWxJbmRleF0uZHJhdyggdGhpcy50ZXh0TGF5ZXIsIHRoaXMuc2NhbGUgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyb3VwSW5kZXgrKztcblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhpZGUgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmhpZGUoKTtcblxuICAgIH0sXG5cbiAgICBzaG93IDogZnVuY3Rpb24gKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zaG93KCk7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlRGVmYXVsdExheWVycyA6IGZ1bmN0aW9uICgpe1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKCc8ZGl2IGlkPVwiL3BhdGgtdmlldy8nICsgdGhpcy51aWQgKyAnXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgaWYodGhpcy5pc1ByaW50KXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2xhc3MoJ3ByaW50Jyk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmVjdG9yTGF5ZXIgPSAkKCc8ZGl2IGNsYXNzPVwicGF0aC12aWV3LXZlY3RvclwiPjwvZGl2PicpO1xuICAgICAgICAvL3RoaXMuaGlnaGxpZ2h0TGF5ZXIgPSAkKCc8ZGl2IGNsYXNzPVwicGF0aC12aWV3LWhpZ2hsaWdodFwiPjwvZGl2PicpO1xuICAgICAgICAvL3RoaXMuc2VsZWN0ZWRMYXllciA9ICQoJzxkaXYgY2xhc3M9XCJwYXRoLXZpZXctc2VsZWN0XCI+PC9kaXY+JylcbiAgICAgICAgdGhpcy50ZXh0TGF5ZXIgPSAkKCc8ZGl2IGNsYXNzPVwicGF0aC12aWV3LWh0bWxcIj48L2Rpdj4nKTtcblxuICAgICAgICB0aGlzLmNvbnRleHRcbiAgICAgICAgICAgICAgICAuYXBwZW5kKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKHRoaXMudmVjdG9yTGF5ZXIpXG4gICAgICAgIC8vICAgICAgLmFwcGVuZCh0aGlzLmhpZ2hsaWdodExheWVyKVxuICAgICAgICAvLyAgICAgIC5hcHBlbmQodGhpcy5zZWxlY3RlZExheWVyKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQodGhpcy50ZXh0TGF5ZXIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIGluaXRpYWxpc2VMYXllcnM6IChmdW5jdGlvbiAoKXtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXRTaXplID0gZnVuY3Rpb24gKGxheWVycywgd2lkdGgsIGhlaWdodCwgc2NhbGUpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkLmVhY2gobGF5ZXJzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFsdWUuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCAqIHNjYWxlICxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgKiBzY2FsZVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpe1xuXG4gICAgICAgICAgICBzZXRTaXplKFt0aGlzLnZlY3RvckxheWVyLCB0aGlzLnRleHRMYXllcl0sIHRoaXMucHJvcGVydGllcy5wYXRoV2lkdGgsIHRoaXMucHJvcGVydGllcy5wYXRoSGVpZ2h0LCB0aGlzLnNjYWxlKTtcblxuICAgICAgICAgICAgdGhpcy5wbGFuZXRMYXllciA9IHBsYW5ldCh0aGlzLnZlY3RvckxheWVyKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0cyA9IHBsYW5ldCh0aGlzLnZlY3RvckxheWVyKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0cyA9IHBsYW5ldCh0aGlzLnZlY3RvckxheWVyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgfTtcblxuICAgIH0oKSksXG5cbiAgICBpbml0aWFsaXNlUGF0aEFuZE5vZGVzIDogZnVuY3Rpb24gKCBkYXRhICl7XG4gICAgICAgIFxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbWF4V2lkdGggPSAwLFxuICAgICAgICAgICAgbWF4SGVpZ2h0ID0gMCxcbiAgICAgICAgICAgIGdlb21ldHJ5O1xuXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAobm9kZSl7XG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIG5vZGUgb2JqZWN0XG4gICAgICAgICAgICBub2RlLmdlb21ldHJ5LndpZHRoICs9IG5vZGUuZ2VvbWV0cnkud2lkdGg7XG4gICAgICAgICAgICBub2RlLmdlb21ldHJ5LmhlaWdodCArPSBub2RlLmdlb21ldHJ5LmhlaWdodDtcblxuICAgICAgICAgICAgbm9kZS5nZW9tZXRyeS50b3AgLT0gKG5vZGUuZ2VvbWV0cnkuaGVpZ2h0ICogMC41KTtcbiAgICAgICAgICAgIG5vZGUuZ2VvbWV0cnkubGVmdCAtPSAobm9kZS5nZW9tZXRyeS53aWR0aCAqIDAuNSlcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBub2RlLmdlb21ldHJ5LnRvcCArPSBjYW52YXNNYXJnaW47XG4gICAgICAgICAgICBub2RlLmdlb21ldHJ5LmxlZnQgKz0gY2FudmFzTWFyZ2luO1xuXG5cblxuICAgICAgICAgICAgX3RoaXMubm9kZXNbbm9kZS5pZF0gPSBuZXcgUGF0aE5vZGUoIG5vZGUsIF90aGlzLnRleHRMYXllciwgX3RoaXMuaXNQcmludCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gY29sbGFwc2UgdGhlIHJlZmVyZW5jZVxuICAgICAgICAgICAgZ2VvbWV0cnkgPSBfdGhpcy5ub2Rlc1tub2RlLmlkXS5BQUJCO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgbWF4V2lkdGgvbWF4SGVpZ2h0IGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYobWF4V2lkdGggPCAoKGdlb21ldHJ5Lmh3ICogMikgKyBnZW9tZXRyeS54ICsgNTApKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtYXhXaWR0aCA9ICgoZ2VvbWV0cnkuaHcgKiAyKSArIGdlb21ldHJ5LnggKyA1MCk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG1heEhlaWdodCA8ICgoZ2VvbWV0cnkuaGggKiAyKSArIGdlb21ldHJ5LnkgKyAxMDApKXtcblxuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9ICgoZ2VvbWV0cnkuaGggKiAyKSArIGdlb21ldHJ5LnkgKyAxMDApO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucGF0aFdpZHRoID0gbWF4V2lkdGg7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wYXRoSGVpZ2h0ID0gTWF0aC5tYXgoNDAwLCBtYXhIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuc3BhdGlhbEluZGV4ID0gbmV3IFF1YWRUcmVlKCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFBQkI6IG5ldyBCb3VuZGluZ0JveChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMkQoMCwgMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjJEKHRoaXMucHJvcGVydGllcy5wYXRoV2lkdGgsIHRoaXMucHJvcGVydGllcy5wYXRoSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9KTtcblxuICAgICAgICAkLmVhY2godGhpcy5ub2RlcywgZnVuY3Rpb24gKGlkLCBub2RlKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgX3RoaXMuc3BhdGlhbEluZGV4LnB1c2goIHtBQUJCIDogbm9kZS5BQUJCLCBkYXRhOiBub2RlfSApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIGluaXRpYWxpc2VFZGdlcyA6IGZ1bmN0aW9uICggZWRnZXMgKXtcblxuICAgICAgICB2YXIgZGltVGVzdDtcblxuICAgICAgICBlZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKXtcblxuICAgICAgICAgICAgaWYoZWRnZS5sYWJlbCAhPT0gXCJcIil7XG5cbiAgICAgICAgICAgICAgICBkaW1UZXN0ID0gJCgnPGRpdiBjbGFzcz1cImxhYmVsXCIgaWQ9XCJsYWJlbC1kaW0tdGVzdFwiPicgKyBlZGdlLmxhYmVsICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKGRpbVRlc3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGVkZ2UubGFiZWxHZW9tZXRyeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZGltVGVzdC5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRpbVRlc3Qub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJXaWR0aDogZGltVGVzdC5vdXRlcldpZHRoKCkgLSAocGFyc2VJbnQoZGltVGVzdC5jc3MoXCJwYWRkaW5nLWxlZnRcIiksIDEwKSArIHBhcnNlSW50KGRpbVRlc3QuY3NzKFwicGFkZGluZy1yaWdodFwiKSwgMTApKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySGVpZ2h0OiBkaW1UZXN0LmlubmVySGVpZ2h0KCkgLSAocGFyc2VJbnQoZGltVGVzdC5jc3MoXCJwYWRkaW5nLXRvcFwiKSwgMTApICsgcGFyc2VJbnQoZGltVGVzdC5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiKSwgMTApKVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlZGdlLmxhYmVsR2VvbWV0cnkud2lkdGggPiAxNTApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgcmVzdHJpY3QgaXQncyB3aWR0aCBhbmQgbWVhc3VyZSBpdCBhZ2Fpbi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW1UZXN0LmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5jc3MoXCJ3aWR0aFwiLCBcIjE1MHB4XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlLmxhYmVsR2VvbWV0cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkaW1UZXN0Lm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRpbVRlc3Qub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyV2lkdGg6IGRpbVRlc3Qub3V0ZXJXaWR0aCgpIC0gKHBhcnNlSW50KGRpbVRlc3QuY3NzKFwicGFkZGluZy1sZWZ0XCIpLCAxMCkgKyBwYXJzZUludChkaW1UZXN0LmNzcyhcInBhZGRpbmctcmlnaHRcIiksIDEwKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIZWlnaHQ6IGRpbVRlc3QuaW5uZXJIZWlnaHQoKSAtIChwYXJzZUludChkaW1UZXN0LmNzcyhcInBhZGRpbmctdG9wXCIpLCAxMCkgKyBwYXJzZUludChkaW1UZXN0LmNzcyhcInBhZGRpbmctYm90dG9tXCIpLCAxMCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkaW1UZXN0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVkZ2Vncm91cHMgPSBwcm9jZXNzRWRnZUdyb3VwcyggY3JlYXRlRWRnZUdyb3VwcyggZWRnZXMsIHRoaXMubm9kZXMgKSwgdGhpcy5zcGF0aWFsSW5kZXggKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBnZXROb2RlR2VvbWV0cnkgOiBmdW5jdGlvbiAoIG5vZGVpZCApe1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5ub2Rlc1tub2RlaWRdKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbbm9kZWlkXS5BQUJCO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0aWFsaXNlTGFiZWxzIDogZnVuY3Rpb24gKCl7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICByZXNldFZpZXcgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgXG4gICAgICAgIC8vIGdldCByaWQgb2YgYWxsIGhpZ2hsaWdodGluZyBhbmQgc2VsZWN0aW5nLlxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIHNlbGVjdE5vZGUgOiBmdW5jdGlvbiAoaWQpe1xuICAgICAgICBcbiAgICAgICAgLy8gd2Ugb25seSB3YW50IG9uZSBzZWxlY3RlZCBub2RlLi5cblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZXNbaWRdKXtcblxuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZE5vZGUhPT0gaWQpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZE5vZGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZE5vZGVdLmh0bWxGcmFnbWVudC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZSA9IGlkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ub2Rlc1tpZF0uZHJhd0FzU2VsZWN0ZWQodGhpcy5zZWxlY3RzLCB0aGlzLnNjYWxlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMubm9kZXNbdGhpcy5zZWxlY3RlZE5vZGVdKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdHMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzW3RoaXMuc2VsZWN0ZWROb2RlXS5odG1sRnJhZ21lbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9LFxuXG4gICAgZ2V0TGFuZGluZ05vZGVJZCA6IGZ1bmN0aW9uICgpe1xuXG4gICAgICAgIHZhciBoaWdoZXN0Tm9kZSA9IG51bGw7XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMubm9kZXMpeyBcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkoaSkpe1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoaWdoZXN0Tm9kZSB8fCB0aGlzLm5vZGVzW2ldLmdlb21ldHJ5LnRvcCA8IGhpZ2hlc3ROb2RlLmdlb21ldHJ5LnRvcCl7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3ROb2RlID0gdGhpcy5ub2Rlc1tpXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGVzW2ldLnR5cGU9PT1cImxhbmRpbmdcIil7IFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpXS5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3QgZm91bmQgYSBsYW5kaW5nIG5vZGU/IFJldHVybiB0aGUgaWQgZm9yIHRoZSBoaWdoZXN0IG5vZGUgaW4gdGhlIHBhZ2UuLlxuXG4gICAgICAgIHJldHVybiBoaWdoZXN0Tm9kZS5pZDtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgY2xlYXJEb3duIDogZnVuY3Rpb24gKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRleHQuZW1wdHkoKTtcblxuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoVmlldztcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKlxuKiBGaWxlbmFtZTogICAgIFBvaW50LmpzXG4qIERlc2NyaXB0aW9uOiAgRm9yIGNyZWF0aW5nIGFuZCBwcm9jZXNzaW5nIHBvaW50c1xuKiAgIFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBWZWN0b3IyRCA9IHJlcXVpcmUoJy4vdmVjdG9yLXByb2Nlc3NpbmctYW5kLWJvdW5kaW5nLWJveCcpLlZlY3RvcjJEO1xuXG5mdW5jdGlvbiBQb2ludCAocG9pbnQsIHZlY3Rvcil7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIHRoaXMucG9pbnQgPSBuZXcgVmVjdG9yMkQocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICAgIHRoaXMudmVjdG9yID0gdmVjdG9yID8gbmV3IFZlY3RvcjJEKHZlY3Rvci54LCB2ZWN0b3IueSkgOiBuZXcgVmVjdG9yMkQoMCwwKTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLnBvaW50Lng7XG4gICAgICAgIHRoaXMueSA9IHRoaXMucG9pbnQueTtcbiAgICAgICAgdGhpcy52eCA9IHRoaXMudmVjdG9yLng7XG4gICAgICAgIHRoaXMudnkgPSB0aGlzLnZlY3Rvci55O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfWNhdGNoKGUpe1xuXG4gICAgICAgIHJldHVybiB7fTtcblxuICAgIH1cbn1cblxuUG9pbnQucHJvdG90eXBlID0ge1xuXG4gICAgY29tcGFyZURpcmVjdGlvbiA6IGZ1bmN0aW9uICggcG9pbnQpe1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yLmRvdFByb2R1Y3QocG9pbnQudmVjdG9yKTtcblxuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludDtcblxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qXG4qIEZpbGVuYW1lOiAgICAgUXVhZHRyZWUuanNcbiogRGVzY3JpcHRpb246ICBBIHdheSBvZiBlZmZpY2llbnRseSBxdWVyeWluZyB3aGF0IG5vZGVzIGFyZSB3aGVyZVxuKiAgICAgICAgICAgICAgIEFBQkIgc3RhbmRzIGZvciBBeGlzIEFsaWduZWQgQm91bmRpbmcgQm94XG4qXG4qICAgICAgICAgICAgICAgcVRyZWUgbm9kZXMgaGF2ZSBlaXRoZXIgbGlua3MgdG8gb3RoZXIgbm9kZXMsIG9yIGFyZVxuKiAgICAgICAgICAgICAgIGJ1Y2tldHMuIExpbmtzIHRvIG90aGVyIG5vZGVzIGFyZSBbMF0sWzFdLFsyXSxbM11cbiogICAgICAgICAgICAgICByZXByZXNlbnRpbmcgZWFjaCBjb3JuZXIgb2YgdGhlIHNwYWNlIDAgPSBOVyBhbmQgdGhlIHJlc3RcbiogICAgICAgICAgICAgICBnbyBjbG9ja3dpc2Ugcm91bmQuXG4qXG4qICAgICAgICAgICAgICAgVGhpcyBjb2RlIGhhcyBhIGRlcGVuZGVuY3k6IHBhdGh3YXlzLmJvdW5kaW5nQm94IGFuZCBwYXRod2F5cy52ZWN0b3IyRFxuKiAgICAgICAgICAgICAgIHdoaWNoIGFyZSB1c2VkIHRvZ2V0aGVyIHRvIHByb3ZpZGUgdGhlIGNvbGxpc2lvbiBkZXRlY3Rpb24gZnVuY3Rpb25hbGl0eS5cbiogICAgICAgICAgICAgICBcbiogICAgICAgICAgICAgICBBbHRlcm5hdGl2ZSBib3VuZGluZyBib3ggbGlicyBjb3VsZCBiZSB1c2VkLCBidXQgdGhleSBtdXN0IHN1cHBvcnQgdGhlIGZvbGxvd2luZ1xuKiAgICAgICAgICAgICAgIG1ldGhvZHM6IGdldENvbGxpZGluZ1F1YWRyYW50cygpLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgdHJ1ZS9mYWxzZSByZXByZXNlbnRpbmcsIGluIGNsb2Nrd2lzZVxuKiAgICAgICAgICAgICAgIG9yZGVyLCBudyB0byBzdyBBTkQgc3ViZGl2aWRlKCksIHdoaWNoIHJldHVybnMgNCBuZXcgaW5zdGFuY2VzIG9mIGl0c2VsZiwgc3BsaXQgaW50byBxdWFydGVycy5cbiogICBcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5mdW5jdGlvbiBRdWFkVHJlZU5vZGUgKCBvYmogKXtcblxuICAgIGlmKCFvYmouQUFCQil7XG4gICAgICAgIHRocm93KFwiQ2Fubm90IGNyZWF0ZSBhIHFOb2RlIHdpdGhvdXQgYm91bmRpbmcgYm94IGRhdGFcIik7XG4gICAgfVxuICAgIC8vIHdlIGtlZXAgYSByZWNvcmQgb2YgdGhpcyBub2RlJ3MgYm91bmRpbmcgYm94XG4gICAgdGhpcy5BQUJCID0gb2JqLkFBQkI7XG5cbiAgICAvLyBhbmQgd2UgdHJhY2sgdGhlIGRlcHRoLiBJdCdzIHBvc3NpYmxlIHdlIGNhbiB1c2UgZGVwdGggYmFzZWQgbGltaXRpbmcgcmF0aGVyIHRoYW4gcmVzb2x1dGlvbiBiYXNlZCBsaW1pdGluZy5cbiAgICB0aGlzLmRlcHRoID0gb2JqLmRlcHRoICsgMSB8fCAwO1xuXG4gICAgLy8gSWYgdGhlcmUncyBkYXRhLCB0aGVuIHdlIHB1dCB0aGF0IGRhdGEgaW4gdGhlIGJ1Y2tldC5cbiAgICBpZihvYmouZGF0YSl7XG5cbiAgICAgICAgdGhpcy5idWNrZXQgPSBbXTtcbiAgICAgICAgdGhpcy5idWNrZXQucHVzaChvYmouZGF0YSk7XG5cbiAgICB9ZWxzZXtcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGNyZWF0ZSBhbiBlbXB0eSBidWNrZXQuXG4gICAgICAgIHRoaXMuYnVja2V0ID0gW107XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcblxufVxuXG5RdWFkVHJlZU5vZGUucHJvdG90eXBlID0ge1xuXG4gICAgLy8gV2UgcHV0IGEgdW5pcXVlIElEIG9uIGVhY2ggcGllY2Ugb2YgZGF0YSB0aGF0IGdvZXMgaW5cbiAgICBxVHJlZVVJRCA6IDAsXG5cbiAgICAvLyBUaGUgcHVzaCBtZXRob2QgaXMgYSByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBwdXNoZXMgZGF0YSBkb3duIGludG8gdGhlIHRyZWVcbiAgICBwdXNoIDogZnVuY3Rpb24oIG9iaiApe1xuXG4gICAgICAgIC8vIElmIHRoZSBkYXRhIGRvZXNuJ3QgYWxyZWFkeSBoYXZlIGEgcVRyZWVVSUQsIGdpdmUgaXQgb25lLiBUaGlzIGlzIHNvIHRoYXRcbiAgICAgICAgLy8gd2hlbiBwdWxsaW5nIHRoZSBkYXRhIGJhY2sgb3V0LCB3ZSBkb24ndCByZXR1cm4gZHVwbGljYXRlIHJlc3VsdHNcbiAgICAgICAgaWYoIW9iai5kYXRhLnFUcmVlVUlEKXtcbiAgICAgICAgICAgIG9iai5kYXRhLnFUcmVlVUlEID0gKyt0aGlzLnFUcmVlVUlEO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBjaGVjayB0aGF0IHRoZXJlJ3MgYmVlbiB2YWxpZCBzdHVmZiBwYXNzZWQgdG8gaXQuLlxuICAgICAgICBpZighb2JqLmRhdGEgJiYgIW9iai5BQUJCICYmICFvYmouQUFCQi50ZXN0Rm9yQ29sbGlzaW9uKXtcblxuICAgICAgICAgICAgdGhyb3coXCJJbnZhbGlkIGRhdGEgYXR0ZW1wdGVkIHRvIGJlIHB1c2hlZCB0byBxdWFkdHJlZVwiKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIEl0J3MgYSBRdWFkIFRyZWUuIFRoZXJlIGFyZSA0IFF1YWRzLiBXZSBuZWVkIHRvIGtub3cgd2hpY2ggUXVhZHMgYXJlIHJlbGV2YW50IHRvIHRoaXMgZGF0YVxuICAgICAgICAgICAgdmFyIG1hdGNoaW5nQ29ybmVycyA9IHRoaXMuZ2V0TWF0Y2hpbmdDb3JuZXJzUHVzaCggb2JqLkFBQkIgKSwgaW5kZXgsIGlzTWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBlbmd1bGZlZCBpcyBhIHNwZWNpYWwgdGhpbmcuIEl0IG1lYW5zIHRoYXQgdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgZGF0YSBiZWluZyBwdXNoZWRcbiAgICAgICAgICAgIC8vIGlzIGJpZ2dlciB0aGFuIHRoZSBRdWFkLiBJdCdzIFwiRW5ndWxmZWRcIiBhbmQgd2UgZG9uJ3QgYm90aGVyIHRvIHN1YmRpdmlkZSBhbnkgZnVydGhlci5cbiAgICAgICAgICAgIGlmKG1hdGNoaW5nQ29ybmVycz09PSdlbmd1bGZlZCcpe1xuXG4gICAgICAgICAgICAgICAgLy8gd2UganVzdCBjb3B5IGEgcmVmZXJlbmNlIHRvIHRoZSBkYXRhIGludG8gdGhlIGJ1Y2tldC5cbiAgICAgICAgICAgICAgICBpZighdGhpcy5idWNrZXQpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWNrZXQgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5idWNrZXQucHVzaChvYmouZGF0YSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGVpdGhlciBoYXZlIG5vIG1hdGNoLCBvciBhIGJ1bmNoIG9mIG1hdGNoZXMsIFxuICAgICAgICAgICAgICAgIC8vICh0ZWNobmljYWxseSwgcXVhZHMgdGhhdCB0aGlzIGRhdGEgc2hvdWxkIGJlIHB1c2hlZCBkb3duIHRvKVxuICAgICAgICAgICAgICAgIGlmKG1hdGNoaW5nQ29ybmVycyE9PVwibm8gbWF0Y2hcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQSBub2RlIGNhbiBiZSBhIGJ1Y2tldCBvciBhIGxlYWYuIElmIGl0J3MgZ290IGEgbWVtYmVyIHRoaXNbMF0gaXQncyBwcm9iYWJseSBhIGxlYWYuXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzWzBdKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGhhbGYtd2lkdGggb2YgdGhpcyBwYXJ0aWN1bGFyIGxlYWYgaXMgYWJvdmUgMTIsIHdlIGFsbG93IGZ1cnRoZXIgc3ViZGl2aXNpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkFBQkIuaHcgPiA4KXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoYW5rZnVsbHkgdGhlIGJvdW5kaW5nIGJveCB1dGlscyBoYXZlIGEgJ3N1YmRpdmlkZScgbWV0aG9kLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJkaXZzID0gdGhpcy5BQUJCLnN1YmRpdmlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW5kIHRoZW4gd2UgdGFrZSB0aGVzZSBuZXcgYm91bmRpbmcgYm94ZXMgYW5kIGNyZWF0ZSBuZXcgcU5vZGVzLCBwYXNzaW5nIHRoZSBkZXB0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbMF0gPSBuZXcgUXVhZFRyZWVOb2RlKHsgQUFCQjogc3ViZGl2cy5udywgZGVwdGggOiB0aGlzLmRlcHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbMV0gPSBuZXcgUXVhZFRyZWVOb2RlKHsgQUFCQjogc3ViZGl2cy5uZSwgZGVwdGggOiB0aGlzLmRlcHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbMl0gPSBuZXcgUXVhZFRyZWVOb2RlKHsgQUFCQjogc3ViZGl2cy5zZSwgZGVwdGggOiB0aGlzLmRlcHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbM10gPSBuZXcgUXVhZFRyZWVOb2RlKHsgQUFCQjogc3ViZGl2cy5zdywgZGVwdGggOiB0aGlzLmRlcHRoIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW5kIHdlIGdldCByaWQgb2YgdGhlIGJ1Y2tldCwgdHVybmluZyB0aGlzIHFOb2RlIGludG8gYSBsZWFmLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmJ1Y2tldDtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBhbHJlYWR5IHN1YmRpdmlkZWQgdG9vIGZhciwgc28gd2UgYnVja2V0aXplIHRoaXMgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVja2V0LnB1c2gob2JqLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlJ3ZlIHN1YmRpdmlkZWQgbm93LCBvciB3ZXJlIGFscmVhZHkgc3ViZGl2aWRlZC4gVGltZSB0byBwdXNoIHRoZSBkYXRhIGRvd24uLi5cblxuICAgICAgICAgICAgICAgICAgICAvLyA0IGNvcm5lcnMuLi5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSA0O1xuICAgICAgICAgICAgICAgICAgICAvLyBTdXBlciBFZmZpY2llbnQgTG9vcCBCYWNrd2FyZHNcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoaW5kZXgtLSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBtYXRjaGVzIHRoaXMgY29ybmVyLi4uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtYXRjaGluZ0Nvcm5lcnNbaW5kZXhdPT09dHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCB0aGUgZGF0YSBkb3duIChyZWN1cnNpdmVseSBpbnZva2luZyBwdXNoIGFnYWluKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaW5kZXhdLnB1c2goeyBkYXRhOiBvYmouZGF0YSwgQUFCQjogb2JqLkFBQkJ9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIC8vIHF1ZXJ5IHJldHVybnMgYWxsIGRhdGEgaW4gYSBnaXZlbiBhcmVhIG9mIHNwYWNlXG5cbiAgICBxdWVyeSA6IGZ1bmN0aW9uICggb2JqLCByZXN1bHRzLCBtYXRjaGVzICl7XG4gICAgICAgIC8vIGFuIGFycmF5IHRvIGhvbGQgcmVzdWx0c1xuICAgICAgICBpZighcmVzdWx0cyl7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gYW4gYXJyYXkgdG8gaG9sZCB1bmlxdWUgcVRyZWVVSURzXG4gICAgICAgIGlmKCFtYXRjaGVzKXtcbiAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuYnVja2V0KXtcbiAgICAgICAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGZvdW5kIGEgYnVja2V0LCByZXR1cm4gaXQgYW5kIGJhY2sgdXAgd2UgZ29cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1Y2tldDtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgLy8gZmluZCB3aGljaCBjb3JuZXJzIG1hdGNoLi5cbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0Nvcm5lcnMgPSB0aGlzLmdldE1hdGNoaW5nQ29ybmVyc1F1ZXJ5KCBvYmogKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUncyBhIG1hdGNoLi4uXG4gICAgICAgICAgICBpZihtYXRjaGluZ0Nvcm5lcnMhPT1cIm5vIG1hdGNoXCIpe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIDQgY29ybmVycy4uLlxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDQ7XG5cbiAgICAgICAgICAgICAgICAvLyB3aGljaCB3ZSBsb29wIHRocm91Z2ggZWZmaWNpZW50bHkuLi5cbiAgICAgICAgICAgICAgICB3aGlsZShpbmRleC0tKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgZmluZCBhIG1hdGNoLi4uXG4gICAgICAgICAgICAgICAgICAgIGlmKG1hdGNoaW5nQ29ybmVyc1tpbmRleF09PT10cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHJlY3Vyc2l2ZWx5IGludm9rZSBxdWVyeSBvbiB0aGUgY2hpbGQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzW2luZGV4XS5xdWVyeSggb2JqLCByZXN1bHRzLCBtYXRjaGVzICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBidWNrZXQgd2l0aCBkYXRhIGFuZCBxVHJlZVVJRCwgYW5kIHdlIGhhdmVuJ3QgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm91bmQgdGhpcyBwYXJ0aWN1bGFyIHBpZWNlIG9mIGRhdGEuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbMF0gJiYgZGF0YVswXS5xVHJlZVVJRCAmJiAhbWF0Y2hlc1tkYXRhWzBdLnFUcmVlVUlEXSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgbWFyayB0aGF0IHdlJ3ZlIGZvdW5kIGl0IGluICdtYXRjaGVzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzW2RhdGFbMF0ucVRyZWVVSURdID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgd2UgcHVzaCB0aGUgZGF0YSBpbnRvIHJlc3VsdHMuIFRoZSByZXN1bHRzIGFyZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRhdGFbMF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB3ZSByZXR1cm4gdGhlIGZpbmFsIHJlc3VsdHMgaGVyZS5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgZ2V0TWF0Y2hpbmdDb3JuZXJzUHVzaCA6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgIC8vIHRoaXMganVzdCBpbnZva2VzIHRoZSBnZXRDb2xsaWRpbmdRdWFkcmFudHMgbWV0aG9kIG9mIHRoZSBib3VuZGluZyBib3guXG5cbiAgICAgICAgLy8gSXQgcmV0dXJucyBlaXRoZXIgYW4gYXJyYXkgb2YgbWF0Y2hpbmcgcXVhZHJhbnRzIGluIHRlaCBmb3JtLCBbdHJ1ZV0sW2ZhbHNlXSxbdHJ1ZV0sW2ZhbHNlXSBldGNcbiAgICAgICAgLy8gb3IgJ25vIG1hdGNoJyBvciAnZW5ndWxmZWQnLiBFYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5IGlzIHRydWUgb3IgZmFsc2UsIGFuZCBnbyBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxuICAgICAgICAvLyBudywgbmUsIHNlLCBzdy4gXG5cbiAgICAgICAgLy8gJ25vIG1hdGNoJyBtZWFucyB0aGF0IHRoZSBvYmplY3QgYmVpbmcgcHVzaGVkIGRvZXNuJ3QgY29sbGlkZSB3aXRoIGFueSBvZiB0aGUgcXVhZHMgaW4gdGhpcyBxTm9kZVxuICAgICAgICAvLyAnZW5ndWxmZWQnIG1lYW5zIHRoYXQgdGhlIG9iamVjdCBiZWluZyBwdXNoZWQgaXMgQklHR0VSIGFuZCB0b3RhbGx5IHN1cnJvdW5kcyB0aGUgZW50aXJlIHFOb2RlLFxuICAgICAgICAvLyB3aGljaCBtZWFucyB0aGF0IHRoaXMgcU5vZGUgc2hvdWxkIGJlY29tZSBhIGJ1Y2tldCByYXRoZXIgdGhhbiBzdWJkaXZpZGluZyBmdXJ0aGVyLlxuXG4gICAgICAgIHJldHVybiB0aGlzLkFBQkIuZ2V0Q29sbGlkaW5nUXVhZHJhbnRzKG9iaik7XG5cbiAgICB9LFxuXG4gICAgZ2V0TWF0Y2hpbmdDb3JuZXJzUXVlcnkgOiBmdW5jdGlvbihvYmope1xuICAgICAgICAvLyB0aGlzIGludm9rZXMgdGhlIHNhbWUgZ2V0Q29sbGlkaW5nUXVhZHJhbnRzIG1ldGhvZCwgYnV0IHdlIGNvbnZlcnRcbiAgICAgICAgLy8gYW4gJ2VuZ3VsZmVkJyBzaWduYWwgaW50byBbdHJ1ZV0sW3RydWVdLFt0cnVlXSxbdHJ1ZV0uIFxuXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSwgYXMgd2UgZ2V0IGRlZXBlciBpbnRvIHRoZSB0cmVlLCB0aGUgc2l6ZSBvZiBhIHFOb2RlIG1heSBlbmQgdXAgYmVpbmcgXG4gICAgICAgIC8vIHNtYWxsZXIgdGhhbiB0aGUgYXJlYSBiZWluZyBxdWVyaWVkIGFuZCwgaW4gZmFjdCwgc2l0IGluc2lkZSBpdCBjb21wbGV0ZWx5LlxuXG4gICAgICAgIC8vIFdoZW4gcHVzaGluZyB3ZSB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBwcmV2ZW50IGZ1cnRoZXIgc3ViZGl2aXNpb24sIGJ1dCB3aGVuIHF1ZXJ5aW5nXG4gICAgICAgIC8vIHdlIHdhbnQga2VlcCBnb2luZyBkb3duIGludG8gdGhlIHRyZWUgdG8gZmluZCBidWNrZXRzLCB3aGljaCAnZW5ndWxmZWQnIHNpZ25hbHMgYmxvY2suXG5cbiAgICAgICAgdmFyIG1hdGNoZXMgPSB0aGlzLkFBQkIuZ2V0Q29sbGlkaW5nUXVhZHJhbnRzKG9iaik7XG5cbiAgICAgICAgaWYobWF0Y2hlcz09PVwiZW5ndWxmZWRcIil7XG4gICAgICAgICAgICByZXR1cm4gW3RydWUsIHRydWUsIHRydWUsIHRydWVdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgICAgICB9ICAgXG5cbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzLlF1YWRUcmVlID0gbW9kdWxlLmV4cG9ydHMuUU5vZGUgPSBRdWFkVHJlZU5vZGU7IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qXG4qIEZpbGVuYW1lOiAgICAgdmVjdG9yLXByb2Nlc3NpbmctYW5kLWJvdW5kaW5nLWJveC5qc1xuKiBEZXNjcmlwdGlvbjogIEhlbHBlcnMgZm9yIGRlYWxpbmcgd2l0aCBjb2xsaXNpb24gZGV0ZWN0aW9uXG4qICAgXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZnVuY3Rpb24gVmVjdG9yMkQgKHgsIHkpe1xuXG4gICAgdHJ5IHtcblxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICB0aHJvdyAoXCJJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMgdG8gVmVjdG9yMkRcIik7XG4gICAgfVxuXG59XG5cblZlY3RvcjJELnByb3RvdHlwZSA9IHtcblxuICAgIHRvU3RyaW5nIDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFwieCA6IFwiICsgdGhpcy54ICsgXCIsIHkgOiBcIiArIHRoaXMueTtcbiAgICB9LFxuICAgIHRyYW5zbGF0ZSA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBhcmd1bWVudHNbMF09PT0nbnVtYmVyJyAmJiB0eXBlb2YgYXJndW1lbnRzWzFdPT09J251bWJlcicpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgeCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB5ID0gYXJndW1lbnRzWzFdOyAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9ZWxzZSBpZihpc1ZlY3RvcjJEKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgeCA9IGFyZ3VtZW50c1swXS54O1xuICAgICAgICAgICAgICAgIHkgPSBhcmd1bWVudHNbMF0ueTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy54ICs9IHg7XG4gICAgICAgICAgICB0aGlzLnkgKz0geTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG1vdmUgOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgeCwgeTtcbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaWYodHlwZW9mIGFyZ3VtZW50c1swXT09PSdudW1iZXInICYmIHR5cGVvZiBhcmd1bWVudHNbMV09PT0nbnVtYmVyJyl7XG4gICAgICAgICAgICAgICAgeCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB5ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgfWVsc2UgaWYoaXNWZWN0b3IyRChhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICB4ID0gYXJndW1lbnRzWzBdLng7XG4gICAgICAgICAgICAgICAgeSA9IGFyZ3VtZW50c1swXS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgXG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgICAgIHkgPSAwO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9LFxuICAgIGNsb25lIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGNvcHkgPSBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIGNsb25lLCB0cmFuc2xhdGVkXG4gICAgICAgICAgICBpZih0eXBlb2YgYXJndW1lbnRzWzBdPT09J251bWJlcicgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXT09PSdudW1iZXInKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29weS50cmFuc2xhdGUoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcHkudHJhbnNsYXRlKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBleGlzdGluZyBvYmplY3RcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBNb3JlIGFkdmFuY2VkIG1hdGhzIGhlcmUuLi4uXG4gICAgZG90UHJvZHVjdCA6IGZ1bmN0aW9uKHBvaW50KXtcblxuICAgICAgICB2YXIgYl9vcDtcbiAgICAgICAgaWYocG9pbnQgJiYgaXNWZWN0b3IyRChwb2ludCkpe1xuICAgICAgICAgICAgLy8gYS5iXG4gICAgICAgICAgICBiX29wID0gcG9pbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyBhLmFcbiAgICAgICAgICAgIGJfb3AgPSB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLnggKiBiX29wLngpICsgKHRoaXMueSAqIGJfb3AueSk7XG4gICAgfSxcbiAgICBub3JtYWxpc2UgOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGgoKTtcbiAgICAgICAgdGhpcy54ID0gdGhpcy54IC8gbGVuO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLnkgLyBsZW47XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGdldE5vcm1hbCA6IGZ1bmN0aW9uKCBmbGFnICl7XG4gICAgICAgIGlmKGZsYWcpe1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKDAgLSB0aGlzLnksIHRoaXMueCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMueSwgMCAtIHRoaXMueCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGxlbmd0aCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3RQcm9kdWN0KCkpO1xuICAgIH0sXG4gICAgZGlzdGFuY2UgOiBmdW5jdGlvbihwb2ludCl7XG4gICAgICAgIGlmKHBvaW50ICYmIGlzVmVjdG9yMkQocG9pbnQpKXtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3RQcm9kdWN0KHBvaW50KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoKCk7XG4gICAgfSAgICAgICBcbn07XG5cbmZ1bmN0aW9uIEJvdW5kaW5nQm94IChwb3NpdGlvbiwgc2l6ZSl7XG5cbiAgICB2YXIgX3Bvcyxfc2l6ZTtcblxuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGg9PT0yICYmIHBvc2l0aW9uICYmIHNpemUgJiYgaXNWZWN0b3IyRChwb3NpdGlvbikgJiYgaXNWZWN0b3IyRChzaXplKSl7XG4gICAgXG4gICAgICAgIF9wb3MgPSBwb3NpdGlvbjtcbiAgICAgICAgX3NpemUgPSBzaXplO1xuICAgIFxuICAgIH1lbHNle1xuXG4gICAgICAgIF9wb3MgPSBuZXcgVmVjdG9yMkQoMCwwKTtcbiAgICAgICAgX3NpemUgPSBuZXcgVmVjdG9yMkQoMSwxKTtcblxuICAgIH1cbiAgICB0aGlzLnggPSBfcG9zLng7XG4gICAgdGhpcy55ID0gX3Bvcy55O1xuICAgIHRoaXMuaHcgPSBfc2l6ZS54IC8gMjtcbiAgICB0aGlzLmhoID0gX3NpemUueSAvIDI7XG5cbiAgICByZXR1cm4gdGhpcztcblxufVxuXG5Cb3VuZGluZ0JveC5wcm90b3R5cGUgPSB7XG5cbiAgICBwb3NpdGlvbiA6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIF9wb3M7XG5cbiAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aD09PTApe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XG5cbiAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBhcmd1bWVudHNbMF09PT1cIm51bWJlclwiICYmIHR5cGVvZiBhcmd1bWVudHNbMV09PT1cIm51bWJlclwiKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF9wb3MgPSBuZXcgVmVjdG9yMkQoYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9ZWxzZSBpZihuZXcgVmVjdG9yMkQoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgX3BvcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnggPSBfcG9zLng7XG4gICAgICAgICAgICB0aGlzLnkgPSBfcG9zLnk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNpemUgOiBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciBfc2l6ZTtcblxuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoPT09MCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHRoaXMuaHcgKiAyLCB0aGlzLmhoICogMik7XG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgYXJndW1lbnRzWzBdPT09XCJudW1iZXJcIiAmJiB0eXBlb2YgYXJndW1lbnRzWzFdPT09XCJudW1iZXJcIil7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBfc2l6ZSA9IG5ldyBWZWN0b3IyRChhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNlIGlmKGlzVmVjdG9yMkQoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgX3NpemUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5odyA9IF9zaXplLnggLyAyO1xuICAgICAgICAgICAgdGhpcy5oaCA9IF9zaXplLnkgLyAyO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICB9XG4gICAgfSxcbiAgICB0ZXN0Rm9yQ29sbGlzaW9uIDogZnVuY3Rpb24oIG9iaiApe1xuICAgICAgICAvLyBvYmogbXVzdCBiZSBhbm90aGVyIGJvdW5kaW5nQm94MkRcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgIC8vICB0b3RhbCB3aWR0aCBvZiAgICAgLSAgICAgIHggKyBoYWxmIHdpZHRoICAgLSAgb3RoZXIgeCArIGhhbGYgd2l0ZHRoXG4gICAgICAgICAgICAgICAgICAgLy8gdGhlIHR3byBoYWx2ZXMuLi5cbiAgICAgICAgICAgIHZhciBweCA9IChvYmouaHcgKyB0aGlzLmh3KSAtIE1hdGguYWJzKCh0aGlzLnggKyB0aGlzLmh3KSAtIChvYmoueCArIG9iai5odykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiBweCBpcyBncmVhdGVyIHRoYW4gemVybyB0aGVyZSdzIG5vIG92ZXJsYXAgb24gdGhpcyBheGlzLCBhbmQgdGhhdCBtZWFucyB0aGVyZSdzIGRlZmluaXRseSBub1xuICAgICAgICAgICAgLy8gY29sbGlzaW9uIC0gY29sbGlzaW9uIG1lYW5zIHRoZXJlJ3MgYW4gb3ZlcmxhcCBvbiBBTEwgYXhpc2VzIHdlIHRlc3QuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKDAgPCBweCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBPa2F5IHNvIHRoZSB4IGF4aXMgb3ZlcmxhcHMuIFdlIGNhbid0IHRlbGwgaWYgdGhlcmUncyBhIGNvbGxpc2lvbiB1bnRpbCB3ZSd2ZVxuICAgICAgICAgICAgICAgIC8vIHRlc3RlZCB0aGUgeSBheGlzIGFzIHdlbGwuIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHB5ID0gKG9iai5oaCArIHRoaXMuaGgpIC0gTWF0aC5hYnMoKHRoaXMueSArIHRoaXMuaGgpIC0gKG9iai55ICsgb2JqLmhoKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoMCA8IHB5KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt4IDogcHgsIHkgOiBweSwgaHcgOiBvYmouaHcsIGhoIDogb2JqLmhofTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICB0aHJvdyhcIkludmFsaWQgb2JqZWN0IHBhc3NlZCB0byBpc1JlY3RXaXRoaW5Cb3VuZHNcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sICAgICAgXG4gICAgc3ViZGl2aWRlIDogZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgc3ViRGl2U2l6ZSwgcmVjdHMgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHN1YkRpdlNpemUgPSBuZXcgVmVjdG9yMkQodGhpcy5odywgdGhpcy5oaCk7XG4gICAgICAgIFxuICAgICAgICByZWN0cy5udyA9IG5ldyBCb3VuZGluZ0JveChuZXcgVmVjdG9yMkQodGhpcy54ICwgdGhpcy55KSwgc3ViRGl2U2l6ZSk7XG4gICAgICAgIHJlY3RzLm5lID0gbmV3IEJvdW5kaW5nQm94KG5ldyBWZWN0b3IyRCh0aGlzLnggKyB0aGlzLmh3LCB0aGlzLnkpLCBzdWJEaXZTaXplKTtcbiAgICAgICAgcmVjdHMuc2UgPSBuZXcgQm91bmRpbmdCb3gobmV3IFZlY3RvcjJEKHRoaXMueCArIHRoaXMuaHcsIHRoaXMueSArIHRoaXMuaGgpLCBzdWJEaXZTaXplKTtcbiAgICAgICAgcmVjdHMuc3cgPSBuZXcgQm91bmRpbmdCb3gobmV3IFZlY3RvcjJEKHRoaXMueCwgdGhpcy55ICsgdGhpcy5oaCksIHN1YkRpdlNpemUpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlY3RzO1xuICAgICAgICBcbiAgICB9LFxuICAgIGdldENvbGxpZGluZ1F1YWRyYW50cyA6IGZ1bmN0aW9uKCBvYmogKXtcbiAgICBcbiAgICAgICAgdmFyIHZlY3RvciA9IG9iai50ZXN0Rm9yQ29sbGlzaW9uKHRoaXMpLFxuICAgICAgICBtYXRjaGVzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXSxcbiAgICAgICAgdG9wID0gdHJ1ZSwgYm90dG9tID0gdHJ1ZSwgbGVmdCA9IHRydWUsIHJpZ2h0ID0gdHJ1ZTtcblxuICAgICAgICBpZih2ZWN0b3Ipe1xuXG4gICAgICAgICAgICBpZih0aGlzLnggPiBvYmoueCl7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnkgPiBvYmoueSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueCArICh0aGlzLmh3ICogMikgPCAgb2JqLngrIChvYmouaHcgKiAyKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueSArICh0aGlzLmhoICogMikgPCBvYmoueSsgKG9iai5oaCAqIDIpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmd1bGZlZFwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYoIChvYmoueCArIChvYmouaHcgKiAyKSkgPCAodGhpcy54ICsgdGhpcy5odykpe1xuICAgICAgICAgICAgICAgICAgICAvLyBjYW4ndCBjb2xsaWRlIHdpdGggcmlnaHQgaGFuZCBxdWFkc1xuICAgICAgICAgICAgICAgICAgICByaWdodCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9ZWxzZSBpZihvYmoueCA+ICh0aGlzLnggKyB0aGlzLmh3KSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbid0IGNvbGxpZGUgd2l0aCBsZWZ0IGhhbmQgcXVhZHNcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCAob2JqLnkgKyAob2JqLmhoICogMikpIDwgKHRoaXMueSArIHRoaXMuaGgpKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FuJ3QgY29sbGlkZSB3aXRoIHJpZ2h0IGhhbmQgcXVhZHNcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1lbHNlIGlmKG9iai55ID4gKHRoaXMueSArIHRoaXMuaGgpKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FuJ3QgY29sbGlkZSB3aXRoIGxlZnQgaGFuZCBxdWFkc1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0b3AgJiYgbGVmdCl7IG1hdGNoZXNbMF0gPSB0cnVlOyB9XG4gICAgICAgICAgICBpZih0b3AgJiYgcmlnaHQpeyBtYXRjaGVzWzFdID0gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYoYm90dG9tICYmIHJpZ2h0KXsgbWF0Y2hlc1syXSA9IHRydWU7IH1cbiAgICAgICAgICAgIGlmKGJvdHRvbSAmJiBsZWZ0KXsgbWF0Y2hlc1szXSA9IHRydWU7IH1cblxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcIm5vIG1hdGNoXCI7XG5cblxuICAgIH0sXG4gICAgdHJhbnNsYXRlIDogZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgX3BvcztcblxuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID4gMCl7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYodHlwZW9mIGFyZ3VtZW50c1swXT09PVwibnVtYmVyXCIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXT09PVwibnVtYmVyXCIpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgX3BvcyA9IG5ldyBWZWN0b3IyRChhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1lbHNlIGlmKGlzVmVjdG9yMkQoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgX3BvcyA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54ICs9IF9wb3MueDtcbiAgICAgICAgICAgIHRoaXMueSArPSBfcG9zLnk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGRyYXcgOiBmdW5jdGlvbihkcmF3Q29udGV4dCwgY29sb3IsIG9wdGlvbil7XG4gICAgICAgIHZhciBjb2xvdXI7XG4gICAgICAgIGlmKCFvcHRpb24pe1xuICAgICAgICAgICAgY29sb3VyID0gY29sb3IgfHwgJ3JnYmEoMjAwLDIwMCwyMDAsMC44KSc7XG4gICAgICAgICAgICBkcmF3Q29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG91cjtcbiAgICAgICAgICAgIGRyYXdDb250ZXh0LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICBkcmF3Q29udGV4dC5zdHJva2VSZWN0KE1hdGgucm91bmQodGhpcy54KSArIDAuNSwgTWF0aC5yb3VuZCh0aGlzLnkpICsgMC41LCBNYXRoLnJvdW5kKHRoaXMuaHcgKiAyKSwgTWF0aC5yb3VuZCh0aGlzLmhoICogMikpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbG91ciA9IGNvbG9yIHx8ICdyZ2JhKDIwMCwyMDAsMjAwLDAuOCknO1xuICAgICAgICAgICAgZHJhd0NvbnRleHQuZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgICAgICAgZHJhd0NvbnRleHQuZmlsbFJlY3QoTWF0aC5yb3VuZCh0aGlzLngpICsgMC41LCBNYXRoLnJvdW5kKHRoaXMueSkgKyAwLjUsIE1hdGgucm91bmQodGhpcy5odyAqIDIpLCBNYXRoLnJvdW5kKHRoaXMuaGggKiAyKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBpc1ZlY3RvcjJEKG9iaiwgdGVzdE1ldGhvZHMpe1xuICAgIHZhciBtZXRob2Q7XG5cbiAgICBpZih0eXBlb2Ygb2JqLng9PT1cIm51bWJlclwiICYmIHR5cGVvZiBvYmoueT09PVwibnVtYmVyXCIpeyAgICAgXG4gICAgXG4gICAgICAgIGlmKHRlc3RNZXRob2RzKXtcbiAgICAgICAgICAgIGZvcihtZXRob2QgaW4gVmVjdG9yMkQucHJvdG90eXBlKXtcbiAgICAgICAgICAgICAgICBpZighb2JqW21ldGhvZF0pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgIFxufVxuXG4vLyBleHBvcnRzLi4uXG5tb2R1bGUuZXhwb3J0cy5Cb3VuZGluZ0JveCA9IEJvdW5kaW5nQm94O1xubW9kdWxlLmV4cG9ydHMuVmVjdG9yMkQgPSBWZWN0b3IyRDtcbm1vZHVsZS5leHBvcnRzLmlzVmVjdG9yMkQgPSBpc1ZlY3RvcjJEO1xuIl19
