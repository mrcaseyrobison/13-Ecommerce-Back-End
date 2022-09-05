const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "taggedProducts" }],
    });
    res.status(200).json(tagsData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "taggedProducts" }],
    });

    if (!tagDataById) {
      res.status(404).json({ message: "Nothing found with that ID"});
      return;
    }
    res.status(200).json(tagDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create();

    res.status(201).json(newTagData);
  } catch (err) {
    req.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
