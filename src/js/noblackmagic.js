(function(){
	
	var body = document.querySelector('body');
	var sidebar = document.querySelector('#side');
	var handler = document.querySelector('#handler');
	
	var x0 = null;
	var delta = null;
	var sideWidth = null;
	
	handler.addEventListener('click', function(e) {
		toggleBody();
	});
	
	handler.addEventListener('touchstart', function(e) {
		e.preventDefault();
		if (handler.offsetWidth === handler.offsetHeight) {return;}
		
		x0 = e.touches[0].clientX;
		sideWidth = side.offsetWidth;
		
		stopTransitions(handler);
		stopTransitions(side);
	});
	
	handler.addEventListener('touchmove', function(e) {
		e.preventDefault();
		if (handler.offsetWidth === handler.offsetHeight) {return;}
		
		
		delta = e.touches[0].clientX - x0;
		
		if (!body.hasClass('side-open') && delta > 0 && delta < side.offsetWidth) {
			handler.translateX(delta);
			side.translateX(delta);
			
		} else if (body.hasClass('side-open') && delta < 0) {
			handler.translateX(sideWidth + delta);
			side.translateX(sideWidth + delta);
			
		}
	});
	
	handler.addEventListener('touchend', function(e) {
		e.preventDefault();
		if (handler.offsetWidth === handler.offsetHeight) {
			toggleBody();
			return;
		}
		
		resetTransitions(handler);
		resetTransitions(side);
		
		if (Math.abs(delta) > sideWidth / 3) {
			if (!body.hasClass('side-open')) {
				handler.translateX(sideWidth);
				side.translateX(sideWidth);
				
			} else {
				handler.unsetTransform();
				side.unsetTransform();
				
			}
			
			toggleBody();
			
		} else {
			if (!body.hasClass('side-open')) {
				handler.unsetTransform();
				side.unsetTransform();
				
			} else {
				handler.translateX(sideWidth);
				side.translateX(sideWidth);
				
			}
			
		}
	});
	
	
	
	
	
	function toggleBody() {
		body.toggleClass('side-open');
	}
	
	function stopTransitions(el) {
		el.addClass('notransition');
	}
	
	function resetTransitions(el) {
		el.removeClass('notransition');
	}
	
	
	
	
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
	
	Element.prototype.unsetTransform = function() {
		this.style.WebkitTransform = 'none';
		this.style.MsTransform = 'none';
		this.style.transform = 'none';
	};
	
	
})();