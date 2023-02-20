const router = require('express').Router();

const { parse } = require('dotenv');
const { Books } = require('../models/products')

// for all products

router.get('/books', async (req, res, next) => {
  try {
    console.log(req.query.page)
    let perPage = 12;
    let page = req.query.page || 0;
    const books = await Books.find().limit(perPage)
    .skip(perPage * page);
    
     res.json(books);

    
  } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
  }
});

// for single products
router.get('/books/:id', async (req, res, next) => {
  try {
    const products = await Books.findById(req.params.id)
    res.status(200).json({
      status : 'success',

      data : products
    });
  } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
  }
});

// create single products

router.post('/books' , async (req, res, next)=> {
   try {
    const products = await Books.create(req.body);
    res.status(200).json({
      status : 'success',
      data : products
    });

   } catch (error) {
    res.status(500).json({
      status : 'error',
      message : error.message
    })
   }
})

// update the single product

router.put('/books/:id' , async (req, res)=> {
   try {
    const products = await Books.findByIdAndUpdate(req.params.id, req.body , {
      new : true,
    });
    res.status(200).json({
      status : 'success',
      data : products
    });

   } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
   }
})

// find and delete product

router.delete('/books/:id' , async (req, res, next)=> {
   try {
      await Books.findByIdAndDelete( req.params.id );
    res.status(200).json({
      status : 'success'
    });

   } catch (error) {
    res.status(404).json({
      status : 'error',
      message : error.message
    })
   }
});


module.exports = router;
