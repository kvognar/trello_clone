TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST['boards/new'],
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  events: {
    "submit #new-board-form": "create"
  },
  
  create: function (event) {
    event.preventDefault();
    var boards = this.collection;
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON();
    var newBoard = new TrelloClone.Models.Board(formData.board);
    newBoard.save({}, {
      success: function () {
        boards.add(newBoard);
        $form.find('#board-title').val("");
      }
    });
  }
  
  
})