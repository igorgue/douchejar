$(function() {
  window.CommentView = Backbone.View.extend({
    tagName: "li",

    template: _.template($("#comment").html()),

    events: {
      'click .thumbup': "thumbsUp",
      'click .thumbdown': "thumbsDown",
      'click .comment-link': "openComment"
    },

    initialize: function(attributes) {
      if(typeof attributes.template !== 'undefined') {
        this.template = attributes.template;
      }

      _.bindAll(this, 'render');

      this.ratingModel = new Rating({ comment: this.model.get('id') });

      if(this.model.get("rating_thumbs_up") !== null) {
        this.ratingModel.set({
          id: this.model.get("rating"),
          thumbs_up: this.model.get("rating_thumbs_up")? "+": "-"
        });
      }
      
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

      var commentView = this;

      this.ratingModel.set({ thumbs_up: "+" });

      this.ratingModel.save({}, {
        success: function() {
          $(commentView.el).
            find('.thumbdown').
            attr('class', "thumbdown disabled").
            click(function() {
              return false;
            });

          $(commentView.el).find('.thumbup').click(function() { return false; });
          $(commentView.el).find('.thumbup').attr('style', "cursor: default;");
          $(commentView.el).find('.thumbdown').attr('style', "cursor: default;");
        }
      });

      return false;
    },

    thumbsDown: function() {
      console.log('thumbs-down for ' + this.model.get('id'));

      var commentView = this;

      this.ratingModel.set({ thumbs_up: "-" });

      this.ratingModel.save({}, {
        success: function() {
          $(commentView.el).
            find('.thumbup').
            attr('class', "thumbup disabled").
            click(function() {
              return false;
            });

          $(commentView.el).find('.thumbdown').click(function() { return false; });
          $(commentView.el).find('.thumbdown').attr('style', "cursor: default;");
          $(commentView.el).find('.thumbup').attr('style', "cursor: default;");
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
    tagName: "ul",

    initialize: function() {
      _.bindAll(this, 'render');
      comments.bind('all', this.render, this);
    },

    render: function() {
      $(this.el).empty();
      var commentListView = this;

      comments.each(function(comment) {
        commentView = new CommentView({model: comment});

        $(commentListView.el).append(commentView.render().el);
      });

      $('#douchy_comments').append(this.el);

      return this;
    }
  });
});
