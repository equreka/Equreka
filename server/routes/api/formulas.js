const router=    require('express').Router();
const Formula=   require('../../database/models/formula');
const Category=  require('../../database/models/category');
const { param }= require('express-validator');
const sanitize=  require('../sanitize');

// GET - All
router.get('/', async (req, res) => {
  const data = await Formula.find()
  .populate('category')
  .populate('variable');
  res.json(data);
});

// GET - Dump all
router.get('/', async (req, res) => {
  const data = await Formula.find()
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
router.get('/search/:search',
param('search').not().isEmpty().trim().escape(),
async (req, res) => {
  let search = sanitize.search(req.params.search);
  const data = await Formula.find({ 
    $or: [
      {'name': {
        '$regex':   search,
        '$options': 'i'
      }},
      {'slug': {
        '$regex':   search,
        '$options': 'i'
      }}
    ]
  })
  .populate('category')
  .limit(10);
  res.json(data);
});

// GET - By Id
router.get('/id/:id', async (req, res) => {
  const data = await Formula.findOne({
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
  const data = await Formula.findOne({
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
  const data = await Formula.find({
    'category._id': category._id 
  });
  res.json(data);
});

// POST - Create
router.post('/create/', async (req, res) => {
  const data = await Formula.create(req.body);
  res.json(data);
})

// POST - Edit
router.put('/update/:entryId', async (req, res) => {
  await Formula.update(req.body, {
    where: {
      id: req.params.entryId
    }
  });
  res.json({ success: 'id: ' + req.params.entryId + ' modified successfully' })
})

// DEL - Delete
router.delete('/delete/:entryId', async (req, res) => {
  await Formula.destroy({
    where: {
      id: req.params.entryId
    }
  });
  res.json({ success: 'id: ' + req.params.entryId + ' deleted successfully' })
})

module.exports = router;