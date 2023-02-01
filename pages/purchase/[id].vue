<template>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        <main>
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
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
                                    <div v-show="id != 'new'">
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Datetime Generated<span class="text-red-500">*</span></label>
                                        <input v-model="generated_datetime" class="form-input w-60" type="datetime-local" />
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
                                            @selected-object="selectSupplier" :initial-object="purchaseLot.supplier">
                                        </Dropdown>
                                    </div>
                                    <div>
                                        <div class="max-w-[400px]">
                                            <label class="block text-sm font-medium mb-1" for="mandatory">Datetime
                                                Received</label>
                                            <input v-model="received_datetime" id="mandatory" 
                                                class="form-input w-full" type="datetime-local" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="max-w-[400px]">
                                            <label class="block text-sm font-medium mb-1" for="mandatory">Received
                                                By</label>
                                            <AsyncDropdown v-if="purchaseLot.received_by" objects-url="/admin-api/meds/myuser/"
                                                name-attribute="phone_number" value-attribute="id" method="get"
                                                initial-text="9" :initial-object="purchaseLot.received_by" @selected-object="selectReceivedBy">
                                            </AsyncDropdown>
                                            <AsyncDropdown v-else objects-url="/admin-api/meds/myuser/"
                                                name-attribute="phone_number" value-attribute="id" method="get"
                                                initial-text="9" @selected-object="selectReceivedBy">
                                            </AsyncDropdown>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                                <PurchaseLotAccordion :purchase-lot="purchaseLot"></PurchaseLotAccordion>
                            </div>
                            <div class="flex justify-end mt-5 gap-5">
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
import ConfirmDeleteModal from '~~/components/utils/ConfirmDeleteModal.vue';
import Dropdown from '~~/components/utils/Dropdown.vue';
import AsyncDropdown from '~~/components/utils/AsyncDropdown.vue';

const { $bus } = useNuxtApp()
const dropdownLoaded = ref(false)
const route = useRoute()
const id = route.params.id

const purchaseLot = ref([])
const { results: suppliers } = await useBaseFetch(`/admin-api/meds/supplier/?limit=100000`)
// const { results: medicines } = await useBaseFetch(`/admin-api/meds/medicine/?limit=10000000`)

const generated_datetime = computed({
    get() {
        if (purchaseLot.value.datetime_generated) {
            return purchaseLot.value.datetime_generated.split(".")[0].replace("Z", "")
        }
    },
    set(datetime) {
        purchaseLot.value.datetime_generated = datetime
        console.log("saved", purchaseLot.value.generated_datetime)
    }
})

const received_datetime = computed({
    get() {
        if (purchaseLot.value.received_datetime) {
            return purchaseLot.value.received_datetime.split(".")[0].replace("Z", "")
        }
    },
    set(datetime) {
        purchaseLot.value.received_datetime = datetime
        console.log("saved", purchaseLot.value.received_datetime)
    }
})

onMounted(async () => {
    if (id == 'new') {
        purchaseLot.value = {
            supplier: {},
            extras: "",
            purchaseitem_set: []
        }
    }
    else {
        purchaseLot.value = await useBaseFetch(`/admin-api/meds/purchaselot/${id}`)
    }
    console.log(purchaseLot.value)
})

function selectSupplier(supplier) {
    purchaseLot.value.supplier = supplier
}

const purchaseLotSupplier = computed(() => {
    if (purchaseLot) {

        var supplier = suppliers.filter((supplier) => {
            return supplier.id == purchaseLot.value.supplier
        })
        console.warn(supplier)
        if (supplier.length > 0) return supplier[0]
    }
})


function selectReceivedBy(receivedBy) {
    purchaseLot.value.received_by = receivedBy
}

async function savePurchaseLot() {
    var data = JSON.parse(JSON.stringify(purchaseLot.value))
    try {
        if (data.id) {
            delete data.id
            delete data.purchaseitem_set
            if (data.supplier) data.supplier = data.supplier.id
            if (data.received_by) data.received_by = data.received_by.id
            
            console.log(data)

            var currentPurchaseLot = await useBaseFetch(`/admin-api/meds/purchaselot/${purchaseLot.value.id}/`, {
                method: 'patch',
                body: data
            })
            console.log(currentPurchaseLot)
        }
        else {
            console.log(purchaseLot.value)
            var currentPurchaseLot = await useBaseFetch(`/admin-api/meds/purchaselot/`, {
                method: 'POST',
                body: { supplier: purchaseLot.value.supplier?.id, extras: purchaseLot.value.extras }
            })
        }
    }
    catch (err) {
        console.log(err.response)
    }
    // $bus.$emit('saveItem', { purchaseLot: currentPurchaseLot })
}


const deleteInfo = ref('')
const showDeleteModal = ref(false)
const deleteUrl = ref('')

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

const savedPurchaseItems = ref([])

$bus.$on("itemSaved", (response) => {
    savedPurchaseItems.value.push(response)

    if (savedPurchaseItems.value.length == purchaseLot.value.purchaseitem_set.length) {
        const router = useRouter()
        router.push(`/purchase/${response.purchase_lot}`)
    }
})



</script>
