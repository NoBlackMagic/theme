(function(){
	
	var body = document.querySelector('body');
	var sidebar = document.querySelector('#side');
	var header =  document.querySelector('#sideh');
	var handler = document.querySelector('#handler');
	
	var x0 = null;
	var delta = null;
	var sideWidth = null;
	

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
	
	handler.addEventListener('touchstart', function(e) {
		e.preventDefault();
		
		// prevent behavior in smartphone view
		if (isSmartphone()) {return;}
		
		x0 = e.touches[0].clientX;
		sideWidth = side.offsetWidth;
		
		stopTransitions(handler);
		stopTransitions(side);
	});
	
	handler.addEventListener('touchmove', function(e) {
		e.preventDefault();
		if (isSmartphone()) {return;}
		
		delta = e.touches[0].clientX - x0;
		
		if (!body.hasClass('side-open') && delta > 0 && delta < side.offsetWidth) {
			handler.translateX(delta);
			side.translateX(0 - sideWidth + delta);
			
		} else if (body.hasClass('side-open') && delta < 0) {
			handler.translateX(sideWidth + delta);
			side.translateX(0 + delta);
			
		}
	});
	
	handler.addEventListener('touchend', function(e) {
		e.preventDefault();
		
		// custom behavior in smartphone view
		if (isSmartphone()) {
			!body.hasClass('side-open') ? openTopbar() : closeTopbar();
			toggleBody();
			return;
		}
		
		resetTransitions(handler);
		resetTransitions(side);
		
		// click on sidebar handler
		if (!delta) {
			!body.hasClass('side-open') ? openSidebar() : closeSidebar();
			toggleBody();
		
		// sidebar complete action
		} else if (Math.abs(delta) > sideWidth / 3) {
			!body.hasClass('side-open') ? openSidebar() : closeSidebar();
			toggleBody();
		
		// reset to initial position
		} else {
			!body.hasClass('side-open') ? closeSidebar() : openSidebar();
			
		}
	});
	
	window.addEventListener('resize', function() {
		isSmartphone() ? closeTopbar() : closeSidebar();
	});
	
	function isSmartphone() {
		return (handler.offsetWidth === handler.offsetHeight);
	}
	
	function stopTransitions(el) {
		el.addClass('notransition');
	}
	
	function resetTransitions(el) {
		el.removeClass('notransition');
	}
	
	function openSidebar() {
		handler.translateX(sideWidth);
		side.translateX(0);
	}
	
	function closeSidebar() {
		handler.translateX(0);
		side.translateX(0 - sideWidth);
	}
	
	function openTopbar() {
		side.translateY(0);
	}
	
	function closeTopbar() {
		side.translateY(0 - sidebar.offsetHeight + header.offsetHeight);
	}
	
	
	
	
	
	
	
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
	
	Element.prototype.translateX = function(val) {
		this.style.WebkitTransform = 'translateX(' + val + 'px)';
		this.style.MsTransform = 'translateX(' + val + 'px)';
		this.style.transform = 'translateX(' + val + 'px)';
	};
	
	Element.prototype.translateY = function(val) {
		this.style.WebkitTransform = 'translateY(' + val + 'px)';
		this.style.MsTransform = 'translateY(' + val + 'px)';
		this.style.transform = 'translateY(' + val + 'px)';
	};
	
	
})();