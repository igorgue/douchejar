$(function() {
  var Application = Backbone.Router.extend({
    initialize: function() {
      this.commentListView = new CommentListView();
      comments.fetch();
    },

    routes: {
      '': "home",
      'comments/:id': "comments"
    },

    home: function() {
    },

    comments: function(id) {
      console.log('/comments/' + id);
    }
  });

  window.Application = new Application();
  Backbone.history.start({pushState: true});
});
