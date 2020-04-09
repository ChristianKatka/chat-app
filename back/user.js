const users = [];

// Join user to chat
function userJoin(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves the chat
function userLeave(id) {
    console.log('logataan id:', id);
    // finds the index of given id
    const index = users.findIndex(user => user.id === id);
    console.log('logataan löydetty indexi:', index);
    // if didint found index to given user returns -1
    if(index !== -1) {
        // returns the deleted user
        return users.splice(index, 1);
    }
}

// Get all the users in single room
function getRoomUsers(room) {
    // returns users in the same room
    return users.filter(user => user.room === room);
}


module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };