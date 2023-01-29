<template>
  <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
    <main>
      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <h2 class="text-2xl text-gray-800 font-bold mb-6">Medicine Info</h2>
        <div class="flex flex-col md:flex-row">
          <div>
            <img class="h-[200px] object-contain" width="286" height="160"
              :src="getImage(medicineInfo?.extras?.info)" />
            <input id="upload-image" type="file" @change="uploadImage" accept="image/*" class="hidden ">
            <div class="flex justify-center mt-5">
              <label for="upload-image"
                class="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">Update
                Image</label>
            </div>
          </div>
          <div class="m-[50px]">
            <div style="margin-bottom: 10px; font-weight: 500">
              Medicine Name: <label>{{ medicineInfo.brand_name }}</label>
            </div>
            <div style="margin-bottom: 10px; font-weight: 500">
              Salts: <label>{{ medicineInfo.generic_name.name }}</label>
            </div>
            <div style="margin-bottom: 10px; font-weight: 500">
              Manufacturer:
              <label>{{ medicineInfo?.manufacturer?.name }}</label>
            </div>
            <div style="margin-bottom: 10px; font-weight: 500">
              Medicine Display Name:
              <label>{{ medicineInfo?.extras?.display_name }}</label>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <!-- button starts  -->
          <button style="display: block; height: 30px; padding: 0; width: 75px"
            class="ml-auto text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-white-900 border-2 border-indigo-400">
            History
          </button>
        </div>
        <!-- button ends  -->
        <div class="border-t border-gray-200">
          <!-- Components -->
          <div class="space-y-8 mt-8">
            <!-- Input Types -->
            <div>
              <div style="display: flex">
                <!-- Header  -->
                <h2 class="text-2xl text-gray-800 font-bold mb-6">
                  Edit Medicine
                </h2>
              </div>
              <!-- another section starts here  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Brand Name</label>
                    <input v-model="medicineInfo.brand_name" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Generic Name</label>
                    <AsyncDropDown :initial-object="medicineInfo.generic_name" method="get"
                      :objects-url="`/admin-api/meds/genericname/`" name-attribute="name" value-attribute="salt_code">
                    </AsyncDropDown>
                  </div>
                </div>
                <!-- Another section starts here  -->
              </div>
              <!-- row 2  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <div class="flex" style="justify-content: space-between">
                      <label class="block text-sm font-medium mb-1" for="manufacturer-item">Manufacturer <span
                          class="text-red-500">*</span></label>
                      <div class="fastedit" style="display: flex">
                        <a :href="`../manufacturer/${medicineInfo.manufacturer.id}`"
                          style="display: block; margin-left: auto" class="ml-2">
                          <svg enable-background="new 0 0 48 48" height="12px" id="Layer_4" version="1.1"
                            viewBox="0 0 48 48" width="12px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                              <rect height="10.373" transform="matrix(-0.7073 0.707 -0.707 -0.7073 76.2081 -18.93)"
                                width="6.526" x="38.761" y="1.127" />
                              <polygon
                                points="33.942,7.09 10.721,30.311 10.659,30.311 0.003,40.965 0.003,41.025 0.003,47.66 8.03,47.66 17.354,38.336    17.354,38.309 41.258,14.405  " />
                            </g>
                          </svg>
                        </a>
                        <!-- <a class="ml-2">
                          <svg
                            wid
                            enable-background="new 0 0 48 48"
                            height="12px"
                            id="Layer_1"
                            version="1.1"
                            viewBox="0 0 48 48"
                            width="12px"
                            xml:space="preserve"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                          >
                            <g id="Layer_3">
                              <polygon
                                fill="#241F20"
                                points="48,19.612 28.389,19.612 28.389,0.005 19.672,0.005 19.672,19.612 0.06,19.612 0.06,28.328    19.672,28.328 19.672,47.936 28.389,47.936 28.389,28.328 48,28.328  "
                              />
                            </g>
                          </svg>
                        </a> -->
                      </div>
                    </div>
                    <div>
                      <AsyncDropDown style="width: 100%;" objectsUrl="/meds/manufacturer/with_initial/"
                        nameAttribute="name" valueAttribute="id" :initial-object="medicineInfo.manufacturer"
                        @selectedObject="selectManufacturer">
                      </AsyncDropDown>
                    </div>
                    <!-- <select id="manufacturer-item" class="w-full form-select">
                      <option selected>
                        {{ medicineInfo.manufacturer.name }}
                      </option>
                      <option v-for="manufacturer in manufacturerList">
                        {{ manufacturer.name }}
                      </option>
                    </select> -->
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Packaging</label>
                    <input v-model="medicineInfo.packaging" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- row 3 -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Sales Price <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.sales_price" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Cost Price <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.cost_price" id="default" class="form-input w-full mb-2" type="text"
                      required />
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- row-4  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">MRP: <span
                        class="text-red-500">*</span></label>
                    <!-- <pre>{{ medicineInfo.extras }}</pre> -->
                    <input v-model="medicineInfo.extras.mrp" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <!-- Start -->
                    <label class="block text-sm font-medium mb-1" for="dosage-item">Dosage Form</label>
                    <select id="dosage-item" class="w-full form-select">
                      <option selected>-------</option>
                      <option v-for="dosage in dosageFormList" :key="dosage">
                        {{ dosage }}
                      </option>
                    </select>
                    <!-- End -->
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- row-5  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Strength(MG) <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.strength_mg" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Unit:</label>
                    <input v-model="medicineInfo.unit" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- another one  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Custom <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.custom" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Bonus <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.bonus" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- another one  -->
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Lot bonus: <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo.lot_bonus" id="default" class="form-input w-full mb-2 border-2"
                      type="text" />
                  </div>
                </div>
                <div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="default">Class: <span
                        class="text-red-500">*</span></label>
                    <input v-model="medicineInfo._class" id="default" class="form-input w-full mb-2" type="text" />
                  </div>
                </div>
              </div>
              <!-- ends  -->
              <!-- another one  -->

              <!-- ends  -->
              <!-- starts here buttons  -->
              <!-- ends here buttons  -->
            </div>
            <!-- others under line starts here  -->
            <div style="
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
              ">
              <div style="min-width: 49%">
                <label class="block text-sm font-medium mb-1">Precautions
                </label>
                <textarea style="
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 100%;
                  " class="border-2 p-2 rounded-md" v-model="medicineInfo.extras.precautions" id="txtid" name="txtname"
                  rows="5" cols="50" maxlength="500"></textarea>
              </div>
              <div style="min-width: 49%">
                <label class="block text-sm font-medium mb-1">Side Effects
                </label>
                <textarea style="
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 100%;
                  " class="border-2 p-2 rounded-md" v-model="medicineInfo.extras.side_effects" id="txtid"
                  name="txtname" rows="5" cols="50" maxlength="500"></textarea>
              </div>
            </div>
            <div style="
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
              ">
              <div style="min-width: 49%">
                <label class="block text-sm font-medium mt-0 mb-1">Drug Snapshot
                </label>
                <textarea style="
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 100%;
                  " class="border-2 p-2 rounded-md" v-model="medicineInfo.extras.drug_snapshot" id="txtid"
                  name="txtname" rows="5" cols="50" maxlength="500"></textarea>
              </div>
              <div style="min-width: 49%">
                <label class="block text-sm font-medium mb-1">Contraindications
                </label>
                <textarea style="
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 100%;
                  " class="border-2 p-2 rounded-md" v-model="medicineInfo.extras.contraindications" id="txtid"
                  name="txtname" rows="5" cols="55" maxlength="500"></textarea>
              </div>
              <div class="w-full mb-10">
                <label class="block text-sm font-medium mb-1">Indications
                </label>
                <MedicineIndication :existing-indications="medicineInfo.indications" @changed="addIndications">
                </MedicineIndication>
                <a class="text-sm text-blue-500" href="https://pharmacy-ecom.fly.dev/admin/meds/indication"
                  target="_blank">All Indications</a>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div class="m-1.5">
            <!-- Start -->
            <button @click="editMedicines()" class="btn bg-green-500 hover:bg-green-600 text-white">
              Save
            </button>
            <!-- End -->
          </div>

          <div class="m-1.5">
            <!-- Start -->
            <div>
              <button class="btn bg-red-500 hover:bg-red-600 text-white" @click.prevent="show = true"
                aria-controls="danger-modal">
                Delete
              </button>
              <!-- Modal backdrop -->

              <!-- Danger Modal dialog -->
              <div v-if="show" id="danger-modal"
                class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                role="dialog" aria-modal="true">
                <div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full"
                  @click.outside="modalOpen = false" @keydown.escape.window="modalOpen = false">
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
                          Delete 1 Medicine
                        </div>
                      </div>
                      <!-- Modal content -->
                      <div class="text-sm mb-10">
                        <div class="space-y-2">
                          <p>
                            Do you surely want to delete that? There is no come
                            back after this
                          </p>
                        </div>
                      </div>
                      <!-- Modal footer -->
                      <div class="flex flex-wrap justify-end space-x-2">
                        <button class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
                          @click="show = false">
                          Cancel
                        </button>

                        <button @click="deleteMedicines()" class="btn-sm bg-red-500 hover:bg-red-600 text-white">
                          Yes, Delete it
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- End -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import AsyncDropDown from "~/components/utils/AsyncDropdown.vue";

import Indication from "~/components/medicine/Indication.vue";
// import { use } from "h3";
// initialization
let show = ref(false);
const dosageFormList = [
  "Tablet",
  "Capsule",
  "Powder",
  "Dusting Powder",
  "Syrup",
  "Solution",
  "Suspension",
  "Emulsion",
  "Drop",
  "Cream",
  "Gel",
  "Ointment",
  "Paste",
  "Suppository",
  "Pessary",
  "Enema",
  "Douche",
  "Inhaler",
  "Respiratory Solution",
  "Aerosol",
  "Lozenge",
  "Gargle",
  "Ampule",
  "Vial",
  "Injection",
  "Transdermal Patch",
  "Mouth Wash",
];
// const medicineInfo = ref([]);
const route = useRoute();
const slug = route.params.id;
const apiURL = useApiURL();
const imageRoot = useImageRoot()

const manufacturerList = ref([]);
const medicineInfo = ref({
  slug: "",
  brand_name: "",
  generic_name: {
    salt_code: "",
    name: "",
    strength: "",
    added_datetime: null,
  },
  manufacturer: {
    id: 0,
    name: "",
    reference_code: "",
    image: "",
    manufacturer_address: "",
    marketer_address: "",
    datetime_created: "",
    number_of_medicines: 0,
  },
  packaging: null,
  sales_price: 0.0,
  cost_price: 0.0,
  mrp: 0.0,
  dosage_form: null,
  strength_mg: 0,
  unit: null,
  available: false,
  custom: 0.0,
  bonus: "0+0",
  _class: 0,
  datetime_added: "",
  extras: {
    mrp: null,
    image: "",
    unit_1: "",
    unit_2: "",
    product_id: 0,
    precautions: "",
    display_name: "",
    side_effects: "",
    drug_snapshot: "",
    pregnancy_risk: "",
    contraindications: "",
    product_short_description: null,
  },
  views: 0,
});

onMounted(() => {
  retrieveMedicines(URL);
  getManufacturerList();
});
//manufacturer list from api
async function getManufacturerList() {
  try {
    var response = await useBaseFetch(
      `/admin-api/meds/manufacturer?limit=10000&offset=0`
    );
    console.log(response.results);
    manufacturerList.value = response.results;
  } catch (error) {
    console.log(error);
  }
}

function addIndications(indications) {
  medicineInfo.value.indications = indications
}

function selectManufacturer(manufacturer) {
  medicineInfo.value.manufacturer = manufacturer
}

function getImage() {
  if (medicineInfo.value.image) {
    return medicineInfo.value.image
    
  }
  else if (medicineInfo.value.extras.image){
    return `${imageRoot.value}/static/medicines/${medicineInfo.value.extras.image}`
  }
  else {
    return '../images/medicine2.svg'
  }
}

// getting data from the api
async function retrieveMedicines() {
  try {
    var response = await useBaseFetch(`/admin-api/meds/medicine/${slug}/`);
    console.log(response);
    medicineInfo.value = response;
  } catch (error) {
    console.error(error);
  }
}
//editing data
async function editMedicines() {
  var data = medicineInfo;
  data.value.generic_name = data.value.generic_name.salt_code;
  data.value.manufacturer = data.value.manufacturer.id;
  delete data.value.id;
  const options = {
    method: "PATCH",
    body: data.value,
  };
  const url = `/admin-api/meds/medicine/${slug}/`;
  const response = useBaseFetch(url, options)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.response);
    });
}

//delete Medicine
async function deleteMedicines() {
  try {
    const options = {
      method: "DELETE",
    };
    const url = `/admin-api/meds/medicine/${slug}`;
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
    return route.push({ path: "/medicine" });
  }
}

const uploadImageRoot = useUploadedImageRoot()
function uploadImage(evnt) {
  if (evnt.target.files.length > 0) {
    var file = evnt.target.files[0]
    console.log(file)
    let formData = new FormData()
    console.log(formData)
    formData.append("image", file)
    console.log(formData)
    console.log(formData.get("image"))
    var token = useCookie('auth_token');
    
    useBaseFetch(`/admin-api/meds/medicine/${medicineInfo.value.slug}/`, {
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
</script>
