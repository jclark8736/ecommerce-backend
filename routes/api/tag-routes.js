const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
      

    });
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findByPk(req.params.id, {
      

      include: [
        { 
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"] 
        }

      ],
    
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
    console.log(productData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create ({
    tag_name: req.body.tag_name
    
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
 
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(tagData => {
    if (!tagData[0]) {
      res.status(404).json({message: "No tag found with this id!"});
      return;
    }
    res.json(tagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
});

module.exports = router;
