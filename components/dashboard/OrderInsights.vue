<template>
    <div>
        <div
            class="min-w-[300px]  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
            <div class="flex justify-between border-b">
                <span class="font-medium m-2">Order Insights</span>
                <DateTimeFilterDropdown @selected="fetchDateTimeStatsOrders"></DateTimeFilterDropdown>
            </div>
            <div>
                <section>
                    <ul class="m-5">
                        <li class="md:flex md:justify-between md:items-center py-3 border-b border-gray-200">
                            <div class="text-sm text-gray-800 font-medium">Total Orders</div>
                            <div class="text-sm text-gray-800ml-4">
                                <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">{{ stats?.total }}</a>
                            </div>
                        </li>
                        <li class="md:flex md:justify-between md:items-center py-3 border-b border-gray-200">
                            <div class="text-sm text-gray-800 font-medium">Acknowledged Orders</div>
                            <div class="text-sm text-gray-800ml-4">
                                <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">{{ stats?.total_acknowledged }}</a>
                            </div>
                        </li>
                        <li class="md:flex md:justify-between md:items-center py-3 border-b border-gray-200">
                            <div class="text-sm text-gray-800 font-medium">Delivered Orders</div>
                            <div class="text-sm text-gray-800ml-4">
                                <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">{{ stats?.total_delivered }}</a>
                            </div>
                        </li>
                        <li class="md:flex md:justify-between md:items-center py-3 border-b border-gray-200">
                            <div class="text-sm text-gray-800 font-medium">Cancelled Orders</div>
                            <div class="text-sm text-gray-800ml-4">
                                <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">{{ stats?.total_cancelled }}</a>
                            </div>
                        </li>
                        <li class="md:flex md:justify-between md:items-center py-3 border-b border-gray-200">
                            <div class="text-sm text-gray-800 font-medium">Fulfilled Orders</div>
                            <div class="text-sm text-gray-800ml-4">
                                <a class="font-medium text-indigo-500 hover:text-indigo-600" href="#0">{{ stats?.total_fulfilled }}</a>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>


        </div>
    </div>
</template>

<script setup>

import DateTimeFilterDropdown from '../utils/DateTimeFilterDropdown.vue';

const stats = ref({})

async function getStats(data = {}) {
    var response = await useBaseFetch(`/admin-api/meds/order/status_stats/`, {
        method: 'POST',
        body: data
    })
    stats.value = response
}

onMounted(() => {
    getStats()
})

function fetchDateTimeStatsOrders(filterDates) {
    var data = {}
    if (filterDates.from != ""){
        data.datetime_from = filterDates.from
    }
    if (filterDates.to != ""){
        data.datetime_to = filterDates.to
    }
    getStats(data)
}


</script>