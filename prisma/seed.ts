import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  // Create some service types
  const serviceTypes = await prisma.serviceType.createMany({
    data: [
      {
        name: "Jardinagem",
        description:
          "Serviçs para seu jardim, paisagismo e comércio de mudas e insumos para jardinagem.",
      },
      {
        name: "Limpeza",
        description:
          "Serviços de limpeza para sua casa, diaristas, limpeza de piscina.",
      },
      { name: "Elétrica", description: "Eletrecistas." },
      { name: "Hidráulica", description: "Encanadores." },
      {
        name: "Marcenaria",
        description:
          "Serviços de marcenaria, móveis planejados, portas e batentes",
      },
      { name: "Concertos", description: "Concertos gerais." },
      {
        name: "Telhado",
        description:
          "Serviços para seu telhado, calhas e rufos, limpeza de calhas, telhas em geral.",
      },
      { name: "Alvenaria", description: "Pedreiros." },
    ],
  });

  const newUsersArray = [
    {
      name: "Alice",
      email: "alice@example.com",
      phone: "1555-1234",
      userType: "user",
      password: "asdfgh",
    },
    {
      name: "Roberto",
      email: "Roberto@example.com",
      phone: "2555-5677",
      userType: "user",
      password: "123456",
    },
    {
      name: "Carlos",
      email: "Carlos@example.com",
      phone: "3555-9012",
      userType: "user",
      password: "asdfgh",
    },
    {
      name: "David",
      email: "david@example.com",
      phone: "4555-3456",
      userType: "user",
      password: "123456",
    },
    {
      name: "Eva",
      email: "Eva@example.com",
      phone: "5555-7890",
      userType: "user",
      password: "asdfgh",
    },
    {
      name: "Amâncio",
      email: "Amâncio@example.com",
      phone: "6555-1234",
      userType: "user",
      password: "123456",
    },
    {
      name: "Fernanda",
      email: "fernanda@example.com",
      phone: "7555-5678",
      userType: "user",
      password: "asdfgh",
    },
    {
      name: "Suelen",
      email: "Suelen@example.com",
      phone: "8555-9012",
      userType: "user",
      password: "123456",
    },
    {
      name: "Ivan",
      email: "ivan@example.com",
      phone: "9555-3456",
      userType: "user",
      password: "asdfgh",
    },
    {
      name: "Admin",
      email: "admin@example.com",
      phone: "0555-7890",
      userType: "admin",
      password: "zyb460",
    },
  ];

  await prisma.user.createMany({
    data: newUsersArray,
  });

  const dbUsers = await prisma.user.findMany();
  const dbServices = await prisma.serviceType.findMany();

  const newServices = [
    {
      title: "Home Cleaning",
      description: "Professional home cleaning service",
      value: 100,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Office Cleaning",
      description: "Professional office cleaning service",
      value: 200,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Lawn Mowing",
      description: "Residential lawn mowing service",
      value: 50,
      serviceTypeId: dbServices[0].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Landscaping Design",
      description: "Custom landscaping design for your property",
      value: 500,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Kitchen Sink Repair",
      description: "Expert kitchen sink repair service",
      value: 75,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Bathroom Plumbing Installation",
      description: "Expert bathroom plumbing installation service",
      value: 150,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Home Wiring Inspection",
      description: "Comprehensive home wiring inspection service",
      value: 200,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
    {
      title: "Commercial Electrical Repairs",
      description:
        "Expert electrical repair services for commercial properties",
      value: 300,
      serviceTypeId: dbServices[Math.floor(Math.random() * 7) + 1].id,
      providerId: dbUsers[Math.floor(Math.random() * 9) + 1].id,
      validFrom: dayjs().toISOString(),
      validTo: dayjs().add(7, "days").toISOString(),
      serviceClass: "A",
    },
  ];

  await prisma.service.createMany({
    data: newServices,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
