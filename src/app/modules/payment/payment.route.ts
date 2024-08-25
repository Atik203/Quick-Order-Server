import { Router } from "express";
import { paymentController } from "./payment.conroller";

const router = Router();

router.post("/confirmation", paymentController.paymentConfirmation);

export const paymentRoutes = router;
