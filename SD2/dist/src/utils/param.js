export function param(req, name) {
    const v = req.params[name];
    if (Array.isArray(v))
        return v[0];
    return v;
}
//# sourceMappingURL=param.js.map