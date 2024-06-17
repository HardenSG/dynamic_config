db.createUser({
  user: 'config',
  pwd: 'password',
  roles: [{ role: 'dbOwner', db: 'dynamic_config' }],
})
