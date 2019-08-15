const express = require("express")
const Mongoose = require("mongoose");
Mongoose.connect("mongodb://root:example@localhost/admin");
const server = express()

const PersonModel = Mongoose.model("balance", {
    account_id: Number,
    amount: Number
});

server.use(express.json());

server.post('/balance/events', async (request, response) => {
    var person = new PersonModel(request.body);
    await person.save();
    response.send("save");
})

server.get('/balance/events', async (request, response) => {

    var result =  await PersonModel.find().exec();
    response.send(result);
})

server.get('/balance/events/totalbalance', async (request, response) => {

    var result = await PersonModel.aggregate( [
        {

            $group:
                {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
        }
    ]);

    response.send(result)
})

server.delete('/balance/events', async (request, response) => {

    PersonModel.deleteMany({}).exec().then((doc) => {
        response.send(doc);
    });

})
server.listen(3000, () =>{
    console.log("start express server")
})

