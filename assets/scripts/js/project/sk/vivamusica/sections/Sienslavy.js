/**
 * @class for Media section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Sienslavy = function() {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	$main     = $('.main'),
	$dock     = $('.dock'),
	//==================================================
	// CONSTANTS
	//==================================================
	windowWidth  = $(window).width() *.5,
	boxWidth     = 196 + (($(window).width > 1220) ? 40 : 0),
	offset       = 98,
	//==================================================
	// INSTANCE VARS
	//==================================================
	winHeight    = $(window).height(),
	headerHeight = $('#header').height(),
	$actualBox   = null,
	dockWidth    = 0,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks = {
		mouseEnter : function(obj) {
			obj.find('img').animate({
				'width'         : '120px',
				'height'        : '174px',
				'margin-top' : '0px'
			});
			checkDockWidth();
			
			$dock.mousemove(callbacks.mouseMove);
		},
		mouseLeave: function(obj) {
			obj.find('img').animate({
				'width'         : '100px',
				'height'        : '145px',
				'margin-top' : '29px'
			});
			checkDockWidth();
			$dock.unbind('mousemove');
		},
		onClick    : function(e, obj) {
			e.preventDefault();
			showVideo(Number(obj.attr('class').match(/\d+/)));
		},
		arrowClick : function(e, id) {
			e.preventDefault();
			showVideo(id);
		},
		mouseMove  : function(e) {
			if ((e.pageX > windowWidth) && ($dock.width() > windowWidth * 2)) {
				
			}
		}
	};
	
	function initialize() {
		renderDock();
		
		// Init scroll pane plugin
		if ($('.scroll-pane').length > 0) {
			$('.scroll-pane').jScrollPane({
				verticalDragMinHeight: 45,
				verticalDragMaxHeight: 45
			});
		}
	}
	
	// Position thumbs on stage
	function renderDock() {		
		/*$('.dock a').mouseenter(function(){callbacks.mouseEnter($(this))}).mouseleave(function(){callbacks.mouseLeave($(this))});
		checkDockWidth();*/
		var dockOptions =
			{ align: 'bottom' // horizontal menu, with expansion UP from a fixed BOTTOM edge
			, labels: true  // add labels (defaults to 'tl')
			};
		// ...and apply...
		$('#dock').jqDock(dockOptions);
		};
	
	function changeDockPosition() {
		
	};
	
	function checkDockWidth() {
		$('.dock li').each(function(i) {
			dockWidth += $(this).width() + 10;	
		});
		$dock.width(dockWidth);
	};
	
	// Show program detail
	function showVideo(id) {
		var $videoBox = $('.videobox' + id);
		
		if ($actualBox != null) {
			$actualBox.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'z-index' : 0
			}, function() {
				$actualBox.remove();
				showBox(id);
			});
		} else {
			showBox(id);			
		}
		
		function showBox(id) {
			// Add and stylize overlay
			var $closeoverlay = sk.vivamusica.Vivamusica.addOverlay();
			
			var clone = '<article id="video" class="text_box program_detail"><div class="text_box_wrap"></div></article>',
					$clone = $(clone);
										
			$.ajax({
				url      : 'video/video1.html',
				dataType : 'html'
			}).done(function(html) {
				if ($(".text_box_wrap").html() != null) {
					if ($(".text_box_wrap").html().length > 0) {
						$('.text_box_wrap').empty();
					}
				}
				
				$('.text_box_wrap').append(html);
			});
										
			// Add arrows
			if (id == 1) {
				$clone.append('<a class="arrow right"></a>');
				$clone.find('a.right').click(function(e) {
					callbacks.arrowClick(e, id + 1);
				});
			} else if (id == 9) {
				$clone.append('<a class="arrow left"></a>');
				$clone.find('a.left').click(function(e) {
					callbacks.arrowClick(e, id - 1);
				});
			} else {
				$clone.append('<a class="arrow left"></a>');
				$clone.append('<a class="arrow right"></a>');
				$clone.find('a.left').click(function(e) {
					callbacks.arrowClick(e, id - 1);
				});
				$clone.find('a.right').click(function(e) {
					callbacks.arrowClick(e, id + 1);
				});
			}
			
			$('body').append($clone);			
			$clone.css({
				'display' : 'block',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'top'     : winHeight * .5 - $clone.height() * .5,
				'left'    : windowWidth - $clone.width() * .5 + 60,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			});
			
			$actualBox = $clone;
		}		
	}
	
	function closeDetail() {
		var $clone = $('.text_box');
		
			$clone.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)'
			}, 400, removeClone);
			
			function removeClone() {
				$clone.find('a.left').unbind('click');
				$clone.find('a.right').unbind('click');
				($clone).remove();
				$actualBox = null;
				
				sk.vivamusica.Vivamusica.removeOverlay();
			}
		}
	
	api.initialize  = initialize;
	api.closeDetail = closeDetail;
	
	return api;
}