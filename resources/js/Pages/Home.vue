<template>
    <Toaster :position="'bottom-right'" rich-colors close-button />
    <div class="container py-10 mx-auto">
        <div>
            <h1 class="text-3xl font-bold">Customers Table</h1>
        </div>
        <DataTable :columns="customerColumn" :data="customers" />
    </div>
</template>

<script setup lang="ts">
import { Customer } from '@/types/customer'
import { customerColumn } from '@/Components/CustomerTable/columns'
import DataTable from '@/Components/CustomerTable/data-table.vue'
import { Toaster } from "vue-sonner"

const props = defineProps<{
    customers: Customer[];
}>()

</script>
