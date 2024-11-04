import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css'

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.ul}>
    {contacts.map(({ id, name, number }) => (
      <ContactItem
        key={id}
        id={id}
        name={name}
        number={number}
        onDelete={onDeleteContact}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
