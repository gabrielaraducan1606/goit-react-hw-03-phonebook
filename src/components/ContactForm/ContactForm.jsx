import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css'

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumberPattern = /^\+?\d{1,4}[- ]?\(?\d{1,3}\)?[- ]?\d{1,4}[- ]?\d{1,4}[- ]?\d{1,9}$/;
  
    if (!phoneNumberPattern.test(number)) {
      alert("Phone number is not valid. It should contain only digits and may include spaces, dashes, parentheses, or start with +.");
      return;
    }
  
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
        <input
  type="text"
  name="name"
  pattern="^[a-zA-Z]+((['\-\s][a-zA-Z])?[a-zA-Z]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  value={name}
  onChange={handleNameChange}
/>
      </label>
      <label className={styles.label}>
        Number
        <input
  type="tel"
  name="number"
  title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
  required
  value={number}
  onChange={handleNumberChange}
/>

      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
