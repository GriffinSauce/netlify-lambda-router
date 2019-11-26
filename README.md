# netlify-lamba-router

An express-like router for Netlify lambda functions. 

Just one dependency: `path-to-regexp`. The same library that express uses to parse/match paths.

## Status

While this worked fine for early versions of my app, I have moved from Netlify to Zeit Now where routing is filesystem based. This repo is currently unmaintained.

## Usage
```.js
const router = require('netlify-lambda-router')(); // Not quite, it's not published to NPM (yet)

router.get('/things/:id', async (req) => {
  const thing = await getThing(req.params.id);
  return {
    statusCode: 200
    body: JSON.stringify(thing)
  }
})

exports.handler = router.handle;
```

The signature is similar to express but instead of a `res` we simply return an object. More info on the return object in the [functions notes](FUNCTIONS.md).

## Todo

- mimic req better by translating event props
- document handlers and return value
- move cleanPath to an option
- document that it won't 404 by default _or_ return 404


License: MIT
