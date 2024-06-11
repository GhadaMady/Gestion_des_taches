const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  statut: {
    type: Boolean,
    default: false,
  },
});

const Tache = mongoose.model('Tache', tacheSchema); // Utiliser Tache au lieu de tache

module.exports = Tache;
