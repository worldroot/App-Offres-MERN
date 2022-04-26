const mongoose  = require ('mongoose');
const Demande = require('../models/Demande');

module.exports = async function(req, res, next ){

    const { demandeId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(demandeId)){
        return res.status(404).json({
            error: '404 invalid ID'
        })
    }

    try {
        
        let dem = await Demande.findById(demandeId)
                    

        if(!dem){
            return res.status(403).json({
                error: 'Product 404'
            })
        }


        req.dem = dem
        next()

    } catch (error){
        console.log(error);
        res.send('Error in by id file');
    }
}