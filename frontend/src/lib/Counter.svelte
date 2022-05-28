<script lang="ts">
import { BrowserBarcodeReader, BrowserCodeReader } from "@zxing/library";
import { onMount } from "svelte";
import { fetchBarcodeInfo, fetchIngredientsInfo } from "./barcodeAPI";
  type RawMaterial = {
    name: string,
    isVegetable: number
  }

  const codeReader = new BrowserBarcodeReader();
  let videoInputDevices;
  let selectedDeviceId;

  const previewElem = document.querySelector("video");
  
  onMount(async() => {
    // videoInputDevices = await codeReader.listVideoInputDevices();
    // selectedDeviceId = videoInputDevices?.[0] || null;
    // await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error) => {
    //   inputBarcode = result.getText();
    // });
  })

  let inputBarcode = "8801117752804";
  let rawMaterials: Array<RawMaterial> = [];
  let changedRawMaterials: Array<RawMaterial> = [];

  const fetchRawMaterials = async () => {
    const result = await fetch(`http://localhost:3030/raw-materials?barcode=${inputBarcode}`);
    const json = await result.json();
    
    rawMaterials = json;
  }

  const updateIsVegetable = async (materialName: string, isVegetable: number) => {
    if(rawMaterials.find(rm => rm.name === materialName).isVegetable === isVegetable) {
      const i = changedRawMaterials.findIndex(rm => rm.name === materialName);
      if(i !== -1)
        changedRawMaterials.splice(i, 1);
    } else {
      changedRawMaterials.push({
        name: materialName,
        isVegetable: isVegetable
      });
    }
    
  }

  const saveToServer = async () => {
    console.log(JSON.stringify(changedRawMaterials));
    const result = await fetch(`http://localhost:3030/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(changedRawMaterials)
    });

    if(result.ok) console.log("Success to save");
  }

  
</script>

<video src="">
 <track kind="captions">
</video>
<button></button>

<input type="text" name="" id="" bind:value={inputBarcode}>
<button on:click={fetchRawMaterials}>Fetch</button>


<button on:click={saveToServer}>저장</button>
<table>
  <tr>
    <th>식품 원재료명</th><th>비건 여부</th>
  </tr>
  {#each rawMaterials as material, index}
    <tr>
      <td>{material.name}</td>
      <td>{(material.isVegetable === 1) ? "채식" : ((material.isVegetable === 0) ? "채식 아님" : "알 수 없음")}</td>
      <td>
        <button 
          on:click={()=>updateIsVegetable(material.name, 1)}>채식</button>
      </td>
      <td><button on:click={()=>updateIsVegetable(material.name, 0)}>채식아님</button></td>
    </tr>
  {/each}
</table>

<style>
  
</style>
