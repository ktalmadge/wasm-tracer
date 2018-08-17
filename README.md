### Install necessary system libraries and node.js 8

##### RHEL:
    sudo yum install -y gcc openssl-devel
    curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
    sudo yum -y install nodejs
    
##### Debian:
    sudo apt-get install -y gcc libssl-dev
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs

### Install rust

##### Install Rustup
    curl https://sh.rustup.rs -sSf | sh
    source $HOME/.cargo/env
    rustup install nightly

##### Add wasm target to rust
    rustup target add wasm32-unknown-unknown --toolchain nightly

##### Install wasm-bindgen
    cargo +nightly install wasm-bindgen-cli
    cargo install -f wasm-bindgen-cli

### Build and deploy
##### Check out code
    git clone https://github.com/ktalmadge/wasm-tracer
    cd wasm-tracer

##### Install node packages
    npm install

##### Build raytracer
    npm run build-release

##### Serve with webpack-dev-server
    npm run serve

##### or pack with webpack
    webpack
    
### nginx
    sudo yum install epel-release
    sudo yum install nginx
    sudo systemctl start nginx
    sudo firewall-cmd --permanent --zone=public --add-service=http 
    sudo firewall-cmd --permanent --zone=public --add-service=https
    sudo firewall-cmd --reload
    sudo systemctl enable nginx

##### modify /etc/nginx/nginx.conf -> location to point to /dist directory
    root         /deploy/wasm-tracer/dist;

##### Add the wasm mime type to nginx: /etc/nginx/mime.types
    application/wasm                      wasm;

##### Restart nginx

    sudo systemctl start nginx