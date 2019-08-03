import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import models, { connectDb } from './models';


import routes from './routes';



const app = express();
    /*MIDDLEWARE*/
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
   app.use(async (req, res, next) => {
      req.context = {
        models,
        me: await models.User.findByLogin('rwieruch'),
      };
      next();
  });
       
    
    
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/usuarios', routes.usuario);
        
 
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
    ]);
    
    createUsersWithMessages();
  }

  app.listen(process.env.PUERTO, () =>
    console.log(`Example app listening on port ${process.env.PUERTO}!`),
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'rwieruch',
  });
  
  
  const message1 = new models.Message({
    text: 'Published the Road to learn React',
    user: user1.id,
  });

  await message1.save();
  await user1.save();
};