<template>
    <div>
        <Dropdown :objects="suppliers" name-attribute="name" value-attribute="id" @selected-object="selectSupplier" ></Dropdown>
    </div>
</template>

<script setup>
import Dropdown from '~~/components/utils/Dropdown.vue';
const dropdownLoaded = ref(false)


const {results: suppliers  } = await useBaseFetch(`/admin-api/meds/supplier/?limit=100000`)

// watch(response, (res) =>{
//     console.log(res)
// })

async function getSuppliers() {
    // var response = 
    // suppliers.value = response.results
    // console.log(response)
    // dropdownLoaded.value = true 
}

function selectSupplier(supplierId){
    console.log(supplierId)
}



onMounted(() => {
    
})

</script>
