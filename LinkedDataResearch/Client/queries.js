var TupleString_String, Queries__main$;
  Queries__main$ = (function (unitVar0)
  {
    return (new TupleString_String("guidelines", "\r\n    prefix owl:\u003cblah\u003e\r\n    select ?s where {?s ?p ?o}\r\n"));
  });
  TupleString_String = (function (Item0, Item1)
  {
    this.Items = [Item0, Item1];
    this.Items = [Item0, Item1];
  });
  TupleString_String.prototype.CompareTo = (function (that)
  {
    var diff = 0.000000;
    var _diff = 0.000000;
    _diff = ((this.Items[0.000000] < that.Items[0.000000]) ? -1.000000 : ((this.Items[0.000000] == that.Items[0.000000]) ? 0.000000 : 1.000000));
    diff = _diff;
    if ((diff != 0.000000)) 
    {
      return diff;
    }
    else
    {
      var __diff = 0.000000;
      __diff = ((this.Items[1.000000] < that.Items[1.000000]) ? -1.000000 : ((this.Items[1.000000] == that.Items[1.000000]) ? 0.000000 : 1.000000));
      diff = __diff;
      if ((diff != 0.000000)) 
      {
        return diff;
      }
      else
      {
        return 0.000000;
      };
    };
  });
  return Queries__main$()