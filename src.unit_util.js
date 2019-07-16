module.exports = {
    targetContainerWithTheMostEnergy: function (room) {
        const containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100;
            }
        });
        const sorted = _.sortBy(containers, c => c.store[RESOURCE_ENERGY]);
        if (sorted.length === 0) {
            return null;
        }
        return sorted[0];
    }
};
