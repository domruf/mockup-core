define([
  'jquery',
  'underscore',
  'backbone',
  'mockup-docs-page-view',
  'mockup-docs-pattern-view'
], function($, _, Backbone, PageView, PatternView) {

  var Router = Backbone.Router.extend({
    routes: {
      'pattern/(:id)': 'pattern',
      '': 'defaultPage',
      '(:id)': 'page'
    },

    initialize: function(options) {
      if (options.app) {
        this.app = options.app;
      }
    },

    defaultPage: function() {
      this.page(this.app.defaultPage);
    },

    page: function(id) {
      this.app.$navigation.find('li.active').removeClass('active');
      this.app.$navigationRight.find('li.active').removeClass('active');
      if (this.app.$navigation.parents('#navigation.in').size() !== 0) {
        this.app.$navigation.parents('#navigation').collapse('hide');
      }
      this.show(new PageView({ model: this.app.pages.get(id) }));
    },

    pattern: function(id) {
      this.show(new PatternView({
        model: this.app.patterns.get(id)
      }));
    },

    show: function(view) {
      if (this.currentView !== undefined) {
        this.currentView.remove();
        delete this.currentView;
      }
      this.currentView = view;
      this.app.$content.html(this.currentView.render().$el);
      if (view.model) {
        view.model.trigger('shown', view.model);
      }
    }
  });

  return Router;
});