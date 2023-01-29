<template>
    <div class="mt-10">
        <h2 class="text-xl md:text-2xl text-gray-800 font-bold">Supplier Orders</h2>
        <div class=" flex flex-row flex-wrap gap-5 ">
            <div v-for="order in supplierOrders" :key="order.id"
                class="flex flex-col h-full gap-5 max-w-xl shadow-lg rounded-sm border border-gray-200">
                <div class="grow p-5">
                    <header>
                        <div class="text-center">
                            <a class="inline-flex text-gray-800 hover:text-gray-900" :href="`/supplier-order/${order.id}/`">
                                <h2 class="text-xl leading-snug justify-center font-semibold">#{{ order.id }}</h2>
                            </a>
                        </div>
                    </header>
                    <table>
                        <thead class="font-bold">
                            <tr>
                                <td>Medicine</td>
                                <td>Quantity</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="orderItem in order.supplierorderitem_set" :key="orderItem.id">
                                <td>{{ orderItem?.medicine?.brand_name }}</td>
                                <td>{{ orderItem.quantity }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="border-t border-gray-200">
                    <a class="block text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
                        :href="`/supplier-order/${order.id}`">
                        <div class="flex items-center justify-center">
                            <span>View</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["supplier"])
const supplierOrders = ref([])

watch(() => props.supplier, async (newSupplier) => {
    var response = await useBaseFetch(`/admin-api/meds/supplierorder/?supplier=${newSupplier.id}&fulfilled=false&limit=100000`)
    supplierOrders.value = response.results
})


</script>