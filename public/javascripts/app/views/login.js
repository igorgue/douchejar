$(function() {

  window.LoginView = Backbone.View.extend({
    className: 'view container',
    template: _.template($("#login").html()),

    events: {
      'click a.login': 'login',
      'click a.cancel': 'cancel',
      'keypress input': 'filterOnEnter'
    },

    initialize: function() {
      _.bindAll(this, 'render');

      this.model = new Login();
      this.model.bind('reset', 'render');
    },

    filterOnEnter: function(e) {
      if(e.keyCode != 13) return;
      this.login();
    },

    render: function() {
      $(this.el).html(this.template());

      return this;
    },

    login: function(){
      var view = this;

      view.$(".error").remove();

      var model = view.model.set({
        username: this.$("[name=username]").val(),
        password: this.$("[name=password]").val()
      });

      model.save().success(function(){
        view.remove();
        $("#overlay").addClass("hide");
        $('a.logout').show();
        $('a.login').hide();

        comments.fetch();
      }).error(function(request){
        var data = jQuery.parseJSON(request.responseText);

        for(key in data)
          view.$("[name=" + key + "]").before($("<span>").addClass("error").html(data[key].join(", ")));

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
