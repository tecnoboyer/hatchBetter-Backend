const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        await mongoose.connect( 'mongodb+srv://leoboyer:d5ujQWxe7J8KwtJ1@todo.pzhp8i9.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
    
        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('WOH got a error at connection procedure');
    }


}



module.exports = {
    dbConnection
}