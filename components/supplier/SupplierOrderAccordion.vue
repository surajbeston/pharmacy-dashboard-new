<template>
    <div class="rounded-sm border border-gray-200">
        <div class="overflow-x-auto">
            <table class="table-auto w-full divide-y divide-gray-200 ">
                <tbody class="text-sm">
                    <tr>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left font-bold">Supplier Order Items ({{ supplierOrderItems.length }})
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
                    <tr v-show="openAccordion" v-for="item in supplierOrderItems" :key="item.id">
                        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                            <table class="table-auto w-full divide-y divide-gray-200">
                                <tbody class="text-sm">
                                    <tr class="bg-gray-200 rounded-md">
                                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div class="text-left ">Medicine: 
                                                <a :href="`/medicine/${item?.medicine?.slug}`" class="font-bold underline">{{ item?.medicine?.brand_name }}</a>
                                            </div>
                                        </td>
                                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div class="flex items-center text-gray-800">
                                                Quantity: <span class="font-bold">{{ item?.quantity }}</span>
                                            </div>
                                        </td>
                                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div class="flex items-center text-gray-800">
                                                Unit Price: 
                                                    <input v-model="item.unit_price" id="small" class="form-input w-full mx-2 px-2 py-1 max-w-[100px]" type="text" />
                                                
                                            </div>                                                                                                                                                                                                                                                              
                                        </td>
                                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <button @click="saveItem(item)" class="btn btn-sm bg-green-500 hover:bg-green-600 text-white">Save</button>                                                                                                                                                                                                                                                              
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>


<script setup>

const props = defineProps(["supplierOrderItems"])
const openAccordion = ref(false)


function saveItem(item) {
    useBaseFetch(`/admin-api/meds/supplierorderitem/${item.id}/`, {
        method: 'PATCH',
        body: {unit_price: item.unit_price}
    }).then((res) => {
        location.reload()
    })
}

</script>