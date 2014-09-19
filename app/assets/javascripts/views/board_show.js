TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function() {
    
    var newListView = new TrelloClone.Views.ListNew({ 
      collection: this.model.lists()
    });
    this.addSubview('.list-form', newListView);
    
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
  },
  
  addList: function (list) {
    debugger
    var listView = new TrelloClone.Views.ListShow({
        model: list
      });
    this.addSubview('.list-container', listView);

  },
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});