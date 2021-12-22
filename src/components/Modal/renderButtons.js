import React from 'react';
import Buttons from './Buttons';

const renderButtons = handleClose => {
  const ActionButtons = actions => (
    <Buttons actions={actions} handleClose={handleClose} />
  );

  ActionButtons.displayName = 'ActionButtons';

  return ActionButtons;
};

export default renderButtons;
