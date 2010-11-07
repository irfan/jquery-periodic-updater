/* jQuery Periodic Updater
 * 
 * @Author
 * Copyright Nov 03 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.1 Beta
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * See the README file or visit the plugin page.
 * http://irfandurmus.com/projects/jquery-periodic-updater
 *
 */

;(function($){
	// global variables
	doc = $(document);
	
	$.fn.updater = function(userOpts, callback){
		
		// extend options
		var opts = $.extend(true, {}, defaults, userOpts),
			interval = setInterval(actions.init, opts.interval);
		
		// write options, callback and interval method into jquery data
		doc.data('updater', {
			options : opts,			// save the options 
			callback : callback,	// save the callback function
			interval : interval,	// save the interval to data
			isActive : true			// avoid double timer
		});
		
		// initialize the plugin
		actions.init();
		
		doc.bind('stop.updater', actions.stop);
		doc.bind('start.updater', actions.reboot);
	};
	
	// action list
	var actions = {
		init: function(){
			
			// if timer true, start the pull
			if (actions.obj().isActive) {
				// get options and callback
				var opts = actions.obj().options,
					callback = actions.obj().callback;
				
				// call pull method
				actions.pull(opts, callback);
			};
		
		},
		
		pull:function(opts, callback){
			// set ajax method
			var ajax = (opts.method === 'post') ? $.post : $.get;
			
			// send post or get request
			ajax(opts.url, opts.data, function(result, text, response){
				callback(result, text, response);
			}, 'html');
		},
		
		stop: function(){
			
			// if timer true clear the timer and set isActive value false
			if (actions.obj().isActive) {
				clearInterval(actions.obj().interval);
			};
			actions.obj().isActive = false;
		},
		
		reboot:function(){
			// if timer false re-initialize the plugin and set isActive value true
			if (!actions.obj().isActive) {
				var opts = actions.obj().options,
					cb = actions.obj().callback;
				$.updater(opts, cb);
			};
			actions.obj().isActive = true;
		},
		
		obj: function(){
			return doc.data('updater');
		},
		debug: function(){
			if (console) {
				console.group();
				console.log('Url: ', actions.obj().options.url);
				console.log('Interval: ', actions.obj().options.interval);
				console.log('Method: ', actions.obj().options.method);
				console.log('Data: ', actions.obj().options.data);
				console.log('Callback: ', actions.obj().callback);
				console.groupEnd();
			};
		}
	}
	
	var defaults = {
		url: undefined,
		data: undefined,
		interval: 3000,
		method: 'post'
	};
	
	// alias for short usage
	$.updater = $.fn.updater;
	$.updater.stop = actions.stop;
	$.updater.start = actions.reboot;
	$.updater.debug = actions.debug;
	
})(jQuery);
