The **authz-sdk** package provides a browser module that can be used to interact
with the authz daemon.  It facilitates building integrations with the Zingle
authentication service.

AuthZ SDK
=========
The AuthZ SDK should be served from the same host as the authz authentication
service.  The SDK auto-detects the authentication server based where it is being
served.

Functions
---------

### oauth
**oauth**(*provider*:string, *flow*:string)  

The **oauth** function begins the process of authenticating through an OAuth
provider.  The *provider* name must match an OAuth provider name handled by the
authz daemon.  The *flow* mode must be "popup".

Calling **oauth** redirects the browser to the OAuth provider site.  Upon
successful authentication, a JWT token will be generated.  How this token is
handled depends on the *flow* mode.

```js
import {oauth} from "https://authz.example.com/sdk/latest/authz-sdk.js";
oauth("google", "popup");
```

#### Flow: popup
In "popup" *flow* mode, the **oauth** function must be called from a popup
window that is hosted on the same origin as the window which opens the popup.
The popup window uses **Window.postMessage** to deliver the JWT to the window
that opened the popup.  The [popupForJWT](#popupForJWT) function can be used to
implement this flow for the window that opens the popup.

### popupForJWT
**popupForJWT**(*popupURL*:string|URL, *callback*:function)

The **popupForJWT** function begins the "popup" flow for authenticating with the
authz daemon.  This will open the *popupURL* page in a new window.  This page is
expected to negotiate a JWT token, then deliver it back to the window that opens
the popup using the **Window.postMessage** function on the opener window.  When
the JWT has been posted back to the opener window, the popup will be closed and
the JWT will be passed to the *callback*.  The [oauth](#oauth) function can be
used to implement this flow in the popup window.

```js
import {popupForJWT} from "https://authz.example.com/sdk/latest/authz-sdk.js";
// in this example, the login.html page should call the oauth function
popupForJWT("login.html", jwt => console.log(jwt));
```

### returnJWT
Returns a JWT to the client.  How this is accomplished depends on the flow mode
requested by the client.

#### Flow: popup
In "popup" flow mode, the **returnJWT** function will use **Window.postMessage**
on the window which opened the popup to deliver the JWT.
