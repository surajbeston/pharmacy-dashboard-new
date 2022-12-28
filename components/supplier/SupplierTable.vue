<template>
  <div>
    <div class="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
      <div>
        <header class="px-5 py-4 flex flex-row justify-between">
          <div class="flex flex-row">
            <h2 class="font-semibold text-gray-800">
              All Suppliers
              <span
                class="text-gray-400 font-medium"
                x-text="orderBatches?.length"
              ></span>
            </h2>
            <Loader :loading="loading" class="ml-5"></Loader>
          </div>
          <button
            class="btn border-gray-200 hover:border-gray-300 text-red-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="!enabledDeleteBtn"
            @click="initiateDelete()"
          >
            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
              <path
                d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"
              />
            </svg>
            <span class="ml-2">Delete</span>
          </button>
        </header>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table-auto w-full divide-y divide-gray-200">
            <!-- Table header -->
            <thead
              class="text-xs uppercase text-gray-500 bg-gray-50 border-t border-gray-200"
            >
              <tr>
                <th
                  class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"
                >
                  <div class="flex items-center">
                    <label class="inline-flex">
                      <span class="sr-only">Select all</span>
                      <input
                        id="parent-checkbox"
                        class="form-checkbox"
                        type="checkbox"
                        v-model="allSelected"
                      />
                    </label>
                  </div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Id</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Date & Time</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Manufacturer</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">Address</div>
                </th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody class="text-sm">
              <!-- Row -->
              <tr
                v-for="supplierBatch in supplierBatches"
                :key="supplierBatch.id"
              >
                <td
                  class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"
                >
                  <div class="flex items-center">
                    <label class="inline-flex">
                      <span class="sr-only">Select</span>
                      <input
                        class="table-item form-checkbox"
                        type="checkbox"
                        v-model="supplierBatch.selected"
                      />
                    </label>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-gray-800">
                    <a :href="`/supplier/${supplierBatch.id}`">
                      <div
                        class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3"
                      >
                        <img
                          class="ml-1"
                          src="../../images/icon-01.svg"
                          width="20"
                          height="20"
                          alt="Icon 01"
                        />
                      </div>
                    </a>
                    <div class="font-medium text-blue-500">
                      <a :href="`/supplier/${supplierBatch.id}`">
                        #<span>{{ supplierBatch?.id }}</span></a
                      >
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div>
                    {{ new Date(supplierBatch.datetime_added).toDateString() }}
                  </div>
                </td>
                <!-- need to make a dropdown here  -->
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <a
                    :href="`/manufacturer/${supplierBatch?.manufacturers}`"
                    class="font-medium text-gray-800 underline"
                    >{{ supplierBatch?.name }}</a
                  >
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div>
                    {{ supplierBatch.address }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="danger-modal"
        class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6 bg-slate-300/50"
        role="dialog"
        aria-modal="true"
        v-show="showDeleteModal"
      >
        <div
          class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full"
        >
          <div class="p-5 flex space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-red-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
                />
              </svg>
            </div>
            <!-- Content -->
            <div>
              <!-- Modal header -->
              <div class="mb-2">
                <div class="text-lg font-semibold text-gray-800">
                  Are you sure you want to delete selected Suppliers?
                </div>
              </div>
              <!-- Modal content -->

              <!-- Modal footer -->
              <div
                v-if="!deleting"
                class="flex flex-wrap justify-end space-x-2"
              >
                <button
                  class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
                  @click="showDeleteModal = false"
                >
                  Cancel
                </button>
                <button
                  class="btn-sm bg-red-500 hover:bg-red-600 text-white"
                  @click="deleteSelected()"
                >
                  Yes
                </button>
              </div>
              <div v-else class="flex justify-center">
                <svg
                  aria-hidden="true"
                  class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Loader from "~~/components/utils/Loader.vue";
//getting props data from index.vue of supplier
const props = defineProps(["supplierbatches", "loading"]);

watch(props, (newData) => {
  supplierBatches.value = newData.supplierbatches;
});

const allSelected = ref(false);

watch(allSelected, (newVal) => {
  supplierBatches.value.forEach((element) => {
    element.selected = allSelected.value;
  });
  console.log(supplierBatches.value);
});

const supplierBatches = ref([]);

const enabledDeleteBtn = computed(() => {
  var anyOneEnabled = false;
  supplierBatches.value.forEach((each) => {
    if (each.selected) anyOneEnabled = true;
  });

  return anyOneEnabled;
});

const showDeleteModal = ref(false);
const deleting = ref(false);

function initiateDelete() {
  showDeleteModal.value = true;
}

async function deleteSelected() {
  console.log("delete selected");
  deleting.value = true;
  for (var orderBatch of orderBatches.value) {
    if (orderBatch.selected) {
      await useBaseFetch(`/admin-api/meds/supplier/${supplierBatches.id}/`, {
        method: "DELETE",
      });
    }
  }
  deleting.value = false;
  location.reload();
}
</script>
