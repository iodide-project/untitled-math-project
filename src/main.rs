#[macro_use(array)]
extern crate ndarray;
extern crate wasm_bindgen;
use ndarray::prelude::*;
use ndarray::{Array, arr2};

// many similarities
// differences are
//      - rust ndarray may have fixed size
//  ndarray
//      - doesn't have index arrays
//      - mask index arrays
//      - co-broadcasting
fn test_creating() {
    let first = array![[1., 2., 3.], [4., 5., 6.]];
    //println!("{:?} deb and {}", first, first);
    println!("{}", first);
    let second = arr2(&[[1., 2., 3.], [4., 5., 6.]]);
    println!("also this \n {}", second);
    let third = Array::range(0., 5., 1.);
    println!("made from range \n {}", third);
    let fourth = Array::linspace(0., 10., 4);
    println!("4 values between 0 and 10 gives \n{}", fourth);
}

fn test_indexing() {
    unimplemented!()
}

fn test_operations() {
    let first = array![[1., 2., 3.], [4., 5., 6.]];
    let range_vec: Vec<_> = (0..21).collect();
    println!("{:?}", range_vec);
    //let second = Array::from_shape_vec((2, 10), range_vec)?;
    println!("{}", second);
    //println!(
    //    " matrix multiplication looks like \n {}",
    //    first.dot(&second)
    //);
}

fn main() {
    // testing out the ndarray for python users
    println!("examining the support for array creation");
    test_creating();
    test_operations();
    println!("Hello, world!");
}
