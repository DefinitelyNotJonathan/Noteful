import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from '../notesHelpers'
import ApiContext from '../ApiContext'

class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <Link to="/add-folder">Add a folder</Link>
        </div>
      </div>
    )
  }
}


export default NoteListNav;