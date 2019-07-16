const unitUtil = require('src.unit_util');

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.memory.target = '92f7b7c5808deca';
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const target = unitUtil.targetContainerWithTheMostEnergy(creep.room);
            //var sources = creep.room.find(FIND_SOURCES);
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
};

module.exports = roleUpgrader;
