<template>
    <div
        class="min-w-[200px]  flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
        <div class="flex justify-between">
            <span class="font-medium m-2">Filter Medicine by Stock</span>
            <div>
                <label class="block text-sm font-medium mb-1" for="placeholder">Stock less than</label>
                <input v-model="quantity" id="placeholder" class="form-input w-full" type="number"
                    placeholder="Quantity" />
            </div>
        </div>
        <div>
            <div v-for="medicine in medicines" :key="medicine?.slug" class="flex justify-between bg-white shadow-lg 
            rounded-sm border border-gray-200 p-2 ">
                <div class="underline text-blue-500"><a :href="`/medicine/${medicine?.id}/`">{{ medicine?.brand_name}}</a>
                </div>
                <div>
                    Quantity Left: {{ medicine.quantity }}
                </div>
            </div>
            <div class="text-right font-semibold p-5">
                Total Medicines: {{ medicinesCount }}
            </div>
        </div>
    </div>
</template>

<script setup>

const medicines = ref([])
const medicinesCount = ref(0)
const quantity = ref(0)


onMounted(() => {
    var localQuantity = localStorage.getItem('filter_medicine_stock')
    if (localQuantity) {
        quantity.value = localQuantity
    }
})


watch(quantity, async (newQuantity) => {
    if (quantity.value) {
        localStorage.setItem('filter_medicine_stock', quantity.value)
    } 
    var response = await useBaseFetch(`/admin-api/meds/medicine/?quantity__lte=${newQuantity}`)
    medicines.value = response.results
    medicinesCount.value = response.count

})

</script>

