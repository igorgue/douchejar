$(function() {
  window.Organization = Backbone.Model.extend({
    defaults: {
      name: ""
    },

    selected: false

  });

  window.Organizations = Backbone.Collection.extend({
    model: Organization,
    url: "/api/organizations",

    selected: function(){
      return $(this.models()).filter(function(index, model){
        return model.get("selected");
      });
    }

  });

});
