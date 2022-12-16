<template>
    <div>
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <!-- Page header -->
                <div class="sm:flex sm:justify-between sm:items-center mb-8">

                    <!-- Left: Title -->
                    <div class="mb-4 sm:mb-0">
                        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Orders ✨</h1>
                    </div>

                    <!-- Right: Actions -->
                    <!-- <%= require('html-loader!./partials/table-actions.html') %> -->

                </div>
                <OrdersTable :orderbatches="orderBatches"></OrdersTable>
                <!-- <%= require('html-loader!./partials/orders/orders-table.html') %> -->
                
            </div>
        </main>
    </div>
</template>

<script setup>

const currentPage = useCurrentPage()
const orderBatches = ref([])

const paginationData = ref([])

onMounted(() => {
    currentPage.value = "Orders"
    getOrderBatches()
})

async function getOrderBatches() {
    paginationData.value =  await useBaseFetch("/admin-api/meds/orderbatch/")
    orderBatches.value = paginationData.value.results
    console.log(orderBatches.value)
}

</script>