import express from "express";
import { getPayments, createPayment } from "../controller/payment.controller";

const router = express.Router();

router.route("/").get(getPayments).post(createPayment);

// router.route("/:id").get(getPayment).put(updatePayment).delete(deletePayment);

export default router;
