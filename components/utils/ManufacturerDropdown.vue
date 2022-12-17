<template>
    <div>
        <select id="manufacturer" class="form-select mt-2" @change="selectManufacturer()" ref="selectedManufacturer">
            <option value="">Select Manufacturer</option>
            <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">{{
                    manufacturer.name
            }}</option>
        </select>
    </div>
</template>

<script setup>

const emit = defineEmits(["selectedManufacturerId"])
const manufacturers = ref([])
const selectedManufacturer = ref(null)

function selectManufacturer(){
    console.log(selectedManufacturer.value)
    emit("selectedManufacturerId", selectedManufacturer.value.value)
}

async function getManufacturers() {
    var response = await useBaseFetch(`/admin-api/meds/manufacturer?limit=10000&offset=0`)
    manufacturers.value = response.results.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
}

onMounted(() => {
    getManufacturers()
})

</script>