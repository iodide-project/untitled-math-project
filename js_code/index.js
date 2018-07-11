//import {NdRange} from "./rust_sci_test"


const ndarray = import("./rust_sci_test")

ndarray.then(module => {
    //let ar = module.NdRange.make(20)
    //console.log(ar.fill_f32(5))
    //console.log(ar.show())
    let ar2 = new module.Nd([0,1])
    console.log(ar2.show())
    let ar3 = new module.Nd([0,6,3])
    console.log(ar3.show())
    console.log(new module.Nd([0,6]).show())
    let timer = (arr) => {
        console.log(`timing input: ${arr}`)
        let t1 = performance.now()
        new module.Nd(arr)
        let t2 = performance.now()
        console.log(`time took is ${t2-t1} in ms`)
    }
    let test_arrays =[[0,16,16,16],
        [0,64,64,64],
        [0,512,512,4],
        [0,512,4,512],
        [0,4,512,512],
    ]
    for (test_arr of test_arrays) {
        timer(test_arr)
    }
}
)

