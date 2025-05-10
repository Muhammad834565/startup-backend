const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');



// create user profile
router.post('/', profileController.createUser);



// GET all entrepreneurs
router.get('/entrepreneurs',auth, profileController.getEntrepreneurs);


// GET single entrepreneur by ID
router.get('/entrepreneurs/:id',auth, profileController.getEntrepreneurById);


// GET all investors
router.get('/investors', auth, profileController.getInvestors);


// GET single investor by ID
router.get('/investors/:id',auth, profileController.getInvestorById);


// GET any user by ID
router.get('/:id', auth, profileController.getUserById);


// UPDATE user profile
router.put('/', auth, profileController.updateUser);


module.exports = router;
