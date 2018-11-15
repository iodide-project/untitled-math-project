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
Previously the following was the method used to compile the project into wasm code.
From the root of the project directory run

```
cargo +nightly build --lib --target wasm32-unknown-unknown
wasm-bindgen target/wasm32-unknown-unknown/debug/rust_sci_test.wasm \
  --out-dir js_code/
```

The project has shifted to the distribution friendly [wasm-pack](https://rustwasm.github.io/wasm-pack/) and the steps for compilation of the target wasm-ndarray tool are as follows

## finding it on npm
This package is periodically released also on npm in [dably packages](https://www.npmjs.com/package/@dably/wasm-ndarray). Follow the steps in the wasm-pack tutorial on [using your library](https://rustwasm.github.io/wasm-pack/book/tutorial/using-your-library.html) substituting @dably/wasm-ndarray to install and import into javascript code.

## extremely hacky
A third option exists for those willing to use the [Iodide](https://iodide.io/) notebook which is module instantiation via jsdelivr. After followig this link [wasm-ndarray in iodide](https://extremely-alpha.iodide.io/notebooks/134/) you will be in a notebook session which can fetch, compile, and instantiate the wasm-ndarray module. Example use of the module is in the bottom most cells.
