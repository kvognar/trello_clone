TrelloClone.Routers.BoardRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "boards/:id": "show",
    "boards/new": "new"
  },
  
  initialize: function (options) {
    this.$el = options.$el;
  },
  
  index: function () {
    TrelloClone.boards.fetch();
    var indexView = new TrelloClone.Views.BoardIndex({
      collection: TrelloClone.boards
    })
    
    this._swapView(indexView);
  },
  
  show: function (id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({
      model: board
    });
    this._swapView(showView);
  },
  
  _swapView: function (newView) {
    if (this._currentView) { this._currentView.remove(); }
    this._currentView = newView;
    this.$el.html(newView.render().$el);
  }
  
})