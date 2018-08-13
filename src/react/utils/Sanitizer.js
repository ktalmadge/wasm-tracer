class Sanitizer {
  static enforce_one(char, string){
    let first = string.indexOf(char) + 1;

    if(first === 0){ return string; }

    return string.substr(0, first) + string.slice(first).replace(char, '');
  }

  static enforce_first(char, string){
    if(string.length === 0){ return string; }

    return string.substr(0, 1) + string.slice(1).replace(char, '');
  }

  static s(value, type){
    let result = null;
    switch(type.toLowerCase()){
      case('integer'):
        result = value.toString().replace(/[^0-9]/gi,'');
        break;
      case('float'):
        let float = value.toString().replace(/[^0-9\-\.]/gi,'');
        result = (
            this.enforce_first('-',
                this.enforce_one('-',
                    this.enforce_one('.', float)
                )
            )
        );
        break;
      case('boolean'):
        result = value === true || value === 'true';
        break;
      default:
        result = value;
    }

    return result;
  }
}

export default Sanitizer;