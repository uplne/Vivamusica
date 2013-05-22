/**
 * @class for Program section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Program = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	$program     = $('.main'),
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
	subPage      = subpage,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks = {
		mouseEnter : function(obj) {
			obj.animate({'top' : '-=10'});
		},
		mouseLeave: function(obj) {
			obj.animate({'top' : '+=10'});
		},
		onClick    : function(e, obj) {
			e.preventDefault();
			showProgramDetail(Number(obj.attr('class').match(/\d+/)));
		},
		arrowClick : function(e, id) {
			e.preventDefault();
			showProgramDetail(id);
		}
	};
	
	function initialize() {		
		renderProgram();
	}
	
	// Position thumbs on stage
	function renderProgram() {
		var padding    = 10,
			  thumbWidth = $('.thumbBox1').width(),		  
		 		offsetx		 = Math.round(windowWidth - thumbWidth * 2.5),
				posTop 		 = posLeft = 0.
				offsety    = (winHeight > 900) ? -40 : 0;
				
		for (var i = 1, len = 10; i < len; i++) {
			if (i < 5) {
				posLeft = ((i - 1) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (-185 + offsety) - headerHeight;
			} else {
				posLeft = ((i - 5) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (50 + offsety) - headerHeight;
			}
						
			$program.find('.thumbBox' + i).css({
				'top'  : posTop + 'px',
				'left' : posLeft + 'px'
			}).delay(i * 150).fadeIn(400).mouseenter(function(){callbacks.mouseEnter($(this));}).mouseleave(function(){callbacks.mouseLeave($(this));});
		}
		
		if (subPage) showProgramDetail(subPage);
		
	};
	
	// Show program detail
	function showProgramDetail(page) {
		var $programBox = null,
				boxId = parseInt(page);
		
		$programBox = $('#program' + boxId);
		
		if ($actualBox != null) {
			$actualBox.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'z-index' : 0
			}, 600, trans, function() {
				$actualBox.remove();
				showBox(boxId);
			});
		} else {
			showBox(boxId);			
		}
		
		function showBox(id) {
			// Add and stylize overlay
			var $closeoverlay = sk.vivamusica.Vivamusica.addOverlay('program'),
					$clone = $programBox.clone(),
					nextId = previousId = 0,
					len    = $('.thumbBox').length;
					
					$clone.addClass('clone');
										
			// Add arrows
			if (id == 1) {
				nextId = 2;
				$clone.append('<a class="arrow right" href="' + $('.thumbBox' + nextId).attr('href') + '"></a>');
			} else if (id == len) {
				previousId = len - 1;
				$clone.append('<a class="arrow left" href="' + $('.thumbBox' + previousId).attr('href') + '"></a>');
			} else {
				nextId     = id + 1;
				previousId = id - 1;
				$clone.append('<a class="arrow left" href="' + $('.thumbBox' + previousId).attr('href') + '"></a>');
				$clone.append('<a class="arrow right" href="' + $('.thumbBox' + nextId).attr('href') + '"></a>');
			}
			
			$('body').append($clone);			
			$clone.css({
				'display' : 'block',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'top'     : winHeight * .5 - $programBox.height() * .5,
				'left'    : windowWidth - $programBox.width() * .5 + 60,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			}, 600, trans);
			
			$actualBox = $clone;
			
			// Init scroll pane plugin
			$clone.find('.scroll-pane').jScrollPane({
					verticalDragMinHeight: 45,
					verticalDragMaxHeight: 45
			});
			
			FB.XFBML.parse();
		}		
	}
	
	function closeDetail() {
		var $clone = $('.clone');
		
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
	
	function update(page) {
		(page) ? showProgramDetail(page) : closeDetail();
	}
		
	api.initialize  = initialize;
	api.closeDetail = closeDetail;
	api.update      = update;
	
	return api;
}