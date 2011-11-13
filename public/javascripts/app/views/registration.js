$(function() {

  window.RegistrationView = Backbone.View.extend({
    className: 'view container',
    template: _.template($("#register").html()),

    events: {
      'click a.register': 'register',
      'click a.cancel': 'cancel'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'renderOrganization');

      this.organizationModels = new Organizations();
      this.organizationModels.bind('reset', this.renderOrganization);
      this.organizationModels.fetch();

      this.model = User;
      this.model.bind('reset', 'render');
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      return this;
    },

    renderOrganization: function(){
      var container = this.$("ul").empty();
      
      this.organizationModels.each(function(model){
        var data = model.toJSON();
        var hold = parseInt(data.money_accumilated/20, 10) || 1;

        container.append(
          $("<li>").append(
            $("<img>").attr('src', '/static/images/jar_inactive_' + hold + '.png')
          ).append(
            $("<p>").html(data.name)
          ).click(function(){
            model.select();
          })
        );
      });
      
      return this;
    },

    register: function(){
      var view = this;

      function postComment(){
        var model = new Comment({
          comment: view.$("[name=comment]").val(),
          organization: view.$("[name=organization]").val(),
          user_name: view.model.get("username")
        });

        model.save().success(function(){
          comments.add(model);
          view.remove();
          $("#overlay").addClass("hide");
        });
      }

      if (typeof(view.model.get("id")) == "undefined") {
        var model = this.model.set({
          username: this.$("[name=username]").val(),
          password: this.$("[name=password]").val(),
          first_name: this.$("[name=first_name]").val(),
          last_name: this.$("[name=last_name]").val(),
          email: this.$("[name=email]").val()
        });

        model.save().success(function(){
          postComment();
        });
      } else {
        postComment();
      }

      return false;
    },

    cancel: function(){
      this.remove();
      $("#overlay").addClass("hide");

      return false;
    }
  });

});
