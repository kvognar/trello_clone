TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: "api/cards",
  
  initialize: function (models, options) {
    this.list = options.list;
  },
  
  model: TrelloClone.Models.List
});