/* jQuery Periodic Updater
 * 
 * @Author
 * Copyright Nov 03 2010, Irfan Durmus - http://irfandurmus.com/
 *
 * @Version
 * 0.2b
 *
 * @License
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Visit the plugin page for more information.
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
            options : opts,         // save the options 
            callback : callback,    // save the callback function
            interval : interval,    // save the interval to data
            isActive : true,        // avoid double timer,
            lastRequest: {
                result: '',
                status: '',
                text: ''
            }
        });
        
        // initialize the plugin
        actions.init();
        
        doc.bind('stop.updater', actions.stop);
        doc.bind('start.updater', actions.reboot);
        return;
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
            
            return;
        },
        
        setStatus: function(response, result){
            actions.obj().lastRequest.result = result;
            actions.obj().lastRequest.status = response.status;
            actions.obj().lastRequest.text = response.statusText;
            return;
        },
        
        pull:function(opts, callback){
            // set ajax method
            var method = (opts.method === 'post') ? 'POST' : 'GET';
            
            $.ajax({
                url : opts.url,
                data: opts.data,
                type: method,
                dataType: opts.response,
                success: function(obj, result, response){
                    
                    // set last request response with success
                    actions.setStatus(response, result);
                    
                    // call the callback method
                    callback(obj, result, response);
                },
                error: function(response, result){
                    
                    // set last request response with error
                    actions.setStatus(response, result);
                }
            })
            return;
        },
        
        stop: function(){
            
            // if timer true clear the timer and set isActive value false
            if (actions.obj().isActive) {
                clearInterval(actions.obj().interval);
            };
            actions.obj().isActive = false;
            return;
        },
        
        reboot:function(){
            // if timer false re-initialize the plugin and set isActive value true
            if (!actions.obj().isActive) {
                var opts = actions.obj().options,
                    cb = actions.obj().callback;
                $.updater(opts, cb);
            };
            actions.obj().isActive = true;
            return;
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
                console.log('Last Request: ', actions.obj().lastRequest.result, actions.obj().lastRequest.status, actions.obj().lastRequest.text);
                console.log('Requests Continues: ', actions.obj().isActive);
                console.groupEnd();
            };
            return;
        }
    }
    
    var defaults = {
        url: undefined,
        data: undefined,
        method: 'post',
        response: 'json',
        interval: 3000,
    };
    
    // alias for short usage
    $.updater = $.fn.updater;
    $.updater.stop = actions.stop;
    $.updater.start = actions.reboot;
    $.updater.debug = actions.debug;
    
})(jQuery);
