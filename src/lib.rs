#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#[macro_use(array)]
// !! one issue is I'm running into difficulty in describing the types that will come out after the
// !! fact
extern crate ndarray;
extern crate wasm_bindgen;

use wasm_bindgen::js;
use wasm_bindgen::prelude::*;
use ndarray::prelude::*;
use ndarray::{Array, Array1, ArrayBase, arr1, arr2};
use ndarray::{Dim, Ix};

#[wasm_bindgen]
pub struct NdRange {
    array: Array<f32, Dim<[Ix; 1]>>,
}

enum MultDim {
    One,
    Two,
}

trait FlexDim {
    fn make_correct_array() -> 
}

#[wasm_bindgen]
impl NdRange {
    pub fn general_make<T:FlexDim>(
    // ?? not sure what type this first dim should be
    // ?? how should it look when we are passing a js array?
    pub fn make(arr_arg: & js::Array) -> NdRange {
        match arr_arg.length() {
        // functions responsible for returning different length ndarrays
        }
               }
    pub fn show(&self) -> String {
        format!("{:.10?}", self.array)
    }
    pub fn fill_f32(&mut self, val: f32) {
        self.array.fill(val);
    }
}
//?? need to come up with a way to wrap the actual objects rather than having to communicate
//??through strings wasm_bindgen doesn't have a trait bound satisfied when trying to capture
//??function return 
// ?? function that accepts ptr from javascript ??
#[wasm_bindgen]
pub fn get_array_rep() -> String {
    make_array().array.to_string()
}

//?? can bindgen functions be used within other rust functions also?
//?? making structs that are holders for types seems to be the only way to satisfy the wasm_bindgen
//system?? is this expected ?? seems like it is much like the system whereby we create these
//functions that are wasm_bindgen supported, and then make proper calls within them to other
//library functions

#[wasm_bindgen]
pub fn make_array() -> NdRange {
    NdRange {
        array: Array::range(0., 12., 1.),
    }
}
