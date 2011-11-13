$(function() {
  window.Users = Backbone.Model.extend({
    defaults: {
      first_name: "",
      last_name: "",
      username: "",
      email: ""
    },

    url: "/api/user/"
  });
  
  window.Login = Backbone.Model.extend({
    defaults: {
      username: "",
      password: ""
    },

    url: "/api/login/",

    parse: function(data){
      window.User = window.User.set(data);
    }
  });
  
  window.User = new Users();
});
