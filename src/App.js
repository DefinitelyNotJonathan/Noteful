import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from './NoteListNav/noteListNav';
import NotePageNav from './NotePageNav/notePageNav';
import NoteListMain from './NoteListMain/noteListMain';
import NotePageMain from './NotePageMain/notePageMain';
import ApiContext from './ApiContext';
import config from './config';
import STORE from './store';
import './App.css';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {

        this.setState(STORE);

        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId', ].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />


            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addNote: (note) => {
                this.state.notes.push(note);
                this.setState({notes:this.state.notes})
            },
            addFolder: (folder) => {
                this.state.folders.push(folder);
                this.setState({folders:this.state.folders})
            }
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <ErrorBoundary errorMessage='could not display NavRoutes'>
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    </ErrorBoundary>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                            </h1>
                        </header>
                    <ErrorBoundary errorMessage='could not display MainRoutes'>
                        <main className="App__main">{this.renderMainRoutes()}
                        </main>
                    </ErrorBoundary>
                    
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
