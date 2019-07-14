const formattedToken = ({ authorization }) => {
  if (!authorization) return undefined;

  const parts = authorization.split(' ');

  if (!parts.lenght === 2) return undefined;

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') return undefined;

  return token;
};


module.exports = { formattedToken };
