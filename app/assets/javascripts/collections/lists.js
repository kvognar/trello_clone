TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  
  initialize: function (models, options) {
    this.board = options.board;
  },
  
  model: TrelloClone.Models.List
})