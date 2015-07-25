/*!!
 * Trace <http://github.com/svetli/trace>
 * @author Svetli Nikolov
 * @version 1.0.0 (2013/1/12 11:19 PM)
 * Released under the MIT License
 */

;(function(window) {
	'use strict';

	// local vars ----------------------------------------------------------------------
	var _consoleAvailable 	= typeof console !== 'undefined' ? true : false,
		_traceIsEnabled		= true,
		_displayOnScreen 	= true,
		_onScreenDiv		= null,
		_traceStack 		= [],
		_messages 			= [],
		_onScreenMaxLines 	= 80;

	/**
	 * Hasher
	 * @namespace History Manager for rich-media applications.
	 * @name hasher
	 */
	var Trace = function(msg, args) {

		if ( !_traceIsEnabled ) {
			return;
		}

		var type = '',
			_msg = msg;

		if ( args != null ) {
			try {
				if ( typeof(msg) == 'Function' ) {
					type = args.name.toString() + '();';
				} else {
					type = args.toString();
				}
			} catch (e) {
				try {
					type = args.toString();
				} catch (x) {
					type = 'null';
				}
			}
			_msg = type + '=>' + _msg;
		}

		if ( _displayOnScreen ) {
			if ( !_onScreenDiv ) {
				_onScreenDiv = document.createElement("div");
				_onScreenDiv.style.position = "absolute";
				_onScreenDiv.style.width = "200px";
				_onScreenDiv.style.height = "300px";
				_onScreenDiv.style.overflowY = "scroll";
				_onScreenDiv.style.color = "#00ff00";
				_onScreenDiv.style.padding = "10px";
				_onScreenDiv.style.zIndex = 2E7;
				_onScreenDiv.style.left = "20px";
				_onScreenDiv.style.top = "20px";
				_onScreenDiv.style.fontFamily = "Courier New";
				_onScreenDiv.style.fontSize = "10px";
				_onScreenDiv.style.backgroundColor = "#000000";
				_messages = [];
			}

			_messages.push(_msg);

			if ( _messages.length > _onScreenMaxLines ) {
				_messages.shift();
			}

			_onScreenDiv.innerHTML = _messages.join("<br />");
			document.body.appendChild(_onScreenDiv);
		} else {
			if (_consoleAvailable == true) {
				console.log(_msg);
			}
		}

		_traceStack.push(_msg);
	};

	/**
     * Enable or Disable OnScreen tracing.
     *
     * @param bool enable or disable
     * @type void
     */
	Trace.displayOnScreen = function(mode) {
		_displayOnScreen = mode;
	};

	/**
     * Enable tracing.
     *
     * @type void
     */
	Trace.enable = function() {
		_traceIsEnabled = true;
	};

	/**
     * Disable tracing.
     *
     * @type void
     */
	Trace.disable = function() {
		_traceIsEnabled = false;
	};

	/**
     * Set on screen max lines value. Min is 50.
     *
     * @param int lines to display on screen
     * @type void
     */
	Trace.setOnScreenMaxLines = function(lines) {
		if ( lines > 50 ) {
			_onScreenMaxLines = lines;
		}
	};

	// module export ----------------------------------------------------------------------

	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Trace;
	} else {
		window.trace = Trace;

		if ( typeof define === "function" && define.amd ) {
			define("trace", [], function () { return Trace; } );
		}
	}

}(window));
