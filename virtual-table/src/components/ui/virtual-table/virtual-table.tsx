import VirtualTableBody from '@/components/ui/virtual-table/virtual-table-body';
import { useEffect, useState } from 'react';

type VirtualTableProps<T> = {
	height: number;
	itemHeight: number;
	itemsVisible: number;
	rowData: T[];
	order?: 'asc' | 'desc';
	sortedBy?: string;
	columns: {
		title: string;
		key: Extract<keyof T, string | number>;
		width: number;
		cell?: (row: T) => string;
	}[];
	onOrder?: (key: keyof T) => void;
};

export default function VirtualTable<T>({
	itemHeight,
	itemsVisible,
	rowData,
	columns,
	sortedBy,
	order,
	onOrder,
}: Readonly<VirtualTableProps<T>>) {
	const [visibleIndex, setVisibleIndex] = useState(0);
	const [visibleRows, setVisibleRows] = useState(rowData.slice(0, itemsVisible));

	const itemsTolerance = itemsVisible * 2;

	useEffect(() => {
		/**
		 * Calculate the start and end indices of the visible rows based on
		 * the visibleIndex and tolerance.
		 *
		 * This ensures that scrolling is smooth and the user doesn't see rows
		 * disappearing and appearing suddenly.
		 */

		const start = Math.max(visibleIndex - itemsTolerance, 0);
		const end = Math.min(visibleIndex + itemsTolerance, rowData.length);
		setVisibleRows(rowData.slice(start, end));
	}, [rowData, visibleIndex]);

	return (
		<div className={`overflow-hidden w-full`}>
			<table className="w-full table-collapse">
				<thead className="block w-full">
					<tr className="w-full border-b-2 border-accent">
						{columns.map(({ title, key, width }) => (
							<th
								key={key}
								style={{
									width: `${width}px`,
									cursor: onOrder ? 'pointer' : 'default',
									textAlign: 'left',
								}}
								onClick={() => onOrder && onOrder(key)}
							>
								{title}
								{sortedBy === key && (
									<span className="ml-2">
										{order === 'asc' ? '▲' : '▼'}
									</span>
								)}
							</th>
						))}
					</tr>
				</thead>

				<VirtualTableBody<T>
					columns={columns}
					index={0}
					indexMax={rowData.length}
					itemHeight={itemHeight}
					itemsTolerance={itemsTolerance}
					itemsVisible={itemsVisible}
					onScroll={(index) => setVisibleIndex(index)}
					rows={visibleRows}
				/>
			</table>
		</div>
	);
}
