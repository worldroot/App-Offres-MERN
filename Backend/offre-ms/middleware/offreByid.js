const mongoose  = require ('mongoose');
const Offre = require('../models/Offre');

module.exports = async function(req, res, next ){

    const { offreId } = req.params;

    if(!mongoose.Types.ObjectId.isValid(offreId)){
        return res.status(404).json({
            error: '404 invalid ID'
        })
    }

    try {
        
        let offre = await Offre
                    .findById(offreId)
                    .populate('category')

        if(!offre){
            return res.status(403).json({
                error: 'Product 404'
            })
        }


        req.offre = offre
        next()

    } catch (error){
        console.log(error);
        res.send('Server Error');
    }
}