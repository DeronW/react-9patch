!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.NinePatch=t(require("react")):e.NinePatch=t(e.react)}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.exports=function(e){var t=r(e,4),n=t[1],o=t[3];if("function"==typeof btoa){var a=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),l="/*# ".concat(i," */"),u=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[n].concat(u).concat([l]).join("\n")}return[n].join("\n")}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);n(4);function a({image:e,flex:t,x:n,y:r,w:a,h:i,showRuler:l}){let u=`${t.horizon?100/a+"%":e.width+"px"} ${t.vertical?100/i+"%":e.height+"px"}`,c=n/(1-a)*100+"%",s=r/(1-i)*100+"%",f={backgroundImage:`url(${e.src})`,position:"relative",backgroundRepeat:"no-repeat",backgroundPosition:`${c} ${s}`,backgroundSize:u,boxShadow:l?"0 0 1px black":null},p=e=>({position:"absolute",top:"0",left:"0",width:"100%",height:"100%",opacity:"0.5",background:e}),d=l&&t.horizon?o.a.createElement("div",{style:p("#ffff00")}):null,h=l&&t.vertical?o.a.createElement("div",{style:p("#0000ff")}):null;return o.a.createElement("div",{style:f,className:""},d,h)}function i({image:e,columns:t,rows:n,showRuler:r}){let i=[];for(let e of n)for(let n of t)i.push({showRuler:r,flex:{vertical:e.flexable,horizon:n.flexable},x:n.start,w:n.end-n.start,y:e.start,h:e.end-e.start});return o.a.createElement(o.a.Fragment,null,i.map((t,n)=>o.a.createElement(a,Object.assign({image:e,key:n},t))))}function l(e){let t=[],n=Array.isArray(e[0])?e:[e];for(let e of n){if(0==t.length)0!=e[0]&&t.push({start:0,end:e[0],flexable:!1});else{if(e[1]<=t[t.length-1].end)throw Error("NinePatch parameter Error, later range must bigger than prev");t.push({start:t[t.length-1].end,end:e[0],flexable:!1})}t.push({start:e[0],end:e[1],flexable:!0})}return 1!=t[t.length-1].end&&t.push({start:t[t.length-1].end,end:1,flexable:!1}),t}t.default=function({img:e,x:t,y:n,override:a=!1,showRuler:u=!1,contentX:c,contentY:s,className:f,children:p,width:d,height:h}){let[m,b]=Object(r.useState)({visibility:"hidden"}),[g,y]=Object(r.useState)({}),[v,x]=Object(r.useState)(),w=l(t),j=l(n),S={position:"relative",display:"table",width:"number"==typeof d?d+"px":d,height:"number"==typeof h?h+"px":h};return o.a.createElement("div",{className:f,style:S},o.a.createElement("div",{style:g},p),o.a.createElement("div",{style:m},o.a.createElement("img",{hidden:!0,src:e,onLoad:function(e){let t=e.target,n=w.map(e=>e.flexable?100*(e.end-e.start)+"fr":t.width*(e.end-e.start)+"px").join(" "),r=j.map(e=>e.flexable?100*(e.end-e.start)+"fr":t.height*(e.end-e.start)+"px").join(" ");x(t),b({display:"grid",position:"absolute",top:"0",left:"0",right:"0",bottom:"0",zIndex:a?1:-1,gridTemplateColumns:n,gridTemplateRows:r});let[o,i]=c,[l,f]=s;y({backgroundColor:u?"rgba(0, 0, 0, 0.3)":null,marginTop:l*t.height+"px",marginLeft:o*t.width+"px",marginRight:(1-i)*t.width+"px",marginBottom:(1-f)*t.height+"px"})}}),v&&o.a.createElement(i,{image:v,columns:w,rows:j,showRuler:u})))}},function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=n(2),i=n.n(a)()(o.a);i.push([e.i,".some {\n    color: white;\n}","",{version:3,sources:["webpack://src/index.css"],names:[],mappings:"AAAA;IACI,YAAY;AAChB",sourcesContent:[".some {\n    color: white;\n}"],sourceRoot:""}])}])}));
//# sourceMappingURL=index.js.map