(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.main = function() {
	var app = new haxe_ui_HaxeUIApp();
	app.ready(function() {
		app.addComponent(new MainView());
		app.start();
	});
};
var haxe_ui_backend_ComponentSurface = function() {
};
$hxClasses["haxe.ui.backend.ComponentSurface"] = haxe_ui_backend_ComponentSurface;
haxe_ui_backend_ComponentSurface.__name__ = "haxe.ui.backend.ComponentSurface";
haxe_ui_backend_ComponentSurface.prototype = {
	__class__: haxe_ui_backend_ComponentSurface
};
var haxe_ui_core_ComponentCommon = function() {
	haxe_ui_backend_ComponentSurface.call(this);
};
$hxClasses["haxe.ui.core.ComponentCommon"] = haxe_ui_core_ComponentCommon;
haxe_ui_core_ComponentCommon.__name__ = "haxe.ui.core.ComponentCommon";
haxe_ui_core_ComponentCommon.__super__ = haxe_ui_backend_ComponentSurface;
haxe_ui_core_ComponentCommon.prototype = $extend(haxe_ui_backend_ComponentSurface.prototype,{
	getTextDisplay: function() {
		return null;
	}
	,hasTextDisplay: function() {
		return false;
	}
	,getTextInput: function() {
		return null;
	}
	,hasTextInput: function() {
		return false;
	}
	,getImageDisplay: function() {
		return null;
	}
	,hasImageDisplay: function() {
		return false;
	}
	,__class__: haxe_ui_core_ComponentCommon
});
var haxe_ui_core_IClonable = function() { };
$hxClasses["haxe.ui.core.IClonable"] = haxe_ui_core_IClonable;
haxe_ui_core_IClonable.__name__ = "haxe.ui.core.IClonable";
haxe_ui_core_IClonable.__isInterface__ = true;
haxe_ui_core_IClonable.prototype = {
	cloneComponent: null
	,self: null
	,postCloneComponent: null
	,__class__: haxe_ui_core_IClonable
};
var haxe_ui_core_ComponentContainer = function() {
	this._id = null;
	this._style = null;
	this._layoutLocked = false;
	this._layout = null;
	this._ready = false;
	this.parentComponent = null;
	haxe_ui_core_ComponentCommon.call(this);
	this.behaviours = new haxe_ui_behaviours_Behaviours(js_Boot.__cast(this , haxe_ui_core_Component));
};
$hxClasses["haxe.ui.core.ComponentContainer"] = haxe_ui_core_ComponentContainer;
haxe_ui_core_ComponentContainer.__name__ = "haxe.ui.core.ComponentContainer";
haxe_ui_core_ComponentContainer.__interfaces__ = [haxe_ui_core_IClonable];
haxe_ui_core_ComponentContainer.__super__ = haxe_ui_core_ComponentCommon;
haxe_ui_core_ComponentContainer.prototype = $extend(haxe_ui_core_ComponentCommon.prototype,{
	behaviours: null
	,parentComponent: null
	,dispatch: function(event) {
	}
	,_ready: null
	,isReady: null
	,get_isReady: function() {
		return this._ready;
	}
	,_children: null
	,childComponents: null
	,get_childComponents: function() {
		if(this._children == null) {
			return [];
		}
		return this._children;
	}
	,registerBehaviours: function() {
		this.behaviours.register("disabled",haxe_ui_core_ComponentDisabledBehaviour);
		this.behaviours.register("tooltip",haxe_ui_core_ComponentToolTipBehaviour,null);
		this.behaviours.register("tooltipRenderer",haxe_ui_core_ComponentToolTipRendererBehaviour,null);
		this.behaviours.register("text",haxe_ui_core_ComponentTextBehaviour);
		this.behaviours.register("value",haxe_ui_core_ComponentValueBehaviour);
	}
	,addComponent: function(child) {
		return null;
	}
	,addComponentAt: function(child,index) {
		return null;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,moveComponentToBack: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,0);
	}
	,moveComponentBackward: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		var index = this.parentComponent.getComponentIndex(this);
		if(index == 0) {
			return;
		}
		this.parentComponent.setComponentIndex(this,index - 1);
	}
	,moveComponentToFront: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,this.parentComponent.get_numComponents() - 1);
	}
	,moveComponentFrontward: function() {
		if(this.parentComponent == null || this.parentComponent.get_numComponents() <= 1) {
			return;
		}
		var index = this.parentComponent.getComponentIndex(this);
		if(index == this.parentComponent.get_numComponents() - 1) {
			return;
		}
		this.parentComponent.setComponentIndex(this,index + 1);
	}
	,bottomComponent: null
	,get_bottomComponent: function() {
		if(this._children == null || this._children.length == 0) {
			return null;
		}
		return this._children[0];
	}
	,topComponent: null
	,get_topComponent: function() {
		if(this._children == null || this._children.length == 0) {
			return null;
		}
		return this._children[this._children.length - 1];
	}
	,postCloneComponent: function(c) {
	}
	,_layout: null
	,_layoutLocked: null
	,_style: null
	,_id: null
	,get_id: function() {
		return this._id;
	}
	,set_id: function(value) {
		if(this._id != value) {
			this._id = value;
		}
		return this._id;
	}
	,get_disabled: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("disabled"));
	}
	,set_disabled: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("disabled",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"disabled"));
		return value;
	}
	,get_tooltip: function() {
		return this.behaviours.getDynamic("tooltip");
	}
	,set_tooltip: function(value) {
		this.behaviours.setDynamic("tooltip",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"tooltip"));
		return value;
	}
	,get_tooltipRenderer: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toComponent(this.behaviours.get("tooltipRenderer"));
	}
	,set_tooltipRenderer: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("tooltipRenderer",haxe_ui_util_Variant.fromComponent(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"tooltipRenderer"));
		return value;
	}
	,get_text: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("text"));
	}
	,set_text: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"text",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("text",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"text"));
		return value;
	}
	,get_value: function() {
		return this.behaviours.getDynamic("value");
	}
	,set_value: function(value) {
		this.behaviours.setDynamic("value",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"value"));
		return value;
	}
	,cloneComponent: function() {
		var c = this.self();
		if(this.get_id() != null) {
			c.set_id(this.get_id());
		}
		c.set_disabled(this.get_disabled());
		if(this.get_tooltip() != null) {
			c.set_tooltip(this.get_tooltip());
		}
		if(this.get_tooltipRenderer() != null) {
			c.set_tooltipRenderer(this.get_tooltipRenderer());
		}
		if(this.get_text() != null) {
			c.set_text(this.get_text());
		}
		if(this.get_value() != null) {
			c.set_value(this.get_value());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentContainer();
	}
	,__class__: haxe_ui_core_ComponentContainer
	,__properties__: {set_value:"set_value",get_value:"get_value",set_text:"set_text",get_text:"get_text",set_tooltipRenderer:"set_tooltipRenderer",get_tooltipRenderer:"get_tooltipRenderer",set_tooltip:"set_tooltip",get_tooltip:"get_tooltip",set_disabled:"set_disabled",get_disabled:"get_disabled",set_id:"set_id",get_id:"get_id",get_topComponent:"get_topComponent",get_bottomComponent:"get_bottomComponent",get_childComponents:"get_childComponents",get_isReady:"get_isReady"}
});
var haxe_ui_core_ComponentEvents = function() {
	this._pausedEvents = null;
	this._lastCursor = null;
	this._interactivityDisabledCounter = 0;
	this._interactivityDisabled = false;
	this._internalEventsClass = null;
	this._internalEvents = null;
	haxe_ui_core_ComponentContainer.call(this);
};
$hxClasses["haxe.ui.core.ComponentEvents"] = haxe_ui_core_ComponentEvents;
haxe_ui_core_ComponentEvents.__name__ = "haxe.ui.core.ComponentEvents";
haxe_ui_core_ComponentEvents.__super__ = haxe_ui_core_ComponentContainer;
haxe_ui_core_ComponentEvents.prototype = $extend(haxe_ui_core_ComponentContainer.prototype,{
	_internalEvents: null
	,_internalEventsClass: null
	,registerInternalEvents: function(eventsClass,reregister) {
		if(reregister == null) {
			reregister = false;
		}
		if(this._internalEvents == null && eventsClass != null) {
			this._internalEvents = Type.createInstance(eventsClass,[this]);
			this._internalEvents.register();
		}
		if(reregister == true && this._internalEvents != null) {
			this._internalEvents.register();
		}
	}
	,unregisterInternalEvents: function() {
		if(this._internalEvents == null) {
			return;
		}
		this._internalEvents.unregister();
		this._internalEvents = null;
	}
	,__events: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if((js_Boot.__cast(this , haxe_ui_core_Component)).classes.indexOf(":mobile") != -1 && (type == "mouseover" || type == "mouseout")) {
			return;
		}
		if(this.get_disabled() == true && this.isInteractiveEvent(type) == true) {
			if(this._disabledEvents == null) {
				this._disabledEvents = new haxe_ui_util_EventMap();
			}
			this._disabledEvents.add(type,listener,priority);
			return;
		}
		if(this.__events == null) {
			this.__events = new haxe_ui_util_EventMap();
		}
		if(this.__events.add(type,listener,priority) == true) {
			this.mapEvent(type,$bind(this,this._onMappedEvent));
		}
	}
	,hasEvent: function(type,listener) {
		if(this.__events == null) {
			return false;
		}
		return this.__events.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._disabledEvents != null && !this._interactivityDisabled) {
			this._disabledEvents.remove(type,listener);
		}
		if(this.__events != null) {
			if(this.__events.remove(type,listener) == true) {
				this.unmapEvent(type,$bind(this,this._onMappedEvent));
			}
		}
	}
	,dispatch: function(event) {
		if(event != null) {
			if(this.__events != null) {
				this.__events.invoke(event.type,event,js_Boot.__cast(this , haxe_ui_core_Component));
			}
			if(event.bubble == true && event.canceled == false && this.parentComponent != null) {
				this.parentComponent.dispatch(event);
			}
		}
	}
	,dispatchRecursively: function(event) {
		this.dispatch(event);
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.dispatchRecursively(event);
		}
	}
	,dispatchRecursivelyWhen: function(event,condition) {
		if(condition(this) == true) {
			this.dispatch(event);
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(condition(child) == true) {
				child.dispatchRecursivelyWhen(event,condition);
			}
		}
	}
	,_onMappedEvent: function(event) {
		this.dispatch(event);
	}
	,_disabledEvents: null
	,isInteractiveEvent: function(type) {
		return haxe_ui_core_ComponentEvents.INTERACTIVE_EVENTS.indexOf(type) != -1;
	}
	,disableInteractiveEvents: function(disable) {
		if(disable == true) {
			if(this.__events != null) {
				var eventType = this.__events.keys();
				while(eventType.hasNext()) {
					var eventType1 = eventType.next();
					if(!this.isInteractiveEvent(eventType1)) {
						continue;
					}
					var listeners = this.__events.listeners(eventType1);
					if(listeners != null) {
						var listener = listeners.copy().iterator();
						while(listener.hasNext()) {
							var listener1 = listener.next();
							if(this._disabledEvents == null) {
								this._disabledEvents = new haxe_ui_util_EventMap();
							}
							this._disabledEvents.add(eventType1,haxe_ui_util_Listener.toFunc(listener1));
							this.unregisterEvent(eventType1,haxe_ui_util_Listener.toFunc(listener1));
						}
					}
				}
			}
		} else if(this._disabledEvents != null) {
			var eventType = this._disabledEvents.keys();
			while(eventType.hasNext()) {
				var eventType1 = eventType.next();
				var listeners = this._disabledEvents.listeners(eventType1);
				if(listeners != null) {
					var listener = listeners.copy().iterator();
					while(listener.hasNext()) {
						var listener1 = listener.next();
						this.registerEvent(eventType1,haxe_ui_util_Listener.toFunc(listener1));
					}
				}
			}
			this._disabledEvents = null;
		}
	}
	,_interactivityDisabled: null
	,_interactivityDisabledCounter: null
	,_lastCursor: null
	,disableInteractivity: function(disable,recursive,updateStyle,force) {
		if(force == null) {
			force = false;
		}
		if(updateStyle == null) {
			updateStyle = false;
		}
		if(recursive == null) {
			recursive = true;
		}
		if(force == true) {
			this._interactivityDisabledCounter = 0;
		}
		if(disable == true) {
			this._interactivityDisabledCounter++;
		} else {
			this._interactivityDisabledCounter--;
		}
		if(this._interactivityDisabledCounter > 0 && this._interactivityDisabled == false) {
			this._interactivityDisabled = true;
			if(updateStyle == true) {
				(js_Boot.__cast(this , haxe_ui_core_Component)).swapClass(":disabled",":hover");
			}
			this.disableInteractiveEvents(true);
			this.dispatch(new haxe_ui_events_UIEvent("disabled"));
			this._lastCursor = (js_Boot.__cast(this , haxe_ui_core_Component)).element.style.cursor;
			(js_Boot.__cast(this , haxe_ui_core_Component)).element.style.removeProperty("cursor");
		} else if(this._interactivityDisabledCounter < 1 && this._interactivityDisabled == true) {
			this._interactivityDisabled = false;
			if(updateStyle == true) {
				(js_Boot.__cast(this , haxe_ui_core_Component)).removeClass(":disabled");
			}
			this.disableInteractiveEvents(false);
			this.dispatch(new haxe_ui_events_UIEvent("enabled"));
			if(this._lastCursor != null) {
				(js_Boot.__cast(this , haxe_ui_core_Component)).element.style.cursor = this._lastCursor;
			}
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.disableInteractivity(disable,recursive,updateStyle);
			}
		}
	}
	,unregisterEvents: function() {
		if(this.__events != null) {
			var copy = [];
			var eventType = this.__events.keys();
			while(eventType.hasNext()) {
				var eventType1 = eventType.next();
				copy.push(eventType1);
			}
			var _g = 0;
			while(_g < copy.length) {
				var eventType = copy[_g];
				++_g;
				var listeners = this.__events.listeners(eventType);
				if(listeners != null) {
					var listener = listeners.iterator();
					while(listener.hasNext()) {
						var listener1 = listener.next();
						if(listener1 != null) {
							if(this.__events.remove(eventType,haxe_ui_util_Listener.toFunc(listener1)) == true) {
								this.unmapEvent(eventType,$bind(this,this._onMappedEvent));
							}
						}
					}
				}
			}
		}
	}
	,_pausedEvents: null
	,pauseEvent: function(type,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this.__events == null || this.__events.contains(type) == false) {
			return;
		}
		if(this._pausedEvents == null) {
			this._pausedEvents = new haxe_ds_StringMap();
		}
		var pausedList = this._pausedEvents.h[type];
		if(pausedList == null) {
			pausedList = [];
			this._pausedEvents.h[type] = pausedList;
		}
		var listeners = this.__events.listeners(type).copy();
		var l = listeners.iterator();
		while(l.hasNext()) {
			var l1 = l.next();
			pausedList.push(haxe_ui_util_Listener.toFunc(l1));
			this.unregisterEvent(type,haxe_ui_util_Listener.toFunc(l1));
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.pauseEvent(type,recursive);
			}
		}
	}
	,resumeEvent: function(type,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		var _gthis = this;
		if(this.__events == null) {
			return;
		}
		if(this._pausedEvents == null) {
			return;
		}
		if(Object.prototype.hasOwnProperty.call(this._pausedEvents.h,type) == false) {
			return;
		}
		haxe_ui_Toolkit.callLater(function() {
			var pausedList = _gthis._pausedEvents.h[type];
			var _g = 0;
			while(_g < pausedList.length) {
				var l = pausedList[_g];
				++_g;
				_gthis.registerEvent(type,l);
			}
			var _this = _gthis._pausedEvents;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
		});
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.resumeEvent(type,recursive);
			}
		}
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentContainer.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentContainer.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentEvents();
	}
	,__class__: haxe_ui_core_ComponentEvents
});
var haxe_ui_core_ComponentValidation = function() {
	this._depth = -1;
	this._invalidateCount = 0;
	this._isDisposed = false;
	this._isInitialized = false;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._delayedInvalidationFlags = new haxe_ds_StringMap();
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_core_ComponentEvents.call(this);
};
$hxClasses["haxe.ui.core.ComponentValidation"] = haxe_ui_core_ComponentValidation;
haxe_ui_core_ComponentValidation.__name__ = "haxe.ui.core.ComponentValidation";
haxe_ui_core_ComponentValidation.__super__ = haxe_ui_core_ComponentEvents;
haxe_ui_core_ComponentValidation.prototype = $extend(haxe_ui_core_ComponentEvents.prototype,{
	_invalidationFlags: null
	,_delayedInvalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,_isInitialized: null
	,_isDisposed: null
	,_invalidateCount: null
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(flag == null) {
			flag = "all";
		}
		if(this._ready == false) {
			return;
		}
		var isAlreadyInvalid = this.isComponentInvalid(flag);
		var isAlreadyDelayedInvalid = false;
		if(this._isValidating == true) {
			var h = this._delayedInvalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				isAlreadyDelayedInvalid = true;
				break;
			}
		}
		if(flag == "all") {
			if(this._isValidating == true) {
				this._delayedInvalidationFlags.h["all"] = true;
			} else {
				this._isAllInvalid = true;
			}
		} else if(this._isValidating == true) {
			this._delayedInvalidationFlags.h[flag] = true;
		} else if(flag != "all" && !Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
		}
		if(this._isValidating == true) {
			if(isAlreadyDelayedInvalid == true) {
				return;
			}
			this._invalidateCount++;
			if(this._invalidateCount >= 10) {
				throw haxe_Exception.thrown("The validation queue returned too many times during validation. This may be an infinite loop. Try to avoid doing anything that calls invalidate() during validation.");
			}
			haxe_ui_validation_ValidationManager.get_instance().add(js_Boot.__cast(this , haxe_ui_core_Component));
			return;
		} else if(isAlreadyInvalid == true) {
			if(recursive == true) {
				var _g = 0;
				var _g1 = this._children == null ? [] : this._children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.invalidateComponent(flag,recursive);
				}
			}
			return;
		}
		this._invalidateCount = 0;
		haxe_ui_validation_ValidationManager.get_instance().add(js_Boot.__cast(this , haxe_ui_core_Component));
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.invalidateComponent(flag,recursive);
			}
		}
	}
	,invalidateComponentData: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("data",recursive);
	}
	,invalidateComponentLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layout == null || this._layoutLocked == true) {
			return;
		}
		this.invalidateComponent("layout",recursive);
	}
	,invalidateComponentPosition: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("position",recursive);
	}
	,invalidateComponentDisplay: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		this.invalidateComponent("display",recursive);
	}
	,invalidateComponentStyle: function(force,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(force == null) {
			force = false;
		}
		this.invalidateComponent("style",recursive);
		if(force == true) {
			this._style = null;
		}
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._ready == false || this._isDisposed == true || this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		var isInitialized = this._isInitialized;
		if(isInitialized == false) {
			this.initializeComponent();
		}
		this._isValidating = true;
		this.validateComponentInternal(nextFrame);
		this.validateInitialSize(isInitialized);
		this._invalidationFlags.h = Object.create(null);
		this._isAllInvalid = false;
		var h = this._delayedInvalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			if(flag == "all") {
				this._isAllInvalid = true;
			} else {
				this._invalidationFlags.h[flag] = true;
			}
		}
		this._delayedInvalidationFlags.h = Object.create(null);
		this._isValidating = false;
	}
	,validateNow: function() {
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.validateNow();
		}
		this.invalidateComponent();
		this.syncComponentValidation(false);
	}
	,syncComponentValidation: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		var count = 0;
		while(this.isComponentInvalid()) {
			this.validateComponent(nextFrame);
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.syncComponentValidation(nextFrame);
			}
			if(++count >= 10) {
				if(this._isDisposed) {
					var c = js_Boot.getClass(this);
					throw haxe_Exception.thrown("There was a problem validating this component as it has already been destroyed (" + c.__name__ + "#" + this.get_id() + ")");
				} else {
					var c1 = js_Boot.getClass(this);
					throw haxe_Exception.thrown("The syncValidation returned too many times during validation. This may be an infinite loop. Try to avoid doing anything that calls invalidate() during validation (" + c1.__name__ + "#" + this.get_id() + ").");
				}
			}
		}
	}
	,validateComponentInternal: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var textDisplayInvalid = this.isComponentInvalid("textDisplay") && this.hasTextDisplay();
		var textInputInvalid = this.isComponentInvalid("textInput") && this.hasTextInput();
		var imageDisplayInvalid = this.isComponentInvalid("imageDisplay") && this.hasImageDisplay();
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var layoutInvalid = this.isComponentInvalid("layout") && this._layoutLocked == false;
		if(dataInvalid) {
			this.validateComponentData();
		}
		if(styleInvalid) {
			this.validateComponentStyle();
		}
		if(textDisplayInvalid) {
			this.getTextDisplay().validateComponent();
		}
		if(textInputInvalid) {
			this.getTextInput().validateComponent();
		}
		if(imageDisplayInvalid) {
			this.getImageDisplay().validateComponent();
		}
		if(positionInvalid) {
			this.validateComponentPosition();
		}
		if(layoutInvalid) {
			if(this.validateComponentLayout()) {
				displayInvalid = true;
			}
		}
		if(displayInvalid || styleInvalid) {
			haxe_ui_validation_ValidationManager.get_instance().addDisplay(js_Boot.__cast(this , haxe_ui_core_Component),nextFrame);
		}
	}
	,initializeComponent: function() {
	}
	,validateInitialSize: function(isInitialized) {
	}
	,validateComponentData: function() {
	}
	,validateComponentLayout: function() {
		return false;
	}
	,validateComponentStyle: function() {
	}
	,validateComponentPosition: function() {
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentEvents.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentEvents.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentValidation();
	}
	,__class__: haxe_ui_core_ComponentValidation
	,__properties__: $extend(haxe_ui_core_ComponentEvents.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth"})
});
var haxe_ui_core_ComponentLayout = function() {
	haxe_ui_core_ComponentValidation.call(this);
};
$hxClasses["haxe.ui.core.ComponentLayout"] = haxe_ui_core_ComponentLayout;
haxe_ui_core_ComponentLayout.__name__ = "haxe.ui.core.ComponentLayout";
haxe_ui_core_ComponentLayout.__super__ = haxe_ui_core_ComponentValidation;
haxe_ui_core_ComponentLayout.prototype = $extend(haxe_ui_core_ComponentValidation.prototype,{
	get_style: function() {
		return this._style;
	}
	,set_style: function(value) {
		this._style = value;
		return value;
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentValidation.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentValidation.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentLayout();
	}
	,__class__: haxe_ui_core_ComponentLayout
	,__properties__: $extend(haxe_ui_core_ComponentValidation.prototype.__properties__,{set_style:"set_style",get_style:"get_style"})
});
var haxe_ui_core_ComponentBounds = function() {
	this._componentClipRect = null;
	this._top = 0;
	this._left = 0;
	this._hasScreen = null;
	this._cachedPercentHeight = null;
	this._cachedPercentWidth = null;
	haxe_ui_core_ComponentLayout.call(this);
};
$hxClasses["haxe.ui.core.ComponentBounds"] = haxe_ui_core_ComponentBounds;
haxe_ui_core_ComponentBounds.__name__ = "haxe.ui.core.ComponentBounds";
haxe_ui_core_ComponentBounds.__super__ = haxe_ui_core_ComponentLayout;
haxe_ui_core_ComponentBounds.prototype = $extend(haxe_ui_core_ComponentLayout.prototype,{
	autoWidth: null
	,get_autoWidth: function() {
		if(this._percentWidth != null || this._width != null) {
			return false;
		}
		if(this.get_style() == null) {
			return true;
		}
		if(this.get_style().autoWidth == null) {
			return false;
		}
		return this.get_style().autoWidth;
	}
	,autoHeight: null
	,get_autoHeight: function() {
		if(this._percentHeight != null || this._height != null || this.get_style() == null) {
			return false;
		}
		if(this.get_style().autoHeight == null) {
			return false;
		}
		return this.get_style().autoHeight;
	}
	,resizeComponent: function(w,h) {
		var invalidate = false;
		if(w != null && this._componentWidth != w) {
			this._componentWidth = w;
			invalidate = true;
		}
		if(h != null && this._componentHeight != h) {
			this._componentHeight = h;
			invalidate = true;
		}
		if(invalidate == true && this.isComponentInvalid("layout") == false) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
	}
	,actualComponentWidth: null
	,get_actualComponentWidth: function() {
		return this.get_componentWidth() * haxe_ui_Toolkit.get_scaleX();
	}
	,actualComponentHeight: null
	,get_actualComponentHeight: function() {
		return this.get_componentHeight() * haxe_ui_Toolkit.get_scaleY();
	}
	,_componentWidth: null
	,get_componentWidth: function() {
		if(this._componentWidth == null) {
			return 0;
		}
		return this._componentWidth;
	}
	,set_componentWidth: function(value) {
		this.resizeComponent(value,null);
		return value;
	}
	,_componentHeight: null
	,get_componentHeight: function() {
		if(this._componentHeight == null) {
			return 0;
		}
		return this._componentHeight;
	}
	,set_componentHeight: function(value) {
		this.resizeComponent(null,value);
		return value;
	}
	,_percentWidth: null
	,get_percentWidth: function() {
		return this._percentWidth;
	}
	,set_percentWidth: function(value) {
		if(this._percentWidth == value) {
			return value;
		}
		this._percentWidth = value;
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		} else {
			haxe_ui_core_Screen.get_instance().resizeRootComponents();
		}
		return value;
	}
	,_percentHeight: null
	,get_percentHeight: function() {
		return this._percentHeight;
	}
	,set_percentHeight: function(value) {
		if(this._percentHeight == value) {
			return value;
		}
		this._percentHeight = value;
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		} else {
			haxe_ui_core_Screen.get_instance().resizeRootComponents();
		}
		return value;
	}
	,_cachedPercentWidth: null
	,_cachedPercentHeight: null
	,cachePercentSizes: function(clearExisting) {
		if(clearExisting == null) {
			clearExisting = true;
		}
		if(this._percentWidth != null) {
			this._cachedPercentWidth = this._percentWidth;
			if(clearExisting == true) {
				this._percentWidth = null;
			}
		}
		if(this._percentHeight != null) {
			this._cachedPercentHeight = this._percentHeight;
			if(clearExisting == true) {
				this._percentHeight = null;
			}
		}
	}
	,restorePercentSizes: function() {
		if(this._cachedPercentWidth != null) {
			this.set_percentWidth(this._cachedPercentWidth);
		}
		if(this._cachedPercentHeight != null) {
			this.set_percentHeight(this._cachedPercentHeight);
		}
	}
	,_width: null
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this._width = value;
		this.set_componentWidth(value);
		return value;
	}
	,get_width: function() {
		var f = this.get_componentWidth();
		return f;
	}
	,_height: null
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this._height = value;
		this.set_componentHeight(value);
		return value;
	}
	,get_height: function() {
		var f = this.get_componentHeight();
		return f;
	}
	,_actualWidth: null
	,_actualHeight: null
	,_hasScreen: null
	,hasScreen: null
	,get_hasScreen: function() {
		var p = this;
		while(p != null) {
			if(p._hasScreen == false) {
				return false;
			}
			p = p.parentComponent;
		}
		return true;
	}
	,hitTest: function(left,top,allowZeroSized) {
		if(allowZeroSized == null) {
			allowZeroSized = false;
		}
		if(this.get_hasScreen() == false) {
			return false;
		}
		left *= haxe_ui_Toolkit.get_scale();
		top *= haxe_ui_Toolkit.get_scale();
		var b = false;
		var sx = this.get_screenLeft();
		var sy = this.get_screenTop();
		var cx = 0;
		if(this.get_componentWidth() != null) {
			cx = this.get_actualComponentWidth();
		}
		var cy = 0;
		if(this.get_componentHeight() != null) {
			cy = this.get_actualComponentHeight();
		}
		if(allowZeroSized == true) {
			if(this.get_width() <= 0 || this.get_height() <= 0) {
				return true;
			}
		}
		if(left >= sx && left < sx + cx && top >= sy && top < sy + cy) {
			b = true;
		}
		return b;
	}
	,autoSize: function() {
		if(this._ready == false || this._layout == null) {
			return false;
		}
		return this._layout.autoSize();
	}
	,moveComponent: function(left,top) {
		var invalidate = false;
		if(left != null && this._left != left) {
			this._left = left;
			invalidate = true;
		}
		if(top != null && this._top != top) {
			this._top = top;
			invalidate = true;
		}
		if(invalidate == true && this.isComponentInvalid("position") == false) {
			this.invalidateComponent("position",false);
		}
	}
	,_left: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		this.moveComponent(value,null);
		return value;
	}
	,_top: null
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		this.moveComponent(null,value);
		return value;
	}
	,screenLeft: null
	,get_screenLeft: function() {
		var c = this;
		var xpos = 0;
		while(c != null) {
			var l = c.get_left();
			if(c.parentComponent != null) {
				l *= haxe_ui_Toolkit.get_scale();
			}
			xpos += l;
			if(c.get_componentClipRect() != null) {
				xpos -= c.get_componentClipRect().left * haxe_ui_Toolkit.get_scaleX();
			}
			c = c.parentComponent;
		}
		return xpos;
	}
	,screenTop: null
	,get_screenTop: function() {
		var c = this;
		var ypos = 0;
		while(c != null) {
			var t = c.get_top();
			if(c.parentComponent != null) {
				t *= haxe_ui_Toolkit.get_scale();
			}
			ypos += t;
			if(c.get_componentClipRect() != null) {
				ypos -= c.get_componentClipRect().top * haxe_ui_Toolkit.get_scaleY();
			}
			c = c.parentComponent;
		}
		return ypos;
	}
	,_componentClipRect: null
	,get_componentClipRect: function() {
		if(this.get_style() != null && this.get_style().clip != null && this.get_style().clip == true) {
			return new haxe_ui_geom_Rectangle(0,0,this.get_componentWidth(),this.get_componentHeight());
		}
		return this._componentClipRect;
	}
	,set_componentClipRect: function(value) {
		this._componentClipRect = value;
		this.invalidateComponent("display",false);
		return value;
	}
	,isComponentClipped: null
	,get_isComponentClipped: function() {
		return this.get_componentClipRect() != null;
	}
	,isComponentOffscreen: null
	,get_isComponentOffscreen: function() {
		if(this.get_width() == 0 && this.get_height() == 0) {
			return false;
		}
		var x = this.get_screenLeft();
		var y = this.get_screenTop();
		var w = this.get_width();
		var h = this.get_height();
		var thisRect = new haxe_ui_geom_Rectangle(x,y,w,h);
		var screenRect = new haxe_ui_geom_Rectangle(0,0,haxe_ui_core_Screen.get_instance().get_width(),haxe_ui_core_Screen.get_instance().get_height());
		return !screenRect.intersects(thisRect);
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentLayout.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentLayout.prototype.cloneComponent.call(this);
		if(this.get_componentWidth() != null) {
			c.set_componentWidth(this.get_componentWidth());
		}
		if(this.get_componentHeight() != null) {
			c.set_componentHeight(this.get_componentHeight());
		}
		if(this.get_percentWidth() != null) {
			c.set_percentWidth(this.get_percentWidth());
		}
		if(this.get_percentHeight() != null) {
			c.set_percentHeight(this.get_percentHeight());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ComponentBounds();
	}
	,__class__: haxe_ui_core_ComponentBounds
	,__properties__: $extend(haxe_ui_core_ComponentLayout.prototype.__properties__,{get_isComponentOffscreen:"get_isComponentOffscreen",get_isComponentClipped:"get_isComponentClipped",set_componentClipRect:"set_componentClipRect",get_componentClipRect:"get_componentClipRect",get_screenTop:"get_screenTop",get_screenLeft:"get_screenLeft",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",get_hasScreen:"get_hasScreen",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_percentHeight:"set_percentHeight",get_percentHeight:"get_percentHeight",set_percentWidth:"set_percentWidth",get_percentWidth:"get_percentWidth",set_componentHeight:"set_componentHeight",get_componentHeight:"get_componentHeight",set_componentWidth:"set_componentWidth",get_componentWidth:"get_componentWidth",get_actualComponentHeight:"get_actualComponentHeight",get_actualComponentWidth:"get_actualComponentWidth",get_autoHeight:"get_autoHeight",get_autoWidth:"get_autoWidth"})
});
var haxe_ui_backend_ComponentBase = function() {
	this._nativeClassName = null;
	this._nodeName = null;
	this._className = null;
	haxe_ui_core_ComponentBounds.call(this);
};
$hxClasses["haxe.ui.backend.ComponentBase"] = haxe_ui_backend_ComponentBase;
haxe_ui_backend_ComponentBase.__name__ = "haxe.ui.backend.ComponentBase";
haxe_ui_backend_ComponentBase.__super__ = haxe_ui_core_ComponentBounds;
haxe_ui_backend_ComponentBase.prototype = $extend(haxe_ui_core_ComponentBounds.prototype,{
	handleCreate: function(native) {
	}
	,handlePosition: function(left,top,style) {
	}
	,handleSize: function(width,height,style) {
	}
	,handleReady: function() {
	}
	,handleClipRect: function(value) {
	}
	,handleVisibility: function(show) {
	}
	,getComponentOffset: function() {
		return new haxe_ui_geom_Point(0,0);
	}
	,isNativeScroller: null
	,get_isNativeScroller: function() {
		return false;
	}
	,isScroller: null
	,get_isScroller: function() {
		return false;
	}
	,handleFrameworkProperty: function(id,value) {
	}
	,handleSetComponentIndex: function(child,index) {
	}
	,handleAddComponent: function(child) {
		return child;
	}
	,handleAddComponentAt: function(child,index) {
		return child;
	}
	,handleRemoveComponent: function(child,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return child;
	}
	,handleRemoveComponentAt: function(index,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,applyStyle: function(style) {
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,_textDisplay: null
	,createTextDisplay: function(text) {
		if(this._textDisplay == null) {
			this._textDisplay = new haxe_ui_core_TextDisplay();
			this._textDisplay.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		if(text != null) {
			this._textDisplay.set_text(text);
		}
		return this._textDisplay;
	}
	,getTextDisplay: function() {
		return this.createTextDisplay();
	}
	,hasTextDisplay: function() {
		return this._textDisplay != null;
	}
	,_textInput: null
	,createTextInput: function(text) {
		if(this._textInput == null) {
			this._textInput = new haxe_ui_core_TextInput();
			this._textInput.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		if(text != null) {
			this._textInput.set_text(text);
		}
		return this._textInput;
	}
	,getTextInput: function() {
		return this.createTextInput();
	}
	,hasTextInput: function() {
		return this._textInput != null;
	}
	,_imageDisplay: null
	,createImageDisplay: function() {
		if(this._imageDisplay == null) {
			this._imageDisplay = new haxe_ui_core_ImageDisplay();
			this._imageDisplay.parentComponent = js_Boot.__cast(this , haxe_ui_core_Component);
		}
		return this._imageDisplay;
	}
	,getImageDisplay: function() {
		return this.createImageDisplay();
	}
	,hasImageDisplay: function() {
		return this._imageDisplay != null;
	}
	,removeImageDisplay: function() {
		if(this._imageDisplay != null) {
			this._imageDisplay.dispose();
			this._imageDisplay = null;
		}
	}
	,handlePreReposition: function() {
	}
	,handlePostReposition: function() {
	}
	,getClassProperty: function(name) {
		var v = null;
		if(this._classProperties != null) {
			v = this._classProperties.h[name];
		}
		if(v == null) {
			var c = js_Boot.getClass(this);
			var c1 = c.__name__.toLowerCase() + "." + name;
			v = haxe_ui_Toolkit.properties.h[c1];
		}
		return v;
	}
	,_classProperties: null
	,setClassProperty: function(name,value) {
		if(this._classProperties == null) {
			this._classProperties = new haxe_ds_StringMap();
		}
		this._classProperties.h[name] = value;
	}
	,_hasNativeEntry: null
	,hasNativeEntry: null
	,get_hasNativeEntry: function() {
		if(this._hasNativeEntry == null) {
			this._hasNativeEntry = this.getNativeConfigProperty(".@id") != null;
		}
		return this._hasNativeEntry;
	}
	,getNativeConfigProperty: function(query,defaultValue) {
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.query(query,defaultValue,this);
	}
	,getNativeConfigPropertyBool: function(query,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryBool(query,defaultValue,this);
	}
	,getNativeConfigProperties: function(query) {
		if(query == null) {
			query = "";
		}
		query = "component[id=" + this.get_nativeClassName() + "]" + query;
		return haxe_ui_Toolkit.nativeConfig.queryValues(query,this);
	}
	,_className: null
	,className: null
	,get_className: function() {
		if(this._className != null) {
			return this._className;
		}
		var c = js_Boot.getClass(this);
		this._className = c.__name__;
		return this._className;
	}
	,_nodeName: null
	,nodeName: null
	,get_nodeName: function() {
		if(this._nodeName != null) {
			return this._nodeName;
		}
		this._nodeName = this.get_className().split(".").pop().toLowerCase();
		return this._nodeName;
	}
	,_nativeClassName: null
	,nativeClassName: null
	,get_nativeClassName: function() {
		if(this._nativeClassName != null) {
			return this._nativeClassName;
		}
		var r = js_Boot.getClass(this);
		while(r != null) {
			var c = r.__name__;
			var t = haxe_ui_Toolkit.nativeConfig.query("component[id=" + c + "].@class",null,this);
			if(t != null) {
				this._nativeClassName = c;
				break;
			}
			r = r.__super__;
			if(r == haxe_ui_core_Component) {
				break;
			}
		}
		if(this._nativeClassName == null) {
			this._nativeClassName = this.get_className();
		}
		return this._nativeClassName;
	}
	,registerBehaviours: function() {
		haxe_ui_core_ComponentBounds.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_ComponentBounds.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_backend_ComponentBase();
	}
	,__class__: haxe_ui_backend_ComponentBase
	,__properties__: $extend(haxe_ui_core_ComponentBounds.prototype.__properties__,{get_nativeClassName:"get_nativeClassName",get_nodeName:"get_nodeName",get_className:"get_className",get_hasNativeEntry:"get_hasNativeEntry",get_isScroller:"get_isScroller",get_isNativeScroller:"get_isNativeScroller"})
});
var haxe_ui_backend_ComponentImpl = function() {
	this._over = false;
	this._contextMenuDisabledCount = 0;
	this._canvas = null;
	haxe_ui_backend_ComponentBase.call(this);
	this._eventMap = new haxe_ds_StringMap();
	if(haxe_ui_backend_ComponentImpl._mutationObserver == null) {
		haxe_ui_backend_ComponentImpl._mutationObserver = new MutationObserver(haxe_ui_backend_ComponentImpl.onMutationEvent);
		haxe_ui_backend_ComponentImpl._mutationObserver.observe(haxe_ui_core_Screen.get_instance().get_container(),{ childList : true});
	}
	if(window.document.styleSheets.length == 0) {
		var style = window.document.createElement("style");
		style.appendChild(window.document.createTextNode(""));
		window.document.head.appendChild(style);
	}
	if(haxe_ui_backend_ComponentImpl._stylesAdded == false) {
		haxe_ui_backend_ComponentImpl._stylesAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		sheet.insertRule("#haxeui-container .haxeui-component, .haxeui-component:focus {\r\n                position: absolute;\r\n                box-sizing: border-box;\r\n                -webkit-touch-callout: none;\r\n                -webkit-user-select: none;\r\n                -khtml-user-select: none;\r\n                -moz-user-select: none;\r\n                -ms-user-select: none;\r\n                user-select: none;\r\n                -webkit-tap-highlight-color: transparent;\r\n                webkit-user-select;\r\n                outline: none !important;\r\n            }",sheet.cssRules.length);
		haxe_ui_core_Screen.get_instance().get_container().classList.add("haxeui-theme-" + haxe_ui_Toolkit.get_theme());
	}
};
$hxClasses["haxe.ui.backend.ComponentImpl"] = haxe_ui_backend_ComponentImpl;
haxe_ui_backend_ComponentImpl.__name__ = "haxe.ui.backend.ComponentImpl";
haxe_ui_backend_ComponentImpl.onMutationEvent = function(records,o) {
	var done = false;
	var _g = 0;
	while(_g < records.length) {
		var record = records[_g];
		++_g;
		var _g1 = 0;
		var _g2 = record.addedNodes.length;
		while(_g1 < _g2) {
			var i = _g1++;
			var node = record.addedNodes.item(i);
			var c = haxe_ui_backend_ComponentImpl.elementToComponent.h[node.__id__];
			if(c != null) {
				c.recursiveReady();
			}
		}
		if(done == true) {
			break;
		}
	}
};
haxe_ui_backend_ComponentImpl.__super__ = haxe_ui_backend_ComponentBase;
haxe_ui_backend_ComponentImpl.prototype = $extend(haxe_ui_backend_ComponentBase.prototype,{
	element: null
	,_eventMap: null
	,get_isNativeScroller: function() {
		return false;
	}
	,recursiveReady: function() {
		haxe_ui_backend_ComponentImpl.elementToComponent.remove(this.element);
		var component = js_Boot.__cast(this , haxe_ui_core_Component);
		if(!(component._layout == null || component._layoutLocked == true)) {
			component.invalidateComponent("layout",false);
		}
		component.ready();
		var _g = 0;
		var _g1 = component._children == null ? [] : component._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.recursiveReady();
		}
	}
	,handleCreate: function(native) {
		if(this.get_isScroller()) {
			if(this.element == null) {
				this.element = window.document.createElement("div");
			}
			this.element.scrollTop = 0;
			this.element.scrollLeft = 0;
			this.element.classList.add("haxeui-component");
			haxe_ui_backend_ComponentImpl.elementToComponent.set(this.element,js_Boot.__cast(this , haxe_ui_core_Component));
			return;
		}
		var newElement = window.document.createElement("div");
		newElement.classList.add("haxeui-component");
		if(((this) instanceof haxe_ui_components_Image)) {
			newElement.style.boxSizing = "initial";
		}
		if(this.element != null) {
			var p = this.element.parentElement;
			if(p != null) {
				haxe_ui_backend_ComponentImpl.elementToComponent.remove(this.element);
				p.replaceChild(newElement,this.element);
			}
		}
		this.element = newElement;
		haxe_ui_backend_ComponentImpl.elementToComponent.set(this.element,js_Boot.__cast(this , haxe_ui_core_Component));
		this.remapEvents();
	}
	,remapEvents: function() {
		if(this._eventMap == null) {
			return;
		}
		var copy_h = Object.create(null);
		var h = this._eventMap.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			var fn = this._eventMap.h[k];
			copy_h[k] = fn;
			this.unmapEvent(k,fn);
		}
		this._eventMap = new haxe_ds_StringMap();
		var h = copy_h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			this.mapEvent(k,copy_h[k]);
		}
	}
	,handlePosition: function(left,top,style) {
		if(this.element == null) {
			return;
		}
		if(left != null) {
			this.element.style.left = "" + left + "px";
		}
		if(top != null) {
			this.element.style.top = "" + top + "px";
		}
	}
	,handleSize: function(width,height,style) {
		if(width == null || height == null || width <= 0 || height <= 0) {
			return;
		}
		if(this.element == null) {
			return;
		}
		var c = js_Boot.__cast(this , haxe_ui_core_Component);
		var css = this.element.style;
		haxe_ui_backend_html5_StyleHelper.apply(this,width,height,style);
		var parent = c.parentComponent;
		if(parent != null && parent.element.style.borderWidth != null) {
			css.marginTop = "-" + parent.element.style.borderWidth;
			css.marginLeft = "-" + parent.element.style.borderWidth;
		} else if(parent != null) {
			css.marginTop = "";
			css.marginLeft = "";
		}
		var _g = 0;
		var _this = js_Boot.__cast(this , haxe_ui_core_Component);
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(style.borderLeftSize != null && style.borderLeftSize > 0) {
				child.element.style.marginLeft = "-" + style.borderLeftSize + "px";
			} else {
				child.element.style.marginLeft = "";
			}
			if(style.borderTopSize != null && style.borderTopSize > 0) {
				child.element.style.marginTop = "-" + style.borderTopSize + "px";
			} else {
				child.element.style.marginTop = "";
			}
		}
	}
	,handleReady: function() {
		if((js_Boot.__cast(this , haxe_ui_core_Component)).get_id() != null) {
			this.element.id = (js_Boot.__cast(this , haxe_ui_core_Component)).get_id();
		}
	}
	,handleFrameworkProperty: function(id,value) {
		if(id == "allowMouseInteraction") {
			if(value == true && this.element.style.getPropertyValue("pointer-events") != null) {
				this.element.style.removeProperty("pointer-events");
			} else if(this.element.style.getPropertyValue("pointer-events") != "none") {
				this.element.style.setProperty("pointer-events","none");
				this.setCursor(null);
			}
		}
	}
	,handleClipRect: function(value) {
		var c = js_Boot.__cast(this , haxe_ui_core_Component);
		var parent = c.parentComponent;
		value.toInts();
		if(value != null && parent != null) {
			var tmp = "rect(" + ("" + value.top + "px") + "," + ("" + value.get_right() + "px") + "," + ("" + value.get_bottom() + "px") + ",";
			this.element.style.clip = tmp + ("" + value.left + "px") + ")";
			var tmp = "" + (c.get_left() - value.left | 0) + "px";
			this.element.style.left = "" + tmp;
			var tmp = "" + (c.get_top() - value.top | 0) + "px";
			this.element.style.top = "" + tmp;
		} else {
			this.element.style.removeProperty("clip");
		}
	}
	,handleVisibility: function(show) {
		this.element.style.display = show == true ? "" : "none";
	}
	,createTextDisplay: function(text) {
		if(this._textDisplay == null) {
			haxe_ui_backend_ComponentBase.prototype.createTextDisplay.call(this,text);
			this.element.appendChild(this._textDisplay.element);
		}
		return this._textDisplay;
	}
	,createTextInput: function(text) {
		if(this._textInput == null) {
			haxe_ui_backend_ComponentBase.prototype.createTextInput.call(this,text);
			this.element.appendChild(this._textInput.element);
		}
		return this._textInput;
	}
	,createImageDisplay: function() {
		if(this._imageDisplay == null) {
			haxe_ui_backend_ComponentBase.prototype.createImageDisplay.call(this);
			this.element.appendChild(this._imageDisplay.element);
		}
		return this._imageDisplay;
	}
	,handleSetComponentIndex: function(child,index) {
		if(index == (this._children == null ? [] : this._children).length - 1) {
			this.element.appendChild(child.element);
		} else if(index == (this._children == null ? [] : this._children).indexOf(child) - 1) {
			var before = (this._children == null ? [] : this._children)[index];
			haxe_ui_backend_html5_HtmlUtils.insertBefore(before.element,child.element);
		} else {
			var before = (this._children == null ? [] : this._children)[index + 1];
			haxe_ui_backend_html5_HtmlUtils.insertBefore(before.element,child.element);
		}
	}
	,handleAddComponent: function(child) {
		this.element.appendChild(child.element);
		return child;
	}
	,handleAddComponentAt: function(child,index) {
		this.handleAddComponent(child);
		this.handleSetComponentIndex(child,index);
		return child;
	}
	,handleRemoveComponent: function(child,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		haxe_ui_backend_html5_HtmlUtils.removeElement(child.element);
		return child;
	}
	,handleRemoveComponentAt: function(index,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		var child = (js_Boot.__cast(this , haxe_ui_core_Component))._children[index];
		haxe_ui_backend_html5_HtmlUtils.removeElement(child.element);
		return child;
	}
	,applyStyle: function(style) {
		if(this.element == null) {
			return;
		}
		this.setCursor(style.cursor);
		if(style.filter != null) {
			if(((style.filter[0]) instanceof haxe_ui_filters_DropShadow)) {
				var dropShadow = style.filter[0];
				if(dropShadow.inner == false) {
					var tmp = "" + dropShadow.distance + "px " + (dropShadow.distance + 2) + "px " + (dropShadow.blurX - 1) + "px " + (dropShadow.blurY - 1) + "px ";
					var tmp1 = haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha);
					this.element.style.boxShadow = tmp + tmp1;
				} else {
					var tmp = "inset " + dropShadow.distance + "px " + dropShadow.distance + "px " + dropShadow.blurX + "px 0px ";
					var tmp1 = haxe_ui_backend_html5_HtmlUtils.rgba(dropShadow.color,dropShadow.alpha);
					this.element.style.boxShadow = tmp + tmp1;
				}
			} else if(((style.filter[0]) instanceof haxe_ui_filters_Blur)) {
				var blur = style.filter[0];
				this.element.style.setProperty("-webkit-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("-moz-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("-o-filter","blur(" + blur.amount + "px)");
				this.element.style.setProperty("filter","blur(" + blur.amount + "px)");
			} else if(((style.filter[0]) instanceof haxe_ui_filters_Grayscale)) {
				var grayscale = style.filter[0];
				this.element.style.setProperty("-webkit-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("-moz-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("-o-filter","grayscale(" + grayscale.amount + "%)");
				this.element.style.setProperty("filter","grayscale(" + grayscale.amount + "%)");
			}
		} else {
			this.element.style.filter = null;
			this.element.style.boxShadow = null;
			this.element.style.removeProperty("box-shadow");
			this.element.style.removeProperty("-webkit-filter");
			this.element.style.removeProperty("-moz-filter");
			this.element.style.removeProperty("-o-filter");
			this.element.style.removeProperty("filter");
		}
		if(style.backdropFilter != null) {
			if(((style.backdropFilter[0]) instanceof haxe_ui_filters_Blur)) {
				var blur = style.backdropFilter[0];
				this.element.style.setProperty("backdrop-filter","blur(" + blur.amount + "px)");
			}
		} else {
			this.element.style.removeProperty("backdrop-filter");
		}
		if(style.opacity != null) {
			this.element.style.opacity = "" + style.opacity;
		}
		if(style.fontName != null) {
			this.element.style.fontFamily = style.fontName;
		}
		if(style.fontSize != null) {
			this.element.style.fontSize = "" + style.fontSize + "px";
		}
		if(style.color != null) {
			this.element.style.color = haxe_ui_backend_html5_HtmlUtils.color(style.color);
		}
		if(this.hasImageDisplay()) {
			this._imageDisplay.applyStyle();
		}
	}
	,setCursor: function(cursor) {
		var tmp = cursor == null;
		if(cursor == null) {
			this.element.style.removeProperty("cursor");
			if(this.hasImageDisplay()) {
				this.getImageDisplay().element.style.removeProperty("cursor");
			}
		} else {
			this.element.style.cursor = cursor;
			if(this.hasImageDisplay()) {
				this.getImageDisplay().element.style.cursor = cursor;
			}
			if(this.hasTextDisplay()) {
				this.getTextDisplay().element.style.cursor = cursor;
			}
		}
		var _g = 0;
		var _this = js_Boot.__cast(this , haxe_ui_core_Component);
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.element.style.cursor == null) {
				c.setCursor("inherit");
			}
		}
	}
	,_canvas: null
	,getCanvas: function(width,height) {
		if(this._canvas == null) {
			this._canvas = window.document.createElement("canvas");
			this._canvas.style.setProperty("-webkit-backface-visibility","hidden");
			this._canvas.style.setProperty("-moz-backface-visibility","hidden");
			this._canvas.style.setProperty("-ms-backface-visibility","hidden");
			this._canvas.style.position = "absolute";
			this._canvas.style.setProperty("pointer-events","none");
			this._canvas.width = width;
			this._canvas.height = height;
			this.element.insertBefore(this._canvas,this.element.firstChild);
		}
		if(width != this._canvas.width) {
			this._canvas.width = width;
		}
		if(height != this._canvas.height) {
			this._canvas.height = height;
		}
		return this._canvas;
	}
	,hasCanvas: function() {
		return this._canvas != null;
	}
	,removeCanvas: function() {
		if(this._canvas != null && this.element.contains(this._canvas)) {
			this.element.removeChild(this._canvas);
			this._canvas = null;
		}
	}
	,mapEvent: function(type,listener) {
		switch(type) {
		case "change":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				if(this.hasTextInput() == true) {
					this._eventMap.h[type] = listener;
					var tmp = haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["keyup"];
					this.getTextInput().element.addEventListener(tmp,$bind(this,this.__onTextFieldChangeEvent));
				}
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightmousedown":case "rightmouseup":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
					var passive = false;
					if(passive == null) {
						passive = true;
					}
					this.element.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent),{ passive : passive});
				}
				this._eventMap.h[type] = listener;
				this.element.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
				if(type == "rightmousedown" || type == "rightmouseup") {
					this.disableContextMenu(true);
				}
			}
			break;
		case "keydown":case "keyup":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				this._eventMap.h[type] = listener;
				this.element.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyboardEvent));
			}
			break;
		case "mousewheel":
			this._eventMap.h[type] = listener;
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) {
				this.element.addEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent));
			} else {
				this.element.addEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			}
			break;
		case "rightclick":
			if(Object.prototype.hasOwnProperty.call(this._eventMap.h,type) == false) {
				this._eventMap.h[type] = listener;
				this.element.addEventListener("contextmenu",$bind(this,this.__onContextMenu));
			}
			break;
		case "scrollchange":
			this._eventMap.h[type] = listener;
			this.element.addEventListener("scroll",$bind(this,this.__onScrollEvent));
			break;
		}
	}
	,unmapEvent: function(type,listener) {
		switch(type) {
		case "change":
			if(this.hasTextInput()) {
				var _this = this._eventMap;
				if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
					delete(_this.h[type]);
				}
				var tmp = haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h["keyup"];
				this.getTextInput().element.removeEventListener(tmp,$bind(this,this.__onTextFieldChangeEvent));
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightmousedown":case "rightmouseup":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
				this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
			}
			if(type == "rightmousedown" || type == "rightmouseup") {
				this.disableContextMenu(false);
			}
			break;
		case "keydown":case "keyup":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyboardEvent));
			break;
		case "mousewheel":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			if(haxe_ui_backend_html5_UserAgent.get_instance().get_firefox() == true) {
				this.element.removeEventListener("DOMMouseScroll",$bind(this,this.__onMouseWheelEvent));
			} else {
				this.element.removeEventListener("mousewheel",$bind(this,this.__onMouseWheelEvent));
			}
			break;
		case "rightclick":
			var _this = this._eventMap;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			this.element.removeEventListener("contextmenu",$bind(this,this.__onContextMenu));
			break;
		}
	}
	,_contextMenuDisabledCount: null
	,disableContextMenu: function(disable) {
		if(disable == true) {
			this._contextMenuDisabledCount++;
		} else {
			this._contextMenuDisabledCount--;
			if(this._contextMenuDisabledCount < 0) {
				this._contextMenuDisabledCount = 0;
			}
		}
		if(this._contextMenuDisabledCount == 1) {
			this.element.addEventListener("contextmenu",$bind(this,this.__preventContextMenu));
		} else if(this._contextMenuDisabledCount == 0) {
			this.element.removeEventListener("contextmenu",$bind(this,this.__preventContextMenu));
		}
	}
	,__preventContextMenu: function(event) {
		event.preventDefault();
		return false;
	}
	,__onContextMenu: function(event) {
		event.preventDefault();
		var type = "rightclick";
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var uiEvent = new haxe_ui_events_MouseEvent(type);
				uiEvent.screenX = event.pageX;
				uiEvent.screenY = event.pageY;
				fn(uiEvent);
			}
		}
		return false;
	}
	,__onChangeEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var uiEvent = new haxe_ui_events_UIEvent(type);
				fn(uiEvent);
			}
		}
	}
	,__onTextFieldChangeEvent: function(event) {
		var fn = this._eventMap.h["change"];
		if(fn != null) {
			var uiEvent = new haxe_ui_events_UIEvent("change");
			fn(uiEvent);
		}
	}
	,_over: null
	,__onMouseEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			if(event.type == "mousedown") {
				var which = Reflect.field(event,"which");
				switch(which) {
				case 1:
					type = "mousedown";
					break;
				case 2:
					type = "mousedown";
					break;
				case 3:
					type = "rightmousedown";
					break;
				}
			} else if(event.type == "mouseup") {
				var which = Reflect.field(event,"which");
				switch(which) {
				case 1:
					type = "mouseup";
					break;
				case 2:
					type = "mouseup";
					break;
				case 3:
					type = "rightmouseup";
					break;
				}
			}
			try {
				var tmp = type == "mousedown";
			} catch( _g ) {
			}
			var tmp = type == "rightmousedown";
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var mouseEvent = new haxe_ui_events_MouseEvent(type);
				mouseEvent._originalEvent = event;
				var touchEvent = false;
				try {
					touchEvent = ((event) instanceof TouchEvent);
				} catch( _g ) {
				}
				if(touchEvent == true) {
					var te = js_Boot.__cast(event , TouchEvent);
					mouseEvent.screenX = (te.changedTouches[0].pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (te.changedTouches[0].pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.touchEvent = true;
				} else if(((event) instanceof MouseEvent)) {
					var me = js_Boot.__cast(event , MouseEvent);
					mouseEvent.buttonDown = me.buttons != 0;
					mouseEvent.screenX = (me.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (me.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.ctrlKey = me.ctrlKey;
					mouseEvent.shiftKey = me.shiftKey;
				}
				if(type == "mouseover") {
					this._over = true;
				} else if(type == "mouseout") {
					this._over = false;
				}
				fn(mouseEvent);
			}
		}
	}
	,getComponentOffset: function() {
		return new haxe_ui_geom_Point(0,0);
	}
	,__onMouseWheelEvent: function(event) {
		var fn = this._eventMap.h["mousewheel"];
		if(fn == null) {
			return;
		}
		var delta = 0;
		if(Reflect.field(event,"wheelDelta") != null) {
			delta = Reflect.field(event,"wheelDelta");
		} else if(((event) instanceof WheelEvent)) {
			delta = (js_Boot.__cast(event , WheelEvent)).deltaY;
		} else {
			delta = -event.detail;
		}
		delta = Math.max(-1,Math.min(1,delta));
		var mouseEvent = new haxe_ui_events_MouseEvent("mousewheel");
		mouseEvent._originalEvent = event;
		mouseEvent.screenX = (event.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
		mouseEvent.screenY = (event.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
		mouseEvent.ctrlKey = event.ctrlKey;
		mouseEvent.shiftKey = event.shiftKey;
		mouseEvent.delta = delta;
		fn(mouseEvent);
	}
	,__onKeyboardEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			var fn = this._eventMap.h[type];
			if(fn != null) {
				var keyboardEvent = new haxe_ui_events_KeyboardEvent(type);
				keyboardEvent._originalEvent = event;
				if(((event) instanceof KeyboardEvent)) {
					var me = js_Boot.__cast(event , KeyboardEvent);
					keyboardEvent.keyCode = me.keyCode;
					keyboardEvent.altKey = me.altKey;
					keyboardEvent.ctrlKey = me.ctrlKey;
					keyboardEvent.shiftKey = me.shiftKey;
				}
				fn(keyboardEvent);
			}
		}
	}
	,__onScrollEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		var fn = this._eventMap.h[type];
		if(fn != null) {
			var scrollEvent = new haxe_ui_events_ScrollEvent("scrollchange");
			fn(scrollEvent);
		}
	}
	,registerBehaviours: function() {
		haxe_ui_backend_ComponentBase.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_backend_ComponentBase.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_backend_ComponentImpl();
	}
	,__class__: haxe_ui_backend_ComponentImpl
});
var haxe_ui_validation_IValidating = function() { };
$hxClasses["haxe.ui.validation.IValidating"] = haxe_ui_validation_IValidating;
haxe_ui_validation_IValidating.__name__ = "haxe.ui.validation.IValidating";
haxe_ui_validation_IValidating.__isInterface__ = true;
haxe_ui_validation_IValidating.prototype = {
	get_depth: null
	,set_depth: null
	,get_id: null
	,set_id: null
	,get_isComponentOffscreen: null
	,validateComponent: null
	,updateComponentDisplay: null
	,isComponentOffscreen: null
	,__class__: haxe_ui_validation_IValidating
	,__properties__: {get_isComponentOffscreen:"get_isComponentOffscreen",set_id:"set_id",get_id:"get_id",set_depth:"set_depth",get_depth:"get_depth"}
};
var haxe_ui_core_Component = function() {
	this._pauseAnimationStyleChanges = false;
	this._initialSizeApplied = false;
	this._scriptAccess = true;
	this._includeInLayout = true;
	this._styleSheet = null;
	this._cachedStyleSheetRef = null;
	this._useCachedStyleSheetRef = false;
	this._styleNamesList = null;
	this._styleNames = null;
	this.cascadeActive = false;
	this.classes = [];
	this._customStyle = null;
	this._hidden = false;
	this.bindingRoot = false;
	this._dragOptions = null;
	this._dragInitiator = null;
	this.userData = null;
	this._animatable = true;
	this._native = null;
	this._defaultLayoutClass = null;
	this.componentTabIndex = 0;
	haxe_ui_backend_ComponentImpl.call(this);
	this.addClass(haxe_ui_Backend.get_id(),false);
	var c = js_Boot.getClass(this);
	while(c != null) {
		var css = c.__name__;
		var className = css.split(".").pop();
		this.addClass(className.toLowerCase(),false);
		this.addClass(haxe_ui_util_StringUtil.toDashes(className),false);
		if(className.toLowerCase() == "component") {
			break;
		}
		c = c.__super__;
	}
	var s = haxe_ui_Toolkit.styleSheet.buildStyleFor(this);
	if(s.native != null && this.get_hasNativeEntry() == true) {
		this.set_native(s.native);
	} else {
		this.create();
	}
	if(haxe_ui_Toolkit.get_initialized() == false) {
		haxe_Log.trace("WARNING: You are trying to create a component before the toolkit has been initialized. This could have undefined results.",{ fileName : "haxe/ui/core/Component.hx", lineNumber : 82, className : "haxe.ui.core.Component", methodName : "new"});
	}
};
$hxClasses["haxe.ui.core.Component"] = haxe_ui_core_Component;
haxe_ui_core_Component.__name__ = "haxe.ui.core.Component";
haxe_ui_core_Component.__interfaces__ = [haxe_ui_validation_IValidating];
haxe_ui_core_Component.addNamedComponentsFrom = function(parent,list) {
	if(parent == null) {
		return;
	}
	if(parent.get_id() != null) {
		list.push(parent);
	}
	var _g = 0;
	var _g1 = parent._children == null ? [] : parent._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_core_Component.addNamedComponentsFrom(child,list);
	}
};
haxe_ui_core_Component.__super__ = haxe_ui_backend_ComponentImpl;
haxe_ui_core_Component.prototype = $extend(haxe_ui_backend_ComponentImpl.prototype,{
	componentTabIndex: null
	,_defaultLayoutClass: null
	,create: function() {
		if(this.get_native() == false || this.get_native() == null) {
			this.registerComposite();
		}
		this.createDefaults();
		this.handleCreate(this.get_native());
		this.destroyChildren();
		this.registerBehaviours();
		this.behaviours.replaceNative();
		if(this.get_native() == false || this.get_native() == null) {
			if(this._compositeBuilderClass != null) {
				if(this._compositeBuilder == null) {
					this._compositeBuilder = Type.createInstance(this._compositeBuilderClass,[this]);
				}
				this._compositeBuilder.create();
			}
			this.createChildren();
			if(this._internalEventsClass != null && this._internalEvents == null) {
				this.registerInternalEvents(this._internalEventsClass);
			}
		} else {
			var builderClass = this.getNativeConfigProperty(".builder.@class");
			if(builderClass != null) {
				if(this._compositeBuilder == null) {
					this._compositeBuilder = Type.createInstance($hxClasses[builderClass],[this]);
				}
				this._compositeBuilder.create();
			}
		}
		this.behaviours.applyDefaults();
	}
	,_compositeBuilderClass: null
	,_compositeBuilder: null
	,registerComposite: function() {
	}
	,createDefaults: function() {
	}
	,createChildren: function() {
	}
	,destroyChildren: function() {
		this.unregisterInternalEvents();
	}
	,createLayout: function() {
		var l = null;
		if(this.get_native() == true) {
			var sizeProps = this.getNativeConfigProperties(".size");
			if(sizeProps != null && Object.prototype.hasOwnProperty.call(sizeProps.h,"class")) {
				var name = sizeProps.h["class"];
				var size = Type.createInstance($hxClasses[name],[]);
				size.config = sizeProps;
				l = new haxe_ui_layouts_DelegateLayout(size);
			} else {
				var layoutProps = this.getNativeConfigProperties(".layout");
				if(layoutProps != null && Object.prototype.hasOwnProperty.call(layoutProps.h,"class")) {
					var name = layoutProps.h["class"];
					l = Type.createInstance($hxClasses[name],[]);
				}
			}
		}
		if(l == null) {
			if(this._defaultLayoutClass != null) {
				l = Type.createInstance(this._defaultLayoutClass,[]);
			} else {
				l = new haxe_ui_layouts_DefaultLayout();
			}
		}
		return l;
	}
	,_native: null
	,get_native: function() {
		if(this._native == null) {
			return false;
		}
		if(this.get_hasNativeEntry() == false) {
			return false;
		}
		return this._native;
	}
	,set_native: function(value) {
		if(this.get_hasNativeEntry() == false) {
			return value;
		}
		if(this._native == value) {
			return value;
		}
		this._native = value;
		this.get_customStyle().native = value;
		if(this._native == true && this.get_hasNativeEntry()) {
			this.addClass(":native");
		} else {
			this.removeClass(":native");
		}
		this.behaviours.cache();
		this.behaviours.detatch();
		this.create();
		if(this.get_layout() != null) {
			this.set_layout(this.createLayout());
		}
		this.behaviours.restore();
		return value;
	}
	,_animatable: null
	,get_animatable: function() {
		return false;
	}
	,set_animatable: function(value) {
		if(this._animatable != value) {
			if(value == false && this._componentAnimation != null) {
				this._componentAnimation.stop();
				this._componentAnimation = null;
			}
			this._animatable = value;
		}
		this._animatable = value;
		return value;
	}
	,_componentAnimation: null
	,get_componentAnimation: function() {
		return this._componentAnimation;
	}
	,set_componentAnimation: function(value) {
		if(this._componentAnimation != value && this._animatable == true) {
			if(this._componentAnimation != null) {
				this._componentAnimation.stop();
			}
			this._componentAnimation = value;
		}
		return value;
	}
	,userData: null
	,screen: null
	,get_screen: function() {
		return haxe_ui_Toolkit.get_screen();
	}
	,get_draggable: function() {
		return haxe_ui_dragdrop_DragManager.get_instance().isRegisteredDraggable(this);
	}
	,set_draggable: function(value) {
		if(value == true) {
			haxe_ui_dragdrop_DragManager.get_instance().registerDraggable(this,this.get_dragOptions());
		} else {
			haxe_ui_dragdrop_DragManager.get_instance().unregisterDraggable(this);
		}
		return value;
	}
	,_dragInitiator: null
	,get_dragInitiator: function() {
		return this._dragInitiator;
	}
	,set_dragInitiator: function(value) {
		this._dragInitiator = value;
		if(value != null) {
			if(this._dragOptions != null) {
				this._dragOptions.mouseTarget = value;
			}
			this.set_draggable(true);
		} else {
			this.set_draggable(false);
		}
		return value;
	}
	,_dragOptions: null
	,get_dragOptions: function() {
		if(this._dragOptions == null) {
			this._dragOptions = { mouseTarget : this._dragInitiator};
		}
		return this._dragOptions;
	}
	,set_dragOptions: function(value) {
		this._dragOptions = value;
		this.set_draggable(true);
		return value;
	}
	,bindingRoot: null
	,get_rootComponent: function() {
		var r = this;
		while(r.parentComponent != null) r = r.parentComponent;
		return r;
	}
	,get_numComponents: function() {
		var n = 0;
		if(this._compositeBuilder != null) {
			var builderCount = this._compositeBuilder.get_numComponents();
			if(builderCount != null) {
				n = builderCount;
			} else if(this._children != null) {
				n = this._children.length;
			}
		} else if(this._children != null) {
			n = this._children.length;
		}
		return n;
	}
	,addComponent: function(child) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.addComponent(child);
			if(v != null) {
				v.set_scriptAccess(this.get_scriptAccess());
				return v;
			}
		}
		if(this.get_native() == true) {
			var allowChildren = this.getNativeConfigPropertyBool(".@allowChildren",true);
			if(allowChildren == false) {
				return child;
			}
		}
		child.parentComponent = this;
		child._isDisposed = false;
		if(this._children == null) {
			this._children = [];
		}
		this._children.push(child);
		this.handleAddComponent(child);
		if(this._ready) {
			child.ready();
		}
		this.assignPositionClasses();
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		if(this.get_disabled()) {
			child.set_disabled(true);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentAdded(child);
		}
		this.onComponentAdded(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentadded"));
		child.dispatch(new haxe_ui_events_UIEvent("componentaddedtoparent"));
		child.set_scriptAccess(this.get_scriptAccess());
		return child;
	}
	,containsComponent: function(child) {
		if(child == null) {
			return false;
		}
		var contains = false;
		this.walkComponents(function(c) {
			if(child == c) {
				contains = true;
			}
			return !contains;
		});
		return contains;
	}
	,addComponentAt: function(child,index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.addComponentAt(child,index);
			if(v != null) {
				v.set_scriptAccess(this.get_scriptAccess());
				return v;
			}
		}
		if(this.get_native() == true) {
			var allowChildren = this.getNativeConfigPropertyBool(".@allowChildren",true);
			if(allowChildren == false) {
				return child;
			}
		}
		child.parentComponent = this;
		child._isDisposed = false;
		if(this._children == null) {
			this._children = [];
		}
		this._children.splice(index,0,child);
		this.handleAddComponentAt(child,index);
		if(this._ready) {
			child.ready();
		}
		this.assignPositionClasses();
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		if(this.get_disabled()) {
			child.set_disabled(true);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentAdded(child);
		}
		this.onComponentAdded(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentadded"));
		child.dispatch(new haxe_ui_events_UIEvent("componentaddedtoparent"));
		child.set_scriptAccess(this.get_scriptAccess());
		return child;
	}
	,onComponentAdded: function(child) {
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		if(child == null) {
			return null;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.removeComponent(child,dispose,invalidate);
			if(v != null) {
				return v;
			}
		}
		if(this._children != null) {
			if(this._children.indexOf(child) == -1) {
				var childId = child.get_className();
				if(child.get_id() != null) {
					childId += "#" + child.get_id();
				}
				var thisId = this.get_className();
				if(this.get_id() != null) {
					thisId += "#" + this.get_id();
				}
				haxe_Log.trace("WARNING: trying to remove a child (" + childId + ") that is not a child of this component (" + thisId + ")",{ fileName : "haxe/ui/core/Component.hx", lineNumber : 540, className : "haxe.ui.core.Component", methodName : "removeComponent"});
				return child;
			}
			if(HxOverrides.remove(this._children,child)) {
				child.parentComponent = null;
				child.set_depth(-1);
			}
			if(dispose == true) {
				child.disposeComponent();
			}
		}
		this.handleRemoveComponent(child,dispose);
		this.assignPositionClasses(invalidate);
		if(this._children != null && invalidate == true) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentRemoved(child);
		}
		this.onComponentRemoved(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentremoved"));
		child.dispatch(new haxe_ui_events_UIEvent("componentremovedfromparent"));
		return child;
	}
	,disposeComponent: function() {
		this._isDisposed = true;
		this.removeAllComponents(true);
		this.destroyComponent();
		this.unregisterEvents();
		if(this.hasTextDisplay()) {
			this.getTextDisplay().dispose();
		}
		if(this.hasTextInput()) {
			this.getTextInput().dispose();
		}
		if(this.hasImageDisplay()) {
			this.getImageDisplay().dispose();
		}
		if(this.behaviours != null) {
			this.behaviours.dispose();
			this.behaviours = null;
		}
		if(this._layout != null) {
			this._layout.set_component(null);
			this._layout = null;
		}
		if(this._internalEvents != null) {
			this._internalEvents._target = null;
			this._internalEvents = null;
		}
		this.parentComponent = null;
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		if(this._children == null) {
			return null;
		}
		var childCount = this._children.length;
		if(this._compositeBuilder != null) {
			var compositeChildCount = this._compositeBuilder.get_numComponents();
			if(compositeChildCount != null) {
				childCount = compositeChildCount;
			}
		}
		if(index < 0 || index > childCount - 1) {
			return null;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.removeComponentAt(index,dispose,invalidate);
			if(v != null) {
				return v;
			}
		}
		var child = this._children[index];
		if(child == null) {
			return null;
		}
		if(dispose == true) {
			child._isDisposed = true;
			child.removeAllComponents(true);
		}
		this.handleRemoveComponentAt(index,dispose);
		if(HxOverrides.remove(this._children,child)) {
			child.parentComponent = null;
			child.set_depth(-1);
		}
		if(dispose == true) {
			child.destroyComponent();
			child.unregisterEvents();
		}
		this.assignPositionClasses(invalidate);
		if(invalidate == true) {
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onComponentRemoved(child);
		}
		this.onComponentRemoved(child);
		this.dispatch(new haxe_ui_events_UIEvent("componentremoved"));
		child.dispatch(new haxe_ui_events_UIEvent("componentremovedfromparent"));
		return child;
	}
	,onComponentRemoved: function(child) {
	}
	,assignPositionClasses: function(invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if((this._children == null ? [] : this._children).length == 1) {
			(this._children == null ? [] : this._children)[0].addClasses(["first","last"],invalidate);
			return;
		}
		var _g = 0;
		var _g1 = (this._children == null ? [] : this._children).length;
		while(_g < _g1) {
			var i = _g++;
			var c = (this._children == null ? [] : this._children)[i];
			if(i == 0) {
				c.swapClass("first","last",invalidate);
			} else if((this._children == null ? [] : this._children).length > 1 && i == (this._children == null ? [] : this._children).length - 1) {
				c.swapClass("last","first",invalidate);
			} else {
				c.removeClasses(["first","last"],invalidate);
			}
		}
	}
	,destroyComponent: function() {
		if(this._compositeBuilder != null) {
			this._compositeBuilder.destroy();
		}
		haxe_ui_locale_LocaleManager.get_instance().unregisterComponent(this);
		this.onDestroy();
	}
	,onDestroy: function() {
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.onDestroy();
		}
		this.dispatch(new haxe_ui_events_UIEvent("destroy"));
	}
	,walkComponents: function(callback) {
		if(callback(this) == false) {
			return;
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var cont = [true];
			child.walkComponents((function(cont) {
				return function(c) {
					cont[0] = callback(c);
					return cont[0];
				};
			})(cont));
			if(cont[0] == false) {
				break;
			}
		}
	}
	,removeAllComponents: function(dispose) {
		if(dispose == null) {
			dispose = true;
		}
		if(this._compositeBuilder != null) {
			var b = this._compositeBuilder.removeAllComponents(dispose);
			if(b == true) {
				return;
			}
		}
		if(this._children != null) {
			while(this._children.length > 0) {
				this._children[0].removeAllComponents(dispose);
				this.removeComponent(this._children[0],dispose,false);
			}
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
	}
	,matchesSearch: function(criteria,type,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(criteria != null) {
			if(searchType == "id" && this.get_id() == criteria || searchType == "css" && this.classes.indexOf(criteria) != -1 == true) {
				if(type != null) {
					return js_Boot.__instanceof(this,type);
				}
				return true;
			}
		} else if(type != null) {
			return js_Boot.__instanceof(this,type);
		}
		return false;
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(recursive == null && criteria != null && searchType == "id") {
			recursive = true;
		}
		var match = null;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.matchesSearch(criteria,type,searchType)) {
				match = child;
				break;
			}
		}
		if(match == null && recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				var temp = child.findComponent(criteria,type,recursive,searchType);
				if(temp != null) {
					match = temp;
					break;
				}
			}
			if(match == null && this._compositeBuilder != null) {
				match = this._compositeBuilder.findComponent(criteria,type,recursive,searchType);
			}
		}
		return match;
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		if(maxDepth == -1) {
			maxDepth = 100;
		}
		if(maxDepth <= 0) {
			return [];
		}
		--maxDepth;
		var r = [];
		if(this._compositeBuilder != null) {
			var childArray = this._compositeBuilder.findComponents(styleName,type,maxDepth);
			if(childArray != null) {
				var _g = 0;
				while(_g < childArray.length) {
					var c = childArray[_g];
					++_g;
					r.push(c);
				}
			}
		}
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var match = true;
			if(styleName != null && child.classes.indexOf(styleName) != -1 == false) {
				match = false;
			}
			if(type != null && js_Boot.__instanceof(child,type) == false) {
				match = false;
			}
			if(match == true) {
				r.push(child);
			} else {
				var childArray = child.findComponents(styleName,type,maxDepth);
				var _g2 = 0;
				while(_g2 < childArray.length) {
					var c = childArray[_g2];
					++_g2;
					r.push(c);
				}
			}
		}
		return r;
	}
	,findAncestor: function(criteria,type,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		var match = null;
		var p = this.parentComponent;
		while(p != null) if(p.matchesSearch(criteria,type,searchType)) {
			match = p;
			break;
		} else {
			p = p.parentComponent;
		}
		return match;
	}
	,findComponentsUnderPoint: function(screenX,screenY,type) {
		var c = [];
		if(this.hitTest(screenX,screenY,false)) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.hitTest(screenX,screenY,false)) {
					var match = true;
					if(type != null && js_Boot.__instanceof(child,type) == false) {
						match = false;
					}
					if(match == true) {
						c.push(child);
					}
					c = c.concat(child.findComponentsUnderPoint(screenX,screenY,type));
				}
			}
		}
		return c;
	}
	,hasComponentUnderPoint: function(screenX,screenY,type) {
		var b = false;
		if(this.hitTest(screenX,screenY,false)) {
			if(type == null) {
				return true;
			}
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.hitTest(screenX,screenY,false)) {
					var match = true;
					if(type != null && js_Boot.__instanceof(child,type) == false) {
						match = false;
					}
					if(match == false) {
						match = child.hasComponentUnderPoint(screenX,screenY,type);
					}
					if(match == true) {
						b = match;
						break;
					}
				}
			}
		}
		return b;
	}
	,getComponentIndex: function(child) {
		if(this._compositeBuilder != null) {
			var index = this._compositeBuilder.getComponentIndex(child);
			if(index != -2147483648) {
				return index;
			}
		}
		var index = -1;
		if(this._children != null && child != null) {
			index = this._children.indexOf(child);
		}
		return index;
	}
	,setComponentIndex: function(child,index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.setComponentIndex(child,index);
			if(v != null) {
				return v;
			}
		}
		if(index >= 0 && index <= this._children.length && child.parentComponent == this) {
			this.handleSetComponentIndex(child,index);
			HxOverrides.remove(this._children,child);
			this._children.splice(index,0,child);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
		}
		return child;
	}
	,getComponentAt: function(index) {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.getComponentAt(index);
			if(v != null) {
				return v;
			}
		}
		if(this._children == null) {
			return null;
		}
		return this._children[index];
	}
	,hide: function() {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.hide();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == false) {
			this._hidden = true;
			this.handleVisibility(false);
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.dispatchRecursively(new haxe_ui_events_UIEvent("hidden"));
		}
	}
	,hideInternal: function(dispatchChildren) {
		if(dispatchChildren == null) {
			dispatchChildren = false;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.hide();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == false) {
			this._hidden = true;
			this.handleVisibility(false);
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			if(dispatchChildren == true) {
				this.dispatchRecursively(new haxe_ui_events_UIEvent("hidden"));
			} else {
				this.dispatch(new haxe_ui_events_UIEvent("hidden"));
			}
		}
	}
	,show: function() {
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.show();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == true) {
			this._hidden = false;
			this.handleVisibility(true);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.dispatchRecursively(new haxe_ui_events_UIEvent("shown"));
		}
	}
	,showInternal: function(dispatchChildren) {
		if(dispatchChildren == null) {
			dispatchChildren = false;
		}
		if(this._compositeBuilder != null) {
			var v = this._compositeBuilder.show();
			if(v == true) {
				return;
			}
		}
		if(this._hidden == true) {
			this._hidden = false;
			this.handleVisibility(true);
			if(!(this._layout == null || this._layoutLocked == true)) {
				this.invalidateComponent("layout",false);
			}
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			if(dispatchChildren == true) {
				this.dispatchRecursively(new haxe_ui_events_UIEvent("shown"));
			} else {
				this.dispatch(new haxe_ui_events_UIEvent("shown"));
			}
		}
	}
	,fadeIn: function(onEnd,show) {
		if(show == null) {
			show = true;
		}
		var _gthis = this;
		if(onEnd != null || show == true) {
			var prevStart = this.onAnimationStart;
			var prevEnd = this.onAnimationEnd;
			if(show == true) {
				prevStart = this.onAnimationStart;
				this.set_onAnimationStart(function(e) {
					_gthis.show();
					_gthis.set_onAnimationStart(prevStart);
				});
			}
			this.set_onAnimationEnd(function(e) {
				if(onEnd != null) {
					onEnd();
				}
				_gthis.removeClass("fade-in");
				_gthis.set_onAnimationEnd(prevEnd);
			});
		}
		this.swapClass("fade-in","fade-out");
	}
	,fadeOut: function(onEnd,hide) {
		if(hide == null) {
			hide = true;
		}
		var _gthis = this;
		if(onEnd != null || hide == true) {
			var prevEnd = this.onAnimationEnd;
			this.set_onAnimationEnd(function(e) {
				if(hide == true) {
					_gthis.hide();
				}
				if(onEnd != null) {
					onEnd();
				}
				_gthis.set_onAnimationEnd(prevEnd);
				_gthis.removeClass("fade-out");
			});
		}
		this.swapClass("fade-out","fade-in");
	}
	,_hidden: null
	,get_hidden: function() {
		if(this._hidden == true) {
			return true;
		}
		if(this.parentComponent != null) {
			return this.parentComponent.get_hidden();
		}
		return false;
	}
	,set_hidden: function(value) {
		if(value == this._hidden) {
			return value;
		}
		if(value == true) {
			this.hide();
		} else {
			this.show();
		}
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"hidden"));
		return value;
	}
	,_customStyle: null
	,get_customStyle: function() {
		if(this._customStyle == null) {
			this._customStyle = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		return this._customStyle;
	}
	,set_customStyle: function(value) {
		if(value != this._customStyle) {
			this.invalidateComponent("style",false);
		}
		this._customStyle = value;
		return value;
	}
	,classes: null
	,cascadeActive: null
	,addClass: function(name,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		if(this.classes.indexOf(name) == -1) {
			this.classes.push(name);
			if(invalidate == true) {
				this.invalidateComponent("style",false);
			}
		}
		if(recursive == true || this.cascadeActive == true && name == ":active") {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.addClass(name,invalidate,recursive);
			}
		}
	}
	,addClasses: function(names,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			if(this.classes.indexOf(name) == -1) {
				this.classes.push(name);
				if(invalidate == true) {
					needsInvalidate = true;
				}
			}
		}
		if(needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.addClasses(names,invalidate,recursive);
			}
		}
	}
	,removeClass: function(name,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		if(this.classes.indexOf(name) != -1) {
			HxOverrides.remove(this.classes,name);
			if(invalidate == true) {
				this.invalidateComponent("style",false);
			}
		}
		if(recursive == true || this.cascadeActive == true && name == ":active") {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.removeClass(name,invalidate,recursive);
			}
		}
	}
	,removeClasses: function(names,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			if(this.classes.indexOf(name) != -1) {
				HxOverrides.remove(this.classes,name);
				if(invalidate == true) {
					needsInvalidate = true;
				}
			}
		}
		if(needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.removeClasses(names,invalidate,recursive);
			}
		}
	}
	,hasClass: function(name) {
		return this.classes.indexOf(name) != -1;
	}
	,swapClass: function(classToAdd,classToRemove,invalidate,recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(invalidate == null) {
			invalidate = true;
		}
		var needsInvalidate = false;
		if(classToAdd != null && this.classes.indexOf(classToAdd) == -1) {
			this.classes.push(classToAdd);
			needsInvalidate = true;
		}
		if(classToRemove != null && this.classes.indexOf(classToRemove) != -1) {
			HxOverrides.remove(this.classes,classToRemove);
			needsInvalidate = true;
		}
		if(invalidate == true && needsInvalidate == true) {
			this.invalidateComponent("style",false);
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.swapClass(classToAdd,classToRemove,invalidate,recursive);
			}
		}
	}
	,_styleNames: null
	,_styleNamesList: null
	,get_styleNames: function() {
		return this._styleNames;
	}
	,set_styleNames: function(value) {
		if(value == this._styleNames) {
			return value;
		}
		if(value == null) {
			value = "";
		}
		this._styleNames = value;
		var newStyleNamesList = [];
		var classesToAdd = [];
		var requiresInvalidation = false;
		var _g = 0;
		var _g1 = value.split(" ");
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			x = StringTools.trim(x);
			if(x.length == 0) {
				continue;
			}
			newStyleNamesList.push(x);
			if(this._styleNamesList != null) {
				if(this._styleNamesList.indexOf(x) == -1) {
					classesToAdd.push(x);
					requiresInvalidation = true;
				}
			} else {
				classesToAdd.push(x);
				requiresInvalidation = true;
			}
		}
		var classesToRemove = [];
		if(this._styleNamesList != null) {
			var _g = 0;
			var _g1 = this._styleNamesList;
			while(_g < _g1.length) {
				var x = _g1[_g];
				++_g;
				if(newStyleNamesList.indexOf(x) == -1) {
					classesToRemove.push(x);
					requiresInvalidation = true;
				}
			}
		}
		this._styleNamesList = newStyleNamesList;
		if(requiresInvalidation) {
			var _g = 0;
			while(_g < classesToAdd.length) {
				var x = classesToAdd[_g];
				++_g;
				this.classes.push(x);
			}
			var _g = 0;
			while(_g < classesToRemove.length) {
				var x = classesToRemove[_g];
				++_g;
				HxOverrides.remove(this.classes,x);
			}
			this.invalidateComponent("all",true);
		}
		return value;
	}
	,_styleString: null
	,get_styleString: function() {
		return this._styleString;
	}
	,set_styleString: function(value) {
		if(value == null || value == this._styleString) {
			return value;
		}
		var cssString = StringTools.trim(value);
		if(cssString.length == 0) {
			return value;
		}
		if(StringTools.endsWith(cssString,";") == false) {
			cssString += ";";
		}
		cssString = "_ { " + cssString + "}";
		var s = new haxe_ui_styles_Parser().parse(cssString);
		this.get_customStyle().mergeDirectives(s.get_rules()[0].directives);
		this._styleString = value;
		this.invalidateComponent("style",false);
		return value;
	}
	,_useCachedStyleSheetRef: null
	,_cachedStyleSheetRef: null
	,_styleSheet: null
	,get_styleSheet: function() {
		if(this._useCachedStyleSheetRef == true) {
			return this._cachedStyleSheetRef;
		}
		var s = null;
		var ref = this;
		while(ref != null) {
			if(ref._styleSheet != null) {
				s = ref._styleSheet;
				break;
			}
			ref = ref.parentComponent;
		}
		this._useCachedStyleSheetRef = true;
		this._cachedStyleSheetRef = s;
		return s;
	}
	,set_styleSheet: function(value) {
		this._styleSheet = value;
		this.resetCachedStyleSheetRef();
		return value;
	}
	,resetCachedStyleSheetRef: function() {
		this._cachedStyleSheetRef = null;
		this._useCachedStyleSheetRef = false;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.resetCachedStyleSheetRef();
		}
	}
	,_includeInLayout: null
	,get_includeInLayout: function() {
		if(this._hidden == true) {
			return false;
		}
		return this._includeInLayout;
	}
	,set_includeInLayout: function(value) {
		this._includeInLayout = value;
		return value;
	}
	,get_layout: function() {
		return this._layout;
	}
	,set_layout: function(value) {
		if(value == null) {
			return value;
		}
		var tmp;
		if(this._layout != null) {
			var c = js_Boot.getClass(value);
			var tmp1 = c.__name__;
			var c = js_Boot.getClass(this._layout);
			tmp = tmp1 == c.__name__;
		} else {
			tmp = false;
		}
		if(tmp) {
			return value;
		}
		this._layout = value;
		this._layout.set_component(this);
		return value;
	}
	,lockLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layoutLocked == true) {
			return;
		}
		this._layoutLocked = true;
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.lockLayout(recursive);
			}
		}
	}
	,unlockLayout: function(recursive) {
		if(recursive == null) {
			recursive = false;
		}
		if(this._layoutLocked == false) {
			return;
		}
		if(recursive == true) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.unlockLayout(recursive);
			}
		}
		this._layoutLocked = false;
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
	}
	,ready: function() {
		var _gthis = this;
		this.set_depth(haxe_ui_util_ComponentUtil.getDepth(this));
		if(this.isComponentInvalid()) {
			this._invalidateCount = 0;
			haxe_ui_validation_ValidationManager.get_instance().add(this);
		}
		if(this._ready == false) {
			this._ready = true;
			this.handleReady();
			if((this._children == null ? [] : this._children) != null) {
				var _g = 0;
				var _g1 = this._children == null ? [] : this._children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.ready();
				}
			}
			this.invalidateComponent();
			this.behaviours.ready();
			this.behaviours.update();
			haxe_ui_Toolkit.callLater(function() {
				_gthis.invalidateComponent("data",false);
				_gthis.invalidateComponent("style",false);
				if(_gthis._compositeBuilder != null) {
					_gthis._compositeBuilder.onReady();
				}
				_gthis.onReady();
				_gthis.dispatch(new haxe_ui_events_UIEvent("ready"));
				if(_gthis._hidden == false) {
					_gthis.dispatch(new haxe_ui_events_UIEvent("shown"));
				}
			});
		}
	}
	,onReady: function() {
	}
	,onInitialize: function() {
	}
	,onResized: function() {
	}
	,onMoved: function() {
	}
	,_scriptAccess: null
	,get_scriptAccess: function() {
		return this._scriptAccess;
	}
	,set_scriptAccess: function(value) {
		if(value == this._scriptAccess) {
			return value;
		}
		this._scriptAccess = value;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_scriptAccess(value);
		}
		return value;
	}
	,namedComponents: null
	,get_namedComponents: function() {
		var list = [];
		haxe_ui_core_Component.addNamedComponentsFrom(this,list);
		return list;
	}
	,onThemeChanged: function() {
	}
	,initializeComponent: function() {
		if(this._isInitialized == true) {
			return;
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.onInitialize();
		}
		this.onInitialize();
		if(this._layout == null) {
			this.set_layout(this.createLayout());
		}
		this._isInitialized = true;
		if(this.hasEvent("initialize")) {
			this.dispatch(new haxe_ui_events_UIEvent("initialize"));
		}
	}
	,_initialSizeApplied: null
	,validateInitialSize: function(isInitialized) {
		if(isInitialized == false && this._style != null && this._initialSizeApplied == false) {
			if((this._style.initialWidth != null || this._style.initialPercentWidth != null) && (this.get_width() <= 0 && this.get_percentWidth() == null)) {
				if(this._style.initialWidth != null) {
					this.set_width(this._style.initialWidth);
					this._initialSizeApplied = true;
				} else if(this._style.initialPercentWidth != null) {
					this.set_percentWidth(this._style.initialPercentWidth);
					this._initialSizeApplied = true;
				}
			}
			if((this._style.initialHeight != null || this._style.initialPercentHeight != null) && (this.get_height() <= 0 && this.get_percentHeight() == null)) {
				if(this._style.initialHeight != null) {
					this.set_height(this._style.initialHeight);
					this._initialSizeApplied = true;
				} else if(this._style.initialPercentHeight != null) {
					this.set_percentHeight(this._style.initialPercentHeight);
					this._initialSizeApplied = true;
				}
			}
		}
	}
	,validateComponentData: function() {
		this.behaviours.validateData();
		if(this._compositeBuilder != null) {
			this._compositeBuilder.validateComponentData();
		}
	}
	,validateComponentLayout: function() {
		this.get_layout().refresh();
		while(this.validateComponentAutoSize()) this.get_layout().refresh();
		var sizeChanged = false;
		if(this._componentWidth != this._actualWidth || this._componentHeight != this._actualHeight) {
			this._actualWidth = this._componentWidth;
			this._actualHeight = this._componentHeight;
			this.enforceSizeConstraints();
			if(this.parentComponent != null) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
			this.onResized();
			this.dispatch(new haxe_ui_events_UIEvent("resize"));
			sizeChanged = true;
		}
		if(this._compositeBuilder != null) {
			if(this._compositeBuilder.validateComponentLayout()) {
				sizeChanged = true;
			}
		}
		return sizeChanged;
	}
	,enforceSizeConstraints: function() {
		if(this.get_style() != null) {
			if(this.get_style().minWidth != null && this._componentWidth < this.get_style().minWidth) {
				this._componentWidth = this._actualWidth = this._width = this.get_style().minWidth;
			}
			if(this.get_style().maxWidth != null && this.get_style().maxPercentWidth == null && this._componentWidth > this.get_style().maxWidth) {
				this._componentWidth = this._actualWidth = this._width = this.get_style().maxWidth;
			} else if(this.get_style().maxWidth == null && this.get_style().maxPercentWidth != null) {
				var p = this;
				var max = 0;
				while(p != null) {
					if(p.get_style() != null && p.get_style().maxPercentWidth == null) {
						max += p.get_width();
						break;
					}
					if(p.get_style() != null && p != this) {
						max -= p.get_style().paddingLeft + p.get_style().paddingRight;
					}
					p = p.parentComponent;
				}
				max = max * this.get_style().maxPercentWidth / 100;
				if(max > 0 && this._componentWidth > max) {
					this._componentWidth = this._actualWidth = this._width = max;
				}
			}
			if(this.get_style().minHeight != null && this._componentHeight < this.get_style().minHeight) {
				this._componentHeight = this._actualHeight = this._height = this.get_style().minHeight;
			}
			if(this.get_style().maxHeight != null && this.get_style().maxPercentHeight == null && this._componentHeight > this.get_style().maxHeight) {
				this._componentHeight = this._actualHeight = this._height = this.get_style().maxHeight;
			} else if(this.get_style().maxHeight == null && this.get_style().maxPercentHeight != null) {
				var p = this;
				var max = 0;
				while(p != null) {
					if(p.get_style() != null && p.get_style().maxPercentHeight == null) {
						max += p.get_height();
						break;
					}
					if(p.get_style() != null && p != this) {
						max -= p.get_style().paddingTop + p.get_style().paddingBottom;
					}
					p = p.parentComponent;
				}
				max = max * this.get_style().maxPercentHeight / 100;
				if(max > 0 && this._componentHeight > max) {
					this._componentHeight = this._actualHeight = this._height = max;
				}
			}
		}
	}
	,validateComponentStyle: function() {
		var s = haxe_ui_Toolkit.styleSheet.buildStyleFor(this);
		if(this.get_styleSheet() != null) {
			var localStyle = this.get_styleSheet().buildStyleFor(this);
			s.apply(localStyle);
		}
		s.apply(this.get_customStyle());
		if(this._style == null || this._style.equalTo(s) == false) {
			var marginsChanged = false;
			if(this.parentComponent != null && this._style != null) {
				marginsChanged = this._style.marginLeft != s.marginLeft || this._style.marginRight != s.marginRight || this._style.marginTop != s.marginTop || this._style.marginBottom != s.marginBottom;
			}
			var bordersChanged = false;
			if(this._style != null && this._style.get_fullBorderSize() != s.get_fullBorderSize()) {
				bordersChanged = true;
			}
			this._style = s;
			this.applyStyle(s);
			if(bordersChanged == true) {
				if(!(this._layout == null || this._layoutLocked == true)) {
					this.invalidateComponent("layout",false);
				}
			}
			if(marginsChanged == true) {
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
		}
	}
	,validateComponentPosition: function() {
		this.handlePosition(this._left,this._top,this._style);
		this.onMoved();
		this.dispatch(new haxe_ui_events_UIEvent("move"));
	}
	,updateComponentDisplay: function() {
		if(this.get_componentWidth() == null || this.get_componentHeight() == null) {
			return;
		}
		this.handleSize(this.get_componentWidth(),this.get_componentHeight(),this._style);
		if(this._componentClipRect != null || this.get_style() != null && this.get_style().clip != null && this.get_style().clip == true) {
			this.handleClipRect(this._componentClipRect != null ? this._componentClipRect : new haxe_ui_geom_Rectangle(0,0,this.get_componentWidth(),this.get_componentHeight()));
		}
	}
	,validateComponentAutoSize: function() {
		var invalidate = false;
		if(this.get_autoWidth() == true || this.get_autoHeight() == true) {
			var s = this.get_layout().calcAutoSize();
			if(this.get_autoWidth() == true) {
				if(s.width != this._componentWidth) {
					this._componentWidth = s.width;
					invalidate = true;
				}
			}
			if(this.get_autoHeight() == true) {
				if(s.height != this._componentHeight) {
					this._componentHeight = s.height;
					invalidate = true;
				}
			}
		}
		return invalidate;
	}
	,_pauseAnimationStyleChanges: null
	,applyStyle: function(style) {
		haxe_ui_backend_ComponentImpl.prototype.applyStyle.call(this,style);
		if(style != null && this._initialSizeApplied == false) {
			if((style.initialWidth != null || style.initialPercentWidth != null) && (this.get_width() <= 0 && this.get_percentWidth() == null)) {
				if(style.initialWidth != null) {
					this.set_width(style.initialWidth);
					this._initialSizeApplied = true;
				} else if(style.initialPercentWidth != null) {
					this.set_percentWidth(style.initialPercentWidth);
					this._initialSizeApplied = true;
				}
			}
			if((style.initialHeight != null || style.initialPercentHeight != null) && (this.get_height() <= 0 && this.get_percentHeight() == null)) {
				if(style.initialHeight != null) {
					this.set_height(style.initialHeight);
					this._initialSizeApplied = true;
				} else if(style.initialPercentHeight != null) {
					this.set_percentHeight(style.initialPercentHeight);
					this._initialSizeApplied = true;
				}
			}
		}
		if(style.left != null) {
			this.set_left(style.left);
		}
		if(style.top != null) {
			this.set_top(style.top);
		}
		if(style.percentWidth != null) {
			this._width = null;
			this.set_componentWidth(null);
			this.set_percentWidth(style.percentWidth);
		}
		if(style.percentHeight != null) {
			this._height = null;
			this.set_componentHeight(null);
			this.set_percentHeight(style.percentHeight);
		}
		if(style.width != null) {
			this.set_percentWidth(null);
			this.set_width(style.width);
		}
		if(style.height != null) {
			this.set_percentHeight(null);
			this.set_height(style.height);
		}
		if(style.native != null) {
			this.set_native(style.native);
		}
		if(style.hidden != null) {
			this.set_hidden(style.hidden);
		}
		if(this._pauseAnimationStyleChanges == false) {
			if(style.animationName != null) {
				var animationKeyFrames = haxe_ui_Toolkit.styleSheet.get_animations().h[style.animationName];
				this.applyAnimationKeyFrame(animationKeyFrames,style.animationOptions);
			} else if(this.get_componentAnimation() != null) {
				this.set_componentAnimation(null);
			}
		}
		if(style.pointerEvents != null && style.pointerEvents != "none") {
			if(this.hasEvent("mouseover",$bind(this,this.onPointerEventsMouseOver)) == false) {
				if(style.cursor == null) {
					this.get_customStyle().cursor = "pointer";
				}
				this.registerEvent("mouseover",$bind(this,this.onPointerEventsMouseOver));
			}
			if(this.hasEvent("mouseout",$bind(this,this.onPointerEventsMouseOut)) == false) {
				this.registerEvent("mouseout",$bind(this,this.onPointerEventsMouseOut));
			}
			if(this.hasEvent("mousedown",$bind(this,this.onPointerEventsMouseDown)) == false) {
				this.registerEvent("mousedown",$bind(this,this.onPointerEventsMouseDown));
			}
			if(this.hasEvent("mouseup",$bind(this,this.onPointerEventsMouseUp)) == false) {
				this.registerEvent("mouseup",$bind(this,this.onPointerEventsMouseUp));
			}
			this.handleFrameworkProperty("allowMouseInteraction",true);
		} else if(style.pointerEvents != null) {
			if(this.hasEvent("mouseover",$bind(this,this.onPointerEventsMouseOver)) == true) {
				this.get_customStyle().cursor = null;
				this.unregisterEvent("mouseover",$bind(this,this.onPointerEventsMouseOver));
			}
			if(this.hasEvent("mouseout",$bind(this,this.onPointerEventsMouseOut)) == true) {
				this.unregisterEvent("mouseout",$bind(this,this.onPointerEventsMouseOut));
			}
			if(this.hasEvent("mousedown",$bind(this,this.onPointerEventsMouseDown)) == true) {
				this.unregisterEvent("mousedown",$bind(this,this.onPointerEventsMouseDown));
			}
			if(this.hasEvent("mouseup",$bind(this,this.onPointerEventsMouseUp)) == true) {
				this.unregisterEvent("mouseup",$bind(this,this.onPointerEventsMouseUp));
			}
			this.handleFrameworkProperty("allowMouseInteraction",false);
		}
		if(this._compositeBuilder != null) {
			this._compositeBuilder.applyStyle(style);
		}
	}
	,onPointerEventsMouseOver: function(e) {
		this.addClass(":hover",true,true);
	}
	,onPointerEventsMouseOut: function(e) {
		this.removeClass(":hover",true,true);
	}
	,onPointerEventsMouseDown: function(e) {
		this.addClass(":down",true,true);
	}
	,onPointerEventsMouseUp: function(e) {
		this.removeClass(":down",true,true);
	}
	,applyAnimationKeyFrame: function(animationKeyFrames,options) {
		var _gthis = this;
		if(this._animatable == false || options == null || options.duration == 0 || this._componentAnimation != null && this._componentAnimation.name == animationKeyFrames.id && options.compareToAnimation(this._componentAnimation) == true) {
			return;
		}
		if(this.hasEvent("animationstart")) {
			this.dispatch(new haxe_ui_events_AnimationEvent("animationstart"));
		}
		this.set_componentAnimation(haxe_ui_styles_animation_Animation.createWithKeyFrames(animationKeyFrames,this,options));
		this.get_componentAnimation().run(function() {
			if(_gthis.hasEvent("animationend")) {
				_gthis.dispatch(new haxe_ui_events_AnimationEvent("animationend"));
			}
		});
	}
	,cloneComponent: function() {
		var c = haxe_ui_backend_ComponentImpl.prototype.cloneComponent.call(this);
		if(this.get_styleNames() != null) {
			c.set_styleNames(this.get_styleNames());
		}
		if(this.get_styleString() != null) {
			c.set_styleString(this.get_styleString());
		}
		var tmp = this._ready == false;
		if(this._hidden == true) {
			c.hide();
		}
		if(this.get_autoWidth() == false && this.get_width() > 0) {
			c.set_width(this.get_width());
		}
		if(this.get_autoHeight() == false && this.get_height() > 0) {
			c.set_height(this.get_height());
		}
		if(this.get_customStyle() != null) {
			if(c.get_customStyle() == null) {
				c.set_customStyle(new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
			}
			c.get_customStyle().apply(this.get_customStyle());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,get_isComponentClipped: function() {
		if(this._compositeBuilder != null) {
			return this._compositeBuilder.get_isComponentClipped();
		}
		return this.get_componentClipRect() != null;
	}
	,cssName: null
	,get_cssName: function() {
		var cssName = null;
		if(this._compositeBuilder != null) {
			cssName = this._compositeBuilder.get_cssName();
		}
		if(cssName == null) {
			var c = js_Boot.getClass(this);
			cssName = c.__name__.split(".").pop().toLowerCase();
		}
		return cssName;
	}
	,isComponentSolid: null
	,get_isComponentSolid: function() {
		if(this.get_style() == null) {
			return false;
		}
		if(this.get_style().backgroundColor != null || this.get_style().backgroundImage != null) {
			if(this.get_style().opacity == null || this.get_style().opacity > 0) {
				if(this.get_style().backgroundOpacity == null || this.get_style().backgroundOpacity > 0) {
					return true;
				}
			}
		}
		return false;
	}
	,registerBehaviours: function() {
		haxe_ui_backend_ComponentImpl.prototype.registerBehaviours.call(this);
	}
	,get_color: function() {
		if(this.get_customStyle().color != null) {
			return this.get_customStyle().color;
		}
		if(this.get_style() == null || this.get_style().color == null) {
			return null;
		}
		return this.get_style().color;
	}
	,set_color: function(value) {
		if(this.get_customStyle().color == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().color = null;
		} else {
			this.get_customStyle().color = haxe_ui_util_Color.toInt(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_backgroundColor: function() {
		if(this.get_customStyle().backgroundColor != null) {
			return this.get_customStyle().backgroundColor;
		}
		if(this.get_style() == null || this.get_style().backgroundColor == null) {
			return null;
		}
		return this.get_style().backgroundColor;
	}
	,set_backgroundColor: function(value) {
		if(this.get_customStyle().backgroundColor == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().backgroundColor = null;
		} else {
			this.get_customStyle().backgroundColor = haxe_ui_util_Color.toInt(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_backgroundColorEnd: function() {
		if(this.get_customStyle().backgroundColorEnd != null) {
			return this.get_customStyle().backgroundColorEnd;
		}
		if(this.get_style() == null || this.get_style().backgroundColorEnd == null) {
			return null;
		}
		return this.get_style().backgroundColorEnd;
	}
	,set_backgroundColorEnd: function(value) {
		if(this.get_customStyle().backgroundColorEnd == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().backgroundColorEnd = null;
		} else {
			this.get_customStyle().backgroundColorEnd = haxe_ui_util_Color.toInt(value);
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_backgroundImage: function() {
		if(this.get_customStyle().backgroundImage != null) {
			return this.get_customStyle().backgroundImage;
		}
		if(this.get_style() == null || this.get_style().backgroundImage == null) {
			return null;
		}
		return this.get_style().backgroundImage;
	}
	,set_backgroundImage: function(value) {
		if(haxe_ui_util_Variant.eq(this.get_customStyle().backgroundImage,value)) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().backgroundImage = null;
		} else {
			this.get_customStyle().backgroundImage = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderColor: function() {
		if(this.get_customStyle().borderColor != null) {
			return this.get_customStyle().borderColor;
		}
		if(this.get_style() == null || this.get_style().borderColor == null) {
			return null;
		}
		return this.get_style().borderColor;
	}
	,set_borderColor: function(value) {
		if(this.get_customStyle().borderColor == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderColor = null;
		} else {
			this.get_customStyle().borderColor = haxe_ui_util_Color.toInt(value);
		}
		this.get_customStyle().borderTopColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderLeftColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderBottomColor = haxe_ui_util_Color.toInt(value);
		this.get_customStyle().borderRightColor = haxe_ui_util_Color.toInt(value);
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderSize: function() {
		if(this.get_customStyle().borderSize != null) {
			return this.get_customStyle().borderSize;
		}
		if(this.get_style() == null || this.get_style().borderSize == null) {
			return null;
		}
		return this.get_style().borderSize;
	}
	,set_borderSize: function(value) {
		if(this.get_customStyle().borderSize == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderSize = null;
		} else {
			this.get_customStyle().borderSize = value;
		}
		this.get_customStyle().borderTopSize = value;
		this.get_customStyle().borderLeftSize = value;
		this.get_customStyle().borderBottomSize = value;
		this.get_customStyle().borderRightSize = value;
		this.invalidateComponent("style",false);
		return value;
	}
	,get_borderRadius: function() {
		if(this.get_customStyle().borderRadius != null) {
			return this.get_customStyle().borderRadius;
		}
		if(this.get_style() == null || this.get_style().borderRadius == null) {
			return null;
		}
		return this.get_style().borderRadius;
	}
	,set_borderRadius: function(value) {
		if(this.get_customStyle().borderRadius == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().borderRadius = null;
		} else {
			this.get_customStyle().borderRadius = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_padding: function() {
		if(this.get_customStyle().padding != null) {
			return this.get_customStyle().padding;
		}
		if(this.get_style() == null || this.get_style().padding == null) {
			return null;
		}
		return this.get_style().padding;
	}
	,set_padding: function(value) {
		if(this.get_customStyle().padding == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().set_padding(null);
		} else {
			this.get_customStyle().set_padding(value);
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_paddingLeft: function() {
		if(this.get_customStyle().paddingLeft != null) {
			return this.get_customStyle().paddingLeft;
		}
		if(this.get_style() == null || this.get_style().paddingLeft == null) {
			return null;
		}
		return this.get_style().paddingLeft;
	}
	,set_paddingLeft: function(value) {
		if(this.get_customStyle().paddingLeft == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingLeft = null;
		} else {
			this.get_customStyle().paddingLeft = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_paddingRight: function() {
		if(this.get_customStyle().paddingRight != null) {
			return this.get_customStyle().paddingRight;
		}
		if(this.get_style() == null || this.get_style().paddingRight == null) {
			return null;
		}
		return this.get_style().paddingRight;
	}
	,set_paddingRight: function(value) {
		if(this.get_customStyle().paddingRight == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingRight = null;
		} else {
			this.get_customStyle().paddingRight = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_paddingTop: function() {
		if(this.get_customStyle().paddingTop != null) {
			return this.get_customStyle().paddingTop;
		}
		if(this.get_style() == null || this.get_style().paddingTop == null) {
			return null;
		}
		return this.get_style().paddingTop;
	}
	,set_paddingTop: function(value) {
		if(this.get_customStyle().paddingTop == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingTop = null;
		} else {
			this.get_customStyle().paddingTop = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_paddingBottom: function() {
		if(this.get_customStyle().paddingBottom != null) {
			return this.get_customStyle().paddingBottom;
		}
		if(this.get_style() == null || this.get_style().paddingBottom == null) {
			return null;
		}
		return this.get_style().paddingBottom;
	}
	,set_paddingBottom: function(value) {
		if(this.get_customStyle().paddingBottom == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().paddingBottom = null;
		} else {
			this.get_customStyle().paddingBottom = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_marginLeft: function() {
		if(this.get_customStyle().marginLeft != null) {
			return this.get_customStyle().marginLeft;
		}
		if(this.get_style() == null || this.get_style().marginLeft == null) {
			return null;
		}
		return this.get_style().marginLeft;
	}
	,set_marginLeft: function(value) {
		if(this.get_customStyle().marginLeft == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginLeft = null;
		} else {
			this.get_customStyle().marginLeft = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginRight: function() {
		if(this.get_customStyle().marginRight != null) {
			return this.get_customStyle().marginRight;
		}
		if(this.get_style() == null || this.get_style().marginRight == null) {
			return null;
		}
		return this.get_style().marginRight;
	}
	,set_marginRight: function(value) {
		if(this.get_customStyle().marginRight == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginRight = null;
		} else {
			this.get_customStyle().marginRight = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginTop: function() {
		if(this.get_customStyle().marginTop != null) {
			return this.get_customStyle().marginTop;
		}
		if(this.get_style() == null || this.get_style().marginTop == null) {
			return null;
		}
		return this.get_style().marginTop;
	}
	,set_marginTop: function(value) {
		if(this.get_customStyle().marginTop == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginTop = null;
		} else {
			this.get_customStyle().marginTop = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_marginBottom: function() {
		if(this.get_customStyle().marginBottom != null) {
			return this.get_customStyle().marginBottom;
		}
		if(this.get_style() == null || this.get_style().marginBottom == null) {
			return null;
		}
		return this.get_style().marginBottom;
	}
	,set_marginBottom: function(value) {
		if(this.get_customStyle().marginBottom == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().marginBottom = null;
		} else {
			this.get_customStyle().marginBottom = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_clip: function() {
		if(this.get_customStyle().clip != null) {
			return this.get_customStyle().clip;
		}
		if(this.get_style() == null || this.get_style().clip == null) {
			return null;
		}
		return this.get_style().clip;
	}
	,set_clip: function(value) {
		if(this.get_customStyle().clip == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().clip = null;
		} else {
			this.get_customStyle().clip = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_opacity: function() {
		if(this.get_customStyle().opacity != null) {
			return this.get_customStyle().opacity;
		}
		if(this.get_style() == null || this.get_style().opacity == null) {
			return null;
		}
		return this.get_style().opacity;
	}
	,set_opacity: function(value) {
		if(this.get_customStyle().opacity == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().opacity = null;
		} else {
			this.get_customStyle().opacity = value;
		}
		this.invalidateComponent("style",false);
		return value;
	}
	,get_horizontalAlign: function() {
		if(this.get_customStyle().horizontalAlign != null) {
			return this.get_customStyle().horizontalAlign;
		}
		if(this.get_style() == null || this.get_style().horizontalAlign == null) {
			return null;
		}
		return this.get_style().horizontalAlign;
	}
	,set_horizontalAlign: function(value) {
		if(this.get_customStyle().horizontalAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().horizontalAlign = null;
		} else {
			this.get_customStyle().horizontalAlign = value;
		}
		this.invalidateComponent("style",false);
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_verticalAlign: function() {
		if(this.get_customStyle().verticalAlign != null) {
			return this.get_customStyle().verticalAlign;
		}
		if(this.get_style() == null || this.get_style().verticalAlign == null) {
			return null;
		}
		return this.get_style().verticalAlign;
	}
	,set_verticalAlign: function(value) {
		if(this.get_customStyle().verticalAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().verticalAlign = null;
		} else {
			this.get_customStyle().verticalAlign = value;
		}
		this.invalidateComponent("style",false);
		if(this.parentComponent != null) {
			var _this = this.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,self: function() {
		return new haxe_ui_core_Component();
	}
	,_internal__onDragStart: null
	,onDragStart: null
	,set_onDragStart: function(value) {
		if(this._internal__onDragStart != null) {
			this.unregisterEvent("dragstart",this._internal__onDragStart);
			this._internal__onDragStart = null;
		}
		if(value != null) {
			this._internal__onDragStart = value;
			this.registerEvent("dragstart",value);
		}
		return value;
	}
	,_internal__onDrag: null
	,onDrag: null
	,set_onDrag: function(value) {
		if(this._internal__onDrag != null) {
			this.unregisterEvent("drag",this._internal__onDrag);
			this._internal__onDrag = null;
		}
		if(value != null) {
			this._internal__onDrag = value;
			this.registerEvent("drag",value);
		}
		return value;
	}
	,_internal__onDragEnd: null
	,onDragEnd: null
	,set_onDragEnd: function(value) {
		if(this._internal__onDragEnd != null) {
			this.unregisterEvent("dragend",this._internal__onDragEnd);
			this._internal__onDragEnd = null;
		}
		if(value != null) {
			this._internal__onDragEnd = value;
			this.registerEvent("dragend",value);
		}
		return value;
	}
	,_internal__onAnimationStart: null
	,onAnimationStart: null
	,set_onAnimationStart: function(value) {
		if(this._internal__onAnimationStart != null) {
			this.unregisterEvent("animationstart",this._internal__onAnimationStart);
			this._internal__onAnimationStart = null;
		}
		if(value != null) {
			this._internal__onAnimationStart = value;
			this.registerEvent("animationstart",value);
		}
		return value;
	}
	,_internal__onAnimationFrame: null
	,onAnimationFrame: null
	,set_onAnimationFrame: function(value) {
		if(this._internal__onAnimationFrame != null) {
			this.unregisterEvent("animationframe",this._internal__onAnimationFrame);
			this._internal__onAnimationFrame = null;
		}
		if(value != null) {
			this._internal__onAnimationFrame = value;
			this.registerEvent("animationframe",value);
		}
		return value;
	}
	,_internal__onAnimationEnd: null
	,onAnimationEnd: null
	,set_onAnimationEnd: function(value) {
		if(this._internal__onAnimationEnd != null) {
			this.unregisterEvent("animationend",this._internal__onAnimationEnd);
			this._internal__onAnimationEnd = null;
		}
		if(value != null) {
			this._internal__onAnimationEnd = value;
			this.registerEvent("animationend",value);
		}
		return value;
	}
	,_internal__onClick: null
	,onClick: null
	,set_onClick: function(value) {
		if(this._internal__onClick != null) {
			this.unregisterEvent("click",this._internal__onClick);
			this._internal__onClick = null;
		}
		if(value != null) {
			this._internal__onClick = value;
			this.registerEvent("click",value);
		}
		return value;
	}
	,_internal__onMouseOver: null
	,onMouseOver: null
	,set_onMouseOver: function(value) {
		if(this._internal__onMouseOver != null) {
			this.unregisterEvent("mouseover",this._internal__onMouseOver);
			this._internal__onMouseOver = null;
		}
		if(value != null) {
			this._internal__onMouseOver = value;
			this.registerEvent("mouseover",value);
		}
		return value;
	}
	,_internal__onMouseOut: null
	,onMouseOut: null
	,set_onMouseOut: function(value) {
		if(this._internal__onMouseOut != null) {
			this.unregisterEvent("mouseout",this._internal__onMouseOut);
			this._internal__onMouseOut = null;
		}
		if(value != null) {
			this._internal__onMouseOut = value;
			this.registerEvent("mouseout",value);
		}
		return value;
	}
	,_internal__onDblClick: null
	,onDblClick: null
	,set_onDblClick: function(value) {
		if(this._internal__onDblClick != null) {
			this.unregisterEvent("doubleclick",this._internal__onDblClick);
			this._internal__onDblClick = null;
		}
		if(value != null) {
			this._internal__onDblClick = value;
			this.registerEvent("doubleclick",value);
		}
		return value;
	}
	,_internal__onRightClick: null
	,onRightClick: null
	,set_onRightClick: function(value) {
		if(this._internal__onRightClick != null) {
			this.unregisterEvent("rightclick",this._internal__onRightClick);
			this._internal__onRightClick = null;
		}
		if(value != null) {
			this._internal__onRightClick = value;
			this.registerEvent("rightclick",value);
		}
		return value;
	}
	,_internal__onChange: null
	,onChange: null
	,set_onChange: function(value) {
		if(this._internal__onChange != null) {
			this.unregisterEvent("change",this._internal__onChange);
			this._internal__onChange = null;
		}
		if(value != null) {
			this._internal__onChange = value;
			this.registerEvent("change",value);
		}
		return value;
	}
	,__class__: haxe_ui_core_Component
	,__properties__: $extend(haxe_ui_backend_ComponentImpl.prototype.__properties__,{set_onChange:"set_onChange",set_onRightClick:"set_onRightClick",set_onDblClick:"set_onDblClick",set_onMouseOut:"set_onMouseOut",set_onMouseOver:"set_onMouseOver",set_onClick:"set_onClick",set_onAnimationEnd:"set_onAnimationEnd",set_onAnimationFrame:"set_onAnimationFrame",set_onAnimationStart:"set_onAnimationStart",set_onDragEnd:"set_onDragEnd",set_onDrag:"set_onDrag",set_onDragStart:"set_onDragStart",set_verticalAlign:"set_verticalAlign",get_verticalAlign:"get_verticalAlign",set_horizontalAlign:"set_horizontalAlign",get_horizontalAlign:"get_horizontalAlign",set_opacity:"set_opacity",get_opacity:"get_opacity",set_clip:"set_clip",get_clip:"get_clip",set_marginBottom:"set_marginBottom",get_marginBottom:"get_marginBottom",set_marginTop:"set_marginTop",get_marginTop:"get_marginTop",set_marginRight:"set_marginRight",get_marginRight:"get_marginRight",set_marginLeft:"set_marginLeft",get_marginLeft:"get_marginLeft",set_paddingBottom:"set_paddingBottom",get_paddingBottom:"get_paddingBottom",set_paddingTop:"set_paddingTop",get_paddingTop:"get_paddingTop",set_paddingRight:"set_paddingRight",get_paddingRight:"get_paddingRight",set_paddingLeft:"set_paddingLeft",get_paddingLeft:"get_paddingLeft",set_padding:"set_padding",get_padding:"get_padding",set_borderRadius:"set_borderRadius",get_borderRadius:"get_borderRadius",set_borderSize:"set_borderSize",get_borderSize:"get_borderSize",set_borderColor:"set_borderColor",get_borderColor:"get_borderColor",set_backgroundImage:"set_backgroundImage",get_backgroundImage:"get_backgroundImage",set_backgroundColorEnd:"set_backgroundColorEnd",get_backgroundColorEnd:"get_backgroundColorEnd",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_color:"set_color",get_color:"get_color",get_isComponentSolid:"get_isComponentSolid",get_cssName:"get_cssName",get_namedComponents:"get_namedComponents",set_scriptAccess:"set_scriptAccess",get_scriptAccess:"get_scriptAccess",set_layout:"set_layout",get_layout:"get_layout",set_includeInLayout:"set_includeInLayout",get_includeInLayout:"get_includeInLayout",set_styleSheet:"set_styleSheet",get_styleSheet:"get_styleSheet",set_styleString:"set_styleString",get_styleString:"get_styleString",set_styleNames:"set_styleNames",get_styleNames:"get_styleNames",set_customStyle:"set_customStyle",get_customStyle:"get_customStyle",set_hidden:"set_hidden",get_hidden:"get_hidden",get_numComponents:"get_numComponents",get_rootComponent:"get_rootComponent",set_dragOptions:"set_dragOptions",get_dragOptions:"get_dragOptions",set_dragInitiator:"set_dragInitiator",get_dragInitiator:"get_dragInitiator",set_draggable:"set_draggable",get_draggable:"get_draggable",get_screen:"get_screen",set_componentAnimation:"set_componentAnimation",get_componentAnimation:"get_componentAnimation",set_animatable:"set_animatable",get_animatable:"get_animatable",set_native:"set_native",get_native:"get_native"})
});
var haxe_ui_containers_Box = function() {
	this._direction = null;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.containers.Box"] = haxe_ui_containers_Box;
haxe_ui_containers_Box.__name__ = "haxe.ui.containers.Box";
haxe_ui_containers_Box.__super__ = haxe_ui_core_Component;
haxe_ui_containers_Box.prototype = $extend(haxe_ui_core_Component.prototype,{
	_layoutName: null
	,get_layoutName: function() {
		return this._layoutName;
	}
	,set_layoutName: function(value) {
		if(this._layoutName == value) {
			return value;
		}
		this._layoutName = value;
		this.set_layout(haxe_ui_layouts_LayoutFactory.createFromName(this.get_layoutName()));
		return value;
	}
	,createDefaults: function() {
		haxe_ui_core_Component.prototype.createDefaults.call(this);
		if(this._defaultLayoutClass == null) {
			this._defaultLayoutClass = haxe_ui_layouts_DefaultLayout;
		}
	}
	,_direction: null
	,applyStyle: function(style) {
		haxe_ui_core_Component.prototype.applyStyle.call(this,style);
		if(style.direction != null && style.direction != this._direction) {
			this._direction = style.direction;
			this.set_layout(haxe_ui_layouts_LayoutFactory.createFromName(this._direction));
		}
	}
	,registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._defaultLayoutClass = haxe_ui_layouts_DefaultLayout;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("icon",haxe_ui_behaviours_DefaultBehaviour);
	}
	,get_icon: function() {
		if(this.behaviours == null) {
			return null;
		}
		return this.behaviours.get("icon");
	}
	,set_icon: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("icon",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"icon"));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_layoutName() != null) {
			c.set_layoutName(this.get_layoutName());
		}
		if(this.get_icon() != null) {
			c.set_icon(this.get_icon());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_Box();
	}
	,__class__: haxe_ui_containers_Box
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_icon:"set_icon",get_icon:"get_icon",set_layoutName:"set_layoutName",get_layoutName:"get_layoutName"})
});
var haxe_ui_containers_VBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_VerticalLayout());
};
$hxClasses["haxe.ui.containers.VBox"] = haxe_ui_containers_VBox;
haxe_ui_containers_VBox.__name__ = "haxe.ui.containers.VBox";
haxe_ui_containers_VBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_VBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_VBox();
	}
	,__class__: haxe_ui_containers_VBox
});
var MainView = function() {
	this.tom4 = new Audio("assets/snd/tom-4.mp3");
	this.tom3 = new Audio("assets/snd/tom-3.mp3");
	this.tom2 = new Audio("assets/snd/tom-2.mp3");
	this.tom1 = new Audio("assets/snd/tom-1.mp3");
	this.snare = new Audio("assets/snd/snare.mp3");
	this.kickbass = new Audio("assets/snd/kick-bass.mp3");
	this.crash = new Audio("assets/snd/crash.ogg");
	haxe_ui_containers_VBox.call(this);
	haxe_ui_Toolkit.styleSheet.parse("\r\n            .bitmap-button {\r\n                background: none;\r\n                padding: 6px 8px;\r\n                border: none;\r\n                color: #CCCCCC;\r\n                background-image: \"images/bitmap_button.png\";\r\n                background-image-clip: 0px 0px 26px 65px;\r\n                background-image-slice: 3px 3px 24px 62px;\r\n            }\r\n","user");
	var c0 = new haxe_ui_components_SectionHeader();
	c0.set_text("Drum Kit");
	this.addComponent(c0);
	var c1 = new haxe_ui_containers_VBox();
	c1.set_percentWidth(100.);
	c1.set_percentHeight(100.);
	var c2 = new haxe_ui_containers_HBox();
	c2.set_percentWidth(100.);
	c2.set_percentHeight(100.);
	var c3 = new haxe_ui_components_Button();
	c3.set_text("j");
	c3.set_styleNames("bitmap-button");
	c3.set_iconPosition("top");
	c3.set_icon(haxe_ui_util_Variant.fromString("assets/img/snare.png"));
	c2.addComponent(c3);
	var c4 = new haxe_ui_components_Button();
	c4.set_text("l");
	c4.set_styleNames("bitmap-button");
	c4.set_iconPosition("top");
	c4.set_icon(haxe_ui_util_Variant.fromString("assets/img/kick.png"));
	c2.addComponent(c4);
	var c5 = new haxe_ui_components_Button();
	c5.set_text("k");
	c5.set_styleNames("bitmap-button");
	c5.set_iconPosition("top");
	c5.set_icon(haxe_ui_util_Variant.fromString("assets/img/crash.png"));
	c2.addComponent(c5);
	c1.addComponent(c2);
	var c6 = new haxe_ui_containers_HBox();
	c6.set_percentWidth(100.);
	var c7 = new haxe_ui_components_Button();
	c7.set_text("w");
	c7.set_styleNames("bitmap-button");
	c7.set_iconPosition("top");
	c7.set_icon(haxe_ui_util_Variant.fromString("assets/img/tom1.png"));
	c6.addComponent(c7);
	var c8 = new haxe_ui_components_Button();
	c8.set_text("s");
	c8.set_styleNames("bitmap-button");
	c8.set_iconPosition("top");
	c8.set_icon(haxe_ui_util_Variant.fromString("assets/img/tom3.png"));
	c6.addComponent(c8);
	var c9 = new haxe_ui_components_Button();
	c9.set_text("d");
	c9.set_styleNames("bitmap-button");
	c9.set_iconPosition("top");
	c9.set_icon(haxe_ui_util_Variant.fromString("assets/img/tom4.png"));
	c6.addComponent(c9);
	var c10 = new haxe_ui_components_Button();
	c10.set_text("a");
	c10.set_styleNames("bitmap-button");
	c10.set_iconPosition("top");
	c10.set_icon(haxe_ui_util_Variant.fromString("assets/img/tom2.png"));
	c6.addComponent(c10);
	c1.addComponent(c6);
	this.addComponent(c1);
	this.set_percentWidth(100.);
	this.set_percentHeight(100.);
	this.bindingRoot = true;
	haxe_ui_core_Screen.get_instance().registerEvent("keydown",$bind(this,this.onKeyDown));
};
$hxClasses["MainView"] = MainView;
MainView.__name__ = "MainView";
MainView.__super__ = haxe_ui_containers_VBox;
MainView.prototype = $extend(haxe_ui_containers_VBox.prototype,{
	crash: null
	,kickbass: null
	,snare: null
	,tom1: null
	,tom2: null
	,tom3: null
	,tom4: null
	,onKeyDown: function(e) {
		if(e.keyCode == 75) {
			this.crash.play();
		} else if(e.keyCode == 65) {
			this.tom2.play();
		} else if(e.keyCode == 83) {
			this.tom3.play();
		} else if(e.keyCode == 68) {
			this.tom4.play();
		} else if(e.keyCode == 87) {
			this.tom1.play();
		} else if(e.keyCode == 76) {
			this.kickbass.play();
		} else if(e.keyCode == 74) {
			this.snare.play();
		}
	}
	,registerBehaviours: function() {
		haxe_ui_containers_VBox.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_VBox.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new MainView();
	}
	,__class__: MainView
});
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:true,__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		return false;
	}
	return true;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,set: null
	,__class__: haxe_IMap
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = "haxe.Resource";
haxe_Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe_Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe_Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return haxe_io_Bytes.ofString(x.str);
			}
			return haxe_crypto_Base64.decode(x.data);
		}
	}
	return null;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe__$Unserializer_DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe__$Unserializer_DefaultResolver;
haxe__$Unserializer_DefaultResolver.__name__ = "haxe._Unserializer.DefaultResolver";
haxe__$Unserializer_DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe__$Unserializer_DefaultResolver
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe__$Unserializer_DefaultResolver();
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = "haxe.Unserializer";
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe_Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe_Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe_Exception.thrown("Invalid object key");
			}
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe_Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe_Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe_ds_ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe_Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe_Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe_Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe_ds_List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe_ds_IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe_Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe_Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid bytes length");
			}
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
			var max = i + (len - rest);
			var bytes = new haxe_io_Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe_Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe_Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe_Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe_Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = "haxe.crypto.Base64";
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe_crypto_BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = "haxe.ds.ArraySort";
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) {
			return;
		}
		var _g = from + 1;
		var _g1 = to;
		while(_g < _g1) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) {
					haxe_ds_ArraySort.swap(a,j - 1,j);
				} else {
					break;
				}
				--j;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	if(len1 == 0 || len2 == 0) {
		return;
	}
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) {
			haxe_ds_ArraySort.swap(a,pivot,from);
		}
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	var new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	if(from == mid || mid == to) {
		return;
	}
	var n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) {
				p2 += shift;
			} else {
				p2 = from + (shift - (to - p2));
			}
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) {
			len = half;
		} else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else {
			len = half;
		}
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe_ds_BalancedTree.__interfaces__ = [haxe_IMap];
haxe_ds_BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe_ds_TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r));
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe_ds_TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = "haxe.ds.TreeNode";
haxe_ds_TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe_ds_GenericCell;
haxe_ds_GenericCell.__name__ = "haxe.ds.GenericCell";
haxe_ds_GenericCell.prototype = {
	elt: null
	,next: null
	,__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe_ds_GenericStack;
haxe_ds_GenericStack.__name__ = "haxe.ds.GenericStack";
haxe_ds_GenericStack.prototype = {
	head: null
	,__class__: haxe_ds_GenericStack
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = "haxe.ds.IntMap";
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe_ds_List;
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe_ds__$List_ListNode;
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe_iterators_ArrayIterator(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_ui_backend_BackendImpl = function() { };
$hxClasses["haxe.ui.backend.BackendImpl"] = haxe_ui_backend_BackendImpl;
haxe_ui_backend_BackendImpl.__name__ = "haxe.ui.backend.BackendImpl";
var haxe_ui_Backend = function() { };
$hxClasses["haxe.ui.Backend"] = haxe_ui_Backend;
haxe_ui_Backend.__name__ = "haxe.ui.Backend";
haxe_ui_Backend.__properties__ = {get_id:"get_id"};
haxe_ui_Backend.get_id = function() {
	return haxe_ui_backend_BackendImpl.id;
};
haxe_ui_Backend.__super__ = haxe_ui_backend_BackendImpl;
haxe_ui_Backend.prototype = $extend(haxe_ui_backend_BackendImpl.prototype,{
	__class__: haxe_ui_Backend
});
var haxe_ui_backend_CallLaterImpl = function(fn) {
	window.requestAnimationFrame(function(timestamp) {
		fn();
	});
};
$hxClasses["haxe.ui.backend.CallLaterImpl"] = haxe_ui_backend_CallLaterImpl;
haxe_ui_backend_CallLaterImpl.__name__ = "haxe.ui.backend.CallLaterImpl";
haxe_ui_backend_CallLaterImpl.prototype = {
	__class__: haxe_ui_backend_CallLaterImpl
};
var haxe_ui_CallLater = function(fn) {
	haxe_ui_backend_CallLaterImpl.call(this,fn);
};
$hxClasses["haxe.ui.CallLater"] = haxe_ui_CallLater;
haxe_ui_CallLater.__name__ = "haxe.ui.CallLater";
haxe_ui_CallLater.__super__ = haxe_ui_backend_CallLaterImpl;
haxe_ui_CallLater.prototype = $extend(haxe_ui_backend_CallLaterImpl.prototype,{
	__class__: haxe_ui_CallLater
});
var haxe_ui_backend_AppBase = function() {
	this._icon = null;
	this.__events = null;
};
$hxClasses["haxe.ui.backend.AppBase"] = haxe_ui_backend_AppBase;
haxe_ui_backend_AppBase.__name__ = "haxe.ui.backend.AppBase";
haxe_ui_backend_AppBase.prototype = {
	__events: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.__events == null) {
			this.__events = new haxe_ui_util_EventMap();
		}
		this.__events.add(type,listener,priority);
	}
	,hasEvent: function(type,listener) {
		if(this.__events == null) {
			return false;
		}
		return this.__events.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this.__events != null) {
			this.__events.remove(type,listener);
		}
	}
	,dispatch: function(event) {
		if(this.__events != null) {
			this.__events.invoke(event.type,event,null);
		}
	}
	,build: function() {
	}
	,init: function(onReady,onEnd) {
		onReady();
	}
	,getToolkitInit: function() {
		return { };
	}
	,start: function() {
	}
	,exit: function() {
	}
	,buildPreloadList: function() {
		return [];
	}
	,_icon: null
	,get_icon: function() {
		return this._icon;
	}
	,set_icon: function(value) {
		this._icon = value;
		return value;
	}
	,__class__: haxe_ui_backend_AppBase
	,__properties__: {set_icon:"set_icon",get_icon:"get_icon"}
};
var haxe_ui_backend_AppImpl = function() {
	haxe_ui_backend_AppBase.call(this);
};
$hxClasses["haxe.ui.backend.AppImpl"] = haxe_ui_backend_AppImpl;
haxe_ui_backend_AppImpl.__name__ = "haxe.ui.backend.AppImpl";
haxe_ui_backend_AppImpl.__super__ = haxe_ui_backend_AppBase;
haxe_ui_backend_AppImpl.prototype = $extend(haxe_ui_backend_AppBase.prototype,{
	init: function(onReady,onEnd) {
		var title = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.title");
		if(title != null) {
			haxe_ui_core_Screen.get_instance().set_title(title);
		}
		if(window.document.readyState == "complete") {
			onReady();
		} else {
			window.addEventListener("load",function(e) {
				onReady();
			});
		}
	}
	,getToolkitInit: function() {
		return { container : this.findContainer(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container","body"))};
	}
	,findContainer: function(id) {
		var el = null;
		if(id == "body") {
			el = window.document.body;
		} else if(id != null) {
			el = window.document.getElementById(id);
		}
		if(el == null) {
			el = window.document.body;
		}
		el.style.overflow = "hidden";
		return el;
	}
	,set_icon: function(value) {
		if(this._icon == value) {
			return value;
		}
		this._icon = value;
		var link = window.document.querySelector("link[rel~='icon']");
		if(link == null) {
			link = window.document.createElement("link");
			link.rel = "icon";
			window.document.getElementsByTagName("head")[0].appendChild(link);
		}
		haxe_ui_ToolkitAssets.get_instance().getImage(this._icon,function(imageInfo) {
			if(imageInfo != null) {
				link.href = imageInfo.data.src;
			}
		});
		return value;
	}
	,__class__: haxe_ui_backend_AppImpl
});
var haxe_ui_HaxeUIApp = function(options) {
	this.preloader = null;
	this.preloaderClass = null;
	haxe_ui_backend_AppImpl.call(this);
	haxe_ui_HaxeUIApp.instance = this;
	this._options = options;
	haxe_ui_Toolkit.build();
	this.build();
};
$hxClasses["haxe.ui.HaxeUIApp"] = haxe_ui_HaxeUIApp;
haxe_ui_HaxeUIApp.__name__ = "haxe.ui.HaxeUIApp";
haxe_ui_HaxeUIApp.__super__ = haxe_ui_backend_AppImpl;
haxe_ui_HaxeUIApp.prototype = $extend(haxe_ui_backend_AppImpl.prototype,{
	_options: null
	,ready: function(onReady,onEnd) {
		this.init(onReady,onEnd);
	}
	,preloaderClass: null
	,preloader: null
	,init: function(onReady,onEnd) {
		if(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.theme") != null && haxe_ui_Toolkit.get_theme() == "default") {
			haxe_ui_Toolkit.set_theme(haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.theme"));
		}
		if(this._options == null) {
			haxe_ui_Toolkit.init(this.getToolkitInit());
		} else {
			haxe_ui_Toolkit.init(this._options);
		}
		var preloadList = null;
		preloadList = this.buildPreloadList();
		if(preloadList != null && preloadList.length > 0) {
			if(this.preloaderClass == null) {
				this.preloader = new haxe_ui_Preloader();
			} else {
				this.preloader = Type.createInstance(this.preloaderClass,[]);
			}
			this.preloader.progress(0,preloadList.length);
			this.addComponent(this.preloader);
			this.preloader.validateComponent();
		}
		this.handlePreload(preloadList,onReady,onEnd,this.preloader);
	}
	,handlePreload: function(list,onReady,onEnd,preloader) {
		var _gthis = this;
		if(list == null || list.length == 0) {
			if(preloader != null) {
				preloader.complete();
			}
			haxe_ui_backend_AppImpl.prototype.init.call(this,onReady,onEnd);
			return;
		}
		var item = list.shift();
		switch(item.type) {
		case "font":
			haxe_ui_ToolkitAssets.get_instance().getFont(item.resourceId,function(f) {
				if(preloader != null) {
					preloader.increment();
				}
				_gthis.handlePreload(list,onReady,onEnd,preloader);
			});
			break;
		case "image":
			haxe_ui_ToolkitAssets.get_instance().getImage(item.resourceId,function(i) {
				if(preloader != null) {
					preloader.increment();
				}
				_gthis.handlePreload(list,onReady,onEnd,preloader);
			});
			break;
		default:
			haxe_Log.trace("WARNING: unknown type to preload \"" + item.type + "\", continuing",{ fileName : "haxe/ui/HaxeUIApp.hx", lineNumber : 87, className : "haxe.ui.HaxeUIApp", methodName : "handlePreload"});
			if(preloader != null) {
				preloader.increment();
			}
			this.handlePreload(list,onReady,onEnd,preloader);
		}
	}
	,get_title: function() {
		return haxe_ui_core_Screen.get_instance().get_title();
	}
	,set_title: function(value) {
		haxe_ui_core_Screen.get_instance().set_title(value);
		return value;
	}
	,addComponent: function(component) {
		return haxe_ui_core_Screen.get_instance().addComponent(component);
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return haxe_ui_core_Screen.get_instance().removeComponent(component,dispose);
	}
	,setComponentIndex: function(child,index) {
		return haxe_ui_core_Screen.get_instance().setComponentIndex(child,index);
	}
	,buildPreloadList: function() {
		var list = haxe_ui_backend_AppImpl.prototype.buildPreloadList.call(this);
		if(list == null) {
			list = [];
		}
		list = list.concat(haxe_ui_ToolkitAssets.get_instance().preloadList);
		return list;
	}
	,__class__: haxe_ui_HaxeUIApp
	,__properties__: $extend(haxe_ui_backend_AppImpl.prototype.__properties__,{set_title:"set_title",get_title:"get_title"})
});
var haxe_ui_Preloader = function() {
	haxe_ui_containers_Box.call(this);
	this.set_id("preloader");
	this.set_styleString("width:100%;height:100%;");
	this.set_percentWidth(this.set_percentHeight(100));
	this.set_styleNames("default-background");
};
$hxClasses["haxe.ui.Preloader"] = haxe_ui_Preloader;
haxe_ui_Preloader.__name__ = "haxe.ui.Preloader";
haxe_ui_Preloader.__super__ = haxe_ui_containers_Box;
haxe_ui_Preloader.prototype = $extend(haxe_ui_containers_Box.prototype,{
	createChildren: function() {
		var label = new haxe_ui_components_Label();
		label.set_text("Loading");
		label.set_verticalAlign("center");
		label.set_horizontalAlign("center");
		this.addComponent(label);
	}
	,validateComponentLayout: function() {
		var b = haxe_ui_containers_Box.prototype.validateComponentLayout.call(this);
		var tmp = this.get_actualComponentWidth() > 0 && this.get_actualComponentHeight() > 0;
		return b;
	}
	,_current: null
	,_max: null
	,progress: function(current,max) {
		this._current = current;
		this._max = max;
		if(current > 0) {
			var label = this.findComponent(null,haxe_ui_components_Label);
			if(label != null) {
				var text = label.get_text();
				if(StringTools.endsWith(text,"....")) {
					text = "Loading";
				}
				label.set_text(text);
			}
		}
	}
	,increment: function() {
		this.progress(this._current + 1,this._max);
	}
	,complete: function() {
		haxe_ui_core_Screen.get_instance().removeComponent(this);
	}
	,registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_Preloader();
	}
	,__class__: haxe_ui_Preloader
});
var haxe_ui_util_Properties = function() {
	this._props = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.Properties"] = haxe_ui_util_Properties;
haxe_ui_util_Properties.__name__ = "haxe.ui.util.Properties";
haxe_ui_util_Properties.prototype = {
	_props: null
	,exists: function(name) {
		return Object.prototype.hasOwnProperty.call(this._props.h,name);
	}
	,getProp: function(name,defaultValue) {
		var v = defaultValue;
		if(Object.prototype.hasOwnProperty.call(this._props.h,name)) {
			v = this._props.h[name];
		}
		return v;
	}
	,getPropInt: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			v = Std.parseInt(stringValue);
		}
		return v;
	}
	,getPropBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			v = stringValue == "true";
		}
		return v;
	}
	,getPropCol: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = defaultValue;
		var stringValue = this.getProp(name);
		if(stringValue != null) {
			var s = stringValue;
			if(StringTools.startsWith(s,"#")) {
				s = s.substring(1,s.length);
			} else if(StringTools.startsWith(s,"0x")) {
				s = s.substring(2,s.length);
			}
			v = Std.parseInt("0x" + s);
		}
		return v;
	}
	,setProp: function(name,value) {
		if(name == null || StringTools.trim(name).length == 0) {
			return;
		}
		var this1 = this._props;
		var key = StringTools.trim(name);
		var value1 = StringTools.trim(value);
		this1.h[key] = value1;
	}
	,names: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this._props.h);
	}
	,addAll: function(p) {
		var name = p.names();
		while(name.hasNext()) {
			var name1 = name.next();
			this.setProp(name1,p.getProp(name1));
		}
	}
	,__class__: haxe_ui_util_Properties
};
var haxe_ui_util_GenericConfig = function() {
	this.values = new haxe_ds_StringMap();
	this.sections = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.GenericConfig"] = haxe_ui_util_GenericConfig;
haxe_ui_util_GenericConfig.__name__ = "haxe.ui.util.GenericConfig";
haxe_ui_util_GenericConfig.prototype = {
	values: null
	,sections: null
	,addSection: function(name) {
		var config = new haxe_ui_util_GenericConfig();
		var array = this.sections.h[name];
		if(array == null) {
			array = [];
			this.sections.h[name] = array;
		}
		array.push(config);
		return config;
	}
	,findBy: function(section,field,value) {
		var array = this.sections.h[section];
		if(array == null) {
			return null;
		}
		if(field == null && value == null) {
			return array[0];
		}
		var r = null;
		var _g = 0;
		while(_g < array.length) {
			var item = array[_g];
			++_g;
			var h = item.values.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				if(key == field && (item.values.h[key] == value || item.values.h[key].toLowerCase() == value.toLowerCase())) {
					r = item;
					break;
				}
			}
			if(r != null) {
				break;
			}
		}
		return r;
	}
	,queryBool: function(q,defaultValue,conditionRef) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var r = this.query(q,null,conditionRef);
		if(r == null) {
			return defaultValue;
		}
		return r == "true";
	}
	,query: function(q,defaultValue,conditionRef) {
		if(Object.prototype.hasOwnProperty.call(haxe_ui_util_GenericConfig.cache.h,q)) {
			if(defaultValue != null && haxe_ui_util_GenericConfig.cache.h[q] == null) {
				return defaultValue;
			}
			return haxe_ui_util_GenericConfig.cache.h[q];
		}
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var finalArray = regexp.split(q);
		var ref = this;
		var value = null;
		var _g = 0;
		while(_g < finalArray.length) {
			var f = finalArray[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) {
				ref = ref.findBy(f);
			} else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			} else if(f.indexOf("@") != -1) {
				var v = HxOverrides.substr(f,1,f.length);
				value = ref.values.h[v];
				break;
			}
			if(ref == null) {
				haxe_ui_util_GenericConfig.cache.h[q] = defaultValue;
				return defaultValue;
			}
		}
		if(value == null) {
			value = defaultValue;
		}
		if(value != null) {
			haxe_ui_util_GenericConfig.cache.h[q] = value;
		}
		return value;
	}
	,queryValues: function(q,conditionRef) {
		var regexp = new EReg("\\.(?![^\\[]*\\])","g");
		var finalArray = regexp.split(q);
		var ref = this;
		var _g = 0;
		while(_g < finalArray.length) {
			var f = finalArray[_g];
			++_g;
			if(f.indexOf("[") == -1 && f.indexOf("@") == -1) {
				ref = ref.findBy(f);
			} else if(f.indexOf("[") != -1) {
				var p = f.split("[");
				var p1 = p[0];
				var p2 = p[1].split("=")[0];
				var p3 = p[1].split("=")[1];
				p3 = HxOverrides.substr(p3,0,p3.length - 1);
				ref = ref.findBy(p1,p2,p3);
			}
			if(ref == null) {
				return null;
			}
		}
		return ref.values;
	}
	,__class__: haxe_ui_util_GenericConfig
};
var haxe_ui_styles_CompositeStyleSheet = function() {
	this._animations = null;
	this._styleSheets = [];
};
$hxClasses["haxe.ui.styles.CompositeStyleSheet"] = haxe_ui_styles_CompositeStyleSheet;
haxe_ui_styles_CompositeStyleSheet.__name__ = "haxe.ui.styles.CompositeStyleSheet";
haxe_ui_styles_CompositeStyleSheet.prototype = {
	_styleSheets: null
	,_animations: null
	,get_animations: function() {
		if(this._animations != null) {
			return this._animations;
		}
		this._animations = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var h = s.get_animations().h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				var a = s.get_animations().h[key];
				this._animations.h[key] = a;
			}
		}
		return this._animations;
	}
	,findAnimation: function(id) {
		var h = this.get_animations().h;
		var a_h = h;
		var a_keys = Object.keys(h);
		var a_length = a_keys.length;
		var a_current = 0;
		while(a_current < a_length) {
			var a = a_h[a_keys[a_current++]];
			if(a.id == id) {
				return a;
			}
		}
		return null;
	}
	,hasMediaQueries: null
	,get_hasMediaQueries: function() {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var styleSheet = _g1[_g];
			++_g;
			if(styleSheet.get_hasMediaQueries() == true) {
				return true;
			}
		}
		return false;
	}
	,getAnimation: function(id,create) {
		if(create == null) {
			create = true;
		}
		var a = this.findAnimation(id);
		if(a == null) {
			a = new haxe_ui_styles_elements_AnimationKeyFrames(id,[]);
			this.addAnimation(a);
		}
		return a;
	}
	,addAnimation: function(animation) {
		this._styleSheets[0].addAnimation(animation);
	}
	,addStyleSheet: function(styleSheet) {
		this._styleSheets.push(styleSheet);
	}
	,removeStyleSheet: function(styleSheet) {
		HxOverrides.remove(this._styleSheets,styleSheet);
	}
	,parse: function(css,styleSheetName,invalidateAll) {
		if(invalidateAll == null) {
			invalidateAll = false;
		}
		if(styleSheetName == null) {
			styleSheetName = "default";
		}
		var s = this.findStyleSheet(styleSheetName);
		if(s == null) {
			s = new haxe_ui_styles_StyleSheet();
			s.name = styleSheetName;
			this._styleSheets.push(s);
		}
		s.parse(css);
		this._animations = null;
		if(invalidateAll == true) {
			haxe_ui_core_Screen.get_instance().invalidateAll();
		}
	}
	,findStyleSheet: function(styleSheetName) {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(s.name == styleSheetName) {
				return s;
			}
		}
		return null;
	}
	,findRule: function(selector) {
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			var el = s.findRule(selector);
			if(el != null) {
				return el;
			}
		}
		return null;
	}
	,findMatchingRules: function(selector) {
		var m = [];
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			m = m.concat(s.findMatchingRules(selector));
		}
		return m;
	}
	,getAllRules: function() {
		var r = [];
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			r = r.concat(s.get_rules());
		}
		return r;
	}
	,buildStyleFor: function(c) {
		var style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		var _g = 0;
		var _g1 = this._styleSheets;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			style = s.buildStyleFor(c,style);
		}
		return style;
	}
	,clear: function(styleSheetName) {
		var s = this.findStyleSheet(styleSheetName);
		if(s != null) {
			s.clear();
			this._animations = null;
		}
	}
	,__class__: haxe_ui_styles_CompositeStyleSheet
	,__properties__: {get_hasMediaQueries:"get_hasMediaQueries",get_animations:"get_animations"}
};
var haxe_ui_Toolkit = function() { };
$hxClasses["haxe.ui.Toolkit"] = haxe_ui_Toolkit;
haxe_ui_Toolkit.__name__ = "haxe.ui.Toolkit";
haxe_ui_Toolkit.__properties__ = {set_scale:"set_scale",get_scale:"get_scale",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",get_autoScaleDPIThreshold:"get_autoScaleDPIThreshold",set_pixelsPerRem:"set_pixelsPerRem",get_screen:"get_screen",get_assets:"get_assets",get_initialized:"get_initialized",get_backendProperties:"get_backendProperties",set_theme:"set_theme",get_theme:"get_theme"};
haxe_ui_Toolkit.get_theme = function() {
	return haxe_ui_Toolkit._theme;
};
haxe_ui_Toolkit.set_theme = function(value) {
	if(haxe_ui_Toolkit._theme == value) {
		return value;
	}
	haxe_ui_Toolkit._theme = value;
	if(haxe_ui_Toolkit._initialized == true) {
		haxe_ui_themes_ThemeManager.get_instance().applyTheme(haxe_ui_Toolkit._theme);
		haxe_ui_core_Screen.get_instance().onThemeChanged();
		haxe_ui_core_Screen.get_instance().invalidateAll();
	}
	return value;
};
haxe_ui_Toolkit.get_backendProperties = function() {
	haxe_ui_Toolkit.buildBackend();
	return haxe_ui_Toolkit._backendProperties;
};
haxe_ui_Toolkit.build = function() {
	if(haxe_ui_Toolkit._built == true) {
		return;
	}
	haxe_ui_themes_ThemeManager.get_instance().getTheme("native").parent = "default";
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("native","haxeui-core/styles/native/main.css",-3.,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","haxeui-core/styles/global.css",-4.,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/main.css",-3.,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/buttons.css",-2.99,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/dialogs.css",-2.9800000000000004,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/windows.css",-2.9700000000000006,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/textinputs.css",-2.9600000000000009,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/scrollbars.css",-2.9500000000000011,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/scrollview.css",-2.9400000000000013,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/checkboxes.css",-2.9300000000000015,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/optionboxes.css",-2.9200000000000017,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/ranges.css",-2.9100000000000019,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/progressbars.css",-2.9000000000000021,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/sliders.css",-2.8900000000000023,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/steppers.css",-2.8800000000000026,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tabs.css",-2.8700000000000028,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/listview.css",-2.860000000000003,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/dropdowns.css",-2.8500000000000032,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tableview.css",-2.8400000000000034,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/switches.css",-2.8300000000000036,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/calendars.css",-2.8200000000000038,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/menus.css",-2.8100000000000041,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/accordion.css",-2.8000000000000043,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/propertygrids.css",-2.7900000000000045,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/frames.css",-2.7800000000000047,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/splitters.css",-2.7700000000000049,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/tooltips.css",-2.7600000000000051,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/rules.css",-2.7500000000000053,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/sidebars.css",-2.7400000000000055,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/cards.css",-2.7300000000000058,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/treeviews.css",-2.720000000000006,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/colorpickers.css",-2.7100000000000062,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","haxeui-core/styles/default/last.css",-2.7000000000000064,null);
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","warning-large","haxeui-core/styles/shared/warning-large.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","tooltip-background-color","#fffff8");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","tertiary-background-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","sort-desc","haxeui-core/styles/shared/sortable-desc-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","sort-asc","haxeui-core/styles/shared/sortable-asc-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","solid-background-color-hover","#fcfcfc");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","solid-background-color-down","#f0f0f0");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","solid-background-color-disabled","#fefefe");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","solid-background-color-alt","#fafafa");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","solid-background-color","#f6f6f6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","selection-text-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","selection-background-color-hover","#d9e5f2");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","selection-background-color","#b4cbe4");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","secondary-background-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","search","haxeui-core/styles/shared/search.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","scrollbar-button-color","#d6d6d6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","scrollbar-background-color","#f0f0f0");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","restore-hover","haxeui-core/styles/shared/restore-button-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","restore","haxeui-core/styles/shared/restore-button-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","question-large","haxeui-core/styles/shared/help-large.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","option-selected","haxeui-core/styles/shared/option-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-text-color","#666666");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-inner-shadow","drop-shadow(1, 45, #888888, 0.1, 1, 1, 1, 3, true)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-border-size","1px");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-border-radius","2px");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-border-color","#d2d2d2");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-background-color-start","#fdfdfd");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","normal-background-color-end","#f6f6f6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","modal-background-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","minimize-hover","haxeui-core/styles/shared/minimize-button-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","minimize","haxeui-core/styles/shared/minimize-button-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","menu-shadow","drop-shadow(2, 45, #888888, 0.1, 4, 1, 30, 35, false)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","maximize-hover","haxeui-core/styles/shared/maximize-button-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","maximize","haxeui-core/styles/shared/maximize-button-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","lighter-text-color","#a0a0a0");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","info-large","haxeui-core/styles/shared/info-large.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","hover-text-color","#444444");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","hover-border-color","#c0c0c0");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","hover-background-color-start","#f2f2f2");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","hover-background-color-end","#e1e1e1");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","gripper-vertical","haxeui-core/styles/shared/gripper-vertical.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","gripper-horizontal","haxeui-core/styles/shared/gripper-horizontal.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","expanded","haxeui-core/styles/shared/collapsed-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","expand-hover","haxeui-core/styles/shared/window-expand-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","expand","haxeui-core/styles/shared/window-expand-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","error-text-color","#ff0000");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","error-large","haxeui-core/styles/shared/error-large.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","error-background-color","#ffdddd");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","down-text-color","#444444");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","down-border-color","#b3b3b3");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","down-background-color-start","#e6e6e6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","down-background-color-end","#cccccc");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","disabled-text-color","#cccccc");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","disabled-border-color","#e4e4e4");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","disabled-background-color-start","#fdfdfd");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","disabled-background-color-end","#f6f6f6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","dialog-title-color","#aaaaaa");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","dialog-shadow","drop-shadow(1, 45, #888888, 0.2, 30, 2, 1, 3, false)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","default-background-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","contrast-background-color","#ffffff");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","collapsed","haxeui-core/styles/shared/expanded-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","collapse-hover","haxeui-core/styles/shared/window-collapse-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","collapse","haxeui-core/styles/shared/window-collapse-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","close-hover","haxeui-core/styles/shared/close-button-white.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","close","haxeui-core/styles/shared/close-button-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","check-selected","haxeui-core/styles/shared/check-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","blank","haxeui-core/styles/shared/blank.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-up-down","haxeui-core/styles/shared/sortable-arrows-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-up","haxeui-core/styles/shared/up-arrow-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-right-square","haxeui-core/styles/shared/right-arrow-square-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-right","haxeui-core/styles/shared/right-arrow-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-left","haxeui-core/styles/shared/left-arrow-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-down-square","haxeui-core/styles/shared/down-arrow-square-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","arrow-down","haxeui-core/styles/shared/down-arrow-blue.png");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","accent-gradient-start","#98c4e6");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","accent-gradient-end","#549bde");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","accent-color-lighter","#ecf2f9");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","accent-color-darker","#407dbf");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("default","accent-color","#83aad4");
	haxe_ui_themes_ThemeManager.get_instance().getTheme("dark").parent = "default";
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("dark","haxeui-core/styles/dark/scrollbars.css",-2.,null);
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","tooltip-background-color","#3d3f41");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","tertiary-background-color","#313435");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","solid-background-color-hover","#393b3c");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","solid-background-color-down","#313335");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","solid-background-color-disabled","#2f3132");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","solid-background-color-alt","#2d2e2f");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","solid-background-color","#3d3f41");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","selection-text-color","#d4d4d4");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","selection-background-color-hover","#323e52");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","selection-background-color","#415982");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","secondary-background-color","#3d3f41");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","scrollbar-button-color","#3e4142");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","scrollbar-background-color","#2c2f30");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-text-color","#aaaaaa");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-inner-shadow","drop-shadow(1, 45, #000000, 0.2, 2, 2, 1, 3, true)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-border-size","1px");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-border-radius","2px");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-border-color","#222426");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-background-color-start","#3e4142");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","normal-background-color-end","#36383a");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","modal-background-color","#181a1b");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","menu-shadow","drop-shadow(2, 45, #000000, 0.15, 6, 1, 30, 35, false)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","lighter-text-color","#737373");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","hover-text-color","#bbbbbb");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","hover-border-color","#222426");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","hover-background-color-start","#434647");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","hover-background-color-end","#393b3c");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","error-text-color","#880000");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","error-background-color","#cf6679");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","down-text-color","#999999");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","down-border-color","#222426");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","down-background-color-start","#393c3c");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","down-background-color-end","#313335");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","disabled-text-color","#595959");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","disabled-border-color","#26292b");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","disabled-background-color-start","#36393a");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","disabled-background-color-end","#313335");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","dialog-title-color","#aaaaaa");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","dialog-shadow","drop-shadow(1, 45, #000000, 0.2, 30, 2, 1, 3, false)");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","default-background-color","#2c2f30");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","contrast-background-color","#aaaaaa");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","accent-gradient-start","#334666");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","accent-gradient-end","#2f3746");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","accent-color-lighter","#323e52");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","accent-color-darker","#407dbf");
	haxe_ui_themes_ThemeManager.get_instance().setThemeVar("dark","accent-color","#3c5177");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("en","haxeui-core/locale/en/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("en","haxeui-core/locale/en/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("en_US","haxeui-core/locale/en_US/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("es","haxeui-core/locale/es/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("es","haxeui-core/locale/es/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("de","haxeui-core/locale/de/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("de","haxeui-core/locale/de/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("fr","haxeui-core/locale/fr/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("fr","haxeui-core/locale/fr/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("it","haxeui-core/locale/it/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("it","haxeui-core/locale/it/formats.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("ru","haxeui-core/locale/ru/std-strings.properties");
	haxe_ui_locale_LocaleManager.get_instance().parseResource("ru","haxeui-core/locale/ru/formats.properties");
	haxe_ui_actions_ActionManager.get_instance().registerInputSource(new haxe_ui_actions_KeyboardActionInputSource());
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("global","styles/main.css",-2,null);
	haxe_ui_themes_ThemeManager.get_instance().addStyleResource("default","styles/default/main.css",-1,null);
	haxe_ui_core_ComponentClassMap.register("tooltip","haxe.ui.tooltips.ToolTip");
	haxe_ui_core_ComponentClassMap.register("preloader","haxe.ui.Preloader");
	haxe_ui_core_ComponentClassMap.register("label","haxe.ui.components.Label");
	haxe_ui_core_ComponentClassMap.register("itemrenderer","haxe.ui.core.ItemRenderer");
	haxe_ui_core_ComponentClassMap.register("interactivecomponent","haxe.ui.core.InteractiveComponent");
	haxe_ui_core_ComponentClassMap.register("image","haxe.ui.components.Image");
	haxe_ui_core_ComponentClassMap.register("component","haxe.ui.core.Component");
	haxe_ui_core_ComponentClassMap.register("canvas","haxe.ui.components.Canvas");
	haxe_ui_core_ComponentClassMap.register("button","haxe.ui.components.Button");
	haxe_ui_core_ComponentClassMap.register("box","haxe.ui.containers.Box");
	haxe_ui_Toolkit.buildBackend();
	haxe_ui_Toolkit._built = true;
};
haxe_ui_Toolkit.buildBackend = function() {
	if(haxe_ui_Toolkit._backendBuilt == true) {
		return;
	}
	haxe_ui_util_Defines.set("windows","1");
	haxe_ui_util_Defines.set("utf16","1");
	haxe_ui_util_Defines.set("true","1");
	haxe_ui_util_Defines.set("target.utf16","true");
	haxe_ui_util_Defines.set("target.unicode","true");
	haxe_ui_util_Defines.set("target.name","js");
	haxe_ui_util_Defines.set("source_header","Generated by Haxe 4.2.5");
	haxe_ui_util_Defines.set("js_es5","1");
	haxe_ui_util_Defines.set("js_es","5");
	haxe_ui_util_Defines.set("js-es5","1");
	haxe_ui_util_Defines.set("js","1");
	haxe_ui_util_Defines.set("html5","1.4.0");
	haxe_ui_util_Defines.set("hscript","2.5.0");
	haxe_ui_util_Defines.set("haxeui_html5","1.4.0");
	haxe_ui_util_Defines.set("haxeui_core","1.4.0");
	haxe_ui_util_Defines.set("haxeui_allow_subpixels","1");
	haxe_ui_util_Defines.set("haxeui-html5","1.4.0");
	haxe_ui_util_Defines.set("haxeui-core","1.4.0");
	haxe_ui_util_Defines.set("haxe_ver","4.205");
	haxe_ui_util_Defines.set("haxe4","1");
	haxe_ui_util_Defines.set("haxe3","1");
	haxe_ui_util_Defines.set("haxe","4.2.5");
	haxe_ui_util_Defines.set("dce","std");
	haxe_ui_util_Defines.set("core","1.4.0");
	haxe_ui_util_Defines.set("backend","html5");
	haxe_ui_util_Defines.set("allow_subpixels","1");
	haxe_ui_Toolkit._backendBuilt = true;
};
haxe_ui_Toolkit.get_initialized = function() {
	return haxe_ui_Toolkit._initialized;
};
haxe_ui_Toolkit.init = function(options) {
	haxe_ui_Toolkit.build();
	haxe_ui_themes_ThemeManager.get_instance().applyTheme(haxe_ui_Toolkit._theme);
	if(options != null) {
		haxe_ui_Toolkit.get_screen().set_options(options);
		haxe_ui_ToolkitAssets.get_instance().options = options;
	}
	haxe_ui_Toolkit.get_screen().registerEvent("keydown",haxe_ui_Toolkit.onKeyDown);
	haxe_ui_Toolkit._initialized = true;
};
haxe_ui_Toolkit.onKeyDown = function(event) {
	if(event.keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("tab")) {
		if(event.shiftKey == false) {
			haxe_ui_focus_FocusManager.get_instance().focusNext();
		} else {
			haxe_ui_focus_FocusManager.get_instance().focusPrev();
		}
	}
};
haxe_ui_Toolkit.get_assets = function() {
	return haxe_ui_ToolkitAssets.get_instance();
};
haxe_ui_Toolkit.get_screen = function() {
	return haxe_ui_core_Screen.get_instance();
};
haxe_ui_Toolkit.set_pixelsPerRem = function(value) {
	if(haxe_ui_Toolkit.pixelsPerRem == value) {
		return value;
	}
	haxe_ui_Toolkit.pixelsPerRem = value;
	haxe_ui_core_Screen.get_instance().refreshStyleRootComponents();
	return value;
};
haxe_ui_Toolkit.get_autoScaleDPIThreshold = function() {
	if(haxe_ui_core_Screen.get_instance().get_isRetina() == true) {
		return 192;
	}
	return 120;
};
haxe_ui_Toolkit.get_scaleX = function() {
	if(haxe_ui_Toolkit._scaleX == 0) {
		if(haxe_ui_Toolkit.autoScale == true) {
			var dpi = haxe_ui_core_Screen.get_instance().get_dpi();
			if(dpi > haxe_ui_Toolkit.get_autoScaleDPIThreshold()) {
				if(haxe_ui_Toolkit.roundScale == true) {
					haxe_ui_Toolkit._scaleX = Math.round(dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold());
				} else {
					haxe_ui_Toolkit._scaleX = dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold();
				}
			} else {
				haxe_ui_Toolkit._scaleX = 1;
			}
		} else {
			haxe_ui_Toolkit._scaleX = 1;
		}
	}
	return haxe_ui_Toolkit._scaleX;
};
haxe_ui_Toolkit.set_scaleX = function(value) {
	if(haxe_ui_Toolkit._scaleX == value) {
		return value;
	}
	haxe_ui_Toolkit._scaleX = value;
	haxe_ui_Toolkit.autoScale = false;
	return value;
};
haxe_ui_Toolkit.get_scaleY = function() {
	if(haxe_ui_Toolkit._scaleY == 0) {
		if(haxe_ui_Toolkit.autoScale == true) {
			var dpi = haxe_ui_core_Screen.get_instance().get_dpi();
			if(dpi > haxe_ui_Toolkit.get_autoScaleDPIThreshold()) {
				if(haxe_ui_Toolkit.roundScale == true) {
					haxe_ui_Toolkit._scaleY = Math.round(dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold());
				} else {
					haxe_ui_Toolkit._scaleY = dpi / haxe_ui_Toolkit.get_autoScaleDPIThreshold();
				}
			} else {
				haxe_ui_Toolkit._scaleY = 1;
			}
		} else {
			haxe_ui_Toolkit._scaleY = 1;
		}
	}
	return haxe_ui_Toolkit._scaleY;
};
haxe_ui_Toolkit.set_scaleY = function(value) {
	if(haxe_ui_Toolkit._scaleY == value) {
		return value;
	}
	haxe_ui_Toolkit._scaleY = value;
	haxe_ui_Toolkit.autoScale = false;
	return value;
};
haxe_ui_Toolkit.get_scale = function() {
	return Math.max(haxe_ui_Toolkit.get_scaleX(),haxe_ui_Toolkit.get_scaleY());
};
haxe_ui_Toolkit.set_scale = function(value) {
	haxe_ui_Toolkit.set_scaleX(value);
	haxe_ui_Toolkit.set_scaleY(value);
	return value;
};
haxe_ui_Toolkit.callLater = function(fn) {
	new haxe_ui_CallLater(fn);
};
var haxe_ui_backend_AssetsBase = function() {
};
$hxClasses["haxe.ui.backend.AssetsBase"] = haxe_ui_backend_AssetsBase;
haxe_ui_backend_AssetsBase.__name__ = "haxe.ui.backend.AssetsBase";
haxe_ui_backend_AssetsBase.isAbsolutePath = function(path) {
	if(StringTools.startsWith(path,"/")) {
		return true;
	}
	if(path.charAt(1) == ":") {
		return true;
	}
	if(StringTools.startsWith(path,"\\\\")) {
		return true;
	}
	return false;
};
haxe_ui_backend_AssetsBase.prototype = {
	getTextDelegate: function(resourceId) {
		return null;
	}
	,getImageInternal: function(resourceId,callback) {
		callback(null);
	}
	,getImageFromHaxeResource: function(resourceId,callback) {
		callback(resourceId,null);
	}
	,imageFromBytes: function(bytes,callback) {
		callback(null);
	}
	,imageFromFile: function(filename,callback) {
		haxe_Log.trace("WARNING: cant load from file system on non-sys targets [" + filename + "]",{ fileName : "haxe/ui/backend/AssetsBase.hx", lineNumber : 50, className : "haxe.ui.backend.AssetsBase", methodName : "imageFromFile"});
		callback(null);
	}
	,getFontInternal: function(resourceId,callback) {
		callback(null);
	}
	,getFontFromHaxeResource: function(resourceId,callback) {
		callback(resourceId,null);
	}
	,imageInfoFromImageData: function(imageData) {
		return { data : imageData, width : 0, height : 0};
	}
	,__class__: haxe_ui_backend_AssetsBase
};
var haxe_ui_backend_AssetsImpl = function() {
	haxe_ui_backend_AssetsBase.call(this);
};
$hxClasses["haxe.ui.backend.AssetsImpl"] = haxe_ui_backend_AssetsImpl;
haxe_ui_backend_AssetsImpl.__name__ = "haxe.ui.backend.AssetsImpl";
haxe_ui_backend_AssetsImpl.__super__ = haxe_ui_backend_AssetsBase;
haxe_ui_backend_AssetsImpl.prototype = $extend(haxe_ui_backend_AssetsBase.prototype,{
	getImageInternal: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes != null) {
			callback(null);
			return;
		}
		var image = window.document.createElement("img");
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(imageInfo);
		};
		image.onerror = function(e) {
			callback(null);
		};
		image.src = resourceId;
	}
	,getImageFromHaxeResource: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		this.imageFromBytes(bytes,function(imageInfo) {
			callback(resourceId,imageInfo);
		});
	}
	,imageFromBytes: function(bytes,callback) {
		if(bytes == null) {
			callback(null);
			return;
		}
		var image = window.document.createElement("img");
		image.onload = function(e) {
			var imageInfo = { width : image.width, height : image.height, data : image};
			callback(imageInfo);
		};
		image.onerror = function(e) {
			window.console.log(e);
			callback(null);
		};
		var blob = new Blob([bytes.b.bufferValue]);
		var blobUrl = URL.createObjectURL(blob);
		image.src = blobUrl;
	}
	,getFontInternal: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes == null) {
			haxe_ui_backend_html5_util_FontDetect.onFontLoaded(resourceId,function(f) {
				var fontInfo = { data : f};
				callback(fontInfo);
			},function(f) {
				callback(null);
			});
			return;
		}
		this.getFontFromHaxeResource(resourceId,function(r,f) {
			callback(f);
		});
	}
	,imageInfoFromImageData: function(imageData) {
		return { data : imageData, width : imageData.width, height : imageData.height};
	}
	,getFontFromHaxeResource: function(resourceId,callback) {
		var bytes = haxe_Resource.getBytes(resourceId);
		if(bytes == null) {
			callback(resourceId,null);
			return;
		}
		var fontFamilyParts = resourceId.split("/");
		var fontFamily = fontFamilyParts[fontFamilyParts.length - 1];
		if(fontFamily.indexOf(".") != -1) {
			fontFamily = HxOverrides.substr(fontFamily,0,fontFamily.indexOf("."));
		}
		var fontFace = new FontFace(fontFamily,bytes.b.bufferValue);
		fontFace.load().then(function(loadedFace) {
			window.document.fonts.add(loadedFace);
			haxe_ui_backend_html5_util_FontDetect.onFontLoaded(fontFamily,function(f) {
				var fontInfo = { data : fontFamily};
				callback(resourceId,fontInfo);
			},function(f) {
				callback(resourceId,null);
			});
		}).catch(function(error) {
			callback(resourceId,null);
		});
	}
	,__class__: haxe_ui_backend_AssetsImpl
});
var haxe_ui_ToolkitAssets = function() {
	this.options = null;
	this.preloadList = [];
	haxe_ui_backend_AssetsImpl.call(this);
};
$hxClasses["haxe.ui.ToolkitAssets"] = haxe_ui_ToolkitAssets;
haxe_ui_ToolkitAssets.__name__ = "haxe.ui.ToolkitAssets";
haxe_ui_ToolkitAssets.__properties__ = {get_instance:"get_instance"};
haxe_ui_ToolkitAssets.get_instance = function() {
	if(haxe_ui_ToolkitAssets._instance == null) {
		haxe_ui_ToolkitAssets._instance = new haxe_ui_ToolkitAssets();
	}
	return haxe_ui_ToolkitAssets._instance;
};
haxe_ui_ToolkitAssets.__super__ = haxe_ui_backend_AssetsImpl;
haxe_ui_ToolkitAssets.prototype = $extend(haxe_ui_backend_AssetsImpl.prototype,{
	preloadList: null
	,options: null
	,_fontCache: null
	,_fontCallbacks: null
	,_imageCache: null
	,_imageCallbacks: null
	,getFont: function(resourceId,callback,useCache) {
		if(useCache == null) {
			useCache = true;
		}
		var _gthis = this;
		if(this._fontCache != null && this._fontCache.h[resourceId] != null && useCache == true) {
			callback(this._fontCache.h[resourceId]);
		} else {
			if(this._fontCallbacks == null) {
				this._fontCallbacks = new haxe_ui_util_CallbackMap();
			}
			this._fontCallbacks.add(resourceId,callback);
			if(this._fontCallbacks.count(resourceId) == 1) {
				this.getFontInternal(resourceId,function(font) {
					if(font != null) {
						_gthis._onFontLoaded(resourceId,font);
					} else if(haxe_Resource.listNames().indexOf(resourceId) != -1) {
						_gthis.getFontFromHaxeResource(resourceId,$bind(_gthis,_gthis._onFontLoaded));
					} else {
						_gthis._fontCallbacks.remove(resourceId,callback);
						callback(null);
					}
				});
			}
		}
	}
	,_onFontLoaded: function(resourceId,font) {
		if(this._fontCache == null) {
			this._fontCache = new haxe_ds_StringMap();
		}
		this._fontCache.h[resourceId] = font;
		this._fontCallbacks.invokeAndRemove(resourceId,font);
	}
	,cacheImage: function(resourceId,imageInfo) {
		if(this._imageCache == null) {
			this._imageCache = new haxe_ds_StringMap();
		}
		if(imageInfo == null || resourceId == null) {
			return;
		}
		this._imageCache.h[resourceId] = imageInfo;
	}
	,getCachedImage: function(resourceId) {
		if(this._imageCache == null) {
			return null;
		}
		return this._imageCache.h[resourceId];
	}
	,getImage: function(resourceId,callback,useCache) {
		if(useCache == null) {
			useCache = true;
		}
		var _gthis = this;
		var orginalResourceId = resourceId;
		resourceId = this.runPlugins(resourceId);
		if(this._imageCache != null && this._imageCache.h[resourceId] != null && useCache == true) {
			callback(this._imageCache.h[resourceId]);
		} else {
			if(this._imageCallbacks == null) {
				this._imageCallbacks = new haxe_ui_util_CallbackMap();
			}
			this._imageCallbacks.add(resourceId,callback);
			if(this._imageCallbacks.count(resourceId) == 1) {
				this.getImageInternal(resourceId,function(imageInfo) {
					if(imageInfo != null) {
						_gthis._onImageLoaded(resourceId,imageInfo);
					} else if(haxe_Resource.listNames().indexOf(orginalResourceId) != -1) {
						_gthis._imageCallbacks.remove(resourceId,callback);
						_gthis._imageCallbacks.add(orginalResourceId,callback);
						_gthis.getImageFromHaxeResource(orginalResourceId,$bind(_gthis,_gthis._onImageLoaded));
					} else if(haxe_Resource.listNames().indexOf(resourceId) != -1) {
						_gthis.getImageFromHaxeResource(resourceId,$bind(_gthis,_gthis._onImageLoaded));
					} else {
						_gthis._imageCallbacks.remove(resourceId,callback);
						callback(null);
					}
				});
			}
		}
	}
	,_onImageLoaded: function(resourceId,imageInfo) {
		if(imageInfo != null && (imageInfo.width == -1 || imageInfo.width == -1)) {
			haxe_Log.trace("WARNING: imageData.originalWidth == -1 || imageData.originalHeight == -1",{ fileName : "haxe/ui/ToolkitAssets.hx", lineNumber : 123, className : "haxe.ui.ToolkitAssets", methodName : "_onImageLoaded"});
		}
		if(this._imageCache == null) {
			this._imageCache = new haxe_ds_StringMap();
		}
		this._imageCache.h[resourceId] = imageInfo;
		this._imageCallbacks.invokeAndRemove(resourceId,imageInfo);
	}
	,getText: function(resourceId) {
		var s = this.getTextDelegate(resourceId);
		if(s == null) {
			s = haxe_Resource.getString(resourceId);
		}
		return s;
	}
	,getBytes: function(resourceId) {
		return haxe_Resource.getBytes(resourceId);
	}
	,_plugins: null
	,addPlugin: function(plugin) {
		if(this._plugins == null) {
			this._plugins = [];
		}
		this._plugins.push(plugin);
	}
	,runPlugins: function(asset) {
		if(this._plugins == null) {
			return asset;
		}
		var _g = 0;
		var _g1 = this._plugins;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			asset = p.invoke(asset);
		}
		return asset;
	}
	,__class__: haxe_ui_ToolkitAssets
});
var haxe_ui_actions_ActionManager = function() {
	this._repeatActions = new haxe_ds_StringMap();
	this._inputSources = [];
	this._events = null;
	this.navigationMethod = "navigationDesktop";
};
$hxClasses["haxe.ui.actions.ActionManager"] = haxe_ui_actions_ActionManager;
haxe_ui_actions_ActionManager.__name__ = "haxe.ui.actions.ActionManager";
haxe_ui_actions_ActionManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_actions_ActionManager.get_instance = function() {
	if(haxe_ui_actions_ActionManager._instance == null) {
		haxe_ui_actions_ActionManager._instance = new haxe_ui_actions_ActionManager();
	}
	return haxe_ui_actions_ActionManager._instance;
};
haxe_ui_actions_ActionManager.prototype = {
	navigationMethod: null
	,_events: null
	,_inputSources: null
	,_repeatActions: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this._events == null) {
			this._events = new haxe_ui_util_EventMap();
		}
		this._events.add(type,listener,priority);
	}
	,unregisterEvent: function(type,listener) {
		if(this._events == null) {
			return;
		}
		this._events.remove(type,listener);
	}
	,dispatch: function(event) {
		if(this._events == null) {
			return;
		}
		this._events.invoke(event.type,event);
	}
	,registerInputSource: function(source) {
		source.start();
		this._inputSources.push(source);
	}
	,actionStart: function(action,source) {
		var _gthis = this;
		var currentFocus = haxe_ui_focus_FocusManager.get_instance().get_focus();
		if(currentFocus == null) {
			return;
		}
		if(!((currentFocus) instanceof haxe_ui_core_InteractiveComponent)) {
			return;
		}
		var actionEvent = new haxe_ui_events_ActionEvent("actionstart",action);
		var c = js_Boot.__cast(currentFocus , haxe_ui_core_InteractiveComponent);
		c.dispatch(actionEvent);
		if(actionEvent.canceled == false) {
			var c1 = js_Boot.getClass(source);
			this.dispatch(new haxe_ui_events_ActionEvent("actionstart",action,false,c1.__name__));
		}
		if(actionEvent.repeater == true && Object.prototype.hasOwnProperty.call(this._repeatActions.h,action) == false) {
			var this1 = this._repeatActions;
			var value = { type : action, timer : new haxe_ui_util_Timer(c.actionRepeatInterval,function() {
				_gthis.actionStart(action,source);
			})};
			this1.h[action] = value;
		}
	}
	,actionEnd: function(action,source) {
		var currentFocus = haxe_ui_focus_FocusManager.get_instance().get_focus();
		if(currentFocus == null) {
			return;
		}
		if(!((currentFocus) instanceof haxe_ui_core_InteractiveComponent)) {
			return;
		}
		var actionEvent = new haxe_ui_events_ActionEvent("actionend",action);
		var c = js_Boot.__cast(currentFocus , haxe_ui_core_InteractiveComponent);
		c.dispatch(actionEvent);
		if(actionEvent.canceled == false) {
			var c = js_Boot.getClass(source);
			this.dispatch(new haxe_ui_events_ActionEvent("actionend",action,false,c.__name__));
		}
		if(Object.prototype.hasOwnProperty.call(this._repeatActions.h,action)) {
			var info = this._repeatActions.h[action];
			info.timer.stop();
			var _this = this._repeatActions;
			var key = action;
			if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
				delete(_this.h[key]);
			}
		}
	}
	,__class__: haxe_ui_actions_ActionManager
};
var haxe_ui_actions_IActionInputSource = function() { };
$hxClasses["haxe.ui.actions.IActionInputSource"] = haxe_ui_actions_IActionInputSource;
haxe_ui_actions_IActionInputSource.__name__ = "haxe.ui.actions.IActionInputSource";
haxe_ui_actions_IActionInputSource.__isInterface__ = true;
haxe_ui_actions_IActionInputSource.prototype = {
	start: null
	,__class__: haxe_ui_actions_IActionInputSource
};
var haxe_ui_actions_KeyboardActionInputSource = function() {
	this._downKeys = new haxe_ds_IntMap();
	this._started = false;
};
$hxClasses["haxe.ui.actions.KeyboardActionInputSource"] = haxe_ui_actions_KeyboardActionInputSource;
haxe_ui_actions_KeyboardActionInputSource.__name__ = "haxe.ui.actions.KeyboardActionInputSource";
haxe_ui_actions_KeyboardActionInputSource.__interfaces__ = [haxe_ui_actions_IActionInputSource];
haxe_ui_actions_KeyboardActionInputSource.prototype = {
	_started: null
	,start: function() {
		if(this._started == true) {
			return;
		}
		this._started = true;
		haxe_ui_core_Screen.get_instance().registerEvent("keydown",$bind(this,this.onKeyDown));
		haxe_ui_core_Screen.get_instance().registerEvent("keyup",$bind(this,this.onKeyUp));
	}
	,_downKeys: null
	,onKeyDown: function(e) {
		var keyCode = e.keyCode;
		if(this._downKeys.h.hasOwnProperty(keyCode)) {
			return;
		}
		this._downKeys.h[keyCode] = true;
		if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("space")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionPress",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("left")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionLeft",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("right")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionRight",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("up")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionUp",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("down")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionDown",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("escape")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionBack",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("enter")) {
			haxe_ui_actions_ActionManager.get_instance().actionStart("actionConfirm",this);
		}
	}
	,onKeyUp: function(e) {
		var keyCode = e.keyCode;
		if(this._downKeys.h.hasOwnProperty(keyCode) == false) {
			return;
		}
		this._downKeys.remove(keyCode);
		if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("space")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionPress",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("left")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionLeft",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("right")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionRight",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("up")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionUp",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("down")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionDown",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("escape")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionBack",this);
		} else if(keyCode == haxe_ui_core_Platform.get_instance().getKeyCode("enter")) {
			haxe_ui_actions_ActionManager.get_instance().actionEnd("actionConfirm",this);
		}
	}
	,__class__: haxe_ui_actions_KeyboardActionInputSource
};
var haxe_ui_assets_AssetPlugin = function() {
};
$hxClasses["haxe.ui.assets.AssetPlugin"] = haxe_ui_assets_AssetPlugin;
haxe_ui_assets_AssetPlugin.__name__ = "haxe.ui.assets.AssetPlugin";
haxe_ui_assets_AssetPlugin.prototype = {
	_props: null
	,invoke: function(asset) {
		return asset;
	}
	,setProperty: function(name,value) {
		if(this._props == null) {
			this._props = new haxe_ds_StringMap();
		}
		this._props.h[name] = value;
	}
	,getProperty: function(name,defaultValue) {
		if(this._props == null) {
			return defaultValue;
		}
		var v = this._props.h[name];
		if(v == null) {
			v = defaultValue;
		}
		return v;
	}
	,__class__: haxe_ui_assets_AssetPlugin
};
var haxe_ui_backend_ComponentGraphicsBase = function(component) {
	this._drawCommands = [];
	this._component = component;
};
$hxClasses["haxe.ui.backend.ComponentGraphicsBase"] = haxe_ui_backend_ComponentGraphicsBase;
haxe_ui_backend_ComponentGraphicsBase.__name__ = "haxe.ui.backend.ComponentGraphicsBase";
haxe_ui_backend_ComponentGraphicsBase.prototype = {
	_component: null
	,_drawCommands: null
	,clear: function() {
		this._drawCommands = [];
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.Clear);
	}
	,setPixel: function(x,y,color) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.SetPixel(x,y,color));
	}
	,setPixels: function(pixels) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.SetPixels(pixels));
	}
	,moveTo: function(x,y) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.MoveTo(x,y));
	}
	,lineTo: function(x,y) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.LineTo(x,y));
	}
	,strokeStyle: function(color,thickness,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(thickness == null) {
			thickness = 1;
		}
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.StrokeStyle(color,thickness,alpha));
	}
	,circle: function(x,y,radius) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.Circle(x,y,radius));
	}
	,fillStyle: function(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.FillStyle(color,alpha));
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.CurveTo(controlX,controlY,anchorX,anchorY));
	}
	,cubicCurveTo: function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.CubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY));
	}
	,rectangle: function(x,y,width,height) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.Rectangle(x,y,width,height));
	}
	,image: function(resource,x,y,width,height) {
		this._drawCommands.push(haxe_ui_graphics_DrawCommand.Image(resource,x,y,width,height));
	}
	,resize: function(width,height) {
	}
	,setProperty: function(name,value) {
	}
	,detach: function() {
	}
	,replayDrawCommands: function() {
		var commands = this._drawCommands.slice();
		this._drawCommands = [];
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c._hx_index) {
			case 0:
				this.clear();
				break;
			case 1:
				var x = c.x;
				var y = c.y;
				var color = c.color;
				this.setPixel(x,y,color);
				break;
			case 2:
				var pixels = c.pixels;
				this.setPixels(pixels);
				break;
			case 3:
				var x1 = c.x;
				var y1 = c.y;
				this.moveTo(x1,y1);
				break;
			case 4:
				var x2 = c.x;
				var y2 = c.y;
				this.lineTo(x2,y2);
				break;
			case 5:
				var color1 = c.color;
				var thickness = c.thickness;
				var alpha = c.alpha;
				this.strokeStyle(color1,thickness,alpha);
				break;
			case 6:
				var x3 = c.x;
				var y3 = c.y;
				var radius = c.radius;
				this.circle(x3,y3,radius);
				break;
			case 7:
				var color2 = c.color;
				var alpha1 = c.alpha;
				this.fillStyle(color2,alpha1);
				break;
			case 8:
				var controlX = c.controlX;
				var controlY = c.controlY;
				var anchorX = c.anchorX;
				var anchorY = c.anchorY;
				this.curveTo(controlX,controlY,anchorX,anchorY);
				break;
			case 9:
				var controlX1 = c.controlX1;
				var controlY1 = c.controlY1;
				var controlX2 = c.controlX2;
				var controlY2 = c.controlY2;
				var anchorX1 = c.anchorX;
				var anchorY1 = c.anchorY;
				this.cubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX1,anchorY1);
				break;
			case 10:
				var x4 = c.x;
				var y4 = c.y;
				var width = c.width;
				var height = c.height;
				this.rectangle(x4,y4,width,height);
				break;
			case 11:
				var resource = c.resource;
				var x5 = c.x;
				var y5 = c.y;
				var width1 = c.width;
				var height1 = c.height;
				this.image(resource,x5,y5,width1,height1);
				break;
			}
		}
	}
	,__class__: haxe_ui_backend_ComponentGraphicsBase
};
var haxe_ui_backend_ComponentGraphicsImpl = function(component) {
	haxe_ui_backend_ComponentGraphicsBase.call(this,component);
	this._impl = new haxe_ui_backend_html5_graphics_SVGGraphicsImpl(component);
};
$hxClasses["haxe.ui.backend.ComponentGraphicsImpl"] = haxe_ui_backend_ComponentGraphicsImpl;
haxe_ui_backend_ComponentGraphicsImpl.__name__ = "haxe.ui.backend.ComponentGraphicsImpl";
haxe_ui_backend_ComponentGraphicsImpl.__super__ = haxe_ui_backend_ComponentGraphicsBase;
haxe_ui_backend_ComponentGraphicsImpl.prototype = $extend(haxe_ui_backend_ComponentGraphicsBase.prototype,{
	_impl: null
	,clear: function() {
		haxe_ui_backend_ComponentGraphicsBase.prototype.clear.call(this);
		this._impl.clear();
	}
	,setPixel: function(x,y,color) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.setPixel.call(this,x,y,color);
		this._impl.setPixel(x,y,color);
	}
	,setPixels: function(pixels) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.setPixels.call(this,pixels);
		this._impl.setPixels(pixels);
	}
	,moveTo: function(x,y) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.moveTo.call(this,x,y);
		this._impl.moveTo(x,y);
	}
	,lineTo: function(x,y) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.lineTo.call(this,x,y);
		this._impl.lineTo(x,y);
	}
	,strokeStyle: function(color,thickness,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(thickness == null) {
			thickness = 1;
		}
		haxe_ui_backend_ComponentGraphicsBase.prototype.strokeStyle.call(this,color,thickness,alpha);
		this._impl.strokeStyle(color,thickness,alpha);
	}
	,fillStyle: function(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		haxe_ui_backend_ComponentGraphicsBase.prototype.fillStyle.call(this,color,alpha);
		this._impl.fillStyle(color,alpha);
	}
	,circle: function(x,y,radius) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.circle.call(this,x,y,radius);
		this._impl.circle(x,y,radius);
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.curveTo.call(this,controlX,controlY,anchorX,anchorY);
		this._impl.curveTo(controlX,controlY,anchorX,anchorY);
	}
	,cubicCurveTo: function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.cubicCurveTo.call(this,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY);
		this._impl.cubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY);
	}
	,rectangle: function(x,y,width,height) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.rectangle.call(this,x,y,width,height);
		this._impl.rectangle(x,y,width,height);
	}
	,image: function(resource,x,y,width,height) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.image.call(this,resource,x,y,width,height);
		this._impl.image(resource,x,y,width,height);
	}
	,resize: function(width,height) {
		haxe_ui_backend_ComponentGraphicsBase.prototype.resize.call(this,width,height);
		this._impl.resize(width,height);
	}
	,setProperty: function(name,value) {
		if(name == "html5.graphics.method") {
			if(value == "svg") {
				if(this._impl != null) {
					this._impl.detach();
				}
				this._impl = new haxe_ui_backend_html5_graphics_SVGGraphicsImpl(this._component);
			} else if(value == "canvas") {
				if(this._impl != null) {
					this._impl.detach();
				}
				this._impl = new haxe_ui_backend_html5_graphics_CanvasGraphicsImpl(this._component);
			}
		} else {
			this._impl.setProperty(name,value);
		}
	}
	,__class__: haxe_ui_backend_ComponentGraphicsImpl
});
var haxe_ui_backend_EventBase = function() { };
$hxClasses["haxe.ui.backend.EventBase"] = haxe_ui_backend_EventBase;
haxe_ui_backend_EventBase.__name__ = "haxe.ui.backend.EventBase";
haxe_ui_backend_EventBase.prototype = {
	cancel: function() {
	}
	,postClone: function(event) {
	}
	,__class__: haxe_ui_backend_EventBase
};
var haxe_ui_backend_EventImpl = function() { };
$hxClasses["haxe.ui.backend.EventImpl"] = haxe_ui_backend_EventImpl;
haxe_ui_backend_EventImpl.__name__ = "haxe.ui.backend.EventImpl";
haxe_ui_backend_EventImpl.__super__ = haxe_ui_backend_EventBase;
haxe_ui_backend_EventImpl.prototype = $extend(haxe_ui_backend_EventBase.prototype,{
	_originalEvent: null
	,cancel: function() {
		if(this._originalEvent != null) {
			this._originalEvent.preventDefault();
			this._originalEvent.stopImmediatePropagation();
			this._originalEvent.stopPropagation();
		}
	}
	,postClone: function(event) {
		event._originalEvent = this._originalEvent;
	}
	,__class__: haxe_ui_backend_EventImpl
});
var haxe_ui_backend_FocusManagerBase = function() {
};
$hxClasses["haxe.ui.backend.FocusManagerBase"] = haxe_ui_backend_FocusManagerBase;
haxe_ui_backend_FocusManagerBase.__name__ = "haxe.ui.backend.FocusManagerBase";
haxe_ui_backend_FocusManagerBase.prototype = {
	applyFocus: function(c) {
	}
	,unapplyFocus: function(c) {
	}
	,__class__: haxe_ui_backend_FocusManagerBase
};
var haxe_ui_backend_FocusManagerImpl = function() {
	haxe_ui_backend_FocusManagerBase.call(this);
};
$hxClasses["haxe.ui.backend.FocusManagerImpl"] = haxe_ui_backend_FocusManagerImpl;
haxe_ui_backend_FocusManagerImpl.__name__ = "haxe.ui.backend.FocusManagerImpl";
haxe_ui_backend_FocusManagerImpl.__super__ = haxe_ui_backend_FocusManagerBase;
haxe_ui_backend_FocusManagerImpl.prototype = $extend(haxe_ui_backend_FocusManagerBase.prototype,{
	applyFocus: function(c) {
		haxe_ui_backend_FocusManagerBase.prototype.applyFocus.call(this,c);
	}
	,unapplyFocus: function(c) {
		haxe_ui_backend_FocusManagerBase.prototype.applyFocus.call(this,c);
	}
	,__class__: haxe_ui_backend_FocusManagerImpl
});
var haxe_ui_backend_ImageSurface = function() {
};
$hxClasses["haxe.ui.backend.ImageSurface"] = haxe_ui_backend_ImageSurface;
haxe_ui_backend_ImageSurface.__name__ = "haxe.ui.backend.ImageSurface";
haxe_ui_backend_ImageSurface.prototype = {
	__class__: haxe_ui_backend_ImageSurface
};
var haxe_ui_backend_ImageBase = function() {
	this._imageHeight = 0;
	this._imageWidth = 0;
	this._top = 0;
	this._left = 0;
	this.aspectRatio = 1;
	haxe_ui_backend_ImageSurface.call(this);
};
$hxClasses["haxe.ui.backend.ImageBase"] = haxe_ui_backend_ImageBase;
haxe_ui_backend_ImageBase.__name__ = "haxe.ui.backend.ImageBase";
haxe_ui_backend_ImageBase.__super__ = haxe_ui_backend_ImageSurface;
haxe_ui_backend_ImageBase.prototype = $extend(haxe_ui_backend_ImageSurface.prototype,{
	parentComponent: null
	,aspectRatio: null
	,_left: null
	,_top: null
	,_imageWidth: null
	,_imageHeight: null
	,_imageInfo: null
	,_imageClipRect: null
	,dispose: function() {
		if(this.parentComponent != null) {
			this.parentComponent = null;
		}
	}
	,validateData: function() {
	}
	,validatePosition: function() {
	}
	,validateDisplay: function() {
	}
	,__class__: haxe_ui_backend_ImageBase
});
var haxe_ui_backend_ImageDisplayImpl = function() {
	haxe_ui_backend_ImageBase.call(this);
	this.element = window.document.createElement("img");
	this.element.style.position = "absolute";
	this.element.style.borderRadius = "inherit";
	this.element.style.setProperty("pointer-events","none");
};
$hxClasses["haxe.ui.backend.ImageDisplayImpl"] = haxe_ui_backend_ImageDisplayImpl;
haxe_ui_backend_ImageDisplayImpl.__name__ = "haxe.ui.backend.ImageDisplayImpl";
haxe_ui_backend_ImageDisplayImpl.__super__ = haxe_ui_backend_ImageBase;
haxe_ui_backend_ImageDisplayImpl.prototype = $extend(haxe_ui_backend_ImageBase.prototype,{
	element: null
	,dispose: function() {
		if(this.element != null) {
			haxe_ui_backend_html5_HtmlUtils.removeElement(this.element);
		}
	}
	,validateData: function() {
		if(this.element.src != this._imageInfo.data.src) {
			this.element.src = this._imageInfo.data.src;
			this.applyStyle();
		}
	}
	,validatePosition: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,validateDisplay: function() {
		var style = this.element.style;
		style.width = "" + this._imageWidth + "px";
		style.height = "" + this._imageHeight + "px";
		if(this._imageClipRect != null) {
			var clipValue = "rect(" + ("" + (-this._top + this._imageClipRect.top) + "px") + "," + ("" + (-this._left + this._imageClipRect.left + this._imageClipRect.width) + "px") + "," + ("" + (-this._top + this._imageClipRect.top + this._imageClipRect.height) + "px") + "," + ("" + (-this._left + this._imageClipRect.left) + "px") + ")";
			if(this.element.style.clip != clipValue) {
				this.element.style.clip = clipValue;
			}
		} else if(this.element.style.clip != null) {
			this.element.style.removeProperty("clip");
		}
	}
	,applyStyle: function() {
		if(this.parentComponent != null && this.parentComponent.get_style() != null) {
			if(this.parentComponent.get_style().imageRendering == "pixelated") {
				this.element.style.setProperty("image-rendering","pixelated");
				this.element.style.setProperty("image-rendering","-moz-crisp-edges");
				this.element.style.setProperty("image-rendering","crisp-edges");
			} else if(this.element.style.getPropertyValue("image-rendering") != null) {
				this.element.style.removeProperty("image-rendering");
			}
		}
	}
	,__class__: haxe_ui_backend_ImageDisplayImpl
});
var haxe_ui_backend_PlatformBase = function() {
	this._isMobile = null;
};
$hxClasses["haxe.ui.backend.PlatformBase"] = haxe_ui_backend_PlatformBase;
haxe_ui_backend_PlatformBase.__name__ = "haxe.ui.backend.PlatformBase";
haxe_ui_backend_PlatformBase.prototype = {
	isWindows: null
	,get_isWindows: function() {
		return window.navigator.userAgent.toLowerCase().indexOf("windows") != -1;
	}
	,isLinux: null
	,get_isLinux: function() {
		return window.navigator.userAgent.toLowerCase().indexOf("linux") != -1;
	}
	,isMac: null
	,get_isMac: function() {
		return window.navigator.userAgent.toLowerCase().indexOf("mac") != -1;
	}
	,_isMobile: null
	,isMobile: null
	,get_isMobile: function() {
		if(this._isMobile != null) {
			return this._isMobile;
		}
		this._isMobile = false;
		var ua = $global.navigator.userAgent;
		this._isMobile = haxe_ui_backend_PlatformBase.MOBILE_REGEXP.match(ua);
		return this._isMobile;
	}
	,getMetric: function(id) {
		return 0;
	}
	,getColor: function(id) {
		return null;
	}
	,getSystemLocale: function() {
		return null;
	}
	,perf: function() {
		return HxOverrides.now() / 1000 * 1000;
	}
	,KeyTab: null
	,get_KeyTab: function() {
		return this.getKeyCode("tab");
	}
	,KeyUp: null
	,get_KeyUp: function() {
		return this.getKeyCode("up");
	}
	,KeyDown: null
	,get_KeyDown: function() {
		return this.getKeyCode("down");
	}
	,KeyLeft: null
	,get_KeyLeft: function() {
		return this.getKeyCode("left");
	}
	,KeyRight: null
	,get_KeyRight: function() {
		return this.getKeyCode("right");
	}
	,KeySpace: null
	,get_KeySpace: function() {
		return this.getKeyCode("space");
	}
	,KeyEnter: null
	,get_KeyEnter: function() {
		return this.getKeyCode("enter");
	}
	,KeyEscape: null
	,get_KeyEscape: function() {
		return this.getKeyCode("escape");
	}
	,getKeyCode: function(keyId) {
		switch(keyId) {
		case "down":
			return 40;
		case "enter":
			return 13;
		case "escape":
			return 27;
		case "left":
			return 37;
		case "right":
			return 39;
		case "space":
			return 32;
		case "tab":
			return 9;
		case "up":
			return 38;
		default:
			return HxOverrides.cca(keyId,0);
		}
	}
	,__class__: haxe_ui_backend_PlatformBase
	,__properties__: {get_KeyEscape:"get_KeyEscape",get_KeyEnter:"get_KeyEnter",get_KeySpace:"get_KeySpace",get_KeyRight:"get_KeyRight",get_KeyLeft:"get_KeyLeft",get_KeyDown:"get_KeyDown",get_KeyUp:"get_KeyUp",get_KeyTab:"get_KeyTab",get_isMobile:"get_isMobile",get_isMac:"get_isMac",get_isLinux:"get_isLinux",get_isWindows:"get_isWindows"}
};
var haxe_ui_backend_PlatformImpl = function() {
	haxe_ui_backend_PlatformBase.call(this);
};
$hxClasses["haxe.ui.backend.PlatformImpl"] = haxe_ui_backend_PlatformImpl;
haxe_ui_backend_PlatformImpl.__name__ = "haxe.ui.backend.PlatformImpl";
haxe_ui_backend_PlatformImpl.calcScrollSize = function() {
	if(haxe_ui_backend_PlatformImpl._vscrollWidth >= 0 && haxe_ui_backend_PlatformImpl._hscrollHeight >= 0) {
		return;
	}
	var div = window.document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	div.style.height = "100px";
	div.style.width = "100px";
	div.style.overflow = "scroll";
	window.document.body.appendChild(div);
	haxe_ui_backend_PlatformImpl._vscrollWidth = div.offsetWidth - div.clientWidth;
	haxe_ui_backend_PlatformImpl._hscrollHeight = div.offsetHeight - div.clientHeight;
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
};
haxe_ui_backend_PlatformImpl.__super__ = haxe_ui_backend_PlatformBase;
haxe_ui_backend_PlatformImpl.prototype = $extend(haxe_ui_backend_PlatformBase.prototype,{
	getMetric: function(id) {
		switch(id) {
		case "patform.metrics.hscroll.height":
			haxe_ui_backend_PlatformImpl.calcScrollSize();
			return haxe_ui_backend_PlatformImpl._hscrollHeight;
		case "patform.metrics.vscroll.width":
			haxe_ui_backend_PlatformImpl.calcScrollSize();
			return haxe_ui_backend_PlatformImpl._vscrollWidth;
		}
		return haxe_ui_backend_PlatformBase.prototype.getMetric.call(this,id);
	}
	,getSystemLocale: function() {
		return $global.navigator.language;
	}
	,perf: function() {
		return window.performance.now();
	}
	,__class__: haxe_ui_backend_PlatformImpl
});
var haxe_ui_backend_ScreenBase = function() {
	this.rootComponents = [];
};
$hxClasses["haxe.ui.backend.ScreenBase"] = haxe_ui_backend_ScreenBase;
haxe_ui_backend_ScreenBase.__name__ = "haxe.ui.backend.ScreenBase";
haxe_ui_backend_ScreenBase.prototype = {
	rootComponents: null
	,_options: null
	,get_options: function() {
		return this._options;
	}
	,set_options: function(value) {
		this._options = value;
		return value;
	}
	,dpi: null
	,get_dpi: function() {
		return 72;
	}
	,get_title: function() {
		return null;
	}
	,set_title: function(s) {
		return s;
	}
	,width: null
	,get_width: function() {
		return 0;
	}
	,height: null
	,get_height: function() {
		return 0;
	}
	,actualWidth: null
	,get_actualWidth: function() {
		return this.get_width() * haxe_ui_Toolkit.get_scaleX();
	}
	,actualHeight: null
	,get_actualHeight: function() {
		return this.get_height() * haxe_ui_Toolkit.get_scaleY();
	}
	,isRetina: null
	,get_isRetina: function() {
		return false;
	}
	,topComponent: null
	,get_topComponent: function() {
		if(this.rootComponents.length == 0) {
			return null;
		}
		var n = this.rootComponents.length - 1;
		var c = null;
		while(n >= 0) {
			c = this.rootComponents[n];
			if(c.get_style() == null) {
				break;
			}
			if(c.get_style().pointerEvents != "none") {
				break;
			}
			--n;
		}
		return c;
	}
	,addComponent: function(component) {
		return component;
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return component;
	}
	,handleSetComponentIndex: function(child,index) {
	}
	,resizeComponent: function(c) {
		var cx = null;
		var cy = null;
		if(c.get_percentWidth() > 0) {
			cx = this.get_width() * c.get_percentWidth() / 100;
		}
		if(c.get_percentHeight() > 0) {
			cy = this.get_height() * c.get_percentHeight() / 100;
		}
		c.resizeComponent(cx,cy);
	}
	,refreshStyleRootComponents: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			this._refreshStyleComponent(component);
		}
	}
	,resizeRootComponents: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var component = _g1[_g];
			++_g;
			this.resizeComponent(component);
		}
	}
	,_refreshStyleComponent: function(component) {
		var _g = 0;
		var _g1 = component._children == null ? [] : component._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.invalidateComponent("style",false);
			child.invalidateComponent("display",false);
			this._refreshStyleComponent(child);
		}
	}
	,_onRootComponentResize: function(e) {
		this._refreshStyleComponent(e.target);
	}
	,invalidateAll: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.invalidateChildren(c,flag);
		}
	}
	,invalidateChildren: function(c,flag) {
		if(flag == null) {
			flag = "all";
		}
		var _g = 0;
		var _g1 = c._children == null ? [] : c._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.invalidateChildren(child,flag);
		}
		c.invalidateComponent(flag);
	}
	,supportsEvent: function(type) {
		return false;
	}
	,mapEvent: function(type,listener) {
	}
	,unmapEvent: function(type,listener) {
	}
	,__class__: haxe_ui_backend_ScreenBase
	,__properties__: {get_topComponent:"get_topComponent",get_isRetina:"get_isRetina",get_actualHeight:"get_actualHeight",get_actualWidth:"get_actualWidth",get_height:"get_height",get_width:"get_width",set_title:"set_title",get_title:"get_title",get_dpi:"get_dpi",set_options:"set_options",get_options:"get_options"}
};
var haxe_ui_backend_ScreenImpl = function() {
	this._contextMenuDisabledCount = 0;
	this._hasListener = false;
	this._containerParent = null;
	this._pageRoot = null;
	this._container = null;
	this._percentContainerHeightAdded = false;
	this._percentContainerWidthAdded = false;
	this._height = null;
	this._width = null;
	haxe_ui_backend_ScreenBase.call(this);
	this._mapping = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.backend.ScreenImpl"] = haxe_ui_backend_ScreenImpl;
haxe_ui_backend_ScreenImpl.__name__ = "haxe.ui.backend.ScreenImpl";
haxe_ui_backend_ScreenImpl.__super__ = haxe_ui_backend_ScreenBase;
haxe_ui_backend_ScreenImpl.prototype = $extend(haxe_ui_backend_ScreenBase.prototype,{
	_mapping: null
	,set_options: function(value) {
		haxe_ui_backend_ScreenBase.prototype.set_options.call(this,value);
		var cx = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container.width",null);
		var cy = haxe_ui_Toolkit.get_backendProperties().getProp("haxe.ui.html5.container.height",null);
		var c = this.get_container();
		if(cx != null) {
			c.style.width = cx;
		}
		if(cy != null) {
			c.style.height = cy;
		}
		return value;
	}
	,get_dpi: function() {
		return haxe_ui_backend_html5_HtmlUtils.get_dpi();
	}
	,get_title: function() {
		return window.document.title;
	}
	,set_title: function(s) {
		window.document.title = s;
		return s;
	}
	,_width: null
	,get_width: function() {
		if(this._width != null && this._width > 0) {
			return this._width;
		}
		var cx = this.get_container().offsetWidth;
		if(cx <= 0) {
			var _g = 0;
			var _g1 = this.rootComponents;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(c.get_width() > cx) {
					cx = c.get_width();
				}
			}
		}
		this._width = cx / haxe_ui_Toolkit.get_scaleX();
		return this._width;
	}
	,_height: null
	,get_height: function() {
		if(this._height != null && this._height > 0) {
			return this._height;
		}
		var cy = this.get_container().offsetHeight;
		if(cy <= 0) {
			var _g = 0;
			var _g1 = this.rootComponents;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(c.get_height() > cy) {
					cy = c.get_height();
				}
			}
		}
		this._height = cy / haxe_ui_Toolkit.get_scaleY();
		return this._height;
	}
	,get_isRetina: function() {
		return haxe_ui_backend_html5_HtmlUtils.isRetinaDisplay();
	}
	,addComponent: function(component) {
		this.get_container().appendChild(component.element);
		component.ready();
		if(haxe_ui_Toolkit.get_scaleX() != 1 || haxe_ui_Toolkit.get_scaleY() != 1) {
			var transformString = "";
			if(haxe_ui_Toolkit.get_scaleX() != 1) {
				transformString += "scaleX(" + haxe_ui_Toolkit.get_scaleX() + ") ";
			}
			if(haxe_ui_Toolkit.get_scaleY() != 1) {
				transformString += "scaleY(" + haxe_ui_Toolkit.get_scaleY() + ") ";
			}
			component.element.style.transform = transformString;
			component.element.style.transformOrigin = "top left";
		}
		if(component.get_percentWidth() != null) {
			this.addPercentContainerWidth();
		}
		if(component.get_percentHeight() != null) {
			this.addPercentContainerHeight();
		}
		this.addResizeListener();
		this.resizeComponent(component);
		return component;
	}
	,_percentContainerWidthAdded: null
	,addPercentContainerWidth: function() {
		if(this._percentContainerWidthAdded == true) {
			return;
		}
		this._percentContainerWidthAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		var w = this.get_containerParent().getAttribute("width");
		if(w == null) {
			w = "";
		}
		w = StringTools.trim(w);
		if(!StringTools.endsWith(w,"%") && !StringTools.endsWith(w,"px")) {
			sheet.insertRule("#haxeui-container-parent {\r\n                margin: 0;\r\n                width: 100%;\r\n            }",sheet.cssRules.length);
		}
		sheet.insertRule("#haxeui-container {\r\n            margin: 0;\r\n            width: 100%;\r\n        }",sheet.cssRules.length);
	}
	,_percentContainerHeightAdded: null
	,addPercentContainerHeight: function() {
		if(this._percentContainerHeightAdded == true) {
			return;
		}
		this._percentContainerHeightAdded = true;
		var sheet = haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet();
		var h = this.get_containerParent().getAttribute("height");
		if(h == null) {
			h = "";
		}
		h = StringTools.trim(h);
		if(!StringTools.endsWith(h,"%") && !StringTools.endsWith(h,"px")) {
			sheet.insertRule("#haxeui-container-parent {\r\n                margin: 0;\r\n                height: 100%;\r\n            }",sheet.cssRules.length);
		}
		sheet.insertRule("#haxeui-container {\r\n            margin: 0;\r\n            height: 100%;\r\n        }",sheet.cssRules.length);
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		HxOverrides.remove(this.rootComponents,component);
		if(this.get_container().contains(component.element) == true) {
			this.get_container().removeChild(component.element);
		}
		return component;
	}
	,handleSetComponentIndex: function(child,index) {
		if(index == (js_Boot.__cast(this , haxe_ui_core_Screen)).rootComponents.length - 1) {
			this.get_container().appendChild(child.element);
		} else {
			haxe_ui_backend_html5_HtmlUtils.insertBefore((js_Boot.__cast(this , haxe_ui_core_Screen)).rootComponents[index + 1].element,child.element);
		}
	}
	,_container: null
	,container: null
	,get_container: function() {
		if(this._container != null) {
			return this._container;
		}
		var c = null;
		if(this.get_options() == null || this.get_options().container == null) {
			c = window.document.body;
		} else {
			c = this.get_options().container;
		}
		if(c.style.overflow == null || c.style.overflow == "") {
			c.style.overflow = "hidden";
		}
		if(c.id != "haxeui-container") {
			c.id = "haxeui-container";
			if(this.get_options() != null && this.get_options().container != null) {
				c.style.position = "relative";
			}
			if(c.parentElement != null && c.parentElement.id != "haxeui-container-parent") {
				c.parentElement.id = "haxeui-container-parent";
			}
		}
		this._container = c;
		return c;
	}
	,_pageRoot: null
	,pageRoot: function(from) {
		if(this._pageRoot != null) {
			return this._pageRoot;
		}
		var r = null;
		var el = from;
		while(el != null) {
			if(el.classList.contains("haxeui-component") == false) {
				r = el;
				this._pageRoot = el;
				break;
			}
			el = el.parentElement;
		}
		return r;
	}
	,_containerParent: null
	,containerParent: null
	,get_containerParent: function() {
		if(this._containerParent != null) {
			return this._containerParent;
		}
		var c = this.get_container();
		if(c != null) {
			this._containerParent = c.parentElement;
		}
		return this._containerParent;
	}
	,_hasListener: null
	,addResizeListener: function() {
		var _gthis = this;
		if(this._hasListener == true) {
			return;
		}
		this._hasListener = true;
		window.addEventListener("load",$bind(this,this.onFullyLoaded));
		if(this.get_container() == window.document.body) {
			window.addEventListener("resize",function(e) {
				_gthis.containerResized();
			});
		} else {
			var observer = this.resizeObserver($bind(this,this.onElementResized));
			if(observer != null) {
				var tmp = this.get_container();
				observer.observe(tmp);
			}
		}
	}
	,onElementResized: function(entries) {
		this.containerResized();
	}
	,resizeObserver: function(cb) {
		var ro = null;
		try {
			ro = ResizeObserver;
		} catch( _g ) {
			return null;
		}
		if(ro == null) {
			return null;
		}
		return new ResizeObserver(cb);
	}
	,onFullyLoaded: function() {
		window.removeEventListener("load",$bind(this,this.onFullyLoaded));
		this.containerResized();
	}
	,containerResized: function() {
		this._width = null;
		this._height = null;
		this.resizeRootComponents();
		if(Object.prototype.hasOwnProperty.call(this._mapping.h,"resize")) {
			var event = new haxe_ui_events_UIEvent("resize");
			var fn = this._mapping.h["resize"];
			if(fn != null) {
				fn(event);
			}
		}
	}
	,supportsEvent: function(type) {
		if(type != "resize") {
			return haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type] != null;
		} else {
			return true;
		}
	}
	,mapEvent: function(type,listener) {
		var container = window.document.body;
		switch(type) {
		case "keydown":case "keyup":
			if(Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false) {
				this._mapping.h[type] = listener;
				container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyEvent));
			}
			break;
		case "resize":
			if(Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false) {
				this._mapping.h[type] = listener;
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightclick":case "rightmousedown":case "rightmouseup":
			if(Object.prototype.hasOwnProperty.call(this._mapping.h,type) == false) {
				if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
					var passive = false;
					if(passive == null) {
						passive = true;
					}
					container.addEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent),{ passive : passive});
				}
				this._mapping.h[type] = listener;
				var passive = false;
				if(passive == null) {
					passive = true;
				}
				container.addEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent),{ passive : passive});
			}
			if(type == "rightmousedown" || type == "rightmouseup") {
				this.disableContextMenu(true);
			}
			break;
		}
	}
	,unmapEvent: function(type,listener) {
		var container = window.document.body;
		switch(type) {
		case "keydown":case "keyup":
			var _this = this._mapping;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			container.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onKeyEvent));
			break;
		case "resize":
			var _this = this._mapping;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			break;
		case "click":case "doubleclick":case "mousedown":case "mousemove":case "mouseout":case "mouseover":case "mouseup":case "rightclick":case "rightmousedown":case "rightmouseup":
			var _this = this._mapping;
			if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
				delete(_this.h[type]);
			}
			container.removeEventListener(haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM.h[type],$bind(this,this.__onMouseEvent));
			if(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type] != null) {
				container.removeEventListener(haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH.h[type],$bind(this,this.__onMouseEvent));
			}
			if(type == "rightmousedown" || type == "rightmouseup") {
				this.disableContextMenu(false);
			}
			break;
		}
	}
	,__onMouseEvent: function(event) {
		var button = -1;
		var touchEvent = false;
		try {
			touchEvent = ((event) instanceof TouchEvent);
		} catch( _g ) {
		}
		if(touchEvent == false && ((event) instanceof MouseEvent)) {
			var me = js_Boot.__cast(event , MouseEvent);
			button = me.which;
		}
		var r = true;
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type == "rightclick") {
			event.stopPropagation();
			event.preventDefault();
			r = false;
		}
		if(event.type == "mousedown") {
			var which = Reflect.field(event,"which");
			switch(which) {
			case 1:
				type = "mousedown";
				break;
			case 2:
				type = "mousedown";
				break;
			case 3:
				type = "rightmousedown";
				break;
			}
		} else if(event.type == "mouseup") {
			var which = Reflect.field(event,"which");
			switch(which) {
			case 1:
				type = "mouseup";
				break;
			case 2:
				type = "mouseup";
				break;
			case 3:
				type = "rightmouseup";
				break;
			}
		}
		if(type != null) {
			var fn = this._mapping.h[type];
			if(fn != null) {
				var mouseEvent = new haxe_ui_events_MouseEvent(type);
				mouseEvent._originalEvent = event;
				if(touchEvent == true) {
					var te = js_Boot.__cast(event , TouchEvent);
					mouseEvent.screenX = (te.changedTouches[0].pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (te.changedTouches[0].pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.touchEvent = true;
				} else if(((event) instanceof MouseEvent)) {
					var me = js_Boot.__cast(event , MouseEvent);
					mouseEvent.buttonDown = me.buttons != 0;
					mouseEvent.screenX = (me.pageX - haxe_ui_core_Screen.get_instance().get_container().offsetLeft) / haxe_ui_Toolkit.get_scaleX();
					mouseEvent.screenY = (me.pageY - haxe_ui_core_Screen.get_instance().get_container().offsetTop) / haxe_ui_Toolkit.get_scaleY();
					mouseEvent.ctrlKey = me.ctrlKey;
					mouseEvent.shiftKey = me.shiftKey;
				}
				fn(mouseEvent);
			}
		}
		return r;
	}
	,__onKeyEvent: function(event) {
		var type = haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI.h[event.type];
		if(type != null) {
			if(event.keyCode == 9 || event.which == 9) {
				event.preventDefault();
				event.stopImmediatePropagation();
				event.stopPropagation();
			}
			var fn = this._mapping.h[type];
			if(fn != null) {
				var keyboardEvent = new haxe_ui_events_KeyboardEvent(type);
				keyboardEvent._originalEvent = event;
				keyboardEvent.keyCode = event.keyCode;
				keyboardEvent.ctrlKey = event.ctrlKey;
				keyboardEvent.shiftKey = event.shiftKey;
				fn(keyboardEvent);
			}
		}
	}
	,_contextMenuDisabledCount: null
	,disableContextMenu: function(disable) {
		var container = window.document.body;
		if(disable == true) {
			this._contextMenuDisabledCount++;
		} else {
			this._contextMenuDisabledCount--;
			if(this._contextMenuDisabledCount < 0) {
				this._contextMenuDisabledCount = 0;
			}
		}
		if(this._contextMenuDisabledCount == 1) {
			container.addEventListener("contextmenu",$bind(this,this.__preventContextMenu));
		} else if(this._contextMenuDisabledCount == 0) {
			container.removeEventListener("contextmenu",$bind(this,this.__preventContextMenu));
		}
	}
	,__preventContextMenu: function(event) {
		event.preventDefault();
		return false;
	}
	,__class__: haxe_ui_backend_ScreenImpl
	,__properties__: $extend(haxe_ui_backend_ScreenBase.prototype.__properties__,{get_containerParent:"get_containerParent",get_container:"get_container"})
});
var haxe_ui_backend_TextBase = function() {
	this._textHeight = 0;
	this._textWidth = 0;
	this._height = 0;
	this._width = 0;
	this._top = 0;
	this._left = 0;
	this._htmlText = null;
	this._inputData = new haxe_ui_core_TextInputData();
	this._displayData = new haxe_ui_core_TextDisplayData();
};
$hxClasses["haxe.ui.backend.TextBase"] = haxe_ui_backend_TextBase;
haxe_ui_backend_TextBase.__name__ = "haxe.ui.backend.TextBase";
haxe_ui_backend_TextBase.prototype = {
	parentComponent: null
	,_displayData: null
	,_inputData: null
	,_text: null
	,_htmlText: null
	,_left: null
	,_top: null
	,_width: null
	,_height: null
	,_textWidth: null
	,_textHeight: null
	,_textStyle: null
	,_fontInfo: null
	,focus: function() {
	}
	,blur: function() {
	}
	,dispose: function() {
		if(this.parentComponent != null) {
			this.parentComponent = null;
		}
	}
	,_dataSource: null
	,get_dataSource: function() {
		return this._dataSource;
	}
	,set_dataSource: function(value) {
		this._dataSource = value;
		return value;
	}
	,supportsHtml: null
	,get_supportsHtml: function() {
		return false;
	}
	,get_caretIndex: function() {
		return 0;
	}
	,set_caretIndex: function(value) {
		return value;
	}
	,get_selectionStartIndex: function() {
		return 0;
	}
	,set_selectionStartIndex: function(value) {
		return value;
	}
	,get_selectionEndIndex: function() {
		return 0;
	}
	,set_selectionEndIndex: function(value) {
		return value;
	}
	,validateData: function() {
	}
	,validateStyle: function() {
		return false;
	}
	,validatePosition: function() {
	}
	,validateDisplay: function() {
	}
	,measureText: function() {
	}
	,measureTextWidth: function() {
		var textDisplay = new haxe_ui_core_TextDisplay();
		textDisplay._textStyle = this._textStyle;
		textDisplay._fontInfo = this._fontInfo;
		textDisplay.validateStyle();
		textDisplay._text = this._text;
		textDisplay.validateData();
		textDisplay.measureText();
		return textDisplay._textWidth;
	}
	,__class__: haxe_ui_backend_TextBase
	,__properties__: {set_selectionEndIndex:"set_selectionEndIndex",get_selectionEndIndex:"get_selectionEndIndex",set_selectionStartIndex:"set_selectionStartIndex",get_selectionStartIndex:"get_selectionStartIndex",set_caretIndex:"set_caretIndex",get_caretIndex:"get_caretIndex",get_supportsHtml:"get_supportsHtml",set_dataSource:"set_dataSource",get_dataSource:"get_dataSource"}
};
var haxe_ui_backend_TextDisplayImpl = function() {
	this._fixedHeight = false;
	this._fixedWidth = false;
	this._isHTML = false;
	haxe_ui_backend_TextBase.call(this);
	this._displayData.multiline = false;
	this.element = this.createElement();
};
$hxClasses["haxe.ui.backend.TextDisplayImpl"] = haxe_ui_backend_TextDisplayImpl;
haxe_ui_backend_TextDisplayImpl.__name__ = "haxe.ui.backend.TextDisplayImpl";
haxe_ui_backend_TextDisplayImpl.__super__ = haxe_ui_backend_TextBase;
haxe_ui_backend_TextDisplayImpl.prototype = $extend(haxe_ui_backend_TextBase.prototype,{
	element: null
	,_html: null
	,_isHTML: null
	,validateData: function() {
		var html = null;
		if(this._text != null) {
			html = this.normalizeText(this._text);
			this._isHTML = false;
		} else if(this._htmlText != null) {
			html = this.normalizeHtmlText(this._htmlText,false);
			this._isHTML = true;
		}
		if(html != null && this._html != html) {
			if(this._isHTML == false) {
				this.element.textContent = html;
			} else {
				this.element.innerHTML = html;
			}
			this._html = html;
			if(this.get_autoWidth() == true) {
				this._fixedWidth = false;
			}
			if(this.get_autoHeight() == true) {
				this._fixedHeight = false;
			}
		}
	}
	,_rawFontName: null
	,validateStyle: function() {
		var measureTextRequired = false;
		if(this._displayData.wordWrap == true && this.element.style.whiteSpace != null) {
			this.element.style.whiteSpace = "pre-wrap";
			this.element.style.wordBreak = "break-word";
			measureTextRequired = true;
		} else if(this._displayData.wordWrap == false && this.element.style.whiteSpace != "pre") {
			this.element.style.whiteSpace = "pre";
			measureTextRequired = true;
		}
		if(this._textStyle != null) {
			if(this.element.style.textAlign != this._textStyle.textAlign) {
				this.element.style.textAlign = this._textStyle.textAlign;
			}
			var fontSizeValue = "" + this._textStyle.fontSize + "px";
			if(this.element.style.fontSize != fontSizeValue) {
				this.element.style.fontSize = fontSizeValue;
				measureTextRequired = true;
			}
			if(this._textStyle.fontBold == true && this.element.style.fontWeight != "bold") {
				this.element.style.fontWeight = "bold";
				measureTextRequired = true;
			} else if((this._textStyle.fontBold == null || this._textStyle.fontBold == false) && this.element.style.fontWeight == "bold") {
				this.element.style.removeProperty("font-weight");
				measureTextRequired = true;
			}
			if(this._textStyle.fontItalic == true && this.element.style.fontStyle != "italic") {
				this.element.style.fontStyle = "italic";
				measureTextRequired = true;
			} else if((this._textStyle.fontItalic == null || this._textStyle.fontItalic == false) && this.element.style.fontStyle == "italic") {
				this.element.style.removeProperty("font-style");
				measureTextRequired = true;
			}
			if(this._textStyle.fontUnderline == true && this.element.style.textDecoration != "underline") {
				this.element.style.textDecoration = "underline";
				measureTextRequired = true;
			} else if((this._textStyle.fontUnderline == null || this._textStyle.fontUnderline == false) && this.element.style.textDecoration == "underline") {
				this.element.style.removeProperty("text-decoration");
				measureTextRequired = true;
			}
			if(this._textStyle.fontStrikeThrough == true && this.element.style.textDecoration != "line-through") {
				this.element.style.textDecoration = "line-through";
				measureTextRequired = true;
			} else if((this._textStyle.fontStrikeThrough == null || this._textStyle.fontStrikeThrough == false) && this.element.style.textDecoration == "line-through") {
				this.element.style.removeProperty("text-decoration");
				measureTextRequired = true;
			}
			var colorValue = haxe_ui_backend_html5_HtmlUtils.color(this._textStyle.color);
			if(this.element.style.color != colorValue) {
				this.element.style.color = colorValue;
			}
			if(this._fontInfo != null && this._fontInfo.data != this._rawFontName) {
				this.element.style.fontFamily = this._fontInfo.data;
				this._rawFontName = this._fontInfo.data;
				measureTextRequired = true;
				var _this = this.parentComponent;
				if(!(_this._layout == null || _this._layoutLocked == true)) {
					_this.invalidateComponent("layout",false);
				}
			}
		}
		if(measureTextRequired == true) {
			if(this.get_autoWidth() == true) {
				this._fixedWidth = false;
			}
			if(this.get_autoHeight() == true) {
				this._fixedHeight = false;
			}
		}
		return measureTextRequired;
	}
	,validatePosition: function() {
		var style = this.element.style;
		style.left = "" + this._left + "px";
		style.top = "" + this._top + "px";
	}
	,_fixedWidth: null
	,_fixedHeight: null
	,validateDisplay: function() {
		var style = this.element.style;
		var allowFixed = true;
		if(this.get_autoWidth() == false && style.width != "" + this._width + "px") {
			allowFixed = false;
		}
		if(this._width > 0 && this.get_autoWidth() == false) {
			this._fixedWidth = true;
			style.width = "" + this._width + "px";
		}
		if(this._height > 0 && this.get_autoHeight() == false) {
			this._fixedHeight = true;
			style.height = "" + this._height + "px";
		}
		if(allowFixed == false) {
			this._fixedHeight = false;
		}
	}
	,measureText: function() {
		if(this._fixedWidth == true && this._fixedHeight == true) {
			return;
		}
		var t = null;
		var isHtml = false;
		if(this._text != null) {
			t = this.normalizeText(this._text);
		} else if(this._htmlText != null) {
			t = this.normalizeHtmlText(this._htmlText,false);
			isHtml = true;
		}
		if(t == null || t.length == 0) {
			t = "|";
		}
		var w = null;
		if(this.get_autoWidth() == false) {
			w = this._width > 0 ? this._width : null;
		}
		var size = haxe_ui_backend_html5_text_TextMeasurer.get_instance().measureText({ text : t, width : w, fontFamily : this.element.style.fontFamily, fontSize : this.element.style.fontSize, whiteSpace : this.element.style.whiteSpace, wordBreak : this.element.style.wordBreak, isHtml : isHtml});
		if(this._fixedWidth == false) {
			this._textWidth = size.width + 2;
		}
		if(this._fixedHeight == false) {
			this._textHeight = size.height + 2;
		}
	}
	,createElement: function() {
		var el = window.document.createElement("div");
		el.style.marginTop = "1px";
		el.style.marginLeft = "1px";
		el.style.position = "absolute";
		el.style.cursor = "inherit";
		return el;
	}
	,normalizeText: function(text) {
		text = StringTools.replace(text,"\\n","\n");
		return text;
	}
	,normalizeHtmlText: function(text,$escape) {
		if($escape == null) {
			$escape = true;
		}
		var html = text;
		if($escape == true) {
			html = haxe_ui_backend_html5_HtmlUtils.escape(text);
		}
		html = StringTools.replace(html,"\\n","\n");
		html = StringTools.replace(html,"\r\n","<br/>");
		html = StringTools.replace(html,"\r","<br/>");
		html = StringTools.replace(html,"\n","<br/>");
		return html;
	}
	,autoWidth: null
	,get_autoWidth: function() {
		if(((this.parentComponent) instanceof haxe_ui_components_Label)) {
			return (js_Boot.__cast(this.parentComponent , haxe_ui_components_Label)).get_autoWidth();
		}
		return false;
	}
	,autoHeight: null
	,get_autoHeight: function() {
		if(((this.parentComponent) instanceof haxe_ui_components_Label)) {
			return (js_Boot.__cast(this.parentComponent , haxe_ui_components_Label)).get_autoHeight();
		}
		return false;
	}
	,get_supportsHtml: function() {
		return true;
	}
	,__class__: haxe_ui_backend_TextDisplayImpl
	,__properties__: $extend(haxe_ui_backend_TextBase.prototype.__properties__,{get_autoHeight:"get_autoHeight",get_autoWidth:"get_autoWidth"})
});
var haxe_ui_backend_TextInputImpl = function() {
	this._selectedEndIndex = -1;
	this._selectionStartIndex = 0;
	haxe_ui_backend_TextDisplayImpl.call(this);
};
$hxClasses["haxe.ui.backend.TextInputImpl"] = haxe_ui_backend_TextInputImpl;
haxe_ui_backend_TextInputImpl.__name__ = "haxe.ui.backend.TextInputImpl";
haxe_ui_backend_TextInputImpl.__super__ = haxe_ui_backend_TextDisplayImpl;
haxe_ui_backend_TextInputImpl.prototype = $extend(haxe_ui_backend_TextDisplayImpl.prototype,{
	focus: function() {
		this.element.focus({preventScroll: true});
	}
	,blur: function() {
		this.element.blur();
	}
	,onChangeEvent: function(e) {
		var newText = null;
		if(((this.element) instanceof HTMLTextAreaElement)) {
			newText = (js_Boot.__cast(this.element , HTMLTextAreaElement)).value;
		} else {
			newText = (js_Boot.__cast(this.element , HTMLInputElement)).value;
		}
		if(newText != this._text) {
			this._text = newText;
			this.measureText();
			if(this._inputData.onChangedCallback != null) {
				this._inputData.onChangedCallback();
			}
		}
	}
	,onScroll: function(e) {
		this._inputData.hscrollPos = this.element.scrollLeft;
		this._inputData.vscrollPos = this.element.scrollTop;
		this._inputData.hscrollMax = this._textWidth - this._width;
		this._inputData.hscrollPageSize = this._width * this._inputData.hscrollMax / this._textWidth;
		this._inputData.vscrollMax = this._textHeight - this._height;
		this._inputData.vscrollPageSize = this._height * this._inputData.vscrollMax / this._textHeight;
		if(this._inputData.onScrollCallback != null) {
			this._inputData.onScrollCallback();
		}
	}
	,validateData: function() {
		if(this._text != null) {
			var html = this.normalizeText(this._text);
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).value = html;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).value = html;
			}
		}
		var hscrollValue = this._inputData.hscrollPos | 0;
		if(this.element.scrollLeft != hscrollValue) {
			this.element.scrollLeft = hscrollValue;
		}
		var vscrollValue = this._inputData.vscrollPos | 0;
		if(this.element.scrollTop != vscrollValue) {
			this.element.scrollTop = vscrollValue;
		}
	}
	,validateStyle: function() {
		var measureTextRequired = false;
		if(this._displayData.multiline == false && ((this.element) instanceof HTMLInputElement) == false || this._displayData.multiline == true && ((this.element) instanceof HTMLTextAreaElement) == false) {
			var newElement = this.createElement();
			this.element.parentElement.appendChild(newElement);
			haxe_ui_backend_html5_HtmlUtils.removeElement(this.element);
			this.element.removeEventListener("input",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("propertychange",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("scroll",$bind(this,this.onScroll));
			this.element = newElement;
			this.validateData();
			measureTextRequired = true;
		}
		if(((this.element) instanceof HTMLInputElement)) {
			var inputElement = this.element;
			if(this._inputData.password == true && inputElement.type != "password") {
				inputElement.type = "password";
			} else if(this._inputData.password == false && inputElement.type != "") {
				inputElement.type = "";
			}
		}
		if(this.parentComponent.get_disabled() || this.parentComponent._interactivityDisabled == true) {
			this.element.style.cursor = "not-allowed";
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).disabled = true;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).disabled = true;
			}
		} else {
			this.element.style.cursor = null;
			if(((this.element) instanceof HTMLInputElement)) {
				(js_Boot.__cast(this.element , HTMLInputElement)).disabled = false;
			} else if(((this.element) instanceof HTMLTextAreaElement)) {
				(js_Boot.__cast(this.element , HTMLTextAreaElement)).disabled = false;
			}
		}
		if(!haxe_ui_backend_TextDisplayImpl.prototype.validateStyle.call(this)) {
			return measureTextRequired;
		} else {
			return true;
		}
	}
	,measureText: function() {
		var div = haxe_ui_backend_html5_HtmlUtils.getDivHelper("haxeui-text-input-div-helper");
		this.setTempDivData(div);
		haxe_ui_backend_html5_HtmlUtils.releaseDivHelper(div);
		this._textWidth = div.clientWidth;
		this._textHeight = div.clientHeight + 2;
		this._inputData.hscrollMax = this._textWidth - this._width;
		this._inputData.hscrollPageSize = this._width * this._inputData.hscrollMax / this._textWidth;
		this._inputData.vscrollMax = this._textHeight - this._height;
		this._inputData.vscrollPageSize = this._height * this._inputData.vscrollMax / this._textHeight;
	}
	,_selectionStartIndex: null
	,get_selectionStartIndex: function() {
		return this._selectionStartIndex;
	}
	,set_selectionStartIndex: function(value) {
		this._selectionStartIndex = value;
		this.applySelection();
		return value;
	}
	,_selectedEndIndex: null
	,get_selectionEndIndex: function() {
		return this._selectedEndIndex;
	}
	,set_selectionEndIndex: function(value) {
		this._selectedEndIndex = value;
		this.applySelection();
		return value;
	}
	,applySelection: function() {
		if(this._selectionStartIndex < 0 || this._selectedEndIndex < 0) {
			return;
		}
		if(this._text != null && this._selectedEndIndex > this._text.length) {
			this._selectedEndIndex = this._text.length;
		}
		if(((this.element) instanceof HTMLInputElement)) {
			(js_Boot.__cast(this.element , HTMLInputElement)).setSelectionRange(this._selectionStartIndex,this._selectedEndIndex);
		} else if(((this.element) instanceof HTMLTextAreaElement)) {
			(js_Boot.__cast(this.element , HTMLTextAreaElement)).setSelectionRange(this._selectionStartIndex,this._selectedEndIndex);
		}
	}
	,createElement: function() {
		if(this.element != null) {
			this.element.removeEventListener("input",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("propertychange",$bind(this,this.onChangeEvent));
			this.element.removeEventListener("scroll",$bind(this,this.onScroll));
		}
		var el = null;
		if(this._displayData.multiline == false) {
			el = window.document.createElement("input");
			el.style.border = "none";
			el.style.outline = "none";
			el.style.whiteSpace = "pre";
			el.style.overflow = "hidden";
			el.style.cursor = "initial";
			el.style.position = "absolute";
			el.style.backgroundColor = "inherit";
			el.style.padding = "0px";
			el.spellcheck = false;
		} else {
			el = window.document.createElement("textarea");
			el.style.border = "none";
			el.style.resize = "none";
			el.style.outline = "none";
			el.style.lineHeight = "1.4";
			el.style.padding = "0px";
			el.style.margin = "0px";
			el.style.bottom = "0px";
			el.style.right = "0px";
			el.style.overflow = "hidden";
			el.style.cursor = "initial";
			el.style.position = "absolute";
			el.style.backgroundColor = "inherit";
			el.style.whiteSpace = "pre-wrap";
			el.id = "textArea";
			el.spellcheck = false;
			el.onkeydown = function(e) {
				if(e.keyCode == 9 || e.which == 9) {
					e.preventDefault();
					e.stopImmediatePropagation();
					e.stopPropagation();
					var ta = js_Boot.__cast(el , HTMLTextAreaElement);
					var s = ta.selectionStart;
					ta.value = ta.value.substring(0,ta.selectionStart) + "\t" + ta.value.substring(ta.selectionEnd);
					ta.selectionEnd = s + 1;
					return false;
				}
				return true;
			};
		}
		el.addEventListener("input",$bind(this,this.onChangeEvent));
		el.addEventListener("propertychange",$bind(this,this.onChangeEvent));
		el.addEventListener("scroll",$bind(this,this.onScroll));
		return el;
	}
	,validatePosition: function() {
		var x = this._left;
		var y = this._top;
		if(this._displayData.multiline == false && this.parentComponent != null && this.parentComponent.get_style() != null) {
			if(this.parentComponent.get_style().borderLeftSize != null) {
				x -= this.parentComponent.get_style().borderLeftSize;
			}
			if(this.parentComponent.get_style().borderTopSize != null) {
				y -= this.parentComponent.get_style().borderTopSize;
			}
		}
		var style = this.element.style;
		style.left = "" + x + "px";
		style.top = "" + y + "px";
	}
	,setTempDivData: function(div) {
		var t = this._text;
		if(t == null || t.length == 0) {
			t = "|";
		}
		div.style.fontFamily = this.element.style.fontFamily;
		div.style.fontSize = this.element.style.fontSize;
		div.style.whiteSpace = this.element.style.whiteSpace;
		div.style.lineHeight = this.element.style.lineHeight;
		if(((this.element) instanceof HTMLTextAreaElement)) {
			div.style.wordBreak = this.element.style.wordBreak;
		}
		if(this.get_autoWidth() == false) {
			div.style.width = this._width > 0 ? "" + ("" + this._width + "px") : "";
		} else {
			div.style.width = "";
		}
		var normalizedText = haxe_ui_backend_TextDisplayImpl.prototype.normalizeText.call(this,t);
		normalizedText = StringTools.replace(normalizedText,"<","&lt;");
		normalizedText = StringTools.replace(normalizedText,">","&gt;");
		if(this._displayData.multiline == true) {
			normalizedText += "<br>";
		}
		div.innerHTML = normalizedText;
	}
	,__class__: haxe_ui_backend_TextInputImpl
});
var haxe_ui_backend_TimerImpl = function(delay,callback) {
	this._timer = new haxe_Timer(delay);
	this._timer.run = function() {
		callback();
	};
};
$hxClasses["haxe.ui.backend.TimerImpl"] = haxe_ui_backend_TimerImpl;
haxe_ui_backend_TimerImpl.__name__ = "haxe.ui.backend.TimerImpl";
haxe_ui_backend_TimerImpl.prototype = {
	_timer: null
	,stop: function() {
		this._timer.stop();
	}
	,__class__: haxe_ui_backend_TimerImpl
};
var haxe_ui_backend_html5_EventMapper = function() { };
$hxClasses["haxe.ui.backend.html5.EventMapper"] = haxe_ui_backend_html5_EventMapper;
haxe_ui_backend_html5_EventMapper.__name__ = "haxe.ui.backend.html5.EventMapper";
var haxe_ui_backend_html5_HtmlUtils = function() { };
$hxClasses["haxe.ui.backend.html5.HtmlUtils"] = haxe_ui_backend_html5_HtmlUtils;
haxe_ui_backend_html5_HtmlUtils.__name__ = "haxe.ui.backend.html5.HtmlUtils";
haxe_ui_backend_html5_HtmlUtils.__properties__ = {get_dpi:"get_dpi"};
haxe_ui_backend_html5_HtmlUtils.px = function(value) {
	return "" + value + "px";
};
haxe_ui_backend_html5_HtmlUtils.color = function(value) {
	if(value == null) {
		return "rgba(0, 0, 0, 0)";
	}
	return "#" + StringTools.hex(value,6);
};
haxe_ui_backend_html5_HtmlUtils.rgba = function(value,alpha) {
	if(alpha == null) {
		alpha = 1;
	}
	var r = value >> 16 & 255;
	var g = value >> 8 & 255;
	var b = value & 255;
	return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
};
haxe_ui_backend_html5_HtmlUtils.escape = function(s) {
	s = StringTools.replace(s,"\"","&quot;");
	s = StringTools.replace(s,"'","&#39;");
	s = StringTools.replace(s,"<","&lt;");
	s = StringTools.replace(s,">","&gt;");
	return s;
};
haxe_ui_backend_html5_HtmlUtils.namedChild = function(el,child,index) {
	if(index == null) {
		index = 0;
	}
	if(child != null) {
		var list = el.getElementsByTagName(child);
		if(list.length == 0) {
			return null;
		}
		el = list.item(index);
	}
	return el;
};
haxe_ui_backend_html5_HtmlUtils.getDivHelper = function(id) {
	var div = null;
	if(id != null) {
		var helper = haxe_ui_backend_html5_HtmlUtils._divHelpersId.h[id];
		if(helper != null) {
			div = helper.div;
		}
	} else {
		var key = haxe_ui_backend_html5_HtmlUtils._divHelpers.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			var value = haxe_ui_backend_html5_HtmlUtils._divHelpers.h[key1.__id__];
			if(value.claimed == false) {
				div = value.div;
				break;
			}
		}
	}
	if(div == null) {
		div = window.document.createElement("div");
		div.style.position = "absolute";
		div.style.top = "-99999px";
		div.style.left = "-99999px";
		window.document.body.appendChild(div);
		var helper = { div : div, claimed : true};
		if(id != null) {
			haxe_ui_backend_html5_HtmlUtils._divHelpersId.h[id] = helper;
		} else {
			haxe_ui_backend_html5_HtmlUtils._divHelpers.set(div,helper);
		}
	}
	return div;
};
haxe_ui_backend_html5_HtmlUtils.releaseDivHelper = function(div) {
	if(haxe_ui_backend_html5_HtmlUtils._divHelpers.h.__keys__[div.__id__] != null) {
		haxe_ui_backend_html5_HtmlUtils._divHelpers.h[div.__id__].claimed = false;
	}
};
haxe_ui_backend_html5_HtmlUtils.measureText = function(text,addWidth,addHeight,fontSize,fontName) {
	if(fontSize == null) {
		fontSize = -1;
	}
	if(addHeight == null) {
		addHeight = 0;
	}
	if(addWidth == null) {
		addWidth = 0;
	}
	var div = haxe_ui_backend_html5_HtmlUtils.getDivHelper();
	div.style.width = "";
	div.style.height = "";
	if(fontSize > 0) {
		div.style.fontSize = "" + fontSize + "px";
	} else {
		div.style.fontSize = "";
	}
	if(fontName != null) {
		div.style.fontFamily = fontName;
	} else {
		div.style.fontFamily = "";
	}
	div.innerHTML = text;
	return new haxe_ui_geom_Size(div.clientWidth + addWidth,div.clientHeight + addHeight);
};
haxe_ui_backend_html5_HtmlUtils.addEventListener = function(element,type,listener,passive) {
	if(passive == null) {
		passive = true;
	}
	element.addEventListener(type,listener,{ passive : passive});
};
haxe_ui_backend_html5_HtmlUtils.get_dpi = function() {
	if(haxe_ui_backend_html5_HtmlUtils._dpi != 0) {
		return haxe_ui_backend_html5_HtmlUtils._dpi;
	}
	var div = window.document.createElement("div");
	div.style.width = "1in";
	div.style.height = "1in";
	div.style.position = "absolute";
	div.style.top = "-99999px";
	div.style.left = "-99999px";
	window.document.body.appendChild(div);
	var devicePixelRatio = window.devicePixelRatio;
	if(devicePixelRatio == null) {
		devicePixelRatio = 1;
	}
	haxe_ui_backend_html5_HtmlUtils._dpi = div.offsetWidth * devicePixelRatio;
	haxe_ui_backend_html5_HtmlUtils.removeElement(div);
	return haxe_ui_backend_html5_HtmlUtils._dpi;
};
haxe_ui_backend_html5_HtmlUtils.swapElements = function(el1,el2) {
	el2.parentElement.insertBefore(el2,el1);
};
haxe_ui_backend_html5_HtmlUtils.insertBefore = function(el,before) {
	before.parentElement.insertBefore(before,el);
};
haxe_ui_backend_html5_HtmlUtils.removeElement = function(el) {
	if(el != null && el.parentElement != null) {
		el.parentElement.removeChild(el);
	}
};
haxe_ui_backend_html5_HtmlUtils.isRetinaDisplay = function() {
	if(haxe_ui_backend_html5_HtmlUtils._isRetina == null) {
		var query = "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)";
		if(window.matchMedia(query).matches) {
			haxe_ui_backend_html5_HtmlUtils._isRetina = true;
		} else {
			haxe_ui_backend_html5_HtmlUtils._isRetina = false;
		}
	}
	return haxe_ui_backend_html5_HtmlUtils._isRetina;
};
var haxe_ui_backend_html5_StyleHelper = function() { };
$hxClasses["haxe.ui.backend.html5.StyleHelper"] = haxe_ui_backend_html5_StyleHelper;
haxe_ui_backend_html5_StyleHelper.__name__ = "haxe.ui.backend.html5.StyleHelper";
haxe_ui_backend_html5_StyleHelper.apply = function(component,width,height,style) {
	var element = component.element;
	var css = element.style;
	var slice = null;
	if(style.backgroundImageSliceTop != null && style.backgroundImageSliceLeft != null && style.backgroundImageSliceBottom != null && style.backgroundImageSliceRight != null) {
		slice = new haxe_ui_geom_Rectangle(style.backgroundImageSliceLeft,style.backgroundImageSliceTop,style.backgroundImageSliceRight - style.backgroundImageSliceLeft,style.backgroundImageSliceBottom - style.backgroundImageSliceTop);
	}
	if(slice != null) {
		width = Math.round(width);
		height = Math.round(height);
	}
	css.width = "" + width + "px";
	css.height = "" + height + "px";
	var borderStyle = style.borderStyle;
	if(borderStyle == null) {
		borderStyle = "solid";
	}
	if(style.borderLeftSize != null && style.borderLeftSize == style.borderRightSize && style.borderLeftSize == style.borderBottomSize && style.borderLeftSize == style.borderTopSize) {
		if(style.borderLeftSize > 0) {
			css.borderWidth = "" + style.borderLeftSize + "px";
			css.borderStyle = borderStyle;
		} else {
			css.removeProperty("border-width");
			css.removeProperty("border-style");
		}
	} else if(style.borderLeftSize == null && style.borderRightSize == null && style.borderBottomSize == null && style.borderTopSize == null) {
		css.removeProperty("border-width");
		css.removeProperty("border-style");
	} else {
		if(style.borderTopSize != null && style.borderTopSize > 0) {
			css.borderTopWidth = "" + style.borderTopSize + "px";
			css.borderTopStyle = borderStyle;
		} else {
			css.removeProperty("border-top-width");
			css.removeProperty("border-top-style");
		}
		if(style.borderLeftSize != null && style.borderLeftSize > 0) {
			css.borderLeftWidth = "" + style.borderLeftSize + "px";
			css.borderLeftStyle = borderStyle;
		} else {
			css.removeProperty("border-left-width");
			css.removeProperty("border-left-style");
		}
		if(style.borderBottomSize != null && style.borderBottomSize > 0) {
			css.borderBottomWidth = "" + style.borderBottomSize + "px";
			css.borderBottomStyle = borderStyle;
		} else {
			css.removeProperty("border-bottom-width");
			css.removeProperty("border-bottom-style");
		}
		if(style.borderRightSize != null && style.borderRightSize > 0) {
			css.borderRightWidth = "" + style.borderRightSize + "px";
			css.borderRightStyle = borderStyle;
		} else {
			css.removeProperty("border-right-width");
			css.removeProperty("border-right-style");
		}
	}
	if(style.borderLeftColor != null && style.borderLeftColor == style.borderRightColor && style.borderLeftColor == style.borderBottomColor && style.borderLeftColor == style.borderTopColor) {
		if(style.borderOpacity == null) {
			css.borderColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
		} else {
			css.borderColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderLeftColor,style.borderOpacity);
		}
	} else if(style.borderLeftColor == null && style.borderRightColor == null && style.borderBottomColor == null && style.borderTopColor == null) {
		css.removeProperty("border-color");
	} else {
		if(style.borderTopColor != null && style.borderTopSize != null) {
			if(style.borderOpacity == null) {
				css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderTopColor);
			} else {
				css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderTopColor,style.borderOpacity);
			}
		} else if(style.borderTopColor == null && style.borderTopSize != null) {
			css.borderTopColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderTopColor);
		} else {
			css.removeProperty("border-top-color");
		}
		if(style.borderLeftColor != null && style.borderLeftSize != null) {
			if(style.borderOpacity == null) {
				css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
			} else {
				css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderLeftColor,style.borderOpacity);
			}
		} else if(style.borderLeftColor == null && style.borderLeftSize != null) {
			css.borderLeftColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderLeftColor);
		} else {
			css.removeProperty("border-left-color");
		}
		if(style.borderBottomColor != null && style.borderBottomSize != null) {
			if(style.borderOpacity == null) {
				css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderBottomColor);
			} else {
				css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderBottomColor,style.borderOpacity);
			}
		} else if(style.borderBottomColor == null && style.borderBottomSize != null) {
			css.borderBottomColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderBottomColor);
		} else {
			css.removeProperty("border-bottom-color");
		}
		if(style.borderRightColor != null && style.borderRightSize != null) {
			if(style.borderOpacity == null) {
				css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderRightColor);
			} else {
				css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.borderRightColor,style.borderOpacity);
			}
		} else if(style.borderRightColor == null && style.borderRightSize != null) {
			css.borderRightColor = haxe_ui_backend_html5_HtmlUtils.color(style.borderRightColor);
		} else {
			css.removeProperty("border-right-color");
		}
	}
	var background = [];
	if(style.backgroundColor != null) {
		if(style.backgroundColorEnd != null && style.backgroundColorEnd != style.backgroundColor) {
			css.removeProperty("background-color");
			var gradientStyle = style.backgroundGradientStyle;
			if(gradientStyle == null) {
				gradientStyle = "vertical";
			}
			if(style.backgroundOpacity != null) {
				if(gradientStyle == "vertical") {
					background.push("linear-gradient(to bottom, " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity) + ", " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColorEnd,style.backgroundOpacity) + ")");
				} else if(gradientStyle == "horizontal") {
					background.push("linear-gradient(to right, " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity) + ", " + haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColorEnd,style.backgroundOpacity) + ")");
				}
			} else if(gradientStyle == "vertical") {
				background.push("linear-gradient(to bottom, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")");
			} else if(gradientStyle == "horizontal") {
				background.push("linear-gradient(to right, " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor) + ", " + haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColorEnd) + ")");
			}
		} else {
			css.removeProperty("background");
			if(style.backgroundOpacity != null) {
				css.backgroundColor = haxe_ui_backend_html5_HtmlUtils.rgba(style.backgroundColor,style.backgroundOpacity);
			} else {
				css.backgroundColor = haxe_ui_backend_html5_HtmlUtils.color(style.backgroundColor);
			}
		}
	} else {
		css.removeProperty("background");
		css.removeProperty("background-color");
	}
	if(style.borderRadius != null && style.borderRadius > 0 && (style.borderRadiusTopLeft == null || style.borderRadiusTopLeft == style.borderRadius) && (style.borderRadiusTopRight == null || style.borderRadiusTopRight == style.borderRadius) && (style.borderRadiusBottomLeft == null || style.borderRadiusBottomLeft == style.borderRadius) && (style.borderRadiusBottomRight == null || style.borderRadiusBottomRight == style.borderRadius)) {
		css.borderRadius = "" + style.borderRadius + "px";
	} else if(style.borderRadiusTopLeft != null && style.borderRadiusTopLeft > 0 || style.borderRadiusTopRight != null && style.borderRadiusTopRight > 0 || style.borderRadiusBottomLeft != null && style.borderRadiusBottomLeft > 0 || style.borderRadiusBottomRight != null && style.borderRadiusBottomRight > 0) {
		if(style.borderRadiusTopLeft != null && style.borderRadiusTopLeft > 0) {
			css.borderTopLeftRadius = "" + style.borderRadiusTopLeft + "px";
		} else {
			css.removeProperty("border-top-left-radius");
		}
		if(style.borderRadiusTopRight != null && style.borderRadiusTopRight > 0) {
			css.borderTopRightRadius = "" + style.borderRadiusTopRight + "px";
		} else {
			css.removeProperty("border-top-right-radius");
		}
		if(style.borderRadiusBottomLeft != null && style.borderRadiusBottomLeft > 0) {
			css.borderBottomLeftRadius = "" + style.borderRadiusBottomLeft + "px";
		} else {
			css.removeProperty("border-bottom-left-radius");
		}
		if(style.borderRadiusBottomRight != null && style.borderRadiusBottomRight > 0) {
			css.borderBottomRightRadius = "" + style.borderRadiusBottomRight + "px";
		} else {
			css.removeProperty("border-bottom-right-radius");
		}
	} else {
		css.removeProperty("border-radius");
	}
	if(style.backgroundImage != null) {
		haxe_ui_Toolkit.get_assets().getImage(haxe_ui_util_Variant.toString(style.backgroundImage),function(imageInfo) {
			if(imageInfo == null) {
				return;
			}
			var imageRect = new haxe_ui_geom_Rectangle(0,0,imageInfo.width,imageInfo.height);
			if(style.backgroundImageClipTop != null && style.backgroundImageClipLeft != null && style.backgroundImageClipBottom != null && style.backgroundImageClipRight != null) {
				imageRect = new haxe_ui_geom_Rectangle(style.backgroundImageClipLeft,style.backgroundImageClipTop,style.backgroundImageClipRight - style.backgroundImageClipLeft,style.backgroundImageClipBottom - style.backgroundImageClipTop);
			}
			if(slice == null) {
				if(imageRect.width == imageInfo.width && imageRect.height == imageInfo.height) {
					var backgroundRepeat = null;
					var backgroundSizeX = null;
					var backgroundSizeY = null;
					background.push("url(" + imageInfo.data.src + ")");
					if(style.backgroundImageRepeat == null || style.backgroundImageRepeat == "no-repeat") {
						backgroundRepeat = "no-repeat";
					} else if(style.backgroundImageRepeat == "repeat") {
						backgroundRepeat = "repeat";
					} else if(style.backgroundImageRepeat == "stretch") {
						backgroundRepeat = "no-repeat";
						backgroundSizeX = "100%";
						backgroundSizeY = "100%";
					}
					if(style.backgroundWidth != null) {
						backgroundSizeX = style.backgroundWidth + "px";
					} else if(style.backgroundWidthPercent != null) {
						backgroundSizeX = style.backgroundWidthPercent + "%";
					}
					if(style.backgroundHeight != null) {
						backgroundSizeY = style.backgroundHeight + "px";
					} else if(style.backgroundHeightPercent != null) {
						backgroundSizeY = style.backgroundHeightPercent + "%";
					}
					background.reverse();
					css.background = background.join(",");
					if(backgroundSizeX != null || backgroundSizeY != null) {
						css.backgroundSize = backgroundSizeX + " " + backgroundSizeY;
					} else {
						css.removeProperty("background-size");
					}
					if(backgroundRepeat != null) {
						css.backgroundRepeat = backgroundRepeat;
					} else {
						css.removeProperty("background-repeat");
					}
				} else {
					var canvas = component.getCanvas(width,height);
					var ctx = canvas.getContext("2d",null);
					ctx.clearRect(0,0,width,height);
					haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx,imageInfo.data,imageRect,new haxe_ui_geom_Rectangle(0,0,width,height));
				}
			} else {
				var rects = haxe_ui_geom_Slice9.buildRects(width,height,imageRect.width,imageRect.height,slice);
				var srcRects = rects.src;
				var dstRects = rects.dst;
				var canvas = component.getCanvas(width,height);
				var ctx = canvas.getContext("2d",null);
				ctx.clearRect(0,0,width,height);
				ctx.imageSmoothingEnabled = false;
				var _g = 0;
				var _g1 = srcRects.length;
				while(_g < _g1) {
					var i = _g++;
					var srcRect = new haxe_ui_geom_Rectangle(srcRects[i].left + imageRect.left,srcRects[i].top + imageRect.top,srcRects[i].width,srcRects[i].height);
					var dstRect = dstRects[i];
					haxe_ui_backend_html5_StyleHelper.paintBitmap(ctx,imageInfo.data,srcRect,dstRect);
				}
			}
		});
	} else {
		component.removeCanvas();
		css.background = background[0];
	}
};
haxe_ui_backend_html5_StyleHelper.paintBitmap = function(ctx,img,srcRect,dstRect) {
	if(srcRect.width == 0 || srcRect.height == 0) {
		return;
	}
	if(dstRect.width == 0 || dstRect.height == 0) {
		return;
	}
	ctx.drawImage(img,srcRect.left | 0,srcRect.top | 0,srcRect.width | 0,srcRect.height | 0,dstRect.left | 0,dstRect.top | 0,dstRect.width | 0,dstRect.height | 0);
};
var haxe_ui_backend_html5_UserAgent = function() {
	this._unknown = false;
	this._msie = false;
	this._firefox = false;
	this._safari = false;
	this._chrome = false;
	this._opera = false;
	var ua = $global.navigator.userAgent;
	if(ua.indexOf("Opera") != -1 || ua.indexOf("OPR") != -1) {
		this._opera = true;
	} else if(ua.indexOf("Chrome") != -1) {
		this._chrome = true;
	} else if(ua.indexOf("Safari") != -1) {
		this._safari = true;
	} else if(ua.indexOf("Firefox") != -1) {
		this._firefox = true;
	} else if(ua.indexOf("MSIE") != -1) {
		this._msie = true;
	} else {
		this._unknown = true;
	}
};
$hxClasses["haxe.ui.backend.html5.UserAgent"] = haxe_ui_backend_html5_UserAgent;
haxe_ui_backend_html5_UserAgent.__name__ = "haxe.ui.backend.html5.UserAgent";
haxe_ui_backend_html5_UserAgent.__properties__ = {get_instance:"get_instance"};
haxe_ui_backend_html5_UserAgent.get_instance = function() {
	if(haxe_ui_backend_html5_UserAgent._instance == null) {
		haxe_ui_backend_html5_UserAgent._instance = new haxe_ui_backend_html5_UserAgent();
	}
	return haxe_ui_backend_html5_UserAgent._instance;
};
haxe_ui_backend_html5_UserAgent.prototype = {
	_opera: null
	,opera: null
	,get_opera: function() {
		return this._opera;
	}
	,_chrome: null
	,chrome: null
	,get_chrome: function() {
		return this._chrome;
	}
	,_safari: null
	,safari: null
	,get_safari: function() {
		return this._safari;
	}
	,_firefox: null
	,firefox: null
	,get_firefox: function() {
		return this._firefox;
	}
	,_msie: null
	,msie: null
	,get_msie: function() {
		return this._msie;
	}
	,_unknown: null
	,unknown: null
	,get_unknown: function() {
		return this._unknown;
	}
	,__class__: haxe_ui_backend_html5_UserAgent
	,__properties__: {get_unknown:"get_unknown",get_msie:"get_msie",get_firefox:"get_firefox",get_safari:"get_safari",get_chrome:"get_chrome",get_opera:"get_opera"}
};
var haxe_ui_backend_html5_graphics_CanvasGraphicsImpl = function(component) {
	this._hasSize = false;
	this._ctx = null;
	this._canvas = null;
	haxe_ui_backend_ComponentGraphicsBase.call(this,component);
	this.createCanvas();
};
$hxClasses["haxe.ui.backend.html5.graphics.CanvasGraphicsImpl"] = haxe_ui_backend_html5_graphics_CanvasGraphicsImpl;
haxe_ui_backend_html5_graphics_CanvasGraphicsImpl.__name__ = "haxe.ui.backend.html5.graphics.CanvasGraphicsImpl";
haxe_ui_backend_html5_graphics_CanvasGraphicsImpl.__super__ = haxe_ui_backend_ComponentGraphicsBase;
haxe_ui_backend_html5_graphics_CanvasGraphicsImpl.prototype = $extend(haxe_ui_backend_ComponentGraphicsBase.prototype,{
	_canvas: null
	,_ctx: null
	,_hasSize: null
	,fillStyle: function(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(this._hasSize == false) {
			haxe_ui_backend_ComponentGraphicsBase.prototype.fillStyle.call(this,color,alpha);
			return;
		}
		this._ctx.fillStyle = "rgb(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ")";
	}
	,rectangle: function(x,y,width,height) {
		if(this._hasSize == false) {
			haxe_ui_backend_ComponentGraphicsBase.prototype.rectangle.call(this,x,y,width,height);
			return;
		}
		this._ctx.fillRect(x,y,width,height);
	}
	,setPixel: function(x,y,color) {
		if(this._hasSize == false) {
			haxe_ui_backend_ComponentGraphicsBase.prototype.setPixel.call(this,x,y,color);
			return;
		}
		this._ctx.fillStyle = "rgb(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ")";
		this._ctx.fillRect(x,y,1,1);
	}
	,createCanvas: function() {
		if(this._component.element == null) {
			return;
		}
		this._canvas = window.document.createElement("canvas");
		this._component.element.appendChild(this._canvas);
		this._ctx = this._canvas.getContext("2d",null);
	}
	,setPixels: function(pixels) {
		if(this._hasSize == false) {
			haxe_ui_backend_ComponentGraphicsBase.prototype.setPixels.call(this,pixels);
			return;
		}
		var imageData = new ImageData(new Uint8ClampedArray(pixels.b.bufferValue),this._ctx.canvas.width,this._ctx.canvas.height);
		this._ctx.putImageData(imageData,0,0);
	}
	,resize: function(width,height) {
		this._canvas.width = width | 0;
		this._canvas.height = height | 0;
		if(width > 0 && height > 0) {
			if(this._hasSize == false) {
				this._hasSize = true;
				this.replayDrawCommands();
			}
		}
	}
	,detach: function() {
		this._canvas.remove();
		this._canvas = null;
		this._ctx = null;
	}
	,__class__: haxe_ui_backend_html5_graphics_CanvasGraphicsImpl
});
var haxe_ui_backend_html5_graphics_SVGGraphicsImpl = function(component) {
	this._currentPosition = new haxe_ui_geom_Point();
	this._svg = null;
	haxe_ui_backend_ComponentGraphicsBase.call(this,component);
	this.createSVG();
};
$hxClasses["haxe.ui.backend.html5.graphics.SVGGraphicsImpl"] = haxe_ui_backend_html5_graphics_SVGGraphicsImpl;
haxe_ui_backend_html5_graphics_SVGGraphicsImpl.__name__ = "haxe.ui.backend.html5.graphics.SVGGraphicsImpl";
haxe_ui_backend_html5_graphics_SVGGraphicsImpl.__super__ = haxe_ui_backend_ComponentGraphicsBase;
haxe_ui_backend_html5_graphics_SVGGraphicsImpl.prototype = $extend(haxe_ui_backend_ComponentGraphicsBase.prototype,{
	_svg: null
	,clear: function() {
		this._svg.clear();
	}
	,_currentPosition: null
	,moveTo: function(x,y) {
		this._currentPosition.x = x;
		this._currentPosition.y = y;
	}
	,lineTo: function(x,y) {
		this._svg.line(this._currentPosition.x,this._currentPosition.y,x,y);
		this._currentPosition.x = x;
		this._currentPosition.y = y;
	}
	,strokeStyle: function(color,thickness,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(thickness == null) {
			thickness = 1;
		}
		if(thickness != null) {
			this._svg.currentStrokeStyle.thickness = thickness;
		}
		if(color != null) {
			if(alpha < 1) {
				this._svg.currentStrokeStyle.color = "rgba(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ", " + alpha + ")";
			} else {
				this._svg.currentStrokeStyle.color = "rgb(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ")";
			}
		} else {
			this._svg.currentStrokeStyle.color = "none";
		}
	}
	,fillStyle: function(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(color != null) {
			if(alpha < 1) {
				this._svg.currentFillStyle.color = "rgba(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ", " + alpha + ")";
			} else {
				this._svg.currentFillStyle.color = "rgb(" + (color >> 16 & 255) + ", " + (color >> 8 & 255) + ", " + (color & 255) + ")";
			}
		} else {
			this._svg.currentFillStyle.color = "none";
		}
	}
	,circle: function(x,y,radius) {
		this._svg.circle(x,y,radius);
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		this._svg.path(this._currentPosition.x,this._currentPosition.y).quadraticBezier(controlX,controlY,anchorX,anchorY);
		this._currentPosition.x = anchorX;
		this._currentPosition.y = anchorY;
	}
	,cubicCurveTo: function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) {
		this._svg.path(this._currentPosition.x,this._currentPosition.y).cubicBezier(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY);
		this._currentPosition.x = anchorX;
		this._currentPosition.y = anchorY;
	}
	,rectangle: function(x,y,width,height) {
		this._svg.rectangle(x,y,width,height);
	}
	,setPixel: function(x,y,color) {
		this.strokeStyle(null);
		this.fillStyle(color);
		this.rectangle(x,y,1,1);
	}
	,image: function(resource,x,y,width,height) {
		var _gthis = this;
		new haxe_ui_util_ImageLoader(resource).load(function(imageInfo) {
			if(imageInfo != null) {
				if(x == null) {
					x = 0;
				}
				if(y == null) {
					y = 0;
				}
				if(width == null) {
					width = imageInfo.width;
				}
				if(height == null) {
					height = imageInfo.height;
				}
				_gthis._svg.image(imageInfo.data.src,x,y,width,height);
			} else {
				haxe_Log.trace("could not load: " + (resource == null ? "null" : haxe_ui_util_Variant.toString(resource)),{ fileName : "haxe/ui/backend/html5/graphics/SVGGraphicsImpl.hx", lineNumber : 97, className : "haxe.ui.backend.html5.graphics.SVGGraphicsImpl", methodName : "image"});
			}
		});
	}
	,createSVG: function() {
		if(this._component.element == null) {
			return;
		}
		var existingElements = this._component.element.getElementsByTagNameNS("http://www.w3.org/2000/svg","svg");
		var existingElement = null;
		if(existingElements.length > 0) {
			existingElements.item(0);
		}
		this._svg = new haxe_ui_backend_html5_svg_SVGBuilder(existingElement);
		if(existingElement == null) {
			this._component.element.appendChild(this._svg.element);
		}
	}
	,resize: function(width,height) {
		this._svg.size(width,height);
	}
	,detach: function() {
		this._svg.element.remove();
		this._svg = null;
	}
	,__class__: haxe_ui_backend_html5_graphics_SVGGraphicsImpl
});
var haxe_ui_backend_html5_svg_SVGBuilder = function(existingElement,width,height) {
	this.currentFontStyle = { };
	this.currentFillStyle = { };
	this.currentStrokeStyle = { };
	this.element = null;
	if(existingElement == null) {
		this.element = window.document.createElementNS("http://www.w3.org/2000/svg","svg");
	} else {
		this.element = existingElement;
	}
	if(width != null) {
		this.element.setAttribute("width",width == null ? "null" : "" + width);
	}
	if(height != null) {
		this.element.setAttribute("height",height == null ? "null" : "" + height);
	}
};
$hxClasses["haxe.ui.backend.html5.svg.SVGBuilder"] = haxe_ui_backend_html5_svg_SVGBuilder;
haxe_ui_backend_html5_svg_SVGBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGBuilder";
haxe_ui_backend_html5_svg_SVGBuilder.prototype = {
	element: null
	,size: function(width,height) {
		this.element.setAttribute("width",width == null ? "null" : "" + width);
		this.element.setAttribute("height",height == null ? "null" : "" + height);
	}
	,shapeRendering: function(value) {
		this.element.setAttribute("shape-rendering",value);
	}
	,clear: function() {
		this.element.innerHTML = "";
	}
	,currentStrokeStyle: null
	,strokeStyle: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.currentStrokeStyle.color = strokeStyle.color;
		}
		if(strokeStyle.thickness != null) {
			this.currentStrokeStyle.thickness = strokeStyle.thickness;
		}
		if(strokeStyle.alpha != null) {
			this.currentStrokeStyle.alpha = strokeStyle.alpha;
		}
	}
	,clearStrokeStyle: function() {
		this.currentStrokeStyle = { };
	}
	,currentFillStyle: null
	,fillStyle: function(fillStyle) {
		if(fillStyle.color != null) {
			this.currentFillStyle.color = fillStyle.color;
		}
	}
	,clearFillStyle: function() {
		this.currentFillStyle = { };
	}
	,currentFontStyle: null
	,fontStyle: function(fontStyle) {
		if(fontStyle.size != null) {
			this.currentFontStyle.size = fontStyle.size;
		}
		if(fontStyle.family != null) {
			this.currentFontStyle.family = fontStyle.family;
		}
		if(fontStyle.anchor != null) {
			this.currentFontStyle.anchor = fontStyle.anchor;
		}
	}
	,clearFontStyle: function() {
		this.currentFontStyle = { };
	}
	,line: function(x1,y1,x2,y2) {
		var builder = new haxe_ui_backend_html5_svg_SVGLineBuilder();
		builder.start(x1,y1);
		builder.end(x2,y2);
		builder.stroke(this.currentStrokeStyle);
		this.element.appendChild(builder.element);
		return builder;
	}
	,rectangle: function(x,y,width,height) {
		var builder = new haxe_ui_backend_html5_svg_SVGRectBuilder();
		builder.position(x,y);
		builder.size(width,height);
		builder.stroke(this.currentStrokeStyle);
		builder.fill(this.currentFillStyle);
		this.element.appendChild(builder.element);
		return builder;
	}
	,circle: function(x,y,r) {
		var builder = new haxe_ui_backend_html5_svg_SVGCircleBuilder();
		builder.position(x,y);
		builder.radius(r);
		builder.stroke(this.currentStrokeStyle);
		builder.fill(this.currentFillStyle);
		this.element.appendChild(builder.element);
		return builder;
	}
	,text: function(value,x,y) {
		var builder = new haxe_ui_backend_html5_svg_SVGTextBuilder();
		builder.position(x,y);
		builder.value(value);
		builder.stroke(this.currentStrokeStyle);
		builder.fill(this.currentFillStyle);
		builder.font(this.currentFontStyle);
		this.element.appendChild(builder.element);
		return builder;
	}
	,path: function(x,y,absolute) {
		if(absolute == null) {
			absolute = true;
		}
		var builder = new haxe_ui_backend_html5_svg_SVGPathBuilder();
		if(x != null && y != null) {
			builder.moveTo(x,y,absolute);
		}
		this.element.appendChild(builder.element);
		builder.stroke(this.currentStrokeStyle);
		builder.fill(this.currentFillStyle);
		return builder;
	}
	,image: function(href,x,y,width,height) {
		var builder = new haxe_ui_backend_html5_svg_SVGImageBuilder();
		if(x != null && y != null) {
			builder.position(x,y);
		}
		if(width != null && height != null) {
			builder.size(width,height);
		}
		builder.href(href);
		this.element.appendChild(builder.element);
		return builder;
	}
	,__class__: haxe_ui_backend_html5_svg_SVGBuilder
};
var haxe_ui_backend_html5_svg_SVGCircleBuilder = function() {
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","circle");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGCircleBuilder"] = haxe_ui_backend_html5_svg_SVGCircleBuilder;
haxe_ui_backend_html5_svg_SVGCircleBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGCircleBuilder";
haxe_ui_backend_html5_svg_SVGCircleBuilder.prototype = {
	element: null
	,id: function(value) {
		this.element.id = value;
		return this;
	}
	,position: function(x,y) {
		this.element.cx.baseVal.value = x;
		this.element.cy.baseVal.value = y;
		return this;
	}
	,radius: function(r) {
		this.element.r.baseVal.value = r;
		return this;
	}
	,stroke: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.element.setAttribute("stroke",strokeStyle.color);
		}
		if(strokeStyle.thickness != null) {
			this.element.setAttribute("stroke-width",strokeStyle.thickness == null ? "null" : "" + strokeStyle.thickness);
		}
		return this;
	}
	,fill: function(fillStyle) {
		if(fillStyle.color != null) {
			this.element.setAttribute("fill",fillStyle.color);
		}
		return this;
	}
	,__class__: haxe_ui_backend_html5_svg_SVGCircleBuilder
};
var haxe_ui_backend_html5_svg_SVGImageBuilder = function() {
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","image");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGImageBuilder"] = haxe_ui_backend_html5_svg_SVGImageBuilder;
haxe_ui_backend_html5_svg_SVGImageBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGImageBuilder";
haxe_ui_backend_html5_svg_SVGImageBuilder.prototype = {
	element: null
	,position: function(x,y) {
		this.element.x.baseVal.value = x;
		this.element.y.baseVal.value = y;
	}
	,size: function(width,height) {
		this.element.width.baseVal.value = width;
		this.element.height.baseVal.value = height;
	}
	,href: function(uri) {
		this.element.href.baseVal = uri;
	}
	,__class__: haxe_ui_backend_html5_svg_SVGImageBuilder
};
var haxe_ui_backend_html5_svg_SVGLineBuilder = function() {
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","line");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGLineBuilder"] = haxe_ui_backend_html5_svg_SVGLineBuilder;
haxe_ui_backend_html5_svg_SVGLineBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGLineBuilder";
haxe_ui_backend_html5_svg_SVGLineBuilder.prototype = {
	element: null
	,id: function(value) {
		this.element.id = value;
		return this;
	}
	,start: function(x,y) {
		this.element.x1.baseVal.value = x;
		this.element.y1.baseVal.value = y;
	}
	,end: function(x,y) {
		this.element.x2.baseVal.value = x;
		this.element.y2.baseVal.value = y;
	}
	,stroke: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.element.setAttribute("stroke",strokeStyle.color);
		}
		if(strokeStyle.thickness != null) {
			this.element.setAttribute("stroke-width",strokeStyle.thickness == null ? "null" : "" + strokeStyle.thickness);
		}
	}
	,__class__: haxe_ui_backend_html5_svg_SVGLineBuilder
};
var haxe_ui_backend_html5_svg_SVGPathBuilder = function() {
	this._d = new StringBuf();
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","path");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGPathBuilder"] = haxe_ui_backend_html5_svg_SVGPathBuilder;
haxe_ui_backend_html5_svg_SVGPathBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGPathBuilder";
haxe_ui_backend_html5_svg_SVGPathBuilder.prototype = {
	element: null
	,_d: null
	,id: function(value) {
		this.element.id = value;
		return this;
	}
	,moveTo: function(x,y,absolute) {
		if(absolute == null) {
			absolute = true;
		}
		if(absolute == true) {
			this._d.b += "M";
		} else {
			this._d.b += "m";
		}
		this._d.b += x == null ? "null" : "" + x;
		this._d.b += " ";
		this._d.b += y == null ? "null" : "" + y;
		this._d.b += " ";
		this.element.setAttribute("d",this._d.b);
		return this;
	}
	,lineTo: function(x,y,absolute) {
		if(absolute == null) {
			absolute = true;
		}
		if(absolute == true) {
			this._d.b += "L";
		} else {
			this._d.b += "l";
		}
		this._d.b += x == null ? "null" : "" + x;
		this._d.b += " ";
		this._d.b += y == null ? "null" : "" + y;
		this._d.b += " ";
		this.element.setAttribute("d",this._d.b);
		return this;
	}
	,cubicBezier: function(x1,y1,x2,y2,x,y,absolute) {
		if(absolute == null) {
			absolute = true;
		}
		if(absolute == true) {
			this._d.b += "C";
		} else {
			this._d.b += "c";
		}
		this._d.b += x1 == null ? "null" : "" + x1;
		this._d.b += " ";
		this._d.b += y1 == null ? "null" : "" + y1;
		this._d.b += " ";
		this._d.b += x2 == null ? "null" : "" + x2;
		this._d.b += " ";
		this._d.b += y2 == null ? "null" : "" + y2;
		this._d.b += " ";
		this._d.b += x == null ? "null" : "" + x;
		this._d.b += " ";
		this._d.b += y == null ? "null" : "" + y;
		this._d.b += " ";
		this.element.setAttribute("d",this._d.b);
		return this;
	}
	,quadraticBezier: function(x1,y1,x,y,absolute) {
		if(absolute == null) {
			absolute = true;
		}
		if(absolute == true) {
			this._d.b += "Q";
		} else {
			this._d.b += "q";
		}
		this._d.b += x1 == null ? "null" : "" + x1;
		this._d.b += " ";
		this._d.b += y1 == null ? "null" : "" + y1;
		this._d.b += " ";
		this._d.b += x == null ? "null" : "" + x;
		this._d.b += " ";
		this._d.b += y == null ? "null" : "" + y;
		this._d.b += " ";
		this.element.setAttribute("d",this._d.b);
		return this;
	}
	,close: function() {
		this._d.b += "Z ";
		this.element.setAttribute("d",this._d.b);
		return this;
	}
	,stroke: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.element.setAttribute("stroke",strokeStyle.color);
		}
		if(strokeStyle.thickness != null) {
			this.element.setAttribute("stroke-width",strokeStyle.thickness == null ? "null" : "" + strokeStyle.thickness);
		}
		return this;
	}
	,fill: function(fillStyle) {
		if(fillStyle.color != null) {
			this.element.setAttribute("fill",fillStyle.color);
		}
		return this;
	}
	,__class__: haxe_ui_backend_html5_svg_SVGPathBuilder
};
var haxe_ui_backend_html5_svg_SVGRectBuilder = function() {
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","rect");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGRectBuilder"] = haxe_ui_backend_html5_svg_SVGRectBuilder;
haxe_ui_backend_html5_svg_SVGRectBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGRectBuilder";
haxe_ui_backend_html5_svg_SVGRectBuilder.prototype = {
	element: null
	,id: function(value) {
		this.element.id = value;
		return this;
	}
	,position: function(x,y) {
		this.element.x.baseVal.value = x;
		this.element.y.baseVal.value = y;
	}
	,size: function(width,height) {
		this.element.width.baseVal.value = width;
		this.element.height.baseVal.value = height;
	}
	,stroke: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.element.setAttribute("stroke",strokeStyle.color);
		}
		if(strokeStyle.thickness != null) {
			this.element.setAttribute("stroke-width",strokeStyle.thickness == null ? "null" : "" + strokeStyle.thickness);
		}
		return this;
	}
	,fill: function(fillStyle) {
		if(fillStyle.color != null) {
			this.element.setAttribute("fill",fillStyle.color);
		}
		return this;
	}
	,__class__: haxe_ui_backend_html5_svg_SVGRectBuilder
};
var haxe_ui_backend_html5_svg_SVGTextBuilder = function() {
	this.element = null;
	this.element = window.document.createElementNS("http://www.w3.org/2000/svg","text");
};
$hxClasses["haxe.ui.backend.html5.svg.SVGTextBuilder"] = haxe_ui_backend_html5_svg_SVGTextBuilder;
haxe_ui_backend_html5_svg_SVGTextBuilder.__name__ = "haxe.ui.backend.html5.svg.SVGTextBuilder";
haxe_ui_backend_html5_svg_SVGTextBuilder.prototype = {
	element: null
	,id: function(value) {
		this.element.id = value;
		return this;
	}
	,value: function(value) {
		this.element.textContent = value;
		return this;
	}
	,position: function(x,y) {
		this.element.setAttribute("x",x == null ? "null" : "" + x);
		this.element.setAttribute("y",y == null ? "null" : "" + y);
		return this;
	}
	,offset: function(x,y) {
		this.element.setAttribute("dx",x == null ? "null" : "" + x);
		this.element.setAttribute("dy",y == null ? "null" : "" + y);
		return this;
	}
	,stroke: function(strokeStyle) {
		if(strokeStyle.color != null) {
			this.element.setAttribute("stroke",strokeStyle.color);
		}
		if(strokeStyle.thickness != null) {
			this.element.setAttribute("stroke-width",strokeStyle.thickness == null ? "null" : "" + strokeStyle.thickness);
		}
		return this;
	}
	,fill: function(fillStyle) {
		if(fillStyle.color != null) {
			this.element.setAttribute("fill",fillStyle.color);
		}
		return this;
	}
	,font: function(fontStyle) {
		if(fontStyle.size != null) {
			this.element.setAttribute("font-size",fontStyle.size == null ? "null" : "" + fontStyle.size);
		}
		if(fontStyle.family != null) {
			this.element.setAttribute("font-family",fontStyle.family);
		}
		if(fontStyle.anchor != null) {
			this.element.setAttribute("text-anchor",fontStyle.anchor);
		}
	}
	,__class__: haxe_ui_backend_html5_svg_SVGTextBuilder
};
var haxe_ui_backend_html5_text_ITextMeasurer = function() { };
$hxClasses["haxe.ui.backend.html5.text.ITextMeasurer"] = haxe_ui_backend_html5_text_ITextMeasurer;
haxe_ui_backend_html5_text_ITextMeasurer.__name__ = "haxe.ui.backend.html5.text.ITextMeasurer";
haxe_ui_backend_html5_text_ITextMeasurer.__isInterface__ = true;
haxe_ui_backend_html5_text_ITextMeasurer.prototype = {
	measureText: null
	,__class__: haxe_ui_backend_html5_text_ITextMeasurer
};
var haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer = function() {
	this._div = null;
	this._div = window.document.createElement("div");
	this._div.style.position = "absolute";
	this._div.style.top = "-99999px";
	this._div.style.left = "-99999px";
	window.document.body.appendChild(this._div);
};
$hxClasses["haxe.ui.backend.html5.text._TextMeasurer.DivTextMeasurer"] = haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer;
haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer.__name__ = "haxe.ui.backend.html5.text._TextMeasurer.DivTextMeasurer";
haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer.__interfaces__ = [haxe_ui_backend_html5_text_ITextMeasurer];
haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer.prototype = {
	_div: null
	,measureText: function(options) {
		this._div.style.fontFamily = options.fontFamily;
		this._div.style.fontSize = options.fontSize;
		this._div.style.whiteSpace = options.whiteSpace;
		this._div.style.wordBreak = options.wordBreak;
		if(options.width != null) {
			this._div.style.width = "" + options.width + "px";
		} else {
			this._div.style.width = "";
		}
		if(options.isHtml == false) {
			this._div.textContent = options.text;
		} else {
			this._div.innerHTML = options.text;
		}
		return { width : this._div.clientWidth, height : this._div.clientHeight};
	}
	,__class__: haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer
};
var haxe_ui_backend_html5_text_TextMeasurer = function() { };
$hxClasses["haxe.ui.backend.html5.text.TextMeasurer"] = haxe_ui_backend_html5_text_TextMeasurer;
haxe_ui_backend_html5_text_TextMeasurer.__name__ = "haxe.ui.backend.html5.text.TextMeasurer";
haxe_ui_backend_html5_text_TextMeasurer.__properties__ = {get_instance:"get_instance"};
haxe_ui_backend_html5_text_TextMeasurer.get_instance = function() {
	if(haxe_ui_backend_html5_text_TextMeasurer._instance == null) {
		haxe_ui_backend_html5_text_TextMeasurer._instance = new haxe_ui_backend_html5_text__$TextMeasurer_DivTextMeasurer();
	}
	return haxe_ui_backend_html5_text_TextMeasurer._instance;
};
var haxe_ui_backend_html5_util_FontDetect = function() {
};
$hxClasses["haxe.ui.backend.html5.util.FontDetect"] = haxe_ui_backend_html5_util_FontDetect;
haxe_ui_backend_html5_util_FontDetect.__name__ = "haxe.ui.backend.html5.util.FontDetect";
haxe_ui_backend_html5_util_FontDetect.init = function() {
	if(haxe_ui_backend_html5_util_FontDetect._initialized == true) {
		return;
	}
	haxe_ui_backend_html5_util_FontDetect._initialized = true;
	var body = window.document.body;
	var firstChild = window.document.body.firstChild;
	var div = window.document.createElement("div");
	div.id = "fontdetectHelper";
	haxe_ui_backend_html5_util_FontDetect.span = window.document.createElement("span");
	haxe_ui_backend_html5_util_FontDetect.span.innerText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	div.appendChild(haxe_ui_backend_html5_util_FontDetect.span);
	body.insertBefore(div,firstChild);
	div.style.position = "absolute";
	div.style.visibility = "hidden";
	div.style.top = "-200px";
	div.style.left = "-100000px";
	div.style.width = "100000px";
	div.style.height = "200px";
	div.style.fontSize = "100px";
};
haxe_ui_backend_html5_util_FontDetect.onFontLoaded = function(cssFontName,onLoad,onFail,options) {
	if(cssFontName == null) {
		return;
	}
	var msInterval = 10;
	if(options != null && options.msInterval != null) {
		msInterval = options.msInterval;
	}
	var msTimeout = 2000;
	if(options != null && options.msTimeout != null) {
		msTimeout = options.msTimeout;
	}
	if(onLoad == null && onFail == null) {
		return;
	}
	if(haxe_ui_backend_html5_util_FontDetect._initialized == false) {
		haxe_ui_backend_html5_util_FontDetect.init();
	}
	if(haxe_ui_backend_html5_util_FontDetect.isFontLoaded(cssFontName)) {
		if(onLoad != null) {
			onLoad(cssFontName);
		}
		return;
	}
	var utStart = new Date().getTime();
	var idInterval = 0;
	idInterval = window.setInterval(function() {
		if(haxe_ui_backend_html5_util_FontDetect.isFontLoaded(cssFontName)) {
			window.clearInterval(idInterval);
			if(onLoad != null) {
				onLoad(cssFontName);
			}
			return;
		} else {
			var utNow = new Date().getTime();
			if(utNow - utStart > msTimeout) {
				window.clearInterval(idInterval);
				if(onFail != null) {
					onFail(cssFontName);
				}
			}
		}
	},msInterval);
};
haxe_ui_backend_html5_util_FontDetect.isFontLoaded = function(cssFontName) {
	var wThisFont = 0;
	var wPrevFont = 0;
	if(haxe_ui_backend_html5_util_FontDetect._initialized == false) {
		haxe_ui_backend_html5_util_FontDetect.init();
	}
	var _g = 0;
	var _g1 = haxe_ui_backend_html5_util_FontDetect._aFallbackFonts.length;
	while(_g < _g1) {
		var ix = _g++;
		haxe_ui_backend_html5_util_FontDetect.span.style.fontFamily = cssFontName + "," + haxe_ui_backend_html5_util_FontDetect._aFallbackFonts[ix];
		wThisFont = haxe_ui_backend_html5_util_FontDetect.span.offsetWidth;
		if(ix > 0 && wThisFont != wPrevFont) {
			return false;
		}
		wPrevFont = wThisFont;
	}
	return true;
};
haxe_ui_backend_html5_util_FontDetect.prototype = {
	__class__: haxe_ui_backend_html5_util_FontDetect
};
var haxe_ui_backend_html5_util_StyleSheetHelper = function() {
};
$hxClasses["haxe.ui.backend.html5.util.StyleSheetHelper"] = haxe_ui_backend_html5_util_StyleSheetHelper;
haxe_ui_backend_html5_util_StyleSheetHelper.__name__ = "haxe.ui.backend.html5.util.StyleSheetHelper";
haxe_ui_backend_html5_util_StyleSheetHelper.getValidStyleSheet = function() {
	if(haxe_ui_backend_html5_util_StyleSheetHelper._sheet != null) {
		return haxe_ui_backend_html5_util_StyleSheetHelper._sheet;
	}
	var sheet = null;
	var _g = 0;
	var _g1 = window.document.styleSheets;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		if(test.ownerNode == null || test.disabled == true) {
			continue;
		}
		var css = js_Boot.__cast(test , CSSStyleSheet);
		if(css.ownerNode.nodeName == "STYLE" && css.href == null) {
			try {
				var r = css.cssRules;
				sheet = css;
				break;
			} catch( _g2 ) {
			}
		}
	}
	if(sheet == null) {
		var styleElement = window.document.createElement("style");
		styleElement.appendChild(window.document.createTextNode(""));
		window.document.head.appendChild(styleElement);
		sheet = js_Boot.__cast(styleElement.sheet , CSSStyleSheet);
	}
	haxe_ui_backend_html5_util_StyleSheetHelper._sheet = sheet;
	return sheet;
};
haxe_ui_backend_html5_util_StyleSheetHelper.prototype = {
	__class__: haxe_ui_backend_html5_util_StyleSheetHelper
};
var haxe_ui_behaviours_Behaviour = function(component) {
	this.config = null;
	this._component = component;
};
$hxClasses["haxe.ui.behaviours.Behaviour"] = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_Behaviour.__name__ = "haxe.ui.behaviours.Behaviour";
haxe_ui_behaviours_Behaviour.prototype = {
	config: null
	,_component: null
	,id: null
	,set: function(value) {
	}
	,setDynamic: function(value) {
		this.set(haxe_ui_util_Variant.fromDynamic(value));
	}
	,detatch: function() {
	}
	,get: function() {
		return null;
	}
	,getDynamic: function() {
		return haxe_ui_util_Variant.toDynamic(this.get());
	}
	,update: function() {
	}
	,call: function(param) {
		return null;
	}
	,getConfigValue: function(name,defaultValue) {
		if(this.config == null) {
			return defaultValue;
		}
		if(Object.prototype.hasOwnProperty.call(this.config.h,name) == false) {
			return defaultValue;
		}
		return this.config.h[name];
	}
	,getConfigValueBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = defaultValue;
		var s = this.getConfigValue(name);
		if(s != null) {
			v = s == "true";
		}
		return v;
	}
	,__class__: haxe_ui_behaviours_Behaviour
};
var haxe_ui_behaviours_Behaviours = function(component) {
	this._actualUpdateOrder = null;
	this._updateOrder = [];
	this._instances = new haxe_ds_StringMap();
	this._registry = new haxe_ds_StringMap();
	this._component = component;
};
$hxClasses["haxe.ui.behaviours.Behaviours"] = haxe_ui_behaviours_Behaviours;
haxe_ui_behaviours_Behaviours.__name__ = "haxe.ui.behaviours.Behaviours";
haxe_ui_behaviours_Behaviours.prototype = {
	_component: null
	,_registry: null
	,_instances: null
	,register: function(id,cls,defaultValue) {
		var info = { id : id, cls : cls, defaultValue : defaultValue, isSet : false};
		this._registry.h[id] = info;
		HxOverrides.remove(this._updateOrder,id);
		this._updateOrder.push(id);
		this._actualUpdateOrder = null;
	}
	,isRegistered: function(id) {
		return Object.prototype.hasOwnProperty.call(this._registry.h,id);
	}
	,replaceNative: function() {
		if(this._component.get_native() == false || this._component.get_hasNativeEntry() == false) {
			return;
		}
		var ids = [];
		var h = this._registry.h;
		var id_h = h;
		var id_keys = Object.keys(h);
		var id_length = id_keys.length;
		var id_current = 0;
		while(id_current < id_length) {
			var id = id_keys[id_current++];
			ids.push(id);
		}
		var _g = 0;
		while(_g < ids.length) {
			var id = ids[_g];
			++_g;
			var nativeProps = this._component.getNativeConfigProperties(".behaviour[id=" + id + "]");
			if(nativeProps != null && Object.prototype.hasOwnProperty.call(nativeProps.h,"class")) {
				var registered = this._registry.h[id];
				var name = nativeProps.h["class"];
				var info = { id : id, cls : $hxClasses[name], defaultValue : registered.defaultValue, config : nativeProps, isSet : false};
				this._registry.h[id] = info;
			}
		}
	}
	,validateData: function() {
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var b = this._instances.h[key];
			if(js_Boot.__implements(b,haxe_ui_behaviours_IValidatingBehaviour)) {
				(js_Boot.__cast(b , haxe_ui_behaviours_IValidatingBehaviour)).validate();
			}
		}
	}
	,_updateOrder: null
	,get_updateOrder: function() {
		return this._updateOrder;
	}
	,set_updateOrder: function(value) {
		this._updateOrder = value;
		this._actualUpdateOrder = null;
		return value;
	}
	,_actualUpdateOrder: null
	,actualUpdateOrder: null
	,get_actualUpdateOrder: function() {
		if(this._actualUpdateOrder == null) {
			this._actualUpdateOrder = this._updateOrder.slice();
			var h = this._instances.h;
			var key_h = h;
			var key_keys = Object.keys(h);
			var key_length = key_keys.length;
			var key_current = 0;
			while(key_current < key_length) {
				var key = key_keys[key_current++];
				if(this._actualUpdateOrder.indexOf(key) == -1) {
					this._actualUpdateOrder.push(key);
				}
			}
		}
		return this._actualUpdateOrder;
	}
	,update: function() {
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var b = this._instances.h[key];
			if(b != null) {
				b.update();
			}
		}
	}
	,find: function(id,create) {
		if(create == null) {
			create = true;
		}
		var b = this._instances.h[id];
		if(b == null && create == true) {
			var info = this._registry.h[id];
			if(info != null) {
				b = Type.createInstance(info.cls,[this._component]);
				if(b != null) {
					b.config = info.config;
					b.id = id;
					this._instances.h[id] = b;
					this._actualUpdateOrder = null;
				} else {
					var c = js_Boot.getClass(this._component);
					haxe_Log.trace("WARNING: problem creating behaviour class '" + Std.string(info.cls) + "' for '" + c.__name__ + ":" + id + "'",{ fileName : "haxe/ui/behaviours/Behaviours.hx", lineNumber : 140, className : "haxe.ui.behaviours.Behaviours", methodName : "find"});
				}
			}
		}
		if(b == null) {
			throw haxe_Exception.thrown("behaviour " + id + " not found");
		}
		return b;
	}
	,_cache: null
	,cache: function() {
		this._cache = new haxe_ds_StringMap();
		var h = this._registry.h;
		var registeredKey_h = h;
		var registeredKey_keys = Object.keys(h);
		var registeredKey_length = registeredKey_keys.length;
		var registeredKey_current = 0;
		while(registeredKey_current < registeredKey_length) {
			var registeredKey = registeredKey_keys[registeredKey_current++];
			var v = this._registry.h[registeredKey].defaultValue;
			var instance = this._instances.h[registeredKey];
			if(instance != null) {
				v = instance.get();
			}
			if(v != null) {
				this._cache.h[registeredKey] = v;
			}
		}
	}
	,dispose: function() {
		this._component = null;
		this._registry = null;
		var h = this._instances.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var inst = this._instances.h[key];
			inst._component = null;
		}
		this._instances = null;
		this._cache = null;
		this._actualUpdateOrder = null;
		this._updateOrder = null;
	}
	,detatch: function() {
		var h = this._instances.h;
		var b_h = h;
		var b_keys = Object.keys(h);
		var b_length = b_keys.length;
		var b_current = 0;
		while(b_current < b_length) {
			var b = b_h[b_keys[b_current++]];
			b.detatch();
		}
		this._instances = new haxe_ds_StringMap();
	}
	,restore: function() {
		if(this._cache == null) {
			return;
		}
		var _g = 0;
		var _g1 = this.get_actualUpdateOrder();
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var v = this._cache.h[key];
			if(v != null) {
				this.set(key,v);
			}
		}
		this._cache = null;
	}
	,lock: function() {
	}
	,unlock: function() {
	}
	,setDynamic: function(id,value) {
		this.lock();
		var b = this.find(id);
		var changed = null;
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			var v = haxe_ui_util_Variant.toDynamic((js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value);
			changed = v != value;
		}
		b.setDynamic(value);
		var info = this._registry.h[id];
		info.isSet = true;
		this.unlock();
		this.performAutoDispatch(b,changed);
	}
	,set: function(id,value) {
		this.lock();
		var b = this.find(id);
		var changed = null;
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			var v = (js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value;
			changed = haxe_ui_util_Variant.neq(v,value);
		}
		b.set(value);
		var info = this._registry.h[id];
		info.isSet = true;
		this.unlock();
		this.performAutoDispatch(b,changed);
	}
	,softSet: function(id,value) {
		var b = this.find(id);
		if(((b) instanceof haxe_ui_behaviours_ValueBehaviour)) {
			(js_Boot.__cast(b , haxe_ui_behaviours_ValueBehaviour))._value = value;
		}
	}
	,ready: function() {
		if(this._autoDispatch == null) {
			return;
		}
		var b = this._autoDispatch.keys();
		while(b.hasNext()) {
			var b1 = b.next();
			var changed = this._autoDispatch.h[b1.__id__];
			this.performAutoDispatch(b1,changed);
		}
		this._autoDispatch = null;
	}
	,_autoDispatch: null
	,performAutoDispatch: function(b,changed) {
		if(this._component.get_isReady() == false) {
			if(this._autoDispatch == null) {
				this._autoDispatch = new haxe_ds_ObjectMap();
			}
			this._autoDispatch.set(b,changed);
			return;
		}
		var autoDispatch = b.getConfigValue("autoDispatch",null);
		if(autoDispatch != null) {
			var arr = autoDispatch.split(".");
			var eventName = arr.pop().toLowerCase();
			var cls = arr.join(".");
			var event = Type.createInstance($hxClasses[cls],[eventName]);
			if(eventName != "change") {
				b._component.dispatch(event);
			} else if(changed == true || changed == null) {
				b._component.dispatch(event);
			}
		}
	}
	,get: function(id) {
		this.lock();
		var b = this.find(id);
		var v = null;
		if(b != null) {
			var info = this._registry.h[id];
			if(info.isSet == false && info.defaultValue != null && js_Boot.getClass(b) == haxe_ui_behaviours_DefaultBehaviour) {
				v = info.defaultValue;
			} else {
				v = b.get();
			}
		}
		this.unlock();
		return v;
	}
	,getDynamic: function(id) {
		this.lock();
		var b = this.find(id);
		var v = null;
		if(b != null) {
			v = b.getDynamic();
		}
		this.unlock();
		return v;
	}
	,call: function(id,param) {
		return this.find(id).call(param);
	}
	,applyDefaults: function() {
		var order = this._updateOrder.slice();
		var h = this._registry.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			if(order.indexOf(key) == -1) {
				order.push(key);
			}
		}
		var _g = 0;
		while(_g < order.length) {
			var key = order[_g];
			++_g;
			var r = this._registry.h[key];
			if(r.defaultValue != null) {
				this.set(key,r.defaultValue);
			}
		}
	}
	,__class__: haxe_ui_behaviours_Behaviours
	,__properties__: {get_actualUpdateOrder:"get_actualUpdateOrder",set_updateOrder:"set_updateOrder",get_updateOrder:"get_updateOrder"}
};
var haxe_ui_behaviours_ValueBehaviour = function(component) {
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.ValueBehaviour"] = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_ValueBehaviour.__name__ = "haxe.ui.behaviours.ValueBehaviour";
haxe_ui_behaviours_ValueBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_ValueBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_previousValue: null
	,_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._previousValue = this._value;
		this._value = value;
	}
	,__class__: haxe_ui_behaviours_ValueBehaviour
});
var haxe_ui_behaviours_IValidatingBehaviour = function() { };
$hxClasses["haxe.ui.behaviours.IValidatingBehaviour"] = haxe_ui_behaviours_IValidatingBehaviour;
haxe_ui_behaviours_IValidatingBehaviour.__name__ = "haxe.ui.behaviours.IValidatingBehaviour";
haxe_ui_behaviours_IValidatingBehaviour.__isInterface__ = true;
haxe_ui_behaviours_IValidatingBehaviour.prototype = {
	validate: null
	,__class__: haxe_ui_behaviours_IValidatingBehaviour
};
var haxe_ui_behaviours_DataBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.DataBehaviour"] = haxe_ui_behaviours_DataBehaviour;
haxe_ui_behaviours_DataBehaviour.__name__ = "haxe.ui.behaviours.DataBehaviour";
haxe_ui_behaviours_DataBehaviour.__interfaces__ = [haxe_ui_behaviours_IValidatingBehaviour];
haxe_ui_behaviours_DataBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_DataBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	_dataInvalid: null
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this.get())) {
			return;
		}
		this._previousValue = this._value;
		this._value = value;
		this.invalidateData();
	}
	,validate: function() {
		if(this._dataInvalid) {
			this._dataInvalid = false;
			this.validateData();
		}
	}
	,invalidateData: function() {
		this._dataInvalid = true;
		this._component.invalidateComponent("data",false);
	}
	,validateData: function() {
	}
	,__class__: haxe_ui_behaviours_DataBehaviour
});
var haxe_ui_behaviours_DefaultBehaviour = function(component) {
	this._value = null;
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.DefaultBehaviour"] = haxe_ui_behaviours_DefaultBehaviour;
haxe_ui_behaviours_DefaultBehaviour.__name__ = "haxe.ui.behaviours.DefaultBehaviour";
haxe_ui_behaviours_DefaultBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_behaviours_DefaultBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		haxe_ui_behaviours_Behaviour.prototype.set.call(this,value);
	}
	,__class__: haxe_ui_behaviours_DefaultBehaviour
});
var haxe_ui_behaviours_InvalidatingBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.behaviours.InvalidatingBehaviour"] = haxe_ui_behaviours_InvalidatingBehaviour;
haxe_ui_behaviours_InvalidatingBehaviour.__name__ = "haxe.ui.behaviours.InvalidatingBehaviour";
haxe_ui_behaviours_InvalidatingBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_behaviours_InvalidatingBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		haxe_ui_behaviours_ValueBehaviour.prototype.set.call(this,value);
		this._component.invalidateComponent();
	}
	,__class__: haxe_ui_behaviours_InvalidatingBehaviour
});
var haxe_ui_core_IValueComponent = function() { };
$hxClasses["haxe.ui.core.IValueComponent"] = haxe_ui_core_IValueComponent;
haxe_ui_core_IValueComponent.__name__ = "haxe.ui.core.IValueComponent";
haxe_ui_core_IValueComponent.__isInterface__ = true;
haxe_ui_core_IValueComponent.prototype = {
	get_value: null
	,set_value: null
	,__class__: haxe_ui_core_IValueComponent
	,__properties__: {set_value:"set_value",get_value:"get_value"}
};
var haxe_ui_focus_IFocusable = function() { };
$hxClasses["haxe.ui.focus.IFocusable"] = haxe_ui_focus_IFocusable;
haxe_ui_focus_IFocusable.__name__ = "haxe.ui.focus.IFocusable";
haxe_ui_focus_IFocusable.__isInterface__ = true;
haxe_ui_focus_IFocusable.prototype = {
	get_focus: null
	,set_focus: null
	,get_allowFocus: null
	,set_allowFocus: null
	,get_disabled: null
	,set_disabled: null
	,__class__: haxe_ui_focus_IFocusable
	,__properties__: {set_disabled:"set_disabled",get_disabled:"get_disabled",set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"}
};
var haxe_ui_core_InteractiveComponent = function() {
	this._allowFocus = true;
	this._focus = false;
	this.actionRepeatInterval = 100;
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.core.InteractiveComponent"] = haxe_ui_core_InteractiveComponent;
haxe_ui_core_InteractiveComponent.__name__ = "haxe.ui.core.InteractiveComponent";
haxe_ui_core_InteractiveComponent.__interfaces__ = [haxe_ui_core_IValueComponent,haxe_ui_focus_IFocusable];
haxe_ui_core_InteractiveComponent.__super__ = haxe_ui_core_Component;
haxe_ui_core_InteractiveComponent.prototype = $extend(haxe_ui_core_Component.prototype,{
	actionRepeatInterval: null
	,_focus: null
	,get_focus: function() {
		return this._focus;
	}
	,set_focus: function(value) {
		if(this._focus == value || this.get_allowFocus() == false) {
			return value;
		}
		this._focus = value;
		var eventType = null;
		if(this._focus == true) {
			eventType = "focusin";
			haxe_ui_focus_FocusManager.get_instance().set_focus(js_Boot.__cast(this , haxe_ui_focus_IFocusable));
			var scrollview = this.findScroller();
			if(scrollview != null) {
				scrollview.ensureVisible(this);
			}
		} else {
			eventType = "focusout";
			haxe_ui_focus_FocusManager.get_instance().set_focus(null);
		}
		this.invalidateComponent("data",false);
		this.dispatch(new haxe_ui_events_FocusEvent(eventType));
		return value;
	}
	,_allowFocus: null
	,get_allowFocus: function() {
		return this._allowFocus;
	}
	,set_allowFocus: function(value) {
		if(this._allowFocus == value) {
			return value;
		}
		this._allowFocus = value;
		var _g = 0;
		var _g1 = this._children == null ? [] : this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(js_Boot.__implements(child,haxe_ui_focus_IFocusable)) {
				(js_Boot.__cast(child , haxe_ui_focus_IFocusable)).set_allowFocus(value);
			}
		}
		return value;
	}
	,findScroller: function() {
		var view = null;
		var ref = this;
		while(ref != null) {
			if(js_Boot.__implements(ref,haxe_ui_core_IScrollView)) {
				view = js_Boot.__cast(ref , haxe_ui_core_IScrollView);
				break;
			}
			ref = ref.parentComponent;
		}
		return view;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("allowInteraction",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(true));
	}
	,get_allowInteraction: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("allowInteraction"));
	}
	,set_allowInteraction: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("allowInteraction",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"allowInteraction"));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		c.set_allowInteraction(this.get_allowInteraction());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_InteractiveComponent();
	}
	,__class__: haxe_ui_core_InteractiveComponent
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_allowInteraction:"set_allowInteraction",get_allowInteraction:"get_allowInteraction",set_allowFocus:"set_allowFocus",get_allowFocus:"get_allowFocus",set_focus:"set_focus",get_focus:"get_focus"})
});
var haxe_ui_components_Button = function() {
	haxe_ui_core_InteractiveComponent.call(this);
};
$hxClasses["haxe.ui.components.Button"] = haxe_ui_components_Button;
haxe_ui_components_Button.__name__ = "haxe.ui.components.Button";
haxe_ui_components_Button.__super__ = haxe_ui_core_InteractiveComponent;
haxe_ui_components_Button.prototype = $extend(haxe_ui_core_InteractiveComponent.prototype,{
	registerBehaviours: function() {
		haxe_ui_core_InteractiveComponent.prototype.registerBehaviours.call(this);
		this.behaviours.register("repeater",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("repeatInterval",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromInt(100));
		this.behaviours.register("easeInRepeater",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("remainPressed",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromBool(false));
		this.behaviours.register("toggle",haxe_ui_components__$Button_ToggleBehaviour);
		this.behaviours.register("selected",haxe_ui_components__$Button_SelectedBehaviour);
		this.behaviours.register("text",haxe_ui_components__$Button_TextBehaviour);
		this.behaviours.register("icon",haxe_ui_components__$Button_IconBehaviour);
		this.behaviours.register("componentGroup",haxe_ui_components__$Button_GroupBehaviour);
	}
	,get_repeater: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("repeater"));
	}
	,set_repeater: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("repeater",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"repeater"));
		return value;
	}
	,get_repeatInterval: function() {
		if(this.behaviours == null) {
			return 0;
		}
		return haxe_ui_util_Variant.toInt(this.behaviours.get("repeatInterval"));
	}
	,set_repeatInterval: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("repeatInterval",haxe_ui_util_Variant.fromInt(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"repeatInterval"));
		return value;
	}
	,get_easeInRepeater: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("easeInRepeater"));
	}
	,set_easeInRepeater: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("easeInRepeater",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"easeInRepeater"));
		return value;
	}
	,get_remainPressed: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("remainPressed"));
	}
	,set_remainPressed: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("remainPressed",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"remainPressed"));
		return value;
	}
	,get_toggle: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("toggle"));
	}
	,set_toggle: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("toggle",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"toggle"));
		return value;
	}
	,get_selected: function() {
		if(this.behaviours == null) {
			return false;
		}
		return haxe_ui_util_Variant.toBool(this.behaviours.get("selected"));
	}
	,set_selected: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("selected",haxe_ui_util_Variant.fromBool(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"selected"));
		return value;
	}
	,get_icon: function() {
		if(this.behaviours == null) {
			return null;
		}
		return this.behaviours.get("icon");
	}
	,set_icon: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("icon",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"icon"));
		return value;
	}
	,get_componentGroup: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("componentGroup"));
	}
	,set_componentGroup: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"componentGroup",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("componentGroup",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"componentGroup"));
		return value;
	}
	,get_value: function() {
		return this.get_text();
	}
	,set_value: function(value) {
		this.set_text(value);
		return value;
	}
	,get_iconPosition: function() {
		if(this.get_customStyle().iconPosition != null) {
			return this.get_customStyle().iconPosition;
		}
		if(this.get_style() == null || this.get_style().iconPosition == null) {
			return null;
		}
		return this.get_style().iconPosition;
	}
	,set_iconPosition: function(value) {
		if(this.get_customStyle().iconPosition == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().iconPosition = null;
		} else {
			this.get_customStyle().iconPosition = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_fontSize: function() {
		if(this.get_customStyle().fontSize != null) {
			return this.get_customStyle().fontSize;
		}
		if(this.get_style() == null || this.get_style().fontSize == null) {
			return null;
		}
		return this.get_style().fontSize;
	}
	,set_fontSize: function(value) {
		if(this.get_customStyle().fontSize == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().fontSize = null;
		} else {
			this.get_customStyle().fontSize = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_textAlign: function() {
		if(this.get_customStyle().textAlign != null) {
			return this.get_customStyle().textAlign;
		}
		if(this.get_style() == null || this.get_style().textAlign == null) {
			return null;
		}
		return this.get_style().textAlign;
	}
	,set_textAlign: function(value) {
		if(this.get_customStyle().textAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().textAlign = null;
		} else {
			this.get_customStyle().textAlign = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_InteractiveComponent.prototype.cloneComponent.call(this);
		c.set_repeater(this.get_repeater());
		c.set_repeatInterval(this.get_repeatInterval());
		c.set_easeInRepeater(this.get_easeInRepeater());
		c.set_remainPressed(this.get_remainPressed());
		c.set_toggle(this.get_toggle());
		c.set_selected(this.get_selected());
		if(this.get_icon() != null) {
			c.set_icon(this.get_icon());
		}
		if(this.get_componentGroup() != null) {
			c.set_componentGroup(this.get_componentGroup());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Button();
	}
	,registerComposite: function() {
		haxe_ui_core_InteractiveComponent.prototype.registerComposite.call(this);
		this._internalEventsClass = haxe_ui_components_ButtonEvents;
		this._compositeBuilderClass = haxe_ui_components_ButtonBuilder;
		this._defaultLayoutClass = haxe_ui_components_ButtonLayout;
	}
	,__class__: haxe_ui_components_Button
	,__properties__: $extend(haxe_ui_core_InteractiveComponent.prototype.__properties__,{set_textAlign:"set_textAlign",get_textAlign:"get_textAlign",set_fontSize:"set_fontSize",get_fontSize:"get_fontSize",set_iconPosition:"set_iconPosition",get_iconPosition:"get_iconPosition",set_componentGroup:"set_componentGroup",get_componentGroup:"get_componentGroup",set_icon:"set_icon",get_icon:"get_icon",set_selected:"set_selected",get_selected:"get_selected",set_toggle:"set_toggle",get_toggle:"get_toggle",set_remainPressed:"set_remainPressed",get_remainPressed:"get_remainPressed",set_easeInRepeater:"set_easeInRepeater",get_easeInRepeater:"get_easeInRepeater",set_repeatInterval:"set_repeatInterval",get_repeatInterval:"get_repeatInterval",set_repeater:"set_repeater",get_repeater:"get_repeater"})
});
var haxe_ui_layouts_ILayout = function() { };
$hxClasses["haxe.ui.layouts.ILayout"] = haxe_ui_layouts_ILayout;
haxe_ui_layouts_ILayout.__name__ = "haxe.ui.layouts.ILayout";
haxe_ui_layouts_ILayout.__isInterface__ = true;
var haxe_ui_layouts_Layout = function() {
};
$hxClasses["haxe.ui.layouts.Layout"] = haxe_ui_layouts_Layout;
haxe_ui_layouts_Layout.__name__ = "haxe.ui.layouts.Layout";
haxe_ui_layouts_Layout.__interfaces__ = [haxe_ui_layouts_ILayout];
haxe_ui_layouts_Layout.prototype = {
	_component: null
	,get_component: function() {
		return this._component;
	}
	,set_component: function(value) {
		this._component = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		if(searchType == null) {
			searchType = "id";
		}
		if(this._component == null) {
			return null;
		}
		return this._component.findComponent(criteria,type,recursive,searchType);
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		if(this._component == null) {
			return null;
		}
		return this._component.findComponents(styleName,type,maxDepth);
	}
	,refresh: function() {
		if(this._component != null && this._component.get_isReady() == true) {
			this.resizeChildren();
			this._component.handlePreReposition();
			this.repositionChildren();
			this._component.handlePostReposition();
		}
	}
	,autoSize: function() {
		if(this.get_component().get_isReady() == false) {
			return false;
		}
		var calculatedWidth = null;
		var calculatedHeight = null;
		if(this.get_component().get_autoWidth() == true || this.get_component().get_autoHeight() == true) {
			var size = this.calcAutoSize();
			if(this.get_component().get_autoWidth() == true) {
				calculatedWidth = size.width;
			}
			if(this.get_component().get_autoHeight() == true) {
				calculatedHeight = size.height;
			}
			this.get_component().resizeComponent(calculatedWidth,calculatedHeight);
		}
		if(calculatedWidth == null) {
			return calculatedHeight != null;
		} else {
			return true;
		}
	}
	,marginTop: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginTop == null) {
			return 0;
		}
		return child.get_style().marginTop;
	}
	,marginLeft: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginLeft == null) {
			return 0;
		}
		return child.get_style().marginLeft;
	}
	,marginBottom: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginBottom == null) {
			return 0;
		}
		return child.get_style().marginBottom;
	}
	,marginRight: function(child) {
		if(child == null || child.get_style() == null || child.get_style().marginRight == null) {
			return 0;
		}
		return child.get_style().marginRight;
	}
	,childPaddingTop: function(child) {
		if(child == null || child.get_style() == null || child.get_style().paddingTop == null) {
			return 0;
		}
		return child.get_style().paddingTop;
	}
	,childPaddingLeft: function(child) {
		if(child == null || child.get_style() == null || child.get_style().paddingLeft == null) {
			return 0;
		}
		return child.get_style().paddingLeft;
	}
	,childPaddingBottom: function(child) {
		if(child == null || child.get_style() == null || child.get_style().paddingBottom == null) {
			return 0;
		}
		return child.get_style().paddingBottom;
	}
	,childPaddingRight: function(child) {
		if(child == null || child.get_style() == null || child.get_style().paddingRight == null) {
			return 0;
		}
		return child.get_style().paddingRight;
	}
	,hidden: function(c) {
		if(c == null) {
			c = this.get_component();
		}
		return c.get_hidden();
	}
	,horizontalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().horizontalAlign == null) {
			return "left";
		}
		return child.get_style().horizontalAlign;
	}
	,verticalAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().verticalAlign == null) {
			return "top";
		}
		return child.get_style().verticalAlign;
	}
	,fixedMinWidth: function(child) {
		var fixedMinWidth = false;
		if(child != null && child.get_style() != null && child.get_style().minWidth != null) {
			fixedMinWidth = child.get_componentWidth() <= child.get_style().minWidth;
		}
		return fixedMinWidth;
	}
	,fixedMinHeight: function(child) {
		var fixedMinHeight = false;
		if(child != null && child.get_style() != null && child.get_style().minHeight != null) {
			fixedMinHeight = child.get_componentHeight() <= child.get_style().minHeight;
		}
		return fixedMinHeight;
	}
	,borderSize: null
	,get_borderSize: function() {
		if(this._component.get_style() == null) {
			return 0;
		}
		var n = this._component.get_style().get_fullBorderSize();
		var tmp = n > 0;
		return n;
	}
	,paddingLeft: null
	,get_paddingLeft: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingLeft == null) {
			return 0;
		}
		return this._component.get_style().paddingLeft;
	}
	,paddingTop: null
	,get_paddingTop: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingTop == null) {
			return 0;
		}
		return this._component.get_style().paddingTop;
	}
	,paddingBottom: null
	,get_paddingBottom: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingBottom == null) {
			return 0;
		}
		return this._component.get_style().paddingBottom;
	}
	,paddingRight: null
	,get_paddingRight: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().paddingRight == null) {
			return 0;
		}
		return this._component.get_style().paddingRight;
	}
	,horizontalSpacing: null
	,get_horizontalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().horizontalSpacing == null) {
			return 0;
		}
		return this._component.get_style().horizontalSpacing;
	}
	,verticalSpacing: null
	,get_verticalSpacing: function() {
		if(this._component == null || this._component.get_style() == null || this._component.get_style().verticalSpacing == null) {
			return 0;
		}
		return this._component.get_style().verticalSpacing;
	}
	,innerWidth: null
	,innerHeight: null
	,get_innerWidth: function() {
		if(this.get_component() == null) {
			return 0;
		}
		return this.get_component().get_componentWidth() - (this.get_paddingLeft() + this.get_paddingRight());
	}
	,get_innerHeight: function() {
		if(this.get_component() == null) {
			return 0;
		}
		var padding = 0;
		if(this.get_component().get_style() != null && this.get_component().get_style().paddingTop != null) {
			padding = this.get_component().get_style().paddingTop + padding;
		}
		if(this.get_component().get_style() != null && this.get_component().get_style().paddingBottom != null) {
			padding = this.get_component().get_style().paddingBottom + padding;
		}
		var icy = this.get_component().get_componentHeight() - padding;
		return icy;
	}
	,resizeChildren: function() {
	}
	,repositionChildren: function() {
	}
	,usableSize: null
	,get_usableSize: function() {
		var ucx = 0;
		if(this._component.get_componentWidth() != null) {
			ucx = this._component.get_componentWidth();
			ucx -= this.get_paddingLeft() + this.get_paddingRight();
		}
		var ucy = 0;
		if(this._component.get_componentHeight() != null) {
			ucy = this._component.get_componentHeight();
			ucy -= this.get_paddingTop() + this.get_paddingBottom();
		}
		return new haxe_ui_geom_Size(ucx,ucy);
	}
	,usableWidth: null
	,get_usableWidth: function() {
		return this.get_usableSize().width;
	}
	,usableHeight: null
	,get_usableHeight: function() {
		return this.get_usableSize().height;
	}
	,calcAutoWidth: function() {
		return this.calcAutoSize().width;
	}
	,calcAutoHeight: function() {
		return this.calcAutoSize().height;
	}
	,calcAutoSize: function(exclusions) {
		var x1 = 16777215;
		var x2 = 0;
		var y1 = 16777215;
		var y2 = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false || this.excluded(exclusions,child) == true) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_left() < x1) {
					x1 = child.get_left();
				}
				if(child.get_componentWidth() != null && child.get_left() + child.get_componentWidth() > x2) {
					x2 = child.get_left() + child.get_componentWidth();
				}
			}
			if(child.get_percentHeight() == null) {
				if(child.get_top() < y1) {
					y1 = child.get_top();
				}
				if(child.get_componentHeight() != null && child.get_top() + child.get_componentHeight() > y2) {
					y2 = child.get_top() + child.get_componentHeight();
				}
			}
		}
		if(x1 == 16777215) {
			x1 = 0;
		}
		if(y1 == 16777215) {
			y1 = 0;
		}
		var w = x2 - x1 + (this.get_paddingLeft() + this.get_paddingRight());
		var h = y2 - y1 + (this.get_paddingTop() + this.get_paddingBottom());
		if(((this) instanceof haxe_ui_layouts_AbsoluteLayout)) {
			w += x1;
			h += y1;
		}
		return new haxe_ui_geom_Size(w,h);
	}
	,excluded: function(exclusions,child) {
		if(exclusions == null || child == null) {
			return false;
		}
		return exclusions.indexOf(child) != -1;
	}
	,__class__: haxe_ui_layouts_Layout
	,__properties__: {get_usableHeight:"get_usableHeight",get_usableWidth:"get_usableWidth",get_usableSize:"get_usableSize",get_innerHeight:"get_innerHeight",get_innerWidth:"get_innerWidth",get_verticalSpacing:"get_verticalSpacing",get_horizontalSpacing:"get_horizontalSpacing",get_paddingRight:"get_paddingRight",get_paddingBottom:"get_paddingBottom",get_paddingTop:"get_paddingTop",get_paddingLeft:"get_paddingLeft",get_borderSize:"get_borderSize",set_component:"set_component",get_component:"get_component"}
};
var haxe_ui_layouts_DefaultLayout = function() {
	this._roundFullWidths = false;
	this._calcFullHeights = false;
	this._calcFullWidths = false;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.DefaultLayout"] = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_DefaultLayout.__name__ = "haxe.ui.layouts.DefaultLayout";
haxe_ui_layouts_DefaultLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_DefaultLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_calcFullWidths: null
	,_calcFullHeights: null
	,_roundFullWidths: null
	,buildWidthRoundingMap: function() {
		var tmp;
		if(this._roundFullWidths != false) {
			var _this = this.get_component();
			tmp = (_this._children == null ? [] : _this._children).length <= 1;
		} else {
			tmp = true;
		}
		if(tmp) {
			return null;
		}
		var map = null;
		var hasNonFullWidth = false;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null || child.get_percentWidth() != 100) {
				hasNonFullWidth = true;
				break;
			}
		}
		if(hasNonFullWidth == false) {
			var remainderWidth = this.get_usableWidth();
			var _this = this.get_component();
			var remainderWidth1 = remainderWidth % (_this._children == null ? [] : _this._children).length;
			if(remainderWidth1 != 0) {
				map = new haxe_ds_ObjectMap();
				var _g = 0;
				var _this = this.get_component();
				var _g1 = _this._children == null ? [] : _this._children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_includeInLayout() == false) {
						continue;
					}
					var n = 0;
					if(remainderWidth1 > 0) {
						n = 1;
						--remainderWidth1;
					}
					map.set(child,n);
				}
			}
		}
		return map;
	}
	,resizeChildren: function() {
		var usableSize = this.get_usableSize();
		var percentWidth = 100;
		var percentHeight = 100;
		var fullWidthValue = 100;
		var fullHeightValue = 100;
		if(this._calcFullWidths == true || this._calcFullHeights == true) {
			var n1 = 0;
			var n2 = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(this._calcFullWidths == true && child.get_percentWidth() != null && child.get_percentWidth() == 100) {
					++n1;
				}
				if(this._calcFullHeights == true && child.get_percentHeight() != null && child.get_percentHeight() == 100) {
					++n2;
				}
			}
			if(n1 > 0) {
				fullWidthValue = 100 / n1;
			}
			if(n2 > 0) {
				fullHeightValue = 100 / n2;
			}
		}
		var childRoundingWidth = this.buildWidthRoundingMap();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var childPercentWidth = child.get_percentWidth();
				if(childPercentWidth == 100) {
					childPercentWidth = fullWidthValue;
				}
				cx = usableSize.width * childPercentWidth / percentWidth - this.marginLeft(child) - this.marginRight(child);
				if(childRoundingWidth != null && childRoundingWidth.h.__keys__[child.__id__] != null) {
					var roundDirection = childRoundingWidth.h[child.__id__];
					if(roundDirection == 0) {
						cx = Math.floor(cx);
					} else if(roundDirection == 1) {
						cx = Math.ceil(cx);
					}
				}
			}
			if(child.get_percentHeight() != null) {
				var childPercentHeight = child.get_percentHeight();
				if(childPercentHeight == 100) {
					childPercentHeight = fullHeightValue;
				}
				cy = usableSize.height * childPercentHeight / percentHeight - this.marginTop(child) - this.marginBottom(child);
			}
			if(this.fixedMinWidth(child) && child.get_percentWidth() != null) {
				percentWidth -= child.get_percentWidth();
			}
			if(this.fixedMinHeight(child) && child.get_percentHeight() != null) {
				percentHeight -= child.get_percentHeight();
			}
			child.resizeComponent(cx,cy);
		}
	}
	,repositionChildren: function() {
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var xpos = 0;
			var ypos = 0;
			switch(this.horizontalAlign(child)) {
			case "center":
				xpos = (this.get_component().get_componentWidth() - child.get_componentWidth()) / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xpos = this.get_component().get_componentWidth() - (child.get_componentWidth() + this.get_paddingRight() + this.marginRight(child));
				break;
			default:
				xpos = this.get_paddingLeft() + this.marginLeft(child);
			}
			switch(this.verticalAlign(child)) {
			case "bottom":
				ypos = this.get_component().get_componentHeight() - (child.get_componentHeight() + this.get_paddingBottom() + this.marginBottom(child));
				break;
			case "center":
				ypos = (this.get_component().get_componentHeight() - child.get_componentHeight()) / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				ypos = this.get_paddingTop() + this.marginTop(child);
			}
			child.moveComponent(xpos,ypos);
		}
	}
	,__class__: haxe_ui_layouts_DefaultLayout
});
var haxe_ui_components_ButtonLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components.ButtonLayout"] = haxe_ui_components_ButtonLayout;
haxe_ui_components_ButtonLayout.__name__ = "haxe.ui.components.ButtonLayout";
haxe_ui_components_ButtonLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components_ButtonLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	iconPosition: null
	,get_iconPosition: function() {
		if(this.get_component().get_style() == null || this.get_component().get_style().iconPosition == null) {
			return "left";
		}
		return this.get_component().get_style().iconPosition;
	}
	,resizeChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.resizeChildren.call(this);
		if(this._component.get_autoWidth() == false) {
			var label = this.get_component().findComponent(null,haxe_ui_components_Label,false);
			var ucx = this.get_usableSize();
			var cx = ucx.width;
			if(label != null) {
				label.set_width(cx);
			}
			var itemRenderer = this.get_component().findComponent(null,haxe_ui_core_ItemRenderer);
			if(itemRenderer != null) {
				itemRenderer.set_width(cx);
			}
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var icon = this.get_component().findComponent("button-icon",null,false);
		if(icon != null && (this.get_iconPosition() == "far-right" || this.get_iconPosition() == "far-left" || this.get_iconPosition() == "left" || this.get_iconPosition() == "right")) {
			size.width -= icon.get_width() + this.get_verticalSpacing();
		}
		return size;
	}
	,calcAutoSize: function(exclusions) {
		var exclusions = [];
		var itemRenderer = this.get_component().findComponent(null,haxe_ui_core_ItemRenderer);
		var icon = this.get_component().findComponent("button-icon",null,false);
		var tmp;
		if(itemRenderer != null) {
			var icon1 = this.get_component().findComponent("button-icon",null,false);
			tmp = icon1 != null && (this.get_iconPosition() == "far-right" || this.get_iconPosition() == "far-left" || this.get_iconPosition() == "left" || this.get_iconPosition() == "right");
		} else {
			tmp = false;
		}
		if(tmp) {
			exclusions.push(icon);
		}
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this,exclusions);
		var tmp;
		if(itemRenderer != null) {
			var icon1 = this.get_component().findComponent("button-icon",null,false);
			tmp = icon1 != null && (this.get_iconPosition() == "far-right" || this.get_iconPosition() == "far-left" || this.get_iconPosition() == "left" || this.get_iconPosition() == "right");
		} else {
			tmp = false;
		}
		if(tmp) {
			size.width += icon.get_width() + this.get_verticalSpacing();
		}
		return size;
	}
	,isIconRelevant: function() {
		var icon = this.get_component().findComponent("button-icon",null,false);
		if(icon != null) {
			if(!(this.get_iconPosition() == "far-right" || this.get_iconPosition() == "far-left" || this.get_iconPosition() == "left")) {
				return this.get_iconPosition() == "right";
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,repositionChildren: function() {
		haxe_ui_layouts_DefaultLayout.prototype.repositionChildren.call(this);
		var label = this.get_component().findComponent(null,haxe_ui_components_Label,false);
		if(label != null && label.get_hidden() == true) {
			label = null;
		}
		var icon = this.get_component().findComponent("button-icon",null,false);
		if(icon != null && icon.get_hidden() == true) {
			icon = null;
		}
		switch(this.get_iconPosition()) {
		case "far-left":
			if(label != null && icon != null) {
				var x = this.get_paddingLeft();
				if(this.get_iconPosition() == "far-left") {
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					x += this.get_horizontalSpacing() + icon.get_componentWidth();
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.get_paddingLeft());
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0);
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "far-right":
			if(label != null && icon != null) {
				var cx = label.get_componentWidth() + icon.get_componentWidth() + this.get_horizontalSpacing();
				var x = this.get_component().get_componentWidth() / 2 - cx / 2 | 0;
				if(this.get_iconPosition() == "far-right") {
					if(cx + this.get_paddingLeft() + this.get_paddingRight() < this.get_component().get_componentWidth()) {
						label.set_left(this.get_paddingLeft());
						x += this.get_horizontalSpacing() + label.get_componentWidth();
						icon.set_left(this.get_component().get_componentWidth() - icon.get_componentWidth() - this.get_paddingRight() + this.marginLeft(icon) - this.marginRight(icon));
					} else {
						label.set_left(this.get_paddingLeft());
						x += this.get_horizontalSpacing() + label.get_componentWidth();
						icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					}
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.get_paddingLeft());
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() - icon.get_componentWidth() - this.get_paddingRight() + this.marginLeft(icon) - this.marginRight(icon));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "left":case "right":
			if(label != null && icon != null) {
				var cx = label.get_componentWidth() + icon.get_componentWidth() + this.get_horizontalSpacing();
				var x = this.get_component().get_componentWidth() / 2 - cx / 2 | 0;
				if((js_Boot.__cast(this.get_component() , haxe_ui_components_Button)).get_textAlign() == "left") {
					x = this.get_paddingLeft();
				}
				if(this.get_iconPosition() == "right") {
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
					x += this.get_horizontalSpacing() + label.get_componentWidth();
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
				} else {
					icon.set_left(x + this.marginLeft(icon) - this.marginRight(icon));
					x += this.get_horizontalSpacing() + icon.get_componentWidth();
					label.set_left(x + this.marginLeft(label) - this.marginRight(label));
				}
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			} else if(label != null) {
				label.set_left(this.getTextAlignPos(label,this.get_component().get_componentWidth()));
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left(this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0);
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		case "bottom":case "top":
			if(label != null && icon != null) {
				var cy = label.get_componentHeight() + icon.get_componentHeight() + this.get_verticalSpacing();
				var y = this.get_component().get_componentHeight() / 2 - cy / 2 | 0;
				if(this.get_iconPosition() == "bottom") {
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
					y += this.get_verticalSpacing() + label.get_componentHeight();
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
				} else {
					icon.set_top(y + this.marginTop(icon) - this.marginBottom(icon));
					y += this.get_verticalSpacing() + icon.get_componentHeight();
					label.set_top(y + this.marginTop(label) - this.marginBottom(label));
				}
				label.set_left(this.getTextAlignPos(label,this.get_component().get_componentWidth()));
				icon.set_left((this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0) + this.marginLeft(icon) - this.marginRight(icon));
			} else if(label != null) {
				label.set_left((this.get_component().get_componentWidth() / 2 - label.get_componentWidth() / 2 | 0) + this.marginLeft(label) - this.marginRight(label));
				label.set_top((this.get_component().get_componentHeight() / 2 - label.get_componentHeight() / 2 | 0) + this.marginTop(label) - this.marginBottom(label));
			} else if(icon != null) {
				icon.set_left((this.get_component().get_componentWidth() / 2 - icon.get_componentWidth() / 2 | 0) + this.marginLeft(icon) - this.marginRight(icon));
				icon.set_top((this.get_component().get_componentHeight() / 2 - icon.get_componentHeight() / 2 | 0) + this.marginTop(icon) - this.marginBottom(icon));
			}
			break;
		}
	}
	,getTextAlignPos: function(label,usableWidth) {
		switch((js_Boot.__cast(this.get_component() , haxe_ui_components_Button)).get_textAlign()) {
		case "left":
			return this.marginLeft(label) + this.get_paddingLeft();
		case "right":
			return usableWidth - label.get_componentWidth() - this.marginRight(label) - this.get_paddingRight();
		default:
			return (usableWidth / 2 - label.get_componentWidth() / 2 | 0) + this.marginLeft(label) - this.marginRight(label);
		}
	}
	,__class__: haxe_ui_components_ButtonLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_iconPosition:"get_iconPosition"})
});
var haxe_ui_components__$Button_GroupBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.GroupBehaviour"] = haxe_ui_components__$Button_GroupBehaviour;
haxe_ui_components__$Button_GroupBehaviour.__name__ = "haxe.ui.components._Button.GroupBehaviour";
haxe_ui_components__$Button_GroupBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_GroupBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		haxe_ui_components__$Button_ButtonGroups.get_instance().add(haxe_ui_util_Variant.toString(this._value),this._component);
	}
	,__class__: haxe_ui_components__$Button_GroupBehaviour
});
var haxe_ui_components__$Button_TextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.TextBehaviour"] = haxe_ui_components__$Button_TextBehaviour;
haxe_ui_components__$Button_TextBehaviour.__name__ = "haxe.ui.components._Button.TextBehaviour";
haxe_ui_components__$Button_TextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_TextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	get: function() {
		var itemRenderer = this._component.findComponent(null,haxe_ui_core_ItemRenderer);
		if(itemRenderer == null) {
			return haxe_ui_behaviours_DataBehaviour.prototype.get.call(this);
		} else if(!this._component.get_isReady()) {
			return haxe_ui_behaviours_DataBehaviour.prototype.get.call(this);
		} else {
			var data = itemRenderer.get_data();
			var text = null;
			if(data != null) {
				if(Type.typeof(data) == ValueType.TObject) {
					text = data.text;
					if(text == null) {
						text = data.value;
					}
				} else {
					text = Std.string(data);
				}
			}
			return haxe_ui_util_Variant.fromString(text);
		}
	}
	,validateData: function() {
		var itemRenderer = this._component.findComponent(null,haxe_ui_core_ItemRenderer);
		if(itemRenderer != null) {
			var data = itemRenderer.get_data();
			if(data == null) {
				data = { };
			} else {
				data = Reflect.copy(data);
			}
			data.text = haxe_ui_util_Variant.toString(this._value);
			itemRenderer.set_data(data);
		} else {
			var label = this._component.findComponent(null,haxe_ui_components_Label,false);
			if(label == null) {
				label = new haxe_ui_components_Label();
				label.set_id("button-label");
				label.set_scriptAccess(false);
				this._component.addComponent(label);
				var _this = this._component;
				var force = true;
				if(force == null) {
					force = false;
				}
				_this.invalidateComponent("style",false);
				if(force == true) {
					_this._style = null;
				}
			}
			label.set_text(haxe_ui_util_Variant.toString(this._value));
		}
	}
	,__class__: haxe_ui_components__$Button_TextBehaviour
});
var haxe_ui_components__$Button_IconBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.IconBehaviour"] = haxe_ui_components__$Button_IconBehaviour;
haxe_ui_components__$Button_IconBehaviour.__name__ = "haxe.ui.components._Button.IconBehaviour";
haxe_ui_components__$Button_IconBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_IconBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var icon = this._component.findComponent("button-icon",null,false);
		if((this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) && icon != null) {
			this._component.get_customStyle().icon = null;
			this._component.removeComponent(icon);
			return;
		}
		if(icon == null) {
			icon = new haxe_ui_components_Image();
			icon.addClass("icon");
			icon.set_id("button-icon");
			icon.set_scriptAccess(false);
			this._component.addComponentAt(icon,0);
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		icon.set_resource(this._value);
	}
	,__class__: haxe_ui_components__$Button_IconBehaviour
});
var haxe_ui_components__$Button_ToggleBehaviour = function(component) {
	haxe_ui_behaviours_Behaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.ToggleBehaviour"] = haxe_ui_components__$Button_ToggleBehaviour;
haxe_ui_components__$Button_ToggleBehaviour.__name__ = "haxe.ui.components._Button.ToggleBehaviour";
haxe_ui_components__$Button_ToggleBehaviour.__super__ = haxe_ui_behaviours_Behaviour;
haxe_ui_components__$Button_ToggleBehaviour.prototype = $extend(haxe_ui_behaviours_Behaviour.prototype,{
	_value: null
	,get: function() {
		return this._value;
	}
	,set: function(value) {
		if(haxe_ui_util_Variant.eq(this._value,value)) {
			return;
		}
		this._value = value;
		var button = js_Boot.__cast(this._component , haxe_ui_components_Button);
		if(haxe_ui_util_Variant.eq(value,haxe_ui_util_Variant.fromBool(false))) {
			button.set_selected(false);
		}
		button.registerInternalEvents(button._internalEventsClass,true);
	}
	,__class__: haxe_ui_components__$Button_ToggleBehaviour
});
var haxe_ui_components__$Button_SelectedBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Button.SelectedBehaviour"] = haxe_ui_components__$Button_SelectedBehaviour;
haxe_ui_components__$Button_SelectedBehaviour.__name__ = "haxe.ui.components._Button.SelectedBehaviour";
haxe_ui_components__$Button_SelectedBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Button_SelectedBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var button = js_Boot.__cast(this._component , haxe_ui_components_Button);
		if(button.get_toggle() == false) {
			return;
		}
		(js_Boot.__cast(button._compositeBuilder , haxe_ui_components_ButtonBuilder)).setSelection(button,haxe_ui_util_Variant.toBool(this._value));
		if(haxe_ui_util_Variant.eq(this._value,haxe_ui_util_Variant.fromBool(false))) {
			button.removeClass(":down",true,true);
		} else {
			button.addClass(":down",true,true);
		}
		var events = js_Boot.__cast(button._internalEvents , haxe_ui_components_ButtonEvents);
		if(button.hitTest(haxe_ui_core_Screen.get_instance().currentMouseX,haxe_ui_core_Screen.get_instance().currentMouseY)) {
			button.addClass(":hover",true,events.recursiveStyling);
		} else {
			button.removeClass(":hover",true,events.recursiveStyling);
		}
		events.dispatchChanged();
	}
	,__class__: haxe_ui_components__$Button_SelectedBehaviour
});
var haxe_ui_events_Events = function(target) {
	this._target = target;
};
$hxClasses["haxe.ui.events.Events"] = haxe_ui_events_Events;
haxe_ui_events_Events.__name__ = "haxe.ui.events.Events";
haxe_ui_events_Events.prototype = {
	_target: null
	,register: function() {
	}
	,unregister: function() {
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.hasEvent(type,listener) == false) {
			this._target.registerEvent(type,listener,priority);
		}
	}
	,hasEvent: function(type,listener) {
		return this._target.hasEvent(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		this._target.unregisterEvent(type,listener);
	}
	,dispatch: function(event) {
		this._target.dispatch(event);
	}
	,__class__: haxe_ui_events_Events
};
var haxe_ui_components_ButtonEvents = function(button) {
	this.recursiveStyling = true;
	this._repeatInterval = 0;
	this._repeater = false;
	this._down = false;
	haxe_ui_events_Events.call(this,button);
	this._button = button;
};
$hxClasses["haxe.ui.components.ButtonEvents"] = haxe_ui_components_ButtonEvents;
haxe_ui_components_ButtonEvents.__name__ = "haxe.ui.components.ButtonEvents";
haxe_ui_components_ButtonEvents.__super__ = haxe_ui_events_Events;
haxe_ui_components_ButtonEvents.prototype = $extend(haxe_ui_events_Events.prototype,{
	_button: null
	,_down: null
	,_repeatTimer: null
	,_repeater: null
	,_repeatInterval: null
	,recursiveStyling: null
	,register: function() {
		if(this.hasEvent("mouseover",$bind(this,this.onMouseOver)) == false) {
			this.registerEvent("mouseover",$bind(this,this.onMouseOver));
		}
		if(this.hasEvent("mouseout",$bind(this,this.onMouseOut)) == false) {
			this.registerEvent("mouseout",$bind(this,this.onMouseOut));
		}
		if(this.hasEvent("mousedown",$bind(this,this.onMouseDown)) == false) {
			this.registerEvent("mousedown",$bind(this,this.onMouseDown));
		}
		if(this.hasEvent("move",$bind(this,this.onMove)) == false) {
			this.registerEvent("move",$bind(this,this.onMove));
		}
		if(this.hasEvent("actionstart",$bind(this,this.onActionStart)) == false) {
			this.registerEvent("actionstart",$bind(this,this.onActionStart));
		}
		if(this.hasEvent("actionend",$bind(this,this.onActionEnd)) == false) {
			this.registerEvent("actionend",$bind(this,this.onActionEnd));
		}
		if(this._button.get_toggle() == true) {
			this.registerEvent("click",$bind(this,this.onMouseClick),100);
		}
	}
	,unregister: function() {
		this.unregisterEvent("mouseover",$bind(this,this.onMouseOver));
		this.unregisterEvent("mouseout",$bind(this,this.onMouseOut));
		this.unregisterEvent("mousedown",$bind(this,this.onMouseDown));
		this.unregisterEvent("click",$bind(this,this.onMouseClick));
		this.unregisterEvent("move",$bind(this,this.onMove));
		this.unregisterEvent("actionstart",$bind(this,this.onActionStart));
		this.unregisterEvent("actionend",$bind(this,this.onActionEnd));
	}
	,onMouseOver: function(event) {
		if(this._button.get_toggle() == true && this._button.classes.indexOf(":down") != -1) {
			return;
		}
		if(event.buttonDown == false || this._down == false) {
			this._button.addClass(":hover",true,this.recursiveStyling);
		} else {
			this._button.addClass(":down",true,this.recursiveStyling);
		}
	}
	,onMouseOut: function(event) {
		if(this._button.get_toggle() == true && this._button.get_selected() == true) {
			return;
		}
		if(this._button.get_remainPressed() == false) {
			this._button.removeClass(":down",true,this.recursiveStyling);
		}
		this._button.removeClass(":hover",true,this.recursiveStyling);
	}
	,onMouseDown: function(event) {
		var _gthis = this;
		this._button.set_focus(true);
		if(this._button.get_repeater() == true && this._repeatInterval == 0) {
			this._repeatInterval = this._button.get_easeInRepeater() ? this._button.get_repeatInterval() * 2 : this._button.get_repeatInterval();
		}
		this._down = true;
		this._button.addClass(":down",true,this.recursiveStyling);
		this._button.get_screen().registerEvent("mouseup",$bind(this,this.onMouseUp));
		if(this._repeater == true && this._repeatInterval == this._button.get_repeatInterval()) {
			this._repeatTimer = new haxe_ui_util_Timer(this._repeatInterval,$bind(this,this.onRepeatTimer));
		} else if(this._button.get_repeater() == true) {
			if(this._repeatTimer != null) {
				this._repeatTimer.stop();
				this._repeatTimer = null;
			}
			haxe_ui_util_Timer.delay(function() {
				if(_gthis._repeater == true && _gthis._repeatTimer == null) {
					if(_gthis._button.get_easeInRepeater() == true && _gthis._repeatInterval > _gthis._button.get_repeatInterval()) {
						var tmp = _gthis._repeatInterval - (_gthis._repeatInterval - _gthis._button.get_repeatInterval()) / 2 | 0;
						_gthis._repeatInterval = tmp;
						_gthis.onRepeatTimer();
					}
					_gthis.onMouseDown(event);
				}
			},this._repeatInterval);
		}
		this._repeater = this._button.get_repeater();
	}
	,onMouseUp: function(event) {
		this._down = this._repeater = false;
		this._repeatInterval = this._button.get_easeInRepeater() ? this._button.get_repeatInterval() * 2 : this._button.get_repeatInterval();
		this._button.get_screen().unregisterEvent("mouseup",$bind(this,this.onMouseUp));
		if(this._button.get_toggle() == true) {
			return;
		}
		this._button.removeClass(":down",true,this.recursiveStyling);
		var over = this._button.hitTest(event.screenX,event.screenY);
		if(event.touchEvent == false && over == true) {
			this._button.addClass(":hover",true,this.recursiveStyling);
		} else if(over == false) {
			this._button.removeClass(":hover",true,this.recursiveStyling);
		}
		if(this._repeatTimer != null) {
			this._repeatTimer.stop();
			this._repeatTimer = null;
		}
	}
	,onMove: function(event) {
		var over = this._button.hitTest(haxe_ui_core_Screen.get_instance().currentMouseX,haxe_ui_core_Screen.get_instance().currentMouseY);
		if(over == true) {
			this._button.addClass(":hover",true,this.recursiveStyling);
		} else if(over == false) {
			this._button.removeClass(":hover",true,this.recursiveStyling);
		}
	}
	,onRepeatTimer: function() {
		if(this._button.classes.indexOf(":hover") != -1 && this._down == true) {
			var event = new haxe_ui_events_MouseEvent("click");
			this._button.dispatch(event);
		}
	}
	,onMouseClick: function(event) {
		this._button.set_selected(!this._button.get_selected());
		if(this._button.get_selected() == false) {
			this._button.removeClass(":down",true,this.recursiveStyling);
		}
		if(this._button.hitTest(event.screenX,event.screenY)) {
			this._button.addClass(":hover",true,this.recursiveStyling);
		}
	}
	,dispatchChanged: function() {
		this._button.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,press: function() {
		this._down = true;
		if(this._button.get_toggle() == true) {
			this._button.addClass(":down",true,this.recursiveStyling);
		} else {
			this._button.addClass(":down",true,this.recursiveStyling);
		}
	}
	,release: function() {
		if(this._down == true) {
			this._down = false;
			if(this._button.get_toggle() == true) {
				this._button.set_selected(!this._button.get_selected());
				this._button.dispatch(new haxe_ui_events_MouseEvent("click"));
			} else {
				this._button.removeClass(":down",true,this.recursiveStyling);
				this._button.dispatch(new haxe_ui_events_MouseEvent("click"));
			}
		}
	}
	,onActionStart: function(event) {
		switch(event.action) {
		case "actionConfirm":case "actionPress":
			this.press();
			break;
		default:
		}
	}
	,onActionEnd: function(event) {
		switch(event.action) {
		case "actionConfirm":case "actionPress":
			this.release();
			break;
		default:
		}
	}
	,__class__: haxe_ui_components_ButtonEvents
});
var haxe_ui_core_CompositeBuilder = function(component) {
	this._component = component;
};
$hxClasses["haxe.ui.core.CompositeBuilder"] = haxe_ui_core_CompositeBuilder;
haxe_ui_core_CompositeBuilder.__name__ = "haxe.ui.core.CompositeBuilder";
haxe_ui_core_CompositeBuilder.prototype = {
	_component: null
	,create: function() {
	}
	,destroy: function() {
	}
	,onInitialize: function() {
	}
	,onReady: function() {
	}
	,show: function() {
		return false;
	}
	,hide: function() {
		return false;
	}
	,get_numComponents: function() {
		return null;
	}
	,get_cssName: function() {
		return null;
	}
	,addComponent: function(child) {
		return null;
	}
	,addComponentAt: function(child,index) {
		return null;
	}
	,removeComponent: function(child,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,removeComponentAt: function(index,dispose,invalidate) {
		if(invalidate == null) {
			invalidate = true;
		}
		if(dispose == null) {
			dispose = true;
		}
		return null;
	}
	,removeAllComponents: function(dispose) {
		if(dispose == null) {
			dispose = true;
		}
		return false;
	}
	,getComponentIndex: function(child) {
		return -2147483648;
	}
	,setComponentIndex: function(child,index) {
		return null;
	}
	,getComponentAt: function(index) {
		return null;
	}
	,validateComponentLayout: function() {
		return false;
	}
	,validateComponentData: function() {
	}
	,applyStyle: function(style) {
	}
	,onComponentAdded: function(child) {
	}
	,onComponentRemoved: function(child) {
	}
	,findComponent: function(criteria,type,recursive,searchType) {
		var _g = 0;
		var _g1 = this.get_numComponents();
		while(_g < _g1) {
			var i = _g++;
			var c = this.getComponentAt(i);
			var match = c.findComponent(criteria,type,recursive,searchType);
			if(match != null) {
				return match;
			}
		}
		return null;
	}
	,findComponents: function(styleName,type,maxDepth) {
		if(maxDepth == null) {
			maxDepth = 5;
		}
		return null;
	}
	,isComponentClipped: null
	,get_isComponentClipped: function() {
		return this._component.get_componentClipRect() != null;
	}
	,__class__: haxe_ui_core_CompositeBuilder
	,__properties__: {get_isComponentClipped:"get_isComponentClipped",get_cssName:"get_cssName",get_numComponents:"get_numComponents"}
};
var haxe_ui_components_ButtonBuilder = function(button) {
	haxe_ui_core_CompositeBuilder.call(this,button);
	this._button = button;
};
$hxClasses["haxe.ui.components.ButtonBuilder"] = haxe_ui_components_ButtonBuilder;
haxe_ui_components_ButtonBuilder.__name__ = "haxe.ui.components.ButtonBuilder";
haxe_ui_components_ButtonBuilder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components_ButtonBuilder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_button: null
	,onReady: function() {
		haxe_ui_core_CompositeBuilder.prototype.onReady.call(this);
		var renderer = this._button.findComponent(null,haxe_ui_core_ItemRenderer);
		if(renderer != null) {
			if(!this._button.get_autoWidth()) {
				renderer.removeClass("auto-size");
			} else {
				renderer.addClass("auto-size");
			}
		}
	}
	,applyStyle: function(style) {
		haxe_ui_core_CompositeBuilder.prototype.applyStyle.call(this,style);
		var c = this._component.findComponent("button-label",haxe_ui_core_Component,false);
		if(c != null) {
			var invalidate = false;
			if(style.color != null && c.get_customStyle().color != style.color) {
				c.get_customStyle().color = style.color;
				invalidate = true;
			}
			if(style.fontName != null && c.get_customStyle().fontName != style.fontName) {
				c.get_customStyle().fontName = style.fontName;
				invalidate = true;
			}
			if(style.fontSize != null && c.get_customStyle().fontSize != style.fontSize) {
				c.get_customStyle().fontSize = style.fontSize;
				invalidate = true;
			}
			if(style.cursor != null && c.get_customStyle().cursor != style.cursor) {
				c.get_customStyle().cursor = style.cursor;
				invalidate = true;
			}
			if(style.textAlign != null && c.get_customStyle().textAlign != style.textAlign) {
				c.get_customStyle().textAlign = style.textAlign;
				invalidate = true;
			}
			if(style.fontBold != null && c.get_customStyle().fontBold != style.fontBold) {
				c.get_customStyle().fontBold = style.fontBold;
				invalidate = true;
			}
			if(style.fontUnderline != null && c.get_customStyle().fontUnderline != style.fontUnderline) {
				c.get_customStyle().fontUnderline = style.fontUnderline;
				invalidate = true;
			}
			if(style.fontItalic != null && c.get_customStyle().fontItalic != style.fontItalic) {
				c.get_customStyle().fontItalic = style.fontItalic;
				invalidate = true;
			}
			if(invalidate == true) {
				c.invalidateComponent("style",false);
			}
		}
		var c = this._component.findComponent("button-icon",haxe_ui_core_Component,false);
		if(c != null) {
			var invalidate = false;
			if(style.cursor != null && c.get_customStyle().cursor != style.cursor) {
				c.get_customStyle().cursor = style.cursor;
				invalidate = true;
			}
			if(invalidate == true) {
				c.invalidateComponent("style",false);
			}
		}
		var list = this._component.findComponents(null,haxe_ui_components_Label,16777215);
		var _g = 0;
		while(_g < list.length) {
			var c = list[_g];
			++_g;
			var invalidate = false;
			if(style.color != null && c.get_customStyle().color != style.color) {
				c.get_customStyle().color = style.color;
				invalidate = true;
			}
			if(style.fontName != null && c.get_customStyle().fontName != style.fontName) {
				c.get_customStyle().fontName = style.fontName;
				invalidate = true;
			}
			if(style.fontSize != null && c.get_customStyle().fontSize != style.fontSize) {
				c.get_customStyle().fontSize = style.fontSize;
				invalidate = true;
			}
			if(style.cursor != null && c.get_customStyle().cursor != style.cursor) {
				c.get_customStyle().cursor = style.cursor;
				invalidate = true;
			}
			if(style.textAlign != null && c.get_customStyle().textAlign != style.textAlign) {
				c.get_customStyle().textAlign = style.textAlign;
				invalidate = true;
			}
			if(style.fontBold != null && c.get_customStyle().fontBold != style.fontBold) {
				c.get_customStyle().fontBold = style.fontBold;
				invalidate = true;
			}
			if(style.fontUnderline != null && c.get_customStyle().fontUnderline != style.fontUnderline) {
				c.get_customStyle().fontUnderline = style.fontUnderline;
				invalidate = true;
			}
			if(style.fontItalic != null && c.get_customStyle().fontItalic != style.fontItalic) {
				c.get_customStyle().fontItalic = style.fontItalic;
				invalidate = true;
			}
			if(invalidate == true) {
				c.invalidateComponent("style",false);
			}
		}
		if(style.icon != null) {
			this._button.set_icon(style.icon);
		}
	}
	,setSelection: function(button,value,allowDeselection) {
		if(allowDeselection == null) {
			allowDeselection = false;
		}
		if(button.get_componentGroup() != null && value == false && allowDeselection == false) {
			var arr = haxe_ui_components__$Button_ButtonGroups.get_instance().get(button.get_componentGroup());
			var hasSelection = false;
			if(arr != null) {
				var _g = 0;
				while(_g < arr.length) {
					var b = arr[_g];
					++_g;
					if(b != button && b.get_selected() == true) {
						hasSelection = true;
						break;
					}
				}
			}
			if(hasSelection == false && allowDeselection == false) {
				button.behaviours.softSet("selected",haxe_ui_util_Variant.fromBool(true));
				return;
			}
		}
		if(button.get_componentGroup() != null && value == true) {
			var arr = haxe_ui_components__$Button_ButtonGroups.get_instance().get(button.get_componentGroup());
			if(arr != null) {
				var _g = 0;
				while(_g < arr.length) {
					var b = arr[_g];
					++_g;
					if(b != button) {
						b.set_selected(false);
					}
				}
			}
		}
		if(allowDeselection == true && value == false) {
			button.behaviours.softSet("selected",haxe_ui_util_Variant.fromBool(false));
		}
	}
	,addComponent: function(child) {
		if(((child) instanceof haxe_ui_core_ItemRenderer)) {
			var existingRenderer = this._component.findComponent(null,haxe_ui_core_ItemRenderer);
			if(existingRenderer != null) {
				this._component.removeComponent(existingRenderer);
			}
			child.addClass("auto-size");
		}
		return null;
	}
	,__class__: haxe_ui_components_ButtonBuilder
});
var haxe_ui_components__$Button_ButtonGroups = function() {
	this._groups = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.components._Button.ButtonGroups"] = haxe_ui_components__$Button_ButtonGroups;
haxe_ui_components__$Button_ButtonGroups.__name__ = "haxe.ui.components._Button.ButtonGroups";
haxe_ui_components__$Button_ButtonGroups.__properties__ = {get_instance:"get_instance"};
haxe_ui_components__$Button_ButtonGroups.get_instance = function() {
	if(haxe_ui_components__$Button_ButtonGroups._instance == null) {
		haxe_ui_components__$Button_ButtonGroups._instance = new haxe_ui_components__$Button_ButtonGroups();
	}
	return haxe_ui_components__$Button_ButtonGroups._instance;
};
haxe_ui_components__$Button_ButtonGroups.prototype = {
	_groups: null
	,get: function(name) {
		return this._groups.h[name];
	}
	,set: function(name,buttons) {
		this._groups.h[name] = buttons;
	}
	,add: function(name,button) {
		var arr = this.get(name);
		if(arr == null) {
			arr = [];
		}
		if(arr.indexOf(button) == -1) {
			arr.push(button);
		}
		this.set(name,arr);
	}
	,remove: function(name,button) {
		var arr = this.get(name);
		if(arr == null) {
			return;
		}
		HxOverrides.remove(arr,button);
		if(arr.length == 0) {
			var _this = this._groups;
			if(Object.prototype.hasOwnProperty.call(_this.h,name)) {
				delete(_this.h[name]);
			}
		}
	}
	,reset: function(name) {
		var arr = this.get(name);
		if(arr == null) {
			return;
		}
		var selection = null;
		var _g = 0;
		while(_g < arr.length) {
			var item = arr[_g];
			++_g;
			if(item.get_selected() == true) {
				selection = item;
				break;
			}
		}
		if(selection == null) {
			return;
		}
		(js_Boot.__cast(selection._compositeBuilder , haxe_ui_components_ButtonBuilder)).setSelection(selection,false,true);
	}
	,__class__: haxe_ui_components__$Button_ButtonGroups
};
var haxe_ui_core_IDataComponent = function() { };
$hxClasses["haxe.ui.core.IDataComponent"] = haxe_ui_core_IDataComponent;
haxe_ui_core_IDataComponent.__name__ = "haxe.ui.core.IDataComponent";
haxe_ui_core_IDataComponent.__isInterface__ = true;
haxe_ui_core_IDataComponent.prototype = {
	get_dataSource: null
	,set_dataSource: null
	,__class__: haxe_ui_core_IDataComponent
	,__properties__: {set_dataSource:"set_dataSource",get_dataSource:"get_dataSource"}
};
var haxe_ui_components_Canvas = function() {
	haxe_ui_core_Component.call(this);
	this.componentGraphics = new haxe_ui_graphics_ComponentGraphics(this);
};
$hxClasses["haxe.ui.components.Canvas"] = haxe_ui_components_Canvas;
haxe_ui_components_Canvas.__name__ = "haxe.ui.components.Canvas";
haxe_ui_components_Canvas.__interfaces__ = [haxe_ui_core_IDataComponent];
haxe_ui_components_Canvas.__super__ = haxe_ui_core_Component;
haxe_ui_components_Canvas.prototype = $extend(haxe_ui_core_Component.prototype,{
	componentGraphics: null
	,validateComponentLayout: function() {
		var b = haxe_ui_core_Component.prototype.validateComponentLayout.call(this);
		this.componentGraphics.resize(this.get_width(),this.get_height());
		return b;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_dataSource() != null) {
			c.set_dataSource(this.get_dataSource());
		}
		var tmp = this.componentGraphics._drawCommands.slice();
		c.componentGraphics._drawCommands = tmp;
		c.componentGraphics.replayDrawCommands();
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("dataSource",haxe_ui_components__$Canvas_DataSourceBehaviour);
	}
	,get_dataSource: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toDataSource(this.behaviours.get("dataSource"));
	}
	,set_dataSource: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("dataSource",haxe_ui_util_Variant.fromDataSource(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"dataSource"));
		return value;
	}
	,self: function() {
		return new haxe_ui_components_Canvas();
	}
	,__class__: haxe_ui_components_Canvas
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_dataSource:"set_dataSource",get_dataSource:"get_dataSource"})
});
var haxe_ui_components__$Canvas_DataSourceBehaviour = function(canvas) {
	haxe_ui_behaviours_DataBehaviour.call(this,canvas);
	this._canvas = canvas;
};
$hxClasses["haxe.ui.components._Canvas.DataSourceBehaviour"] = haxe_ui_components__$Canvas_DataSourceBehaviour;
haxe_ui_components__$Canvas_DataSourceBehaviour.__name__ = "haxe.ui.components._Canvas.DataSourceBehaviour";
haxe_ui_components__$Canvas_DataSourceBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Canvas_DataSourceBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	_canvas: null
	,validateData: function() {
		if(this._value != null) {
			var ds = haxe_ui_util_Variant.toDataSource(this._value);
			var g = this._canvas.componentGraphics;
			var _g = 0;
			var _g1 = ds.get_size();
			while(_g < _g1) {
				var i = _g++;
				var item = ds.get(i);
				switch(item.id) {
				case "circle":
					var x = parseFloat(item.x);
					var y = parseFloat(item.y);
					var radius = parseFloat(item.radius);
					g.circle(x,y,radius);
					break;
				case "clear":
					g.clear();
					break;
				case "fill-style":case "fillStyle":
					var color = item.color;
					var alpha = item.alpha != null ? parseFloat(item.alpha) : 1;
					g.fillStyle(haxe_ui_util_Color.fromString(color),alpha);
					break;
				case "image":
					var resource = item.resource;
					var x1 = parseFloat(item.x);
					var y1 = parseFloat(item.y);
					var width = parseFloat(item.width);
					var height = parseFloat(item.height);
					g.image(haxe_ui_util_Variant.fromString(resource),x1,y1,width,height);
					break;
				case "rectangle":
					var x2 = item.x != null ? parseFloat(item.x) : 0;
					var y2 = item.y != null ? parseFloat(item.y) : 0;
					var width1 = item.width != null ? parseFloat(item.width) : this._canvas.get_width();
					var height1 = item.height != null ? parseFloat(item.height) : this._canvas.get_height();
					g.rectangle(x2,y2,width1,height1);
					break;
				case "stroke-style":case "strokeStyle":
					var color1 = item.color;
					var thickness = item.thickness != null ? parseFloat(item.thickness) : 1;
					var alpha1 = item.alpha != null ? parseFloat(item.alpha) : 1;
					g.strokeStyle(haxe_ui_util_Color.fromString(color1),thickness,alpha1);
					break;
				default:
					haxe_Log.trace("unrecognised draw command: " + Std.string(item),{ fileName : "haxe/ui/components/Canvas.hx", lineNumber : 82, className : "haxe.ui.components._Canvas.DataSourceBehaviour", methodName : "validateData"});
				}
			}
		}
	}
	,__class__: haxe_ui_components__$Canvas_DataSourceBehaviour
});
var haxe_ui_core_IDirectionalComponent = function() { };
$hxClasses["haxe.ui.core.IDirectionalComponent"] = haxe_ui_core_IDirectionalComponent;
haxe_ui_core_IDirectionalComponent.__name__ = "haxe.ui.core.IDirectionalComponent";
haxe_ui_core_IDirectionalComponent.__isInterface__ = true;
var haxe_ui_components_Rule = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Rule"] = haxe_ui_components_Rule;
haxe_ui_components_Rule.__name__ = "haxe.ui.components.Rule";
haxe_ui_components_Rule.__interfaces__ = [haxe_ui_core_IDirectionalComponent];
haxe_ui_components_Rule.__super__ = haxe_ui_core_Component;
haxe_ui_components_Rule.prototype = $extend(haxe_ui_core_Component.prototype,{
	registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._compositeBuilderClass = haxe_ui_components_RuleBuilder;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Rule();
	}
	,__class__: haxe_ui_components_Rule
});
var haxe_ui_components_HorizontalRule = function() {
	haxe_ui_components_Rule.call(this);
};
$hxClasses["haxe.ui.components.HorizontalRule"] = haxe_ui_components_HorizontalRule;
haxe_ui_components_HorizontalRule.__name__ = "haxe.ui.components.HorizontalRule";
haxe_ui_components_HorizontalRule.__super__ = haxe_ui_components_Rule;
haxe_ui_components_HorizontalRule.prototype = $extend(haxe_ui_components_Rule.prototype,{
	registerBehaviours: function() {
		haxe_ui_components_Rule.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_components_Rule.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_HorizontalRule();
	}
	,registerComposite: function() {
		haxe_ui_components_Rule.prototype.registerComposite.call(this);
		this._compositeBuilderClass = haxe_ui_components__$HorizontalRule_Builder;
	}
	,__class__: haxe_ui_components_HorizontalRule
});
var haxe_ui_components_RuleBuilder = function(component) {
	haxe_ui_core_CompositeBuilder.call(this,component);
	this.showWarning();
};
$hxClasses["haxe.ui.components.RuleBuilder"] = haxe_ui_components_RuleBuilder;
haxe_ui_components_RuleBuilder.__name__ = "haxe.ui.components.RuleBuilder";
haxe_ui_components_RuleBuilder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components_RuleBuilder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	showWarning: function() {
		haxe_Log.trace("WARNING: trying to create an instance of 'Rule' directly, use either 'HorizontalRule' or 'VerticalRule'",{ fileName : "haxe/ui/components/Rule.hx", lineNumber : 35, className : "haxe.ui.components.RuleBuilder", methodName : "showWarning"});
	}
	,__class__: haxe_ui_components_RuleBuilder
});
var haxe_ui_components__$HorizontalRule_Builder = function(component) {
	haxe_ui_components_RuleBuilder.call(this,component);
};
$hxClasses["haxe.ui.components._HorizontalRule.Builder"] = haxe_ui_components__$HorizontalRule_Builder;
haxe_ui_components__$HorizontalRule_Builder.__name__ = "haxe.ui.components._HorizontalRule.Builder";
haxe_ui_components__$HorizontalRule_Builder.__super__ = haxe_ui_components_RuleBuilder;
haxe_ui_components__$HorizontalRule_Builder.prototype = $extend(haxe_ui_components_RuleBuilder.prototype,{
	showWarning: function() {
	}
	,__class__: haxe_ui_components__$HorizontalRule_Builder
});
var haxe_ui_components_Image = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Image"] = haxe_ui_components_Image;
haxe_ui_components_Image.__name__ = "haxe.ui.components.Image";
haxe_ui_components_Image.__super__ = haxe_ui_core_Component;
haxe_ui_components_Image.prototype = $extend(haxe_ui_core_Component.prototype,{
	registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._defaultLayoutClass = haxe_ui_components__$Image_ImageLayout;
		this._compositeBuilderClass = haxe_ui_components__$Image_Builder;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("resource",haxe_ui_components__$Image_ResourceBehaviour);
		this.behaviours.register("scaleMode",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("fill"));
		this.behaviours.register("imageHorizontalAlign",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("center"));
		this.behaviours.register("imageVerticalAlign",haxe_ui_behaviours_InvalidatingBehaviour,haxe_ui_util_Variant.fromString("center"));
		this.behaviours.register("originalWidth",haxe_ui_behaviours_DefaultBehaviour);
		this.behaviours.register("originalHeight",haxe_ui_behaviours_DefaultBehaviour);
		this.behaviours.register("imageScale",haxe_ui_behaviours_DefaultBehaviour,haxe_ui_util_Variant.fromInt(1));
	}
	,get_resource: function() {
		if(this.behaviours == null) {
			return null;
		}
		return this.behaviours.get("resource");
	}
	,set_resource: function(value) {
		this.behaviours.set("resource",value);
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"resource"));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"value"));
		return value;
	}
	,get_scaleMode: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("scaleMode"));
	}
	,set_scaleMode: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("scaleMode",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"scaleMode"));
		return value;
	}
	,get_imageHorizontalAlign: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("imageHorizontalAlign"));
	}
	,set_imageHorizontalAlign: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("imageHorizontalAlign",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"imageHorizontalAlign"));
		return value;
	}
	,get_imageVerticalAlign: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("imageVerticalAlign"));
	}
	,set_imageVerticalAlign: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("imageVerticalAlign",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"imageVerticalAlign"));
		return value;
	}
	,get_originalWidth: function() {
		if(this.behaviours == null) {
			return 0;
		}
		return haxe_ui_util_Variant.toFloat(this.behaviours.get("originalWidth"));
	}
	,set_originalWidth: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("originalWidth",haxe_ui_util_Variant.fromFloat(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"originalWidth"));
		return value;
	}
	,get_originalHeight: function() {
		if(this.behaviours == null) {
			return 0;
		}
		return haxe_ui_util_Variant.toFloat(this.behaviours.get("originalHeight"));
	}
	,set_originalHeight: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("originalHeight",haxe_ui_util_Variant.fromFloat(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"originalHeight"));
		return value;
	}
	,get_imageScale: function() {
		if(this.behaviours == null) {
			return 0;
		}
		return haxe_ui_util_Variant.toFloat(this.behaviours.get("imageScale"));
	}
	,set_imageScale: function(value) {
		if(this.behaviours == null) {
			return value;
		}
		this.behaviours.set("imageScale",haxe_ui_util_Variant.fromFloat(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"imageScale"));
		return value;
	}
	,get_value: function() {
		return haxe_ui_util_Variant.toDynamic(this.get_resource());
	}
	,set_value: function(value) {
		this.set_resource(haxe_ui_util_Variant.fromDynamic(value));
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_resource() != null) {
			c.set_resource(this.get_resource());
		}
		if(this.get_scaleMode() != null) {
			c.set_scaleMode(this.get_scaleMode());
		}
		if(this.get_imageHorizontalAlign() != null) {
			c.set_imageHorizontalAlign(this.get_imageHorizontalAlign());
		}
		if(this.get_imageVerticalAlign() != null) {
			c.set_imageVerticalAlign(this.get_imageVerticalAlign());
		}
		c.set_originalWidth(this.get_originalWidth());
		c.set_originalHeight(this.get_originalHeight());
		c.set_imageScale(this.get_imageScale());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Image();
	}
	,__class__: haxe_ui_components_Image
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_imageScale:"set_imageScale",get_imageScale:"get_imageScale",set_originalHeight:"set_originalHeight",get_originalHeight:"get_originalHeight",set_originalWidth:"set_originalWidth",get_originalWidth:"get_originalWidth",set_imageVerticalAlign:"set_imageVerticalAlign",get_imageVerticalAlign:"get_imageVerticalAlign",set_imageHorizontalAlign:"set_imageHorizontalAlign",get_imageHorizontalAlign:"get_imageHorizontalAlign",set_scaleMode:"set_scaleMode",get_scaleMode:"get_scaleMode",set_resource:"set_resource",get_resource:"get_resource"})
});
var haxe_ui_components__$Image_ImageLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components._Image.ImageLayout"] = haxe_ui_components__$Image_ImageLayout;
haxe_ui_components__$Image_ImageLayout.__name__ = "haxe.ui.components._Image.ImageLayout";
haxe_ui_components__$Image_ImageLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components__$Image_ImageLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	get_imageScaleMode: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_scaleMode();
	}
	,get_imageHorizontalAlign: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_imageHorizontalAlign();
	}
	,get_imageVerticalAlign: function() {
		return (js_Boot.__cast(this._component , haxe_ui_components_Image)).get_imageVerticalAlign();
	}
	,resizeChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			var image = js_Boot.__cast(this._component , haxe_ui_components_Image);
			var imageDisplay = image.getImageDisplay();
			var maxWidth = this.get_usableSize().width;
			var maxHeight = this.get_usableSize().height;
			if(this.get_component().get_autoWidth() == true) {
				maxWidth = -1;
			}
			if(this._component.get_autoHeight() == true) {
				maxHeight = -1;
			}
			var scaleW = maxWidth != -1 ? maxWidth / image.get_originalWidth() : 1;
			var scaleH = maxHeight != -1 ? maxHeight / image.get_originalHeight() : 1;
			scaleW *= image.get_imageScale();
			scaleH *= image.get_imageScale();
			if(this.get_imageScaleMode() != "fill") {
				var scale;
				switch(this.get_imageScaleMode()) {
				case "fitheight":
					scale = scaleH;
					break;
				case "fitinside":
					scale = scaleW < scaleH ? scaleW : scaleH;
					break;
				case "fitoutside":
					scale = scaleW > scaleH ? scaleW : scaleH;
					break;
				case "fitwidth":
					scale = scaleW;
					break;
				default:
					scale = 1;
				}
				imageDisplay.set_imageWidth(image.get_originalWidth() * scale);
				imageDisplay.set_imageHeight(image.get_originalHeight() * scale);
			} else {
				imageDisplay.set_imageWidth(image.get_originalWidth() * scaleW);
				imageDisplay.set_imageHeight(image.get_originalHeight() * scaleH);
			}
		}
	}
	,repositionChildren: function() {
		if(this.get_component().hasImageDisplay()) {
			var image = js_Boot.__cast(this._component , haxe_ui_components_Image);
			var imageDisplay = this._component.getImageDisplay();
			switch(image.get_imageHorizontalAlign()) {
			case "center":
				imageDisplay.set_left((this._component.get_componentWidth() - imageDisplay.get_imageWidth()) / 2);
				break;
			case "left":
				imageDisplay.set_left(this.get_paddingLeft());
				break;
			case "right":
				imageDisplay.set_left(this._component.get_componentWidth() - imageDisplay.get_imageWidth() - this.get_paddingRight());
				break;
			}
			switch(image.get_imageVerticalAlign()) {
			case "bottom":
				imageDisplay.set_top(this._component.get_componentHeight() - imageDisplay.get_imageHeight() - this.get_paddingBottom());
				break;
			case "center":
				imageDisplay.set_top((this._component.get_componentHeight() - imageDisplay.get_imageHeight()) / 2);
				break;
			case "top":
				imageDisplay.set_top(this.get_paddingTop());
				break;
			}
		}
	}
	,calcAutoSize: function(exclusions) {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this,exclusions);
		if(this.get_component().hasImageDisplay()) {
			size.width += this.get_component().getImageDisplay().get_imageWidth();
			size.height += this.get_component().getImageDisplay().get_imageHeight();
		}
		return size;
	}
	,refresh: function() {
		haxe_ui_layouts_DefaultLayout.prototype.refresh.call(this);
		this.updateClipRect();
	}
	,updateClipRect: function() {
		if(this.get_component().hasImageDisplay()) {
			var usz = this.get_usableSize();
			var imageDisplay = this.get_component().getImageDisplay();
			var rc = imageDisplay.get_imageClipRect();
			if(imageDisplay.get_imageWidth() > usz.width || imageDisplay.get_imageHeight() > usz.height) {
				if(rc == null) {
					rc = new haxe_ui_geom_Rectangle();
				}
				rc.top = this.get_paddingLeft();
				rc.left = this.get_paddingTop();
				rc.width = usz.width;
				rc.height = usz.height;
			} else {
				rc = null;
			}
			imageDisplay.set_imageClipRect(rc);
		}
	}
	,__class__: haxe_ui_components__$Image_ImageLayout
	,__properties__: $extend(haxe_ui_layouts_DefaultLayout.prototype.__properties__,{get_imageVerticalAlign:"get_imageVerticalAlign",get_imageHorizontalAlign:"get_imageHorizontalAlign",get_imageScaleMode:"get_imageScaleMode"})
});
var haxe_ui_components__$Image_ResourceBehaviour = function(component) {
	this._canvasMap = null;
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Image.ResourceBehaviour"] = haxe_ui_components__$Image_ResourceBehaviour;
haxe_ui_components__$Image_ResourceBehaviour.__name__ = "haxe.ui.components._Image.ResourceBehaviour";
haxe_ui_components__$Image_ResourceBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Image_ResourceBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	_canvasMap: null
	,validateData: function() {
		var _gthis = this;
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			this._component.removeImageDisplay();
			this._component.invalidateComponent();
			return;
		}
		if(haxe_ui_util_Variant.get_isComponent(this._value) && ((haxe_ui_util_Variant.toComponent(this._value)) instanceof haxe_ui_components_Canvas)) {
			var newCanvas = null;
			if(this._canvasMap == null) {
				this._canvasMap = new haxe_ds_StringMap();
			}
			var canvas = haxe_ui_util_Variant.toComponent(this._value);
			if(canvas.get_id() == null) {
				canvas.set_id(haxe_ui_util_GUID.uuid());
			}
			var existingCanvas = this._component.findComponent(null,haxe_ui_components_Canvas,false);
			if(existingCanvas != null && existingCanvas.get_id() == canvas.get_id()) {
				return;
			}
			if(existingCanvas != null) {
				this._component.removeComponent(existingCanvas,false);
			}
			var this1 = this._canvasMap;
			var key = canvas.get_id();
			if(Object.prototype.hasOwnProperty.call(this1.h,key)) {
				var this1 = this._canvasMap;
				var key = canvas.get_id();
				newCanvas = this1.h[key];
			} else {
				newCanvas = haxe_ui_util_Variant.toComponent(this._value).cloneComponent();
				var this1 = this._canvasMap;
				var key = canvas.get_id();
				this1.h[key] = newCanvas;
			}
			this._component.addComponent(newCanvas);
		} else if(haxe_ui_util_Variant.get_isComponent(this._value) && ((haxe_ui_util_Variant.toComponent(this._value)) instanceof haxe_ui_components_Image)) {
			var image = js_Boot.__cast(haxe_ui_util_Variant.toComponent(this._value) , haxe_ui_components_Image);
			this._component.addComponent(image);
		} else {
			var imageLoader = new haxe_ui_util_ImageLoader(this._value);
			imageLoader.load(function(imageInfo) {
				if(imageInfo != null) {
					if(_gthis._value == null || haxe_ui_util_Variant.get_isNull(_gthis._value)) {
						_gthis._component.removeImageDisplay();
						_gthis._component.invalidateComponent();
						return;
					}
					var image = js_Boot.__cast(_gthis._component , haxe_ui_components_Image);
					if(image == null) {
						return;
					}
					var display = image.getImageDisplay();
					if(display != null) {
						display.set_imageInfo(imageInfo);
						image.set_originalWidth(imageInfo.width);
						image.set_originalHeight(imageInfo.height);
						if(image.autoSize() == true && image.parentComponent != null) {
							var _this = image.parentComponent;
							if(!(_this._layout == null || _this._layoutLocked == true)) {
								_this.invalidateComponent("layout",false);
							}
						}
						image.invalidateComponent();
						display.validateComponent();
						var event = new haxe_ui_events_UIEvent("change");
						image.dispatch(event);
					}
				}
			});
		}
	}
	,__class__: haxe_ui_components__$Image_ResourceBehaviour
});
var haxe_ui_components__$Image_Builder = function(image) {
	var _gthis = this;
	haxe_ui_core_CompositeBuilder.call(this,image);
	this._image = image;
	this._image.registerEvent("shown",function(_) {
		if(_gthis._image.parentComponent != null) {
			var _this = _gthis._image.parentComponent;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
	});
};
$hxClasses["haxe.ui.components._Image.Builder"] = haxe_ui_components__$Image_Builder;
haxe_ui_components__$Image_Builder.__name__ = "haxe.ui.components._Image.Builder";
haxe_ui_components__$Image_Builder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components__$Image_Builder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_image: null
	,applyStyle: function(style) {
		if(style.resource != null) {
			this._image.set_resource(style.resource);
		}
	}
	,__class__: haxe_ui_components__$Image_Builder
});
var haxe_ui_components_Label = function() {
	haxe_ui_core_Component.call(this);
};
$hxClasses["haxe.ui.components.Label"] = haxe_ui_components_Label;
haxe_ui_components_Label.__name__ = "haxe.ui.components.Label";
haxe_ui_components_Label.__super__ = haxe_ui_core_Component;
haxe_ui_components_Label.prototype = $extend(haxe_ui_core_Component.prototype,{
	registerComposite: function() {
		haxe_ui_core_Component.prototype.registerComposite.call(this);
		this._compositeBuilderClass = haxe_ui_components__$Label_Builder;
		this._defaultLayoutClass = haxe_ui_components__$Label_LabelLayout;
	}
	,registerBehaviours: function() {
		haxe_ui_core_Component.prototype.registerBehaviours.call(this);
		this.behaviours.register("text",haxe_ui_components__$Label_TextBehaviour);
		this.behaviours.register("htmlText",haxe_ui_components__$Label_HtmlTextBehaviour);
	}
	,get_htmlText: function() {
		if(this.behaviours == null) {
			return null;
		}
		return haxe_ui_util_Variant.toString(this.behaviours.get("htmlText"));
	}
	,set_htmlText: function(value) {
		var _g = Type.typeof(value);
		if(_g._hx_index == 6) {
			if(_g.c == String) {
				if(value != null && value.indexOf("{{") != -1 && value.indexOf("}}") != -1) {
					haxe_ui_locale_LocaleManager.get_instance().registerComponent(this,"htmlText",null,value);
					return value;
				}
			}
		}
		this.behaviours.set("htmlText",haxe_ui_util_Variant.fromString(value));
		this.dispatch(new haxe_ui_events_UIEvent("propertychange",null,"htmlText"));
		return value;
	}
	,get_value: function() {
		return this.get_text();
	}
	,set_value: function(value) {
		this.set_text(value);
		return value;
	}
	,get_textAlign: function() {
		if(this.get_customStyle().textAlign != null) {
			return this.get_customStyle().textAlign;
		}
		if(this.get_style() == null || this.get_style().textAlign == null) {
			return null;
		}
		return this.get_style().textAlign;
	}
	,set_textAlign: function(value) {
		if(this.get_customStyle().textAlign == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().textAlign = null;
		} else {
			this.get_customStyle().textAlign = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,get_wordWrap: function() {
		if(this.get_customStyle().wordWrap != null) {
			return this.get_customStyle().wordWrap;
		}
		if(this.get_style() == null || this.get_style().wordWrap == null) {
			return null;
		}
		return this.get_style().wordWrap;
	}
	,set_wordWrap: function(value) {
		if(this.get_customStyle().wordWrap == value) {
			return value;
		}
		if(this._style == null) {
			this._style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		if(value == null) {
			this.get_customStyle().wordWrap = null;
		} else {
			this.get_customStyle().wordWrap = value;
		}
		this.invalidateComponent("style",false);
		if(!(this._layout == null || this._layoutLocked == true)) {
			this.invalidateComponent("layout",false);
		}
		return value;
	}
	,cloneComponent: function() {
		var c = haxe_ui_core_Component.prototype.cloneComponent.call(this);
		if(this.get_htmlText() != null) {
			c.set_htmlText(this.get_htmlText());
		}
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_Label();
	}
	,__class__: haxe_ui_components_Label
	,__properties__: $extend(haxe_ui_core_Component.prototype.__properties__,{set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_textAlign:"set_textAlign",get_textAlign:"get_textAlign",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText"})
});
var haxe_ui_components__$Label_LabelLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.components._Label.LabelLayout"] = haxe_ui_components__$Label_LabelLayout;
haxe_ui_components__$Label_LabelLayout.__name__ = "haxe.ui.components._Label.LabelLayout";
haxe_ui_components__$Label_LabelLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_components__$Label_LabelLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	resizeChildren: function() {
		if(this.get_component().get_autoWidth() == false) {
			this.get_component().getTextDisplay().set_width(this.get_component().get_componentWidth() - this.get_paddingLeft() - this.get_paddingRight());
			var wordWrap = true;
			if(this._component.get_style() != null && this._component.get_style().wordWrap != null) {
				wordWrap = this._component.get_style().wordWrap;
			}
			this.get_component().getTextDisplay().set_wordWrap(wordWrap);
		} else {
			this.get_component().getTextDisplay().set_width(this.get_component().getTextDisplay().get_textWidth());
		}
		if(this.get_component().get_autoHeight() == true) {
			this.get_component().getTextDisplay().set_height(this.get_component().getTextDisplay().get_textHeight());
		} else {
			this.get_component().getTextDisplay().set_height(this.get_component().get_height());
		}
	}
	,repositionChildren: function() {
		if(this.get_component().hasTextDisplay() == true) {
			this.get_component().getTextDisplay().set_left(this.get_paddingLeft());
			this.get_component().getTextDisplay().set_top(this.get_paddingTop());
		}
	}
	,calcAutoSize: function(exclusions) {
		var size = haxe_ui_layouts_DefaultLayout.prototype.calcAutoSize.call(this,exclusions);
		if(this.get_component().hasTextDisplay() == true) {
			size.width += this.get_component().getTextDisplay().get_textWidth();
			size.height += this.get_component().getTextDisplay().get_textHeight();
		}
		return size;
	}
	,textAlign: function(child) {
		if(child == null || child.get_style() == null || child.get_style().textAlign == null) {
			return "left";
		}
		return child.get_style().textAlign;
	}
	,__class__: haxe_ui_components__$Label_LabelLayout
});
var haxe_ui_components__$Label_TextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Label.TextBehaviour"] = haxe_ui_components__$Label_TextBehaviour;
haxe_ui_components__$Label_TextBehaviour.__name__ = "haxe.ui.components._Label.TextBehaviour";
haxe_ui_components__$Label_TextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Label_TextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._component.getTextDisplay().get_textStyle() != this._component.get_style()) {
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		this._component.getTextDisplay().set_text("" + (this._value == null ? "null" : haxe_ui_util_Variant.toString(this._value)));
		this._component.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,__class__: haxe_ui_components__$Label_TextBehaviour
});
var haxe_ui_components__$Label_HtmlTextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._Label.HtmlTextBehaviour"] = haxe_ui_components__$Label_HtmlTextBehaviour;
haxe_ui_components__$Label_HtmlTextBehaviour.__name__ = "haxe.ui.components._Label.HtmlTextBehaviour";
haxe_ui_components__$Label_HtmlTextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$Label_HtmlTextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._component.getTextDisplay().get_textStyle() != this._component.get_style()) {
			var _this = this._component;
			var force = true;
			if(force == null) {
				force = false;
			}
			_this.invalidateComponent("style",false);
			if(force == true) {
				_this._style = null;
			}
		}
		this._component.getTextDisplay().set_htmlText("" + (this._value == null ? "null" : haxe_ui_util_Variant.toString(this._value)));
		this._component.dispatch(new haxe_ui_events_UIEvent("change"));
	}
	,__class__: haxe_ui_components__$Label_HtmlTextBehaviour
});
var haxe_ui_components__$Label_Builder = function(label) {
	haxe_ui_core_CompositeBuilder.call(this,label);
	this._label = label;
};
$hxClasses["haxe.ui.components._Label.Builder"] = haxe_ui_components__$Label_Builder;
haxe_ui_components__$Label_Builder.__name__ = "haxe.ui.components._Label.Builder";
haxe_ui_components__$Label_Builder.isHtml = function(v) {
	if(v == null) {
		return false;
	} else {
		return v.indexOf("<font ") != -1;
	}
};
haxe_ui_components__$Label_Builder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components__$Label_Builder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	_label: null
	,applyStyle: function(style) {
		if(this._label.hasTextDisplay() == true) {
			this._label.getTextDisplay().set_textStyle(style);
			var tmp;
			if((style.contentType == "auto" || style.contentType == "html") && this._label.getTextDisplay().get_supportsHtml()) {
				var v = Std.string(this._component.get_text());
				tmp = v == null ? false : v.indexOf("<font ") != -1;
			} else {
				tmp = false;
			}
			if(tmp) {
				this._label.set_htmlText(this._label.get_text());
			}
		}
	}
	,get_isComponentClipped: function() {
		var componentClipRect = this._component.get_componentClipRect();
		if(componentClipRect == null) {
			return false;
		}
		return this._label.getTextDisplay().measureTextWidth() > componentClipRect.width;
	}
	,__class__: haxe_ui_components__$Label_Builder
});
var haxe_ui_components_SectionHeader = function() {
	haxe_ui_containers_VBox.call(this);
};
$hxClasses["haxe.ui.components.SectionHeader"] = haxe_ui_components_SectionHeader;
haxe_ui_components_SectionHeader.__name__ = "haxe.ui.components.SectionHeader";
haxe_ui_components_SectionHeader.__super__ = haxe_ui_containers_VBox;
haxe_ui_components_SectionHeader.prototype = $extend(haxe_ui_containers_VBox.prototype,{
	registerComposite: function() {
		haxe_ui_containers_VBox.prototype.registerComposite.call(this);
		this._compositeBuilderClass = haxe_ui_components__$SectionHeader_Builder;
	}
	,registerBehaviours: function() {
		haxe_ui_containers_VBox.prototype.registerBehaviours.call(this);
		this.behaviours.register("text",haxe_ui_components__$SectionHeader_TextBehaviour);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_VBox.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_components_SectionHeader();
	}
	,__class__: haxe_ui_components_SectionHeader
});
var haxe_ui_components__$SectionHeader_TextBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.components._SectionHeader.TextBehaviour"] = haxe_ui_components__$SectionHeader_TextBehaviour;
haxe_ui_components__$SectionHeader_TextBehaviour.__name__ = "haxe.ui.components._SectionHeader.TextBehaviour";
haxe_ui_components__$SectionHeader_TextBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_components__$SectionHeader_TextBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		var label = this._component.findComponent(null,haxe_ui_components_Label,false);
		label.set_text(haxe_ui_util_Variant.toString(this._value));
	}
	,__class__: haxe_ui_components__$SectionHeader_TextBehaviour
});
var haxe_ui_components__$SectionHeader_Builder = function(component) {
	haxe_ui_core_CompositeBuilder.call(this,component);
};
$hxClasses["haxe.ui.components._SectionHeader.Builder"] = haxe_ui_components__$SectionHeader_Builder;
haxe_ui_components__$SectionHeader_Builder.__name__ = "haxe.ui.components._SectionHeader.Builder";
haxe_ui_components__$SectionHeader_Builder.__super__ = haxe_ui_core_CompositeBuilder;
haxe_ui_components__$SectionHeader_Builder.prototype = $extend(haxe_ui_core_CompositeBuilder.prototype,{
	create: function() {
		haxe_ui_core_CompositeBuilder.prototype.create.call(this);
		var label = new haxe_ui_components_Label();
		label.set_text("Section Header");
		label.set_scriptAccess(false);
		this._component.addComponent(label);
		var line = new haxe_ui_components_HorizontalRule();
		line.addClasses(["section-line","line"]);
		line.set_scriptAccess(false);
		this._component.addComponent(line);
	}
	,__class__: haxe_ui_components__$SectionHeader_Builder
});
var haxe_ui_containers_HBox = function() {
	haxe_ui_containers_Box.call(this);
	this.set_layout(new haxe_ui_layouts_HorizontalLayout());
};
$hxClasses["haxe.ui.containers.HBox"] = haxe_ui_containers_HBox;
haxe_ui_containers_HBox.__name__ = "haxe.ui.containers.HBox";
haxe_ui_containers_HBox.__super__ = haxe_ui_containers_Box;
haxe_ui_containers_HBox.prototype = $extend(haxe_ui_containers_Box.prototype,{
	get_continuous: function() {
		return ((this._layout) instanceof haxe_ui_layouts_HorizontalContinuousLayout);
	}
	,set_continuous: function(value) {
		if(value == true) {
			this.set_layout(new haxe_ui_layouts_HorizontalContinuousLayout());
		} else {
			this.set_layout(new haxe_ui_layouts_HorizontalLayout());
		}
		return value;
	}
	,registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		c.set_continuous(this.get_continuous());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_containers_HBox();
	}
	,__class__: haxe_ui_containers_HBox
	,__properties__: $extend(haxe_ui_containers_Box.prototype.__properties__,{set_continuous:"set_continuous",get_continuous:"get_continuous"})
});
var haxe_ui_core_ComponentClassMap = function() {
	this._map = null;
};
$hxClasses["haxe.ui.core.ComponentClassMap"] = haxe_ui_core_ComponentClassMap;
haxe_ui_core_ComponentClassMap.__name__ = "haxe.ui.core.ComponentClassMap";
haxe_ui_core_ComponentClassMap.__properties__ = {get_instance:"get_instance"};
haxe_ui_core_ComponentClassMap.get_instance = function() {
	if(haxe_ui_core_ComponentClassMap._instance == null) {
		haxe_ui_core_ComponentClassMap._instance = new haxe_ui_core_ComponentClassMap();
	}
	return haxe_ui_core_ComponentClassMap._instance;
};
haxe_ui_core_ComponentClassMap.get = function(alias) {
	alias = StringTools.replace(alias,"-","").toLowerCase();
	return haxe_ui_core_ComponentClassMap.get_instance().getClassName(alias);
};
haxe_ui_core_ComponentClassMap.register = function(alias,className) {
	haxe_ui_core_ComponentClassMap.get_instance().registerClassName(alias.toLowerCase(),className);
};
haxe_ui_core_ComponentClassMap.list = function() {
	haxe_ui_core_ComponentClassMap.get_instance().load();
	return new haxe_ds__$StringMap_StringMapKeyIterator(haxe_ui_core_ComponentClassMap.get_instance()._map.h);
};
haxe_ui_core_ComponentClassMap.clear = function() {
	haxe_ui_core_ComponentClassMap.get_instance()._map = new haxe_ds_StringMap();
};
haxe_ui_core_ComponentClassMap.hasClass = function(className) {
	return haxe_ui_core_ComponentClassMap.get_instance().hasClassName(className);
};
haxe_ui_core_ComponentClassMap.prototype = {
	_map: null
	,getClassName: function(alias) {
		this.load();
		alias = alias.toLowerCase();
		return this._map.h[alias];
	}
	,registerClassName: function(alias,className) {
		this.load();
		alias = alias.toLowerCase();
		if(Object.prototype.hasOwnProperty.call(this._map.h,alias) == false) {
			this._map.h[alias] = className;
		}
		this.save();
	}
	,hasClassName: function(className) {
		this.load();
		var h = this._map.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			if(this._map.h[k] == className) {
				return true;
			}
		}
		return false;
	}
	,load: function() {
		if(this._map != null) {
			return;
		}
		var s = haxe_Resource.getString("haxeui_classmap");
		if(s == null) {
			return;
		}
		var unserializer = new haxe_Unserializer(s);
		this._map = unserializer.unserialize();
	}
	,save: function() {
	}
	,__class__: haxe_ui_core_ComponentClassMap
};
var haxe_ui_core_ComponentTextBehaviour = function(component) {
	haxe_ui_behaviours_DefaultBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentTextBehaviour"] = haxe_ui_core_ComponentTextBehaviour;
haxe_ui_core_ComponentTextBehaviour.__name__ = "haxe.ui.core.ComponentTextBehaviour";
haxe_ui_core_ComponentTextBehaviour.__super__ = haxe_ui_behaviours_DefaultBehaviour;
haxe_ui_core_ComponentTextBehaviour.prototype = $extend(haxe_ui_behaviours_DefaultBehaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		haxe_ui_behaviours_DefaultBehaviour.prototype.set.call(this,value);
	}
	,__class__: haxe_ui_core_ComponentTextBehaviour
});
var haxe_ui_core_ComponentDisabledBehaviour = function(component) {
	haxe_ui_behaviours_DefaultBehaviour.call(this,component);
	this._value = haxe_ui_util_Variant.fromBool(false);
};
$hxClasses["haxe.ui.core.ComponentDisabledBehaviour"] = haxe_ui_core_ComponentDisabledBehaviour;
haxe_ui_core_ComponentDisabledBehaviour.__name__ = "haxe.ui.core.ComponentDisabledBehaviour";
haxe_ui_core_ComponentDisabledBehaviour.__super__ = haxe_ui_behaviours_DefaultBehaviour;
haxe_ui_core_ComponentDisabledBehaviour.prototype = $extend(haxe_ui_behaviours_DefaultBehaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		if(value != null && haxe_ui_util_Variant.get_isNull(value) == false) {
			this._component.disableInteractivity(haxe_ui_util_Variant.toBool(value),true,true);
		}
	}
	,get: function() {
		return haxe_ui_util_Variant.fromBool(this._component.classes.indexOf(":disabled") != -1);
	}
	,__class__: haxe_ui_core_ComponentDisabledBehaviour
});
var haxe_ui_core_ComponentValueBehaviour = function(component) {
	haxe_ui_behaviours_ValueBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentValueBehaviour"] = haxe_ui_core_ComponentValueBehaviour;
haxe_ui_core_ComponentValueBehaviour.__name__ = "haxe.ui.core.ComponentValueBehaviour";
haxe_ui_core_ComponentValueBehaviour.__super__ = haxe_ui_behaviours_ValueBehaviour;
haxe_ui_core_ComponentValueBehaviour.prototype = $extend(haxe_ui_behaviours_ValueBehaviour.prototype,{
	set: function(value) {
		if(haxe_ui_util_Variant.eq(value,this._value)) {
			return;
		}
		this._value = value;
		this._component.set_text(haxe_ui_util_Variant.toString(value));
	}
	,get: function() {
		return this._value;
	}
	,getDynamic: function() {
		return haxe_ui_util_Variant.toDynamic(this._value);
	}
	,__class__: haxe_ui_core_ComponentValueBehaviour
});
var haxe_ui_core_ComponentToolTipBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentToolTipBehaviour"] = haxe_ui_core_ComponentToolTipBehaviour;
haxe_ui_core_ComponentToolTipBehaviour.__name__ = "haxe.ui.core.ComponentToolTipBehaviour";
haxe_ui_core_ComponentToolTipBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_core_ComponentToolTipBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			haxe_ui_tooltips_ToolTipManager.get_instance().unregisterTooltip(this._component);
		} else {
			haxe_ui_tooltips_ToolTipManager.get_instance().registerTooltip(this._component,{ tipData : haxe_ui_util_Variant.toDynamic(this._value), renderer : this._component.get_tooltipRenderer()});
		}
	}
	,setDynamic: function(value) {
		haxe_ui_tooltips_ToolTipManager.get_instance().unregisterTooltip(this._component);
		if(value != null) {
			haxe_ui_tooltips_ToolTipManager.get_instance().registerTooltip(this._component,{ tipData : value, renderer : this._component.get_tooltipRenderer()});
		}
	}
	,getDynamic: function() {
		var options = haxe_ui_tooltips_ToolTipManager.get_instance().getTooltipOptions(this._component);
		if(options == null) {
			return null;
		}
		return options.tipData;
	}
	,__class__: haxe_ui_core_ComponentToolTipBehaviour
});
var haxe_ui_core_ComponentToolTipRendererBehaviour = function(component) {
	haxe_ui_behaviours_DataBehaviour.call(this,component);
};
$hxClasses["haxe.ui.core.ComponentToolTipRendererBehaviour"] = haxe_ui_core_ComponentToolTipRendererBehaviour;
haxe_ui_core_ComponentToolTipRendererBehaviour.__name__ = "haxe.ui.core.ComponentToolTipRendererBehaviour";
haxe_ui_core_ComponentToolTipRendererBehaviour.__super__ = haxe_ui_behaviours_DataBehaviour;
haxe_ui_core_ComponentToolTipRendererBehaviour.prototype = $extend(haxe_ui_behaviours_DataBehaviour.prototype,{
	validateData: function() {
		if(this._value == null || haxe_ui_util_Variant.get_isNull(this._value)) {
			haxe_ui_tooltips_ToolTipManager.get_instance().updateTooltipRenderer(this._component,null);
		} else {
			haxe_ui_tooltips_ToolTipManager.get_instance().updateTooltipRenderer(this._component,haxe_ui_util_Variant.toComponent(this._value));
		}
	}
	,__class__: haxe_ui_core_ComponentToolTipRendererBehaviour
});
var haxe_ui_core_IScrollView = function() { };
$hxClasses["haxe.ui.core.IScrollView"] = haxe_ui_core_IScrollView;
haxe_ui_core_IScrollView.__name__ = "haxe.ui.core.IScrollView";
haxe_ui_core_IScrollView.__isInterface__ = true;
haxe_ui_core_IScrollView.prototype = {
	ensureVisible: null
	,__class__: haxe_ui_core_IScrollView
};
var haxe_ui_core_ImageDisplay = function() {
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_ImageDisplayImpl.call(this);
};
$hxClasses["haxe.ui.core.ImageDisplay"] = haxe_ui_core_ImageDisplay;
haxe_ui_core_ImageDisplay.__name__ = "haxe.ui.core.ImageDisplay";
haxe_ui_core_ImageDisplay.__super__ = haxe_ui_backend_ImageDisplayImpl;
haxe_ui_core_ImageDisplay.prototype = $extend(haxe_ui_backend_ImageDisplayImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this._left = value;
		this.invalidateComponent("position");
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this._top = value;
		this.invalidateComponent("position");
		return value;
	}
	,set_imageWidth: function(value) {
		if(this._imageWidth == value || value <= 0) {
			return value;
		}
		this._imageWidth = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_imageWidth: function() {
		return this._imageWidth;
	}
	,set_imageHeight: function(value) {
		if(this._imageHeight == value || value <= 0) {
			return value;
		}
		this._imageHeight = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_imageHeight: function() {
		return this._imageHeight;
	}
	,get_imageInfo: function() {
		return this._imageInfo;
	}
	,set_imageInfo: function(value) {
		if(value == this._imageInfo) {
			return value;
		}
		this._imageInfo = value;
		this._imageWidth = this._imageInfo.width;
		this._imageHeight = this._imageInfo.height;
		this.invalidateComponent("data");
		this.invalidateComponent("display");
		return value;
	}
	,get_imageClipRect: function() {
		return this._imageClipRect;
	}
	,set_imageClipRect: function(value) {
		this._imageClipRect = value;
		this.invalidateComponent("display");
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this.parentComponent == null) {
			return;
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("imageDisplay");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("imageDisplay");
		}
	}
	,validateComponent: function() {
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.handleValidate();
		var h = this._invalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			var _this = this._invalidationFlags;
			if(Object.prototype.hasOwnProperty.call(_this.h,flag)) {
				delete(_this.h[flag]);
			}
		}
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,handleValidate: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		if(dataInvalid) {
			this.validateData();
		}
		if(positionInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
	}
	,__class__: haxe_ui_core_ImageDisplay
	,__properties__: {set_imageClipRect:"set_imageClipRect",get_imageClipRect:"get_imageClipRect",set_imageInfo:"set_imageInfo",get_imageInfo:"get_imageInfo",set_imageHeight:"set_imageHeight",get_imageHeight:"get_imageHeight",set_imageWidth:"set_imageWidth",get_imageWidth:"get_imageWidth",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left"}
});
var haxe_ui_core_ItemRenderer = function() {
	this._fieldList = null;
	this.itemIndex = -1;
	this._allowHover = true;
	this.autoRegisterInteractiveEvents = true;
	haxe_ui_containers_Box.call(this);
	this.registerEvent("mouseover",$bind(this,this._onItemMouseOver));
	this.registerEvent("mouseout",$bind(this,this._onItemMouseOut));
	this.registerEvent("mousedown",$bind(this,this._onItemMouseDown));
	this.registerEvent("mouseup",$bind(this,this._onItemMouseUp));
};
$hxClasses["haxe.ui.core.ItemRenderer"] = haxe_ui_core_ItemRenderer;
haxe_ui_core_ItemRenderer.__name__ = "haxe.ui.core.ItemRenderer";
haxe_ui_core_ItemRenderer.__super__ = haxe_ui_containers_Box;
haxe_ui_core_ItemRenderer.prototype = $extend(haxe_ui_containers_Box.prototype,{
	autoRegisterInteractiveEvents: null
	,_onItemMouseOver: function(event) {
		this.addClass(":hover");
	}
	,_onItemMouseOut: function(event) {
		this.removeClass(":hover");
	}
	,_onItemMouseDown: function(event) {
		this.addClass(":down");
	}
	,_onItemMouseUp: function(event) {
		this.removeClass(":down");
	}
	,_allowHover: null
	,get_allowHover: function() {
		return this._allowHover;
	}
	,set_allowHover: function(value) {
		if(this._allowHover == value) {
			return value;
		}
		this._allowHover = value;
		if(this._allowHover == true) {
			this.registerEvent("mouseover",$bind(this,this._onItemMouseOver));
			this.registerEvent("mouseout",$bind(this,this._onItemMouseOut));
		} else {
			this.unregisterEvent("mouseover",$bind(this,this._onItemMouseOver));
			this.unregisterEvent("mouseout",$bind(this,this._onItemMouseOut));
		}
		return value;
	}
	,_data: null
	,get_data: function() {
		return this._data;
	}
	,set_data: function(value) {
		this._data = value;
		this.invalidateComponent("data",false);
		return value;
	}
	,itemIndex: null
	,_fieldList: null
	,validateComponentData: function() {
		if(this._data != null && (this._fieldList == null || this._fieldList.length == 0)) {
			var _g = Type.typeof(this._data);
			switch(_g._hx_index) {
			case 4:
				if(typeof(this._data) == "string" == false) {
					var fieldList = Reflect.fields(this._data);
					if(js_Boot.getClass(this._data) != null) {
						var instanceFields = Type.getInstanceFields(js_Boot.getClass(this._data));
						var _g1 = 0;
						while(_g1 < instanceFields.length) {
							var i = instanceFields[_g1];
							++_g1;
							if(fieldList.indexOf(i) == -1 && Reflect.isFunction(Reflect.getProperty(this._data,i)) == false) {
								fieldList.push(i);
							} else if(StringTools.startsWith(i,"get_") && fieldList.indexOf(HxOverrides.substr(i,4,null)) == -1 && Reflect.isFunction(Reflect.getProperty(this._data,i)) == true) {
								fieldList.push(HxOverrides.substr(i,4,null));
							}
						}
						this._fieldList = fieldList;
					}
				} else {
					this._fieldList = ["text"];
				}
				break;
			case 6:
				var _g1 = _g.c;
				if(typeof(this._data) == "string" == false) {
					var fieldList = Reflect.fields(this._data);
					if(js_Boot.getClass(this._data) != null) {
						var instanceFields = Type.getInstanceFields(js_Boot.getClass(this._data));
						var _g = 0;
						while(_g < instanceFields.length) {
							var i = instanceFields[_g];
							++_g;
							if(fieldList.indexOf(i) == -1 && Reflect.isFunction(Reflect.getProperty(this._data,i)) == false) {
								fieldList.push(i);
							} else if(StringTools.startsWith(i,"get_") && fieldList.indexOf(HxOverrides.substr(i,4,null)) == -1 && Reflect.isFunction(Reflect.getProperty(this._data,i)) == true) {
								fieldList.push(HxOverrides.substr(i,4,null));
							}
						}
						this._fieldList = fieldList;
					}
				} else {
					this._fieldList = ["text"];
				}
				break;
			default:
				this._fieldList = ["text"];
			}
		}
		this.updateValues(this._data,this._fieldList);
		if(this.autoRegisterInteractiveEvents) {
			var components = this.findComponents(null,haxe_ui_core_InteractiveComponent);
			var _g = 0;
			while(_g < components.length) {
				var c = components[_g];
				++_g;
				if(((c) instanceof haxe_ui_components_Button)) {
					if(c.hasEvent("click",$bind(this,this.onItemClick)) == false) {
						c.registerEvent("click",$bind(this,this.onItemClick));
					}
				} else if(c.hasEvent("change",$bind(this,this.onItemChange)) == false) {
					c.registerEvent("change",$bind(this,this.onItemChange));
				}
			}
		}
		this.onDataChanged(this._data);
	}
	,onDataChanged: function(data) {
		this._data = data;
	}
	,onItemChange: function(event) {
		if(this.itemIndex < 0) {
			return;
		}
		var v = event.target.get_value();
		if(this._data != null) {
			Reflect.setProperty(this._data,event.target.get_id(),v);
		}
		var e = new haxe_ui_events_ItemEvent("itemcomponentevent");
		e.bubble = true;
		e.source = event.target;
		e.sourceEvent = event;
		e.itemIndex = this.itemIndex;
		e.data = this._data;
		this.dispatch(e);
	}
	,onItemClick: function(event) {
		if(this.itemIndex < 0) {
			return;
		}
		var e = new haxe_ui_events_ItemEvent("itemcomponentevent");
		e.bubble = true;
		e.source = event.target;
		e.sourceEvent = event;
		e.itemIndex = this.itemIndex;
		e.data = this._data;
		this.dispatch(e);
	}
	,updateValues: function(value,fieldList) {
		if(fieldList == null) {
			fieldList = Reflect.fields(value);
		}
		var valueObject = null;
		var _g = Type.typeof(value);
		switch(_g._hx_index) {
		case 4:
			if(typeof(value) == "string" == false) {
				valueObject = value;
			} else {
				valueObject = { text : value};
			}
			break;
		case 6:
			var _g1 = _g.c;
			if(typeof(value) == "string" == false) {
				valueObject = value;
			} else {
				valueObject = { text : value};
			}
			break;
		default:
			valueObject = { text : value};
		}
		var _g = 0;
		while(_g < fieldList.length) {
			var f = fieldList[_g];
			++_g;
			var v = Reflect.getProperty(valueObject,f);
			var c = this.findComponent(f,null,true);
			if(c != null && v != null) {
				var propValue = haxe_ui_util_TypeConverter.convertTo(v,haxe_ui_core_TypeMap.getTypeInfo(c.get_className(),"value"));
				c.set_value(propValue);
				if(this.autoRegisterInteractiveEvents) {
					if(((c) instanceof haxe_ui_core_InteractiveComponent) || ((c) instanceof haxe_ui_core_ItemRenderer)) {
						if(c.hasEvent("change",$bind(this,this.onItemChange)) == false) {
							c.registerEvent("change",$bind(this,this.onItemChange));
						}
						if(c.hasEvent("click",$bind(this,this.onItemClick)) == false) {
							c.registerEvent("click",$bind(this,this.onItemClick));
						}
					}
				}
				c.show();
			} else if(c != null) {
				c.hide();
			} else if(f != "id" && f != "layout") {
				try {
					Reflect.setProperty(this,f,v);
				} catch( _g1 ) {
				}
			} else if(Type.typeof(v) == ValueType.TObject) {
				this.updateValues(v);
			}
		}
	}
	,registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		c.set_allowHover(this.get_allowHover());
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_core_ItemRenderer();
	}
	,__class__: haxe_ui_core_ItemRenderer
	,__properties__: $extend(haxe_ui_containers_Box.prototype.__properties__,{set_data:"set_data",get_data:"get_data",set_allowHover:"set_allowHover",get_allowHover:"get_allowHover"})
});
var haxe_ui_core_Platform = function() {
	haxe_ui_backend_PlatformImpl.call(this);
};
$hxClasses["haxe.ui.core.Platform"] = haxe_ui_core_Platform;
haxe_ui_core_Platform.__name__ = "haxe.ui.core.Platform";
haxe_ui_core_Platform.__properties__ = {get_instance:"get_instance",get_hscrollHeight:"get_hscrollHeight",get_vscrollWidth:"get_vscrollWidth"};
haxe_ui_core_Platform.get_vscrollWidth = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.vscroll.width");
};
haxe_ui_core_Platform.get_hscrollHeight = function() {
	return haxe_ui_core_Platform.get_instance().getMetric("patform.metrics.hscroll.height");
};
haxe_ui_core_Platform.get_instance = function() {
	if(haxe_ui_core_Platform._instance == null) {
		haxe_ui_core_Platform._instance = new haxe_ui_core_Platform();
	}
	return haxe_ui_core_Platform._instance;
};
haxe_ui_core_Platform.__super__ = haxe_ui_backend_PlatformImpl;
haxe_ui_core_Platform.prototype = $extend(haxe_ui_backend_PlatformImpl.prototype,{
	getMetric: function(id) {
		return haxe_ui_backend_PlatformImpl.prototype.getMetric.call(this,id);
	}
	,__class__: haxe_ui_core_Platform
});
var haxe_ui_core_Screen = function() {
	this.currentMouseY = 0;
	this.currentMouseX = 0;
	this._eventMap = new haxe_ui_util_EventMap();
	var _gthis = this;
	haxe_ui_backend_ScreenImpl.call(this);
	this.registerEvent("mousemove",function(e) {
		_gthis.currentMouseX = e.screenX;
		_gthis.currentMouseY = e.screenY;
	});
};
$hxClasses["haxe.ui.core.Screen"] = haxe_ui_core_Screen;
haxe_ui_core_Screen.__name__ = "haxe.ui.core.Screen";
haxe_ui_core_Screen.__properties__ = {get_instance:"get_instance"};
haxe_ui_core_Screen.get_instance = function() {
	if(haxe_ui_core_Screen._instance == null) {
		haxe_ui_core_Screen._instance = new haxe_ui_core_Screen();
	}
	return haxe_ui_core_Screen._instance;
};
haxe_ui_core_Screen.__super__ = haxe_ui_backend_ScreenImpl;
haxe_ui_core_Screen.prototype = $extend(haxe_ui_backend_ScreenImpl.prototype,{
	_eventMap: null
	,currentMouseX: null
	,currentMouseY: null
	,addComponent: function(component) {
		var wasReady = component.get_isReady();
		component._hasScreen = true;
		haxe_ui_backend_ScreenImpl.prototype.addComponent.call(this,component);
		component.ready();
		if(this.rootComponents.indexOf(component) == -1) {
			this.rootComponents.push(component);
		}
		haxe_ui_focus_FocusManager.get_instance().pushView(component);
		if(component.hasEvent("resize",$bind(this,this._onRootComponentResize)) == false) {
			component.registerEvent("resize",$bind(this,this._onRootComponentResize));
		}
		if(wasReady && component.get_hidden() == false) {
			component.dispatch(new haxe_ui_events_UIEvent("shown"));
		}
		return component;
	}
	,removeComponent: function(component,dispose) {
		if(dispose == null) {
			dispose = true;
		}
		if(this.rootComponents.indexOf(component) == -1) {
			return component;
		}
		component._hasScreen = false;
		haxe_ui_backend_ScreenImpl.prototype.removeComponent.call(this,component,dispose);
		component.set_depth(-1);
		HxOverrides.remove(this.rootComponents,component);
		haxe_ui_focus_FocusManager.get_instance().removeView(component);
		component.unregisterEvent("resize",$bind(this,this._onRootComponentResize));
		if(dispose == true) {
			component.disposeComponent();
		}
		return component;
	}
	,setComponentIndex: function(child,index) {
		if(index >= 0 && index <= this.rootComponents.length) {
			this.handleSetComponentIndex(child,index);
			HxOverrides.remove(this.rootComponents,child);
			this.rootComponents.splice(index,0,child);
		}
		return child;
	}
	,moveComponentToFront: function(child) {
		if(this.rootComponents.indexOf(child) != -1) {
			this.setComponentIndex(child,this.rootComponents.length - 1);
		}
	}
	,findComponentsUnderPoint: function(screenX,screenY,type) {
		var c = [];
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.hitTest(screenX,screenY)) {
				var match = true;
				if(type != null && js_Boot.__instanceof(r,type) == false) {
					match = false;
				}
				if(match == true) {
					c.push(r);
				}
			}
			c = c.concat(r.findComponentsUnderPoint(screenX,screenY,type));
		}
		return c;
	}
	,hasComponentUnderPoint: function(screenX,screenY,type) {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.hasComponentUnderPoint(screenX,screenY,type) == true) {
				return true;
			}
		}
		return false;
	}
	,findSolidComponentUnderPoint: function(screenX,screenY,type) {
		var solidComponents = [];
		var components = this.findComponentsUnderPoint(screenX,screenY,type);
		var _g = 0;
		while(_g < components.length) {
			var c = components[_g];
			++_g;
			if(c.get_isComponentSolid()) {
				solidComponents.push(c);
			}
		}
		return solidComponents;
	}
	,hasSolidComponentUnderPoint: function(screenX,screenY,type) {
		return this.findSolidComponentUnderPoint(screenX,screenY,type).length > 0;
	}
	,onThemeChanged: function() {
		var _g = 0;
		var _g1 = this.rootComponents;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			this.onThemeChangedChildren(c);
		}
	}
	,onThemeChangedChildren: function(c) {
		var _g = 0;
		var _g1 = c._children == null ? [] : c._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.onThemeChangedChildren(child);
		}
		c.onThemeChanged();
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this.supportsEvent(type) == true) {
			if(this._eventMap.add(type,listener,priority) == true) {
				this.mapEvent(type,$bind(this,this._onMappedEvent));
			}
		}
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap.remove(type,listener) == true) {
			this.unmapEvent(type,$bind(this,this._onMappedEvent));
		}
	}
	,_onMappedEvent: function(event) {
		this._eventMap.invoke(event.type,event);
	}
	,__class__: haxe_ui_core_Screen
});
var haxe_ui_core_TextDisplayData = function() {
	this.wordWrap = false;
	this.multiline = false;
};
$hxClasses["haxe.ui.core.TextDisplayData"] = haxe_ui_core_TextDisplayData;
haxe_ui_core_TextDisplayData.__name__ = "haxe.ui.core.TextDisplayData";
haxe_ui_core_TextDisplayData.prototype = {
	multiline: null
	,wordWrap: null
	,__class__: haxe_ui_core_TextDisplayData
};
var haxe_ui_core_TextDisplay = function() {
	this._depth = -1;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_TextDisplayImpl.call(this);
};
$hxClasses["haxe.ui.core.TextDisplay"] = haxe_ui_core_TextDisplay;
haxe_ui_core_TextDisplay.__name__ = "haxe.ui.core.TextDisplay";
haxe_ui_core_TextDisplay.__interfaces__ = [haxe_ui_validation_IValidating];
haxe_ui_core_TextDisplay.__super__ = haxe_ui_backend_TextDisplayImpl;
haxe_ui_core_TextDisplay.prototype = $extend(haxe_ui_backend_TextDisplayImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,get_id: function() {
		if(this.parentComponent == null) {
			return null;
		}
		return this.parentComponent.get_id() + "_textdisplay";
	}
	,set_id: function(value) {
		return value;
	}
	,isComponentOffscreen: null
	,get_isComponentOffscreen: function() {
		return false;
	}
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		var _gthis = this;
		if(value == null) {
			return value;
		}
		if(value.fontName != null && this._textStyle == null || this._textStyle != null && value.fontName != this._textStyle.fontName) {
			haxe_ui_ToolkitAssets.get_instance().getFont(value.fontName,function(fontInfo) {
				_gthis._fontInfo = fontInfo;
				_gthis.invalidateComponent("style");
				_gthis.parentComponent.invalidateComponent("style");
			});
		} else {
			this.invalidateComponent("style");
		}
		this._textStyle = value;
		return value;
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(value == this._text) {
			return value;
		}
		this._text = value;
		this._htmlText = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_htmlText: function() {
		return this._htmlText;
	}
	,set_htmlText: function(value) {
		if(value == this._htmlText) {
			return value;
		}
		this._htmlText = value;
		this._text = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this.invalidateComponent("position");
		this._left = value;
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this.invalidateComponent("position");
		this._top = value;
		return value;
	}
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this.invalidateComponent("display");
		this._width = value;
		return value;
	}
	,get_width: function() {
		return this._width;
	}
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this.invalidateComponent("display");
		this._height = value;
		return value;
	}
	,get_height: function() {
		return this._height;
	}
	,textWidth: null
	,get_textWidth: function() {
		if(this._text == null && this._htmlText == null) {
			return 0;
		}
		if(this._text != null && this._text.length == 0) {
			return 0;
		}
		if(this._htmlText != null && this._htmlText.length == 0) {
			return 0;
		}
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textWidth;
	}
	,textHeight: null
	,get_textHeight: function() {
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textHeight;
	}
	,get_multiline: function() {
		return this._displayData.multiline;
	}
	,set_multiline: function(value) {
		if(value == this._displayData.multiline) {
			return value;
		}
		this.invalidateComponent("style");
		this._displayData.multiline = value;
		return value;
	}
	,get_wordWrap: function() {
		return this._displayData.wordWrap;
	}
	,set_wordWrap: function(value) {
		if(value == this._displayData.wordWrap) {
			return value;
		}
		this.invalidateComponent("style");
		this._displayData.wordWrap = value;
		return value;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("textDisplay");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("textDisplay");
		}
	}
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,updateComponentDisplay: function() {
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.validateComponentInternal();
		this._invalidationFlags.h = Object.create(null);
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,validateComponentInternal: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var measureInvalid = this.isComponentInvalid("measure");
		if(dataInvalid) {
			this.validateData();
		}
		if(styleInvalid) {
			if(this.validateStyle()) {
				measureInvalid = true;
			}
		}
		if(positionInvalid || styleInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
		if(dataInvalid || displayInvalid || measureInvalid) {
			var oldTextWidth = this.get_textWidth();
			var oldTextHeight = this.get_textHeight();
			this.measureText();
			if(this.get_textWidth() != oldTextWidth || this.get_textHeight() != oldTextHeight) {
				this.parentComponent.invalidateComponent("layout");
			}
		}
	}
	,__class__: haxe_ui_core_TextDisplay
	,__properties__: $extend(haxe_ui_backend_TextDisplayImpl.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_multiline:"set_multiline",get_multiline:"get_multiline",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_text:"set_text",get_text:"get_text",set_textStyle:"set_textStyle",get_textStyle:"get_textStyle",get_isComponentOffscreen:"get_isComponentOffscreen",set_id:"set_id",get_id:"get_id"})
});
var haxe_ui_core_TextInputData = function() {
	this.onChangedCallback = null;
	this.onScrollCallback = null;
	this.vscrollNativeWheel = false;
	this.vscrollPageStep = null;
	this.vscrollPageSize = 0;
	this.vscrollMax = 0;
	this.vscrollPos = 0;
	this.hscrollPageSize = 0;
	this.hscrollMax = 0;
	this.hscrollPos = 0;
	this.password = false;
};
$hxClasses["haxe.ui.core.TextInputData"] = haxe_ui_core_TextInputData;
haxe_ui_core_TextInputData.__name__ = "haxe.ui.core.TextInputData";
haxe_ui_core_TextInputData.prototype = {
	password: null
	,hscrollPos: null
	,hscrollMax: null
	,hscrollPageSize: null
	,vscrollPos: null
	,vscrollMax: null
	,vscrollPageSize: null
	,vscrollPageStep: null
	,vscrollNativeWheel: null
	,onScrollCallback: null
	,onChangedCallback: null
	,__class__: haxe_ui_core_TextInputData
};
var haxe_ui_core_TextInput = function() {
	this._depth = -1;
	this._isValidating = false;
	this._isAllInvalid = false;
	this._invalidationFlags = new haxe_ds_StringMap();
	haxe_ui_backend_TextInputImpl.call(this);
	this._isAllInvalid = true;
};
$hxClasses["haxe.ui.core.TextInput"] = haxe_ui_core_TextInput;
haxe_ui_core_TextInput.__name__ = "haxe.ui.core.TextInput";
haxe_ui_core_TextInput.__interfaces__ = [haxe_ui_validation_IValidating];
haxe_ui_core_TextInput.__super__ = haxe_ui_backend_TextInputImpl;
haxe_ui_core_TextInput.prototype = $extend(haxe_ui_backend_TextInputImpl.prototype,{
	_invalidationFlags: null
	,_isAllInvalid: null
	,_isValidating: null
	,get_id: function() {
		if(this.parentComponent == null) {
			return null;
		}
		return this.parentComponent.get_id() + "_textinput";
	}
	,set_id: function(value) {
		return value;
	}
	,isComponentOffscreen: null
	,get_isComponentOffscreen: function() {
		return false;
	}
	,focus: function() {
		haxe_ui_backend_TextInputImpl.prototype.focus.call(this);
	}
	,blur: function() {
		haxe_ui_backend_TextInputImpl.prototype.blur.call(this);
	}
	,get_textStyle: function() {
		return this._textStyle;
	}
	,set_textStyle: function(value) {
		var _gthis = this;
		if(value == null) {
			return value;
		}
		if(value.fontName != null && this._textStyle == null || this._textStyle != null && value.fontName != this._textStyle.fontName) {
			haxe_ui_ToolkitAssets.get_instance().getFont(value.fontName,function(fontInfo) {
				_gthis._fontInfo = fontInfo;
				_gthis.invalidateComponent("style");
			});
		} else {
			this.invalidateComponent("style");
		}
		this._textStyle = value;
		return value;
	}
	,data: null
	,get_data: function() {
		return this._inputData;
	}
	,get_text: function() {
		return this._text;
	}
	,set_text: function(value) {
		if(value == this._text) {
			return value;
		}
		this._text = value;
		this.invalidateComponent("data");
		return value;
	}
	,get_htmlText: function() {
		return this._htmlText;
	}
	,set_htmlText: function(value) {
		if(value == this._htmlText) {
			return value;
		}
		this._htmlText = value;
		this._text = null;
		this.invalidateComponent("data");
		return value;
	}
	,get_password: function() {
		return this._inputData.password;
	}
	,set_password: function(value) {
		if(value == this._inputData.password) {
			return value;
		}
		this._inputData.password = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_left: function() {
		return this._left;
	}
	,set_left: function(value) {
		if(value == this._left) {
			return value;
		}
		this._left = value;
		this.invalidateComponent("position");
		return value;
	}
	,get_top: function() {
		return this._top;
	}
	,set_top: function(value) {
		if(value == this._top) {
			return value;
		}
		this._top = value;
		this.invalidateComponent("position");
		return value;
	}
	,set_width: function(value) {
		if(this._width == value) {
			return value;
		}
		this._width = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_width: function() {
		return this._width;
	}
	,set_height: function(value) {
		if(this._height == value) {
			return value;
		}
		this._height = value;
		this.invalidateComponent("display");
		return value;
	}
	,get_height: function() {
		return this._height;
	}
	,textWidth: null
	,get_textWidth: function() {
		if(this._text == null || this._text.length == 0) {
			return 0;
		}
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textWidth;
	}
	,textHeight: null
	,get_textHeight: function() {
		var tmp = this._text == null || this._text.length == 0;
		if(this.isComponentInvalid() == true) {
			this.validateComponent();
		}
		return this._textHeight;
	}
	,get_multiline: function() {
		return this._displayData.multiline;
	}
	,set_multiline: function(value) {
		if(value == this._displayData.multiline) {
			return value;
		}
		this._displayData.multiline = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_wordWrap: function() {
		return this._displayData.wordWrap;
	}
	,set_wordWrap: function(value) {
		if(value == this._displayData.wordWrap) {
			return value;
		}
		this._displayData.wordWrap = value;
		this.invalidateComponent("style");
		return value;
	}
	,get_hscrollPos: function() {
		return this._inputData.hscrollPos;
	}
	,set_hscrollPos: function(value) {
		if(value == this._inputData.hscrollPos) {
			return value;
		}
		this._inputData.hscrollPos = value;
		this.invalidateComponent("data");
		return value;
	}
	,hscrollMax: null
	,get_hscrollMax: function() {
		return this._inputData.hscrollMax;
	}
	,hscrollPageSize: null
	,get_hscrollPageSize: function() {
		return this._inputData.hscrollPageSize;
	}
	,get_vscrollPos: function() {
		return this._inputData.vscrollPos;
	}
	,set_vscrollPos: function(value) {
		if(value == this._inputData.vscrollPos) {
			return value;
		}
		this._inputData.vscrollPos = value;
		this.invalidateComponent("data");
		return value;
	}
	,vscrollMax: null
	,get_vscrollMax: function() {
		return this._inputData.vscrollMax;
	}
	,vscrollPageSize: null
	,get_vscrollPageSize: function() {
		return this._inputData.vscrollPageSize;
	}
	,isComponentInvalid: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(this._isAllInvalid == true) {
			return true;
		}
		if(flag == "all") {
			var h = this._invalidationFlags.h;
			var value_h = h;
			var value_keys = Object.keys(h);
			var value_length = value_keys.length;
			var value_current = 0;
			while(value_current < value_length) {
				var value = value_h[value_keys[value_current++]];
				return true;
			}
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag);
	}
	,invalidateComponent: function(flag) {
		if(flag == null) {
			flag = "all";
		}
		if(flag == "all") {
			this._isAllInvalid = true;
			this.parentComponent.invalidateComponent("textInput");
		} else if(!Object.prototype.hasOwnProperty.call(this._invalidationFlags.h,flag)) {
			this._invalidationFlags.h[flag] = true;
			this.parentComponent.invalidateComponent("textInput");
		}
	}
	,_depth: null
	,get_depth: function() {
		return this._depth;
	}
	,set_depth: function(value) {
		if(this._depth == value) {
			return value;
		}
		this._depth = value;
		return value;
	}
	,updateComponentDisplay: function() {
	}
	,validateComponent: function(nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._isValidating == true || this.isComponentInvalid() == false) {
			return;
		}
		this._isValidating = true;
		this.validateComponentInternal();
		var h = this._invalidationFlags.h;
		var flag_h = h;
		var flag_keys = Object.keys(h);
		var flag_length = flag_keys.length;
		var flag_current = 0;
		while(flag_current < flag_length) {
			var flag = flag_keys[flag_current++];
			var _this = this._invalidationFlags;
			if(Object.prototype.hasOwnProperty.call(_this.h,flag)) {
				delete(_this.h[flag]);
			}
		}
		this._isAllInvalid = false;
		this._isValidating = false;
	}
	,validateComponentInternal: function() {
		var dataInvalid = this.isComponentInvalid("data");
		var styleInvalid = this.isComponentInvalid("style");
		var positionInvalid = this.isComponentInvalid("position");
		var displayInvalid = this.isComponentInvalid("display");
		var measureInvalid = this.isComponentInvalid("measure");
		if(dataInvalid) {
			this.validateData();
		}
		if(styleInvalid) {
			if(this.validateStyle()) {
				measureInvalid = true;
			}
		}
		if(positionInvalid) {
			this.validatePosition();
		}
		if(displayInvalid) {
			this.validateDisplay();
		}
		if(dataInvalid || displayInvalid || measureInvalid) {
			this.measureText();
		}
		if(dataInvalid) {
			if(this._inputData.onChangedCallback != null) {
				this._inputData.onChangedCallback();
			}
		}
	}
	,__class__: haxe_ui_core_TextInput
	,__properties__: $extend(haxe_ui_backend_TextInputImpl.prototype.__properties__,{set_depth:"set_depth",get_depth:"get_depth",get_vscrollPageSize:"get_vscrollPageSize",get_vscrollMax:"get_vscrollMax",set_vscrollPos:"set_vscrollPos",get_vscrollPos:"get_vscrollPos",get_hscrollPageSize:"get_hscrollPageSize",get_hscrollMax:"get_hscrollMax",set_hscrollPos:"set_hscrollPos",get_hscrollPos:"get_hscrollPos",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_multiline:"set_multiline",get_multiline:"get_multiline",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_password:"set_password",get_password:"get_password",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_text:"set_text",get_text:"get_text",get_data:"get_data",set_textStyle:"set_textStyle",get_textStyle:"get_textStyle",get_isComponentOffscreen:"get_isComponentOffscreen",set_id:"set_id",get_id:"get_id"})
});
var haxe_ui_core_TypeMap = function() { };
$hxClasses["haxe.ui.core.TypeMap"] = haxe_ui_core_TypeMap;
haxe_ui_core_TypeMap.__name__ = "haxe.ui.core.TypeMap";
haxe_ui_core_TypeMap.getTypeInfo = function(className,property) {
	var propInfo = haxe_ui_util_RTTI.getClassProperty(className,property);
	if(propInfo == null) {
		return null;
	}
	return propInfo.propertyType;
};
var haxe_ui_data_DataSource = function(transformer) {
	this._filterFn = null;
	this.onChange = null;
	this.onClear = null;
	this.onRemove = null;
	this.onUpdate = null;
	this.onInsert = null;
	this.onAdd = null;
	this.transformer = transformer;
	this._allowCallbacks = true;
	this._changed = false;
};
$hxClasses["haxe.ui.data.DataSource"] = haxe_ui_data_DataSource;
haxe_ui_data_DataSource.__name__ = "haxe.ui.data.DataSource";
haxe_ui_data_DataSource.fromString = function(data,type) {
	return null;
};
haxe_ui_data_DataSource.prototype = {
	onDataSourceChange: null
	,transformer: null
	,_changed: null
	,onAdd: null
	,onInsert: null
	,onUpdate: null
	,onRemove: null
	,onClear: null
	,onChange: null
	,_allowCallbacks: null
	,get_allowCallbacks: function() {
		return this._allowCallbacks;
	}
	,set_allowCallbacks: function(value) {
		this._allowCallbacks = value;
		if(this._allowCallbacks == true && this._changed == true) {
			this._changed = false;
			this.onInternalChange();
		}
		return value;
	}
	,get_data: function() {
		return this.handleGetData();
	}
	,set_data: function(value) {
		this.handleSetData(value);
		this.handleChanged();
		return value;
	}
	,size: null
	,get_size: function() {
		return this.handleGetSize();
	}
	,get: function(index) {
		var r = this.handleGetItem(index);
		if(js_Boot.__implements(r,haxe_ui_data_IDataItem)) {
			(js_Boot.__cast(r , haxe_ui_data_IDataItem)).onDataSourceChanged = $bind(this,this.onDataItemChange);
		}
		if(this.transformer != null) {
			r = this.transformer.transformFrom(r);
		}
		return r;
	}
	,indexOf: function(item) {
		if(this.transformer != null) {
			item = this.transformer.transformFrom(item);
		}
		return this.handleIndexOf(item);
	}
	,add: function(item) {
		var r = this.handleAddItem(item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onAdd != null) {
			this.onAdd(r);
		}
		return r;
	}
	,insert: function(index,item) {
		var r = this.handleInsert(index,item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onInsert != null) {
			this.onInsert(index,r);
		}
		return r;
	}
	,remove: function(item) {
		var r = this.handleRemoveItem(item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onRemove != null) {
			this.onRemove(r);
		}
		return r;
	}
	,removeAt: function(index) {
		var item = this.get(index);
		return this.remove(item);
	}
	,update: function(index,item) {
		var r = this.handleUpdateItem(index,item);
		this.handleChanged();
		if(this._allowCallbacks == true && this.onUpdate != null) {
			this.onUpdate(index,r);
		}
		return r;
	}
	,clear: function() {
		var o = this._allowCallbacks;
		this._allowCallbacks = false;
		this.handleClear();
		this._allowCallbacks = o;
		this.handleChanged();
		if(this._allowCallbacks == true && this.onClear != null) {
			this.onClear();
		}
	}
	,_filterFn: null
	,clearFilter: function() {
		this._filterFn = null;
		this.handleClearFilter();
	}
	,filter: function(fn) {
		this._filterFn = fn;
		this.handleFilter(fn);
	}
	,isFiltered: null
	,get_isFiltered: function() {
		return this._filterFn != null;
	}
	,handleClearFilter: function() {
	}
	,handleFilter: function(fn) {
	}
	,handleChanged: function() {
		this._changed = true;
		if(this._allowCallbacks == true) {
			this._changed = false;
			this.onInternalChange();
		}
	}
	,sortCustom: function(fn,direction) {
	}
	,sort: function(field,direction) {
		var _g = $bind(this,this.sortByFn);
		var field1 = field;
		this.sortCustom(function(o1,o2,direction) {
			return _g(o1,o2,direction,field1);
		},direction);
	}
	,sortByFn: function(o1,o2,direction,field) {
		var f1 = o1;
		var f2 = o2;
		if(field != null) {
			f1 = Reflect.field(o1,field);
			f2 = Reflect.field(o2,field);
		}
		if(f1 == null || f2 == null) {
			return 0;
		}
		f1 = Std.string(f1);
		f2 = Std.string(f2);
		if(direction == null) {
			direction = "asc";
		}
		var high = 1;
		var low = -1;
		if(direction == "desc") {
			high = -1;
			low = 1;
		}
		if(f1 > f2) {
			return high;
		} else {
			return low;
		}
	}
	,handleGetSize: function() {
		return 0;
	}
	,handleGetItem: function(index) {
		return null;
	}
	,handleIndexOf: function(item) {
		return 0;
	}
	,handleAddItem: function(item) {
		return null;
	}
	,handleInsert: function(index,item) {
		return null;
	}
	,handleRemoveItem: function(item) {
		return null;
	}
	,handleGetData: function() {
		return null;
	}
	,handleSetData: function(v) {
	}
	,handleClear: function() {
		var cachedTransformer = this.transformer;
		this.transformer = null;
		while(this.get_size() > 0) this.remove(this.get(0));
		this.transformer = cachedTransformer;
	}
	,handleUpdateItem: function(index,item) {
		return null;
	}
	,clone: function() {
		var c = new haxe_ui_data_DataSource();
		return c;
	}
	,onDataItemChange: function() {
		if(this._filterFn != null) {
			this.handleFilter(this._filterFn);
		} else {
			this.onInternalChange();
		}
	}
	,onInternalChange: function() {
		if(this.onDataSourceChange != null) {
			this.onDataSourceChange();
		}
		if(this.onChange != null) {
			this.onChange();
		}
	}
	,__class__: haxe_ui_data_DataSource
	,__properties__: {get_isFiltered:"get_isFiltered",get_size:"get_size",set_data:"set_data",get_data:"get_data",set_allowCallbacks:"set_allowCallbacks",get_allowCallbacks:"get_allowCallbacks"}
};
var haxe_ui_data_IDataItem = function() { };
$hxClasses["haxe.ui.data.IDataItem"] = haxe_ui_data_IDataItem;
haxe_ui_data_IDataItem.__name__ = "haxe.ui.data.IDataItem";
haxe_ui_data_IDataItem.__isInterface__ = true;
haxe_ui_data_IDataItem.prototype = {
	onDataSourceChanged: null
	,__class__: haxe_ui_data_IDataItem
};
var haxe_ui_data_transformation_IItemTransformer = function() { };
$hxClasses["haxe.ui.data.transformation.IItemTransformer"] = haxe_ui_data_transformation_IItemTransformer;
haxe_ui_data_transformation_IItemTransformer.__name__ = "haxe.ui.data.transformation.IItemTransformer";
haxe_ui_data_transformation_IItemTransformer.__isInterface__ = true;
haxe_ui_data_transformation_IItemTransformer.prototype = {
	transformFrom: null
	,__class__: haxe_ui_data_transformation_IItemTransformer
};
var haxe_ui_dragdrop_DragManager = function() {
	this._dragComponents = new haxe_ds_ObjectMap();
	this._mouseTargetToDragTarget = new haxe_ds_ObjectMap();
};
$hxClasses["haxe.ui.dragdrop.DragManager"] = haxe_ui_dragdrop_DragManager;
haxe_ui_dragdrop_DragManager.__name__ = "haxe.ui.dragdrop.DragManager";
haxe_ui_dragdrop_DragManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_dragdrop_DragManager.get_instance = function() {
	if(haxe_ui_dragdrop_DragManager._instance == null) {
		haxe_ui_dragdrop_DragManager._instance = new haxe_ui_dragdrop_DragManager();
	}
	return haxe_ui_dragdrop_DragManager._instance;
};
haxe_ui_dragdrop_DragManager.prototype = {
	_dragComponents: null
	,_mouseTargetToDragTarget: null
	,_currentComponent: null
	,_currentOptions: null
	,_mouseOffset: null
	,getDragOptions: function(component) {
		var dragOptions = this._dragComponents.h[component.__id__];
		return dragOptions;
	}
	,registerDraggable: function(component,dragOptions) {
		if(this.isRegisteredDraggable(component)) {
			return null;
		}
		if(dragOptions == null) {
			dragOptions = { };
		}
		if(dragOptions.mouseTarget == null) {
			dragOptions.mouseTarget = component;
		}
		if(dragOptions.dragOffsetX == null) {
			dragOptions.dragOffsetX = 0;
		}
		if(dragOptions.dragOffsetY == null) {
			dragOptions.dragOffsetY = 0;
		}
		if(dragOptions.dragTolerance == null) {
			dragOptions.dragTolerance = haxe_ui_Toolkit.get_scale() | 0;
		}
		if(dragOptions.draggableStyleName == null) {
			dragOptions.draggableStyleName = "draggable";
		}
		if(dragOptions.draggingStyleName == null) {
			dragOptions.draggingStyleName = "dragging";
		}
		this._dragComponents.set(component,dragOptions);
		this._mouseTargetToDragTarget.set(dragOptions.mouseTarget,component);
		if(!dragOptions.mouseTarget.hasEvent("mousedown",$bind(this,this.onMouseDown))) {
			dragOptions.mouseTarget.registerEvent("mousedown",$bind(this,this.onMouseDown));
		}
		if(dragOptions.draggableStyleName != null) {
			dragOptions.mouseTarget.addClass(dragOptions.draggableStyleName);
		}
		return dragOptions;
	}
	,unregisterDraggable: function(component) {
		if(!this.isRegisteredDraggable(component)) {
			return;
		}
		var dragOptions = this.getDragOptions(component);
		if(dragOptions != null && dragOptions.mouseTarget != null) {
			dragOptions.mouseTarget.unregisterEvent("mousedown",$bind(this,this.onMouseDown));
			this._mouseTargetToDragTarget.remove(dragOptions.mouseTarget);
		}
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mouseup",$bind(this,this.onScreenMouseUp));
		this._dragComponents.remove(component);
	}
	,isRegisteredDraggable: function(component) {
		return this._dragComponents.h.__keys__[component.__id__] != null;
	}
	,onMouseDown: function(e) {
		this._currentComponent = this._mouseTargetToDragTarget.h[e.target.__id__];
		if(this._currentComponent.parentComponent == null) {
			e.screenX *= haxe_ui_Toolkit.get_scaleX();
			e.screenY *= haxe_ui_Toolkit.get_scaleY();
		}
		this._currentOptions = this.getDragOptions(this._currentComponent);
		this._mouseOffset = new haxe_ui_geom_Point(e.screenX - this._currentComponent.get_left(),e.screenY - this._currentComponent.get_top());
		haxe_ui_core_Screen.get_instance().registerEvent("mouseup",$bind(this,this.onScreenMouseUp));
		haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
	}
	,onScreenCheckForDrag: function(e) {
		if(this._currentComponent.parentComponent == null) {
			e.screenX *= haxe_ui_Toolkit.get_scaleX();
			e.screenY *= haxe_ui_Toolkit.get_scaleY();
		}
		var x1 = e.screenX - this._currentComponent.get_left();
		var y1 = e.screenY - this._currentComponent.get_top();
		var x2 = this._mouseOffset.x;
		var y2 = this._mouseOffset.y;
		if(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) > this._currentOptions.dragTolerance) {
			haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
			haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenDrag));
			this._mouseOffset.x -= this._currentOptions.dragOffsetX;
			this._mouseOffset.y -= this._currentOptions.dragOffsetY;
			if(this._currentOptions.draggingStyleName != null) {
				this._currentComponent.addClass(this._currentOptions.draggingStyleName);
			}
			this._currentComponent.dispatch(new haxe_ui_events_DragEvent("dragstart"));
		}
	}
	,onScreenDrag: function(e) {
		if(this._currentComponent.parentComponent == null) {
			e.screenX *= haxe_ui_Toolkit.get_scaleX();
			e.screenY *= haxe_ui_Toolkit.get_scaleY();
		}
		var event = new haxe_ui_events_DragEvent("drag");
		if(this._currentOptions.dragBounds != null) {
			var v = e.screenX;
			var min = this._currentOptions.dragBounds.left + this._mouseOffset.x;
			var max = this._currentOptions.dragBounds.get_right() - this._currentComponent.get_width() + this._mouseOffset.x;
			var boundX;
			if(v == null || isNaN(v)) {
				boundX = min;
			} else {
				if(min != null && v < min) {
					v = min;
				} else if(max != null && v > max) {
					v = max;
				}
				boundX = v;
			}
			var v = e.screenY;
			var min = this._currentOptions.dragBounds.top + this._mouseOffset.y;
			var max = this._currentOptions.dragBounds.get_bottom() - this._currentComponent.get_height() + this._mouseOffset.y;
			var boundY;
			if(v == null || isNaN(v)) {
				boundY = min;
			} else {
				if(min != null && v < min) {
					v = min;
				} else if(max != null && v > max) {
					v = max;
				}
				boundY = v;
			}
			event.left = boundX - this._mouseOffset.x;
			event.top = boundY - this._mouseOffset.y;
		} else {
			var xpos = e.screenX;
			var ypos = e.screenY;
			event.left = xpos - this._mouseOffset.x;
			event.top = ypos - this._mouseOffset.y;
		}
		this._currentComponent.dispatch(event);
		if(event.canceled == true) {
			return;
		}
		this._currentComponent.moveComponent(event.left,event.top);
	}
	,onScreenMouseUp: function(e) {
		if(this._currentOptions.draggingStyleName != null) {
			this._currentComponent.removeClass(this._currentOptions.draggingStyleName);
		}
		this._currentComponent.dispatch(new haxe_ui_events_DragEvent("dragend"));
		this._currentComponent = null;
		this._currentOptions = null;
		this._mouseOffset.x = 0;
		this._mouseOffset.y = 0;
		haxe_ui_core_Screen.get_instance().unregisterEvent("mouseup",$bind(this,this.onScreenMouseUp));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenCheckForDrag));
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenDrag));
	}
	,__class__: haxe_ui_dragdrop_DragManager
};
var haxe_ui_events_UIEvent = function(type,bubble,data) {
	if(bubble == null) {
		bubble = false;
	}
	this.relatedEvent = null;
	this.type = type;
	this.bubble = bubble;
	this.data = data;
	this.canceled = false;
};
$hxClasses["haxe.ui.events.UIEvent"] = haxe_ui_events_UIEvent;
haxe_ui_events_UIEvent.__name__ = "haxe.ui.events.UIEvent";
haxe_ui_events_UIEvent.__super__ = haxe_ui_backend_EventImpl;
haxe_ui_events_UIEvent.prototype = $extend(haxe_ui_backend_EventImpl.prototype,{
	bubble: null
	,type: null
	,target: null
	,data: null
	,canceled: null
	,relatedEvent: null
	,value: null
	,previousValue: null
	,cancel: function() {
		haxe_ui_backend_EventImpl.prototype.cancel.call(this);
		this.canceled = true;
	}
	,clone: function() {
		var c = new haxe_ui_events_UIEvent(this.type);
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.value = this.value;
		c.previousValue = this.previousValue;
		c.canceled = this.canceled;
		c.relatedEvent = this.relatedEvent;
		this.postClone(c);
		return c;
	}
	,copyFrom: function(c) {
	}
	,__class__: haxe_ui_events_UIEvent
});
var haxe_ui_events_ActionEvent = function(type,action,bubble,data) {
	if(bubble == null) {
		bubble = false;
	}
	this.repeater = false;
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
	this.action = action;
};
$hxClasses["haxe.ui.events.ActionEvent"] = haxe_ui_events_ActionEvent;
haxe_ui_events_ActionEvent.__name__ = "haxe.ui.events.ActionEvent";
haxe_ui_events_ActionEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ActionEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	action: null
	,repeater: null
	,clone: function() {
		var c = new haxe_ui_events_ActionEvent(this.type,this.action);
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.canceled = this.canceled;
		c.relatedEvent = this.relatedEvent;
		c.action = this.action;
		c.repeater = this.repeater;
		this.postClone(c);
		return c;
	}
	,copyFrom: function(e) {
		var ae = js_Boot.__cast(e , haxe_ui_events_ActionEvent);
		this.action = ae.action;
		this.repeater = ae.repeater;
	}
	,__class__: haxe_ui_events_ActionEvent
});
var haxe_ui_events_AnimationEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.AnimationEvent"] = haxe_ui_events_AnimationEvent;
haxe_ui_events_AnimationEvent.__name__ = "haxe.ui.events.AnimationEvent";
haxe_ui_events_AnimationEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_AnimationEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	currentTime: null
	,delta: null
	,position: null
	,clone: function() {
		var c = new haxe_ui_events_AnimationEvent(this.type);
		c.currentTime = this.currentTime;
		c.delta = this.delta;
		c.position = this.position;
		return c;
	}
	,__class__: haxe_ui_events_AnimationEvent
});
var haxe_ui_events_DragEvent = function(type,bubble,data) {
	this.top = 0;
	this.left = 0;
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
};
$hxClasses["haxe.ui.events.DragEvent"] = haxe_ui_events_DragEvent;
haxe_ui_events_DragEvent.__name__ = "haxe.ui.events.DragEvent";
haxe_ui_events_DragEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_DragEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	left: null
	,top: null
	,clone: function() {
		var c = new haxe_ui_events_DragEvent(this.type);
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.canceled = this.canceled;
		c.left = this.left;
		c.top = this.top;
		this.postClone(c);
		return c;
	}
	,copyFrom: function(c) {
		var d = js_Boot.__cast(c , haxe_ui_events_DragEvent);
		this.left = d.left;
		this.top = d.top;
	}
	,__class__: haxe_ui_events_DragEvent
});
var haxe_ui_events_FocusEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.FocusEvent"] = haxe_ui_events_FocusEvent;
haxe_ui_events_FocusEvent.__name__ = "haxe.ui.events.FocusEvent";
haxe_ui_events_FocusEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_FocusEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_FocusEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_FocusEvent
});
var haxe_ui_events_ItemEvent = function(type,bubble,data) {
	this.itemIndex = -1;
	this.sourceEvent = null;
	this.source = null;
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
};
$hxClasses["haxe.ui.events.ItemEvent"] = haxe_ui_events_ItemEvent;
haxe_ui_events_ItemEvent.__name__ = "haxe.ui.events.ItemEvent";
haxe_ui_events_ItemEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ItemEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	source: null
	,sourceEvent: null
	,itemIndex: null
	,clone: function() {
		var c = new haxe_ui_events_ItemEvent(this.type);
		c.source = this.source;
		c.sourceEvent = this.sourceEvent;
		c.itemIndex = this.itemIndex;
		c.type = this.type;
		c.bubble = this.bubble;
		c.target = this.target;
		c.data = this.data;
		c.canceled = this.canceled;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ItemEvent
});
var haxe_ui_events_KeyboardEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.KeyboardEvent"] = haxe_ui_events_KeyboardEvent;
haxe_ui_events_KeyboardEvent.__name__ = "haxe.ui.events.KeyboardEvent";
haxe_ui_events_KeyboardEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_KeyboardEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	keyCode: null
	,altKey: null
	,ctrlKey: null
	,shiftKey: null
	,clone: function() {
		var c = new haxe_ui_events_KeyboardEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.keyCode = this.keyCode;
		c.altKey = this.altKey;
		c.ctrlKey = this.ctrlKey;
		c.shiftKey = this.shiftKey;
		return c;
	}
	,__class__: haxe_ui_events_KeyboardEvent
});
var haxe_ui_events_MouseEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.MouseEvent"] = haxe_ui_events_MouseEvent;
haxe_ui_events_MouseEvent.__name__ = "haxe.ui.events.MouseEvent";
haxe_ui_events_MouseEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_MouseEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	screenX: null
	,screenY: null
	,buttonDown: null
	,delta: null
	,touchEvent: null
	,ctrlKey: null
	,shiftKey: null
	,localX: null
	,get_localX: function() {
		if(this.target == null) {
			return null;
		}
		return (this.screenX * haxe_ui_Toolkit.get_scaleX() - this.target.get_screenLeft()) / haxe_ui_Toolkit.get_scaleX();
	}
	,localY: null
	,get_localY: function() {
		if(this.target == null) {
			return null;
		}
		return (this.screenY * haxe_ui_Toolkit.get_scaleY() - this.target.get_screenTop()) / haxe_ui_Toolkit.get_scaleY();
	}
	,clone: function() {
		var c = new haxe_ui_events_MouseEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		c.screenX = this.screenX;
		c.screenY = this.screenY;
		c.buttonDown = this.buttonDown;
		c.delta = this.delta;
		c.touchEvent = this.touchEvent;
		c.ctrlKey = this.ctrlKey;
		c.shiftKey = this.shiftKey;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_MouseEvent
	,__properties__: {get_localY:"get_localY",get_localX:"get_localX"}
});
var haxe_ui_events_ScrollEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.ScrollEvent"] = haxe_ui_events_ScrollEvent;
haxe_ui_events_ScrollEvent.__name__ = "haxe.ui.events.ScrollEvent";
haxe_ui_events_ScrollEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ScrollEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_ScrollEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ScrollEvent
});
var haxe_ui_events_ThemeEvent = function(type,bubble,data) {
	haxe_ui_events_UIEvent.call(this,type,bubble,data);
};
$hxClasses["haxe.ui.events.ThemeEvent"] = haxe_ui_events_ThemeEvent;
haxe_ui_events_ThemeEvent.__name__ = "haxe.ui.events.ThemeEvent";
haxe_ui_events_ThemeEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ThemeEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	__class__: haxe_ui_events_ThemeEvent
});
var haxe_ui_events_ValidationEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.events.ValidationEvent"] = haxe_ui_events_ValidationEvent;
haxe_ui_events_ValidationEvent.__name__ = "haxe.ui.events.ValidationEvent";
haxe_ui_events_ValidationEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_events_ValidationEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_events_ValidationEvent(this.type);
		c.type = this.type;
		c.target = this.target;
		this.postClone(c);
		return c;
	}
	,__class__: haxe_ui_events_ValidationEvent
});
var haxe_ui_filters_Filter = function() {
};
$hxClasses["haxe.ui.filters.Filter"] = haxe_ui_filters_Filter;
haxe_ui_filters_Filter.__name__ = "haxe.ui.filters.Filter";
haxe_ui_filters_Filter.prototype = {
	__class__: haxe_ui_filters_Filter
};
var haxe_ui_filters_Blur = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Blur"] = haxe_ui_filters_Blur;
haxe_ui_filters_Blur.__name__ = "haxe.ui.filters.Blur";
haxe_ui_filters_Blur.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Blur.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	amount: null
	,__class__: haxe_ui_filters_Blur
});
var haxe_ui_filters_DropShadow = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.DropShadow"] = haxe_ui_filters_DropShadow;
haxe_ui_filters_DropShadow.__name__ = "haxe.ui.filters.DropShadow";
haxe_ui_filters_DropShadow.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_DropShadow.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	distance: null
	,angle: null
	,color: null
	,alpha: null
	,blurX: null
	,blurY: null
	,strength: null
	,quality: null
	,inner: null
	,__class__: haxe_ui_filters_DropShadow
});
var haxe_ui_filters_FilterParser = function() { };
$hxClasses["haxe.ui.filters.FilterParser"] = haxe_ui_filters_FilterParser;
haxe_ui_filters_FilterParser.__name__ = "haxe.ui.filters.FilterParser";
haxe_ui_filters_FilterParser.parseFilter = function(filterDetails) {
	var filter = null;
	if(filterDetails[0] == "drop-shadow") {
		filter = haxe_ui_filters_FilterParser.parseDropShadow(filterDetails);
	} else if(filterDetails[0] == "blur") {
		filter = haxe_ui_filters_FilterParser.parseBlur(filterDetails);
	} else if(filterDetails[0] == "outline") {
		filter = haxe_ui_filters_FilterParser.parseOutline(filterDetails);
	} else if(filterDetails[0] == "grayscale") {
		filter = haxe_ui_filters_FilterParser.parseGrayscale(filterDetails);
	}
	return filter;
};
haxe_ui_filters_FilterParser.parseDropShadow = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var dropShadow = new haxe_ui_filters_DropShadow();
	dropShadow.distance = copy[0];
	dropShadow.angle = copy[1];
	dropShadow.color = copy[2];
	dropShadow.alpha = copy[3];
	dropShadow.blurX = copy[4];
	dropShadow.blurY = copy[5];
	dropShadow.strength = copy[6];
	dropShadow.quality = copy[7];
	dropShadow.inner = copy[8];
	return dropShadow;
};
haxe_ui_filters_FilterParser.parseBlur = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var blur = new haxe_ui_filters_Blur();
	blur.amount = copy[0];
	return blur;
};
haxe_ui_filters_FilterParser.parseOutline = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var outline = new haxe_ui_filters_Outline();
	outline.color = copy[0];
	outline.size = copy[1];
	return outline;
};
haxe_ui_filters_FilterParser.copyFilterDefaults = function(filterName,params) {
	var copy = [];
	var defaultParams = haxe_ui_filters_FilterParser.filterParamDefaults.h[filterName];
	if(defaultParams != null) {
		var _g = 0;
		while(_g < defaultParams.length) {
			var p = defaultParams[_g];
			++_g;
			copy.push(p);
		}
	}
	if(params != null) {
		var n = 0;
		var _g = 0;
		while(_g < params.length) {
			var p = params[_g];
			++_g;
			copy[n] = p;
			++n;
		}
	}
	return copy;
};
haxe_ui_filters_FilterParser.parseGrayscale = function(filterDetails) {
	if(filterDetails == null || filterDetails.length == 0) {
		return null;
	}
	var copy = filterDetails.slice();
	haxe_ui_filters_FilterParser.buildDefaults();
	var filterName = copy[0];
	HxOverrides.remove(copy,filterName);
	copy = haxe_ui_filters_FilterParser.copyFilterDefaults(filterName,copy);
	var grayscale = new haxe_ui_filters_Grayscale();
	grayscale.amount = copy[0];
	return grayscale;
};
haxe_ui_filters_FilterParser.buildDefaults = function() {
	if(haxe_ui_filters_FilterParser.filterParamDefaults != null) {
		return;
	}
	haxe_ui_filters_FilterParser.filterParamDefaults = new haxe_ds_StringMap();
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["drop-shadow"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["drop-shadow"].concat([4,45,0,1,4,4,1,1,false,false,false]);
	this1.h["drop-shadow"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["blur"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["blur"].concat([1]);
	this1.h["blur"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["outline"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["outline"].concat([0,1]);
	this1.h["outline"] = v;
	var v = [];
	haxe_ui_filters_FilterParser.filterParamDefaults.h["grayscale"] = v;
	var this1 = haxe_ui_filters_FilterParser.filterParamDefaults;
	var v = haxe_ui_filters_FilterParser.filterParamDefaults.h["grayscale"].concat([100]);
	this1.h["grayscale"] = v;
};
var haxe_ui_filters_Grayscale = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Grayscale"] = haxe_ui_filters_Grayscale;
haxe_ui_filters_Grayscale.__name__ = "haxe.ui.filters.Grayscale";
haxe_ui_filters_Grayscale.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Grayscale.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	amount: null
	,__class__: haxe_ui_filters_Grayscale
});
var haxe_ui_filters_Outline = function() {
	haxe_ui_filters_Filter.call(this);
};
$hxClasses["haxe.ui.filters.Outline"] = haxe_ui_filters_Outline;
haxe_ui_filters_Outline.__name__ = "haxe.ui.filters.Outline";
haxe_ui_filters_Outline.__super__ = haxe_ui_filters_Filter;
haxe_ui_filters_Outline.prototype = $extend(haxe_ui_filters_Filter.prototype,{
	color: null
	,size: null
	,__class__: haxe_ui_filters_Outline
});
var haxe_ui_focus_IFocusApplicator = function() { };
$hxClasses["haxe.ui.focus.IFocusApplicator"] = haxe_ui_focus_IFocusApplicator;
haxe_ui_focus_IFocusApplicator.__name__ = "haxe.ui.focus.IFocusApplicator";
haxe_ui_focus_IFocusApplicator.__isInterface__ = true;
haxe_ui_focus_IFocusApplicator.prototype = {
	get_enabled: null
	,set_enabled: null
	,apply: null
	,unapply: null
	,__class__: haxe_ui_focus_IFocusApplicator
	,__properties__: {set_enabled:"set_enabled",get_enabled:"get_enabled"}
};
var haxe_ui_focus_FocusApplicator = function() {
	this._enabled = true;
};
$hxClasses["haxe.ui.focus.FocusApplicator"] = haxe_ui_focus_FocusApplicator;
haxe_ui_focus_FocusApplicator.__name__ = "haxe.ui.focus.FocusApplicator";
haxe_ui_focus_FocusApplicator.__interfaces__ = [haxe_ui_focus_IFocusApplicator];
haxe_ui_focus_FocusApplicator.prototype = {
	apply: function(target) {
	}
	,unapply: function(target) {
	}
	,_enabled: null
	,set_enabled: function(value) {
		this._enabled = value;
		return value;
	}
	,get_enabled: function() {
		return this._enabled;
	}
	,__class__: haxe_ui_focus_FocusApplicator
	,__properties__: {set_enabled:"set_enabled",get_enabled:"get_enabled"}
};
var haxe_ui_focus_FocusManager = function() {
	this._lastFocuses = new haxe_ds_ObjectMap();
	this._applicators = [];
	this.enabled = true;
	this.autoFocus = true;
	haxe_ui_backend_FocusManagerImpl.call(this);
	this._applicators.push(new haxe_ui_focus_StyleFocusApplicator());
};
$hxClasses["haxe.ui.focus.FocusManager"] = haxe_ui_focus_FocusManager;
haxe_ui_focus_FocusManager.__name__ = "haxe.ui.focus.FocusManager";
haxe_ui_focus_FocusManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_focus_FocusManager.get_instance = function() {
	if(haxe_ui_focus_FocusManager._instance == null) {
		haxe_ui_focus_FocusManager._instance = new haxe_ui_focus_FocusManager();
	}
	return haxe_ui_focus_FocusManager._instance;
};
haxe_ui_focus_FocusManager.__super__ = haxe_ui_backend_FocusManagerImpl;
haxe_ui_focus_FocusManager.prototype = $extend(haxe_ui_backend_FocusManagerImpl.prototype,{
	autoFocus: null
	,enabled: null
	,_applicators: null
	,pushView: function(view) {
		if(this.hasFocusableItem(view)) {
			var k = this._lastFocuses.keys();
			while(k.hasNext()) {
				var k1 = k.next();
				this._lastFocuses.h[k1.__id__].set_focus(false);
				this.unapplyFocus(this._lastFocuses.h[k1.__id__]);
			}
		}
		if(this.autoFocus == true) {
			this.focusOnFirstInteractive(view);
			view.registerEvent("ready",$bind(this,this.onViewReady));
		}
	}
	,onViewReady: function(e) {
		e.target.unregisterEvent("ready",$bind(this,this.onViewReady));
		if(this.hasFocusableItem(e.target)) {
			var k = this._lastFocuses.keys();
			while(k.hasNext()) {
				var k1 = k.next();
				this._lastFocuses.h[k1.__id__].set_focus(false);
				this.unapplyFocus(this._lastFocuses.h[k1.__id__]);
			}
			this.focusOnFirstInteractive(e.target);
		}
	}
	,hasFocusableItem: function(view) {
		var list = [];
		this.buildFocusableList(view,list);
		return list.length != 0;
	}
	,focusOnFirstInteractive: function(view) {
		var list = [];
		this.buildFocusableList(view,list);
		if(list.length > 0) {
			list[0].set_focus(true);
			return list[0];
		}
		return null;
	}
	,removeView: function(view) {
		this._lastFocuses.remove(view);
		var top = haxe_ui_core_Screen.get_instance().get_topComponent();
		if(top == null) {
			return;
		}
		if(this._lastFocuses.h.__keys__[top.__id__] != null) {
			this.set_focus(this._lastFocuses.h[top.__id__]);
		}
	}
	,get_focus: function() {
		var top = haxe_ui_core_Screen.get_instance().get_topComponent();
		if(top == null) {
			return null;
		}
		return this.buildFocusableList(top,null);
	}
	,_lastFocuses: null
	,set_focus: function(value) {
		if(value != null) {
			var c = js_Boot.__cast(value , haxe_ui_core_Component);
			var root = c.get_rootComponent();
			var currentFocus = this.buildFocusableList(root,null);
			if(currentFocus != null && currentFocus != value) {
				this.unapplyFocus(currentFocus);
				currentFocus.set_focus(false);
			}
			if(this._lastFocuses.h.__keys__[root.__id__] != null && this._lastFocuses.h[root.__id__] != value) {
				this._lastFocuses.h[root.__id__].set_focus(false);
				this.unapplyFocus(this._lastFocuses.h[root.__id__]);
			}
			this._lastFocuses.set(root,value);
			this.applyFocus(value);
		} else {
			var top = haxe_ui_core_Screen.get_instance().get_topComponent();
			if(this._lastFocuses.h.__keys__[top.__id__] != null) {
				this._lastFocuses.h[top.__id__].set_focus(false);
				this.unapplyFocus(this._lastFocuses.h[top.__id__]);
			}
		}
		return value;
	}
	,focusNext: function() {
		var top = haxe_ui_core_Screen.get_instance().get_topComponent();
		var list = [];
		var currentFocus = this.buildFocusableList(top,list);
		var index = -1;
		if(currentFocus != null) {
			index = list.indexOf(currentFocus);
		}
		var nextIndex = index + 1;
		if(nextIndex > list.length - 1) {
			nextIndex = 0;
		}
		var nextFocus = list[nextIndex];
		this.set_focus(nextFocus);
		return nextFocus;
	}
	,focusPrev: function() {
		var top = haxe_ui_core_Screen.get_instance().get_topComponent();
		var list = [];
		var currentFocus = this.buildFocusableList(top,list);
		var index = -1;
		if(currentFocus != null) {
			index = list.indexOf(currentFocus);
		}
		var prevIndex = index - 1;
		if(prevIndex < 0) {
			prevIndex = list.length - 1;
		}
		var prevFocus = list[prevIndex];
		this.set_focus(prevFocus);
		return prevFocus;
	}
	,buildFocusableList: function(c,list) {
		if(!this.enabled) {
			return null;
		}
		var currentFocus = null;
		if(c._isDisposed == true) {
			return null;
		}
		if(c.get_hidden() == true) {
			return null;
		}
		if(js_Boot.__implements(c,haxe_ui_focus_IFocusable)) {
			var f = c;
			if(f.get_allowFocus() == true && f.get_disabled() == false) {
				if(f.get_focus() == true) {
					currentFocus = f;
				}
				if(list != null) {
					list.push(f);
				}
			}
		}
		var childList = (c._children == null ? [] : c._children).slice();
		childList.sort(function(c1,c2) {
			return c1.componentTabIndex - c2.componentTabIndex;
		});
		var _g = 0;
		while(_g < childList.length) {
			var child = childList[_g];
			++_g;
			var f = this.buildFocusableList(child,list);
			if(f != null) {
				currentFocus = f;
			}
		}
		return currentFocus;
	}
	,applyFocus: function(c) {
		haxe_ui_backend_FocusManagerImpl.prototype.applyFocus.call(this,c);
		(js_Boot.__cast(c , haxe_ui_focus_IFocusable)).set_focus(true);
		var _g = 0;
		var _g1 = this._applicators;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.get_enabled() == true) {
				a.apply(c);
			}
		}
	}
	,unapplyFocus: function(c) {
		haxe_ui_backend_FocusManagerImpl.prototype.unapplyFocus.call(this,c);
		(js_Boot.__cast(c , haxe_ui_focus_IFocusable)).set_focus(false);
		var _g = 0;
		var _g1 = this._applicators;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.get_enabled() == true) {
				a.unapply(c);
			}
		}
	}
	,__class__: haxe_ui_focus_FocusManager
	,__properties__: {set_focus:"set_focus",get_focus:"get_focus"}
});
var haxe_ui_focus_StyleFocusApplicator = function() {
	haxe_ui_focus_FocusApplicator.call(this);
};
$hxClasses["haxe.ui.focus.StyleFocusApplicator"] = haxe_ui_focus_StyleFocusApplicator;
haxe_ui_focus_StyleFocusApplicator.__name__ = "haxe.ui.focus.StyleFocusApplicator";
haxe_ui_focus_StyleFocusApplicator.__super__ = haxe_ui_focus_FocusApplicator;
haxe_ui_focus_StyleFocusApplicator.prototype = $extend(haxe_ui_focus_FocusApplicator.prototype,{
	apply: function(target) {
		target.addClass(":active");
	}
	,unapply: function(target) {
		target.removeClass(":active");
	}
	,__class__: haxe_ui_focus_StyleFocusApplicator
});
var haxe_ui_geom_Point = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["haxe.ui.geom.Point"] = haxe_ui_geom_Point;
haxe_ui_geom_Point.__name__ = "haxe.ui.geom.Point";
haxe_ui_geom_Point.prototype = {
	x: null
	,y: null
	,__class__: haxe_ui_geom_Point
};
var haxe_ui_geom_Rectangle = function(left,top,width,height) {
	if(height == null) {
		height = 0;
	}
	if(width == null) {
		width = 0;
	}
	if(top == null) {
		top = 0;
	}
	if(left == null) {
		left = 0;
	}
	this._intersectionCache = null;
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.geom.Rectangle"] = haxe_ui_geom_Rectangle;
haxe_ui_geom_Rectangle.__name__ = "haxe.ui.geom.Rectangle";
haxe_ui_geom_Rectangle.prototype = {
	left: null
	,top: null
	,width: null
	,height: null
	,set: function(left,top,width,height) {
		if(height == null) {
			height = 0;
		}
		if(width == null) {
			width = 0;
		}
		if(top == null) {
			top = 0;
		}
		if(left == null) {
			left = 0;
		}
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
	,get_right: function() {
		return this.left + this.width;
	}
	,set_right: function(value) {
		this.width = value - this.left;
		return value;
	}
	,get_bottom: function() {
		return this.top + this.height;
	}
	,set_bottom: function(value) {
		this.height = value - this.top;
		return value;
	}
	,inflate: function(dx,dy) {
		this.left -= dx;
		this.width += dx * 2;
		this.top -= dy;
		this.height += dy * 2;
	}
	,equals: function(rc) {
		if(rc == null) {
			return false;
		}
		if(rc.left == this.left && rc.top == this.top && rc.width == this.width) {
			return rc.height == this.height;
		} else {
			return false;
		}
	}
	,containsPoint: function(x,y) {
		if(x >= this.left && x < this.left + this.width && y >= this.top && y < this.top + this.height) {
			return true;
		}
		return false;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) {
			if(rect.left > this.left && rect.top > this.top && rect.get_right() < this.get_right()) {
				return rect.get_bottom() < this.get_bottom();
			} else {
				return false;
			}
		} else if(rect.left >= this.left && rect.top >= this.top && rect.get_right() <= this.get_right()) {
			return rect.get_bottom() <= this.get_bottom();
		} else {
			return false;
		}
	}
	,intersects: function(rect) {
		var x0 = this.left < rect.left ? rect.left : this.left;
		var x1 = this.get_right() > rect.get_right() ? rect.get_right() : this.get_right();
		if(x1 <= x0) {
			return false;
		}
		var y0 = this.top < rect.top ? rect.top : this.top;
		var y1 = this.get_bottom() > rect.get_bottom() ? rect.get_bottom() : this.get_bottom();
		return y1 > y0;
	}
	,_intersectionCache: null
	,intersection: function(rect,noAlloc) {
		if(noAlloc == null) {
			noAlloc = true;
		}
		if(noAlloc == true && this._intersectionCache == null) {
			this._intersectionCache = new haxe_ui_geom_Rectangle();
		}
		var x0 = this.left < rect.left ? rect.left : this.left;
		var x1 = this.get_right() > rect.get_right() ? rect.get_right() : this.get_right();
		if(x1 <= x0) {
			if(noAlloc == true) {
				this._intersectionCache.set();
				return this._intersectionCache;
			} else {
				return new haxe_ui_geom_Rectangle();
			}
		}
		var y0 = this.top < rect.top ? rect.top : this.top;
		var y1 = this.get_bottom() > rect.get_bottom() ? rect.get_bottom() : this.get_bottom();
		if(y1 <= y0) {
			if(noAlloc == true) {
				this._intersectionCache.set();
				return this._intersectionCache;
			} else {
				return new haxe_ui_geom_Rectangle();
			}
		}
		var r = null;
		if(noAlloc == true) {
			r = this._intersectionCache;
		} else {
			r = new haxe_ui_geom_Rectangle();
		}
		r.set(x0,y0,x1 - x0,y1 - y0);
		return r;
	}
	,toInts: function() {
		this.left = this.left | 0;
		this.top = this.top | 0;
		this.width = this.width | 0;
		this.height = this.height | 0;
	}
	,copy: function() {
		return new haxe_ui_geom_Rectangle(this.left,this.top,this.width,this.height);
	}
	,toString: function() {
		return "{left: " + this.left + ", top: " + this.top + ", bottom: " + this.get_bottom() + ", right: " + this.get_right() + ", width: " + this.width + ", height: " + this.height + "}";
	}
	,__class__: haxe_ui_geom_Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right"}
};
var haxe_ui_geom_Size = function(width,height) {
	if(height == null) {
		height = 0;
	}
	if(width == null) {
		width = 0;
	}
	this.width = width;
	this.height = height;
};
$hxClasses["haxe.ui.geom.Size"] = haxe_ui_geom_Size;
haxe_ui_geom_Size.__name__ = "haxe.ui.geom.Size";
haxe_ui_geom_Size.prototype = {
	width: null
	,height: null
	,round: function() {
		this.width = Math.round(this.width);
		this.height = Math.round(this.height);
	}
	,toString: function() {
		return "[" + this.width + "x" + this.height + "]";
	}
	,__class__: haxe_ui_geom_Size
};
var haxe_ui_geom_Slice9 = function() { };
$hxClasses["haxe.ui.geom.Slice9"] = haxe_ui_geom_Slice9;
haxe_ui_geom_Slice9.__name__ = "haxe.ui.geom.Slice9";
haxe_ui_geom_Slice9.buildRects = function(w,h,bitmapWidth,bitmapHeight,slice) {
	var srcRects = haxe_ui_geom_Slice9.buildSrcRects(bitmapWidth,bitmapHeight,slice);
	var dstRects = haxe_ui_geom_Slice9.buildDstRects(w,h,srcRects);
	return { src : srcRects, dst : dstRects};
};
haxe_ui_geom_Slice9.buildSrcRects = function(bitmapWidth,bitmapHeight,slice) {
	var x1 = slice.left;
	var y1 = slice.top;
	var x2 = slice.get_right();
	var y2 = slice.get_bottom();
	var srcRects = [];
	srcRects.push(new haxe_ui_geom_Rectangle(0,0,x1,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,0,x2 - x1,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,0,bitmapWidth - x2,y1));
	srcRects.push(new haxe_ui_geom_Rectangle(0,y1,x1,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,y1,x2 - x1,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,y1,bitmapWidth - x2,y2 - y1));
	srcRects.push(new haxe_ui_geom_Rectangle(0,y2,x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_geom_Rectangle(x1,y2,x2 - x1,bitmapHeight - y2));
	srcRects.push(new haxe_ui_geom_Rectangle(x2,y2,bitmapWidth - x2,bitmapHeight - y2));
	return srcRects;
};
haxe_ui_geom_Slice9.buildDstRects = function(w,h,srcRects) {
	var dstRects = [];
	dstRects.push(new haxe_ui_geom_Rectangle(0,0,srcRects[0].width,srcRects[0].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[0].width,0,w - srcRects[0].width - srcRects[2].width,srcRects[1].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[2].width,0,srcRects[2].width,srcRects[2].height));
	dstRects.push(new haxe_ui_geom_Rectangle(0,srcRects[0].height,srcRects[3].width,h - srcRects[0].height - srcRects[6].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[3].width,srcRects[0].height,w - srcRects[3].width - srcRects[5].width,h - srcRects[1].height - srcRects[7].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[5].width,srcRects[2].height,srcRects[5].width,h - srcRects[2].height - srcRects[8].height));
	dstRects.push(new haxe_ui_geom_Rectangle(0,h - srcRects[6].height,srcRects[6].width,srcRects[6].height));
	dstRects.push(new haxe_ui_geom_Rectangle(srcRects[6].width,h - srcRects[7].height,w - srcRects[6].width - srcRects[8].width,srcRects[7].height));
	dstRects.push(new haxe_ui_geom_Rectangle(w - srcRects[8].width,h - srcRects[8].height,srcRects[8].width,srcRects[8].height));
	return dstRects;
};
var haxe_ui_graphics_ComponentGraphics = function(component) {
	haxe_ui_backend_ComponentGraphicsImpl.call(this,component);
};
$hxClasses["haxe.ui.graphics.ComponentGraphics"] = haxe_ui_graphics_ComponentGraphics;
haxe_ui_graphics_ComponentGraphics.__name__ = "haxe.ui.graphics.ComponentGraphics";
haxe_ui_graphics_ComponentGraphics.__super__ = haxe_ui_backend_ComponentGraphicsImpl;
haxe_ui_graphics_ComponentGraphics.prototype = $extend(haxe_ui_backend_ComponentGraphicsImpl.prototype,{
	__class__: haxe_ui_graphics_ComponentGraphics
});
var haxe_ui_graphics_DrawCommand = $hxEnums["haxe.ui.graphics.DrawCommand"] = { __ename__:true,__constructs__:null
	,Clear: {_hx_name:"Clear",_hx_index:0,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}
	,SetPixel: ($_=function(x,y,color) { return {_hx_index:1,x:x,y:y,color:color,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="SetPixel",$_.__params__ = ["x","y","color"],$_)
	,SetPixels: ($_=function(pixels) { return {_hx_index:2,pixels:pixels,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="SetPixels",$_.__params__ = ["pixels"],$_)
	,MoveTo: ($_=function(x,y) { return {_hx_index:3,x:x,y:y,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="MoveTo",$_.__params__ = ["x","y"],$_)
	,LineTo: ($_=function(x,y) { return {_hx_index:4,x:x,y:y,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="LineTo",$_.__params__ = ["x","y"],$_)
	,StrokeStyle: ($_=function(color,thickness,alpha) { return {_hx_index:5,color:color,thickness:thickness,alpha:alpha,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="StrokeStyle",$_.__params__ = ["color","thickness","alpha"],$_)
	,Circle: ($_=function(x,y,radius) { return {_hx_index:6,x:x,y:y,radius:radius,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="Circle",$_.__params__ = ["x","y","radius"],$_)
	,FillStyle: ($_=function(color,alpha) { return {_hx_index:7,color:color,alpha:alpha,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="FillStyle",$_.__params__ = ["color","alpha"],$_)
	,CurveTo: ($_=function(controlX,controlY,anchorX,anchorY) { return {_hx_index:8,controlX:controlX,controlY:controlY,anchorX:anchorX,anchorY:anchorY,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="CurveTo",$_.__params__ = ["controlX","controlY","anchorX","anchorY"],$_)
	,CubicCurveTo: ($_=function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { return {_hx_index:9,controlX1:controlX1,controlY1:controlY1,controlX2:controlX2,controlY2:controlY2,anchorX:anchorX,anchorY:anchorY,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="CubicCurveTo",$_.__params__ = ["controlX1","controlY1","controlX2","controlY2","anchorX","anchorY"],$_)
	,Rectangle: ($_=function(x,y,width,height) { return {_hx_index:10,x:x,y:y,width:width,height:height,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="Rectangle",$_.__params__ = ["x","y","width","height"],$_)
	,Image: ($_=function(resource,x,y,width,height) { return {_hx_index:11,resource:resource,x:x,y:y,width:width,height:height,__enum__:"haxe.ui.graphics.DrawCommand",toString:$estr}; },$_._hx_name="Image",$_.__params__ = ["resource","x","y","width","height"],$_)
};
haxe_ui_graphics_DrawCommand.__constructs__ = [haxe_ui_graphics_DrawCommand.Clear,haxe_ui_graphics_DrawCommand.SetPixel,haxe_ui_graphics_DrawCommand.SetPixels,haxe_ui_graphics_DrawCommand.MoveTo,haxe_ui_graphics_DrawCommand.LineTo,haxe_ui_graphics_DrawCommand.StrokeStyle,haxe_ui_graphics_DrawCommand.Circle,haxe_ui_graphics_DrawCommand.FillStyle,haxe_ui_graphics_DrawCommand.CurveTo,haxe_ui_graphics_DrawCommand.CubicCurveTo,haxe_ui_graphics_DrawCommand.Rectangle,haxe_ui_graphics_DrawCommand.Image];
var haxe_ui_layouts_AbsoluteLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
};
$hxClasses["haxe.ui.layouts.AbsoluteLayout"] = haxe_ui_layouts_AbsoluteLayout;
haxe_ui_layouts_AbsoluteLayout.__name__ = "haxe.ui.layouts.AbsoluteLayout";
haxe_ui_layouts_AbsoluteLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_AbsoluteLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
	}
	,__class__: haxe_ui_layouts_AbsoluteLayout
});
var haxe_ui_layouts_DelegateLayout = function(size) {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._size = size;
};
$hxClasses["haxe.ui.layouts.DelegateLayout"] = haxe_ui_layouts_DelegateLayout;
haxe_ui_layouts_DelegateLayout.__name__ = "haxe.ui.layouts.DelegateLayout";
haxe_ui_layouts_DelegateLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_DelegateLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	_size: null
	,calcAutoSize: function(exclusions) {
		this._size.component = this.get_component();
		var cx = this._size.get_width();
		var cy = this._size.get_height();
		if(this._size.getBool("includePadding",false) == true) {
			cx += this.get_paddingLeft() + this.get_paddingRight();
			cy += this.get_paddingTop() + this.get_paddingBottom();
		}
		var size = new haxe_ui_geom_Size(cx,cy);
		return size;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		this._size.component = this.get_component();
		size.width -= this._size.get_usableWidthModifier();
		size.height -= this._size.get_usableHeightModifier();
		return size;
	}
	,__class__: haxe_ui_layouts_DelegateLayout
});
var haxe_ui_layouts_DelegateLayoutSize = function() {
};
$hxClasses["haxe.ui.layouts.DelegateLayoutSize"] = haxe_ui_layouts_DelegateLayoutSize;
haxe_ui_layouts_DelegateLayoutSize.__name__ = "haxe.ui.layouts.DelegateLayoutSize";
haxe_ui_layouts_DelegateLayoutSize.prototype = {
	component: null
	,config: null
	,width: null
	,get_width: function() {
		return 0;
	}
	,height: null
	,get_height: function() {
		return 0;
	}
	,usableWidthModifier: null
	,get_usableWidthModifier: function() {
		return 0;
	}
	,usableHeightModifier: null
	,get_usableHeightModifier: function() {
		return 0;
	}
	,getString: function(name,defaultValue) {
		if(this.config == null) {
			return defaultValue;
		}
		if(Object.prototype.hasOwnProperty.call(this.config.h,name) == false) {
			return defaultValue;
		}
		return this.config.h[name];
	}
	,getInt: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = 0;
		}
		var v = this.getString(name);
		if(v == null) {
			return defaultValue;
		}
		return Std.parseInt(v);
	}
	,getBool: function(name,defaultValue) {
		if(defaultValue == null) {
			defaultValue = false;
		}
		var v = this.getString(name);
		if(v == null) {
			return defaultValue;
		}
		return v == "true";
	}
	,__class__: haxe_ui_layouts_DelegateLayoutSize
	,__properties__: {get_usableHeightModifier:"get_usableHeightModifier",get_usableWidthModifier:"get_usableWidthModifier",get_height:"get_height",get_width:"get_width"}
};
var haxe_ui_layouts_HorizontalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._calcFullWidths = true;
	this._roundFullWidths = true;
};
$hxClasses["haxe.ui.layouts.HorizontalLayout"] = haxe_ui_layouts_HorizontalLayout;
haxe_ui_layouts_HorizontalLayout.__name__ = "haxe.ui.layouts.HorizontalLayout";
haxe_ui_layouts_HorizontalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_HorizontalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var xpos = this.get_paddingLeft();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var ypos = 0;
			switch(this.verticalAlign(child)) {
			case "bottom":
				if(child.get_componentHeight() < this.get_component().get_componentHeight()) {
					ypos = this.get_component().get_componentHeight() - (child.get_componentHeight() + this.get_paddingBottom() + this.marginTop(child));
				}
				break;
			case "center":
				ypos = (this.get_component().get_componentHeight() - child.get_componentHeight()) / 2 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				ypos = this.get_paddingTop() + this.marginTop(child);
			}
			child.moveComponent(xpos + this.marginLeft(child),ypos);
			xpos += child.get_componentWidth() + this.get_horizontalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
				continue;
			}
			if(child.get_componentWidth() > 0 && (child.get_percentWidth() == null || this.fixedMinWidth(child) == true)) {
				size.width -= child.get_componentWidth() + this.marginLeft(child) + this.marginRight(child);
			}
		}
		if(visibleChildren > 1) {
			size.width -= this.get_horizontalSpacing() * (visibleChildren - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		return size;
	}
	,__class__: haxe_ui_layouts_HorizontalLayout
});
var haxe_ui_layouts_HorizontalContinuousLayout = function() {
	haxe_ui_layouts_HorizontalLayout.call(this);
};
$hxClasses["haxe.ui.layouts.HorizontalContinuousLayout"] = haxe_ui_layouts_HorizontalContinuousLayout;
haxe_ui_layouts_HorizontalContinuousLayout.__name__ = "haxe.ui.layouts.HorizontalContinuousLayout";
haxe_ui_layouts_HorizontalContinuousLayout.__super__ = haxe_ui_layouts_HorizontalLayout;
haxe_ui_layouts_HorizontalContinuousLayout.prototype = $extend(haxe_ui_layouts_HorizontalLayout.prototype,{
	resizeChildren: function() {
	}
	,repositionChildren: function() {
		if(this.get_component().get_autoWidth() == true) {
			haxe_ui_layouts_HorizontalLayout.prototype.repositionChildren.call(this);
			return;
		}
		var ucx = this.get_usableWidth();
		if(ucx <= 0) {
			return;
		}
		var ucx = this.get_component().get_componentWidth() - (this.get_paddingLeft() + this.get_paddingRight());
		var ucy = this.get_component().get_componentHeight() - (this.get_paddingTop() + this.get_paddingBottom());
		var dimensions = [];
		var heights = [];
		var row = 0;
		var usedCX = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var rowCY = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var rc = new haxe_ui_layouts_ComponentRectangle(child.get_left(),child.get_top(),child.get_componentWidth(),child.get_componentHeight());
			if(child.get_percentWidth() != null) {
				rc.width = ucx * child.get_percentWidth() / 100;
			} else {
				usedCX += this.get_horizontalSpacing();
			}
			if(child.get_percentHeight() != null) {
				rc.height = ucy * child.get_percentHeight() / 100;
			}
			rc.component = child;
			usedCX += rc.width;
			if(usedCX - this.get_horizontalSpacing() > ucx) {
				heights.push(rowCY);
				ypos += rowCY + this.get_verticalSpacing();
				xpos = this.get_paddingLeft();
				usedCX = rc.width + this.get_horizontalSpacing();
				rowCY = 0;
				++row;
			}
			if(dimensions.length <= row) {
				dimensions.push([]);
			}
			if(dimensions[row] == null) {
				ypos -= this.get_verticalSpacing();
				--row;
				dimensions[row].pop();
			}
			rc.left = xpos;
			rc.top = ypos;
			dimensions[row].push(rc);
			xpos += rc.width;
			if(rc.height > rowCY) {
				rowCY = rc.height;
			}
		}
		if(rowCY > 0) {
			heights.push(rowCY);
		}
		var x = 0;
		var _g = 0;
		while(_g < dimensions.length) {
			var r = dimensions[_g];
			++_g;
			var height = heights[x];
			var spaceX = (r.length - 1) / r.length * this.get_horizontalSpacing();
			var n = 0;
			var _g1 = 0;
			while(_g1 < r.length) {
				var c = r[_g1];
				++_g1;
				switch(this.verticalAlign(c.component)) {
				case "bottom":
					c.top += height - c.height;
					break;
				case "center":
					c.top += height / 2 - c.height / 2;
					break;
				default:
				}
				if(c.component.get_percentWidth() != null) {
					c.left += n * (this.get_horizontalSpacing() - spaceX);
					c.width -= spaceX;
				} else {
					c.left += n * this.get_horizontalSpacing();
				}
				c.apply();
				++n;
			}
			++x;
		}
	}
	,get_usableSize: function() {
		if(this.get_component().get_autoWidth() == true) {
			return haxe_ui_layouts_HorizontalLayout.prototype.get_usableSize.call(this);
		}
		var ucx = 0;
		if(this._component.get_componentWidth() != null) {
			ucx = this._component.get_componentWidth();
			ucx -= this.get_paddingLeft() + this.get_paddingRight();
		}
		var ucy = 0;
		if(this._component.get_componentHeight() != null) {
			ucy = this._component.get_componentHeight();
			ucy -= this.get_paddingTop() + this.get_paddingBottom();
		}
		return new haxe_ui_geom_Size(ucx,ucy);
	}
	,__class__: haxe_ui_layouts_HorizontalContinuousLayout
});
var haxe_ui_layouts_ComponentRectangle = function(left,top,width,height) {
	haxe_ui_geom_Rectangle.call(this,left,top,width,height);
};
$hxClasses["haxe.ui.layouts.ComponentRectangle"] = haxe_ui_layouts_ComponentRectangle;
haxe_ui_layouts_ComponentRectangle.__name__ = "haxe.ui.layouts.ComponentRectangle";
haxe_ui_layouts_ComponentRectangle.__super__ = haxe_ui_geom_Rectangle;
haxe_ui_layouts_ComponentRectangle.prototype = $extend(haxe_ui_geom_Rectangle.prototype,{
	component: null
	,apply: function() {
		this.component.moveComponent(this.left,this.top);
		this.component.resizeComponent(this.width,this.height);
	}
	,__class__: haxe_ui_layouts_ComponentRectangle
});
var haxe_ui_layouts_HorizontalGridLayout = function() {
	this._rows = 1;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.HorizontalGridLayout"] = haxe_ui_layouts_HorizontalGridLayout;
haxe_ui_layouts_HorizontalGridLayout.__name__ = "haxe.ui.layouts.HorizontalGridLayout";
haxe_ui_layouts_HorizontalGridLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_HorizontalGridLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_rows: null
	,get_rows: function() {
		return this._rows;
	}
	,set_rows: function(value) {
		if(this._rows == value) {
			return value;
		}
		this._rows = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_Layout.prototype.get_usableSize.call(this);
		var columnWidths = this.calcColumnWidths(size,false);
		var rowHeights = this.calcRowHeights(size,false);
		var _g = 0;
		while(_g < columnWidths.length) {
			var columnWidth = columnWidths[_g];
			++_g;
			size.width -= columnWidth;
		}
		var _g = 0;
		while(_g < rowHeights.length) {
			var rowHeight = rowHeights[_g];
			++_g;
			size.height -= rowHeight;
		}
		var _this = this.get_component();
		if((_this._children == null ? [] : _this._children).length > 1) {
			var _this = this.get_component();
			var columns = Math.ceil((_this._children == null ? [] : _this._children).length / this._rows);
			size.width -= this.get_horizontalSpacing() * (columns - 1);
			size.height -= this.get_verticalSpacing() * (this.get_rows() - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,resizeChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var explicitWidths = this.calcExplicitWidths();
		var explicitHeights = this.calcExplicitHeights();
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var ucx = columnWidths[columnIndex];
				if(explicitWidths[columnIndex] == false) {
					cx = ucx;
				} else {
					cx = ucx * child.get_percentWidth() / 100;
				}
			}
			if(child.get_percentHeight() != null) {
				var ucy = rowHeights[rowIndex];
				if(explicitHeights[rowIndex] == false) {
					cy = ucy;
				} else {
					cy = ucy * child.get_percentHeight() / 100;
				}
			}
			child.resizeComponent(cx,cy);
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
	}
	,repositionChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var rowIndex = 0;
		var columnIndex = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var halign = this.horizontalAlign(child);
			var valign = this.verticalAlign(child);
			var xposChild = 0;
			var yposChild = 0;
			switch(halign) {
			case "center":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) * 0.5 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) + this.marginLeft(child) - this.marginRight(child);
				break;
			default:
				xposChild = xpos + this.marginLeft(child) - this.marginRight(child);
			}
			switch(valign) {
			case "bottom":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) + this.marginTop(child) - this.marginBottom(child);
				break;
			case "center":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) * 0.5 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				yposChild = ypos + this.marginTop(child) - this.marginBottom(child);
			}
			child.moveComponent(xposChild,yposChild);
			ypos += rowHeights[rowIndex] + this.get_verticalSpacing();
			++rowIndex;
			if(rowIndex >= this._rows) {
				ypos = this.get_paddingTop();
				xpos += columnWidths[columnIndex] + this.get_horizontalSpacing();
				rowIndex = 0;
				++columnIndex;
			}
		}
	}
	,calcColumnWidths: function(usableSize,includePercentage) {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var columnCount = visibleChildren / this._rows | 0;
		if(visibleChildren % this._rows != 0) {
			++columnCount;
		}
		var columnWidths = [];
		var _g = 0;
		var _g1 = columnCount;
		while(_g < _g1) {
			var _ = _g++;
			columnWidths.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_componentWidth() > columnWidths[columnIndex]) {
					columnWidths[columnIndex] = child.get_componentWidth();
				}
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null) {
					var cx = usableSize.width * child.get_percentWidth() / 100;
					if(cx > columnWidths[rowIndex] && this._rows == 1) {
						columnWidths[columnIndex] = cx;
					} else if(usableSize.width > columnWidths[columnIndex]) {
						columnWidths[columnIndex] = usableSize.width;
					}
				}
				++rowIndex;
				if(rowIndex >= this._rows) {
					rowIndex = 0;
					++columnIndex;
				}
			}
		}
		return columnWidths;
	}
	,calcRowHeights: function(usableSize,includePercentage) {
		var rowHeights = [];
		var _g = 0;
		var _g1 = this._rows;
		while(_g < _g1) {
			var _ = _g++;
			rowHeights.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null) {
				if(child.get_componentHeight() > rowHeights[rowIndex]) {
					rowHeights[rowIndex] = child.get_componentHeight();
				}
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null) {
					var cy = usableSize.height * child.get_percentHeight() / 100;
					if(cy > rowHeights[rowIndex]) {
						rowHeights[rowIndex] = cy;
					}
				}
				++rowIndex;
				if(rowIndex >= this._rows) {
					rowIndex = 0;
					++columnIndex;
				}
			}
		}
		return rowHeights;
	}
	,calcExplicitWidths: function() {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var columnCount = visibleChildren / this._rows | 0;
		if(visibleChildren % this._rows != 0) {
			++columnCount;
		}
		var explicitWidths = [];
		var _g = 0;
		var _g1 = columnCount;
		while(_g < _g1) {
			var _ = _g++;
			explicitWidths.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null && child.get_componentWidth() > 0) {
				explicitWidths[rowIndex % this._rows] = true;
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		return explicitWidths;
	}
	,calcExplicitHeights: function() {
		var explicitHeights = [];
		var _g = 0;
		var _g1 = this._rows;
		while(_g < _g1) {
			var _ = _g++;
			explicitHeights.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null && child.get_componentHeight() > 0) {
				explicitHeights[rowIndex] = true;
			}
			++rowIndex;
			if(rowIndex >= this._rows) {
				rowIndex = 0;
				++columnIndex;
			}
		}
		return explicitHeights;
	}
	,__class__: haxe_ui_layouts_HorizontalGridLayout
	,__properties__: $extend(haxe_ui_layouts_Layout.prototype.__properties__,{set_rows:"set_rows",get_rows:"get_rows"})
});
var haxe_ui_layouts_LayoutFactory = function() { };
$hxClasses["haxe.ui.layouts.LayoutFactory"] = haxe_ui_layouts_LayoutFactory;
haxe_ui_layouts_LayoutFactory.__name__ = "haxe.ui.layouts.LayoutFactory";
haxe_ui_layouts_LayoutFactory.createFromName = function(name) {
	switch(name) {
	case "absolute":
		return new haxe_ui_layouts_AbsoluteLayout();
	case "continuous horizontal":case "continuousHorizontal":
		return new haxe_ui_layouts_HorizontalContinuousLayout();
	case "horizontal":
		return new haxe_ui_layouts_HorizontalLayout();
	case "horizontal grid":case "horizontalgrid":
		return new haxe_ui_layouts_HorizontalGridLayout();
	case "vertical":
		return new haxe_ui_layouts_VerticalLayout();
	case "vertical grid":case "verticalgrid":
		return new haxe_ui_layouts_VerticalGridLayout();
	}
	return new haxe_ui_layouts_DefaultLayout();
};
var haxe_ui_layouts_VerticalGridLayout = function() {
	this._columns = 1;
	haxe_ui_layouts_Layout.call(this);
};
$hxClasses["haxe.ui.layouts.VerticalGridLayout"] = haxe_ui_layouts_VerticalGridLayout;
haxe_ui_layouts_VerticalGridLayout.__name__ = "haxe.ui.layouts.VerticalGridLayout";
haxe_ui_layouts_VerticalGridLayout.__super__ = haxe_ui_layouts_Layout;
haxe_ui_layouts_VerticalGridLayout.prototype = $extend(haxe_ui_layouts_Layout.prototype,{
	_columns: null
	,get_columns: function() {
		return this._columns;
	}
	,set_columns: function(value) {
		if(this._columns == value) {
			return value;
		}
		this._columns = value;
		if(this._component != null) {
			var _this = this._component;
			if(!(_this._layout == null || _this._layoutLocked == true)) {
				_this.invalidateComponent("layout",false);
			}
		}
		return value;
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_Layout.prototype.get_usableSize.call(this);
		var columnWidths = this.calcColumnWidths(size,false);
		var rowHeights = this.calcRowHeights(size,false);
		var _g = 0;
		while(_g < columnWidths.length) {
			var columnWidth = columnWidths[_g];
			++_g;
			size.width -= columnWidth;
		}
		var _g = 0;
		while(_g < rowHeights.length) {
			var rowHeight = rowHeights[_g];
			++_g;
			size.height -= rowHeight;
		}
		var _this = this.get_component();
		if((_this._children == null ? [] : _this._children).length > 1) {
			var _this = this.get_component();
			var rows = Math.ceil((_this._children == null ? [] : _this._children).length / this.get_columns());
			var c = this.get_columns();
			var _this = this.get_component();
			var c1 = Math.min(c,(_this._children == null ? [] : _this._children).length);
			size.width -= this.get_horizontalSpacing() * (c1 - 1);
			size.height -= this.get_verticalSpacing() * (rows - 1);
		}
		if(size.width < 0) {
			size.width = 0;
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,resizeChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var explicitWidths = this.calcExplicitWidths();
		var explicitHeights = this.calcExplicitHeights();
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var cx = null;
			var cy = null;
			if(child.get_percentWidth() != null) {
				var ucx = columnWidths[columnIndex];
				if(explicitWidths[columnIndex] == false) {
					cx = ucx;
				} else {
					cx = ucx * child.get_percentWidth() / 100;
				}
			}
			if(child.get_percentHeight() != null) {
				var ucy = rowHeights[rowIndex];
				if(explicitHeights[rowIndex] == false) {
					cy = ucy;
				} else {
					cy = ucy * child.get_percentHeight() / 100;
				}
			}
			child.resizeComponent(cx,cy);
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
	}
	,repositionChildren: function() {
		var size = this.get_usableSize();
		var columnWidths = this.calcColumnWidths(size,true);
		var rowHeights = this.calcRowHeights(size,true);
		var rowIndex = 0;
		var columnIndex = 0;
		var xpos = this.get_paddingLeft();
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var halign = this.horizontalAlign(child);
			var valign = this.verticalAlign(child);
			var xposChild = 0;
			var yposChild = 0;
			switch(halign) {
			case "center":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) * 0.5 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				xposChild = xpos + (columnWidths[columnIndex] - child.get_componentWidth()) + this.marginLeft(child) - this.marginRight(child);
				break;
			default:
				xposChild = xpos + this.marginLeft(child) - this.marginRight(child);
			}
			switch(valign) {
			case "bottom":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) + this.marginTop(child) - this.marginBottom(child);
				break;
			case "center":
				yposChild = ypos + (rowHeights[rowIndex] - child.get_componentHeight()) * 0.5 + this.marginTop(child) - this.marginBottom(child);
				break;
			default:
				yposChild = ypos + this.marginTop(child) - this.marginBottom(child);
			}
			child.moveComponent(xposChild,yposChild);
			xpos += columnWidths[columnIndex] + this.get_horizontalSpacing();
			++columnIndex;
			if(columnIndex >= this.get_columns()) {
				xpos = this.get_paddingLeft();
				ypos += rowHeights[rowIndex] + this.get_verticalSpacing();
				columnIndex = 0;
				++rowIndex;
			}
		}
	}
	,calcColumnWidths: function(usableSize,includePercentage) {
		var columnWidths = [];
		var _g = 0;
		var _g1 = this._columns;
		while(_g < _g1) {
			var _ = _g++;
			columnWidths.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null) {
				if(child.get_componentWidth() > columnWidths[columnIndex]) {
					columnWidths[columnIndex] = child.get_componentWidth();
				}
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var fullWidthsCounts = [0];
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null && child.get_percentWidth() == 100) {
					fullWidthsCounts[rowIndex]++;
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
					fullWidthsCounts.push(0);
				}
			}
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentWidth() != null) {
					var childPercentWidth = child.get_percentWidth();
					if(childPercentWidth == 100 && fullWidthsCounts[rowIndex] != 0) {
						var f = fullWidthsCounts[rowIndex];
						if(rowIndex > 0 && fullWidthsCounts[rowIndex - 1] != 0) {
							f = fullWidthsCounts[rowIndex - 1];
						}
						childPercentWidth = 100 / f;
					}
					var cx = usableSize.width * childPercentWidth / 100;
					if(cx > columnWidths[columnIndex]) {
						columnWidths[columnIndex] = cx;
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
				}
			}
		}
		return columnWidths;
	}
	,calcRowHeights: function(usableSize,includePercentage) {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var rowCount = visibleChildren / this._columns | 0;
		if(visibleChildren % this._columns != 0) {
			++rowCount;
		}
		var rowHeights = [];
		var _g = 0;
		var _g1 = rowCount;
		while(_g < _g1) {
			var _ = _g++;
			rowHeights.push(0);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null) {
				if(child.get_height() > rowHeights[rowIndex]) {
					rowHeights[rowIndex] = child.get_height();
				}
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		if(includePercentage) {
			rowIndex = 0;
			columnIndex = 0;
			var newRow = true;
			var fullHeightRowCount = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null && child.get_percentHeight() == 100) {
					if(newRow == true) {
						newRow = false;
						++fullHeightRowCount;
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
					newRow = true;
				}
			}
			rowIndex = 0;
			columnIndex = 0;
			var _g = 0;
			var _this = this.get_component();
			var _g1 = _this._children == null ? [] : _this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				if(child.get_includeInLayout() == false) {
					continue;
				}
				if(child.get_percentHeight() != null) {
					var childPercentHeight = child.get_percentHeight();
					if(childPercentHeight == 100 && fullHeightRowCount > 1) {
						childPercentHeight = 100 / fullHeightRowCount;
					}
					var cy = usableSize.height * childPercentHeight / 100;
					if(cy > rowHeights[rowIndex]) {
						rowHeights[rowIndex] = cy;
					} else {
						var tmp = usableSize.height > rowHeights[rowIndex];
					}
				}
				++columnIndex;
				if(columnIndex >= this._columns) {
					columnIndex = 0;
					++rowIndex;
				}
			}
		}
		return rowHeights;
	}
	,calcExplicitWidths: function() {
		var explicitWidths = [];
		var _g = 0;
		var _g1 = this._columns;
		while(_g < _g1) {
			var _ = _g++;
			explicitWidths.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentWidth() == null && child.get_componentWidth() > 0) {
				explicitWidths[columnIndex] = true;
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		return explicitWidths;
	}
	,calcExplicitHeights: function() {
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
			}
		}
		var rowCount = visibleChildren / this.get_columns() | 0;
		if(visibleChildren % this._columns != 0) {
			++rowCount;
		}
		var explicitHeights = [];
		var _g = 0;
		var _g1 = rowCount;
		while(_g < _g1) {
			var _ = _g++;
			explicitHeights.push(false);
		}
		var rowIndex = 0;
		var columnIndex = 0;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			if(child.get_percentHeight() == null && child.get_componentHeight() > 0) {
				explicitHeights[columnIndex % this._columns] = true;
			}
			++columnIndex;
			if(columnIndex >= this._columns) {
				columnIndex = 0;
				++rowIndex;
			}
		}
		return explicitHeights;
	}
	,__class__: haxe_ui_layouts_VerticalGridLayout
	,__properties__: $extend(haxe_ui_layouts_Layout.prototype.__properties__,{set_columns:"set_columns",get_columns:"get_columns"})
});
var haxe_ui_layouts_VerticalLayout = function() {
	haxe_ui_layouts_DefaultLayout.call(this);
	this._calcFullHeights = true;
};
$hxClasses["haxe.ui.layouts.VerticalLayout"] = haxe_ui_layouts_VerticalLayout;
haxe_ui_layouts_VerticalLayout.__name__ = "haxe.ui.layouts.VerticalLayout";
haxe_ui_layouts_VerticalLayout.__super__ = haxe_ui_layouts_DefaultLayout;
haxe_ui_layouts_VerticalLayout.prototype = $extend(haxe_ui_layouts_DefaultLayout.prototype,{
	repositionChildren: function() {
		var ypos = this.get_paddingTop();
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				continue;
			}
			var xpos = 0;
			switch(this.horizontalAlign(child)) {
			case "center":
				xpos = (this.get_component().get_componentWidth() - child.get_componentWidth()) / 2 + this.marginLeft(child) - this.marginRight(child);
				break;
			case "right":
				if(child.get_componentWidth() < this.get_component().get_componentWidth()) {
					xpos = this.get_component().get_componentWidth() - (child.get_componentWidth() + this.get_paddingRight() + this.marginLeft(child));
				}
				break;
			default:
				xpos = this.get_paddingLeft() + this.marginLeft(child);
			}
			child.moveComponent(xpos,ypos + this.marginTop(child));
			ypos += child.get_componentHeight() + this.get_verticalSpacing();
		}
	}
	,get_usableSize: function() {
		var size = haxe_ui_layouts_DefaultLayout.prototype.get_usableSize.call(this);
		var _this = this.get_component();
		var visibleChildren = (_this._children == null ? [] : _this._children).length;
		var _g = 0;
		var _this = this.get_component();
		var _g1 = _this._children == null ? [] : _this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.get_includeInLayout() == false) {
				--visibleChildren;
				continue;
			}
			if(child.get_componentHeight() > 0 && (child.get_percentHeight() == null || this.fixedMinHeight(child) == true)) {
				size.height -= child.get_componentHeight() + this.marginTop(child) + this.marginBottom(child);
			}
		}
		if(visibleChildren > 1) {
			size.height -= this.get_verticalSpacing() * (visibleChildren - 1);
		}
		if(size.height < 0) {
			size.height = 0;
		}
		return size;
	}
	,__class__: haxe_ui_layouts_VerticalLayout
});
var haxe_ui_locale_LocaleEvent = function(type) {
	haxe_ui_events_UIEvent.call(this,type);
};
$hxClasses["haxe.ui.locale.LocaleEvent"] = haxe_ui_locale_LocaleEvent;
haxe_ui_locale_LocaleEvent.__name__ = "haxe.ui.locale.LocaleEvent";
haxe_ui_locale_LocaleEvent.__super__ = haxe_ui_events_UIEvent;
haxe_ui_locale_LocaleEvent.prototype = $extend(haxe_ui_events_UIEvent.prototype,{
	clone: function() {
		var c = new haxe_ui_locale_LocaleEvent(this.type);
		return c;
	}
	,__class__: haxe_ui_locale_LocaleEvent
});
var haxe_ui_locale_LocaleManager = function() {
	this._localeMap = new haxe_ds_StringMap();
	this._language = "en";
	this._eventMap = null;
};
$hxClasses["haxe.ui.locale.LocaleManager"] = haxe_ui_locale_LocaleManager;
haxe_ui_locale_LocaleManager.__name__ = "haxe.ui.locale.LocaleManager";
haxe_ui_locale_LocaleManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_locale_LocaleManager.get_instance = function() {
	if(haxe_ui_locale_LocaleManager._instance == null) {
		haxe_ui_locale_LocaleManager._instance = new haxe_ui_locale_LocaleManager();
	}
	return haxe_ui_locale_LocaleManager._instance;
};
haxe_ui_locale_LocaleManager.prototype = {
	_eventMap: null
	,registerComponent: function(component,prop,callback,expr,fix) {
		if(fix == null) {
			fix = true;
		}
		if(callback == null && expr == null) {
			return;
		}
		var fixedExpr = null;
		if(fix == true) {
			if(expr != null) {
				fixedExpr = haxe_ui_util_ExpressionUtil.stringToLanguageExpression(expr,"LocaleManager");
				if(StringTools.endsWith(fixedExpr,";") == true) {
					fixedExpr = HxOverrides.substr(fixedExpr,0,fixedExpr.length - 1);
				}
			}
		} else {
			fixedExpr = expr;
		}
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			propMap = new haxe_ds_StringMap();
			haxe_ui_locale_LocaleManager._registeredComponents.set(component,propMap);
		}
		propMap.h[prop] = { callback : callback, expr : fixedExpr};
		this.refreshFor(component);
	}
	,unregisterComponent: function(component) {
		haxe_ui_locale_LocaleManager._registeredComponents.remove(component);
	}
	,findBindingExpr: function(component,prop) {
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			return null;
		}
		var entry = propMap.h[prop];
		if(entry == null) {
			return null;
		}
		return entry.expr;
	}
	,cloneForComponent: function(from,to) {
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[from.__id__];
		if(propMap == null) {
			return;
		}
		var h = propMap.h;
		var prop_h = h;
		var prop_keys = Object.keys(h);
		var prop_length = prop_keys.length;
		var prop_current = 0;
		while(prop_current < prop_length) {
			var prop = prop_keys[prop_current++];
			var entry = propMap.h[prop];
			this.registerComponent(to,prop,entry.callback,entry.expr,false);
		}
	}
	,onComponentReady: function(e) {
		e.target.unregisterEvent("initialize",$bind(this,this.onComponentReady));
		this.refreshFor(e.target);
	}
	,refreshFor: function(component) {
		if(component.get_isReady() == false) {
			component.registerEvent("initialize",$bind(this,this.onComponentReady));
			return;
		}
		var propMap = haxe_ui_locale_LocaleManager._registeredComponents.h[component.__id__];
		if(propMap == null) {
			return;
		}
		var context = { LocaleManager : haxe_ui_locale_LocaleManager, MathUtil : haxe_ui_util_MathUtil};
		var root = this.findRoot(component);
		var _g = 0;
		var _g1 = root.get_namedComponents();
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(k.get_scriptAccess() == false) {
				continue;
			}
			context[k.get_id()] = k;
		}
		var h = propMap.h;
		var prop_h = h;
		var prop_keys = Object.keys(h);
		var prop_length = prop_keys.length;
		var prop_current = 0;
		while(prop_current < prop_length) {
			var prop = prop_keys[prop_current++];
			var entry = propMap.h[prop];
			if(entry.callback != null) {
				var value = entry.callback();
				Reflect.setProperty(component,prop,value);
			} else if(entry.expr != null) {
				var value1 = haxe_ui_util_SimpleExpressionEvaluator.eval(entry.expr,context);
				Reflect.setProperty(component,prop,value1);
			}
		}
	}
	,refreshAll: function() {
		var c = haxe_ui_locale_LocaleManager._registeredComponents.keys();
		while(c.hasNext()) {
			var c1 = c.next();
			this.refreshFor(c1);
		}
	}
	,_language: null
	,get_language: function() {
		return this._language;
	}
	,set_language: function(value) {
		if(value == null) {
			return value;
		}
		if(this._language == value) {
			return value;
		}
		var tmp = this.getStrings(value) == null;
		this._language = value;
		this.refreshAll();
		if(this._eventMap != null) {
			var event = new haxe_ui_locale_LocaleEvent("localeChanged");
			this._eventMap.invoke("localeChanged",event);
		}
		return value;
	}
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this._eventMap == null) {
			this._eventMap = new haxe_ui_util_EventMap();
		}
		this._eventMap.add(type,listener,priority);
	}
	,hasEvent: function(type,listener) {
		if(this._eventMap == null) {
			return false;
		}
		return this._eventMap.contains(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap != null) {
			this._eventMap.remove(type,listener);
		}
	}
	,parseResource: function(localeId,resourceId) {
		var content = haxe_ui_ToolkitAssets.get_instance().getText(resourceId);
		if(content != null) {
			var parts = resourceId.split(".");
			var extension = parts.pop();
			var filename = parts.join(".");
			var n = filename.lastIndexOf("/");
			if(n != -1) {
				filename = HxOverrides.substr(filename,n + 1,null);
			}
			var parser = haxe_ui_parsers_locale_LocaleParser.get(extension);
			var map = parser.parse(content);
			this.addStrings(localeId,map,filename);
		}
	}
	,_localeMap: null
	,addStrings: function(localeId,map,filename) {
		var stringMap = this._localeMap.h[localeId];
		if(stringMap == null) {
			stringMap = new haxe_ds_StringMap();
			this._localeMap.h[localeId] = stringMap;
		}
		var h = map.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			var v = map.h[k];
			if(filename != null && filename != localeId && StringTools.startsWith(k,filename) == false) {
				var altKey = filename + "." + k;
				stringMap.h[altKey] = v;
			}
			stringMap.h[k] = v;
		}
		localeId = StringTools.replace(localeId,"-","_");
		var parts = localeId.split("_");
		if(parts.length > 1) {
			var parent = this._localeMap.h[parts[0]];
			if(parent != null) {
				var h = parent.h;
				var k_h = h;
				var k_keys = Object.keys(h);
				var k_length = k_keys.length;
				var k_current = 0;
				while(k_current < k_length) {
					var k = k_keys[k_current++];
					if(Object.prototype.hasOwnProperty.call(stringMap.h,k) == false) {
						stringMap.h[k] = parent.h[k];
					}
				}
			}
		}
	}
	,getStrings: function(localeId) {
		var strings = this._localeMap.h[localeId];
		if(strings != null) {
			return strings;
		}
		localeId = StringTools.replace(localeId,"-","_");
		var parts = localeId.split("_");
		if(!Object.prototype.hasOwnProperty.call(this._localeMap.h,parts[0])) {
			return this._localeMap.h["en"];
		}
		return this._localeMap.h[parts[0]];
	}
	,hasString: function(id) {
		var strings = this.getStrings(this.get_language());
		if(strings == null) {
			return false;
		}
		return Object.prototype.hasOwnProperty.call(strings.h,id);
	}
	,lookupString: function(id,param0,param1,param2,param3) {
		return this.translateTo(this.get_language(),id,param0,param1,param2,param3);
	}
	,translateTo: function(lang,id,param0,param1,param2,param3) {
		var strings = this.getStrings(lang);
		if(strings == null) {
			return id;
		}
		var value = strings.h[id];
		if(value == null) {
			return id;
		}
		if(param0 != null) {
			value = StringTools.replace(value,"{0}",param0);
		}
		if(param1 != null) {
			value = StringTools.replace(value,"{1}",param1);
		}
		if(param2 != null) {
			value = StringTools.replace(value,"{2}",param2);
		}
		if(param3 != null) {
			value = StringTools.replace(value,"{3}",param3);
		}
		return value;
	}
	,findRoot: function(c) {
		var root = c;
		var ref = c;
		while(ref != null) {
			root = ref;
			if(root.bindingRoot) {
				break;
			}
			ref = ref.parentComponent;
		}
		return root;
	}
	,__class__: haxe_ui_locale_LocaleManager
	,__properties__: {set_language:"set_language",get_language:"get_language"}
};
var haxe_ui_macros_BackendMacros = function() { };
$hxClasses["haxe.ui.macros.BackendMacros"] = haxe_ui_macros_BackendMacros;
haxe_ui_macros_BackendMacros.__name__ = "haxe.ui.macros.BackendMacros";
var haxe_ui_macros_ComponentMacros = function() { };
$hxClasses["haxe.ui.macros.ComponentMacros"] = haxe_ui_macros_ComponentMacros;
haxe_ui_macros_ComponentMacros.__name__ = "haxe.ui.macros.ComponentMacros";
var haxe_ui_macros_ModuleMacros = function() { };
$hxClasses["haxe.ui.macros.ModuleMacros"] = haxe_ui_macros_ModuleMacros;
haxe_ui_macros_ModuleMacros.__name__ = "haxe.ui.macros.ModuleMacros";
var haxe_ui_macros_NativeMacros = function() { };
$hxClasses["haxe.ui.macros.NativeMacros"] = haxe_ui_macros_NativeMacros;
haxe_ui_macros_NativeMacros.__name__ = "haxe.ui.macros.NativeMacros";
var haxe_ui_parsers_locale_LocaleParser = function() {
};
$hxClasses["haxe.ui.parsers.locale.LocaleParser"] = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_LocaleParser.__name__ = "haxe.ui.parsers.locale.LocaleParser";
haxe_ui_parsers_locale_LocaleParser.get = function(extension) {
	haxe_ui_parsers_locale_LocaleParser.defaultParsers();
	var cls = haxe_ui_parsers_locale_LocaleParser._parsers.h[extension];
	if(cls == null) {
		throw haxe_Exception.thrown("No locale parser found for \"" + extension + "\"");
	}
	var instance = Type.createInstance(cls,[]);
	if(instance == null) {
		throw haxe_Exception.thrown("Could not create locale parser instance \"" + Std.string(cls) + "\"");
	}
	return instance;
};
haxe_ui_parsers_locale_LocaleParser.defaultParsers = function() {
	haxe_ui_parsers_locale_LocaleParser.register("properties",haxe_ui_parsers_locale_PropertiesParser);
	haxe_ui_parsers_locale_LocaleParser.register("po",haxe_ui_parsers_locale_PoParser);
};
haxe_ui_parsers_locale_LocaleParser.register = function(extension,cls) {
	if(haxe_ui_parsers_locale_LocaleParser._parsers == null) {
		haxe_ui_parsers_locale_LocaleParser._parsers = new haxe_ds_StringMap();
	}
	haxe_ui_parsers_locale_LocaleParser._parsers.h[extension] = cls;
};
haxe_ui_parsers_locale_LocaleParser.prototype = {
	parse: function(data) {
		throw haxe_Exception.thrown("Locale parser not implemented!");
	}
	,__class__: haxe_ui_parsers_locale_LocaleParser
};
var haxe_ui_parsers_locale_PoParser = function() {
	haxe_ui_parsers_locale_LocaleParser.call(this);
};
$hxClasses["haxe.ui.parsers.locale.PoParser"] = haxe_ui_parsers_locale_PoParser;
haxe_ui_parsers_locale_PoParser.__name__ = "haxe.ui.parsers.locale.PoParser";
haxe_ui_parsers_locale_PoParser.__super__ = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_PoParser.prototype = $extend(haxe_ui_parsers_locale_LocaleParser.prototype,{
	parse: function(data) {
		var msgidEReg = new EReg("msgid *= *\"(.*)\"","");
		var msgstrEReg = new EReg("msgstr *= *\"(.*)\"","");
		var result = new haxe_ds_StringMap();
		var lines = data.split("\n");
		var currentID = null;
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			line = StringTools.trim(line);
			if(line.length == 0 || StringTools.startsWith(line,"#")) {
				continue;
			}
			if(currentID == null) {
				if(msgidEReg.match(line)) {
					currentID = msgidEReg.matched(1);
				} else {
					throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
				}
			} else if(msgstrEReg.match(line)) {
				var value = msgstrEReg.matched(1);
				result.h[currentID] = value;
				currentID = null;
			} else {
				throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
			}
		}
		return result;
	}
	,__class__: haxe_ui_parsers_locale_PoParser
});
var haxe_ui_parsers_locale_PropertiesParser = function() {
	haxe_ui_parsers_locale_LocaleParser.call(this);
};
$hxClasses["haxe.ui.parsers.locale.PropertiesParser"] = haxe_ui_parsers_locale_PropertiesParser;
haxe_ui_parsers_locale_PropertiesParser.__name__ = "haxe.ui.parsers.locale.PropertiesParser";
haxe_ui_parsers_locale_PropertiesParser.__super__ = haxe_ui_parsers_locale_LocaleParser;
haxe_ui_parsers_locale_PropertiesParser.prototype = $extend(haxe_ui_parsers_locale_LocaleParser.prototype,{
	parse: function(data) {
		var result = new haxe_ds_StringMap();
		var lines = data.split("\n");
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			line = StringTools.trim(line);
			if(line.length == 0 || StringTools.startsWith(line,"#")) {
				continue;
			}
			var separator = line.indexOf("=");
			if(separator == -1) {
				throw haxe_Exception.thrown("Locale parser: Invalid line " + line);
			}
			var key = StringTools.trim(HxOverrides.substr(line,0,separator));
			var content = StringTools.trim(HxOverrides.substr(line,separator + 1,null));
			result.h[key] = content;
		}
		return result;
	}
	,__class__: haxe_ui_parsers_locale_PropertiesParser
});
var haxe_ui_styles_Dimension = $hxEnums["haxe.ui.styles.Dimension"] = { __ename__:true,__constructs__:null
	,PERCENT: ($_=function(value) { return {_hx_index:0,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="PERCENT",$_.__params__ = ["value"],$_)
	,PX: ($_=function(value) { return {_hx_index:1,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="PX",$_.__params__ = ["value"],$_)
	,VW: ($_=function(value) { return {_hx_index:2,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="VW",$_.__params__ = ["value"],$_)
	,VH: ($_=function(value) { return {_hx_index:3,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="VH",$_.__params__ = ["value"],$_)
	,REM: ($_=function(value) { return {_hx_index:4,value:value,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="REM",$_.__params__ = ["value"],$_)
	,CALC: ($_=function(s) { return {_hx_index:5,s:s,__enum__:"haxe.ui.styles.Dimension",toString:$estr}; },$_._hx_name="CALC",$_.__params__ = ["s"],$_)
};
haxe_ui_styles_Dimension.__constructs__ = [haxe_ui_styles_Dimension.PERCENT,haxe_ui_styles_Dimension.PX,haxe_ui_styles_Dimension.VW,haxe_ui_styles_Dimension.VH,haxe_ui_styles_Dimension.REM,haxe_ui_styles_Dimension.CALC];
var haxe_ui_styles_EasingFunction = $hxEnums["haxe.ui.styles.EasingFunction"] = { __ename__:true,__constructs__:null
	,LINEAR: {_hx_name:"LINEAR",_hx_index:0,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE: {_hx_name:"EASE",_hx_index:1,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_IN: {_hx_name:"EASE_IN",_hx_index:2,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_OUT: {_hx_name:"EASE_OUT",_hx_index:3,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
	,EASE_IN_OUT: {_hx_name:"EASE_IN_OUT",_hx_index:4,__enum__:"haxe.ui.styles.EasingFunction",toString:$estr}
};
haxe_ui_styles_EasingFunction.__constructs__ = [haxe_ui_styles_EasingFunction.LINEAR,haxe_ui_styles_EasingFunction.EASE,haxe_ui_styles_EasingFunction.EASE_IN,haxe_ui_styles_EasingFunction.EASE_OUT,haxe_ui_styles_EasingFunction.EASE_IN_OUT];
var haxe_ui_styles_Parser = function() {
};
$hxClasses["haxe.ui.styles.Parser"] = haxe_ui_styles_Parser;
haxe_ui_styles_Parser.__name__ = "haxe.ui.styles.Parser";
haxe_ui_styles_Parser.prototype = {
	parse: function(source) {
		var _gthis = this;
		source = source.replace(haxe_ui_styles_Parser.cssCommentsRegex.r,"");
		if(source.indexOf("$") != -1) {
			var n1 = source.indexOf("$");
			while(n1 != -1) {
				var n2 = n1;
				while(n2 <= source.length - 1) {
					var c = source.charAt(n2);
					if(c == " " || c == ";" || c == "\n" || c == ",") {
						break;
					}
					++n2;
				}
				if(n2 != source.length - 1) {
					var key = source.substring(n1 + 1,n2);
					var value = haxe_ui_themes_ThemeManager.get_instance().currentThemeVars.h[key];
					if(value != null) {
						var before = source.substring(0,n1);
						var after = source.substring(n2);
						source = before + value + after;
						n2 = n1 + value.length;
					} else {
						haxe_Log.trace("WARNING: css variable '" + key + "' not defined",{ fileName : "haxe/ui/styles/Parser.hx", lineNumber : 50, className : "haxe.ui.styles.Parser", methodName : "parse"});
					}
				}
				n1 = source.indexOf("$",n2);
			}
		}
		var styleSheet = new haxe_ui_styles_StyleSheet();
		source = haxe_ui_styles_Parser.cssImportStatementRegex.map(source,function(e) {
			var i = e.matched(0);
			i = HxOverrides.substr(i,7,null);
			var _this_r = new RegExp("\"|'|;","g".split("u").join(""));
			i = i.replace(_this_r,"");
			i = StringTools.trim(i);
			styleSheet.addImport(new haxe_ui_styles_elements_ImportElement(i));
			return "";
		});
		source = haxe_ui_styles_Parser.cssKeyframesRegex.map(source,function(e) {
			var id = e.matched(1);
			var data = e.matched(2);
			var keyframes = [];
			haxe_ui_styles_Parser.cssKeyframeSelectorRegex.map(data,function(e) {
				var selector = e.matched(1);
				var directives = e.matched(2);
				if(selector == "from") {
					selector = "0%";
				} else if(selector == "to") {
					selector = "100%";
				}
				var keyframe = new haxe_ui_styles_elements_AnimationKeyFrame();
				keyframe.time = haxe_ui_styles_ValueTools.parse(selector);
				keyframe.directives = _gthis.parseDirectives(directives);
				keyframes.push(keyframe);
				return null;
			});
			var animation = new haxe_ui_styles_elements_AnimationKeyFrames(id,keyframes);
			styleSheet.addAnimation(animation);
			return "";
		});
		haxe_ui_styles_Parser.combinedCSSMediaRegex.map(source,function(e) {
			var selector = "";
			if(e.matched(2) == null) {
				selector = StringTools.trim(e.matched(5).split("\r\n").join("\n"));
			} else {
				selector = StringTools.trim(e.matched(2).split("\r\n").join("\n"));
			}
			selector = selector.replace(haxe_ui_styles_Parser.newlineRegex.r,"\n");
			if(selector.indexOf("@media") != -1) {
				var n1 = selector.indexOf("(");
				var n2 = selector.lastIndexOf(")");
				var mediaQuery = selector.substring(n1 + 1,n2);
				var mediaStyleSheet = new haxe_ui_styles_Parser().parse(e.matched(3) + "\n}");
				var mq = new haxe_ui_styles_elements_MediaQuery(_gthis.parseDirectives(mediaQuery),mediaStyleSheet);
				styleSheet.addMediaQuery(mq);
			} else {
				var directives = _gthis.parseDirectives(e.matched(6));
				var selectors = selector.split(",");
				var _g = 0;
				while(_g < selectors.length) {
					var s = selectors[_g];
					++_g;
					s = StringTools.trim(s);
					if(s.length > 0) {
						styleSheet.addRule(new haxe_ui_styles_elements_RuleElement(s,directives));
					}
				}
			}
			return null;
		});
		return styleSheet;
	}
	,parseDirectives: function(rulesString) {
		rulesString = rulesString.split("\r\n").join("\n");
		var ret = [];
		var rules = rulesString.split(";");
		var _g = 0;
		while(_g < rules.length) {
			var line = rules[_g];
			++_g;
			var d = this.parseDirective(line);
			if(d != null) {
				ret.push(d);
			}
		}
		return ret;
	}
	,parseDirective: function(line) {
		var d = null;
		line = StringTools.trim(line);
		if(line.length == 0) {
			return null;
		}
		if(line.indexOf(":") != -1) {
			var parts = line.split(":");
			var cssDirective = StringTools.trim(parts[0]);
			var cssValue = StringTools.trim(parts.slice(1).join(":"));
			if(cssDirective.length < 1 || cssValue.length < 1) {
				return null;
			}
			d = new haxe_ui_styles_elements_Directive(cssDirective,haxe_ui_styles_ValueTools.parse(cssValue));
		} else {
			d = new haxe_ui_styles_elements_Directive("",haxe_ui_styles_ValueTools.parse(line),true);
		}
		return d;
	}
	,__class__: haxe_ui_styles_Parser
};
var haxe_ui_styles_StyleBorderType = $hxEnums["haxe.ui.styles.StyleBorderType"] = { __ename__:true,__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
	,Full: {_hx_name:"Full",_hx_index:1,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
	,Compound: {_hx_name:"Compound",_hx_index:2,__enum__:"haxe.ui.styles.StyleBorderType",toString:$estr}
};
haxe_ui_styles_StyleBorderType.__constructs__ = [haxe_ui_styles_StyleBorderType.None,haxe_ui_styles_StyleBorderType.Full,haxe_ui_styles_StyleBorderType.Compound];
var haxe_ui_styles_Style = function(left,top,autoWidth,width,percentWidth,minWidth,minPercentWidth,maxWidth,maxPercentWidth,initialWidth,initialPercentWidth,autoHeight,height,percentHeight,minHeight,minPercentHeight,maxHeight,maxPercentHeight,initialHeight,initialPercentHeight,padding,paddingTop,paddingLeft,paddingRight,paddingBottom,marginTop,marginLeft,marginRight,marginBottom,horizontalSpacing,verticalSpacing,color,backgroundColor,backgroundOpacity,backgroundColorEnd,backgroundGradientStyle,backgroundImage,backgroundImageRepeat,backgroundPositionX,backgroundPositionY,backgroundImageClipTop,backgroundImageClipLeft,backgroundImageClipBottom,backgroundImageClipRight,backgroundImageSliceTop,backgroundImageSliceLeft,backgroundImageSliceBottom,backgroundImageSliceRight,borderColor,borderTopColor,borderLeftColor,borderBottomColor,borderRightColor,borderSize,borderTopSize,borderLeftSize,borderBottomSize,borderRightSize,borderRadius,borderRadiusTopLeft,borderRadiusTopRight,borderRadiusBottomLeft,borderRadiusBottomRight,borderOpacity,borderStyle,icon,iconPosition,horizontalAlign,verticalAlign,textAlign,opacity,clip,native,fontName,fontSize,fontBold,fontUnderline,fontItalic,fontStrikeThrough,cursor,hidden,filter,backdropFilter,resource,animationName,animationOptions,mode,pointerEvents,contentType,direction,contentWidth,contentWidthPercent,contentHeight,contentHeightPercent,wordWrap,imageRendering,backgroundWidth,backgroundWidthPercent,backgroundHeight,backgroundHeightPercent,layout,borderType,hasBorder,fullBorderSize) {
	this.left = left;
	this.top = top;
	this.autoWidth = autoWidth;
	this.width = width;
	this.percentWidth = percentWidth;
	this.minWidth = minWidth;
	this.minPercentWidth = minPercentWidth;
	this.maxWidth = maxWidth;
	this.maxPercentWidth = maxPercentWidth;
	this.initialWidth = initialWidth;
	this.initialPercentWidth = initialPercentWidth;
	this.autoHeight = autoHeight;
	this.height = height;
	this.percentHeight = percentHeight;
	this.minHeight = minHeight;
	this.minPercentHeight = minPercentHeight;
	this.maxHeight = maxHeight;
	this.maxPercentHeight = maxPercentHeight;
	this.initialHeight = initialHeight;
	this.initialPercentHeight = initialPercentHeight;
	this.padding = padding;
	this.paddingTop = paddingTop;
	this.paddingLeft = paddingLeft;
	this.paddingRight = paddingRight;
	this.paddingBottom = paddingBottom;
	this.marginTop = marginTop;
	this.marginLeft = marginLeft;
	this.marginRight = marginRight;
	this.marginBottom = marginBottom;
	this.horizontalSpacing = horizontalSpacing;
	this.verticalSpacing = verticalSpacing;
	this.color = color;
	this.backgroundColor = backgroundColor;
	this.backgroundOpacity = backgroundOpacity;
	this.backgroundColorEnd = backgroundColorEnd;
	this.backgroundGradientStyle = backgroundGradientStyle;
	this.backgroundImage = backgroundImage;
	this.backgroundImageRepeat = backgroundImageRepeat;
	this.backgroundPositionX = backgroundPositionX;
	this.backgroundPositionY = backgroundPositionY;
	this.backgroundImageClipTop = backgroundImageClipTop;
	this.backgroundImageClipLeft = backgroundImageClipLeft;
	this.backgroundImageClipBottom = backgroundImageClipBottom;
	this.backgroundImageClipRight = backgroundImageClipRight;
	this.backgroundImageSliceTop = backgroundImageSliceTop;
	this.backgroundImageSliceLeft = backgroundImageSliceLeft;
	this.backgroundImageSliceBottom = backgroundImageSliceBottom;
	this.backgroundImageSliceRight = backgroundImageSliceRight;
	this.borderColor = borderColor;
	this.borderTopColor = borderTopColor;
	this.borderLeftColor = borderLeftColor;
	this.borderBottomColor = borderBottomColor;
	this.borderRightColor = borderRightColor;
	this.borderSize = borderSize;
	this.borderTopSize = borderTopSize;
	this.borderLeftSize = borderLeftSize;
	this.borderBottomSize = borderBottomSize;
	this.borderRightSize = borderRightSize;
	this.borderRadius = borderRadius;
	this.borderRadiusTopLeft = borderRadiusTopLeft;
	this.borderRadiusTopRight = borderRadiusTopRight;
	this.borderRadiusBottomLeft = borderRadiusBottomLeft;
	this.borderRadiusBottomRight = borderRadiusBottomRight;
	this.borderOpacity = borderOpacity;
	this.borderStyle = borderStyle;
	this.icon = icon;
	this.iconPosition = iconPosition;
	this.horizontalAlign = horizontalAlign;
	this.verticalAlign = verticalAlign;
	this.textAlign = textAlign;
	this.opacity = opacity;
	this.clip = clip;
	this.native = native;
	this.fontName = fontName;
	this.fontSize = fontSize;
	this.fontBold = fontBold;
	this.fontUnderline = fontUnderline;
	this.fontItalic = fontItalic;
	this.fontStrikeThrough = fontStrikeThrough;
	this.cursor = cursor;
	this.hidden = hidden;
	this.filter = filter;
	this.backdropFilter = backdropFilter;
	this.resource = resource;
	this.animationName = animationName;
	this.animationOptions = animationOptions;
	this.mode = mode;
	this.pointerEvents = pointerEvents;
	this.contentType = contentType;
	this.direction = direction;
	this.contentWidth = contentWidth;
	this.contentWidthPercent = contentWidthPercent;
	this.contentHeight = contentHeight;
	this.contentHeightPercent = contentHeightPercent;
	this.wordWrap = wordWrap;
	this.imageRendering = imageRendering;
	this.backgroundWidth = backgroundWidth;
	this.backgroundWidthPercent = backgroundWidthPercent;
	this.backgroundHeight = backgroundHeight;
	this.backgroundHeightPercent = backgroundHeightPercent;
	this.layout = layout;
	this.borderType = borderType;
	this.hasBorder = hasBorder;
	this.fullBorderSize = fullBorderSize;
};
$hxClasses["haxe.ui.styles.Style"] = haxe_ui_styles_Style;
haxe_ui_styles_Style.__name__ = "haxe.ui.styles.Style";
haxe_ui_styles_Style.prototype = {
	left: null
	,top: null
	,autoWidth: null
	,width: null
	,percentWidth: null
	,minWidth: null
	,minPercentWidth: null
	,maxWidth: null
	,maxPercentWidth: null
	,initialWidth: null
	,initialPercentWidth: null
	,autoHeight: null
	,height: null
	,percentHeight: null
	,minHeight: null
	,minPercentHeight: null
	,maxHeight: null
	,maxPercentHeight: null
	,initialHeight: null
	,initialPercentHeight: null
	,padding: null
	,paddingTop: null
	,paddingLeft: null
	,paddingRight: null
	,paddingBottom: null
	,set_padding: function(value) {
		this.paddingTop = value;
		this.paddingLeft = value;
		this.paddingRight = value;
		this.paddingBottom = value;
		return value;
	}
	,marginTop: null
	,marginLeft: null
	,marginRight: null
	,marginBottom: null
	,horizontalSpacing: null
	,verticalSpacing: null
	,color: null
	,backgroundColor: null
	,backgroundOpacity: null
	,backgroundColorEnd: null
	,backgroundGradientStyle: null
	,backgroundImage: null
	,backgroundImageRepeat: null
	,backgroundPositionX: null
	,backgroundPositionY: null
	,backgroundImageClipTop: null
	,backgroundImageClipLeft: null
	,backgroundImageClipBottom: null
	,backgroundImageClipRight: null
	,backgroundImageSliceTop: null
	,backgroundImageSliceLeft: null
	,backgroundImageSliceBottom: null
	,backgroundImageSliceRight: null
	,borderColor: null
	,borderTopColor: null
	,borderLeftColor: null
	,borderBottomColor: null
	,borderRightColor: null
	,borderSize: null
	,borderTopSize: null
	,borderLeftSize: null
	,borderBottomSize: null
	,borderRightSize: null
	,borderRadius: null
	,borderRadiusTopLeft: null
	,borderRadiusTopRight: null
	,borderRadiusBottomLeft: null
	,borderRadiusBottomRight: null
	,borderOpacity: null
	,borderStyle: null
	,icon: null
	,iconPosition: null
	,horizontalAlign: null
	,verticalAlign: null
	,textAlign: null
	,opacity: null
	,clip: null
	,native: null
	,fontName: null
	,fontSize: null
	,fontBold: null
	,fontUnderline: null
	,fontItalic: null
	,fontStrikeThrough: null
	,cursor: null
	,hidden: null
	,filter: null
	,backdropFilter: null
	,resource: null
	,animationName: null
	,animationOptions: null
	,mode: null
	,pointerEvents: null
	,contentType: null
	,direction: null
	,contentWidth: null
	,contentWidthPercent: null
	,contentHeight: null
	,contentHeightPercent: null
	,wordWrap: null
	,imageRendering: null
	,backgroundWidth: null
	,backgroundWidthPercent: null
	,backgroundHeight: null
	,backgroundHeightPercent: null
	,layout: null
	,borderType: null
	,get_borderType: function() {
		var t = haxe_ui_styles_StyleBorderType.Compound;
		if(this.borderLeftSize != null && this.borderLeftSize > 0 && this.borderLeftSize == this.borderRightSize && this.borderLeftSize == this.borderBottomSize && this.borderLeftSize == this.borderTopSize) {
			t = haxe_ui_styles_StyleBorderType.Full;
		} else if((this.borderLeftSize == null || this.borderLeftSize <= 0) && (this.borderRightSize == null || this.borderRightSize <= 0) && (this.borderBottomSize == null || this.borderRightSize <= 0) && (this.borderTopSize == null || this.borderTopSize <= 0)) {
			t = haxe_ui_styles_StyleBorderType.None;
		}
		return t;
	}
	,hasBorder: null
	,get_hasBorder: function() {
		return this.get_borderType() != haxe_ui_styles_StyleBorderType.None;
	}
	,fullBorderSize: null
	,get_fullBorderSize: function() {
		if(this.get_borderType() == haxe_ui_styles_StyleBorderType.Full) {
			return this.borderLeftSize;
		}
		return 0;
	}
	,mergeDirectives: function(map) {
		var h = map.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			var v = map.h[key];
			switch(key) {
			case "animation-delay":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.delay = haxe_ui_styles_ValueTools.time(v.value);
				break;
			case "animation-direction":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.direction = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-duration":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.duration = haxe_ui_styles_ValueTools.time(v.value);
				break;
			case "animation-fill-mode":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.fillMode = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-iteration-count":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				var _g = v.value;
				var tmp;
				if(_g._hx_index == 6) {
					var val = _g.v;
					tmp = val == "infinite" ? -1 : 0;
				} else {
					tmp = haxe_ui_styles_ValueTools.int(v.value);
				}
				this.animationOptions.iterationCount = tmp;
				break;
			case "animation-name":
				this.animationName = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "animation-timing-function":
				if(this.animationOptions == null) {
					this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
				}
				this.animationOptions.easingFunction = haxe_ui_styles_ValueTools.calcEasing(v.value);
				break;
			case "backdrop-filter":
				var _g1 = v.value;
				switch(_g1._hx_index) {
				case 5:
					var f = _g1.f;
					var vl = _g1.vl;
					var arr = haxe_ui_styles_ValueTools.array(vl);
					arr.splice(0,0,f);
					this.backdropFilter = [haxe_ui_filters_FilterParser.parseFilter(arr)];
					break;
				case 6:
					var f1 = _g1.v;
					this.backdropFilter = [haxe_ui_filters_FilterParser.parseFilter([f1])];
					break;
				case 9:
					this.backdropFilter = null;
					break;
				default:
				}
				break;
			case "background-color":
				var _g2 = v.value;
				this.backgroundColor = haxe_ui_styles_ValueTools.int(v.value);
				if(Object.prototype.hasOwnProperty.call(map.h,"background-color-end")) {
					this.backgroundColorEnd = haxe_ui_styles_ValueTools.int(map.h["background-color-end"].value);
				} else {
					this.backgroundColorEnd = null;
				}
				break;
			case "background-color-end":
				this.backgroundColorEnd = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "background-gradient-style":
				this.backgroundGradientStyle = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "background-height":
				this.backgroundHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.backgroundHeightPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "background-image":
				this.backgroundImage = haxe_ui_styles_ValueTools.variant(v.value);
				break;
			case "background-image-clip-bottom":
				this.backgroundImageClipBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-left":
				this.backgroundImageClipLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-right":
				this.backgroundImageClipRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-clip-top":
				this.backgroundImageClipTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-repeat":
				this.backgroundImageRepeat = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "background-image-slice-bottom":
				this.backgroundImageSliceBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-left":
				this.backgroundImageSliceLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-right":
				this.backgroundImageSliceRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-image-slice-top":
				this.backgroundImageSliceTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-opacity":
				this.backgroundOpacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "background-position-x":
				this.backgroundPositionX = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-position-y":
				this.backgroundPositionY = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "background-width":
				this.backgroundWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.backgroundWidthPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "border-bottom-color":
				this.borderBottomColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-bottom-left-radius":
				this.borderRadiusBottomLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-bottom-right-radius":
				this.borderRadiusBottomRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-bottom-size":case "border-bottom-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderBottomSize = 0;
				} else {
					this.borderBottomSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-color":
				this.borderColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-left-color":
				this.borderLeftColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-left-size":case "border-left-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderLeftSize = 0;
				} else {
					this.borderLeftSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-opacity":
				this.borderOpacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "border-radius":
				this.borderRadius = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-right-color":
				this.borderRightColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-right-size":case "border-right-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderRightSize = 0;
				} else {
					this.borderRightSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "border-style":
				this.borderStyle = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "border-top-color":
				this.borderTopColor = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "border-top-left-radius":
				this.borderRadiusTopLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-top-right-radius":
				this.borderRadiusTopRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "border-top-size":case "border-top-width":
				if(v.value == haxe_ui_styles_Value.VNone) {
					this.borderTopSize = 0;
				} else {
					this.borderTopSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				}
				break;
			case "clip":
				this.clip = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "color":
				this.color = haxe_ui_styles_ValueTools.int(v.value);
				break;
			case "content-height":
				this.contentHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.contentHeightPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "content-type":
				this.contentType = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "content-width":
				this.contentWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.contentWidthPercent = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "cursor":
				this.cursor = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "direction":
				this.direction = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "display":
				this.hidden = haxe_ui_styles_ValueTools.none(v.value);
				break;
			case "filter":
				var _g3 = v.value;
				switch(_g3._hx_index) {
				case 5:
					var f2 = _g3.f;
					var vl1 = _g3.vl;
					var arr1 = haxe_ui_styles_ValueTools.array(vl1);
					arr1.splice(0,0,f2);
					this.filter = [haxe_ui_filters_FilterParser.parseFilter(arr1)];
					break;
				case 6:
					var f3 = _g3.v;
					this.filter = [haxe_ui_filters_FilterParser.parseFilter([f3])];
					break;
				case 9:
					this.filter = null;
					break;
				default:
				}
				break;
			case "font-bold":
				this.fontBold = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "font-family":case "font-name":
				this.fontName = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "font-italic":
				this.fontItalic = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "font-size":
				this.fontSize = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "font-style":
				if(haxe_ui_styles_ValueTools.string(v.value) != null) {
					this.fontItalic = haxe_ui_styles_ValueTools.string(v.value).toLowerCase() == "italic";
				}
				break;
			case "font-underline":
				this.fontUnderline = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "font-weight":
				if(haxe_ui_styles_ValueTools.string(v.value) != null) {
					this.fontBold = haxe_ui_styles_ValueTools.string(v.value).toLowerCase() == "bold";
				}
				break;
			case "height":
				this.autoHeight = haxe_ui_styles_ValueTools.constant(v.value,"auto");
				this.height = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.percentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "hidden":
				this.hidden = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "horizontal-align":
				this.horizontalAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "horizontal-spacing":
				this.horizontalSpacing = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "icon":
				if(v.value._hx_index == 9) {
					this.icon = null;
				} else {
					this.icon = haxe_ui_styles_ValueTools.variant(v.value);
				}
				break;
			case "icon-position":
				this.iconPosition = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "image-rendering":
				if(v.value._hx_index == 9) {
					this.imageRendering = null;
				} else {
					this.imageRendering = haxe_ui_styles_ValueTools.string(v.value);
				}
				break;
			case "initial-height":
				this.initialHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.initialPercentHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "initial-width":
				this.initialWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.initialPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "layout":
				if(v.value._hx_index == 9) {
					this.layout = null;
				} else {
					this.layout = haxe_ui_styles_ValueTools.string(v.value);
				}
				break;
			case "left":
				this.left = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-bottom":
				this.marginBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-left":
				this.marginLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-right":
				this.marginRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "margin-top":
				this.marginTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "max-height":
				this.maxHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.maxPercentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "max-width":
				this.maxWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.maxPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "min-height":
				this.minHeight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.minPercentHeight = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "min-width":
				this.minWidth = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.minPercentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "mode":
				this.mode = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "native":
				this.native = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			case "opacity":
				this.opacity = haxe_ui_styles_ValueTools.float(v.value);
				break;
			case "padding-bottom":
				this.paddingBottom = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-left":
				this.paddingLeft = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-right":
				this.paddingRight = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "padding-top":
				this.paddingTop = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "pointer-events":
				if(v.value._hx_index == 9) {
					this.pointerEvents = "none";
				} else {
					this.pointerEvents = haxe_ui_styles_ValueTools.string(v.value);
				}
				break;
			case "resource":
				this.resource = haxe_ui_styles_ValueTools.variant(v.value);
				break;
			case "text-align":
				this.textAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "text-decoration":
				if(haxe_ui_styles_ValueTools.string(v.value) != null) {
					this.fontUnderline = haxe_ui_styles_ValueTools.string(v.value).toLowerCase() == "underline";
					this.fontStrikeThrough = haxe_ui_styles_ValueTools.string(v.value).toLowerCase() == "line-through";
				}
				break;
			case "top":
				this.top = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "vertical-align":
				this.verticalAlign = haxe_ui_styles_ValueTools.string(v.value);
				break;
			case "vertical-spacing":
				this.verticalSpacing = haxe_ui_styles_ValueTools.calcDimension(v.value);
				break;
			case "width":
				this.autoWidth = haxe_ui_styles_ValueTools.constant(v.value,"auto");
				this.width = haxe_ui_styles_ValueTools.calcDimension(v.value);
				this.percentWidth = haxe_ui_styles_ValueTools.percent(v.value);
				break;
			case "word-wrap":
				this.wordWrap = haxe_ui_styles_ValueTools.bool(v.value);
				break;
			}
		}
	}
	,apply: function(s) {
		if(s.cursor != null) {
			this.cursor = s.cursor;
		}
		if(s.hidden != null) {
			this.hidden = s.hidden;
		}
		if(s.left != null) {
			this.left = s.left;
		}
		if(s.top != null) {
			this.top = s.top;
		}
		if(s.autoWidth != null) {
			this.autoWidth = s.autoWidth;
		}
		if(s.autoHeight != null) {
			this.autoHeight = s.autoHeight;
		}
		if(s.verticalSpacing != null) {
			this.verticalSpacing = s.verticalSpacing;
		}
		if(s.horizontalSpacing != null) {
			this.horizontalSpacing = s.horizontalSpacing;
		}
		if(s.width != null) {
			this.width = s.width;
			this.autoWidth = false;
		}
		if(s.initialWidth != null) {
			this.initialWidth = s.initialWidth;
		}
		if(s.initialPercentWidth != null) {
			this.initialPercentWidth = s.initialPercentWidth;
		}
		if(s.minWidth != null) {
			this.minWidth = s.minWidth;
		}
		if(s.minPercentWidth != null) {
			this.minPercentWidth = s.minPercentWidth;
		}
		if(s.maxWidth != null) {
			this.maxWidth = s.maxWidth;
		}
		if(s.maxPercentWidth != null) {
			this.maxPercentWidth = s.maxPercentWidth;
		}
		if(s.height != null) {
			this.height = s.height;
			this.autoHeight = false;
		}
		if(s.initialHeight != null) {
			this.initialHeight = s.initialHeight;
		}
		if(s.initialPercentHeight != null) {
			this.initialPercentHeight = s.initialPercentHeight;
		}
		if(s.minHeight != null) {
			this.minHeight = s.minHeight;
		}
		if(s.minPercentHeight != null) {
			this.minPercentHeight = s.minPercentHeight;
		}
		if(s.maxHeight != null) {
			this.maxHeight = s.maxHeight;
		}
		if(s.maxPercentHeight != null) {
			this.maxPercentHeight = s.maxPercentHeight;
		}
		if(s.percentWidth != null) {
			this.percentWidth = s.percentWidth;
			this.autoWidth = false;
		}
		if(s.percentHeight != null) {
			this.percentHeight = s.percentHeight;
			this.autoHeight = false;
		}
		if(s.paddingTop != null) {
			this.paddingTop = s.paddingTop;
		}
		if(s.paddingLeft != null) {
			this.paddingLeft = s.paddingLeft;
		}
		if(s.paddingRight != null) {
			this.paddingRight = s.paddingRight;
		}
		if(s.paddingBottom != null) {
			this.paddingBottom = s.paddingBottom;
		}
		if(s.marginTop != null) {
			this.marginTop = s.marginTop;
		}
		if(s.marginLeft != null) {
			this.marginLeft = s.marginLeft;
		}
		if(s.marginRight != null) {
			this.marginRight = s.marginRight;
		}
		if(s.marginBottom != null) {
			this.marginBottom = s.marginBottom;
		}
		if(s.color != null) {
			this.color = s.color;
		}
		if(s.backgroundColor != null) {
			this.backgroundColor = s.backgroundColor;
			this.backgroundColorEnd = null;
		}
		if(s.backgroundColorEnd != null) {
			this.backgroundColorEnd = s.backgroundColorEnd;
		}
		if(s.backgroundGradientStyle != null) {
			this.backgroundGradientStyle = s.backgroundGradientStyle;
		}
		if(s.backgroundOpacity != null) {
			this.backgroundOpacity = s.backgroundOpacity;
		}
		if(s.backgroundImage != null) {
			this.backgroundImage = s.backgroundImage;
		}
		if(s.backgroundImageRepeat != null) {
			this.backgroundImageRepeat = s.backgroundImageRepeat;
		}
		if(s.backgroundImageClipTop != null) {
			this.backgroundImageClipTop = s.backgroundImageClipTop;
		}
		if(s.backgroundImageClipLeft != null) {
			this.backgroundImageClipLeft = s.backgroundImageClipLeft;
		}
		if(s.backgroundImageClipBottom != null) {
			this.backgroundImageClipBottom = s.backgroundImageClipBottom;
		}
		if(s.backgroundImageClipRight != null) {
			this.backgroundImageClipRight = s.backgroundImageClipRight;
		}
		if(s.backgroundImageSliceTop != null) {
			this.backgroundImageSliceTop = s.backgroundImageSliceTop;
		}
		if(s.backgroundImageSliceLeft != null) {
			this.backgroundImageSliceLeft = s.backgroundImageSliceLeft;
		}
		if(s.backgroundImageSliceBottom != null) {
			this.backgroundImageSliceBottom = s.backgroundImageSliceBottom;
		}
		if(s.backgroundImageSliceRight != null) {
			this.backgroundImageSliceRight = s.backgroundImageSliceRight;
		}
		if(s.borderColor != null) {
			this.borderColor = s.borderColor;
		}
		if(s.borderTopColor != null) {
			this.borderTopColor = s.borderTopColor;
		}
		if(s.borderLeftColor != null) {
			this.borderLeftColor = s.borderLeftColor;
		}
		if(s.borderBottomColor != null) {
			this.borderBottomColor = s.borderBottomColor;
		}
		if(s.borderRightColor != null) {
			this.borderRightColor = s.borderRightColor;
		}
		if(s.borderSize != null) {
			this.borderSize = s.borderSize;
		}
		if(s.borderTopSize != null) {
			this.borderTopSize = s.borderTopSize;
		}
		if(s.borderLeftSize != null) {
			this.borderLeftSize = s.borderLeftSize;
		}
		if(s.borderBottomSize != null) {
			this.borderBottomSize = s.borderBottomSize;
		}
		if(s.borderRightSize != null) {
			this.borderRightSize = s.borderRightSize;
		}
		if(s.borderRadius != null) {
			this.borderRadius = s.borderRadius;
		}
		if(s.borderRadiusTopLeft != null) {
			this.borderRadiusTopLeft = s.borderRadiusTopLeft;
		}
		if(s.borderRadiusTopRight != null) {
			this.borderRadiusTopRight = s.borderRadiusTopRight;
		}
		if(s.borderRadiusBottomLeft != null) {
			this.borderRadiusBottomLeft = s.borderRadiusBottomLeft;
		}
		if(s.borderRadiusBottomRight != null) {
			this.borderRadiusBottomRight = s.borderRadiusBottomRight;
		}
		if(s.borderOpacity != null) {
			this.borderOpacity = s.borderOpacity;
		}
		if(s.borderStyle != null) {
			this.borderStyle = s.borderStyle;
		}
		if(s.filter != null) {
			this.filter = s.filter.slice();
		}
		if(s.backdropFilter != null) {
			this.backdropFilter = s.backdropFilter.slice();
		}
		if(s.resource != null) {
			this.resource = s.resource;
		}
		if(s.icon != null) {
			this.icon = s.icon;
		}
		if(s.iconPosition != null) {
			this.iconPosition = s.iconPosition;
		}
		if(s.horizontalAlign != null) {
			this.horizontalAlign = s.horizontalAlign;
		}
		if(s.verticalAlign != null) {
			this.verticalAlign = s.verticalAlign;
		}
		if(s.textAlign != null) {
			this.textAlign = s.textAlign;
		}
		if(s.opacity != null) {
			this.opacity = s.opacity;
		}
		if(s.clip != null) {
			this.clip = s.clip;
		}
		if(s.native != null) {
			this.native = s.native;
		}
		if(s.fontName != null) {
			this.fontName = s.fontName;
		}
		if(s.fontSize != null) {
			this.fontSize = s.fontSize;
		}
		if(s.fontBold != null) {
			this.fontBold = s.fontBold;
		}
		if(s.fontUnderline != null) {
			this.fontUnderline = s.fontUnderline;
		}
		if(s.fontStrikeThrough != null) {
			this.fontStrikeThrough = s.fontStrikeThrough;
		}
		if(s.fontItalic != null) {
			this.fontItalic = s.fontItalic;
		}
		if(s.animationName != null) {
			this.animationName = s.animationName;
		}
		if(s.animationOptions != null) {
			if(this.animationOptions == null) {
				this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
			}
			if(s.animationOptions.duration != null) {
				this.animationOptions.duration = s.animationOptions.duration;
			}
			if(s.animationOptions.delay != null) {
				this.animationOptions.delay = s.animationOptions.delay;
			}
			if(s.animationOptions.iterationCount != null) {
				this.animationOptions.iterationCount = s.animationOptions.iterationCount;
			}
			if(s.animationOptions.easingFunction != null) {
				this.animationOptions.easingFunction = s.animationOptions.easingFunction;
			}
			if(s.animationOptions.direction != null) {
				this.animationOptions.direction = s.animationOptions.direction;
			}
			if(s.animationOptions.fillMode != null) {
				this.animationOptions.fillMode = s.animationOptions.fillMode;
			}
		}
		if(s.mode != null) {
			this.mode = s.mode;
		}
		if(s.pointerEvents != null) {
			this.pointerEvents = s.pointerEvents;
		}
		if(s.contentType != null) {
			this.contentType = s.contentType;
		}
		if(s.direction != null) {
			this.direction = s.direction;
		}
		if(s.contentWidth != null) {
			this.contentWidth = s.contentWidth;
		}
		if(s.contentWidthPercent != null) {
			this.contentWidthPercent = s.contentWidthPercent;
		}
		if(s.contentHeight != null) {
			this.contentHeight = s.contentHeight;
		}
		if(s.contentHeightPercent != null) {
			this.contentHeightPercent = s.contentHeightPercent;
		}
		if(s.wordWrap != null) {
			this.wordWrap = s.wordWrap;
		}
		if(s.imageRendering != null) {
			this.imageRendering = s.imageRendering;
		}
		if(s.backgroundWidth != null) {
			this.backgroundWidth = s.backgroundWidth;
		}
		if(s.backgroundWidthPercent != null) {
			this.backgroundWidthPercent = s.backgroundWidthPercent;
		}
		if(s.backgroundHeight != null) {
			this.backgroundHeight = s.backgroundHeight;
		}
		if(s.backgroundHeightPercent != null) {
			this.backgroundHeightPercent = s.backgroundHeightPercent;
		}
		if(s.layout != null) {
			this.layout = s.layout;
		}
	}
	,equalTo: function(s) {
		if(s.backgroundColor != this.backgroundColor) {
			return false;
		}
		if(s.backgroundColorEnd != this.backgroundColorEnd) {
			return false;
		}
		if(s.backgroundGradientStyle != this.backgroundGradientStyle) {
			return false;
		}
		if(s.backgroundOpacity != this.backgroundOpacity) {
			return false;
		}
		if(s.borderColor != this.borderColor) {
			return false;
		}
		if(s.borderTopColor != this.borderTopColor) {
			return false;
		}
		if(s.borderLeftColor != this.borderLeftColor) {
			return false;
		}
		if(s.borderBottomColor != this.borderBottomColor) {
			return false;
		}
		if(s.borderRightColor != this.borderRightColor) {
			return false;
		}
		if(s.borderSize != this.borderSize) {
			return false;
		}
		if(s.borderTopSize != this.borderTopSize) {
			return false;
		}
		if(s.borderLeftSize != this.borderLeftSize) {
			return false;
		}
		if(s.borderBottomSize != this.borderBottomSize) {
			return false;
		}
		if(s.borderRightSize != this.borderRightSize) {
			return false;
		}
		if(s.borderRadius != this.borderRadius) {
			return false;
		}
		if(s.borderRadiusTopLeft != this.borderRadiusTopLeft) {
			return false;
		}
		if(s.borderRadiusTopRight != this.borderRadiusTopRight) {
			return false;
		}
		if(s.borderRadiusBottomLeft != this.borderRadiusBottomLeft) {
			return false;
		}
		if(s.borderRadiusBottomRight != this.borderRadiusBottomRight) {
			return false;
		}
		if(s.borderOpacity != this.borderOpacity) {
			return false;
		}
		if(s.borderStyle != this.borderStyle) {
			return false;
		}
		if(s.color != this.color) {
			return false;
		}
		if(s.cursor != this.cursor) {
			return false;
		}
		if(s.hidden != this.hidden) {
			return false;
		}
		if(s.left != this.left) {
			return false;
		}
		if(s.top != this.top) {
			return false;
		}
		if(s.autoWidth != this.autoWidth) {
			return false;
		}
		if(s.autoHeight != this.autoHeight) {
			return false;
		}
		if(s.verticalSpacing != this.verticalSpacing) {
			return false;
		}
		if(s.horizontalSpacing != this.horizontalSpacing) {
			return false;
		}
		if(s.width != this.width) {
			return false;
		}
		if(s.initialWidth != this.initialWidth) {
			return false;
		}
		if(s.initialPercentWidth != this.initialPercentWidth) {
			return false;
		}
		if(s.minWidth != this.minWidth) {
			return false;
		}
		if(s.minPercentWidth != this.minPercentWidth) {
			return false;
		}
		if(s.maxWidth != this.maxWidth) {
			return false;
		}
		if(s.maxPercentWidth != this.maxPercentWidth) {
			return false;
		}
		if(s.height != this.height) {
			return false;
		}
		if(s.initialHeight != this.initialHeight) {
			return false;
		}
		if(s.initialPercentHeight != this.initialPercentHeight) {
			return false;
		}
		if(s.minHeight != this.minHeight) {
			return false;
		}
		if(s.minPercentHeight != this.minPercentHeight) {
			return false;
		}
		if(s.maxHeight != this.maxHeight) {
			return false;
		}
		if(s.maxPercentHeight != this.maxPercentHeight) {
			return false;
		}
		if(s.percentWidth != this.percentWidth) {
			return false;
		}
		if(s.percentHeight != this.percentHeight) {
			return false;
		}
		if(s.paddingTop != this.paddingTop) {
			return false;
		}
		if(s.paddingLeft != this.paddingLeft) {
			return false;
		}
		if(s.paddingRight != this.paddingRight) {
			return false;
		}
		if(s.paddingBottom != this.paddingBottom) {
			return false;
		}
		if(s.marginTop != this.marginTop) {
			return false;
		}
		if(s.marginLeft != this.marginLeft) {
			return false;
		}
		if(s.marginRight != this.marginRight) {
			return false;
		}
		if(s.marginBottom != this.marginBottom) {
			return false;
		}
		if(haxe_ui_util_Variant.neq(s.backgroundImage,this.backgroundImage)) {
			return false;
		}
		if(s.backgroundImageRepeat != this.backgroundImageRepeat) {
			return false;
		}
		if(s.backgroundImageClipTop != this.backgroundImageClipTop) {
			return false;
		}
		if(s.backgroundImageClipLeft != this.backgroundImageClipLeft) {
			return false;
		}
		if(s.backgroundImageClipBottom != this.backgroundImageClipBottom) {
			return false;
		}
		if(s.backgroundImageClipRight != this.backgroundImageClipRight) {
			return false;
		}
		if(s.backgroundImageSliceTop != this.backgroundImageSliceTop) {
			return false;
		}
		if(s.backgroundImageSliceLeft != this.backgroundImageSliceLeft) {
			return false;
		}
		if(s.backgroundImageSliceBottom != this.backgroundImageSliceBottom) {
			return false;
		}
		if(s.backgroundImageSliceRight != this.backgroundImageSliceRight) {
			return false;
		}
		if(s.filter != this.filter) {
			return false;
		}
		if(s.backdropFilter != this.backdropFilter) {
			return false;
		}
		if(haxe_ui_util_Variant.neq(s.resource,this.resource)) {
			return false;
		}
		if(haxe_ui_util_Variant.neq(s.icon,this.icon)) {
			return false;
		}
		if(s.iconPosition != this.iconPosition) {
			return false;
		}
		if(s.horizontalAlign != this.horizontalAlign) {
			return false;
		}
		if(s.verticalAlign != this.verticalAlign) {
			return false;
		}
		if(s.textAlign != this.textAlign) {
			return false;
		}
		if(s.opacity != this.opacity) {
			return false;
		}
		if(s.clip != this.clip) {
			return false;
		}
		if(s.native != this.native) {
			return false;
		}
		if(s.fontName != this.fontName) {
			return false;
		}
		if(s.fontSize != this.fontSize) {
			return false;
		}
		if(s.fontBold != this.fontBold) {
			return false;
		}
		if(s.fontUnderline != this.fontUnderline) {
			return false;
		}
		if(s.fontStrikeThrough != this.fontStrikeThrough) {
			return false;
		}
		if(s.fontItalic != this.fontItalic) {
			return false;
		}
		if(haxe_ui_util_Variant.neq(s.resource,this.resource)) {
			return false;
		}
		if(s.animationName != this.animationName) {
			return false;
		}
		if(this.animationOptions != null && this.animationOptions.compareTo(s.animationOptions) == false) {
			return false;
		}
		if(s.mode != this.mode) {
			return false;
		}
		if(s.pointerEvents != this.pointerEvents) {
			return false;
		}
		if(s.contentType != this.contentType) {
			return false;
		}
		if(s.direction != this.direction) {
			return false;
		}
		if(s.contentWidth != this.contentWidth) {
			return false;
		}
		if(s.contentWidthPercent != this.contentWidthPercent) {
			return false;
		}
		if(s.contentHeight != this.contentHeight) {
			return false;
		}
		if(s.contentHeightPercent != this.contentHeightPercent) {
			return false;
		}
		if(s.wordWrap != this.wordWrap) {
			return false;
		}
		if(s.imageRendering != this.imageRendering) {
			return false;
		}
		if(s.backgroundWidth != this.backgroundWidth) {
			return false;
		}
		if(s.backgroundWidthPercent != this.backgroundWidthPercent) {
			return false;
		}
		if(s.backgroundHeight != this.backgroundHeight) {
			return false;
		}
		if(s.backgroundHeightPercent != this.backgroundHeightPercent) {
			return false;
		}
		if(s.layout != this.layout) {
			return false;
		}
		return true;
	}
	,createAnimationOptions: function() {
		if(this.animationOptions == null) {
			this.animationOptions = new haxe_ui_styles_animation_AnimationOptions(null,null,null,null,null,null);
		}
	}
	,clone: function() {
		var c = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		c.apply(this);
		return c;
	}
	,__class__: haxe_ui_styles_Style
	,__properties__: {get_fullBorderSize:"get_fullBorderSize",get_hasBorder:"get_hasBorder",get_borderType:"get_borderType",set_padding:"set_padding"}
};
var haxe_ui_styles_StyleLookupMap = function() {
	this._valueMap = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.styles.StyleLookupMap"] = haxe_ui_styles_StyleLookupMap;
haxe_ui_styles_StyleLookupMap.__name__ = "haxe.ui.styles.StyleLookupMap";
haxe_ui_styles_StyleLookupMap.__properties__ = {get_instance:"get_instance"};
haxe_ui_styles_StyleLookupMap.get_instance = function() {
	if(haxe_ui_styles_StyleLookupMap._instance == null) {
		haxe_ui_styles_StyleLookupMap._instance = new haxe_ui_styles_StyleLookupMap();
	}
	return haxe_ui_styles_StyleLookupMap._instance;
};
haxe_ui_styles_StyleLookupMap.prototype = {
	_valueMap: null
	,set: function(name,value) {
		this._valueMap.h[name] = value;
	}
	,get: function(name) {
		return this._valueMap.h[name];
	}
	,remove: function(name) {
		var _this = this._valueMap;
		if(Object.prototype.hasOwnProperty.call(_this.h,name)) {
			delete(_this.h[name]);
		}
	}
	,__class__: haxe_ui_styles_StyleLookupMap
};
var haxe_ui_styles_StyleSheet = function() {
	this._animations = new haxe_ds_StringMap();
	this._mediaQueries = [];
	this._rules = [];
	this._imports = [];
};
$hxClasses["haxe.ui.styles.StyleSheet"] = haxe_ui_styles_StyleSheet;
haxe_ui_styles_StyleSheet.__name__ = "haxe.ui.styles.StyleSheet";
haxe_ui_styles_StyleSheet.prototype = {
	name: null
	,_imports: null
	,_rules: null
	,_mediaQueries: null
	,_animations: null
	,get_animations: function() {
		return this._animations;
	}
	,addImport: function(el) {
		this._imports.push(el);
	}
	,imports: null
	,get_imports: function() {
		return this._imports;
	}
	,rules: null
	,get_rules: function() {
		var r = this._rules.slice();
		var _g = 0;
		var _g1 = this._mediaQueries;
		while(_g < _g1.length) {
			var mq = _g1[_g];
			++_g;
			if(mq.get_relevant()) {
				r = r.concat(mq.get_styleSheet().get_rules());
			}
		}
		return r;
	}
	,hasMediaQueries: null
	,get_hasMediaQueries: function() {
		return this._mediaQueries.length > 0;
	}
	,findRule: function(selector) {
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.selector.toString() == selector) {
				return r;
			}
		}
		return null;
	}
	,findMatchingRules: function(selector) {
		var m = [];
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(r.selector.toString() == selector) {
				m.push(r);
			}
		}
		return m;
	}
	,removeRule: function(selector) {
		var r = this.findRule(selector);
		if(r != null) {
			HxOverrides.remove(this._rules,r);
		}
	}
	,removeAllRules: function() {
		this._rules = [];
	}
	,clear: function() {
		this.removeAllRules();
		this._imports = [];
		this._mediaQueries = [];
		this._animations = new haxe_ds_StringMap();
	}
	,addRule: function(el) {
		if(el.directiveCount == 0) {
			return;
		}
		this._rules.push(el);
	}
	,addMediaQuery: function(el) {
		this._mediaQueries.push(el);
	}
	,addAnimation: function(el) {
		this._animations.h[el.id] = el;
	}
	,parse: function(css) {
		var parser = new haxe_ui_styles_Parser();
		var ss = parser.parse(css);
		var f = new haxe_ui_styles_StyleSheet();
		var _g = 0;
		var _g1 = ss.get_imports();
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var importCss = haxe_ui_ToolkitAssets.get_instance().getText(i.url);
			var importStyleSheet = new haxe_ui_styles_Parser().parse(importCss);
			f.merge(importStyleSheet);
		}
		f.merge(ss);
		this.merge(f);
	}
	,merge: function(styleSheet) {
		this._imports = this._imports.concat(styleSheet._imports);
		this._rules = this._rules.concat(styleSheet._rules);
		this._mediaQueries = this._mediaQueries.concat(styleSheet._mediaQueries);
		var h = styleSheet._animations.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			this._animations.h[k] = styleSheet._animations.h[k];
		}
	}
	,buildStyleFor: function(c,style) {
		if(style == null) {
			style = new haxe_ui_styles_Style(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		var _g = 0;
		var _g1 = this.get_rules();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(!r.match(c)) {
				continue;
			}
			style.mergeDirectives(r.directives);
		}
		return style;
	}
	,__class__: haxe_ui_styles_StyleSheet
	,__properties__: {get_hasMediaQueries:"get_hasMediaQueries",get_rules:"get_rules",get_imports:"get_imports",get_animations:"get_animations"}
};
var haxe_ui_styles_Value = $hxEnums["haxe.ui.styles.Value"] = { __ename__:true,__constructs__:null
	,VString: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VString",$_.__params__ = ["v"],$_)
	,VNumber: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VNumber",$_.__params__ = ["v"],$_)
	,VBool: ($_=function(v) { return {_hx_index:2,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VBool",$_.__params__ = ["v"],$_)
	,VDimension: ($_=function(v) { return {_hx_index:3,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VDimension",$_.__params__ = ["v"],$_)
	,VColor: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VColor",$_.__params__ = ["v"],$_)
	,VCall: ($_=function(f,vl) { return {_hx_index:5,f:f,vl:vl,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VCall",$_.__params__ = ["f","vl"],$_)
	,VConstant: ($_=function(v) { return {_hx_index:6,v:v,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VConstant",$_.__params__ = ["v"],$_)
	,VComposite: ($_=function(vl) { return {_hx_index:7,vl:vl,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VComposite",$_.__params__ = ["vl"],$_)
	,VTime: ($_=function(v,unit) { return {_hx_index:8,v:v,unit:unit,__enum__:"haxe.ui.styles.Value",toString:$estr}; },$_._hx_name="VTime",$_.__params__ = ["v","unit"],$_)
	,VNone: {_hx_name:"VNone",_hx_index:9,__enum__:"haxe.ui.styles.Value",toString:$estr}
};
haxe_ui_styles_Value.__constructs__ = [haxe_ui_styles_Value.VString,haxe_ui_styles_Value.VNumber,haxe_ui_styles_Value.VBool,haxe_ui_styles_Value.VDimension,haxe_ui_styles_Value.VColor,haxe_ui_styles_Value.VCall,haxe_ui_styles_Value.VConstant,haxe_ui_styles_Value.VComposite,haxe_ui_styles_Value.VTime,haxe_ui_styles_Value.VNone];
var haxe_ui_styles_ValueTools = function() { };
$hxClasses["haxe.ui.styles.ValueTools"] = haxe_ui_styles_ValueTools;
haxe_ui_styles_ValueTools.__name__ = "haxe.ui.styles.ValueTools";
haxe_ui_styles_ValueTools.parse = function(s) {
	var v = null;
	var hasSpace = s.indexOf(" ") != -1;
	if(StringTools.endsWith(s,"%") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.PERCENT(parseFloat(s)));
	} else if(StringTools.endsWith(s,"px") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.PX(parseFloat(s)));
	} else if(StringTools.endsWith(s,"vw") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.VW(parseFloat(s)));
	} else if(StringTools.endsWith(s,"vh") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.VH(parseFloat(s)));
	} else if(StringTools.endsWith(s,"rem") == true && hasSpace == false) {
		v = haxe_ui_styles_Value.VDimension(haxe_ui_styles_Dimension.REM(parseFloat(s)));
	} else if(haxe_ui_styles_ValueTools.validColor(s)) {
		v = haxe_ui_styles_ValueTools.parseColor(s);
	} else if(s == "none") {
		v = haxe_ui_styles_Value.VNone;
	} else if(s.indexOf("(") != -1 && StringTools.endsWith(s,")")) {
		var n = s.indexOf("(");
		var f = HxOverrides.substr(s,0,n);
		var params = HxOverrides.substr(s,n + 1,s.length - n - 2);
		if(f == "calc") {
			params = "'" + params + "'";
		}
		var vl = [];
		var _g = 0;
		var _g1 = params.split(",");
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p = StringTools.trim(p);
			vl.push(haxe_ui_styles_ValueTools.parse(p));
		}
		v = haxe_ui_styles_Value.VCall(f,vl);
	} else if(StringTools.startsWith(s,"\"") && StringTools.endsWith(s,"\"")) {
		v = haxe_ui_styles_Value.VString(HxOverrides.substr(s,1,s.length - 2));
	} else if(StringTools.startsWith(s,"'") && StringTools.endsWith(s,"'")) {
		v = haxe_ui_styles_Value.VString(HxOverrides.substr(s,1,s.length - 2));
	} else if(haxe_ui_styles_ValueTools.isNum(s) == true) {
		v = haxe_ui_styles_Value.VNumber(parseFloat(s));
	} else if(s == "true" || s == "false") {
		v = haxe_ui_styles_Value.VBool(s == "true");
	} else if(haxe_ui_styles_ValueTools.timeEReg.match(s)) {
		v = haxe_ui_styles_Value.VTime(parseFloat(haxe_ui_styles_ValueTools.timeEReg.matched(1)),haxe_ui_styles_ValueTools.timeEReg.matched(2));
	} else {
		var arr = s.split(" ");
		if(arr.length == 1) {
			v = haxe_ui_styles_Value.VConstant(s);
		} else {
			var vl = [];
			var _g = 0;
			while(_g < arr.length) {
				var a = arr[_g];
				++_g;
				a = StringTools.trim(a);
				vl.push(haxe_ui_styles_ValueTools.parse(a));
			}
			v = haxe_ui_styles_Value.VComposite(vl);
		}
	}
	return v;
};
haxe_ui_styles_ValueTools.compositeParts = function(value) {
	if(value == null) {
		return 0;
	}
	if(value._hx_index == 7) {
		var vl = value.vl;
		return vl.length;
	} else {
		return 0;
	}
};
haxe_ui_styles_ValueTools.composite = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var _g = value.v;
		return [value];
	case 3:
		var _g = value.v;
		return [value];
	case 7:
		var vl = value.vl;
		return vl;
	case 9:
		return [];
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.isNum = function(s) {
	var b = true;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var c = HxOverrides.cca(s,i);
		if(!(c >= 48 && c <= 57 || c == 46 || c == 45)) {
			b = false;
			break;
		}
	}
	return b;
};
haxe_ui_styles_ValueTools.parseColor = function(s) {
	if(StringTools.startsWith(s,"#")) {
		s = s.substring(1);
		if(s.length == 6) {
			return haxe_ui_styles_Value.VColor(Std.parseInt("0x" + s));
		} else if(s.length == 3) {
			return haxe_ui_styles_Value.VColor(Std.parseInt("0x" + s.charAt(0) + s.charAt(0) + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2)));
		}
	} else if(Object.prototype.hasOwnProperty.call(haxe_ui_styles_ValueTools.colors.h,s)) {
		return haxe_ui_styles_Value.VColor(haxe_ui_styles_ValueTools.colors.h[s]);
	}
	return null;
};
haxe_ui_styles_ValueTools.validColor = function(s) {
	if(StringTools.startsWith(s,"#") && (s.length == 7 || s.length == 4)) {
		return true;
	} else if(Object.prototype.hasOwnProperty.call(haxe_ui_styles_ValueTools.colors.h,s)) {
		return true;
	}
	return false;
};
haxe_ui_styles_ValueTools.time = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 8) {
		var v = value.v;
		var unit = value.unit;
		switch(unit) {
		case "ms":
			return v / 1000;
		case "s":
			return v;
		default:
			return null;
		}
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.variant = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 0:
		var v = value.v;
		return haxe_ui_util_Variant.fromDynamic(v);
	case 1:
		var v = value.v;
		return haxe_ui_util_Variant.fromDynamic(v);
	case 2:
		var v = value.v;
		return haxe_ui_util_Variant.fromDynamic(v);
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_util_Variant.fromDynamic(haxe_ui_styles_ValueTools.call(f,vl));
	case 6:
		var v = value.v;
		return haxe_ui_util_Variant.fromDynamic(v);
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.string = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 0:
		var v = value.v;
		return v;
	case 2:
		var v = value.v;
		if(v == null) {
			return "null";
		} else {
			return "" + v;
		}
		break;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 6:
		var v = value.v;
		return v;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.bool = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 2) {
		var v = value.v;
		return v;
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.none = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 9) {
		return true;
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.int = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v | 0;
	case 4:
		var v = value.v;
		return v;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.float = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v;
	case 4:
		var v = value.v;
		return v;
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.any = function(v) {
	if(v == null) {
		return null;
	}
	switch(v._hx_index) {
	case 1:
		var v1 = v.v;
		return v1;
	case 2:
		var v1 = v.v;
		return v1;
	case 3:
		var _g = v.v;
		if(_g._hx_index == 1) {
			var v1 = _g.value;
			return v1;
		} else {
			return null;
		}
		break;
	case 4:
		var v1 = v.v;
		return v1;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.array = function(vl) {
	var arr = [];
	var _g = 0;
	while(_g < vl.length) {
		var v = vl[_g];
		++_g;
		var a = haxe_ui_styles_ValueTools.any(v);
		if(a != null) {
			arr.push(a);
		}
	}
	return arr;
};
haxe_ui_styles_ValueTools.percent = function(value) {
	if(value == null) {
		return null;
	}
	if(value._hx_index == 3) {
		var v = value.v;
		if(v._hx_index == 0) {
			var d = v.value;
			return d;
		} else {
			return null;
		}
	} else {
		return null;
	}
};
haxe_ui_styles_ValueTools.constant = function(value,required) {
	if(value == null) {
		return false;
	}
	if(value._hx_index == 6) {
		var v = value.v;
		return v == required;
	} else {
		return false;
	}
};
haxe_ui_styles_ValueTools.calcDimension = function(value) {
	if(value == null) {
		return null;
	}
	switch(value._hx_index) {
	case 1:
		var v = value.v;
		return v;
	case 3:
		var v = value.v;
		switch(v._hx_index) {
		case 1:
			var d = v.value;
			return d;
		case 2:
			var d = v.value;
			return d / 100 * haxe_ui_core_Screen.get_instance().get_width();
		case 3:
			var d = v.value;
			return d / 100 * haxe_ui_core_Screen.get_instance().get_height();
		case 4:
			var d = v.value;
			return d * haxe_ui_Toolkit.pixelsPerRem;
		default:
			return null;
		}
		break;
	case 5:
		var f = value.f;
		var vl = value.vl;
		return haxe_ui_styles_ValueTools.call(f,vl);
	case 9:
		return null;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.calcEasing = function(value) {
	switch(value._hx_index) {
	case 0:
		var v = value.v;
		switch(v) {
		case "ease":
			return haxe_ui_styles_EasingFunction.EASE;
		case "ease-in":
			return haxe_ui_styles_EasingFunction.EASE_IN;
		case "ease-in-out":
			return haxe_ui_styles_EasingFunction.EASE_IN_OUT;
		case "ease-out":
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case "linear":
			return haxe_ui_styles_EasingFunction.LINEAR;
		default:
			return null;
		}
		break;
	case 6:
		var v = value.v;
		switch(v) {
		case "ease":
			return haxe_ui_styles_EasingFunction.EASE;
		case "ease-in":
			return haxe_ui_styles_EasingFunction.EASE_IN;
		case "ease-in-out":
			return haxe_ui_styles_EasingFunction.EASE_IN_OUT;
		case "ease-out":
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case "linear":
			return haxe_ui_styles_EasingFunction.LINEAR;
		default:
			return null;
		}
		break;
	default:
		return null;
	}
};
haxe_ui_styles_ValueTools.call = function(f,vl) {
	switch(f) {
	case "calc":
		var parser = new hscript_Parser();
		var program = parser.parseString(haxe_ui_styles_ValueTools.string(vl[0]));
		var interp = new hscript_Interp();
		return interp.expr(program);
	case "clamp":
		var valNum = haxe_ui_styles_ValueTools.calcDimension(vl[0]);
		var minNum = haxe_ui_styles_ValueTools.calcDimension(vl[1]);
		var maxNum = haxe_ui_styles_ValueTools.calcDimension(vl[2]);
		if(valNum == null || minNum == null || maxNum == null) {
			return null;
		} else if(valNum < minNum) {
			return minNum;
		} else if(valNum > maxNum) {
			return maxNum;
		} else {
			return valNum;
		}
		break;
	case "lookup":
		return haxe_ui_util_Variant.toDynamic(haxe_ui_styles_StyleLookupMap.get_instance().get(haxe_ui_styles_ValueTools.string(vl[0])));
	case "max":
		var maxv = -Infinity;
		var _g = 0;
		while(_g < vl.length) {
			var val = vl[_g];
			++_g;
			var num = haxe_ui_styles_ValueTools.calcDimension(val);
			if(num == null) {
				return null;
			} else if(num > maxv) {
				maxv = num;
			}
		}
		return maxv;
	case "min":
		var minv = Infinity;
		var _g = 0;
		while(_g < vl.length) {
			var val = vl[_g];
			++_g;
			var num = haxe_ui_styles_ValueTools.calcDimension(val);
			if(num == null) {
				return null;
			} else if(num < minv) {
				minv = num;
			}
		}
		return minv;
	case "platform-color":
		return haxe_ui_core_Platform.get_instance().getColor(haxe_ui_styles_ValueTools.string(vl[0]));
	case "rgb":
		return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents(haxe_ui_styles_ValueTools.int(vl[0]),haxe_ui_styles_ValueTools.int(vl[1]),haxe_ui_styles_ValueTools.int(vl[2]),0));
	case "theme-icon":case "theme-image":
		return haxe_ui_themes_ThemeManager.get_instance().image(haxe_ui_styles_ValueTools.string(vl[0]));
	default:
		return null;
	}
};
var haxe_ui_styles_animation_AnimationOptions = function(duration,delay,iterationCount,easingFunction,direction,fillMode) {
	this.duration = duration;
	this.delay = delay;
	this.iterationCount = iterationCount;
	this.easingFunction = easingFunction;
	this.direction = direction;
	this.fillMode = fillMode;
};
$hxClasses["haxe.ui.styles.animation.AnimationOptions"] = haxe_ui_styles_animation_AnimationOptions;
haxe_ui_styles_animation_AnimationOptions.__name__ = "haxe.ui.styles.animation.AnimationOptions";
haxe_ui_styles_animation_AnimationOptions.prototype = {
	duration: null
	,delay: null
	,iterationCount: null
	,easingFunction: null
	,direction: null
	,fillMode: null
	,compareTo: function(op) {
		if(op != null && op.duration == this.duration && op.delay == this.delay && op.iterationCount == this.iterationCount && op.easingFunction == this.easingFunction && op.direction == this.direction) {
			return op.fillMode == this.fillMode;
		} else {
			return false;
		}
	}
	,compareToAnimation: function(anim) {
		if((this.duration == null && anim.duration == 0 || this.duration != null && anim.duration == this.duration) && (this.delay == null && anim.delay == 0 || this.delay != null && anim.delay == this.delay) && (this.iterationCount == null && anim.iterationCount == 1 || this.iterationCount != null && anim.iterationCount == this.iterationCount) && (this.easingFunction == null && anim.easingFunction == haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION || this.easingFunction != null && anim.easingFunction == this.easingFunction) && (this.direction == null && anim.direction == "normal" || this.direction != null && anim.direction == this.direction)) {
			if(!(this.fillMode == null && anim.fillMode == "forwards")) {
				if(this.fillMode != null) {
					return anim.fillMode == this.fillMode;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,__class__: haxe_ui_styles_animation_AnimationOptions
};
var haxe_ui_styles_animation_Animation = function(target,options) {
	this._initialized = false;
	this._currentIterationCount = -1;
	this._currentKeyFrameIndex = -1;
	this.iterationCount = 1;
	this.fillMode = "forwards";
	this.easingFunction = haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION;
	this.duration = 0;
	this.direction = "normal";
	this.delay = 0;
	this.target = target;
	if(options != null) {
		if(options.duration != null) {
			this.duration = options.duration;
		}
		if(options.easingFunction != null) {
			this.easingFunction = options.easingFunction;
		}
		if(options.delay != null) {
			this.delay = options.delay;
		}
		if(options.iterationCount != null) {
			this.iterationCount = options.iterationCount;
		}
		if(options.direction != null) {
			this.direction = options.direction;
		}
		if(options.fillMode != null) {
			this.fillMode = options.fillMode;
		}
	}
};
$hxClasses["haxe.ui.styles.animation.Animation"] = haxe_ui_styles_animation_Animation;
haxe_ui_styles_animation_Animation.__name__ = "haxe.ui.styles.animation.Animation";
haxe_ui_styles_animation_Animation.createWithKeyFrames = function(animationKeyFrames,target,options) {
	var animation = new haxe_ui_styles_animation_Animation(target,options);
	animation.name = animationKeyFrames.id;
	if(animation._keyframes == null) {
		animation._keyframes = [];
	}
	var _g = 0;
	var _g1 = animationKeyFrames.get_keyFrames();
	while(_g < _g1.length) {
		var keyFrame = _g1[_g];
		++_g;
		var kf = new haxe_ui_styles_animation_KeyFrame();
		var _g2 = keyFrame.time;
		if(_g2._hx_index == 3) {
			var v = _g2.v;
			if(v._hx_index == 0) {
				var p = v.value;
				kf.time = p / 100;
				kf.easingFunction = animation.easingFunction;
				kf.directives = keyFrame.directives;
				animation._keyframes.push(kf);
			}
		}
	}
	return animation;
};
haxe_ui_styles_animation_Animation.prototype = {
	delay: null
	,direction: null
	,duration: null
	,easingFunction: null
	,fillMode: null
	,iterationCount: null
	,name: null
	,running: null
	,target: null
	,run: function(onFinish) {
		if(this.get_keyframeCount() == 0 || this.running) {
			return;
		}
		if(!this._initialized) {
			this._initialize();
		}
		this._currentKeyFrameIndex = -1;
		this._currentIterationCount = 0;
		this.running = true;
		this._saveState();
		this._runNextKeyframe(onFinish);
	}
	,stop: function() {
		if(this.running == false) {
			return;
		}
		this.running = false;
		var currentKF = this.get_currentKeyFrame();
		if(currentKF != null) {
			currentKF.stop();
			this._currentKeyFrameIndex = -1;
		}
		this._keyframes = null;
		this._restoreState();
	}
	,_currentKeyFrameIndex: null
	,_currentIterationCount: null
	,_initialState: null
	,_initialized: null
	,_keyframes: null
	,get_keyframeCount: function() {
		if(this._keyframes == null) {
			return 0;
		} else {
			return this._keyframes.length;
		}
	}
	,get_currentKeyFrame: function() {
		if(this._currentKeyFrameIndex >= 0) {
			return this._keyframes[this._currentKeyFrameIndex];
		} else {
			return null;
		}
	}
	,_initialize: function() {
		switch(this.direction) {
		case "alternate":
			this._addAlternateKeyframes();
			break;
		case "alternate-reverse":
			this._reverseCurrentKeyframes();
			this._addAlternateKeyframes();
			break;
		case "normal":
			break;
		case "reverse":
			this._reverseCurrentKeyframes();
			break;
		}
		var currentTime = 0;
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			switch(this.direction) {
			case "alternate-reverse":case "reverse":
				keyframe.time = 1 - keyframe.time;
				break;
			case "alternate":case "normal":
				break;
			}
			keyframe.time = this.duration * keyframe.time - currentTime;
			currentTime += keyframe.time;
		}
		if(this.delay > 0) {
			var keyframe = new haxe_ui_styles_animation_KeyFrame();
			keyframe.time = this.delay;
			keyframe.easingFunction = this.easingFunction;
			this._keyframes.unshift(keyframe);
		} else if(this.delay < 0) {
			currentTime = 0;
			var lastKeyframe = null;
			while(this._keyframes.length > 0) {
				var keyframe = this._keyframes[0];
				currentTime -= keyframe.time;
				if(currentTime >= this.delay) {
					lastKeyframe = keyframe;
					this._keyframes.splice(0,1);
				} else {
					keyframe.delay = -(currentTime - this.delay + keyframe.time);
					if(lastKeyframe != null) {
						lastKeyframe.time = 0;
						this._keyframes.unshift(lastKeyframe);
					}
					break;
				}
			}
		}
		this._initialized = true;
	}
	,_runNextKeyframe: function(onFinish) {
		if(this.running == false) {
			return;
		}
		if(++this._currentKeyFrameIndex >= this._keyframes.length) {
			this._currentKeyFrameIndex = -1;
			this._restoreState();
			if(this.iterationCount == -1 || ++this._currentIterationCount < this.iterationCount) {
				this._saveState();
				this._runNextKeyframe(onFinish);
			} else {
				this.running = false;
				if(onFinish != null) {
					onFinish();
				}
			}
			return;
		} else {
			var _g = $bind(this,this._runNextKeyframe);
			var onFinish1 = onFinish;
			var tmp = function() {
				_g(onFinish1);
			};
			this.get_currentKeyFrame().run(this.target,tmp);
		}
	}
	,_addAlternateKeyframes: function() {
		var i = this._keyframes.length;
		while(--i >= 0) {
			var keyframe = this._keyframes[i];
			var newKeyframe = new haxe_ui_styles_animation_KeyFrame();
			newKeyframe.time = 1 - keyframe.time;
			newKeyframe.easingFunction = this._getReverseEasingFunction(keyframe.easingFunction);
			newKeyframe.directives = keyframe.directives;
			this._keyframes.push(newKeyframe);
		}
	}
	,_reverseCurrentKeyframes: function() {
		this._keyframes.reverse();
		var func = this._getReverseEasingFunction(this.easingFunction);
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			keyframe.easingFunction = func;
		}
	}
	,_getReverseEasingFunction: function(easingFunction) {
		switch(easingFunction._hx_index) {
		case 2:
			return haxe_ui_styles_EasingFunction.EASE_OUT;
		case 3:
			return haxe_ui_styles_EasingFunction.EASE_IN;
		default:
			return easingFunction;
		}
	}
	,_saveState: function() {
		if(!this._shouldRestoreState()) {
			return;
		}
		if(this._initialState == null) {
			this._initialState = new haxe_ds_StringMap();
		}
		var _g = 0;
		var _g1 = this._keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = keyframe.directives;
			while(_g2 < _g3.length) {
				var directive = _g3[_g2];
				++_g2;
				var property = haxe_ui_util_StyleUtil.styleProperty2ComponentProperty(directive.directive);
				if(!Object.prototype.hasOwnProperty.call(this._initialState.h,property)) {
					var this1 = this._initialState;
					var value = Reflect.getProperty(this.target,property);
					this1.h[property] = value;
				}
			}
		}
	}
	,_restoreState: function() {
		if(!this._shouldRestoreState()) {
			return;
		}
		if(this._initialState != null) {
			var h = this._initialState.h;
			var property_h = h;
			var property_keys = Object.keys(h);
			var property_length = property_keys.length;
			var property_current = 0;
			while(property_current < property_length) {
				var property = property_keys[property_current++];
				Reflect.setProperty(this.target,property,this._initialState.h[property]);
			}
			this._initialState = null;
		}
	}
	,_shouldRestoreState: function() {
		if(!(this.fillMode == "none" || this.fillMode == "forwards" && this.direction != "normal" && this.direction != "alternate")) {
			if(this.fillMode == "backwards" && this.direction != "reverse") {
				return this.direction != "alternate-reverse";
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	,__class__: haxe_ui_styles_animation_Animation
	,__properties__: {get_keyframeCount:"get_keyframeCount",get_currentKeyFrame:"get_currentKeyFrame"}
};
var haxe_ui_styles_animation_KeyFrame = function() {
	this.delay = 0;
	this.time = 0;
	this.directives = [];
};
$hxClasses["haxe.ui.styles.animation.KeyFrame"] = haxe_ui_styles_animation_KeyFrame;
haxe_ui_styles_animation_KeyFrame.__name__ = "haxe.ui.styles.animation.KeyFrame";
haxe_ui_styles_animation_KeyFrame.prototype = {
	directives: null
	,time: null
	,delay: null
	,easingFunction: null
	,_actuator: null
	,stop: function() {
		if(this._actuator != null) {
			this._actuator.stop();
			this._actuator = null;
		}
	}
	,run: function(target,cb) {
		var _gthis = this;
		if(this._actuator != null) {
			return;
		}
		var properties = { };
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			properties[d.directive] = d.value;
		}
		var hasFrameEvent = target.hasEvent("animationframe");
		this._actuator = new haxe_ui_styles_animation_util_Actuator(target,properties,this.time,new haxe_ui_styles_animation_util_ActuatorOptions(this.delay,this.easingFunction,function() {
			_gthis._actuator = null;
			cb();
		},function(time,delta,position) {
			if(hasFrameEvent) {
				var event = new haxe_ui_events_AnimationEvent("animationframe");
				event.currentTime = time;
				event.delta = delta;
				event.position = position;
				target.dispatch(event);
			}
		}));
		this._actuator.run();
	}
	,__class__: haxe_ui_styles_animation_KeyFrame
};
var haxe_ui_styles_animation_util_ActuatorOptions = function(delay,easingFunction,onComplete,onUpdate) {
	this.delay = delay;
	this.easingFunction = easingFunction;
	this.onComplete = onComplete;
	this.onUpdate = onUpdate;
};
$hxClasses["haxe.ui.styles.animation.util.ActuatorOptions"] = haxe_ui_styles_animation_util_ActuatorOptions;
haxe_ui_styles_animation_util_ActuatorOptions.__name__ = "haxe.ui.styles.animation.util.ActuatorOptions";
haxe_ui_styles_animation_util_ActuatorOptions.prototype = {
	delay: null
	,easingFunction: null
	,onComplete: null
	,onUpdate: null
	,__class__: haxe_ui_styles_animation_util_ActuatorOptions
};
var haxe_ui_styles_animation_util_Actuator = function(target,properties,duration,options) {
	this.delay = 0;
	this.duration = 0;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	if(options != null) {
		this._easeFunc = haxe_ui_styles_animation_util__$Actuator_Ease.get(options.easingFunction != null ? options.easingFunction : haxe_ui_styles_EasingFunction.EASE);
		if(options.delay != null) {
			this.delay = options.delay;
		}
		if(options.onComplete != null) {
			this._onComplete = options.onComplete;
		}
		if(options.onUpdate != null) {
			this._onUpdate = options.onUpdate;
		}
	}
};
$hxClasses["haxe.ui.styles.animation.util.Actuator"] = haxe_ui_styles_animation_util_Actuator;
haxe_ui_styles_animation_util_Actuator.__name__ = "haxe.ui.styles.animation.util.Actuator";
haxe_ui_styles_animation_util_Actuator.tween = function(target,properties,duration,options) {
	var actuator = new haxe_ui_styles_animation_util_Actuator(target,properties,duration,options);
	actuator.run();
	return actuator;
};
haxe_ui_styles_animation_util_Actuator.prototype = {
	target: null
	,properties: null
	,duration: null
	,delay: null
	,stop: function() {
		this._stopped = true;
		this.target = null;
	}
	,run: function() {
		this._initialize();
		this._stopped = false;
		if(this.duration == 0) {
			this._apply(1);
			this._finish();
		} else {
			this._currentTime = HxOverrides.now() / 1000;
			if(this.delay > 0) {
				haxe_ui_util_Timer.delay($bind(this,this._nextFrame),this.delay * 1000 | 0);
			} else {
				new haxe_ui_CallLater($bind(this,this._nextFrame));
			}
		}
	}
	,_currentTime: null
	,_easeFunc: null
	,_onComplete: null
	,_onUpdate: null
	,_stopped: null
	,_propertyDetails: null
	,_colorPropertyDetails: null
	,_stringPropertyDetails: null
	,_initialize: function() {
		if(this._isValid() == false) {
			this.stop();
			return;
		}
		this._propertyDetails = [];
		this._colorPropertyDetails = [];
		this._stringPropertyDetails = [];
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var componentProperty = haxe_ui_util_StyleUtil.styleProperty2ComponentProperty(p);
			var end = Reflect.getProperty(this.properties,p);
			if(end._hx_index == 3) {
				var _g2 = end.v;
				if(_g2._hx_index == 0) {
					var v = _g2.value;
					componentProperty = "percent" + haxe_ui_util_StringUtil.capitalizeFirstLetter(componentProperty);
				}
			}
			var start = Reflect.getProperty(this.target,componentProperty);
			if(start == null) {
				switch(end._hx_index) {
				case 0:
					var v1 = end.v;
					start = v1;
					break;
				case 1:
					var v2 = end.v;
					start = 0;
					break;
				case 3:
					var _g3 = end.v;
					if(_g3._hx_index == 0) {
						var v3 = _g3.value;
						start = 0;
					}
					break;
				default:
				}
			}
			var isVariant = false;
			if(start != null) {
				try {
					if(start._hx_index == 2) {
						var v4 = start.s;
						start = v4;
						isVariant = true;
					}
				} catch( _g4 ) {
				}
			}
			if(end != null) {
				try {
					if(end._hx_index == 2) {
						var v5 = end.s;
						end = v5;
						isVariant = true;
					}
				} catch( _g5 ) {
				}
			}
			if(start == null || end == null) {
				continue;
			}
			switch(end._hx_index) {
			case 0:
				var v6 = end.v;
				var startVal = start;
				var endVal = haxe_ui_styles_ValueTools.string(end);
				if(endVal.indexOf("[[") != -1) {
					var n1 = endVal.indexOf("[[");
					var n2 = endVal.indexOf("]]") + 2;
					var before = HxOverrides.substr(endVal,0,n1);
					var after = HxOverrides.substr(endVal,n2,null);
					var s = StringTools.replace(startVal,before,"");
					s = StringTools.replace(s,after,"");
					var startInt = Std.parseInt(s);
					var s1 = StringTools.replace(endVal,before + "[[","");
					s1 = StringTools.replace(s1,"]]" + after,"");
					var endInt = Std.parseInt(s1);
					var details = new haxe_ui_styles_animation_util_StringPropertyDetails(this.target,componentProperty,startVal,endVal);
					details.pattern = before + "[[n]]" + after;
					details.startInt = startInt;
					details.changeInt = endInt - startInt;
					var c = js_Boot.getClass(this.target);
					var typeInfo = haxe_ui_core_TypeMap.getTypeInfo(c.__name__,componentProperty);
					if(typeInfo != null && isVariant == false && typeInfo == "Variant") {
						isVariant = true;
					}
					details.isVariant = isVariant;
					this._stringPropertyDetails.push(details);
				} else {
					var details1 = new haxe_ui_styles_animation_util_StringPropertyDetails(this.target,componentProperty,startVal,endVal);
					this._stringPropertyDetails.push(details1);
				}
				break;
			case 3:
				var _g6 = end.v;
				if(_g6._hx_index == 0) {
					var v7 = _g6.value;
					var val = v7;
					if(val != null) {
						var details2 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val - start);
						this._propertyDetails.push(details2);
					}
				} else {
					var val1 = haxe_ui_styles_ValueTools.calcDimension(end);
					if(val1 != null) {
						var details3 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val1 - start);
						this._propertyDetails.push(details3);
					} else {
						var details4 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,end - start);
						this._propertyDetails.push(details4);
					}
				}
				break;
			case 4:
				var v8 = end.v;
				var startColor = js_Boot.__cast(start , Int);
				var endColor = v8;
				var details5 = new haxe_ui_styles_animation_util_ColorPropertyDetails(this.target,componentProperty,startColor,(endColor >> 16 & 255) - (startColor >> 16 & 255),(endColor >> 8 & 255) - (startColor >> 8 & 255),(endColor & 255) - (startColor & 255),(endColor >> 24 & 255) - (startColor >> 24 & 255));
				if(this._colorPropertyDetails == null) {
					this._colorPropertyDetails = [];
				}
				this._colorPropertyDetails.push(details5);
				break;
			default:
				var val2 = haxe_ui_styles_ValueTools.calcDimension(end);
				if(val2 != null) {
					var details6 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,val2 - start);
					this._propertyDetails.push(details6);
				} else {
					var details7 = new haxe_ui_styles_animation_util_PropertyDetails(this.target,componentProperty,start,end - start);
					this._propertyDetails.push(details7);
				}
			}
		}
	}
	,_nextFrame: function() {
		if(this._stopped == true) {
			return;
		}
		var currentTime = HxOverrides.now() / 1000;
		var delta = currentTime - this._currentTime;
		if(this.delay < 0) {
			delta += -this.delay;
		}
		var tweenPosition = delta / this.duration;
		if(tweenPosition > 1) {
			tweenPosition = 1;
		}
		this._apply(tweenPosition);
		if(this._onUpdate != null) {
			this._onUpdate(currentTime,delta,tweenPosition);
		}
		if(delta >= this.duration) {
			this._finish();
		} else {
			new haxe_ui_CallLater($bind(this,this._nextFrame));
		}
	}
	,_isValid: function() {
		if(this.target == null) {
			return false;
		}
		if(((this.target) instanceof haxe_ui_core_Component)) {
			var c = this.target;
			if(c._isDisposed == true) {
				return false;
			}
		}
		return true;
	}
	,_apply: function(position) {
		if(this._isValid() == false) {
			this.stop();
			return;
		}
		position = this._easeFunc(position);
		var _g = 0;
		var _g1 = this._propertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			Reflect.setProperty(this.target,details.propertyName,details.start + details.change * position);
		}
		var _g = 0;
		var _g1 = this._stringPropertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			if(details.pattern != null) {
				var newInt = details.startInt + position * details.changeInt | 0;
				var newString = StringTools.replace(details.pattern,"[[n]]","" + newInt);
				if(details.isVariant) {
					var v = haxe_ui_util_Variant.fromString(newString);
					Reflect.setProperty(this.target,details.propertyName,v);
				} else {
					Reflect.setProperty(this.target,details.propertyName,newString);
				}
			} else if(position != 1) {
				Reflect.setProperty(this.target,details.propertyName,details.start);
			} else {
				Reflect.setProperty(this.target,details.propertyName,details.end);
			}
		}
		var _g = 0;
		var _g1 = this._colorPropertyDetails;
		while(_g < _g1.length) {
			var details = _g1[_g];
			++_g;
			var currentColor = haxe_ui_util_Color.fromComponents((details.start >> 16 & 255) + details.changeR * position | 0,(details.start >> 8 & 255) + details.changeG * position | 0,(details.start & 255) + details.changeB * position | 0,(details.start >> 24 & 255) + details.changeA * position | 0);
			Reflect.setProperty(details.target,details.propertyName,currentColor);
		}
	}
	,_finish: function() {
		this._stopped = true;
		this.target = null;
		if(this._onComplete != null) {
			this._onComplete();
		}
	}
	,__class__: haxe_ui_styles_animation_util_Actuator
};
var haxe_ui_styles_animation_util__$Actuator_Ease = function() { };
$hxClasses["haxe.ui.styles.animation.util._Actuator.Ease"] = haxe_ui_styles_animation_util__$Actuator_Ease;
haxe_ui_styles_animation_util__$Actuator_Ease.__name__ = "haxe.ui.styles.animation.util._Actuator.Ease";
haxe_ui_styles_animation_util__$Actuator_Ease.get = function(easingFunction) {
	switch(easingFunction._hx_index) {
	case 0:
		return haxe_ui_styles_animation_util__$Actuator_Ease.linear;
	case 2:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeIn;
	case 3:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeOut;
	case 1:case 4:
		return haxe_ui_styles_animation_util__$Actuator_Ease.easeInOut;
	}
};
haxe_ui_styles_animation_util__$Actuator_Ease.linear = function(k) {
	return k;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeIn = function(k) {
	return k * k * k;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeOut = function(k) {
	return --k * k * k + 1;
};
haxe_ui_styles_animation_util__$Actuator_Ease.easeInOut = function(k) {
	if((k /= 0.5) < 1) {
		return 0.5 * k * k * k;
	} else {
		return 0.5 * ((k -= 2) * k * k + 2);
	}
};
var haxe_ui_styles_animation_util_ColorPropertyDetails = function(target,propertyName,start,changeR,changeG,changeB,changeA) {
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.changeR = changeR;
	this.changeG = changeG;
	this.changeB = changeB;
	this.changeA = changeA;
};
$hxClasses["haxe.ui.styles.animation.util.ColorPropertyDetails"] = haxe_ui_styles_animation_util_ColorPropertyDetails;
haxe_ui_styles_animation_util_ColorPropertyDetails.__name__ = "haxe.ui.styles.animation.util.ColorPropertyDetails";
haxe_ui_styles_animation_util_ColorPropertyDetails.prototype = {
	changeR: null
	,changeG: null
	,changeB: null
	,changeA: null
	,propertyName: null
	,start: null
	,target: null
	,__class__: haxe_ui_styles_animation_util_ColorPropertyDetails
};
var haxe_ui_styles_animation_util_PropertyDetails = function(target,propertyName,start,change) {
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
};
$hxClasses["haxe.ui.styles.animation.util.PropertyDetails"] = haxe_ui_styles_animation_util_PropertyDetails;
haxe_ui_styles_animation_util_PropertyDetails.__name__ = "haxe.ui.styles.animation.util.PropertyDetails";
haxe_ui_styles_animation_util_PropertyDetails.prototype = {
	change: null
	,propertyName: null
	,start: null
	,target: null
	,__class__: haxe_ui_styles_animation_util_PropertyDetails
};
var haxe_ui_styles_animation_util_StringPropertyDetails = function(target,propertyName,start,end) {
	this.isVariant = false;
	this.pattern = null;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.end = end;
};
$hxClasses["haxe.ui.styles.animation.util.StringPropertyDetails"] = haxe_ui_styles_animation_util_StringPropertyDetails;
haxe_ui_styles_animation_util_StringPropertyDetails.__name__ = "haxe.ui.styles.animation.util.StringPropertyDetails";
haxe_ui_styles_animation_util_StringPropertyDetails.prototype = {
	propertyName: null
	,start: null
	,end: null
	,target: null
	,startInt: null
	,changeInt: null
	,pattern: null
	,isVariant: null
	,__class__: haxe_ui_styles_animation_util_StringPropertyDetails
};
var haxe_ui_styles_elements_AnimationKeyFrame = function() {
};
$hxClasses["haxe.ui.styles.elements.AnimationKeyFrame"] = haxe_ui_styles_elements_AnimationKeyFrame;
haxe_ui_styles_elements_AnimationKeyFrame.__name__ = "haxe.ui.styles.elements.AnimationKeyFrame";
haxe_ui_styles_elements_AnimationKeyFrame.prototype = {
	time: null
	,directives: null
	,set: function(directive) {
		var found = false;
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.directive == directive.directive) {
				d.value = directive.value;
				found = true;
			}
		}
		if(found == false) {
			this.directives.push(directive);
		}
	}
	,find: function(id) {
		var _g = 0;
		var _g1 = this.directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.directive == id) {
				return d;
			}
		}
		return null;
	}
	,clear: function() {
		this.directives = [];
	}
	,__class__: haxe_ui_styles_elements_AnimationKeyFrame
};
var haxe_ui_styles_elements_AnimationKeyFrames = function(id,keyframes) {
	this._keyframes = [];
	this.id = id;
	this._keyframes = keyframes;
};
$hxClasses["haxe.ui.styles.elements.AnimationKeyFrames"] = haxe_ui_styles_elements_AnimationKeyFrames;
haxe_ui_styles_elements_AnimationKeyFrames.__name__ = "haxe.ui.styles.elements.AnimationKeyFrames";
haxe_ui_styles_elements_AnimationKeyFrames.prototype = {
	id: null
	,_keyframes: null
	,keyFrames: null
	,get_keyFrames: function() {
		return this._keyframes;
	}
	,__class__: haxe_ui_styles_elements_AnimationKeyFrames
	,__properties__: {get_keyFrames:"get_keyFrames"}
};
var haxe_ui_styles_elements_Directive = function(directive,value,defective) {
	if(defective == null) {
		defective = false;
	}
	this.defective = false;
	this.value = null;
	this.directive = null;
	this.directive = directive;
	this.value = value;
	this.defective = defective;
};
$hxClasses["haxe.ui.styles.elements.Directive"] = haxe_ui_styles_elements_Directive;
haxe_ui_styles_elements_Directive.__name__ = "haxe.ui.styles.elements.Directive";
haxe_ui_styles_elements_Directive.prototype = {
	directive: null
	,value: null
	,defective: null
	,__class__: haxe_ui_styles_elements_Directive
};
var haxe_ui_styles_elements_ImportElement = function(url) {
	this.url = url;
};
$hxClasses["haxe.ui.styles.elements.ImportElement"] = haxe_ui_styles_elements_ImportElement;
haxe_ui_styles_elements_ImportElement.__name__ = "haxe.ui.styles.elements.ImportElement";
haxe_ui_styles_elements_ImportElement.prototype = {
	url: null
	,__class__: haxe_ui_styles_elements_ImportElement
};
var haxe_ui_styles_elements_MediaQuery = function(directives,styleSheet) {
	this._directives = [];
	this._directives = directives;
	this._styleSheet = styleSheet;
};
$hxClasses["haxe.ui.styles.elements.MediaQuery"] = haxe_ui_styles_elements_MediaQuery;
haxe_ui_styles_elements_MediaQuery.__name__ = "haxe.ui.styles.elements.MediaQuery";
haxe_ui_styles_elements_MediaQuery.prototype = {
	_directives: null
	,_styleSheet: null
	,addDirective: function(el) {
		this._directives.push(el);
	}
	,relevant: null
	,get_relevant: function() {
		var b = true;
		var _g = 0;
		var _g1 = this._directives;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			switch(d.directive) {
			case "backend":
				b = b && haxe_ui_Backend.get_id() == haxe_ui_styles_ValueTools.string(d.value);
				break;
			case "max-aspect-ratio":
				var sr = haxe_ui_core_Screen.get_instance().get_width() / haxe_ui_core_Screen.get_instance().get_height();
				b = b && sr < this.buildRatio(haxe_ui_styles_ValueTools.string(d.value));
				break;
			case "max-height":
				b = b && haxe_ui_core_Screen.get_instance().get_height() < haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "max-width":
				b = b && haxe_ui_core_Screen.get_instance().get_width() < haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "min-aspect-ratio":
				var sr1 = haxe_ui_core_Screen.get_instance().get_width() / haxe_ui_core_Screen.get_instance().get_height();
				b = b && sr1 > this.buildRatio(haxe_ui_styles_ValueTools.string(d.value));
				break;
			case "min-height":
				b = b && haxe_ui_core_Screen.get_instance().get_height() > haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "min-width":
				b = b && haxe_ui_core_Screen.get_instance().get_width() > haxe_ui_styles_ValueTools.calcDimension(d.value);
				break;
			case "orientation":
				var v = haxe_ui_styles_ValueTools.string(d.value);
				if(v == "landscape") {
					b = b && haxe_ui_core_Screen.get_instance().get_width() > haxe_ui_core_Screen.get_instance().get_height();
				} else if(v == "portrait") {
					b = b && haxe_ui_core_Screen.get_instance().get_height() > haxe_ui_core_Screen.get_instance().get_width();
				}
				break;
			default:
			}
		}
		return b;
	}
	,buildRatio: function(s) {
		var p = s.split("/");
		var w = Std.parseInt(StringTools.trim(p[0]));
		var h = Std.parseInt(StringTools.trim(p[1]));
		return w / h;
	}
	,styleSheet: null
	,get_styleSheet: function() {
		return this._styleSheet;
	}
	,__class__: haxe_ui_styles_elements_MediaQuery
	,__properties__: {get_styleSheet:"get_styleSheet",get_relevant:"get_relevant"}
};
var haxe_ui_styles_elements_RuleElement = function(selector,directives) {
	this.directiveCount = 0;
	this.directives = new haxe_ds_StringMap();
	this.selector = new haxe_ui_styles_elements_Selector(selector);
	var _g = 0;
	while(_g < directives.length) {
		var d = directives[_g];
		++_g;
		this.processDirective(d);
		this.directiveCount++;
	}
};
$hxClasses["haxe.ui.styles.elements.RuleElement"] = haxe_ui_styles_elements_RuleElement;
haxe_ui_styles_elements_RuleElement.__name__ = "haxe.ui.styles.elements.RuleElement";
haxe_ui_styles_elements_RuleElement.ruleMatch = function(c,d) {
	if(c.nodeName == "*") {
		return true;
	}
	if(c.id != null && c.id != d.get_id()) {
		return false;
	}
	if(c.className != null) {
		var _g = 0;
		var _g1 = c.get_classNameParts();
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(d.classes.indexOf(p) != -1 == false) {
				return false;
			}
		}
	}
	if(c.pseudoClass != null) {
		var pc = ":" + c.pseudoClass;
		if(d.classes.indexOf(pc) != -1 == false) {
			return false;
		}
	}
	if(c.nodeName != null) {
		var classNodeName = d.get_nodeName();
		if(c.nodeName != classNodeName) {
			return false;
		}
	}
	if(c.parent != null) {
		if(c.direct == true) {
			var p = d.parentComponent;
			if(p == null) {
				return false;
			}
			if(!haxe_ui_styles_elements_RuleElement.ruleMatch(c.parent,p)) {
				return false;
			}
		} else {
			var p = d.parentComponent;
			while(p != null) {
				if(haxe_ui_styles_elements_RuleElement.ruleMatch(c.parent,p)) {
					break;
				}
				p = p.parentComponent;
			}
			if(p == null) {
				return false;
			}
		}
	}
	return true;
};
haxe_ui_styles_elements_RuleElement.prototype = {
	selector: null
	,directives: null
	,directiveCount: null
	,addDirective: function(directive,value) {
		var d = new haxe_ui_styles_elements_Directive(directive,value);
		this.processDirective(d);
	}
	,match: function(d) {
		return haxe_ui_styles_elements_RuleElement.ruleMatch(this.selector.parts[this.selector.parts.length - 1],d);
	}
	,processDirective: function(d) {
		switch(d.directive) {
		case "animation":
			this.processComposite(d,["animation-name","animation-duration","animation-timing-function","animation-delay","animation-iteration-count","animation-direction","animation-fill-mode"]);
			break;
		case "background":
			this.processComposite(d,["background-color","background-color-end","background-gradient-style"]);
			break;
		case "background-image-clip":
			this.processComposite(d,["background-image-clip-top","background-image-clip-left","background-image-clip-bottom","background-image-clip-right"]);
			break;
		case "background-image-slice":
			this.processComposite(d,["background-image-slice-top","background-image-slice-left","background-image-slice-bottom","background-image-slice-right"]);
			break;
		case "background-position":
			this.processComposite(d,["background-position-x","background-position-y"]);
			break;
		case "background-size":
			var vl = haxe_ui_styles_ValueTools.composite(d.value);
			if(vl.length == 1) {
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[0]),["background-width","background-height"]);
			} else if(vl.length == 2) {
				this.processComposite(d,["background-width","background-height"]);
			}
			break;
		case "border":
			this.processComposite(d,["border-size","border-style","border-color"]);
			break;
		case "border-bottom":
			this.processComposite(d,["border-bottom-size","border-style","border-bottom-color"]);
			break;
		case "border-color":
			this.processComposite(d,["border-top-color","border-left-color","border-right-color","border-bottom-color"],true);
			break;
		case "border-left":
			this.processComposite(d,["border-left-size","border-style","border-left-color"]);
			break;
		case "border-right":
			this.processComposite(d,["border-right-size","border-style","border-right-color"]);
			break;
		case "border-size":
			this.processComposite(d,["border-top-size","border-left-size","border-right-size","border-bottom-size"]);
			break;
		case "border-top":
			this.processComposite(d,["border-top-size","border-style","border-top-color"]);
			break;
		case "font-style":
			var v1 = haxe_ui_styles_ValueTools.composite(d.value);
			if(v1 == null) {
				v1 = [d.value];
			}
			var _g = 0;
			while(_g < v1.length) {
				var v = v1[_g];
				++_g;
				var s = haxe_ui_styles_ValueTools.string(v).toLowerCase();
				if(s == "bold") {
					var this1 = this.directives;
					var value = new haxe_ui_styles_elements_Directive("font-bold",haxe_ui_styles_Value.VBool(true));
					this1.h["font-bold"] = value;
				} else if(s == "italic") {
					var this2 = this.directives;
					var value1 = new haxe_ui_styles_elements_Directive("font-italic",haxe_ui_styles_Value.VBool(true));
					this2.h["font-italic"] = value1;
				} else if(s == "underline") {
					var this3 = this.directives;
					var value2 = new haxe_ui_styles_elements_Directive("font-underline",haxe_ui_styles_Value.VBool(true));
					this3.h["font-underline"] = value2;
				}
			}
			break;
		case "margin":
			var vl = haxe_ui_styles_ValueTools.composite(d.value);
			if(vl.length == 4 || vl.length == 1) {
				this.processComposite(d,["margin-top","margin-left","margin-right","margin-bottom"]);
			} else if(vl.length == 2) {
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[0]),["margin-top","margin-bottom"]);
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[1]),["margin-left","margin-right"]);
			}
			break;
		case "padding":
			var vl = haxe_ui_styles_ValueTools.composite(d.value);
			if(vl.length == 4 || vl.length == 1) {
				this.processComposite(d,["padding-top","padding-left","padding-right","padding-bottom"]);
			} else if(vl.length == 2) {
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[0]),["padding-top","padding-bottom"]);
				this.processComposite(new haxe_ui_styles_elements_Directive("",vl[1]),["padding-left","padding-right"]);
			} else if(vl.length == 0) {
				this.processComposite(d,["padding-top","padding-left","padding-right","padding-bottom"]);
			}
			break;
		case "spacing":
			this.processComposite(d,["horizontal-spacing","vertical-spacing"]);
			break;
		default:
			this.directives.h[d.directive] = d;
		}
	}
	,processComposite: function(d,parts,duplicate) {
		if(duplicate == null) {
			duplicate = false;
		}
		var _g = 0;
		while(_g < parts.length) {
			var p = parts[_g];
			++_g;
			var _this = this.directives;
			if(Object.prototype.hasOwnProperty.call(_this.h,p)) {
				delete(_this.h[p]);
			}
		}
		var _g = d.value;
		switch(_g._hx_index) {
		case 1:
			var _g1 = _g.v;
			var _g1 = 0;
			while(_g1 < parts.length) {
				var p = parts[_g1];
				++_g1;
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(p,d.value);
				this1.h[p] = value;
			}
			break;
		case 3:
			var v = _g.v;
			var _g1 = 0;
			while(_g1 < parts.length) {
				var p = parts[_g1];
				++_g1;
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(p,haxe_ui_styles_Value.VDimension(v));
				this1.h[p] = value;
			}
			break;
		case 4:
			var _g1 = _g.v;
			if(duplicate == false) {
				var this1 = this.directives;
				var value = new haxe_ui_styles_elements_Directive(parts[0],d.value);
				this1.h[parts[0]] = value;
			} else {
				var _g1 = 0;
				while(_g1 < parts.length) {
					var p = parts[_g1];
					++_g1;
					var this1 = this.directives;
					var value = new haxe_ui_styles_elements_Directive(p,d.value);
					this1.h[p] = value;
				}
			}
			break;
		case 6:
			var _g1 = _g.v;
			break;
		case 7:
			var vl = _g.vl;
			var n = 0;
			var _g = 0;
			while(_g < parts.length) {
				var p = parts[_g];
				++_g;
				if(vl[n] != null) {
					var nd = new haxe_ui_styles_elements_Directive(p,vl[n]);
					this.processDirective(nd);
					this.directives.h[p] = nd;
				}
				++n;
			}
			break;
		case 9:
			var _g = 0;
			while(_g < parts.length) {
				var p = parts[_g];
				++_g;
				var nd = new haxe_ui_styles_elements_Directive(p,d.value);
				this.processDirective(nd);
				this.directives.h[p] = nd;
			}
			break;
		default:
		}
	}
	,__class__: haxe_ui_styles_elements_RuleElement
};
var haxe_ui_styles_elements_Selector = function(s) {
	this.parts = [];
	s = StringTools.replace(s,">"," > ");
	var p = s.split(" ");
	var parent = null;
	var nextDirect = false;
	var _g = 0;
	while(_g < p.length) {
		var i = p[_g];
		++_g;
		i = StringTools.trim(i);
		if(i.length == 0) {
			continue;
		}
		if(i == ">") {
			nextDirect = true;
			continue;
		}
		var current = new haxe_ui_styles_elements_SelectorPart();
		if(nextDirect == true) {
			current.direct = true;
			nextDirect = false;
		}
		current.parent = parent;
		var p1 = i.split(":");
		current.pseudoClass = p1[1];
		var main = p1[0];
		if(main.charAt(0) == ".") {
			current.className = main.substring(1);
		} else {
			var p2 = main.split(".");
			if(p2[0].charAt(0) == "#") {
				current.id = p2[0].substring(1);
			} else {
				current.nodeName = p2[0].toLowerCase();
			}
			current.className = p2[1];
		}
		this.parts.push(current);
		parent = current;
	}
};
$hxClasses["haxe.ui.styles.elements.Selector"] = haxe_ui_styles_elements_Selector;
haxe_ui_styles_elements_Selector.__name__ = "haxe.ui.styles.elements.Selector";
haxe_ui_styles_elements_Selector.prototype = {
	parts: null
	,toString: function() {
		return this.parts.join(" ");
	}
	,__class__: haxe_ui_styles_elements_Selector
};
var haxe_ui_styles_elements_SelectorPart = function() {
	this._parts = null;
	this.direct = false;
	this.nodeName = null;
	this.id = null;
	this.className = null;
	this.pseudoClass = null;
	this.parent = null;
};
$hxClasses["haxe.ui.styles.elements.SelectorPart"] = haxe_ui_styles_elements_SelectorPart;
haxe_ui_styles_elements_SelectorPart.__name__ = "haxe.ui.styles.elements.SelectorPart";
haxe_ui_styles_elements_SelectorPart.prototype = {
	parent: null
	,pseudoClass: null
	,className: null
	,id: null
	,nodeName: null
	,direct: null
	,_parts: null
	,classNameParts: null
	,get_classNameParts: function() {
		if(this.className == null) {
			return null;
		}
		if(this._parts == null) {
			this._parts = this.className.split(".");
		}
		return this._parts;
	}
	,toString: function() {
		var sb_b = "";
		if(this.id != null) {
			sb_b += Std.string("#" + this.id);
		}
		if(this.nodeName != null) {
			sb_b += Std.string(this.nodeName);
		}
		if(this.className != null) {
			sb_b += Std.string("." + this.className);
		}
		if(this.pseudoClass != null) {
			sb_b += Std.string(":" + this.pseudoClass);
		}
		return sb_b;
	}
	,__class__: haxe_ui_styles_elements_SelectorPart
	,__properties__: {get_classNameParts:"get_classNameParts"}
};
var haxe_ui_themes_Theme = function() {
	this.styles = [];
	this.images = [];
	this.vars = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.themes.Theme"] = haxe_ui_themes_Theme;
haxe_ui_themes_Theme.__name__ = "haxe.ui.themes.Theme";
haxe_ui_themes_Theme.prototype = {
	parent: null
	,styles: null
	,images: null
	,vars: null
	,__class__: haxe_ui_themes_Theme
};
var haxe_ui_themes_ThemeManager = function() {
	this.currentThemeVars = new haxe_ds_StringMap();
	this._eventMap = null;
	this._themes = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.themes.ThemeManager"] = haxe_ui_themes_ThemeManager;
haxe_ui_themes_ThemeManager.__name__ = "haxe.ui.themes.ThemeManager";
haxe_ui_themes_ThemeManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_themes_ThemeManager.get_instance = function() {
	if(haxe_ui_themes_ThemeManager._instance == null) {
		haxe_ui_themes_ThemeManager._instance = new haxe_ui_themes_ThemeManager();
	}
	return haxe_ui_themes_ThemeManager._instance;
};
haxe_ui_themes_ThemeManager.prototype = {
	_themes: null
	,_themeImages: null
	,_eventMap: null
	,registerEvent: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(this._eventMap == null) {
			this._eventMap = new haxe_ui_util_EventMap();
		}
		this._eventMap.add(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._eventMap == null) {
			return;
		}
		this._eventMap.remove(type,listener);
	}
	,dispatch: function(event) {
		if(this._eventMap == null) {
			return;
		}
		this._eventMap.invoke(event.type,new haxe_ui_events_ThemeEvent(haxe_ui_events_ThemeEvent.THEME_CHANGED));
	}
	,getTheme: function(themeName) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			theme = new haxe_ui_themes_Theme();
			this._themes.h[themeName] = theme;
		}
		return theme;
	}
	,addStyleResource: function(themeName,resourceId,priority,styleData) {
		if(priority == null) {
			priority = 0;
		}
		this.getTheme(themeName).styles.push({ resourceId : resourceId, priority : priority, styleData : styleData});
	}
	,setThemeVar: function(themeName,varName,varValue) {
		var theme = this.getTheme(themeName);
		if(theme == null) {
			return;
		}
		theme.vars.h[varName] = varValue;
	}
	,setCurrentThemeVar: function(varName,varValue) {
		this.setThemeVar(haxe_ui_Toolkit.get_theme(),varName,varValue);
	}
	,addImageResource: function(themeName,id,resourceId,priority) {
		if(priority == null) {
			priority = 0;
		}
		this.getTheme(themeName).images.push({ id : id, resourceId : resourceId, priority : priority});
	}
	,currentThemeVars: null
	,applyTheme: function(themeName) {
		haxe_ui_Toolkit.styleSheet.clear("default");
		var finalVars = new haxe_ds_StringMap();
		this.buildThemeVars("global",finalVars);
		this.buildThemeVars(themeName,finalVars);
		this.currentThemeVars = new haxe_ds_StringMap();
		var h = finalVars.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			this.currentThemeVars.h[k] = finalVars.h[k];
		}
		var entries = [];
		this.buildThemeEntries("global",entries);
		this.buildThemeEntries(themeName,entries);
		haxe_ds_ArraySort.sort(entries,function(a,b) {
			if(a.priority < b.priority) {
				return -1;
			} else if(a.priority > b.priority) {
				return 1;
			}
			return 0;
		});
		var _g = 0;
		while(_g < entries.length) {
			var e = entries[_g];
			++_g;
			this.applyResource(e.resourceId,e.styleData);
		}
		var images = [];
		this.buildThemeImages("global",images);
		this.buildThemeImages(themeName,images);
		haxe_ds_ArraySort.sort(images,function(a,b) {
			if(a.priority < b.priority) {
				return -1;
			} else if(a.priority > b.priority) {
				return 1;
			}
			return 0;
		});
		var _g = 0;
		while(_g < images.length) {
			var i = images[_g];
			++_g;
			if(this._themeImages == null) {
				this._themeImages = new haxe_ds_StringMap();
			}
			this._themeImages.h[i.id] = i;
		}
		this.dispatch(new haxe_ui_events_ThemeEvent(haxe_ui_events_ThemeEvent.THEME_CHANGED));
	}
	,applyResource: function(resourceId,styleData) {
		var style = "";
		if(resourceId != null) {
			style = haxe_ui_Toolkit.get_assets().getText(resourceId);
		}
		if(styleData != null) {
			if(style == null) {
				style = "";
			}
			style += "\n" + styleData;
		}
		if(style != null) {
			this.addStyleString(style);
		}
	}
	,addStyleString: function(style) {
		haxe_ui_Toolkit.styleSheet.parse(style);
	}
	,buildThemeVars: function(themeName,vars) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			return;
		}
		if(theme.parent != null) {
			this.buildThemeVars(theme.parent,vars);
		}
		var h = theme.vars.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			var v = theme.vars.h[k];
			vars.h[k] = v;
		}
	}
	,buildThemeEntries: function(themeName,arr) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			return;
		}
		if(theme.parent != null) {
			this.buildThemeEntries(theme.parent,arr);
		}
		var _g = 0;
		var _g1 = theme.styles;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			arr.push(s);
		}
	}
	,buildThemeImages: function(themeName,arr) {
		var theme = this._themes.h[themeName];
		if(theme == null) {
			return;
		}
		if(theme.parent != null) {
			this.buildThemeImages(theme.parent,arr);
		}
		var _g = 0;
		var _g1 = theme.images;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			arr.push(s);
		}
	}
	,image: function(id) {
		var image = this._themeImages.h[id];
		if(image == null) {
			return null;
		}
		return image.resourceId;
	}
	,icon: function(id) {
		return this.image(id);
	}
	,__class__: haxe_ui_themes_ThemeManager
};
var haxe_ui_tooltips_ToolTip = function() {
	haxe_ui_containers_Box.call(this);
};
$hxClasses["haxe.ui.tooltips.ToolTip"] = haxe_ui_tooltips_ToolTip;
haxe_ui_tooltips_ToolTip.__name__ = "haxe.ui.tooltips.ToolTip";
haxe_ui_tooltips_ToolTip.__super__ = haxe_ui_containers_Box;
haxe_ui_tooltips_ToolTip.prototype = $extend(haxe_ui_containers_Box.prototype,{
	registerBehaviours: function() {
		haxe_ui_containers_Box.prototype.registerBehaviours.call(this);
	}
	,cloneComponent: function() {
		var c = haxe_ui_containers_Box.prototype.cloneComponent.call(this);
		if((this._children == null ? [] : this._children).length != (c._children == null ? [] : c._children).length) {
			var _g = 0;
			var _g1 = this._children == null ? [] : this._children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				c.addComponent(child.cloneComponent());
			}
		}
		this.postCloneComponent(c);
		return c;
	}
	,self: function() {
		return new haxe_ui_tooltips_ToolTip();
	}
	,__class__: haxe_ui_tooltips_ToolTip
});
var haxe_ui_tooltips_ToolTipManager = function() {
	this._toolTipContents = null;
	this._toolTip = null;
	this._timer = null;
	this._currentComponent = null;
	this._lastMouseEvent = null;
	this._toolTipOptions = new haxe_ds_ObjectMap();
};
$hxClasses["haxe.ui.tooltips.ToolTipManager"] = haxe_ui_tooltips_ToolTipManager;
haxe_ui_tooltips_ToolTipManager.__name__ = "haxe.ui.tooltips.ToolTipManager";
haxe_ui_tooltips_ToolTipManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_tooltips_ToolTipManager.get_instance = function() {
	if(haxe_ui_tooltips_ToolTipManager._instance == null) {
		haxe_ui_tooltips_ToolTipManager._instance = new haxe_ui_tooltips_ToolTipManager();
	}
	return haxe_ui_tooltips_ToolTipManager._instance;
};
haxe_ui_tooltips_ToolTipManager.prototype = {
	_lastMouseEvent: null
	,_toolTipOptions: null
	,registerTooltip: function(target,options) {
		if(this._toolTipOptions.h.__keys__[target.__id__] != null) {
			return;
		}
		if(options == null) {
			options = { };
		}
		if(options.tipData == null) {
			options.tipData = { text : target.get_tooltip()};
		}
		this._toolTipOptions.set(target,options);
		target.registerEvent("mouseover",$bind(this,this.onTargetMouseOver));
	}
	,unregisterTooltip: function(target) {
		target.unregisterEvent("mouseover",$bind(this,this.onTargetMouseOver));
		target.unregisterEvent("mouseout",$bind(this,this.onTargetMouseOut));
		target.unregisterEvent("mousemove",$bind(this,this.onTargetMouseMove));
		this._toolTipOptions.remove(target);
	}
	,getTooltipOptions: function(target) {
		return this._toolTipOptions.h[target.__id__];
	}
	,updateTooltipRenderer: function(target,renderer) {
		if(this._toolTipOptions.h.__keys__[target.__id__] == null) {
			return;
		}
		var options = this._toolTipOptions.h[target.__id__];
		options.renderer = renderer;
	}
	,_currentComponent: null
	,_timer: null
	,onTargetMouseOver: function(event) {
		this.stopCurrent();
		this._lastMouseEvent = event;
		this._currentComponent = event.target;
		event.target.registerEvent("mouseout",$bind(this,this.onTargetMouseOut));
		event.target.registerEvent("mousemove",$bind(this,this.onTargetMouseMove));
		haxe_ui_core_Screen.get_instance().registerEvent("mousemove",$bind(this,this.onScreenMouseMove));
		this.startTimer();
	}
	,onTargetMouseMove: function(event) {
		if(this._toolTip != null && this._toolTip.get_hidden() == false) {
			return;
		}
		this.stopTimer();
		this.startTimer();
	}
	,onTargetMouseOut: function(event) {
		this.stopCurrent();
		this.hideToolTip();
	}
	,onDelayTimer: function() {
		this._timer.stop();
		this._timer = null;
		this.showToolTip();
	}
	,onScreenMouseMove: function(event) {
		this._lastMouseEvent = event;
	}
	,onScreenMouseDown: function(event) {
		this.hideToolTip();
	}
	,startTimer: function() {
		this._timer = new haxe_ui_util_Timer(haxe_ui_tooltips_ToolTipManager.defaultDelay,$bind(this,this.onDelayTimer));
	}
	,stopTimer: function() {
		if(this._timer != null) {
			this._timer.stop();
			this._timer = null;
		}
	}
	,stopCurrent: function() {
		if(this._currentComponent != null) {
			this._currentComponent.unregisterEvent("mouseout",$bind(this,this.onTargetMouseOut));
			this._currentComponent = null;
		}
		this.stopTimer();
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousemove",$bind(this,this.onScreenMouseMove));
	}
	,_toolTip: null
	,_toolTipContents: null
	,createToolTip: function() {
		if(this._toolTip != null) {
			return;
		}
		this._toolTip = new haxe_ui_tooltips_ToolTip();
	}
	,showToolTip: function() {
		var _gthis = this;
		if(this._currentComponent == null) {
			return;
		}
		if(this._currentComponent.get_disabled() == true || this._currentComponent.get_hidden() == true) {
			this.stopCurrent();
			return;
		}
		this.createToolTip();
		this._toolTip.hide();
		var options = this._toolTipOptions.h[this._currentComponent.__id__];
		var renderer = this.createToolTipRenderer(options);
		var _this = this._toolTip;
		if((_this._children == null ? [] : _this._children)[0] != renderer) {
			var _this = this._toolTip;
			if((_this._children == null ? [] : _this._children).length > 0) {
				this._toolTip.removeComponentAt(0,false);
			}
			this._toolTip.addComponent(renderer);
		}
		renderer.set_data(options.tipData);
		haxe_ui_core_Screen.get_instance().addComponent(this._toolTip);
		haxe_ui_core_Screen.get_instance().setComponentIndex(this._toolTip,haxe_ui_core_Screen.get_instance().rootComponents.length - 1);
		this._toolTip.validateNow();
		this.positionToolTip();
		haxe_ui_Toolkit.callLater(function() {
			if(haxe_ui_tooltips_ToolTipManager.fade == true) {
				_gthis._toolTip.fadeIn();
			} else {
				_gthis._toolTip.show();
			}
		});
		haxe_ui_core_Screen.get_instance().registerEvent("mousedown",$bind(this,this.onScreenMouseDown));
	}
	,positionToolTip: function() {
		var x = this._lastMouseEvent.screenX + this._toolTip.get_marginLeft();
		var y = this._lastMouseEvent.screenY + this._toolTip.get_marginTop();
		var w = this._toolTip.get_width();
		var h = this._toolTip.get_height();
		var maxX = haxe_ui_core_Screen.get_instance().get_width();
		var maxY = haxe_ui_core_Screen.get_instance().get_height();
		if(x + w > maxX) {
			x -= w;
		}
		if(y + h > maxY) {
			y = this._lastMouseEvent.screenY - h - this._toolTip.get_marginTop() / 2;
		}
		this._toolTip.set_left(x * haxe_ui_Toolkit.get_scale());
		this._toolTip.set_top(y * haxe_ui_Toolkit.get_scale());
	}
	,hideToolTip: function() {
		if(this._toolTip != null) {
			if(haxe_ui_tooltips_ToolTipManager.fade == true) {
				this._toolTip.fadeOut();
			} else {
				this._toolTip.hide();
			}
		}
		haxe_ui_core_Screen.get_instance().unregisterEvent("mousedown",$bind(this,this.onScreenMouseDown));
	}
	,createToolTipRenderer: function(options) {
		if(options.renderer != null) {
			return options.renderer;
		}
		if(haxe_ui_tooltips_ToolTipManager.defaultRenderer != null) {
			return haxe_ui_tooltips_ToolTipManager.defaultRenderer;
		}
		if(this._toolTipContents != null) {
			return this._toolTipContents;
		}
		this._toolTipContents = new haxe_ui_core_ItemRenderer();
		var label = new haxe_ui_components_Label();
		label.set_id("text");
		this._toolTipContents.addComponent(label);
		return this._toolTipContents;
	}
	,__class__: haxe_ui_tooltips_ToolTipManager
};
var haxe_ui_util_CallbackMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.CallbackMap"] = haxe_ui_util_CallbackMap;
haxe_ui_util_CallbackMap.__name__ = "haxe.ui.util.CallbackMap";
haxe_ui_util_CallbackMap.prototype = {
	_map: null
	,add: function(key,callback,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(callback == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[key];
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(callback,priority);
			this._map.h[key] = arr;
			b = true;
		} else if(arr.contains(callback) == false) {
			arr.push(callback,priority);
		}
		return b;
	}
	,remove: function(key,callback) {
		var b = false;
		var arr = this._map.h[key];
		if(arr != null) {
			arr.remove(callback);
			if(arr.get_length() == 0) {
				var _this = this._map;
				if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
					delete(_this.h[key]);
				}
				b = true;
			}
		}
		return b;
	}
	,removeAll: function(key) {
		var arr = this._map.h[key];
		if(arr != null) {
			while(arr.get_length() > 0) arr.remove(arr.get(0));
			var _this = this._map;
			if(Object.prototype.hasOwnProperty.call(_this.h,key)) {
				delete(_this.h[key]);
			}
		}
	}
	,invoke: function(key,param) {
		var arr = this._map.h[key];
		if(arr != null) {
			arr = arr.copy();
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				listener1.callback(param);
			}
		}
	}
	,invokeAndRemove: function(key,param) {
		var arr = this._map.h[key];
		if(arr != null) {
			arr = arr.copy();
			this.removeAll(key);
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				listener1.callback(param);
			}
		}
	}
	,count: function(key) {
		var n = 0;
		var arr = this._map.h[key];
		if(arr != null) {
			n = arr.get_length();
		}
		return n;
	}
	,__class__: haxe_ui_util_CallbackMap
};
var haxe_ui_util_Color = {};
haxe_ui_util_Color.__properties__ = {set_a:"set_a",get_a:"get_a",set_b:"set_b",get_b:"get_b",set_g:"set_g",get_g:"get_g",set_r:"set_r",get_r:"get_r"};
haxe_ui_util_Color.fromString = function(s) {
	if(StringTools.startsWith(s,"0x") || StringTools.startsWith(s,"#")) {
		return Std.parseInt("0x" + s.substring(s.length - 6));
	}
	switch(s) {
	case "aliceblue":
		return 15792383;
	case "antiquewhite":
		return 16444375;
	case "aqua":
		return 65535;
	case "aquamarine":
		return 8388564;
	case "azure":
		return 15794175;
	case "beige":
		return 16119260;
	case "bisque":
		return 16770244;
	case "black":
		return 0;
	case "blanchedalmond":
		return 16772045;
	case "blue":
		return 255;
	case "blueviolet":
		return 9055202;
	case "brown":
		return 10824234;
	case "burlywood":
		return 14596231;
	case "cadetblue":
		return 6266528;
	case "chartreuse":
		return 8388352;
	case "chocolate":
		return 13789470;
	case "coral":
		return 16744272;
	case "cornflowerblue":
		return 6591981;
	case "cornsilk":
		return 16775388;
	case "crimson":
		return 14423100;
	case "cyan":
		return 65535;
	case "darkblue":
		return 139;
	case "darkcyan":
		return 35723;
	case "darkgoldenrod":
		return 12092939;
	case "darkgray":
		return 11119017;
	case "darkgreen":
		return 25600;
	case "darkkhaki":
		return 12433259;
	case "darkmagenta":
		return 9109643;
	case "darkolivegreen":
		return 5597999;
	case "darkorange":
		return 16747520;
	case "darkorchid":
		return 10040012;
	case "darkred":
		return 9109504;
	case "darksalmon":
		return 15308410;
	case "darkseagreen":
		return 9419919;
	case "darkslateblue":
		return 4734347;
	case "darkslategray":
		return 3100495;
	case "darkturquoise":
		return 52945;
	case "darkviolet":
		return 9699539;
	case "deeppink":
		return 16716947;
	case "deepskyblue":
		return 49151;
	case "dimgray":
		return 6908265;
	case "dodgerblue":
		return 2003199;
	case "firebrick":
		return 11674146;
	case "floralwhite":
		return 16775920;
	case "forestgreen":
		return 2263842;
	case "fuchsia":
		return 16711935;
	case "gainsboro":
		return 14474460;
	case "ghostwhite":
		return 16316671;
	case "gold":
		return 16766720;
	case "goldenrod":
		return 14329120;
	case "green":
		return 32768;
	case "greenyellow":
		return 11403055;
	case "gray":case "grey":
		return 8421504;
	case "honeydew":
		return 15794160;
	case "hotpink":
		return 16738740;
	case "indianred":
		return 13458524;
	case "indigo":
		return 4915330;
	case "ivory":
		return 16777200;
	case "khaki":
		return 15787660;
	case "lavender":
		return 15132410;
	case "lavenderblush":
		return 16773365;
	case "lawngreen":
		return 8190976;
	case "lemonchiffon":
		return 16775885;
	case "lightblue":
		return 11393254;
	case "lightcoral":
		return 15761536;
	case "lightcyan":
		return 14745599;
	case "lightgoldenrodyellow":
		return 16448210;
	case "lightgray":
		return 13882323;
	case "lightgreen":
		return 9498256;
	case "lightpink":
		return 16758465;
	case "lightsalmon":
		return 16752762;
	case "lightseagreen":
		return 2142890;
	case "lightskyblue":
		return 8900346;
	case "lightslategray":
		return 7833753;
	case "lightsteelblue":
		return 11584734;
	case "lightyellow":
		return 16777184;
	case "lime":
		return 65280;
	case "limegreen":
		return 3329330;
	case "linen":
		return 16445670;
	case "magenta":
		return 16711935;
	case "maroon":
		return 8388608;
	case "mediumaquamarine":
		return 6737322;
	case "mediumblue":
		return 205;
	case "mediumorchid":
		return 12211667;
	case "mediumpurple":
		return 9662683;
	case "mediumseagreen":
		return 3978097;
	case "mediumslateblue":
		return 8087790;
	case "mediumspringgreen":
		return 64154;
	case "mediumturquoise":
		return 4772300;
	case "mediumvioletred":
		return 13047173;
	case "midnightblue":
		return 1644912;
	case "mintcream":
		return 16121850;
	case "mistyrose":
		return 16770273;
	case "moccasin":
		return 16770229;
	case "navajowhite":
		return 16768685;
	case "navy":
		return 128;
	case "oldlace":
		return 16643558;
	case "olive":
		return 8421376;
	case "olivedrab":
		return 7048739;
	case "orange":
		return 16753920;
	case "orangered":
		return 16729344;
	case "orchid":
		return 14315734;
	case "palegoldenrod":
		return 15657130;
	case "palegreen":
		return 10025880;
	case "paleturquoise":
		return 11529966;
	case "palevioletred":
		return 14381203;
	case "papayawhip":
		return 16773077;
	case "peachpuff":
		return 16767673;
	case "peru":
		return 13468991;
	case "pink":
		return 16761035;
	case "plum":
		return 14524637;
	case "powderblue":
		return 11591910;
	case "purple":
		return 8388736;
	case "red":
		return 16711680;
	case "rosybrown":
		return 12357519;
	case "royalblue":
		return 4286945;
	case "saddlebrown":
		return 9127187;
	case "salmon":
		return 16416882;
	case "sandybrown":
		return 16032864;
	case "seagreen":
		return 3050327;
	case "seashell":
		return 16774638;
	case "sienna":
		return 10506797;
	case "silver":
		return 12632256;
	case "skyblue":
		return 8900331;
	case "slateblue":
		return 6970061;
	case "slategray":
		return 7372944;
	case "snow":
		return 16775930;
	case "springgreen":
		return 65407;
	case "steelblue":
		return 4620980;
	case "tan":
		return 13808780;
	case "teal":
		return 32896;
	case "thistle":
		return 14204888;
	case "tomato":
		return 16737095;
	case "turquoise":
		return 4251856;
	case "violet":
		return 15631086;
	case "wheat":
		return 16113331;
	case "white":
		return 16777215;
	case "whitesmoke":
		return 16119285;
	case "yellow":
		return 16776960;
	case "yellowgreen":
		return 10145074;
	default:
		return 0;
	}
};
haxe_ui_util_Color.fromComponents = function(r,g,b,a) {
	var result = (r & 255) << 16 | (g & 255) << 8 | b & 255;
	return result;
};
haxe_ui_util_Color.get_r = function(this1) {
	return this1 >> 16 & 255;
};
haxe_ui_util_Color.set_r = function(this1,value) {
	this1 = (value & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.get_g = function(this1) {
	return this1 >> 8 & 255;
};
haxe_ui_util_Color.set_g = function(this1,value) {
	this1 = (this1 >> 16 & 255 & 255) << 16 | (value & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.get_b = function(this1) {
	return this1 & 255;
};
haxe_ui_util_Color.set_b = function(this1,value) {
	this1 = (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | value & 255;
	return this1;
};
haxe_ui_util_Color.get_a = function(this1) {
	return this1 >> 24 & 255;
};
haxe_ui_util_Color.set_a = function(this1,value) {
	this1 = (this1 >> 16 & 255 & 255) << 16 | (this1 >> 8 & 255 & 255) << 8 | this1 & 255 & 255;
	return this1;
};
haxe_ui_util_Color.set = function(this1,r,g,b,a) {
	this1 = (r & 255) << 16 | (g & 255) << 8 | b & 255;
	return this1;
};
haxe_ui_util_Color.toInt = function(this1) {
	return this1;
};
haxe_ui_util_Color.toHex = function(this1) {
	return "#" + StringTools.hex(this1 >> 16 & 255,2) + StringTools.hex(this1 >> 8 & 255,2) + StringTools.hex(this1 & 255,2);
};
haxe_ui_util_Color.or = function(a,b) {
	return haxe_ui_util_Color.toInt(a) | haxe_ui_util_Color.toInt(b);
};
haxe_ui_util_Color.sumColor = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) + (b >> 16 & 255),(a >> 8 & 255) + (b >> 8 & 255),(a & 255) + (b & 255),(a >> 24 & 255) + (b >> 24 & 255)));
};
haxe_ui_util_Color.restColor = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) - (b >> 16 & 255),(a >> 8 & 255) - (b >> 8 & 255),(a & 255) - (b & 255),(a >> 24 & 255) - (b >> 24 & 255)));
};
haxe_ui_util_Color.sumFloat = function(a,b) {
	var bInt = b | 0;
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) - bInt,(a >> 8 & 255) - bInt,(a & 255) - bInt,(a >> 24 & 255) - bInt));
};
haxe_ui_util_Color.mulFloat = function(a,b) {
	return haxe_ui_util_Color.toInt(haxe_ui_util_Color.fromComponents((a >> 16 & 255) * b | 0,(a >> 8 & 255) * b | 0,(a & 255) * b | 0,(a >> 24 & 255) * b | 0));
};
var haxe_ui_util_ColorUtil = function() { };
$hxClasses["haxe.ui.util.ColorUtil"] = haxe_ui_util_ColorUtil;
haxe_ui_util_ColorUtil.__name__ = "haxe.ui.util.ColorUtil";
haxe_ui_util_ColorUtil.toHSL = function(color) {
	var r = (color >> 16 & 255) / 255;
	var g = (color >> 8 & 255) / 255;
	var b = (color & 255) / 255;
	var numbers = [r,g,b];
	var r1 = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n < r1) {
			r1 = n;
		}
	}
	var min = r1;
	var numbers = [r,g,b];
	var r1 = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n > r1) {
			r1 = n;
		}
	}
	var max = r1;
	var delta = max - min;
	var h = 0;
	var s = 0;
	var l = (max + min) / 2;
	if(delta == 0.0) {
		h = 0.0;
		s = h;
	} else {
		s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
		if(r == max) {
			h = (g - b) / delta + (g < b ? 6 : 0);
		} else if(g == max) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}
		h *= 60;
	}
	return { h : Math.round(h), s : s * 100, l : l * 100};
};
haxe_ui_util_ColorUtil.fromHSL = function(hue,saturation,luminosity) {
	saturation /= 100;
	luminosity /= 100;
	var _c = function(d,s,l) {
		var m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
		var m1 = 2 * l - m2;
		var v = d;
		v %= 360;
		if(v < 0) {
			v += 360;
		}
		d = v;
		if(d < 60) {
			return m1 + (m2 - m1) * d / 60;
		} else if(d < 180) {
			return m2;
		} else if(d < 240) {
			return m1 + (m2 - m1) * (240 - d) / 60;
		}
		return m1;
	};
	return haxe_ui_util_Color.fromComponents(Math.round(_c(hue + 120,saturation,luminosity) * 255),Math.round(_c(hue,saturation,luminosity) * 255),Math.round(_c(hue - 120,saturation,luminosity) * 255),255);
};
haxe_ui_util_ColorUtil.toHSV = function(color) {
	var r = (color >> 16 & 255) / 255;
	var g = (color >> 8 & 255) / 255;
	var b = (color & 255) / 255;
	var numbers = [r,g,b];
	var r1 = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n < r1) {
			r1 = n;
		}
	}
	var min = r1;
	var numbers = [r,g,b];
	var r1 = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n > r1) {
			r1 = n;
		}
	}
	var max = r1;
	var delta = max - min;
	var h = 0;
	var s = 0;
	var v = max;
	if(delta != 0) {
		s = delta / max;
	} else {
		s = 0;
		h = 0;
		return { h : Math.round(h), s : s * 100, v : v * 100};
	}
	if(r == max) {
		h = (g - b) / delta;
	} else if(g == max) {
		h = 2 + (b - r) / delta;
	} else {
		h = 4 + (r - g) / delta;
	}
	h *= 60;
	if(h < 0) {
		h += 360;
	}
	return { h : Math.round(h), s : s * 100, v : v * 100};
};
haxe_ui_util_ColorUtil.fromHSV = function(hue,saturation,value) {
	if(saturation == 0) {
		return haxe_ui_util_Color.fromComponents(value | 0,value | 0,value | 0,255);
	}
	saturation /= 100;
	value /= 100;
	var r;
	var g;
	var b;
	var h = hue / 60;
	var i = Math.floor(h);
	var f = h - i;
	var p = value * (1 - saturation);
	var q = value * (1 - f * saturation);
	var t = value * (1 - (1 - f) * saturation);
	switch(i) {
	case 0:
		r = value;
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = value;
		b = p;
		break;
	case 2:
		r = p;
		g = value;
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = value;
		break;
	case 4:
		r = t;
		g = p;
		b = value;
		break;
	default:
		r = value;
		g = p;
		b = q;
	}
	return haxe_ui_util_Color.fromComponents(Math.round(r * 255),Math.round(g * 255),Math.round(b * 255),255);
};
haxe_ui_util_ColorUtil.hsvToRGBF = function(hue,saturation,value) {
	var tmp = hue == 0 && saturation == 0 && value == 100;
	var tmp = saturation == 0;
	saturation /= 100;
	value /= 100;
	var r;
	var g;
	var b;
	var h = hue / 60;
	var i = Math.floor(h);
	var f = h - i;
	var p = value * (1 - saturation);
	var q = value * (1 - f * saturation);
	var t = value * (1 - (1 - f) * saturation);
	switch(i) {
	case 0:
		r = value;
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = value;
		b = p;
		break;
	case 2:
		r = p;
		g = value;
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = value;
		break;
	case 4:
		r = t;
		g = p;
		b = value;
		break;
	default:
		r = value;
		g = p;
		b = q;
	}
	return { r : r * 255, g : g * 255, b : b * 255};
};
haxe_ui_util_ColorUtil.rgbToGray = function(r,g,b) {
	var g1 = 0.3 * r + 0.59 * g + 0.11 * b;
	return Math.round(g1);
};
haxe_ui_util_ColorUtil.rgbfToHSV = function(r,g,b) {
	var tmp = Math.round(r) == 255 && Math.round(g) == 255 && Math.round(b) == 255;
	var r1 = r / 255;
	var g1 = g / 255;
	var b1 = b / 255;
	var numbers = [r1,g1,b1];
	var r = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n < r) {
			r = n;
		}
	}
	var min = r;
	var numbers = [r1,g1,b1];
	var r = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n > r) {
			r = n;
		}
	}
	var max = r;
	var delta = max - min;
	var h = 0;
	var s = 0;
	var v = max;
	if(delta != 0) {
		s = delta / max;
	} else {
		s = 0;
		h = 0;
		return { h : h, s : s * 100, v : v * 100};
	}
	if(r1 == max) {
		h = (g1 - b1) / delta;
	} else if(g1 == max) {
		h = 2 + (b1 - r1) / delta;
	} else {
		h = 4 + (r1 - g1) / delta;
	}
	h *= 60;
	if(h < 0) {
		h += 360;
	}
	if(Math.round(r1) == 255 && Math.round(g1) == 255 && Math.round(b1) == 255) {
		return { h : h, s : 0, v : 100};
	}
	return { h : h, s : s * 100, v : v * 100};
};
haxe_ui_util_ColorUtil.buildColorArray = function(startColor,endColor,size) {
	var array = [];
	var r1 = startColor >> 16 & 255;
	var g1 = startColor >> 8 & 255;
	var b1 = startColor & 255;
	var r2 = endColor >> 16 & 255;
	var g2 = endColor >> 8 & 255;
	var b2 = endColor & 255;
	var rd = r2 - r1;
	var gd = g2 - g1;
	var bd = b2 - b1;
	var ri = rd / (size - 1);
	var gi = gd / (size - 1);
	var bi = bd / (size - 1);
	var r = r1;
	var g = g1;
	var b = b1;
	var c;
	var _g = 0;
	var _g1 = size;
	while(_g < _g1) {
		var n = _g++;
		c = (Math.round(r) & 255) << 16 | (Math.round(g) & 255) << 8 | Math.round(b) & 255;
		array.push(haxe_ui_util_Color.toInt(c));
		r += ri;
		g += gi;
		b += bi;
	}
	return array;
};
haxe_ui_util_ColorUtil.parseColor = function(s) {
	if(StringTools.startsWith(s,"#")) {
		s = s.substring(1,s.length);
	} else if(StringTools.startsWith(s,"0x")) {
		s = s.substring(2,s.length);
	}
	return Std.parseInt("0x" + s);
};
var haxe_ui_util_ComponentUtil = function() { };
$hxClasses["haxe.ui.util.ComponentUtil"] = haxe_ui_util_ComponentUtil;
haxe_ui_util_ComponentUtil.__name__ = "haxe.ui.util.ComponentUtil";
haxe_ui_util_ComponentUtil.getDepth = function(target) {
	var count = 0;
	while(target.parentComponent != null) {
		target = target.parentComponent;
		++count;
	}
	return count;
};
haxe_ui_util_ComponentUtil.dumpComponentTree = function(from,verbose) {
	if(verbose == null) {
		verbose = false;
	}
	haxe_ui_util_ComponentUtil.recurseTreeGrouped(from,verbose);
};
haxe_ui_util_ComponentUtil.walkComponentTree = function(from,cb) {
	haxe_ui_util_ComponentUtil.recurseTree(0,from,cb);
};
haxe_ui_util_ComponentUtil.recurseTree = function(depth,c,cb) {
	cb(depth,c);
	var _g = 0;
	var _g1 = c._children == null ? [] : c._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_util_ComponentUtil.recurseTree(depth + 1,child,cb);
	}
};
haxe_ui_util_ComponentUtil.recurseTreeTrace = function(c,level,verbose) {
	var display = c.get_className();
	if(c.get_id() != null) {
		display += "#" + c.get_id();
	}
	var space = StringTools.lpad(""," ",level * 4);
	display = space + display;
	haxe_Log.trace(display,{ fileName : "haxe/ui/util/ComponentUtil.hx", lineNumber : 42, className : "haxe.ui.util.ComponentUtil", methodName : "recurseTreeTrace"});
	var _g = 0;
	var _g1 = c._children == null ? [] : c._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_util_ComponentUtil.recurseTreeTrace(child,level + 1,verbose);
	}
};
haxe_ui_util_ComponentUtil.recurseTreeGrouped = function(c,verbose) {
	var display = c.get_className();
	if(c.get_id() != null) {
		display += "#" + c.get_id();
	}
	$global.console.groupCollapsed(display);
	if(verbose == true) {
		$global.console.groupCollapsed("Component Details");
		$global.console.log(c.element);
		$global.console.groupEnd();
	}
	var _g = 0;
	var _g1 = c._children == null ? [] : c._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		haxe_ui_util_ComponentUtil.recurseTreeGrouped(child,verbose);
	}
	$global.console.groupEnd();
};
var haxe_ui_util_Defines = function() { };
$hxClasses["haxe.ui.util.Defines"] = haxe_ui_util_Defines;
haxe_ui_util_Defines.__name__ = "haxe.ui.util.Defines";
haxe_ui_util_Defines.getAll = function() {
	haxe_ui_util_Defines.popuplate();
	return haxe_ui_util_Defines._map;
};
haxe_ui_util_Defines.set = function(name,value,overwrite) {
	if(overwrite == null) {
		overwrite = false;
	}
	haxe_ui_util_Defines.popuplate();
	if(overwrite == false && Object.prototype.hasOwnProperty.call(haxe_ui_util_Defines._map.h,name)) {
		return;
	}
	haxe_ui_util_Defines._map.h[name] = value;
};
haxe_ui_util_Defines.popuplate = function() {
	if(haxe_ui_util_Defines._map != null) {
		return;
	}
	haxe_ui_util_Defines._map = new haxe_ds_StringMap();
	if(haxe_ui_core_Platform.get_instance().get_isWindows()) {
		haxe_ui_util_Defines.set("windows","1");
	} else if(haxe_ui_core_Platform.get_instance().get_isLinux()) {
		haxe_ui_util_Defines.set("linux","1");
	} else if(haxe_ui_core_Platform.get_instance().get_isMac()) {
		haxe_ui_util_Defines.set("mac","1");
	}
};
haxe_ui_util_Defines.toObject = function() {
	haxe_ui_util_Defines.popuplate();
	var o = { };
	var h = haxe_ui_util_Defines._map.h;
	var k_h = h;
	var k_keys = Object.keys(h);
	var k_length = k_keys.length;
	var k_current = 0;
	while(k_current < k_length) {
		var k = k_keys[k_current++];
		var v = haxe_ui_util_Defines._map.h[k];
		o[k] = v;
	}
	return o;
};
var haxe_ui_util_EventMap = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["haxe.ui.util.EventMap"] = haxe_ui_util_EventMap;
haxe_ui_util_EventMap.__name__ = "haxe.ui.util.EventMap";
haxe_ui_util_EventMap.prototype = {
	_map: null
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this._map.h);
	}
	,removeAll: function() {
		var h = this._map.h;
		var type_h = h;
		var type_keys = Object.keys(h);
		var type_length = type_keys.length;
		var type_current = 0;
		while(type_current < type_length) {
			var type = type_keys[type_current++];
			this._map.h[type].removeAll();
		}
	}
	,add: function(type,listener,priority) {
		if(priority == null) {
			priority = 0;
		}
		if(listener == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[type];
		if(arr == null) {
			arr = new haxe_ui_util_FunctionArray();
			arr.push(listener,priority);
			this._map.h[type] = arr;
			b = true;
		} else if(arr.contains(listener) == false) {
			arr.push(listener,priority);
		}
		return b;
	}
	,remove: function(type,listener) {
		if(listener == null) {
			return false;
		}
		var b = false;
		var arr = this._map.h[type];
		if(arr != null) {
			arr.remove(listener);
			if(arr.get_length() == 0) {
				var _this = this._map;
				if(Object.prototype.hasOwnProperty.call(_this.h,type)) {
					delete(_this.h[type]);
				}
				b = true;
			}
		}
		return b;
	}
	,contains: function(type,listener) {
		var b = false;
		var arr = this._map.h[type];
		if(arr != null) {
			b = listener != null ? arr.contains(listener) : true;
		}
		return b;
	}
	,invoke: function(type,event,target) {
		if(event.bubble && event.target == null) {
			event.target = target;
		}
		var arr = this._map.h[type];
		if(arr != null && arr.get_length() > 0) {
			arr = arr.copy();
			var listener = arr.iterator();
			while(listener.hasNext()) {
				var listener1 = listener.next();
				if(event.canceled) {
					break;
				}
				var c = event.clone();
				if(c.target == null) {
					c.target = target;
				}
				listener1.callback(c);
				event.copyFrom(c);
				event.canceled = c.canceled;
			}
		}
	}
	,listenerCount: function(type) {
		var n = 0;
		var arr = this._map.h[type];
		if(arr != null) {
			n = arr.get_length();
		}
		return n;
	}
	,listeners: function(type) {
		var arr = this._map.h[type];
		if(arr == null) {
			return null;
		}
		return arr;
	}
	,__class__: haxe_ui_util_EventMap
};
var haxe_ui_util_ExpressionUtil = function() { };
$hxClasses["haxe.ui.util.ExpressionUtil"] = haxe_ui_util_ExpressionUtil;
haxe_ui_util_ExpressionUtil.__name__ = "haxe.ui.util.ExpressionUtil";
haxe_ui_util_ExpressionUtil.stringToLanguageExpression = function(s,localeManager) {
	if(localeManager == null) {
		localeManager = "haxe.ui.locale.LocaleManager";
	}
	var fixedParts = [];
	var beforePos = 0;
	var n1 = s.indexOf("{{");
	while(n1 != -1) {
		var before = s.substring(beforePos,n1);
		if(before.length > 0) {
			fixedParts.push("'" + before + "'");
		}
		var n2 = s.indexOf("}}",n1);
		var code = s.substring(n1 + 2,n2);
		var parts = code.split(",");
		var stringId = parts.shift();
		var callString = localeManager + ".instance.lookupString('";
		callString += stringId;
		callString += "'";
		if(parts.length > 0) {
			callString += ", ";
			callString += parts.join(", ");
		}
		callString += ")";
		fixedParts.push(callString);
		n1 = s.indexOf("{{",n2);
		beforePos = n2 + 2;
	}
	if(beforePos < s.length) {
		var before = s.substring(beforePos,s.length);
		if(before.length > 0) {
			fixedParts.push("'" + before + "'");
		}
	}
	var fixedCode = fixedParts.join(" + ");
	return fixedCode;
};
var haxe_ui_util_FunctionArray = function() {
	this._array = [];
};
$hxClasses["haxe.ui.util.FunctionArray"] = haxe_ui_util_FunctionArray;
haxe_ui_util_FunctionArray.__name__ = "haxe.ui.util.FunctionArray";
haxe_ui_util_FunctionArray.prototype = {
	_array: null
	,get: function(index) {
		return this._array[index].callback;
	}
	,length: null
	,get_length: function() {
		return this._array.length;
	}
	,push: function(x,priority) {
		if(priority == null) {
			priority = 0;
		}
		var this1 = new haxe_ui_util__$Listener_ListenerInternal(x,priority);
		var listener = this1;
		var _g = 0;
		var _g1 = this._array.length;
		while(_g < _g1) {
			var i = _g++;
			if(this._array[i].priority < priority) {
				this._array.splice(i,0,listener);
				return i;
			}
		}
		return this._array.push(listener);
	}
	,pop: function() {
		return this._array.pop().callback;
	}
	,indexOf: function(x,fromIndex) {
		if(fromIndex == null) {
			fromIndex = 0;
		}
		var _g = fromIndex;
		var _g1 = this._array.length;
		while(_g < _g1) {
			var i = _g++;
			if(this._array[i].callback == x) {
				return i;
			}
		}
		return -1;
	}
	,remove: function(x) {
		var index = this.indexOf(x);
		if(index != -1) {
			this._array.splice(index,1);
		}
		return index != -1;
	}
	,contains: function(x) {
		return this.indexOf(x) != -1;
	}
	,iterator: function() {
		return new haxe_iterators_ArrayIterator(this._array);
	}
	,copy: function() {
		var fa = new haxe_ui_util_FunctionArray();
		fa._array = this._array.slice();
		return fa;
	}
	,toString: function() {
		var s = "[";
		var iter = this.iterator();
		while(iter.hasNext()) {
			s += Std.string(iter.next());
			if(iter.hasNext()) {
				s += ", ";
			}
		}
		s += "]";
		return s;
	}
	,removeAll: function() {
		this._array = [];
	}
	,__class__: haxe_ui_util_FunctionArray
	,__properties__: {get_length:"get_length"}
};
var haxe_ui_util_GUID = function() { };
$hxClasses["haxe.ui.util.GUID"] = haxe_ui_util_GUID;
haxe_ui_util_GUID.__name__ = "haxe.ui.util.GUID";
haxe_ui_util_GUID.randomIntegerWithinRange = function(min,max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
};
haxe_ui_util_GUID.createRandomIdentifier = function(length,radix) {
	if(radix == null) {
		radix = 61;
	}
	var characters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var id = [];
	if(radix > 61) {
		radix = 61;
	}
	while(length-- > 0) id.push(characters[Math.floor(Math.random() * (1 + radix))]);
	return id.join("");
};
haxe_ui_util_GUID.uuid = function() {
	var specialChars = ["8","9","A","B"];
	return haxe_ui_util_GUID.createRandomIdentifier(8,15) + "-" + haxe_ui_util_GUID.createRandomIdentifier(4,15) + "-4" + haxe_ui_util_GUID.createRandomIdentifier(3,15) + "-" + specialChars[Math.floor(Math.random() * 4)] + haxe_ui_util_GUID.createRandomIdentifier(3,15) + "-" + haxe_ui_util_GUID.createRandomIdentifier(12,15);
};
var haxe_ui_util_ImageLoader = function(resource) {
	this._resource = resource;
};
$hxClasses["haxe.ui.util.ImageLoader"] = haxe_ui_util_ImageLoader;
haxe_ui_util_ImageLoader.__name__ = "haxe.ui.util.ImageLoader";
haxe_ui_util_ImageLoader.prototype = {
	_resource: null
	,load: function(callback,useCache) {
		if(useCache == null) {
			useCache = true;
		}
		if(haxe_ui_util_Variant.get_isString(this._resource)) {
			var stringResource = haxe_ui_util_Variant.toString(this._resource);
			if(useCache == true) {
				var cachedImage = haxe_ui_ToolkitAssets.get_instance().getCachedImage(stringResource);
				if(cachedImage != null) {
					callback(cachedImage);
					return;
				}
			}
			stringResource = StringTools.trim(stringResource);
			if(StringTools.startsWith(stringResource,"http://") || StringTools.startsWith(stringResource,"https://")) {
				this.loadFromHttp(stringResource,function(imageInfo) {
					haxe_ui_ToolkitAssets.get_instance().cacheImage(stringResource,imageInfo);
					callback(imageInfo);
				});
			} else if(StringTools.startsWith(stringResource,"file://")) {
				var tmp = HxOverrides.substr(stringResource,7,null);
				haxe_ui_Toolkit.get_assets().imageFromFile(tmp,function(imageInfo) {
					haxe_ui_ToolkitAssets.get_instance().cacheImage(stringResource,imageInfo);
					callback(imageInfo);
				});
			} else {
				haxe_ui_Toolkit.get_assets().getImage(stringResource,callback);
			}
		} else if(haxe_ui_util_Variant.get_isImageData(this._resource)) {
			var imageData = haxe_ui_util_Variant.toImageData(this._resource);
			if(callback != null) {
				callback(haxe_ui_ToolkitAssets.get_instance().imageInfoFromImageData(imageData));
			}
		}
	}
	,loadFromHttp: function(url,callback) {
		var request = new XMLHttpRequest();
		request.open("GET",url);
		request.responseType = "arraybuffer";
		request.onreadystatechange = function(_) {
			if(request.readyState != 4) {
				return;
			}
			var s;
			try {
				s = request.status;
			} catch( _g ) {
				s = null;
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null && s >= 200 && s < 400) {
				haxe_ui_Toolkit.get_assets().imageFromBytes(haxe_io_Bytes.ofData(request.response),callback);
			} else if(s == null) {
				callback(null);
			} else {
				if(s == 0) {
					haxe_ui_Toolkit.get_assets().getImage(url,callback);
					return;
				}
				callback(null);
			}
		};
		request.onerror = function(x) {
		};
		request.send();
	}
	,__class__: haxe_ui_util_ImageLoader
};
var haxe_ui_util_Listener = {};
haxe_ui_util_Listener._new = function(callback,priority) {
	var this1 = new haxe_ui_util__$Listener_ListenerInternal(callback,priority);
	return this1;
};
haxe_ui_util_Listener.compareListener = function(a,b) {
	return a.callback == b.callback;
};
haxe_ui_util_Listener.compareFunction = function(a,b) {
	return a.callback == b;
};
haxe_ui_util_Listener.toFunc = function(this1) {
	return this1.callback;
};
var haxe_ui_util__$Listener_ListenerInternal = function(callback,priority) {
	this.callback = callback;
	this.priority = priority;
};
$hxClasses["haxe.ui.util._Listener.ListenerInternal"] = haxe_ui_util__$Listener_ListenerInternal;
haxe_ui_util__$Listener_ListenerInternal.__name__ = "haxe.ui.util._Listener.ListenerInternal";
haxe_ui_util__$Listener_ListenerInternal.prototype = {
	callback: null
	,priority: null
	,__class__: haxe_ui_util__$Listener_ListenerInternal
};
var haxe_ui_util_MathUtil = function() { };
$hxClasses["haxe.ui.util.MathUtil"] = haxe_ui_util_MathUtil;
haxe_ui_util_MathUtil.__name__ = "haxe.ui.util.MathUtil";
haxe_ui_util_MathUtil.distance = function(x1,y1,x2,y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
haxe_ui_util_MathUtil.round = function(v,precision) {
	if(precision == null) {
		precision = 0;
	}
	return Math.round(v * Math.pow(10,precision)) / Math.pow(10,precision);
};
haxe_ui_util_MathUtil.roundToNearest = function(v,n) {
	var r = v % n;
	if(r <= n / 2) {
		return Math.round(v - r);
	}
	return Math.round(v + n - r);
};
haxe_ui_util_MathUtil.clamp = function(v,min,max) {
	if(v == null || isNaN(v)) {
		return min;
	}
	if(min != null && v < min) {
		v = min;
	} else if(max != null && v > max) {
		v = max;
	}
	return v;
};
haxe_ui_util_MathUtil.min = function(numbers) {
	var r = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n < r) {
			r = n;
		}
	}
	return r;
};
haxe_ui_util_MathUtil.max = function(numbers) {
	var r = numbers[0];
	var _g = 0;
	while(_g < numbers.length) {
		var n = numbers[_g];
		++_g;
		if(n > r) {
			r = n;
		}
	}
	return r;
};
haxe_ui_util_MathUtil.wrapCircular = function(v,max) {
	v %= max;
	if(v < 0) {
		v += max;
	}
	return v;
};
var haxe_ui_util_RTTI = function() { };
$hxClasses["haxe.ui.util.RTTI"] = haxe_ui_util_RTTI;
haxe_ui_util_RTTI.__name__ = "haxe.ui.util.RTTI";
haxe_ui_util_RTTI.addClassProperty = function(className,propertyName,propertyType) {
	className = className.toLowerCase();
	propertyName = propertyName.toLowerCase();
	propertyType = propertyType.toLowerCase();
	if(propertyType == "null<bool>") {
		propertyType = "bool";
	}
	if(propertyType == "null<int>") {
		propertyType = "int";
	}
	if(propertyType == "null<float>") {
		propertyType = "float";
	}
	if(haxe_ui_util_RTTI.classInfo == null) {
		haxe_ui_util_RTTI.classInfo = new haxe_ds_StringMap();
	}
	var entry = haxe_ui_util_RTTI.classInfo.h[className];
	if(entry == null) {
		entry = { };
		haxe_ui_util_RTTI.classInfo.h[className] = entry;
	}
	if(entry.properties == null) {
		entry.properties = new haxe_ds_StringMap();
	}
	entry.properties.h[propertyName] = { propertyName : propertyName, propertyType : propertyType};
};
haxe_ui_util_RTTI.setSuperClass = function(className,superClassName) {
	if(haxe_ui_util_RTTI.classInfo == null) {
		haxe_ui_util_RTTI.classInfo = new haxe_ds_StringMap();
	}
	className = className.toLowerCase();
	superClassName = superClassName.toLowerCase();
	if(StringTools.startsWith(superClassName,".")) {
		superClassName = HxOverrides.substr(superClassName,1,null);
	}
	var entry = haxe_ui_util_RTTI.classInfo.h[className];
	if(entry == null) {
		entry = { properties : new haxe_ds_StringMap()};
		haxe_ui_util_RTTI.classInfo.h[className] = entry;
	}
	entry.superClass = superClassName;
};
haxe_ui_util_RTTI.hasSuperClass = function(className,superClassName) {
	haxe_ui_util_RTTI.load();
	className = className.toLowerCase();
	superClassName = superClassName.toLowerCase();
	if(StringTools.startsWith(superClassName,".")) {
		superClassName = HxOverrides.substr(superClassName,1,null);
	}
	var entry = haxe_ui_util_RTTI.classInfo.h[className];
	if(entry == null) {
		return false;
	}
	if(className == superClassName) {
		return true;
	}
	var testSuper = entry.superClass;
	while(testSuper != null) {
		if(testSuper == superClassName) {
			return true;
		}
		entry = haxe_ui_util_RTTI.classInfo.h[testSuper];
		if(entry == null) {
			return false;
		}
		testSuper = entry.superClass;
	}
	return false;
};
haxe_ui_util_RTTI.hasClassProperty = function(className,propertyName) {
	return haxe_ui_util_RTTI.getClassProperty(className,propertyName) != null;
};
haxe_ui_util_RTTI.load = function() {
	if(haxe_ui_util_RTTI.classInfo != null) {
		return;
	}
	var s = haxe_Resource.getString("haxeui_rtti");
	if(s == null) {
		return;
	}
	var unserializer = new haxe_Unserializer(s);
	haxe_ui_util_RTTI.classInfo = unserializer.unserialize();
};
haxe_ui_util_RTTI.getClassInfo = function(className) {
	haxe_ui_util_RTTI.load();
	if(haxe_ui_util_RTTI.classInfo == null) {
		return null;
	}
	className = className.toLowerCase();
	var entry = haxe_ui_util_RTTI.classInfo.h[className];
	return entry;
};
haxe_ui_util_RTTI.getClassProperty = function(className,propertyName) {
	if(className == null || propertyName == null) {
		return null;
	}
	className = className.toLowerCase();
	propertyName = propertyName.toLowerCase();
	var entry = haxe_ui_util_RTTI.getClassInfo(className);
	if(entry == null) {
		return null;
	}
	var propInfo = null;
	if(entry.properties != null && Object.prototype.hasOwnProperty.call(entry.properties.h,propertyName)) {
		propInfo = entry.properties.h[propertyName];
	}
	if(propInfo == null && entry.superClass != null) {
		propInfo = haxe_ui_util_RTTI.getClassProperty(entry.superClass,propertyName);
	}
	return propInfo;
};
haxe_ui_util_RTTI.save = function() {
};
var haxe_ui_util_SimpleExpressionEvaluatorOperation = $hxEnums["haxe.ui.util.SimpleExpressionEvaluatorOperation"] = { __ename__:true,__constructs__:null
	,Add: {_hx_name:"Add",_hx_index:0,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Subtract: {_hx_name:"Subtract",_hx_index:1,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Multiply: {_hx_name:"Multiply",_hx_index:2,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Divide: {_hx_name:"Divide",_hx_index:3,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,Equals: {_hx_name:"Equals",_hx_index:4,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,NotEquals: {_hx_name:"NotEquals",_hx_index:5,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,GreaterThan: {_hx_name:"GreaterThan",_hx_index:6,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,GreaterThanOrEquals: {_hx_name:"GreaterThanOrEquals",_hx_index:7,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LessThan: {_hx_name:"LessThan",_hx_index:8,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LessThanOrEquals: {_hx_name:"LessThanOrEquals",_hx_index:9,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LogicalAnd: {_hx_name:"LogicalAnd",_hx_index:10,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
	,LogicalOr: {_hx_name:"LogicalOr",_hx_index:11,__enum__:"haxe.ui.util.SimpleExpressionEvaluatorOperation",toString:$estr}
};
haxe_ui_util_SimpleExpressionEvaluatorOperation.__constructs__ = [haxe_ui_util_SimpleExpressionEvaluatorOperation.Add,haxe_ui_util_SimpleExpressionEvaluatorOperation.Subtract,haxe_ui_util_SimpleExpressionEvaluatorOperation.Multiply,haxe_ui_util_SimpleExpressionEvaluatorOperation.Divide,haxe_ui_util_SimpleExpressionEvaluatorOperation.Equals,haxe_ui_util_SimpleExpressionEvaluatorOperation.NotEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThan,haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThanOrEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThan,haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThanOrEquals,haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalAnd,haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalOr];
var haxe_ui_util_SimpleExpressionEvaluator = function() { };
$hxClasses["haxe.ui.util.SimpleExpressionEvaluator"] = haxe_ui_util_SimpleExpressionEvaluator;
haxe_ui_util_SimpleExpressionEvaluator.__name__ = "haxe.ui.util.SimpleExpressionEvaluator";
haxe_ui_util_SimpleExpressionEvaluator.evalCondition = function(condition) {
	return haxe_ui_util_SimpleExpressionEvaluator.eval(condition,{ Backend : haxe_ui_Backend, backend : haxe_ui_Backend.get_id(), defined : haxe_ui_util_SimpleExpressionEvaluator.defined});
};
haxe_ui_util_SimpleExpressionEvaluator.defined = function(key) {
	var this1 = haxe_ui_util_Defines.getAll();
	return Object.prototype.hasOwnProperty.call(this1.h,key);
};
haxe_ui_util_SimpleExpressionEvaluator.eval = function(s,context) {
	var r = null;
	if(s.indexOf("||") != -1) {
		var parts = s.split("||");
		var _g = 0;
		while(_g < parts.length) {
			var p = parts[_g];
			++_g;
			if(r == null) {
				r = haxe_ui_util_SimpleExpressionEvaluator.evalSingle(StringTools.trim(p),context);
			} else {
				r = r || haxe_ui_util_SimpleExpressionEvaluator.evalSingle(StringTools.trim(p),context);
			}
		}
	} else if(s.indexOf("&&") != -1) {
		var parts = s.split("&&");
		var _g = 0;
		while(_g < parts.length) {
			var p = parts[_g];
			++_g;
			if(r == null) {
				r = haxe_ui_util_SimpleExpressionEvaluator.evalSingle(StringTools.trim(p),context);
			} else {
				r = r && haxe_ui_util_SimpleExpressionEvaluator.evalSingle(StringTools.trim(p),context);
			}
		}
	} else {
		r = haxe_ui_util_SimpleExpressionEvaluator.evalSingle(s,context);
	}
	return r;
};
haxe_ui_util_SimpleExpressionEvaluator.evalSingle = function(s,context) {
	var result = null;
	var operation = null;
	var token = "";
	var inString = false;
	var _g = 0;
	var _g1 = s.length;
	while(_g < _g1) {
		var i = _g++;
		var ch = s.charAt(i);
		var next = s.charAt(i + 1);
		if(ch == "'" || ch == "\"") {
			inString = !inString;
		}
		if(inString == false) {
			if(ch == "+") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Add;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "-") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Subtract;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "*") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Multiply;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "/") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Divide;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == ">" && next != "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThan;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "<" && next != "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThan;
				s = HxOverrides.substr(s,i + 1,null);
				break;
			} else if(ch == "=" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.Equals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "!" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.NotEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == ">" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.GreaterThanOrEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "<" && next == "=") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LessThanOrEquals;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "&" && next == "&") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalAnd;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			} else if(ch == "|" && next == "|") {
				operation = haxe_ui_util_SimpleExpressionEvaluatorOperation.LogicalOr;
				s = HxOverrides.substr(s,i + 2,null);
				break;
			}
		}
		token += ch;
		if(i == s.length - 1) {
			s = "";
			break;
		}
	}
	var r = null;
	if(s.length > 0) {
		r = haxe_ui_util_SimpleExpressionEvaluator.evalSingle(s,context);
	}
	var trimmedToken = StringTools.trim(token);
	var v = parseFloat(trimmedToken);
	if(!isNaN(v) && isFinite(v)) {
		result = parseFloat(trimmedToken);
	} else {
		var value = trimmedToken;
		value = value.toLowerCase();
		if(value == "true" || value == "false") {
			result = trimmedToken.toLowerCase() == "true";
		} else if(StringTools.startsWith(trimmedToken,"'") && StringTools.endsWith(trimmedToken,"'") ? true : StringTools.startsWith(trimmedToken,"\"") && StringTools.endsWith(trimmedToken,"\"")) {
			result = HxOverrides.substr(trimmedToken,1,trimmedToken.length - 2);
		} else {
			var token = "";
			var bracketsOpen = 0;
			var call = null;
			var callParams = null;
			var _g = 0;
			var _g1 = trimmedToken.length;
			while(_g < _g1) {
				var i = _g++;
				var ch = trimmedToken.charAt(i);
				if(ch == "(") {
					++bracketsOpen;
					if(bracketsOpen == 1) {
						call = token;
						token = "";
					} else {
						token += ch;
					}
				} else if(ch == ")") {
					--bracketsOpen;
					if(bracketsOpen == 0) {
						callParams = token;
					} else {
						token += ")";
					}
				} else {
					token += ch;
				}
			}
			var prop = null;
			if(call == null) {
				prop = token;
			}
			var parsedCallParams = [];
			if(callParams != null) {
				bracketsOpen = 0;
				token = "";
				var _g = 0;
				var _g1 = callParams.length;
				while(_g < _g1) {
					var i = _g++;
					var ch = callParams.charAt(i);
					if(ch == "(") {
						++bracketsOpen;
					} else if(ch == ")") {
						--bracketsOpen;
					}
					if(ch == ",") {
						if(bracketsOpen == 0) {
							parsedCallParams.push(token);
							token = "";
						} else {
							token += ch;
						}
					} else {
						token += ch;
					}
				}
				if(token.length != 0) {
					parsedCallParams.push(token);
				}
			}
			if(call != null) {
				var trimmedCall = StringTools.trim(call);
				if(trimmedCall.length > 0) {
					var callParts = trimmedCall.split(".");
					var ref = context;
					var prevRef = null;
					var _g = 0;
					while(_g < callParts.length) {
						var callPart = callParts[_g];
						++_g;
						prevRef = ref;
						if(Object.prototype.hasOwnProperty.call(ref,callPart)) {
							ref = Reflect.field(ref,callPart);
						} else {
							ref = Reflect.getProperty(ref,callPart);
						}
						if(ref == null) {
							throw haxe_Exception.thrown(callPart + " not found");
						}
					}
					if(ref != null && Reflect.isFunction(ref)) {
						var paramValues = [];
						var _g = 0;
						while(_g < parsedCallParams.length) {
							var param = parsedCallParams[_g];
							++_g;
							var paramResult = haxe_ui_util_SimpleExpressionEvaluator.evalSingle(param,context);
							paramValues.push(paramResult);
						}
						result = ref.apply(prevRef,paramValues);
					}
				}
			} else if(prop != null) {
				var trimmedProp = StringTools.trim(prop);
				if(trimmedProp.length > 0) {
					var propParts = trimmedProp.split(".");
					var propName = propParts.pop();
					var ref = context;
					var _g = 0;
					while(_g < propParts.length) {
						var propPart = propParts[_g];
						++_g;
						ref = Reflect.field(ref,propPart);
					}
					if(Object.prototype.hasOwnProperty.call(ref,propName)) {
						result = Reflect.field(ref,propName);
					} else {
						result = Reflect.getProperty(ref,propName);
					}
				}
			}
		}
	}
	if(r != null) {
		switch(operation._hx_index) {
		case 0:
			result += r;
			break;
		case 1:
			result -= r;
			break;
		case 2:
			result *= r;
			break;
		case 3:
			result /= r;
			break;
		case 4:
			result = result == r;
			break;
		case 5:
			result = result != r;
			break;
		case 6:
			result = result > r;
			break;
		case 7:
			result = result >= r;
			break;
		case 8:
			result = result < r;
			break;
		case 9:
			result = result <= r;
			break;
		case 10:
			result = result && r;
			break;
		case 11:
			result = result || r;
			break;
		}
	}
	return result;
};
haxe_ui_util_SimpleExpressionEvaluator.isNum = function(value) {
	var v = parseFloat(value);
	if(!isNaN(v)) {
		return isFinite(v);
	} else {
		return false;
	}
};
haxe_ui_util_SimpleExpressionEvaluator.isString = function(value) {
	if(StringTools.startsWith(value,"'") && StringTools.endsWith(value,"'")) {
		return true;
	}
	if(StringTools.startsWith(value,"\"") && StringTools.endsWith(value,"\"")) {
		return true;
	}
	return false;
};
haxe_ui_util_SimpleExpressionEvaluator.isBool = function(value) {
	value = value.toLowerCase();
	if(value != "true") {
		return value == "false";
	} else {
		return true;
	}
};
var haxe_ui_util_StringUtil = function() { };
$hxClasses["haxe.ui.util.StringUtil"] = haxe_ui_util_StringUtil;
haxe_ui_util_StringUtil.__name__ = "haxe.ui.util.StringUtil";
haxe_ui_util_StringUtil.uncapitalizeFirstLetter = function(s) {
	s = HxOverrides.substr(s,0,1).toLowerCase() + HxOverrides.substr(s,1,s.length);
	return s;
};
haxe_ui_util_StringUtil.capitalizeFirstLetter = function(s) {
	s = HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,s.length);
	return s;
};
haxe_ui_util_StringUtil.capitalizeHyphens = function(s) {
	return haxe_ui_util_StringUtil.capitalizeDelim(s,"-");
};
haxe_ui_util_StringUtil.capitalizeDelim = function(s,d) {
	var r = s;
	var n = r.indexOf(d);
	while(n != -1) {
		var before = HxOverrides.substr(r,0,n);
		var after = HxOverrides.substr(r,n + 1,r.length);
		r = before + haxe_ui_util_StringUtil.capitalizeFirstLetter(after);
		n = r.indexOf(d,n + 1);
	}
	return r;
};
haxe_ui_util_StringUtil.toDashes = function(s,toLower) {
	if(toLower == null) {
		toLower = true;
	}
	var s1 = new EReg("([a-zA-Z])(?=[A-Z])","g").map(s,function(re) {
		return "" + re.matched(1) + "-";
	});
	if(toLower == true) {
		s1 = s1.toLowerCase();
	}
	return s1;
};
haxe_ui_util_StringUtil.replaceVars = function(s,params) {
	if(params != null) {
		var h = params.h;
		var k_h = h;
		var k_keys = Object.keys(h);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			s = StringTools.replace(s,"${" + k + "}",params.h[k]);
		}
	}
	return s;
};
haxe_ui_util_StringUtil.rpad = function(s,count,c) {
	if(c == null) {
		c = " ";
	}
	var _g = 0;
	var _g1 = count;
	while(_g < _g1) {
		var i = _g++;
		s += c;
	}
	return s;
};
haxe_ui_util_StringUtil.padDecimal = function(v,precision) {
	var s = v == null ? "null" : "" + v;
	if(precision == null || precision <= 0) {
		return s;
	}
	var n = s.indexOf(".");
	if(n == -1) {
		n = s.length;
		s += ".";
	}
	var delta = precision - (s.length - n - 1);
	return haxe_ui_util_StringUtil.rpad(s,delta,"0");
};
haxe_ui_util_StringUtil.countTokens = function(s,token) {
	if(s == null || s == "") {
		return 0;
	}
	return s.split(token).length - 1;
};
var haxe_ui_util_StyleUtil = function() { };
$hxClasses["haxe.ui.util.StyleUtil"] = haxe_ui_util_StyleUtil;
haxe_ui_util_StyleUtil.__name__ = "haxe.ui.util.StyleUtil";
haxe_ui_util_StyleUtil.styleProperty2ComponentProperty = function(property) {
	return haxe_ui_util_StyleUtil.style2ComponentEReg.map(property,function(re) {
		return re.matched(1).toUpperCase();
	});
};
haxe_ui_util_StyleUtil.componentProperty2StyleProperty = function(property) {
	return haxe_ui_util_StyleUtil.component2StyleEReg.map(property,function(re) {
		return "-" + re.matched(1).toLowerCase();
	});
};
var haxe_ui_util_Timer = function(delay,callback) {
	haxe_ui_backend_TimerImpl.call(this,delay,callback);
};
$hxClasses["haxe.ui.util.Timer"] = haxe_ui_util_Timer;
haxe_ui_util_Timer.__name__ = "haxe.ui.util.Timer";
haxe_ui_util_Timer.delay = function(f,timeMs) {
	var t = null;
	t = new haxe_ui_util_Timer(timeMs,function() {
		t.stop();
		f();
	});
	return t;
};
haxe_ui_util_Timer.__super__ = haxe_ui_backend_TimerImpl;
haxe_ui_util_Timer.prototype = $extend(haxe_ui_backend_TimerImpl.prototype,{
	stop: function() {
		haxe_ui_backend_TimerImpl.prototype.stop.call(this);
	}
	,__class__: haxe_ui_util_Timer
});
var haxe_ui_util_TypeConverter = function() { };
$hxClasses["haxe.ui.util.TypeConverter"] = haxe_ui_util_TypeConverter;
haxe_ui_util_TypeConverter.__name__ = "haxe.ui.util.TypeConverter";
haxe_ui_util_TypeConverter.convertFrom = function(input) {
	var output = input;
	var _g = Type.typeof(input);
	if(_g._hx_index == 6) {
		if(_g.c == String) {
			var s = Std.string(input);
			if(s == "true" || s == "false") {
				output = s == "true";
			} else if(new EReg("^-?[0-9]*$","i").match(s == null ? "null" : "" + s)) {
				output = Std.parseInt(s);
			} else if(new EReg("^-?[0-9]*\\.[0-9]*$","i").match(s == null ? "null" : "" + s)) {
				output = parseFloat(s);
			}
		}
	}
	return output;
};
haxe_ui_util_TypeConverter.convertTo = function(input,type) {
	if(type == null) {
		return input;
	}
	switch(type.toLowerCase()) {
	case "bool":
		return Std.string(input) == "true";
	case "float":
		if(input == null) {
			return 0;
		}
		var r = parseFloat(Std.string(input));
		if(isNaN(r)) {
			return 0;
		}
		return r;
	case "int":
		if(input == null) {
			return 0;
		}
		var r = Std.parseInt(Std.string(input));
		if(r == null) {
			return 0;
		}
		return r;
	case "dynamic":case "scalemode":case "selectionmode":case "variant":
		return input;
	case "string":
		return Std.string(input);
	default:
	}
	return input;
};
var haxe_ui_util_VariantType = $hxEnums["haxe.ui.util.VariantType"] = { __ename__:true,__constructs__:null
	,VT_Int: ($_=function(s) { return {_hx_index:0,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Int",$_.__params__ = ["s"],$_)
	,VT_Float: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Float",$_.__params__ = ["s"],$_)
	,VT_String: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_String",$_.__params__ = ["s"],$_)
	,VT_Bool: ($_=function(s) { return {_hx_index:3,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Bool",$_.__params__ = ["s"],$_)
	,VT_Array: ($_=function(s) { return {_hx_index:4,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Array",$_.__params__ = ["s"],$_)
	,VT_DataSource: ($_=function(s) { return {_hx_index:5,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_DataSource",$_.__params__ = ["s"],$_)
	,VT_Component: ($_=function(s) { return {_hx_index:6,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Component",$_.__params__ = ["s"],$_)
	,VT_Date: ($_=function(s) { return {_hx_index:7,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_Date",$_.__params__ = ["s"],$_)
	,VT_ImageData: ($_=function(s) { return {_hx_index:8,s:s,__enum__:"haxe.ui.util.VariantType",toString:$estr}; },$_._hx_name="VT_ImageData",$_.__params__ = ["s"],$_)
};
haxe_ui_util_VariantType.__constructs__ = [haxe_ui_util_VariantType.VT_Int,haxe_ui_util_VariantType.VT_Float,haxe_ui_util_VariantType.VT_String,haxe_ui_util_VariantType.VT_Bool,haxe_ui_util_VariantType.VT_Array,haxe_ui_util_VariantType.VT_DataSource,haxe_ui_util_VariantType.VT_Component,haxe_ui_util_VariantType.VT_Date,haxe_ui_util_VariantType.VT_ImageData];
var haxe_ui_util_Variant = {};
haxe_ui_util_Variant.__properties__ = {get_isNull:"get_isNull",get_isDataSource:"get_isDataSource",get_isImageData:"get_isImageData",get_isComponent:"get_isComponent",get_isDate:"get_isDate",get_isArray:"get_isArray",get_isBool:"get_isBool",get_isNumber:"get_isNumber",get_isInt:"get_isInt",get_isFloat:"get_isFloat",get_isString:"get_isString"};
haxe_ui_util_Variant.fromString = function(s) {
	return haxe_ui_util_VariantType.VT_String(s);
};
haxe_ui_util_Variant.toString = function(this1) {
	if(this1 == null) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 1:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 2:
		var s = this1.s;
		return s;
	case 3:
		var s = this1.s;
		if(s == null) {
			return "null";
		} else {
			return "" + s;
		}
		break;
	case 4:
		var s = this1.s;
		return Std.string(s);
	case 5:
		var s = this1.s;
		if(s == null) {
			return null;
		} else {
			return "";
		}
		break;
	case 6:
		var s = this1.s;
		if(s == null) {
			return null;
		} else {
			return "";
		}
		break;
	case 7:
		var s = this1.s;
		return Std.string(s);
	case 8:
		var s = this1.s;
		if(s == null) {
			return null;
		} else {
			return "";
		}
		break;
	}
};
haxe_ui_util_Variant.get_isString = function(this1) {
	if(this1._hx_index == 2) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.fromFloat = function(s) {
	return haxe_ui_util_VariantType.VT_Float(s);
};
haxe_ui_util_Variant.toFloat = function(this1) {
	if(haxe_ui_util_Variant.get_isNull(this1)) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isFloat = function(this1) {
	if(this1._hx_index == 1) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.fromInt = function(s) {
	return haxe_ui_util_VariantType.VT_Int(s);
};
haxe_ui_util_Variant.toInt = function(this1) {
	if(haxe_ui_util_Variant.get_isNull(this1)) {
		return null;
	}
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s | 0;
	default:
		throw haxe_Exception.thrown("Variant Type Error " + Std.string(this1));
	}
};
haxe_ui_util_Variant.get_isInt = function(this1) {
	if(this1._hx_index == 0) {
		var _g = this1.s;
		return true;
	} else {
		return false;
	}
};
haxe_ui_util_Variant.get_isNumber = function(this1) {
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		return true;
	case 1:
		var _g = this1.s;
		return true;
	default:
		return false;
	}
};
haxe_ui_util_Variant.toNumber = function(this1) {
	switch(this1._hx_index) {
	case 0:
		var s = this1.s;
		return s;
	case 1:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.fromBool = function(s) {
	return haxe_ui_util_VariantType.VT_Bool(s);
};
haxe_ui_util_Variant.toBool = function(this1) {
	if(this1 == null) {
		return false;
	}
	switch(this1._hx_index) {
	case 2:
		var s = this1.s;
		return s == "true";
	case 3:
		var s = this1.s;
		return s;
	default:
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isBool = function(this1) {
	if(this1._hx_index == 3) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromArray = function(s) {
	if(s == null) {
		return null;
	} else {
		return haxe_ui_util_VariantType.VT_Array(s);
	}
};
haxe_ui_util_Variant.toArray = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 4) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isArray = function(this1) {
	if(this1._hx_index == 4) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromDate = function(s) {
	return haxe_ui_util_VariantType.VT_Date(s);
};
haxe_ui_util_Variant.toDate = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 7) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isDate = function(this1) {
	if(this1._hx_index == 7) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromComponent = function(s) {
	return haxe_ui_util_VariantType.VT_Component(s);
};
haxe_ui_util_Variant.toComponent = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 6) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isComponent = function(this1) {
	if(this1._hx_index == 6) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromImageData = function(s) {
	return haxe_ui_util_VariantType.VT_ImageData(s);
};
haxe_ui_util_Variant.toImageData = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 8) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isImageData = function(this1) {
	if(this1._hx_index == 8) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.fromDataSource = function(s) {
	return haxe_ui_util_VariantType.VT_DataSource(s);
};
haxe_ui_util_Variant.toDataSource = function(this1) {
	if(this1 == null) {
		return null;
	}
	if(this1._hx_index == 5) {
		var s = this1.s;
		return s;
	} else {
		throw haxe_Exception.thrown("Variant Type Error");
	}
};
haxe_ui_util_Variant.get_isDataSource = function(this1) {
	if(this1._hx_index == 5) {
		var _g = this1.s;
		return true;
	}
	return false;
};
haxe_ui_util_Variant.addFloat = function(lhs,rhs) {
	return lhs + haxe_ui_util_Variant.toNumber(rhs);
};
haxe_ui_util_Variant.addInt = function(lhs,rhs) {
	return lhs + haxe_ui_util_Variant.toInt(rhs);
};
haxe_ui_util_Variant.subtractFloat = function(lhs,rhs) {
	return lhs - haxe_ui_util_Variant.toNumber(rhs);
};
haxe_ui_util_Variant.subtractInt = function(lhs,rhs) {
	return lhs - haxe_ui_util_Variant.toInt(rhs);
};
haxe_ui_util_Variant.add = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) + haxe_ui_util_Variant.toNumber(rhs));
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.fromString(haxe_ui_util_Variant.toString(this1) + haxe_ui_util_Variant.toString(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.postInc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		var old = this1;
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) + 1);
		return old;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.preInc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) + 1);
		return this1;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.subtract = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) - haxe_ui_util_Variant.toNumber(rhs));
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.fromString(StringTools.replace(haxe_ui_util_Variant.toString(this1),haxe_ui_util_Variant.toString(rhs),""));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.postDeinc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		var old = this1;
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) - 1);
		return old;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.preDeinc = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		this1 = haxe_ui_util_VariantType.VT_Float(haxe_ui_util_Variant.toNumber(this1) - 1);
		return this1;
	} else {
		throw haxe_Exception.thrown("Variant operation error");
	}
};
haxe_ui_util_Variant.multiply = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) * haxe_ui_util_Variant.toNumber(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.divide = function(this1,rhs) {
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(haxe_ui_util_Variant.toNumber(this1) / haxe_ui_util_Variant.toNumber(rhs));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.gt = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) > haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) > haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.gte = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) >= haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) >= haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.lt = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) < haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) < haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.lte = function(this1,rhs) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) <= haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1)) {
		return haxe_ui_util_Variant.toString(this1) <= haxe_ui_util_Variant.toString(rhs);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.negate = function(this1) {
	var tmp;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp = true;
		break;
	case 1:
		var _g = this1.s;
		tmp = true;
		break;
	default:
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.fromFloat(-haxe_ui_util_Variant.toNumber(this1));
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.invert = function(this1) {
	if(haxe_ui_util_Variant.get_isBool(this1)) {
		var v = haxe_ui_util_Variant.toBool(this1);
		v = !v;
		return haxe_ui_util_Variant.fromBool(v);
	}
	throw haxe_Exception.thrown("Variant operation error");
};
haxe_ui_util_Variant.eq = function(this1,rhs) {
	if(haxe_ui_util_Variant.get_isNull(this1) && haxe_ui_util_Variant.get_isNull(rhs)) {
		return true;
	}
	if(haxe_ui_util_Variant.get_isNull(this1) && !haxe_ui_util_Variant.get_isNull(rhs)) {
		return false;
	}
	if(!haxe_ui_util_Variant.get_isNull(this1) && haxe_ui_util_Variant.get_isNull(rhs)) {
		return false;
	}
	var tmp;
	var tmp1;
	switch(this1._hx_index) {
	case 0:
		var _g = this1.s;
		tmp1 = true;
		break;
	case 1:
		var _g = this1.s;
		tmp1 = true;
		break;
	default:
		tmp1 = false;
	}
	if(tmp1) {
		switch(rhs._hx_index) {
		case 0:
			var _g = rhs.s;
			tmp = true;
			break;
		case 1:
			var _g = rhs.s;
			tmp = true;
			break;
		default:
			tmp = false;
		}
	} else {
		tmp = false;
	}
	if(tmp) {
		return haxe_ui_util_Variant.toNumber(this1) == haxe_ui_util_Variant.toNumber(rhs);
	} else if(haxe_ui_util_Variant.get_isBool(this1) && haxe_ui_util_Variant.get_isBool(rhs)) {
		return haxe_ui_util_Variant.toBool(this1) == haxe_ui_util_Variant.toBool(rhs);
	} else if(haxe_ui_util_Variant.get_isString(this1) && haxe_ui_util_Variant.get_isString(rhs)) {
		return haxe_ui_util_Variant.toString(this1) == haxe_ui_util_Variant.toString(rhs);
	}
	return false;
};
haxe_ui_util_Variant.neq = function(this1,rhs) {
	return !haxe_ui_util_Variant.eq(this1,rhs);
};
haxe_ui_util_Variant.get_isNull = function(this1) {
	if(this1 == null) {
		return true;
	}
	return haxe_ui_util_Variant.toString(this1) == null;
};
haxe_ui_util_Variant.fromDynamic = function(r) {
	var v = null;
	if(r != null) {
		var unstringable = ((r) instanceof haxe_ui_core_Component) || ((r) instanceof HTMLImageElement) || ((r) instanceof Array) || ((r) instanceof haxe_ui_data_DataSource);
		if(unstringable == false) {
			var tmp;
			if(haxe_ui_util_Variant.containsOnlyDigits(r)) {
				var f = parseFloat(("" + Std.string(r)));
				tmp = isNaN(f) == false;
			} else {
				tmp = false;
			}
			if(tmp) {
				if(Std.string(r).indexOf(".") != -1) {
					v = haxe_ui_util_Variant.fromFloat(parseFloat(("" + Std.string(r))));
				} else {
					v = haxe_ui_util_Variant.fromInt(Std.parseInt("" + Std.string(r)));
				}
			} else if("" + Std.string(r) == "true" || Std.string(r) + "" == "false") {
				v = haxe_ui_util_Variant.fromBool("" + Std.string(r) == "true");
			} else if(typeof(r) == "string") {
				v = haxe_ui_util_Variant.fromString(js_Boot.__cast(r , String));
			} else {
				v = r;
			}
		} else if(((r) instanceof haxe_ui_core_Component)) {
			v = haxe_ui_util_Variant.fromComponent(js_Boot.__cast(r , haxe_ui_core_Component));
		} else if(((r) instanceof haxe_ui_data_DataSource)) {
			v = r;
		} else if(((r) instanceof Array)) {
			v = r;
		} else if(((r) instanceof Date)) {
			v = haxe_ui_util_Variant.fromDate(js_Boot.__cast(r , Date));
		} else if(((r) instanceof HTMLImageElement)) {
			v = haxe_ui_util_Variant.fromImageData(js_Boot.__cast(r , HTMLImageElement));
		} else {
			v = r;
		}
	}
	return v;
};
haxe_ui_util_Variant.containsOnlyDigits = function(s) {
	if(((s) instanceof haxe_ui_core_Component) || ((s) instanceof HTMLImageElement) || ((s) instanceof Array) || ((s) instanceof haxe_ui_data_DataSource)) {
		return false;
	}
	if(typeof(s) == "number" && ((s | 0) === s) || typeof(s) == "number") {
		return true;
	}
	var t = Std.string(s);
	var _g = 0;
	var _g1 = t.length;
	while(_g < _g1) {
		var i = _g++;
		var c = t.charAt(i);
		if(c != "0" && c != "1" && c != "2" && c != "3" && c != "4" && c != "5" && c != "6" && c != "7" && c != "8" && c != "9" && c != "." && c != "-") {
			return false;
		}
	}
	return true;
};
haxe_ui_util_Variant.toDynamic = function(v) {
	var d = v;
	if(v != null) {
		switch(v._hx_index) {
		case 0:
			var y = v.s;
			d = y;
			break;
		case 1:
			var y = v.s;
			d = y;
			break;
		case 2:
			var y = v.s;
			d = y;
			break;
		case 3:
			var y = v.s;
			d = y;
			break;
		case 4:
			var y = v.s;
			d = y;
			break;
		case 5:
			var y = v.s;
			d = y;
			break;
		case 6:
			var y = v.s;
			d = y;
			break;
		case 7:
			var y = v.s;
			d = y;
			break;
		case 8:
			var y = v.s;
			d = y;
			break;
		}
	}
	return d;
};
var haxe_ui_validation_ValidationManager = function() {
	this._displayQueue = [];
	this._queue = [];
	this.isValidating = false;
	this.isPending = false;
};
$hxClasses["haxe.ui.validation.ValidationManager"] = haxe_ui_validation_ValidationManager;
haxe_ui_validation_ValidationManager.__name__ = "haxe.ui.validation.ValidationManager";
haxe_ui_validation_ValidationManager.__properties__ = {get_instance:"get_instance"};
haxe_ui_validation_ValidationManager.get_instance = function() {
	if(haxe_ui_validation_ValidationManager.instance == null) {
		haxe_ui_validation_ValidationManager.instance = new haxe_ui_validation_ValidationManager();
	}
	return haxe_ui_validation_ValidationManager.instance;
};
haxe_ui_validation_ValidationManager.prototype = {
	isValidating: null
	,isPending: null
	,_queue: null
	,_displayQueue: null
	,_events: null
	,registerEvent: function(type,listener) {
		if(this._events == null) {
			this._events = new haxe_ui_util_EventMap();
		}
		this._events.add(type,listener);
	}
	,unregisterEvent: function(type,listener) {
		if(this._events == null) {
			this._events.remove(type,listener);
		}
	}
	,dispatch: function(event) {
		if(this._events != null) {
			this._events.invoke(event.type,event);
		}
	}
	,dispose: function() {
		this.isValidating = false;
		this._queue.splice(0,this._queue.length);
	}
	,add: function(object) {
		if(this._queue.indexOf(object) != -1) {
			return;
		}
		var queueLength = this._queue.length;
		if(this.isValidating == true) {
			var depth = object.get_depth();
			var min = 0;
			var max = queueLength;
			var i = 0;
			var otherDepth = 0;
			while(max > min) {
				i = min + max >>> 1;
				otherDepth = this._queue[i].get_depth();
				if(otherDepth == depth) {
					break;
				} else if(otherDepth < depth) {
					max = i;
				} else {
					min = i + 1;
				}
			}
			if(otherDepth >= depth) {
				++i;
			}
			this._queue.splice(i,0,object);
		} else {
			this._queue[queueLength] = object;
			if(this.isPending == false) {
				this.isPending = true;
				haxe_ui_Toolkit.callLater($bind(this,this.process));
			}
		}
	}
	,addDisplay: function(item,nextFrame) {
		if(nextFrame == null) {
			nextFrame = true;
		}
		if(this._displayQueue.indexOf(item) == -1) {
			this._displayQueue.push(item);
		}
		if(nextFrame == false) {
			this.process();
		}
	}
	,process: function() {
		if(this.isValidating == true || this.isPending == false) {
			return;
		}
		var queueLength = this._queue.length;
		if(queueLength == 0) {
			this.isPending = false;
			return;
		}
		this.isValidating = true;
		if(queueLength > 1) {
			this._queue.sort($bind(this,this.queueSortFunction));
		}
		this.dispatch(new haxe_ui_events_ValidationEvent("validationstart"));
		while(this._queue.length > 0) {
			var item = this._queue.shift();
			if(item.get_depth() < 0) {
				continue;
			}
			item.validateComponent();
		}
		var _g = 0;
		var _g1 = this._displayQueue.length;
		while(_g < _g1) {
			var i = _g++;
			var item = this._displayQueue[i];
			item.updateComponentDisplay();
		}
		this._displayQueue.splice(0,this._displayQueue.length);
		this.isValidating = false;
		this.isPending = false;
		this.dispatch(new haxe_ui_events_ValidationEvent("validationstop"));
	}
	,queueSortFunction: function(first,second) {
		var difference = second.get_depth() - first.get_depth();
		if(difference > 0) {
			return 1;
		} else if(difference < 0) {
			return -1;
		} else {
			return 0;
		}
	}
	,__class__: haxe_ui_validation_ValidationManager
};
var hscript_Const = $hxEnums["hscript.Const"] = { __ename__:true,__constructs__:null
	,CInt: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CInt",$_.__params__ = ["v"],$_)
	,CFloat: ($_=function(f) { return {_hx_index:1,f:f,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CFloat",$_.__params__ = ["f"],$_)
	,CString: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"hscript.Const",toString:$estr}; },$_._hx_name="CString",$_.__params__ = ["s"],$_)
};
hscript_Const.__constructs__ = [hscript_Const.CInt,hscript_Const.CFloat,hscript_Const.CString];
var hscript_Expr = $hxEnums["hscript.Expr"] = { __ename__:true,__constructs__:null
	,EConst: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EConst",$_.__params__ = ["c"],$_)
	,EIdent: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EIdent",$_.__params__ = ["v"],$_)
	,EVar: ($_=function(n,t,e) { return {_hx_index:2,n:n,t:t,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EVar",$_.__params__ = ["n","t","e"],$_)
	,EParent: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EParent",$_.__params__ = ["e"],$_)
	,EBlock: ($_=function(e) { return {_hx_index:4,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EBlock",$_.__params__ = ["e"],$_)
	,EField: ($_=function(e,f) { return {_hx_index:5,e:e,f:f,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EField",$_.__params__ = ["e","f"],$_)
	,EBinop: ($_=function(op,e1,e2) { return {_hx_index:6,op:op,e1:e1,e2:e2,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EBinop",$_.__params__ = ["op","e1","e2"],$_)
	,EUnop: ($_=function(op,prefix,e) { return {_hx_index:7,op:op,prefix:prefix,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EUnop",$_.__params__ = ["op","prefix","e"],$_)
	,ECall: ($_=function(e,params) { return {_hx_index:8,e:e,params:params,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ECall",$_.__params__ = ["e","params"],$_)
	,EIf: ($_=function(cond,e1,e2) { return {_hx_index:9,cond:cond,e1:e1,e2:e2,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EIf",$_.__params__ = ["cond","e1","e2"],$_)
	,EWhile: ($_=function(cond,e) { return {_hx_index:10,cond:cond,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EWhile",$_.__params__ = ["cond","e"],$_)
	,EFor: ($_=function(v,it,e) { return {_hx_index:11,v:v,it:it,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EFor",$_.__params__ = ["v","it","e"],$_)
	,EBreak: {_hx_name:"EBreak",_hx_index:12,__enum__:"hscript.Expr",toString:$estr}
	,EContinue: {_hx_name:"EContinue",_hx_index:13,__enum__:"hscript.Expr",toString:$estr}
	,EFunction: ($_=function(args,e,name,ret) { return {_hx_index:14,args:args,e:e,name:name,ret:ret,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EFunction",$_.__params__ = ["args","e","name","ret"],$_)
	,EReturn: ($_=function(e) { return {_hx_index:15,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EReturn",$_.__params__ = ["e"],$_)
	,EArray: ($_=function(e,index) { return {_hx_index:16,e:e,index:index,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EArray",$_.__params__ = ["e","index"],$_)
	,EArrayDecl: ($_=function(e) { return {_hx_index:17,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EArrayDecl",$_.__params__ = ["e"],$_)
	,ENew: ($_=function(cl,params) { return {_hx_index:18,cl:cl,params:params,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ENew",$_.__params__ = ["cl","params"],$_)
	,EThrow: ($_=function(e) { return {_hx_index:19,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EThrow",$_.__params__ = ["e"],$_)
	,ETry: ($_=function(e,v,t,ecatch) { return {_hx_index:20,e:e,v:v,t:t,ecatch:ecatch,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ETry",$_.__params__ = ["e","v","t","ecatch"],$_)
	,EObject: ($_=function(fl) { return {_hx_index:21,fl:fl,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EObject",$_.__params__ = ["fl"],$_)
	,ETernary: ($_=function(cond,e1,e2) { return {_hx_index:22,cond:cond,e1:e1,e2:e2,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ETernary",$_.__params__ = ["cond","e1","e2"],$_)
	,ESwitch: ($_=function(e,cases,defaultExpr) { return {_hx_index:23,e:e,cases:cases,defaultExpr:defaultExpr,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ESwitch",$_.__params__ = ["e","cases","defaultExpr"],$_)
	,EDoWhile: ($_=function(cond,e) { return {_hx_index:24,cond:cond,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EDoWhile",$_.__params__ = ["cond","e"],$_)
	,EMeta: ($_=function(name,args,e) { return {_hx_index:25,name:name,args:args,e:e,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="EMeta",$_.__params__ = ["name","args","e"],$_)
	,ECheckType: ($_=function(e,t) { return {_hx_index:26,e:e,t:t,__enum__:"hscript.Expr",toString:$estr}; },$_._hx_name="ECheckType",$_.__params__ = ["e","t"],$_)
};
hscript_Expr.__constructs__ = [hscript_Expr.EConst,hscript_Expr.EIdent,hscript_Expr.EVar,hscript_Expr.EParent,hscript_Expr.EBlock,hscript_Expr.EField,hscript_Expr.EBinop,hscript_Expr.EUnop,hscript_Expr.ECall,hscript_Expr.EIf,hscript_Expr.EWhile,hscript_Expr.EFor,hscript_Expr.EBreak,hscript_Expr.EContinue,hscript_Expr.EFunction,hscript_Expr.EReturn,hscript_Expr.EArray,hscript_Expr.EArrayDecl,hscript_Expr.ENew,hscript_Expr.EThrow,hscript_Expr.ETry,hscript_Expr.EObject,hscript_Expr.ETernary,hscript_Expr.ESwitch,hscript_Expr.EDoWhile,hscript_Expr.EMeta,hscript_Expr.ECheckType];
var hscript_CType = $hxEnums["hscript.CType"] = { __ename__:true,__constructs__:null
	,CTPath: ($_=function(path,params) { return {_hx_index:0,path:path,params:params,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTPath",$_.__params__ = ["path","params"],$_)
	,CTFun: ($_=function(args,ret) { return {_hx_index:1,args:args,ret:ret,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTFun",$_.__params__ = ["args","ret"],$_)
	,CTAnon: ($_=function(fields) { return {_hx_index:2,fields:fields,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTAnon",$_.__params__ = ["fields"],$_)
	,CTParent: ($_=function(t) { return {_hx_index:3,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTParent",$_.__params__ = ["t"],$_)
	,CTOpt: ($_=function(t) { return {_hx_index:4,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTOpt",$_.__params__ = ["t"],$_)
	,CTNamed: ($_=function(n,t) { return {_hx_index:5,n:n,t:t,__enum__:"hscript.CType",toString:$estr}; },$_._hx_name="CTNamed",$_.__params__ = ["n","t"],$_)
};
hscript_CType.__constructs__ = [hscript_CType.CTPath,hscript_CType.CTFun,hscript_CType.CTAnon,hscript_CType.CTParent,hscript_CType.CTOpt,hscript_CType.CTNamed];
var hscript_Error = $hxEnums["hscript.Error"] = { __ename__:true,__constructs__:null
	,EInvalidChar: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EInvalidChar",$_.__params__ = ["c"],$_)
	,EUnexpected: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EUnexpected",$_.__params__ = ["s"],$_)
	,EUnterminatedString: {_hx_name:"EUnterminatedString",_hx_index:2,__enum__:"hscript.Error",toString:$estr}
	,EUnterminatedComment: {_hx_name:"EUnterminatedComment",_hx_index:3,__enum__:"hscript.Error",toString:$estr}
	,EInvalidPreprocessor: ($_=function(msg) { return {_hx_index:4,msg:msg,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EInvalidPreprocessor",$_.__params__ = ["msg"],$_)
	,EUnknownVariable: ($_=function(v) { return {_hx_index:5,v:v,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EUnknownVariable",$_.__params__ = ["v"],$_)
	,EInvalidIterator: ($_=function(v) { return {_hx_index:6,v:v,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EInvalidIterator",$_.__params__ = ["v"],$_)
	,EInvalidOp: ($_=function(op) { return {_hx_index:7,op:op,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EInvalidOp",$_.__params__ = ["op"],$_)
	,EInvalidAccess: ($_=function(f) { return {_hx_index:8,f:f,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="EInvalidAccess",$_.__params__ = ["f"],$_)
	,ECustom: ($_=function(msg) { return {_hx_index:9,msg:msg,__enum__:"hscript.Error",toString:$estr}; },$_._hx_name="ECustom",$_.__params__ = ["msg"],$_)
};
hscript_Error.__constructs__ = [hscript_Error.EInvalidChar,hscript_Error.EUnexpected,hscript_Error.EUnterminatedString,hscript_Error.EUnterminatedComment,hscript_Error.EInvalidPreprocessor,hscript_Error.EUnknownVariable,hscript_Error.EInvalidIterator,hscript_Error.EInvalidOp,hscript_Error.EInvalidAccess,hscript_Error.ECustom];
var hscript_ModuleDecl = $hxEnums["hscript.ModuleDecl"] = { __ename__:true,__constructs__:null
	,DPackage: ($_=function(path) { return {_hx_index:0,path:path,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DPackage",$_.__params__ = ["path"],$_)
	,DImport: ($_=function(path,everything) { return {_hx_index:1,path:path,everything:everything,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DImport",$_.__params__ = ["path","everything"],$_)
	,DClass: ($_=function(c) { return {_hx_index:2,c:c,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DClass",$_.__params__ = ["c"],$_)
	,DTypedef: ($_=function(c) { return {_hx_index:3,c:c,__enum__:"hscript.ModuleDecl",toString:$estr}; },$_._hx_name="DTypedef",$_.__params__ = ["c"],$_)
};
hscript_ModuleDecl.__constructs__ = [hscript_ModuleDecl.DPackage,hscript_ModuleDecl.DImport,hscript_ModuleDecl.DClass,hscript_ModuleDecl.DTypedef];
var hscript_FieldAccess = $hxEnums["hscript.FieldAccess"] = { __ename__:true,__constructs__:null
	,APublic: {_hx_name:"APublic",_hx_index:0,__enum__:"hscript.FieldAccess",toString:$estr}
	,APrivate: {_hx_name:"APrivate",_hx_index:1,__enum__:"hscript.FieldAccess",toString:$estr}
	,AInline: {_hx_name:"AInline",_hx_index:2,__enum__:"hscript.FieldAccess",toString:$estr}
	,AOverride: {_hx_name:"AOverride",_hx_index:3,__enum__:"hscript.FieldAccess",toString:$estr}
	,AStatic: {_hx_name:"AStatic",_hx_index:4,__enum__:"hscript.FieldAccess",toString:$estr}
	,AMacro: {_hx_name:"AMacro",_hx_index:5,__enum__:"hscript.FieldAccess",toString:$estr}
};
hscript_FieldAccess.__constructs__ = [hscript_FieldAccess.APublic,hscript_FieldAccess.APrivate,hscript_FieldAccess.AInline,hscript_FieldAccess.AOverride,hscript_FieldAccess.AStatic,hscript_FieldAccess.AMacro];
var hscript_FieldKind = $hxEnums["hscript.FieldKind"] = { __ename__:true,__constructs__:null
	,KFunction: ($_=function(f) { return {_hx_index:0,f:f,__enum__:"hscript.FieldKind",toString:$estr}; },$_._hx_name="KFunction",$_.__params__ = ["f"],$_)
	,KVar: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"hscript.FieldKind",toString:$estr}; },$_._hx_name="KVar",$_.__params__ = ["v"],$_)
};
hscript_FieldKind.__constructs__ = [hscript_FieldKind.KFunction,hscript_FieldKind.KVar];
var hscript__$Interp_Stop = $hxEnums["hscript._Interp.Stop"] = { __ename__:true,__constructs__:null
	,SBreak: {_hx_name:"SBreak",_hx_index:0,__enum__:"hscript._Interp.Stop",toString:$estr}
	,SContinue: {_hx_name:"SContinue",_hx_index:1,__enum__:"hscript._Interp.Stop",toString:$estr}
	,SReturn: {_hx_name:"SReturn",_hx_index:2,__enum__:"hscript._Interp.Stop",toString:$estr}
};
hscript__$Interp_Stop.__constructs__ = [hscript__$Interp_Stop.SBreak,hscript__$Interp_Stop.SContinue,hscript__$Interp_Stop.SReturn];
var hscript_Interp = function() {
	this.locals = new haxe_ds_StringMap();
	this.declared = [];
	this.resetVariables();
	this.initOps();
};
$hxClasses["hscript.Interp"] = hscript_Interp;
hscript_Interp.__name__ = "hscript.Interp";
hscript_Interp.prototype = {
	variables: null
	,locals: null
	,binops: null
	,depth: null
	,inTry: null
	,declared: null
	,returnValue: null
	,resetVariables: function() {
		var _gthis = this;
		this.variables = new haxe_ds_StringMap();
		this.variables.h["null"] = null;
		this.variables.h["true"] = true;
		this.variables.h["false"] = false;
		var this1 = this.variables;
		var value = Reflect.makeVarArgs(function(el) {
			var inf = _gthis.posInfos();
			var v = el.shift();
			if(el.length > 0) {
				inf.customParams = el;
			}
			haxe_Log.trace(Std.string(v),inf);
		});
		this1.h["trace"] = value;
	}
	,posInfos: function() {
		return { fileName : "hscript", lineNumber : 0};
	}
	,initOps: function() {
		var me = this;
		this.binops = new haxe_ds_StringMap();
		this.binops.h["+"] = function(e1,e2) {
			return me.expr(e1) + me.expr(e2);
		};
		this.binops.h["-"] = function(e1,e2) {
			return me.expr(e1) - me.expr(e2);
		};
		this.binops.h["*"] = function(e1,e2) {
			return me.expr(e1) * me.expr(e2);
		};
		this.binops.h["/"] = function(e1,e2) {
			return me.expr(e1) / me.expr(e2);
		};
		this.binops.h["%"] = function(e1,e2) {
			return me.expr(e1) % me.expr(e2);
		};
		this.binops.h["&"] = function(e1,e2) {
			return me.expr(e1) & me.expr(e2);
		};
		this.binops.h["|"] = function(e1,e2) {
			return me.expr(e1) | me.expr(e2);
		};
		this.binops.h["^"] = function(e1,e2) {
			return me.expr(e1) ^ me.expr(e2);
		};
		this.binops.h["<<"] = function(e1,e2) {
			return me.expr(e1) << me.expr(e2);
		};
		this.binops.h[">>"] = function(e1,e2) {
			return me.expr(e1) >> me.expr(e2);
		};
		this.binops.h[">>>"] = function(e1,e2) {
			return me.expr(e1) >>> me.expr(e2);
		};
		this.binops.h["=="] = function(e1,e2) {
			return me.expr(e1) == me.expr(e2);
		};
		this.binops.h["!="] = function(e1,e2) {
			return me.expr(e1) != me.expr(e2);
		};
		this.binops.h[">="] = function(e1,e2) {
			return me.expr(e1) >= me.expr(e2);
		};
		this.binops.h["<="] = function(e1,e2) {
			return me.expr(e1) <= me.expr(e2);
		};
		this.binops.h[">"] = function(e1,e2) {
			return me.expr(e1) > me.expr(e2);
		};
		this.binops.h["<"] = function(e1,e2) {
			return me.expr(e1) < me.expr(e2);
		};
		this.binops.h["||"] = function(e1,e2) {
			if(me.expr(e1) != true) {
				return me.expr(e2) == true;
			} else {
				return true;
			}
		};
		this.binops.h["&&"] = function(e1,e2) {
			if(me.expr(e1) == true) {
				return me.expr(e2) == true;
			} else {
				return false;
			}
		};
		this.binops.h["="] = $bind(this,this.assign);
		this.binops.h["..."] = function(e1,e2) {
			return new IntIterator(me.expr(e1),me.expr(e2));
		};
		this.assignOp("+=",function(v1,v2) {
			return v1 + v2;
		});
		this.assignOp("-=",function(v1,v2) {
			return v1 - v2;
		});
		this.assignOp("*=",function(v1,v2) {
			return v1 * v2;
		});
		this.assignOp("/=",function(v1,v2) {
			return v1 / v2;
		});
		this.assignOp("%=",function(v1,v2) {
			return v1 % v2;
		});
		this.assignOp("&=",function(v1,v2) {
			return v1 & v2;
		});
		this.assignOp("|=",function(v1,v2) {
			return v1 | v2;
		});
		this.assignOp("^=",function(v1,v2) {
			return v1 ^ v2;
		});
		this.assignOp("<<=",function(v1,v2) {
			return v1 << v2;
		});
		this.assignOp(">>=",function(v1,v2) {
			return v1 >> v2;
		});
		this.assignOp(">>>=",function(v1,v2) {
			return v1 >>> v2;
		});
	}
	,setVar: function(name,v) {
		this.variables.h[name] = v;
	}
	,assign: function(e1,e2) {
		var v = this.expr(e2);
		switch(e1._hx_index) {
		case 1:
			var id = e1.v;
			var l = this.locals.h[id];
			if(l == null) {
				this.setVar(id,v);
			} else {
				l.r = v;
			}
			break;
		case 5:
			var e = e1.e;
			var f = e1.f;
			v = this.set(this.expr(e),f,v);
			break;
		case 16:
			var e = e1.e;
			var index = e1.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
			} else {
				arr[index1] = v;
			}
			break;
		default:
			var e = hscript_Error.EInvalidOp("=");
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,assignOp: function(op,fop) {
		var me = this;
		this.binops.h[op] = function(e1,e2) {
			return me.evalAssignOp(op,fop,e1,e2);
		};
	}
	,evalAssignOp: function(op,fop,e1,e2) {
		var v;
		switch(e1._hx_index) {
		case 1:
			var id = e1.v;
			var l = this.locals.h[id];
			v = fop(this.expr(e1),this.expr(e2));
			if(l == null) {
				this.setVar(id,v);
			} else {
				l.r = v;
			}
			break;
		case 5:
			var e = e1.e;
			var f = e1.f;
			var obj = this.expr(e);
			v = fop(this.get(obj,f),this.expr(e2));
			v = this.set(obj,f,v);
			break;
		case 16:
			var e = e1.e;
			var index = e1.index;
			var arr = this.expr(e);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				v = fop((js_Boot.__cast(arr , haxe_IMap)).get(index1),this.expr(e2));
				(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
			} else {
				v = fop(arr[index1],this.expr(e2));
				arr[index1] = v;
			}
			break;
		default:
			var e = hscript_Error.EInvalidOp(op);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,increment: function(e,prefix,delta) {
		switch(e._hx_index) {
		case 1:
			var id = e.v;
			var l = this.locals.h[id];
			var v = l == null ? this.resolve(id) : l.r;
			if(prefix) {
				v += delta;
				if(l == null) {
					this.setVar(id,v);
				} else {
					l.r = v;
				}
			} else if(l == null) {
				this.setVar(id,v + delta);
			} else {
				l.r = v + delta;
			}
			return v;
		case 5:
			var e1 = e.e;
			var f = e.f;
			var obj = this.expr(e1);
			var v = this.get(obj,f);
			if(prefix) {
				v += delta;
				this.set(obj,f,v);
			} else {
				this.set(obj,f,v + delta);
			}
			return v;
		case 16:
			var e1 = e.e;
			var index = e.index;
			var arr = this.expr(e1);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				var v = (js_Boot.__cast(arr , haxe_IMap)).get(index1);
				if(prefix) {
					v += delta;
					(js_Boot.__cast(arr , haxe_IMap)).set(index1,v);
				} else {
					(js_Boot.__cast(arr , haxe_IMap)).set(index1,v + delta);
				}
				return v;
			} else {
				var v = arr[index1];
				if(prefix) {
					v += delta;
					arr[index1] = v;
				} else {
					arr[index1] = v + delta;
				}
				return v;
			}
			break;
		default:
			var e = hscript_Error.EInvalidOp(delta > 0 ? "++" : "--");
			throw haxe_Exception.thrown(e);
		}
	}
	,execute: function(expr) {
		this.depth = 0;
		this.locals = new haxe_ds_StringMap();
		this.declared = [];
		return this.exprReturn(expr);
	}
	,exprReturn: function(e) {
		try {
			return this.expr(e);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
				var e = _g1;
				switch(e._hx_index) {
				case 0:
					throw haxe_Exception.thrown("Invalid break");
				case 1:
					throw haxe_Exception.thrown("Invalid continue");
				case 2:
					var v = this.returnValue;
					this.returnValue = null;
					return v;
				}
			} else {
				throw _g;
			}
		}
	}
	,duplicate: function(h) {
		var h2 = new haxe_ds_StringMap();
		var h1 = h.h;
		var k_h = h1;
		var k_keys = Object.keys(h1);
		var k_length = k_keys.length;
		var k_current = 0;
		while(k_current < k_length) {
			var k = k_keys[k_current++];
			h2.h[k] = h.h[k];
		}
		return h2;
	}
	,restore: function(old) {
		while(this.declared.length > old) {
			var d = this.declared.pop();
			this.locals.h[d.n] = d.old;
		}
	}
	,error: function(e,rethrow) {
		if(rethrow == null) {
			rethrow = false;
		}
		if(rethrow) {
			throw haxe_Exception.thrown(e);
		} else {
			throw haxe_Exception.thrown(e);
		}
	}
	,rethrow: function(e) {
		throw haxe_Exception.thrown(e);
	}
	,resolve: function(id) {
		var l = this.locals.h[id];
		if(l != null) {
			return l.r;
		}
		var v = this.variables.h[id];
		if(v == null && !Object.prototype.hasOwnProperty.call(this.variables.h,id)) {
			var e = hscript_Error.EUnknownVariable(id);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,expr: function(e) {
		var _gthis = this;
		switch(e._hx_index) {
		case 0:
			var c = e.c;
			switch(c._hx_index) {
			case 0:
				var v = c.v;
				return v;
			case 1:
				var f = c.f;
				return f;
			case 2:
				var s = c.s;
				return s;
			}
			break;
		case 1:
			var id = e.v;
			return this.resolve(id);
		case 2:
			var _g = e.t;
			var n = e.n;
			var e1 = e.e;
			this.declared.push({ n : n, old : this.locals.h[n]});
			var this1 = this.locals;
			var value = e1 == null ? null : this.expr(e1);
			this1.h[n] = { r : value};
			return null;
		case 3:
			var e1 = e.e;
			return this.expr(e1);
		case 4:
			var exprs = e.e;
			var old = this.declared.length;
			var v = null;
			var _g = 0;
			while(_g < exprs.length) {
				var e1 = exprs[_g];
				++_g;
				v = this.expr(e1);
			}
			this.restore(old);
			return v;
		case 5:
			var e1 = e.e;
			var f = e.f;
			return this.get(this.expr(e1),f);
		case 6:
			var op = e.op;
			var e1 = e.e1;
			var e2 = e.e2;
			var fop = this.binops.h[op];
			if(fop == null) {
				var e3 = hscript_Error.EInvalidOp(op);
				throw haxe_Exception.thrown(e3);
			}
			return fop(e1,e2);
		case 7:
			var op = e.op;
			var prefix = e.prefix;
			var e1 = e.e;
			switch(op) {
			case "!":
				return this.expr(e1) != true;
			case "++":
				return this.increment(e1,prefix,1);
			case "-":
				return -this.expr(e1);
			case "--":
				return this.increment(e1,prefix,-1);
			case "~":
				return ~this.expr(e1);
			default:
				var e1 = hscript_Error.EInvalidOp(op);
				throw haxe_Exception.thrown(e1);
			}
			break;
		case 8:
			var e1 = e.e;
			var params = e.params;
			var args = [];
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				args.push(this.expr(p));
			}
			if(e1._hx_index == 5) {
				var e2 = e1.e;
				var f = e1.f;
				var obj = this.expr(e2);
				if(obj == null) {
					var e2 = hscript_Error.EInvalidAccess(f);
					throw haxe_Exception.thrown(e2);
				}
				return this.fcall(obj,f,args);
			} else {
				return this.call(null,this.expr(e1),args);
			}
			break;
		case 9:
			var econd = e.cond;
			var e1 = e.e1;
			var e2 = e.e2;
			if(this.expr(econd) == true) {
				return this.expr(e1);
			} else if(e2 == null) {
				return null;
			} else {
				return this.expr(e2);
			}
			break;
		case 10:
			var econd = e.cond;
			var e1 = e.e;
			this.whileLoop(econd,e1);
			return null;
		case 11:
			var v = e.v;
			var it = e.it;
			var e1 = e.e;
			this.forLoop(v,it,e1);
			return null;
		case 12:
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SBreak);
		case 13:
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SContinue);
		case 14:
			var _g = e.ret;
			var params = e.args;
			var fexpr = e.e;
			var name = e.name;
			var capturedLocals = this.duplicate(this.locals);
			var me = this;
			var hasOpt = false;
			var minParams = 0;
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				if(p.opt) {
					hasOpt = true;
				} else {
					minParams += 1;
				}
			}
			var f = function(args) {
				if((args == null ? 0 : args.length) != params.length) {
					if(args.length < minParams) {
						var str = "Invalid number of parameters. Got " + args.length + ", required " + minParams;
						if(name != null) {
							str += " for function '" + name + "'";
						}
						var e = hscript_Error.ECustom(str);
						throw haxe_Exception.thrown(e);
					}
					var args2 = [];
					var extraParams = args.length - minParams;
					var pos = 0;
					var _g = 0;
					while(_g < params.length) {
						var p = params[_g];
						++_g;
						if(p.opt) {
							if(extraParams > 0) {
								args2.push(args[pos++]);
								--extraParams;
							} else {
								args2.push(null);
							}
						} else {
							args2.push(args[pos++]);
						}
					}
					args = args2;
				}
				var old = me.locals;
				var depth = me.depth;
				me.depth++;
				me.locals = me.duplicate(capturedLocals);
				var _g = 0;
				var _g1 = params.length;
				while(_g < _g1) {
					var i = _g++;
					me.locals.h[params[i].name] = { r : args[i]};
				}
				var r = null;
				var oldDecl = _gthis.declared.length;
				if(_gthis.inTry) {
					try {
						r = me.exprReturn(fexpr);
					} catch( _g ) {
						var e = haxe_Exception.caught(_g).unwrap();
						me.locals = old;
						me.depth = depth;
						throw haxe_Exception.thrown(e);
					}
				} else {
					r = me.exprReturn(fexpr);
				}
				_gthis.restore(oldDecl);
				me.locals = old;
				me.depth = depth;
				return r;
			};
			var f1 = Reflect.makeVarArgs(f);
			if(name != null) {
				if(this.depth == 0) {
					this.variables.h[name] = f1;
				} else {
					this.declared.push({ n : name, old : this.locals.h[name]});
					var ref = { r : f1};
					this.locals.h[name] = ref;
					capturedLocals.h[name] = ref;
				}
			}
			return f1;
		case 15:
			var e1 = e.e;
			this.returnValue = e1 == null ? null : this.expr(e1);
			throw haxe_Exception.thrown(hscript__$Interp_Stop.SReturn);
		case 16:
			var e1 = e.e;
			var index = e.index;
			var arr = this.expr(e1);
			var index1 = this.expr(index);
			if(js_Boot.__implements(arr,haxe_IMap)) {
				return (js_Boot.__cast(arr , haxe_IMap)).get(index1);
			} else {
				return arr[index1];
			}
			break;
		case 17:
			var arr = e.e;
			var tmp;
			if(arr.length > 0) {
				var _g = arr[0];
				if(_g._hx_index == 6) {
					var _g1 = _g.e1;
					var _g1 = _g.e2;
					tmp = _g.op == "=>";
				} else {
					tmp = false;
				}
			} else {
				tmp = false;
			}
			if(tmp) {
				var isAllString = true;
				var isAllInt = true;
				var isAllObject = true;
				var isAllEnum = true;
				var keys = [];
				var values = [];
				var _g = 0;
				while(_g < arr.length) {
					var e1 = arr[_g];
					++_g;
					if(e1._hx_index == 6) {
						if(e1.op == "=>") {
							var eKey = e1.e1;
							var eValue = e1.e2;
							var key = this.expr(eKey);
							var value = this.expr(eValue);
							isAllString = isAllString && typeof(key) == "string";
							isAllInt = isAllInt && (typeof(key) == "number" && ((key | 0) === key));
							isAllObject = isAllObject && Reflect.isObject(key);
							isAllEnum = isAllEnum && Reflect.isEnumValue(key);
							keys.push(key);
							values.push(value);
						} else {
							throw haxe_Exception.thrown("=> expected");
						}
					} else {
						throw haxe_Exception.thrown("=> expected");
					}
				}
				var map;
				if(isAllInt) {
					map = new haxe_ds_IntMap();
				} else if(isAllString) {
					map = new haxe_ds_StringMap();
				} else if(isAllEnum) {
					map = new haxe_ds_EnumValueMap();
				} else if(isAllObject) {
					map = new haxe_ds_ObjectMap();
				} else {
					throw haxe_Exception.thrown("Inconsistent key types");
				}
				var _g = 0;
				var _g1 = keys.length;
				while(_g < _g1) {
					var n = _g++;
					(js_Boot.__cast(map , haxe_IMap)).set(keys[n],values[n]);
				}
				return map;
			} else {
				var a = [];
				var _g = 0;
				while(_g < arr.length) {
					var e1 = arr[_g];
					++_g;
					a.push(this.expr(e1));
				}
				return a;
			}
			break;
		case 18:
			var cl = e.cl;
			var params1 = e.params;
			var a = [];
			var _g = 0;
			while(_g < params1.length) {
				var e1 = params1[_g];
				++_g;
				a.push(this.expr(e1));
			}
			return this.cnew(cl,a);
		case 19:
			var e1 = e.e;
			throw haxe_Exception.thrown(this.expr(e1));
		case 20:
			var _g = e.t;
			var e1 = e.e;
			var n = e.v;
			var ecatch = e.ecatch;
			var old = this.declared.length;
			var oldTry = this.inTry;
			try {
				this.inTry = true;
				var v = this.expr(e1);
				this.restore(old);
				this.inTry = oldTry;
				return v;
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					this.inTry = oldTry;
					throw haxe_Exception.thrown(err);
				} else {
					var err = _g1;
					this.restore(old);
					this.inTry = oldTry;
					this.declared.push({ n : n, old : this.locals.h[n]});
					this.locals.h[n] = { r : err};
					var v = this.expr(ecatch);
					this.restore(old);
					return v;
				}
			}
			break;
		case 21:
			var fl = e.fl;
			var o = { };
			var _g = 0;
			while(_g < fl.length) {
				var f = fl[_g];
				++_g;
				this.set(o,f.name,this.expr(f.e));
			}
			return o;
		case 22:
			var econd = e.cond;
			var e1 = e.e1;
			var e2 = e.e2;
			if(this.expr(econd) == true) {
				return this.expr(e1);
			} else {
				return this.expr(e2);
			}
			break;
		case 23:
			var e1 = e.e;
			var cases = e.cases;
			var def = e.defaultExpr;
			var val = this.expr(e1);
			var match = false;
			var _g = 0;
			while(_g < cases.length) {
				var c = cases[_g];
				++_g;
				var _g1 = 0;
				var _g2 = c.values;
				while(_g1 < _g2.length) {
					var v = _g2[_g1];
					++_g1;
					if(this.expr(v) == val) {
						match = true;
						break;
					}
				}
				if(match) {
					val = this.expr(c.expr);
					break;
				}
			}
			if(!match) {
				val = def == null ? null : this.expr(def);
			}
			return val;
		case 24:
			var econd = e.cond;
			var e1 = e.e;
			this.doWhileLoop(econd,e1);
			return null;
		case 25:
			var _g = e.name;
			var _g = e.args;
			var e1 = e.e;
			return this.expr(e1);
		case 26:
			var _g = e.t;
			var e1 = e.e;
			return this.expr(e1);
		}
	}
	,doWhileLoop: function(econd,e) {
		var old = this.declared.length;
		_hx_loop1: while(true) {
			try {
				this.expr(e);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					switch(err._hx_index) {
					case 0:
						break _hx_loop1;
					case 1:
						break;
					case 2:
						throw haxe_Exception.thrown(err);
					}
				} else {
					throw _g;
				}
			}
			if(!(this.expr(econd) == true)) {
				break;
			}
		}
		this.restore(old);
	}
	,whileLoop: function(econd,e) {
		var old = this.declared.length;
		_hx_loop1: while(this.expr(econd) == true) try {
			this.expr(e);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
				var err = _g1;
				switch(err._hx_index) {
				case 0:
					break _hx_loop1;
				case 1:
					break;
				case 2:
					throw haxe_Exception.thrown(err);
				}
			} else {
				throw _g;
			}
		}
		this.restore(old);
	}
	,makeIterator: function(v) {
		try {
			v = $getIterator(v);
		} catch( _g ) {
		}
		if(v.hasNext == null || v.next == null) {
			var e = hscript_Error.EInvalidIterator(v);
			throw haxe_Exception.thrown(e);
		}
		return v;
	}
	,forLoop: function(n,it,e) {
		var old = this.declared.length;
		this.declared.push({ n : n, old : this.locals.h[n]});
		var it1 = this.makeIterator(this.expr(it));
		_hx_loop1: while(it1.hasNext()) {
			var this1 = this.locals;
			var value = { r : it1.next()};
			this1.h[n] = value;
			try {
				this.expr(e);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				if(js_Boot.__instanceof(_g1,hscript__$Interp_Stop)) {
					var err = _g1;
					switch(err._hx_index) {
					case 0:
						break _hx_loop1;
					case 1:
						break;
					case 2:
						throw haxe_Exception.thrown(err);
					}
				} else {
					throw _g;
				}
			}
		}
		this.restore(old);
	}
	,isMap: function(o) {
		return js_Boot.__implements(o,haxe_IMap);
	}
	,getMapValue: function(map,key) {
		return (js_Boot.__cast(map , haxe_IMap)).get(key);
	}
	,setMapValue: function(map,key,value) {
		(js_Boot.__cast(map , haxe_IMap)).set(key,value);
	}
	,get: function(o,f) {
		if(o == null) {
			var e = hscript_Error.EInvalidAccess(f);
			throw haxe_Exception.thrown(e);
		}
		return Reflect.getProperty(o,f);
	}
	,set: function(o,f,v) {
		if(o == null) {
			var e = hscript_Error.EInvalidAccess(f);
			throw haxe_Exception.thrown(e);
		}
		Reflect.setProperty(o,f,v);
		return v;
	}
	,fcall: function(o,f,args) {
		return this.call(o,this.get(o,f),args);
	}
	,call: function(o,f,args) {
		return f.apply(o,args);
	}
	,cnew: function(cl,args) {
		var c = $hxClasses[cl];
		if(c == null) {
			c = this.resolve(cl);
		}
		return Type.createInstance(c,args);
	}
	,__class__: hscript_Interp
};
var hscript_Token = $hxEnums["hscript.Token"] = { __ename__:true,__constructs__:null
	,TEof: {_hx_name:"TEof",_hx_index:0,__enum__:"hscript.Token",toString:$estr}
	,TConst: ($_=function(c) { return {_hx_index:1,c:c,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TConst",$_.__params__ = ["c"],$_)
	,TId: ($_=function(s) { return {_hx_index:2,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TId",$_.__params__ = ["s"],$_)
	,TOp: ($_=function(s) { return {_hx_index:3,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TOp",$_.__params__ = ["s"],$_)
	,TPOpen: {_hx_name:"TPOpen",_hx_index:4,__enum__:"hscript.Token",toString:$estr}
	,TPClose: {_hx_name:"TPClose",_hx_index:5,__enum__:"hscript.Token",toString:$estr}
	,TBrOpen: {_hx_name:"TBrOpen",_hx_index:6,__enum__:"hscript.Token",toString:$estr}
	,TBrClose: {_hx_name:"TBrClose",_hx_index:7,__enum__:"hscript.Token",toString:$estr}
	,TDot: {_hx_name:"TDot",_hx_index:8,__enum__:"hscript.Token",toString:$estr}
	,TComma: {_hx_name:"TComma",_hx_index:9,__enum__:"hscript.Token",toString:$estr}
	,TSemicolon: {_hx_name:"TSemicolon",_hx_index:10,__enum__:"hscript.Token",toString:$estr}
	,TBkOpen: {_hx_name:"TBkOpen",_hx_index:11,__enum__:"hscript.Token",toString:$estr}
	,TBkClose: {_hx_name:"TBkClose",_hx_index:12,__enum__:"hscript.Token",toString:$estr}
	,TQuestion: {_hx_name:"TQuestion",_hx_index:13,__enum__:"hscript.Token",toString:$estr}
	,TDoubleDot: {_hx_name:"TDoubleDot",_hx_index:14,__enum__:"hscript.Token",toString:$estr}
	,TMeta: ($_=function(s) { return {_hx_index:15,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TMeta",$_.__params__ = ["s"],$_)
	,TPrepro: ($_=function(s) { return {_hx_index:16,s:s,__enum__:"hscript.Token",toString:$estr}; },$_._hx_name="TPrepro",$_.__params__ = ["s"],$_)
};
hscript_Token.__constructs__ = [hscript_Token.TEof,hscript_Token.TConst,hscript_Token.TId,hscript_Token.TOp,hscript_Token.TPOpen,hscript_Token.TPClose,hscript_Token.TBrOpen,hscript_Token.TBrClose,hscript_Token.TDot,hscript_Token.TComma,hscript_Token.TSemicolon,hscript_Token.TBkOpen,hscript_Token.TBkClose,hscript_Token.TQuestion,hscript_Token.TDoubleDot,hscript_Token.TMeta,hscript_Token.TPrepro];
var hscript_Parser = function() {
	this.uid = 0;
	this.preprocesorValues = new haxe_ds_StringMap();
	this.line = 1;
	this.opChars = "+*/-=!><&|^%~";
	this.identChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	var priorities = [["%"],["*","/"],["+","-"],["<<",">>",">>>"],["|","&","^"],["==","!=",">","<",">=","<="],["..."],["&&"],["||"],["=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","|=","&=","^=","=>"],["->"]];
	this.opPriority = new haxe_ds_StringMap();
	this.opRightAssoc = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = priorities.length;
	while(_g < _g1) {
		var i = _g++;
		var _g2 = 0;
		var _g3 = priorities[i];
		while(_g2 < _g3.length) {
			var x = _g3[_g2];
			++_g2;
			this.opPriority.h[x] = i;
			if(i == 9) {
				this.opRightAssoc.h[x] = true;
			}
		}
	}
	var x = "!";
	this.opPriority.h[x] = x == "++" || x == "--" ? -1 : -2;
	var x = "++";
	this.opPriority.h[x] = x == "++" || x == "--" ? -1 : -2;
	var x = "--";
	this.opPriority.h[x] = x == "++" || x == "--" ? -1 : -2;
	var x = "~";
	this.opPriority.h[x] = x == "++" || x == "--" ? -1 : -2;
};
$hxClasses["hscript.Parser"] = hscript_Parser;
hscript_Parser.__name__ = "hscript.Parser";
hscript_Parser.prototype = {
	line: null
	,opChars: null
	,identChars: null
	,opPriority: null
	,opRightAssoc: null
	,preprocesorValues: null
	,allowJSON: null
	,allowTypes: null
	,allowMetadata: null
	,resumeErrors: null
	,input: null
	,readPos: null
	,char: null
	,ops: null
	,idents: null
	,uid: null
	,tokens: null
	,error: function(err,pmin,pmax) {
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(err);
		}
	}
	,invalidChar: function(c) {
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(hscript_Error.EInvalidChar(c));
		}
	}
	,initParser: function(origin) {
		this.preprocStack = [];
		this.tokens = new haxe_ds_GenericStack();
		this.char = -1;
		this.ops = [];
		this.idents = [];
		this.uid = 0;
		var _g = 0;
		var _g1 = this.opChars.length;
		while(_g < _g1) {
			var i = _g++;
			this.ops[HxOverrides.cca(this.opChars,i)] = true;
		}
		var _g = 0;
		var _g1 = this.identChars.length;
		while(_g < _g1) {
			var i = _g++;
			this.idents[HxOverrides.cca(this.identChars,i)] = true;
		}
	}
	,parseString: function(s,origin) {
		if(origin == null) {
			origin = "hscript";
		}
		this.initParser(origin);
		this.input = s;
		this.readPos = 0;
		var a = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				break;
			}
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			this.parseFullExpr(a);
		}
		if(a.length == 1) {
			return a[0];
		} else {
			return hscript_Expr.EBlock(a);
		}
	}
	,unexpected: function(tk) {
		var err = hscript_Error.EUnexpected(this.tokenString(tk));
		if(!this.resumeErrors) {
			throw haxe_Exception.thrown(err);
		}
		return null;
	}
	,push: function(tk) {
		var _this = this.tokens;
		_this.head = new haxe_ds_GenericCell(tk,_this.head);
	}
	,ensure: function(tk) {
		var t = this.token();
		if(t != tk) {
			this.unexpected(t);
		}
	}
	,ensureToken: function(tk) {
		var t = this.token();
		if(!Type.enumEq(t,tk)) {
			this.unexpected(t);
		}
	}
	,maybe: function(tk) {
		var t = this.token();
		if(Type.enumEq(t,tk)) {
			return true;
		}
		var _this = this.tokens;
		_this.head = new haxe_ds_GenericCell(t,_this.head);
		return false;
	}
	,getIdent: function() {
		var tk = this.token();
		if(tk == null) {
			this.unexpected(tk);
			return null;
		} else if(tk._hx_index == 2) {
			var id = tk.s;
			return id;
		} else {
			this.unexpected(tk);
			return null;
		}
	}
	,expr: function(e) {
		return e;
	}
	,pmin: function(e) {
		return 0;
	}
	,pmax: function(e) {
		return 0;
	}
	,mk: function(e,pmin,pmax) {
		return e;
	}
	,isBlock: function(e) {
		if(e == null) {
			return false;
		}
		switch(e._hx_index) {
		case 2:
			var _g = e.n;
			var t = e.t;
			var e1 = e.e;
			if(e1 != null) {
				return this.isBlock(e1);
			} else if(t != null) {
				if(t == null) {
					return false;
				} else if(t._hx_index == 2) {
					var _g = t.fields;
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			var _g = e.e;
			return true;
		case 6:
			var _g = e.op;
			var _g = e.e1;
			var e1 = e.e2;
			return this.isBlock(e1);
		case 7:
			var _g = e.op;
			var prefix = e.prefix;
			var e1 = e.e;
			if(!prefix) {
				return this.isBlock(e1);
			} else {
				return false;
			}
			break;
		case 9:
			var _g = e.cond;
			var e1 = e.e1;
			var e2 = e.e2;
			if(e2 != null) {
				return this.isBlock(e2);
			} else {
				return this.isBlock(e1);
			}
			break;
		case 10:
			var _g = e.cond;
			var e1 = e.e;
			return this.isBlock(e1);
		case 11:
			var _g = e.v;
			var _g = e.it;
			var e1 = e.e;
			return this.isBlock(e1);
		case 14:
			var _g = e.args;
			var _g = e.name;
			var _g = e.ret;
			var e1 = e.e;
			return this.isBlock(e1);
		case 15:
			var e1 = e.e;
			if(e1 != null) {
				return this.isBlock(e1);
			} else {
				return false;
			}
			break;
		case 20:
			var _g = e.e;
			var _g = e.v;
			var _g = e.t;
			var e1 = e.ecatch;
			return this.isBlock(e1);
		case 21:
			var _g = e.fl;
			return true;
		case 23:
			var _g = e.e;
			var _g = e.cases;
			var _g = e.defaultExpr;
			return true;
		case 24:
			var _g = e.cond;
			var e1 = e.e;
			return this.isBlock(e1);
		case 25:
			var _g = e.name;
			var _g = e.args;
			var e1 = e.e;
			return this.isBlock(e1);
		default:
			return false;
		}
	}
	,parseFullExpr: function(exprs) {
		var e = this.parseExpr();
		exprs.push(e);
		var tk = this.token();
		while(true) {
			var tmp;
			if(tk == hscript_Token.TComma && e != null) {
				if(e._hx_index == 2) {
					var _g = e.n;
					var _g1 = e.t;
					var _g2 = e.e;
					tmp = true;
				} else {
					tmp = false;
				}
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			e = this.parseStructure("var");
			exprs.push(e);
			tk = this.token();
		}
		if(tk != hscript_Token.TSemicolon && tk != hscript_Token.TEof) {
			if(this.isBlock(e)) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
			} else {
				this.unexpected(tk);
			}
		}
	}
	,parseObject: function(p1) {
		var fl = [];
		_hx_loop1: while(true) {
			var tk = this.token();
			var id = null;
			if(tk == null) {
				this.unexpected(tk);
				break;
			} else {
				switch(tk._hx_index) {
				case 1:
					var c = tk.c;
					if(!this.allowJSON) {
						this.unexpected(tk);
					}
					if(c._hx_index == 2) {
						var s = c.s;
						id = s;
					} else {
						this.unexpected(tk);
					}
					break;
				case 2:
					var i = tk.s;
					id = i;
					break;
				case 7:
					break _hx_loop1;
				default:
					this.unexpected(tk);
					break _hx_loop1;
				}
			}
			var t = this.token();
			if(t != hscript_Token.TDoubleDot) {
				this.unexpected(t);
			}
			fl.push({ name : id, e : this.parseExpr()});
			tk = this.token();
			if(tk == null) {
				this.unexpected(tk);
			} else {
				switch(tk._hx_index) {
				case 7:
					break _hx_loop1;
				case 9:
					break;
				default:
					this.unexpected(tk);
				}
			}
		}
		return this.parseExprNext(hscript_Expr.EObject(fl));
	}
	,parseExpr: function() {
		var tk = this.token();
		if(tk == null) {
			return this.unexpected(tk);
		} else {
			switch(tk._hx_index) {
			case 1:
				var c = tk.c;
				return this.parseExprNext(hscript_Expr.EConst(c));
			case 2:
				var id = tk.s;
				var e = this.parseStructure(id);
				if(e == null) {
					e = hscript_Expr.EIdent(id);
				}
				return this.parseExprNext(e);
			case 3:
				var op = tk.s;
				if(op == "-") {
					var start = 0;
					var e = this.parseExpr();
					if(e == null) {
						return this.makeUnop(op,e);
					}
					if(e._hx_index == 0) {
						var _g = e.c;
						switch(_g._hx_index) {
						case 0:
							var i = _g.v;
							return hscript_Expr.EConst(hscript_Const.CInt(-i));
						case 1:
							var f = _g.f;
							return hscript_Expr.EConst(hscript_Const.CFloat(-f));
						default:
							return this.makeUnop(op,e);
						}
					} else {
						return this.makeUnop(op,e);
					}
				}
				if(this.opPriority.h[op] < 0) {
					return this.makeUnop(op,this.parseExpr());
				}
				return this.unexpected(tk);
			case 4:
				tk = this.token();
				if(tk == hscript_Token.TPClose) {
					var t = this.token();
					if(!Type.enumEq(t,hscript_Token.TOp("->"))) {
						this.unexpected(t);
					}
					var eret = this.parseExpr();
					return hscript_Expr.EFunction([],hscript_Expr.EReturn(eret));
				}
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				var e = this.parseExpr();
				tk = this.token();
				if(tk != null) {
					switch(tk._hx_index) {
					case 5:
						return this.parseExprNext(hscript_Expr.EParent(e));
					case 9:
						if(e._hx_index == 1) {
							var v = e.v;
							return this.parseLambda([{ name : v}],0);
						}
						break;
					case 14:
						var t = this.parseType();
						tk = this.token();
						if(tk != null) {
							switch(tk._hx_index) {
							case 5:
								return this.parseExprNext(hscript_Expr.ECheckType(e,t));
							case 9:
								if(e._hx_index == 1) {
									var v = e.v;
									return this.parseLambda([{ name : v, t : t}],0);
								}
								break;
							default:
							}
						}
						break;
					default:
					}
				}
				return this.unexpected(tk);
			case 6:
				tk = this.token();
				if(tk == null) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(tk,_this.head);
				} else {
					switch(tk._hx_index) {
					case 1:
						var c = tk.c;
						if(this.allowJSON) {
							if(c._hx_index == 2) {
								var _g = c.s;
								var tk2 = this.token();
								var _this = this.tokens;
								_this.head = new haxe_ds_GenericCell(tk2,_this.head);
								var _this = this.tokens;
								_this.head = new haxe_ds_GenericCell(tk,_this.head);
								if(tk2 != null) {
									if(tk2._hx_index == 14) {
										return this.parseExprNext(this.parseObject(0));
									}
								}
							} else {
								var _this = this.tokens;
								_this.head = new haxe_ds_GenericCell(tk,_this.head);
							}
						} else {
							var _this = this.tokens;
							_this.head = new haxe_ds_GenericCell(tk,_this.head);
						}
						break;
					case 2:
						var _g = tk.s;
						var tk2 = this.token();
						var _this = this.tokens;
						_this.head = new haxe_ds_GenericCell(tk2,_this.head);
						var _this = this.tokens;
						_this.head = new haxe_ds_GenericCell(tk,_this.head);
						if(tk2 != null) {
							if(tk2._hx_index == 14) {
								return this.parseExprNext(this.parseObject(0));
							}
						}
						break;
					case 7:
						return this.parseExprNext(hscript_Expr.EObject([]));
					default:
						var _this = this.tokens;
						_this.head = new haxe_ds_GenericCell(tk,_this.head);
					}
				}
				var a = [];
				while(true) {
					this.parseFullExpr(a);
					tk = this.token();
					if(tk == hscript_Token.TBrClose || this.resumeErrors && tk == hscript_Token.TEof) {
						break;
					}
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(tk,_this.head);
				}
				return hscript_Expr.EBlock(a);
			case 11:
				var a = [];
				tk = this.token();
				while(tk != hscript_Token.TBkClose && (!this.resumeErrors || tk != hscript_Token.TEof)) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(tk,_this.head);
					a.push(this.parseExpr());
					tk = this.token();
					if(tk == hscript_Token.TComma) {
						tk = this.token();
					}
				}
				if(a.length == 1 && a[0] != null) {
					var _g = a[0];
					switch(_g._hx_index) {
					case 10:
						var _g1 = _g.cond;
						var _g1 = _g.e;
						var tmp = "__a_" + this.uid++;
						var e = hscript_Expr.EBlock([hscript_Expr.EVar(tmp,null,hscript_Expr.EArrayDecl([])),this.mapCompr(tmp,a[0]),hscript_Expr.EIdent(tmp)]);
						return this.parseExprNext(e);
					case 11:
						var _g1 = _g.v;
						var _g1 = _g.it;
						var _g1 = _g.e;
						var tmp = "__a_" + this.uid++;
						var e = hscript_Expr.EBlock([hscript_Expr.EVar(tmp,null,hscript_Expr.EArrayDecl([])),this.mapCompr(tmp,a[0]),hscript_Expr.EIdent(tmp)]);
						return this.parseExprNext(e);
					case 24:
						var _g1 = _g.cond;
						var _g1 = _g.e;
						var tmp = "__a_" + this.uid++;
						var e = hscript_Expr.EBlock([hscript_Expr.EVar(tmp,null,hscript_Expr.EArrayDecl([])),this.mapCompr(tmp,a[0]),hscript_Expr.EIdent(tmp)]);
						return this.parseExprNext(e);
					default:
					}
				}
				return this.parseExprNext(hscript_Expr.EArrayDecl(a));
			case 15:
				var id = tk.s;
				if(this.allowMetadata) {
					var args = this.parseMetaArgs();
					return hscript_Expr.EMeta(id,args,this.parseExpr());
				} else {
					return this.unexpected(tk);
				}
				break;
			default:
				return this.unexpected(tk);
			}
		}
	}
	,parseLambda: function(args,pmin) {
		_hx_loop1: while(true) {
			var id = this.getIdent();
			var t = this.maybe(hscript_Token.TDoubleDot) ? this.parseType() : null;
			args.push({ name : id, t : t});
			var tk = this.token();
			if(tk == null) {
				this.unexpected(tk);
				break;
			} else {
				switch(tk._hx_index) {
				case 5:
					break _hx_loop1;
				case 9:
					break;
				default:
					this.unexpected(tk);
					break _hx_loop1;
				}
			}
		}
		var t = this.token();
		if(!Type.enumEq(t,hscript_Token.TOp("->"))) {
			this.unexpected(t);
		}
		var eret = this.parseExpr();
		return hscript_Expr.EFunction(args,hscript_Expr.EReturn(eret));
	}
	,parseMetaArgs: function() {
		var tk = this.token();
		if(tk != hscript_Token.TPOpen) {
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			return null;
		}
		var args = [];
		tk = this.token();
		if(tk != hscript_Token.TPClose) {
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			_hx_loop1: while(true) {
				args.push(this.parseExpr());
				var _g = this.token();
				if(_g == null) {
					var tk = _g;
					this.unexpected(tk);
				} else {
					switch(_g._hx_index) {
					case 5:
						break _hx_loop1;
					case 9:
						break;
					default:
						var tk1 = _g;
						this.unexpected(tk1);
					}
				}
			}
		}
		return args;
	}
	,mapCompr: function(tmp,e) {
		if(e == null) {
			return null;
		}
		var edef;
		switch(e._hx_index) {
		case 3:
			var e2 = e.e;
			edef = hscript_Expr.EParent(this.mapCompr(tmp,e2));
			break;
		case 4:
			var _g = e.e;
			if(_g.length == 1) {
				var e1 = _g[0];
				edef = hscript_Expr.EBlock([this.mapCompr(tmp,e1)]);
			} else {
				edef = hscript_Expr.ECall(hscript_Expr.EField(hscript_Expr.EIdent(tmp),"push"),[e]);
			}
			break;
		case 9:
			var cond = e.cond;
			var e1 = e.e1;
			var e2 = e.e2;
			edef = e2 == null ? hscript_Expr.EIf(cond,this.mapCompr(tmp,e1),null) : hscript_Expr.ECall(hscript_Expr.EField(hscript_Expr.EIdent(tmp),"push"),[e]);
			break;
		case 10:
			var cond = e.cond;
			var e2 = e.e;
			edef = hscript_Expr.EWhile(cond,this.mapCompr(tmp,e2));
			break;
		case 11:
			var v = e.v;
			var it = e.it;
			var e2 = e.e;
			edef = hscript_Expr.EFor(v,it,this.mapCompr(tmp,e2));
			break;
		case 24:
			var cond = e.cond;
			var e2 = e.e;
			edef = hscript_Expr.EDoWhile(cond,this.mapCompr(tmp,e2));
			break;
		default:
			edef = hscript_Expr.ECall(hscript_Expr.EField(hscript_Expr.EIdent(tmp),"push"),[e]);
		}
		return edef;
	}
	,makeUnop: function(op,e) {
		if(e == null && this.resumeErrors) {
			return null;
		}
		switch(e._hx_index) {
		case 6:
			var bop = e.op;
			var e1 = e.e1;
			var e2 = e.e2;
			return hscript_Expr.EBinop(bop,this.makeUnop(op,e1),e2);
		case 22:
			var e1 = e.cond;
			var e2 = e.e1;
			var e3 = e.e2;
			return hscript_Expr.ETernary(this.makeUnop(op,e1),e2,e3);
		default:
			return hscript_Expr.EUnop(op,true,e);
		}
	}
	,makeBinop: function(op,e1,e) {
		if(e == null && this.resumeErrors) {
			return hscript_Expr.EBinop(op,e1,e);
		}
		switch(e._hx_index) {
		case 6:
			var op2 = e.op;
			var e2 = e.e1;
			var e3 = e.e2;
			if(this.opPriority.h[op] <= this.opPriority.h[op2] && !Object.prototype.hasOwnProperty.call(this.opRightAssoc.h,op)) {
				return hscript_Expr.EBinop(op2,this.makeBinop(op,e1,e2),e3);
			} else {
				return hscript_Expr.EBinop(op,e1,e);
			}
			break;
		case 22:
			var e2 = e.cond;
			var e3 = e.e1;
			var e4 = e.e2;
			if(Object.prototype.hasOwnProperty.call(this.opRightAssoc.h,op)) {
				return hscript_Expr.EBinop(op,e1,e);
			} else {
				return hscript_Expr.ETernary(this.makeBinop(op,e1,e2),e3,e4);
			}
			break;
		default:
			return hscript_Expr.EBinop(op,e1,e);
		}
	}
	,parseStructure: function(id) {
		switch(id) {
		case "break":
			return hscript_Expr.EBreak;
		case "continue":
			return hscript_Expr.EContinue;
		case "do":
			var e = this.parseExpr();
			var tk = this.token();
			if(tk == null) {
				this.unexpected(tk);
			} else if(tk._hx_index == 2) {
				if(tk.s != "while") {
					this.unexpected(tk);
				}
			} else {
				this.unexpected(tk);
			}
			var econd = this.parseExpr();
			return hscript_Expr.EDoWhile(econd,e);
		case "else":
			return this.unexpected(hscript_Token.TId(id));
		case "for":
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var vname = this.getIdent();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TId("in"))) {
				this.unexpected(t);
			}
			var eiter = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TPClose) {
				this.unexpected(t);
			}
			var e = this.parseExpr();
			return hscript_Expr.EFor(vname,eiter,e);
		case "function":
			var tk = this.token();
			var name = null;
			if(tk == null) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
			} else if(tk._hx_index == 2) {
				var id = tk.s;
				name = id;
			} else {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
			}
			var inf = this.parseFunctionDecl();
			return hscript_Expr.EFunction(inf.args,inf.body,name,inf.ret);
		case "if":
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var cond = this.parseExpr();
			var t = this.token();
			if(t != hscript_Token.TPClose) {
				this.unexpected(t);
			}
			var e1 = this.parseExpr();
			var e2 = null;
			var semic = false;
			var tk = this.token();
			if(tk == hscript_Token.TSemicolon) {
				semic = true;
				tk = this.token();
			}
			if(Type.enumEq(tk,hscript_Token.TId("else"))) {
				e2 = this.parseExpr();
			} else {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				if(semic) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(hscript_Token.TSemicolon,_this.head);
				}
			}
			return hscript_Expr.EIf(cond,e1,e2);
		case "inline":
			if(!this.maybe(hscript_Token.TId("function"))) {
				this.unexpected(hscript_Token.TId("inline"));
			}
			return this.parseStructure("function");
		case "new":
			var a = [];
			a.push(this.getIdent());
			_hx_loop1: while(true) {
				var tk = this.token();
				if(tk == null) {
					this.unexpected(tk);
					break;
				} else {
					switch(tk._hx_index) {
					case 4:
						break _hx_loop1;
					case 8:
						a.push(this.getIdent());
						break;
					default:
						this.unexpected(tk);
						break _hx_loop1;
					}
				}
			}
			var args = this.parseExprList(hscript_Token.TPClose);
			return hscript_Expr.ENew(a.join("."),args);
		case "return":
			var tk = this.token();
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			var e = tk == hscript_Token.TSemicolon ? null : this.parseExpr();
			return hscript_Expr.EReturn(e);
		case "switch":
			var e = this.parseExpr();
			var def = null;
			var cases = [];
			var t = this.token();
			if(t != hscript_Token.TBrOpen) {
				this.unexpected(t);
			}
			_hx_loop2: while(true) {
				var tk = this.token();
				if(tk == null) {
					this.unexpected(tk);
					break;
				} else {
					switch(tk._hx_index) {
					case 2:
						switch(tk.s) {
						case "case":
							var c = { values : [], expr : null};
							cases.push(c);
							_hx_loop3: while(true) {
								var e1 = this.parseExpr();
								c.values.push(e1);
								tk = this.token();
								if(tk == null) {
									this.unexpected(tk);
									break;
								} else {
									switch(tk._hx_index) {
									case 9:
										break;
									case 14:
										break _hx_loop3;
									default:
										this.unexpected(tk);
										break _hx_loop3;
									}
								}
							}
							var exprs = [];
							_hx_loop4: while(true) {
								tk = this.token();
								var _this = this.tokens;
								_this.head = new haxe_ds_GenericCell(tk,_this.head);
								if(tk == null) {
									this.parseFullExpr(exprs);
								} else {
									switch(tk._hx_index) {
									case 0:
										if(this.resumeErrors) {
											break _hx_loop4;
										} else {
											this.parseFullExpr(exprs);
										}
										break;
									case 2:
										switch(tk.s) {
										case "case":case "default":
											break _hx_loop4;
										default:
											this.parseFullExpr(exprs);
										}
										break;
									case 7:
										break _hx_loop4;
									default:
										this.parseFullExpr(exprs);
									}
								}
							}
							c.expr = exprs.length == 1 ? exprs[0] : exprs.length == 0 ? hscript_Expr.EBlock([]) : hscript_Expr.EBlock(exprs);
							break;
						case "default":
							if(def != null) {
								this.unexpected(tk);
							}
							var t = this.token();
							if(t != hscript_Token.TDoubleDot) {
								this.unexpected(t);
							}
							var exprs1 = [];
							_hx_loop5: while(true) {
								tk = this.token();
								var _this1 = this.tokens;
								_this1.head = new haxe_ds_GenericCell(tk,_this1.head);
								if(tk == null) {
									this.parseFullExpr(exprs1);
								} else {
									switch(tk._hx_index) {
									case 0:
										if(this.resumeErrors) {
											break _hx_loop5;
										} else {
											this.parseFullExpr(exprs1);
										}
										break;
									case 2:
										switch(tk.s) {
										case "case":case "default":
											break _hx_loop5;
										default:
											this.parseFullExpr(exprs1);
										}
										break;
									case 7:
										break _hx_loop5;
									default:
										this.parseFullExpr(exprs1);
									}
								}
							}
							def = exprs1.length == 1 ? exprs1[0] : exprs1.length == 0 ? hscript_Expr.EBlock([]) : hscript_Expr.EBlock(exprs1);
							break;
						default:
							this.unexpected(tk);
							break _hx_loop2;
						}
						break;
					case 7:
						break _hx_loop2;
					default:
						this.unexpected(tk);
						break _hx_loop2;
					}
				}
			}
			return hscript_Expr.ESwitch(e,cases,def);
		case "throw":
			var e = this.parseExpr();
			return hscript_Expr.EThrow(e);
		case "try":
			var e = this.parseExpr();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TId("catch"))) {
				this.unexpected(t);
			}
			var t = this.token();
			if(t != hscript_Token.TPOpen) {
				this.unexpected(t);
			}
			var vname = this.getIdent();
			var t = this.token();
			if(t != hscript_Token.TDoubleDot) {
				this.unexpected(t);
			}
			var t = null;
			if(this.allowTypes) {
				t = this.parseType();
			} else {
				var t1 = this.token();
				if(!Type.enumEq(t1,hscript_Token.TId("Dynamic"))) {
					this.unexpected(t1);
				}
			}
			var t1 = this.token();
			if(t1 != hscript_Token.TPClose) {
				this.unexpected(t1);
			}
			var ec = this.parseExpr();
			return hscript_Expr.ETry(e,vname,t,ec);
		case "var":
			var ident = this.getIdent();
			var tk = this.token();
			var t = null;
			if(tk == hscript_Token.TDoubleDot && this.allowTypes) {
				t = this.parseType();
				tk = this.token();
			}
			var e = null;
			if(Type.enumEq(tk,hscript_Token.TOp("="))) {
				e = this.parseExpr();
			} else {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
			}
			return hscript_Expr.EVar(ident,t,e);
		case "while":
			var econd = this.parseExpr();
			var e = this.parseExpr();
			return hscript_Expr.EWhile(econd,e);
		default:
			return null;
		}
	}
	,parseExprNext: function(e1) {
		var tk = this.token();
		if(tk == null) {
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			return e1;
		} else {
			switch(tk._hx_index) {
			case 3:
				var op = tk.s;
				if(op == "->") {
					switch(e1._hx_index) {
					case 1:
						var i = e1.v;
						var eret = this.parseExpr();
						return hscript_Expr.EFunction([{ name : i}],hscript_Expr.EReturn(eret));
					case 3:
						var _hx_tmp = e1.e;
						if(_hx_tmp._hx_index == 1) {
							var i = _hx_tmp.v;
							var eret = this.parseExpr();
							return hscript_Expr.EFunction([{ name : i}],hscript_Expr.EReturn(eret));
						}
						break;
					case 26:
						var _hx_tmp = e1.e;
						if(_hx_tmp._hx_index == 1) {
							var i = _hx_tmp.v;
							var t = e1.t;
							var eret = this.parseExpr();
							return hscript_Expr.EFunction([{ name : i, t : t}],hscript_Expr.EReturn(eret));
						}
						break;
					default:
					}
					this.unexpected(tk);
				}
				if(this.opPriority.h[op] == -1) {
					var tmp;
					if(!this.isBlock(e1)) {
						if(e1._hx_index == 3) {
							var _g = e1.e;
							tmp = true;
						} else {
							tmp = false;
						}
					} else {
						tmp = true;
					}
					if(tmp) {
						var _this = this.tokens;
						_this.head = new haxe_ds_GenericCell(tk,_this.head);
						return e1;
					}
					return this.parseExprNext(hscript_Expr.EUnop(op,false,e1));
				}
				return this.makeBinop(op,e1,this.parseExpr());
			case 4:
				return this.parseExprNext(hscript_Expr.ECall(e1,this.parseExprList(hscript_Token.TPClose)));
			case 8:
				var field = this.getIdent();
				return this.parseExprNext(hscript_Expr.EField(e1,field));
			case 11:
				var e2 = this.parseExpr();
				var t = this.token();
				if(t != hscript_Token.TBkClose) {
					this.unexpected(t);
				}
				return this.parseExprNext(hscript_Expr.EArray(e1,e2));
			case 13:
				var e2 = this.parseExpr();
				var t = this.token();
				if(t != hscript_Token.TDoubleDot) {
					this.unexpected(t);
				}
				var e3 = this.parseExpr();
				return hscript_Expr.ETernary(e1,e2,e3);
			default:
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				return e1;
			}
		}
	}
	,parseFunctionArgs: function() {
		var args = [];
		var tk = this.token();
		if(tk != hscript_Token.TPClose) {
			var done = false;
			while(!done) {
				var name = null;
				var opt = false;
				if(tk != null) {
					if(tk._hx_index == 13) {
						opt = true;
						tk = this.token();
					}
				}
				if(tk == null) {
					this.unexpected(tk);
					break;
				} else if(tk._hx_index == 2) {
					var id = tk.s;
					name = id;
				} else {
					this.unexpected(tk);
					break;
				}
				var arg = { name : name};
				args.push(arg);
				if(opt) {
					arg.opt = true;
				}
				if(this.allowTypes) {
					if(this.maybe(hscript_Token.TDoubleDot)) {
						arg.t = this.parseType();
					}
					if(this.maybe(hscript_Token.TOp("="))) {
						arg.value = this.parseExpr();
					}
				}
				tk = this.token();
				if(tk == null) {
					this.unexpected(tk);
				} else {
					switch(tk._hx_index) {
					case 5:
						done = true;
						break;
					case 9:
						tk = this.token();
						break;
					default:
						this.unexpected(tk);
					}
				}
			}
		}
		return args;
	}
	,parseFunctionDecl: function() {
		var t = this.token();
		if(t != hscript_Token.TPOpen) {
			this.unexpected(t);
		}
		var args = this.parseFunctionArgs();
		var ret = null;
		if(this.allowTypes) {
			var tk = this.token();
			if(tk != hscript_Token.TDoubleDot) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
			} else {
				ret = this.parseType();
			}
		}
		return { args : args, ret : ret, body : this.parseExpr()};
	}
	,parsePath: function() {
		var path = [this.getIdent()];
		while(true) {
			var t = this.token();
			if(t != hscript_Token.TDot) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(t,_this.head);
				break;
			}
			path.push(this.getIdent());
		}
		return path;
	}
	,parseType: function() {
		var _gthis = this;
		var t = this.token();
		if(t == null) {
			return this.unexpected(t);
		} else {
			switch(t._hx_index) {
			case 2:
				var v = t.s;
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(t,_this.head);
				var path = this.parsePath();
				var params = null;
				t = this.token();
				if(t == null) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(t,_this.head);
				} else if(t._hx_index == 3) {
					var op = t.s;
					if(op == "<") {
						params = [];
						_hx_loop1: while(true) {
							params.push(this.parseType());
							t = this.token();
							if(t != null) {
								switch(t._hx_index) {
								case 3:
									var op = t.s;
									if(op == ">") {
										break _hx_loop1;
									}
									if(HxOverrides.cca(op,0) == 62) {
										var _this = this.tokens;
										_this.head = new haxe_ds_GenericCell(hscript_Token.TOp(HxOverrides.substr(op,1,null)),_this.head);
										break _hx_loop1;
									}
									break;
								case 9:
									continue;
								default:
								}
							}
							this.unexpected(t);
							break;
						}
					} else {
						var _this = this.tokens;
						_this.head = new haxe_ds_GenericCell(t,_this.head);
					}
				} else {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(t,_this.head);
				}
				return this.parseTypeNext(hscript_CType.CTPath(path,params));
			case 4:
				var a = this.token();
				var b = this.token();
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(b,_this.head);
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(a,_this.head);
				var withReturn = function(args) {
					var _g = _gthis.token();
					if(_g == null) {
						var t = _g;
						_gthis.unexpected(t);
					} else if(_g._hx_index == 3) {
						if(_g.s != "->") {
							var t = _g;
							_gthis.unexpected(t);
						}
					} else {
						var t = _g;
						_gthis.unexpected(t);
					}
					return hscript_CType.CTFun(args,_gthis.parseType());
				};
				if(a == null) {
					var t1 = this.parseType();
					var _g = this.token();
					if(_g == null) {
						var t2 = _g;
						return this.unexpected(t2);
					} else {
						switch(_g._hx_index) {
						case 5:
							return this.parseTypeNext(hscript_CType.CTParent(t1));
						case 9:
							var args = [t1];
							while(true) {
								args.push(this.parseType());
								if(!this.maybe(hscript_Token.TComma)) {
									break;
								}
							}
							var t1 = this.token();
							if(t1 != hscript_Token.TPClose) {
								this.unexpected(t1);
							}
							return withReturn(args);
						default:
							var t1 = _g;
							return this.unexpected(t1);
						}
					}
				} else {
					switch(a._hx_index) {
					case 2:
						var _g = a.s;
						if(b == null) {
							var t1 = this.parseType();
							var _g = this.token();
							if(_g == null) {
								var t2 = _g;
								return this.unexpected(t2);
							} else {
								switch(_g._hx_index) {
								case 5:
									return this.parseTypeNext(hscript_CType.CTParent(t1));
								case 9:
									var args = [t1];
									while(true) {
										args.push(this.parseType());
										if(!this.maybe(hscript_Token.TComma)) {
											break;
										}
									}
									var t1 = this.token();
									if(t1 != hscript_Token.TPClose) {
										this.unexpected(t1);
									}
									return withReturn(args);
								default:
									var t1 = _g;
									return this.unexpected(t1);
								}
							}
						} else if(b._hx_index == 14) {
							var _g = [];
							var _g1 = 0;
							var _g2 = this.parseFunctionArgs();
							while(_g1 < _g2.length) {
								var arg = _g2[_g1];
								++_g1;
								var _g3 = arg.value;
								if(_g3 != null) {
									var v = _g3;
									if(!this.resumeErrors) {
										throw haxe_Exception.thrown(hscript_Error.ECustom("Default values not allowed in function types"));
									}
								}
								_g.push(hscript_CType.CTNamed(arg.name,arg.opt ? hscript_CType.CTOpt(arg.t) : arg.t));
							}
							var args = _g;
							return withReturn(args);
						} else {
							var t1 = this.parseType();
							var _g = this.token();
							if(_g == null) {
								var t2 = _g;
								return this.unexpected(t2);
							} else {
								switch(_g._hx_index) {
								case 5:
									return this.parseTypeNext(hscript_CType.CTParent(t1));
								case 9:
									var args = [t1];
									while(true) {
										args.push(this.parseType());
										if(!this.maybe(hscript_Token.TComma)) {
											break;
										}
									}
									var t1 = this.token();
									if(t1 != hscript_Token.TPClose) {
										this.unexpected(t1);
									}
									return withReturn(args);
								default:
									var t1 = _g;
									return this.unexpected(t1);
								}
							}
						}
						break;
					case 5:
						var _g = [];
						var _g1 = 0;
						var _g2 = this.parseFunctionArgs();
						while(_g1 < _g2.length) {
							var arg = _g2[_g1];
							++_g1;
							var _g3 = arg.value;
							if(_g3 != null) {
								var v = _g3;
								if(!this.resumeErrors) {
									throw haxe_Exception.thrown(hscript_Error.ECustom("Default values not allowed in function types"));
								}
							}
							_g.push(hscript_CType.CTNamed(arg.name,arg.opt ? hscript_CType.CTOpt(arg.t) : arg.t));
						}
						var args = _g;
						return withReturn(args);
					default:
						var t1 = this.parseType();
						var _g = this.token();
						if(_g == null) {
							var t2 = _g;
							return this.unexpected(t2);
						} else {
							switch(_g._hx_index) {
							case 5:
								return this.parseTypeNext(hscript_CType.CTParent(t1));
							case 9:
								var args = [t1];
								while(true) {
									args.push(this.parseType());
									if(!this.maybe(hscript_Token.TComma)) {
										break;
									}
								}
								var t1 = this.token();
								if(t1 != hscript_Token.TPClose) {
									this.unexpected(t1);
								}
								return withReturn(args);
							default:
								var t1 = _g;
								return this.unexpected(t1);
							}
						}
					}
				}
				break;
			case 6:
				var fields = [];
				var meta = null;
				_hx_loop8: while(true) {
					t = this.token();
					if(t == null) {
						this.unexpected(t);
						break;
					} else {
						switch(t._hx_index) {
						case 2:
							var _g = t.s;
							if(_g == "var") {
								var name = this.getIdent();
								var t1 = this.token();
								if(t1 != hscript_Token.TDoubleDot) {
									this.unexpected(t1);
								}
								fields.push({ name : name, t : this.parseType(), meta : meta});
								meta = null;
								var t2 = this.token();
								if(t2 != hscript_Token.TSemicolon) {
									this.unexpected(t2);
								}
							} else {
								var name1 = _g;
								var t3 = this.token();
								if(t3 != hscript_Token.TDoubleDot) {
									this.unexpected(t3);
								}
								fields.push({ name : name1, t : this.parseType(), meta : meta});
								t = this.token();
								if(t == null) {
									this.unexpected(t);
								} else {
									switch(t._hx_index) {
									case 7:
										break _hx_loop8;
									case 9:
										break;
									default:
										this.unexpected(t);
									}
								}
							}
							break;
						case 7:
							break _hx_loop8;
						case 15:
							var name2 = t.s;
							if(meta == null) {
								meta = [];
							}
							meta.push({ name : name2, params : this.parseMetaArgs()});
							break;
						default:
							this.unexpected(t);
							break _hx_loop8;
						}
					}
				}
				return this.parseTypeNext(hscript_CType.CTAnon(fields));
			default:
				return this.unexpected(t);
			}
		}
	}
	,parseTypeNext: function(t) {
		var tk = this.token();
		if(tk == null) {
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			return t;
		} else if(tk._hx_index == 3) {
			var op = tk.s;
			if(op != "->") {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				return t;
			}
		} else {
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			return t;
		}
		var t2 = this.parseType();
		if(t2._hx_index == 1) {
			var _g = t2.ret;
			var args = t2.args;
			args.unshift(t);
			return t2;
		} else {
			return hscript_CType.CTFun([t],t2);
		}
	}
	,parseExprList: function(etk) {
		var args = [];
		var tk = this.token();
		if(tk == etk) {
			return args;
		}
		var _this = this.tokens;
		_this.head = new haxe_ds_GenericCell(tk,_this.head);
		while(true) {
			args.push(this.parseExpr());
			tk = this.token();
			if(tk == null) {
				if(tk == etk) {
					break;
				}
				this.unexpected(tk);
				break;
			} else if(tk._hx_index != 9) {
				if(tk == etk) {
					break;
				}
				this.unexpected(tk);
				break;
			}
		}
		return args;
	}
	,parseModule: function(content,origin) {
		if(origin == null) {
			origin = "hscript";
		}
		this.initParser(origin);
		this.input = content;
		this.readPos = 0;
		this.allowTypes = true;
		this.allowMetadata = true;
		var decls = [];
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				break;
			}
			var _this = this.tokens;
			_this.head = new haxe_ds_GenericCell(tk,_this.head);
			decls.push(this.parseModuleDecl());
		}
		return decls;
	}
	,parseMetadata: function() {
		var meta = [];
		while(true) {
			var tk = this.token();
			if(tk == null) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				break;
			} else if(tk._hx_index == 15) {
				var name = tk.s;
				meta.push({ name : name, params : this.parseMetaArgs()});
			} else {
				var _this1 = this.tokens;
				_this1.head = new haxe_ds_GenericCell(tk,_this1.head);
				break;
			}
		}
		return meta;
	}
	,parseParams: function() {
		if(this.maybe(hscript_Token.TOp("<"))) {
			if(!this.resumeErrors) {
				throw haxe_Exception.thrown(hscript_Error.EInvalidOp("Unsupported class type parameters"));
			}
		}
		return { };
	}
	,parseModuleDecl: function() {
		var meta = this.parseMetadata();
		var ident = this.getIdent();
		var isPrivate = false;
		var isExtern = false;
		_hx_loop1: while(true) {
			switch(ident) {
			case "extern":
				isExtern = true;
				break;
			case "private":
				isPrivate = true;
				break;
			default:
				break _hx_loop1;
			}
			ident = this.getIdent();
		}
		switch(ident) {
		case "class":
			var name = this.getIdent();
			var params = this.parseParams();
			var extend = null;
			var implement = [];
			_hx_loop2: while(true) {
				var t = this.token();
				if(t == null) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(t,_this.head);
					break;
				} else if(t._hx_index == 2) {
					switch(t.s) {
					case "extends":
						extend = this.parseType();
						break;
					case "implements":
						implement.push(this.parseType());
						break;
					default:
						var _this1 = this.tokens;
						_this1.head = new haxe_ds_GenericCell(t,_this1.head);
						break _hx_loop2;
					}
				} else {
					var _this2 = this.tokens;
					_this2.head = new haxe_ds_GenericCell(t,_this2.head);
					break;
				}
			}
			var fields = [];
			var t = this.token();
			if(t != hscript_Token.TBrOpen) {
				this.unexpected(t);
			}
			while(!this.maybe(hscript_Token.TBrClose)) fields.push(this.parseField());
			return hscript_ModuleDecl.DClass({ name : name, meta : meta, params : params, extend : extend, implement : implement, fields : fields, isPrivate : isPrivate, isExtern : isExtern});
		case "import":
			var path = [this.getIdent()];
			var star = false;
			while(true) {
				var t = this.token();
				if(t != hscript_Token.TDot) {
					var _this = this.tokens;
					_this.head = new haxe_ds_GenericCell(t,_this.head);
					break;
				}
				t = this.token();
				if(t == null) {
					this.unexpected(t);
				} else {
					switch(t._hx_index) {
					case 2:
						var id = t.s;
						path.push(id);
						break;
					case 3:
						if(t.s == "*") {
							star = true;
						} else {
							this.unexpected(t);
						}
						break;
					default:
						this.unexpected(t);
					}
				}
			}
			var t = this.token();
			if(t != hscript_Token.TSemicolon) {
				this.unexpected(t);
			}
			return hscript_ModuleDecl.DImport(path,star);
		case "package":
			var path = this.parsePath();
			var t = this.token();
			if(t != hscript_Token.TSemicolon) {
				this.unexpected(t);
			}
			return hscript_ModuleDecl.DPackage(path);
		case "typedef":
			var name = this.getIdent();
			var params = this.parseParams();
			var t = this.token();
			if(!Type.enumEq(t,hscript_Token.TOp("="))) {
				this.unexpected(t);
			}
			var t = this.parseType();
			return hscript_ModuleDecl.DTypedef({ name : name, meta : meta, params : params, isPrivate : isPrivate, t : t});
		default:
			this.unexpected(hscript_Token.TId(ident));
		}
		return null;
	}
	,parseField: function() {
		var meta = this.parseMetadata();
		var access = [];
		_hx_loop1: while(true) {
			var id = this.getIdent();
			switch(id) {
			case "function":
				var name = this.getIdent();
				var inf = this.parseFunctionDecl();
				return { name : name, meta : meta, access : access, kind : hscript_FieldKind.KFunction({ args : inf.args, expr : inf.body, ret : inf.ret})};
			case "inline":
				access.push(hscript_FieldAccess.AInline);
				break;
			case "macro":
				access.push(hscript_FieldAccess.AMacro);
				break;
			case "override":
				access.push(hscript_FieldAccess.AOverride);
				break;
			case "private":
				access.push(hscript_FieldAccess.APrivate);
				break;
			case "public":
				access.push(hscript_FieldAccess.APublic);
				break;
			case "static":
				access.push(hscript_FieldAccess.AStatic);
				break;
			case "var":
				var name1 = this.getIdent();
				var get = null;
				var set = null;
				if(this.maybe(hscript_Token.TPOpen)) {
					get = this.getIdent();
					var t = this.token();
					if(t != hscript_Token.TComma) {
						this.unexpected(t);
					}
					set = this.getIdent();
					var t1 = this.token();
					if(t1 != hscript_Token.TPClose) {
						this.unexpected(t1);
					}
				}
				var type = this.maybe(hscript_Token.TDoubleDot) ? this.parseType() : null;
				var expr = this.maybe(hscript_Token.TOp("=")) ? this.parseExpr() : null;
				if(expr != null) {
					if(this.isBlock(expr)) {
						this.maybe(hscript_Token.TSemicolon);
					} else {
						var t2 = this.token();
						if(t2 != hscript_Token.TSemicolon) {
							this.unexpected(t2);
						}
					}
				} else {
					var tmp;
					if(type != null) {
						if(type == null) {
							tmp = false;
						} else if(type._hx_index == 2) {
							var _g = type.fields;
							tmp = true;
						} else {
							tmp = false;
						}
					} else {
						tmp = false;
					}
					if(tmp) {
						this.maybe(hscript_Token.TSemicolon);
					} else {
						var t3 = this.token();
						if(t3 != hscript_Token.TSemicolon) {
							this.unexpected(t3);
						}
					}
				}
				return { name : name1, meta : meta, access : access, kind : hscript_FieldKind.KVar({ get : get, set : set, type : type, expr : expr})};
			default:
				this.unexpected(hscript_Token.TId(id));
				break _hx_loop1;
			}
		}
		return null;
	}
	,readChar: function() {
		return this.input.charCodeAt(this.readPos++);
	}
	,readString: function(until) {
		var c = 0;
		var b_b = "";
		var esc = false;
		var old = this.line;
		var s = this.input;
		while(true) {
			var c = this.input.charCodeAt(this.readPos++);
			if(c != c) {
				this.line = old;
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(hscript_Error.EUnterminatedString);
				}
				break;
			}
			if(esc) {
				esc = false;
				switch(c) {
				case 34:case 39:case 92:
					b_b += String.fromCodePoint(c);
					break;
				case 47:
					if(this.allowJSON) {
						b_b += String.fromCodePoint(c);
					} else {
						this.invalidChar(c);
					}
					break;
				case 110:
					b_b += String.fromCodePoint(10);
					break;
				case 114:
					b_b += String.fromCodePoint(13);
					break;
				case 116:
					b_b += String.fromCodePoint(9);
					break;
				case 117:
					if(!this.allowJSON) {
						this.invalidChar(c);
					}
					var k = 0;
					var _g = 0;
					while(_g < 4) {
						var i = _g++;
						k <<= 4;
						var char = this.input.charCodeAt(this.readPos++);
						switch(char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							k += char - 48;
							break;
						case 65:case 66:case 67:case 68:case 69:case 70:
							k += char - 55;
							break;
						case 97:case 98:case 99:case 100:case 101:case 102:
							k += char - 87;
							break;
						default:
							if(char != char) {
								this.line = old;
								if(!this.resumeErrors) {
									throw haxe_Exception.thrown(hscript_Error.EUnterminatedString);
								}
							}
							this.invalidChar(char);
						}
					}
					b_b += String.fromCodePoint(k);
					break;
				default:
					this.invalidChar(c);
				}
			} else if(c == 92) {
				esc = true;
			} else if(c == until) {
				break;
			} else {
				if(c == 10) {
					this.line++;
				}
				b_b += String.fromCodePoint(c);
			}
		}
		return b_b;
	}
	,token: function() {
		if(this.tokens.head != null) {
			var _this = this.tokens;
			var k = _this.head;
			if(k == null) {
				return null;
			} else {
				_this.head = k.next;
				return k.elt;
			}
		}
		var char;
		if(this.char < 0) {
			char = this.input.charCodeAt(this.readPos++);
		} else {
			char = this.char;
			this.char = -1;
		}
		while(true) {
			if(char != char) {
				this.char = char;
				return hscript_Token.TEof;
			}
			switch(char) {
			case 0:
				return hscript_Token.TEof;
			case 10:
				this.line++;
				break;
			case 9:case 13:case 32:
				break;
			case 35:
				char = this.input.charCodeAt(this.readPos++);
				if(this.idents[char]) {
					var id = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(!this.idents[char]) {
							this.char = char;
							return this.preprocess(id);
						}
						id += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
				break;
			case 34:case 39:
				return hscript_Token.TConst(hscript_Const.CString(this.readString(char)));
			case 40:
				return hscript_Token.TPOpen;
			case 41:
				return hscript_Token.TPClose;
			case 44:
				return hscript_Token.TComma;
			case 46:
				char = this.input.charCodeAt(this.readPos++);
				switch(char) {
				case 46:
					char = this.input.charCodeAt(this.readPos++);
					if(char != 46) {
						this.invalidChar(char);
					}
					return hscript_Token.TOp("...");
				case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					var n = char - 48;
					var exp = 1;
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						exp *= 10;
						switch(char) {
						case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
							n = n * 10 + (char - 48);
							break;
						default:
							this.char = char;
							return hscript_Token.TConst(hscript_Const.CFloat(n / exp));
						}
					}
					break;
				default:
					this.char = char;
					return hscript_Token.TDot;
				}
				break;
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				var n1 = (char - 48) * 1.0;
				var exp1 = 0.;
				while(true) {
					char = this.input.charCodeAt(this.readPos++);
					exp1 *= 10;
					switch(char) {
					case 46:
						if(exp1 > 0) {
							if(exp1 == 10 && this.input.charCodeAt(this.readPos++) == 46) {
								var _this = this.tokens;
								_this.head = new haxe_ds_GenericCell(hscript_Token.TOp("..."),_this.head);
								var i = n1 | 0;
								return hscript_Token.TConst(i == n1 ? hscript_Const.CInt(i) : hscript_Const.CFloat(n1));
							}
							this.invalidChar(char);
						}
						exp1 = 1.;
						break;
					case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
						n1 = n1 * 10 + (char - 48);
						break;
					case 69:case 101:
						var tk = this.token();
						var pow = null;
						if(tk == null) {
							var _this1 = this.tokens;
							_this1.head = new haxe_ds_GenericCell(tk,_this1.head);
						} else {
							switch(tk._hx_index) {
							case 1:
								var _g = tk.c;
								if(_g._hx_index == 0) {
									var e = _g.v;
									pow = e;
								} else {
									var _this2 = this.tokens;
									_this2.head = new haxe_ds_GenericCell(tk,_this2.head);
								}
								break;
							case 3:
								if(tk.s == "-") {
									tk = this.token();
									if(tk == null) {
										var _this3 = this.tokens;
										_this3.head = new haxe_ds_GenericCell(tk,_this3.head);
									} else if(tk._hx_index == 1) {
										var _g1 = tk.c;
										if(_g1._hx_index == 0) {
											var e1 = _g1.v;
											pow = -e1;
										} else {
											var _this4 = this.tokens;
											_this4.head = new haxe_ds_GenericCell(tk,_this4.head);
										}
									} else {
										var _this5 = this.tokens;
										_this5.head = new haxe_ds_GenericCell(tk,_this5.head);
									}
								} else {
									var _this6 = this.tokens;
									_this6.head = new haxe_ds_GenericCell(tk,_this6.head);
								}
								break;
							default:
								var _this7 = this.tokens;
								_this7.head = new haxe_ds_GenericCell(tk,_this7.head);
							}
						}
						if(pow == null) {
							this.invalidChar(char);
						}
						return hscript_Token.TConst(hscript_Const.CFloat(Math.pow(10,pow) / exp1 * n1 * 10));
					case 120:
						if(n1 > 0 || exp1 > 0) {
							this.invalidChar(char);
						}
						var n2 = 0;
						while(true) {
							char = this.input.charCodeAt(this.readPos++);
							switch(char) {
							case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
								n2 = (n2 << 4) + char - 48;
								break;
							case 65:case 66:case 67:case 68:case 69:case 70:
								n2 = (n2 << 4) + (char - 55);
								break;
							case 97:case 98:case 99:case 100:case 101:case 102:
								n2 = (n2 << 4) + (char - 87);
								break;
							default:
								this.char = char;
								return hscript_Token.TConst(hscript_Const.CInt(n2));
							}
						}
						break;
					default:
						this.char = char;
						var i1 = n1 | 0;
						return hscript_Token.TConst(exp1 > 0 ? hscript_Const.CFloat(n1 * 10 / exp1) : i1 == n1 ? hscript_Const.CInt(i1) : hscript_Const.CFloat(n1));
					}
				}
				break;
			case 58:
				return hscript_Token.TDoubleDot;
			case 59:
				return hscript_Token.TSemicolon;
			case 61:
				char = this.input.charCodeAt(this.readPos++);
				if(char == 61) {
					return hscript_Token.TOp("==");
				} else if(char == 62) {
					return hscript_Token.TOp("=>");
				}
				this.char = char;
				return hscript_Token.TOp("=");
			case 63:
				return hscript_Token.TQuestion;
			case 64:
				char = this.input.charCodeAt(this.readPos++);
				if(this.idents[char] || char == 58) {
					var id1 = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(!this.idents[char]) {
							this.char = char;
							return hscript_Token.TMeta(id1);
						}
						id1 += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
				break;
			case 91:
				return hscript_Token.TBkOpen;
			case 93:
				return hscript_Token.TBkClose;
			case 123:
				return hscript_Token.TBrOpen;
			case 125:
				return hscript_Token.TBrClose;
			default:
				if(this.ops[char]) {
					var op = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(char != char) {
							char = 0;
						}
						if(!this.ops[char]) {
							this.char = char;
							return hscript_Token.TOp(op);
						}
						var pop = op;
						op += String.fromCodePoint(char);
						if(!Object.prototype.hasOwnProperty.call(this.opPriority.h,op) && Object.prototype.hasOwnProperty.call(this.opPriority.h,pop)) {
							if(op == "//" || op == "/*") {
								return this.tokenComment(op,char);
							}
							this.char = char;
							return hscript_Token.TOp(pop);
						}
					}
				}
				if(this.idents[char]) {
					var id2 = String.fromCodePoint(char);
					while(true) {
						char = this.input.charCodeAt(this.readPos++);
						if(char != char) {
							char = 0;
						}
						if(!this.idents[char]) {
							this.char = char;
							return hscript_Token.TId(id2);
						}
						id2 += String.fromCodePoint(char);
					}
				}
				this.invalidChar(char);
			}
			char = this.input.charCodeAt(this.readPos++);
		}
	}
	,preprocValue: function(id) {
		return this.preprocesorValues.h[id];
	}
	,preprocStack: null
	,parsePreproCond: function() {
		var tk = this.token();
		if(tk == null) {
			return this.unexpected(tk);
		} else {
			switch(tk._hx_index) {
			case 2:
				var id = tk.s;
				return hscript_Expr.EIdent(id);
			case 3:
				if(tk.s == "!") {
					return hscript_Expr.EUnop("!",true,this.parsePreproCond());
				} else {
					return this.unexpected(tk);
				}
				break;
			case 4:
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(hscript_Token.TPOpen,_this.head);
				return this.parseExpr();
			default:
				return this.unexpected(tk);
			}
		}
	}
	,evalPreproCond: function(e) {
		switch(e._hx_index) {
		case 1:
			var id = e.v;
			return this.preprocValue(id) != null;
		case 3:
			var e1 = e.e;
			return this.evalPreproCond(e1);
		case 6:
			var _g = e.e1;
			var _g1 = e.e2;
			switch(e.op) {
			case "&&":
				var e1 = _g;
				var e2 = _g1;
				if(this.evalPreproCond(e1)) {
					return this.evalPreproCond(e2);
				} else {
					return false;
				}
				break;
			case "||":
				var e1 = _g;
				var e2 = _g1;
				if(!this.evalPreproCond(e1)) {
					return this.evalPreproCond(e2);
				} else {
					return true;
				}
				break;
			default:
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(hscript_Error.EInvalidPreprocessor("Can't eval " + $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name));
				}
				return false;
			}
			break;
		case 7:
			var _g = e.prefix;
			if(e.op == "!") {
				var e1 = e.e;
				return !this.evalPreproCond(e1);
			} else {
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(hscript_Error.EInvalidPreprocessor("Can't eval " + $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name));
				}
				return false;
			}
			break;
		default:
			if(!this.resumeErrors) {
				throw haxe_Exception.thrown(hscript_Error.EInvalidPreprocessor("Can't eval " + $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name));
			}
			return false;
		}
	}
	,preprocess: function(id) {
		switch(id) {
		case "else":case "elseif":
			if(this.preprocStack.length > 0) {
				if(this.preprocStack[this.preprocStack.length - 1].r) {
					this.preprocStack[this.preprocStack.length - 1].r = false;
					this.skipTokens();
					return this.token();
				} else if(id == "else") {
					this.preprocStack.pop();
					this.preprocStack.push({ r : true});
					return this.token();
				} else {
					this.preprocStack.pop();
					return this.preprocess("if");
				}
			} else {
				return hscript_Token.TPrepro(id);
			}
			break;
		case "end":
			if(this.preprocStack.length > 0) {
				this.preprocStack.pop();
				return this.token();
			} else {
				return hscript_Token.TPrepro(id);
			}
			break;
		case "if":
			var e = this.parsePreproCond();
			if(this.evalPreproCond(e)) {
				this.preprocStack.push({ r : true});
				return this.token();
			}
			this.preprocStack.push({ r : false});
			this.skipTokens();
			return this.token();
		default:
			return hscript_Token.TPrepro(id);
		}
	}
	,skipTokens: function() {
		var spos = this.preprocStack.length - 1;
		var obj = this.preprocStack[spos];
		var pos = this.readPos;
		while(true) {
			var tk = this.token();
			if(tk == hscript_Token.TEof) {
				if(!this.resumeErrors) {
					throw haxe_Exception.thrown(hscript_Error.EInvalidPreprocessor("Unclosed"));
				}
			}
			if(this.preprocStack[spos] != obj) {
				var _this = this.tokens;
				_this.head = new haxe_ds_GenericCell(tk,_this.head);
				break;
			}
		}
	}
	,tokenComment: function(op,char) {
		var c = HxOverrides.cca(op,1);
		var s = this.input;
		if(c == 47) {
			while(char != 13 && char != 10) {
				char = this.input.charCodeAt(this.readPos++);
				if(char != char) {
					break;
				}
			}
			this.char = char;
			return this.token();
		}
		if(c == 42) {
			var old = this.line;
			if(op == "/**/") {
				this.char = char;
				return this.token();
			}
			while(true) {
				while(char != 42) {
					if(char == 10) {
						this.line++;
					}
					char = this.input.charCodeAt(this.readPos++);
					if(char != char) {
						this.line = old;
						if(!this.resumeErrors) {
							throw haxe_Exception.thrown(hscript_Error.EUnterminatedComment);
						}
						break;
					}
				}
				char = this.input.charCodeAt(this.readPos++);
				if(char != char) {
					this.line = old;
					if(!this.resumeErrors) {
						throw haxe_Exception.thrown(hscript_Error.EUnterminatedComment);
					}
					break;
				}
				if(char == 47) {
					break;
				}
			}
			return this.token();
		}
		this.char = char;
		return hscript_Token.TOp(op);
	}
	,constString: function(c) {
		switch(c._hx_index) {
		case 0:
			var v = c.v;
			if(v == null) {
				return "null";
			} else {
				return "" + v;
			}
			break;
		case 1:
			var f = c.f;
			if(f == null) {
				return "null";
			} else {
				return "" + f;
			}
			break;
		case 2:
			var s = c.s;
			return s;
		}
	}
	,tokenString: function(t) {
		switch(t._hx_index) {
		case 0:
			return "<eof>";
		case 1:
			var c = t.c;
			return this.constString(c);
		case 2:
			var s = t.s;
			return s;
		case 3:
			var s = t.s;
			return s;
		case 4:
			return "(";
		case 5:
			return ")";
		case 6:
			return "{";
		case 7:
			return "}";
		case 8:
			return ".";
		case 9:
			return ",";
		case 10:
			return ";";
		case 11:
			return "[";
		case 12:
			return "]";
		case 13:
			return "?";
		case 14:
			return ":";
		case 15:
			var id = t.s;
			return "@" + id;
		case 16:
			var id = t.s;
			return "#" + id;
		}
	}
	,__class__: hscript_Parser
};
var hscript_Tools = function() { };
$hxClasses["hscript.Tools"] = hscript_Tools;
hscript_Tools.__name__ = "hscript.Tools";
hscript_Tools.iter = function(e,f) {
	switch(e._hx_index) {
	case 0:
		var _g = e.c;
		break;
	case 1:
		var _g = e.v;
		break;
	case 2:
		var _g = e.n;
		var _g = e.t;
		var e1 = e.e;
		if(e1 != null) {
			f(e1);
		}
		break;
	case 3:
		var e1 = e.e;
		f(e1);
		break;
	case 4:
		var el = e.e;
		var _g = 0;
		while(_g < el.length) {
			var e1 = el[_g];
			++_g;
			f(e1);
		}
		break;
	case 5:
		var _g = e.f;
		var e1 = e.e;
		f(e1);
		break;
	case 6:
		var _g = e.op;
		var e1 = e.e1;
		var e2 = e.e2;
		f(e1);
		f(e2);
		break;
	case 7:
		var _g = e.op;
		var _g = e.prefix;
		var e1 = e.e;
		f(e1);
		break;
	case 8:
		var e1 = e.e;
		var args = e.params;
		f(e1);
		var _g = 0;
		while(_g < args.length) {
			var a = args[_g];
			++_g;
			f(a);
		}
		break;
	case 9:
		var c = e.cond;
		var e1 = e.e1;
		var e2 = e.e2;
		f(c);
		f(e1);
		if(e2 != null) {
			f(e2);
		}
		break;
	case 10:
		var c = e.cond;
		var e1 = e.e;
		f(c);
		f(e1);
		break;
	case 11:
		var _g = e.v;
		var it = e.it;
		var e1 = e.e;
		f(it);
		f(e1);
		break;
	case 12:case 13:
		break;
	case 14:
		var _g = e.args;
		var _g = e.name;
		var _g = e.ret;
		var e1 = e.e;
		f(e1);
		break;
	case 15:
		var e1 = e.e;
		if(e1 != null) {
			f(e1);
		}
		break;
	case 16:
		var e1 = e.e;
		var i = e.index;
		f(e1);
		f(i);
		break;
	case 17:
		var el = e.e;
		var _g = 0;
		while(_g < el.length) {
			var e1 = el[_g];
			++_g;
			f(e1);
		}
		break;
	case 18:
		var _g = e.cl;
		var el = e.params;
		var _g = 0;
		while(_g < el.length) {
			var e1 = el[_g];
			++_g;
			f(e1);
		}
		break;
	case 19:
		var e1 = e.e;
		f(e1);
		break;
	case 20:
		var _g = e.v;
		var _g = e.t;
		var e1 = e.e;
		var c = e.ecatch;
		f(e1);
		f(c);
		break;
	case 21:
		var fl = e.fl;
		var _g = 0;
		while(_g < fl.length) {
			var fi = fl[_g];
			++_g;
			f(fi.e);
		}
		break;
	case 22:
		var c = e.cond;
		var e1 = e.e1;
		var e2 = e.e2;
		f(c);
		f(e1);
		f(e2);
		break;
	case 23:
		var e1 = e.e;
		var cases = e.cases;
		var def = e.defaultExpr;
		f(e1);
		var _g = 0;
		while(_g < cases.length) {
			var c = cases[_g];
			++_g;
			var _g1 = 0;
			var _g2 = c.values;
			while(_g1 < _g2.length) {
				var v = _g2[_g1];
				++_g1;
				f(v);
			}
			f(c.expr);
		}
		if(def != null) {
			f(def);
		}
		break;
	case 24:
		var c = e.cond;
		var e1 = e.e;
		f(c);
		f(e1);
		break;
	case 25:
		var name = e.name;
		var args = e.args;
		var e1 = e.e;
		if(args != null) {
			var _g = 0;
			while(_g < args.length) {
				var a = args[_g];
				++_g;
				f(a);
			}
		}
		f(e1);
		break;
	case 26:
		var _g = e.t;
		var e1 = e.e;
		f(e1);
		break;
	}
};
hscript_Tools.map = function(e,f) {
	var edef;
	switch(e._hx_index) {
	case 0:
		var _g = e.c;
		edef = e;
		break;
	case 1:
		var _g = e.v;
		edef = e;
		break;
	case 2:
		var n = e.n;
		var t = e.t;
		var e1 = e.e;
		edef = hscript_Expr.EVar(n,t,e1 != null ? f(e1) : null);
		break;
	case 3:
		var e1 = e.e;
		edef = hscript_Expr.EParent(f(e1));
		break;
	case 4:
		var el = e.e;
		var _g = [];
		var _g1 = 0;
		while(_g1 < el.length) {
			var e1 = el[_g1];
			++_g1;
			_g.push(f(e1));
		}
		edef = hscript_Expr.EBlock(_g);
		break;
	case 5:
		var e1 = e.e;
		var fi = e.f;
		edef = hscript_Expr.EField(f(e1),fi);
		break;
	case 6:
		var op = e.op;
		var e1 = e.e1;
		var e2 = e.e2;
		edef = hscript_Expr.EBinop(op,f(e1),f(e2));
		break;
	case 7:
		var op = e.op;
		var pre = e.prefix;
		var e1 = e.e;
		edef = hscript_Expr.EUnop(op,pre,f(e1));
		break;
	case 8:
		var e1 = e.e;
		var args = e.params;
		var edef1 = f(e1);
		var _g = [];
		var _g1 = 0;
		while(_g1 < args.length) {
			var a = args[_g1];
			++_g1;
			_g.push(f(a));
		}
		edef = hscript_Expr.ECall(edef1,_g);
		break;
	case 9:
		var c = e.cond;
		var e1 = e.e1;
		var e2 = e.e2;
		edef = hscript_Expr.EIf(f(c),f(e1),e2 != null ? f(e2) : null);
		break;
	case 10:
		var c = e.cond;
		var e1 = e.e;
		edef = hscript_Expr.EWhile(f(c),f(e1));
		break;
	case 11:
		var v = e.v;
		var it = e.it;
		var e1 = e.e;
		edef = hscript_Expr.EFor(v,f(it),f(e1));
		break;
	case 12:case 13:
		edef = e;
		break;
	case 14:
		var args = e.args;
		var e1 = e.e;
		var name = e.name;
		var t = e.ret;
		edef = hscript_Expr.EFunction(args,f(e1),name,t);
		break;
	case 15:
		var e1 = e.e;
		edef = hscript_Expr.EReturn(e1 != null ? f(e1) : null);
		break;
	case 16:
		var e1 = e.e;
		var i = e.index;
		edef = hscript_Expr.EArray(f(e1),f(i));
		break;
	case 17:
		var el = e.e;
		var _g = [];
		var _g1 = 0;
		while(_g1 < el.length) {
			var e1 = el[_g1];
			++_g1;
			_g.push(f(e1));
		}
		edef = hscript_Expr.EArrayDecl(_g);
		break;
	case 18:
		var cl = e.cl;
		var el = e.params;
		var _g = [];
		var _g1 = 0;
		while(_g1 < el.length) {
			var e1 = el[_g1];
			++_g1;
			_g.push(f(e1));
		}
		edef = hscript_Expr.ENew(cl,_g);
		break;
	case 19:
		var e1 = e.e;
		edef = hscript_Expr.EThrow(f(e1));
		break;
	case 20:
		var e1 = e.e;
		var v = e.v;
		var t = e.t;
		var c = e.ecatch;
		edef = hscript_Expr.ETry(f(e1),v,t,f(c));
		break;
	case 21:
		var fl = e.fl;
		var _g = [];
		var _g1 = 0;
		while(_g1 < fl.length) {
			var fi = fl[_g1];
			++_g1;
			_g.push({ name : fi.name, e : f(fi.e)});
		}
		edef = hscript_Expr.EObject(_g);
		break;
	case 22:
		var c = e.cond;
		var e1 = e.e1;
		var e2 = e.e2;
		edef = hscript_Expr.ETernary(f(c),f(e1),f(e2));
		break;
	case 23:
		var e1 = e.e;
		var cases = e.cases;
		var def = e.defaultExpr;
		var edef1 = f(e1);
		var _g = [];
		var _g1 = 0;
		while(_g1 < cases.length) {
			var c = cases[_g1];
			++_g1;
			var _g2 = [];
			var _g3 = 0;
			var _g4 = c.values;
			while(_g3 < _g4.length) {
				var v = _g4[_g3];
				++_g3;
				_g2.push(f(v));
			}
			_g.push({ values : _g2, expr : f(c.expr)});
		}
		edef = hscript_Expr.ESwitch(edef1,_g,def == null ? null : f(def));
		break;
	case 24:
		var c = e.cond;
		var e1 = e.e;
		edef = hscript_Expr.EDoWhile(f(c),f(e1));
		break;
	case 25:
		var name = e.name;
		var args = e.args;
		var e1 = e.e;
		var edef1;
		if(args == null) {
			edef1 = null;
		} else {
			var _g = [];
			var _g1 = 0;
			while(_g1 < args.length) {
				var a = args[_g1];
				++_g1;
				_g.push(f(a));
			}
			edef1 = _g;
		}
		edef = hscript_Expr.EMeta(name,edef1,f(e1));
		break;
	case 26:
		var e1 = e.e;
		var t = e.t;
		edef = hscript_Expr.ECheckType(f(e1),t);
		break;
	}
	return edef;
};
hscript_Tools.expr = function(e) {
	return e;
};
hscript_Tools.mk = function(e,p) {
	return e;
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
haxe_ui_core_ComponentEvents.INTERACTIVE_EVENTS = ["mousemove","mouseover","mouseout","mousedown","mouseup","mousewheel","click","doubleclick","keydown","keyup"];
haxe_ui_core_ComponentBounds.__meta__ = { fields : { percentWidth : { clonable : null, bindable : null}, percentHeight : { clonable : null, bindable : null}, width : { bindable : null}, height : { bindable : null}}};
haxe_ui_backend_ComponentImpl.elementToComponent = new haxe_ds_ObjectMap();
haxe_ui_backend_ComponentImpl._stylesAdded = false;
haxe_ui_core_Component.__meta__ = { fields : { styleNames : { clonable : null}, styleString : { clonable : null}}};
haxe_Unserializer.DEFAULT_RESOLVER = new haxe__$Unserializer_DefaultResolver();
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ui_backend_BackendImpl.id = "html5";
haxe_ui_util_GenericConfig.cache = new haxe_ds_StringMap();
haxe_ui_Toolkit.styleSheet = new haxe_ui_styles_CompositeStyleSheet();
haxe_ui_Toolkit.properties = new haxe_ds_StringMap();
haxe_ui_Toolkit.nativeConfig = new haxe_ui_util_GenericConfig();
haxe_ui_Toolkit._theme = "default";
haxe_ui_Toolkit._backendProperties = new haxe_ui_util_Properties();
haxe_ui_Toolkit._built = false;
haxe_ui_Toolkit._backendBuilt = false;
haxe_ui_Toolkit._initialized = false;
haxe_ui_Toolkit.pixelsPerRem = 16;
haxe_ui_Toolkit.roundScale = true;
haxe_ui_Toolkit.autoScale = true;
haxe_ui_Toolkit._scaleX = 0;
haxe_ui_Toolkit._scaleY = 0;
haxe_ui_backend_PlatformBase.KEY_CODE_TAB = 9;
haxe_ui_backend_PlatformBase.KEY_CODE_UP = 38;
haxe_ui_backend_PlatformBase.KEY_CODE_DOWN = 40;
haxe_ui_backend_PlatformBase.KEY_CODE_LEFT = 37;
haxe_ui_backend_PlatformBase.KEY_CODE_RIGHT = 39;
haxe_ui_backend_PlatformBase.KEY_CODE_SPACE = 32;
haxe_ui_backend_PlatformBase.KEY_CODE_ENTER = 13;
haxe_ui_backend_PlatformBase.KEY_CODE_ESCAPE = 27;
haxe_ui_backend_PlatformBase.MOBILE_REGEXP = new EReg("(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino","gi");
haxe_ui_backend_PlatformImpl._vscrollWidth = -1;
haxe_ui_backend_PlatformImpl._hscrollHeight = -1;
haxe_ui_backend_html5_EventMapper.HAXEUI_TO_DOM = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "mousemove";
	_g.h["mouseover"] = "mouseover";
	_g.h["mouseout"] = "mouseout";
	_g.h["mousedown"] = "mousedown";
	_g.h["mouseup"] = "mouseup";
	_g.h["click"] = "click";
	_g.h["doubleclick"] = "dblclick";
	_g.h["rightmousedown"] = "mousedown";
	_g.h["rightmouseup"] = "mouseup";
	_g.h["rightclick"] = "contextmenu";
	_g.h["change"] = "change";
	_g.h["keydown"] = "keydown";
	_g.h["keyup"] = "keyup";
	_g.h["scrollchange"] = "scroll";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.DOM_TO_HAXEUI = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "mousemove";
	_g.h["mouseover"] = "mouseover";
	_g.h["mouseout"] = "mouseout";
	_g.h["mousedown"] = "mousedown";
	_g.h["mouseup"] = "mouseup";
	_g.h["touchmove"] = "mousemove";
	_g.h["touchstart"] = "mousedown";
	_g.h["touchend"] = "mouseup";
	_g.h["click"] = "click";
	_g.h["contextmenu"] = "rightclick";
	_g.h["dblclick"] = "doubleclick";
	_g.h["change"] = "change";
	_g.h["keydown"] = "keydown";
	_g.h["keyup"] = "keyup";
	_g.h["scroll"] = "scrollchange";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.MOUSE_TO_TOUCH = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["mousemove"] = "touchmove";
	_g.h["mousedown"] = "touchstart";
	_g.h["mouseup"] = "touchend";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_EventMapper.TOUCH_TO_MOUSE = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["touchmove"] = "mousemove";
	_g.h["touchstart"] = "mouseout";
	_g.h["touchend"] = "mousedown";
	$r = _g;
	return $r;
}(this));
haxe_ui_backend_html5_HtmlUtils._divHelpers = new haxe_ds_ObjectMap();
haxe_ui_backend_html5_HtmlUtils._divHelpersId = new haxe_ds_StringMap();
haxe_ui_backend_html5_HtmlUtils._dpi = 0;
haxe_ui_backend_html5_util_FontDetect._initialized = false;
haxe_ui_backend_html5_util_FontDetect._aFallbackFonts = ["serif","sans-serif","monospace","cursive","fantasy"];
haxe_ui_core_ItemRenderer.__meta__ = { fields : { allowHover : { clonable : null}}};
haxe_ui_core_Platform.METRIC_VSCROLL_WIDTH = "patform.metrics.vscroll.width";
haxe_ui_core_Platform.METRIC_HSCROLL_HEIGHT = "patform.metrics.hscroll.height";
haxe_ui_events_UIEvent.READY = "ready";
haxe_ui_events_UIEvent.DESTROY = "destroy";
haxe_ui_events_UIEvent.RESIZE = "resize";
haxe_ui_events_UIEvent.CHANGE = "change";
haxe_ui_events_UIEvent.BEFORE_CHANGE = "beforechange";
haxe_ui_events_UIEvent.MOVE = "move";
haxe_ui_events_UIEvent.INITIALIZE = "initialize";
haxe_ui_events_UIEvent.RENDERER_CREATED = "renderercreated";
haxe_ui_events_UIEvent.RENDERER_DESTROYED = "rendererdestroyed";
haxe_ui_events_UIEvent.HIDDEN = "hidden";
haxe_ui_events_UIEvent.SHOWN = "shown";
haxe_ui_events_UIEvent.ENABLED = "enabled";
haxe_ui_events_UIEvent.DISABLED = "disabled";
haxe_ui_events_UIEvent.BEFORE_CLOSE = "beforeclose";
haxe_ui_events_UIEvent.CLOSE = "close";
haxe_ui_events_UIEvent.PROPERTY_CHANGE = "propertychange";
haxe_ui_events_UIEvent.COMPONENT_ADDED = "componentadded";
haxe_ui_events_UIEvent.COMPONENT_REMOVED = "componentremoved";
haxe_ui_events_UIEvent.COMPONENT_ADDED_TO_PARENT = "componentaddedtoparent";
haxe_ui_events_UIEvent.COMPONENT_REMOVED_FROM_PARENT = "componentremovedfromparent";
haxe_ui_events_ActionEvent.ACTION_START = "actionstart";
haxe_ui_events_ActionEvent.ACTION_END = "actionend";
haxe_ui_events_AnimationEvent.START = "animationstart";
haxe_ui_events_AnimationEvent.END = "animationend";
haxe_ui_events_AnimationEvent.FRAME = "animationframe";
haxe_ui_events_DragEvent.DRAG_START = "dragstart";
haxe_ui_events_DragEvent.DRAG = "drag";
haxe_ui_events_DragEvent.DRAG_END = "dragend";
haxe_ui_events_FocusEvent.FOCUS_IN = "focusin";
haxe_ui_events_FocusEvent.FOCUS_OUT = "focusout";
haxe_ui_events_ItemEvent.COMPONENT_EVENT = "itemcomponentevent";
haxe_ui_events_KeyboardEvent.KEY_DOWN = "keydown";
haxe_ui_events_KeyboardEvent.KEY_PRESS = "keypress";
haxe_ui_events_KeyboardEvent.KEY_UP = "keyup";
haxe_ui_events_MouseEvent.MOUSE_MOVE = "mousemove";
haxe_ui_events_MouseEvent.MOUSE_OVER = "mouseover";
haxe_ui_events_MouseEvent.MOUSE_OUT = "mouseout";
haxe_ui_events_MouseEvent.MOUSE_DOWN = "mousedown";
haxe_ui_events_MouseEvent.MOUSE_UP = "mouseup";
haxe_ui_events_MouseEvent.MOUSE_WHEEL = "mousewheel";
haxe_ui_events_MouseEvent.CLICK = "click";
haxe_ui_events_MouseEvent.DBL_CLICK = "doubleclick";
haxe_ui_events_MouseEvent.RIGHT_CLICK = "rightclick";
haxe_ui_events_MouseEvent.RIGHT_MOUSE_DOWN = "rightmousedown";
haxe_ui_events_MouseEvent.RIGHT_MOUSE_UP = "rightmouseup";
haxe_ui_events_ScrollEvent.CHANGE = "scrollchange";
haxe_ui_events_ScrollEvent.START = "scrollstart";
haxe_ui_events_ScrollEvent.STOP = "scrollstop";
haxe_ui_events_ScrollEvent.SCROLL = "scrollscroll";
haxe_ui_events_ThemeEvent.THEME_CHANGED = "themechanged";
haxe_ui_events_ValidationEvent.START = "validationstart";
haxe_ui_events_ValidationEvent.STOP = "validationstop";
haxe_ui_locale_LocaleEvent.LOCALE_CHANGED = "localeChanged";
haxe_ui_locale_LocaleManager._registeredComponents = new haxe_ds_ObjectMap();
haxe_ui_styles_Parser.cssKeyframesRegex = new EReg("@keyframes\\s*(\\w+?)\\s*\\{([\\s\\S]*?\\}\\s*?)\\}","gi");
haxe_ui_styles_Parser.cssKeyframeSelectorRegex = new EReg("([\\w%]+)\\s*\\{\\s*([\\s\\S]*?)\\s*\\}","gi");
haxe_ui_styles_Parser.combinedCSSMediaRegex = new EReg("((\\s*?(?:/\\*[\\s\\S]*?\\*/)?\\s*?@media[\\s\\S]*?)\\{([\\s\\S]*?)\\}\\s*?\\})|(([\\s\\S]*?)\\{([\\s\\S]*?)\\})","gi");
haxe_ui_styles_Parser.cssCommentsRegex = new EReg("(/\\*[\\s\\S]*?\\*/)","gi");
haxe_ui_styles_Parser.cssImportStatementRegex = new EReg("@import .*?;","gi");
haxe_ui_styles_Parser.newlineRegex = new EReg("\n+","g");
haxe_ui_styles_ValueTools.timeEReg = new EReg("^(-?\\d+(?:\\.\\d+)?)(s|ms)$","gi");
haxe_ui_styles_ValueTools.colors = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	_g.h["black"] = 0;
	_g.h["red"] = 16711680;
	_g.h["lime"] = 65280;
	_g.h["blue"] = 255;
	_g.h["white"] = 16777215;
	_g.h["aqua"] = 65535;
	_g.h["fuchsia"] = 16711935;
	_g.h["yellow"] = 16776960;
	_g.h["maroon"] = 8388608;
	_g.h["green"] = 32768;
	_g.h["navy"] = 128;
	_g.h["olive"] = 8421376;
	_g.h["purple"] = 8388736;
	_g.h["teal"] = 32896;
	_g.h["silver"] = 12632256;
	_g.h["gray"] = 8421504;
	_g.h["grey"] = 8421504;
	$r = _g;
	return $r;
}(this));
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DURATION = 0;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DELAY = 0;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_ITERATION_COUNT = 1;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_EASING_FUNCTION = haxe_ui_styles_EasingFunction.EASE;
haxe_ui_styles_animation_AnimationOptions.DEFAULT_DIRECTION = "normal";
haxe_ui_styles_animation_AnimationOptions.DEFAULT_FILL_MODE = "forwards";
haxe_ui_themes_Theme.DEFAULT = "default";
haxe_ui_themes_Theme.DARK = "dark";
haxe_ui_tooltips_ToolTipManager.defaultDelay = 500;
haxe_ui_tooltips_ToolTipManager.fade = true;
haxe_ui_util_MathUtil.MAX_INT = 2147483647;
haxe_ui_util_MathUtil.MIN_INT = -2147483648;
haxe_ui_util_StyleUtil.style2ComponentEReg = new EReg("-(\\w)","g");
haxe_ui_util_StyleUtil.component2StyleEReg = new EReg("([A-Z])","g");
hscript_Parser.p1 = 0;
hscript_Parser.tokenMin = 0;
hscript_Parser.tokenMax = 0;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);