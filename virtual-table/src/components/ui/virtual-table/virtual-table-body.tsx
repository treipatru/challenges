import { useState } from 'react';

type VirtualTableBodyProps<T> = {
	index: number;
	indexMax: number;
	itemHeight: number;
	itemsTolerance: number;
	itemsVisible: number;
	onScroll: (index: any) => void;
	rows: any[];
	columns: {
		title: string;
		key: Extract<keyof T, string | number>;
		width: number;
		cell?: (row: T) => string;
	}[];
};

export default function VirtualTableBody<T>({
	columns,
	index,
	indexMax,
	itemHeight,
	itemsTolerance,
	itemsVisible,
	onScroll,
	rows,
}: Readonly<VirtualTableBodyProps<T>>) {
	// Height of the viewport, in pixels
	const viewportHeight = itemsVisible * itemHeight;

	// Height of the entire list (visible + invisible rows), in pixels.
	const listHeight = (indexMax - index + 1) * itemHeight;

	// Height of the before placeholder, in pixels.
	const [beforeHeight, setBeforeHeight] = useState(index * itemHeight);
	// Height of the after placeholder, in pixels.
	const [afterHeight, setAfterHeight] = useState(listHeight - beforeHeight);

	const handleScroll = (event: any) => {
		const { scrollTop } = event.target;
		const newIndex = index + Math.floor(scrollTop / itemHeight);

		const newBeforeHeight = (newIndex - itemsTolerance) * itemHeight;
		setBeforeHeight(Math.max(newBeforeHeight, 0));

		const newAfterHeight = listHeight - (newIndex + itemsVisible + itemsTolerance) * itemHeight;
		setAfterHeight(Math.max(newAfterHeight, 0));

		onScroll(newIndex);
	};

	return (
		<tbody
			className="block overflow-y-auto relative"
			onScroll={handleScroll}
			style={{ height: viewportHeight }}
		>
			<tr style={{ height: beforeHeight }}>
			</tr>

			{rows.map((item, itemIndex) => (
				<tr
					className="flex absolute w-full odd:bg-base-200"
					key={item.id}
					style={{
						height: itemHeight,
						transform: `translateY(${itemIndex * itemHeight}px)`,
					}}
				>
					{columns.map(col => (
						<td
							key={col.key}
							style={{ width: `${col.width}px` }}
						>
							{col.cell
								? col.cell(item)
								: item[col.key]}
						</td>
					))}
				</tr>
			))}

			<tr style={{ height: afterHeight }}>
			</tr>
		</tbody>
	);
}
