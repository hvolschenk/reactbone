import Backbone from 'backbone';

import User from 'data/models/user';

const Users = Backbone.Collection.extend({
  model: User,
});

export default Users;
