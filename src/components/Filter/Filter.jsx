import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
    return (
      <div>
        <label className={styles.nameLabel}>
          Find contacts by name
          <input type="text" value={value} onChange={onChange} />
        </label>
      </div>
    );
  }
  ;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
