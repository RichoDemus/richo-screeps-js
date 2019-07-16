/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('src.unitspawn');
 * mod.thing == 'a thing'; // true
 */
 
 const amnounts = {
   'harvester': 2,
   'harvester_container': 2,
   'builder': 2,
   'upgrader': 3
 };
 
 const body = function(spawner, role, current_amount) {
      const extensions = spawner.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION;
                }
            }).length;
            const maxEnergy = 300 + extensions * 50;
    // console.log("There are", extensions, "extensions for a total of",maxEnergy, "max energy");
    
    if(maxEnergy >= 550 && current_amount > 0) {
        if(role == 'harvester_container') {
            return [MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK]
        }
        return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
    }
    
     return [WORK, WORK, CARRY, MOVE];
 };
 
 const getCreepsByRole = function(role) {
     const matches =  _.filter(Game.creeps, (creep) => creep.memory.role == role);
     if(matches) {
        return matches.length;
     }
    return 1000;
 }
 
 const spawnIfLackingNow = function(spawner, role) {
     const count = getCreepsByRole(role);
    if(count < amnounts[role]) {
        console.log("Only", count, "of",role, "spawning new one");
        return spawn(spawner, role, count);
     }
     //console.log("Already", count, "of",role);
     return false;
 }
 
 const spawn = function(spawner, role, current_amount) {
     //console.log("spawn ", role);
     const result = spawner.spawnCreep(body(spawner, role, current_amount), role + '-' + Game.time, {memory: {role: role}});
     console.log("Spawn",role,":",result);
     return OK == result;
 }

module.exports = {
    spawnIfLacking: function() {
      const spawner = Game.spawns['Spawn1'];
      
      const harvesters = getCreepsByRole('harvester');
      const harvesters_container = getCreepsByRole('harvester_container');
      const upgraders = getCreepsByRole('upgrader');
      const builders = getCreepsByRole('builder');
      //console.log("Harvesters:",harvesters,"Harvesters(container):",harvesters_container, "Upgraders:", upgraders,"Builders:",builders);
      
      if(spawner.energy < spawner.energyCapacity) {
          //console.log("Energy", spawner.energy,"/",spawner.energyCapacity);
          return;
      }
      
      
      if(!spawnIfLackingNow(spawner, 'harvester')) {
          //console.log("did not summon harvester");
          if(!spawnIfLackingNow(spawner, 'upgrader')) {
              //console.log("did not summon upgrader");
              if(!spawnIfLackingNow(spawner, 'builder')) {
                 // console.log("did not summon builder");
                               if(!spawnIfLackingNow(spawner, 'harvester_container')) {
                 // console.log("did not summon builder");
              }
              }
          }
      }
      

    }
};