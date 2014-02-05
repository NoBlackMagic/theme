(function($){
	
	$('#handler').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').toggleClass('side-open');
    });
	
})(jQuery);