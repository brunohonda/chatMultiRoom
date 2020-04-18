db = db.getSiblingDB('rankdone-chat')

db.createUser(
    {
        user: 'rankdone',
        pwd: 'vgrp0RBDvWAFU4mHytUqthssMlXHKgfV',
        roles: [
            {
                role: 'readWrite',
                db: 'rankdone-chat'
            }
        ]
    }
);