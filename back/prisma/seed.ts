import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

const password = "password1";
const salt = bcrypt.genSaltSync(8);

const users = [
  {
    id: 1,
    name: "Jean-Michou",
    email: "jeammichou@protonmail.com",
    password,
    role: Role.USER,
  },
  {
    id: 2,
    name: "Patrick Grain",
    email: "patrickgrain@riseup.net",
    password,
    role: Role.USER,
  },
  {
    id: 3,
    name: "Frederic Agronome",
    email: "fred@agroleague.fr",
    password,
    role: Role.ADMIN,
  },
];

const categories = [
  {
    name: "couvert",
    displayName: "Couvert",
  },
  {
    name: "semence",
    displayName: "Semence",
  },
  {
    name: "rotation_culture",
    displayName: "Rotation des cultures",
  },
  {
    name: "outillage",
    displayName: "Outillage",
  },
  {
    name: "fertilisation",
    displayName: "Fertilisation",
  },
  {
    name: "soil_analysis",
    displayName: "Analyse du sol",
  },
];

const posts = [
  {
    id: 1,
    userId: 1,
    createdBy: {
      connect: { id: 1 },
    },
    question: "Ceci est une première question ?",
    Categories: {
      connect: [{ id: 1 }],
    },
  },
  {
    id: 2,
    createdBy: {
      connect: { id: 1 },
    },
    question: "Ceci est une deuxième question ?",
    Categories: {
      connect: [{ id: 2 }],
    },
  },
  {
    id: 3,
    createdBy: {
      connect: { id: 2 },
    },
    question: "Ceci est une troisième question ?",
    Categories: {
      connect: [{ id: 2 }, { id: 3 }],
    },
  },
];

const recos = [
  {
    id: 1,
    userId: 3,
    content: "This is a recommendation for your question",
    parentPostId: 1,
  },
  {
    id: 2,
    userId: 3,
    content: "This is another recommendation for your question",
    parentPostId: 2,
  },
];

async function main() {
  // insert user
  await prisma.$transaction([
    prisma.user.deleteMany({
      where: {
        OR: users.map((u) => ({
          email: u.email,
        })),
      },
    }),
    prisma.user.createMany({
      data: users.map((u) => ({
        ...u,
        password: bcrypt.hashSync(u.password, salt),
      })),
    }),
  ]);
  // insert categories
  await prisma.$transaction([
    prisma.categorie.deleteMany({
      where: {
        OR: categories.map((c) => ({
          name: c.name,
        })),
      },
    }),
    prisma.categorie.createMany({
      data: categories,
    }),
  ]);
  // insert posts
  await prisma.$transaction([
    prisma.post.deleteMany({
      where: {
        OR: posts.map((p) => ({
          id: p.id,
        })),
      },
    }),
    prisma.post.createMany({
      data: posts,
    }),
  ]);
  // insert reco
  await prisma.$transaction([
    prisma.reco.deleteMany({
      where: {
        OR: recos.map((r) => ({
          id: r.id,
        })),
      },
    }),
    prisma.reco.createMany({
      data: recos,
    }),
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
