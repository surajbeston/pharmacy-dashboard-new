<template>
    <div>

        <div class="overflow-x-auto mx-10">
            <h2 class="text-xl text-gray-800 font-bold m-5">Order Items Table</h2>
            <table class="table-auto w-full divide-y divide-gray-200 ">
                <!-- Table header -->
                <thead class="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
                    <tr>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Medicine</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Quantity</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Unit Price</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Total Price</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">Supply Items - Quantity</div>
                        </th>

                    </tr>
                </thead>
                <!-- Table body -->
                <tbody class="text-sm">
                    <!-- Row -->
                    <tr class="border border-b" v-for="item in orderItems" :key="item.id">
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{{ item.medicine.brand_name }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{{ item.quantity }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{{ item.last_sales_price }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div>{{ item.total_order_amount }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="flex flex-col">
                                <div v-for="supplyItem in item.supplyItems" :key="supplyItem.id">
                                    <span @click="showModal(supplyItem)" class="underline cursor-pointer">#{{
                                            supplyItem.id
                                    }}</span> - {{ supplyItem.allocation }}
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="flex flex-row justify-center m-5">
                <button @click="sendData()"
                    class="btn confirm-btn border-gray-200 hover:border-gray-300 text-gray-600">Confirm Order &
                    Bill</button>
            </div>
            <InfoModal :show-modal="showSupplyInfoModal" :info-title="supplyModalInfo" @cancelled="closeInfoModal">
                <div v-if="showSupplyInfoModal">
                    <p>Medicine: <span class="font-bold">{{ currentSupplyItem.medicine.brand_name }}</span></p>
                    <p>Supplier: <span class="font-bold">{{ currentSupplyItem.purchase_lot.supplier.name }}</span></p>
                    <p>Medicine Expiry Date: <span class="font-bold">{{ currentSupplyItem.expiry_date }}</span></p>
                    <p>Total Quantity: <span class="font-bold">{{ currentSupplyItem.quantity }}</span></p>
                    <!-- <pre>{{ currentSupplyItem }}</pre> -->
                </div>
            </InfoModal>
        </div>
    </div>
</template>

<script setup>

import InfoModal from '../utils/InfoModal.vue';

const props = defineProps(["orderItems", "orderId"])
const showSupplyInfoModal = ref(false)
const supplyModalInfo = ref('')
const currentSupplyItem = ref({})


watch(() => props.orderItems, (items) => {
    console.log("items", items)
})

function showModal(supplyItem) {
    supplyModalInfo.value = `Purchase Item Id: #${supplyItem.id}`
    currentSupplyItem.value = supplyItem
    showSupplyInfoModal.value = true
}

function closeInfoModal() {
    showSupplyInfoModal.value = false
}

async function sendData() {
    var data = { order: props.orderId,fulfillmentitem_set: [] }
    props.orderItems.forEach((each) => {
        var supplyItems = []
        each.supplyItems.forEach((supplyItem) => {
            supplyItems.push({
                quantity: supplyItem.allocation,
                purchase_item: supplyItem.id
            })
        })
        data.fulfillmentitem_set.push({ supplyitem_set: supplyItems})
    })
    console.log(data)
    try {
        var response = await useBaseFetch(`/admin-api/meds/fulfillment/`, {
            method: 'POST',
            body: data
        })
    }
    catch(err) {
        console.log(err.response)
    }
    console.log(response)
}


</script>

<style>
.confirm-btn {
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
</style>

