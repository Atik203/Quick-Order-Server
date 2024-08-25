import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initiatePayment = async (paymentData: any) => {
  const response = await axios.post(process.env.PAYMENT_URL as string, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: "http://localhost:3000/api/v1/payment/confirmation",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
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
};
