$(function() {
  window.Comment = Backbone.Model.extend({
    defaults: {
      id: 0,
      comment: "",
      price: 1.00,
      user: {},
      created_at: Date()
    },

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
