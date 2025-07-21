import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Seed default accounts
  for (const account of config.defaultAccounts) {
    // eslint-disable-next-line no-await-in-loop
    const userPassword = await hash(account.password, 10);
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);

    // eslint-disable-next-line no-await-in-loop
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password: userPassword,
        role,
      },
    });
  }

  // Seed default contacts
  if (config.defaultContacts) {
    for (const contact of config.defaultContacts) {
      console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
      // eslint-disable-next-line no-await-in-loop
      await prisma.contact.create({
        data: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          address: contact.address,
          image: contact.image,
          description: contact.description,
          owner: contact.owner,
        },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
