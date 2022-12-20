<template>
    <div>
        <OrderBatchAccordion :order="order"></OrderBatchAccordion>
        <div class="m-5">
            <div class="max-w-[400px] m-5">
                <div>
                    <label class="block text-sm font-medium mb-1" for="address">Address</label>
                    <input id="address" class="form-input w-full" type="text"  v-model="order.address" />
                </div>
            </div>
            <div class="max-w-[400px] m-5">
                <div>
                    <label class="block text-sm font-medium mb-1" for="address">Phone Number</label>
                    <input id="address" class="form-input w-full" type="number" v-model="order.phone" />
                </div>
            </div>
            <div class="max-w-[400px] m-5">
                <div>
                    <label class="block text-sm font-medium mb-1" for="address">Email Address</label>
                    <input id="address" class="form-input w-full" type="email" v-model="order.email" />
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-5 m-5">
            <button class="btn bg-red-500 hover:bg-red-600 text-white" @click="initiateDelete()">Delete</button>
            <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Save</button>
        </div>
        <!-- <pre>{{ order }}</pre> -->
        <ConfirmDeleteModal :delete-info="deleteInfo" :delete-question="deleteQuestion" :show-modal="showDeleteModel" :delete-url="deleteUrl"></ConfirmDeleteModal>
    </div>
</template>

<script setup>

import OrderBatchAccordion from "~/components/order/OrderBatchAccordion.vue"
import ConfirmDeleteModal from "~~/components/utils/ConfirmDeleteModal.vue"


const router = useRouter()
const orderId = ref(null)

const order = ref({})


onMounted(() => {
    const route = useRoute()

    if (route.params.order) {
        orderId.value = route.params.order
        getOrder(orderId.value)
    }
    else {
        router.replace("/")
    }
})

async function getOrder(id) {
    order.value = await useBaseFetch(`/admin-api/meds/order/${id}/`)
}

const deleteQuestion = ref('Are you sure you want to delete this order?')
const deleteInfo = ref('')
const deleteUrl = ref('')
const showDeleteModel = ref(false)

function initiateDelete(){
    deleteInfo.value = `Deleting order number #${order.value.id} with ${order.value.orderitem_set.length} items.`
    deleteUrl.value = `/admin-api/meds/order/${order.value.id}/`
    showDeleteModel.value = true
}


</script>