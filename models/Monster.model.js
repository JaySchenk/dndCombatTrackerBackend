const { Schema, model } = require("mongoose");

const monsterSchema = new Schema({
    name: String,
    size: String,
    type: String,
    subtype: String,
    alignment: String,
    armor_class: Number,
    hit_points: Number,
    hit_dice: String,
    speed: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    constitution_save: Number,
    intelligence_save: Number,
    wisdom_save: Number,
    history: Number,
    perception: Number,
    damage_vulnerabilities: String,
    damage_resistances: String,
    damage_immunities: String,
    condition_immunities: String,
    senses: String,
    languages: String,
    challenge_rating: String,
    special_abilities: [{}],
    actions: [{}],
    legendary_desc: String,
    legendary_actions: [{}],
    speed_json: {},
    armor_desc: String,
    page_no: Number,
    environments: [],
  });

    const Monster = model("Monster", monsterSchema, "monsters");
    
    module.exports = Monster;