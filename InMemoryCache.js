/**
 * Constructor.
 */

function InMemoryCache() {
  this.clients = [
    {
      clientId: "thom",
      clientSecret: "nightworld",
      redirectUris: [""],
      grants: ["password"]
    }
  ];
  this.tokens = [];
  this.users = [{ id: "123", username: "thomseddon", password: "nightworld" }];
}

/**
 * Dump the cache.
 */

InMemoryCache.prototype.dump = function() {
  console.log("clients", this.clients);
  console.log("tokens", this.tokens);
  console.log("users", this.users);
};

/*
   * Get access token.
   */

InMemoryCache.prototype.getAccessToken = function(bearerToken) {
  var tokens = this.tokens.filter(function(token) {
    return token.accessToken === bearerToken;
  });

  return tokens.length ? tokens[0] : false;
};

/**
 * Get refresh token.
 */

InMemoryCache.prototype.getRefreshToken = function(bearerToken) {
  var tokens = this.tokens.filter(function(token) {
    return token.refreshToken === bearerToken;
  });

  return tokens.length ? tokens[0] : false;
};

/**
 * Get client.
 */

InMemoryCache.prototype.getClient = function(clientId, clientSecret) {
  var clients = this.clients.filter(function(client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });

  return clients.length ? clients[0] : false;
};

/**
 * Save token.
 */

InMemoryCache.prototype.saveToken = function(token, client, user) {
  const data = {
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    client: client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
    user: user,
    userId: user._id
  };

  this.tokens.push({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user: user
  });

  return data;
};

/*
   * Get user.
   */

InMemoryCache.prototype.getUser = function(username, password) {
  var users = this.users.filter(function(user) {
    return user.username === username && user.password === password;
  });

  return users.length ? users[0] : false;
};

InMemoryCache.prototype.saveAuthorizationCode = (code, client, user) => {
  let authCode = {
    authorization_code: code.authorizationCode,
    expires_at: code.expiresAt,
    redirect_uri: code.redirectUri,
    scope: code.scope,
    client_id: client.id,
    user_id: user.id
  };

  return {
    authorizationCode: authCode.authorization_code,
    expiresAt: authCode.expires_at,
    redirectUri: authCode.redirect_uri,
    scope: authCode.scope,
    client: { id: authCode.client_id },
    user: { id: authCode.user_id }
  };
};

/**
 * Export constructor.
 */

module.exports = InMemoryCache;
