import React from 'react'
import config from './config'
import ApiContext from './ApiContext.js'

class AddFolder extends React.Component {
    static contextType=ApiContext;

    render() {
        return (
    <form onSubmit={((e)=> {
        e.preventDefault();
        let data = {
            name: e.target.folderName.value,

        }
        console.log(data);
        if(data.name === '') {
            alert('please complete the required fields');
            return false;
        }

        fetch(`${config.API_ENDPOINT}/folders`, {
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
            .then(folder => {
            this.context.addFolder(folder)
            this.props.history.push('/');
            })
            .catch(error => {
            console.error({ error })
            }) 
        
    } )}>
        
        <label htmlFor='nameInput'>folder name*</label>
        <input id='nameInput' type="text" name="folderName" placeholder="New Folder Name"></input>        
        <button>Create Folder</button>

    </form>
    )}
}

export default AddFolder;