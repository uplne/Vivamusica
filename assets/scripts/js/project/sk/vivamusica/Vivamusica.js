var sk = {
	vivamusica: {
		controllers: {},
		sections: {},
		utils: {}
	}
}

sk.vivamusica.utils.BackgroundChanger = function() {
	var api   = {},
			len   = $('#backgrounds img').length - 1,
			$list = $('#backgrounds img'),
			time  = 12000,
			index = 0;
	
	function initialize() {
		$('#backgrounds img:eq(0)').css({'z-index' : 1}).fadeIn('fast');
		setTimeout(onEnterEvent, time);
	}
	
	function onEnterEvent() {
		swapImage();
		setTimeout(onEnterEvent, time);
	}
		
	function swapImage() {
		$list.eq(index).fadeOut(2000);
		(index < len) ? index++ : index = 0;
		$list.eq(index).fadeIn(3200);		
	}
	
	api.init = initialize;
	
	return api;
}

sk.vivamusica.utils.Banner = function() {
	var $list   = [$('.banner img:eq(0)'),$('.banner img:eq(1)'),$('.banner img:eq(2)'),$('.banner img:eq(3)'),$('.banner img:eq(5)'),$('.banner img:eq(4)')],
			$banner = $('.banner'),
			index   = 0,
			time    = 6000,
			status  = true;
	
	var api   = {},
		pos   = [{x:35,y:-3},{x:20,y:0},{x:15,y:5}];
	
	function initialize() {
		$list[1].css({'right' : '0px'}).hide();
		$list[2].css({'right' : '0px'}).hide();
		$list[3].css({'z-index' : '10'});
		
		$list[0].delay(1600).animate({'right' : '0px'}, 1500, 'easeInOutBack');
		$list[3].delay(1800).animate({'right' : '0px'}, 1500, 'easeInOutBack');
		$list[4].delay(1900).animate({'right' : '0px'}, 1500, 'easeInOutBack');
		$list[5].delay(2000).animate({'right' : '0px'}, 1500, 'easeInOutBack', function() {
			setTimeout(onEnterEvent, time);
		});
		
		$banner.on({
			mouseover : function() {
				moveBannerText(true);
			},
			mouseout  : function() {
				moveBannerText();
			}
		});
		
		function moveBannerText(direction) {
			direction = direction || false;
			
			if (direction) {
				$list[3].stop().animate({'top' : pos[0].y + 'px', 'right' : pos[0].x + 'px'}, 300, 'easeInCubic');
				$list[5].stop().animate({'top' : pos[2].y + 'px', 'right' : pos[2].x + 'px'}, 300, 'easeInCubic');
				$list[4].stop().animate({'top' : pos[1].y + 'px', 'right' : pos[1].x + 'px'}, 300, 'easeInCubic');
			} else {
				$list[3].stop().animate({'top' : '0px', 'right' : '0px'}, 300, 'easeOutCubic');
				$list[5].stop().animate({'top' : '0px', 'right' : '0px'}, 300, 'easeOutCubic');
				$list[4].stop().animate({'top' : '0px', 'right' : '0px'}, 300, 'easeOutCubic');
			}
		}
	}
	
	function onEnterEvent() {
		swapImage();
		setTimeout(onEnterEvent, time);
	}
		
	function swapImage() {
		$list[index].fadeOut(600);
		(index < 2) ? index++ : index = 0;
		$list[index].fadeIn(1000);			
	}
	
	function showBanner() {
		$banner.fadeIn('slow');
	}
	
	function hideBanner() {
		$banner.fadeOut('slow');
	}
	
	api.init       = initialize,
	api.showBanner = showBanner,
	api.hideBanner = hideBanner;
	
	return api;
};

sk.vivamusica.Vivamusica = (function() {
	//==================================================
	// API
	//==================================================
	var api     = {},

	//==================================================
	// INSTANCE VARIABLES
	//==================================================
	controller  = null,
	lang        = '';

	//==================================================
	// METHODS
	//==================================================
	function initialize(sLang) {
		controller = new sk.vivamusica.controllers.Controller();
		controller.parent = this;
		controller.initialize();
		
		//sk.vivamusica.utils.Banner().init();
		sk.vivamusica.utils.BackgroundChanger().init();
				
		lang = sLang;
		
		var mainHeight = sk.vivamusica.utils.Sizes().wHeight - $('#header').height() - $('#footer').height();
		$('.main').height(mainHeight);
	}
	
	// Overlay method
	function addOverlay(url, type) {
		var xoffset = yoffset = 0;

		if (type) {
			xoffset = 100;
			yoffset = -120;
		}
		if ($('.overlay').length == 0) {
			$('body').append('<div class="overlay"></div>');
			$('body').append('<a class="overlay_close" href="#/' + url + '"></a>');
			$('.overlay').animate({
				'opacity' : .65,
				'filter'  : 'alpha(opacity = 65)',
				'z-index' : 100
			}, 400);
			$('.overlay_close').css({
				'top'     : sk.vivamusica.utils.Sizes().whHeight - 190 + yoffset,
				'left'    : sk.vivamusica.utils.Sizes().whWidth + 285 + xoffset,
				'z-index' : 10001
			});
		}
		if (type) {
			$('.overlay_close').on('click', function(e) {
				e.preventDefault();
				program().destroy();
				removeOverlay();
			});
		}
		
		return $('.overlay_close');
	}
	
	function removeOverlay() {
		$('.overlay_close').unbind('click');
		$('.overlay_close').remove();
		
		$('.overlay').animate({
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'z-index' : 100
		}, function() {
			$('.overlay').remove();
		});
	}
	
	function getLanguage() {
		return lang;
	}

	// API
	api.initialize    = initialize;
	api.addOverlay    = addOverlay;
	api.removeOverlay = removeOverlay;
	api.getLanguage   = getLanguage;
	api.controller    = function() {
		return controller;
	};
	
	return api;	
})();

sk.vivamusica.utils.BoxController = function() {
	this.leftMargin = 80;
	this.main       = $('.main');
	this.actual     = null;
};

/*
 * Function adds box with arrows
 * @params: actual box class, new box class
 */
sk.vivamusica.utils.BoxController.prototype.addBox = function(oNew, bDelete) {
	// Instance vars
	var self    = this;			
	this.box    = oNew;

	if (self.actual != null) {
		self.actual.animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'z-index' : 0
		}, 600, 'easeInOutBack', function() {
			(bDelete) ? self.actual.remove() : self.actual.hide();
			self.showBox();
		});
	} else {
		self.showBox();
	}
};

sk.vivamusica.utils.BoxController.factory = function(type) {
	var constr = type,
		parent = sk.vivamusica.utils.BoxController;

	if (typeof parent[constr] !== 'function') {
		throw {
			name    : 'Error',
			message : constr + "doesn't exist!"
		};
	}
	
	if (typeof parent[constr].prototype.addBox !== 'function') {
		parent[constr].prototype = new parent();
	}
	
	return new parent[constr]();
};

sk.vivamusica.utils.BoxController.BoxNormal = function() {
	var self = this;
	
	this.showBox = function() {
		self.box.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : self.main.height() * .5 - self.box.height() * .5 - 50,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + self.leftMargin,
			'z-index' : 999
		}).animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = self.box;
	
		// Init scroll pane plugin
		self.actual.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
};

sk.vivamusica.utils.BoxController.BoxHalloffame = function() {
	var self = this;
	
	this.showBox = function() {
		self.box.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : (self.main.height() - $('#dock').height()) * .5 - self.box.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + self.leftMargin,
			'z-index' : 999
		}).animate({
			'left' : '-=' + self.leftMargin,
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = self.box;
	
		// Init scroll pane plugin
		self.actual.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
	}
};

sk.vivamusica.utils.BoxController.BoxProgram = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
			$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('program'),
			$clone        = self.box.clone(),
			id            = Number($clone.attr('id').match(/\d+/)),
			nextId        = previousId = 0,
			len           = $('.thumbBox').length;
			
			$clone.addClass('clone').attr('id', 'clone');

		// Add arrows
		/*if (id == 1) {
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
		}*/
			
		$('body').append($clone);			
		$clone.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
			'top'     : sk.vivamusica.utils.Sizes().whHeight - self.box.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + 60,
			'z-index' : 999
		}).animate({
			'left' : '-=60',
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
		
		self.actual = $clone;
		
		// Init scroll pane plugin
		$clone.find('.scroll-pane').jScrollPane({
			verticalDragMinHeight: 45,
			verticalDragMaxHeight: 45
		});
		
		$('.vstupne').on('click', function(e) {
			e.preventDefault();
			openTicketBox();
		});
		
		FB.XFBML.parse();
	}
};

sk.vivamusica.utils.BoxController.BoxNovinka = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
			$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('novinky'),
			$clone        = self.box.clone(),
			id            = parseInt(window.location.hash.match(/\d+/)),
			contentDir    = 'app/data/';

		$clone.addClass('clone').attr('id', 'clone');

		$.ajax({
			type     : 'GET',
			url      : contentDir + 'getnews.php',
			data     : 'id=' + id,
			dataType : 'json'
		}).done(function(data) {
			$clone.find('h3').html(data.title);
			$clone.find('h4').html(data.date);
			$clone.find('.text-novinka').html(data.txt);

			$('body').append($clone);			
			$clone.css({
				'display' : 'block',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)',
				'top'     : sk.vivamusica.utils.Sizes().whHeight - self.box.height() * .5,
				'left'    : sk.vivamusica.utils.Sizes().whWidth - self.box.width() * .5 + 60,
				'z-index' : 999
			}).animate({
				'left' : '-=60',
				'opacity' : 1,
				'filter'  : 'alpha(opacity = 100)'
			}, 600, 'easeInOutBack');
			
			self.actual = $clone;
			
			// Init scroll pane plugin
			$clone.find('.text-novinka').mCustomScrollbar({autoDraggerLength:false});
		});
	}
};

sk.vivamusica.utils.BoxController.BoxMedia = function() {
	this.showBox = function() {
		// Add and stylize overlay
		var self          = this,
				$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('media'),
				$clone        = $('<article id="video" class="text_box program_detail"><div class="text_box_wrap"></div></article>'),
				id            = Number(self.box.attr('id').match(/\d+/)),
				nextId        = previousId = 0,
				len           = $('.thumbBox').length,
				contentDir    = 'app/data/';
		
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

		// Add arrows
		if (id == 1) {
			nextId = len - 1;
			$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
		} else if (id == len) {
			previousId = 2;
			$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
		} else {
			nextId     = len - id;
			previousId = nextId + 2;
			$clone.append('<a class="arrow right" href="' + $('.mediaBox' + previousId).attr('href') + '"></a>');
			$clone.append('<a class="arrow left" href="' + $('.mediaBox' + nextId).attr('href') + '"></a>');
		}
			
		$('body').append($clone);			
		$clone.css({
			'display' : 'block',
			'opacity' : 0,
			'filter'  : 'alpha(opacity = 0)',
		  	'top'     : sk.vivamusica.utils.Sizes().whHeight - $clone.height() * .5,
			'left'    : sk.vivamusica.utils.Sizes().whWidth - $clone.width() * .5 + 60,
			'z-index' : 999
		}).animate({
			'left' : '-=60',
			'opacity' : 1,
			'filter'  : 'alpha(opacity = 100)'
		}, 600, 'easeInOutBack');
			
		self.actual = $clone;
		
		FB.XFBML.parse();
	}
};

sk.vivamusica.utils.Sizes = function() {
	var $window = $(window);
	
	return {
		wWidth   : $window.width(),
		wHeight  : $window.height(),
		whWidth  : $window.width() * .5,
		whHeight : $window.height() * .5
	}
};

sk.vivamusica.utils.Browser = function() {
	var ie7less = function() {
		if($.browser.msie && parseInt($.browser.version) <= 7) { return true; }
	}
	
	return {
		detectIE : ie7less()
	}
};

sk.vivamusica.controllers.Controller = function() {
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
	titles 			 = {
		main             : 'Vivamusica! festival 2013',
		program          : 'Program',
		festival         : 'Festival',
		historia         : 'História',
		vstupenky        : 'Vstupenky',
		galeria          : 'Galéria',
		sienslavy        : 'Sieň slávy',
		media            : 'Media',
		novinky          : 'Novinky',
		team             : 'Team',
		tricka           : 'Tricka',
		partneri         : 'Partneri',
		kontakt          : 'Kontakt' 
	},
	titlesen 		 = {
		main             : 'Vivamusica! festival 2013',
		program          : 'Program',
		festival         : 'Festival',
		festivalhistory  : 'Festival - History',
		tickets          : 'Tickets',
		gallery          : 'Gallery',
		halloffame       : 'Hall of fame',
		media            : 'Media',
		news             : 'News',
		team             : 'Team',
		partners         : 'Partners',
		contact          : 'Contact' 
	},
	contentDir   = 'app/data/',
	//==================================================
	// INSTANCE VARS
	//==================================================
	page         = null,
	subpage      = null,
	actualPage   = null,
	obj          = null,
	preloader    = null,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks 	 = {
		
	};
	
	function initialize() {
		SWFAddress.addEventListener(SWFAddressEvent.CHANGE, handleChange); 	
		SWFAddress.dispatchEvent(SWFAddressEvent.CHANGE);
	}
	
	function handleChange(event) {
		page    = event.pathNames[0] ? event.pathNames[0] : 'program',
		subpage = event.pathNames[1] ? event.pathNames[1] : '';
				
		if ((!actualPage) || (actualPage != page)) {
			if ((actualPage == 'galeria') || (actualPage == 'gallery')) {
				obj.cladearStage();
			}
			updateContent(page);
		} else {
			obj.update(subpage);
		}
		
		// Banner on/off control
		/*if ((page == 'galeria') || (page == 'gallery')) {
			sk.vivamusica.utils.Banner().hideBanner();
		} else {
			sk.vivamusica.utils.Banner().showBanner();
		}*/
		
		updateTitle();
	}
		
	function updateContent(url) {
		$.ajax({
			type     : 'GET',
			url      : contentDir + 'load.php',
			data     : 'page=' + url,
			dataType : 'html'
		}).done(function(html) {
			if ($(".main").html().length > 0) {
				$('.main').empty();
		 	}
			
			$('.main').append(html);
			$('.main').attr('id', url);
		
			if (sk.vivamusica.Vivamusica.getLanguage() == 'sk') {
				switch(url) {
					case 'sien-slavy' : {
						obj = new sk.vivamusica.sections.Sienslavy(subpage);
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
					} break;
					case 'novinky' : {
						obj = new sk.vivamusica.sections.Novinky(subpage);
					} break;
					case 'partneri' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'kontakt' : {
						obj = new sk.vivamusica.sections.Kontakt(subpage);
					} break;
					case 'vstupenky' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'skolka' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
					} break;
					case 'galeria' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
					} break;
					case 'tricka' : {
						obj = new sk.vivamusica.sections.Tricka();
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
					} break;
				}
			} else {
				switch(url) {
					case 'hall-of-fame' : {
						obj = new sk.vivamusica.sections.Sienslavy(subpage);
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
					} break;
					case 'partners' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'contact' : {
						obj = new sk.vivamusica.sections.Kontakt(subpage);
						$('.main').attr('id', 'kontakt');
					} break;
					case 'tickets' : {
						obj = new sk.vivamusica.sections.Textpage();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
					} break;
					case 'gallery' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
					} break;
				}
			}
			
			if ((url != 'gallery') && (url != 'galeria')) {		
				initLoader();
			} else {
				obj.initialize();
			}			
		});	
	}
	
	function initLoader() {
		preloader = new this.MainLoaderFull({
			autoload : true,
			obj      : $('.main')
		});
		
		preloader.setLoaderPosition.call(this);
		
		preloader.addProgressListener(function(e) {
			//console.log('Total: ' + e.total + ' To load: ' + e.toload);																			 
		});
				
		preloader.addCompleteListener(function() {
			$('#preloader').stop().fadeOut('slow', function() {
				$('#preloader').remove();
			});

			obj.initialize();
		});
			
		preloader.init();
	};
	
	function updateTitle() {
		var tit      = (sk.vivamusica.Vivamusica.getLanguage() == 'sk') ? titles : titlesen,
				newpage  = page.split('-').join(''),
				topTitle = (subpage) ? subpage : '',
				subtitle = ((newpage == 'kontakt') || (newpage == 'program') || (newpage == 'media') || ((newpage == 'sienslavy') || (newpage == 'halloffame'))) ? '' : subpage;
		
		if (newpage === 'novinky') {
			$('#header h2').html('novinky');
		} else {
			if ((newpage == 'galeria') || (newpage == 'gallery')) {
				var title = (subtitle) ? tit[newpage] + ' - ' + subtitle : tit[newpage] + '- 2011';
				$('#header h2').html(tit[page].toLowerCase() + ((subtitle) ? ' - ' + subtitle : ' - 2011').toLowerCase());
			} else {
				var title = (subtitle) ? tit[newpage] + ' - ' + tit[subtitle] : tit[newpage];
				$('#header h2').html(tit[newpage].toLowerCase() + ((subtitle) ? ' - ' + tit[subtitle] : '').toLowerCase());
			}
		}
		
		// for 2nd level deep linking
		if (topTitle) {
			
		}		
		
	 	SWFAddress.setTitle(tit['main'] + ' - ' + title);
		
		actualPage = page;
	}
			
	api.initialize = initialize;
	api.actualObj  = function() {
		return obj;
	};
	
	return api;
}

/*
* Library for Image loading
*/
function MainLoaderFull(oSettings) {
	// total number of items to load
	var items       = [],
			listeners   = [];
			totaltoload = 0,
			settings    = oSettings || {};
		
	// add item to item array
	this.addItem = function(oItem) {
		items.push(oItem);
		
		// increment total number of items
		totaltoload++;
	};
	
	// initialize preloading
	this.init = function() {
		var itemslen = items.length;
				
		// go throught all items and start loading
		while(itemslen--) {
			items[itemslen].startPreload();
		}
	};
	
	this.autoLoadImages = function() {
		var url  = '',
				self = this;
		
		// if no type is set then load everything
		if (!settings.type) {
			settings.obj.find("*:not(script)").each(function() {
				var tag = $(this).prop('tagName').toLowerCase();
																										
				// check if item is img tag or has css background
				if (tag === "img" && $(this).attr('src')) {
					self.addImage($(this).attr('src'));
				} else if ($(this).css('background-image') != 'none') {
					url = self.extractUrl($(this).css('background-image'));
					self.addImage(url);
				}
			});
		}
	}
		
	this.extractUrl = function(url){
	 return url.replace(/"/g,"").replace(/url\(|\)$/ig, "");
	}
		
	this.setLoaderPosition = function() {
		$('.vivamusicaPage').prepend('<div id="preloader"></div>');
		
		var $preloader = $('#preloader');
				$preloader.css({
					'top'     : sk.vivamusica.utils.Sizes().whHeight - $preloader.height(),
					'left'    : sk.vivamusica.utils.Sizes().whWidth  - $preloader.width(),
					'display' : 'none'
				}).stop().fadeIn('slow');
	}
	
	// after first set up call function will self rewrite, so another call will execute callback function
	this.addProgressListener = function(callback) {
		this.addProgressListener = function(args) {
			callback(args);
		}
		
		listeners.push(this.addProgressListener);
	};
	
	this.addCompleteListener = function(callback) {		
		this.addCompleteListener = function(args) {
			if (args.toload === 0) {
				callback();
			}
		};
		
		listeners.push(this.addCompleteListener);
	};
	
	// item is loaded
	this.loaded = function(oItem) {
		totaltoload--;
				
		var oData = {
					toload: totaltoload,
					total : items.length
				},
				len = listeners.length;
	
		// call all listeners
		for (var i = 0; i < len; i++) {
			listeners[i](oData);
		}
	};	
	
	this.getItems = function() {
		return items;
	};
	
	// check if autoload is true
	if (settings.autoload)
		this.autoLoadImages();
};

MainLoaderFull.prototype.addImage = function(sUrl, sId) {
	var img = new ImageLoader(sUrl, this);
	// if img tag id is provided then add it to img object
	if (sId)
		img.id = sId;
	
	this.addItem(img);
	
	return img.img;
};


/*
* Object for new image
*/
function ImageLoader(sUrl, oMainLoader) {
	var self   = this,
			mainLoader = oMainLoader;
	
	this.img = new Image();
	this.id  = '';
	
	this.startPreload = function() {
		//self.img.addEventListener('load', onLoad);
		
		self.img.onload = onLoad;
		self.img.src = sUrl;
	};
	
	var onLoad = function() {
		removeEvents();
		mainLoader.loaded(self);
	};
	
	var removeEvents = function() {
		//self.img.removeEventListener('load', onLoad);
	};
};


/**
 * @class for Program section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
var program = sk.vivamusica.sections.Program = function(subpage) {
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
	pozvanka     = $('.pozvanka'),
	//==================================================
	// INSTANCE VARS
	//==================================================
	winHeight    = $(window).height(),
	headerHeight = $('#header').height(),
	$actualBox   = null,
	subPage      = subpage,
	textBox      = null,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks = {
		mouseEnter    : function(obj) {
			obj.animate({'top' : '-=10'});
		},
		mouseLeave    : function(obj) {
			obj.animate({'top' : '+=10'});
		},
		arrowClick    : function(e, id) {
			e.preventDefault();
			showProgramDetail(id);
		},
		pozvankaClick : function(e) {
			e.preventDefault();

			showPozvanka();
		}
	};

	function showPozvanka() {
		var holder = $('<section class="pozvanka-holder"><div class="if-holder"><iframe width="494" height="278" src="http://www.youtube.com/embed/_LuWzFshibs" frameborder="0" allowfullscreen></iframe></div></section>'),
			$closeoverlay = sk.vivamusica.Vivamusica.addOverlay('program',true),
			body   = $('body');

			holder.css({
				'top'  : ($(window).height() * .5) - (holder.height() * .5),
				'left' : windowWidth - (holder.width() * .5)
			}).fadeIn();

			body.append(holder);
	}

	function destroyPozvanka() {
		$('.pozvanka-holder').fadeOut(function() {
			$(this).remove();
		});
	}
	
	function initialize() {		
		textBox = sk.vivamusica.utils.BoxController.factory('BoxProgram');
		renderProgram();

		pozvanka.on('click', function(e){callbacks.pozvankaClick(e)});
	}
	
	// Position thumbs on stage
	function renderProgram() {
		var padding    = 10,
			thumbWidth = $('.thumbBox1').width(),		  
		 	offsetx	   = Math.round(windowWidth - thumbWidth * 2),
			posTop 	   = posLeft = 0,
			offsety    = (winHeight > 900) ? -40 : 0;
				
		for (var i = 1, len = 10; i < len; i++) {
			if (i < 4) {
				posLeft = ((i - 1) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (-185 + offsety) - headerHeight;
			} else {
				posLeft = ((i - 4) * (thumbWidth + padding)) + offsetx;
				if (i == 7) {
					posTop  = (winHeight * .5) + offsety - headerHeight - 30;
				} else {
					posTop  = (winHeight * .5) + (50 + offsety) - headerHeight;
				}
			}
						
			$program.find('.thumbBox' + i).css({
				'top'  : posTop + 'px',
				'left' : posLeft + 'px'
			}).delay(i * 150).fadeIn(400).mouseenter(function(){callbacks.mouseEnter($(this));}).mouseleave(function(){callbacks.mouseLeave($(this));});
		}

		posTop = (winHeight * .5) + (-185 + offsety) - headerHeight;

		pozvanka.css({
			'top'  : posTop - 50,
			'left' : windowWidth + 220
		}).delay(1500).animate({
			'top'     : posTop,
			'opacity' : 1
		});
		
		if (subPage) showProgramDetail(subPage);
		
	};
	
	// Show program detail
	function showProgramDetail(page) {
		var $programBox = null,
			boxId       = parseInt(page);
		
		$programBox = $('#program' + boxId);
		textBox.addBox($programBox, true);
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
	api.destroy     = destroyPozvanka;
	
	return api;
}

/**
 * @class for Program section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Novinky}
 */
 
sk.vivamusica.sections.Novinky = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	$novinky     = $('.main'),
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
	textBox      = null,
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
		arrowClick : function(e, id) {
			e.preventDefault();
			showDetail(id);
		}
	};
	
	function initialize() {		
		textBox = sk.vivamusica.utils.BoxController.factory('BoxNovinka');
		// Init scroll pane plugin
		$('.novinky-holder').mCustomScrollbar({autoDraggerLength:false});
		if (subPage) showDetail(subPage);
	}
		
	// Show program detail
	function showDetail(page) {
		var $box  = null,
			boxId = parseInt(page);
		
		$box = $('.novinka');
		textBox.addBox($box, true);
	}
	
	function closeDetail() {
		var $clone = $('.clone');

			console.log($clone);
		
			$clone.animate({
				'left' : '-=60',
				'opacity' : 0,
				'filter'  : 'alpha(opacity = 0)'
			}, 400, removeClone);
			
			function removeClone() {				
				$clone.remove();
				$actualBox = null;
				
				sk.vivamusica.Vivamusica.removeOverlay();
			}
		}
	
	function update(page) {
		(page) ? showDetail(page) : closeDetail();
	}
		
	api.initialize  = initialize;
	api.closeDetail = closeDetail;
	api.update      = update;
	
	return api;
}

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
	// INSTANCE VARS
	//==================================================
	textBox      = null;
	
	function initialize() {
		textBox = sk.vivamusica.utils.BoxController.factory('BoxNormal');
		initMenu();
		showContent(subpage);
	}
	
	function initMenu() {
		$('#festival ul').css({
			'top'  : $('.main').height() * .5 - 36,
			'left' : 0
		});
		
		$('li').each(function(i) {
			$(this).delay((i - 1) * 100).fadeIn(250);
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
				
		textBox.addBox($box);
	}
	
	function update(page) {
		$('.active').removeClass('active');
		showContent(page);
	}
	
	api.initialize  = initialize;
	api.update      = update;
	
	return api;
}

/**
 * @class for Text sections
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Textpage = function() {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// INSTANCE VARS
	//==================================================
	textBox      = null;
	
	function initialize() {		
		textBox = sk.vivamusica.utils.BoxController.factory('BoxNormal');
		showContent();
	}
	
	function showContent() {
		var $box = null;
		
		if ($('.kontakt_box').length > 0) {
			$box = $('.kontakt_box');
		} else if ($('.partneri_box').length > 0) {
			$box = $('.partneri_box');
		} else {
			$box = $('.text_box');
		}
		textBox.addBox($box);

		if ($('.vstupenky').length > 0) {
			$('.vstupne').on('click', function(e) {
				e.preventDefault();
				openTicketBox();
			});
		}
	}
	
	api.initialize  = initialize;
	
	return api;
}

/**
 * @class for Kontakt section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Kontakt = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// INSTANCE VARS
	//==================================================
	textBox      = null;
	
	function initialize() {
		textBox = sk.vivamusica.utils.BoxController.factory('BoxNormal');
		initMenu();	
		showContent(subpage);
	}
	
	function initMenu() {
		$('.kontaktmenu').css({
			'top'  : $('.main').height() * .5 - 150,
			'left' : 0
		});
		
		$('.kontaktmenu li').each(function(i) {
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
		textBox.addBox($box);
	}
	
	function update(page) {
		$('.active').removeClass('active');
		showContent(page);
	}
	
	api.initialize  = initialize;
	api.update      = update;
	
	return api;
}

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
		arrowClick : function(e, id) {
			e.preventDefault();
			showVideo(id);
		}
	};
	
	function initialize() {		
		textBox = sk.vivamusica.utils.BoxController.factory('BoxMedia');
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
			if (i < 5) {
				posLeft = ((i - 1) * (thumbWidth + padding)) + offsetx;
				posTop  = (winHeight * .5) + (-177 + offsety) - headerHeight;
			} else {
				posLeft = ((i - 5) * (thumbWidth + padding)) + offsetx;
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
		
		$videoBox = $('<div id="videobox' + boxId + '"></div>');
		textBox.addBox($videoBox, true);
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

/**
 * @class for Media section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Sienslavy = function(subpage) {
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
	// INSTANCE VARS
	//==================================================
	textBox      = null,
	dock         = null;
	
	function initialize() {
		textBox = sk.vivamusica.utils.BoxController.factory('BoxHalloffame');
		renderDock();
		showContent(subpage);
	}
	
	// Position thumbs on stage
	function renderDock() {
		dock = new sk.vivamusica.utils.DockMenu();
	}
	
	function showContent(subpage) {
		var $box,
				id = subpage.split('-')[0];
				
		if (!subpage)	id = 1;
		
		$box = $('#sien' + id);
		textBox.addBox($box);
	}
	
	function update(page) {
		$('.active').removeClass('active');
		showContent(page);
	}
	
	api.initialize  = initialize;
	api.update      = update;
	
	return api;
}

sk.vivamusica.utils.DockMenu = function() {
	var proximity = 150,
			iconSmall = 100,
			iconLarge = 120,
			defaultH  = 174,
			iconDiff  = iconLarge - iconSmall,
			mouseX    = mouseY = 0,
			animating = false,
			animReady = false,
			intNum    = 0,
			moveSpeed = 15,
			dockWidth = 0,
			offset    = sk.vivamusica.utils.Sizes().whWidth - 100,
			/*
			 * DOM SELECTIONS
			 */
			$dock     = $('#dock'),
			$dockul   = $dock.find('ul'),
			/*
			 * Callbacks
			 */
			callbacks = {
				mouseMove  : function(e) {
					mouseX = e.pageX;
					mouseY = e.pageY;
										
					animReady = true;
					check();	
				},
				mouseEnter : function() {
					intNum = setInterval(moveDock, 10);
				}, 
				mouseLeave : function() {
					clearInterval(intNum);
				}
			};
			
			$(window).mousemove(function(e) {callbacks.mouseMove(e);});
			$dock.mouseenter(function() {callbacks.mouseEnter()});
			$dock.mouseleave(function() {callbacks.mouseLeave()});
			
			$dock.find("li").each(function(i) {
				$(this).find('a').delay(i * 50).fadeIn('slow', function() {
					dockWidth += $(this).width() + 3;
				});
			});
			
			function check() {
				if (!animating) {
					animating = true;
					
					window.setTimeout(callCheck, 15);
				}	
			};
			
			function moveDock() {
				// Right to left
				var xPos     = 0,
						maxRight = dockWidth - sk.vivamusica.utils.Sizes().wWidth + 250;				
				
				if ((mouseX < offset) && ($dockul.offset().left < 0)) {
					xPos = (1 - (mouseX / offset)) * moveSpeed;
					$dockul.css({
						'left' : '+=' + xPos	
					});
				} else if ((mouseX > sk.vivamusica.utils.Sizes().wWidth - offset) && ($dockul.offset().left > -maxRight)) {
					xPos = (1 - ((sk.vivamusica.utils.Sizes().wWidth - mouseX) / offset)) * moveSpeed;
					$dockul.css({
						'left' : '-=' + xPos	
					});
				}
			};
			
			function callCheck() {
				sizeDockIcons();
					
				animating = false;
				
				if (animReady) {
					animReady = false;
					check();
				}
			};
			
			function sizeDockIcons() {
				$dock.find("li").each(function() {
					var centerX = $(this).offset().left + ($(this).outerWidth()/2.0);
					var centerY = $(this).offset().top + ($(this).outerHeight()/2.0);
					
					var dist = distance(centerX, centerY, mouseX, mouseY);
					
					var newW = (1 - Math.min(1, Math.max(0, dist/proximity))) * iconDiff + iconSmall,
							newH = (newW / iconLarge) * defaultH;
					$(this).find("img").css({
						width     : newW,
						height    : newH,
						marginTop : defaultH - newH
					});
				});
			}
			
			function distance(x0, y0, x1, y1) {
				var xDiff = x1-x0;
				var yDiff = y1-y0;
				
				return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
			}
}

/**
 * @class for Galeria section
 * @author vadocz@orchestra.sk (Stefan Vadocz)
 * @this {sk.vivamusica.sections.Program}
 */
 
sk.vivamusica.sections.Galeria = function(subpage) {
	//==================================================
	// API
	//==================================================
	var api      = {},
	//==================================================
	// DOM SELECTIONS
	//==================================================
	$main     = $('#backgrounds'),
	$nav      = $('#nav'),
	//==================================================
	// CONSTANTS
	//==================================================
	windowWidth  = $(window).width() *.5,
	boxWidth     = 196 + (($(window).width > 1220) ? 40 : 0),
	offset       = 98,
	actualImage  = 1,
	//==================================================
	// INSTANCE VARS
	//==================================================
	contentDir   = 'app/data/',
	preloader    = null,
	//==================================================
	// CALLBACKS
	//==================================================
	callbacks = {
		
	};
	
	function initialize() {		
		showSubmenu();
	}
	
	// Position thumbs on stage
	function showSubmenu() {
		$nav.append('<ul class="subnav"></ul>');
		$('.subnav').css({
			'top' : '30px',
			'left' : $nav.find('.galeria').position().left + 26
		});
		if (sk.vivamusica.Vivamusica.getLanguage() == 'sk') {
			$('.subnav').append('<li><a class="renaultBold" href="#/galeria">2012</a></li><li><a class="renaultBold" href="#/galeria/2011">2011</a></li><li><a class="renaultBold" href="#/galeria/2010">2010</a></li><li><a class="renaultBold" href="#/galeria/2009">2009</a></li><li><a class="renaultBold" href="#/galeria/2008">2008</a></li>');
		} else {
			$('.subnav').append('<li><a class="renaultBold" href="#/galeria">2012</a></li><li><a class="renaultBold" href="#/galeria/2011">2011</a></li><li><a class="renaultBold" href="#/gallery/2010">2010</a></li><li><a class="renaultBold" href="#/gallery/2009">2009</a></li><li><a class="renaultBold" href="#/gallery/2008">2008</a></li>');
		}
		
		checkGallery(subpage);
	};
	
	function checkGallery(id) {
		if ($('.backgrounds-gallery').length > 0) {
			$('.backgrounds-gallery').fadeOut('slow', function() {
				$('.backgrounds-gallery').remove();
				createNewGallery(id);
			});
			$('#bgSlider_1').fadeIn('slow');
		} else {
			createNewGallery(id);
		}
	}
	
	function createNewGallery(id) {		
		$main.append('<ul class="backgrounds-gallery"></ul>');
		$('.vivamusicaPage').prepend('<div id="preloader"></div>');
		
		var $preloader = $('#preloader');
		$preloader.css({
			'top'     : sk.vivamusica.utils.Sizes().whHeight - $preloader.height(),
			'left'    : sk.vivamusica.utils.Sizes().whWidth  - $preloader.width(),
			'display' : 'none'
		}).stop().fadeIn('slow');
		initLoader(id);
	}
	
	function initLoader(id) {
		preloader = null;
		preloader = new MainLoaderLite();
		
		if (id == '2010') {
			preloader.addImage('assets/images/gallery/2010/20101.jpg', 'img1');
			preloader.addImage('assets/images/gallery/2010/20102.jpg', 'img2');
			preloader.addImage('assets/images/gallery/2010/20103.jpg', 'img3');
			preloader.addImage('assets/images/gallery/2010/20104.jpg', 'img4');
			preloader.addImage('assets/images/gallery/2010/20105.jpg', 'img5');
		} else if (id == '2009') {
			preloader.addImage('assets/images/gallery/2009/20091.jpg', 'img1');
			preloader.addImage('assets/images/gallery/2009/20092.jpg', 'img2');
			preloader.addImage('assets/images/gallery/2009/20093.jpg', 'img3');
			preloader.addImage('assets/images/gallery/2009/20094.jpg', 'img4');
			preloader.addImage('assets/images/gallery/2009/20095.jpg', 'img5');
		} else if (id == '2008') {
			preloader.addImage('assets/images/gallery/2008/20081.jpg', 'img1');
			preloader.addImage('assets/images/gallery/2008/20082.jpg', 'img2');
			preloader.addImage('assets/images/gallery/2008/20083.jpg', 'img3');
			preloader.addImage('assets/images/gallery/2008/20084.jpg', 'img4');
			preloader.addImage('assets/images/gallery/2008/20085.jpg', 'img5');
		} else if (id == '2011') {
			preloader.addImage('assets/images/gallery/2011/201101.jpg', 'img1');
			preloader.addImage('assets/images/gallery/2011/201102.jpg', 'img2');
			preloader.addImage('assets/images/gallery/2011/201103.jpg', 'img3');
			preloader.addImage('assets/images/gallery/2011/201104.jpg', 'img4');
			preloader.addImage('assets/images/gallery/2011/201105.jpg', 'img5');
			preloader.addImage('assets/images/gallery/2011/201106.jpg', 'img6');
			preloader.addImage('assets/images/gallery/2011/201107.jpg', 'img7');
			preloader.addImage('assets/images/gallery/2011/201108.jpg', 'img8');
			preloader.addImage('assets/images/gallery/2011/201109.jpg', 'img9');
			preloader.addImage('assets/images/gallery/2011/201110.jpg', 'img10');
			preloader.addImage('assets/images/gallery/2011/201111.jpg', 'img11');
			preloader.addImage('assets/images/gallery/2011/201112.jpg', 'img12');
			preloader.addImage('assets/images/gallery/2011/201113.jpg', 'img13');
			preloader.addImage('assets/images/gallery/2011/201114.jpg', 'img14');
		} else if ((id == '2012') || (id == '')) {
			preloader.addImage('assets/images/gallery/2012/201201.jpg', 'img1');
			preloader.addImage('assets/images/gallery/2012/201202.jpg', 'img2');
			preloader.addImage('assets/images/gallery/2012/201203.jpg', 'img3');
			preloader.addImage('assets/images/gallery/2012/201204.jpg', 'img4');
			preloader.addImage('assets/images/gallery/2012/201205.jpg', 'img5');
			preloader.addImage('assets/images/gallery/2012/201206.jpg', 'img6');
			preloader.addImage('assets/images/gallery/2012/201207.jpg', 'img7');
			preloader.addImage('assets/images/gallery/2012/201208.jpg', 'img8');
			preloader.addImage('assets/images/gallery/2012/201209.jpg', 'img9');
			preloader.addImage('assets/images/gallery/2012/201210.jpg', 'img10');
			preloader.addImage('assets/images/gallery/2012/201211.jpg', 'img11');
			preloader.addImage('assets/images/gallery/2012/201212.jpg', 'img12');
			preloader.addImage('assets/images/gallery/2012/201213.jpg', 'img13');
			preloader.addImage('assets/images/gallery/2012/201214.jpg', 'img14');
			preloader.addImage('assets/images/gallery/2012/201215.jpg', 'img15');
			preloader.addImage('assets/images/gallery/2012/201216.jpg', 'img16');
			preloader.addImage('assets/images/gallery/2012/201217.jpg', 'img17');
			preloader.addImage('assets/images/gallery/2012/201218.jpg', 'img18');
			preloader.addImage('assets/images/gallery/2012/201219.jpg', 'img19');
			preloader.addImage('assets/images/gallery/2012/201220.jpg', 'img20');
			preloader.addImage('assets/images/gallery/2012/201221.jpg', 'img21');
			preloader.addImage('assets/images/gallery/2012/201222.jpg', 'img22');
		}
				
		actualImage  = 1;		
		
		preloader.addProgressListener(function(e) {
			//console.log('Total: ' + e.total + ' To load: ' + e.toload);																			 
		});
				
		preloader.addCompleteListener(function() {				
			var items = preloader.getItems();
			
			for (var i = 0, len = items.length; i < len; i++) {
				var _item = items[i];
																						
				if (_item.id) {
					$('.backgrounds-gallery').append('<li><img id="' + _item.id + '" /></li>');
					$('#' + _item.id).attr('src', _item.img.src).parent().hide();
				}
			}
			
			$('#bgSlider_1').fadeOut('slow');
			$('#img1').parent().fadeIn('slow');
			$('#preloader').stop().fadeOut('slow', function() {
				$('#preloader').remove();
			});
			if ($('.galleryarrow').length == 0) 
				initArrows();
		});
			
		preloader.init();
	};
	
	function initArrows() {		
		$('.vivamusicaPage').prepend('<a class="galleryarrow left" href=""></a>');
		$('.vivamusicaPage').prepend('<a class="galleryarrow right" href=""></a>');
		
		var $left  = $('.galleryarrow.left'),
				$right = $('.galleryarrow.right');
		
		$left.css({
			'position' : 'absolute',
			'top'      : $(window).height() * .5 - $left.height() * .5,
			'left'     : 0,
			'z-index'  : 10,
			'display'  : 'none'
		}).fadeIn('slow');
		$right.css({
			'position' : 'absolute',
			'top'      : $(window).height() * .5 - $left.height() * .5,
			'right'    : 0,
			'z-index'  : 10,
			'display'  : 'none'
		}).fadeIn('slow');
		
		$left.click(function(e) {
			e.preventDefault();
			nextImage(false);
		});
		$right.click(function(e) {
			e.preventDefault();
			nextImage(true);
		});
	};
	
	function nextImage(next) {
		var newImage = actualImage;
		
		(next) ? newImage += 1 : newImage -= 1;
		
		if(newImage < 1) {
			newImage = $('#backgrounds li').length - 1;
		} else if(newImage > $('#backgrounds li').length - 1) {
			newImage = 1;
		}
		
		$('#img' + actualImage).parent().fadeOut('slow');
		$('#img' + newImage).parent().fadeIn('slow');
		
		actualImage = newImage;
		
	};
		
	function update(page) {
		checkGallery(page);
	}
	
	function clearStage() {
		if ($('.subnav').length > 0) {
			$('.subnav').remove();
		}
		if ($('.backgrounds-gallery').length > 0) {
			var $left  = $('.galleryarrow.left'),
					$right = $('.galleryarrow.right');
					
					$left.unbind();
					$right.unbind();
					
					$left.remove();
					$right.remove();
					
			$('.backgrounds-gallery').fadeOut('slow', function() {
				$('.backgrounds-gallery').remove();
			});
			$('#bgSlider_1').fadeIn('slow');
		}
	}
	
	api.initialize  = initialize;
	api.update      = update;
	api.clearStage  = clearStage;
	
	return api;
}

/*
 *	Function for opening Ticketportal iframe
 */
function openTicketBox() {
	$('body').append('<div class="ticketbox"><div class="holder"><a class="overlay_close ticketclose" href=""></a><iframe src="http://retro.ticketportal.sk/defaultPartner.asp?IDPartner=57" width="755" height="410" frameborder="0"></iframe></div></div>');
	$('.ticketbox').css({
		'top'     : sk.vivamusica.utils.Sizes().whHeight - 450 * .5,
		'left'    : sk.vivamusica.utils.Sizes().whWidth - 800 * .5 + 60
	});
	$('.ticketclose').css({
		'position': 'absolute',
		'top'     : -30,
		'right'   : 0
	});
	$('.ticketclose').on('click', function(e) {
		e.preventDefault();
		$('.ticketclose').remove();
		$('.ticketbox').remove();
	});
}

/*
* Library for Image loading
*/
function MainLoaderLite() {
	// total number of items to load
	var items = [];
	
	// array of listeners (progress and complete listeners in this version)
	var listeners = [];
	
	// total number of items
	var totaltoload = 0;
	
	// add item to item array
	this.addItem = function(oItem) {
		items.push(oItem);
		
		// increment total number of items
		totaltoload++;
	};
	
	// initialize preloading
	this.init = function() {
		var itemslen = items.length;
				
		// go throught all items and start loading
		while(itemslen--) {
			items[itemslen].startPreload();
		}
	};
	
	// after first set up call function will self rewrite, so another call will execute callback function
	this.addProgressListener = function(callback) {
		this.addProgressListener = function(args) {
			callback(args);
		}
		
		listeners.push(this.addProgressListener);
	};
	
	this.addCompleteListener = function(callback) {		
		this.addCompleteListener = function(args) {
			(function(e) {
				if (e.toload === 0) {
					callback();
				}
			})(args);
		};
		
		listeners.push(this.addCompleteListener);
	};
	
	// item is loaded
	this.loaded = function(oItem) {
		totaltoload--;
				
		var oData = {
					toload: totaltoload,
					total : items.length
				},
				len = listeners.length;
	
		// call all listeners
		for (var i = 0; i < len; i++) {
			listeners[i](oData);
		}
	};	
	
	this.getItems = function() {
		return items;
	};
};

MainLoaderLite.prototype.addImage = function(sUrl, sId) {
	var img = new ImageLoader(sUrl, this);
	// if img tag id is provided then add it to img object
	if (sId)
		img.id = sId;
	
	this.addItem(img);
	
	return img.img;
};


/*
* Object for new image
*/
function ImageLoader(sUrl, oMainLoader) {
	var self   = this,
			mainLoader = oMainLoader;
	
	this.img = new Image();
	this.id  = '';
	
	this.startPreload = function() {
		//self.img.addEventListener('load', onLoad);
		
		self.img.onload = onLoad;
		self.img.src = sUrl;
	};
	
	var onLoad = function() {
		removeEvents();
		mainLoader.loaded(self);
	};
	
	var removeEvents = function() {
		//self.img.removeEventListener('load', onLoad);
	};
};

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);