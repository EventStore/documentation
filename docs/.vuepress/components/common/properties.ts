const resolvePath = (object, path, defaultValue?) => path
   .split('.')
   .reduce((o, p) => o ? o[p] : defaultValue, object);

const setPath = (object, path, value) => {
    return path
        .split('.')
        .reduce((o,p,i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object);
}

export default {
    extendedProperty(which, setter) {
        return {
            get: () => resolvePath(this, which),
            set: value => this[setter](value)
        }
    },

    property(which) {
        return {
            get: () => resolvePath(this, which),
            set: value => setPath(this, which, value)
        }
    }
}
