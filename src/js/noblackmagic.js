(function(){
	
	var sidebar = document.querySelector('#side');
	var handler = document.querySelector('#handler');
	
	var x0 = null;
	var delta = null;
	
	handler.addEventListener('click', toggleBody);
	
//	handler.addEventListener('touchstart', function(e) {
//		x0 = e.touches[0].clientX;
//		handler.style.WebkitTransition = 'none';
//	});
//	
//	handler.addEventListener('touchmove', function(e) {
//		delta = e.touches[0].clientX - x0;
//		handler.style.WebkitTransform = 'translateX(' + delta + 'px)';
//		//side.style.WebkitTransform = 'translateX(' + delta + 'px)';
//		
//		//leftPos = side.style.getPropertyCSSValue('-webkit-transform')[0][0].getFloatValue(CSSPrimitiveValue.CSS_PX);
//		//alert(leftPos);
//	});
//	
//	handler.addEventListener('touchend', function(e) {
//		if (delta > 50) {
//			toggleBody();
//		}
//	});
	
	
	
	function toggleBody() {
		var body = document.querySelector('body');
		if (body.className.indexOf('side-open') === -1) {
			body.className += ' side-open';
		} else {
			body.className = body.className.replace(' side-open', '');
		}
	}
	
	
})();