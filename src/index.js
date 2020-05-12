import React from 'react';
import ReactDOM from 'react-dom';

import App from 'views';
import registerServiceWorker from 'utils/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
