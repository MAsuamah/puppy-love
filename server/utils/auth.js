const jwt = require('jsonwebtoken');
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';
// module.exports = {
//   signToken: function({ email, _id }) {
//     const payload = { email, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   }
// };

module.exports = {
    signToken: function({ username, email, _id}) {
        const payload = { user, email, _id };

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
      
        // if no token, return request object as is
        if (!token) {
          return req;
        }
        // when an error is thrown within a try block, it immediately skips to catch. This can prevent an excessive amount of error messages from being displayed when there is an error
        try {
          // decode and attach user data to request object
          const { data } = jwt.verify(token, secret, { maxAge: expiration });// if the secret here doesnt match the secret returned in line 11 by jwt.sign(), the token is invalid and the object will not be decoded
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object
        return req;
    }
}