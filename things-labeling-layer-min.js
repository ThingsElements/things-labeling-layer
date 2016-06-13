!function e(t,r,n){function o(a,u){if(!r[a]){if(!t[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var f=r[a]={exports:{}};t[a][0].call(f.exports,function(e){var r=t[a][1][e];return o(r?r:e)},f,f.exports,e,t,r,n)}return r[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0});var o=e("./labeling-layer");Object.defineProperty(r,"LabelModelingLayer",{enumerable:!0,get:function(){return n(o)["default"]}})},{"./labeling-layer":4}],2:[function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){var r=e.left,n=e.top,o=e.width,i=e.height,a=r+o/2,u=n+i/2,c=r+o,l=n+i;return"barcode"===t?[{x:a,y:n},{x:a,y:l}]:[{x:r,y:n},{x:a,y:n},{x:c,y:n},{x:c,y:u},{x:c,y:l},{x:a,y:l},{x:r,y:l},{x:r,y:u}]}Object.defineProperty(r,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=4,l=8,f=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),u(t,[{key:"contains",value:function(e,t,r,n){var o=this;return r.resizable?(a(r.bounds,r.model.type).every(function(i,a){return Math.abs(e-i.x)<=c/n.x&&Math.abs(t-i.y)<=c/n.y&&("barcode"===r.model.type&&(a=0===a?1:5),o.active={component:r,index:a}),!o.active}),!!this.active):!1}},{key:"draw",value:function(e,t,r){if(t.resizable||!t.mutable){var n=t.bounds;if(e.beginPath(),e.rect(n.left,n.top,n.width,n.height),e.setLineDash([3/r.x,4/r.y]),e.lineWidth=1/r.x,e.strokeStyle="black",e.stroke(),e.setLineDash([]),t.resizable){var o=this.active;a(n,t.model.type).forEach(function(n,i){e.beginPath(),e.rect(n.x-c/r.x,n.y-c/r.y,l/r.x,l/r.y),e.setLineDash([0,0]),e.strokeStyle="#656565",e.stroke(),e.fillStyle="#fff","barcode"===t.model.type&&(i=0===i?1:5),o&&o.component===t&&o.index===i&&(e.strokeStyle="#fa7703",o.focus&&(e.fillStyle="#ffb80c")),e.fill(),e.stroke()})}}}}]),t}(scene.ResizerModeler);r["default"]=f},{}],3:[function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=function f(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:f(o,t,r)}if("value"in n)return n.value;var i=n.get;return void 0===i?void 0:i.call(r)},c=Math.PI/2,l=function(e){function t(){return n(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),a(t,[{key:"ondragmove",value:function(e){var t=this.active.component,r=t.transcoordC2S(e.offsetX,e.offsetY);r=t.transcoordS2P(r.x,r.y);var n=t.rotatePoint,o=t.get("rotation")||0,i=Math.atan((n.y-r.y)/(n.x-r.x));i=n.x>=r.x?i-.5*Math.PI:.5*Math.PI+i,i=Math.floor(i/c)*c;var a=i-o;this.layer.selected.filter(function(e){return e.rotatable}).forEach(function(e){var t=e.get("rotation");e.set("rotation",(t+a)%(2*Math.PI))})}},{key:"draw",value:function(e,r,n){["text","rect","barcode","ellipse"].indexOf(r.model.type)<0||u(Object.getPrototypeOf(t.prototype),"draw",this).call(this,e,r,n)}}]),t}(scene.RotatorModeler);r["default"]=l},{}],4:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(r,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=e("./label-resizer"),l=n(c),f=e("./label-rotator"),s=n(f),p=function(e){function t(e,r){o(this,t);var n=i(this,Object.getPrototypeOf(t).call(this,e,r)),a=new s["default"](n),u=new l["default"](n);return n.reversedModelers.splice(0,1,a),n.reversedModelers.splice(1,1,u),n.modelers.splice(2,1,u),n.modelers.splice(3,1,a),n}return a(t,e),u(t,[{key:"_draw",value:function(e){var t=this;e.beginPath();var r=this.get("scale")||{x:1,y:1},n=this.selected.filter(function(e){return!!e.parent});if(this.focused&&this._componentDrawer(e,this.focused,r,function(e,r,n){t.focusOutline.draw(e,r,n)}),n.length>0&&n[0].parent.isGroup()){for(var o=n[0].parent;o.parent.isGroup();)o=o.parent;this._componentDrawer(e,o,r,function(e,r,n){t.groupOutline.draw(e,r,n)})}n.forEach(function(n){t._componentDrawer(e,n,r,function(e,r,n){t.reversedModelers.forEach(function(t){t.draw(e,r,n)})})})}}]),t}(scene.ModelingLayer);r["default"]=p,scene.Component.register("labeling-layer",p)},{"./label-resizer":2,"./label-rotator":3}]},{},[1]);