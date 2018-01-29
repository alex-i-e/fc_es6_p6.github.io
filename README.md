# fc_es6_p5.github.io
NodeJS - server

Start the project:

0) npm i ( + install nodemon globally)
1) with node: 
npm run start
2) with nodemon:
npm run start_ndm

- Emulating CRUD API with simple response (check with Postman and Fiddler), see [routes.js].

For example, [GET]:
http://localhost:3000/api/blogs,
http://localhost:3000/api/blogs/123
- As template engine used the Pug 

index.pug for http://localhost:3000, error.pug for other ones not including in CRUD API
- As logger used the winston (file + console)
