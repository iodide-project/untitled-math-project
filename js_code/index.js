//import {NdRange} from "./rust_sci_test"


const ndarray = import("./rust_sci_test")

ndarray.then(module => {
    let ar = module.NdRange.make(20)
    console.log(ar.fill_f32(5))
    console.log(ar.show())
}
)
