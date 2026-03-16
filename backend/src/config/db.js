import prisma from "../libs/prisma.js";
export const dbConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Kết nối Database THÀNH CÔNG!");
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};
