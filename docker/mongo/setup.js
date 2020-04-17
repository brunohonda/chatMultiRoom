db = db.getSiblingDB('rankdone-chat')

db.createUser(
    {
        user: 'rankdone',
        pwd: 'r4bb1TmqR4nkD0n3',
        roles: [
            {
                role: 'readWrite',
                db: 'rankdone-chat'
            }
        ]
    }
);