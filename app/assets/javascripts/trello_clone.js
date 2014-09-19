window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    
    TrelloClone.router = new TrelloClone.Routers.BoardRouter({
      $el: $("#main")
    });
    
    Backbone.history.start();
  }
};
