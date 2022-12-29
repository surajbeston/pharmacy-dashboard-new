<template>
    <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

        <!-- Delete button -->
        <div class="table-items-action hidden">
            <div class="flex items-center">
                <div class="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span
                        class="table-items-count"></span> items selected</div>
                <button
                    class="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600">Delete</button>
            </div>
        </div>
        <div>
            <Dropdown :objects="pharmacies" name-attribute="name" value-attribute="id" @selected-object="filterByPharmacy" ></Dropdown>
        </div>
        <div class="relative">

            
            <DateTimeFilterDropdown @selected="selectOption"></DateTimeFilterDropdown>
        </div>
    </div>

</template>

<script setup>
import Dropdown from './utils/Dropdown.vue';
import ManufacturerDropdown from './utils/ManufacturerDropdown.vue';
import PharmacyDropdown from './utils/PharmacyDropdown.vue';
import DateTimeFilterDropdown from './utils/DateTimeFilterDropdown.vue';

// const props = defineProps(["selectedDate"])
const emit = defineEmits(["filterUrl"])


const {results: pharmacies} = await useBaseFetch(`/admin-api/meds/pharmacy/?limit=10000&offset=0`)

const showOptions = ref(false)
const manufacturers = ref([])

const dateFilterString = ref('')
const pharmacyFilterString = ref('')

function selectOption(filterDates) {
    // var url = `/admin-api/meds/orderbatch/?date_ordered__gte=${date.from}&date_ordered__lte=${date.to}`
    dateFilterString.value = `date_ordered__gte=${filterDates.from}&date_ordered__lte=${filterDates.to}`
}

async function filterByPharmacy(pharmacy){
    pharmacyFilterString.value = `pharmacy=${pharmacy.id}`
}

watch(() => pharmacyFilterString.value + dateFilterString.value, () => {
    console.log(pharmacyFilterString.value)
    console.log(dateFilterString.value)

    emit("filterUrl", `/admin-api/meds/order/?${pharmacyFilterString.value}&${dateFilterString.value}`)
})



</script>