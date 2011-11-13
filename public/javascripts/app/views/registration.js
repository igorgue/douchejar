$(function() {

  window.RegistrationView = Backbone.View.extend({
    className: 'view container',
    template: _.template($("#register").html()),

    events: {
      'click a.register': 'register',
      'click a.cancel': 'cancel',
      'keypress input': 'filterOnEnter'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'renderOrganization');

      this.organizationModels = new Organizations();
      this.organizationModels.bind('reset', this.renderOrganization);
      this.organizationModels.fetch();
      this.organizationModels.selected = {id: null};

      this.model = User;
      this.model.bind('reset', 'render');
    },

    filterOnEnter: function(e) {
      if(e.keyCode != 13) return;
      this.register();
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));

      this.renderOrganization();

      return this;
    },

    renderOrganization: function(){
      var container = this.$("ul").empty();
      var view = this;
      
      view.organizationModels.each(function(model){
        var data = model.toJSON();
        var hold = parseInt(data.money_accumilated/20, 10) || 1;

        container.append(
          $("<li>").append(
            $("<img>").attr({'src': '/static/images/jar_inactive_' + hold + '.png', title: '$' + data.money_accumilated})
          ).append(
            $("<p>").html(data.name)
          ).click(function(){
            $(this).parent().find("li").removeClass("selected");
            $(this).addClass("selected");

            view.organizationModels.selected = model;
          })
        );
      });
      
      return this;
    },

    register: function(){
      var view = this;

      view.$(".error").remove();

      function postComment(){
        var model = new Comment({
          comment: view.$("[name=comment]").val(),
          organization: view.organizationModels.selected.id,
          user_name: view.model.get("username")
        });

        model.save().success(function(){
          comments.add(model);
          view.remove();
          $("#overlay").addClass("hide");
        }).error(function(request){
          var data = jQuery.parseJSON(request.responseText);

          for(key in data)
            view.$("[name=" + key + "]").before($("<span>").addClass("error").html(data[key].join(", ")));

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
          $('a.logout').show();
          $('a.login').hide();
          view.render();

          postComment();
        }).error(function(request){
          var data = jQuery.parseJSON(request.responseText);

          for(key in data)
            view.$("[name=" + key + "]").before($("<span>").addClass("error").html(data[key].join(", ")));

          if(data["__all__"])
            alert(data["__all__"].join(", "));

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
