const express = require('express');
const router = express.Router();
const Tache = require('../models/tache.model');

// Create a new task
router.post('/taches', async (req, res) => {
  const tache = new Tache(req.body);
  try {
    await tache.save();
    res.status(201).send(tache);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Affichage des taches 
router.get('/taches', async (req, res) => {
  try {
    const taches = await Tache.find();
    res.status(200).send(taches);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get a task by id
router.get('/taches/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const tache = await Tache.findById(_id);
    if (!tache) {
      return res.status(404).send();
    }
    res.status(200).send(tache);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update a task by id
router.patch('/taches/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['titre', 'description', 'statut'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    console.log('Modification impossible! Champs invalides:', updates);
    return res.status(400).send({ error: 'Modification impossible! Champs invalides' });
  }

  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) {
      return res.status(404).send();
    }

    updates.forEach((update) => (tache[update] = req.body[update]));
    await tache.save();
    console.log('Tâche mise à jour avec succès:', tache);
    res.send(tache);
  } catch (e) {
    console.error('Erreur lors de la mise à jour de la tâche:', e);
    res.status(400).send(e);
  }
});

module.exports = router;
