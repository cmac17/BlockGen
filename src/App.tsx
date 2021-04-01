import React, {useEffect, useState} from 'react';
import './App.css';

interface Block {
  image: string,
  blockName: string,
  blockId: string
}

function importAll(r: any) {
  let imageList = {};
  // @ts-ignore
  r.keys().map((item) => { imageList[item.replace('./', '')] = r(item); });
  return imageList;
}

const imageContext = require.context("../public/Mizunos/assets/minecraft/textures/block", true, /\.png$/)
const images = importAll(imageContext);

function App() {
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
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          setBlockConfig(myJson.blocks)
          setFlowerConfig(myJson.blocks)
        });
  }
  useEffect(()=>{
    getData()
  },[])

  const [blockConfig, setBlockConfig] = useState([
    {image: "stone.png",            blockName: "Stone",             blockId: "minecraft:stone"},
    {image: "granite.png",          blockName: "Granite",           blockId: "minecraft:stone"},
    {image: "polished_granite.png", blockName: "Polished Granite",  blockId: "minecraft:stone"},
  ])
  const [flowerConfig, setFlowerConfig] = useState([
    {image: "stone.png",            blockName: "Stone",             blockId: "minecraft:stone"}
  ])
  const [generatedBlocks, setGeneratedBlocks] = useState<Block[]>([blockConfig[0], blockConfig[1], blockConfig[2]])
  const [generatedFlowers, setGeneratedFlowers] = useState<Block[]>([flowerConfig[0]])

  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
    setGeneratedBlocks(determineBlocks())
  }

  function determineBlocks(): Block[] {
    const blockList: Block[] = [];
    const values: Block[] = []

    blockConfig.map(val => blockList.push(Object.assign({}, val)))

    for (let i = 0; i < 3; i++) {
      // @ts-ignore
      const selectedBlock = Math.floor(Math.random() * blockList.length)
      // @ts-ignore
      values.push(blockList[selectedBlock])
      // @ts-ignore
      blockList.splice(selectedBlock, 1)
    }

    return values
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Palette Generator v1.0</h1>
          <div className={"Image-set-container"}>
            <div className={"Image-container"}>
              <img
                  src={
                    // @ts-ignore
                    images[generatedBlocks[0].image].default
                  }
                  className="App-logo"
                  alt="logo"
              />
              <p>{generatedBlocks[0].blockName}</p>
              <p>{generatedBlocks[0].blockId}</p>
            </div>
            <div className={"Image-container"}>
              <img
                  src={
                    // @ts-ignore
                    images[generatedBlocks[1].image].default
                  }
                  className="App-logo"
                  alt="logo"
              />
              <p>{generatedBlocks[1].blockName}</p>
              <p>{generatedBlocks[1].blockId}</p>
            </div>
            <div className={"Image-container"}>
              <img
                  src={
                    // @ts-ignore
                    images[generatedBlocks[2].image].default
                  }
                  className="App-logo"
                  alt="logo"
              />
              <p>{generatedBlocks[2].blockName}</p>
              <p>{generatedBlocks[2].blockId}</p>
            </div>
          </div>
        <button className="Generate-button" onClick={handleClick}>Generate new block palette</button>
      </header>
    </div>
  );
}

export default App;
