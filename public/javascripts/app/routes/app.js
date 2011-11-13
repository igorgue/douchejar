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

      $('#content_single_comment').remove();
      $("#content").show();
    },

    comments: function(id) {
      console.log('/comments/' + id);

      $("#content").hide();

      var comment = comments.find(function(comment) { return comment.get('id') === parseInt(id, 10); });
      var bigCommentView = new CommentView({
        template: _.template($("#comment-big").html()),
        model: comment
      });

      $('body').append(bigCommentView.render().el);
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
});
