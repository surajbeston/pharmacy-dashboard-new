<template>
    <div>
        <div>
            <div class="flex justify-start">
                <div>
                    <h2 class="text-2xl text-gray-800 font-bold m-5 ">Order: #{{ currentOrder?.id }}</h2>
                </div>
                <div class="flex flex-col justify-center">
                    <Tooltip text="Refresh" bottom="false">
                        <img @click="reload" class="h-[20px] cursor-pointer" src="~/assets/icons/reload.png" />
                    </Tooltip>
                </div>
        </div>
        <!-- Start -->
        <div class="rounded-sm border border-gray-200">
            <div class="overflow-x-auto">
                <table class="table-auto w-full divide-y divide-gray-200">
                    <!-- Table body -->
                    <tbody class="text-sm">
                        <!-- Row -->
                        <tr>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="text-left font-bold">#{{ currentOrder?.id }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="flex items-center text-gray-800">
                                    <div class="font-medium text-gray-800">Pharmacy: <a
                                            :href="`/pharmacy/${currentOrder?.pharmacy?.id}`" class="underline">{{
                                                    currentOrder?.pharmacy?.name
                                            }}</a></div>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="text-left">Ordered By: <a :href="`/user/${currentOrder?.ordered_by?.id}`"
                                        class="underline">{{
                                                currentOrder?.ordered_by?.full_name
                                        }}</a></div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="text-left">{{ getStringDateTime(currentOrder?.datetime_ordered) }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="text-left text-green-500 font-medium">Total: Rs. {{
                                        currentOrder?.total_order_amount
                                }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                <div class="flex items-center">
                                    <button class="text-gray-400 hover:text-gray-500 transform"
                                        :class="{ 'rotate-180': openAccordion }"
                                        @click.prevent="openAccordion = !openAccordion" :aria-expanded="openAccordion"
                                        aria-controls="description-01">
                                        <span class="sr-only">Menu</span>
                                        <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                            <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr id="description-01" role="region" v-show="openAccordion">
                            <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                                <div>
                                    <div v-for="order_item in currentOrder?.orderitem_set" :key="order_item.id"
                                        class="rounded-sm border border-gray-200 ml-10">
                                        <OrderItemAccordion :order-item="order_item" :auto-allocate="autoAllocate" @allocated="accumulateAllocation">
                                        </OrderItemAccordion>
                                    </div>
                                    <!-- End -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center m-5">
                    <button v-show="!accumulated" @click="autoAllocate = true"
                        class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Allocate for all Medicines</button>
                </div>
                <OrderBatchConfirmTable v-show="accumulated" :order-items="currentOrder.orderitem_set" :order-id="currentOrder.id"></OrderBatchConfirmTable>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>

import Tooltip from '../utils/Tooltip.vue';

const openAccordion = ref(true)
const props = defineProps(["order"])

const currentOrder = ref({})
const autoAllocate = ref(false)
const accumulated = ref(false)

// const currentOrder = computed(() => {
//     if (props.value) {
//         if (props.value.order) {
//             if (props.value.order.orderitem_set) {
//                 return props.order.value.orderitem_set.map((each) => {
//                     return each.accordionOpen = false
//                 })
//             }
//         }
//     }

// })

watch(() => props.order, (newOrder) => {
    newOrder.orderitem_set.map((each) => {
        each.accordionOpen = false
        each.selected = true
        each.allocation = 0
        each.allocated = false
        each.supplyItems = []
    })
    currentOrder.value = newOrder
})

function accumulateAllocation(allocated) {
    if (allocated){
        var localAccumulated = true
        currentOrder.value.orderitem_set.forEach((item) => {
            localAccumulated = localAccumulated && item.allocated
        })
        accumulated.value = localAccumulated
    }
    else{
        accumulated.value =  false
    }
}

function getStringDateTime(datetime) {
    if (datetime) {
        var date = new Date(datetime)
        return `${date.toDateString()} ${date.toTimeString()}`.replace("GMT+0545 (Nepal Time)", "")
    }
}



function reload(){
    location.reload()
}

</script>