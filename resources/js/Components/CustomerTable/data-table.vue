<script setup lang="ts" generic="TData, TValue">
import { h, ref } from 'vue'
import { valueUpdater } from '@/lib/utils'
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/vue-table'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toast } from "vue-sonner"
import { Loader2 } from 'lucide-vue-next'


import {
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ChevronLeftIcon,
    Plus
} from 'lucide-vue-next'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog'


import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
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
import Input from '../ui/input/Input.vue';
import Label from '../ui/label/Label.vue'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'


import { useForm } from 'vee-validate'
import { useForm as useFormInertia } from '@inertiajs/vue3'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'

const formSchema = toTypedSchema(z.object({
    name: z.string({
        required_error: 'Name is required.'
    }),
    email: z.string({
        required_error: 'Email is required.'
    }).email({
        message: 'Email is invalid.'
    }),
    phone: z.string({
        required_error: 'Phone is required.',
        invalid_type_error: 'Invalid Phone.'
    }),
    address: z.string({
        required_error: 'Address is required.'
    }),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const form = useFormInertia({
    name: null,
    email: null,
    phone: 0,
    address: null,
})

const open = ref(false)

const onSubmit = handleSubmit((values) => {
    console.log(props)
    form.post('/', {
        onSuccess: (data) => {
            open.value = false
            toast.success(`Customer ${values.name} created successfully.`)
        },
        onError: (errors) => {
            console.log(errors)
            toast.error(`Failed to create customer. : ${errors.message}`)
        },
        onProgress: () => {
            toast.loading('Creating customer...')
        },
    })
})


const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const columnFilters = ref<ColumnFiltersState>([])
const sorting = ref<SortingState>([])

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get columnFilters() { return columnFilters.value },
        get sorting() { return sorting.value },
    }
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex flex-row justify-between items-center">

            <div class="flex items-center w-full py-4">
                <Input class="max-w-sm w-full" placeholder="Search by name"
                    :model-value="table.getColumn('name')?.getFilterValue() as string"
                    @update:model-value=" table.getColumn('name')?.setFilterValue($event)" />
            </div>
            <Dialog v-model:open="open">
                <DialogTrigger>
                    <Button variant="secondary" class="border-2">
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form @submit.prevent="onSubmit">
                        <DialogHeader>
                            <DialogTitle>Create Customer</DialogTitle>
                            <DialogDescription>
                                Make new customer to your database here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem class="my-4" v-auto-animate>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Name" v-model="form.name" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem class="my-4" v-auto-animate>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Email" v-model="form.email"
                                        v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="phone">
                            <FormItem class="my-4" v-auto-animate>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="text" class="remove-arrow" placeholder="Phone" v-model="form.phone"
                                        v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="address">
                            <FormItem class="my-4" v-auto-animate>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea type="text" placeholder="Address" v-model="form.address"
                                        v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <DialogFooter>
                            <Button v-if="form.processing" disabled>
                                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </Button>
                            <Button v-else class="mt-4" type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

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