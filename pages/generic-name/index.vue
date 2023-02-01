<template>
    <div>

        <ObjectsTable :objects="genericNames" :loading="loading" :features="features" delete-url="/admin-api/meds/genericname/__id__/" table-name="Generic Names" ></ObjectsTable>
        <Pagination :data="paginationData" @another-page="gotoAnotherPage"></Pagination>
    </div>
</template>

<script setup>

import ObjectsTable from '~~/components/utils/ObjectsTable.vue';
import Pagination from '~~/components/Pagination.vue';



const features = ref([{ "name": "salt_code", "type": "key", "url": "/generic-name/__id__" },
{ "name": "name", "type": "text" },
{ "name": "added_datetime", "type": "datetime" }])

const loading = ref(false)
const paginationData = ref({})

const genericNames = ref([])

onMounted(() => {
    getGenericNames("/admin-api/meds/genericname/")
})

async function getGenericNames(url) {
    paginationData.value = await useBaseFetch(url)
    console.log(paginationData.value)
    genericNames.value = paginationData.value.results
}

async function gotoAnotherPage(url) {
    getGenericNames(url)
}

</script>