import app from './app';
import { sequelize } from './config/sequelize';

const port = process.env.PORT || 8080;

sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log('Database synchronized');
        });
    })
    .catch(err => {
        console.error('Unable to synchronize the database:', err);
    });