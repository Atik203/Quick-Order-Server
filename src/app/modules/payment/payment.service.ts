import { readFileSync } from "fs";
import { join } from "path";
import orderModel from "../order/order.model";
import { verifyPayment } from "./payment.utils";

const paymentConfirmation = async (transactionId: string, status: string) => {
  let statusMessage = "Payment failed"; // Default message

  if (status === "success") {
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

    await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "Paid", status: "Paid" },
      { new: true }
    );

    statusMessage = "Thank you for your payment"; // Success message
  }

  const filePath = join(__dirname, "../../../views/payment.html");
  let template = readFileSync(filePath, "utf8");

  // Replace the placeholder with the actual status message
  template = template.replace("{{statusMessage}}", statusMessage);

  return template;
};

export const paymentService = {
  paymentConfirmation,
};
