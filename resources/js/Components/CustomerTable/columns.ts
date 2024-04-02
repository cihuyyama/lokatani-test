import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Customer } from '@/types/customer'
import DataTableAction from './DataTableAction.vue'

export const customerColumn: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: '' }, 'ID'),
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: '' }, 'Name'),
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