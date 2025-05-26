


// const payments = [];
// let demo = null;
// let runCount = 0;
// let delayMinutes = 0;

// function generateRandomTransaction() {
//   const id = Math.floor(Math.random() * 1000);
//   const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

//   return {
//     id,
//     amount,
//     timestamp: new Date().toISOString(),
//     status: "Pending",
//     processing: 0,
//   };
// }

// setInterval(() => {
//   const trx = generateRandomTransaction();
//   payments.push(trx);
//   console.log("New transaction added:", trx);
// }, 1000);

// const startEntervel = setInterval(
//   () => {
//     if (!demo) {

//       const latestitems = payments.reduce((latest, current) => {
//         return new Date(current.timestamp) > new Date(latest.timestamp)
//           ? current
//           : latest;
//       });

//       demo = latestitems;
//     }

//     const id = Math.floor(Math.random() * 1000);
//     const index = payments.findIndex((p) => p.id === demo.id);

//     if (demo.id === id) {
//       payments[index].status = "Done";
//     } else {
//       payments[index].status = "Faild";
//       payments[index].processing += 1;
//       runCount++;
//     }

//     switch (runCount) {
//       case 1:
//         delayMinutes = 2;
//         break;
//       case 2:
//         delayMinutes = 5;
//         break;
//       case 3:
//         delayMinutes = 10;
//         break;
//       case 4:
//         delayMinutes = 20;
//         break;
//       case 5:
//         delayMinutes = 30;
//         break;
//       default:
//         delayMinutes = 60;
//         break;
//     }

//     console.log("demo", demo);

//     if (runCount >= 6) {
//       clearInterval(startEntervel);
//       const index = payments.find((p) => p.id === demo.id);
//       console.log("clear entervel and show payment", index);
//     }
//   },

//   delayMinutes ? delayMinutes * 60 * 1000 : 4000
// );
