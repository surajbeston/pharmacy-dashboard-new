<template>
    <div class="rounded-sm border border-gray-200">
        <div class="overflow-x-auto">
            <table class="table-auto w-full divide-y divide-gray-200">
                <tbody class="text-sm">
                    <tr>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left font-bold">Purchase Items({{ purchaseLot?.purchaseitem_set?.length }})
                            </div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="flex items-center text-gray-800">

                            </div>
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
                    <tr v-show="openAccordion" v-for="item in purchaseItems" :key="item.id">
                        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                            <PurchaseItemAccordion :purchase-item="item" @remove-item="removeItem"></PurchaseItemAccordion>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                            <div class="flex justify-end">
                                <button @click="addItem()" class="btn bg-indigo-500 hover:bg-indigo-600 text-white">Add Item</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["purchaseLot"])
const openAccordion = ref(false)

const purchaseItems = ref([])

onMounted(() => {
    purchaseItems.value = props.purchaseLot.purchaseitem_set
})

function addItem() {
    console.log("adding item")
    purchaseItems.value.push({
        medicine: null,
        manufacture_date: '2000-01-01',
        expiry_date: '2000-01-01',
        batch_number: '',
        initial_quantity: 0,
        margin: 0,
        mrp: 0,
        sales_price: 0,
        cost_price: 0
    })
    console.log(props.purchaseLot.purchaseitem_set)
}

function removeItem(item){
    var index = purchaseItems.value.indexOf(item)
    purchaseItems.value.splice(index, 1)
}


</script>