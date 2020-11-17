const Pets = require("../models/pets.model");

module.exports.findAllPets = async (req, res) => {
    try {
        let pets = await Pets.find({});
        res.json(pets);
    }
    catch (err){
        res.json(err);
    }
};

module.exports.findPet = async (req, res) => {
    try {
        let pet = await Pets.findById({
            _id: req.params.id
        });
        res.json(pet);
    }
    catch (err){
        res.json(err);
    }
};

module.exports.likePet = async (req, res) => {
    try {
        let pet = await Pets.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $inc: {likes: 1}
            }
        )
        res.json(pet);
    }
    catch (err){
        res.json(err);
    }
}

module.exports.createPet = async (req, res) => {
    try {
        let pet = await Pets.create(req.body);
        res.json(pet)
    }
    catch (err){
        res.status(400).json(err);
    }
};

module.exports.updatePet = async (req, res) => {
    try {
        let pet = await Pets.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
                $set: req.body
            }
        );
        res.json(pet)
    }
    catch (err){
        res.json(err);
    }
};

module.exports.deletePet = async (req, res) => {
    try {
        let result = await Pets.deleteOne({
            _id: req.params.id
        });
        res.json(result)
    }
    catch (err){
        res.json(err);
    }
};