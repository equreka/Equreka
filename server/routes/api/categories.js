const router=    require('express').Router();
const Category=  require('../../database/models/category');
const { param }= require('express-validator');

// GET - All
router.get('/', async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

// GET - Dump all
router.get('/dump', async (req, res) => {
  const data = await Category.find();
  res.json(data);
});

// GET - By slug
router.get('/:slug', async (req, res) => {
  const data = await Category.findOne({
    'slug': req.params.slug
  });
  res.json(data);
});

// GET - By Id
router.get('/id/:id', async (req, res) => {
  const data = await Category.findOne({
    '_id': req.params.id
  });
  res.json(data);
});

// POST - Add
router.post('/add/', async (req, res) => {
  const data = await Category.create(req.body);
  res.json(data);
})

// POST - Update
router.post('/edit/:id', async (req, res) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.json({ success: 'id: ' + req.params.id + ' modified successfully' })
})

// Delete
router.delete('/delete/:id', async (req, res) => {
  await Category.remove({
    _id: req.params.id
  });
  res.json({ success: 'id: ' + req.params.id + ' deleted successfully' })
})

module.exports = router;