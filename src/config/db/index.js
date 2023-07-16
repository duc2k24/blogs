const mongoose = require('mongoose');


async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1/test_dev');;

        console.log('successfully');

    }catch(err) {
        console.log('error connecting');
    }

}

module.exports = {connect};