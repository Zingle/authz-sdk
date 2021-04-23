/**
 * Authz SDK for developing websites using the authz authentication service to
 * authenticate.  This SDK should be served from the same host as the authz
 * authentication service so that the SDK can auto-detect the service URL.
 */

// providers supported by this version of the SDK
const providers = new Set(["google"]);
// authz service endpoint auto-detected based on SDK host
const authzURL = new URL("/", import.meta.url);

/**
 * Authenticate using an OAuth provider.  Flow can be "popup" or a callback
 * URL where the JWT will be posted.
 * @param {string} provider
 * @param {string|URL} flow
 */
export function oauth(provider, flow) {
    if (!providers.has(provider)) {
        console.error(`authz provider '${provider}' not supported by SDK'`);
        return;
    }

    window.location.replace(new URL(`/${provider}?authz=${flow}`, authzURL));
}

/**
 * Present popup authentication window.  The popupURL should be the same origin
 * as the caller.  The popupURL should authenticate and fetch a JWT.  Upon
 * success, the popup should use Window.postMessage to pass the JWT back to the
 * window.opener.  The posted HWT will be passed to the callback.
 * @param {URL|string} popupURL
 * @param {function} callback
 */
export function popupForJWT(popupURL, callback) {
    window.addEventListener("message", messageListener);
    const popup = window.open(popupURL, "innerWidth=400px,innerHeight=300px");

    function messageListener({origin, data}) {
        if (origin != authzURL.origin) return;    // filter out noise
        callback(data);
        popup.close();
        window.removeEventListener("message", messageListener);
    }
}

/**
 * Return a JWT back to the window which opened this one.
 * @param {string} jwt
 */
export function returnJWT(jwt) {
    const {opener} = window;
    opener.postMessage(jwt, "*");
}
