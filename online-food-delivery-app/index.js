import 'expo-router/entry';
import {Auth0Provider} from '@auth0/auth0-react'

console.log(
    process.env.REACT_APP_AUTH0_DOMAIN,
    process.env.REACT_APP_AUTH0_CLIENT_ID
)

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider>
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById("root")
);