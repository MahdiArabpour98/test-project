const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const data = [
  {
    fullName: "مهدی عربپور",
    username: "maadmin",
    nationalCode: "1234567890",
    phoneNumber: "09131993023",
    password: "ma3023",
    role: "ADMIN",
  },
  {
    fullName: "یونس امیری",
    username: "yaadmin",
    nationalCode: "1234567891",
    phoneNumber: "09131234567",
    password: "ya3023",
    role: "SUPERADMIN",
  },
];

async function main() {
  await Promise.all(
    data.map(async (d) => {
      await prisma.user.create({
        data: {
          fullName: d.fullName,
          username: d.username,
          nationalCode: d.nationalCode,
          phoneNumber: d.phoneNumber,
          password: await bcrypt.hash(d.password, 10),
          role: d.role,
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
