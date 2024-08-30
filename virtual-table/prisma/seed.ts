import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Seed 1M companies
	for (let i = 0; i < 1000000; i++) {
		// This will take a very long time so let's make sure some progress is logged
		// to the console.
		if (i % 1000 === 0) {
			console.log(`Inserted ${i} companies`);
		}

		await prisma.company.create({
			data: {
				iban: faker.finance.iban(),
				name: faker.company.name(),
				contact: faker.internet.email(),
				founded: faker.date.past(),
			},
		});
	}
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
