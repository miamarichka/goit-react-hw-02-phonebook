import React from 'react';
import { Form } from './Form';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList';

export class App extends React.Component {
  state = {
    contacts: [
      {name: 'Rosie Simpson', number: '459-12-56' },
      {name: 'Hermione Kline', number: '443-89-12' },
      {name: 'Eden Clements', number: '645-17-79' },
      {name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  formSubmitHandler = (data) => {
    const { name, number } = data;
  this.checkNewContact(name, number);
  }

  checkNewContact = (name, number) => {
    const isContactNameExist = this.state.contacts.some(
          contact => contact.name === name
    );
    const isContactNumberExist = this.state.contacts.some(
      contact => contact.number === number
    );

    isContactNameExist
      ? alert(`${name} is already in contacts`)
      : isContactNumberExist
      ? alert(`${number} is already in contacts`)
      : this.addContact(name, number);
  }

  addContact = (contactName, contactNumber) => {
    const contact = {
      name: contactName,
      number: contactNumber,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
     contacts: prevState.contacts.filter(contact=>contactId !== contact.name)
  }))
    }

  render() {
    const {filter} = this.state;
    const filteredConctacts = this.getFilteredContacts();

    return (
      <>
        <div className="container">
          <h1 className="phonebook__title title">PhoneBook</h1>
          <Form onSubmit={this.formSubmitHandler} />
          <h2 className="contact-list__title title">Contacts</h2>
          <Filter filter={filter} onChange={this.changeFilter} />
          <ContactsList
            contactsList={filteredConctacts}
            onDeleteContact={this.deleteContact} />
        </div>
      </>
    );
  }
}
