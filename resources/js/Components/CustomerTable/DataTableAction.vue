<script setup lang="ts">
import { Customer } from '../../types/customer'
import Button from '../ui/button/Button.vue';

defineProps<{
    customer: Customer
}>()

import {
    BookOpen,
    Pen,
    Trash2
} from 'lucide-vue-next'
</script>

<template>
    <div class="flex flex-row gap-1">
        <Button class="text-white bg-slate-400" variant="outline" click="">
            <BookOpen />
        </Button>
        <Button class="text-white bg-green-400" variant="outline" click="">
            <Pen />
        </Button>
        <Button class="text-white bg-red-400" variant="outline" click="">
            <Trash2 />
        </Button>
    </div>
</template>