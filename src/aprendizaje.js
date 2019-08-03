
/*https://www.robinwieruch.de/node-express-server-rest-api/*/


import 'dotenv/config';

console.log(process.env.MY_SECRET);

function decir(palabra) {
  console.log(palabra);
}

function multiplicar(a,b){
    return a*b;
}



function ejecutar(algunaFuncion, valor) {
  algunaFuncion(valor);
}

ejecutar(function (decir){console.log(decir)}, "Hola");

/**********REST  INDEX.JS************/
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();


let users = {
  1: {
    id: '1',
    username: 'Anthony ',
  },
  2: {
    id: '2',
    username: 'Daniel',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
    
        app.get('/users', (req, res) => {
            return res.send(Object.values(users));
        });
        
        app.get('/users/:userId', (req, res) => {
          return res.send(users[req.params.userId]);
        });
        
        
        
        app.get('/messages', (req, res) => {
            return res.send(Object.values(messages));
        });
        
        
        app.get( '/messages/:messageId',(req,res)=>{
                 return res.send(messages[req.params.messageId]); 
               }
            );
            
            
          app.post('/messages', (req, res) => {
          
          const message = {
            id:   req.body.id,
            text: req.body.text,
          };
        
          messages[req.body.id] = message;
        
          return res.send(message);
        });        
        
        
        app.post('/users', (req, res) => {
          return res.send('POST HTTP method on user resource');
        });
        
        app.put('/users/:userId', (req, res) => {
          return res.send(
            `PUT HTTP method on user/${req.params.userId} resource`,
          );
        });
        
        app.delete('/users/:userId', (req, res) => {
          return res.send(
            `DELETE HTTP method on user/${req.params.userId} resource`,
          );
        });

app.listen(process.env.PUERTO, () =>
  console.log(`Example app listening on port ${process.env.PUERTO}!`),
);

/*************/