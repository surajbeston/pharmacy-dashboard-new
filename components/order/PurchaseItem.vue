<template>
    <div class="overflow-x-auto ">
        <table class="table-auto w-full divide-y divide-gray-200">
            <!-- Table body -->
            <tbody class="text-sm">
                <!-- Row -->
                <tr class="bg-green-50 border border-gray-100 " 
                :class="{'border-2 border-gray-500 bg-blue-50': allocation > 0, 'bg-red-200': quantityLeft <= 0}">
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[5%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3  font-bold">
                            <a :href="`/purchase-item/${purchaseItem.id}`">#{{ purchaseItem?.id }} </a>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            Quantity Left: <span class="font-bold">{{ quantityLeft }}</span>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            Cost Price: <span class="font-bold">Rs. {{ purchaseItem?.cost_price }}</span>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            Supplier:
                            <a class="font-bold underline"
                                :href="`/supplier/${purchaseItem?.purchase_lot?.supplier?.id}`"> {{
                                        purchaseItem?.purchase_lot?.supplier?.name
                                }}</a>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            Expiry Date: <span class="font-bold">{{ new Date(purchaseItem?.expiry_date).toDateString()
                            }}</span>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            Ordered On: <span class="font-bold">{{ new
                                    Date(purchaseItem?.purchase_lot?.datetime_added).toDateString()
                            }}</span>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3  w-[36%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 ">
                            <div>
                                <label class="block text-sm font-medium mb-1" for="small">Quantity Allocated</label>
                                <div class="flex">
                                    <div @click="increaseAllocation"
                                        class="w-12 border border-gray-400 rounded-l-md border-r-0 p-1 text-center text-[20px] cursor-pointer select-none	">
                                        +</div>
                                    <input v-model="purchaseItem.allocation" max="5" id="icon"
                                        class="h-8 w-full p-1 text-center outline-none border border-gray-400"
                                        type="number" />
                                    <div @click="decreaseAllocation"
                                        class="w-12 border border-gray-400 rounded-r-md border-l-0 p-1 text-center text-[20px] cursor-pointer select-none	">
                                        -</div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const props = defineProps(["purchaseItem", "quantityToAllocate"])
const emit = defineEmits(["allocated"])
const lastAllocation = ref(0)

const quantityLeft = computed(() => props.purchaseItem.quantity - props.purchaseItem.allocation)

function increaseAllocation() {
    if (props.quantityToAllocate > 0 && props.purchaseItem.allocation < props.purchaseItem.quantity) {
        props.purchaseItem.allocation += 1
    }
}

function decreaseAllocation() {
    if (props.purchaseItem.allocation) {
        props.purchaseItem.allocation -= 1
    }
}

// const inputAllocation = ref(0)

const allocation = computed(() => props.purchaseItem.allocation)

watch(allocation, (newAllocation) => {
    if (newAllocation < 0) {
        props.purchaseItem.allocation = 0
    }
    else {
        var quantityIncreased = newAllocation - lastAllocation.value
        console.log(quantityLeft.value)
        if (quantityIncreased > props.quantityToAllocate || quantityLeft.value < 0) {
            props.purchaseItem.allocation = lastAllocation.value
        } else {
            emit("allocated", true)
            lastAllocation.value = newAllocation
        }
    }
})
</script>