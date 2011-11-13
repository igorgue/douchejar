$(function() {
  window.CommentView = Backbone.View.extend({
    tagName: "div",

    template: _.template($("#comment").html()),

    events: {
      'click .thumbs-up': "thumbsUp",
      'click .thumbs-down': "thumbsDown",
      'click .comment-link': "openComment"
    },

    initialize: function(attributes) {
      if(typeof attributes.template !== 'undefined') {
        this.template = attributes.template;
      }

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
        comment: this.model.get('id'),
        thumbs_up: "+"
      });

      rating.save({}, {
        success: function() {
          $(commentView.el).
            find('.thumbs-down').
            attr('class', "thumbs-down disabled").
            click(function() {
              return false;
            });
        }
      });

      return false;
    },

    thumbsDown: function() {
      console.log('thumbs-down for ' + this.model.get('id'));

      var commentView = this;

      var rating = new Rating({
        comment: this.model.get('id'),
        thumbs_up: "-"
      });

      rating.save({}, {
        success: function() {
          $(commentView.el).
            find('.thumbs-up').
            attr('class', "thumbs-up disabled").
            click(function() {
              return false;
            });
        }
      });

      return false;
    },

    openComment: function(event) {
      var href = $(event.currentTarget).attr("href");

      Application.navigate(href.substr(1, href.length), true);
      
      return false;
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
