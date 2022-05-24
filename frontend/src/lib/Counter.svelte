<script lang="ts">
import { BrowserBarcodeReader, BrowserCodeReader } from "@zxing/library";
import { onMount } from "svelte";
  
  const codeReader = new BrowserBarcodeReader();
  let videoInputDevices;
  let selectedDeviceId;

  const previewElem = document.querySelector("video");

  let barcodeResult;

  
  onMount(async() => {
    videoInputDevices = await codeReader.listVideoInputDevices();
    selectedDeviceId = videoInputDevices?.[0] || null;
    await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error) => {
      barcodeResult = result;
    });
    setTimeout(() => codeReader.stopContinuousDecode())
  })

  
</script>

<video src="">
 <track kind="captions">
</video>
<div>
  {barcodeResult}
</div>

<style>
  
</style>
