<template>
    <div>
        <Dropdown :objects="suppliers" name-attribute="name" value-attribute="id" @selected-object="selectSupplier" ></Dropdown>
    </div>
</template>

<script setup>
import Dropdown from '~~/components/utils/Dropdown.vue';
const dropdownLoaded = ref(false)

const suppliers = ref([])

async function getSuppliers() {
    var response = await useBaseFetch(`/admin-api/meds/supplier/?limit=100000`)
    suppliers.value = response.results
    console.log(response)
    dropdownLoaded.value = true 
}

function selectSupplier(supplierId){
    console.log(supplierId)
}



onMounted(() => {
    getSuppliers()
})

</script>
