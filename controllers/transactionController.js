import express from 'express';
const router = express.Router();
import transaction from '../models/transaction.js';

// Read all transactions
router.get('/', async (req, res) => {
    let Transaction = await transaction.find();
    return res.json(Transaction);
});

//Read single transaction using ID
router.get('/:id', async (req,res)=> {
    let Transaction = await transaction.findById(req.params.id);
    if (!Transaction){
        return res.status(400).json({err:"!Transaction not found!"})
    }
    return res.status(200).json(Transaction);
});

// Creating a Transaction

router.post('/', async (req, res) => {
    try{
        await transaction.create(req.body);
        return res.status(201).json();
    }
    catch (err){
        return res.status(400).json({err: `Bad Request ${err}`});
    }
})

//Update transaction
router.put('/:id', async (req, res) => {
    try {
        let Transaction = await transaction.findById(req.params.id);
        if (!Transaction) {
            return res.status(404).json({ err: "Transaction not found!" });
        }
        if (req.params.id !==req.body._id){
            return res.status(400).json({err: " Transaction IDs does not match!"});
        }
        await transaction.findByIdAndUpdate(req.params.id,req.body);
        return res.status(204).json();
    } catch (err) {
        return res.status(400).json({ err: `Bad Request ${err}` });
    }
});



//Delete Transaction
router.delete('/:id', async (req,res) => {
    let Transaction = await transaction.findById(req.params.id);
    if (!Transaction){
        return res.status(404).json({err: "Transaction not found!"});
    }
    await transaction.findByIdAndDelete(req.params.id);
    return res.status(204).json();
})

export default router;