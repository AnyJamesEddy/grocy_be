import User from "../../models/authentication/user.js";
import setupAssociations from "../../config/associations/authentication-associations.js";

const authModels = {
    User,
};

setupAssociations(authModels);

async function syncDB() {
    try {
        await User.sync({alter: true})
    } catch (err) {
        console.error('Error syncing authentication tables:', err);
    }
}

export default {syncDB};
