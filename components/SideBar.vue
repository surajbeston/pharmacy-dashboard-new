<template>
    <div>
        <div>
            <!-- Sidebar backdrop (mobile only) -->
            <!-- <div class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
                 aria-hidden="true" >
            </div> -->

            <!-- Sidebar -->
            <div id="sidebar"
                class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out -translate-x-64"
                >

                <!-- Sidebar header -->
                <div class="flex justify-between mb-10 pr-3 sm:px-2">
                    <!-- Close button -->
                    <button @click="sidebarOpen = false" class="lg:hidden text-gray-500 hover:text-gray-400"
                        aria-controls="sidebar" >
                        <span class="sr-only">Close sidebar</span>
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    <!-- Logo -->
                    <a class="block" href="index.html">
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <defs>
                                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                                    <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                                    <stop stop-color="#A5B4FC" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                                    <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                                    <stop stop-color="#38BDF8" offset="100%" />
                                </linearGradient>
                            </defs>
                            <rect fill="#6366F1" width="32" height="32" rx="16" />
                            <path
                                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                fill="#4F46E5" />
                            <path
                                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                fill="url(#logo-a)" />
                            <path
                                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                fill="url(#logo-b)" />
                        </svg>
                    </a>
                </div>

                <!-- Links -->
                <div class="space-y-8">
                    <!-- Pages group -->
                    <div>
                        <h3 class="text-xs uppercase text-gray-500 font-semibold pl-3">
                            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true">•••</span>
                            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
                        </h3>
                        <ul class="mt-3">
                            <!-- Dashboard -->
                            <li v-for="page in pages" :key="page.name" class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 "
                                :class="{'bg-gray-900': currentPage == page.name}">
                                <a class="block text-gray-200 hover:text-white truncate transition duration-150"
                                    :class="'hover:text-gray-200'" :href="page.url">
                                    <div class="flex items-center">
                                        <img class="h-[24px] w-[24px]" :src="`/icons/${page.icon}`">
                                        <span
                                            class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{{ page.name }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup >

const sidebarOpen = ref(true)

const pages = ref([
    {
        'name': 'Dashboard',
        'icon': 'dashboard.png',
        'url': '/'
    },
    {
        'name': 'Medicine',
        'icon': 'medicine.png',
        'url': '/medicine'
    },
    {
        'name': 'Manufacturer',
        'icon': 'manufacturer.png',
        'url': '/manufacturer'
    },
    {
        'name': 'Orders',
        'icon': 'manufacturer.png',
        'url': '/order'
    },
    {
        'name': 'Sign In',
        'icon': 'signin.png',
        'url': '/signin'
    },
    {
        'name': 'Purchase',
        'icon': 'purchase.png',
        'url': '/purchase'
    }
])

const currentPage = useCurrentPage()

</script>