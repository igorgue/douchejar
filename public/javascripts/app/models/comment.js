$(function() {
  window.Comment = Backbone.Model.extend({
    defaults: {
      id: 0,
      comment: "",
      price: 1.00,
      user: {},
      created_at: Date()
    }
  });

  window.Comments = Backbone.Collection.extend({
    model: Comment,
    url: "/comments"
  });
});
