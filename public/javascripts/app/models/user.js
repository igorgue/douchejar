$(function() {
  window.User = Backbone.Model.extend({
    defaults: {
      first_name: "",
      last_name: "",
      username: ""
    },

    url: "/api/user/"
  });
});
