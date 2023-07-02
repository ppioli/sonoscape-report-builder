import { ColumnDef } from '@tanstack/react-table';
import { ReportData } from '@/shared/model/ReportData';
import { Badge } from '@/renderer/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/renderer/components/ui/button';

export const reportsColumns: ColumnDef<ReportData>[] = [
  {
    accessorKey: 'patientInstance.firstName',
    header: 'Name',
  },
  {
    accessorKey: 'patientInstance.lastName',
    header: 'Apellido',
  },
  {
    accessorKey: 'done',
    header: 'Estado',
    cell: ({ row }) => {
      const done = row.getValue('done');

      if (!done) {
        return <Badge variant="destructive">Pendiente</Badge>;
      }

      return <Badge variant="secondary">Listo</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText('Test')}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
