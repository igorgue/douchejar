$(function() {
  window.Rating = Backbone.Model.extend({
    defaults: {
      thumbs_up: "+",
      comment: 0
    },

    url: function() {
      var id = this.get('comment');

      if(!id) {
        id = 0;
      }

      return "/api/comments/" + this.get('comment') + "/rate/";
    }
  });
});
