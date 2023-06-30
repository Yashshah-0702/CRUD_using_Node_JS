const Product = require('../model/products')

exports.input=(req,res)=>{
    res.render('form',{editing:false})
}
// create
exports.process = (req,res)=>{
    Product.create({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description
}).then(()=>{
        res.redirect('/products')
})
    .catch(err=>console.log(err))
}
// read
exports.output=(req,res)=>{
    Product.findAll().then(row=>{
        res.render('product',{product:row,editing:false})
    }).catch(err=>{console.log(err)})
}
// update
exports.posteditProduct=(req,res)=>{
    const prodId = req.body.productId
    const updatedtitle = req.body.title
    const updatedprice = req.body.price
    const updatedtdescription = req.body.description
    Product.findByPk(prodId).then(product=>{
        product.title = updatedtitle
        product.price = updatedprice
        product.description = updatedtdescription
        return product.save()
    }).then(result=>{
       res.redirect('/products')
    }).catch(err=>console.log(err))
    
}


exports.editProduct=(req,res)=>{
    const editMode = req.query.edit
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findByPk(prodId).then(product=>{
        if(!product){
        return res.redirect('/')
        }
        res.render('form',{
            editing:editMode,
            product:product
        })
    })
}

// delete
exports.deleteProduct=(req,res)=>{
    const prodId = req.body.productId
    Product.findByPk(prodId).then(product=>{
       return product.destroy()
    }).then(result=>{
        res.redirect('/products')
    })
}