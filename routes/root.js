const route = require('express').Router()
const { MongoClient } = require('mongodb')
const MONGO_URL = "mongodb://localhost:27017"

route.post('/insert', (req, res, next) => {

    MongoClient.connect(MONGO_URL, (err, client) => {

        if (err) return next(err)

        const productdb = client.db("productdb")
        const products = productdb.collection("products")

        products.insertOne({

            category: req.body.category,
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            discount: req.body.discount,
            inStock: req.body.inStock,
            image: req.body.img

        }, (err, result) => {
            if (err) next(err)
            console.log(result)
            res.send(result)
        })
    })
})

route.post('/delete', (req, res, next) => {

    // console.log(req.params.id)

    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) throw err

        const productdb = client.db("productdb")
        const products = productdb.collection("products")

        products.findOne({ name: req.body.name }, (err, results) => {
            const recoverProductdb = client.db("recoverProductdb")
            const recoverProducts = recoverProductdb.collection("recoverProducts")

            recoverProducts.insertOne({

                category: results.category,
                name: results.name,
                brand: results.brand,
                price: results.price,
                discount: results.discount,
                inStock: results.inStock,
                image: results.image

            }, (err, result) => {
                if (err) next(err)
                console.log(result)

                products.deleteOne({ name: req.body.name }, (err, result) => {
                    if (err) throw err

                    console.log(result)
                    res.send(result)
                })
            })

        })

    })
})

route.post('/update', (req, res, next) => {

    console.log(req.body)
    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) throw err

        const productdb = client.db("productdb")
        const products = productdb.collection("products")

        products.findOne({ name: req.body.name }, (err, results) => {

            products.update({ name: req.body.name },
                {
                    $set: {
                        category: req.body.category || results.category, price: req.body.price || results.price,
                        discount: req.body.discount || results.discount, brand: req.body.brand || results.brand,
                        inStock: req.body.inStock || results.inStock, image: req.body.img || results.image
                    }
                }, (err, result) => {
                    if (err) return next(err)

                    console.log(result)
                    res.send(result)
                })
        })
    })
})

route.get('/query', (req, res, next) => {

    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) throw err

        const productdb = client.db("productdb")
        const products = productdb.collection("products")

        products.find().toArray((err, results) => {
            console.log(results)
            res.send(results)
        })
    })
})

route.get('/query/recoverProducts', (req, res, next) => {

    MongoClient.connect(MONGO_URL, (err, client) => {
        if (err) throw err

        const recoverProductdb = client.db("recoverProductdb")
        const recoverProducts = recoverProductdb.collection("recoverProducts")

        recoverProducts.find().toArray((err, results) => {
            console.log(results)
            res.send(results)
        })
    })
})

module.exports = route