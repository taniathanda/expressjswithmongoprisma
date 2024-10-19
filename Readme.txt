1. create working folder
2. in Terminal, Run "npm init -y" (in this stage, package.json will appear)
3. Run "npm i @prisma/client bcryptjs ejs express express-ejs-layouts express-session jsonwebtoken mongodb prisma"/ after run, all will go into package.json
4. Run "npm install env"
5. in .env file, declare database URL from mongodb (in mongodb, in Database/connect, you can copy database link)
5. Run "npx prisma init" (in this stage, prisma folder will appear)
6. Write code for schema.prisma
7. Write Controllers (authController)
8. Write routes (authRoute.js)
9. postcontrollers / indexRoute.js/ postsRoute.js
10. views
11. app.js

Notes = posts/layout.ejs => for that code, must run "express-ejs-layouts" first as above step
Notes = in Terminal, npx prisma generate <-- must run it whenever after changes in schema.prisma

--------------------------
Prisma website 
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb
Prisma means no need to write sql query, Learn from below link
https://www.prisma.io/docs/orm/prisma-client/queries
You can read in note-Prisma.js 


mongodb
https://cloud.mongodb.com/

==================================================================

notes
------
render means to go view folder
linking style.css has problem if use layout.ejs , thats why, commented css part in layout.ejs

-------------
Listen this Recording files for details --> Day 30- 30-09-2024 mongodb prisma expressjs/ Day 31 / Day 32 file
 