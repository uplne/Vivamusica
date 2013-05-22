/**
 * @class for Festival section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Textpage = function() {
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
		showContent();
	}
	
	function showContent() {
		var $box;
		
		if ($('.kontakt_box').length > 0) {
			$box = $('.kontakt_box');
		} else {
			$box = $('.text_box');
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
				'top'     : $('.main').height() * .5 - $box.height() * .5,
				'left'    : windowWidth - $box.width() * .5 + 60,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			});
		}
		
		$actualBox = $box;
		
		// Init scroll pane plugin
		$box.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
	
	api.initialize  = initialize;
	
	return api;
}