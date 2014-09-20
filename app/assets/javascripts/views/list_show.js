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
    this.listenTo(this.model.cards(), 'remove', this.removeCard)
  },
  
  attributes: function() {
    return {
      "data-id": this.model.id
    };
  },
  
  className: "list-view",
  
  events: {
    "sortreceive .card-container": "receiveCard",
    "sortremove .card-container": "takeCard",
    "sortstop .card-container": "sortCards"
  },
  
  takeCard: function (event, ui) {
    console.log("remove card");
    var card = this.model.cards().get(ui.item.data('id'));
    var cardSubview = _.find(this.subviews('.card-container'), function (subview) {
      return subview.model === card;
    });
    this.removeSubview('.card-container', cardSubview);
    this.orderCards();
  },
  
  receiveCard: function (event, ui) {
    console.log("receive card");
    
    var list = this.model;
    var sender = list.collection.get(ui.sender.parent().data('id'));
    var card = sender.cards().get(ui.item.data('id'));
    
    // debugger
    
    this.orderCards(event, ui);
    
    card.set('list_id', list.id);
    card.save(); // will save again when sortCards is called
    list.cards().add(card, { silent: true });
    sender.cards().remove(card);
    this.sortCards()
  },
  
  // sortCards: function () {
  //   var cards = this.model.cards();
  //   var $cards = this.$el.find('.card-view');
  //   var cardOrder = $cards.map(function(idx, card) {
  //     return $(card).data('id');
  //   });
  //
  //   cardOrder.each(function (index, id) {
  //     var card = cards.get(id);
  //     if (card.get("ord") !== index) {
  //       card.set("ord", index)
  //       card.save();
  //     }
  //   });
  //
  //   // debugger
  //   // var cardOrder =
  // },
  
  sortCards: function (event) {
    if (event) { event.stopPropagation(); }
    console.log("card swap");

    var list = this.model;
    var $cards = this.$el.find('.card-view');
    var cardOrder = $cards.map(function(idx, card) { 
      return $(card).data('id');
    });
    
    
    cardOrder.each(function (index, id) {
      var card = list.cards().get(id);
      if (card.get("ord") !== index) {
        card.set("ord", index)
        card.save();
      }
    });

    list.cards().sort();
    this.subviews('.card-container').sort(function(view1, view2) {
      return view1.model.get('ord') - view2.model.get('ord');
    });

    // this.onRender();

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