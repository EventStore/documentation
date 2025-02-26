<script setup>
function triggerKapa() {
  console.log("Button clicked!"); // Debug to verify the click
  window.Kapa.open();
}
</script>

<template>
  <span>or </span>
  <div
    id="custom-kapa-widget-container" 
    style="display:flex; align-items:center; position: relative; z-index: 1000;">
    <button
      class="custom-class-kapa"
      type="button"
      data-button="true"
      style="background-color: var(--theme-color); box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px; border-radius: 10px; border: none; color: white; height: 32px; font-size: var(--secondary-font-size); position: relative; z-index: 1001; pointer-events: auto; cursor: pointer;"
      @click="triggerKapa"
    >
      <div>
        <span style="display:flex; align-items:center; justify-content:center; padding: 3px;">
          <div style="display:flex; flex-direction:row; align-items:center;">
            <div style="width: 1.5rem;">
              <figure style="margin:0;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Simple sparkle icon based on Material UI's auto_awesome -->
                  <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9z" fill="white"/>
                  <path d="M19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" fill="white"/>
                  <path d="M11.5 9.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z" fill="white"/>
                </svg>
              </figure>
            </div>
          </div>
          <div style="text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 2px; line-height:1.5rem;">Ask AI</div>
        </span>
      </div>
    </button>
  </div>
</template>