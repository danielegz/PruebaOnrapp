const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Cadena de conexión a MongoDB Atlas
const mongoUri = 'mongodb+srv://Testing:4537Welcome@cluster0.qnlihas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Definición del esquema y modelo de Mongoose
const userSchema = new mongoose.Schema({
  apiId: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Endpoint para obtener y almacenar Pokémon
app.post('/pokemon', async (req, res) => {
    try {
      const { characterId } = req.body;
      
      // Hacer la solicitud GET a la API de Pokémon utilizando el ID dinámico
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${characterId}`);
      
      // Extraer el ID y el nombre del Pokémon de la respuesta
      const { id, name } = response.data;
  
      // Buscar si ya existe un usuario con el mismo apiId y nombre
      const existingUser = await User.findOne({ apiId: id, name });
  
      // Si existe, actualizar el usuario y el campo updatedAt
      if (existingUser) {
        // Actualizar el campo updatedAt
        existingUser.updatedAt = new Date();
  
        // Guardar el usuario actualizado en la base de datos
        await existingUser.save();
  
        // Obtener la lista actualizada de usuarios
        const users = await User.find();
        return res.json(users);
      }
  
      // Si no existe, crear un nuevo usuario y guardarlo en la base de datos
      const newUser = new User({ apiId: id, name });
      await newUser.save();
  
      // Enviar la lista de usuarios como respuesta
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  
// Endpoint para obtener y almacenar personajes de Rick and Morty
app.post('/rickandmorty', async (req, res) => {
    try {
      const { characterId } = req.body;
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      const { id, name } = response.data;
  
      // Verificar si ya existe un usuario con el mismo apiId y nombre
      const existingUser = await User.findOne({ apiId: id, name });
  
      // Si existe, actualizar el usuario y el campo updatedAt
      if (existingUser) {
        // Actualizar el campo updatedAt
        existingUser.updatedAt = new Date();
  
        // Guardar el usuario actualizado en la base de datos
        await existingUser.save();
  
        // Obtener la lista actualizada de usuarios
        const users = await User.find();
        return res.json(users);
      }
  
      // Si no existe, crear un nuevo usuario y guardarlo en la base de datos
      const newUser = new User({ apiId: id, name });
      await newUser.save();
  
      // Enviar la lista de usuarios como respuesta
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  

// Endpoint para obtener y almacenar personajes de Star Wars
app.post('/starwars', async (req, res) => {
    try {
      const { characterId } = req.body;
      const response = await axios.get(`https://swapi.dev/api/people/${characterId}`);
      const { name } = response.data;
  
      // Verificar si ya existe un usuario con el mismo apiId y nombre
      const existingUser = await User.findOne({ apiId: characterId, name });
  
      // Si existe, actualizar el usuario y el campo updatedAt
      if (existingUser) {
        // Actualizar el campo updatedAt
        existingUser.updatedAt = new Date();
  
        // Guardar el usuario actualizado en la base de datos
        await existingUser.save();
  
        // Obtener la lista actualizada de usuarios
        const users = await User.find();
        return res.json(users);
      }
  
      // Si no existe, crear un nuevo usuario y guardarlo en la base de datos
      const newUser = new User({ apiId: characterId, name });
      await newUser.save();
  
      // Enviar la lista de usuarios como respuesta
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
