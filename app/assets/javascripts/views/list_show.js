TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  initialize: function () {
    var newCardView = new TrelloClone.Views.CardNew({
      collection: this.model.cards()
    });
    
    
    this.model.cards().forEach(function (card) {
      this.addCard(card);
    }.bind(this));
    this.addSubview('.card-form', newCardView);
    
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
  },
  
  attributes: function() {
    return {
      "data-id": this.model.id
    };
  },
  
  className: "list-view",
  
  events: {
    "sortstop .card-container": "saveSort"
  },
  
  saveSort: function (event, ui) {
    event.stopPropagation();
    console.log("card swap");
    
    var $card = ui.item;
    var oldParent = this.model; // event is called by original owner of card
    var $newParent = $card.parent().parent();
    var newParent = oldParent.collection.get($newParent.data('id'));
    var $siblings = $card.parent().find('.card-view');
    var landingCardOrder = $siblings.map(function(idx, card) { 
      return $(card).data('id');
    });
    
    if (oldParent !== newParent) {
      var movedCard = oldParent.cards().get($card.data('id'));
      movedCard.set('list_id', newParent.id);
      oldParent.cards().remove(movedCard);
      newParent.cards().add(movedCard, { silent: true });
    }
    
    landingCardOrder.each(function (index, id) {
      var card = newParent.cards().get(id);
      if (card.get("ord") !== index) {
        card.set("ord", index)
        card.save();
      }
    });
    newParent.cards().sort();
    this.onRender();

  },
  
  addCard: function (card) {
    var cardView = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview('.card-container', cardView);
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
  
  onRender: function () {
    this.$('.card-container').sortable({
      connectWith: '.card-container'
    });
  }
});