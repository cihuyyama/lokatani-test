import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Customer } from '@/types/customer'

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
]