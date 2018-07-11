#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#[macro_use(array)]
// !! one issue is I'm running into difficulty in describing the types that will come out after the
// !! fact
extern crate ndarray;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use wasm_bindgen::js;
use ndarray::prelude::*;
use ndarray::Array;
use ndarray::{ArrayD, Dim, Ix, IxDyn};

// need to be able to say the return type of  some of these functions is a certain dimension type
// ?? should I use an enum for thedim type?
#[wasm_bindgen]
pub struct Nd {
    array: ArrayD<f32>,
}
//todo change the ndarr to nd style
#[wasm_bindgen]
impl Nd {
    #[wasm_bindgen(constructor)]
    pub fn make(arr_arg: &js::Array) -> Nd {
        // simple test
        let str_arr = String::from(arr_arg.to_string()); //both coversions required due to the JsString used first
        let vec_dim: Vec<usize> = str_arr
            .split(",")
            .map(|x| x.parse::<usize>().unwrap())
            .collect();
        let mut temp_arr = ArrayD::<f32>::zeros(IxDyn(&vec_dim[1..]));
        // todo explore whether the from_elem alt is faster than zero/fill method
        temp_arr.fill(vec_dim[0] as f32);
        Nd { array: temp_arr }
    }
    pub fn add_to(&mut self, other: Nd) {

    }
    pub fn show(&self) -> String {
        format!("{:?}", self.array)
    }
}

#[wasm_bindgen]
pub struct NdArr {
    array: Array<f32, Dim<[Ix; 1]>>,
}

#[wasm_bindgen]
impl NdArr {
    // ?? not sure what type this first dim should be
    // ?? how should it look when we are passing a js array?
    pub fn make(arr_arg: &js::Array) -> String {
        // ?? transformations of arr_arg?
        String::from(arr_arg.to_string())
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
pub fn make_array() -> NdArr {
    NdArr {
        array: Array::range(0., 12., 1.),
    }
}
