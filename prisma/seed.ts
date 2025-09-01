import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create parts (inventory)
  const product1 = await prisma.part.create({
    data: {
      name: 'Product 1',
      price: 9.99,
      stock: 100,
    },
  })

  const product2 = await prisma.part.create({
    data: {
      name: 'Product 2',
      price: 19.99,
      stock: 50,
    },
  })

  // Create invoice with items
  const invoice = await prisma.invoice.create({
    data: {
      customer: 'Customer 1',
      total: (product1.price * 2) + (product2.price * 1),
      paid: true,
      items: {
        create: [
          {
            partId: product1.id,
            quantity: 2,
            price: product1.price, // ✅ Matches schema
          },
          {
            partId: product2.id,
            quantity: 1,
            price: product2.price,
          },
        ],
      },
      payment: {
        create: {
          amount: (product1.price * 2) + (product2.price * 1),
          paidAt: new Date(), // ✅ Optional override
        },
      },
    },
  })

  console.log('✅ Seeded invoice:', invoice.id)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
