import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const contact = action.payload;
      if (contact.name === null || contact.name === '' || contact.name.trim() === '') {
      } else {
        return {
          ...state,
          contacts: [...state.contacts, action.payload]
        };
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => (contact.id === action.payload.id ? action.payload : contact))
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const reg = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(reg) || contact.email.match(reg);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      break;
  }
};
