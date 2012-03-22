[jQuery Periodic Updater Plugin](http://irfandurmus.com/projects/jquery-periodic-updater/) 
======================================================================================

How to use 
--------------------------------------

### Include needed files
	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="updater.js"></script>

### Initialize the plugin
	   $.updater({
	      url: 'request.php',
	      interval: 15000
	   });

### Using with callback method 
	$.updater({
		url: 'request.php',
		interval: 15000
	}, function(){
		// body of callback method is here.
	});



