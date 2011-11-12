$(function() {
  window.Comment = Backbone.Model.extend({
    defaults: {
      comment: "",
      price: 1.00,
      username: "",
      created_date: new Date()
    }
  });
});
