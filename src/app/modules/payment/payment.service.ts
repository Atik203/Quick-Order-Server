import orderModel from "../order/order.model";

const paymentConfirmation = async (transactionId: string) => {
  // Payment confirmation logic

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
};

export const paymentService = {
  paymentConfirmation,
};
