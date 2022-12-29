<template>
    <div
        class="min-w-[200px]  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <div class="flex justify-between">
            <span class="font-medium m-2">Unfulfilled Orders</span>
            <DateTimeFilterDropdown @selected="fetchDateTimeOrders" save-key="recent_orders"></DateTimeFilterDropdown>
        </div>
        <div>
            <div v-for="order in orders" :key="order?.id" class="flex justify-between bg-white shadow-lg 
            rounded-sm border border-gray-200 p-2 ">
                <div class="font-semibold text-blue-500">#<a :href="`/order-admin/order/${order?.id}/`">{{ order?.id
}}</a></div>
                <div>
                    <div v-if="order?.status == 'Acknowledged'"
                        class="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
                        Acknowledged</div>

                    <div v-else-if="order?.status == 'Cancelled'" class=" inline-flex font-medium bg-red-100 text-red-500 rounded-full
                                        text-center px-2.5 py-0.5">
                        Cancelled</div>
                    <div v-else-if="order?.status == 'Delivered'"
                        class="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
                        Delivered</div>
                    <div v-else-if="order?.status == 'Fulfilled'"
                        class="inline-flex font-medium bg-blue-100 text-blue-600 rounded-full text-center px-2.5 py-0.5">
                        Fulfilled</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DateTimeFilterDropdown from '../utils/DateTimeFilterDropdown.vue';

const orders = ref([])



async function fetchDateTimeOrders(filterDates) {
    var orderUrl = `/admin-api/meds/order/?status=Acknowledged&ordering=datetime_ordered&`
    if (filterDates.from) {
        orderUrl += `datetime_ordered__gte=${filterDates.from}&`
    }
    else {
        orderUrl += `datetime_ordered__lte=${filterDates.to}&`
    }
    var response  = await useBaseFetch(orderUrl)
    orders.value = response.results
}

</script>