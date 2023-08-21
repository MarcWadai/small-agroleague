import { PrismaClient, Role, User } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);

const users = [
  {
    id: 1,
    name: 'Jean-Michou',
    email: 'jeammichou@protonmail.com',
    password,
    role: Role.USER
  },
  {
    id: 2,
    name: 'Patrick Grain',
    email: 'patrickgrain@riseup.net',
    password,
    role: Role.USER
  },
  {
    id: 3,
    name: 'Frederic Agronome',
    email: 'fred@agroleague.fr',
    password,
    role: Role.ADMIN
  }
];

const categories = [
  {
    name: 'couvert',
    displayName: 'Couvert'
  },
  {
    name: 'semence',
    displayName: 'Semence'
  },
  {
    name: 'rotation_culture',
    displayName: 'Rotation des cultures'
  },
  {
    name: 'outillage',
    displayName: 'Outillage'
  }
];

async function main() {
  await prisma.$transaction([
    prisma.user.deleteMany({
      where: {
        OR: users.map((u) => ({
          email: u.email
        }))
      }
    }),
    prisma.user.createMany({
      data: users.map((u) => ({ ...u, password: bcrypt.hashSync(u.password, salt) }))
    })
  ]);
  await prisma.$transaction([
    prisma.categorie.deleteMany({
      where: {
        OR: categories.map((c) => ({
          name: c.name
        }))
      }
    }),
    prisma.categorie.createMany({
      data: categories
    })
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
