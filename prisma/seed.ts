import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create parts (inventory)
  const screen = await prisma.part.create({
    data: {
      name: 'Iphone 13 Pro Max Screen',
      price: 9.99,
      stock: 100,
    },
  });

  const battery = await prisma.part.create({
    data: {
      name: 'Iphone 13 Pro Max Battery',
      price: 19.99,
      stock: 50,
    },
  });

  // Create a customer
  const customer = await prisma.customer.create({
    data: {
      name: 'Customer 1',
    },
  });

  // Create an invoice for the customer
  const invoice = await prisma.invoice.create({
    data: {
      customerId: customer.id,
      total: battery.price * 3 + screen.price * 1,
      paid: true,
      items: {
        create: [
          {
            customerId: customer.id,
            partId: battery.id,
            quantity: 2,
            price: battery.price,
          },
          {
            customerId: customer.id,
            partId: screen.id,
            quantity: 1,
            price: screen.price,
          },
        ],
      },
      payment: {
        create: {
          amount: battery.price * 2 + screen.price * 1,
          paidAt: new Date(),
        },
      },
    },
    include: { items: true, payment: true },
  });

  console.log('✅ Seeded invoice:', invoice.id);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
