import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: Number, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId,ref:"category", required: true},
    amount: {
        type: Number, required: true},
    description: {
        type: String, required: true}
    }
);
const transaction = mongoose.model('transaction',transactionSchema);
export default transaction;