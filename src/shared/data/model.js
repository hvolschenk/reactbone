import Backbone from 'backbone';

export const STATUS_FAILED = 'STATUS_FAILED';
export const STATUS_PENDING = 'STATUS_PENDING';
export const STATUS_SUCCEEDED = 'STATUS_SUCCEEDED';

const Model = Backbone.Model.extend({
  fetch: function fetch(options) {
    const self = this;
    this.listenTo(this, 'error', () => { self.status = STATUS_FAILED; });
    this.listenTo(this, 'sync', () => { self.status = STATUS_SUCCEEDED; });
    return Backbone.Model.prototype.fetch.call(this, options);
  },

  status: STATUS_PENDING,

  url: function url() {
    return `https://jsonplaceholder.typicode.com${this.urlRoot}/${this.get('id')}`;
  },
});

export default Model;
