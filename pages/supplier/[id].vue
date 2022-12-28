<template>
  <div
    class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white"
  >
    <main v-if="!loading">
      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <!-- history button  -->
        <div class="mb-8">
          <button
            style="display: block; height: 30px; padding: 0; width: 75px"
            class="ml-auto text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-white-900 border-2 border-indigo-400"
          >
            History
          </button>
        </div>
        <!-- history buttton ends  -->
        <!-- manufacturer name starts here  -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
            {{ supplier.name }}
          </h1>
        </div>

        <!-- ends here  -->
        <div class="border-t border-gray-200">
          <div class="space-y-8 mt-8">
            <div>
              <div
                style="display: flex; flex-direction: column"
                class="grid gap-5 md:grid-cols-3"
              >
                <div>
                  <div>
                    <label
                      class="block text-sm font-medium mb-1"
                      for="mandatory"
                      >Name<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="supplier.name"
                      id="mandatory"
                      class="form-input w-full"
                      type="text"
                      required
                    />
                  </div>
                  <!-- Start -->
                  <div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="mandatory"
                        >Manufacturers<span class="text-red-500">*</span></label
                      >
                    </div>
                    <AsyncDropdown style="width: 100%;"
                      objectsUrl="/meds/manufacturer/with_initial/"
                      nameAttribute="name"
                      valueAttribute="id"
                      @selectedObject="selectManufacturer"
                    />
                  </div>
                  <div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="mandatory"
                        >Medicines<span class="text-red-500"></span
                      ></label>
                      <div v-for="Meds in supplier.medicines" style="display: flex;">
                        <h3 style="border: 2px solid red;">{{ Meds }}</h3>
                        <a href="">Delete</a>
                      </div>
                    
                    </div>
                  </div>
                  <div>
                    <div>
                      <label
                        class="block text-sm font-medium mb-1"
                        for="mandatory"
                        >Self Manufacturing<span class="text-red-500"></span
                      ></label>
                      <input
                        v-model="supplier.self_manufacturing"
                        type="checkbox"
                        required
                      />
                    </div>
                  </div>
                  <!-- End -->
                </div>
                <div>
                  <!-- Start -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default"
                      >Address</label
                    >
                    <input
                      v-model="supplier.address"
                      id="default"
                      class="form-input w-full"
                      type="text"
                    />
                  </div>
                  <!-- End -->
                </div>

                <div style="display: flex">
                  <div class="m-1.5">
                    <!-- Start -->
                    <button
                      @click="editSupplier()"
                      class="btn bg-green-500 hover:bg-green-600 text-white"
                    >
                      Save
                    </button>
                    <!-- End -->
                  </div>
                  <div style="display: flex">
                    <div class="m-1.5">
                      <!-- Start -->
                      <div>
                        <button
                          class="btn bg-red-500 hover:bg-red-600 text-white"
                          @click.prevent="show = true"
                          aria-controls="danger-modal"
                        >
                          Delete
                        </button>
                        <div
                          v-if="show"
                          id="danger-modal"
                          class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                          role="dialog"
                          aria-modal="true"
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
                                  <div
                                    class="text-lg font-semibold text-gray-800"
                                  >
                                    Delete 1 Manufacturer
                                  </div>
                                </div>
                                <!-- Modal content -->
                                <div class="text-sm mb-10">
                                  <div class="space-y-2">
                                    <p>
                                      Do you surely want to delete that? There
                                      is no come back after this
                                    </p>
                                  </div>
                                </div>
                                <!-- Modal footer -->
                                <div
                                  class="flex flex-wrap justify-end space-x-2"
                                >
                                  <button
                                    class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
                                    @click="show = false"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    @click="deleteSupplier()"
                                    class="btn-sm bg-red-500 hover:bg-red-600 text-white"
                                  >
                                    Yes, Delete it
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Loader v-show="loading" style="margin: auto 0" loading="loading" />
  </div>
</template>
<script setup>
import AsyncDropdown from "~/components/utils/AsyncDropdown.vue";
import Loader from "~~/components/utils/Loader.vue";
//for showing the danger button
const show = ref(false);
const apiURL = useApiURL();
const supplier = ref({
  id: 0,
  name: "",
  self_manufacturing: false,
  address: "",
  datetime_added: "",
  manufacturers: [],
  medicines: [],
});
const route = useRoute();
const slug = route.params.id;
const loading = ref(true);
onMounted(() => {
  getSupplier();
  console.log(slug);
});

async function getSupplier() {
  try {
    var response = await useBaseFetch(`/admin-api/meds/supplier/${slug}/`);
    supplier.value = response;
    console.log(supplier.value);
    loading.value = false;
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}
//editing data
async function editSupplier() {
  var data = supplier;
  const options = {
    method: "PATCH",
    body: data.value,
  };
  const url = `/admin-api/meds/supplier/${slug}/`;
  const response = useBaseFetch(url, options)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// deleting data
async function deleteSupplier() {
  try {
    const options = {
      method: "DELETE",
    };
    const url = `/admin-api/meds/supplier/${slug}`;
    const response = await useBaseFetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // const data = response.json();
  } catch (error) {
    console.error(error);
    console.log(error.response);
  } finally {
    location.reload("/");
    return route.push({ path: "/" });
  }
}
</script>
