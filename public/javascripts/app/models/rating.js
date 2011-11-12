$(function() {
  window.Rating = Backbone.Model.extend({
    defaults: {
      thumbs_up: true,
      comment: new Comment()
    }
  });
});
