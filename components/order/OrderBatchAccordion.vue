<template>
    <div>
        <div>
            <h2 class="text-2xl text-gray-800 font-bold mb-6">Rich Table Row with Accordion</h2>
            <!-- Start -->
            <div class="rounded-sm border border-gray-200">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full divide-y divide-gray-200">
                        <!-- Table body -->
                        <tbody class="text-sm" >
                            <!-- Row -->
                            <tr>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="flex items-center text-gray-800">
                                        <div
                                            class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
                                            <img class="rounded-full ml-1" src="images/user-40-07.jpg" width="40"
                                                height="40" alt="User 01" />
                                        </div>
                                        <div class="font-medium text-gray-800">Mark Cameron</div>
                                    </div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="text-left">mark.cameron@app.com</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="text-left">🇬🇧 London, UK</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="text-left">22/01/2021</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div class="text-left text-green-500 font-medium">+249.88</div>
                                </td>
                                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                    <div class="flex items-center">
                                        <button class="text-gray-400 hover:text-gray-500 transform"
                                            :class="{ 'rotate-180': openAccordion }" @click.prevent="openAccordion = !openAccordion"
                                            :aria-expanded="openAccordion" aria-controls="description-01">
                                            <span class="sr-only">Menu</span>
                                            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <!--
                                                Example of content revealing when clicking the button on the right side:
                                                Note that you must set a "colspan" attribute on the <td> element,
                                                and it should match the number of columns in your table
                                                -->
                            <tr id="description-01" role="region" v-show="openAccordion">
                                <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
                                    <div class="bg-gray-50 p-3 -mt-3">
                                        <div class="text-sm mb-3">
                                            <div class="font-medium text-gray-800 mb-1">Excepteur sint occaecat
                                                cupidatat.</div>
                                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam quis. Ut enim ad minim veniam quis. Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                                et dolore magna aliqua.</div>
                                        </div>
                                        <button
                                            class="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white">Approve</button>
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

const openAccordion = ref(false)

</script>