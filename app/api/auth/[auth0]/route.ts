// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: 'nestjs-api', // or AUTH0_AUDIENCE
            // Add the `offline_access` scope to also get a Refresh Token
            scope: 'openid profile email read:products'
            // or AUTH0_SCOPE
        }
    })
});