import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL as string, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:3000/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:3000/api/v1/payment/confirmation?status=failed`,
      cancel_url: "http://localhost:5173",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Products Order Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_phone: paymentData.customerPhone,
      cus_add1: paymentData.customerAddress,
      cus_country: "Bangladesh",
      type: "json",
    });
    return response.data;
  } catch (error) {
    throw new Error("Payment initiation failed");
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL as string, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        request_id: transactionId,
        type: "json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Payment verification failed");
  }
};
