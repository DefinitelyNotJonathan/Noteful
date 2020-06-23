import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import {getNotesForFolder} from '../notesHelpers'
import PropTypes from 'prop-types'



class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={String(note.id)}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>

        <Link to="/add-note">Add a note</Link>
        
      </section>
    )
  }
}

NoteListMain.propTypes={
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default NoteListMain;
