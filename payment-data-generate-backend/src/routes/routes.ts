import { Express } from "express";
import PaymentRoutes from "../modules/payment/route/payment.route";

type ExpressApp = Express;

export const setupRoutes = (app: ExpressApp): void => {
  app.use("/api/v1/payments", PaymentRoutes);
};
