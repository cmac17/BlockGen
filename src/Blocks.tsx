// @ts-nocheck
interface Block {
    image: string,
    blockName: string,
    blockId: string
}

const blocks: Block[] = [
    {image: "stone.png",                blockName: "Stone",             blockId: "minecraft:stone"},
    {image: "granite.png",              blockName: "Granite",           blockId: "minecraft:stone"},
    {image: "polished_granite.png",     blockName: "Polished Granite",  blockId: "minecraft:stone"},
    {image: "diorite.png",              blockName: "Diorite",           blockId: "minecraft:stone"},
    {image: "polished_diorite.png",     blockName: "Polished Diorite",  blockId: "minecraft:stone"},
    {image: "andesite.png",             blockName: "Andesite",          blockId: "minecraft:stone"},
    {image: "polished_andesite.png",    blockName: "Polished Andesite", blockId: "minecraft:stone"},
    {image: "grass_block_side.png",     blockName: "Grass",             blockId: "minecraft:grass"},
    {image: "dirt.png",                 blockName: "Dirt",              blockId: "minecraft:dirt"},
    {image: "coarse_dirt.png",          blockName: "Coarse Dirt",       blockId: "minecraft:dirt"},
    {image: "podzol_side.png",          blockName: "Podzol",            blockId: "minecraft:dirt"},
    {image: "cobblestone.png",          blockName: "Cobblestone",       blockId: "minecraft:cobblestone"}
]

export {blocks};
export type { Block };
