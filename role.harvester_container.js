const roleHarvester_container = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.carry.energy < creep.carryCapacity) {

            // var sources = creep.room.find(FIND_SOURCES);
            const sources = [Game.getObjectById("26f20772347f879")];
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    if (structure.structureType === STRUCTURE_CONTAINER) {
                        const current_energy = structure.store[RESOURCE_ENERGY];
                        const max_energy = structure.storeCapacity;

                        //console.log("container: '", current_energy, "' '", max_energy,"'");


                        return (structure.structureType === STRUCTURE_CONTAINER) && current_energy < max_energy;
                    }
                    return false;
                }
            });
            //console.log(targets);

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            //else { //no targets
            //   creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            //}
        }

    }
};

module.exports = roleHarvester_container;
