import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const data = await prisma.user.findOne({
    where: {
      id: 3,
    },
    select: {
      posts: {
        orderBy: {
          id: 'asc',
        },
        take: -10,
        cursor: {
          id: 40,
        },
      },
    },
  })

  console.log(data)
}

main()
