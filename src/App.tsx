import React, {useState} from 'react';
import './App.css';
import {Block, blocks} from "./Blocks";

function importAll(r: any) {
  let imageList = {};
  // @ts-ignore
  r.keys().map((item) => { imageList[item.replace('./', '')] = r(item); });
  return imageList;
}
const test = require.context('./resources/Mizunos 16 Craft JE_1.16.4-1.0/assets/minecraft/textures/block', true, /\.png$/)
const images = importAll(test);

function App() {
  const [generatedBlocks, setGeneratedBlocks] = useState<Block[]>([
      blocks[0],
      blocks[1],
      blocks[2]
  ])

  function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault()
    setGeneratedBlocks(determineBlocks())
  }

  function determineBlocks(): Block[] {
    const blockList: Block[] = [];
    const values: Block[] = []

    // @ts-ignore
    blocks.map(val => blockList.push(Object.assign({}, val)))

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
        <button className="Generate-button" onClick={handleClick}>Generate new blocks</button>
      </header>
    </div>
  );
}

export default App;
