$(function() {
  window.CommentView = Backbone.View.extend({
    tagName: "div",

    template: _.template($("#comment").html()),

    initialize: function() {
      _.bindAll(this, 'render');

      this.model.bind('change', 'render');
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    }
  });

  window.CommentListView = Backbone.View.extend({
    tagName: "div",
    className: "comment-list",

    initialize: function() {
      _.bindAll(this, 'render');

      Comments.bind('all', this.render, this);
      Comments.fetch();
    },

    render: function() {
      Comments.each(function(comment) {
        commentView = new CommentView({model: comment});

        $(this.el).append(commentView.render().el);
      });

      return this;
    }
  });
});
