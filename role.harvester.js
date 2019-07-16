const unitUtil = require('src.unit_util');

const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            //const containers = creep.room.find(FIND_STRUCTURES, {
            //    filter: (structure) => {
            //        return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100;
            //    }
            //});
            const container = unitUtil.targetContainerWithTheMostEnergy(creep.room);

            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {

                const sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else { //no targets

                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

    }
};

module.exports = roleHarvester;
