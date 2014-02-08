(function(){
	
	var body = document.querySelector('body');
	var header =  document.querySelector('#sideh');
	
	var x0 = null;
	var delta = null;
	var swipeAction = null;
	

// ----------------------------------------------- //	
// ---[[   D E S K T O P   B E H A V I O R   ]]--- //
// ----------------------------------------------- //
	
	handler.addEventListener('click', function(e) {
		toggleBody();
	});
	
	function toggleBody() {
		body.toggleClass('side-open');
	}
	
	
	
// ------------------------------------------- //
// ---[[   T O U C H   B E H A V I O R   ]]--- //
// ------------------------------------------- //
	
	/**
	 * touch swipe works instead of the click handler
	 * for touch devices
	 */
	
	handler.addEventListener('touchstart', function(e) {
		e.preventDefault();
		
		swipeAction = true;
		x0 = e.touches[0].clientX;
	});
	
	handler.addEventListener('touchmove', function(e) {
		e.preventDefault();
		
		// swipe once
		if (!swipeAction) {
			return;
		}
		
		delta = e.touches[0].clientX - x0;

		// detect swipe in/out
		if (
			( delta > 0 && !body.hasClass('side-open') ) ||
			( delta < 0 && body.hasClass('side-open') )
		) {
			toggleBody();
			swipeAction = false;
		}
	});
	
	handler.addEventListener('touchend', function(e) {
		e.preventDefault();
		
		if (swipeAction) {
			toggleBody();
		}
	});
	
	
	
	
	
	
	
	
// --------------------------------------------- //
// ---[[   U T I L I T Y   M E T H O D S   ]]--- //
// --------------------------------------------- //
	
	
	Element.prototype.hasClass = function(name) {
		return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
	};
	
	Element.prototype.addClass = function(name) {
		if (!this.hasClass(name)) {
		    this.className = this.className ? [this.className, name].join(' ') : name;
		}
	};
	
	Element.prototype.removeClass = function(name) {
		if (this.hasClass(name)) {
		    var c = this.className;
		    this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
		}
	};
	
	Element.prototype.toggleClass = function(name) {
		if (this.hasClass(name)) {
			this.removeClass(name);
		} else {
			this.addClass(name);
		}
	};
	
	
})();