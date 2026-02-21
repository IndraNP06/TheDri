const app = require('./server');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Local development server running on port ${PORT}`);
});
