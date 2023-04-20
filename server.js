console.log(`from: \x1b[7m${__filename}\x1b[0m`);

// for (i = 0; i <=7 ; i++) {console.log(`i= ${i} `+`\x1b[${i};9${i}m Welcome to the app! \x1b[0m`);}
// for (i = 30; i <=37 ; i++) {console.log(`i= ${i} `+`\x1b[${i}m Welcome to the app! \x1b[0m`);}
// for (i = 90; i <=97 ; i++) {console.log(`i= ${i} `+`\x1b[${i}m Welcome to the app! \x1b[0m`);}
// return

const { json } = require("express");
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
//| Requirement models 
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
const express = require("express");
const dotenv = require("dotenv").config();
const Joi = require("joi");
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+

const app = express();
app.use(express.json());   



const items = [
  { id: 1, name: "user1", password: "password1" , email: "user1@abc.com" },    
  { id: 2, name: "user2", password: "password2" , email: "user2@abc.com" },    
  { id: 3, name: "user3", password: "password3" , email: "user3@abc.com" }
 ]

 const validateitemSchema = (item) => {

    const schema_syntax = {
        name: Joi.string().min(3).max(9).required(),
        password: Joi.string().min(3).max(9).required(),
        email: Joi.string().min(3).max(91).required()
    }
    
    return Joi.validate(item, schema_syntax);
};






//     ___     ___     _____               _       _        _    
//    / __|   | __|   |_   _|             /_\     | |      | |   
//   | (_ |   | _|      | |              / _ \    | |__    | |__ 
//    \___|   |___|     |_|      ___    /_/ \_\   |____|   |____|
//                              |___|                            
app.get('/api/items', (req, res) => {res.status(200).send(items)});


//     ___     ___     _____             _ 
//    / __|   | __|   |_   _|           / |
//   | (_ |   | _|      | |             | |
//    \___|   |___|     |_|      ___    |_|
//                              |___|      

app.get('/api/items/:id', (req, res) => {
    // Validate the item Id.
    if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).send('Invalid Id.');
    }
    
    const item_id = parseInt(req.params.id, 10);
    const item = items.find((inp_item) => {return inp_item.id === item_id;  });
    
    if (!item) {
    return res.status(404).send(`The item with the Id of ${req.params.id} was not found.`);
    }
    res.send(item);
    });









//    ___      ___      ___     _____ 
//   | _ \    / _ \    / __|   |_   _|
//   |  _/   | (_) |   \__ \     | |  
//   |_|      \___/    |___/     |_|  
//                                    
// curl -X POST http://localhost:5055/api/items -H "Content-Type: application/json" -d '{"name": "hani", "password": "m&dHye" , "email": "hani@hani.com" }'    
// {"name": "hani", "password": "m&dHye" , "email": "hani@hani.com" }
app.post('/api/items', (req, res) => {
const { error } = validateitemSchema(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

 const item = {
 id: items.length + 1,
 name: req.body.name ,
 password: req.body.password,
 email: req.body.email 
}
items.push(item)
res.status(200).send(item)
});




//    ___     _   _     _____ 
//   | _ \   | | | |   |_   _|
//   |  _/   | |_| |     | |  
//   |_|      \___/      |_|  
//                            
app.put('/api/items/:id', (req, res) => {
    // Validate the item Id.
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).send('Invalid Id.');
    }

    const item_id = parseInt(req.params.id, 10);
    const item = items.find((inp_item) => {return inp_item.id === item_id;  });





    // If not exists, return 400 - Bad Request.
    if (!item) {
        return res.status(404).send(`The item with the Id of ${req.params.id} was not found.`);
    }

    // Validate.
    const { error } = validateitemSchema(req.body);

    // If invalid, return 400 - Bad Request.
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update the item.
    item.name = req.body.name;
    item.password = req.body.password;
    item.email = req.body.email;

    // Return the updated item.
    items.forEach((element, index) => {
        if (element.id === item_id) {
            items[index] = item;
        }
    });

    res.send(item);
});


//    ___      ___     _        ___     _____     ___ 
//   |   \    | __|   | |      | __|   |_   _|   | __|
//   | |) |   | _|    | |__    | _|      | |     | _| 
//   |___/    |___|   |____|   |___|     |_|     |___|
//                                                    
app.delete('/api/items/:id', (req, res) => {
    // Validate the item Id.
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).send('Invalid Id.');
    }

    const item_id = parseInt(req.params.id, 10);
    const item = items.find((inp_item) => {return inp_item.id === item_id;  });



    // If not exists, return 400 - Bad Request.
    if (!item) {
        return res.status(404).send(`The item with the Id of ${req.params.id} was not found.`);
    }

    const itemIndex = items.indexOf(item);
    items.splice(itemIndex, 1);
    res.send(item);
});







//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
//| PORT is an environment variable or set in .env file (PORT=5005)
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
const port = process.env.PORT || 5000;
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
//| Starting server on port=PORT
//+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+
let date_ob = new Date();
app.listen(port, () => { console.log(`Server running on port ${port} start from ${date_ob}`);  });
  
