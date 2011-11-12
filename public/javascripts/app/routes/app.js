$(function() {
  var Application = Backbone.Router.extend({
    routes: {
      '': "home",
      '/comment/:id': "comment"
    },

    home: function() {
      console.log("/");
    },

    comment: function(id) {
      console.log('/comment/' + id);
    }
  });

  window.Application = new Application();
  Backbone.history.start();
});
