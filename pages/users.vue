<template>
  <div class="font-inter antialiased bg-gray-100 text-gray-600">
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <!-- Page header -->
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
          <!-- Left: Title -->
          <div class="mb-4 sm:mb-0">
            <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Users</h1>
          </div>

          <div
            class="grid grid-flow-col sm:auto-cols-auto justify-start sm:justify-end gap-2"
          >
            <select
              id="pharmacy"
              class="form-select outline-none max-w-[200px]"
            >
              <option value="">Select Pharmacy</option>

              <option>badu</option>
            </select>

            <!-- Delete button -->
            <div class="table-items-action hidden">
              <div class="flex items-center">
                <div
                  class="hidden xl:block text-sm italic mr-2 whitespace-nowrap"
                >
                  <span class="table-items-count"></span>
                  users selected
                </div>
                <div>
                  <button
                    class="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                  <div class="hidden">
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
                              <div class="text-lg font-semibold text-gray-800">
                                Delete selected users?
                              </div>
                            </div>
                            <!-- modal content -->
                            <div class="text-sm mb-5">
                              <div class="space-y-2">
                                <p>
                                  Are you sure you want to delete selected users
                                  ?
                                </p>
                              </div>
                            </div>
                            <!-- modal footer -->
                            <div class="flex flex-wrap justify-end space-x-2">
                              <button
                                class="btn-sm border-gray-200 hover:border-gray-300 text-gray-600"
                              >
                                cancel
                              </button>
                              <button
                                class="btn-sm bg-red-500 hover:bg-red-600 text-white"
                              >
                                <p>
                                  <span> yes, delete it </span>
                                </p>
                                <p>
                                  <svg
                                    class="animate-spin w-4 h-4 fill-current shrink-0"
                                    viewbox="0 0 16 16"
                                  >
                                    <path
                                      d="m8 16a7.928 7.928 0 01-3.428-.77l.857-1.807a6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859a7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                                    />
                                  </svg>
                                </p>
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

            <!-- filter button  -->
            <div class="relative inline-flex">
              <button
                class="btn bg-white !border-gray-200 hover:!border-gray-300 text-gray-500 hover:text-gray-600"
                aria-haspopup="true"
              >
                <span class="sr-only">Filter</span><wbr />
                <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <path
                    d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"
                  />
                </svg>
              </button>
              <div
                class="hidden origin-top-left z-10 absolute top-full right-0 min-w-[14rem] bg-white border border-gray-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
              >
                <p
                  class="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4"
                >
                  Filters
                </p>
                <ul class="mb-4">
                  <li class="py-1 px-3">
                    <label class="flex items-center">
                      <input type="checkbox" class="form-checkbox" />
                      <span class="text-sm font-medium ml-2">Is Active</span>
                    </label>
                  </li>
                  <li class="py-1 px-3">
                    <label class="flex items-center">
                      <input type="checkbox" class="form-checkbox" />
                      <span class="text-sm font-medium ml-2">Is Admin</span>
                    </label>
                  </li>
                  <li class="py-1 px-3">
                    <label class="flex items-center">
                      <input type="checkbox" class="form-checkbox" />
                      <span class="text-sm font-medium ml-2">Is Staff</span>
                    </label>
                  </li>
                  <li class="py-1 px-3">
                    <label class="flex items-center">
                      <input type="checkbox" class="form-checkbox" />
                      <span class="text-sm font-medium ml-2">Is Verified</span>
                    </label>
                  </li>
                </ul>
                <div class="py-2 px-3 border-t border-gray-200 bg-gray-50">
                  <ul class="flex items-center justify-between">
                    <li>
                      <button
                        class="btn-xs bg-white !border-gray-200 hover:!border-gray-300 text-gray-500 hover:!text-gray-600"
                      >
                        Clear
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                      >
                        Apply filter
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Add user button -->
            <NuxtLink
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              to="/update-user"
            >
              <svg
                class="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                />
              </svg>
              <span class="hidden min-[480px]:block ml-2">Add User</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white shadow-lg rounded-sm border border-gray-200 mb-8">
          <div class="px-5 py-4">
            <h2 class="font-semibold flex items-center gap-1 text-gray-800">
              All Users
              <span v-if="users.count" class="ml-2 text-gray-400 font-medium">{{
                users.count
              }}</span>

              <svg
                v-else
                class="animate-spin w-4 h-4 fill-current shrink-0 ml-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                />
              </svg>
            </h2>
          </div>

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
                    <label class="inline-flex">
                      <span class="sr-only">Select all</span>
                      <input
                        id="parent-checkbox"
                        class="form-checkbox"
                        type="checkbox"
                      />
                    </label>
                  </th>
                  <!-- <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            <div class="font-semibold text-left">I.D.</div>
                        </th> -->
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Name</div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Email</div>
                  </th>

                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Phone</div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Pharmacy</div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Date Joined</div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold">Is Verified</div>
                  </th>
                </tr>
              </thead>
              <!-- Table body -->
              <tbody class="text-sm">
                <!-- Row -->
                <tr v-for="user in users.results" class="">
                  <td
                    class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"
                  >
                    <div class="flex items-center">
                      <label class="inline-flex">
                        <span class="sr-only">Select</span>
                        <input
                          class="table-item form-checkbox"
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </td>
                  <!-- <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div x-on:click="window.location.href = 'user-update.html?uid='+eachUser.id" class="flex items-center text-gray-800 cursor-pointer">
                                    <div
                                        class="relative"
                                        x-data="{ open: false }"
                                        @mouseenter="open = true"
                                        @mouseleave="open = false"
                                    >
                                        <button
                                            class="block"
                                            aria-haspopup="true"
                                            :aria-expanded="open"
                                            @focus="open = true"
                                            @focusout="open = false"
                                            @click.prevent            
                                        >
                                        <div class="font-medium text-light-blue-500" x-text="truncatedId(eachUser.id, 8)"></div>
                                        </button>
                                        <div class="z-10 absolute l-full top-1/2 transform -translate-y-1/2">
                                            <div
                                                class="bg-white border border-gray-200 p-2 rounded shadow-lg overflow-hidden mb-2"
                                                x-show="open"
                                                x-transition:enter="transition ease-out duration-200 transform"
                                                x-transition:enter-start="opacity-0 translate-y-2"
                                                x-transition:enter-end="opacity-100 translate-y-0"
                                                x-transition:leave="transition ease-out duration-200"
                                                x-transition:leave-start="opacity-100"
                                                x-transition:leave-end="opacity-0"
                                                x-cloak
                                            >
                                                <div x-text="eachUser.id" class="text-xs whitespace-nowrap"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td> -->
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <NuxtLink
                      :to="`/update-user/${user.id}`"
                      class="font-medium text-light-blue-500 cursor-pointer"
                    >
                      {{ user.full_name ? user.full_name : "-------" }}
                    </NuxtLink>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div>{{ user.email }}</div>
                  </td>

                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-gray-600">
                      {{ user.phone_number }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <p>
                      <a href="`/pharmacy-edit.html?id=pharmacy?.name`">
                        <!-- <div class="font-medium text-gray-600 underline"></div
                      > -->
                      </a>
                    </p>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-gray-600">
                      {{ getFormattedDate(user.date_joined) }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="flex justify-center">
                      <p v-if="user.is_verified === true" class="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-user-check text-green-600"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          <path d="M16 11l2 2l4 -4" />
                        </svg>
                      </p>
                      <p v-else>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-user-minus text-red-600"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          <line x1="16" y1="11" x2="22" y2="11" />
                        </svg>
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- <%= require('html-loader!./partials/pagination-classic.html') %> -->

        <div
          v-show="!users.values"
          class="px-6 py-8 bg-gray-50 border border-gray-200 rounded-sm"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <nav
              class="mb-4 sm:mb-0 sm:order-1"
              role="navigation"
              aria-label="Navigation"
            >
              <ul class="flex justify-center">
                <li
                  v-if="users.previous !== null"
                  @click="getOffset(users.previous)"
                  class="ml-3 first:ml-0"
                >
                  <a
                    class="btn bg-white !border-gray-200 text-indigo-500 cursor-pointer"
                    >&lt;- Previous</a
                  >
                </li>

                <li
                  v-if="users.next !== null"
                  @click="getOffset(users.next)"
                  class="ml-3 first:ml-0"
                >
                  <a
                    class="btn bg-white !border-gray-200 hover:border-gray-300 text-indigo-500 cursor-pointer"
                    >Next -&gt;</a
                  >
                </li>
              </ul>
            </nav>
            <div class="text-sm text-gray-500 text-center sm:text-left">
              Showing
              <span class="font-medium text-gray-600"
                >{{ showingUpTo || 0 }}
              </span>
              to
              <span class="font-medium text-gray-600">
                {{ parseInt(showingUpTo) + 10 || 10 }}
              </span>
              of
              <span class="font-medium text-gray-600">
                {{ users.count }}
              </span>
              results
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const users = ref([]);
const showingUpTo = ref(0);

onMounted(() => {
  getUsersList(0);
});

async function getUsersList(offset) {
  showingUpTo.value = offset;
  users.value = await useBaseFetch(`/account/users/?limit=10&offset=${offset}`);
}
function getFormattedDate(strDate) {
  const date = new Date(strDate);
  return date.toDateString();
}
function getOffset(url) {
  const offset = url.split("=")[2];
  getUsersList(offset);
}
</script>

<style scoped></style>
