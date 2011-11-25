var NotesApp = (function(){

	var App = {
		stores: {},
		views: {}
	}

	//Initialize localStorage Data Store
	App.stores.notes = new Store('notes');

	//Note Model
	var Note = Backbone.Model.extend({
		//Use localStorage datastore
		localStorage: App.stores.notes,

		initialize: function(){
			if (!this.get('title')) {
				this.set({title: "Note @ " + Date()})
			};

			if (!this.get('body')) {
				this.set({body: "No Content"})
			};
		}

	});

	//Note new form View
	var NewNoteForm = Backbone.View.extend({
		events: {
			"submit form" : "createNote"
		},

		createNote: function(event) {
			var attrs = this.getAttributes();

			var note = new Note();

			note.set(attrs);
			note.save();

			//Stop the browser default behavior
			event.preventDefault();

			//Stop jQuery Mobile from doing it's magic
			event.stopPropagation();

			// Close the dialog box
			$('.ui-dialog').dialog('close');

			this.reset();



		},

		getAttributes: function(){
			return {
				title: this.$('form [name="title"]').val(),
				body: this.$('form [name="body"]').val()
			}
		},

		reset: function() {
			this.$('input, textarea').val('');
		}

	});

	$(document).ready(function(){
		// Executed only when the DOM is ready, e.g. the html page is loaded
		App.views.newForm = new NewNoteForm({
			el: $('#new')
		});
	});

	window.Note = Note;

	return App;

})();