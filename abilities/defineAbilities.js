import {AbilityBuilder} from "@casl/ability";
import {createMongoAbility} from "@casl/ability";

function defineAbilitiesFor(user) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
// TODO: progettare i permessi utente in base alle azioni permesse
    if (user.role === 'admin') {
        can('manage', 'all');
    } else if (user.role === 'supervisor') {
        can('manage', 'all');
    } else if (user.role === 'premium_user') {
        can('read', 'User', { authorId: user.id });
        can('read', 'Structure', { authorId: user.id });
        can('create', 'Structure', { authorId: user.id });
        can('update', 'User', { authorId: user.id });
        can('update', 'Structure', { authorId: user.id });
    } else if (user.role === 'standard_user') {
        can('read', 'User', { authorId: user.id });
        can('read', 'Structure', { authorId: user.id });
        can('create', 'Structure', { authorId: user.id });
        can('update', 'User', { authorId: user.id });
    } else if (user.role === 'free_user') {
        can('read', 'User',{ authorId: user.id });
    }

    return build({
        detectSubjectType: item => item.__type || item.constructor.name,
    });
}

export { defineAbilitiesFor };
