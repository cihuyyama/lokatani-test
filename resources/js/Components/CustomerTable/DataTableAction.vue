<script setup lang="ts">
import { Customer } from '../../types/customer'
import { h, ref } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue';
import { Textarea } from '../ui/textarea';
import Input from '../ui/input/Input.vue';
import { useForm } from 'vee-validate'
import { useForm as useFormInertia } from '@inertiajs/vue3'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { router } from '@inertiajs/vue3'
import {
    BookOpen,
    Pen,
    Trash2
} from 'lucide-vue-next'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
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
import { toast } from 'vue-sonner';

const props = defineProps<{
    customer: Customer
}>()

const formSchema = toTypedSchema(z.object({
    name: z.string({
        required_error: 'Name is required.'
    }).default(props.customer.name),
    email: z.string({
        required_error: 'Email is required.'
    }).email({
        message: 'Email is invalid.'
    }).default(props.customer.email),
    phone: z.string({
        required_error: 'Phone is required.',
        invalid_type_error: 'Invalid Phone.'
    }).default(String(props.customer.phone)),
    address: z.string({
        required_error: 'Address is required.'
    }).default(props.customer.address),
    id: z.number().default(props.customer.id),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const openDelete = ref(false)

const onDeleteSubmit = handleSubmit((values) => {
    console.log(values)
    form.delete(`/${values.id}`, {
        onSuccess: () => {
            openDelete.value = false
            toast.success('Customer deleted successfully.')
            window.location.reload()        },
        onError: (error) => {
            toast.error(`Failed to delete customer : ${error.message}`)
        }
    })
})

const openUpdate = ref(false)

const onUpdateSubmit = handleSubmit((values) => {
    form.put(`/${values.id}`, {
        onSuccess: () => {
            openUpdate.value = false
            toast.success('Customer updated successfully.')
        },
        onError: (error) => {
            toast.error(`Failed to update customer : ${error.message}`)
        },
    })
})

const form = useFormInertia({
    name: props.customer.name,
    email: props.customer.email,
    phone: props.customer.phone,
    address: props.customer.address,
})

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
                        <div>{{ customer.created_at.substring(3) }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="font-bold">Updated At</div>
                        <div>{{ customer.updated_at.substring(3) }}</div>
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

        <Dialog v-model:open="openUpdate">
            <DialogTrigger>
                <Button class="text-white bg-green-400" variant="outline" click="">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form @submit.prevent="onUpdateSubmit">
                    <DialogHeader>
                        <DialogTitle>Edit Customer</DialogTitle>
                        <DialogDescription>
                            Make changes to your customer here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem class="my-2" v-auto-animate>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Name" :default-value="props.customer.name"
                                    v-model="form.name" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem class="my-2" v-auto-animate>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Email" disabled :default-value="props.customer.email"
                                    v-model="form.email" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="phone">
                        <FormItem class="my-2" v-auto-animate>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="text" class="remove-arrow" placeholder="Phone"
                                    :default-value="props.customer.phone" v-model="form.phone"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="address">
                        <FormItem class="my-2" v-auto-animate>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea type="text" placeholder="Address" :default-value="props.customer.address"
                                    v-model="form.address" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <DialogFooter>
                        <Button v-if="form.processing" disabled>
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </Button>
                        <Button v-else type="submit" class="text-white bg-green-400 mt-2" variant="outline">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="openDelete">
            <DialogTrigger>
                <Button class="text-white bg-red-400" variant="outline" click="">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Customer</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this customer?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button v-if="form.processing" disabled>
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                    </Button>
                    <Button v-else @click="onDeleteSubmit" class="text-white bg-red-400" variant="outline">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
</template>