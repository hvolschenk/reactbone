import React from 'react';
import { hot } from 'react-hot-loader/root';

import User from 'data/models/user';
import useModel from 'shared/hooks/use-model';

const Application = () => {
  const [, user] = useModel(new User({ id: 1 }));
  React.useEffect(() => {
    user.fetch();
  }, []);
  console.log('RENDER', user.toJSON());
  return (
    <p>{JSON.stringify(user.toJSON(), null, 2)}</p>
  );
};

export default hot(Application);
