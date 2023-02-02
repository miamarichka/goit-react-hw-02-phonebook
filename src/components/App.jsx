import React from 'react';
import { nanoid } from 'nanoid'

export class App extends React.Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  inputNameId = nanoid()
  inputPhoneId = nanoid()

  handleOnInputChange = (e) => {
    this.setState({ 
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleOnFormSubmit = (e) => {
    e.preventDefault()
    const { name, number } = this.state;
   this.addContact(name, number)
    this.setState({name: '', number: ''})
  }

  addContact = (contactName, contactNumber) => {
    const contact = {
      name: contactName,
      number: contactNumber
    };
    this.setState(prevState => ({
      contacts:[contact, ...prevState.contacts],
     }))
  }

  render() {
    const { contacts, name, number } = this.state;
    return (
      <>
        <div className="phonebook__container container">
          <h2 className="phonebook__title title">PhoneBook</h2>
          <form onSubmit={this.handleOnFormSubmit}>
            <label htmlFor={this.inputNameId} className="phonebook__label">
              Name
            </label>
            <input
              className="phonebook__input"
              id={this.inputNameId}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleOnInputChange}
            />
            <label htmlFor={this.inputPhoneId} className="phonebook__label">
              Number
            </label>
            <input
              className="phonebook__input"
              id={this.inputPhoneId}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleOnInputChange}
            />
            <button type="submit" className="phonebook__btn">
              Add contact
            </button>
            <div />
          </form>
        </div>

        <div className="contact-list__container container">
          <h2 className="contact-list__title title">Contacts</h2>
          <ul className="contact-list">
            {contacts.map(contact => {
              return (
                <li className="contact-list__item" key={nanoid()}>
                  {contact.name}: {contact.number}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
