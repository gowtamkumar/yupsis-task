import "reflect-metadata";
import { DataSource } from "typeorm";
import { PaymentEntity } from "../modules/payment/model/payment.entity";

const dbConnection = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "101",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [PaymentEntity],
  subscribers: [],
  migrations: [],
});

export const getDBConnection = async (): Promise<any> => {
  if (!dbConnection.isInitialized) {
    await dbConnection
      .initialize()
      .then(() => {
        console.log("database connection successfully");
      })
      .catch((error: any) => {
        console.log("🚀 ~ error:", error);
        console.log("Database connection error");
      });
  }
  return dbConnection;
};
