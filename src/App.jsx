import React, { useState, useEffect } from 'react';
import cx from 'classnames';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={cx('font-["Open_Sans"]', { 'dark': darkMode })}>
            <button onClick={() => setDarkMode(!darkMode)}>Set dark mode</button>
        </div>
    );
}

export default App;
