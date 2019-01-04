
extern crate cfg_if; // this is the line which lest us enable things like wee aloc and console err panic hook
extern crate wasm_bindgen;
extern crate js_sys;
#[macro_use(array)]
#[macro_use(stack)]
extern crate ndarray;
extern crate nalgebra;
extern crate rand;
// better error handling
extern crate console_error_panic_hook;
#[macro_use]
extern crate failure_derive;
extern crate failure;
use wasm_bindgen::prelude::*;
use std::panic;
use failure::Error;
use ndarray::prelude::*;
use ndarray::SliceOrIndex;
use ndarray::Array;
use ndarray::{stack,Axis,ArrayD, Dim, Ix, Ix2, IxDyn};
use rand::{thread_rng,Rng};
use rand::distributions::{Uniform,Distribution};
use nalgebra::{DMatrix,DVector};
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
    // this gets called each time so that we can handle creation errors
    pub fn init() {
        panic::set_hook(Box::new(console_error_panic_hook::hook));
    }

    // solver material
    fn into_nalg_mat(&self)-> DMatrix<f32> {
        let shape = self.array.shape();
        let inside = self.array.t().into_iter().cloned();
        let nalg_arr = DMatrix::from_iterator(shape[0],shape[1],inside);
        nalg_arr
    }


    pub fn inverse(&self) -> Nd{
        let shape = self.array.shape();
        let nalg_v = self.into_nalg_mat();
        log(&format!("{}",nalg_v));
        let inv = nalg_v.qr().try_inverse().unwrap();
        let ixdyn = IxDyn(&shape);
        log(&format!("{}",inv));
        Nd {
            array:Array::from_shape_vec(ixdyn,inv.as_slice().to_vec()).unwrap().reversed_axes() // double check whether we need to reverse after all now
        }

    }

    //fn into_nalg_mat(&self) -> DMatrix {
    //    //let inside = self.array.t().iter().cloned();// jturner suggestion
    //    //let dimensions = self.array.shape();
    //    //let nalg_arr = DMatrix::from_iterator(1,1,&[1]);
    //    let nalg_arr = DMatrix::<f32>::new_random(5,5);
    //    nalg_arr
    //}
    fn into_nalg_vec(&self) -> DVector<f32> {
        let shape = self.array.shape();
        let inside = self.array.t().into_iter().cloned();
        let nalg_vec = DVector::from_iterator(shape[0],inside);
        nalg_vec
    }

    pub fn one_dim_pretty(&self) -> String {
        let nvec = self.into_nalg_vec();
        format!("{}",nvec)
    }


    pub fn solve(&self,other:&Nd) -> Nd{ 
        let dmat = self.into_nalg_mat();
        let vec = other.into_nalg_vec();
        // get the LU decomp then run solve
        let lu = dmat.lu();
        log(&format!("{}",lu.solve(&vec).unwrap()));
        let solution = lu.solve(&vec).unwrap();
        // pretty sure we can count on the shape only being 2d here
        let shape = solution.shape();
        let ixdyn = IxDyn(&[shape.0,shape.1]); 
        Nd {
            // be careful that the as slice returns in the col or row order that is correct for Nd
            // recreation, perhaps the reversed_axes si all that we need towrite here
            array:Array::from_shape_vec(ixdyn,solution.as_slice().to_vec()).unwrap().reversed_axes()
        }

    }
    pub fn instructive_filter(&self,row_inds:&Nd,col_inds:&Nd,channelSelect:js_sys::Array,threshold:JsValue) -> Box<[f32]> {
        let long_array = Array::from_shape_vec((200*200,4),self.array.iter().cloned().collect()).unwrap();
        let channelSelect = make_arr_f32(&channelSelect);
        let collapse = Array::from_shape_vec((4,1),channelSelect).unwrap();
        let res = long_array.dot(&collapse);
        // I wonder which is faster, performing sum to drop axis, or reshape?
        let threshold = ret_f32(threshold);
        let mut retv = vec![];
        let bool_mask = res.mapv(|e| {if e > threshold {retv.extend(vec![255.0,255.0,255.0,255.0]);return 1.0} else {retv.extend(vec![0.0,0.0,0.0,255.0]);return 0.0}});
        retv.into_boxed_slice()
    }


    pub fn values_center(&self,row_inds:&Nd,col_inds:&Nd,channelSelect:js_sys::Array,threshold:JsValue) -> Nd{
        let long_array = Array::from_shape_vec((200*200,4),self.array.iter().cloned().collect()).unwrap();
        let channelSelect = make_arr_f32(&channelSelect);
        let collapse = Array::from_shape_vec((4,1),channelSelect).unwrap();
        let res = long_array.dot(&collapse);
        // I wonder which is faster, performing sum to drop axis, or reshape?
        let threshold = ret_f32(threshold);
        let bool_mask = res.mapv(|e| (e >threshold) as i32 as f32).sum_axis(Axis(1));
        let total = bool_mask.scalar_sum();
        ////create row and column arrays
        let non_zero_columns = &col_inds.array*&bool_mask;
        let col_center = (&col_inds.array*&bool_mask).scalar_sum()/total;
        let row_center = (&row_inds.array*&bool_mask).scalar_sum()/total;
        Nd {
            array: Array::from_shape_vec((1,2),vec![col_center as f32,row_center as f32]).unwrap().into_dyn()
        }
    }

    //fn nalg_to_ndarray(m:&DMatrix) -> Nd{
    //    unimplemented!();
    //    Nd{
    //        array:Array::from_shape_vec(m.shape(),m.as_slice().to_vec()).unwrap().into_dyn()
    //    }
    //}
    

    //pub fn qr(&self) -> js_sys::Array  {
    //    unimplemented!();
    //    let nalg = self.into_nalg_mat();
    //    let qr = nalg.qr();
    //    let jsarr = js_sys::Array::new();
    //    let ndq = Nd::nalg_to_ndarray(qr.q());
    //    let ndr = Nd::nalg_to_ndarray(qr.r());

    //    jsarr.push(ndq);
    //    jsarr.push(ndr);
    //}


    pub fn lsqr(&self,other:&Nd) -> Nd{
        // find the y for the minimum x, and subtract that from the entire y vector, introduce as
        // the 
        let X = self.into_nalg_mat();
        let Y = other.into_nalg_mat();
        let qr = X.qr();
        let q = qr.q();
        let r = qr.r();
        let solution = r.try_inverse().unwrap()*q.transpose()*Y;
        let shape = solution.shape();
        Nd{ 
            array:Array::from_shape_vec(shape,solution.as_slice().to_vec()).unwrap().into_dyn()
        }

    }
    pub fn svd(&self) -> Nd {
        let nalg_arr = self.into_nalg_mat();

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
    //no sources of entropy error in browser
    pub fn random(dims: &js_sys::Array) -> Nd {
        let dims = make_arr_usize(dims);
        let raw_data = (0..dims[0]).map(|x| rand::random::<f32>()).collect::<Vec<_>>();
        let nalg_rand = DMatrix::from_iterator(1,dims[0],raw_data.iter().cloned());
        let raw_data= nalg_rand.as_slice();
        let ixdyn = IxDyn(&dims);
        Nd {
            array:Array::from_shape_vec(ixdyn,raw_data.to_vec()).unwrap().into_dyn()
        }
    }

    // operator section
    //  -note these functions are functional and don't modify their arguments
    pub fn add(&self, other: &Nd) -> Nd {
        Nd {
            array: &self.array + &other.array,
        }
    }
    pub fn mult(&self,other:&Nd) -> Nd {
        Nd{
            array:&self.array* &other.array, // elementwise mult with broadcast support
        }
    }
    pub fn subtract(&self,other:&Nd) -> Nd {
        Nd{
            array: &self.array- &other.array,
        }
    }
    pub fn dot(&self, other: &Nd) -> Nd {
        // !! double check that this dot works with non 2d matrices
        let self_clone = self.array.clone();
        let other_clone = other.array.clone();
        let self_ix2 = self_clone.into_dimensionality::<Ix2>().unwrap();
        let other_ix2 = other_clone.into_dimensionality::<Ix2>().unwrap();
        Nd {
            array: self_ix2.dot(&other_ix2).into_dyn(),
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
    //
    pub fn transpose(&mut self) -> Nd{
        Nd{
            array:self.array.t().to_owned() // !! beware of the jturner to_owned issue, only remove this comment when layout specs of to_owned are understood
        }
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

    pub fn set_slice(&mut self,ind:JsValue,other:&Nd) {
        let slice_vec = make_slice_from_string(&ind);
        let nd_slice_ob = ndarray::SliceInfo::<_, IxDyn>::new(slice_vec).unwrap();
        self.array.slice_mut(nd_slice_ob.as_ref()).assign(&other.array)
    }

    pub fn new_from_slice(&self, ind: JsValue) -> Self {
        //ind is a string which will contain the unpackable indexing structure
        //create a vector kind of thing from it, and rework following for iterating over the comma
        //separated entries
        // should have val_vec created by this point
        // !! slicing creates an array view, which might not be accepted for ND creation
        //      if so, look up how to create new ndarray from view
        let slice_vec = make_slice_from_string(&ind);
        let nd_slice_ob = ndarray::SliceInfo::<_, IxDyn>::new(slice_vec).unwrap();
        Nd {
            array: self.array.slice(nd_slice_ob.as_ref()).to_owned(),
        }
    }
    // !!! note u32 might not be large enough for certain architectures
    pub fn run_bench_op(size:usize)  {
    let mut A: Array<f32,Dim<[Ix;1]>> = Array::zeros(size);
    let mut B: Array<f32,Dim<[Ix;1]>> = Array::zeros(size);
    for i in 0..size {
        A[i] += B[i] + 1.0;
        B[i] -= A[i] * 5.0;
    }
    }
    pub fn get(&self, ind:usize) -> f32 {
        self.array[ind]
    }
    pub fn set(&mut self, ind:usize, val: f32) {
        self.array[ind] = val;
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
    pub fn greater_than(&self,n: JsValue) -> Nd {
        let n = ret_f32(n);
        Nd {
            array: self.array.mapv(|a| (a > n) as i32 as f32)
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
    // exporting options
    pub fn export(&self) -> Box<[f32]>{
        self.array.clone().into_raw_vec().into_boxed_slice()
    }
    pub fn show_pretty(&self) -> String {
        let nalg_arr = self.into_nalg_mat();
        format!("{}",nalg_arr)
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

fn make_slice_from_string(ind:&JsValue) -> Vec<SliceOrIndex>{
        let ind_string = ind.as_string().unwrap();
        let ind_vector = ind_string.split(',').collect::<Vec<&str>>();
        //log(&format!("{:?}", ind_vector)[..]);
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
                    [Ok(num1), Ok(num2)] => {
                        val_vec.push(SliceOrIndex::Slice {
                            start: *num1 as isize,
                            end: Some(*num2 as isize),
                            step: 1_isize,
                        });
                    }// :num syntax
                    [Ok(num), _] => {
                        val_vec.push(SliceOrIndex::Slice {
                            start: *num as isize,
                            end: None,
                            step: 1_isize,
                        });
                    }//num:num syntax
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
        val_vec
}
fn make_arr_usize(arr: &js_sys::Array) -> Vec<usize> {
    let mut dim_vec = vec![];
    arr.for_each(&mut |x, _, _| dim_vec.push(x.as_f64().unwrap() as usize));
    dim_vec
}
