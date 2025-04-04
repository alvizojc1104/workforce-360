import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-6 w-40" />
				</div>
				<div className="flex items-center space-x-4">
					<Skeleton className="h-6 w-24" />
				</div>
			</div>
			<table className="w-full border-collapse">
				<thead>
					<tr className="border-b">
						{Array.from({ length: 5 }).map((_, index) => (
							<th key={index} className="px-4 py-2 text-left">
								<Skeleton className="h-6 bg-foreground/10" />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 3 }).map((_, rowIndex) => (
						<tr key={rowIndex} className="border-b">
							{Array.from({ length: 5 }).map((_, colIndex) => (
								<td key={colIndex} className="p-4">
									<Skeleton className="h-4" />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-6 w-24" />
				</div>
				<div className="flex items-center space-x-4">
					<Skeleton className="h-6 w-24" />
					<div className="flex items-center space-x-2">
						<Skeleton className="h-6 w-24" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-8 w-8" />
					</div>
				</div>
			</div>
		</div>
	);
}
