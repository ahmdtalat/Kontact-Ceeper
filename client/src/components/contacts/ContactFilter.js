import React, { useEffect, useRef, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== null && text.current.value.trim() !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        onChange={onChange}
        placeholder="Filter Contacts...."
      />
    </form>
  );
};

export default ContactFilter;
