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
		$('.subnav').append('<li><a class="renaultBold" href="#/galeria">2010</a></li><li><a class="renaultBold" href="#/galeria/2009">2009</a></li><li><a class="renaultBold" href="#/galeria/2008">2008</a></li>');
		
		checkGallery(subpage);
	};
	
	function checkGallery(id) {
		if ($('.backgrounds-gallery').length > 0) {
			$('.backgrounds-gallery').fadeOut('slow', function() {
				$('.backgrounds-gallery').remove();
				createNewGallery(id);
			});
			$('#bgSlider_1').parent().fadeIn('slow');
		} else {
			createNewGallery(id);
		}
	}
	
	function createNewGallery(id) {
		$main.append('<ul class="backgrounds-gallery"></ul>');
		initLoader(id);
	}
	
	function initLoader(id) {
		preloader = null;
		preloader = new MainLoaderLite();
		
		if ((id == '2010') || (id == '')) {
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
			
			$('#bgSlider_1').parent().fadeOut('slow');
			$('#img1').parent().fadeIn('slow');
						
			if ($('.galleryarrow').length == 0) 
				initArrows();
		});
			
		preloader.init()
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
			'z-index'  : 10
		});
		$right.css({
			'position' : 'absolute',
			'top'      : $(window).height() * .5 - $left.height() * .5,
			'right'    : 0,
			'z-index'  : 10
		});
		
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
			$('#bgSlider_1').parent().fadeIn('slow');
		}
	}
	
	api.initialize  = initialize;
	api.update      = update;
	api.clearStage  = clearStage;
	
	return api;
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
		self.img.addEventListener('load', onLoad);
		
		self.img.src = sUrl;
	};
	
	var onLoad = function() {
		removeEvents();
		mainLoader.loaded(self);
	};
	
	var removeEvents = function() {
		self.img.removeEventListener('load', onLoad);
	};
};