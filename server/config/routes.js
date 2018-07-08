const products = require('../controllers/products.js')
const users = require('../controllers/users.js')
const path = require('path')
module.exports = function (app){
    app.get('/api/products',products.all)
    app.get('/api/myproducts/:id',products.allMy)
    app.post('/api/products',products.create)
    app.get('/api/products/:id',products.getOne)
    app.put('/api/products/:id',products.update)
    app.delete('/api/products/:id',products.delete)

    app.get('/api/users/', users.getAll)
    app.post('/api/register',users.register)
    app.post('/api/login', users.login)
    app.get('/api/users/:id', users.getOne)
    app.get('/api/logout', users.logout)

    app.all("*", (req,res,next) => {
		res.sendFile(path.resolve("./public/dist/public/index.html"))
	});
}
