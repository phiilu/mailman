# config valid only for current version of Capistrano
lock "3.7.0"

set :application, 'mailman'
set :repo_url, 'https://github.com/flowryaan/mailman.git'

set :deploy_to, '/home/deploy/mailman'

set :linked_files, %w{config/database.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'
end
