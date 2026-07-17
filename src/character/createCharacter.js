const createCharacter = (characterData) => {
  let character = { ...characterData };
  let inventory = [];
  let equippedWeapons = [];
  let spells = [];

  return {
    getStatus: () => ({
      ...character,
      inventory: [...inventory],
      equippedWeapons: [...equippedWeapons],
      spells: [...spells],
      alive: character.hp > 0,
    }),
    addItem: (item) => {
      const alreadyExists = inventory.some(({ id }) => id === item.id);
      if (alreadyExists) {
        return {
          success: false,
          error: "Item já existente",
        };
      }
      inventory = [...inventory, item];
      return {
        success: true,
        data: inventory,
      };
    },
    equipWeapon: (itemId) => {
      const item = inventory.find(({ id }) => id === itemId);
      const weaponLimit = character.class === "barbarian" ? 2 : 1;
      const reachedWeaponLimit = equippedWeapons.length >= weaponLimit;

      if (character.hp <= 0) {
        return {
          success: false,
          error: "Personagem morto não pode equipar armas",
        };
      }
      if (!item) {
        return {
          success: false,
          error: "Item não encontrado no inventário",
        };
      }
      if (item.type !== "weapon") {
        return {
          success: false,
          error: "O item não é uma arma",
        };
      }

      const alreadyEquipped = equippedWeapons.some(({ id }) => id === itemId);

      if (alreadyEquipped) {
        return {
          success: false,
          error: "Arma já equipada",
        };
      }
      if (reachedWeaponLimit) {
        return {
          success: false,
          error: "Limite de armas equipadas atingido",
        };
      }
      equippedWeapons = [...equippedWeapons, item];
      return {
        success: true,
        data: equippedWeapons,
      };
    },
    unequipWeapon: (itemId) => {
      const item = equippedWeapons.find(({ id }) => id === itemId);
      if (character.hp <= 0) {
        return {
          success: false,
          error: "Personagem morto não pode desequipar armas",
        };
      }
      if (!item) {
        return {
          success: false,
          error: "Personagem não tem armas para desequipar",
        };
      }
      const updatedEquippedWeapons = equippedWeapons.filter(
        ({ id }) => id !== item.id,
      );
      equippedWeapons = [...updatedEquippedWeapons];
      return {
        success: true,
        data: equippedWeapons,
      };
    },
    receiveDamage: (amount) => {
      if (amount < 0) {
        return {
          success: false,
          error: "Dano precisa ser positivo",
        };
      }
      const newHp = character.hp - amount;
      character = { ...character, hp: Math.max(0, newHp) };
      return {
        success: true,
        data: "Sucesso: Personagem recebeu dano, HP atualizado",
      };
    },
  };
};

export { createCharacter };
