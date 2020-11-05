export default {
    extendedProperty(which, setter) {
        return {
            get: () => this[which],
            set: value => this[setter](value)
        }
    },

    property(which) {
        return {
            get: () => this[which],
            set: value => this[which] = value
        }
    }
}
