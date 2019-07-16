const unitUtil = require('src.unit_util');

const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            repairTargets.sort((a, b) => a.hits - b.hits);

            if (repairTargets.length > 0) {
                //creep.say("repair");
                if (creep.repair(repairTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets[0]);
                }
            } else {

                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (creep.carry.energy < creep.carryCapacity) {
                    const target = unitUtil.targetContainerWithTheMostEnergy(creep.room);
                    if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        } else if (creep.carry.energy < creep.carryCapacity) {
            const target = unitUtil.targetContainerWithTheMostEnergy(creep.room);
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
};

module.exports = roleBuilder;
