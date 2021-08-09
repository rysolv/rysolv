import React from 'react';
import T from 'prop-types';

import DragAndDrop from 'components/DragAndDrop';

const DragAndDropComponent = ({ form, handleUpdateFiles, id }) => (
  <DragAndDrop
    accept=".doc,.docx,.pdf,.txt"
    handleUpdateFiles={handleUpdateFiles}
    label=""
    multiple={false}
    value={form[id].value}
  />
);

DragAndDropComponent.propTypes = {
  form: T.object.isRequired,
  handleUpdateFiles: T.func.isRequired,
  id: T.string.isRequired,
};

export default DragAndDropComponent;
