// next step is to try to figure out how to get the wasm module into an iodide session
extern crate cfg_if; // this is the line which lest us enable things like wee aloc and console err panic hook
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate js_sys;
#[macro_use(array)]
#[macro_use(stack)]
extern crate ndarray;
extern crate nalgebra;
extern crate rand;
extern crate ndarray_rand;
// better error handling
extern crate console_error_panic_hook;
use std::panic;


#[macro_use]
extern crate failure_derive;
extern crate failure;


use failure::Error;
use ndarray::prelude::*;
use ndarray::SliceOrIndex;
use ndarray::Array;
use ndarray::{stack,Axis,ArrayD, Dim, Ix, Ix2, IxDyn};
use rand::{thread_rng,Rng};
use rand::distributions::{Uniform,Distribution};
use ndarray_rand::RandomExt;

use nalgebra::{DMatrix};

mod utils;


#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-pack-tutorial!");
}
// need to be able to say the return type of  some of these functions is a certain dimension type
// ?? should I use an enum for thedim type?
#[wasm_bindgen]
#[derive(Clone)]
pub struct Nd {
    array: ArrayD<f32>,
}

//setting the consolelog for faster debugging
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s:&str);
}
fn ret_f32(v:JsValue) -> f32{
    js_sys::Number::new(&v).value_of() as f32
}

//todo change the ndarr to nd style
#[wasm_bindgen]
impl Nd {
    // this is for the panic hook
    pub fn init() {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
    }
    // this gets called each time so that we can handle creation errors

    pub fn svd(&self) -> Nd {
        let count = self.array.shape();
        // convert to nalgebra type
        //let shape = self.array.shape();
        //println!("{:?} {:?}",shape[0],shape[1]);
        let inside = self.array.view().to_owned().into_raw_vec();
        let nalg_arr = DMatrix::from_iterator(count[0],count[1],inside);
        //let res = SVD::new(nalg_arr,true,true);
        //let lu = nalg_arr.svd(true,true);
        let nalgebra::SVD {u,v_t:vt,singular_values} = nalg_arr.svd(true,true);
        let svd_vt_data = vt.unwrap().data;
        Nd{
            array:Array::from_shape_vec([1,svd_vt_data.len()],svd_vt_data.to_vec()).unwrap().into_dyn()
        }
    }

    // creation methods 
    pub fn from_array_buffer(arr: &[f32], dims: &js_sys::Array) -> Nd {
        let dim_vec = make_arr_usize(dims);
        let ixdyn = IxDyn(&dim_vec);
        Nd {
            array: Array::from_shape_vec(ixdyn, arr.to_vec()).unwrap().into_dyn(),
        }
    }

    // eye will return a zero matrix with ones on diagonal.
    pub fn eye(dim:JsValue)-> Nd {
        let int_val= js_sys::Number::new(&dim).value_of() as usize;
        Nd {
            array: Array::eye(int_val).into_dyn()
        }
    }

    // A value which fills the array of dimensions given
    pub fn fill(dims: &js_sys::Array,val:JsValue) -> Nd {
        let dim_vec = make_arr_usize(dims);
        let float_val = js_sys::Number::new(&val).value_of() as f32;
        let ixdyn = IxDyn(&dim_vec);
        Nd {
            array: Array::from_elem(ixdyn,float_val)
        }
    }


    pub fn range(start:JsValue,end:JsValue,step:JsValue)-> Nd{
        let start = ret_f32(start);
        let end = ret_f32(end);
        let step = ret_f32(step);
        Nd {
            array:Array::range(start,end,step).into_dyn()
        }
    }

    //assumption is that the elements are floats
    pub fn linspace(start:JsValue,end:JsValue,len:JsValue)-> Nd{
        //shadow the js
        let start = ret_f32(start);
        let end = ret_f32(end);
        let len = ret_f32(len) as usize;
        Nd {
            array:Array::linspace(start,end,len).into_dyn()
        }
    }

    pub fn zeros(dims: &js_sys::Array)-> Nd {
        let dim_vec = make_arr_usize(dims);
        let ixdyn = IxDyn(&dim_vec);
        Nd {
            array: Array::zeros(ixdyn)
        }
    }
    #[wasm_bindgen(constructor)]
    pub fn make(arr_arg: &js_sys::Array) -> Nd {
        // simple test
        let str_arr = String::from(arr_arg.to_string()); //both coversions required due to the JsString used first
        let mut vec_str: Vec<_> = str_arr.split(",").collect();
        let filler = vec_str.remove(0).parse::<f32>().unwrap();
        let vec_dim: Vec<usize> = vec_str
            .into_iter()
            .map(|x| x.parse::<usize>().unwrap())
            .collect();
        let mut temp_arr = ArrayD::<f32>::zeros(IxDyn(&vec_dim));
        // todo explore whether the from_elem alt is faster than zero/fill method
        temp_arr.fill(filler);
        Nd { array: temp_arr }
    }

    // would like to integrate random, but that is also a new crate to bring in
    //pub fn random(dims: &js_sys::Array,range:&js_sys::Array) -> Nd {
    //    let dim_vec = make_arr_usize(dims);
    //    // !! investigatewhy the second for each is nec
    //    log(&format!("{:?}",dim_vec));
    //    let ixdyn = IxDyn(&dim_vec);
    //    log(&format!("{:?}",ixdyn));
    //    let range_vec = make_arr_f32(range);
    //    log(&format!("{:?}",range_vec));
    //    //let range_ob = Uniform::new(range_vec[0] as i32,range_vec[1]as i32);
    //    let range_ob = Uniform::from(0..100);
    //    log(&format!("{:?}",range_ob));
    //    let a =  Array::random(ixdyn,range_ob) ;
    //    log(&format!("{:?}",a));
    //        Nd {
    //            array:a.into_dyn()
    //        }
    //    }

    // operator section
    //  -note these functions are functional and don't modify their arguments
    pub fn add(&self, other: &Nd) -> Nd {
        let _temp_self = self.array.clone();
        let _temp_other = other.array.clone();
        Nd {
            array: _temp_self + _temp_other,
        }
    }
    pub fn subtract(&self,other:&Nd) -> Nd {
        Nd{
            array: self.array.clone() - other.array.clone(),
        }
    }
    pub fn dot(&self, other: &Nd) -> Nd {
        // !! double check that this dot works with non 2d matrices
        let _temp_self = self.array.clone();
        let _temp_other = other.array.clone();
        let _temp_self_dottable = _temp_self.into_dimensionality::<Ix2>().unwrap();
        let _temp_other_dottable = _temp_other.into_dimensionality::<Ix2>().unwrap();
        Nd {
            array: _temp_self_dottable.dot(&_temp_other_dottable).into_dyn(),
        }
    }
    //not finished implementing
    //pub fn exp(& self,n :JsValue) -> Nd {
    //    let n = js_sys::Number::new(&n).value_of() as usize;
    //    let mut lhs = self.array.clone();
    //    for _ in 0..n {
    //        lhs = lhs.dot(self.array);
    //    }
    //    Nd{
    //        array:lhs
    //    }

    //}
    // this is the element wise power, not matrix exponentiation
    pub fn e_pow(&self,n: JsValue) -> Nd {
        // use the map in place on ndarray
        let n = js_sys::Number::new(&n).value_of() as i32;
        // !!  look into the inplace version, this seems like it might be too slow
        let powered = self.array.mapv(|a| a.powi(n));
        Nd{
            array: powered
        }
    }
    pub fn sqrt(&mut self) -> Nd {
        Nd {
            array:self.array.mapv(f32::sqrt)
        }
    }
    
    //manipulation code
    // numpy and other sci comp packages inplace transpose mutation
    pub fn transpose(&mut self){
        let trans = self.array.t().to_owned(); // !! beware of the jturner to_owned issue, only remove this comment when layout specs of to_owned are understood
        self.array = trans;
    }
    pub fn concat_cols(&self,other:&Nd) -> Nd {
        Nd{
            array:stack![Axis(1),self.array,other.array]
        }
    }
    pub fn concat_rows(&self,other:&Nd) -> Nd {
        Nd{
            array:stack![Axis(0),self.array,other.array]
        }
    }

    //pub fn concatenate(&self,&other:Nd,axis:JsValue) -> Nd {
    //    let axis_uint = js_sys::Number::new(&n).value_of() as usize;
    //    let arr_ref = &[self.array.view(),other.array.view()];
    //    //Nd {
    //    //    array:stack(Axis(axis_uint),&[self.array.view(),other.array.view()]).unwrap()
    //    //}
    //    Nd{
    //        array:self.array.clone()
    //    }
    //}

    pub fn get_slice_rust(&self, ind: JsValue) -> Self {
        //ind is a string which will contain the unpackable indexing structure
        //create a vector kind of thing from it, and rework following for iterating over the comma
        //separated entries
        let ind_string = ind.as_string().unwrap();
        let ind_vector = ind_string.split(',').collect::<Vec<&str>>();
        log(&format!("{:?}", ind_vector)[..]);
        let mut val_vec: Vec<SliceOrIndex> = vec![];
        for ind_str in ind_vector.iter() {
            // single integer index specified
            if let Ok(num) = ind_str.parse::<u32>() {
                val_vec.push(SliceOrIndex::Index(num as isize));
            } else {
                // maybe extend this to the 2:5:1 syntax for indexing
                let pair = ind_str
                    .split(':')
                    .map(|e| e.parse::<u32>())
                    .collect::<Vec<Result<u32, std::num::ParseIntError>>>();
                //make into slice for destructuring matching
                match pair.as_slice() {
                    //num: syntax
                    [Ok(num), _] => {
                        val_vec.push(SliceOrIndex::Slice {
                            start: *num as isize,
                            end: None,
                            step: 1_isize,
                        });
                    }//num:num syntax
                    [Ok(num1), Ok(num2)] => {
                        val_vec.push(SliceOrIndex::Slice {
                            start: *num1 as isize,
                            end: Some(*num2 as isize),
                            step: 1_isize,
                        });
                    }// :num syntax
                    [_, Ok(num)] => {
                        val_vec.push(SliceOrIndex::Slice {
                            start: 0_isize,
                            end: Some(*num as isize),
                            step: 1_isize,
                        });
                    }
                    _ => panic!(),
                }
            }
        }
        log(&format!("{:?}", val_vec)[..]);
        // should have val_vec created by this point
        // !! slicing creates an array view, which might not be accepted for ND creation
        //      if so, look up how to create new ndarray from view
        let nd_slice_ob = ndarray::SliceInfo::<_, IxDyn>::new(val_vec).unwrap();
        Nd {
            array: self.array.slice(nd_slice_ob.as_ref()).to_owned(),
        }
    }
    pub fn get(&self, ind: &js_sys::Array) -> f32 {
        let rust_ind = make_arr_usize(ind);
        self.array[&rust_ind[..]]
    }
    pub fn set(&mut self, ind: &js_sys::Array, val: f32) {
        let rust_ind = make_arr_usize(ind);
        self.array[&rust_ind[..]] = val;
    }
    // summary information  methods
    //
    pub fn total_mean(&self) -> f32{
        self.array.scalar_sum()/self.array.len() as f32
    }
    pub fn cols_mean(&self) -> Nd{
        Nd {
            array:self.array.mean_axis(Axis(1))
        }
    }
    pub fn rows_mean(&self) -> Nd{
        Nd {
            array:self.array.mean_axis(Axis(0))
        }
    }
    pub fn total_sum(&self) -> f32{
        self.array.scalar_sum()
    }
    // collapses the particular axis by summing the elements in it
    pub fn cols_sum(&self) -> Nd{
        Nd {
            array:self.array.sum_axis(Axis(1))
        }
    }
    pub fn rows_sum(&self) -> Nd{
        Nd {
            array:self.array.sum_axis(Axis(0))
        }
    }
    pub fn show(&self) -> String {
        format!("{:?}", self.array)
    }
}

fn make_arr_f32(arr:&js_sys::Array)-> Vec<f32> {
    let mut v = vec![];
    arr.for_each(&mut |x,_,_| v.push(js_sys::Number::new(&x).value_of() as f32));
    v
}

fn make_arr_f64(arr:&js_sys::Array)-> Vec<f64> {
    let mut v = vec![];
    arr.for_each(&mut |x,_,_| v.push(js_sys::Number::new(&x).value_of()));
    v
}

fn make_arr_usize(arr: &js_sys::Array) -> Vec<usize> {
    let mut dim_vec = vec![];
    arr.for_each(&mut |x, _, _| dim_vec.push(x.as_f64().unwrap() as usize));
    dim_vec
}
