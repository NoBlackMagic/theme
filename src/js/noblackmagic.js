(function(){
	
	var body = document.querySelector('body');
	var handler = document.querySelector('#handler');
	
	
	handler.addEventListener('click', function(e) {
		toggleBody();
	});
	
	
	
	function toggleBody() {
		body.toggleClass('side-open');
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
	
})();