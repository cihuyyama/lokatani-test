import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Customer } from '@/types/customer'
import DataTableAction from './DataTableAction.vue'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/Components/ui/button'

export const customerColumn: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: '' }, 'ID'),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name')),
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: '' }, 'Email'),
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: '' }, 'Phone'),
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: '' }, 'Created At'),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original

      return h('div', { class: 'relative' }, h(DataTableAction, {
        customer,
      }))
    },
  },
]