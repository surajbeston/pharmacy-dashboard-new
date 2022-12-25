<template>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <div class="mb-8">
                    <button style="display: block; height: 30px; padding: 0; width: 75px"
                        class="ml-auto text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-white-900 border-2 border-indigo-400">
                        History
                    </button>
                </div>
                <div class="mb-8">
                    <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
                        #{{ purchaseLot.id }}
                    </h1>
                </div>

                <div class="border-t border-gray-200">
                    <div class="space-y-8 mt-8">
                        <div>
                            <div style="display: flex; flex-direction: column" class="grid gap-5 md:grid-cols-3">
                                <div class="flex flex-col gap-5">
                                    <div>
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Datetime
                                            Added<span class="text-red-500">*</span></label>
                                        <input v-model="datetime" class="form-input w-60" type="datetime-local" />
                                    </div>

                                    <div>
                                        <div class="max-w-[400px]">
                                            <label class="block text-sm font-medium mb-1" for="mandatory">Extras</label>
                                            <input v-model="purchaseLot.extras" id="mandatory" class="form-input w-full"
                                                type="text" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Supplier<span
                                                class="text-red-500">*</span></label>
                                        <Dropdown :objects="suppliers" name-attribute="name" value-attribute="id"
                                            @selected-object="selectSupplier" :initial-object="purchaseLotSupplier">
                                        </Dropdown>
                                    </div>

                                </div>
                                <div>
                                </div>
                                <PurchaseLotAccordion :purchase-lot="purchaseLot"></PurchaseLotAccordion>
                            </div>
                            <div class="flex justify-end mt-5">
                                <button @click="savePurchaseLot()"
                                    class="btn bg-green-500 hover:bg-green-600 text-white">Save</button>
                                <button @click="initiateDelete()"
                                    class="btn bg-red-500 hover:bg-red-600 text-white">Delete Lot</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <ConfirmDeleteModal :showModal="showDeleteModal" :deleteInfo="deleteInfo"
            deleteQuestion="Are you sure you want to delete this purchase lot?" :deleteUrl="deleteUrl"
            @cancelled="cancelDelete" @deleted="reloadPage"></ConfirmDeleteModal>
    </div>

</template>

<script setup>
import consolaGlobalInstance from 'consola';
import ConfirmDeleteModal from '~~/components/utils/ConfirmDeleteModal.vue';
import Dropdown from '~~/components/utils/Dropdown.vue';
const dropdownLoaded = ref(false)
const route = useRoute()
const id = route.params.id


const purchaseLot = await useBaseFetch(`/admin-api/meds/purchaselot/${id}`)
const { results: suppliers } = await useBaseFetch(`/admin-api/meds/supplier/?limit=100000`)
// const { results: medicines } = await useBaseFetch(`/admin-api/meds/medicine/?limit=10000000`)

const datetime = computed(() => {
    if (purchaseLot.datetime_added) {
        return purchaseLot.datetime_added.split(".")[0]
    }
})


function selectSupplier(supplierId) {
    console.log(supplierId)
}

const purchaseLotSupplier = computed(() => {
    if (purchaseLot) {
        console.log(suppliers)
        console.log(purchaseLot)
        var supplier = suppliers.filter((supplier) => {
            return supplier.id == purchaseLot.supplier
        })
        console.log(supplier)
        if (supplier.length > 0) return supplier[0]
    }
})

async function savePurchaseLot() {
    var data = purchaseLot
    var purchaseItems = purchaseLot.purchaseitem_set
    var id = purchaseLot.id
    delete data.purchaseitem_set
    delete data.id
    try {
        await useBaseFetch(`/admin-api/meds/purchaselot/${id}/`, {
            method: 'PATCH',
            body: data
        })
    }
    catch(err) {
        console.log(err.response)
    }
    purchaseItems.forEach((each) => {
        var item = each
        item.medicine = item.medicine.slug
        var id = item.id
        delete item.id
        delete item.purchase_lot
        useBaseFetch(`/admin-api/meds/purchaseitem/${id}/`, {
            method: 'PATCH',
            body: item
        }).then((response) => {
            console.log(response)
        }).catch(err => {
            console.log(err.response)
        })
    })
}


const deleteInfo = ref(' ')

function initiateDelete() {
    deleteInfo.value = `Delete purchase item of id #${purchaseLot.id} with ${purchaseLot.purchaseitem_set.length} items.`
    deleteUrl.value = `/admin-api/meds/purchaselot/${purchaseLot.id}/`
    showDeleteModal.value = true
}

function cancelDelete() {
    showDeleteModal.value = false
}
function reloadPage() {
    showDeleteModal.value = false
    const router = useRouter()
    router.push('/purchase')
}


onMounted(() => {

})

</script>
