<template>
  <div class="font-inter antialiased bg-gray-100 text-gray-600">
    <!-- Page wrapper -->
    <div class="flex h-screen overflow-hidden">
      <!-- Content area -->
      <div
        id="scroll-to-here"
        class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
      >
        <main>
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">
              <!-- Left: Title -->
              <div class="mb-4 sm:mb-0">
                <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
                  <div class="flex items-center">
                    <span> Update user 👤 </span>

                    <svg
                      v-if="Object.keys(user).length === 0"
                      class="animate-spin w-6 h-6 fill-current shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                      />
                    </svg>
                  </div>
                </h1>
              </div>

              <div
                class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              >
                <!-- Delete button -->
                <div class="table-items-action">
                  <div class="flex items-center">
                    <div>
                      <button
                        @click="openDeleteModal = true"
                        class="btn !cursor-pointer bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                      <div v-if="openDeleteModal">
                        <!-- modal backdrop -->
                        <div
                          class="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
                        ></div>
                        <!-- modal dialog -->
                        <div
                          id="danger-modal"
                          class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                          role="dialog"
                          aria-modal="true"
                        >
                          <div
                            class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full"
                          >
                            <div class="p-5 flex space-x-4">
                              <!-- icon -->
                              <div
                                class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100"
                              >
                                <svg
                                  class="w-4 h-4 shrink-0 fill-current text-red-500"
                                  viewbox="0 0 16 16"
                                >
                                  <path
                                    d="m8 0c3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3h7v4h2v5z"
                                  />
                                </svg>
                              </div>
                              <!-- content -->
                              <div>
                                <!-- modal header -->
                                <div class="mb-2">
                                  <div
                                    class="text-lg font-semibold text-gray-800"
                                  >
                                    Delete 1 user?
                                  </div>
                                </div>
                                <!-- modal content -->
                                <div class="text-sm mb-5">
                                  <div class="space-y-2">
                                    <p>
                                      Are you sure you want to delete this user
                                      ?
                                    </p>
                                  </div>
                                </div>
                                <!-- modal footer -->
                                <div
                                  class="flex flex-wrap justify-end space-x-2"
                                >
                                  <button
                                    @click="openDeleteModal = false"
                                    class="btn-sm !border-gray-200 hover:!border-gray-300 text-gray-600"
                                  >
                                    cancel
                                  </button>
                                  <button
                                    @click="deleteUser(user.id)"
                                    class="btn-sm bg-red-500 hover:bg-red-600 text-white"
                                  >
                                    <span> yes, delete it </span>

                                    <!-- <svg
                                      class="animate-spin w-4 h-4 fill-current shrink-0"
                                      viewbox="0 0 16 16"
                                    >
                                      <path
                                        d="m8 16a7.928 7.928 0 01-3.428-.77l.857-1.807a6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859a7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                                      />
                                    </svg> -->
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

            <div class="user-form-wrapper">
              <!-- form -->
              <div>
                <div class="mb-5">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="success"
                      >Phone Number <span class="text-red-500">*</span></label
                    >
                    <input
                      class="form-input w-full md:w-96"
                      maxlength="15"
                      type="text"
                      v-model="user.phone_number"
                    />
                  </div>

                  <div class="text-xs mt-1 text-red-500"></div>
                </div>
                <div class="mb-5">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="success"
                      >Email Address</label
                    >
                    <input
                      class="form-input w-full md:w-96"
                      v-model="user.email"
                      type="text"
                    />
                  </div>

                  <div class="text-xs mt-1 text-red-500"></div>
                </div>
                <div class="mb-10">
                  <div>
                    <button
                      class="btn !border-indigo-300 hover:!border-indigo-600 text-indigo-500"
                    >
                      Change password
                    </button>
                    <div class="hidden">
                      <!-- Modal backdrop -->
                      <div
                        class="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
                      ></div>
                      <!-- Modal dialog -->
                      <div
                        id="newsletter-modal"
                        class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div
                          class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full"
                        >
                          <div class="p-6">
                            <div class="relative">
                              <!-- Close button -->
                              <button
                                class="absolute top-0 right-0 text-gray-400 hover:text-gray-500"
                              >
                                <div class="sr-only">Close</div>
                                <svg class="w-4 h-4 fill-current">
                                  <path
                                    d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"
                                  />
                                </svg>
                              </button>
                              <!-- Modal header -->
                              <div class="mb-2 text-center">
                                <!-- Icon -->
                                <div class="mb-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="inline-flex rounded-full shrink-0 icon icon-tabler icon-tabler-lock"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="#2c3e50"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <rect
                                      x="5"
                                      y="11"
                                      width="14"
                                      height="10"
                                      rx="2"
                                    />
                                    <circle cx="12" cy="16" r="1" />
                                    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                                  </svg>
                                </div>
                                <div
                                  class="text-lg font-semibold text-gray-800"
                                >
                                  New password
                                </div>
                              </div>
                              <!-- Submit form -->
                              <div class="max-w-sm m-auto">
                                <form class="flex">
                                  <div class="grow mr-2">
                                    <input
                                      id="subscribe-form"
                                      class="form-input w-full px-2 py-1"
                                      type="text"
                                    />
                                  </div>
                                  <button
                                    class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                                  >
                                    <span> Save </span>

                                    <svg
                                      class="animate-spin w-4 h-4 fill-current shrink-0"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                                      />
                                    </svg>
                                  </button>
                                </form>

                                <div
                                  x-text="err.msg"
                                  class="text-xs text-red-500 italic mt-3"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="w-full h-12 rounded-lg bg-indigo-500 mb-5 flex items-center"
                >
                  <div class="text-white ml-2 text-xl font-bold">
                    Personal Info
                  </div>
                </div>

                <div class="mb-10">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="success"
                      >Full Name</label
                    >
                    <input
                      class="form-input w-full md:w-96"
                      maxlength="200"
                      v-model="user.full_name"
                      type="text"
                    />
                  </div>

                  <div class="text-xs mt-1 text-red-500"></div>
                </div>

                <div
                  class="w-full h-12 rounded-lg bg-indigo-500 mb-5 flex items-center"
                >
                  <div class="text-white ml-2 text-xl font-bold">
                    Permissions
                  </div>
                </div>

                <div class="mb-5">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="user.is_active"
                      class="form-checkbox"
                    />
                    <span class="text-sm ml-2 font-bold">Active</span>
                  </label>
                  <div class="text-sm ml-6">
                    Designates whether this user should be treated as active.
                    Unselect this instead of deleting accounts.
                  </div>
                </div>

                <div class="mb-5">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox" />
                    <span class="text-sm ml-2 font-bold"
                      >Representative status</span
                    >
                  </label>
                  <div class="text-sm ml-6">
                    Designates whether the user can log into this admin site.
                  </div>
                </div>

                <div class="mb-5">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox" />
                    <span class="text-sm ml-2 font-bold">Superuser status</span>
                  </label>
                  <div class="text-sm ml-6">
                    Designates that this user has all permissions without
                    explicitly assigning them.
                  </div>
                </div>

                <div class="mb-10">
                  <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox" />
                    <span class="text-sm ml-2 font-bold">Verified</span>
                  </label>
                  <div class="text-sm ml-6">
                    Shows if the user's phone number is verified.
                  </div>
                </div>

                <div
                  class="w-full h-12 rounded-lg bg-indigo-500 mb-5 flex items-center"
                >
                  <div class="text-white ml-2 text-xl font-bold">
                    Important dates
                  </div>
                </div>

                <div class="mb-5">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="success"
                      >Last login</label
                    >
                    <input
                      class="form-input w-60"
                      :value="formatDate(user.last_login)"
                      @change="(event) => (user.last_login = event.value)"
                      type="datetime-local"
                    />
                  </div>

                  <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
                </div>
                <div class="mb-5">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="success"
                      >Date joined <span class="text-red-500">*</span></label
                    >
                    <input
                      class="form-input w-60"
                      :value="formatDate(user.date_joined)"
                      @change="(event) => (user.date_joined = event.value)"
                      type="datetime-local"
                    />
                  </div>

                  <div class="text-xs mt-1 text-red-500"></div>
                </div>

                <button
                  @click="updateUser(user.id)"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white float-right mb-10 px-10"
                >
                  <span> Update </span>

                  <svg
                    class="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const user = ref({});
const openDeleteModal = ref(false);

onMounted(() => {
  getUser();
});

async function getUser() {
  user.value = await useBaseFetch(`/admin-api/meds/myuser/${id}`);
  console.log(user.value);
}

async function updateUser(id) {
  console.log(id);
  const res = await useBaseFetch(`/admin-api/meds/myuser/${id}/`, {
    method: "put",
  });
  console.log(res);
}

function formatDate(date) {
  if (date) {
    date = date.substring(0, 16);
  }
  return date;
}
async function deleteUser(id) {
  const res = await useBaseFetch(`/admin-api/meds/myuser/${id}`);
  console.log(res);
  navigateTo("/users");
  openDeleteModal = false;
}
</script>

<style scoped></style>
