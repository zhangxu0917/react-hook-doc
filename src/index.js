import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './NewFeature/Context01';
// import App from './NewFeature/Context02';
// import App from './NewFeature/Context03';
// import App from './NewFeature/Context04';
// import App from './NewFeature/lazy&Suspense/index';
// import App from './NewFeature/Memo01'
// import App from './NewFeature/Memo02';
// import App from './NewFeature/Memo03';
// import App from './Hooks/useState.jsx';
// import App from './Hooks/useEffect.jsx';
// import App from './Hooks/useContext.jsx';
// import App from './Hooks/useMemo.jsx';
import App from './Hooks/useRef.jsx';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
