var Viva = Viva || {};

Viva.Admin = new function() {
	var NewsModel,
		newsitem,
		NewsView,
		newsview,
		NewsCollection,
		coll,

		$holder = $('.novinky'),
		$btnnew = $('.new'),
		$window = $(window),

		addnew  = null;

		// Model of news
		NewsModel = Backbone.Model.extend({
			defaults : {
				date  : '',
				title : ''
			},
			urlRoot: 'app/data/admin_news.php',
			url: function() {
				var base = this.urlRoot;

				return (this.id) ? base + '?id=' + encodeURIComponent(this.id) : base;
			}
		});

		// View of news
		NewsView = Backbone.View.extend({
			tagElem: 'li',			
			initialize: function() {
				this.model.bind('change',_.bind(this.render, this));
			},
			events: {
				'click .edit'   : 'edit',
				'click .delete' : 'clear'
			},
			initialize: function() {
                this.listenTo(this.model, 'destroy', this.remove);
            },
			render: function() {
	    		this.$el.html(render('newstemplate',this.model.toJSON()));

	    		return this;
			},
			edit: function() {
				addnew = new AddEditNews(true,this.model.attributes);
				console.log(this.model.attributes);
			},
			clear: function() {
				var retVal = confirm("Naozaj zmazat?");
				    if(retVal === true){
				       this.model.destroy();
					   return true;
				    }else{
				 	  return false;
				    }
			}

		});

		// Collection news
		NewsCollection = Backbone.Collection.extend({
			model : NewsModel,
			url   : 'app/data/admin_news.php'
		});

		// Collection view of news
		var NewsCollView = Backbone.View.extend({
			tagName : 'ul',
			className : 'novinky',
			initialize: function() {
				this.collection.bind('add', _.bind(this.addOne, this));
				this.collection.bind('reset',_.bind(this.render, this));
			},
			render : function() {
				this.collection.each(this.addOne, this);
			},
			addOne: function(newsItem) {
				var newsview = new NewsView({model:newsItem});
					this.$el.prepend(newsview.render().el);
			}
		});

		//Init news collection
		coll = new NewsCollection();
		var newslist = new NewsCollView({collection:coll});

			// Fetch collection
			coll.fetch({reset: true});

			$holder.append(newslist.el);

			// Add new news functionality
			$btnnew.on('click', function(e) {
				e.preventDefault();

				addnew = new AddEditNews();
			});

		// Function for adding new news
		function AddEditNews(type, obj) {
			var $master = $('.add-form'),
				$clone  = null,
				$cancel = $save = null;
				self    = this;

			this.cloneForm = function() {
				$clone = $master.clone();
				$clone.attr('id', 'addform');

				var date  = getDate(),
					title = txt = '';

				if (type) {
					date  = obj.date;
					title = obj.title;
					txt   = obj.txt;
				}

				$clone.find('input[name=date]').val(date);
				$clone.find('input[name=title]').val(title);
				$clone.find('textarea').val(txt);
				

				$('#main').append($clone);
				$clone.css({
					top  : $window.height() * .5 - $clone.height() * .5,
					left : $window.width() * .5 - $clone.width() * .5
				}).fadeIn();

				$clone.find('textarea').htmlarea();

				// Cancel event - will close add popup
				$cancel = $clone.find('.cancel');
				$cancel.on('click', function(e) {
					e.preventDefault();

					self.removeForm();
				});

				// Save event - will save data and destroy popup
				$save = $clone.find('.save');
				$save.on('click', function(e) {
					e.preventDefault();

					if (type) {
						var model = coll.get(obj.id);
							model.save({'date':$clone.find('input[name=date]').val(),'title':$clone.find('input[name=title]').val(),'txt':$clone.find('#txt').val()});
							self.removeForm();
					} else {
						self.createNews();
					}
				});
			}

			this.createNews = function() {
				var content = {
						date  : $clone.find('input[name=date]').val(),
						title : $clone.find('input[name=title]').val(),
						txt   : $clone.find('#txt').val()
					},
					toSave  = new NewsModel({'date':content.date,'title':content.title,'txt':content.txt});
					toSave.save();
					coll.add(toSave);

					self.removeForm();
			}

			this.removeForm = function() {
				$clone.fadeOut(function() {
					$clone.remove();
				});
			}

			this.cloneForm();
		}

};

Viva.login = new function() {
	var $form = $('#form-login'),
		$name = $('input[name=name]'),
		$pswd = $('input[name=pwd]'),
		$btn  = $('.btn-login'),

		error = null;

		$form.submit(function(e) {
			e.preventDefault();

			error = false;

			// Check if both fields are filled
			checkForError($name);
			checkForError($pswd);

			// If all fields have content make AJAX call
			if (!error) {
				$.ajax({
			        dataType: 'text',
			        type: 'POST',
			        url: 'app/data/login.php',
			        data: {
			          name: $name.val(),
			          pswd: $pswd.val()
			        },
			        success: function (data) {
			          if (data != 'success') {
			          	if (data == 'Zly login.') $name.addClass('error');
			          	if (data == 'Zle heslo.') $pswd.addClass('error');
			          	
			          	$form.append('<p class="error">' + data + '</p>');
			          } else {
			          	window.location.href = 'admin.php';
			          }
			        }
				});
			}
		});

		// Checking if fields are not empty
		// if true set error state
		function checkForError(obj) {
			if (!Viva.checkField(obj)) {
				error = true;
				obj.addClass('error');
			}
		}
};

// Caching templates
function render(tmpl_name,tmpl_data) {
	if (!render.tmpl_cache) {
		render.tmpl_cache = {};
	}

	if (!render.tmpl_cache[tmpl_name]) {
		var tmpl_dir = 'assets/static/templates',
			tmpl_url = tmpl_dir + '/' + tmpl_name + '.html',
			tmpl_string;

			$.ajax({
				url:tmpl_url,
				method:'GET',
				async: false,
				dataType: 'html',
				success: function(data) {
					tmpl_string = data;
				}
			});

			render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
	}

	return render.tmpl_cache[tmpl_name](tmpl_data);
}

// Get data format for actual day
function getDate() {
	var today  = new Date(),
		cDay   = today.getDate(),
		cMonth = today.getMonth(),
		day    = (cDay < 10) ? '0' + cDay : cDay,
		month  = (cMonth < 10) ? '0' + cMonth : cMonth,
		year   = today.getFullYear();

		return day + '.' + month + '.' + year;
}

Viva.checkField = function(obj) {
	return (obj.val() !== '') ? true : false;
};