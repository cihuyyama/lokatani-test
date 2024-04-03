<script setup lang="ts">
import { Customer } from '../../types/customer'
import Button from '../ui/button/Button.vue';
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
        <Dialog>
            <DialogTrigger>
                <Button class="text-white bg-slate-400" variant="outline" click="">
                    <BookOpen />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Customer</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Name</div>
                        <div>{{ customer.name }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Email</div>
                        <div>{{ customer.email }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Phone</div>
                        <div>{{ customer.phone }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Address</div>
                        <div>{{ customer.address }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Created At</div>
                        <div>{{ customer.created_at }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Updated At</div>
                        <div>{{ customer.updated_at }}</div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Button class="text-white bg-green-400" variant="outline" click="">
            <Pen />
        </Button>
        <Button class="text-white bg-red-400" variant="outline" click="">
            <Trash2 />
        </Button>
    </div>
</template>