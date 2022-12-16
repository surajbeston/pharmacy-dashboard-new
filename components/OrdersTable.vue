<template>
    <div>
        <div class="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
            <div>
                <header class="px-5 py-4 flex flex-row justify-between">
                    <h2 class="font-semibold text-gray-800">All Orders <span class="text-gray-400 font-medium"
                            x-text="orderBatches?.length"></span></h2>
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
                                                :value="allSelected" @click="toggleAll" />
                                        </label>
                                    </div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Order</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Date & Time</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Pharmacy</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Ordered By</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Status</div>
                                </th>

                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold">Medicines</div>
                                </th>
                                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="font-semibold text-left">Payment</div>
                                </th>
                            </tr>
                        </thead>
                        <!-- Table body -->
                        <tbody class="text-sm">
                            <!-- Row -->
                            <tr v-for="orderBatch in orderBatches" :key="orderBatch.id">
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div class="flex items-center">
                                        <label class="inline-flex">
                                            <span class="sr-only">Select</span>
                                            <input class="table-item form-checkbox" type="checkbox"
                                                :value="orderBatch.selected" @click="toggleOne(orderBatch)" />
                                        </label>
                                    </div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="flex items-center text-gray-800">
                                        <div
                                            class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
                                            <img class="ml-1" src="../../images/icon-01.svg" width="20" height="20"
                                                alt="Icon 01" />
                                        </div>
                                        <div class="font-medium text-light-blue-500">#<span>{{ orderBatch?.id }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div >{{ new Date(orderBatch.datetime_ordered).toDateString() }}</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <a :href="`/pharmacy-update?id=${orderBatch?.pharmacy?.id}`"
                                        class="font-medium text-gray-800 underline">{{ orderBatch?.pharmacy?.name }}</a>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <a :href="`/user-update.html?uid=${orderBatch?.ordered_by?.id}`"
                                        class="font-medium text-gray-800 underline"
                                      >{{ orderBatch?.ordered_by?.full_name }}</a>
                                </td>
                                <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="text-left font-medium text-green-500">$129.00</div>
                            </td> -->
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div v-if="orderBatch.status == 'Acknowledged'"
                                        class="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
                                        Acknowledged</div>

                                    <div v-else-if="orderBatch?.status == 'Cancelled'"
                                        class=" inline-flex font-medium bg-red-100 text-red-500 rounded-full
                                        text-center px-2.5 py-0.5">
                                        Cancelled</div>
                                    <div v-else-if="orderBatch.status == 'Delivered'"
                                        class="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
                                        Delivered</div>
                                    <div v-else-if="orderBatch.status == 'Fulfilled'"
                                        class="inline-flex font-medium bg-blue-100 text-blue-600 rounded-full text-center px-2.5 py-0.5">
                                        Fulfilled</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="text-center" x-text="orderBatch?.order_set?.length">1</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="flex items-center">

                                        <div
                                            class="inline-flex font-medium bg-blue-500 text-white rounded-full text-center px-2.5 py-0.5">
                                            Paid</div>
                                    </div>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>

        </div>
    </div>
</template>

<script setup>

const props = defineProps(["orderbatches"])

watch(props, (newData) => {
    orderBatches.value = newData.orderbatches
    console.log(orderBatches.value[0])
})

const enabledDeleteBtn = ref(true)
const allSelected = ref(false)

const orderBatches = ref([])

function initiateDelete() {

}


function toggleAll() {

}




</script>
