<template>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <div class="mb-8">
                    <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
                        #{{ supplierOrder.id }}
                    </h1>
                </div>

                <!-- ends here  -->
                <div class="border-t border-gray-200">
                    <div class="space-y-8 mt-8">
                        <div>
                            <div style="display: flex; flex-direction: column" class="grid gap-5 md:grid-cols-3">
                                <div>
                                    <div class="flex flex-col gap-5">
                                        <div class="max-w-[300px]">
                                            <div>
                                                <label class="block text-sm font-medium mb-1" for="placeholder">Total
                                                    Amount</label>
                                                <input id="placeholder" class="form-input w-full" type="number"
                                                    v-model="supplierOrder.total_amount" disabled />
                                            </div>
                                            <div class="text-xs mt-1">Read only. Calculated by totaling all supplier
                                                items.</div>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium mb-1">Supplier</label>
                                            <Dropdown :objects="suppliers" :initial-object="supplierOrder.supplier"
                                                name-attribute="name" value-attribute="id"></Dropdown>
                                        </div>
                                        <div class="m-3">
                                            <label class="flex items-center">
                                                <input v-model="supplierOrder.fulfilled" type="checkbox"
                                                    class="form-checkbox" />
                                                <span class="text-sm font-medium ml-2">Fulfilled</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-1">Datetime Added</label>
                                            <input :value="supplierOrder.datetime_added.split('.')[0]"
                                                class="form-input w-60" type="datetime-local">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-1">Email</label>
                                            <div class="flex gap-5">
                                                <input :value="supplierOrder.email" class="form-input w-60"
                                                    type="email">
                                                <div class="flex flex-col justify-center">
                                                    <button @click="gotoPurchase"
                                                        class="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Resend
                                                        Email</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-5">
                                        <SupplierOrderAccordion
                                            :supplier-order-items="supplierOrder.supplierorderitem_set">
                                        </SupplierOrderAccordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 flex justify-end gap-5">
                        <button v-if="showCompletePurchaseBtn" @click="completePurchase"
                            class="btn bg-green-500 hover:bg-green-600 text-white">Complete Purchase</button>
                        <button v-else @click="gotoPurchase"
                            class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Goto Purchase</button>
                        <button @click="showDeleteModal = true"
                            class="btn bg-red-500 hover:bg-red-600 text-white">Delete</button>
                    </div>
                </div>
                <ConfirmDeleteModal delete-question="Are you sure you want to delete this supplier?"
                    :delete-info="`Deleting supplier #${supplierOrder.id}`"
                    :delete-url="`/admin-api/meds/supplierorder/${supplierOrder.id}/`" :show-modal="showDeleteModal"
                    @cancelled="showDeleteModal = false" @deleted="onDelete">
                </ConfirmDeleteModal>
            </div>
        </main>
    </div>
</template>

<script setup>

import Dropdown from '~~/components/utils/Dropdown.vue';
import ConfirmDeleteModal from '~~/components/utils/ConfirmDeleteModal.vue';


const route = useRoute()

const supplierOrder = await useBaseFetch(`/admin-api/meds/supplierorder/${route.params.id}`)

const { results: suppliers } = await useBaseFetch(`/admin-api/meds/supplier/?limit=100000`)

const showDeleteModal = ref(false)

onMounted(() => {
    console.log(supplierOrder)
})

const showCompletePurchaseBtn = computed(() => {
    return !(supplierOrder.fulfilled && supplierOrder.purchaselot_set.length > 0)
})



function onDelete() {
    const router = useRouter()
    router.push("/supplier-order")
}

async function completePurchase() {
    var response = await useBaseFetch(`/admin-api/meds/supplierorder/${supplierOrder.id}/complete_purchase/`)
    const router = useRouter()
    router.push(`/purchase/${response.id}`)
}

async function gotoPurchase() {
    const router = useRouter()
    router.push(`/purchase/${supplierOrder.purchaselot_set[0].id}`)
}

</script>
