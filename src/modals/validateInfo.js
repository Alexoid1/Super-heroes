export default function validateInfo(values) {
    let errors = {};
  
    if (!values.heroname.trim()) {
      errors.heroname = 'Hero name required';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.place) {
      errors.place = 'Place of Birth required';
    }
   
    return errors;

    
}    