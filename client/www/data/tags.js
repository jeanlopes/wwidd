////////////////////////////////////////////////////////////////////////////////
// Tags Data
////////////////////////////////////////////////////////////////////////////////
var yalp = yalp || {};

yalp.data = function (data, jOrder, services) {
	data.tags = function () {
		var self = {
			table: null,

			// initializes data object: calls service, populates table
			init: function () {
				services.gettags(function (json) {
					var i, row;
					for (i = 0; i < json.data.length; i++) {
						row = json.data[i];
						row.tag = row.name + '\t' + row.kind;
					}
					self.table = jOrder(json.data)
						.index('tag', ['tag'], {ordered: true, type: jOrder.string})
						.index('name', ['name'], {ordered: true, grouped: true, type: jOrder.string});
				});
				return self;
			},

			// retrieves the first matching tag to a search term
			searchTag: function (term) {
				return (self.table.where([{tag: term}], {mode: jOrder.startof, renumber: true})[0] || {tag: ""}).tag.replace('\t', ':');
			},
			
			searchName: function (term) {
				return (self.table.where([{name: term}], {mode: jOrder.startof, renumber: true})[0] || {name: ""}).name;
			}
		};

		return self;
	}();
	
	return data;
}(yalp.data,
	jOrder,
	yalp.services);

