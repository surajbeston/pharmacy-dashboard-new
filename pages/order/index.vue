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

                    <OrdersActions class="mr-20" @filter-url="filter"></OrdersActions>
                    <!-- Right: Actions -->
                    <!-- <%= require('html-loader!./partials/table-actions.html') %> -->
                </div>
                <OrdersTable :orderbatches="orderBatches" :loading="loading" ></OrdersTable>
                <!-- <%= require('html-loader!./partials/orders/orders-table.html') %> -->
                <Pagination :data="paginationData" @another-page="gotoAnotherPage" ></Pagination>
            </div>
        </main>
    </div>
</template>

<script setup>

const currentPage = useCurrentPage()
const orderBatches = ref([])

const paginationData = ref([])

const loading = ref(true)

onMounted(() => {
    currentPage.value = "Orders"
    getOrderBatches("/admin-api/meds/order/")
})

async function getOrderBatches(url) {
    loading.value = true
    paginationData.value =  await useBaseFetch(url)
    paginationData.value.results.forEach(element => {
        element.selected = false
    });
    orderBatches.value = paginationData.value.results
    loading.value = false
    console.log(orderBatches.value)
}

async function gotoAnotherPage(url){
    getOrderBatches(url)
}

async function filter(url){ 
    getOrderBatches(url)
}

</script>