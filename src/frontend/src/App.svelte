<script lang="ts">
  type RawMaterial = {
    name: string,
    edible: true | false | undefined
  }

  type Product = {
    barcode: string,
    name: string,
    rawMaterials: Array<RawMaterial>
  }

  type Status = "Initialized" | "Pending" | "Fetched";

  let barcode = "8801043036078";
  let product: Product = {
    barcode: "",
    name: "",
    rawMaterials: []
  };

  let rawMaterials: Array<RawMaterial> = [];

  let status: Status = "Initialized";

  const API_URL = "http://54.67.97.150"


  const fetchProduct = async () => {
    status = "Pending";
    try {
      const result = await fetch(`${API_URL}/raw-materials?barcode=${barcode}`);
      const json = await result.json();

      console.log(json)
      product = json

      rawMaterials = [];
      product.rawMaterials.forEach(rawMaterial => rawMaterials = [...rawMaterials, {name: rawMaterial.name, edible: rawMaterial.edible}]);
    } catch(e) {
      alert("바코드 번호를 확인해주십시오");
    }
    status = "Fetched";
  }

  const saveToServer = async () => {
    const changedRawMaterials = rawMaterials.filter((rawMaterial, i) => rawMaterial.edible !== product.rawMaterials[i].edible);
    const result = await fetch(`${API_URL}/update`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(changedRawMaterials)
    })

    if(result.ok){
      alert("Success to save");
      fetchProduct();
    }
    else
      alert("Failed to save");
  }



</script>
 
<main>
  <h1>Edible</h1>
  {#if status === "Pending"}
    <div>Loading...</div>
  {:else}
    <div>
      <input type="text" name="" id="" bind:value={barcode}>
      <button on:click={fetchProduct}>Check</button>
    </div>
    {#if status === "Fetched"}
    
    <h2>{product.name}</h2>
    <button on:click={saveToServer}>Save</button>
    <table>
      <tr>
        <th>Raw Element</th>
        <th>Edible</th>
      </tr>
      {#each rawMaterials as rawMaterial}
        <tr>
          <td>{rawMaterial.name}</td>
          <td>
            <select name="" id="" bind:value={rawMaterial.edible} class={rawMaterial.edible + ""}>
              <option value={true} class="true">Edible</option>
              <option value={false} class="false">Inedible</option>
              <option value={undefined} class="unknown" disabled hidden>Unknown</option>
            </select>
          </td>
        </tr>
      {/each}
    </table>
    {/if}
  {/if}
  
</main>

<style>
  select {
    border: none;
    -webkit-appearance:none;
    width: 6em;
    text-align: center;
  }

  .true {
    color: green;
    font-weight: bold;
  }

  .false {
    color: red;
    font-weight: bold;
  }

  .unknown {
    color: black;
  }
</style>
