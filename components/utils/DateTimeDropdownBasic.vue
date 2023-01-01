<template>
    <div class="relative">
        <button
            class="btn justify-between min-w-44 date-btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
            aria-label="Select date range" aria-haspopup="true" @click="showOptions = true" @blur="hideOptions()">
            <span class="flex items-center">
                <svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2" viewBox="0 0 16 16">
                    <path
                        d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                </svg>
                <span class="min-w-[100px]">{{ selectedOption }}</span>
            </span>
            <svg class="shrink-0 ml-1 fill-current text-gray-400" width="11" height="7" viewBox="0 0 11 7">
                <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
        </button>
        <div v-show="showOptions"
            class="z-10 absolute top-full right-0 w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
            <div v-for="option in dateSelectOptions" :key="option" class="font-medium text-sm text-gray-600">
                <button tabindex="0" class="flex items-center w-full hover:bg-gray-50 py-1 px-3 cursor-pointer"
                    @click="selectOption(option)">
                    <svg class="shrink-0 mr-2 fill-current text-indigo-500"
                        :class="{ 'invisible': !(selectedOption == option) }" width="12" height="9" viewBox="0 0 12 9">
                        <path
                            d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                    </svg>
                    <span>{{ option }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["saveKey"])
const emit = defineEmits(["selected"])

const showOptions = ref(false)

const selectedOption = ref('All Time')

const dateSelectOptions = ref(['Today', 'Last 3 Days', 'Last 7 Days', 'Last 1 Month', 'Last 12 Months'])

onMounted(() => {
    var option = localStorage.getItem(`datetime_filter_${props.saveKey}`)
    if (option){
        selectedOption.value = option
    }
    emit("selected", {'option': selectedOption.value, 'dateRange': getFilterDates()})
})

function selectOption(option) {
    selectedOption.value = option
    if (props.saveKey){
        localStorage.setItem(`datetime_filter_${props.saveKey}`, option)
    }
    emit("selected", {'option': selectedOption.value, 'dateRange': getFilterDates()})
}

function getFilterDates() {
    var today = new Date()
    var dateTo = today.toISOString().split('T')[0]
    if (selectedOption.value == "Today") {
        return { from: dateTo, to: dateTo }
    }
    else if (selectedOption.value.includes("3 Days")) {
        if (props.future) {
            today.setDate(today.getDate() + 2)
        }
        else {
            today.setDate(today.getDate() - 2)
        }
        var dateFrom = today.toISOString().split('T')[0]
        return { from: dateFrom, to: dateTo }
    }
    else if (selectedOption.value.includes("7 Days")) {
        if (props.future) {
            today.setDate(today.getDate() + 6)
        }
        else {
            today.setDate(today.getDate() - 6)
        }
        var dateFrom = today.toISOString().split('T')[0]
        return { from: dateFrom, to: dateTo }
    }
    else if (selectedOption.value.includes("1 Month")) {
        if (props.future) {
            today.setMonth(today.getMonth() + 1)
        }
        else {
            today.setMonth(today.getMonth() - 1)
        }
        var dateFrom = today.toISOString().split('T')[0]
        return { from: dateFrom, to: dateTo }
    }
    else if (selectedOption.value.includes("12 Months")) {
        if (props.future) {
            today.setMonth(today.getMonth() + 12)
        }
        else {
            today.setMonth(today.getMonth() - 12)
        }
        var dateFrom = today.toISOString().split('T')[0]
        return { from: dateFrom, to: dateTo }
    }
    else {
        return { from: '', to: '' }
    }
}

function hideOptions() {
    setTimeout(() => {
        showOptions.value = false
    }, 200);
}

</script>