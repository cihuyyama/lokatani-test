<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'

import {
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ChevronLeftIcon
} from 'lucide-vue-next'


import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    ColumnFiltersState,
} from "@tanstack/vue-table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import Button from '../ui/button/Button.vue';

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colSpan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <div class="flex items-center justify-between px-2">
            <div class="flex items-center space-x-2">
                <p class="text-sm font-medium">
                    Rows per page
                </p>
                <Select :model-value="`${table.getState().pagination.pageSize}`"
                    @update:model-value="table.setPageSize">
                    <SelectTrigger class="h-8 w-[70px]">
                        <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
                    </SelectTrigger>
                    <SelectContent side="top">
                        <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                            {{ pageSize }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {{ table.getState().pagination.pageIndex + 1 }} of
                    {{ table.getPageCount() }}
                </div>
                <div class="flex items-center space-x-2">
                    <Button variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()"
                        @click="table.setPageIndex(0)">
                        <span class="sr-only">Go to first page</span>
                        <ChevronsLeftIcon class="w-4 h-4" />
                    </Button>
                    <Button variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanPreviousPage()"
                        @click="table.previousPage()">
                        <span class="sr-only">Go to previous page</span>
                        <ChevronLeftIcon class="w-4 h-4" />
                    </Button>
                    <Button variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanNextPage()"
                        @click="table.nextPage()">
                        <span class="sr-only">Go to next page</span>
                        <ChevronRightIcon class="w-4 h-4" />
                    </Button>
                    <Button variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!table.getCanNextPage()"
                        @click="table.setPageIndex(table.getPageCount() - 1)">
                        <span class="sr-only">Go to last page</span>
                        <ChevronsRightIcon class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>