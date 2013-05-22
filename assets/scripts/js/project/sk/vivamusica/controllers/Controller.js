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
		main             : 'Vivamusica! festival 2012',
		program          : 'Program',
		festival         : 'Festival',
		historia         : 'História',
		vstupenky        : 'Vstupenky',
		galeria          : 'Galéria',
		sienslavy        : 'Sieň slávy',
		media            : 'Média',
		team             : 'Team',
		partneri         : 'Partneri',
		kontakt          : 'Kontakt' 
	},
	titlesen 		 = {
		main             : 'Vivamusica! festival 2012',
		program          : 'Program',
		festival         : 'Festival',
		festivalhistory  : 'Festival - History',
		tickets          : 'Tickets',
		gallery          : 'Gallery',
		halloffame       : 'Hall of fame',
		media            : 'Media',
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
				obj.clearStage();
			}
			updateContent(page);
		} else {
			obj.update(subpage);
		}
		
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
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
						obj.initialize();
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
						obj.initialize();
					} break;
					case 'partneri' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'kontakt' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'vstupenky' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
						obj.initialize();
					} break;
					case 'galeria' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
						obj.initialize();
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
						obj.initialize();
					} break;
				}
			} else {
				switch(url) {
					case 'hall-of-fame' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'media' : {
						obj = new sk.vivamusica.sections.Media(subpage);
						obj.initialize();
					} break;
					case 'team' : {
						obj = new sk.vivamusica.sections.Team(subpage);
						obj.initialize();
					} break;
					case 'partners' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'contact' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'tickets' : {
						obj = new sk.vivamusica.sections.Textpage();
						obj.initialize();
					} break;
					case 'festival' : {
						obj = new sk.vivamusica.sections.Festival(subpage);
						obj.initialize();
					} break;
					case 'gallery' : {
						obj = new sk.vivamusica.sections.Galeria(subpage);
						obj.initialize();
					} break;
					default : {
						obj = new sk.vivamusica.sections.Program(subpage);
						obj.initialize();
					} break;
				}
			}
		});	
	}
	
	function updateTitle() {
		var tit = (sk.vivamusica.Vivamusica.getLanguage() == 'sk') ? titles : titlesen;
		page = page.split('-').join('');
		var topTitle = (subpage) ? subpage : '';
		var subtitle = ((page == 'team') || (page == 'program') || (page == 'media')) ? '' : subpage;
		
		if ((page == 'galeria') || (page == 'gallery')) {
			var title = (subtitle) ? tit[page] + subtitle : tit[page] + '- 2010';
			$('#header h2').html(tit[page].toLowerCase() + ((subtitle) ? ' - ' + subtitle : ' - 2010').toLowerCase());
		} else {
			var title = (subtitle) ? tit[page] + tit[subtitle] : tit[page];
			$('#header h2').html(tit[page].toLowerCase() + ((subtitle) ? ' - ' + tit[subtitle] : '').toLowerCase());
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