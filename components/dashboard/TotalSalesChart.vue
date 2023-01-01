<template>
    <div>
        <div class="flex justify-end">
            <DateTimeDropdownBasic @selected="changeRange" save-key="purchase_chart"></DateTimeDropdownBasic>
        </div>
        <BarGraph :data="data" :show-chart="showChart" data-label="Time vs Total sales" :date-range="dropdownSelectedOption"></BarGraph>
    </div>
</template>

<script setup>
import BarGraph from '../utils/BarGraph.vue';
import DateTimeDropdownBasic from '../utils/DateTimeDropdownBasic.vue';

const showChart = ref(false)
const data = ref([])
const dropdownSelectedOption = ref('Today')

onMounted(async () => {

})

// const purchaseLots = await useBaseFetch('/admin-api/meds/purchaselot/?limit=1000000000')

function changeRange(data) {
    var option = data.option
    dropdownSelectedOption.value = option
    getData(data.dateRange)
}

async function getData(dateRange) {
    showChart.value = false
    var orders = await useBaseFetch('/admin-api/meds/order/get_amount_orders/', {
        method: 'POST',
        body: {
            "datetime_from": dateRange.from,
            "datetime_to": dateRange.to
        }
    })
    console.log(orders)
    data.value = []
    orders.forEach((order) => {
        data.value.push({x: order.datetime_ordered, y: order.total_amount})
    })

    console.log(data.value)

    showChart.value = true
}

</script>