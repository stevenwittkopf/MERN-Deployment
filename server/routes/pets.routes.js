const PetsController = require("../controllers/pets.controllers");

module.exports = (app) => {
    app.get("/api/pets/", PetsController.findAllPets);
    app.post("/api/pets/create/", PetsController.createPet);
    app.get("/api/pets/:id/", PetsController.findPet);
    app.patch("/api/pets/:id/update/", PetsController.updatePet);
    app.patch("/api/pets/:id/like/", PetsController.likePet);
    app.delete("/api/pets/:id/delete/", PetsController.deletePet);
};