<template>
    <div class="border-t border-gray-200">
        <div class="space-y-8 mt-8">
            <div>
                <div style="display: flex; flex-direction: column" class="grid gap-5 md:grid-cols-3">
                    <div class="flex flex-col gap-5">
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Manufacture Date<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.manufacture_date" class="form-input w-60" type="date" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Expiry Date<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.expiry_date" class="form-input w-60" type="date" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Medicine<span
                                    class="text-red-500">*</span></label>
                            <AsyncDropDown objectsUrl="/meds/medicine/with_initial/" nameAttribute="brand_name"
                                valueAttribute="slug" :initialObject="currentMedicine" @selectedObject="selectMedicine">
                            </AsyncDropDown>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Batch Number<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.batch_number" id="mandatory" class="form-input w-full"
                                type="text" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Initial Quantity<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.initial_quantity" id="mandatory" class="form-input w-full"
                                type="number" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Margin<span
                                    class="text-red-500">*</span></label>
                            <div class="relative">
                                <input v-model="purchaseItem.margin" id="icon" class="form-input w-full"
                                    type="number" />
                                <div class="absolute p-2 pl-2 inset-0 right-auto flex items-center pointer-events-none">
                                    <img class="w-5" src="/icons/percentage.svg">
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">MRP<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.mrp" id="mandatory" class="form-input w-full" type="number"
                                required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Sales Price<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.sales_price" id="mandatory" class="form-input w-full"
                                type="number" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1" for="mandatory">Cost Price<span
                                    class="text-red-500">*</span></label>
                            <input v-model="purchaseItem.cost_price" id="mandatory" class="form-input w-full"
                                type="number" required />
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import AsyncDropDown from '../utils/AsyncDropdown.vue';


const props = defineProps(["purchaseItem"])
const currentMedicine = computed(() => {
    console.log(props.purchaseItem.medicine)
    return props.purchaseItem.medicine
})

function selectMedicine(slug) {
    selectedMedicine.value = slug
}
const selectedMedicine = ref('')



</script>

<style setup>
#icon {
    padding-left: 2.25rem;
}
</style>