TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",
  
  lists: function () {
    if (this._lists === undefined) {
      this._lists = new TrelloClone.Collections.Lists([], {
        board: this
      });
    }
    return this._lists;
  },
  
  parse: function (response) {
    var board = this;
    if (response.lists) {
      _.each(response.lists, function(list) {
        newList = new TrelloClone.Models.List(list);
        board.lists().add(newList);
      });
      
      delete response.lists;
    }
    return response;
  }
})