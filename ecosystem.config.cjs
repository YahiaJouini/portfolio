module.exports = {
  apps: [
    {
      name: 'portfolio-app',
      script: './node_modules/.bin/next',
      args: 'start',
      cwd: '/home/yahia/portfolio',
      instances: 'max',
      exec_mode: 'cluster',
      
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      
      log_file: '/home/yahia/portfolio/logs/combined.log',
      out_file: '/home/yahia/portfolio/logs/out.log',
      error_file: '/home/yahia/portfolio/logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      max_memory_restart: '500M',
      min_uptime: '10s',
      max_restarts: 5,
      kill_timeout: 5000,
      listen_timeout: 8000,
      merge_logs: true,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
    }
  ]
};
 
