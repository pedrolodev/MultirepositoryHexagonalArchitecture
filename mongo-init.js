/* eslint-disable no-undef */


const databasetest = db.getSiblingDB('test')

databasetest.createUser(
      {
            user: 'tester',
            pwd: 'tester123',
            roles: [
                  {
                        role: 'readWrite',
                        db: 'test'
                  }
            ]
      }
)

const databasedev = db.getSiblingDB('dev')

databasedev.createUser(
      {
            user: 'developer',
            pwd: 'developer123',
            roles: [
                  {
                        role: 'readWrite',
                        db: 'dev'
                  }
            ]
      }
)
