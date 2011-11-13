$(function() {
  window.Rating = Backbone.Model.extend({
    defaults: {
      thumbs_up: "+",
      comment: 0
    },

    url: function() {
      return "/api/comments/" + this.get('comment') + "/rate/";
    }
  });
});
