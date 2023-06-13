const { response } = require('express');



const hellow = async( req,res = response ) => {
    console.log('In the hellow controller')
    res.status(200).json({
        msg: 'We are doing well ;)'
    });
}



module.exports = {
    hellow,
}