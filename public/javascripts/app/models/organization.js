$(function() {
  window.Organization = Backbone.Model.extend({
    defaults: {
      name: ""
    },

  });

  window.Organizations = Backbone.Collection.extend({
    model: Organization,
    url: "/api/organizations",

    selected: null

  });

});
