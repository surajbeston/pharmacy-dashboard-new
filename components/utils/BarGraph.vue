<template>
    <div>
        <Bar v-if="showChart" id="bar-graph" :options="chartOptions" :data="chartData" />
    </div>
</template>

<script setup>

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps(['labels', 'data', 'dataLabel', 'showChart', "dateRange"])
const chartData = ref({
    labels: [],
    datasets: [{ backgroundColor: "#1976D2", data: [], label: props.dataLabel }]
})
const chartOptions = ref({
    responsive: true
})

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

watch(() => props.showChart, () => {
    var filterBy = getFilterBy(props.dateRange)
    var usableData = {}

    props.data.forEach((point) => {
        var datetime = new Date(point.x)
        if (filterBy == 'year') {
            point.x = datetime.getFullYear()
        }
        else if (filterBy == 'month') {
            point.x = months[datetime.getMonth()]
        }
        else {
            point.x = `${datetime.getDate()} [${weeks[datetime.getDay()]}]`
        }
        // console.log(usableData[point.x])
        if (usableData[point.x] != undefined) {
            if (!isNaN(point.y)) usableData[point.x] += point.y
        }
        else{
            usableData[point.x] = 0
        }
    })

    chartData.value.datasets[0].data = Object.values(usableData)
    chartData.value.labels = Object.keys(usableData)
})

function getFilterBy(option) {
    if (option.includes("Year")) {
        return 'year'
    }
    else if (option.includes("Month")) {
        return 'month'
    }
    return 'day'
}

</script>