TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",  
  
  cards: function () {
    if (this._cards === undefined) {
      this._cards = new TrelloClone.Collections.Cards([], {
        list: this
      });
    }
    return this._cards;
  },
  
  initialize: function (options) {
    var list = this;
    if (options.cards) {
      _.each(options.cards, function (cardOptions) {
        var card = new TrelloClone.Models.Card(cardOptions);
        list.cards().add(card);
      });
    }
    delete options.cards;
  },
  
  parse: function (response) {
    var list = this;
    if (response.cards) {
      _.each(response.cards, function(card) {
        newCard = new TrelloClone.Models.Card(card);
        list.cards().add(newCard);
      });
      
      delete response.cards;
    }
    return response;
  }
});