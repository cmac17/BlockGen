import React, {useEffect, useState} from 'react';
import './App.css';
import SocialFollow from "./SocialFollow";

interface Block {
  image: string,
  blockName: string,
  blockId: string
}

interface Flower {
  image: string,
  blockName: string,
  blockId: string
}

/**
 * Component for loading the Palette Generator
 */
function App() {
  /**
   * Loads the config JSON file for block and flower data
   */
  const getData = () => {
    fetch('config.json'
        ,{
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
    )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setBlockConfig(myJson.blocks)
          setFlowerConfig(myJson.flowers)
          setTexturePack(myJson.texture_pack)
          setLoadedData(true)
        });
  }

  // Effect used to trigger loading block data
  useEffect(()=>{
    getData()
  },[])

  // State to hold the block and flower data from the config JSON
  const [blockConfig, setBlockConfig] = useState([
    {image: "stone.png",            blockName: "Stone",             blockId: "minecraft:stone"},
    {image: "granite.png",          blockName: "Granite",           blockId: "minecraft:stone"},
    {image: "polished_granite.png", blockName: "Polished Granite",  blockId: "minecraft:stone"},
  ])
  const [flowerConfig, setFlowerConfig] = useState([
    {image: "poppy.png",            blockName: "Poppy",             blockId: "minecraft:red_flower"}
  ])

  // State to hold the name of the texture pack folder form the config JSON
  const [texturePack, setTexturePack] = useState<string>("")

  // State to hold the currently displayed blocks and flower
  const [generatedBlocks, setGeneratedBlocks] = useState<Block[]>([blockConfig[0], blockConfig[1], blockConfig[2]])
  const [generatedFlower, setGeneratedFlower] = useState<Block[]>([flowerConfig[0]])

  const [loadedData, setLoadedData] = useState<boolean>(false)

  /**
   * Click handler for the generate button
   */
  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
    setGeneratedBlocks(determineBlocks())
    setGeneratedFlower(determineFlower())
  }

  /**
   * Randomly determines the blocks to display
   */
  function determineBlocks(): Block[] {
    // Copy the block config to a local object
    const blockList: Block[] = [];
    blockConfig.map(val => blockList.push(Object.assign({}, val)))

    const values: Block[] = []

    // Determine the three blocks to display
    for (let i = 0; i < 3; i++) {
      const selectedBlock = Math.floor(Math.random() * blockList.length)
      values.push(blockList[selectedBlock])
      blockList.splice(selectedBlock, 1)
    }

    return values
  }

  /**
   * Randomly determines the flower to display
   */
  function determineFlower(): Flower[] {
    const values: Flower[] = []

    // Determine the flower blocks to display
    const selectedFlower = Math.floor(Math.random() * flowerConfig.length)
    values.push(flowerConfig[selectedFlower])

    return values
  }

  return (
    <div className="App">
      <header className="App-header">
        {loadedData &&
        <div>
          <h1>Palette Generator v1.0</h1>
          <div className={"Image-set-container"}>
            <div className={"Image-container"}>
              <img
                  src={`${process.env.PUBLIC_URL}/texture-pack/${texturePack}/assets/minecraft/textures/block/${generatedBlocks[0].image}`}
                  className="App-image"
                  alt={generatedBlocks[0].blockName}
              />
              <p>{generatedBlocks[0].blockName}</p>
              <p>{generatedBlocks[0].blockId}</p>
            </div>
            <div className={"Image-container"}>
              <img
                  src={`${process.env.PUBLIC_URL}/texture-pack/${texturePack}/assets/minecraft/textures/block/${generatedBlocks[1].image}`}
                  className="App-image"
                  alt={generatedBlocks[1].blockName}
              />
              <p>{generatedBlocks[1].blockName}</p>
              <p>{generatedBlocks[1].blockId}</p>
            </div>
            <div className={"Image-container"}>
              <img
                  src={`${process.env.PUBLIC_URL}/texture-pack/${texturePack}/assets/minecraft/textures/block/${generatedBlocks[2].image}`}
                  className="App-image"
                  alt={generatedBlocks[2].blockName}
              />
              <p>{generatedBlocks[2].blockName}</p>
              <p>{generatedBlocks[2].blockId}</p>
            </div>
            <div className={"Image-container"}>
              <img
                  src={`${process.env.PUBLIC_URL}/texture-pack/${texturePack}/assets/minecraft/textures/block/${generatedFlower[0].image}`}
                  className="App-image"
                  alt={generatedFlower[0].blockName}
              />
              <p>{generatedFlower[0].blockName}</p>
              <p>{generatedFlower[0].blockId}</p>
            </div>
          </div>
          <button className="Generate-button" onClick={handleClick}>Generate new palette</button>
          <SocialFollow/>
        </div>
        }
      </header>
    </div>
  );
}

export default App;
