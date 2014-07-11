BikeVisApp.Views.FavoritesIndex = Backbone.View.extend({

  //template: JST['favorites/index']
  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'all', this.render);
  },
  tagName: 'li',
  render: function() {
    this.$el.html(this.model.attributes.label);
    return this;
  },
  events: {
    'click [data-action="release"]': 'releaseFavorite'
  },
  releaseFavorite: function() {
    this.model.destroy();
    return this;
  }
});
