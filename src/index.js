import React from 'react';
import ReactDOM from 'react-dom/client';
import cx from 'classnames';
import './index.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
