import React from 'react';

const useModel = (baseModel) => {
  const [json, setJSON] = React.useState(baseModel.toJSON());
  const [model, setModel] = React.useState(baseModel);
  React.useEffect(() => {
    model.on('change reset sync', () => {
      console.log('CHANGE', model.toJSON());
      setJSON(model.toJSON());
      setModel(model);
    });
  }, []);
  return [json, model];
};

export default useModel;
