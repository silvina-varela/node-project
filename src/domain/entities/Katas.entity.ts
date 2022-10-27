import mongoose from 'mongoose';

export const katasEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            user: String,
            date: String,
            value: Number,
            chances: Number
        }
    )

    return mongoose.model('Users', userSchema);
}