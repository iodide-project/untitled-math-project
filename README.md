# untitled-math-project

So far this project represents attempts to create a wasm-module which wraps the rust bluss/ndarray scientific computation library to provide performant arrays to datascientists within the js environment.

## steps to setup

* follow the installation steps for rust here 
    * [install](https://www.rust-lang.org/en-US/install.html)

* setup rust nightly on your machine
    * [nightly](https://doc.rust-lang.org/1.2.0/book/nightly-rust.html)

* update and install wasm-target
    * [steps](https://rustwasm.github.io/book/setup.html)

* install wasm-bindgen
    * `cargo +nightly install wasm-bindgen-cli` 
    * [extra info](https://rustwasm.github.io/wasm-bindgen/basic-usage.html)

## compilation of rust-> wasm

From the root of the project directory run

`
cargo +nightly build --lib --target wasm32-unknown-unknown
wasm-bindgen target/wasm32-unknown-unknown/debug/rust_sci_test.wasm \
  --out-dir js_code/
`
