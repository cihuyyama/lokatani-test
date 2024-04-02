<template>
    <div class="container py-10 mx-auto">
        <DataTable :columns="customerColumn" :data="customers" />
    </div>
</template>

<script setup lang="ts">
import { Customer } from '@/types/customer'
import { customerColumn } from '@/Components/CustomerTable/columns'
import DataTable from '@/Components/CustomerTable/data-table.vue'

defineProps<{
    customers: Customer[];
}>()
</script>
