import { Request, Response } from "express";
import { paymentService } from "./payment.service";

const paymentConfirmation = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;
  const result = await paymentService.paymentConfirmation(
    transactionId as string,
    status as string
  );

  res.send(result);
};

export const paymentController = {
  paymentConfirmation,
};
