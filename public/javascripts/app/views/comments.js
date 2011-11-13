$(function() {
  window.CommentView = Backbone.View.extend({
    tagName: "div",

    template: _.template($("#comment").html()),

    initialize: function() {
      _.bindAll(this, 'render');

      this.model.bind('change', 'render');
    },

    render: function() {
      var data = this.model.toJSON();

      data.timeAgo = this.model.timeAgo();

      $(this.el).html(this.template(data));

      return this;
    }
  });

  window.CommentListView = Backbone.View.extend({
    tagName: "div",
    className: "comment-list",

    initialize: function() {
      _.bindAll(this, 'render');
      comments.bind('all', this.render, this);
    },

    render: function() {
      var commentListView = this;

      comments.each(function(comment) {
        commentView = new CommentView({model: comment});

        $(commentListView.el).append(commentView.render().el);
      });

      $('body').append(this.el);

      return this;
    }
  });
});
