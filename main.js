const roleHarvester = require('role.harvester');
const roleHarvester_container = require('role.harvester_container');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const unitspawn = require('src.unitspawn');
const profiler = require('screeps-profiler');

profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function () {
        /*
            var tower = Game.getObjectById('TOWER_ID');
            if(tower) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }

                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        */

        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        unitspawn.spawnIfLacking();


        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.role === 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role === 'harvester_container') {
                roleHarvester_container.run(creep);
            }
            if (creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role === 'builder') {
                roleBuilder.run(creep);
            }
        }
    });
}
