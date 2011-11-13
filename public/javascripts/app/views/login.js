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

      var model = view.model.set({
        username: this.$("[name=username]").val(),
        password: this.$("[name=password]").val()
      });
      
      model.save().success(function(){
        view.remove();
        $("#overlay").addClass("hide");
      });

      return false;
    },

    cancel: function(){
      this.remove();
      $("#overlay").addClass("hide");

      return false;
    }
  });

});