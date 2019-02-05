
/*
     /$$$$$$$            /$$
    | $$__  $$          | $$          /$$
    | $$  | $$ /$$   /$$| $$$$$$$    | $$
    | $$  | $$| $$  | $$| $$__  $$ /$$$$$$$$
    | $$  | $$| $$  | $$| $$  | $$|__  $$__/
    | $$  | $$| $$  | $$| $$  | $$   | $$
    | $$$$$$$/|  $$$$$$/| $$$$$$$/   |__/
    |_______/  ______/ |_______/


    https://github.com/DubPlus/DubPlus

    This source code is licensed under the MIT license
    found here: https://github.com/DubPlus/DubPlus/blob/master/LICENSE

    Copyright (c) 2017-present DubPlus

    more info at https://dub.plus
*/
var DubPlus = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var VNode = function VNode() {};

  var options = {};

  var stack = [];

  var EMPTY_CHILDREN = [];

  function h(nodeName, attributes) {
  	var children = EMPTY_CHILDREN,
  	    lastSimple,
  	    child,
  	    simple,
  	    i;
  	for (i = arguments.length; i-- > 2;) {
  		stack.push(arguments[i]);
  	}
  	if (attributes && attributes.children != null) {
  		if (!stack.length) stack.push(attributes.children);
  		delete attributes.children;
  	}
  	while (stack.length) {
  		if ((child = stack.pop()) && child.pop !== undefined) {
  			for (i = child.length; i--;) {
  				stack.push(child[i]);
  			}
  		} else {
  			if (typeof child === 'boolean') child = null;

  			if (simple = typeof nodeName !== 'function') {
  				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
  			}

  			if (simple && lastSimple) {
  				children[children.length - 1] += child;
  			} else if (children === EMPTY_CHILDREN) {
  				children = [child];
  			} else {
  				children.push(child);
  			}

  			lastSimple = simple;
  		}
  	}

  	var p = new VNode();
  	p.nodeName = nodeName;
  	p.children = children;
  	p.attributes = attributes == null ? undefined : attributes;
  	p.key = attributes == null ? undefined : attributes.key;

  	return p;
  }

  function extend(obj, props) {
    for (var i in props) {
      obj[i] = props[i];
    }return obj;
  }

  function applyRef(ref, value) {
    if (ref != null) {
      if (typeof ref == 'function') ref(value);else ref.current = value;
    }
  }

  var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

  var items = [];

  function enqueueRender(component) {
  	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
  		(defer)(rerender);
  	}
  }

  function rerender() {
  	var p;
  	while (p = items.pop()) {
  		if (p._dirty) renderComponent(p);
  	}
  }

  function isSameNodeType(node, vnode, hydrating) {
  	if (typeof vnode === 'string' || typeof vnode === 'number') {
  		return node.splitText !== undefined;
  	}
  	if (typeof vnode.nodeName === 'string') {
  		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  	}
  	return hydrating || node._componentConstructor === vnode.nodeName;
  }

  function isNamedNode(node, nodeName) {
  	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
  }

  function getNodeProps(vnode) {
  	var props = extend({}, vnode.attributes);
  	props.children = vnode.children;

  	var defaultProps = vnode.nodeName.defaultProps;
  	if (defaultProps !== undefined) {
  		for (var i in defaultProps) {
  			if (props[i] === undefined) {
  				props[i] = defaultProps[i];
  			}
  		}
  	}

  	return props;
  }

  function createNode(nodeName, isSvg) {
  	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
  	node.normalizedNodeName = nodeName;
  	return node;
  }

  function removeNode(node) {
  	var parentNode = node.parentNode;
  	if (parentNode) parentNode.removeChild(node);
  }

  function setAccessor(node, name, old, value, isSvg) {
  	if (name === 'className') name = 'class';

  	if (name === 'key') ; else if (name === 'ref') {
  		applyRef(old, null);
  		applyRef(value, node);
  	} else if (name === 'class' && !isSvg) {
  		node.className = value || '';
  	} else if (name === 'style') {
  		if (!value || typeof value === 'string' || typeof old === 'string') {
  			node.style.cssText = value || '';
  		}
  		if (value && typeof value === 'object') {
  			if (typeof old !== 'string') {
  				for (var i in old) {
  					if (!(i in value)) node.style[i] = '';
  				}
  			}
  			for (var i in value) {
  				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
  			}
  		}
  	} else if (name === 'dangerouslySetInnerHTML') {
  		if (value) node.innerHTML = value.__html || '';
  	} else if (name[0] == 'o' && name[1] == 'n') {
  		var useCapture = name !== (name = name.replace(/Capture$/, ''));
  		name = name.toLowerCase().substring(2);
  		if (value) {
  			if (!old) node.addEventListener(name, eventProxy, useCapture);
  		} else {
  			node.removeEventListener(name, eventProxy, useCapture);
  		}
  		(node._listeners || (node._listeners = {}))[name] = value;
  	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
  		try {
  			node[name] = value == null ? '' : value;
  		} catch (e) {}
  		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
  	} else {
  		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

  		if (value == null || value === false) {
  			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
  		} else if (typeof value !== 'function') {
  			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
  		}
  	}
  }

  function eventProxy(e) {
  	return this._listeners[e.type](e);
  }

  var mounts = [];

  var diffLevel = 0;

  var isSvgMode = false;

  var hydrating = false;

  function flushMounts() {
  	var c;
  	while (c = mounts.shift()) {
  		if (c.componentDidMount) c.componentDidMount();
  	}
  }

  function diff(dom, vnode, context, mountAll, parent, componentRoot) {
  	if (!diffLevel++) {
  		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

  		hydrating = dom != null && !('__preactattr_' in dom);
  	}

  	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

  	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

  	if (! --diffLevel) {
  		hydrating = false;

  		if (!componentRoot) flushMounts();
  	}

  	return ret;
  }

  function idiff(dom, vnode, context, mountAll, componentRoot) {
  	var out = dom,
  	    prevSvgMode = isSvgMode;

  	if (vnode == null || typeof vnode === 'boolean') vnode = '';

  	if (typeof vnode === 'string' || typeof vnode === 'number') {
  		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
  			if (dom.nodeValue != vnode) {
  				dom.nodeValue = vnode;
  			}
  		} else {
  			out = document.createTextNode(vnode);
  			if (dom) {
  				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
  				recollectNodeTree(dom, true);
  			}
  		}

  		out['__preactattr_'] = true;

  		return out;
  	}

  	var vnodeName = vnode.nodeName;
  	if (typeof vnodeName === 'function') {
  		return buildComponentFromVNode(dom, vnode, context, mountAll);
  	}

  	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

  	vnodeName = String(vnodeName);
  	if (!dom || !isNamedNode(dom, vnodeName)) {
  		out = createNode(vnodeName, isSvgMode);

  		if (dom) {
  			while (dom.firstChild) {
  				out.appendChild(dom.firstChild);
  			}
  			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

  			recollectNodeTree(dom, true);
  		}
  	}

  	var fc = out.firstChild,
  	    props = out['__preactattr_'],
  	    vchildren = vnode.children;

  	if (props == null) {
  		props = out['__preactattr_'] = {};
  		for (var a = out.attributes, i = a.length; i--;) {
  			props[a[i].name] = a[i].value;
  		}
  	}

  	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
  		if (fc.nodeValue != vchildren[0]) {
  			fc.nodeValue = vchildren[0];
  		}
  	} else if (vchildren && vchildren.length || fc != null) {
  			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
  		}

  	diffAttributes(out, vnode.attributes, props);

  	isSvgMode = prevSvgMode;

  	return out;
  }

  function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
  	var originalChildren = dom.childNodes,
  	    children = [],
  	    keyed = {},
  	    keyedLen = 0,
  	    min = 0,
  	    len = originalChildren.length,
  	    childrenLen = 0,
  	    vlen = vchildren ? vchildren.length : 0,
  	    j,
  	    c,
  	    f,
  	    vchild,
  	    child;

  	if (len !== 0) {
  		for (var i = 0; i < len; i++) {
  			var _child = originalChildren[i],
  			    props = _child['__preactattr_'],
  			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
  			if (key != null) {
  				keyedLen++;
  				keyed[key] = _child;
  			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
  				children[childrenLen++] = _child;
  			}
  		}
  	}

  	if (vlen !== 0) {
  		for (var i = 0; i < vlen; i++) {
  			vchild = vchildren[i];
  			child = null;

  			var key = vchild.key;
  			if (key != null) {
  				if (keyedLen && keyed[key] !== undefined) {
  					child = keyed[key];
  					keyed[key] = undefined;
  					keyedLen--;
  				}
  			} else if (min < childrenLen) {
  					for (j = min; j < childrenLen; j++) {
  						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
  							child = c;
  							children[j] = undefined;
  							if (j === childrenLen - 1) childrenLen--;
  							if (j === min) min++;
  							break;
  						}
  					}
  				}

  			child = idiff(child, vchild, context, mountAll);

  			f = originalChildren[i];
  			if (child && child !== dom && child !== f) {
  				if (f == null) {
  					dom.appendChild(child);
  				} else if (child === f.nextSibling) {
  					removeNode(f);
  				} else {
  					dom.insertBefore(child, f);
  				}
  			}
  		}
  	}

  	if (keyedLen) {
  		for (var i in keyed) {
  			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
  		}
  	}

  	while (min <= childrenLen) {
  		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
  	}
  }

  function recollectNodeTree(node, unmountOnly) {
  	var component = node._component;
  	if (component) {
  		unmountComponent(component);
  	} else {
  		if (node['__preactattr_'] != null) applyRef(node['__preactattr_'].ref, null);

  		if (unmountOnly === false || node['__preactattr_'] == null) {
  			removeNode(node);
  		}

  		removeChildren(node);
  	}
  }

  function removeChildren(node) {
  	node = node.lastChild;
  	while (node) {
  		var next = node.previousSibling;
  		recollectNodeTree(node, true);
  		node = next;
  	}
  }

  function diffAttributes(dom, attrs, old) {
  	var name;

  	for (name in old) {
  		if (!(attrs && attrs[name] != null) && old[name] != null) {
  			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
  		}
  	}

  	for (name in attrs) {
  		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
  			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
  		}
  	}
  }

  var recyclerComponents = [];

  function createComponent(Ctor, props, context) {
  	var inst,
  	    i = recyclerComponents.length;

  	if (Ctor.prototype && Ctor.prototype.render) {
  		inst = new Ctor(props, context);
  		Component.call(inst, props, context);
  	} else {
  		inst = new Component(props, context);
  		inst.constructor = Ctor;
  		inst.render = doRender;
  	}

  	while (i--) {
  		if (recyclerComponents[i].constructor === Ctor) {
  			inst.nextBase = recyclerComponents[i].nextBase;
  			recyclerComponents.splice(i, 1);
  			return inst;
  		}
  	}

  	return inst;
  }

  function doRender(props, state, context) {
  	return this.constructor(props, context);
  }

  function setComponentProps(component, props, renderMode, context, mountAll) {
  	if (component._disable) return;
  	component._disable = true;

  	component.__ref = props.ref;
  	component.__key = props.key;
  	delete props.ref;
  	delete props.key;

  	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
  		if (!component.base || mountAll) {
  			if (component.componentWillMount) component.componentWillMount();
  		} else if (component.componentWillReceiveProps) {
  			component.componentWillReceiveProps(props, context);
  		}
  	}

  	if (context && context !== component.context) {
  		if (!component.prevContext) component.prevContext = component.context;
  		component.context = context;
  	}

  	if (!component.prevProps) component.prevProps = component.props;
  	component.props = props;

  	component._disable = false;

  	if (renderMode !== 0) {
  		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
  			renderComponent(component, 1, mountAll);
  		} else {
  			enqueueRender(component);
  		}
  	}

  	applyRef(component.__ref, component);
  }

  function renderComponent(component, renderMode, mountAll, isChild) {
  	if (component._disable) return;

  	var props = component.props,
  	    state = component.state,
  	    context = component.context,
  	    previousProps = component.prevProps || props,
  	    previousState = component.prevState || state,
  	    previousContext = component.prevContext || context,
  	    isUpdate = component.base,
  	    nextBase = component.nextBase,
  	    initialBase = isUpdate || nextBase,
  	    initialChildComponent = component._component,
  	    skip = false,
  	    snapshot = previousContext,
  	    rendered,
  	    inst,
  	    cbase;

  	if (component.constructor.getDerivedStateFromProps) {
  		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
  		component.state = state;
  	}

  	if (isUpdate) {
  		component.props = previousProps;
  		component.state = previousState;
  		component.context = previousContext;
  		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
  			skip = true;
  		} else if (component.componentWillUpdate) {
  			component.componentWillUpdate(props, state, context);
  		}
  		component.props = props;
  		component.state = state;
  		component.context = context;
  	}

  	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
  	component._dirty = false;

  	if (!skip) {
  		rendered = component.render(props, state, context);

  		if (component.getChildContext) {
  			context = extend(extend({}, context), component.getChildContext());
  		}

  		if (isUpdate && component.getSnapshotBeforeUpdate) {
  			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
  		}

  		var childComponent = rendered && rendered.nodeName,
  		    toUnmount,
  		    base;

  		if (typeof childComponent === 'function') {

  			var childProps = getNodeProps(rendered);
  			inst = initialChildComponent;

  			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
  				setComponentProps(inst, childProps, 1, context, false);
  			} else {
  				toUnmount = inst;

  				component._component = inst = createComponent(childComponent, childProps, context);
  				inst.nextBase = inst.nextBase || nextBase;
  				inst._parentComponent = component;
  				setComponentProps(inst, childProps, 0, context, false);
  				renderComponent(inst, 1, mountAll, true);
  			}

  			base = inst.base;
  		} else {
  			cbase = initialBase;

  			toUnmount = initialChildComponent;
  			if (toUnmount) {
  				cbase = component._component = null;
  			}

  			if (initialBase || renderMode === 1) {
  				if (cbase) cbase._component = null;
  				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
  			}
  		}

  		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
  			var baseParent = initialBase.parentNode;
  			if (baseParent && base !== baseParent) {
  				baseParent.replaceChild(base, initialBase);

  				if (!toUnmount) {
  					initialBase._component = null;
  					recollectNodeTree(initialBase, false);
  				}
  			}
  		}

  		if (toUnmount) {
  			unmountComponent(toUnmount);
  		}

  		component.base = base;
  		if (base && !isChild) {
  			var componentRef = component,
  			    t = component;
  			while (t = t._parentComponent) {
  				(componentRef = t).base = base;
  			}
  			base._component = componentRef;
  			base._componentConstructor = componentRef.constructor;
  		}
  	}

  	if (!isUpdate || mountAll) {
  		mounts.push(component);
  	} else if (!skip) {

  		if (component.componentDidUpdate) {
  			component.componentDidUpdate(previousProps, previousState, snapshot);
  		}
  	}

  	while (component._renderCallbacks.length) {
  		component._renderCallbacks.pop().call(component);
  	}if (!diffLevel && !isChild) flushMounts();
  }

  function buildComponentFromVNode(dom, vnode, context, mountAll) {
  	var c = dom && dom._component,
  	    originalComponent = c,
  	    oldDom = dom,
  	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
  	    isOwner = isDirectOwner,
  	    props = getNodeProps(vnode);
  	while (c && !isOwner && (c = c._parentComponent)) {
  		isOwner = c.constructor === vnode.nodeName;
  	}

  	if (c && isOwner && (!mountAll || c._component)) {
  		setComponentProps(c, props, 3, context, mountAll);
  		dom = c.base;
  	} else {
  		if (originalComponent && !isDirectOwner) {
  			unmountComponent(originalComponent);
  			dom = oldDom = null;
  		}

  		c = createComponent(vnode.nodeName, props, context);
  		if (dom && !c.nextBase) {
  			c.nextBase = dom;

  			oldDom = null;
  		}
  		setComponentProps(c, props, 1, context, mountAll);
  		dom = c.base;

  		if (oldDom && dom !== oldDom) {
  			oldDom._component = null;
  			recollectNodeTree(oldDom, false);
  		}
  	}

  	return dom;
  }

  function unmountComponent(component) {

  	var base = component.base;

  	component._disable = true;

  	if (component.componentWillUnmount) component.componentWillUnmount();

  	component.base = null;

  	var inner = component._component;
  	if (inner) {
  		unmountComponent(inner);
  	} else if (base) {
  		if (base['__preactattr_'] != null) applyRef(base['__preactattr_'].ref, null);

  		component.nextBase = base;

  		removeNode(base);
  		recyclerComponents.push(component);

  		removeChildren(base);
  	}

  	applyRef(component.__ref, null);
  }

  function Component(props, context) {
  	this._dirty = true;

  	this.context = context;

  	this.props = props;

  	this.state = this.state || {};

  	this._renderCallbacks = [];
  }

  extend(Component.prototype, {
  	setState: function setState(state, callback) {
  		if (!this.prevState) this.prevState = this.state;
  		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
  		if (callback) this._renderCallbacks.push(callback);
  		enqueueRender(this);
  	},
  	forceUpdate: function forceUpdate(callback) {
  		if (callback) this._renderCallbacks.push(callback);
  		renderComponent(this, 2);
  	},
  	render: function render() {}
  });

  function render(vnode, parent, merge) {
    return diff(merge, vnode, {}, false, parent, false);
  }

  /**
   * Pure JS version of jQuery's $.getScript
   * 
   * @param {string} source url or path to JS file
   * @param {function} callback function to run after script is loaded
   */
  function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (!isAbort) {
          if (callback) callback();
        }
      }
    };

    script.onerror = function (err) {
      if (callback) callback(err);
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  }

  function polyfills () {
    // Element.remove() polyfill
    // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
    (function (arr) {
      arr.forEach(function (item) {
        if (item.hasOwnProperty("remove")) {
          return;
        }

        Object.defineProperty(item, "remove", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: function remove() {
            if (this.parentNode !== null) this.parentNode.removeChild(this);
          }
        });
      });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

    if (typeof Promise === "undefined") {
      // load Promise polyfill for IE because we are still supporting it
      getScript("https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js");
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  }

  /*global Dubtrack*/

  var eventUtils = {
    currentVol: 50,
    snoozed: false
  };

  var eventSongAdvance = function eventSongAdvance(e) {
    if (e.startTime < 2) {
      if (eventUtils.snoozed) {
        Dubtrack.room.player.setVolume(eventUtils.currentVol);
        eventUtils.snoozed = false;
      }

      return true;
    }
  };

  var snooze = function snooze() {
    if (!eventUtils.snoozed && !Dubtrack.room.player.muted_player && Dubtrack.playerController.volume > 2) {
      eventUtils.currentVol = Dubtrack.playerController.volume;
      Dubtrack.room.player.mutePlayer();
      eventUtils.snoozed = true;
      Dubtrack.Events.bind("realtime:room_playlist-update", eventSongAdvance);
    } else if (eventUtils.snoozed) {
      Dubtrack.room.player.setVolume(eventUtils.currentVol);
      Dubtrack.room.player.updateVolumeBar();
      eventUtils.snoozed = false;
    }
  };

  var css = {
    position: 'absolute',
    font: '1rem/1.5 proxima-nova,sans-serif',
    display: 'block',
    left: '-33px',
    cursor: 'pointer',
    borderRadius: '1.5rem',
    padding: '8px 16px',
    background: '#fff',
    fontWeight: '700',
    fontSize: '13.6px',
    textTransform: 'uppercase',
    color: '#000',
    opacity: '0.8',
    textAlign: 'center',
    zIndex: '9'
  };

  var Snooze =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Snooze, _Component);

    function Snooze() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Snooze);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Snooze)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        show: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showTooltip", function () {
        _this.setState({
          show: true
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideTooltip", function () {
        _this.setState({
          show: false
        });
      });

      return _this;
    }

    _createClass(Snooze, [{
      key: "render",
      value: function render$$1(props, state) {
        return h("span", {
          className: "icon-mute snooze_btn",
          onClick: snooze,
          onMouseOver: this.showTooltip,
          onMouseOut: this.hideTooltip
        }, state.show && h("div", {
          className: "snooze_tooltip",
          style: css
        }, "Mute current song"));
      }
    }]);

    return Snooze;
  }(Component);

  function snooze$1 () {
    render(h(Snooze, null), document.querySelector('.player_sharing'));
  }

  var css$1 = {
    position: 'absolute',
    font: '1rem/1.5 proxima-nova,sans-serif',
    display: 'block',
    left: '-33px',
    cursor: 'pointer',
    borderRadius: '1.5rem',
    padding: '8px 16px',
    background: '#fff',
    fontWeight: '700',
    fontSize: '13.6px',
    textTransform: 'uppercase',
    color: '#000',
    opacity: '0.8',
    textAlign: 'center',
    zIndex: '9'
  };

  var ETA =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ETA, _Component);

    function ETA() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ETA);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ETA)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        show: false,
        booth_time: ''
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showTooltip", function () {
        var tooltipText = _this.getEta();

        _this.setState({
          show: true,
          booth_time: tooltipText
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideTooltip", function () {
        _this.setState({
          show: false
        });
      });

      return _this;
    }

    _createClass(ETA, [{
      key: "getEta",
      value: function getEta() {
        var time = 4;
        var current_time = parseInt(document.querySelector('#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min').textContent);
        var booth_duration = parseInt(document.querySelector('.queue-position').textContent);
        var booth_time = booth_duration * time - time + current_time;
        return booth_time >= 0 ? booth_time : 'You\'re not in the queue';
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h("span", {
          className: "icon-history eta_tooltip_t",
          onMouseOver: this.showTooltip,
          onMouseOut: this.hideTooltip
        }, this.state.show && h("span", {
          className: "eta_tooltip",
          style: css$1
        }, this.state.booth_time));
      }
    }]);

    return ETA;
  }(Component);

  function eta () {
    render(h(ETA, null), document.querySelector('.player_sharing'));
  }

  var emoji = {
    template: function template(id) {
      id = id.replace(/^:|:$/g, "");
      return emojify.defaultConfig.img_dir + "/" + encodeURI(id) + ".png";
    },
    find: function find(symbol) {
      var _this = this;

      var found = emojify.emojiNames.filter(function (e) {
        return e.indexOf(symbol) === 0;
      });
      return found.map(function (key) {
        return {
          type: "emojify",
          src: _this.template(key),
          name: key
        };
      });
    }
  };

  var emojiNames = {
    bowtie: {
      x: 1099,
      y: 896
    },
    smile: {
      x: 960,
      y: 1291
    },
    laughing: {
      x: 0,
      y: 75
    },
    blush: {
      x: 64,
      y: 75
    },
    smiley: {
      x: 139,
      y: 0
    },
    relaxed: {
      x: 139,
      y: 64
    },
    smirk: {
      x: 0,
      y: 139
    },
    heart_eyes: {
      x: 64,
      y: 139
    },
    kissing_heart: {
      x: 128,
      y: 139
    },
    kissing_closed_eyes: {
      x: 203,
      y: 0
    },
    flushed: {
      x: 203,
      y: 64
    },
    relieved: {
      x: 203,
      y: 128
    },
    satisfied: {
      x: 0,
      y: 203
    },
    grin: {
      x: 64,
      y: 203
    },
    wink: {
      x: 128,
      y: 203
    },
    stuck_out_tongue_winking_eye: {
      x: 192,
      y: 203
    },
    stuck_out_tongue_closed_eyes: {
      x: 267,
      y: 0
    },
    grinning: {
      x: 267,
      y: 64
    },
    kissing: {
      x: 267,
      y: 128
    },
    kissing_smiling_eyes: {
      x: 267,
      y: 192
    },
    stuck_out_tongue: {
      x: 0,
      y: 267
    },
    sleeping: {
      x: 64,
      y: 267
    },
    worried: {
      x: 128,
      y: 267
    },
    frowning: {
      x: 192,
      y: 267
    },
    anguished: {
      x: 256,
      y: 267
    },
    open_mouth: {
      x: 331,
      y: 0
    },
    grimacing: {
      x: 331,
      y: 64
    },
    confused: {
      x: 331,
      y: 128
    },
    hushed: {
      x: 331,
      y: 192
    },
    expressionless: {
      x: 331,
      y: 256
    },
    unamused: {
      x: 0,
      y: 331
    },
    sweat_smile: {
      x: 64,
      y: 331
    },
    sweat: {
      x: 128,
      y: 331
    },
    disappointed_relieved: {
      x: 192,
      y: 331
    },
    weary: {
      x: 256,
      y: 331
    },
    pensive: {
      x: 320,
      y: 331
    },
    disappointed: {
      x: 395,
      y: 0
    },
    confounded: {
      x: 395,
      y: 64
    },
    fearful: {
      x: 395,
      y: 128
    },
    cold_sweat: {
      x: 395,
      y: 192
    },
    persevere: {
      x: 395,
      y: 256
    },
    cry: {
      x: 395,
      y: 320
    },
    sob: {
      x: 0,
      y: 395
    },
    joy: {
      x: 64,
      y: 395
    },
    astonished: {
      x: 128,
      y: 395
    },
    scream: {
      x: 192,
      y: 395
    },
    neckbeard: {
      x: 256,
      y: 395
    },
    tired_face: {
      x: 320,
      y: 395
    },
    angry: {
      x: 384,
      y: 395
    },
    rage: {
      x: 459,
      y: 0
    },
    triumph: {
      x: 459,
      y: 64
    },
    sleepy: {
      x: 459,
      y: 128
    },
    yum: {
      x: 459,
      y: 192
    },
    mask: {
      x: 459,
      y: 256
    },
    sunglasses: {
      x: 459,
      y: 320
    },
    dizzy_face: {
      x: 459,
      y: 384
    },
    imp: {
      x: 0,
      y: 459
    },
    smiling_imp: {
      x: 64,
      y: 459
    },
    neutral_face: {
      x: 128,
      y: 459
    },
    no_mouth: {
      x: 192,
      y: 459
    },
    innocent: {
      x: 256,
      y: 459
    },
    alien: {
      x: 320,
      y: 459
    },
    yellow_heart: {
      x: 384,
      y: 459
    },
    blue_heart: {
      x: 448,
      y: 459
    },
    purple_heart: {
      x: 523,
      y: 0
    },
    heart: {
      x: 523,
      y: 64
    },
    green_heart: {
      x: 523,
      y: 128
    },
    broken_heart: {
      x: 523,
      y: 192
    },
    heartbeat: {
      x: 523,
      y: 256
    },
    heartpulse: {
      x: 523,
      y: 320
    },
    two_hearts: {
      x: 523,
      y: 384
    },
    revolving_hearts: {
      x: 523,
      y: 448
    },
    cupid: {
      x: 0,
      y: 523
    },
    sparkling_heart: {
      x: 64,
      y: 523
    },
    sparkles: {
      x: 128,
      y: 523
    },
    star: {
      x: 192,
      y: 523
    },
    star2: {
      x: 256,
      y: 523
    },
    dizzy: {
      x: 320,
      y: 523
    },
    boom: {
      x: 384,
      y: 523
    },
    collision: {
      x: 448,
      y: 523
    },
    anger: {
      x: 512,
      y: 523
    },
    exclamation: {
      x: 587,
      y: 0
    },
    question: {
      x: 587,
      y: 64
    },
    grey_exclamation: {
      x: 587,
      y: 128
    },
    grey_question: {
      x: 587,
      y: 192
    },
    zzz: {
      x: 587,
      y: 256
    },
    dash: {
      x: 587,
      y: 320
    },
    sweat_drops: {
      x: 587,
      y: 384
    },
    notes: {
      x: 587,
      y: 448
    },
    musical_note: {
      x: 587,
      y: 512
    },
    fire: {
      x: 0,
      y: 587
    },
    poop: {
      x: 64,
      y: 587
    },
    thumbsup: {
      x: 128,
      y: 587
    },
    thumbsdown: {
      x: 192,
      y: 587
    },
    ok_hand: {
      x: 256,
      y: 587
    },
    punch: {
      x: 320,
      y: 587
    },
    facepunch: {
      x: 384,
      y: 587
    },
    fist: {
      x: 448,
      y: 587
    },
    v: {
      x: 512,
      y: 587
    },
    wave: {
      x: 576,
      y: 587
    },
    hand: {
      x: 651,
      y: 0
    },
    raised_hand: {
      x: 651,
      y: 64
    },
    open_hands: {
      x: 651,
      y: 128
    },
    point_up: {
      x: 651,
      y: 192
    },
    point_down: {
      x: 651,
      y: 256
    },
    point_left: {
      x: 651,
      y: 320
    },
    point_right: {
      x: 651,
      y: 384
    },
    raised_hands: {
      x: 651,
      y: 448
    },
    pray: {
      x: 651,
      y: 512
    },
    point_up_2: {
      x: 651,
      y: 576
    },
    clap: {
      x: 0,
      y: 651
    },
    muscle: {
      x: 64,
      y: 651
    },
    metal: {
      x: 128,
      y: 651
    },
    fu: {
      x: 192,
      y: 651
    },
    runner: {
      x: 256,
      y: 651
    },
    running: {
      x: 320,
      y: 651
    },
    couple: {
      x: 384,
      y: 651
    },
    family: {
      x: 448,
      y: 651
    },
    two_men_holding_hands: {
      x: 512,
      y: 651
    },
    two_women_holding_hands: {
      x: 576,
      y: 651
    },
    dancer: {
      x: 640,
      y: 651
    },
    dancers: {
      x: 715,
      y: 0
    },
    ok_woman: {
      x: 715,
      y: 64
    },
    no_good: {
      x: 715,
      y: 128
    },
    information_desk_person: {
      x: 715,
      y: 192
    },
    raising_hand: {
      x: 715,
      y: 256
    },
    bride_with_veil: {
      x: 715,
      y: 320
    },
    person_with_pouting_face: {
      x: 715,
      y: 384
    },
    person_frowning: {
      x: 715,
      y: 448
    },
    bow: {
      x: 715,
      y: 512
    },
    couplekiss: {
      x: 715,
      y: 576
    },
    couple_with_heart: {
      x: 715,
      y: 640
    },
    massage: {
      x: 0,
      y: 715
    },
    haircut: {
      x: 64,
      y: 715
    },
    nail_care: {
      x: 128,
      y: 715
    },
    boy: {
      x: 192,
      y: 715
    },
    girl: {
      x: 256,
      y: 715
    },
    woman: {
      x: 320,
      y: 715
    },
    man: {
      x: 384,
      y: 715
    },
    baby: {
      x: 448,
      y: 715
    },
    older_woman: {
      x: 512,
      y: 715
    },
    older_man: {
      x: 576,
      y: 715
    },
    person_with_blond_hair: {
      x: 640,
      y: 715
    },
    man_with_gua_pi_mao: {
      x: 704,
      y: 715
    },
    man_with_turban: {
      x: 779,
      y: 0
    },
    construction_worker: {
      x: 779,
      y: 64
    },
    cop: {
      x: 779,
      y: 128
    },
    angel: {
      x: 779,
      y: 192
    },
    princess: {
      x: 779,
      y: 256
    },
    smiley_cat: {
      x: 779,
      y: 320
    },
    smile_cat: {
      x: 779,
      y: 384
    },
    heart_eyes_cat: {
      x: 779,
      y: 448
    },
    kissing_cat: {
      x: 779,
      y: 512
    },
    smirk_cat: {
      x: 779,
      y: 576
    },
    scream_cat: {
      x: 779,
      y: 640
    },
    crying_cat_face: {
      x: 779,
      y: 704
    },
    joy_cat: {
      x: 0,
      y: 779
    },
    pouting_cat: {
      x: 64,
      y: 779
    },
    japanese_ogre: {
      x: 128,
      y: 779
    },
    japanese_goblin: {
      x: 192,
      y: 779
    },
    see_no_evil: {
      x: 256,
      y: 779
    },
    hear_no_evil: {
      x: 320,
      y: 779
    },
    speak_no_evil: {
      x: 384,
      y: 779
    },
    guardsman: {
      x: 448,
      y: 779
    },
    skull: {
      x: 512,
      y: 779
    },
    feet: {
      x: 576,
      y: 779
    },
    lips: {
      x: 640,
      y: 779
    },
    kiss: {
      x: 704,
      y: 779
    },
    droplet: {
      x: 768,
      y: 779
    },
    ear: {
      x: 843,
      y: 0
    },
    eyes: {
      x: 843,
      y: 64
    },
    nose: {
      x: 843,
      y: 128
    },
    tongue: {
      x: 843,
      y: 192
    },
    love_letter: {
      x: 843,
      y: 256
    },
    bust_in_silhouette: {
      x: 843,
      y: 320
    },
    busts_in_silhouette: {
      x: 843,
      y: 384
    },
    speech_balloon: {
      x: 843,
      y: 448
    },
    thought_balloon: {
      x: 843,
      y: 512
    },
    feelsgood: {
      x: 843,
      y: 576
    },
    finnadie: {
      x: 843,
      y: 640
    },
    goberserk: {
      x: 843,
      y: 704
    },
    godmode: {
      x: 843,
      y: 768
    },
    hurtrealbad: {
      x: 0,
      y: 843
    },
    rage1: {
      x: 64,
      y: 843
    },
    rage2: {
      x: 128,
      y: 843
    },
    rage3: {
      x: 192,
      y: 843
    },
    rage4: {
      x: 256,
      y: 843
    },
    suspect: {
      x: 320,
      y: 843
    },
    trollface: {
      x: 384,
      y: 843
    },
    sunny: {
      x: 448,
      y: 843
    },
    umbrella: {
      x: 512,
      y: 843
    },
    cloud: {
      x: 576,
      y: 843
    },
    snowflake: {
      x: 640,
      y: 843
    },
    snowman: {
      x: 704,
      y: 843
    },
    zap: {
      x: 768,
      y: 843
    },
    cyclone: {
      x: 832,
      y: 843
    },
    foggy: {
      x: 907,
      y: 0
    },
    ocean: {
      x: 907,
      y: 64
    },
    cat: {
      x: 907,
      y: 128
    },
    dog: {
      x: 907,
      y: 192
    },
    mouse: {
      x: 907,
      y: 256
    },
    hamster: {
      x: 907,
      y: 320
    },
    rabbit: {
      x: 907,
      y: 384
    },
    wolf: {
      x: 907,
      y: 448
    },
    frog: {
      x: 907,
      y: 512
    },
    tiger: {
      x: 907,
      y: 576
    },
    koala: {
      x: 907,
      y: 640
    },
    bear: {
      x: 907,
      y: 704
    },
    pig: {
      x: 907,
      y: 768
    },
    pig_nose: {
      x: 907,
      y: 832
    },
    cow: {
      x: 0,
      y: 907
    },
    boar: {
      x: 64,
      y: 907
    },
    monkey_face: {
      x: 128,
      y: 907
    },
    monkey: {
      x: 192,
      y: 907
    },
    horse: {
      x: 256,
      y: 907
    },
    racehorse: {
      x: 320,
      y: 907
    },
    camel: {
      x: 384,
      y: 907
    },
    sheep: {
      x: 448,
      y: 907
    },
    elephant: {
      x: 512,
      y: 907
    },
    panda_face: {
      x: 576,
      y: 907
    },
    snake: {
      x: 640,
      y: 907
    },
    bird: {
      x: 704,
      y: 907
    },
    baby_chick: {
      x: 768,
      y: 907
    },
    hatched_chick: {
      x: 832,
      y: 907
    },
    hatching_chick: {
      x: 896,
      y: 907
    },
    chicken: {
      x: 971,
      y: 0
    },
    penguin: {
      x: 971,
      y: 64
    },
    turtle: {
      x: 971,
      y: 128
    },
    bug: {
      x: 971,
      y: 192
    },
    honeybee: {
      x: 971,
      y: 256
    },
    ant: {
      x: 971,
      y: 320
    },
    beetle: {
      x: 971,
      y: 384
    },
    snail: {
      x: 971,
      y: 448
    },
    octopus: {
      x: 971,
      y: 512
    },
    tropical_fish: {
      x: 971,
      y: 576
    },
    fish: {
      x: 971,
      y: 640
    },
    whale: {
      x: 971,
      y: 704
    },
    whale2: {
      x: 971,
      y: 768
    },
    dolphin: {
      x: 971,
      y: 832
    },
    cow2: {
      x: 971,
      y: 896
    },
    ram: {
      x: 0,
      y: 971
    },
    rat: {
      x: 64,
      y: 971
    },
    water_buffalo: {
      x: 128,
      y: 971
    },
    tiger2: {
      x: 192,
      y: 971
    },
    rabbit2: {
      x: 256,
      y: 971
    },
    dragon: {
      x: 320,
      y: 971
    },
    goat: {
      x: 384,
      y: 971
    },
    rooster: {
      x: 448,
      y: 971
    },
    dog2: {
      x: 512,
      y: 971
    },
    pig2: {
      x: 576,
      y: 971
    },
    mouse2: {
      x: 640,
      y: 971
    },
    ox: {
      x: 704,
      y: 971
    },
    dragon_face: {
      x: 768,
      y: 971
    },
    blowfish: {
      x: 832,
      y: 971
    },
    crocodile: {
      x: 896,
      y: 971
    },
    dromedary_camel: {
      x: 960,
      y: 971
    },
    leopard: {
      x: 1035,
      y: 0
    },
    cat2: {
      x: 1035,
      y: 64
    },
    poodle: {
      x: 1035,
      y: 128
    },
    paw_prints: {
      x: 1035,
      y: 192
    },
    bouquet: {
      x: 1035,
      y: 256
    },
    cherry_blossom: {
      x: 1035,
      y: 320
    },
    tulip: {
      x: 1035,
      y: 384
    },
    four_leaf_clover: {
      x: 1035,
      y: 448
    },
    rose: {
      x: 1035,
      y: 512
    },
    sunflower: {
      x: 1035,
      y: 576
    },
    hibiscus: {
      x: 1035,
      y: 640
    },
    maple_leaf: {
      x: 1035,
      y: 704
    },
    leaves: {
      x: 1035,
      y: 768
    },
    fallen_leaf: {
      x: 1035,
      y: 832
    },
    herb: {
      x: 1035,
      y: 896
    },
    mushroom: {
      x: 1035,
      y: 960
    },
    cactus: {
      x: 0,
      y: 1035
    },
    palm_tree: {
      x: 64,
      y: 1035
    },
    evergreen_tree: {
      x: 128,
      y: 1035
    },
    deciduous_tree: {
      x: 192,
      y: 1035
    },
    chestnut: {
      x: 256,
      y: 1035
    },
    seedling: {
      x: 320,
      y: 1035
    },
    blossom: {
      x: 384,
      y: 1035
    },
    ear_of_rice: {
      x: 448,
      y: 1035
    },
    shell: {
      x: 512,
      y: 1035
    },
    globe_with_meridians: {
      x: 576,
      y: 1035
    },
    sun_with_face: {
      x: 640,
      y: 1035
    },
    full_moon_with_face: {
      x: 704,
      y: 1035
    },
    new_moon_with_face: {
      x: 768,
      y: 1035
    },
    new_moon: {
      x: 832,
      y: 1035
    },
    waxing_crescent_moon: {
      x: 896,
      y: 1035
    },
    first_quarter_moon: {
      x: 960,
      y: 1035
    },
    waxing_gibbous_moon: {
      x: 1024,
      y: 1035
    },
    full_moon: {
      x: 1099,
      y: 0
    },
    waning_gibbous_moon: {
      x: 1099,
      y: 64
    },
    last_quarter_moon: {
      x: 1099,
      y: 128
    },
    waning_crescent_moon: {
      x: 1099,
      y: 192
    },
    last_quarter_moon_with_face: {
      x: 1099,
      y: 256
    },
    first_quarter_moon_with_face: {
      x: 1099,
      y: 320
    },
    crescent_moon: {
      x: 1099,
      y: 384
    },
    earth_africa: {
      x: 1099,
      y: 448
    },
    earth_americas: {
      x: 1099,
      y: 512
    },
    earth_asia: {
      x: 1099,
      y: 576
    },
    volcano: {
      x: 1099,
      y: 640
    },
    milky_way: {
      x: 1099,
      y: 704
    },
    partly_sunny: {
      x: 1099,
      y: 768
    },
    octocat: {
      x: 1099,
      y: 832
    },
    squirrel: {
      x: 0,
      y: 0,
      width: 75,
      height: 75
    },
    bamboo: {
      x: 1099,
      y: 960
    },
    gift_heart: {
      x: 1099,
      y: 1024
    },
    dolls: {
      x: 0,
      y: 1099
    },
    school_satchel: {
      x: 64,
      y: 1099
    },
    mortar_board: {
      x: 128,
      y: 1099
    },
    flags: {
      x: 192,
      y: 1099
    },
    fireworks: {
      x: 256,
      y: 1099
    },
    sparkler: {
      x: 320,
      y: 1099
    },
    wind_chime: {
      x: 384,
      y: 1099
    },
    rice_scene: {
      x: 448,
      y: 1099
    },
    jack_o_lantern: {
      x: 512,
      y: 1099
    },
    ghost: {
      x: 576,
      y: 1099
    },
    santa: {
      x: 640,
      y: 1099
    },
    christmas_tree: {
      x: 704,
      y: 1099
    },
    gift: {
      x: 768,
      y: 1099
    },
    bell: {
      x: 832,
      y: 1099
    },
    no_bell: {
      x: 896,
      y: 1099
    },
    tanabata_tree: {
      x: 960,
      y: 1099
    },
    tada: {
      x: 1024,
      y: 1099
    },
    confetti_ball: {
      x: 1088,
      y: 1099
    },
    balloon: {
      x: 1163,
      y: 0
    },
    crystal_ball: {
      x: 1163,
      y: 64
    },
    cd: {
      x: 1163,
      y: 128
    },
    dvd: {
      x: 1163,
      y: 192
    },
    floppy_disk: {
      x: 1163,
      y: 256
    },
    camera: {
      x: 1163,
      y: 320
    },
    video_camera: {
      x: 1163,
      y: 384
    },
    movie_camera: {
      x: 1163,
      y: 448
    },
    computer: {
      x: 1163,
      y: 512
    },
    tv: {
      x: 1163,
      y: 576
    },
    iphone: {
      x: 1163,
      y: 640
    },
    phone: {
      x: 1163,
      y: 704
    },
    telephone: {
      x: 1163,
      y: 768
    },
    telephone_receiver: {
      x: 1163,
      y: 832
    },
    pager: {
      x: 1163,
      y: 896
    },
    fax: {
      x: 1163,
      y: 960
    },
    minidisc: {
      x: 1163,
      y: 1024
    },
    vhs: {
      x: 1163,
      y: 1088
    },
    sound: {
      x: 0,
      y: 1163
    },
    speaker: {
      x: 64,
      y: 1163
    },
    mute: {
      x: 128,
      y: 1163
    },
    loudspeaker: {
      x: 192,
      y: 1163
    },
    mega: {
      x: 256,
      y: 1163
    },
    hourglass: {
      x: 320,
      y: 1163
    },
    hourglass_flowing_sand: {
      x: 384,
      y: 1163
    },
    alarm_clock: {
      x: 448,
      y: 1163
    },
    watch: {
      x: 512,
      y: 1163
    },
    radio: {
      x: 576,
      y: 1163
    },
    satellite: {
      x: 640,
      y: 1163
    },
    loop: {
      x: 704,
      y: 1163
    },
    mag: {
      x: 768,
      y: 1163
    },
    mag_right: {
      x: 832,
      y: 1163
    },
    unlock: {
      x: 896,
      y: 1163
    },
    lock: {
      x: 960,
      y: 1163
    },
    lock_with_ink_pen: {
      x: 1024,
      y: 1163
    },
    closed_lock_with_key: {
      x: 1088,
      y: 1163
    },
    key: {
      x: 1152,
      y: 1163
    },
    bulb: {
      x: 1227,
      y: 0
    },
    flashlight: {
      x: 1227,
      y: 64
    },
    high_brightness: {
      x: 1227,
      y: 128
    },
    low_brightness: {
      x: 1227,
      y: 192
    },
    electric_plug: {
      x: 1227,
      y: 256
    },
    battery: {
      x: 1227,
      y: 320
    },
    calling: {
      x: 1227,
      y: 384
    },
    email: {
      x: 1227,
      y: 448
    },
    mailbox: {
      x: 1227,
      y: 512
    },
    postbox: {
      x: 1227,
      y: 576
    },
    bath: {
      x: 1227,
      y: 640
    },
    bathtub: {
      x: 1227,
      y: 704
    },
    shower: {
      x: 1227,
      y: 768
    },
    toilet: {
      x: 1227,
      y: 832
    },
    wrench: {
      x: 1227,
      y: 896
    },
    nut_and_bolt: {
      x: 1227,
      y: 960
    },
    hammer: {
      x: 1227,
      y: 1024
    },
    seat: {
      x: 1227,
      y: 1088
    },
    moneybag: {
      x: 1227,
      y: 1152
    },
    yen: {
      x: 0,
      y: 1227
    },
    dollar: {
      x: 64,
      y: 1227
    },
    pound: {
      x: 128,
      y: 1227
    },
    euro: {
      x: 192,
      y: 1227
    },
    credit_card: {
      x: 256,
      y: 1227
    },
    money_with_wings: {
      x: 320,
      y: 1227
    },
    "e-mail": {
      x: 384,
      y: 1227
    },
    inbox_tray: {
      x: 448,
      y: 1227
    },
    outbox_tray: {
      x: 512,
      y: 1227
    },
    envelope: {
      x: 576,
      y: 1227
    },
    incoming_envelope: {
      x: 640,
      y: 1227
    },
    postal_horn: {
      x: 704,
      y: 1227
    },
    mailbox_closed: {
      x: 768,
      y: 1227
    },
    mailbox_with_mail: {
      x: 832,
      y: 1227
    },
    mailbox_with_no_mail: {
      x: 896,
      y: 1227
    },
    package: {
      x: 960,
      y: 1227
    },
    door: {
      x: 1024,
      y: 1227
    },
    smoking: {
      x: 1088,
      y: 1227
    },
    bomb: {
      x: 1152,
      y: 1227
    },
    gun: {
      x: 1216,
      y: 1227
    },
    hocho: {
      x: 1291,
      y: 0
    },
    pill: {
      x: 1291,
      y: 64
    },
    syringe: {
      x: 1291,
      y: 128
    },
    page_facing_up: {
      x: 1291,
      y: 192
    },
    page_with_curl: {
      x: 1291,
      y: 256
    },
    bookmark_tabs: {
      x: 1291,
      y: 320
    },
    bar_chart: {
      x: 1291,
      y: 384
    },
    chart_with_upwards_trend: {
      x: 1291,
      y: 448
    },
    chart_with_downwards_trend: {
      x: 1291,
      y: 512
    },
    scroll: {
      x: 1291,
      y: 576
    },
    clipboard: {
      x: 1291,
      y: 640
    },
    calendar: {
      x: 1291,
      y: 704
    },
    date: {
      x: 1291,
      y: 768
    },
    card_index: {
      x: 1291,
      y: 832
    },
    file_folder: {
      x: 1291,
      y: 896
    },
    open_file_folder: {
      x: 1291,
      y: 960
    },
    scissors: {
      x: 1291,
      y: 1024
    },
    pushpin: {
      x: 1291,
      y: 1088
    },
    paperclip: {
      x: 1291,
      y: 1152
    },
    black_nib: {
      x: 1291,
      y: 1216
    },
    pencil2: {
      x: 0,
      y: 1291
    },
    straight_ruler: {
      x: 64,
      y: 1291
    },
    triangular_ruler: {
      x: 128,
      y: 1291
    },
    closed_book: {
      x: 192,
      y: 1291
    },
    green_book: {
      x: 256,
      y: 1291
    },
    blue_book: {
      x: 320,
      y: 1291
    },
    orange_book: {
      x: 384,
      y: 1291
    },
    notebook: {
      x: 448,
      y: 1291
    },
    notebook_with_decorative_cover: {
      x: 512,
      y: 1291
    },
    ledger: {
      x: 576,
      y: 1291
    },
    books: {
      x: 640,
      y: 1291
    },
    bookmark: {
      x: 704,
      y: 1291
    },
    name_badge: {
      x: 768,
      y: 1291
    },
    microscope: {
      x: 832,
      y: 1291
    },
    telescope: {
      x: 896,
      y: 1291
    },
    newspaper: {
      x: 75,
      y: 0
    },
    football: {
      x: 1024,
      y: 1291
    },
    basketball: {
      x: 1088,
      y: 1291
    },
    soccer: {
      x: 1152,
      y: 1291
    },
    baseball: {
      x: 1216,
      y: 1291
    },
    tennis: {
      x: 1280,
      y: 1291
    },
    "8ball": {
      x: 1355,
      y: 0
    },
    rugby_football: {
      x: 1355,
      y: 64
    },
    bowling: {
      x: 1355,
      y: 128
    },
    golf: {
      x: 1355,
      y: 192
    },
    mountain_bicyclist: {
      x: 1355,
      y: 256
    },
    bicyclist: {
      x: 1355,
      y: 320
    },
    horse_racing: {
      x: 1355,
      y: 384
    },
    snowboarder: {
      x: 1355,
      y: 448
    },
    swimmer: {
      x: 1355,
      y: 512
    },
    surfer: {
      x: 1355,
      y: 576
    },
    ski: {
      x: 1355,
      y: 640
    },
    spades: {
      x: 1355,
      y: 704
    },
    hearts: {
      x: 1355,
      y: 768
    },
    clubs: {
      x: 1355,
      y: 832
    },
    diamonds: {
      x: 1355,
      y: 896
    },
    gem: {
      x: 1355,
      y: 960
    },
    ring: {
      x: 1355,
      y: 1024
    },
    trophy: {
      x: 1355,
      y: 1088
    },
    musical_score: {
      x: 1355,
      y: 1152
    },
    musical_keyboard: {
      x: 1355,
      y: 1216
    },
    violin: {
      x: 1355,
      y: 1280
    },
    space_invader: {
      x: 0,
      y: 1355
    },
    video_game: {
      x: 64,
      y: 1355
    },
    black_joker: {
      x: 128,
      y: 1355
    },
    flower_playing_cards: {
      x: 192,
      y: 1355
    },
    game_die: {
      x: 256,
      y: 1355
    },
    dart: {
      x: 320,
      y: 1355
    },
    mahjong: {
      x: 384,
      y: 1355
    },
    clapper: {
      x: 448,
      y: 1355
    },
    memo: {
      x: 512,
      y: 1355
    },
    pencil: {
      x: 576,
      y: 1355
    },
    book: {
      x: 640,
      y: 1355
    },
    art: {
      x: 704,
      y: 1355
    },
    microphone: {
      x: 768,
      y: 1355
    },
    headphones: {
      x: 832,
      y: 1355
    },
    trumpet: {
      x: 896,
      y: 1355
    },
    saxophone: {
      x: 960,
      y: 1355
    },
    guitar: {
      x: 1024,
      y: 1355
    },
    shoe: {
      x: 1088,
      y: 1355
    },
    sandal: {
      x: 1152,
      y: 1355
    },
    high_heel: {
      x: 1216,
      y: 1355
    },
    lipstick: {
      x: 1280,
      y: 1355
    },
    boot: {
      x: 1344,
      y: 1355
    },
    shirt: {
      x: 1419,
      y: 0
    },
    tshirt: {
      x: 1419,
      y: 64
    },
    necktie: {
      x: 1419,
      y: 128
    },
    womans_clothes: {
      x: 1419,
      y: 192
    },
    dress: {
      x: 1419,
      y: 256
    },
    running_shirt_with_sash: {
      x: 1419,
      y: 320
    },
    jeans: {
      x: 1419,
      y: 384
    },
    kimono: {
      x: 1419,
      y: 448
    },
    bikini: {
      x: 1419,
      y: 512
    },
    ribbon: {
      x: 1419,
      y: 576
    },
    tophat: {
      x: 1419,
      y: 640
    },
    crown: {
      x: 1419,
      y: 704
    },
    womans_hat: {
      x: 1419,
      y: 768
    },
    mans_shoe: {
      x: 1419,
      y: 832
    },
    closed_umbrella: {
      x: 1419,
      y: 896
    },
    briefcase: {
      x: 1419,
      y: 960
    },
    handbag: {
      x: 1419,
      y: 1024
    },
    pouch: {
      x: 1419,
      y: 1088
    },
    purse: {
      x: 1419,
      y: 1152
    },
    eyeglasses: {
      x: 1419,
      y: 1216
    },
    fishing_pole_and_fish: {
      x: 1419,
      y: 1280
    },
    coffee: {
      x: 1419,
      y: 1344
    },
    tea: {
      x: 0,
      y: 1419
    },
    sake: {
      x: 64,
      y: 1419
    },
    baby_bottle: {
      x: 128,
      y: 1419
    },
    beer: {
      x: 192,
      y: 1419
    },
    beers: {
      x: 256,
      y: 1419
    },
    cocktail: {
      x: 320,
      y: 1419
    },
    tropical_drink: {
      x: 384,
      y: 1419
    },
    wine_glass: {
      x: 448,
      y: 1419
    },
    fork_and_knife: {
      x: 512,
      y: 1419
    },
    pizza: {
      x: 576,
      y: 1419
    },
    hamburger: {
      x: 640,
      y: 1419
    },
    fries: {
      x: 704,
      y: 1419
    },
    poultry_leg: {
      x: 768,
      y: 1419
    },
    meat_on_bone: {
      x: 832,
      y: 1419
    },
    spaghetti: {
      x: 896,
      y: 1419
    },
    curry: {
      x: 960,
      y: 1419
    },
    fried_shrimp: {
      x: 1024,
      y: 1419
    },
    bento: {
      x: 1088,
      y: 1419
    },
    sushi: {
      x: 1152,
      y: 1419
    },
    fish_cake: {
      x: 1216,
      y: 1419
    },
    rice_ball: {
      x: 1280,
      y: 1419
    },
    rice_cracker: {
      x: 1344,
      y: 1419
    },
    rice: {
      x: 1408,
      y: 1419
    },
    ramen: {
      x: 1483,
      y: 0
    },
    stew: {
      x: 1483,
      y: 64
    },
    oden: {
      x: 1483,
      y: 128
    },
    dango: {
      x: 1483,
      y: 192
    },
    egg: {
      x: 1483,
      y: 256
    },
    bread: {
      x: 1483,
      y: 320
    },
    doughnut: {
      x: 1483,
      y: 384
    },
    custard: {
      x: 1483,
      y: 448
    },
    icecream: {
      x: 1483,
      y: 512
    },
    ice_cream: {
      x: 1483,
      y: 576
    },
    shaved_ice: {
      x: 1483,
      y: 640
    },
    birthday: {
      x: 1483,
      y: 704
    },
    cake: {
      x: 1483,
      y: 768
    },
    cookie: {
      x: 1483,
      y: 832
    },
    chocolate_bar: {
      x: 1483,
      y: 896
    },
    candy: {
      x: 1483,
      y: 960
    },
    lollipop: {
      x: 1483,
      y: 1024
    },
    honey_pot: {
      x: 1483,
      y: 1088
    },
    apple: {
      x: 1483,
      y: 1152
    },
    green_apple: {
      x: 1483,
      y: 1216
    },
    tangerine: {
      x: 1483,
      y: 1280
    },
    lemon: {
      x: 1483,
      y: 1344
    },
    cherries: {
      x: 1483,
      y: 1408
    },
    grapes: {
      x: 0,
      y: 1483
    },
    watermelon: {
      x: 64,
      y: 1483
    },
    strawberry: {
      x: 128,
      y: 1483
    },
    peach: {
      x: 192,
      y: 1483
    },
    melon: {
      x: 256,
      y: 1483
    },
    banana: {
      x: 320,
      y: 1483
    },
    pear: {
      x: 384,
      y: 1483
    },
    pineapple: {
      x: 448,
      y: 1483
    },
    sweet_potato: {
      x: 512,
      y: 1483
    },
    eggplant: {
      x: 576,
      y: 1483
    },
    tomato: {
      x: 640,
      y: 1483
    },
    corn: {
      x: 704,
      y: 1483
    },
    house: {
      x: 768,
      y: 1483
    },
    house_with_garden: {
      x: 832,
      y: 1483
    },
    school: {
      x: 896,
      y: 1483
    },
    office: {
      x: 960,
      y: 1483
    },
    post_office: {
      x: 1024,
      y: 1483
    },
    hospital: {
      x: 1088,
      y: 1483
    },
    bank: {
      x: 1152,
      y: 1483
    },
    convenience_store: {
      x: 1216,
      y: 1483
    },
    love_hotel: {
      x: 1280,
      y: 1483
    },
    hotel: {
      x: 1344,
      y: 1483
    },
    wedding: {
      x: 1408,
      y: 1483
    },
    church: {
      x: 1472,
      y: 1483
    },
    department_store: {
      x: 1547,
      y: 0
    },
    european_post_office: {
      x: 1547,
      y: 64
    },
    city_sunrise: {
      x: 1547,
      y: 128
    },
    city_sunset: {
      x: 1547,
      y: 192
    },
    japanese_castle: {
      x: 1547,
      y: 256
    },
    european_castle: {
      x: 1547,
      y: 320
    },
    tent: {
      x: 1547,
      y: 384
    },
    factory: {
      x: 1547,
      y: 448
    },
    tokyo_tower: {
      x: 1547,
      y: 512
    },
    japan: {
      x: 1547,
      y: 576
    },
    mount_fuji: {
      x: 1547,
      y: 640
    },
    sunrise_over_mountains: {
      x: 1547,
      y: 704
    },
    sunrise: {
      x: 1547,
      y: 768
    },
    stars: {
      x: 1547,
      y: 832
    },
    statue_of_liberty: {
      x: 1547,
      y: 896
    },
    bridge_at_night: {
      x: 1547,
      y: 960
    },
    carousel_horse: {
      x: 1547,
      y: 1024
    },
    rainbow: {
      x: 1547,
      y: 1088
    },
    ferris_wheel: {
      x: 1547,
      y: 1152
    },
    fountain: {
      x: 1547,
      y: 1216
    },
    roller_coaster: {
      x: 1547,
      y: 1280
    },
    ship: {
      x: 1547,
      y: 1344
    },
    speedboat: {
      x: 1547,
      y: 1408
    },
    boat: {
      x: 1547,
      y: 1472
    },
    sailboat: {
      x: 0,
      y: 1547
    },
    rowboat: {
      x: 64,
      y: 1547
    },
    anchor: {
      x: 128,
      y: 1547
    },
    rocket: {
      x: 192,
      y: 1547
    },
    airplane: {
      x: 256,
      y: 1547
    },
    helicopter: {
      x: 320,
      y: 1547
    },
    steam_locomotive: {
      x: 384,
      y: 1547
    },
    tram: {
      x: 448,
      y: 1547
    },
    mountain_railway: {
      x: 512,
      y: 1547
    },
    bike: {
      x: 576,
      y: 1547
    },
    aerial_tramway: {
      x: 640,
      y: 1547
    },
    suspension_railway: {
      x: 704,
      y: 1547
    },
    mountain_cableway: {
      x: 768,
      y: 1547
    },
    tractor: {
      x: 832,
      y: 1547
    },
    blue_car: {
      x: 896,
      y: 1547
    },
    oncoming_automobile: {
      x: 960,
      y: 1547
    },
    car: {
      x: 1024,
      y: 1547
    },
    red_car: {
      x: 1088,
      y: 1547
    },
    taxi: {
      x: 1152,
      y: 1547
    },
    oncoming_taxi: {
      x: 1216,
      y: 1547
    },
    articulated_lorry: {
      x: 1280,
      y: 1547
    },
    bus: {
      x: 1344,
      y: 1547
    },
    oncoming_bus: {
      x: 1408,
      y: 1547
    },
    rotating_light: {
      x: 1472,
      y: 1547
    },
    police_car: {
      x: 1536,
      y: 1547
    },
    oncoming_police_car: {
      x: 1611,
      y: 0
    },
    fire_engine: {
      x: 1611,
      y: 64
    },
    ambulance: {
      x: 1611,
      y: 128
    },
    minibus: {
      x: 1611,
      y: 192
    },
    truck: {
      x: 1611,
      y: 256
    },
    train: {
      x: 1611,
      y: 320
    },
    station: {
      x: 1611,
      y: 384
    },
    train2: {
      x: 1611,
      y: 448
    },
    bullettrain_front: {
      x: 1611,
      y: 512
    },
    bullettrain_side: {
      x: 1611,
      y: 576
    },
    light_rail: {
      x: 1611,
      y: 640
    },
    monorail: {
      x: 1611,
      y: 704
    },
    railway_car: {
      x: 1611,
      y: 768
    },
    trolleybus: {
      x: 1611,
      y: 832
    },
    ticket: {
      x: 1611,
      y: 896
    },
    fuelpump: {
      x: 1611,
      y: 960
    },
    vertical_traffic_light: {
      x: 1611,
      y: 1024
    },
    traffic_light: {
      x: 1611,
      y: 1088
    },
    warning: {
      x: 1611,
      y: 1152
    },
    construction: {
      x: 1611,
      y: 1216
    },
    beginner: {
      x: 1611,
      y: 1280
    },
    atm: {
      x: 1611,
      y: 1344
    },
    slot_machine: {
      x: 1611,
      y: 1408
    },
    busstop: {
      x: 1611,
      y: 1472
    },
    barber: {
      x: 1611,
      y: 1536
    },
    hotsprings: {
      x: 0,
      y: 1611
    },
    checkered_flag: {
      x: 64,
      y: 1611
    },
    crossed_flags: {
      x: 128,
      y: 1611
    },
    izakaya_lantern: {
      x: 192,
      y: 1611
    },
    moyai: {
      x: 256,
      y: 1611
    },
    circus_tent: {
      x: 320,
      y: 1611
    },
    performing_arts: {
      x: 384,
      y: 1611
    },
    round_pushpin: {
      x: 448,
      y: 1611
    },
    triangular_flag_on_post: {
      x: 512,
      y: 1611
    },
    jp: {
      x: 576,
      y: 1611
    },
    kr: {
      x: 640,
      y: 1611
    },
    cn: {
      x: 704,
      y: 1611
    },
    us: {
      x: 768,
      y: 1611
    },
    fr: {
      x: 832,
      y: 1611
    },
    es: {
      x: 896,
      y: 1611
    },
    it: {
      x: 960,
      y: 1611
    },
    ru: {
      x: 1024,
      y: 1611
    },
    gb: {
      x: 1088,
      y: 1611
    },
    uk: {
      x: 1152,
      y: 1611
    },
    de: {
      x: 1216,
      y: 1611
    },
    one: {
      x: 1280,
      y: 1611
    },
    two: {
      x: 1344,
      y: 1611
    },
    three: {
      x: 1408,
      y: 1611
    },
    four: {
      x: 1472,
      y: 1611
    },
    five: {
      x: 1536,
      y: 1611
    },
    six: {
      x: 1600,
      y: 1611
    },
    seven: {
      x: 1675,
      y: 0
    },
    eight: {
      x: 1675,
      y: 64
    },
    nine: {
      x: 1675,
      y: 128
    },
    keycap_ten: {
      x: 1675,
      y: 192
    },
    "1234": {
      x: 1675,
      y: 256
    },
    zero: {
      x: 1675,
      y: 320
    },
    hash: {
      x: 1675,
      y: 384
    },
    symbols: {
      x: 1675,
      y: 448
    },
    arrow_backward: {
      x: 1675,
      y: 512
    },
    arrow_down: {
      x: 1675,
      y: 576
    },
    arrow_forward: {
      x: 1675,
      y: 640
    },
    arrow_left: {
      x: 1675,
      y: 704
    },
    capital_abcd: {
      x: 1675,
      y: 768
    },
    abcd: {
      x: 1675,
      y: 832
    },
    abc: {
      x: 1675,
      y: 896
    },
    arrow_lower_left: {
      x: 1675,
      y: 960
    },
    arrow_lower_right: {
      x: 1675,
      y: 1024
    },
    arrow_right: {
      x: 1675,
      y: 1088
    },
    arrow_up: {
      x: 1675,
      y: 1152
    },
    arrow_upper_left: {
      x: 1675,
      y: 1216
    },
    arrow_upper_right: {
      x: 1675,
      y: 1280
    },
    arrow_double_down: {
      x: 1675,
      y: 1344
    },
    arrow_double_up: {
      x: 1675,
      y: 1408
    },
    arrow_down_small: {
      x: 1675,
      y: 1472
    },
    arrow_heading_down: {
      x: 1675,
      y: 1536
    },
    arrow_heading_up: {
      x: 1675,
      y: 1600
    },
    leftwards_arrow_with_hook: {
      x: 0,
      y: 1675
    },
    arrow_right_hook: {
      x: 64,
      y: 1675
    },
    left_right_arrow: {
      x: 128,
      y: 1675
    },
    arrow_up_down: {
      x: 192,
      y: 1675
    },
    arrow_up_small: {
      x: 256,
      y: 1675
    },
    arrows_clockwise: {
      x: 320,
      y: 1675
    },
    arrows_counterclockwise: {
      x: 384,
      y: 1675
    },
    rewind: {
      x: 448,
      y: 1675
    },
    fast_forward: {
      x: 512,
      y: 1675
    },
    information_source: {
      x: 576,
      y: 1675
    },
    ok: {
      x: 640,
      y: 1675
    },
    twisted_rightwards_arrows: {
      x: 704,
      y: 1675
    },
    repeat: {
      x: 768,
      y: 1675
    },
    repeat_one: {
      x: 832,
      y: 1675
    },
    new: {
      x: 896,
      y: 1675
    },
    top: {
      x: 960,
      y: 1675
    },
    up: {
      x: 1024,
      y: 1675
    },
    cool: {
      x: 1088,
      y: 1675
    },
    free: {
      x: 1152,
      y: 1675
    },
    ng: {
      x: 1216,
      y: 1675
    },
    cinema: {
      x: 1280,
      y: 1675
    },
    koko: {
      x: 1344,
      y: 1675
    },
    signal_strength: {
      x: 1408,
      y: 1675
    },
    u5272: {
      x: 1472,
      y: 1675
    },
    u5408: {
      x: 1536,
      y: 1675
    },
    u55b6: {
      x: 1600,
      y: 1675
    },
    u6307: {
      x: 1664,
      y: 1675
    },
    u6708: {
      x: 1739,
      y: 0
    },
    u6709: {
      x: 1739,
      y: 64
    },
    u6e80: {
      x: 1739,
      y: 128
    },
    u7121: {
      x: 1739,
      y: 192
    },
    u7533: {
      x: 1739,
      y: 256
    },
    u7a7a: {
      x: 1739,
      y: 320
    },
    u7981: {
      x: 1739,
      y: 384
    },
    sa: {
      x: 1739,
      y: 448
    },
    restroom: {
      x: 1739,
      y: 512
    },
    mens: {
      x: 1739,
      y: 576
    },
    womens: {
      x: 1739,
      y: 640
    },
    baby_symbol: {
      x: 1739,
      y: 704
    },
    no_smoking: {
      x: 1739,
      y: 768
    },
    parking: {
      x: 1739,
      y: 832
    },
    wheelchair: {
      x: 1739,
      y: 896
    },
    metro: {
      x: 1739,
      y: 960
    },
    baggage_claim: {
      x: 1739,
      y: 1024
    },
    accept: {
      x: 1739,
      y: 1088
    },
    wc: {
      x: 1739,
      y: 1152
    },
    potable_water: {
      x: 1739,
      y: 1216
    },
    put_litter_in_its_place: {
      x: 1739,
      y: 1280
    },
    secret: {
      x: 1739,
      y: 1344
    },
    congratulations: {
      x: 1739,
      y: 1408
    },
    m: {
      x: 1739,
      y: 1472
    },
    passport_control: {
      x: 1739,
      y: 1536
    },
    left_luggage: {
      x: 1739,
      y: 1600
    },
    customs: {
      x: 1739,
      y: 1664
    },
    ideograph_advantage: {
      x: 0,
      y: 1739
    },
    cl: {
      x: 64,
      y: 1739
    },
    sos: {
      x: 128,
      y: 1739
    },
    id: {
      x: 192,
      y: 1739
    },
    no_entry_sign: {
      x: 256,
      y: 1739
    },
    underage: {
      x: 320,
      y: 1739
    },
    no_mobile_phones: {
      x: 384,
      y: 1739
    },
    do_not_litter: {
      x: 448,
      y: 1739
    },
    "non-potable_water": {
      x: 512,
      y: 1739
    },
    no_bicycles: {
      x: 576,
      y: 1739
    },
    no_pedestrians: {
      x: 640,
      y: 1739
    },
    children_crossing: {
      x: 704,
      y: 1739
    },
    no_entry: {
      x: 768,
      y: 1739
    },
    eight_spoked_asterisk: {
      x: 832,
      y: 1739
    },
    sparkle: {
      x: 896,
      y: 1739
    },
    eight_pointed_black_star: {
      x: 960,
      y: 1739
    },
    heart_decoration: {
      x: 1024,
      y: 1739
    },
    vs: {
      x: 1088,
      y: 1739
    },
    vibration_mode: {
      x: 1152,
      y: 1739
    },
    mobile_phone_off: {
      x: 1216,
      y: 1739
    },
    chart: {
      x: 1280,
      y: 1739
    },
    currency_exchange: {
      x: 1344,
      y: 1739
    },
    aries: {
      x: 1408,
      y: 1739
    },
    taurus: {
      x: 1472,
      y: 1739
    },
    gemini: {
      x: 1536,
      y: 1739
    },
    cancer: {
      x: 1600,
      y: 1739
    },
    leo: {
      x: 1664,
      y: 1739
    },
    virgo: {
      x: 1728,
      y: 1739
    },
    libra: {
      x: 1803,
      y: 0
    },
    scorpius: {
      x: 1803,
      y: 64
    },
    sagittarius: {
      x: 1803,
      y: 128
    },
    capricorn: {
      x: 1803,
      y: 192
    },
    aquarius: {
      x: 1803,
      y: 256
    },
    pisces: {
      x: 1803,
      y: 320
    },
    ophiuchus: {
      x: 1803,
      y: 384
    },
    six_pointed_star: {
      x: 1803,
      y: 448
    },
    negative_squared_cross_mark: {
      x: 1803,
      y: 512
    },
    a: {
      x: 1803,
      y: 576
    },
    b: {
      x: 1803,
      y: 640
    },
    ab: {
      x: 1803,
      y: 704
    },
    o2: {
      x: 1803,
      y: 768
    },
    diamond_shape_with_a_dot_inside: {
      x: 1803,
      y: 832
    },
    recycle: {
      x: 1803,
      y: 896
    },
    end: {
      x: 1803,
      y: 960
    },
    back: {
      x: 1803,
      y: 1024
    },
    on: {
      x: 1803,
      y: 1088
    },
    soon: {
      x: 1803,
      y: 1152
    },
    clock1: {
      x: 1803,
      y: 1216
    },
    clock130: {
      x: 1803,
      y: 1280
    },
    clock10: {
      x: 1803,
      y: 1344
    },
    clock1030: {
      x: 1803,
      y: 1408
    },
    clock11: {
      x: 1803,
      y: 1472
    },
    clock1130: {
      x: 1803,
      y: 1536
    },
    clock12: {
      x: 1803,
      y: 1600
    },
    clock1230: {
      x: 1803,
      y: 1664
    },
    clock2: {
      x: 1803,
      y: 1728
    },
    clock230: {
      x: 0,
      y: 1803
    },
    clock3: {
      x: 64,
      y: 1803
    },
    clock330: {
      x: 128,
      y: 1803
    },
    clock4: {
      x: 192,
      y: 1803
    },
    clock430: {
      x: 256,
      y: 1803
    },
    clock5: {
      x: 320,
      y: 1803
    },
    clock530: {
      x: 384,
      y: 1803
    },
    clock6: {
      x: 448,
      y: 1803
    },
    clock630: {
      x: 512,
      y: 1803
    },
    clock7: {
      x: 576,
      y: 1803
    },
    clock730: {
      x: 640,
      y: 1803
    },
    clock8: {
      x: 704,
      y: 1803
    },
    clock830: {
      x: 768,
      y: 1803
    },
    clock9: {
      x: 832,
      y: 1803
    },
    clock930: {
      x: 896,
      y: 1803
    },
    heavy_dollar_sign: {
      x: 960,
      y: 1803
    },
    copyright: {
      x: 1024,
      y: 1803
    },
    registered: {
      x: 1088,
      y: 1803
    },
    tm: {
      x: 1152,
      y: 1803
    },
    x: {
      x: 1216,
      y: 1803
    },
    heavy_exclamation_mark: {
      x: 1280,
      y: 1803
    },
    bangbang: {
      x: 1344,
      y: 1803
    },
    interrobang: {
      x: 1408,
      y: 1803
    },
    o: {
      x: 1472,
      y: 1803
    },
    heavy_multiplication_x: {
      x: 1536,
      y: 1803
    },
    heavy_plus_sign: {
      x: 1600,
      y: 1803
    },
    heavy_minus_sign: {
      x: 1664,
      y: 1803
    },
    heavy_division_sign: {
      x: 1728,
      y: 1803
    },
    white_flower: {
      x: 1792,
      y: 1803
    },
    "100": {
      x: 1867,
      y: 0
    },
    heavy_check_mark: {
      x: 1867,
      y: 64
    },
    ballot_box_with_check: {
      x: 1867,
      y: 128
    },
    radio_button: {
      x: 1867,
      y: 192
    },
    link: {
      x: 1867,
      y: 256
    },
    curly_loop: {
      x: 1867,
      y: 320
    },
    wavy_dash: {
      x: 1867,
      y: 384
    },
    part_alternation_mark: {
      x: 1867,
      y: 448
    },
    trident: {
      x: 1867,
      y: 512
    },
    black_small_square: {
      x: 1867,
      y: 576
    },
    white_small_square: {
      x: 1867,
      y: 640
    },
    black_medium_small_square: {
      x: 1867,
      y: 704
    },
    white_medium_small_square: {
      x: 1867,
      y: 768
    },
    black_medium_square: {
      x: 1867,
      y: 832
    },
    white_medium_square: {
      x: 1867,
      y: 896
    },
    white_large_square: {
      x: 1867,
      y: 960
    },
    white_check_mark: {
      x: 1867,
      y: 1024
    },
    black_square_button: {
      x: 1867,
      y: 1088
    },
    white_square_button: {
      x: 1867,
      y: 1152
    },
    black_circle: {
      x: 1867,
      y: 1216
    },
    white_circle: {
      x: 1867,
      y: 1280
    },
    red_circle: {
      x: 1867,
      y: 1344
    },
    large_blue_circle: {
      x: 1867,
      y: 1408
    },
    large_blue_diamond: {
      x: 1867,
      y: 1472
    },
    large_orange_diamond: {
      x: 1867,
      y: 1536
    },
    small_blue_diamond: {
      x: 1867,
      y: 1600
    },
    small_orange_diamond: {
      x: 1867,
      y: 1664
    },
    small_red_triangle: {
      x: 1867,
      y: 1728
    },
    small_red_triangle_down: {
      x: 1867,
      y: 1792
    }
  };

  /** Redirect rendering of descendants into the given CSS selector.
   *  @example
   *    <Portal into="body">
   *      <div>I am rendered into document.body</div>
   *    </Portal>
   */

  var Portal =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Portal, _Component);

    function Portal() {
      _classCallCheck(this, Portal);

      return _possibleConstructorReturn(this, _getPrototypeOf(Portal).apply(this, arguments));
    }

    _createClass(Portal, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(props) {
        for (var i in props) {
          if (props[i] !== this.props[i]) {
            return setTimeout(this.renderLayer);
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.isMounted = true;
        this.renderLayer = this.renderLayer.bind(this);
        this.renderLayer();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.renderLayer(false);
        this.isMounted = false;
        if (this.remote) this.remote.parentNode.removeChild(this.remote);
      }
    }, {
      key: "findNode",
      value: function findNode(node) {
        return typeof node === 'string' ? document.querySelector(node) : node;
      }
    }, {
      key: "renderLayer",
      value: function renderLayer() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (!this.isMounted) return; // clean up old node if moving bases:

        if (this.props.into !== this.intoPointer) {
          this.intoPointer = this.props.into;

          if (this.into && this.remote) {
            this.remote = render(h(PortalProxy, null), this.into, this.remote);
          }

          this.into = this.findNode(this.props.into);
        }

        this.remote = render(h(PortalProxy, {
          context: this.context
        }, show && this.props.children || null), this.into, this.remote);
      }
    }, {
      key: "render",
      value: function render$$1() {
        return null;
      }
    }]);

    return Portal;
  }(Component); // high-order component that renders its first child if it exists.

  var PortalProxy =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(PortalProxy, _Component2);

    function PortalProxy() {
      _classCallCheck(this, PortalProxy);

      return _possibleConstructorReturn(this, _getPrototypeOf(PortalProxy).apply(this, arguments));
    }

    _createClass(PortalProxy, [{
      key: "getChildContext",
      value: function getChildContext() {
        return this.props.context;
      }
    }, {
      key: "render",
      value: function render$$1(_ref) {
        var children = _ref.children;
        return children && children[0] || null;
      }
    }]);

    return PortalProxy;
  }(Component);

  var EmojiPicker =
  /*#__PURE__*/
  function (_Component) {
    _inherits(EmojiPicker, _Component);

    function EmojiPicker() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, EmojiPicker);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EmojiPicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        show: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
        _this.setState(function (prevState) {
          return {
            show: !prevState.show
          };
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyup", function (e) {
        var key = "which" in e ? e.which : e.keyCode;

        if (_this.state.show && key === 27) {
          _this.setState({
            show: false
          });
        }
      });

      return _this;
    }

    _createClass(EmojiPicker, [{
      key: "fillChat",
      value: function fillChat(val) {
        document.getElementById("chat-txt-message").value += " :".concat(val, ":");
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        document.addEventListener("keyup", this.handleKeyup);
      }
    }, {
      key: "render",
      value: function render$$1(props, _ref) {
        var _this2 = this;

        var show = _ref.show;
        var list = Object.keys(emojiNames).map(function (id) {
          var data = emojiNames[id];
          var x = data.x * 0.46875;
          var y = data.y * 0.46875;
          var css = {
            backgroundPosition: "-".concat(x, "px -").concat(y, "px")
          };
          return h("span", {
            key: "emoji-".concat(id),
            style: css,
            title: id,
            onClick: function onClick() {
              return _this2.fillChat(id);
            }
          });
        });
        return h("span", {
          className: "dp-emoji-picker-icon fa fa-smile-o",
          onClick: this.toggle
        }, h(Portal, {
          into: ".pusher-chat-widget-input"
        }, h("div", {
          className: "dp-emoji-picker ".concat(show ? "show" : "")
        }, list)));
      }
    }]);

    return EmojiPicker;
  }(Component);

  function SetupEmojiPicker () {
    render(h(EmojiPicker, null), document.querySelector(".chat-text-box-icons"));
  }

  /**
   * global State handler
   */
  var defaults = {
    "menu": {
      "general": "open",
      "user-interface": "open",
      "settings": "open",
      "customize": "open",
      "contact": "open"
    },
    "options": {
      "dubplus-autovote": false,
      "dubplus-emotes": false,
      "dubplus-autocomplete": false,
      "mention_notifications": false,
      "dubplus_pm_notifications": false,
      "dj-notification": false,
      "dubplus-dubs-hover": false,
      "dubplus-downdubs": false,
      "dubplus-grabschat": false,
      "dubplus-split-chat": false,
      "dubplus-show-timestamp": false,
      "dubplus-hide-bg": false,
      "dubplus-hide-avatars": false,
      "dubplus-chat-only": false,
      "dubplus-video-only": false,
      "warn_redirect": false,
      "dubplus-comm-theme": false,
      "dubplus-afk": false,
      "dubplus-snow": false,
      "dubplus-custom-css": false
    },
    "custom": {
      "customAfkMessage": "",
      "dj_notification": 1,
      "css": "",
      "bg": "",
      "notificationSound": ""
    }
  };

  var UserSettings =
  /*#__PURE__*/
  function () {
    function UserSettings() {
      _classCallCheck(this, UserSettings);

      _defineProperty(this, "srcRoot", "https://cdn.jsdelivr.net/gh/FranciscoG/DubPlus@preact-version");

      var _savedSettings = localStorage.getItem('dubplusUserSettings');

      if (_savedSettings) {
        try {
          var storedOpts = JSON.parse(_savedSettings);
          this.stored = Object.assign({}, defaults, storedOpts);
        } catch (err) {
          this.stored = defaults;
        }
      } else {
        this.stored = defaults;
      }
    }
    /**
     * Save your settings value to memory and localStorage
     * @param {String} type The section of the stored values. i.e. "menu", "options", "custom"
     * @param {String} optionName the key name of the option to store
     * @param {String|Boolean} value the new setting value to store
     */


    _createClass(UserSettings, [{
      key: "save",
      value: function save(type, optionName, value) {
        this.stored[type][optionName] = value;

        try {
          localStorage.setItem('dubplusUserSettings', JSON.stringify(this.stored));
        } catch (err) {
          console.error("an error occured saving dubplus to localStorage", err);
        }
      }
    }]);

    return UserSettings;
  }();

  var userSettings = new UserSettings();

  function SectionHeader(props) {
    var arrow = props.open === "open" ? 'down' : 'right';
    return h("div", {
      id: props.id,
      onClick: props.onClick,
      className: "dubplus-menu-section-header"
    }, h("span", {
      className: "fa fa-angle-".concat(arrow)
    }), h("p", null, props.category));
  }

  /**
   * Modal used to display messages and also capture data
   *
   * @prop  {string} title       title that shows at the top of the modal
   * @prop  {string} content     A descriptive message on what the modal is for
   * @prop  {string} placeholder placeholder for the textarea
   * @prop  {function} onConfirm  runs when user clicks confirm button.
   * @prop  {function} onClose  runs when user clicks close button
   * @prop  {number} maxlength   for the textarea maxlength attribute
   */

  var Modal =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Modal, _Component);

    function Modal() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Modal);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyUpHandler", function (e) {
        // save and close when user presses enter
        // considering removing this though
        if (e.keyCode === 13) {
          _this.props.onConfirm(_this.textarea.value);

          _this.props.onClose();
        } // close modal when user hits the esc key


        if (e.keyCode === 27) {
          _this.props.onClose();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "confirmClick", function () {
        _this.props.onConfirm(_this.textarea.value);

        _this.props.onClose();
      });

      return _this;
    }

    _createClass(Modal, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        document.removeEventListener("keyup", this.keyUpHandler);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.props.open) {
          document.addEventListener("keyup", this.keyUpHandler);
        } else {
          document.removeEventListener("keyup", this.keyUpHandler);
        }
      }
    }, {
      key: "render",
      value: function render$$1(props) {
        var _this2 = this;

        var closeButtonText = !props.onConfirm ? "close" : "cancel";
        return props.open ? h(Portal, {
          into: "body"
        }, h("div", {
          className: "dp-modal"
        }, h("aside", {
          className: "container"
        }, h("div", {
          className: "title"
        }, h("h1", null, " ", props.title || "Dub+")), h("div", {
          className: "content"
        }, h("p", null, props.content || ""), props.placeholder && h("textarea", {
          ref: function ref(c) {
            return _this2.textarea = c;
          },
          placeholder: props.placeholder,
          maxlength: props.maxlength || 999
        }, props.value || "")), h("div", {
          className: "dp-modal-buttons"
        }, h("button", {
          id: "dp-modal-cancel",
          onClick: props.onClose
        }, closeButtonText), props.onConfirm && h("button", {
          id: "dp-modal-confirm",
          onClick: this.confirmClick
        }, "okay"))))) : null;
      }
    }]);

    return Modal;
  }(Component);

  /**
   * Class wrapper for Google Analytics
   */
  // shim just in case blocked by an adblocker or something
  var ga = window.ga || function () {};

  var GA =
  /*#__PURE__*/
  function () {
    function GA(uid) {
      _classCallCheck(this, GA);

      ga('create', uid, 'auto', 'dubplusTracker');
    } // https://developers.google.com/analytics/devguides/collection/analyticsjs/events


    _createClass(GA, [{
      key: "event",
      value: function event(eventCategory, eventAction, eventLabel, eventValue) {
        ga('dubplusTracker.send', 'event', eventCategory, eventAction, eventLabel, eventValue);
      }
      /**
       * Use this method to track clicking on a menu item
       * @param {String} menuSection The menu section's title will be used for the event Category
       * @param {String} menuItem The ID of the menu item will be used for the event label
       * @param {Number} [onOff] optional - should be 1 or 0 representing on or off state of the menu item
       */

    }, {
      key: "menuClick",
      value: function menuClick(menuSection, menuItem, onOff) {
        this.event(menuSection, 'click', menuItem, onOff);
      }
    }]);

    return GA;
  }();

  var track = new GA('UA-116652541-1');

  /**
   * Component to render a menu section.
   * @param {object} props
   * @param {string} props.id
   * @param {string} props.title the name to display
   * @param {string} props.settingsKey the key in the setting.stored.menu object
   */

  var MenuSection =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MenuSection, _Component);

    function MenuSection() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MenuSection);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuSection)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        section: userSettings.stored.menu[_this.props.settingsKey] || "open"
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleSection", function (e) {
        _this.setState(function (prevState) {
          var newState = prevState.section === "open" ? "closed" : "open";
          userSettings.save("menu", _this.props.settingsKey, newState);
          return {
            section: newState
          };
        });
      });

      return _this;
    }

    _createClass(MenuSection, [{
      key: "render",
      value: function render$$1(props, state) {
        var _cn = ["dubplus-menu-section"];

        if (state.section === "closed") {
          _cn.push("dubplus-menu-section-closed");
        }

        return h("span", null, h(SectionHeader, {
          onClick: this.toggleSection,
          id: props.id,
          category: props.title,
          open: state.section
        }), h("ul", {
          className: _cn.join(" ")
        }, props.children));
      }
    }]);

    return MenuSection;
  }(Component);
  /**
   * Component to render a simple row like the fullscreen menu option
   * @param {object} props
   * @param {string} props.id the dom ID name, usually dubplus-*
   * @param {string} props.desc description of the menu item used in the title attr
   * @param {string} props.icon icon to be used
   * @param {string} props.menuTitle text to display in the menu
   * @param {Function} props.onClick text to display in the menu
   */

  function MenuSimple(props) {
    var _cn = ["dubplus-menu-icon"]; // combine with ones that were passed through

    if (props.className) {
      _cn.push(props.className);
    }

    return h("li", {
      id: props.id,
      title: props.desc,
      className: _cn.join(" "),
      onClick: props.onClick
    }, h("span", {
      className: "fa fa-".concat(props.icon)
    }), h("span", {
      className: "dubplus-menu-label"
    }, props.menuTitle));
  }
  /**
   * Component which brings up a modal box to allow user to
   * input and store a text value which will be used by the
   * parent menu item.
   *
   * MenuPencil must always by a child of MenuSwitch.
   */

  var MenuPencil =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(MenuPencil, _Component2);

    function MenuPencil() {
      var _getPrototypeOf3;

      var _this2;

      _classCallCheck(this, MenuPencil);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPencil)).call.apply(_getPrototypeOf3, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
        open: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "loadModal", function () {
        _this2.setState({
          open: true
        });

        track.menuClick(_this2.props.section + " section", _this2.props.id + " edit");
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "closeModal", function () {
        console.log("closing dub+ modal");

        _this2.setState({
          open: false
        });

        if (typeof _this2.props.onCancel === 'function') {
          _this2.props.onCancel();
        }
      });

      return _this2;
    }

    _createClass(MenuPencil, [{
      key: "render",
      value: function render$$1(props, state) {
        return h("span", {
          onClick: this.loadModal,
          className: "fa fa-pencil extra-icon"
        }, h(Modal, {
          open: state.open || props.showModal || false,
          title: props.title || "Dub+ option",
          content: props.content || "Please enter a value",
          placeholder: props.placeholder || "in here",
          value: props.value,
          onConfirm: props.onConfirm,
          onClose: this.closeModal
        }));
      }
    }]);

    return MenuPencil;
  }(Component);
  var MenuSwitch =
  /*#__PURE__*/
  function (_Component3) {
    _inherits(MenuSwitch, _Component3);

    function MenuSwitch() {
      var _getPrototypeOf4;

      var _this3;

      _classCallCheck(this, MenuSwitch);

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(MenuSwitch)).call.apply(_getPrototypeOf4, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "state", {
        on: userSettings.stored.options[_this3.props.id] || false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "switchOn", function () {
        _this3.props.turnOn();

        userSettings.save("options", _this3.props.id, true);

        _this3.setState({
          on: true
        });

        track.menuClick(_this3.props.section + " section", _this3.props.id + " on");
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "switchOff", function () {
        var noTrack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _this3.props.turnOff();

        userSettings.save("options", _this3.props.id, false);

        _this3.setState({
          on: false
        });

        if (!noTrack) {
          track.menuClick(_this3.props.section + " section", _this3.props.id + " off");
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "toggleSwitch", function () {
        if (_this3.state.on) {
          _this3.switchOff();
        } else {
          _this3.switchOn();
        }
      });

      return _this3;
    }

    _createClass(MenuSwitch, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.state.on) {
          this.props.turnOn();
        }
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        var _cn = ["dubplus-switch"];

        if (state.on) {
          _cn.push("dubplus-switch-on");
        } // combine with ones that were passed through


        if (props.className) {
          _cn.push(props.className);
        }

        return h("li", {
          id: props.id,
          title: props.desc,
          className: _cn.join(" ")
        }, props.children || null, h("div", {
          onClick: this.toggleSwitch,
          className: "dubplus-form-control"
        }, h("div", {
          className: "dubplus-switch-bg"
        }, h("div", {
          className: "dubplus-switcher"
        })), h("span", {
          className: "dubplus-menu-label"
        }, props.menuTitle)));
      }
    }]);

    return MenuSwitch;
  }(Component);

  /**
   * 
   * Away From Keyboard autoresponder
   * 
   * TODO: setup global state manager
   */

  var AFK =
  /*#__PURE__*/
  function (_Component) {
    _inherits(AFK, _Component);

    function AFK() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, AFK);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AFK)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        canSend: true
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "afk_chat_respond", function (e) {
        if (!_this.state.canSend) {
          return; // do nothing until it's back to true
        }

        var content = e.message;
        var user = Dubtrack.session.get('username');

        if (content.indexOf('@' + user) > -1 && Dubtrack.session.id !== e.user.userInfo.userid) {
          var chatInput = document.getElementById('chat-txt-message');

          if (userSettings.stored.custom.customAfkMessage) {
            chatInput.value = '[AFK] ' + userSettings.stored.custom.customAfkMessage;
          } else {
            chatInput.value = "[AFK] I'm not here right now.";
          }

          Dubtrack.room.chat.sendMessage(); // so we don't spam chat, we pause the auto respond for 30sec

          _this.setState({
            canSend: false
          }); // allow AFK responses after 30sec


          setTimeout(function () {
            _this.setState({
              canSend: true
            });
          }, 30000);
        }
      });

      return _this;
    }

    _createClass(AFK, [{
      key: "turnOn",
      value: function turnOn() {
        Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
      }
    }, {
      key: "saveAFKmessage",
      value: function saveAFKmessage(val) {
        userSettings.save('custom', 'customAfkMessage', val);
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-afk",
          section: "General",
          menuTitle: "AFK Auto-respond",
          desc: "Toggle Away from Keyboard and customize AFK message.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          title: "Custom AFK Message",
          section: "General",
          content: "Enter a custom Away From Keyboard [AFK] message here",
          value: userSettings.stored.custom.customAfkMessage || '',
          placeholder: "Be right back!",
          maxlength: "255",
          onConfirm: this.saveAFKmessage
        }));
      }
    }]);

    return AFK;
  }(Component);

  /**
   * Menu item for Autovote
   */

  var Autovote =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Autovote, _Component);

    function Autovote() {
      var _this;

      _classCallCheck(this, Autovote);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Autovote).call(this));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "advance_vote", function () {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('click', true, false);

        _this.dubup.dispatchEvent(event);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "voteCheck", function (obj) {
        if (obj.startTime < 2) {
          _this.advance_vote();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function (e) {
        var song = Dubtrack.room.player.activeSong.get('song');
        var dubCookie = Dubtrack.helpers.cookie.get('dub-' + Dubtrack.room.model.get("_id"));
        var dubsong = Dubtrack.helpers.cookie.get('dub-song');

        if (!Dubtrack.room || !song || song.songid !== dubsong) {
          dubCookie = false;
        } // Only cast the vote if user hasn't already voted


        if (!_this.dubup.classList.contains('voted') && !_this.dubdown.classList.contains('voted') && !dubCookie) {
          _this.advance_vote();
        }

        Dubtrack.Events.bind("realtime:room_playlist-update", _this.voteCheck);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function (e) {
        Dubtrack.Events.unbind("realtime:room_playlist-update", _this.voteCheck);
      });

      _this.dubup = document.querySelector('.dubup');
      _this.dubdown = document.querySelector('.dubdown');
      return _this;
    }

    _createClass(Autovote, [{
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-autovote",
          section: "General",
          menuTitle: "Autovote",
          desc: "Toggles auto upvoting for every song",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return Autovote;
  }(Component);

  /*
  TODO: 
   - if found:
     - hijack arrow keys to make it move around the preview window
     - moving around auto completes the text
     - typing continues to filter
  */

  var PreviewListItem = function PreviewListItem(_ref) {
    var data = _ref.data,
        onSelect = _ref.onSelect;

    if (data.header) {
      return h("li", {
        className: "preview-item-header ".concat(data.header.toLowerCase(), "-preview-header")
      }, h("span", null, data.header));
    }

    return h("li", {
      className: "preview-item ".concat(data.type, "-previews"),
      onClick: function onClick() {
        onSelect(data.name);
      },
      "data-name": data.name
    }, h("div", {
      className: "ac-image"
    }, h("img", {
      src: data.src,
      alt: data.name,
      title: data.name
    })), h("span", {
      className: "ac-text"
    }, data.name));
  };

  var AutocompletePreview = function AutocompletePreview(_ref2) {
    var matches = _ref2.matches,
        onSelect = _ref2.onSelect;

    if (matches.length === 0) {
      return h("ul", {
        id: "autocomplete-preview"
      });
    }

    var list = matches.map(function (m, i) {
      return h(PreviewListItem, {
        data: m,
        key: m.header ? "header-row-".concat(m.header) : "".concat(m.type, "-").concat(m.name),
        onSelect: onSelect
      });
    });
    return h("ul", {
      id: "autocomplete-preview",
      className: "ac-show"
    }, list);
  };

  /**
   * Wrapper around XMLHttpRequest with added ability to trigger a custom event 
   * when the ajax request is complete. The event will be attached to the window 
   * object. It returns a promise.
   * 
   * @param {String} url 
   * @param {Object} headers object of xhr headers to add to the request
   * @returns {Promise}
   */
  function getJSON(url) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        try {
          var resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = function () {
        reject();
      };

      xhr.open('GET', url);

      for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
          xhr.setRequestHeader(property, headers[property]);
        }
      }

      xhr.send();
    });
  }

  // IndexedDB wrapper for increased quota compared to localstorage (5mb to 50mb)
  function IndexDBWrapper() {
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    if (!indexedDB) {
      return console.error("indexDB not supported");
    }

    var db;
    var timeout = 50; // 50 * 100 = 5000ms = 5s

    /**
     * Get item from indexedDB
     * @param {string} item the db key name of what you want to retrieve
     * @param {function} [cb] optional callback because it also returns a promise
     * @returns {Promise}
     */

    function getItem(item, cb) {
      // keep trying until db open request is established
      if (!db && timeout >= 0) {
        setTimeout(function () {
          getItem(item, cb);
        }, 100);
        timeout--;
        return;
      }

      timeout = 30; // reset the dbrequest timeout counter

      try {
        var transaction = db.transaction("s");

        transaction.onerror = function (event) {
          cb(null, event);
        };

        var dbItemStore = transaction.objectStore("s");

        dbItemStore.onerror = function (event) {
          cb(null, event);
        };

        var dbItemStoreGet = dbItemStore.get(item);

        dbItemStoreGet.onsuccess = function (e) {
          var t = e.target.result && e.target.result.v || null;
          cb(t);
        };

        dbItemStoreGet.onerror = function (event) {
          cb(null, event);
        };
      } catch (e) {
        cb(null, e.message);
      }
    }
    /**
     * Store a value in indexedDB
     * @param {string} item key name for the value that will be stored
     * @param {string} val value to be stored
     */


    function setItem(item, val) {
      // keep trying until db open request is established
      if (!db && timeout >= 0) {
        setTimeout(function () {
          setItem(item, val);
        }, 100);
        timeout--;
        return;
      }

      timeout = 30; // reset the dbrequest timeout counter

      var obj = {
        k: item,
        v: val
      };
      db.transaction("s", "readwrite").objectStore("s").put(obj);
    }

    var dbRequest = indexedDB.open("d2", 1);

    dbRequest.onsuccess = function (e) {
      db = this.result;
    };

    dbRequest.onerror = function (e) {
      console.error("indexedDB request error", e);
    };

    dbRequest.onupgradeneeded = function (e) {
      db = this.result;
      var t = db.createObjectStore("s", {
        keyPath: "k"
      });

      db.transaction.oncomplete = function (e) {
        db = e.target.db;
      };
    };

    return {
      get: getItem,
      set: setItem
    };
  }

  var ldb = new IndexDBWrapper();

  /* global  emojify */
  function shouldUpdateAPIs(apiName) {
    var day = 1000 * 60 * 60 * 24; // milliseconds in a day

    return new Promise(function (resolve, reject) {
      // if api returned an object with an error and we stored it 
      // then we should try again
      ldb.get(apiName + "_api", function (savedItem, err) {
        if (err) {
          return reject(err);
        }

        if (savedItem) {
          try {
            var parsed = JSON.parse(savedItem);

            if (typeof parsed.error !== "undefined") {
              resolve(true); // yes we should refresh data from api
            }
          } catch (e) {
            resolve(true); // data was corrupted, needs to be refreshed
          }
        } else {
          resolve(true); // data doesn't exist, needs to be fetched
        } // at this point we have good data without issues in IndexedDB
        // so now we check how old it is to see if we should update it (7 days is the limit)


        var today = Date.now();
        var lastSaved = parseInt(localStorage.getItem(apiName + "_api_timestamp")); // Is the lastsaved not a number for some strange reason, then we should update 
        // OR
        // are we past 5 days from last update? then we should update

        resolve(isNaN(lastSaved) || today - lastSaved > day * 7);
      });
    });
  }

  /* global  emojify */

  /**
   * Handles loading emotes from api and storing them locally
   *
   * @class TwitchEmotes
   */

  var TwitchEmotes =
  /*#__PURE__*/
  function () {
    function TwitchEmotes() {
      var _this = this;

      _classCallCheck(this, TwitchEmotes);

      _defineProperty(this, "specialEmotes", []);

      _defineProperty(this, "emotes", {});

      _defineProperty(this, "sortedKeys", {
        nonAlpha: []
      });

      _defineProperty(this, "loaded", false);

      _defineProperty(this, "addKeyToSorted", function (key) {
        var first = key.charAt(0); // all numbers and symbols get stored in one 'nonAlpha' array

        if (!/[a-z]/i.test(first)) {
          _this.sortedKeys.nonAlpha.push(key);

          return;
        }

        if (!_this.sortedKeys[first]) {
          _this.sortedKeys[first] = [key];
          return;
        }

        _this.sortedKeys[first].push(key);
      });
    }

    _createClass(TwitchEmotes, [{
      key: "load",
      value: function load() {
        var _this2 = this;

        // if it doesn't exist in indexedDB or it's older than 5 days
        // grab it from the twitch API
        return shouldUpdateAPIs("twitch").then(function (update) {
          if (update) {
            return _this2.updateFromApi();
          }

          return _this2.grabFromDb();
        }).catch(function (e) {
          console.error(e);

          _this2.updateFromApi();
        });
      }
    }, {
      key: "done",
      value: function done(cb) {
        this.doneCB = cb;
      }
    }, {
      key: "error",
      value: function error(cb) {
        this.errorCB = cb;
      }
    }, {
      key: "grabFromDb",
      value: function grabFromDb() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          try {
            ldb.get("twitch_api", function (data) {
              console.log("dub+", "twitch", "loading from IndexedDB");
              var savedData = JSON.parse(data); // this.processEmotes(savedData);

              _this3.processViaWebWorker(savedData);

              _this3.loaded = "from db";
              savedData = null; // clear the var from memory

              resolve();
            });
          } catch (e) {
            reject(e);
          }
        });
      }
    }, {
      key: "updateFromApi",
      value: function updateFromApi() {
        var _this4 = this;

        console.log("dub+", "twitch", "loading from api");
        var twApi = getJSON("https://api.twitch.tv/kraken/chat/emoticon_images", {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": "z5bpa7x6y717dsw28qnmcooolzm2js"
        });
        return twApi.then(function (json) {
          var twitchEmotes = {};
          json.emoticons.forEach(function (e) {
            if (!twitchEmotes[e.code] || e.emoticon_set === null) {
              // if emote doesn't exist OR
              // override if it's a global emote (null set = global emote)
              twitchEmotes[e.code] = e.id;
            }
          });
          localStorage.setItem("twitch_api_timestamp", Date.now().toString());
          ldb.set("twitch_api", JSON.stringify(twitchEmotes)); // this.processEmotes(twitchEmotes);

          _this4.processViaWebWorker(twitchEmotes);

          _this4.loaded = "from api";
        }).catch(function (e) {
          if (typeof _this4.errorCB === 'function') {
            _this4.errorCB(e);
          }
        });
      }
    }, {
      key: "template",
      value: function template(id) {
        return "//static-cdn.jtvnw.net/emoticons/v1/".concat(id, "/3.0");
      }
    }, {
      key: "find",
      value: function find(symbol) {
        var _this5 = this;

        var first = symbol.charAt(0);
        var arr;

        if (!/[a-z]/i.test(first)) {
          arr = this.sortedKeys.nonAlpha;
        } else {
          arr = this.sortedKeys[first] || [];
        }

        var matchTwitchKeys = arr.filter(function (key) {
          return key.indexOf(symbol) === 0;
        });
        return matchTwitchKeys.map(function (key) {
          return {
            type: "twitch",
            src: _this5.template(_this5.emotes[key]),
            name: key
          };
        });
      }
    }, {
      key: "processEmotes",
      value: function processEmotes(data) {
        for (var code in data) {
          if (data.hasOwnProperty(code)) {
            var _key = code.toLowerCase(); // move twitch non-named emojis to their own array
            // for now we are doing nothing with them


            if (code.indexOf("\\") >= 0) {
              this.specialEmotes.push([code, data[code]]);
              continue;
            }

            if (emojify.emojiNames.indexOf(_key) >= 0) {
              continue; // don't override regular emojis handled by emojify
            }

            if (!this.emotes[_key]) {
              // if emote doesn't exist, add it
              this.emotes[_key] = data[code];
              this.addKeyToSorted(_key);
            }
          }
        }

        this.loaded = true;
        this.doneCB();
      }
      /**
       * In order to speed up the initial load of the script I'm using a web worker
       * do some of the more cpu expensive and UI blocking work
       * help from: https://stackoverflow.com/a/10372280/395414
       */

    }, {
      key: "processViaWebWorker",
      value: function processViaWebWorker(data) {
        var _this6 = this;

        // URL.createObjectURL
        window.URL = window.URL || window.webkitURL;
        var response = "\n      var emotes = {};\n      var sortedKeys = {\n        'nonAlpha' : []\n      };\n\n      function addKeyToSorted(key) {\n        let first = key.charAt(0);\n    \n        // all numbers and symbols get stored in one 'nonAlpha' array\n        if (!/[a-z]/i.test(first)) {\n          sortedKeys.nonAlpha.push(key);\n          return;\n        }\n    \n        if (!sortedKeys[first]) {\n          sortedKeys[first] = [key];\n          return\n        }\n    \n        sortedKeys[first].push(key);\n      }\n\n      self.addEventListener('message', function(e) {\n        var emojiNames = e.data.emojiNames;\n        var data = e.data.data;\n\n        for (var code in data) {\n          if (data.hasOwnProperty(code)) {\n            var _key = code.toLowerCase();\n      \n            // not doing anything with non-named emojis\n            if (/\\\\/g.test(code)) {\n              continue;\n            }\n      \n            if (emojiNames.indexOf(_key) >= 0) {\n              continue; // don't override regular emojis handled by emojify\n            }\n      \n            if (!emotes[_key]) {\n              // if emote doesn't exist, add it\n              emotes[_key] = data[code];\n              addKeyToSorted(_key);\n            }\n          }\n        }\n\n        self.postMessage({\n          emotes: emotes,\n          sortedKeys: sortedKeys\n        });\n        close();\n      }, false);\n    ";
        var blob;

        try {
          blob = new Blob([response], {
            type: "application/javascript"
          });
        } catch (e) {
          // Backwards-compatibility
          window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
          blob = new BlobBuilder();
          blob.append(response);
          blob = blob.getBlob();
        }

        var worker = new Worker(URL.createObjectURL(blob));
        worker.addEventListener("message", function (e) {
          _this6.emotes = e.data.emotes;
          _this6.sortedKeys = e.data.sortedKeys;
          _this6.loaded = true;

          _this6.doneCB();
        });
        worker.postMessage({
          data: data,
          emojiNames: emojify.emojiNames
        });
      }
    }]);

    return TwitchEmotes;
  }();

  var twitch = new TwitchEmotes();

  /* global  emojify */

  var BTTVemotes =
  /*#__PURE__*/
  function () {
    function BTTVemotes() {
      var _this = this;

      _classCallCheck(this, BTTVemotes);

      _defineProperty(this, "emotes", {});

      _defineProperty(this, "sortedKeys", {
        'nonAlpha': []
      });

      _defineProperty(this, "loaded", false);

      _defineProperty(this, "headers", {});

      _defineProperty(this, "addKeyToSorted", function (key) {
        var first = key.charAt(0); // all numbers and symbols get stored in one 'nonAlpha' array

        if (!/[a-z]/i.test(first)) {
          _this.sortedKeys.nonAlpha.push(key);

          return;
        }

        if (!_this.sortedKeys[first]) {
          _this.sortedKeys[first] = [];
        }

        _this.sortedKeys[first].push(key);
      });
    }

    _createClass(BTTVemotes, [{
      key: "optionalSetHeaders",
      value: function optionalSetHeaders(obj) {
        this.headers = obj;
      }
    }, {
      key: "load",
      value: function load() {
        var _this2 = this;

        // if it doesn't exist in localStorage or it's older than 5 days
        // grab it from the bttv API
        return shouldUpdateAPIs("bttv").then(function (update) {
          if (update) {
            return _this2.updateFromAPI();
          }

          return _this2.loadFromDB();
        });
      }
    }, {
      key: "loadFromDB",
      value: function loadFromDB() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          try {
            ldb.get("bttv_api", function (data) {
              console.log("dub+", "bttv", "loading from IndexedDB");
              var savedData = JSON.parse(data);

              _this3.processEmotes(savedData);

              savedData = null; // clear the var from memory

              resolve();
            });
          } catch (e) {
            reject(e);
          }
        });
      }
    }, {
      key: "updateFromAPI",
      value: function updateFromAPI() {
        var _this4 = this;

        console.log("dub+", "bttv", "loading from api");
        var bttvApi = getJSON("https://api.betterttv.net/2/emotes", this.headers);
        return bttvApi.then(function (json) {
          var bttvEmotes = {};
          json.emotes.forEach(function (e) {
            if (!bttvEmotes[e.code]) {
              bttvEmotes[e.code] = e.id;
            }
          });
          localStorage.setItem("bttv_api_timestamp", Date.now().toString());
          ldb.set("bttv_api", JSON.stringify(bttvEmotes));

          _this4.processEmotes(bttvEmotes);
        });
      }
    }, {
      key: "template",
      value: function template(id) {
        return "//cdn.betterttv.net/emote/".concat(id, "/3x");
      }
    }, {
      key: "find",
      value: function find(symbol) {
        var _this5 = this;

        var first = symbol.charAt(0);
        var arr;

        if (!/[a-z]/i.test(first)) {
          arr = this.sortedKeys.nonAlpha;
        } else {
          arr = this.sortedKeys[first] || [];
        }

        var matchBttvKeys = arr.filter(function (key) {
          return key.indexOf(symbol) === 0;
        });
        return matchBttvKeys.map(function (key) {
          return {
            type: "bttv",
            src: _this5.template(_this5.emotes[key]),
            name: key
          };
        });
      }
    }, {
      key: "processEmotes",
      value: function processEmotes(data) {
        for (var code in data) {
          if (data.hasOwnProperty(code)) {
            var _key = code.toLowerCase();

            if (code.indexOf(":") >= 0) {
              continue; // don't want any emotes with smileys and stuff
            }

            if (emojify.emojiNames.indexOf(_key) >= 0) {
              continue; // do nothing so we don't override emoji
            }

            if (code.indexOf("(") >= 0) {
              _key = _key.replace(/([()])/g, "");
            }

            this.emotes[_key] = data[code];
            this.addKeyToSorted(_key);
          }
        }

        this.loaded = true;
      }
    }]);

    return BTTVemotes;
  }();

  var bttv = new BTTVemotes();

  /**********************************************************************
   * Autocomplete Emoji / Emotes
   * Brings up a small window above the chat input to help the user
   * pick emoji/emotes
   */

  var KEYS = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    enter: 13,
    esc: 27,
    tab: 9
  };
  var ignoreKeys = [KEYS.up, KEYS.down, KEYS.left, KEYS.right, KEYS.esc, KEYS.enter];

  var AutocompleteEmoji =
  /*#__PURE__*/
  function (_Component) {
    _inherits(AutocompleteEmoji, _Component);

    function AutocompleteEmoji() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, AutocompleteEmoji);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutocompleteEmoji)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        isOn: false,
        matches: []
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderTo", document.querySelector(".pusher-chat-widget-input"));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chatInput", document.getElementById("chat-txt-message"));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectedItem", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkInput", function (e) {
        // we want to ignore keyups that don't output anything
        var key = "which" in e ? e.which : e.keyCode;

        if (ignoreKeys.indexOf(key) >= 0) {
          return;
        } // grab the input value and split into an array so we can easily grab the
        // last element in it


        var parts = e.target.value.split(" ");

        if (parts.length === 0) {
          return;
        }

        var lastPart = parts[parts.length - 1];
        var lastChar = lastPart.charAt(lastPart.length - 1); // now we check if the last word in the input starts with the opening
        // emoji colon but does not have the closing emoji colon

        if (lastPart.charAt(0) === ":" && lastPart.length > 3 && lastChar !== ":") {
          var new_matches = _this.getMatches(lastPart);

          _this.chunkLoadMatches(new_matches);

          return;
        }

        if (_this.state.matches.length !== 0) {
          _this.closePreview();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateChatInput", function (emote) {
        var focusBack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var inputText = _this.chatInput.value.split(" ");

        inputText.pop();
        inputText.push(":".concat(emote, ":"));
        _this.chatInput.value = inputText.join(" ");

        if (focusBack) {
          _this.chatInput.focus();

          _this.closePreview();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyboardNav", function (e) {
        if (_this.state.matches.length === 0) {
          return true;
        }

        var key = "which" in e ? e.which : e.keyCode;

        switch (key) {
          case KEYS.down:
          case KEYS.tab:
            e.preventDefault();
            e.stopImmediatePropagation();

            _this.navDown();

            break;

          case KEYS.up:
            e.preventDefault();
            e.stopImmediatePropagation();

            _this.navUp();

            break;

          case KEYS.esc:
            _this.closePreview();

            _this.chatInput.focus();

            break;

          case KEYS.enter:
            _this.closePreview();

            break;

          default:
            return true;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function (e) {
        _this.setState({
          isOn: true
        }); // relying on Dubtrack.fm's lodash being globally available


        _this.debouncedCheckInput = window._.debounce(_this.checkInput, 100);
        _this.debouncedNav = window._.debounce(_this.keyboardNav, 100);

        _this.chatInput.addEventListener("keydown", _this.debouncedNav);

        _this.chatInput.addEventListener("keyup", _this.debouncedCheckInput);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function (e) {
        _this.setState({
          isOn: false
        });

        _this.chatInput.removeEventListener("keydown", _this.debouncedNav);

        _this.chatInput.removeEventListener("keyup", _this.debouncedCheckInput);
      });

      return _this;
    }

    _createClass(AutocompleteEmoji, [{
      key: "chunkLoadMatches",
      // to speed up some of the DOM loading we only display the first 50 matches
      // right away and then wait a bit to add the rest
      value: function chunkLoadMatches(matches) {
        var _this2 = this;

        var limit = 50;

        if (matches.length < limit + 1) {
          this.setState({
            matches: matches
          });
          return;
        } // render the first 50 matches


        var startingArray = matches.slice(0, limit);
        this.setState({
          matches: startingArray
        }); // then render the full list after given time
        // dom diffing should leave the first in place and just add the
        // remaining matches

        setTimeout(function () {
          _this2.setState({
            matches: matches
          });
        }, 250);
      }
    }, {
      key: "getMatches",
      value: function getMatches(symbol) {
        symbol = symbol.replace(/^:/, "");
        var classic = emoji.find(symbol);

        if (classic.length > 0) {
          classic.unshift({
            header: "Emoji"
          });
        }

        var bttvMatches = bttv.find(symbol);

        if (bttvMatches.length > 0) {
          bttvMatches.unshift({
            header: "BetterTTV"
          });
        }

        var twitchMatches = twitch.find(symbol);

        if (twitchMatches.length > 0) {
          twitchMatches.unshift({
            header: "Twitch"
          });
        }

        return classic.concat(bttvMatches, twitchMatches);
      }
    }, {
      key: "closePreview",
      value: function closePreview() {
        this.setState({
          matches: []
        });
        this.selectedItem = null;
      }
    }, {
      key: "isElementInView",
      value: function isElementInView(el) {
        var container = document.querySelector("#autocomplete-preview");
        var rect = el.getBoundingClientRect();
        var outerRect = container.getBoundingClientRect();
        return rect.top >= outerRect.top && rect.bottom <= outerRect.bottom;
      }
    }, {
      key: "navDown",
      value: function navDown() {
        var item;

        if (this.selectedItem) {
          this.selectedItem.classList.remove("selected");
          item = this.selectedItem.nextSibling;
        } // go back to the first item


        if (!item) {
          item = document.querySelector(".preview-item");
        } // there should always be a nextSibling after a header so
        // we don't need to check item again after this


        if (item.classList.contains("preview-item-header")) {
          item = item.nextSibling;
        }

        item.classList.add("selected");

        if (!this.isElementInView(item)) {
          item.scrollIntoView(false);
        }

        this.selectedItem = item;
        this.updateChatInput(item.dataset.name, false);
      }
    }, {
      key: "navUp",
      value: function navUp() {
        var item;

        if (this.selectedItem) {
          this.selectedItem.classList.remove("selected");
          item = this.selectedItem.previousSibling;
        } // get to the last item


        if (!item) {
          item = [].slice.call(document.querySelectorAll(".preview-item")).pop();
        }

        if (item.classList.contains("preview-item-header")) {
          item = item.previousSibling;
        } // check again because the header


        if (!item) {
          item = [].slice.call(document.querySelectorAll(".preview-item")).pop();
        }

        item.classList.add("selected");

        if (!this.isElementInView(item)) {
          item.scrollIntoView(true);
        }

        this.selectedItem = item;
        this.updateChatInput(item.dataset.name, false);
      }
    }, {
      key: "render",
      value: function render$$1(props, _ref) {
        var isOn = _ref.isOn,
            matches = _ref.matches;
        return h(MenuSwitch, {
          id: "dubplus-emotes",
          section: "General",
          menuTitle: "Autocomplete Emoji",
          desc: "Quick find and insert emojis and emotes while typing in the chat input",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, isOn ? h(Portal, {
          into: this.renderTo
        }, h(AutocompletePreview, {
          onSelect: this.updateChatInput,
          matches: matches
        })) : null);
      }
    }]);

    return AutocompleteEmoji;
  }(Component);

  /**
   * Simple string parser based on Douglas Crockford's JSON.parse
   * https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
   * which itself is a simplified recursive descent parser
   * 
   * This parser is specifically written to find colon wrapped :emotes:
   * in a string and extract them into an array
   */

  /**
   * @param {String} str the string to parse
   * @returns {Array} an array of matches or an empty array
   */
  function parser(str) {
    var result = [];
    var group = "";
    var openTagFound = false;
    var at = 0;

    function reset() {
      group = "";
      openTagFound = false;
    }

    function capture(ch) {
      group += ch;
    }

    function save() {
      if (group !== "::") {
        result.push(group);
      }
    }

    while (at < str.length) {
      var curr = str.charAt(at);

      if (!openTagFound && curr === ":") {
        openTagFound = true;
        capture(curr);
        at++;
        continue;
      }

      if (openTagFound) {
        if (curr === ":") {
          capture(curr);
          save();
          reset();
          at++;
          continue;
        }

        if (curr === " ") {
          reset();
          at++;
          continue;
        }

        capture(curr);
      }

      at++;
    }

    return result;
  }

  /*
   * This is a collection of functions that will handle replacing custom emotes
   * in chat with img tags
   *
   * What it does is grabs the last ".text" chat element and processes it
   * by only looking at TextNodes. This way we can avoid any clashes with
   * existing emoji in image tag titles/alt attributes
   */
  /**
   * return the last chat item in the chat area
   * this item could have a collection of <p> tags or just one
   */

  function getLatestChatNode() {
    var list = document.querySelectorAll(".chat-main .text");

    if (list.length > 0) {
      return list[list.length - 1];
    }

    return null;
  }
  /**
   * Searchs for all text nodes starting at a given Node
   * src: https://stackoverflow.com/a/10730777/395414
   * @param {HTMLElement} el parent node to begin searching for text nodes from
   * @returns {array} of text nodes
   */

  function getTextNodesUnder(el) {
    var n;
    var a = [];
    var walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

    while (n = walk.nextNode()) {
      a.push(n);
    }

    return a;
  }
  function makeEmoteImg(_ref) {
    var type = _ref.type,
        src = _ref.src,
        name = _ref.name,
        w = _ref.w,
        h = _ref.h;
    var img = document.createElement("img");

    if (w) {
      img.width = w;
    }

    if (h) {
      img.height = h;
    }

    img.className = "emoji ".concat(type, "-emote");
    img.title = name;
    img.alt = name;
    img.src = src;
    return img;
  }
  /**
   * Search our stored emote data for matching emotes. Grab first match and return
   * it. It checks in this specific order:  twitch, bttv, tasty
   * @param {String} emote the emote to look for
   * @returns {Object} the emote data {type: String, src: String, name: String}
   */

  function getImageDataForEmote(emote) {
    // search emotes in order of preference
    var key = emote.replace(/^:|:$/g, "");

    if (twitch.emotes[key]) {
      return {
        type: "twitch",
        src: twitch.template(twitch.emotes[key]),
        name: key
      };
    }

    if (bttv.emotes[key]) {
      return {
        type: "bttv",
        src: bttv.template(bttv.emotes[key]),
        name: key
      };
    }

    return false;
  }
  /**
   * Take a text node and converts it into a complex mix of text and img nodes
   * @param {Node_Text} textNode a DOM text node
   * @param {Array} emoteMatches Array of matching emotes found in the string
   */

  function processTextNode(textNode, emoteMatches) {
    var parent = textNode.parentNode;
    var textNodeVal = textNode.nodeValue.trim();
    var fragment = document.createDocumentFragment(); // wrap emotes within text node value with a random & unique string that will
    // be removed by string.split

    var splitter = "-0wrap__emote0-"; // Search matches emotes from one of the apis
    // and setup the textNodeVal to make it easy to find them

    emoteMatches.forEach(function (m) {
      var imgData = getImageDataForEmote(m);

      if (imgData) {
        var d = JSON.stringify(imgData);
        textNodeVal = textNodeVal.replace(m, "".concat(splitter).concat(d).concat(splitter));
      }
    }); // split the new string, create either text nodes or new img nodes

    var nodeArr = textNodeVal.split(splitter);
    nodeArr.forEach(function (t) {
      try {
        // if it is a json object then we convert to image
        var imgdata = JSON.parse(t);
        var img = makeEmoteImg(imgdata);
        fragment.appendChild(img);
      } catch (e) {
        // otherwise it's just a normal text node
        fragment.appendChild(document.createTextNode(t));
      }
    });
    parent.replaceChild(fragment, textNode);
  }
  function beginReplace(nodeStart) {
    if (!nodeStart.nodeType) {
      nodeStart = getLatestChatNode();
    }

    if (!nodeStart) {
      return;
    }

    var texts = getTextNodesUnder(nodeStart);
    texts.forEach(function (t) {
      var val = t.nodeValue.trim();

      if (val === "") {
        return;
      }

      var found = parser(val);

      if (found.length === 0) {
        return;
      }

      processTextNode(t, found);
    });
  }

  /**********************************************************************
   * handles replacing twitch emotes in the chat box with the images
   */

  var Emotes =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Emotes, _Component);

    function Emotes() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Emotes);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Emotes)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        // spin logo to indicate emotes are still loading
        document.body.classList.add('dubplus-icon-spinning'); // these load super fast

        if (!bttv.loaded) {
          bttv.load();
        } // these load super slow


        if (!twitch.loaded) {
          // if this one errors out then we still want to turn this on
          twitch.error(_this.begin);
          twitch.done(_this.begin);
          twitch.load();
          return;
        }

        _this.begin();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function (e) {
        Dubtrack.Events.unbind("realtime:chat-message", beginReplace);
      });

      return _this;
    }

    _createClass(Emotes, [{
      key: "begin",
      value: function begin() {
        document.body.classList.remove('dubplus-icon-spinning'); // when first turning it on, it replaces ALL of the emotes in chat history

        beginReplace(document.querySelector('.chat-main')); // then it sets up replacing emotes on new chat messages

        Dubtrack.Events.bind("realtime:chat-message", beginReplace);
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-emotes",
          section: "General",
          menuTitle: "Emotes",
          desc: "Adds twitch and bttv emotes in chat.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return Emotes;
  }(Component);

  /**
   * Custom mentions
   */

  var CustomMentions =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CustomMentions, _Component);

    function CustomMentions() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CustomMentions);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomMentions)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "customMentionCheck", function (e) {
        var content = e.message;

        if (userSettings.custom.custom_mentions) {
          var customMentions = userSettings.custom.custom_mentions.split(',');
          var inUsers = customMentions.some(function (v) {
            var reg = new RegExp('\\b' + v.trim() + '\\b', 'i');
            return reg.test(content);
          });

          if (Dubtrack.session.id !== e.user.userInfo.userid && inUsers) {
            Dubtrack.room.chat.mentionChatSound.play();
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveCustomMentions", function (val) {
        userSettings.save('custom', 'custom_mentions', val);
      });

      return _this;
    }

    _createClass(CustomMentions, [{
      key: "turnOn",
      value: function turnOn() {
        Dubtrack.Events.bind("realtime:chat-message", this.customMentionCheck);
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        Dubtrack.Events.unbind("realtime:chat-message", this.customMentionCheck);
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "custom_mentions",
          section: "General",
          menuTitle: "Custom Mentions",
          desc: "Toggle using custom mentions to trigger sounds in chat",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          title: "Custom AFK Message",
          section: "General",
          content: "Add your custom mention triggers here (separate by comma)",
          value: userSettings.stored.custom.custom_mentions || '',
          placeholder: "separate, custom triggers, by, comma, :heart:",
          maxlength: "255",
          onConfirm: this.saveCustomMentions
        }));
      }
    }]);

    return CustomMentions;
  }(Component);

  /**
   * Menu item for ChatCleaner
   */

  var ChatCleaner =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ChatCleaner, _Component);

    function ChatCleaner() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ChatCleaner);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChatCleaner)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "chatCleanerCheck", function (e) {
        var totalChats = Array.from(document.querySelectorAll("ul.chat-main > li"));
        var max = parseInt(userSettings.stored.custom.chat_cleaner, 10);

        if (isNaN(totalChats.length) || isNaN(max) || !totalChats.length || totalChats.length < max) {
          return;
        }

        var parentUL = totalChats[0].parentElement;
        var min = totalChats.length - max;

        if (min > 0) {
          totalChats.splice(0, min).forEach(function (li) {
            parentUL.removeChild(li);
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveAmount", function (value) {
        var chatItems = parseInt(value, 10);
        var amount = !isNaN(chatItems) ? chatItems : 500;
        userSettings.save("custom", "chat_cleaner", amount); // default to 500
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        Dubtrack.Events.bind("realtime:chat-message", _this.chatCleanerCheck);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        Dubtrack.Events.unbind("realtime:chat-message", _this.chatCleanerCheck);
      });

      return _this;
    }

    _createClass(ChatCleaner, [{
      key: "render",
      value: function render$$1() {
        return h(MenuSwitch, {
          id: "chat-cleaner",
          section: "General",
          menuTitle: "Chat Cleaner",
          desc: "Automatically only keep a designated chatItems of chat items while clearing older ones, keeping CPU stress down",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          title: "Chat Cleaner",
          section: "General",
          content: "Please specify the number of most recent chat items that will remain in your chat history",
          value: userSettings.stored.custom.chat_cleaner || "",
          placeholder: "500",
          maxlength: "5",
          onConfirm: this.saveAmount
        }));
      }
    }]);

    return ChatCleaner;
  }(Component);

  /* global Dubtrack */
  var isActiveTab = true;
  var statuses = {
    denyDismiss: {
      title: "Desktop Notifications",
      content: "You have dismissed or chosen to deny the request to allow desktop notifications. Reset this choice by clearing your cache for the site."
    },
    noSupport: {
      title: "Desktop Notifications",
      content: "Sorry this browser does not support desktop notifications.  Please use the latest version of Chrome or FireFox"
    }
  };

  window.onfocus = function () {
    isActiveTab = true;
  };

  window.onblur = function () {
    isActiveTab = false;
  };

  function notifyCheckPermission(cb) {
    var _cb = typeof cb === 'function' ? cb : function () {}; // first check if browser supports it


    if (!("Notification" in window)) {
      return _cb(false, statuses.noSupport);
    } // no request needed, good to go


    if (Notification.permission === "granted") {
      return _cb(true, 'granted');
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (result) {
        if (result === 'denied' || result === 'default') {
          _cb(false, statuses.denyDismiss);

          return;
        }

        return _cb(true, 'granted');
      });
    } else {
      return _cb(false, statuses.denyDismiss);
    }
  }
  function showNotification(opts) {
    var defaults = {
      title: 'New Message',
      content: '',
      ignoreActiveTab: false,
      callback: null,
      wait: 5000
    };
    var options = Object.assign({}, defaults, opts); // don't show a notification if tab is active

    if (isActiveTab === true && !options.ignoreActiveTab) {
      return;
    }

    var notificationOptions = {
      body: options.content,
      icon: "https://res.cloudinary.com/hhberclba/image/upload/c_lpad,h_100,w_100/v1400351432/dubtrack_new_logo_fvpxa6.png"
    };
    var n = new Notification(options.title, notificationOptions);

    n.onclick = function () {
      window.focus();

      if (typeof options.callback === "function") {
        options.callback();
      }

      n.close();
    };

    setTimeout(n.close.bind(n), options.wait);
  }

  var ChatNotification =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ChatNotification, _Component);

    function ChatNotification() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ChatNotification);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChatNotification)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        showWarning: false,
        warnTitle: '',
        warnContent: ''
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        notifyCheckPermission(function (status, reason) {
          if (status === true) {
            Dubtrack.Events.bind("realtime:chat-message", _this.notifyOnMention);
          } else {
            // call MenuSwitch's switchOff with noTrack=true argument
            _this.switchRef.switchOff(true);

            _this.setState({
              showWarning: true,
              warnTitle: reason.title,
              warnContent: reason.content
            });
          }
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
        _this.setState({
          showWarning: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        Dubtrack.Events.unbind("realtime:chat-message", _this.notifyOnMention);
      });

      return _this;
    }

    _createClass(ChatNotification, [{
      key: "notifyOnMention",
      value: function notifyOnMention(e) {
        var content = e.message;
        var user = Dubtrack.session.get("username").toLowerCase();
        var mentionTriggers = ["@" + user];

        if (userSettings.stored.options.custom_mentions && userSettings.stored.custom.custom_mentions) {
          //add custom mention triggers to array
          mentionTriggers = mentionTriggers.concat(userSettings.stored.custom.custom_mentions.split(","));
        }

        var mentionTriggersTest = mentionTriggers.some(function (v) {
          var reg = new RegExp("\\b" + v.trim() + "\\b", "i");
          return reg.test(content);
        });

        if (mentionTriggersTest && !this.isActiveTab && Dubtrack.session.id !== e.user.userInfo.userid) {
          showNotification({
            title: "Message from ".concat(e.user.username),
            content: content
          });
        }
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        var _this2 = this;

        return h(MenuSwitch, {
          ref: function ref(s) {
            return _this2.switchRef = s;
          },
          id: "mention_notifications",
          section: "General",
          menuTitle: "Notification on Mentions",
          desc: "Enable desktop notifications when a user mentions you in chat",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(Modal, {
          open: state.showWarning,
          title: state.warnTitle,
          content: state.warnContent,
          onClose: this.closeModal
        }));
      }
    }]);

    return ChatNotification;
  }(Component);

  var PMNotifications =
  /*#__PURE__*/
  function (_Component) {
    _inherits(PMNotifications, _Component);

    function PMNotifications() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, PMNotifications);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PMNotifications)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        showWarning: false,
        warnTitle: "",
        warnContent: ""
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        notifyCheckPermission(function (status, reason) {
          if (status === true) {
            Dubtrack.Events.bind("realtime:new-message", _this.notify);
          } else {
            // call MenuSwitch's switchOff with noTrack=true argument
            _this.switchRef.switchOff(true);

            _this.setState({
              showWarning: true,
              warnTitle: reason.title,
              warnContent: reason.content
            });
          }
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
        _this.setState({
          showWarning: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        Dubtrack.Events.unbind("realtime:new-message", _this.notify);
      });

      return _this;
    }

    _createClass(PMNotifications, [{
      key: "notify",
      value: function notify(e) {
        var userid = Dubtrack.session.get("_id");

        if (userid === e.userid) {
          return;
        }

        showNotification({
          title: "You have a new PM",
          ignoreActiveTab: true,
          callback: function callback() {
            document.querySelector(".user-messages").click();
            setTimeout(function () {
              document.querySelector(".message-item[data-messageid=\"".concat(e.messageid, "\"]")).click();
            }, 500);
          },
          wait: 10000
        });
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        var _this2 = this;

        return h(MenuSwitch, {
          ref: function ref(s) {
            return _this2.switchRef = s;
          },
          id: "dubplus_pm_notifications",
          section: "General",
          menuTitle: "Notification on PM",
          desc: "Enable desktop notifications when a user receives a private message",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(Modal, {
          open: state.showWarning,
          title: state.warnTitle,
          content: state.warnContent,
          onClose: this.closeModal
        }));
      }
    }]);

    return PMNotifications;
  }(Component);

  var DJNotification =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DJNotification, _Component);

    function DJNotification() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, DJNotification);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DJNotification)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        canNotify: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "savePosition", function (value) {
        var int = parseInt(value, 10);
        var amount = !isNaN(int) ? int : 2;
        userSettings.save("custom", "dj_notification", amount);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "djNotificationCheck", function (e) {
        if (e.startTime > 2) return;
        var queuePos = document.querySelector(".queue-position").textContent;
        var positionParse = parseInt(queuePos, 10);
        var position = e.startTime < 0 && !isNaN(positionParse) ? positionParse - 1 : positionParse;
        if (isNaN(positionParse) || position !== userSettings.stored.custom.dj_notification) return;

        if (_this.canNotify) {
          showNotification({
            title: "DJ Alert!",
            content: "You will be DJing shortly! Make sure your song is set!",
            ignoreActiveTab: true,
            wait: 10000
          });
        }

        Dubtrack.room.chat.mentionChatSound.play();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        notifyCheckPermission(function (status, reason) {
          if (status === true) {
            _this.setState({
              canNotify: true
            });
          }
        });
        Dubtrack.Events.bind("realtime:room_playlist-update", _this.djNotificationCheck);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        Dubtrack.Events.unbind("realtime:room_playlist-update", _this.djNotificationCheck);
      });

      return _this;
    }

    _createClass(DJNotification, [{
      key: "render",
      value: function render$$1(props, state) {
        var _this2 = this;

        return h(MenuSwitch, {
          ref: function ref(s) {
            return _this2.switchRef = s;
          },
          id: "dj-notification",
          section: "General",
          menuTitle: "DJ Notification",
          desc: "Notification when you are coming up to be the DJ",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          title: "DJ Notification",
          section: "General",
          content: "Please specify the position in queue you want to be notified at",
          value: userSettings.stored.custom.dj_notification || "",
          placeholder: "2",
          maxlength: "2",
          onConfirm: this.savePosition
        }));
      }
    }]);

    return DJNotification;
  }(Component);

  /*  Snowfall pure js
      https://github.com/loktar00/JQuery-Snowfall/blob/master/src/snowfall.js
      ====================================================================
      LICENSE
      ====================================================================
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing, software
         distributed under the License is distributed on an "AS IS" BASIS,
         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         See the License for the specific language governing permissions and
         limitations under the License.
      ====================================================================
      
      1.0
      Wanted to rewrite my snow plugin to use pure JS so you werent necessarily tied to using a framework.
      Does not include a selector engine or anything, just pass elements to it using standard JS selectors.
      
      Does not clear snow currently. Collection portion removed just for ease of testing will add back in next version
      
      Theres a few ways to call the snow you could do it the following way by directly passing the selector,
      
          snowFall.snow(document.getElementsByTagName("body"), {options});
      
      or you could save the selector results to a variable, and then call it
          
          var elements = document.getElementsByClassName('yourclass');
          snowFall.snow(elements, {options});
          
      Options are all the same as the plugin except clear, and collection
      
      values for snow options are
      
      flakeCount,
      flakeColor,
      flakeIndex,
      flakePosition,
      minSize,
      maxSize,
      minSpeed,
      maxSpeed,
      round,      true or false, makes the snowflakes rounded if the browser supports it.
      shadow      true or false, gives the snowflakes a shadow if the browser supports it.
          
  */
  // requestAnimationFrame polyfill from https://github.com/darius/requestAnimationFrame
  if (!Date.now) Date.now = function () {
    return new Date().getTime();
  };

  (function () {

    var vendors = ["webkit", "moz"];

    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[vp + "CancelAnimationFrame"] || window[vp + "CancelRequestAnimationFrame"];
    }

    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
    !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;

      window.requestAnimationFrame = function (callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function () {
          callback(lastTime = nextTime);
        }, nextTime - now);
      };

      window.cancelAnimationFrame = clearTimeout;
    }
  })();

  var snowFall = function () {
    function jSnow() {
      // local methods
      var defaults = {
        flakeCount: 35,
        flakeColor: "#ffffff",
        flakeIndex: 999999,
        flakePosition: "absolute",
        minSize: 1,
        maxSize: 2,
        minSpeed: 1,
        maxSpeed: 5,
        round: false,
        shadow: false,
        collection: false,
        image: false,
        collectionHeight: 40
      },
          flakes = [],
          element = {},
          elHeight = 0,
          elWidth = 0,
          widthOffset = 0,
          snowTimeout = 0,
          // For extending the default object with properties
      extend = function extend(obj, extObj) {
        for (var i in extObj) {
          if (obj.hasOwnProperty(i)) {
            obj[i] = extObj[i];
          }
        }
      },
          // For setting CSS3 transform styles
      transform = function transform(el, styles) {
        el.style.webkitTransform = styles;
        el.style.MozTransform = styles;
        el.style.msTransform = styles;
        el.style.OTransform = styles;
        el.style.transform = styles;
      },
          // random between range
      random = function random(min, max) {
        return Math.round(min + Math.random() * (max - min));
      },
          // Set multiple styles at once.
      setStyle = function setStyle(element, props) {
        for (var property in props) {
          element.style[property] = props[property] + (property == "width" || property == "height" ? "px" : "");
        }
      },
          // snowflake
      flake = function flake(_el, _size, _speed) {
        // Flake properties
        this.x = random(widthOffset, elWidth - widthOffset);
        this.y = random(0, elHeight);
        this.size = _size;
        this.speed = _speed;
        this.step = 0;
        this.stepSize = random(1, 10) / 100;

        if (defaults.collection) {
          this.target = canvasCollection[random(0, canvasCollection.length - 1)];
        }

        var flakeObj = null;

        if (defaults.image) {
          flakeObj = new Image();
          flakeObj.src = defaults.image;
        } else {
          flakeObj = document.createElement("div");
          setStyle(flakeObj, {
            background: defaults.flakeColor
          });
        }

        flakeObj.className = "snowfall-flakes";
        setStyle(flakeObj, {
          width: this.size,
          height: this.size,
          position: defaults.flakePosition,
          top: 0,
          left: 0,
          "will-change": "transform",
          fontSize: 0,
          zIndex: defaults.flakeIndex
        }); // This adds the style to make the snowflakes round via border radius property

        if (defaults.round) {
          setStyle(flakeObj, {
            "-moz-border-radius": ~~defaults.maxSize + "px",
            "-webkit-border-radius": ~~defaults.maxSize + "px",
            borderRadius: ~~defaults.maxSize + "px"
          });
        } // This adds shadows just below the snowflake so they pop a bit on lighter colored web pages


        if (defaults.shadow) {
          setStyle(flakeObj, {
            "-moz-box-shadow": "1px 1px 1px #555",
            "-webkit-box-shadow": "1px 1px 1px #555",
            boxShadow: "1px 1px 1px #555"
          });
        }

        if (_el.tagName === document.body.tagName) {
          document.body.appendChild(flakeObj);
        } else {
          _el.appendChild(flakeObj);
        }

        this.element = flakeObj; // Update function, used to update the snow flakes, and checks current snowflake against bounds

        this.update = function () {
          this.y += this.speed;

          if (this.y > elHeight - (this.size + 6)) {
            this.reset();
          }

          transform(this.element, "translateY(" + this.y + "px) translateX(" + this.x + "px)");
          this.step += this.stepSize;
          this.x += Math.cos(this.step);

          if (this.x + this.size > elWidth - widthOffset || this.x < widthOffset) {
            this.reset();
          }
        }; // Resets the snowflake once it reaches one of the bounds set


        this.reset = function () {
          this.y = 0;
          this.x = random(widthOffset, elWidth - widthOffset);
          this.stepSize = random(1, 10) / 100;
          this.size = random(defaults.minSize * 100, defaults.maxSize * 100) / 100;
          this.element.style.width = this.size + "px";
          this.element.style.height = this.size + "px";
          this.speed = random(defaults.minSpeed, defaults.maxSpeed);
        };
      },
          // this controls flow of the updating snow
      animateSnow = function animateSnow() {
        for (var i = 0; i < flakes.length; i += 1) {
          flakes[i].update();
        }

        snowTimeout = requestAnimationFrame(function () {
          animateSnow();
        });
      };

      return {
        snow: function snow(_element, _options) {
          extend(defaults, _options); //init the element vars

          element = _element;
          elHeight = element.offsetHeight;
          elWidth = element.offsetWidth;
          element.snow = this; // if this is the body the offset is a little different

          if (element.tagName.toLowerCase() === "body") {
            widthOffset = 25;
          } // Bind the window resize event so we can get the innerHeight again


          window.addEventListener("resize", function () {
            elHeight = element.clientHeight;
            elWidth = element.offsetWidth;
          }, true); // initialize the flakes

          for (var i = 0; i < defaults.flakeCount; i += 1) {
            flakes.push(new flake(element, random(defaults.minSize * 100, defaults.maxSize * 100) / 100, random(defaults.minSpeed, defaults.maxSpeed)));
          } // start the snow


          animateSnow();
        },
        clear: function clear() {
          var flakeChildren = null;

          if (!element.getElementsByClassName) {
            flakeChildren = element.querySelectorAll(".snowfall-flakes");
          } else {
            flakeChildren = element.getElementsByClassName("snowfall-flakes");
          }

          var flakeChilLen = flakeChildren.length;

          while (flakeChilLen--) {
            if (flakeChildren[flakeChilLen].parentNode === element) {
              element.removeChild(flakeChildren[flakeChilLen]);
            }
          }

          cancelAnimationFrame(snowTimeout);
        }
      };
    }

    return {
      snow: function snow(elements, options) {
        if (typeof options == "string") {
          if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
              if (elements[i].snow) {
                elements[i].snow.clear();
              }
            }
          } else {
            elements.snow.clear();
          }
        } else {
          if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
              new jSnow().snow(elements[i], options);
            }
          } else {
            new jSnow().snow(elements, options);
          }
        }
      }
    };
  }();

  var options$1 = {
    round: true,
    shadow: true,
    flakeCount: 50,
    minSize: 1,
    maxSize: 5,
    minSpeed: 5,
    maxSpeed: 5
  };

  var SnowSwitch =
  /*#__PURE__*/
  function (_Component) {
    _inherits(SnowSwitch, _Component);

    function SnowSwitch() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, SnowSwitch);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SnowSwitch)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        var target = document.getElementById('snow-container');

        if (!target) {
          _this.makeContainer();
        }

        snowFall.snow(document.getElementById('snow-container'), options$1);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        var target = document.getElementById('snow-container');

        if (target) {
          target.remove();
        }
      });

      return _this;
    }

    _createClass(SnowSwitch, [{
      key: "makeContainer",
      value: function makeContainer() {
        var snowdiv = document.createElement('div');
        snowdiv.id = 'snow-container';
        snowdiv.style.cssText = "\n      position:absolute;\n      top:0;\n      left:0;\n      width: 100%;\n      height: 100%;\n    ";
        document.body.appendChild(snowdiv);
      }
    }, {
      key: "render",
      value: function render$$1() {
        var _this2 = this;

        return h(MenuSwitch, {
          ref: function ref(s) {
            return _this2.switchRef = s;
          },
          id: "dubplus-snow",
          section: "General",
          menuTitle: "Snow",
          desc: "Make it snow!",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return SnowSwitch;
  }(Component);

  var rain = {}; // Rain settings

  rain.particles = [];
  rain.drops = [];
  rain.numbase = 5;
  rain.numb = 2;
  rain.height = 0; // We can update these realtime

  rain.controls = {
    rain: 2,
    alpha: 1,
    color: 200,
    opacity: 1,
    saturation: 100,
    lightness: 50,
    back: 0,
    multi: false,
    speed: 1
  };

  rain.init = function () {
    var canvas = document.createElement("canvas");
    canvas.id = "dubPlusRainCanvas";
    canvas.style.cssText = "position : fixed; top : 0px; left : 0px; z-index: 100; pointer-events:none;";
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    this.bindCanvas();
  }; // this function will be run on each click of the menu


  rain.destroy = function () {
    document.body.removeChild(document.getElementById("dubPlusRainCanvas"));
    this.unbindCanvas();
  };

  rain.bindCanvas = function () {
    this.requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();

    var canvas = document.getElementById("dubPlusRainCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    this.width, this.height = 0;

    window.onresize = function onresize() {
      this.width = canvas.width = window.innerWidth;
      this.height = canvas.height = window.innerHeight;
    };

    window.onresize();
    this.particles, this.drops = [];
    this.numbase = 5;
    this.numb = 2;

    var that = this;

    (function boucle() {
      that.requestAnimFrame(boucle);
      that.update();
      that.rendu(ctx);
    })();
  };

  rain.buildRainParticle = function (X, Y, num) {
    if (!num) {
      num = this.numb;
    }

    while (num--) {
      this.particles.push({
        speedX: Math.random() * 0.25,
        speedY: Math.random() * 9 + 1,
        X: X,
        Y: Y,
        alpha: 1,
        color: "hsla(" + this.controls.color + "," + this.controls.saturation + "%, " + this.controls.lightness + "%," + this.controls.opacity + ")"
      });
    }
  };

  rain.explosion = function (X, Y, color, num) {
    if (!num) {
      num = this.numbase;
    }

    while (num--) {
      this.drops.push({
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * -4,
        X: X,
        Y: Y,
        radius: 0.65 + Math.floor(Math.random() * 1.6),
        alpha: 1,
        color: color
      });
    }
  };

  rain.rendu = function (ctx) {
    if (this.controls.multi == true) {
      this.controls.color = Math.random() * 360;
    }

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    var particleslocales = this.particles;
    var dropslocales = this.drops;
    var tau = Math.PI * 2;

    for (var i = 0, particlesactives; particlesactives = particleslocales[i]; i++) {
      ctx.globalAlpha = particlesactives.alpha;
      ctx.fillStyle = particlesactives.color;
      ctx.fillRect(particlesactives.X, particlesactives.Y, particlesactives.speedY / 4, particlesactives.speedY);
    }

    for (var i = 0, dropsactives; dropsactives = dropslocales[i]; i++) {
      ctx.globalAlpha = dropsactives.alpha;
      ctx.fillStyle = dropsactives.color;
      ctx.beginPath();
      ctx.arc(dropsactives.X, dropsactives.Y, dropsactives.radius, 0, tau);
      ctx.fill();
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.restore();
  };

  rain.update = function () {
    var particleslocales = this.particles;
    var dropslocales = this.drops;

    for (var i = 0, particlesactives; particlesactives = particleslocales[i]; i++) {
      particlesactives.X += particlesactives.speedX;
      particlesactives.Y += particlesactives.speedY + 5;

      if (particlesactives.Y > height - 15) {
        particleslocales.splice(i--, 1);
        this.explosion(particlesactives.X, particlesactives.Y, particlesactives.color);
      }
    }

    for (var i = 0, dropsactives; dropsactives = dropslocales[i]; i++) {
      dropsactives.X += dropsactives.speedX;
      dropsactives.Y += dropsactives.speedY;
      dropsactives.radius -= 0.075;

      if (dropsactives.alpha > 0) {
        dropsactives.alpha -= 0.005;
      } else {
        dropsactives.alpha = 0;
      }

      if (dropsactives.radius < 0) {
        dropslocales.splice(i--, 1);
      }
    }

    var i = this.controls.rain;

    while (i--) {
      this.buildRainParticle(Math.floor(Math.random() * width), -15);
    }
  };

  rain.unbindCanvas = function () {
    this.requestAnimFrame = function () {};
  };

  /**
   * Menu item for Rain
   */

  var RainSwitch =
  /*#__PURE__*/
  function (_Component) {
    _inherits(RainSwitch, _Component);

    function RainSwitch() {
      _classCallCheck(this, RainSwitch);

      return _possibleConstructorReturn(this, _getPrototypeOf(RainSwitch).apply(this, arguments));
    }

    _createClass(RainSwitch, [{
      key: "turnOn",
      value: function turnOn() {
        rain.init();
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        rain.destroy();
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-rain",
          section: "General",
          menuTitle: "Rain",
          desc: "Make it rain!",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return RainSwitch;
  }(Component);

  /**
   * Check if a user is at least a mod or above
   */

  /*global Dubtrack */
  function modCheck(userid) {
    return Dubtrack.helpers.isDubtrackAdmin(userid) || Dubtrack.room.users.getIfOwner(userid) || Dubtrack.room.users.getIfManager(userid) || Dubtrack.room.users.getIfMod(userid);
  }

  var DubsInfoListItem = function DubsInfoListItem(_ref) {
    var data = _ref.data,
        click = _ref.click;
    return h("li", {
      onClick: function onClick() {
        return click("@" + data.username + " ");
      },
      className: "dubinfo-preview-item"
    }, h("div", {
      className: "dubinfo-image"
    }, h("img", {
      src: "https://api.dubtrack.fm/user/".concat(data.userid, "/image")
    })), h("span", {
      className: "dubinfo-text"
    }, "@", data.username));
  };
  /**
   * DubsInfo component
   * used to create the grabs, upDubs, and downdubs lists that popup when
   * hovering each of them.
   */


  var DubsInfo =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DubsInfo, _Component);

    function DubsInfo() {
      _classCallCheck(this, DubsInfo);

      return _possibleConstructorReturn(this, _getPrototypeOf(DubsInfo).apply(this, arguments));
    }

    _createClass(DubsInfo, [{
      key: "getBgColor",
      value: function getBgColor() {
        var whichVote = this.props.type.replace("dubs", "");
        var elem;

        if (whichVote === "up") {
          elem = document.querySelector(".dubup");
        } else if (whichVote === "down") {
          elem = document.querySelector(".dubdown");
        } else {
          return;
        }

        var bgColor = elem.classList.contains("voted") ? window.getComputedStyle(elem).backgroundColor : window.getComputedStyle(elem.querySelector(".icon-".concat(whichVote, "vote"))).color;
        return bgColor;
      }
    }, {
      key: "updateChat",
      value: function updateChat(str) {
        var chat = document.getElementById("chat-txt-message");
        chat.value = str;
        chat.focus();
      }
    }, {
      key: "makeList",
      value: function makeList() {
        var _this = this;

        return this.props.dubs.map(function (d, i) {
          return h(DubsInfoListItem, {
            data: d,
            click: _this.updateChat,
            key: "info-".concat(_this.props.type, "-").concat(i)
          });
        });
      }
    }, {
      key: "render",
      value: function render$$1(_ref2) {
        var type = _ref2.type,
            isMod = _ref2.isMod;
        var notYetMsg = "No ".concat(type, " have been casted yet!");

        if (type === "grabs") {
          notYetMsg = "This song hasn't been grabbed yet!";
        }

        var list = this.makeList();
        var containerCss = ["dubinfo-preview", "dubinfo-".concat(type)];

        if (list.length === 0) {
          list = h("li", {
            className: "dubinfo-preview-none"
          }, notYetMsg);
          containerCss.push("dubinfo-no-dubs");
        }

        if (type === 'downdubs' && !isMod) {
          containerCss.push("dubinfo-unauthorized");
        }

        return h("ul", {
          style: {
            borderColor: this.getBgColor()
          },
          className: containerCss.join(" ")
        }, list);
      }
    }]);

    return DubsInfo;
  }(Component);

  var ShowDubsOnHover =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ShowDubsOnHover, _Component);

    function ShowDubsOnHover() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ShowDubsOnHover);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ShowDubsOnHover)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        isOn: false,
        showWarning: false,
        upDubs: [],
        downDubs: [],
        grabs: []
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsMod", modCheck(Dubtrack.session.id));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        _this.setState({
          isOn: true
        }, _this.resetDubs);

        Dubtrack.Events.bind("realtime:room_playlist-dub", _this.dubWatcher);
        Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", _this.grabWatcher);
        Dubtrack.Events.bind("realtime:user-leave", _this.dubUserLeaveWatcher);
        Dubtrack.Events.bind("realtime:room_playlist-update", _this.resetDubs);
        Dubtrack.Events.bind("realtime:room_playlist-update", _this.resetGrabs);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        _this.setState({
          isOn: false
        });

        Dubtrack.Events.unbind("realtime:room_playlist-dub", _this.dubWatcher);
        Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", _this.grabWatcher);
        Dubtrack.Events.unbind("realtime:user-leave", _this.dubUserLeaveWatcher);
        Dubtrack.Events.unbind("realtime:room_playlist-update", _this.resetDubs); //TODO: Remove when we can hit the api for all grabs of current playing song

        Dubtrack.Events.unbind("realtime:room_playlist-update", _this.resetGrabs);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
        _this.setState({
          showWarning: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dubWatcher", function (e) {
        var _this$state = _this.state,
            upDubs = _this$state.upDubs,
            downDubs = _this$state.downDubs;
        var user = {
          userid: e.user._id,
          username: e.user.username
        };

        if (e.dubtype === "updub") {
          var userNotUpdubbed = upDubs.filter(function (el) {
            return el.userid === e.user._id;
          }).length === 0; // If user has not updubbed, we add them them to it

          if (userNotUpdubbed) {
            _this.setState(function (prevState) {
              return {
                upDubs: [].concat(_toConsumableArray(prevState.upDubs), [user])
              };
            });
          }

          var userDowndubbed = downDubs.filter(function (el) {
            return el.userid === e.user._id;
          }).length > 0; // if user was previous in downdubs then remove them from downdubs

          if (userDowndubbed) {
            _this.setState(function (prevState) {
              return {
                downDubs: prevState.downDubs.filter(function (el) {
                  return el.userid !== e.user._id;
                })
              };
            });
          }
        }

        if (e.dubtype === "downdub") {
          var userNotDowndub = downDubs.filter(function (el) {
            return el.userid === e.user._id;
          }).length === 0; // is user has not downdubbed, then we add them

          if (userNotDowndub && _this.userIsMod) {
            _this.setState(function (prevState) {
              return {
                downDubs: [].concat(_toConsumableArray(prevState.downDubs), [user])
              };
            });
          } //Remove user from from updubs


          var userUpdubbed = upDubs.filter(function (el) {
            return el.userid === e.user._id;
          }).length > 0; // and then remove them from downdubs

          if (userUpdubbed) {
            _this.setState(function (prevState) {
              return {
                upDubs: prevState.upDubs.filter(function (el) {
                  return el.userid !== e.user._id;
                })
              };
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "grabWatcher", function (e) {
        // only add Grab if it doesn't exist in the array already
        if (_this.state.grabs.filter(function (el) {
          return el.userid === e.user._id;
        }).length <= 0) {
          var user = {
            userid: e.user._id,
            username: e.user.username
          };

          _this.setState(function (prevState) {
            return {
              grabs: [].concat(_toConsumableArray(prevState.grabs), [user])
            };
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dubUserLeaveWatcher", function (e) {
        var newUpDubs = _this.state.upDubs.filter(function (el) {
          return el.userid !== e.user._id;
        });

        var newDownDubs = _this.state.downDubs.filter(function (el) {
          return el.userid !== e.user._id;
        });

        var newGrabs = _this.state.grabs.filter(function (el) {
          return el.userid !== e.user._id;
        });

        _this.setState({
          upDubs: newUpDubs,
          downDubs: newDownDubs,
          grabs: newGrabs
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetDubs", function () {
        _this.setState({
          upDubs: [],
          downDubs: []
        }, _this.handleReset);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetGrabs", function () {
        _this.setState({
          grabs: []
        });
      });

      return _this;
    }

    _createClass(ShowDubsOnHover, [{
      key: "handleReset",

      /**
       * Callback for resetDubs()'s setState
       * Wipes out local state and repopulates with data from the api
       */
      value: function handleReset() {
        var _this2 = this;

        // get the current active dubs in the room via api
        var dubsURL = "https://api.dubtrack.fm/room/".concat(Dubtrack.room.model.id, "/playlist/active/dubs");
        var roomDubs = getJSON(dubsURL);
        roomDubs.then(function (json) {
          // loop through all the upDubs in the room and add them to our local state
          if (json.data && json.data.upDubs) {
            json.data.upDubs.forEach(function (e) {
              // Dub already casted (usually from autodub)
              if (_this2.state.upDubs.filter(function (el) {
                return el.userid === e.userid;
              }).length > 0) {
                return;
              } // to get username we check for user info in the DT room's user collection


              var checkUser = Dubtrack.room.users.collection.findWhere({
                userid: e.userid
              });

              if (!checkUser || !checkUser.attributes) {
                // if they don't exist, we can check the user api directly
                var userInfo = getJSON("https://api.dubtrack.fm/user/" + e.userid);
                userInfo.then(function (json2) {
                  var data = json2.data;

                  if (data && data.userinfo && data.userinfo.username) {
                    var user = {
                      userid: e.userid,
                      username: data.userinfo.username
                    };

                    _this2.setState(function (prevState) {
                      return {
                        upDubs: [].concat(_toConsumableArray(prevState.upDubs), [user])
                      };
                    });
                  }
                });
                return;
              }

              if (checkUser.attributes._user.username) {
                var user = {
                  userid: e.userid,
                  username: checkUser.attributes._user.username
                };

                _this2.setState(function (prevState) {
                  return {
                    upDubs: [].concat(_toConsumableArray(prevState.upDubs), [user])
                  };
                });
              }
            });
          } //Only let mods or higher access down dubs


          if (json.data && json.data.downDubs && _this2.userIsMod) {
            json.data.downDubs.forEach(function (e) {
              //Dub already casted
              if (_this2.state.downDubs.filter(function (el) {
                return el.userid === e.userid;
              }).length > 0) {
                return;
              }

              var checkUsers = Dubtrack.room.users.collection.findWhere({
                userid: e.userid
              });

              if (!checkUsers || !checkUsers.attributes) {
                var userInfo = getJSON("https://api.dubtrack.fm/user/" + e.userid);
                userInfo.then(function (json3) {
                  var data = json3.data;

                  if (data && data.userinfo && data.userinfo.username) {
                    var user = {
                      userid: e.userid,
                      username: data.userinfo.username
                    };

                    _this2.setState(function (prevState) {
                      return {
                        downDubs: [].concat(_toConsumableArray(prevState.downDubs), [user])
                      };
                    });
                  }
                });
                return;
              }

              if (checkUsers.attributes._user.username) {
                var user = {
                  userid: e.userid,
                  username: checkUsers.attributes._user.username
                };

                _this2.setState(function (prevState) {
                  return {
                    downDubs: [].concat(_toConsumableArray(prevState.downDubs), [user])
                  };
                });
              }
            });
          }
        });
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.upElem = document.querySelector(".dubup").parentElement;
        this.upElem.classList.add('dubplus-updub-btn');
        this.downElem = document.querySelector(".dubdown").parentElement;
        this.downElem.classList.add('dubplus-downdub-btn');
        this.grabElem = document.querySelector(".add-to-playlist-button").parentElement;
        this.grabElem.classList.add('dubplus-grab-btn');
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-dubs-hover",
          section: "General",
          menuTitle: "Show Dub info on Hover",
          desc: "Show Dub info on Hover.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(Modal, {
          open: state.showWarning,
          title: "Vote & Grab Info",
          content: "Please note that this feature is currently still in development. We are waiting on the ability to pull grab vote information from Dubtrack on load. Until then the only grabs you will be able to see are those you are present in the room for.",
          onClose: this.closeModal
        }), state.isOn ? h("span", null, h(Portal, {
          into: this.upElem
        }, h(DubsInfo, {
          type: "updubs",
          dubs: state.upDubs
        })), h(Portal, {
          into: this.downElem
        }, h(DubsInfo, {
          type: "downdubs",
          isMod: this.userIsMod,
          dubs: state.downDubs
        })), h(Portal, {
          into: this.grabElem
        }, h(DubsInfo, {
          type: "grabs",
          dubs: state.grabs
        }))) : null);
      }
    }]);

    return ShowDubsOnHover;
  }(Component);

  function chatMessage(username, song) {
    var li = document.createElement('li');
    li.className = "dubplus-chat-system dubplus-chat-system-downdub";
    var div = document.createElement('div');
    div.className = "chatDelete";

    div.onclick = function (e) {
      return e.currentTarget.parentElement.remove();
    };

    var span = document.createElement('span');
    span.className = "icon-close";
    var text = document.createElement('div');
    text.className = "text";
    text.textContent = "@".concat(username, " has downdubbed your song ").concat(song);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(text);
    return li;
  }

  var DowndubInChat =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DowndubInChat, _Component);

    function DowndubInChat() {
      _classCallCheck(this, DowndubInChat);

      return _possibleConstructorReturn(this, _getPrototypeOf(DowndubInChat).apply(this, arguments));
    }

    _createClass(DowndubInChat, [{
      key: "turnOn",
      value: function turnOn() {
        if (!modCheck(Dubtrack.session.id)) {
          return;
        }

        Dubtrack.Events.bind("realtime:room_playlist-dub", this.downdubWatcher);
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        Dubtrack.Events.unbind("realtime:room_playlist-dub", this.downdubWatcher);
      }
    }, {
      key: "downdubWatcher",
      value: function downdubWatcher(e) {
        var user = Dubtrack.session.get("username");

        var currentDj = Dubtrack.room.users.collection.findWhere({
          userid: Dubtrack.room.player.activeSong.attributes.song.userid
        }).attributes._user.username;

        if (user === currentDj && e.dubtype === "downdub") {
          var newChat = chatMessage(e.user.username, Dubtrack.room.player.activeSong.attributes.songInfo.name);
          document.querySelector("ul.chat-main").appendChild(newChat);
        }
      }
    }, {
      key: "render",
      value: function render$$1() {
        return h(MenuSwitch, {
          id: "dubplus-downdubs",
          section: "General",
          menuTitle: "Downdubs in Chat (mods only)",
          desc: "Toggle showing downdubs in the chat box (mods only)",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return DowndubInChat;
  }(Component);

  function chatMessage$1(username, song) {
    var li = document.createElement("li");
    li.className = "dubplus-chat-system dubplus-chat-system-updub";
    var div = document.createElement("div");
    div.className = "chatDelete";

    div.onclick = function (e) {
      return e.currentTarget.parentElement.remove();
    };

    var span = document.createElement("span");
    span.className = "icon-close";
    var text = document.createElement("div");
    text.className = "text";
    text.textContent = "@".concat(username, " has updubbed your song ").concat(song);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(text);
    return li;
  }

  var UpdubsInChat =
  /*#__PURE__*/
  function (_Component) {
    _inherits(UpdubsInChat, _Component);

    function UpdubsInChat() {
      _classCallCheck(this, UpdubsInChat);

      return _possibleConstructorReturn(this, _getPrototypeOf(UpdubsInChat).apply(this, arguments));
    }

    _createClass(UpdubsInChat, [{
      key: "turnOn",
      value: function turnOn() {
        Dubtrack.Events.bind("realtime:room_playlist-dub", this.updubWatcher);
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        Dubtrack.Events.unbind("realtime:room_playlist-dub", this.updubWatcher);
      }
    }, {
      key: "updubWatcher",
      value: function updubWatcher(e) {
        var user = Dubtrack.session.get("username");

        var currentDj = Dubtrack.room.users.collection.findWhere({
          userid: Dubtrack.room.player.activeSong.attributes.song.userid
        }).attributes._user.username;

        if (user === currentDj && e.dubtype === "updub") {
          var newChat = chatMessage$1(e.user.username, Dubtrack.room.player.activeSong.attributes.songInfo.name);
          document.querySelector("ul.chat-main").appendChild(newChat);
        }
      }
    }, {
      key: "render",
      value: function render$$1() {
        return h(MenuSwitch, {
          id: "dubplus-updubs",
          section: "General",
          menuTitle: "Updubs in Chat",
          desc: "Toggle showing updubs in the chat box",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return UpdubsInChat;
  }(Component);

  function chatMessage$2(username, song) {
    var li = document.createElement('li');
    li.className = "dubplus-chat-system dubplus-chat-system-grab";
    var div = document.createElement('div');
    div.className = "chatDelete";

    div.onclick = function (e) {
      return e.currentTarget.parentElement.remove();
    };

    var span = document.createElement('span');
    span.className = "icon-close";
    var text = document.createElement('div');
    text.className = "text";
    text.textContent = "@".concat(username, " has grabbed your song ").concat(song);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(text);
    return li;
  }

  var GrabsInChat =
  /*#__PURE__*/
  function (_Component) {
    _inherits(GrabsInChat, _Component);

    function GrabsInChat() {
      _classCallCheck(this, GrabsInChat);

      return _possibleConstructorReturn(this, _getPrototypeOf(GrabsInChat).apply(this, arguments));
    }

    _createClass(GrabsInChat, [{
      key: "turnOn",
      value: function turnOn() {
        Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
      }
    }, {
      key: "turnOff",
      value: function turnOff() {
        Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
      }
    }, {
      key: "grabChatWatcher",
      value: function grabChatWatcher(e) {
        var user = Dubtrack.session.get("username");

        var currentDj = Dubtrack.room.users.collection.findWhere({
          userid: Dubtrack.room.player.activeSong.attributes.song.userid
        }).attributes._user.username;

        if (user === currentDj && !Dubtrack.room.model.get('displayUserGrab')) {
          var newChat = chatMessage$2(e.user.username, Dubtrack.room.player.activeSong.attributes.songInfo.name);
          document.querySelector("ul.chat-main").appendChild(newChat);
        }
      }
    }, {
      key: "render",
      value: function render$$1() {
        return h(MenuSwitch, {
          id: "dubplus-grabschat",
          section: "General",
          menuTitle: "Grabs in Chat",
          desc: "Toggle showing grabs in the chat box",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        });
      }
    }]);

    return GrabsInChat;
  }(Component);

  var GeneralSection = function GeneralSection() {
    return h(MenuSection, {
      id: "dubplus-general",
      title: "General",
      settingsKey: "general"
    }, h(Autovote, null), h(AFK, null), h(AutocompleteEmoji, null), h(Emotes, null), h(CustomMentions, null), h(ChatCleaner, null), h(ChatNotification, null), h(PMNotifications, null), h(DJNotification, null), h(ShowDubsOnHover, null), h(DowndubInChat, null), h(UpdubsInChat, null), h(GrabsInChat, null), h(SnowSwitch, null), h(RainSwitch, null));
  };

  /**
   * Fullscreen Video
   */

  function goFS() {
    var elem = document.querySelector("#room-main-player-container");

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  var FullscreenVideo = function FullscreenVideo() {
    return h(MenuSimple, {
      id: "dubplus-fullscreen",
      section: "User Interface",
      menuTitle: "Fullscreen Video",
      desc: "Toggle fullscreen video mode",
      icon: "arrows-alt",
      onClick: goFS
    });
  };

  function turnOn() {
    document.body.classList.add('dubplus-split-chat');
  }

  function turnOff() {
    document.body.classList.remove('dubplus-split-chat');
  }
  /**
   * Split Chat
   */


  var SplitChat = function SplitChat() {
    return h(MenuSwitch, {
      id: "dubplus-split-chat",
      section: "User Interface",
      menuTitle: "Split Chat",
      desc: "Toggle Split Chat UI enhancement",
      turnOn: turnOn,
      turnOff: turnOff
    });
  };

  function turnOn$1() {
    document.body.classList.add('dubplus-video-only');
  }

  function turnOff$1() {
    document.body.classList.remove('dubplus-video-only');
  }
  /**
   * Hide Chat
   */


  var HideChat = function HideChat() {
    return h(MenuSwitch, {
      id: "dubplus-video-only",
      section: "User Interface",
      menuTitle: "Hide Chat",
      desc: "Toggles hiding the chat box",
      turnOn: turnOn$1,
      turnOff: turnOff$1
    });
  };

  function turnOn$2() {
    document.body.classList.add('dubplus-chat-only');
  }

  function turnOff$2() {
    document.body.classList.remove('dubplus-chat-only');
  }
  /**
   * Hide Video
   */


  var HideVideo = function HideVideo() {
    return h(MenuSwitch, {
      id: "dubplus-chat-only",
      section: "User Interface",
      menuTitle: "Hide Video",
      desc: "Toggles hiding the video box",
      turnOn: turnOn$2,
      turnOff: turnOff$2
    });
  };

  function turnOn$3() {
    document.body.classList.add('dubplus-hide-avatars');
  }

  function turnOff$3() {
    document.body.classList.remove('dubplus-hide-avatars');
  }
  /**
   * Hide Avatars
   */


  var HideAvatars = function HideAvatars() {
    return h(MenuSwitch, {
      id: "dubplus-hide-avatars",
      section: "User Interface",
      menuTitle: "Hide Avatars",
      desc: "Toggle hiding user avatars in the chat box.",
      turnOn: turnOn$3,
      turnOff: turnOff$3
    });
  };

  function turnOn$4() {
    document.body.classList.add('dubplus-hide-bg');
  }

  function turnOff$4() {
    document.body.classList.remove('dubplus-hide-bg');
  }
  /**
   * Hide Background
   */


  var HideBackground = function HideBackground() {
    return h(MenuSwitch, {
      id: "dubplus-hide-bg",
      section: "User Interface",
      menuTitle: "Hide Background",
      desc: "Toggle hiding background image.",
      turnOn: turnOn$4,
      turnOff: turnOff$4
    });
  };

  function turnOn$5() {
    document.body.classList.add('dubplus-show-timestamp');
  }

  function turnOff$5() {
    document.body.classList.remove('dubplus-show-timestamp');
  }

  var ShowTS = function ShowTS() {
    return h(MenuSwitch, {
      id: "dubplus-show-timestamp",
      section: "User Interface",
      menuTitle: "Show Timestamps",
      desc: "Toggle always showing chat message timestamps.",
      turnOn: turnOn$5,
      turnOff: turnOff$5
    });
  };

  var UISection = function UISection() {
    return h(MenuSection, {
      id: "dubplus-ui",
      title: "UI",
      settingsKey: "user-interface"
    }, h(FullscreenVideo, null), h(SplitChat, null), h(HideChat, null), h(HideVideo, null), h(HideAvatars, null), h(HideBackground, null), h(ShowTS, null));
  };

  function handleKeyup(e) {
    if ((e.keyCode || e.which) !== 32) {
      return;
    }

    var tag = event.target.tagName.toLowerCase();

    if (tag !== "input" && tag !== "textarea") {
      Dubtrack.room.player.mutePlayer();
    }
  }

  function turnOn$6() {
    document.addEventListener("keyup", handleKeyup);
  }

  function turnOff$6() {
    document.removeEventListener("keyup", handleKeyup);
  }

  var SpacebarMute = function SpacebarMute() {
    return h(MenuSwitch, {
      id: "dubplus-spacebar-mute",
      section: "Settings",
      menuTitle: "Spacebar Mute",
      desc: "Turn on/off the ability to mute current song with the spacebar.",
      turnOn: turnOn$6,
      turnOff: turnOff$6
    });
  };

  function unloader(e) {
    var confirmationMessage = "";
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }

  function turnOn$7() {
    window.addEventListener("beforeunload", unloader);
  }

  function turnOff$7() {
    window.removeEventListener("beforeunload", unloader);
  }

  var WarnNav = function WarnNav() {
    return h(MenuSwitch, {
      id: "warn_redirect",
      section: "Settings",
      menuTitle: "Warn On Navigation",
      desc: "Warns you when accidentally clicking on a link that takes you out of dubtrack.",
      turnOn: turnOn$7,
      turnOff: turnOff$7
    });
  };

  var SettingsSection = function SettingsSection() {
    return h(MenuSection, {
      id: "dubplus-settings",
      title: "Settings",
      settingsKey: "settings"
    }, h(SpacebarMute, null), h(WarnNav, null));
  };

  var makeLink = function makeLink(className, FileName) {
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.className = className || '';
    link.href = FileName;
    return link;
  };
  /**
   * Loads a CSS file into <head>.  It concats settings.srcRoot with the first 
   * argument (cssFile)
   * @param {string} cssFile    the css file location
   * @param {string} className  class name to give the <link> element
   *
   * example:  css.load("/options/show_timestamps.css", "show_timestamps_link");
   */


  function load(cssFile, className) {
    if (!cssFile) {
      return;
    }

    var link = makeLink(className, userSettings.srcRoot + cssFile + "?" + 1549341988016);
    document.head.appendChild(link);
  }
  /**
   * Loads a css file from a full URL in the <head>
   * @param  {String} cssFile   the full url location of a CSS file
   * @param  {String} className a class name to give to the <link> element
   */


  function loadExternal(cssFile, className) {
    if (!cssFile) {
      return;
    }

    var link = makeLink(className, cssFile);
    document.head.appendChild(link);
  }

  var css$2 = {
    load: load,
    loadExternal: loadExternal
  };

  function turnOn$8() {
    var location = Dubtrack.room.model.get("roomUrl");
    var roomAjax = getJSON("https://api.dubtrack.fm/room/" + location);
    roomAjax.then(function (json) {
      var content = json.data.description; // for backwards compatibility with dubx we're checking for both @dubx and @dubplus and @dub+

      var themeCheck = new RegExp(/(@dub(x|plus|\+)=)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/, "i");
      var communityCSSUrl = null;
      content.replace(themeCheck, function (match, p1, p2, p3) {
        console.log("loading community css theme:", p3);
        communityCSSUrl = p3;
      });

      if (!communityCSSUrl) {
        return;
      }

      css$2.loadExternal(communityCSSUrl, "dubplus-comm-theme");
    });
  }

  function turnOff$8() {
    var css = document.querySelector(".dubplus-comm-theme");

    if (css) {
      css.remove();
    }
  }

  var CommunityTheme = function CommunityTheme() {
    return h(MenuSwitch, {
      id: "dubplus-comm-theme",
      section: "Customize",
      menuTitle: "Community Theme",
      desc: "Toggle Community CSS theme.",
      turnOn: turnOn$8,
      turnOff: turnOff$8
    });
  };

  /**
   * Custom CSS
   */

  var CustomCSS =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CustomCSS, _Component);

    function CustomCSS() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CustomCSS);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomCSS)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isOn", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        showModal: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        _this.isOn = true;

        if (userSettings.stored.custom.css) {
          css$2.loadExternal(userSettings.stored.custom.css, 'dubplus-custom-css');
        } else {
          _this.setState({
            showModal: true
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        _this.isOn = false;
        document.querySelector('.dubplus-custom-css').remove();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "save", function (val) {
        // TODO: save to global state
        userSettings.save('custom', 'css', val);

        if (_this.isOn && val !== '') {
          css$2.loadExternal(userSettings.stored.custom.css, 'dubplus-custom-css');
        }

        _this.setState({
          showModal: false
        });
      });

      return _this;
    }

    _createClass(CustomCSS, [{
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-custom-css",
          section: "Customize",
          menuTitle: "Custom CSS",
          desc: "Add your own custom CSS.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          showModal: state.showModal,
          title: "Custom CSS",
          section: "Customize",
          content: "Enter a url location for your custom css",
          value: userSettings.stored.custom.css || '',
          placeholder: "https://example.com/example.css",
          maxlength: "500",
          onConfirm: this.save
        }));
      }
    }]);

    return CustomCSS;
  }(Component);

  /**
   * Custom Background
   */

  var CustomBG =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CustomBG, _Component);

    function CustomBG() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CustomBG);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomBG)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isOn", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        showModal: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        _this.isOn = true;

        if (userSettings.stored.custom.bg) {
          _this.addCustomBG(userSettings.stored.custom.bg);
        } else {
          _this.setState({
            showModal: true
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        _this.isOn = false;

        _this.revertBG();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "save", function (val) {
        // TODO: save to global state
        userSettings.save('custom', 'bg', val);

        if (_this.isOn && val !== '') {
          _this.addCustomBG(val);
        }

        _this.setState({
          showModal: false
        });
      });

      return _this;
    }

    _createClass(CustomBG, [{
      key: "addCustomBG",
      value: function addCustomBG(val) {
        var elem = document.querySelector('.backstretch-item img');
        this.saveSrc = elem.src;
        elem.src = val;
      }
    }, {
      key: "revertBG",
      value: function revertBG() {
        var elem = document.querySelector('.backstretch-item img');
        elem.src = this.saveSrc;
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-custom-bg",
          section: "Customize",
          menuTitle: "Custom Background Image",
          desc: "Add your own custom Background.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          showModal: state.showModal,
          title: "Custom Background Image",
          section: "Customize",
          content: "Enter the full URL of an image. We recommend using a .jpg file. Leave blank to remove the current background image",
          value: userSettings.stored.custom.bg || '',
          placeholder: "https://example.com/big-image.jpg",
          maxlength: "500",
          onConfirm: this.save
        }));
      }
    }]);

    return CustomBG;
  }(Component);

  var DubtrackDefaultSound = "/assets/music/user_ping.mp3";
  var modalMessage = "Enter the full URL of a sound file. We recommend using an .mp3 file. Leave blank to go back to Dubtrack's default sound";
  /**
   * Custom Notification Sound
   */

  var CustomSound =
  /*#__PURE__*/
  function (_Component) {
    _inherits(CustomSound, _Component);

    function CustomSound() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, CustomSound);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomSound)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isOn", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        showModal: false,
        modalMessage: modalMessage
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOn", function () {
        _this.isOn = true;

        if (userSettings.stored.custom.notificationSound) {
          Dubtrack.room.chat.mentionChatSound.url = userSettings.stored.custom.notificationSound;
        } else {
          _this.setState({
            showModal: true,
            modalMessage: modalMessage
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "turnOff", function () {
        _this.isOn = false;
        Dubtrack.room.chat.mentionChatSound.url = DubtrackDefaultSound;

        _this.setState({
          showModal: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "save", function (val) {
        // Check if valid sound url
        if (soundManager.canPlayURL(val)) {
          userSettings.save("custom", "notificationSound", val);
        } else {
          _this.setState({
            modalMessage: "You've entered an invalid sound url! Please make sure you are entering the full, direct url to the file. IE: https://example.com/sweet-sound.mp3",
            showModal: true
          });

          return;
        }

        if (_this.isOn) {
          Dubtrack.room.chat.mentionChatSound.url = val;
        }

        _this.setState({
          showModal: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCancel", function () {
        if (!userSettings.stored.custom.notificationSound) {
          _this.turnOff();
        }
      });

      return _this;
    }

    _createClass(CustomSound, [{
      key: "render",
      value: function render$$1(props, state) {
        return h(MenuSwitch, {
          id: "dubplus-custom-notification-sound",
          section: "Customize",
          menuTitle: "Custom Notification Sound",
          desc: "Change the notification sound to a custom one.",
          turnOn: this.turnOn,
          turnOff: this.turnOff
        }, h(MenuPencil, {
          showModal: state.showModal,
          title: "Custom Notification Sound",
          section: "Customize",
          content: state.modalMessage,
          value: userSettings.stored.custom.notificationSound || "",
          placeholder: "https://example.com/sweet-sound.mp3",
          maxlength: "500",
          onConfirm: this.save,
          onCancel: this.onCancel
        }));
      }
    }]);

    return CustomSound;
  }(Component);

  var CustomizeSection = function CustomizeSection() {
    return h(MenuSection, {
      id: "dubplus-customize",
      title: "Customize",
      settingsKey: "customize"
    }, h(CommunityTheme, null), h(CustomCSS, null), h(CustomBG, null), h(CustomSound, null));
  };

  /**
   * DubPlus Menu Container
   */

  var DubPlusMenu = function DubPlusMenu() {
    setTimeout(function () {
      // load this async so it doesn't block the rest of the menu render
      // since these buttons are completely independent from the menu
      snooze$1();
      eta();
      SetupEmojiPicker();
    }, 10);
    return h("section", {
      className: "dubplus-menu"
    }, h("p", {
      className: "dubplus-menu-header"
    }, "Dub+ Options"), h(GeneralSection, null), h(UISection, null), h(SettingsSection, null), h(CustomizeSection, null), h(MenuSection, {
      id: "dubplus-contacts",
      title: "Contacts",
      settingsKey: "contact"
    }, h("li", {
      class: "dubplus-menu-icon"
    }, h("span", {
      class: "fa fa-bug"
    }), h("a", {
      href: "https://discord.gg/XUkG3Qy",
      class: "dubplus-menu-label",
      target: "_blank"
    }, "Report bugs on Discord")), h("li", {
      class: "dubplus-menu-icon"
    }, h("span", {
      class: "fa fa-reddit-alien"
    }), h("a", {
      href: "https://www.reddit.com/r/DubPlus/",
      class: "dubplus-menu-label",
      target: "_blank"
    }, "Reddit")), h("li", {
      class: "dubplus-menu-icon"
    }, h("span", {
      class: "fa fa-facebook"
    }), h("a", {
      href: "https://facebook.com/DubPlusScript",
      class: "dubplus-menu-label",
      target: "_blank"
    }, "Facebook")), h("li", {
      class: "dubplus-menu-icon"
    }, h("span", {
      class: "fa fa-twitter"
    }), h("a", {
      href: "https://twitter.com/DubPlusScript",
      class: "dubplus-menu-label",
      target: "_blank"
    }, "Twitter"))));
  };

  /**
   * Takes a string  representation of a variable or object and checks if it's
   * definied starting at provided scope or default to global window scope.
   * @param  {string} dottedString  the item you are looking for
   * @param  {var}    startingScope where to start looking
   * @return {boolean}              if it is defined or not
   */
  function deepCheck(dottedString, startingScope) {
    var _vars = dottedString.split('.');

    var len = _vars.length;
    var depth = startingScope || window;

    for (var i = 0; i < len; i++) {
      if (typeof depth[_vars[i]] === 'undefined') {
        return false;
      }

      depth = depth[_vars[i]];
    }

    return true;
  }

  function arrayDeepCheck(arr, startingScope) {
    var len = arr.length;
    var scope = startingScope || window;

    for (var i = 0; i < len; i++) {
      if (!deepCheck(arr[i], scope)) {
        console.log(arr[i], 'is not found yet');
        return false;
      }
    }

    return true;
  }
  /**
   * pings for the existence of var/function for # seconds until it's defined
   * runs callback once found and stops pinging
   * @param {string|array} waitingFor          what you are waiting for
   * @param {object}       options             optional options to pass
   *                       options.interval    how often to ping
   *                       options.seconds     how long to ping for
   *                       
   * @return {object}                    2 functions:
   *                  .then(fn)          will run fn only when item successfully found.  This also starts the ping process
   *                  .fail(fn)          will run fn only when is never found in the time given
   */


  function WaitFor(waitingFor, options) {
    if (typeof waitingFor !== "string" && !Array.isArray(waitingFor)) {
      console.warn('WaitFor: invalid first argument');
      return;
    }

    var defaults = {
      interval: 500,
      // every XX ms we check to see if waitingFor is defined
      seconds: 15,
      // how many total seconds we wish to continue pinging
      isNode: false
    };

    var _cb = function _cb() {};

    var _failCB = function _failCB() {};

    var opts = Object.assign({}, defaults, options);
    var checkFunc = Array.isArray(waitingFor) ? arrayDeepCheck : deepCheck;

    if (opts.isNode) {
      checkFunc = function checkFunc(selector) {
        return typeof document.querySelector(selector) !== null;
      };
    }

    var tryCount = 0;
    var tryLimit = opts.seconds * 1000 / opts.interval; // how many intervals

    var check = function check() {
      tryCount++;

      var _test = checkFunc(waitingFor);

      if (_test) {
        return _cb();
      }

      if (tryCount < tryLimit) {
        window.setTimeout(check, opts.interval);
      } else {
        return _failCB();
      }
    };

    var then = function then(cb) {
      if (typeof cb === 'function') {
        _cb = cb;
      } // start the first one


      window.setTimeout(check, opts.interval);
      return this;
    };

    var fail = function fail(cb) {
      if (typeof cb === 'function') {
        _failCB = cb;
      }

      return this;
    };

    return {
      then: then,
      fail: fail
    };
  }

  var waitingStyles = {
    fontFamily: "'Trebuchet MS', Helvetica, sans-serif",
    zIndex: '2147483647',
    color: 'white',
    position: 'fixed',
    top: '69px',
    right: '-250px',
    background: '#222',
    padding: '10px',
    lineHeight: 1,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    borderRadius: '5px',
    overflow: 'hidden',
    width: '230px',
    transition: 'right 200ms',
    cursor: 'pointer'
  };
  var dpIcon = {
    float: 'left',
    width: '26px',
    marginRight: '5px'
  };
  var dpText = {
    display: 'table-cell',
    width: '10000px',
    paddingTop: '5px'
  };

  var LoadingNotice =
  /*#__PURE__*/
  function (_Component) {
    _inherits(LoadingNotice, _Component);

    function LoadingNotice() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, LoadingNotice);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingNotice)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        mainStyles: waitingStyles
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "dismiss", function () {
        _this.setState(function (prevState, props) {
          return {
            mainStyles: Object.assign({}, prevState.mainStyles, {
              right: '-250px'
            })
          };
        });
      });

      return _this;
    }

    _createClass(LoadingNotice, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        setTimeout(function () {
          _this2.setState(function (prevState, props) {
            return {
              mainStyles: Object.assign({}, prevState.mainStyles, {
                right: '13px'
              })
            };
          });
        }, 200);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.dismiss();
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        return h("div", {
          style: state.mainStyles,
          onClick: this.dismiss
        }, h("div", {
          style: dpIcon
        }, h("img", {
          src: userSettings.srcRoot + '/images/dubplus.svg',
          alt: "DubPlus icon"
        })), h("span", {
          style: dpText
        }, props.text || 'Waiting for Dubtrack...'));
      }
    }]);

    return LoadingNotice;
  }(Component);

  var MenuIcon =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MenuIcon, _Component);

    function MenuIcon() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MenuIcon);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        open: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
        var menu = document.querySelector('.dubplus-menu');

        if (_this.state.open) {
          menu.classList.remove('dubplus-menu-open');

          _this.setState({
            open: false
          });
        } else {
          menu.classList.add('dubplus-menu-open');

          _this.setState({
            open: true
          });
        }
      });

      return _this;
    }

    _createClass(MenuIcon, [{
      key: "render",
      value: function render$$1(props, state) {
        return h("div", {
          className: "dubplus-icon",
          onClick: this.toggle
        }, h("img", {
          src: "".concat(userSettings.srcRoot, "/images/dubplus.svg"),
          alt: "DubPlus Icon"
        }));
      }
    }]);

    return MenuIcon;
  }(Component);

  polyfills(); // the extension loads the CSS from the load script so we don't need to 
  // do it here. This is for people who load the script via bookmarklet or userscript

  var isExtension = document.getElementById("dubplus-script-ext");

  if (!isExtension) {
    setTimeout(function () {
      // start the loading of the CSS asynchronously
      css$2.loadExternal("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
      css$2.load("/css/dubplus.css");
    }, 1);
  }

  var DubPlusContainer =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DubPlusContainer, _Component);

    function DubPlusContainer() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, DubPlusContainer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DubPlusContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        loading: true,
        error: false,
        errorMsg: "",
        failed: false
      });

      return _this;
    }

    _createClass(DubPlusContainer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        /* globals Dubtrack */
        if (!window.DubPlus) {
          // checking to see if these items exist before initializing the script
          // instead of just picking an arbitrary setTimeout and hoping for the best
          var checkList = ["Dubtrack.session.id", "Dubtrack.room.chat", "Dubtrack.Events", "Dubtrack.room.player", "Dubtrack.helpers.cookie", "Dubtrack.room.model", "Dubtrack.room.users"];

          var _dubplusWaiting = new WaitFor(checkList, {
            seconds: 120
          });

          _dubplusWaiting.then(function () {
            _this2.setState({
              loading: false,
              error: false
            });
          }).fail(function () {
            if (!Dubtrack.session.id) {
              _this2.showError("You're not logged in. Please login to use Dub+.");
            } else {
              _this2.showError("Something happed, refresh and try again");

              track.event("Dub+ lib", "load", "failed");
            }
          });
        } else {
          if (!Dubtrack.session.id) {
            this.showError("You're not logged in. Please login to use Dub+.");
          } else {
            this.showError("Dub+ is already loaded");
          }
        }
      }
    }, {
      key: "showError",
      value: function showError(msg) {
        this.setState({
          loading: false,
          error: true,
          errorMsg: msg
        });
      }
    }, {
      key: "render",
      value: function render$$1(props, state) {
        var _this3 = this;

        if (state.loading) {
          return h(LoadingNotice, null);
        }

        if (state.error) {
          return h(Modal, {
            title: "Dub+ Error",
            onClose: function onClose() {
              _this3.setState({
                failed: true,
                error: false
              });
            },
            content: state.errorMsg
          });
        }

        if (state.failed) {
          return null;
        }

        document.querySelector('html').classList.add('dubplus');
        return h(DubPlusMenu, null);
      }
    }]);

    return DubPlusContainer;
  }(Component);

  render(h(DubPlusContainer, null), document.body);
  var navWait = new WaitFor(".header-right-navigation .user-messages", {
    seconds: 60,
    isNode: true
  });
  navWait.then(function () {
    render(h(MenuIcon, null), document.querySelector(".header-right-navigation"));
  }); // PKGINFO is inserted by the rollup build process

  var index = {
    "version": "2.0.0",
    "description": "Dub+ - A simple script/extension for Dubtrack.fm",
    "license": "MIT",
    "bugs": "https://github.com/DubPlus/DubPlus/issues"
  };

  return index;

}());
