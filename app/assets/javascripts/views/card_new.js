TrelloClone.Views.CardNew = Backbone.View.extend({
  template: JST['cards/new'],
  
  render: function () {
    var renderedContent = this.template({
      list: this.collection.list
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  events: {
    "submit .new-card-form": "create"
  },
  
  create: function (event) {
    event.preventDefault();
    var cards = this.collection
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON();
    var newCard = new TrelloClone.Models.Card(formData.card);
    newCard.save({}, {
      success: function () {
        cards.add(newCard);
        $form.find('.card-title').val('');
      }
    });
    
  }
});