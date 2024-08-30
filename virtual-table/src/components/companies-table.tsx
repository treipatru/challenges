import VirtualTable from '@/components/ui/virtual-table/virtual-table';
import { type Company } from '@prisma/client';
import { useEffect, useState } from 'react';

type TableContainerProps = {
	initialData: Company[];
};

export default function CompaniesTable({ initialData }: Readonly<TableContainerProps>) {
	const [tableData, setTableData] = useState<Company[]>(initialData);
	const [isFetching, setIsFetching] = useState(false);

	const [limit, setLimit] = useState(10000);
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [sortBy, setSortBy] = useState('id');

	useEffect(() => {
		fetchTableData();
	}, [order, sortBy]);

	const getFetchUrl = () => {
		const url = new URL('http://localhost:4321/api/companies');

		url.searchParams.set('limit', limit.toString());
		url.searchParams.set('order', order);
		url.searchParams.set('sortby', sortBy);
		return url.toString();
	};

	const fetchTableData = async () => {
		setIsFetching(true);
		try {
			const response = await fetch(getFetchUrl());

			const data = await response.json() as Company[];
			setTableData(data);
		} catch (error) {
			console.error(error);
		}
		setIsFetching(false);
	};

	return (
		<>
			{/* Test controls  */}
			<div className="flex items-center justify-between mb-6 bg-base-300 p-4 rounded-lg">
				<div className="flex gap-4 items-center">
					<span>
						Showing
					</span>

					<input
						type="number"
						value={limit}
						min={1}
						max={1000000}
						onChange={(e) => setLimit(parseInt(e.target.value))}
						className="w-[120px] input input-bordered input-sm"
					/>
					<span>
						row(s) of data.
					</span>

					<button
						className="btn btn-xs btn-neutral"
						disabled={isFetching}
						onClick={fetchTableData}
					>
						Refresh data
					</button>
				</div>

				{isFetching
					&& (
						<span className="loading loading-spinner loading-md text-primary">
						</span>
					)}
			</div>

			{/* Table example use with Companies */}
			<div className="card bg-base-100 shadow-xl w-full">
				<div className="card-body">
					<VirtualTable<Company>
						height={800}
						itemHeight={25}
						itemsVisible={30}
						rowData={tableData}
						columns={[
							{
								title: 'ID',
								key: 'id',
								width: 80,
							},
							{
								title: 'Name',
								key: 'name',
								width: 500,
							},
							{
								title: 'IBAN',
								key: 'iban',
								width: 350,
							},
							{
								title: 'Contact',
								key: 'contact',
								width: 400,
							},
							{
								title: 'Founded',
								key: 'founded',
								width: 100,
								cell: row => new Date(row.founded).toLocaleDateString(),
							},
						]}
						onOrder={(key) => {
							setSortBy(key);
							setOrder(order === 'asc' ? 'desc' : 'asc');
						}}
						order={order}
						sortedBy={sortBy}
					/>
				</div>
			</div>
		</>
	);
}
