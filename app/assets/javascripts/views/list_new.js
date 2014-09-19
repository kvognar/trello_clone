TrelloClone.Views.ListNew = Backbone.CompositeView.extend({
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
    var newList = new TrelloClone.Models.List(formData.list);
    newList.save({}, {
      success: function () {
        lists.add(newList);
        $form.find('#list-title').val('');
      }
    });
    
  }
});