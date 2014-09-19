TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    
    var newListView = new TrelloClone.Views.ListNew({
      collection: this.model.lists()
    });
    this.addSubview('.list-form', newListView);
    
    this.model.lists().each(this.addList.bind(this));
  },
  
  events: {
    'sortstop': 'saveSort'
  },
  
  saveSort: function (event) {
    var board = this.model;
    var listOrder = $(event.currentTarget)
                    .find('.list-show')
                    .map(function(idx, list) { return $(list).data('id')});

    listOrder.each(function (index, id) {
      console.log(board.lists().get(id));
      console.log(id + " " + index)
      //set each list ord and save
      var list = board.lists().get(id);
      if (list.get("ord") !== index) {
        list.set("ord", index);
        list.save();
      }
      board.lists().sort();
      
      // debugger
      
      //also need to update board lists()

    });

  },
  
  addList: function (list) {
    var listView = new TrelloClone.Views.ListShow({
      model: list
    });
    this.addSubview('.list-container', listView);
  },
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.$('.list-container').sortable();
    return this;
  }
});