(function(){
	
	document.querySelector('#handler').addEventListener('click', function(e) {
		var body = document.querySelector('body');
		if (body.className.indexOf('side-open') === -1) {
			body.className += ' side-open';
		} else {
			body.className = body.className.replace(' side-open', '');
		}
	});
	
})();