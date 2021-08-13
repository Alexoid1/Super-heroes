export default function validateInfo(values) {
    let errors = {};
  
    if (!values.heroname.trim()) {
      errors.heroname = 'Hero name required';
    }else if(values.heroname.length>50){
        errors.heroname='Write a shorter name';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.place) {
      errors.place = 'Place of Birth required';
    }else if(values.heroname.length>50){
        errors.heroname='Write a shorter place of birth';
    }

    if (values.occupation.length>50) {
        errors.occupation = 'Occupation needs to be less than 50 characters';
    }
    
    if (values.heightt.length>10) {
      errors.heightt = 'Height needs to be less than 10 characters';
    }

    if (values.weightt.length>10) {
        errors.weightt = 'Weight needs to be less than 10 characters';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
}    