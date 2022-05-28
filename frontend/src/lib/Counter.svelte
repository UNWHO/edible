<script lang="ts">
import { BrowserBarcodeReader, BrowserCodeReader } from "@zxing/library";
import { onMount } from "svelte";
import { fetchBarcodeInfo, fetchIngredientsInfo } from "./barcodeAPI";
  
  const codeReader = new BrowserBarcodeReader();
  let videoInputDevices;
  let selectedDeviceId;

  const previewElem = document.querySelector("video");
  
  onMount(async() => {
    videoInputDevices = await codeReader.listVideoInputDevices();
    selectedDeviceId = videoInputDevices?.[0] || null;
    await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error) => {
      inputBarcode = result.getText();
    });
    setTimeout(() => codeReader.stopContinuousDecode())
  })

  let inputBarcode = "8801117752804";
  let rawMaterials = [];
  const fetchRawMaterials = async () => {
    const result = await fetch(`http://localhost:3030/raw-materials?barcode=${inputBarcode}`);
    const json = await result.json();
    
    rawMaterials = json;
  }

  

  
</script>

<video src="">
 <track kind="captions">
</video>
<button></button>

<input type="text" name="" id="" bind:value={inputBarcode}>
<button on:click={fetchRawMaterials}>Fetch</button>

<table>
  <tr>
    <th>식품 원재료명</th><th>비건 여부</th>
  </tr>
  {#each rawMaterials as material}
    <tr>
      <td>{material}</td><td>알 수 없음</td><td><button on:click={update}>채식</button><button>채식아님</button></td>
    </tr>
  {/each}
</table>

<style>
  
</style>
