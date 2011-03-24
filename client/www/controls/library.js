////////////////////////////////////////////////////////////////////////////////
// Video Library
////////////////////////////////////////////////////////////////////////////////
var yalp = yalp || {};

yalp.controls = (function (controls, $, data) {
	controls.library = function () {
		var self = Object.create(controls.control()),
				onInit = function () {};
		
		//////////////////////////////
		// Business methods

		// returns a jQuery object with ALL checkboxes
		function checkboxes() {
			return $('#' + self.id + ' td.check > :checkbox');
		}
		
		// returns a jQuery object with CHECKED checkboxes
		function checked() {
			return $('#' + self.id + ' td.check > :checked');
		}

		// selects all elements in visible library
		self.selectAll = function () {
			checkboxes().attr('checked', 'checked');
		};
		
		// deselects all elements in visible library
		self.selectNone = function () {
			checkboxes().removeAttr('checked', 'checked');
		};
		
		// returns mediaids for selected items
		self.selection = function () {
			var result = [];
			checked().each(function () {
				result.push(controls.lookup[$(this).closest('.media').attr('id')].data.row.mediaid);
			});
			return result;
		};
		
		// (re-)loads library contents
		self.load = function () {
			var $document = $(document),
					title = $document.attr('title').split(' - ')[0];
			data.media.init(controls.search.filter, function () {
				// setting active library in page title
				$document.attr('title', title + ' - ' + controls.switcher.selected);
				// initializing tag data buffer
				data.tags.init();
				// external event handler
				onInit();
			});
			return self;
		};
		
		//////////////////////////////
		// Event handlers

		self.onInit = function (handler) {
			onInit = handler;
			return self;
		};
				
		//////////////////////////////
		// Overrides

		function build() {
			var page = data.media.getPage(controls.pager.page, controls.pager.items),
					i;
			self.clear();
			for (i = 0; i < page.length; i++) {
				controls.media(page[i]).appendTo(self);
			}
		}

		self.html = function () {
			build();
			
			var result, i;
			if (self.children.length) {
				result = ['<table id="', self.id, '" class="media">'];
				for (i = 0; i < self.children.length; i++) {
					result.push(self.children[i].html());
				}
				result.push('</table>');
			} else {
				result = ['<span id="', self.id, '" class="empty">You have no videos in this library. Import a folder below.</span>'];
			}
			return result.join('');
		};

		return self;
	}();
	
	return controls;
})(yalp.controls || {},
	jQuery,
	yalp.data);

