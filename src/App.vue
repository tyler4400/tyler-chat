<template>
  <div class="flex justify-between items-center h-screen">
    <div class="bg-gray-300 text-gray-700 w-[10rem] h-full hover:bg-yellow-300">sidebar</div>
    <div class="bg-green-300 text-blue-700 h-full flex-1">
      content
      <input type="text" placeholder="serach for anything" class="placeholder: text-blue-300 required:text-red-500" />
      <button class="md:hover:bg-fuchsia-600">
        Save changes
      </button>
      <div href="" class="visited:bg-gray-700">123</div>
      <a href="#" class="group/tyler block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
        <div class="flex items-center space-x-3">
          <a class="h-6 w-6 stroke-sky-500 group-hover/tyler:text-white" fill="none" viewBox="0 0 24 24">@</a>
          <h3 class="text-slate-900 group-hover/tyler:text-white text-sm font-semibold">New project</h3>
        </div>
        <p class="text-slate-500 group-hover/tyler:text-white group-focus/tyler:text-green-400 text-sm">Create a new project from a variety of starting templates.</p>
      </a>
      <form>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700">Email</span>
          <input type="email" class="peer"/>
          <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please provide a valid email address.
          </p>
        </label>
      </form>
      <label class="block">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Email
        </span>
        <input type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
      </label>
      <form class="flex items-center space-x-6">
        <div class="shrink-0">
          <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
        </div>
        <label class="block">
          <span class="sr-only">Choose profile photo</span>
          <input type="file" class="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "/>
        </label>
      </form>
      <!-- Will apply -->
      <div data-size="large" class="data-[size=large]:p-8">
        `1212313`
      </div>

      <!-- Will not apply -->
      <div data-size="medium" class="data-[size=large]:p-8">
        dsrggg
      </div>
    </div>
  </div>
</template>

<script setup>
console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
