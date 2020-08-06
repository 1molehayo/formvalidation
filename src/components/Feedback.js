import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const Feedback = props => {
  const { feedback, isSuccess } = props;

  return (
    <div
      className={classnames('feedback', {
        'bg-green': isSuccess,
        'bg-red': !isSuccess
      })}
    >
      <div className="feedback-container">
        <i
          className={classnames('fas', {
            'fa-check-circle': isSuccess,
            'fa-times': !isSuccess
          })}
        >
          {' '}
        </i>
        <span>{feedback}</span>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.string,
  isSuccess: PropTypes.bool
};
