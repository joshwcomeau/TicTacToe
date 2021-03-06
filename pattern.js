/*
 * patternizer.js
 * v1.01
 * To see what this is capable of, see the UI at patternizer.com
 * 
 * Developed by Matthew Lein
 * matthewlein.com
 * 
 * Released under the MIT license.
 * Please leave this license and author info intact.
 * 
 * Copyright 2011
 */
var patternizer={supportsCanvas:function(){var a=document.createElement("canvas");return !!(a.getContext&&a.getContext("2d"));},isArray:function(a){return a&&!(a.propertyIsEnumerable("length"))&&typeof a==="object"&&typeof a.length==="number";},DEGREES_RADIANS:function(a){return(a*Math.PI/180);},HEX_RGBA:function(e,i){var h=parseInt(e.substring(1,3),16);var f=parseInt(e.substring(3,5),16);var c=parseInt(e.substring(5,7),16);var d=i;return"rgba("+h+","+f+","+c+","+d+")";},stripe:function(c,d){var q=d.stripes;var g=d.bg;var r=c.getContext("2d");var B=c.width;var a=c.height;var z=Math.sqrt((B*B)+(a*a));r.fillStyle=g;r.fillRect(0,0,B,a);for(var v=q.length-1;v>=0;v--){var p=q[v],b=p.opacity/100||0.5,t=patternizer.HEX_RGBA(p.color,b),n=p.mode||"normal",x=p.rotation||0,f=p.width,h=p.offset||0,o=p.gap||f,A=f+o,l=((z*2)+h)/A;r.rotate(patternizer.DEGREES_RADIANS(x));for(var w=0;w<l;w++){if(patternizer.isArray(t)){var e=(A*w)+h,u=(A*w)+h+f,m=r.createLinearGradient(e,0,u,0),y=1/(t.length-1);for(var s=0;s<t.length;s++){m.addColorStop(y*s,t[s]);}r.fillStyle=m;}else{r.fillStyle=t;}r.fillRect(-z+(A*w)-h,-z,f,z*2);if(n==="plaid"){r.fillRect(-z,-z+(A*w)-h,z*2,f);}}r.rotate(-patternizer.DEGREES_RADIANS(x));}}};if(patternizer.supportsCanvas){HTMLCanvasElement.prototype.patternizer=function(a){patternizer.stripe(this,a);return this;};}



function render() {

  bgCanvas.patternizer({
    stripes : [ 
      {
        color: '#f6f6f6',
        rotation: 45,
        opacity: 80,
        mode: 'normal',
        width: 30,
        gap: 10,
        offset: 0
      },
      {
        color: '#e2e2e2',
        rotation: 45,
        opacity: 45,
        mode: 'normal',
        width: 40,
        gap: 10,
        offset: 0
      },
      {
        color: '#757575',
        rotation: 45,
        opacity: 51,
        mode: 'normal',
        width: 11,
        gap: 23,
        offset: 0
      }
    ],
    bg : '#ffffff'
  });
 
}
 
// resize the canvas to the window size
function onResize() {
 
  // number of pixels of extra canvas drawn
  var buffer = 100;

  // if extra canvas size is less than the buffer amount
  if (bgCanvas.width - window.innerWidth < buffer ||
    bgCanvas.height - window.innerHeight < buffer) {

    // resize the canvas to window plus double the buffer
    bgCanvas.width = window.innerWidth + (buffer * 2);
    bgCanvas.height = window.innerHeight + (buffer * 2);

    render();
  }   

}
 
function patternInit() {
  onResize();
  // create a listener for resize
  // cowboy's throttle plugin keeps this event from running hog wild
  window.addEventListener('resize', $.throttle(200, onResize), false);
}
