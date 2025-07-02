// auth/useAuth0.js
import * as AuthSession from 'expo-auth-session';
import { auth0Domain, auth0ClientId } from './authConfig';

export async function loginWithAuth0() {
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const authUrl =
    `https://${auth0Domain}/authorize` +
    `?client_id=${auth0ClientId}` +
    `&response_type=token` +
    `&scope=openid profile email` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const result = await AuthSession.startAsync({ authUrl });

  if (result.type === 'success') {
    const { access_token } = result.params;

    const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const user = await userInfoResponse.json();
    return user;
  } else {
    throw new Error("Login cancelado o fallido");
  }
}
