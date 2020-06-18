import { PrismaClient, Post } from '@prisma/client'
import faker from 'faker';

const prisma = new PrismaClient()

function createPosts(length: number) {
  const arr = [];
  for (let index = 0; index < length; index += 1) {
    arr.push({
      title: faker.lorem.word(),
      content: faker.lorem.sentence(),
      published: true,
    })
  }
  return arr;
}

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Join us for GraphQL Conf 2019 in Berlin',
          content: 'https://www.graphqlconf.org/',
          published: true,
        },
      },
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
  })
  const user3 = await prisma.user.create({
    data: {
      email: 'jack@prisma.io',
      name: 'Jack',
      posts: {
        create: createPosts(100),
      },
    },
  })
  console.log({ user1, user2, user3 })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
