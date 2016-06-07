(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _labelingLayer = require('./labeling-layer');

Object.defineProperty(exports, 'LabelModelingLayer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_labelingLayer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./labeling-layer":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RESIZE_HANDLE_HALF_SIZE = 4;
var RESIZE_HANDLE_FULL_SIZE = 8;

var LabelResizer = function (_scene$Resizer) {
  _inherits(LabelResizer, _scene$Resizer);

  function LabelResizer() {
    _classCallCheck(this, LabelResizer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LabelResizer).apply(this, arguments));
  }

  _createClass(LabelResizer, [{
    key: 'contains',
    value: function contains(x, y, component, scale) {
      var _this2 = this;

      if (!component.resizable) return false;

      // 좌표가 바운드 핸들에 포함되어있는지 확인함.
      getResizeHandles(component.bounds, component.model.type).every(function (handle, index) {

        if (Math.abs(x - handle.x) <= RESIZE_HANDLE_HALF_SIZE / scale.x && Math.abs(y - handle.y) <= RESIZE_HANDLE_HALF_SIZE / scale.y) {
          // 현재 선택된 리사이즈 핸들의 정보

          if (component.model.type === 'barcode') {
            index = index === 0 ? 1 : 5;
          }

          _this2.active = { component: component, index: index };
        }

        // 찾았으면, 스톱한다.
        return !_this2.active;
      });

      return !!this.active;
    }
  }, {
    key: 'draw',
    value: function draw(ctx, component, scale) {

      // Line 같은 경우는 그리지 않는다.
      if (!component.resizable && component.mutable) return;

      // Bound 박스를 그린다.
      var bounds = component.bounds;

      ctx.beginPath();
      ctx.rect(bounds.left, bounds.top, bounds.width, bounds.height);
      ctx.setLineDash([3 / scale.x, 4 / scale.y]);
      ctx.lineWidth = 1 / scale.x;
      ctx.strokeStyle = 'black';

      ctx.stroke();

      ctx.setLineDash([]); // reset lineDash

      if (!component.resizable) return;

      // Bound 핸들(Resize Handle)을 그린다.
      var active = this.active;

      getResizeHandles(bounds, component.model.type).forEach(function (point, index) {
        ctx.beginPath();

        ctx.rect(point.x - RESIZE_HANDLE_HALF_SIZE / scale.x, point.y - RESIZE_HANDLE_HALF_SIZE / scale.y, RESIZE_HANDLE_FULL_SIZE / scale.x, RESIZE_HANDLE_FULL_SIZE / scale.y);
        ctx.setLineDash([0, 0]);
        ctx.strokeStyle = '#656565';
        ctx.stroke();
        ctx.fillStyle = '#fff';

        if (component.model.type === 'barcode') {
          index = index === 0 ? 1 : 5;
        }
        if (active && active.component === component && active.index === index) {
          ctx.strokeStyle = '#fa7703';

          if (active.focus) ctx.fillStyle = '#ffb80c';
        }

        ctx.fill();
        ctx.stroke();
      });
    }
  }]);

  return LabelResizer;
}(scene.Resizer);

exports.default = LabelResizer;


function getResizeHandles(bounds, type) {
  var left = bounds.left;
  var top = bounds.top;
  var width = bounds.width;
  var height = bounds.height;


  var centerx = left + width / 2;
  var centery = top + height / 2;
  var right = left + width;
  var bottom = top + height;

  if (type === 'barcode') {
    return [{ x: centerx, y: top }, { x: centerx, y: bottom }];
  } else {
    return [{ x: left, y: top }, { x: centerx, y: top }, { x: right, y: top }, { x: right, y: centery }, { x: right, y: bottom }, { x: centerx, y: bottom }, { x: left, y: bottom }, { x: left, y: centery }];
  }
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ROTATION_STEP = Math.PI / 2;

var LabelRotator = function (_scene$Rotator) {
  _inherits(LabelRotator, _scene$Rotator);

  function LabelRotator() {
    _classCallCheck(this, LabelRotator);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LabelRotator).apply(this, arguments));
  }

  _createClass(LabelRotator, [{
    key: 'ondragmove',
    value: function ondragmove(e) {

      /* 로테이트 핸들의 이동을 처리한다. */
      var component = this.active.component;

      // 회전을 시키려는 대상 컴포넌트의 중심점과 이벤트 포인트와의 각도가 중요하므로,
      // 컴포넌트 스케일과 회전이 감안되지 않은 부모의 좌표로 변환하여 계산한다.

      var point = component.transcoordC2S(e.offsetX, e.offsetY);
      point = component.transcoordS2P(point.x, point.y);

      var rotatePoint = component.rotatePoint;

      var oldTheta = component.get('rotation') || 0;
      var newTheta = Math.atan((rotatePoint.y - point.y) / (rotatePoint.x - point.x));
      newTheta = rotatePoint.x >= point.x ? newTheta - Math.PI * 0.5 : Math.PI * 0.5 + newTheta;
      newTheta = Math.floor(newTheta / ROTATION_STEP) * ROTATION_STEP;

      var deltaTheta = newTheta - oldTheta;

      this.layer.selected.filter(function (c) {
        return c.rotatable;
      }).forEach(function (c, i) {
        /* 최초의 바운드로 되돌려놓고 다시 계산한다. */
        var rotation = c.get('rotation');
        c.set('rotation', (rotation + deltaTheta) % (Math.PI * 2));
      });
    }
  }]);

  return LabelRotator;
}(scene.Rotator);

exports.default = LabelRotator;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _labelResizer = require('./label-resizer');

var _labelResizer2 = _interopRequireDefault(_labelResizer);

var _labelRotator = require('./label-rotator');

var _labelRotator2 = _interopRequireDefault(_labelRotator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabelingLayer = function (_scene$ModelingLayer) {
  _inherits(LabelingLayer, _scene$ModelingLayer);

  function LabelingLayer(model, context) {
    _classCallCheck(this, LabelingLayer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LabelingLayer).call(this, model, context));

    var rotator = new _labelRotator2.default(_this);
    var resizer = new _labelResizer2.default(_this);

    _this.reversedModelers.splice(0, 1, rotator);
    _this.reversedModelers.splice(1, 1, resizer);
    _this.modelers.splice(2, 1, resizer);
    _this.modelers.splice(3, 1, rotator);
    return _this;
  }

  _createClass(LabelingLayer, [{
    key: '_draw',
    value: function _draw(context) {
      var _this2 = this;

      context.beginPath();

      var scale = this.get('scale') || { x: 1, y: 1 };

      var selected = this.selected.filter(function (c) {
        /*
         * 부모가 있는 컴포넌트만을 그린다.
         * (selected에는 남아있을 수 있으나, undo에 의해서 이미 제거된 것일 수 있다.)
         */
        return !!c.parent;
      });

      if (this.focused) {
        this._componentDrawer(context, this.focused, scale, function (context, component, scale) {
          _this2.focusOutline.draw(context, component, scale);
        });
      }

      /* TODO selected의 부모가 group인 경우에 최상위 그룹의 모델링 레이아웃을 그려주어야 한다. */
      if (selected.length > 0 && selected[0].parent.isGroup()) {
        var rootGroup = selected[0].parent;
        while (rootGroup.parent.isGroup()) {
          rootGroup = rootGroup.parent;
        }this._componentDrawer(context, rootGroup, scale, function (context, component, scale) {
          _this2.groupOutline.draw(context, component, scale);
        });
      }

      selected.forEach(function (component) {

        _this2._componentDrawer(context, component, scale, function (context, component, scale) {
          _this2.reversedModelers.forEach(function (modeler, idx) {
            modeler.draw(context, component, scale);
          });
        });
      });
    }
  }]);

  return LabelingLayer;
}(scene.ModelingLayer);

exports.default = LabelingLayer;


scene.Component.register('labeling-layer', LabelingLayer);

},{"./label-resizer":2,"./label-rotator":3}]},{},[1]);
