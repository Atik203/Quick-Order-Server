import { Request, Response } from "express";

const paymentConfirmation = async (req: Request, res: Response) => {
  res.send(`
        <html>
        <head>
            <title>Payment Confirmation</title>
        </head>
        <body>
            <h1>Payment Confirmation</h1>
            <h4>Thank you for your payment</h4>
        </body>
        </html>
        
        `);
};

export const paymentController = {
  paymentConfirmation,
};
