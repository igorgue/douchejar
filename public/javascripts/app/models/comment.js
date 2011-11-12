$(function() {
  window.Comment = Backbone.Model.extend({
    defaults: {
      comment: "",
      price: 1.00,
      user: {},
      created_at: Date()
    }
  });
});
