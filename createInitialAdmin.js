// createInitialAdmin.js
/*const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const createInitialAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const email = 'codewithayush45@gmail.com';
    const password = 'adminayush#45'; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
        userId: 'initialAdmin',
        email,
        password: hashedPassword,
        yearOfBirth: 2004,
        phoneNumber: '09922396947',
        role: 'admin',
        isEmailVerified: true
    });

    await newAdmin.save();
    console.log('Initial admin user created.');
    mongoose.connection.close();
};

createInitialAdmin().catch(err => {
    console.error('Error creating initial admin:', err);
    mongoose.connection.close();
});
*/