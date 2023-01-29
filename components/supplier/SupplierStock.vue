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
                                <div>
                                    <input v-model="search" id="form-search" class="form-input w-[200px] pl-9" placeholder="Medicine" type="search" />
                                </div>
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
                                        <tr v-show="openAccordion" v-for="medicine in filteredMedicines"
                                            :key="medicine.slug" class="ml-10"
                                            :class="{ 'bg-red-200': medicine.totalQuantity <= 0 }">
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[2%]">
                                                <input v-model="medicine.selected" type="checkbox"
                                                    class="form-checkbox" />
                                            </td>
                                            <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                                                Manufaturer:
                                                <a :href="`/manufacturer/${medicine.manufacturer.id}`" class="underline"> <span
                                                        class="font-bold">{{
                                                            medicine.manufacturer.name
                                                        }}</span></a>
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
                                                    medicine.quantity_ordered ? medicine.quantity_ordered : 0
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
                <button @click="initiateOrder" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Reorder
                    Selected</button>
            </div>
        </div>
        <InfoModal info-title="Reorder Medicines" :show-modal="showReorderModal" :large="true">
            <table class="w-full">
                <tbody>
                    <tr v-for="medicine in selectedMedicines" :key="medicine.slug">
                        <td class="m-5 w-[10%]">{{ medicine.brand_name }}</td>
                        <td class="m-5 w-[30%]">
                            <input id="small" v-model="medicine.quantityToOrder" class="form-input px-2 py-1 max-w-[100px]"
                                type="number" placeholder="Quantity" />
                        </td>
                        <td class="m-5 w-[30%]">
                            <input id="small" v-model="medicine.unitPrice" class="form-input px-2 py-1 max-w-[100px]"
                                type="number" placeholder="Unit Price" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="border-t-2 flex gap-5 pt-5">
                <label class="text-sm font-medium mb-1 flex flex-col justify-center" for="email">
                    <span>Supplier Email (to send order)</span>
                </label>
                <input class="form-input px-2 py-1 " v-model="email"
                                type="email" placeholder="Supplier Email" />
            </div>
            <div class="flex justify-end gap-2">
                <button @click="orderMedicines" class="btn-sm bg-green-500 hover:bg-green-600 text-white">Order</button>
                <button @click="showReorderModal = false"
                    class="btn-sm bg-red-500 hover:bg-red-600 text-white">Cancel</button>
            </div>
        </InfoModal>
    </div>
</template>

<script setup>
import { useVueFuse, VueFuse } from "vue-fuse"


import ConfirmDeleteModal from '../utils/ConfirmDeleteModal.vue';
import InfoModal from '../utils/InfoModal.vue';


const props = defineProps(["supplier", "medicines"])
const emit = defineEmits(["removeItem"])
const openAccordion = ref(false)

const deleteInfo = ref(' ')
const showDeleteModal = ref(false)
const deleteUrl = ref('')
const email = ref('')

const errors = useFetchErrors()



const supplierMedicines = computed(() => {
    var meds = JSON.parse(JSON.stringify(props.medicines))
    meds.forEach(async (med) => {
        med.selected = false
    })
    return meds
})

const showReorderModal = ref(false)
const selectedMedicines = ref([])

const { search, results, noResults } = useVueFuse(supplierMedicines, { keys: ['slug'] })

onMounted(() => {
    email.value = props.supplier.email
})

watch(() => props.supplier, (newSupplier) => {
    email.value = newSupplier.email
})

const filteredMedicines = computed(() => {
    if (search.value.length > 0 ){
        if (results.value.length > 0){
            return results.value
        }
        return []
    }
    return supplierMedicines.value
})

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
        body: { supplier: props.supplier.id, email : email.value }
    })
    selectedMedicines.value.forEach(async (med) => {
        var response = await useBaseFetch(`/admin-api/meds/supplierorderitem/`, {
            method: 'POST',
            body: { 'supplier_order': supplierOrder.id, 'quantity': med.quantityToOrder, 'medicine': med.slug, 'unit_price': med.unitPrice }
        })
    })
    showReorderModal.value = false
    location.reload()
}


</script>