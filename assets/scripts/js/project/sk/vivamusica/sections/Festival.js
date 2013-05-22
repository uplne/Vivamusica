/**
 * @class for Festival section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Festival = function(subpage) {
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
	//==================================================
	// INSTANCE VARS
	//==================================================
	winHeight    = $(window).height(),
	headerHeight = $('#header').height(),
	$actualBox    = null,
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
		$('#festival ul').css({
			'top'  : $('.main').height() * .5 - 36,
			'left' : 0
		});
	}
	
	function showContent(subpage) {
		var $box;
		
		if (!subpage) {
			$('a.festival').addClass('active');
			$box = $('.festivalBox');
		} else {
			$('a.historia').addClass('active');
			$box = $('.text_box.festival_historia');
		}

		if ($actualBox != null) {
			$actualBox.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'z-index' : 0
			}, function() {
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
				'top'     : $('#festival').height() * .5 - $box.height() * .5,
				'left'    : windowWidth - $box.width() * .5 + 60,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			}, function() {
				// Init scroll pane plugin
				$('.main .scroll-pane').jScrollPane({
					verticalDragMinHeight: 45,
					verticalDragMaxHeight: 45
				});
			});
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