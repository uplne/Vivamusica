/**
 * @class for Media section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Media = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	$main     = $('.main'),
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
	subPage      = subpage,
	contentDir   = 'app/data/',
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
			showVideo(Number(obj.attr('class').match(/\d+/)));
		},
		arrowClick : function(e, id) {
			e.preventDefault();
			showVideo(id);
		}
	};
	
	function initialize() {		
		renderMedia();
	}
	
	// Position thumbs on stage
	function renderMedia() {
		var padding    = 10,
			  thumbWidth = $('.mediaBox1').width(),		  
		 		offsetx		 = Math.round(windowWidth - thumbWidth * 2),
				posTop 		 = posLeft = 0;
				offsety    = (winHeight > 900) ? -40 : 0;
		
		$('.thumbBox').each(function(j) {
			var i = j + 1;
			if (i < 4) {
				posLeft = ((i - 1) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (-177 + offsety) - headerHeight;
			} else {
				posLeft = ((i - 4) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (60 + offsety) - headerHeight;
			}
			
			$main.find('.mediaBox' + i).css({
				'top'  : posTop + 'px',
				'left' : posLeft + 'px'
			}).delay(i * 150).fadeIn(400).mouseenter(function(){callbacks.mouseEnter($(this));}).mouseleave(function(){callbacks.mouseLeave($(this));});
		});
		
		if (subPage) showVideo(subPage);
	};
	
	// Show program detail
	function showVideo(page) {
		var $videoBox = '';
				boxId = parseInt(page);
		
		$videoBox = $('.videobox' + boxId);
		
		if ($actualBox != null) {
			$actualBox.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'z-index' : 0
			}, function() {
				$actualBox.remove();
				showBox(boxId);
			});
		} else {
			showBox(boxId);			
		}
		
		function showBox(id) {
			// Add and stylize overlay
			var $closeoverlay = sk.vivamusica.Vivamusica.addOverlay('media'),
					clone         = '<article id="video" class="text_box program_detail"><div class="text_box_wrap"></div></article>',
					nextId        = previousId = 0,
					len           = $('.thumbBox').length,
					$clone        = $(clone);
			
			$.ajax({
				type     : 'GET',
				url      : contentDir + 'loadVideo.php',
				data     : 'videoid=' + id,
				dataType : 'html'
			}).done(function(html) {
				if ($(".text_box_wrap").html() != null) {
					if ($(".text_box_wrap").html().length > 0) {
						$('.text_box_wrap').empty();
					}
				}
				
				$('.text_box_wrap').append(html);
			});
			console.log(len);
			// Add arrows
			if (id == 1) {
				nextId = len - 1;
				$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
			} else if (id == len) {
				previousId = 2;
				$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
			} else {
				nextId     = id + 1;
				previousId = id - 1;
				$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
				$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
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
		
	function update(page) {
		(page) ? showVideo(page) : closeDetail();
	}
	
	api.initialize  = initialize;
	api.closeDetail = closeDetail;
	api.update      = update;
	
	return api;
}