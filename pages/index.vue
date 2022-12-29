<template>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <!-- Page header -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Dashboard ✨</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

            </div>
        </div>

        <!-- Cards -->
        <!-- <div class="grid grid-cols-12 gap-6"> -->
            <!-- <UnfulfilledOrders></UnfulfilledOrders> -->

            <!-- <FilterMedicineStock></FilterMedicineStock>
            <FilterMedicineStockExpiry></FilterMedicineStockExpiry>
            <OrderInsights></OrderInsights> -->
            <ManyToMany name-attribute="brand_name" value-attribute="slug" :objects-url="`/meds/medicine/with_initial/`" @object-selected="getSelectedMedicines" ></ManyToMany>
            <ManyToMany name-attribute="name" value-attribute="id" :objects="manufacturers" @object-selected="getSelectedMedicines" ></ManyToMany>
        <!-- </div> -->
    </div>
</template>

<script setup >

import UnfulfilledOrders from '~~/components/dashboard/UnfulfilledOrders.vue';
import OrderInsights from '~~/components/dashboard/OrderInsights.vue';
import FilterMedicineStock from '~~/components/dashboard/FilterMedicineStock.vue';
import FilterMedicineStockExpiry from '~~/components/dashboard/FilterMedicineStockExpiry.vue';

import ManyToMany from '~~/components/utils/ManyToMany.vue';

const thisCurrentPage = useCurrentPage()

var { results:  manufacturers} = await useBaseFetch(`/admin-api/meds/manufacturer/?limit=10000`)

onMounted(() => {
    thisCurrentPage.value = "Dashboard"
})

function getSelectedMedicines(selectedMedicines){
    console.log(selectedMedicines)
}


</script>

