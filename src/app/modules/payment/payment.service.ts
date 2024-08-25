import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const paymentConfirmation = async (transactionId: string, status: string) => {
  // Payment confirmation logic
  if (status !== "success") {
    const verify = await verifyPayment(transactionId);
    if (verify && verify.pay_status !== "Successful") {
      throw new Error("Payment not successful");
    }
    const order = await orderModel.findOne({
      transactionId,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Update the order status

    await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Paid", status: "Paid" },
      { new: true }
    );

    const result = `<html>
        <head>
            <title>Payment Success</title>
        </head>
        <body>
            <h1>Payment Confirmation</h1>
            <h4>Thank you for your payment</h4>
        </body>
        </html>
        
        `;
    return result;
  } else {
    const result = `<html>
        <head>
            <title>Payment Failed</title>
        </head>
        <body>
            <h1>Payment Confirmation</h1>
            <h4>Payment failed</h4>
        </body>
        </html>
        
        `;
    return result;
  }
};

export const paymentService = {
  paymentConfirmation,
};
