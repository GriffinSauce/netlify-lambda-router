const { pathToRegexp } = require('path-to-regexp');

const GET = 'GET';
const POST = 'POST';
const ANY = 'ANY';

// Return a clean API path
const cleanPath = path => path.replace('/.netlify/functions', '');

const getPath = event => cleanPath(event.path);

// Convert wildcard character to match whatever
const convertWildcard = path => path.replace('*', '(.*)');

// Takes output from path-to-regex and converts to a simple object
const parseParams = (match, keys) =>
  keys.reduce((memo, key, index) => {
    return {
      ...memo,
      [key.name]: match[index + 1],
    };
  }, {});

// Match the path and return url params - see path-to-regexp
const matchPath = ({ event, path }) => {
  const keys = [];
  const regexp = pathToRegexp(convertWildcard(path), keys);
  const match = regexp.exec(getPath(event));
  return {
    match,
    params: match ? parseParams(match, keys) : {},
  };
};

const createRouter = () => {
  const handlers = [];

  const createHandler = method => {
    return (path, handler) => {
      handlers.push({
        method,
        path,
        handler,
      });
    };
  };

  return {
    get: createHandler(GET),

    post: createHandler(POST),

    any: createHandler(ANY),

    handle: (event, context) => {
      let res;
      handlers.some(({ method, path, handler }) => {
        if (method !== ANY && event.httpMethod !== method) return;

        const { match, params } = matchPath({ event, path });
        if (!match) return;

        res = handler({ params, event, context });
        return true; // Handled, exit
      });
      return res;
    },
  };
};

module.exports = createRouter;
