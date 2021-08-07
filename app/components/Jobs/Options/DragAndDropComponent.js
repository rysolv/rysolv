import React from 'react';
import T from 'prop-types';

import DragAndDrop from 'components/DragAndDrop';

const DragAndDropComponent = ({ handleUpdateFiles }) => (
  <DragAndDrop
    accept=".doc,.docx,.pdf,.txt"
    handleUpdateFiles={handleUpdateFiles}
    label=""
    multiple={false}
  />
);

DragAndDropComponent.propTypes = { handleUpdateFiles: T.func.isRequired };

export default DragAndDropComponent;
