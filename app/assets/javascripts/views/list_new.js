// TODO: Set ord to length of current collection

TrelloClone.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],
  
  render: function () {
    var renderedContent = this.template({
      board: this.collection.board
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  events: {
    "submit #new-list-form": "create"
  },
  
  create: function (event) {
    event.preventDefault();
    var lists = this.collection
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON();
    formData.list.ord = this.collection.length; 
    var newList = new TrelloClone.Models.List(formData.list);
    newList.save({}, {
      success: function () {
        lists.add(newList);
        $form.find('#list-title').val('');
      }
    });
    
  }
});