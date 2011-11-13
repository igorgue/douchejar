$(function() {

  window.RegistrationView = Backbone.View.extend({
    className: 'view',
    template: _.template($("#register").html()),

    events: {
      'click a.register': 'register',
      'click a.cancel': 'cancel'
    },

    initialize: function() {
      _.bindAll(this, 'render');

      this.model = User;
      this.model.bind('reset', 'render');
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    register: function(){
      var view = this;

      var model = new Comment({
        comment: this.$("[name=comment]").val(),
        organization: this.$("[name=organization]").val(),
        user_name: this.model.get("username")
      });

      model.save().success(function(){
        comments.add(model);
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