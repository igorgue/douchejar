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
      comments.fetch();
    },

    comment: function(id) {
      console.log('/comment/' + id);
    }
  });

  window.Application = new Application();
  Backbone.history.start();
});
