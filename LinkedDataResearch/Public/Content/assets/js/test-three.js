/*
Resource bundle created by Combinator (http://combinator.codeplex.com/)

Resources in this bundle:
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/niceorg/NICE.rowlink.js
*/


+function(a){var c=function(d,e){this.$element=a(d);this.options=a.extend({},c.DEFAULTS,e);this.$element.on("click.bs.rowlink","td:not(.rowlink-skip)",a.proxy(this.click,this))};c.DEFAULTS={target:"a"};c.prototype.click=function(d){var g=a(d.currentTarget).closest("tr").find(this.options.target)[0];if(a(d.target)[0]===g){return}d.preventDefault();if(g.click){g.click()}else{if(document.createEvent){var f=document.createEvent("MouseEvents");f.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);g.dispatchEvent(f)}}};var b=a.fn.rowlink;a.fn.rowlink=function(d){return this.each(function(){var e=a(this);var f=e.data("rowlink");if(!f){e.data("rowlink",(f=new c(this,d)))}})};a.fn.rowlink.Constructor=c;a.fn.rowlink.noConflict=function(){a.fn.rowlink=b;return this};a(document).on("click.bs.rowlink.data-api",'[data-link="row"]',function(f){var d=a(this);if(d.data("rowlink")){return}d.rowlink(d.data());a(f.target).trigger("click.bs.rowlink")})}(window.jQuery);
