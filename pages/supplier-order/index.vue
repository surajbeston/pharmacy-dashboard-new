<template>
    <div>
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                <div class="sm:flex sm:justify-between sm:items-center mb-8">
                    Supplier Orders
                </div>

                <div>
                    <ObjectsTable :objects="supplierOrders" :loading="loading" :features="features" delete-url="/admin-api/meds/supplierorder/__id__/" table-name="Supplier Order"></ObjectsTable>
                <Pagination :data="paginationData" @another-page="gotoAnotherPage"></Pagination>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>

import ObjectsTable from '~~/components/utils/ObjectsTable.vue';
import Pagination from '~~/components/Pagination.vue';

const supplierOrders = ref([])
const paginationData = ref({})

const loading = ref(false)

const features = ref([{"name": "id", "type": "key", "url": "/supplier-order/__id__" }, {"name": "total_amount", "type": "text"}, {"name": "fulfilled", "type": "boolean"}, {"name": "datetime_added", "type": "datetime"}])

onMounted(() => {
    getSupplierOrders("/admin-api/meds/supplierorder/")
})

async function getSupplierOrders(url) {
    loading.value = true
    paginationData.value = await useBaseFetch(url)
    paginationData.value.results.forEach(element => {
        element.selected = false
    });
    supplierOrders.value = paginationData.value.results
    console.log(supplierOrders)
    supplierOrders.value.forEach(lot => {
        
    })
    loading.value = false
    console.log(supplierOrders.value)
}

async function gotoAnotherPage(url) {
    getSupplierOrders(url)
}




</script>