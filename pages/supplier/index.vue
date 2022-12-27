<template>
    <div>
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <!-- Page header -->
                <div class="sm:flex sm:justify-between sm:items-center mb-8">

                    <!-- Left: Title -->
                    <div class="mb-4 sm:mb-0">
                        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Supplier ✨</h1>
                    </div>

                    <OrdersActions class="mr-20" @filter-url="filter"></OrdersActions>
                    <!-- Right: Actions -->
                    <!-- <%= require('html-loader!./partials/table-actions.html') %> -->
                </div>
                <SupplierTable :supplierbatches="supplierBatches" :loading="loading" ></SupplierTable>
                <!-- <%= require('html-loader!./partials/orders/orders-table.html') %> -->
                <Pagination :data="paginationData" @another-page="gotoAnotherPage" ></Pagination>
            </div>
        </main>
    </div>
</template>

<script setup>

const currentPage = useCurrentPage()
const supplierBatches = ref([])

const paginationData = ref([])

const loading = ref(true)

onMounted(() => {
    currentPage.value = "Supplier"
    getSupplierBatches("/admin-api/meds/supplier/")
})

async function getSupplierBatches(url) {
    loading.value = true
    paginationData.value =  await useBaseFetch(url)
    paginationData.value.results.forEach(element => {
        element.selected = false
    });
    supplierBatches.value = paginationData.value.results
    loading.value = false
    console.log(supplierBatches.value)
}

async function gotoAnotherPage(url){
    getSupplierBatches(url)
}

async function filter(url){ 
    getSupplierBatches(url)
}

</script>