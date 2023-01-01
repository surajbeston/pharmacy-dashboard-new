<template>
    <div
        class="min-w-[200px]  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <div class="flex justify-between">
            <span class="font-medium m-2">Filter Medicine by Expiry Date</span>
            <DateTimeFilterDropdown @selected="fetchMedicine" future="true" save-key="medicine_expiry_date">
            </DateTimeFilterDropdown>
        </div>
        <div>
            <div v-for="item in items" :key="item?.slug" class="flex justify-between bg-white shadow-lg 
            rounded-sm border border-gray-200 p-2 ">
                <div class="underline text-blue-500">
                    <a :href="`/medicine/${item?.id}/`">
                        {{ item?.medicine?.brand_name }}</a>
                </div>
                <!-- <div>
                    Quantity Left: {{ medicine.quantity }}
                </div> -->
            </div>
        </div>
        <ComponentPagination :data="data" @another-page="getAnotherPage"></ComponentPagination>
    </div>
</template>

<script setup>

import DateTimeFilterDropdown from '../utils/DateTimeFilterDropdown.vue';
import ComponentPagination from './ComponentPagination.vue';

const items = ref([])
const data = ref(null)

onMounted(async () => {
    var today = new Date()
    var dateToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    data.value = await useBaseFetch(`/admin-api/meds/purchaseitem/?expiry_date__lte=${dateToday}`)
    items.value = data.value.results
})


async function fetchMedicine(dateRange) {
    data.value = await useBaseFetch(`/admin-api/meds/purchaseitem/?expiry_date__lte=${dateRange.from}&expiry_date_gte=${dateRange.to}`)
    items.value = data.value.results
}

async function getAnotherPage(url) {
    data.value = await useBaseFetch(url)
    items.value = data.value.results
}


</script>