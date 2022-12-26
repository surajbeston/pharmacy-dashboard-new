<template>
    <div>
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <!-- Page header -->
                <div class="sm:flex sm:justify-between sm:items-center mb-8">

                    <!-- Left: Title -->
                    <div class="mb-4 sm:mb-0">
                        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Purchase Lots ✨</h1>
                    </div>

                    <!-- <OrdersActions class="mr-20" @filter-url="filter"></OrdersActions> -->
                </div>
                <PurchaseTable :purchase-lots="purchaseLots" :loading="loading" ></PurchaseTable>
                <Pagination :data="paginationData" @another-page="gotoAnotherPage" ></Pagination>
            </div>
        </main>
    </div>
</template>

<script setup>

const currentPage = useCurrentPage()
const purchaseLots = ref([])

const paginationData = ref([])

const loading = ref(true)

onMounted(() => {
    currentPage.value = "Purchase"
    getPurchaseLots("/admin-api/meds/purchaselot/")
})

async function getPurchaseLots(url) {
    loading.value = true
    paginationData.value =  await useBaseFetch(url)
    paginationData.value.results.forEach(element => {
        element.selected = false
    });
    purchaseLots.value = paginationData.value.results
    loading.value = false
    console.log(purchaseLots.value)
}

async function gotoAnotherPage(url){
    getPurchaseLots(url)
}

async function filter(url){ 
    getPurchaseLots(url)
}

</script>