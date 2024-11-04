import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  // Încarcăm contactele din localStorage atunci când componenta se montează
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  // Salvează contactele în localStorage ori de câte ori se modifică
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Adaugă un nou contact
  handleAddContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    // Verificăm dacă numele deja există în lista de contacte
    const duplicateContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    // Adăugăm contactul nou la lista de contacte și actualizăm state-ul
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  // Ștergem un contact
  handleDeleteContact = (id) => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: updatedContacts };
    });
  };

  // Gestionam schimbarea filtrului
  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  // Filtram lista de contacte pe baza filtrului
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;