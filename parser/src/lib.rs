fn make_number(num: &str, total: &mut Vec<f32>) {
    total.push(num.trim().parse::<f32>().unwrap());
}

// idea,
//  get dimension information
//  get all numbers
//  reshape
pub fn parse(vec_str: &str) -> (Vec<usize>, Vec<f32>) {
    let mut dimensions:Vec<usize> = vec![];
    let mut num_str = String::new();
    let mut all_numbers: Vec<f32> = vec![];
    let mut permit_mut = vec![true]; // prevents overcounting
    let mut brace_stack_counters = [0, 0]; // determines where increment ind for dimension vec
    for c in vec_str.chars() {
        match c {
            '[' => {
                brace_stack_counters[0] += 1;
                if dimensions.len() < (brace_stack_counters[0] - brace_stack_counters[1]) {
                    dimensions.push(0_usize);
                    permit_mut.push(true);
                }
            }
            ',' => {
                make_number(&num_str, &mut all_numbers);
                num_str = String::new();
                if permit_mut[brace_stack_counters[0] - 1 - brace_stack_counters[1]] {
                    dimensions[brace_stack_counters[0] - 1 - brace_stack_counters[1]] += 1;
                }
            }
            ']' => {
                make_number(&num_str, &mut all_numbers);
                num_str = String::new();
                if permit_mut[brace_stack_counters[0] - 1 - brace_stack_counters[1]] {
                    dimensions[brace_stack_counters[0] - 1 - brace_stack_counters[1]] += 1;
                }
                permit_mut[brace_stack_counters[0] - 1 - brace_stack_counters[1]] = false;
                brace_stack_counters[1] += 1;
            }
            content => {
                num_str.push(content);
            }
        }
    }

    (dimensions, all_numbers)
}

// recursive consume of the string each time we hit a [

#[cfg(test)]
mod tests {
    use parse;
    #[test]
    fn eval_dimension() {
        assert_eq!(
            parse("[1,2,3]"),
            (vec![3_usize], vec![1_f32, 2_f32, 3_f32])
        );
        //all the rest of these will break until i change the u32s to usize
        //assert_eq!(parse("[[1,2,3],[4,5,6]]"), vec![2_u32, 3_u32]);
        //assert_eq!(parse("[[1,2,3],[4,5,6],[7,8,9]]"), vec![3_u32, 3_u32]);
        //assert_eq!(
        //    parse("[[ [1,2,3],[4,5,6],[7,8,9]],[[1,2,3],[4,5,6],[7,8,9]]]"),
        //    vec![2_u32, 3_u32, 3_u32]
        //);
    }
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
