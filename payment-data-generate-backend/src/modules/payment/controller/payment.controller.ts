import { Request, Response } from "express";
import { PaymentEntity } from "../model/payment.entity";
import { getDBConnection } from "../../../dbconfig/db";
import cron from "node-cron";
// @desc Get all Payments
// @route GET /api/v1/Payments
// @access Public
export const getPayments = async (req: Request, res: Response) => {
  const connection = await getDBConnection();
  const PaymentRepository = connection.getRepository(PaymentEntity);

  const user = await PaymentRepository.find({
    select: {
      user: {
        name: true,
      },
    },
    relations: {
      user: true,
    },
  });

  return res.status(200).json({
    success: true,
    msg: "Get all Payments",
    data: user,
  });
};

// @desc Create a single Payment
// @route POST /api/v1/payments
// @access Public

export const createPayment = async (req: Request, res: Response) => {
  const connection = await getDBConnection();
  const paymentRepository = connection.getRepository(PaymentEntity);

  let demo: any = null;
  let runCount = 0;
  let delayMinutes = 2;

  function generateRandomTransaction() {
    const id = Math.floor(Math.random() * 1000);
    const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
    return {
      id,
      amount,
      timestamp: new Date().toISOString(),
      status: "Pending",
      processing: 0,
    };
  }

  cron.schedule("* * * * * *", async () => {
    const newTrx = generateRandomTransaction();
    const newResult = paymentRepository.create(newTrx);
    await paymentRepository.save(newResult);
    console.log("Cron job (every second): New transaction added:", newTrx);
  });

  setTimeout(async () => {
    const id = Math.floor(Math.random() * 1000);
    if (!demo) {
      const paymentRes = await paymentRepository.find();
      const latestitems = paymentRes.reduce((latest: any, current: any) => {
        return new Date(current.timestamp) > new Date(latest.timestamp)
          ? current
          : latest;
      });

      demo = latestitems;
    }

    const paymentRes = await paymentRepository.findOne({
      where: { id: demo.id },
    });

    if (demo.id === id) {
      await paymentRepository.save({ id: paymentRes.id, status: "Done" });
    } else {
      await paymentRepository.save({
        id: paymentRes.id,
        status: "Faild",
        processing: paymentRes.processing + 1,
      });
      delayMinutes = 2;
      runCount++;
    }
  }, 4000);

  const startEntervel = setInterval(
    async () => {
      const id = Math.floor(Math.random() * 1000);
      const paymentRes = await paymentRepository.findOne({
        where: { id: demo.id },
      });

      if (demo.id === id) {
        await paymentRepository.save({ id: paymentRes.id, status: "Done" });
      } else {
        await paymentRepository.save({
          id: paymentRes.id,
          status: delayMinutes === 6 ? "Trash" : "Faild",
          processing: paymentRes.processing + 1,
        });
        runCount++;
      }

      switch (runCount) {
        case 1:
          delayMinutes = 2;
          break;
        case 2:
          delayMinutes = 5;
          break;
        case 3:
          delayMinutes = 10;
          break;
        case 4:
          delayMinutes = 20;
          break;
        case 5:
          delayMinutes = 30;
          break;
        default:
          delayMinutes = 60;
          break;
      }

      if (runCount >= 6) {
        clearInterval(startEntervel);
        const paymentRes = await paymentRepository.findOne({
          where: { id: demo.id },
        });
        console.log("clear entervel and show payment", paymentRes);
      }
    },

    delayMinutes * 60 * 1000
  );

  res.status(201).json({
    message: "Initial transaction created and cron job scheduled every second.",
  });
};
