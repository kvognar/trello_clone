TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  attributes: function () {
    return {
      "data-id": this.model.id
    };
  },
  
  className: "card-view",
  
  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});