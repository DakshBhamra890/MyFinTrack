import express from 'express';
const router = express.Router();
import category from '../models/category.js';

// Reading all categories
router.get('/', async (req, res) => {
    let Category = await category.find();
    return res.json(Category);
});

// Reading a single category by ID
router.get('/:id', async (req, res) => {
    let Category = await category.findById(req.params.id);
    if (!Category) {
        return res.status(400).json({ err: "!Category not found!" });
    }
    return res.status(200).json(Category);
});

// Creating a new category
router.post('/', async (req, res) => {
    try {
        await category.create(req.body);
        return res.status(201).json();
    } catch (err) {
        return res.status(400).json({ err: `Bad Request ${err}` });
    }
});

// Updating a category
router.put('/:id', async (req, res) => {
    try {
        let Category = await category.findById(req.params.id);
        if (!Category) {
            return res.status(404).json({ err: "Categry not found!" });
        }
        if (req.params.id != req.body._id) {
            return res.status(400).json({ err: "Category ID does not match!" });
        }
        await category.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json({ err: `Bad Request ${err}` });
    }
});

// Deleting a category
router.delete('/:id', async (req, res) => {
    let Category = await category.findById(req.params.id);
    if (!Category) {
        return res.status(404).json({ err: "Category not found!" });
    }
    await category.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});

export default router;
