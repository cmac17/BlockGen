import React from "react";
import Block from "./Block";

interface generatedBlockContainerProps {
    texturePack: string
    generatedBlock: Block
}

export default function GeneratedBlockContainer({texturePack, generatedBlock}: generatedBlockContainerProps){
    return(
        <div className="Image-container">
            <img
                src={`${process.env.PUBLIC_URL}/texture-pack/${texturePack}/assets/minecraft/textures/block/${generatedBlock.image}`}
                className="App-image"
                alt={generatedBlock.blockName}
            />
            <p className="block-name">{generatedBlock.blockName}</p>
            <p className="block-id" data-tip='copy' onClick={() => {window.clientInformation.clipboard.writeText(generatedBlock.blockId).then()}}>
                {generatedBlock.blockId}
            </p>
        </div>
    )
}