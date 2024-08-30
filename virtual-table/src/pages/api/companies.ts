import { dbClient } from '@/services/db';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);

	const page = parseInt(url.searchParams.get('page') ?? '1');
	const limit = parseInt(url.searchParams.get('limit') ?? '10000');

	const sortBy = url.searchParams.get('sortby') ?? 'id';
	const order = url.searchParams.get('order') ?? 'asc';

	try {
		const companies = await dbClient.company.findMany({
			skip: (page - 1) * limit,
			take: limit,
			orderBy: {
				[sortBy]: order,
			},
		});

		return new Response(JSON.stringify(companies), { status: 200 });
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: 'Failed to retrieve companies.',
			}),
			{ status: 500 },
		);
	}
};
