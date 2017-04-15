import uuid from 'uuid';
import * as actionTypes from '../constants/actionTypes';

/**
 * Checks if String is valid v4 id Plus TimeStamp for Note
 * @param  {String} id Id to be checked
 * @return {Boolean}
 */
function isV4PlusTime(id) {
  if(typeof id !== 'string') {
    return false;
  }

  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}-[0-9]{13}$/.test(id);
}

function createNoteId() {
    return uuid.v4() + "-" + Date.now();
}
/**
 * Returns the action to create a note
 * @param  {String} text Note text
 * @return {Object}
 */
function createNote(text) {
  if(typeof text !== 'string') {
    throw new Error(`params ${text}`);
  }

  return {
    type: actionTypes.CREATE_NOTE,
    payload: {
      id: createNoteId(),
      editing: false,
      text,
    },
  };
}

/**
 * Returns the action to update a note
 * @param  {Object} updatedNote Object with note properties to update. It must
 * have a valid id.
 * @return {Object}
 */
function updateNote(updatedNote) {
  if((typeof updatedNote !== 'object') || (!isV4PlusTime(updatedNote.id))) {
    throw new Error(`params ${updatedNote}`);
  }

  return {
    type: actionTypes.UPDATE_NOTE,
    payload: updatedNote,
  };
}

/**
 * Returns the action to delete a note
 * @param  {String} id Note id
 * @return {Object}
 */
function deleteNote(id) {
  if(!isV4PlusTime(id)) {
    throw new Error(`params ${id}`);
  }

  return {
    type: actionTypes.DELETE_NOTE,
    payload: {
      id,
    },
  };
}

export default {
  createNote,
  updateNote,
  deleteNote,
  createNoteId,
  isV4PlusTime,
};
