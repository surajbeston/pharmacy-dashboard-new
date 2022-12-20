<template>
    <div>
        <select id="manufacturer" class="form-select mt-2" @change="selectPharmacy()" ref="selectedPharmacy">
            <option value="">Select Pharmacy</option>
            <option v-for="pharmacy in pharmacies" :key="pharmacy.id" :value="pharmacy.id">{{
                    pharmacy.name
            }}</option>
        </select>
    </div>
</template>

<script setup>

const emit = defineEmits(["selectedPharmacyId"])
const pharmacies = ref([])
const selectedPharmacy = ref(null)

function selectPharmacy(){
    emit("selectedPharmacyId", selectedPharmacy.value.value)
}

async function getPharmacies() {
    var response = await useBaseFetch(`/admin-api/meds/pharmacy/?limit=10000&offset=0`)
    pharmacies.value = response.results.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
}

onMounted(() => {
    getPharmacies()
})

</script>