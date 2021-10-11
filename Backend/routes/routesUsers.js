const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

const rateLimit = require('express-rate-limit');

const passLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes : temps défini pour tester l'application
    max: 3 // 3 essais max par adresse ip
  });

try{
    router.post('/signup', userCtrl.signup);
    router.post('/login', passLimiter, userCtrl.login);
    router.get('/', auth, userCtrl.displayProfile);
    router.delete('/', auth, userCtrl.deleteUser);
    router.put('/', auth, userCtrl.updateProfile);
}catch (error){
    console.log(error);
}

module.exports = router;