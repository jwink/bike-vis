
BikeVisApp.Views.FavoritesListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'all', this.render);
  },
  tagName: 'ul',
  render: function() {
    var that = this;
    this.$el.empty();
    _.each(this.collection.models, function(favorite) {
        var favoriteView = new BikeVisApp.Views.FavoritesIndex({model: favorite});
        that.$el.append(favoriteView.render().el);
    });
    return this;
  }

});
