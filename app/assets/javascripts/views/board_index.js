TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function () {
    var formView = new TrelloClone.Views.BoardNew({
      collection: this.collection
    });
    this.addSubview(".board-form", formView);
    
    this.listenTo(this.collection, 'sync add', this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});