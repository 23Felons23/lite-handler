module.exports = (message, target, perms) => {
    const missingPerms = [];
    perms.forEach(perm => {
        if (!target.hasPermission(perm, {checkAdmin: true, checkOwner: true})) {
            missingPerms.push(perm);
        }
    });
    return missingPerms;
}
