module.exports = {
    apps : [{
        name: 'wx_authorize',
        script: 'bin/www',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        cwd: './',
        watch: ['app', 'bin', 'config', 'app.js'],
        watch_delay: 1000,
        watch_options: {
            followSymlinks: false,
            usePolling: true
        },
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
  }]
};
