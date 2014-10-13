TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  className: "card-view",
  events: {
    'click button.remove-card': 'delete'
  },
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  
  attributes: function () {
    return {
      "data-id": this.model.id
    };
  },
  
  delete: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});