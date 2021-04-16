import React, {useEffect, useState} from 'react';
import './App.css';
import SocialFollow from "./SocialFollow";
import ReactTooltip from "react-tooltip";
import GeneratedBlockContainer from "./GeneratedBlockContainer";
import Block from "./Block";

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
  function determineFlower(): Block[] {
    const values: Block[] = []

    // Determine the flower blocks to display
    const selectedFlower = Math.floor(Math.random() * flowerConfig.length)
    values.push(flowerConfig[selectedFlower])

    return values
  }

  return (
    <div className="App">
      {loadedData &&
      <header className="App-header">
        <h1>Block Palette Generator</h1>
        <div className="Image-set-container">
          <GeneratedBlockContainer texturePack={texturePack} generatedBlock={generatedBlocks[0]}/>
          <GeneratedBlockContainer texturePack={texturePack} generatedBlock={generatedBlocks[1]}/>
          <GeneratedBlockContainer texturePack={texturePack} generatedBlock={generatedBlocks[2]}/>
          <GeneratedBlockContainer texturePack={texturePack} generatedBlock={generatedFlower[0]}/>
          <ReactTooltip effect="solid" type="light" event="mousedown" eventOff="mouseup" delayHide={1500}>
            <p>Copied!</p>
          </ReactTooltip>
        </div>
        <button className="Generate-button" onClick={handleClick}>Generate new palette</button>
      </header>
      }
      <footer className="App-footer">
        <SocialFollow/>
      </footer>
    </div>
  );
}

export default App;
