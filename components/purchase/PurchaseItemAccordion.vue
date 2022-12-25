<template>
    <div class=" ml-10 rounded-sm border border-gray-300 bg-gray-100" >
        <div class="overflow-x-auto">
            <table class="table-auto w-full divide-y divide-gray-200">
                <tbody class="text-sm">
                    <tr :class="{'bg-red-200': errorOccured}">
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="text-left "># {{ purchaseItem?.medicine?.brand_name }}</div>
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
                    <tr v-show="openAccordion" class="ml-10">
                        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                            <PurchaseItemDetail :purchase-item="purchaseItem"></PurchaseItemDetail>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-show="openAccordion" class="flex justify-end m-5">
                <button v-if="purchaseItem.id" @click="initiateDelete()"
                    class="btn-sm bg-red-500 hover:bg-red-600 text-white">Delete Item</button>
                <button v-else @click="removeItem()" class="btn-sm bg-red-500 hover:bg-red-600 text-white">Remove
                    Item</button>
            </div>
            <ConfirmDeleteModal :showModal="showDeleteModal" :deleteInfo="deleteInfo"
                deleteQuestion="Are you sure you want to delete this purchase item?" :deleteUrl="deleteUrl"
                @cancelled="cancelDelete" @deleted="reloadPage"></ConfirmDeleteModal>
        </div>
    </div>
</template>

<script setup>
import ConfirmDeleteModal from '../utils/ConfirmDeleteModal.vue';

const props = defineProps(["purchaseItem", "save"])
const emit = defineEmits(["removeItem"])
const openAccordion = ref(false)
const { $bus } = useNuxtApp()

const errorOccured = ref(false)

const deleteInfo = ref(' ')
const showDeleteModal = ref(false)
const deleteUrl = ref('')

function initiateDelete() {
    deleteInfo.value = `Delete purchase item of id #${props.purchaseItem.id} with medicine ${props.purchaseItem?.medicine?.brand_name}.`
    deleteUrl.value = `/admin-api/meds/purchaseitem/${props.purchaseItem.id}/`
    showDeleteModal.value = true
}

function cancelDelete() {
    showDeleteModal.value = false
}

function reloadPage() {
    showDeleteModal.value = false
    location.reload()
}

function removeItem() {
    emit("removeItem", props.purchaseItem)
}

watch(() => props.save, async (save) => {
    var data = Object.assign({}, props.purchaseItem)
    data.medicine = data.medicine.slug
    try {
        await useBaseFetch(`/admin-api/meds/purchaseitem/`, {
            method: 'PATCH',
            body: data
        })
    }
    catch (err) {
        console.log(err.response)
    }
})

$bus.$on('saveItem', (data) => {
    var item = Object.assign({}, props.purchaseItem)
    if (props.purchaseItem.id) {
        item.medicine = item.medicine.slug
        var id = item.id
        delete item.id
        delete item.purchase_lot

        useBaseFetch(`/admin-api/meds/purchaseitem/${id}/`, {
            method: 'PATCH',
            body: item
        }).then((response) => {
            errorOccured.value = false
        }).catch(err => {
            errorOccured.value = true
        })
    }
    else {
        console.log("this purchase lot", data.purchaseLot)
        item.purchase_lot = data.purchaseLot.id
        item.medicine = item?.medicine?.slug
        console.log(item)
        useBaseFetch(`/admin-api/meds/purchaseitem/`, {
            method: 'POST',
            body: item
        }).then((response) => {
            errorOccured.value = false
        }).catch(err => {
            errorOccured.value = true
        })
    }
})

</script>