/**
 * @class for Team section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Team = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	//==================================================
	// CONSTANTS
	//==================================================
	windowWidth  = $(window).width() / 2,
	boxWidth     = 196 + (($(window).width > 1220) ? 40 : 0),
	offset       = 98,
	trans        = 'easeInOutBack',
	//==================================================
	// INSTANCE VARS
	//==================================================
	winHeight    = $(window).height(),
	headerHeight = $('#header').height(),
	$actualBox   = null,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks = {
		
	};
	
	function initialize() {
		initMenu();	
		showContent(subpage);
	}
	
	function initMenu() {
		$('#team ul').css({
			'top'  : $('.main').height() * .5 - 150,
			'left' : 0
		});
		
		$('li').each(function(i) {
			$(this).delay((i - 1) * 100).fadeIn(250);
		});
	}
	
	function showContent(subpage) {
		var $box,
				id = subpage.split('-')[0];
				
		if (!subpage) {
			id = 1;
			$('.name1').addClass('active');
		} else {
			$('.name' + id).addClass('active');
		}
		
		$box = $('.box' + id);

		if ($actualBox != null) {
			$actualBox.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'z-index' : 0
			}, 1000, trans, function() {
				$actualBox.hide();
				showBox();
			});
		} else {
			showBox();
		}
		
		function showBox() {			
			$box.css({
				'display' : 'block',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'top'     : $('.main').height() * .5 - $box.height() * .5,
				'left'    : windowWidth - $box.width() * .5 + 130,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			}, 1000, trans);
		}
		
		$actualBox = $box;
	}
	
	function update(page) {
		$('.active').removeClass('active');
		showContent(page);
	}
	
	api.initialize  = initialize;
	api.update      = update;
	
	return api;
}