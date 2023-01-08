<template>
    <h2 class="text-xl md:text-2xl text-gray-800 font-bold">Medicine Stocks</h2>
    <div class=" rounded-sm border border-gray-300 bg-gray-100">
        <div class="overflow-x-auto">
            <table class="table-auto w-full divide-y divide-gray-200">
                <tbody class="text-sm">
                    <tr>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left ">
                                Medicine stock of <span class="font-bold"> {{ supplier?.name }} </span>
                            </div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="flex items-center text-gray-800">

                            </div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                            <div class="flex items-center">
                                <button class="text-gray-400 hover:text-gray-500 transform"
                                    :class="{ 'rotate-180': openAccordion }"
                                    @click.prevent="openAccordion = !openAccordion" :aria-expanded="openAccordion"
                                    aria-controls="description-01">
                                    <span class="sr-only">Menu</span>
                                    <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                        <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                            <div>
                                <table>
                                    <tbody>
                                        <tr v-show="openAccordion" v-for="medicine in supplierMedicines"
                                            :key="medicine.slug" class="ml-10"
                                            :class="{ 'bg-red-200': medicine.totalQuantity <= 0 }">
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                                                <input v-model="medicine.selected" type="checkbox"
                                                    class="form-checkbox" />
                                            </td>
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                                                Medicine:
                                                <a :href="`/medicine/${medicine.slug}`" class="underline"> <span
                                                        class="font-bold">{{
                                                            medicine.brand_name
                                                        }}</span></a>
                                            </td>
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                                                Available Quantity: <span class="font-bold">{{
                                                    medicine.quantity
                                                }}</span>
                                            </td>
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                                                Ordered Quantity: <span class="font-bold">{{
                                                    medicine.quantity_ordered
                                                }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="openAccordion" class="flex justify-end m-5">
                <button @click="initiateOrder" 
                    class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Reorder Selected</button>
            </div>
        </div>
        <InfoModal info-title="Reorder Medicines" :show-modal="showReorderModal">
            <table>
                <tbody>
                    <tr v-for="medicine in selectedMedicines" :key="medicine.slug">
                        <td class="m-5">{{ medicine.brand_name }}</td>
                        <td class="m-5">
                            <input id="small" v-model="medicine.quantityToOrder" class="form-input px-2 py-1"
                                type="number" placeholder="Quantity" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-end gap-2">
                <button @click="orderMedicines" class="btn-sm bg-green-500 hover:bg-green-600 text-white">Order</button>
                <button @click="showReorderModal = false"
                    class="btn-sm bg-red-500 hover:bg-red-600 text-white">Cancel</button>
            </div>
        </InfoModal>
    </div>
</template>

<script setup>
import ConfirmDeleteModal from '../utils/ConfirmDeleteModal.vue';
import InfoModal from '../utils/InfoModal.vue';


const props = defineProps(["supplier", "medicines"])
const emit = defineEmits(["removeItem"])
const openAccordion = ref(false)

const deleteInfo = ref(' ')
const showDeleteModal = ref(false)
const deleteUrl = ref('')

const errors = useFetchErrors()

const supplierMedicines = computed(() => {
    var meds = JSON.parse(JSON.stringify(props.medicines))
    meds.forEach(async (med) => {
        med.selected = false
    })
    console.log("changed")
    return meds
})


const showReorderModal = ref(false)
const selectedMedicines = ref([])

function initiateOrder() {
    var selected = false
    selectedMedicines.value = []
    supplierMedicines.value.forEach((med) => {
        if (med.selected) {
            selectedMedicines.value.push(med)
            selected = true
        }
    })
    if (selected) showReorderModal.value = true
    else errors.value.push("Select medicine before ordering.")
}

async function orderMedicines() {
    var supplierOrder = await useBaseFetch(`/admin-api/meds/supplierorder/`, {
        method: 'POST',
        body: { supplier: props.supplier.id }
    })
    selectedMedicines.value.forEach(async (med) => {
        var response = await useBaseFetch(`/admin-api/meds/supplierorderitem/`, {
            method: 'POST',
            body: { 'supplier_order': supplierOrder.id, 'quantity': med.quantityToOrder, 'medicine': med.slug, 'unit_price': 5 }
        })
    })
    showReorderModal.value = false
    location.reload()
}


</script>