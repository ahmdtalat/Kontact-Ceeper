import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext.js';
import { UPDATE_CONTACT } from '../../context/types.js';

function ContactForm() {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactContext
  );

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const { name, phone, email, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [useContext(ContactContext), current]);

  // on change
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  // clear all
  const clearAll = () => {
    clearCurrent();
  };

  // Submitting the form
  const onSubmit = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearAll();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current === null ? 'Add Contact' : 'Update Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type="submit"
          value={current === null ? 'Add Contact' : 'Save Changes'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div className="btn btn-light btn-block text-center" onClick={clearAll}>
          Clear
        </div>
      )}
    </form>
  );
}

export default ContactForm;
