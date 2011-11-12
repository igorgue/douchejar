$(function() {
  var Application = Backbone.Router.extend({
    routes: {
      '': "home",
      '/test': "test"
    },

    home: function() {
      console.log("/");
    },

    test: function() {
      console.log('/test');
    }
  });

  window.Application = new Application();
  Backbone.history.start();
});
