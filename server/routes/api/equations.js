const router=    require('express').Router();
const Equation=  require('../../database/models/equation');
const Category=  require('../../database/models/category');
const { param }= require('express-validator');

// GET - All
router.get('/', async (req, res) => {
  const data = await Equation.find()
  .populate('category')
  .populate('variable');
  res.json(data);
});

// GET - Dump all
router.get('/dump', async (req, res) => {
  const data = await Equation.find()
  .populate('category')
  .populate({
    path: 'variables',
    populate: {
      path: 'variable',
      populate: {
        path: 'unit'
      }
    }
  })
  .populate({
    path: 'constants',
    populate: {
      path: 'constant',
      populate: {
        path: 'unit'
      }
    }
  });
  res.json(data);
});

// GET - Search
router.get('/search/:search', param('search').not().isEmpty().trim().escape(), async (req, res) => {
  let search = req.params.search.replace(/[^\w\s]/gi, '').replace(" ", '.+');
  const data = await Equation.find({ 
    $or: [
      {'name': {
        '$regex':   search,
        '$options': 'i'
      }},
      {'description': {
        '$regex':   search,
        '$options': 'i'
      }}
    ]
  })
  .populate('category', {
    _id: 0,
    name: 1,
    slug: 1
  })
  .limit(10);
  res.json(data);
});

// GET - By Id
router.get('/id/:id', async (req, res) => {
  const data = await Equation.findOne({
    '_id': req.params.id
  })
  .populate('category', {
    _id: 0,
    name: 1,
    slug: 1
  })
  .populate({
    path: 'variables',
    populate: {
      path: 'variable',
      populate: {
        path: 'unit'
      }
    }
  })
  .populate({
    path: 'constants',
    populate: {
      path: 'constant',
      populate: {
        path: 'unit'
      }
    }
  });
  res.json(data);
});


// GET - By Slug
router.get('/:slug', async (req, res) => {
  const data = await Equation.findOne({
    'slug': req.params.slug
  })
  .populate('category', {
    _id: 0,
    name: 1,
    slug: 1
  })
  .populate({
    path: 'variables',
    populate: {
      path: 'variable',
      populate: {
        path: 'unit'
      }
    }
  })
  .populate({
    path: 'constants',
    populate: {
      path: 'constant',
      populate: {
        path: 'unit'
      }
    }
  });
  res.json(data);
});

// GET - By Category
router.get('/category/:category', async (req, res) => {
  const category = await Category.findOne({
    'slug': req.params.category
  });
  if (category === null) {
    res.json(null);
    return;
  }
  const data = await Equation.find({
    'category._id': category._id 
  })
  .populate('category', {
    _id: 0,
    name: 1,
    slug: 1
  })
  res.json(data);
});

// POST - Create
router.post('/create/', async (req, res) => {
  const data = await Equation.create(req.body);
  res.json(data);
})

// POST - Edit
router.put('/update/:EquationId', async (req, res) => {
  await Equation.update(req.body, {
    where: {
      id: req.params.EquationId
    }
  });
  res.json({ success: 'id: ' + req.params.EquationId + ' modified successfully' })
})

// DEL - Delete
router.delete('/delete/:EquationId', async (req, res) => {
  await Equation.destroy({
    where: {
      id: req.params.EquationId
    }
  });
  res.json({ success: 'id: ' + req.params.EquationId + ' deleted successfully' })
})

module.exports = router;