import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create parts (inventory)
  const Screen = await prisma.part.create({
    data: {
      name: 'Iphone 13 Pro Max Screen',
      price: 9.99,
      stock: 100,
    },
  })

  const Battery = await prisma.part.create({
    data: {
      name: 'Iphone 13 Pro Max Battery',
      price: 19.99,
      stock: 50,
    },
  })

  // Create invoice with items
  const invoice = await prisma.invoice.create({
    data: {
      customer: 'Customer 1',
      total: (Battery.price * 2) + (Battery.price * 1),
      paid: true,
      items: {
        create: [
          {
            partId: Battery.id,
            quantity: 2,
            price: Battery.price, 
          },
          {
            partId: Battery.id,
            quantity: 1,
            price: Battery.price,
          },
        ],
      },
      payment: {
        create: {
          amount: (Battery.price * 2) + (Battery.price * 1),
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
