$(function() {

  window.LoginView = Backbone.View.extend({
    className: 'view',
    template: _.template($("#login").html()),

    events: {
      'click a.login': 'login',
      'click a.cancel': 'cancel'
    },

    initialize: function() {
      _.bindAll(this, 'render');

      this.model = new Login();
      this.model.bind('reset', 'render');
    },

    render: function() {
      $(this.el).html(this.template());

      return this;
    },

    login: function(){
      var view = this;

      view.model.set({
        username: this.$("[name=username]").val(),
        password: this.$("[name=password]").val()
      }).save().success(function(){
        view.remove();
      });

      return false;
    },

    cancel: function(){
      this.remove();

      return false;
    }
  });

});