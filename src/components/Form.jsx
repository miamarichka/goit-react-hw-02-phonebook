import React from "react";
import { nanoid } from 'nanoid'

export class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };

  inputNameId = nanoid();
  inputPhoneId = nanoid();

  handleOnInputChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleOnFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state)
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
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
    );
  }
}