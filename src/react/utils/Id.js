let __id = 0;

class Id {
  static next(){
    __id++;
    return "id_" +__id;
  }
}

export default Id;
