<template>
  <div class="font-inter w-full antialiased bg-gray-100 text-gray-600">
    <main>
      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <!-- Page header -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
          <!-- Left: Title -->
          <div class="mb-4 sm:mb-0">
            <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
              Add user 👤
            </h1>
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
                  class="form-input outline-none w-full md:w-96"
                  maxlength="15"
                  v-model="user.phone_number"
                  type="text"
                />
              </div>

              <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
            </div>
            <div class="mb-5">
              <div>
                <label class="block text-sm font-medium mb-1" for="success"
                  >Email Address</label
                >
                <input
                  class="form-input outline-none w-full md:w-96"
                  type="text"
                  v-model="user.email"
                />
              </div>

              <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
            </div>
            <div class="mb-10">
              <div>
                <label class="block text-sm font-medium mb-1" for="success"
                  >Password <span class="text-red-500">*</span></label
                >
                <input
                  class="form-input outline-none w-full md:w-96"
                  type="text"
                  v-model="user.password"
                />
              </div>

              <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
            </div>

            <div
              class="w-full h-12 rounded-lg bg-indigo-500 mb-5 flex items-center"
            >
              <div class="text-white ml-2 text-xl font-bold">Personal Info</div>
            </div>

            <div class="mb-10">
              <div>
                <label class="block text-sm font-medium mb-1" for="success"
                  >Full Name</label
                >
                <input
                  class="form-input w-full outline-none md:w-96"
                  maxlength="200"
                  v-model="user.full_name"
                  type="text"
                />
              </div>

              <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
            </div>

            <div
              class="w-full h-12 rounded-lg bg-indigo-500 mb-5 flex items-center"
            >
              <div class="text-white ml-2 text-xl font-bold">Permissions</div>
            </div>

            <div class="mb-5">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="user.is_active"
                  class="form-checkbox outline-none"
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
                <input
                  type="checkbox"
                  v-model="user.is_staff"
                  class="form-checkbox"
                />
                <span class="text-sm ml-2 font-bold"
                  >Representative status</span
                >
              </label>
              <div class="text-sm ml-6">
                Designates whether the user can log into this admin site.
              </div>
            </div>

            <div class="mb-10">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="user.is_superuser"
                  class="form-checkbox"
                />
                <span class="text-sm ml-2 font-bold">Superuser status</span>
              </label>
              <div class="text-sm ml-6">
                Designates that this user has all permissions without explicitly
                assigning them.
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
                  v-model="user.last_login"
                  class="form-input outline-none w-60"
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
                  v-model="user.date_joined"
                  class="form-input outline-none w-60"
                  type="datetime-local"
                />
              </div>

              <div class="text-xs mt-1 text-red-500" x-text="err.msg"></div>
            </div>

            <button
              @click="handleSubmit"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white float-right mb-10 px-10"
            >
              <span> Save </span>

            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const user = ref({});

async function handleSubmit() {
  console.log(user.value);
}
</script>

<style scoped></style>
