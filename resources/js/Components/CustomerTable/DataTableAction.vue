<script setup lang="ts">
import { Customer } from '../../types/customer'
import Button from '../ui/button/Button.vue';

defineProps<{
    customer: Customer
}>()
</script>

<template>
    <div class="flex flex-row gap-1">
        <Button variant="outline" click="">
            Details
        </Button>
        <Button variant="outline" click="">
            Edit
        </Button>
        <Button variant="outline" click="">
            Delete
        </Button>
    </div>
</template>