var Viva = Viva || {};
Viva.Admin = new function() {
	var NewsItem,
		newsItem,
		newsView,
		news,
		NewsColl,
		newsColl,

		$holder = $('.novinky'),
		$btnnew = $('.new'),
		$window = $(window),

		addnew  = null;

		NewsItem = Backbone.Model.extend({
			defaults : {
				date  : '',
				title : ''
			},
			urlRoot: 'app/data/admin_news.php',
			url: function() {
				var base = this.urlRoot;

				return base + '?id=' + encodeURIComponent(this.id);
			}
		});

		NewsView = Backbone.View.extend({
			tagElem: 'li',
			initialize: function() {
				this.model.bind('change',_.bind(this.render, this));
			},
			render: function() {
				var html = '<div class="box"><span class="datum">' + this.model.get('date') + '</span><p>' + this.model.get('title') + '</p><a class="button edit rounded">Editovat</a><a class="button delete rounded">Zmazat</a></div>';
	    			$(this.el).html(html);

	    		return this;
			}
		});

		NewsColl = Backbone.Collection.extend({
			model : NewsItem,
			url   : 'app/data/admin_news.php'
		});

		var NewsCollView = Backbone.View.extend({ //TodoListView
			tagName : 'ul',
			className : 'novinky',
			initialize: function() {
				console.log('init collection');
				this.collection.bind('reset',_.bind(this.render, this));
			},
			render : function() {
				this.collection.each(this.addOne, this);
			},
			addOne: function(newsItem) {
				var newsview = new NewsView({model:newsItem});
					$(this.el).prepend(newsview.render().el);
			}
		});
		newsColl = new NewsColl(); //todoList
		var newsViews = new NewsCollView({collection:newsColl});

		newsColl.fetch({reset: true});

		$holder.append(newsViews.el);

		// Add new news functionality
		$btnnew.on('click', function(e) {
			e.preventDefault();

			addnew = new AddNews();
		});

		// Function for adding new news
		function AddNews() {
			var $master = $('.add-form'),
				$clone  = null,
				$cancel = null;

			this.cloneForm = function() {
				var self = this;

					$clone = $master.clone();
					$clone.attr('id', 'addform');
					$('#main').append($clone);
					$clone.css({
						top  : $window.height() * .5 - $clone.height() * .5,
						left : $window.width() * .5 - $clone.width() * .5
					}).fadeIn();

					$clone.find('textarea').htmlarea();

					$cancel = $clone.find('.cancel');
					$cancel.on('click', function(e) {
						e.preventDefault();

						self.removeForm();
					});
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

Viva.checkField = function(obj) {
	return (obj.val() !== '') ? true : false;
};