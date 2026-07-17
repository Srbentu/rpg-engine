import { createCharacter } from "./character/createCharacter.js";

const character = createCharacter({
  id: 1,
  name: "Breno",
  class: "mage",
  level: 1,
  hp: 100,
  maxHp: 100,
  mana: 50,
  maxMana: 50,
});

console.log(character.getStatus());
