'use strict'

module.exports = (db) => {
    var userSchema = new db.Schema(
        {  
            userId: String,
            name: String,
            lastName: String,
            age: Number,
            IsDelete: Boolean
        },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    );
    return db.model('Users', userSchema);
};