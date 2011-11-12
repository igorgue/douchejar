$(function() {
  var Application = Backbone.Router.extend({
    initialize: function() {
      this.commentListView = new CommentListView();
    },

    routes: {
      '': "home",
      '/comment/:id': "comment"
    },

    home: function() {
      this.commentListView.render();
    },

    comment: function(id) {
      console.log('/comment/' + id);
    }
  });

  window.Application = new Application();
  Backbone.history.start();
});
