<template>
    <div
        class="min-w-[200px]  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <div class="flex justify-between">
            <span class="font-medium m-2">Filter Medicine by Expiry Date</span>
            <DateTimeFilterDropdown @selected="fetchMedicine" future="true"></DateTimeFilterDropdown>
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
    </div>
</template>

<script setup>

import DateTimeFilterDropdown from '../utils/DateTimeFilterDropdown.vue';


const items = ref([])

onMounted(async () => {
    var today = new Date()
    var dateToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    var response = await useBaseFetch(`/admin-api/meds/purchaseitem/?expiry_date__lte=${dateToday}`)
    items.value = response.results
    console.log(response.results)
})


async function fetchMedicine(dateRange) {
    var response = await useBaseFetch(`/admin-api/meds/purchaseitem/?expiry_date__lte=${dateRange.from}&expiry_date_gte=${dateRange.to}`)
    items.value = response.results
    console.log(response)
}

</script>