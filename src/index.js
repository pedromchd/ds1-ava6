import React from 'react';
import ReactDOM from 'react-dom/client';
import cx from 'classnames';
import './index.css';

function App() {
    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
