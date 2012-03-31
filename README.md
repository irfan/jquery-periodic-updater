[jQuery Periodic Updater Plugin](http://irfandurmus.com/projects/jquery-periodic-updater/) 
======================================================================================
Please check [full documentation](http://irfandurmus.com/projects/jquery-periodic-updater/)
How to use 
--------------------------------------

### Include needed files
	
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
	<script type="text/javascript" src="../src/updater.js"></script>


### Example HTML
    
    &lt;ul id="myList"&gt;
    &lt;/ul&gt;


### Using with basic options
    
    $(function(){                           // Start document ready
        $.updater({                         // Call the plugin
            url: 'request.php',             // Request URL
            data: {userId:1}                // Gonna send to server
        },
        function(result, status, response){   // Callback method..
            $('#myList').append('&lt;li&gt;'+result.name + ' | ' + result.country+'&lt;/li&gt;');
        });
    });


### Default Options
    
    {
        url: undefined,     // request url
        data: undefined,    // what data you want to send with request
        interval: 3000,     // interval per request
        method: 'post',     // method, you can use get or post
        response: 'json'    // response data type, html or json accepted
    }
    </pre>




