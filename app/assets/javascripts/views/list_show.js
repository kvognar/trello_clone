TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  
  initialize: function () {
    var newCardView = new TrelloClone.Views.CardNew({
      collection: this.model.cards()
    });
    
    
    // this.model.cards().forEach(function (card) {
    //   this.addCard(card);
    // }.bind(this));
    this.addSubview('.card-form', newCardView);
    
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
  },
  
  addCard: function (card) {
    // alert("maybe it works!");
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
  }
});