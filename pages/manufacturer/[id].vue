<template>
  <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <!-- history button  -->
      <div class="mb-8">

        <button style="display: block; height: 30px; padding: 0; width: 75px"
          class="ml-auto text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-white-900 border-2 border-indigo-400">
          History
        </button>
      </div>
      <!-- history buttton ends  -->
      <!-- manufacturer name starts here  -->
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
          {{ manufacturer.name }}
        </h1>
      </div>
      <div v-if="id != 'new'">
        <img class="h-[200px] object-contain" width="286" height="160" :src="getImage()" />
        <input id="upload-image" type="file" @change="uploadImage" accept="image/*" class="hidden ">
        <div class="flex justify-left mb-5">
          <label for="upload-image"
            class="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">Update
            Image</label>
        </div>
      </div>

      <!-- ends here  -->
      <div class="border-t border-gray-200">
        <div class="space-y-8 mt-8">
          <div>
            <div style="display: flex; flex-direction: column" class="grid gap-5 md:grid-cols-3">
              <div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="mandatory">Reference Code<span
                      class="text-red-500">*</span></label>
                  <input v-model="manufacturer.reference_code" id="mandatory" class="form-input w-full" type="text"
                    required :disabled="id == 'new'" />
                </div>
                <!-- Start -->
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="mandatory">Name<span
                        class="text-red-500">*</span></label>
                    <input v-model="manufacturer.name" id="mandatory" class="form-input w-full" type="text" required />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="mandatory">Manufacturer Address<span
                        class="text-red-500"></span></label>
                    <input v-model="manufacturer.manufacturer_address" class="form-input w-full" type="text" required />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="mandatory">Marketer Address<span
                        class="text-red-500"></span></label>
                    <input v-model="manufacturer.marketer_address" class="form-input w-full" type="text" required />
                  </div>
                </div>
                <!-- End -->
              </div>
              <div>
                <!-- Start -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="default">Default Image:</label>
                  <input v-model="manufacturer.default_image" id="default" class="form-input w-full" type="text" />
                </div>
                <!-- End -->
              </div>
              <div>
                <!-- Start -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="default">Nation of Origin:</label>
                  <CountriesDropdown @selected-nation="selectNationality"></CountriesDropdown>
                </div>
                <!-- End -->
              </div>

              <div style="display: flex">
                <div class="m-1.5">
                  <!-- Start -->
                  <button @click="saveManufacturer()" class="btn bg-green-500 hover:bg-green-600 text-white">
                    Save
                  </button>
                  <!-- End -->
                </div>
                <div style="display: flex">
                  <div class="m-1.5">
                    <!-- Start -->
                    <div>
                      <button v-if="id != 'new'" class="btn bg-red-500 hover:bg-red-600 text-white"
                        @click.prevent="show = true" aria-controls="danger-modal">
                        Delete
                      </button>
                      <div v-if="show" id="danger-modal"
                        class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                        role="dialog" aria-modal="true">
                        <div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
                          <div class="p-5 flex space-x-4">
                            <!-- Icon -->
                            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100">
                              <svg class="w-4 h-4 shrink-0 fill-current text-red-500" viewBox="0 0 16 16">
                                <path
                                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                              </svg>
                            </div>
                            <!-- Content -->
                            <div>
                              <!-- Modal header -->
                              <div class="mb-2">
                                <div class="text-lg font-semibold text-gray-800">
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
                              <div class="flex flex-wrap justify-end space-x-2">
                                <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
                                  @click="show = false">
                                  Cancel
                                </button>

                                <button @click="deleteManufacturer()"
                                  class="btn-sm bg-red-500 hover:bg-red-600 text-white">
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
    <Loader v-show="loading" style="margin: auto 0" loading="loading" />
  </div>
</template>
<script setup>
import Loader from '~~/components/utils/Loader.vue';
import CountriesDropdown from '~~/components/utils/CountriesDropdown.vue';

//for showing the danger button
const show = ref(false);
const apiURL = useApiURL();
const manufacturer = ref({
  name: "",
  reference_code: "RAND",
  default_image: "",
  manufacturer_address: "",
  marketer_address: "",
  datetime_created: "",
  number_of_medicines: 0,
  nationality: ""
});
const route = useRoute();
const id = route.params.id;
const loading = ref(true);

onMounted(() => {
  if (id == "new") {

  }
  else {
    getManufacturer();
  }
});

async function getManufacturer() {
  try {
    var response = await useBaseFetch(`/admin-api/meds/manufacturer/${id}/`);
    console.log(response);
    manufacturer.value = response;
    loading.value = false;

    if (!response.ok) {
      throw new Error(response.statusText);
    }

  } catch (error) {
    console.log(error);
  }
}
//editing data

const router = useRouter()

async function saveManufacturer() {
  var data = JSON.parse(JSON.stringify(manufacturer.value));
  console.log(data)
  if (id == 'new') {
    const response = await useBaseFetch(`/admin-api/meds/manufacturer/`, {
      method: "POST",
      body: data,
    })
    router.push(`/manufacturer/${response.id}`)
  }
  else {
    delete data.id
    delete data.image
    const response = await useBaseFetch(`/admin-api/meds/manufacturer/${id}/`, {
      method: "PATCH",
      body: data,
    })
  }
}
// deleting data
async function deleteManufacturer() {
  try {
    const options = {
      method: "DELETE",
    };
    const url = `/admin-api/meds/manufacturer/${id}`;
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
    return route.push({ path: "/manufacturer" });
  }
}

const imageRoot = useImageRoot()

function getImage() {

  if (manufacturer.value.image) {
    return manufacturer.value.image
  }
  else if (manufacturer.value.default_image) {
    return `${imageRoot.value}/static/manufacturers/${manufacturer.value.default_image}`
  }
  else {
    return '/images/manufacturer2.svg'
  }
}

const uploadImageRoot = useUploadedImageRoot()
function uploadImage(evnt) {
  if (evnt.target.files.length > 0) {
    var file = evnt.target.files[0]
    let formData = new FormData()
    formData.append("image", file)
    var token = useCookie('auth_token');

    useBaseFetch(`/admin-api/meds/manufacturer/${manufacturer.value.id}/`, {
      body: formData,
      method: "PATCH",
      headers: {
        'Authorization': `Token ${token.value}`
      }
    }).then((response) => {
      console.log(response)
      location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }
}

function selectNationality(nation) {
  manufacturer.value.nationality = nation.value
}

</script>
