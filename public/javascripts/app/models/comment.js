$(function() {
  window.Comment = Backbone.Model.extend({
    defaults: {
      comment: "",
      price: 1.00,
      user: {},
      created_at: Date()
    },

    url: "/api/comments/",

    timeAgo: function(){
      return prettyDate(this.get("created_at"));
    }
  });

  window.Comments = Backbone.Collection.extend({
    model: Comment,
    url: "/api/comments/"
  });

  window.comments = new Comments();
});
