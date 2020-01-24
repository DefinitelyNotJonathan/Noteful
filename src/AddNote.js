import React from 'react'
import ApiContext from './ApiContext'
import config from './config'

class AddNote extends React.Component {
    static contextType=ApiContext;

    render() {
        return (
            <form onSubmit={((e)=> {
                e.preventDefault();
                let data = {
                    id:null,
                    name: e.target.noteName.value,
                    modified:null,
                    folderId: e.target.noteFolder.value,
                    content: e.target.noteContent.value
                }
                if(data.name === '') {
                    alert('please complete the required fields');
                    return false;
                } else if(data.content === '') {
                    alert('please complete the required fields');
                    return false;
                }

                fetch(`${config.API_ENDPOINT}/notes`, {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => {
                    if (!res.ok)
                        return res.json().then(e => Promise.reject(e))
                    return res.json()
                    })
                    .then(note => {
                    this.context.addNote(note)
                    this.props.history.push('/');
                    })
                    .catch(error => {
                    console.error({ error })
                    }) 
                
            } )}>
                
                <label htmlFor='nameInput'>note name*</label>
                <input id='nameInput' type="text" name="noteName" placeholder="New Note Name"></input>
                <label htmlFor='contentInput'>note content*</label>
                <textarea id='contentInput' type="text" name="noteContent"></textarea>
                <select name="noteFolder" >
                    {this.context.folders.map((folder)=> {
                        return (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        )
                    })}
                </select>
                <button>Create Note</button>

            </form>

            

        )
    }
}

export default AddNote;