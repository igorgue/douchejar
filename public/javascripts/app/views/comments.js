$(function() {
  window.CommentView = Backbone.View.extend({
    tagName: "div",

    template: _.template($("#comment").html()),

    events: {
      'click .thumbs-up': "thumbsUp",
      'click .thumbs-down': "thumbsDown"
    },

    initialize: function() {
      _.bindAll(this, 'render');

      this.model.bind('change', 'render');
    },

    render: function() {
      var data = this.model.toJSON();

      data.timeAgo = this.model.timeAgo();

      $(this.el).html(this.template(data));

      return this;
    },

    thumbsUp: function() {
      console.log('thumbs-up for ' + this.model.get('id'));

      var rating = new Rating({
        comment: this.get('id'),
        thumbs_up: true
      });

      rating.save();
    },

    thumbsDown: function() {
      console.log('thumbs-down for ' + this.model.get('id'));

      var rating = new Rating({
        comment: this.get('id'),
        thumbs_up: false
      });

      rating.save();
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
