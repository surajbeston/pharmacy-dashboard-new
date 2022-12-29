<template>
    <div>
        <div class="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
            <div>
                <header class="px-5 py-4 flex flex-row justify-between">
                    <div class="flex flex-row">
                        <h2 class="font-semibold text-gray-800">All Purchase Lots <span class="text-gray-400 font-medium"
                                x-text="purchaseLots?.length"></span></h2>
                        <Loader :loading="loading" class="ml-5"></Loader>
                    </div>
                    <button
                        class="btn border-gray-200 hover:border-gray-300 text-red-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        :disabled="!enabledDeleteBtn" @click="initiateDelete()">
                        <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                            <path
                                d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                        </svg>
                        <span class="ml-2">Delete</span>
                    </button>
                </header>
                <!-- Table -->
                <div class="overflow-x-auto">
                    <table class="table-auto w-full divide-y divide-gray-200">
                        <!-- Table header -->
                        <thead class="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200">
                            <tr>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div class="flex items-center">
                                        <label class="inline-flex">
                                            <span class="sr-only">Select all</span>
                                            <input id="parent-checkbox" class="form-checkbox" type="checkbox"
                                                v-model="allSelected" />
                                        </label>
                                    </div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Purchase Lot</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Supplier</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Extra</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Datetime Added</div>
                                </th>
                            </tr>
                        </thead>
                        <!-- Table body -->
                        <tbody class="text-sm">
                            <!-- Row -->
                            <tr v-for="purchaseLot in purchaseLots" :key="purchaseLot.id">
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div class="flex items-center">
                                        <label class="inline-flex">
                                            <span class="sr-only">Select</span>
                                            <input class="table-item form-checkbox" type="checkbox"
                                                v-model="purchaseLot.selected" />
                                        </label>
                                    </div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="flex items-center text-gray-800">
                                        <a :href="`/purchase/${purchaseLot.id}`">
                                            <div
                                                class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
                                                <img class="ml-1" src="../../images/icon-01.svg" width="20" height="20"
                                                    alt="Icon 01" />
                                            </div>
                                        </a>
                                        <div class="font-medium text-blue-500"><a :href="`/purchase/${purchaseLot.id}`">
                                                #<span>{{ purchaseLot?.id }}</span></a>
                                        </div>
                                    </div>
                                </td>
                                
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <a :href="`/supplier?id=${purchaseLot?.supplier?.id}`"
                                        class="font-medium text-gray-800 underline">{{ purchaseLot?.supplier?.name }}</a>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    {{ purchaseLot?.extras }}
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div>{{ new Date(purchaseLot.datetime_added).toDateString() }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmDeleteModal :show-modal="showDeleteModal" :delete-info="deleteInfo" delete-question="Are you sure you want to delete selected?" @cancelled="cancel" @deleted="deleteSelected" ></ConfirmDeleteModal>
        </div>
    </div>
</template>

<script setup>
import Loader from '~~/components/utils/Loader.vue';
import ConfirmDeleteModal from '~~/components/utils/ConfirmDeleteModal.vue';

const props = defineProps(["purchaseLots", "loading"])


watch(() => props.purchaseLots, (newData) => {
    purchaseLots.value = newData
})


const allSelected = ref(false)

watch(allSelected, (newVal) => {
    purchaseLots.value.forEach(element => {
        element.selected = allSelected.value
    });
})

const purchaseLots = ref([])

const enabledDeleteBtn = computed(() => {
    var anyOneEnabled = false
    purchaseLots.value.forEach((each) => {
        if (each.selected) anyOneEnabled = true
    })
    return anyOneEnabled
})



const showDeleteModal = ref(false)
const deleting = ref(false)
const deleteInfo = ref('')

function initiateDelete() {
    deleteInfo.value = `Deleting selected purchase lots.`
    showDeleteModal.value = true
}

function cancel(){
    showDeleteModal.value = false
}

async function deleteSelected() {
    deleting.value = true
    for (var purchase of purchaseLots.value) {
        if (purchase.selected) {
            await useBaseFetch(`/admin-api/meds/purchaselot/${purchase.id}/`, {
                method: 'DELETE'
            })
        }
    }
    deleting.value = false
    location.reload()
}




</script>
