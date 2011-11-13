$(function() {
  var Application = Backbone.Router.extend({
    initialize: function() {
      this.commentListView = new CommentListView();
      comments.fetch();
    },

    routes: {
      '': "home",
      'comments/:id': "comments",
      'comments/:id/': "comments"
    },

    home: function() {
      console.log(location.href);

      $('#douchy_comment_single').replaceWith($("<div>").attr("id", "douchy_comments").append(this.commentListView.render().el));
    },

    comments: function(id) {
      console.log('/comments/' + id);

      var comment = comments.find(function(comment) { return comment.get('id') === parseInt(id, 10); });
      var bigCommentView = new CommentView({
        template: _.template($("#comment-big").html()),
        model: comment,
        tagName: 'div',
        id: 'douchy_comment_single'
      });

      $('#douchy_comments').replaceWith(bigCommentView.render().el);
    }
  });

  window.Application = new Application();
  Backbone.history.start({pushState: true});
});

$(document).ready(function(){
  $("a.login").click(function(){
    $("#overlay").append((new LoginView()).render().el)

    return false;
  });
  $("#logo > a").click(function(){
    Application.navigate('', true);

    return false;
  });
});
